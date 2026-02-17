// BedrockELA Journal Backend Server
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const dbPath = path.join(__dirname, 'journal.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Connected to SQLite database');
    
    // Create families table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS families (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      family_name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('⚠️  Families table creation failed:', err.message);
      else console.log('✅ Families table ready');
    });

    // Create students table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      grade TEXT,
      avatar TEXT DEFAULT '👤',
      family_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (family_id) REFERENCES families(id)
    )`, (err) => {
      if (err) console.error('⚠️  Students table creation failed:', err.message);
      else console.log('✅ Students table ready');
    });

    // Run migrations on startup
    db.run(`ALTER TABLE students ADD COLUMN avatar TEXT DEFAULT '👤'`, (err) => {
      if (err && !err.message.includes('duplicate column')) {
        console.error('⚠️  Avatar column migration failed:', err.message);
      } else if (!err) {
        console.log('✅ Avatar column added to students table');
      }
    });
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files from parent directory (the website)
app.use(express.static(path.join(__dirname, '..')));

// Helper function to promisify database queries
const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// ==================== FAMILY ROUTES ====================

// Family login - returns family info and all students
app.post('/api/family/login', async (req, res) => {
  try {
    const { family_name, password } = req.body;

    if (!family_name || !password) {
      return res.status(400).json({ error: 'Family name and password required' });
    }

    // Get family
    const family = await dbGet(
      'SELECT * FROM families WHERE family_name = ? AND password = ?',
      [family_name, password]
    );

    if (!family) {
      return res.status(401).json({ error: 'Invalid family name or password' });
    }

    // Get all students in this family
    const students = await dbAll(
      'SELECT id, name, grade_level, current_lesson, avatar FROM students WHERE family_id = ? ORDER BY name',
      [family.id]
    );

    res.json({
      success: true,
      family: {
        id: family.id,
        family_name: family.family_name
      },
      students: students
    });
  } catch (error) {
    console.error('Family login error:', error);
    res.status(500).json({ error: 'Server error during family login' });
  }
});

// Get all families (for admin purposes)
app.get('/api/families', async (req, res) => {
  try {
    const families = await dbAll('SELECT id, family_name, created_at FROM families ORDER BY family_name');
    
    // Get student count for each family
    const familiesWithCounts = await Promise.all(families.map(async (family) => {
      const count = await dbGet(
        'SELECT COUNT(*) as student_count FROM students WHERE family_id = ?',
        [family.id]
      );
      return { ...family, student_count: count.student_count };
    }));

    res.json({ success: true, families: familiesWithCounts });
  } catch (error) {
    console.error('Get families error:', error);
    res.status(500).json({ error: 'Server error fetching families' });
  }
});

// Create new family
app.post('/api/family/create', async (req, res) => {
  try {
    const { family_name, password } = req.body;

    if (!family_name || !password) {
      return res.status(400).json({ error: 'Family name and password required' });
    }

    // Check if family already exists
    const existing = await dbGet(
      'SELECT id FROM families WHERE family_name = ?',
      [family_name]
    );

    if (existing) {
      return res.status(400).json({ error: 'Family name already exists' });
    }

    // Create family
    const result = await dbRun(
      'INSERT INTO families (family_name, password) VALUES (?, ?)',
      [family_name, password]
    );

    res.json({
      success: true,
      family: {
        id: result.id,
        family_name
      }
    });
  } catch (error) {
    console.error('Create family error:', error);
    res.status(500).json({ error: 'Server error creating family' });
  }
});

// Add student to family
app.post('/api/family/add-student', async (req, res) => {
  try {
    const { family_id, name, grade_level, avatar } = req.body;

    if (!family_id || !name || !grade_level) {
      return res.status(400).json({ error: 'Family ID, name, and grade level required' });
    }

    // Verify family exists
    const family = await dbGet('SELECT id FROM families WHERE id = ?', [family_id]);
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }

    // Create student
    const result = await dbRun(
      'INSERT INTO students (family_id, name, grade_level, avatar, current_lesson) VALUES (?, ?, ?, ?, ?)',
      [family_id, name, grade_level, avatar || '👤', 1]
    );

    res.json({
      success: true,
      student: {
        id: result.id,
        family_id,
        name,
        grade_level,
        avatar: avatar || '👤',
        current_lesson: 1
      }
    });
  } catch (error) {
    console.error('Add student error:', error);
    res.status(500).json({ error: 'Server error adding student' });
  }
});

// ==================== STUDENT ROUTES ====================

// Create or login student
app.post('/api/student/login', async (req, res) => {
  try {
    const { username, name, grade_level, pin_code } = req.body;

    if (!username || !name) {
      return res.status(400).json({ error: 'Username and name required' });
    }

    // Check if student exists
    let student = await dbGet(
      'SELECT * FROM students WHERE username = ?',
      [username]
    );

    if (student) {
      // Verify PIN if provided
      if (pin_code && student.pin_code !== pin_code) {
        return res.status(401).json({ error: 'Invalid PIN' });
      }

      // Update last login
      await dbRun(
        'UPDATE students SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [student.id]
      );

      res.json({ 
        success: true, 
        student: {
          id: student.id,
          name: student.name,
          username: student.username,
          grade_level: student.grade_level
        },
        message: 'Welcome back!'
      });
    } else {
      // Create new student
      const result = await dbRun(
        'INSERT INTO students (username, name, grade_level, pin_code) VALUES (?, ?, ?, ?)',
        [username, name, grade_level, pin_code || null]
      );

      res.json({ 
        success: true, 
        student: {
          id: result.id,
          name,
          username,
          grade_level
        },
        message: 'Account created!'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Mark lesson as complete
app.post('/api/student/complete-lesson', async (req, res) => {
  try {
    const { student_id, grade_level, lesson_number, completed_at } = req.body;

    if (!student_id || !grade_level || !lesson_number) {
      return res.status(400).json({ error: 'Student ID, grade level, and lesson number required' });
    }

    // Insert or update lesson completion
    await dbRun(`
      INSERT INTO lesson_completions (student_id, grade_level, lesson_number, completed_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(student_id, grade_level, lesson_number) 
      DO UPDATE SET completed_at = ?, times_completed = times_completed + 1
    `, [student_id, grade_level, lesson_number, completed_at || new Date().toISOString(), completed_at || new Date().toISOString()]);

    // Update student's current lesson if this is their highest
    const currentLesson = await dbGet(
      'SELECT current_lesson FROM students WHERE id = ?',
      [student_id]
    );

    if (!currentLesson || lesson_number >= currentLesson.current_lesson) {
      await dbRun(
        'UPDATE students SET current_lesson = ? WHERE id = ?',
        [lesson_number + 1, student_id]
      );
    }

    res.json({ 
      success: true, 
      message: 'Lesson marked complete',
      next_lesson: lesson_number + 1
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Server error marking lesson complete' });
  }
});

// Get completed lessons for a student
app.get('/api/student/:id/completed-lessons/:grade', async (req, res) => {
  try {
    const completedLessons = await dbAll(
      'SELECT lesson_number, completed_at, times_completed FROM lesson_completions WHERE student_id = ? AND grade_level = ? ORDER BY lesson_number',
      [req.params.id, req.params.grade]
    );

    res.json({ 
      success: true, 
      completed: completedLessons.map(l => l.lesson_number),
      details: completedLessons
    });
  } catch (error) {
    console.error('Get completed lessons error:', error);
    res.status(500).json({ error: 'Server error fetching completed lessons' });
  }
});

// Get student profile
app.get('/api/student/:id', async (req, res) => {
  try {
    const student = await dbGet(
      'SELECT id, name, username, grade_level, created_at FROM students WHERE id = ?',
      [req.params.id]
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Get entry count
    const stats = await dbGet(
      'SELECT COUNT(*) as total_entries, SUM(word_count) as total_words FROM journal_entries WHERE student_id = ?',
      [req.params.id]
    );

    res.json({
      student,
      stats: {
        total_entries: stats.total_entries || 0,
        total_words: stats.total_words || 0
      }
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== JOURNAL ENTRY ROUTES ====================

// Save or update journal entry
app.post('/api/journal/save', async (req, res) => {
  try {
    const { 
      student_id, 
      grade, 
      lesson_number, 
      unit_number, 
      book_title, 
      entry_text 
    } = req.body;

    if (!student_id || !grade || !lesson_number || !entry_text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate word count
    const word_count = entry_text.trim().split(/\s+/).length;

    // Check if entry exists
    const existing = await dbGet(
      'SELECT id FROM journal_entries WHERE student_id = ? AND grade = ? AND lesson_number = ?',
      [student_id, grade, lesson_number]
    );

    let result;
    if (existing) {
      // Update existing entry
      result = await dbRun(
        `UPDATE journal_entries 
         SET entry_text = ?, word_count = ?, unit_number = ?, book_title = ?, 
             updated_at = CURRENT_TIMESTAMP, revised = 1
         WHERE id = ?`,
        [entry_text, word_count, unit_number, book_title, existing.id]
      );
      
      res.json({ 
        success: true, 
        entry_id: existing.id,
        updated: true,
        word_count 
      });
    } else {
      // Create new entry
      result = await dbRun(
        `INSERT INTO journal_entries 
         (student_id, grade, lesson_number, unit_number, book_title, entry_text, word_count)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [student_id, grade, lesson_number, unit_number, book_title, entry_text, word_count]
      );

      res.json({ 
        success: true, 
        entry_id: result.id,
        created: true,
        word_count 
      });
    }
  } catch (error) {
    console.error('Save entry error:', error);
    res.status(500).json({ error: 'Server error saving entry' });
  }
});

