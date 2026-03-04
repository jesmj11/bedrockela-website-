#!/usr/bin/env node

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkStudents() {
  console.log('🔍 Checking Firebase students...\n');
  
  const studentsRef = db.collection('students');
  const snapshot = await studentsRef.get();
  
  if (snapshot.empty) {
    console.log('❌ No students found in Firebase!');
    return;
  }
  
  console.log(`✅ Found ${snapshot.size} students:\n`);
  
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`  Name: ${data.name}`);
    console.log(`  Username: ${data.username}`);
    console.log(`  Grade: ${data.gradeLevel}`);
    console.log(`  Current Lesson: ${data.currentLesson || 'NOT SET!'}`);
    console.log(`  Completed: ${(data.completedLessons || []).length} lessons`);
    console.log('');
  });
}

checkStudents()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
