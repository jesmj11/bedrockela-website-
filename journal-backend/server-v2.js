// BedrockELA Journal Backend with User Management
// Complete API for parents, students, and journal entries

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';

// Database connection
const db = new sqlite3.Database('./journal.db', (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables if they don't exist
function initializeDatabase() {
  console.log('🔧 Initializing database tables...');
  db.serialize(() => {
    // Parents table
    db.run(`
      CREATE TABLE IF NOT EXISTS parents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        family_name TEXT,
        account_type TEXT DEFAULT 'family',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `, (err) => {
      if (err) console.error('❌ Error creating parents table:', err);
      else console.log('✅ Parents table ready');
    });

    // Students table
    db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        grade_level TEXT NOT NULL,
        pin_code TEXT,
        current_lesson INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `, (err) => {
      if (err) console.error('❌ Error creating students table:', err);
      else console.log('✅ Students table ready');
    });

    // Parent-student relationship table
    db.run(`
      CREATE TABLE IF NOT EXISTS parent_students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_id INTEGER NOT NULL,
        student_id INTEGER NOT NULL,
        relationship TEXT DEFAULT 'child',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        UNIQUE(parent_id, student_id)
      )
    `, (err) => {
      if (err) console.error('❌ Error creating parent_students table:', err);
      else console.log('✅ Parent-student relationship table ready');
    });

    // Journal entries table
    db.run(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        grade TEXT NOT NULL,
        lesson_number INTEGER NOT NULL,
        unit_number INTEGER,
        book_title TEXT,
        entry_date DATE DEFAULT (date('now')),
        entry_text TEXT NOT NULL,
        word_count INTEGER,
        revised BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        UNIQUE(student_id, grade, lesson_number)
      )
    `, (err) => {
      if (err) console.error('❌ Error creating journal_entries table:', err);
      else console.log('✅ Journal entries table ready');
    });

    // Journal prompts table
    db.run(`
      CREATE TABLE IF NOT EXISTS journal_prompts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        grade TEXT NOT NULL,
        lesson_number INTEGER NOT NULL,
        prompt_text TEXT NOT NULL,
        UNIQUE(grade, lesson_number)
      )
    `, (err) => {
      if (err) console.error('❌ Error creating journal_prompts table:', err);
      else console.log('✅ Journal prompts table ready');
      console.log('✨ Database initialization complete!');
    });
  });
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
      return res.status(403).json({ success: false, error: 'Invalid token' });
    }
    req.parentId = decoded.parent_id;
    next();
  });
}

// ========================================
// PARENT/TEACHER ENDPOINTS
// ========================================

// Parent Signup
app.post('/api/parent/signup', authLimiter, async (req, res) => {
  const { email, password, name, family_name, account_type } = req.body;

  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email, password, and name are required' 
    });
  }

  // Hash password
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    db.run(`
      INSERT INTO parents (email, password_hash, name, family_name, account_type)
      VALUES (?, ?, ?, ?, ?)
    `, [email, passwordHash, name, family_name || null, account_type || 'family'], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ 
            success: false, 
            error: 'Email already exists' 
          });
        }
        console.error('Error creating parent:', err);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to create account' 
        });
      }

      const parentId = this.lastID;
      const token = jwt.sign({ parent_id: parentId }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        success: true,
        parent_id: parentId,
        name: name,
        token: token,
        message: 'Account created successfully!'
      });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Parent Login
app.post('/api/parent/login', authLimiter, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email and password are required' 
    });
  }

  db.get('SELECT * FROM parents WHERE email = ?', [email], async (err, parent) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (!parent) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isValid = await bcrypt.compare(password, parent.password_hash);
    
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    // Update last login
    db.run('UPDATE parents SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [parent.id]);

    // Generate JWT token
    const token = jwt.sign({ parent_id: parent.id }, JWT_SECRET, { expiresIn: '7d' });

    // Get students for this parent
    db.all(`
      SELECT s.* FROM students s
      JOIN parent_students ps ON s.id = ps.student_id
      WHERE ps.parent_id = ?
      ORDER BY s.name
    `, [parent.id], (err, students) => {
      if (err) {
        console.error('Error fetching students:', err);
      }

      res.json({
        success: true,
        parent_id: parent.id,
        name: parent.name,
        family_name: parent.family_name,
        account_type: parent.account_type,
        token: token,
        students: students || []
      });
    });
  });
});

// Verify Parent Account (for password reset)
app.post('/api/parent/verify', (req, res) => {
  const { email, family_name } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email is required' 
    });
  }

  db.get('SELECT * FROM parents WHERE email = ?', [email], (err, parent) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (!parent) {
      return res.status(404).json({ 
        success: false, 
        error: 'No account found with that email' 
      });
    }

    // If family_name was provided, verify it matches (case-insensitive)
    if (family_name && family_name.trim() !== '') {
      const providedName = family_name.trim().toLowerCase();
      const storedName = (parent.family_name || '').trim().toLowerCase();
      
      if (providedName !== storedName) {
        return res.status(401).json({ 
          success: false, 
          error: 'Family name does not match our records' 
        });
      }
    }

    res.json({
      success: true,
      message: 'Account verified'
    });
  });
});

