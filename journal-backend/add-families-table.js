// Add Families table for student login
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'journal.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️  Adding Families table for student login...');

db.serialize(() => {
  
  // ========================================
  // FAMILIES TABLE (for student login)
  // ========================================
  db.run(`
    CREATE TABLE IF NOT EXISTS families (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      family_name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating families table:', err);
    } else {
      console.log('✅ Families table created');
    }
  });

  // Add family_id to students table
  db.run(`
    ALTER TABLE students ADD COLUMN family_id INTEGER REFERENCES families(id)
  `, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('❌ Error adding family_id:', err);
    } else {
      console.log('✅ family_id column added to students table');
    }
  });

  // Create index
  db.run('CREATE INDEX IF NOT EXISTS idx_students_family ON students(family_id)');
  console.log('✅ Index created');

  // ========================================
  // SAMPLE FAMILY DATA
  // ========================================
  db.run(`
    INSERT OR IGNORE INTO families (family_name, password)
    VALUES ('Johnson', 'johnson2026')
  `, (err) => {
    if (err) {
      console.error('❌ Error inserting sample family:', err);
    } else {
      console.log('✅ Sample family created (Johnson / johnson2026)');
      
      // Update existing students to belong to this family
      db.run(`
        UPDATE students 
        SET family_id = (SELECT id FROM families WHERE family_name = 'Johnson')
        WHERE username IN ('bryton_j', 'riley_j', 'levi_j')
      `, (err) => {
        if (err) {
          console.error('❌ Error linking students to family:', err);
        } else {
          console.log('✅ Students linked to Johnson family');
        }
      });
    }
  });
});

db.close(() => {
  console.log('\n🎉 Families table setup complete!');
  console.log('📍 Database location:', dbPath);
  console.log('\n🔐 Test Family:');
  console.log('   Family Name: Johnson');
  console.log('   Password: johnson2026');
  console.log('\n🚀 Ready for family login!');
});
