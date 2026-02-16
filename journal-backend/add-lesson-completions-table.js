// Add lesson_completions table
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'journal.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️  Adding lesson_completions table...');

db.serialize(() => {
  
  // ========================================
  // LESSON COMPLETIONS TABLE
  // ========================================
  db.run(`
    CREATE TABLE IF NOT EXISTS lesson_completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      grade_level TEXT NOT NULL,
      lesson_number INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      times_completed INTEGER DEFAULT 1,
      
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      UNIQUE(student_id, grade_level, lesson_number)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating lesson_completions table:', err);
    } else {
      console.log('✅ lesson_completions table created');
    }
  });

  // Create indexes
  db.run('CREATE INDEX IF NOT EXISTS idx_completions_student ON lesson_completions(student_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_completions_grade ON lesson_completions(grade_level)');
  db.run('CREATE INDEX IF NOT EXISTS idx_completions_lesson ON lesson_completions(lesson_number)');
  
  console.log('✅ Indexes created');
});

db.close(() => {
  console.log('\n🎉 lesson_completions table setup complete!');
  console.log('📍 Database location:', dbPath);
  console.log('\n📊 This table tracks:');
  console.log('   - Which lessons each student completed');
  console.log('   - When they completed them');
  console.log('   - How many times they reviewed');
  console.log('\n🚀 Ready to track lesson progress!');
});