// Reset Password
app.post('/api/parent/reset-password', async (req, res) => {
  const { email, new_password } = req.body;

  if (!email || !new_password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email and new password are required' 
    });
  }

  try {
    // Hash new password
    const passwordHash = await bcrypt.hash(new_password, 10);

    db.run('UPDATE parents SET password_hash = ? WHERE email = ?', 
      [passwordHash, email], function(err) {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to update password' 
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Account not found' 
        });
      }

      res.json({
        success: true,
        message: 'Password updated successfully'
      });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get Parent Profile + Students
app.get('/api/parent/:id', authenticateParent, (req, res) => {
  const parentId = parseInt(req.params.id);

  // Verify parent is accessing their own data
  if (req.parentId !== parentId) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }

  db.get('SELECT id, email, name, family_name, account_type, created_at FROM parents WHERE id = ?', 
    [parentId], (err, parent) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    if (!parent) {
      return res.status(404).json({ success: false, error: 'Parent not found' });
    }

    // Get students
    db.all(`
      SELECT s.*, ps.relationship FROM students s
      JOIN parent_students ps ON s.id = ps.student_id
      WHERE ps.parent_id = ?
      ORDER BY s.name
    `, [parentId], (err, students) => {
      if (err) {
        console.error('Error fetching students:', err);
      }

      res.json({
        success: true,
        parent: parent,
        students: students || []
      });
    });
  });
});

// Get Parent Stats
app.get('/api/parent/:id/stats', authenticateParent, (req, res) => {
  const parentId = parseInt(req.params.id);

  if (req.parentId !== parentId) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }

  // Get aggregate stats for all students
  db.all(`
    SELECT 
      COUNT(DISTINCT s.id) as total_students,
      SUM(s.current_lesson) as total_lessons_completed,
      SUM(je.word_count) as total_words_written,
      COUNT(DISTINCT je.id) as total_journal_entries
    FROM students s
    JOIN parent_students ps ON s.id = ps.student_id
    LEFT JOIN journal_entries je ON s.id = je.student_id
    WHERE ps.parent_id = ?
  `, [parentId], (err, stats) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    // Get most active student
    db.get(`
      SELECT s.name, s.current_lesson
      FROM students s
      JOIN parent_students ps ON s.id = ps.student_id
      WHERE ps.parent_id = ?
      ORDER BY s.current_lesson DESC
      LIMIT 1
    `, [parentId], (err, topStudent) => {
      res.json({
        success: true,
        stats: stats[0],
        most_active_student: topStudent
      });
    });
  });
});

// ========================================
// STUDENT MANAGEMENT ENDPOINTS (Parents Only)
// ========================================

// Add Student
app.post('/api/parent/student/add', authenticateParent, (req, res) => {
  const { student_name, student_username, grade_level, pin_code } = req.body;
  const parentId = req.parentId;

  if (!student_name || !student_username || !grade_level) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name, username, and grade level are required' 
    });
  }

  // Create student
  db.run(`
    INSERT INTO students (name, username, grade_level, pin_code)
    VALUES (?, ?, ?, ?)
  `, [student_name, student_username, grade_level, pin_code || null], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ 
          success: false, 
          error: 'Username already exists' 
        });
      }
      console.error('Error creating student:', err);
      return res.status(500).json({ success: false, error: 'Failed to create student' });
    }

    const studentId = this.lastID;

    // Link student to parent
    db.run(`
      INSERT INTO parent_students (parent_id, student_id, relationship)
      VALUES (?, ?, ?)
    `, [parentId, studentId, 'child'], (err) => {
      if (err) {
        console.error('Error linking student to parent:', err);
        return res.status(500).json({ success: false, error: 'Failed to link student' });
      }

      res.json({
        success: true,
        student_id: studentId,
        name: student_name,
        username: student_username,
        message: 'Student added successfully!'
      });
    });
  });
});

// Update Student
app.put('/api/parent/student/:id', authenticateParent, (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, username, grade_level, pin_code } = req.body;
  const parentId = req.parentId;

  // Verify parent owns this student
  db.get('SELECT * FROM parent_students WHERE parent_id = ? AND student_id = ?', 
    [parentId, studentId], (err, link) => {
    if (err || !link) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const updates = [];
    const values = [];

    if (name) { updates.push('name = ?'); values.push(name); }
    if (username) { updates.push('username = ?'); values.push(username); }
    if (grade_level) { updates.push('grade_level = ?'); values.push(grade_level); }
    if (pin_code !== undefined) { updates.push('pin_code = ?'); values.push(pin_code); }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: 'No fields to update' });
    }

    values.push(studentId);

    db.run(`UPDATE students SET ${updates.join(', ')} WHERE id = ?`, values, function(err) {
      if (err) {
        console.error('Error updating student:', err);
        return res.status(500).json({ success: false, error: 'Failed to update student' });
      }

      res.json({
        success: true,
        message: 'Student updated successfully!'
      });
    });
  });
});

