#!/usr/bin/env node

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkStudents() {
  try {
    const studentsRef = db.collection('students');
    const snapshot = await studentsRef.get();
    
    console.log('\n📚 Current Students:\n');
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`ID: ${doc.id}`);
      console.log(`  Name: ${data.name}`);
      console.log(`  Username: ${data.username}`);
      console.log(`  Grade Level: "${data.gradeLevel}" (type: ${typeof data.gradeLevel})`);
      console.log(`  Current Lesson: ${data.currentLesson}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkStudents();
