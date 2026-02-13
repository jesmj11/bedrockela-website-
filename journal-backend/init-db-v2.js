// Initialize SQLite Database for BedrockELA Journals + User Management
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, 'journal.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️  Initializing BedrockELA Database with User Management...');

db.serialize(() => {
  
  // ========================================
  // PARENTS/TEACHERS TABLE
  // ========================================
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
    if (err) {
      console.error('❌ Error creating parents table:', err);
    } else {
      console.log('✅ Parents table created');
    }
  });

  // ========================================
  // STUDENTS TABLE (updated with parent tracking)
  // ========================================
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
    if (err) {
      console.error('❌ Error creating students table:', err);
    } else {
      console.log('✅ Students table created');
    }
  });

  // ========================================
  // PARENT-STUDENT RELATIONSHIP TABLE
  // ========================================
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
    if (err) {
      console.error('❌ Error creating parent_students table:', err);
    } else {
      console.log('✅ Parent-student relationship table created');
    }
  });

  // ========================================
  // JOURNAL ENTRIES TABLE
  // ========================================
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
    if (err) {
      console.error('❌ Error creating journal_entries table:', err);
    } else {
      console.log('✅ Journal entries table created');
    }
  });

  // ========================================
  // JOURNAL PROMPTS TABLE
  // ========================================
  db.run(`
    CREATE TABLE IF NOT EXISTS journal_prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade TEXT NOT NULL,
      lesson_number INTEGER NOT NULL,
      prompt_text TEXT NOT NULL,
      
      UNIQUE(grade, lesson_number)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating journal_prompts table:', err);
    } else {
      console.log('✅ Journal prompts table created');
    }
  });

  // ========================================
  // INDEXES FOR PERFORMANCE
  // ========================================
  db.run('CREATE INDEX IF NOT EXISTS idx_parents_email ON parents(email)');
  db.run('CREATE INDEX IF NOT EXISTS idx_students_username ON students(username)');
  db.run('CREATE INDEX IF NOT EXISTS idx_parent_students_parent ON parent_students(parent_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_parent_students_student ON parent_students(student_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_entries_student ON journal_entries(student_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_entries_grade ON journal_entries(grade)');
  db.run('CREATE INDEX IF NOT EXISTS idx_entries_book ON journal_entries(book_title)');
  
  console.log('✅ Indexes created');

  // ========================================
  // SAMPLE DATA FOR TESTING
  // ========================================
  
  // Sample parent account: jes@example.com / password123
  bcrypt.hash('password123', 10, (err, hash) => {
    if (err) {
      console.error('❌ Error hashing password:', err);
    } else {
      db.run(`
        INSERT OR IGNORE INTO parents (email, password_hash, name, family_name, account_type)
        VALUES (?, ?, ?, ?, ?)
      `, ['jes@example.com', hash, 'Jes Johnson', 'Johnson Family', 'family'], (err) => {
        if (err) {
          console.error('❌ Error inserting sample parent:', err);
        } else {
          console.log('✅ Sample parent account created (jes@example.com / password123)');
          
          // Add sample students
          const students = [
            ['Bryton', 'bryton_j', '10th', '1234', 156],
            ['Riley', 'riley_j', '8th', '5678', 45],
            ['Levi', 'levi_j', '7th', '9012', 23]
          ];

          const insertStudent = db.prepare(`
            INSERT OR IGNORE INTO students (name, username, grade_level, pin_code, current_lesson)
            VALUES (?, ?, ?, ?, ?)
          `);

          students.forEach(student => {
            insertStudent.run(student);
          });

          insertStudent.finalize(() => {
            console.log('✅ Sample students created');

            // Link students to parent
            db.run(`
              INSERT OR IGNORE INTO parent_students (parent_id, student_id, relationship)
              SELECT 1, id, 'child' FROM students WHERE username IN ('bryton_j', 'riley_j', 'levi_j')
            `, (err) => {
              if (err) {
                console.error('❌ Error linking students to parent:', err);
              } else {
                console.log('✅ Students linked to parent');
              }
            });
          });
        }
      });
    }
  });

  // Sample journal prompts for 4th grade (first 10 lessons)
  const prompts = [
    ['4th', 1, 'What happened in this chapter? What surprised you? What do you predict will happen next?'],
    ['4th', 2, 'How is the land of the Munchkins different from Kansas? If you were Dorothy, would you want to stay or go home? Why?'],
    ['4th', 3, 'What do you think of the Scarecrow so far? Do you think he really needs a brain? Explain.'],
    ['4th', 4, 'Compare the Scarecrow and the Tin Woodman. How are they similar? How are they different?'],
    ['4th', 5, 'What do you think of the Cowardly Lion so far? Do you think he is really a coward? Why or why not?'],
    ['4th', 6, 'Describe your favorite scene from today\'s reading. Why did it stand out to you?'],
    ['4th', 7, 'What lesson do you think the author is trying to teach through this story?'],
    ['4th', 8, 'If you could ask one character one question, who would it be and what would you ask?'],
    ['4th', 9, 'How has the main character changed since the beginning of the story?'],
    ['4th', 10, 'What do you think will happen in the next chapter? Make a prediction and explain your reasoning.']
  ];

  const insertPrompt = db.prepare('INSERT OR IGNORE INTO journal_prompts (grade, lesson_number, prompt_text) VALUES (?, ?, ?)');
  
  prompts.forEach(prompt => {
    insertPrompt.run(prompt);
  });
  
  insertPrompt.finalize();
  console.log('✅ Sample journal prompts inserted');
});

db.close(() => {
  console.log('\n🎉 Database initialization complete!');
  console.log('📍 Database location:', dbPath);
  console.log('\n🔐 Test Accounts:');
  console.log('   Parent: jes@example.com / password123');
  console.log('   Students: bryton_j (PIN: 1234), riley_j (PIN: 5678), levi_j (PIN: 9012)');
  console.log('\n🚀 Ready to start the server!');
});