// Delete Student
app.delete('/api/parent/student/:id', authenticateParent, (req, res) => {
  const studentId = parseInt(req.params.id);
  const parentId = req.parentId;

  // Verify parent owns this student
  db.get('SELECT * FROM parent_students WHERE parent_id = ? AND student_id = ?', 
    [parentId, studentId], (err, link) => {
    if (err || !link) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    // Delete student (cascades to journal entries and parent_students)
    db.run('DELETE FROM students WHERE id = ?', [studentId], function(err) {
      if (err) {
        console.error('Error deleting student:', err);
        return res.status(500).json({ success: false, error: 'Failed to delete student' });
      }

      res.json({
        success: true,
        message: 'Student deleted successfully'
      });
    });
  });
});

// ========================================
// STUDENT LOGIN & PROGRESS
// ========================================

// Student Login (Simple - username + optional PIN)
app.post('/api/student/login', (req, res) => {
  const { username, pin_code } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }

  db.get('SELECT * FROM students WHERE username = ?', [username], (err, student) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (!student) {
      return res.status(401).json({ success: false, error: 'Student not found' });
    }

    // Check PIN if student has one set
    if (student.pin_code && student.pin_code !== pin_code) {
      return res.status(401).json({ success: false, error: 'Invalid PIN' });
    }

    // Update last login
    db.run('UPDATE students SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [student.id]);

    res.json({
      success: true,
      student_id: student.id,
      name: student.name,
      grade_level: student.grade_level,
      current_lesson: student.current_lesson
    });
  });
});

// Student Login by ID (from student picker - requires parent auth)
app.post('/api/student/login-by-id', authenticateParent, (req, res) => {
  const { student_id, pin_code } = req.body;
  const parentId = req.parentId;

  if (!student_id) {
    return res.status(400).json({ success: false, error: 'Student ID is required' });
  }

  // Verify parent owns this student
  db.get('SELECT * FROM parent_students WHERE parent_id = ? AND student_id = ?', 
    [parentId, student_id], (err, link) => {
    if (err || !link) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    // Get student
    db.get('SELECT * FROM students WHERE id = ?', [student_id], (err, student) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, error: 'Server error' });
      }

      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found' });
      }

      // Check PIN if student has one set
      if (student.pin_code && student.pin_code !== pin_code) {
        return res.status(401).json({ success: false, error: 'Invalid PIN' });
      }

      // Update last login
      db.run('UPDATE students SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [student.id]);

      res.json({
        success: true,
        student_id: student.id,
        name: student.name,
        grade_level: student.grade_level,
        current_lesson: student.current_lesson
      });
    });
  });
});

// Get Student Progress
app.get('/api/student/:id/progress', (req, res) => {
  const studentId = parseInt(req.params.id);

  db.get('SELECT * FROM students WHERE id = ?', [studentId], (err, student) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    // Get journal entry count and word count
    db.get(`
      SELECT COUNT(*) as entry_count, SUM(word_count) as total_words
      FROM journal_entries
      WHERE student_id = ?
    `, [studentId], (err, stats) => {
      res.json({
        success: true,
        student: {
          id: student.id,
          name: student.name,
          grade_level: student.grade_level,
          current_lesson: student.current_lesson,
          total_entries: stats?.entry_count || 0,
          total_words: stats?.total_words || 0
        }
      });
    });
  });
});

// Update Student Progress (current lesson)
app.put('/api/student/:id/progress', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { current_lesson } = req.body;

  if (!current_lesson) {
    return res.status(400).json({ success: false, error: 'current_lesson is required' });
  }

  db.run('UPDATE students SET current_lesson = ? WHERE id = ?', 
    [current_lesson, studentId], function(err) {
    if (err) {
      console.error('Error updating progress:', err);
      return res.status(500).json({ success: false, error: 'Failed to update progress' });
    }

    res.json({
      success: true,
      current_lesson: current_lesson
    });
  });
});

// ========================================
// JOURNAL ENTRY ENDPOINTS (existing, kept as-is)
// ========================================

