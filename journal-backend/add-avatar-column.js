// Add avatar column to students table
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'journal.db');
const db = new sqlite3.Database(dbPath);

console.log('🎨 Adding avatar column to students table...');

db.serialize(() => {
  // Add avatar column
  db.run(`
    ALTER TABLE students ADD COLUMN avatar TEXT DEFAULT '👤'
  `, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('❌ Error adding avatar column:', err);
    } else {
      console.log('✅ avatar column added to students table');
    }
  });
});

db.close(() => {
  console.log('\n🎉 Avatar column added!');
  console.log('📍 Database location:', dbPath);
});
