// BedrockELA Journal Backend with User Management - PostgreSQL Version
// Complete API for parents, students, and journal entries

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection and initialize database
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err);
  } else {
    console.log('✅ Connected to PostgreSQL database');
    release();
    initializeDatabase();
  }
});

// Initialize database tables if they don't exist
async function initializeDatabase() {
  console.log('🔧 Initializing database tables...');
  
  try {
    // Parents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parents (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        family_name VARCHAR(255),
        account_type VARCHAR(50) DEFAULT 'family',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);
    console.log('✅ Parents table ready');

    // Students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        grade_level VARCHAR(50) NOT NULL,
        pin_code VARCHAR(10),
        current_lesson INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);
    console.log('✅ Students table ready');

    // Parent-student relationship table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parent_students (
        id SERIAL PRIMARY KEY,
        parent_id INTEGER NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
        student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        relationship VARCHAR(50) DEFAULT 'child',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(parent_id, student_id)
      )
    `);
    console.log('✅ Parent-student relationship table ready');

    // Journal entries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        grade VARCHAR(50) NOT NULL,
        lesson_number INTEGER NOT NULL,
        unit_number INTEGER,
        book_title VARCHAR(255),
        entry_date DATE DEFAULT CURRENT_DATE,
        entry_text TEXT NOT NULL,
        word_count INTEGER,
        revised BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, grade, lesson_number)
      )
    `);
    console.log('✅ Journal entries table ready');

    // Journal prompts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS journal_prompts (
        id SERIAL PRIMARY KEY,
        grade VARCHAR(50) NOT NULL,
        lesson_number INTEGER NOT NULL,
        prompt_text TEXT NOT NULL,
        UNIQUE(grade, lesson_number)
      )
    `);
    console.log('✅ Journal prompts table ready');

    // Reading progress table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reading_progress (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        book_id VARCHAR(255) NOT NULL,
        pages_read INTEGER[] DEFAULT '{}',
        total_pages INTEGER NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, book_id)
      )
    `);
    console.log('✅ Reading progress table ready');
    console.log('✨ Database initialization complete!');
    
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
}

// Middleware
app.set('trust proxy', true); // Required for Railway/proxies
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting (configured for Railway proxy)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false } // Disable validation warning for Railway
});
app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 minutes
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false }
});

// ========================================
// AUTHENTICATION MIDDLEWARE
// ========================================

function authenticateParent(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
    
    req.parentId = decoded.parent_id;
    next();
  });
}

// ========================================
// HEALTH CHECK
// ========================================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BedrockELA Journal API is running',
    version: '2.0 (PostgreSQL with user management)'
  });
});

// ========================================
// PARENT/TEACHER ENDPOINTS
// ========================================

// Parent Signup
app.post('/api/parent/signup', authLimiter, async (req, res) => {
  const { email, password, name, familyName } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Check if email exists
    const existing = await pool.query('SELECT id FROM parents WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create parent
    const result = await pool.query(
      'INSERT INTO parents (email, password_hash, name, family_name, account_type) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, family_name',
      [email, hashedPassword, name, familyName || null, 'family']
    );

    const parent = result.rows[0];

    // Generate JWT
    const token = jwt.sign({ parent_id: parent.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      parent_id: parent.id,
      name: parent.name,
      token: token,
      message: 'Account created successfully!'
    });

  } catch (error) {
    console.error('Error creating parent:', error);
    res.status(500).json({ success: false, error: 'Failed to create account' });
  }
});