// Save Journal Entry
app.post('/api/journal/save', (req, res) => {
  const { student_id, grade, lesson_number, unit_number, book_title, entry_text } = req.body;

  if (!student_id || !grade || !lesson_number || !entry_text) {
    return res.status(400).json({ 
      success: false, 
      error: 'student_id, grade, lesson_number, and entry_text are required' 
    });
  }

  const wordCount = entry_text.trim().split(/\s+/).length;

  db.run(`
    INSERT INTO journal_entries (student_id, grade, lesson_number, unit_number, book_title, entry_text, word_count)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(student_id, grade, lesson_number) DO UPDATE SET
      entry_text = excluded.entry_text,
      word_count = excluded.word_count,
      revised = 1,
      updated_at = CURRENT_TIMESTAMP
  `, [student_id, grade, lesson_number, unit_number, book_title, entry_text, wordCount], function(err) {
    if (err) {
      console.error('Error saving journal entry:', err);
      return res.status(500).json({ success: false, error: 'Failed to save entry' });
    }

    res.json({
      success: true,
      entry_id: this.lastID || this.changes,
      word_count: wordCount,
      auto_saved: true
    });
  });
});

// Get Specific Journal Entry
app.get('/api/journal/entry/:student_id/:grade/:lesson_number', (req, res) => {
  const { student_id, grade, lesson_number } = req.params;

  db.get(`
    SELECT * FROM journal_entries 
    WHERE student_id = ? AND grade = ? AND lesson_number = ?
  `, [student_id, grade, lesson_number], (err, entry) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (!entry) {
      return res.status(404).json({ success: false, error: 'Entry not found' });
    }

    res.json({
      success: true,
      entry: entry
    });
  });
});

// Get All Entries for Student
app.get('/api/journal/student/:student_id', (req, res) => {
  const studentId = req.params.student_id;
  const { grade, unit } = req.query;

  let query = 'SELECT * FROM journal_entries WHERE student_id = ?';
  const params = [studentId];

  if (grade) {
    query += ' AND grade = ?';
    params.push(grade);
  }

  if (unit) {
    query += ' AND unit_number = ?';
    params.push(unit);
  }

  query += ' ORDER BY lesson_number ASC';

  db.all(query, params, (err, entries) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    res.json({
      success: true,
      entries: entries
    });
  });
});

// Get Entries by Book
app.get('/api/journal/book/:student_id/:book_title', (req, res) => {
  const { student_id, book_title } = req.params;

  db.all(`
    SELECT * FROM journal_entries 
    WHERE student_id = ? AND book_title = ?
    ORDER BY lesson_number ASC
  `, [student_id, book_title], (err, entries) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    res.json({
      success: true,
      book_title: book_title,
      entries: entries
    });
  });
});

// Update Journal Entry
app.put('/api/journal/entry/:id', (req, res) => {
  const entryId = req.params.id;
  const { entry_text } = req.body;

  if (!entry_text) {
    return res.status(400).json({ success: false, error: 'entry_text is required' });
  }

  const wordCount = entry_text.trim().split(/\s+/).length;

  db.run(`
    UPDATE journal_entries 
    SET entry_text = ?, word_count = ?, revised = 1, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [entry_text, wordCount, entryId], function(err) {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(500).json({ success: false, error: 'Failed to update entry' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, error: 'Entry not found' });
    }

    res.json({
      success: true,
      word_count: wordCount
    });
  });
});

// Delete Journal Entry
app.delete('/api/journal/entry/:id', (req, res) => {
  const entryId = req.params.id;

  db.run('DELETE FROM journal_entries WHERE id = ?', [entryId], function(err) {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ success: false, error: 'Failed to delete entry' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, error: 'Entry not found' });
    }

    res.json({
      success: true,
      message: 'Entry deleted'
    });
  });
});

// Get Journal Prompt
app.get('/api/prompt/:grade/:lesson_number', (req, res) => {
  const { grade, lesson_number } = req.params;

  db.get(`
    SELECT * FROM journal_prompts 
    WHERE grade = ? AND lesson_number = ?
  `, [grade, lesson_number], (err, prompt) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (!prompt) {
      return res.status(404).json({ success: false, error: 'Prompt not found' });
    }

    res.json({
      success: true,
      prompt: prompt
    });
  });
});

// ========================================
// HEALTH CHECK
// ========================================

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'BedrockELA Journal API is running',
    version: '2.0 (with user management)'
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`\n🚀 BedrockELA Journal API v2.0 running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔐 JWT Secret: ${JWT_SECRET === 'change-this-secret-in-production' ? '⚠️  CHANGE IN PRODUCTION!' : '✅ Configured'}`);
  console.log('\n📝 Endpoints:');
  console.log('   POST /api/parent/signup - Create parent account');
  console.log('   POST /api/parent/login - Parent login');
  console.log('   POST /api/parent/student/add - Add student');
  console.log('   POST /api/student/login - Student login');
  console.log('   POST /api/journal/save - Save journal entry');
  console.log('   GET  /api/health - Health check');
  console.log('\n✨ Ready for requests!\n');
});
