// Initialize test students in PostgreSQL database
// Run this once to populate the database with test data

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initTestStudents() {
  try {
    console.log('🔧 Initializing test students...');

    // Check if students already exist
    const existing = await pool.query('SELECT COUNT(*) FROM students');
    if (existing.rows[0].count > 0) {
      console.log('⚠️  Students already exist, skipping initialization');
      process.exit(0);
    }

    // Add test students
    const students = [
      { name: 'Emmett', username: 'emmett', grade_level: '1st', pin_code: '2020' },
      { name: 'Asher', username: 'asher', grade_level: '4th', pin_code: '1111' },
      { name: 'Lucas', username: 'lucas', grade_level: '6th', pin_code: '2222' },
      { name: 'Levi', username: 'levi', grade_level: '8th', pin_code: '3333' },
      { name: 'Riley', username: 'riley', grade_level: '9th', pin_code: '4444' },
      { name: 'Bryton', username: 'bryton', grade_level: '11th', pin_code: '5555' }
    ];

    for (const student of students) {
      await pool.query(
        'INSERT INTO students (name, username, grade_level, pin_code, current_lesson) VALUES ($1, $2, $3, $4, 1)',
        [student.name, student.username, student.grade_level, student.pin_code]
      );
      console.log(`✅ Added ${student.name} (${student.grade_level} grade)`);
    }

    console.log('✨ Test students initialized successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error initializing test students:', error);
    process.exit(1);
  }
}

initTestStudents();
