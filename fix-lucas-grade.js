#!/usr/bin/env node

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fixLucasGrade() {
  console.log('🔧 Fixing Lucas grade...\n');
  
  // Fix the student with username "gus14"
  const studentsRef = db.collection('students');
  const query = await studentsRef.where('username', '==', 'gus14').get();
  
  if (query.empty) {
    console.log('❌ Student gus14 not found!');
    return;
  }
  
  const studentDoc = query.docs[0];
  await studentDoc.ref.update({
    gradeLevel: '6th Grade'
  });
  
  console.log('✅ Fixed! Lucas (gus14) now has gradeLevel: "6th Grade"');
}

fixLucasGrade()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
