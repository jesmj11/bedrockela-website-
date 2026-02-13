// Initialize SQLite Database for BedrockELA Journals
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'journal.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️  Initializing BedrockELA Journal Database...');

db.serialize(() => {
  // Create students table
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT UNIQUE,
      grade_level TEXT,
      pin_code TEXT,
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

  // Create journal_entries table
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

  // Create journal_prompts table
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

  // Create indexes for performance
  db.run('CREATE INDEX IF NOT EXISTS idx_entries_student ON journal_entries(student_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_entries_grade ON journal_entries(grade)');
  db.run('CREATE INDEX IF NOT EXISTS idx_entries_book ON journal_entries(book_title)');
  
  console.log('✅ Indexes created');
  
  // Insert sample prompts for 4th grade
  const prompts = [
    ['4th', 1, 'What happened in this chapter? What surprised you? What do you predict will happen next?'],
    ['4th', 2, 'How is the land of the Munchkins different from Kansas? If you were Dorothy, would you want to stay or go home? Why?'],
    ['4th', 3, 'What do you think of the Scarecrow so far? Do you think he really needs a brain? Explain.'],
    ['4th', 4, 'Compare the Scarecrow and the Tin Woodman. How are they similar? How are they different?'],
    ['4th', 5, 'What do you think of the Cowardly Lion so far? Do you think he is really a coward? Why or why not?']
  ];

  const insertPrompt = db.prepare('INSERT OR IGNORE INTO journal_prompts (grade, lesson_number, prompt_text) VALUES (?, ?, ?)');
  
  prompts.forEach(prompt => {
    insertPrompt.run(prompt);
  });
  
  insertPrompt.finalize();
  console.log('✅ Sample prompts inserted');
});

db.close(() => {
  console.log('🎉 Database initialization complete!');
  console.log('📍 Database location:', dbPath);
});