// Parent Login
app.post('/api/parent/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  try {
    const result = await pool.query('SELECT * FROM parents WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const parent = result.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, parent.password_hash);
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Update last login
    await pool.query('UPDATE parents SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [parent.id]);

    // Generate JWT
    const token = jwt.sign({ parent_id: parent.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      parent_id: parent.id,
      name: parent.name,
      email: parent.email,
      family_name: parent.family_name,
      token: token,
      message: 'Login successful!'
    });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Verify Email (for password reset)
app.post('/api/parent/verify', authLimiter, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email required' });
  }

  try {
    const result = await pool.query('SELECT id, email, name FROM parents WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'No account found with that email' });
    }

    const parent = result.rows[0];

    res.json({
      success: true,
      message: 'Account verified',
      name: parent.name
    });

  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

// Reset Password
app.post('/api/parent/reset-password', authLimiter, async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, error: 'Email and new password required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
  }

  try {
    // Verify email exists
    const result = await pool.query('SELECT id FROM parents WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query('UPDATE parents SET password_hash = $1 WHERE email = $2', [hashedPassword, email]);

    res.json({
      success: true,
      message: 'Password reset successfully!'
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, error: 'Password reset failed' });
  }
});

// Get Parent Profile + Students
app.get('/api/parent/:id', authenticateParent, async (req, res) => {
  const parentId = parseInt(req.params.id);

  if (req.parentId !== parentId) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }

  try {
    // Get parent profile
    const parentResult = await pool.query(
      'SELECT id, email, name, family_name, account_type, created_at FROM parents WHERE id = $1',
      [parentId]
    );

    if (parentResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Parent not found' });
    }

    const parent = parentResult.rows[0];

    // Get students
    const studentsResult = await pool.query(`
      SELECT s.*, ps.relationship FROM students s
      JOIN parent_students ps ON s.id = ps.student_id
      WHERE ps.parent_id = $1
      ORDER BY s.name
    `, [parentId]);

    res.json({
      success: true,
      parent: parent,
      students: studentsResult.rows
    });

  } catch (error) {
    console.error('Error fetching parent profile:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get Parent Stats
app.get('/api/parent/:id/stats', authenticateParent, async (req, res) => {
  const parentId = parseInt(req.params.id);

  if (req.parentId !== parentId) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const statsResult = await pool.query(`
      SELECT 
        COUNT(DISTINCT s.id) as total_students,
        SUM(s.current_lesson) as total_lessons_completed,
        COUNT(DISTINCT je.id) as total_journal_entries,
        COALESCE(SUM(je.word_count), 0) as total_words_written
      FROM students s
      JOIN parent_students ps ON s.id = ps.student_id
      LEFT JOIN journal_entries je ON s.id = je.student_id
      WHERE ps.parent_id = $1
    `, [parentId]);

    const stats = statsResult.rows[0];

    res.json({
      success: true,
      stats: {
        total_students: parseInt(stats.total_students) || 0,
        total_lessons_completed: parseInt(stats.total_lessons_completed) || 0,
        total_journal_entries: parseInt(stats.total_journal_entries) || 0,
        total_words_written: parseInt(stats.total_words_written) || 0
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

// Add Student to Parent Account
app.post('/api/parent/student/add', authenticateParent, async (req, res) => {
  const { name, username, grade_level, pin_code } = req.body;
  const parentId = req.parentId;

  if (!name || !username || !grade_level) {
    return res.status(400).json({ success: false, error: 'Name, username, and grade level required' });
  }

  try {
    // Check if username exists
    const existing = await pool.query('SELECT id FROM students WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, error: 'Username already exists' });
    }

    // Create student
    const studentResult = await pool.query(
      'INSERT INTO students (name, username, grade_level, pin_code) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, username, grade_level, pin_code || null]
    );

    const student = studentResult.rows[0];

    // Link student to parent
    await pool.query(
      'INSERT INTO parent_students (parent_id, student_id, relationship) VALUES ($1, $2, $3)',
      [parentId, student.id, 'child']
    );

    res.status(201).json({
      success: true,
      student: student,
      message: `${name} added successfully!`
    });

  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, error: 'Failed to add student' });
  }
});

// Update Student (name, username, grade, PIN)
app.put('/api/parent/student/:id', authenticateParent, async (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, username, grade_level, pin_code } = req.body;
  const parentId = req.parentId;

  try {
    // Verify parent owns this student
    const linkResult = await pool.query(
      'SELECT * FROM parent_students WHERE parent_id = $1 AND student_id = $2',
      [parentId, studentId]
    );

    if (linkResult.rows.length === 0) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (username) {
      updates.push(`username = $${paramCount++}`);
      values.push(username);
    }
    if (grade_level) {
      updates.push(`grade_level = $${paramCount++}`);
      values.push(grade_level);
    }
    if (pin_code !== undefined) {
      updates.push(`pin_code = $${paramCount++}`);
      values.push(pin_code);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: 'No fields to update' });
    }

    values.push(studentId);

    await pool.query(
      `UPDATE students SET ${updates.join(', ')} WHERE id = $${paramCount}`,
      values
    );

    res.json({
      success: true,
      message: 'Student updated successfully!'
    });

  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, error: 'Failed to update student' });
  }
});

// Delete Student
app.delete('/api/parent/student/:id', authenticateParent, async (req, res) => {
  const studentId = parseInt(req.params.id);
  const parentId = req.parentId;

  try {
    // Verify parent owns this student
    const linkResult = await pool.query(
      'SELECT * FROM parent_students WHERE parent_id = $1 AND student_id = $2',
      [parentId, studentId]
    );

    if (linkResult.rows.length === 0) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    // Delete student (CASCADE will delete relationships and journal entries)
    await pool.query('DELETE FROM students WHERE id = $1', [studentId]);

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, error: 'Failed to delete student' });
  }
});

// Reset Student Progress
app.post('/api/parent/student/:id/reset', authenticateParent, async (req, res) => {
  const studentId = parseInt(req.params.id);
  const parentId = req.parentId;

  try {
    // Verify parent owns this student
    const linkResult = await pool.query(
      'SELECT * FROM parent_students WHERE parent_id = $1 AND student_id = $2',
      [parentId, studentId]
    );

    if (linkResult.rows.length === 0) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    // Delete all journal entries for this student
    await pool.query('DELETE FROM journal_entries WHERE student_id = $1', [studentId]);

    // Reset current lesson
    await pool.query('UPDATE students SET current_lesson = 1 WHERE id = $1', [studentId]);

    res.json({
      success: true,
      message: 'Student progress reset successfully'
    });

  } catch (error) {
    console.error('Error resetting progress:', error);
    res.status(500).json({ success: false, error: 'Failed to reset progress' });
  }
});

// ========================================
// STUDENT ENDPOINTS
// ========================================

// Student Login
app.post('/api/student/login', async (req, res) => {
  const { username, pin_code } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, error: 'Username required' });
  }

  try {
    const result = await pool.query('SELECT * FROM students WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    const student = result.rows[0];

    // Check PIN if required
    if (student.pin_code && student.pin_code !== pin_code) {
      return res.status(401).json({ success: false, error: 'Incorrect PIN' });
    }

    // Update last login
    await pool.query('UPDATE students SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [student.id]);

    res.json({
      success: true,
      student: {
        id: student.id,
        name: student.name,
        username: student.username,
        grade_level: student.grade_level,
        current_lesson: student.current_lesson
      }
    });

  } catch (error) {
    console.error('Error student login:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Get Student Progress
app.get('/api/student/:id/progress', async (req, res) => {
  const studentId = parseInt(req.params.id);

  try {
    const studentResult = await pool.query('SELECT * FROM students WHERE id = $1', [studentId]);

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    const student = studentResult.rows[0];

    // Get journal stats
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_entries,
        COALESCE(SUM(word_count), 0) as total_words
      FROM journal_entries
      WHERE student_id = $1
    `, [studentId]);

    const stats = statsResult.rows[0];

    res.json({
      success: true,
      student: student,
      stats: {
        current_lesson: student.current_lesson,
        total_journal_entries: parseInt(stats.total_entries) || 0,
        total_words_written: parseInt(stats.total_words) || 0
      }
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch progress' });
  }
});

// ========================================
// JOURNAL ENDPOINTS
// ========================================

// Save Journal Entry
app.post('/api/journal/save', async (req, res) => {
  const { student_id, grade, lesson_number, unit_number, book_title, entry_text } = req.body;

  if (!student_id || !grade || !lesson_number || !entry_text) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const word_count = entry_text.trim().split(/\s+/).length;

  try {
    // Check if entry exists
    const existingResult = await pool.query(
      'SELECT id FROM journal_entries WHERE student_id = $1 AND grade = $2 AND lesson_number = $3',
      [student_id, grade, lesson_number]
    );

    if (existingResult.rows.length > 0) {
      // Update existing entry
      await pool.query(`
        UPDATE journal_entries 
        SET entry_text = $1, word_count = $2, unit_number = $3, book_title = $4, 
            revised = TRUE, updated_at = CURRENT_TIMESTAMP
        WHERE student_id = $5 AND grade = $6 AND lesson_number = $7
      `, [entry_text, word_count, unit_number, book_title, student_id, grade, lesson_number]);

      res.json({
        success: true,
        message: 'Journal entry updated!',
        word_count: word_count
      });
    } else {
      // Create new entry
      const result = await pool.query(`
        INSERT INTO journal_entries (student_id, grade, lesson_number, unit_number, book_title, entry_text, word_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `, [student_id, grade, lesson_number, unit_number, book_title, entry_text, word_count]);

      // Update student's current lesson
      await pool.query(
        'UPDATE students SET current_lesson = $1 WHERE id = $2 AND current_lesson < $1',
        [lesson_number, student_id]
      );

      res.status(201).json({
        success: true,
        message: 'Journal entry saved!',
        entry_id: result.rows[0].id,
        word_count: word_count
      });
    }

  } catch (error) {
    console.error('Error saving journal:', error);
    res.status(500).json({ success: false, error: 'Failed to save journal entry' });
  }
});

// Get Specific Journal Entry
app.get('/api/journal/entry/:student_id/:grade/:lesson_number', async (req, res) => {
  const { student_id, grade, lesson_number } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM journal_entries WHERE student_id = $1 AND grade = $2 AND lesson_number = $3',
      [student_id, grade, lesson_number]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Entry not found' });
    }

    res.json({
      success: true,
      entry: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching entry:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch entry' });
  }
});

// Get All Entries for Student
app.get('/api/journal/:student_id', async (req, res) => {
  const studentId = req.params.student_id;
  const { grade, unit } = req.query;

  try {
    let query = 'SELECT * FROM journal_entries WHERE student_id = $1';
    const params = [studentId];
    let paramCount = 2;

    if (grade) {
      query += ` AND grade = $${paramCount++}`;
      params.push(grade);
    }
    if (unit) {
      query += ` AND unit_number = $${paramCount++}`;
      params.push(unit);
    }

    query += ' ORDER BY lesson_number ASC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      entries: result.rows
    });

  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch entries' });
  }
});

// Get Recent Entries
app.get('/api/journal/:student_id/recent', async (req, res) => {
  const studentId = req.params.student_id;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await pool.query(
      'SELECT * FROM journal_entries WHERE student_id = $1 ORDER BY created_at DESC LIMIT $2',
      [studentId, limit]
    );

    res.json({
      success: true,
      entries: result.rows
    });

  } catch (error) {
    console.error('Error fetching recent entries:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch recent entries' });
  }
});

// ========================================
// TEXT-TO-SPEECH (ElevenLabs)
// ========================================

app.post('/api/text-to-speech', async (req, res) => {
  const { text, voice } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, error: 'Text required' });
  }

  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    return res.status(500).json({ success: false, error: 'TTS service not configured' });
  }

  // Voice ID mapping (can be extended)
  const voiceIds = {
    'Rachel': '21m00Tcm4TlvDq8ikWAM',
    'Domi': 'AZnzlk1XvdvUeBnXmlld',
    'Bella': 'EXAVITQu4vr4xnSDxMaL',
    'Antoni': 'ErXwobaYiN019PkySvjV',
    'Elli': 'MF3mGyEYCl7XYWbV9V6O',
    'Josh': 'TxGEqnHWrfWFTfGW9XjX'
  };

  const voiceId = voiceIds[voice] || voiceIds['Rachel'];

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    // Stream the audio back to client
    res.setHeader('Content-Type', 'audio/mpeg');
    const audioStream = response.body;
    audioStream.pipe(res);

  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ success: false, error: 'TTS generation failed' });
  }
});

// ========================================
// READING PROGRESS
// ========================================

// Get reading progress for a student and book
app.get('/api/reading-progress/:studentId/:bookId', async (req, res) => {
  const { studentId, bookId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM reading_progress 
       WHERE student_id = $1 AND book_id = $2`,
      [studentId, bookId]
    );

    if (result.rows.length === 0) {
      return res.json({ success: true, progress: null });
    }

    res.json({
      success: true,
      progress: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching reading progress:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch reading progress' });
  }
});

// Save/update reading progress
app.post('/api/reading-progress', async (req, res) => {
  const { student_id, book_id, pages_read, total_pages, completed } = req.body;

  if (!student_id || !book_id || !pages_read || !total_pages) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Upsert (insert or update)
    const result = await pool.query(
      `INSERT INTO reading_progress (student_id, book_id, pages_read, total_pages, completed, last_read_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       ON CONFLICT (student_id, book_id)
       DO UPDATE SET 
         pages_read = $3,
         total_pages = $4,
         completed = $5,
         last_read_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [student_id, book_id, pages_read, total_pages, completed]
    );

    res.json({
      success: true,
      progress: result.rows[0]
    });

  } catch (error) {
    console.error('Error saving reading progress:', error);
    res.status(500).json({ success: false, error: 'Failed to save reading progress' });
  }
});

// Get all reading progress for a student
app.get('/api/reading-progress/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM reading_progress 
       WHERE student_id = $1 
       ORDER BY last_read_at DESC`,
      [studentId]
    );

    res.json({
      success: true,
      books: result.rows
    });

  } catch (error) {
    console.error('Error fetching all reading progress:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch reading progress' });
  }
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`🚀 BedrockELA Journal API v2.0 running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔐 JWT Secret: ${JWT_SECRET === 'change-this-secret-in-production' ? '⚠️  CHANGE IN PRODUCTION!' : '✅ Custom secret set'}`);
  console.log('\n📝 Endpoints:');
  console.log('   POST /api/parent/signup - Create parent account');
  console.log('   POST /api/parent/login - Parent login');
  console.log('   POST /api/parent/student/add - Add student');
  console.log('   POST /api/student/login - Student login');
  console.log('   POST /api/journal/save - Save journal entry');
  console.log('   GET  /api/health - Health check');
  console.log('\n✨ Ready for requests!');
});