// Get specific entry
app.get('/api/journal/entry/:student_id/:grade/:lesson_number', async (req, res) => {
  try {
    const entry = await dbGet(
      `SELECT * FROM journal_entries 
       WHERE student_id = ? AND grade = ? AND lesson_number = ?`,
      [req.params.student_id, req.params.grade, req.params.lesson_number]
    );

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Get entry error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all entries for a student
app.get('/api/journal/student/:student_id', async (req, res) => {
  try {
    const { grade, unit, book_title } = req.query;
    let sql = 'SELECT * FROM journal_entries WHERE student_id = ?';
    const params = [req.params.student_id];

    if (grade) {
      sql += ' AND grade = ?';
      params.push(grade);
    }

    if (unit) {
      sql += ' AND unit_number = ?';
      params.push(unit);
    }

    if (book_title) {
      sql += ' AND book_title = ?';
      params.push(book_title);
    }

    sql += ' ORDER BY lesson_number ASC';

    const entries = await dbAll(sql, params);

    res.json({
      entries,
      count: entries.length,
      total_words: entries.reduce((sum, e) => sum + (e.word_count || 0), 0)
    });
  } catch (error) {
    console.error('Get entries error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get entries by book
app.get('/api/journal/book/:student_id/:book_title', async (req, res) => {
  try {
    const entries = await dbAll(
      `SELECT * FROM journal_entries 
       WHERE student_id = ? AND book_title = ?
       ORDER BY lesson_number ASC`,
      [req.params.student_id, req.params.book_title]
    );

    // Get student name
    const student = await dbGet(
      'SELECT name FROM students WHERE id = ?',
      [req.params.student_id]
    );

    res.json({
      student_name: student ? student.name : 'Unknown',
      book_title: req.params.book_title,
      entries: entries.map(e => ({
        lesson: e.lesson_number,
        date: e.entry_date,
        text: e.entry_text,
        word_count: e.word_count
      })),
      total_entries: entries.length,
      total_words: entries.reduce((sum, e) => sum + (e.word_count || 0), 0)
    });
  } catch (error) {
    console.error('Get book entries error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update entry
app.put('/api/journal/entry/:id', async (req, res) => {
  try {
    const { entry_text } = req.body;

    if (!entry_text) {
      return res.status(400).json({ error: 'Entry text required' });
    }

    const word_count = entry_text.trim().split(/\s+/).length;

    await dbRun(
      `UPDATE journal_entries 
       SET entry_text = ?, word_count = ?, updated_at = CURRENT_TIMESTAMP, revised = 1
       WHERE id = ?`,
      [entry_text, word_count, req.params.id]
    );

    res.json({ success: true, word_count });
  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete entry
app.delete('/api/journal/entry/:id', async (req, res) => {
  try {
    await dbRun('DELETE FROM journal_entries WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== PROMPT ROUTES ====================

// Get prompt for lesson
app.get('/api/prompt/:grade/:lesson_number', async (req, res) => {
  try {
    const prompt = await dbGet(
      'SELECT prompt_text FROM journal_prompts WHERE grade = ? AND lesson_number = ?',
      [req.params.grade, req.params.lesson_number]
    );

    if (!prompt) {
      return res.json({ prompt_text: 'Write about what you read today.' });
    }

    res.json(prompt);
  } catch (error) {
    console.error('Get prompt error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BedrockELA Journal API running on port ${PORT}`);
  console.log(`📍 Database: ${dbPath}`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
