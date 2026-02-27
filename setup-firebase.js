#!/usr/bin/env node

/**
 * BedrockELA Firebase Setup Script
 * Fixes Firestore rules and creates student documents
 */

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const db = admin.firestore();

async function setupFirestoreRules() {
  console.log('📋 Setting up Firestore security rules...');
  
  // Note: You need to update rules in Firebase Console or use Firebase CLI
  // firebase-admin SDK doesn't support updating rules directly
  
  console.log('⚠️  Firestore rules must be updated manually in Firebase Console:');
  console.log('');
  console.log('Go to: https://console.firebase.google.com/project/bedrockela-96dbd/firestore/rules');
  console.log('');
  console.log('Paste this:');
  console.log('');
  console.log(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{student} {
      allow read, write: if true;
    }
    match /families/{family} {
      allow read, write: if true;
    }
  }
}`);
  console.log('');
}

async function createStudent(data) {
  const { username, name, gradeLevel, pin } = data;
  
  try {
    // Check if student already exists
    const studentsRef = db.collection('students');
    const query = await studentsRef.where('username', '==', username).get();
    
    if (!query.empty) {
      const existingStudent = query.docs[0];
      console.log(`✅ Student "${name}" already exists (ID: ${existingStudent.id})`);
      return existingStudent.id;
    }
    
    // Create new student
    const studentData = {
      username: username.toLowerCase(),
      name,
      gradeLevel,
      currentLesson: 1,
      completedLessons: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    if (pin) {
      studentData.pin = pin;
    }
    
    const docRef = await studentsRef.add(studentData);
    console.log(`✅ Created student "${name}" (ID: ${docRef.id})`);
    return docRef.id;
    
  } catch (error) {
    console.error(`❌ Error creating student "${name}":`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🐉 BedrockELA Firebase Setup\n');
  
  // Step 1: Display rules instructions
  await setupFirestoreRules();
  
  // Step 2: Create default students
  console.log('\n👥 Creating student accounts...\n');
  
  const students = [
    { username: 'asher', name: 'Asher', gradeLevel: '4th Grade', pin: '' },
    { username: 'lucas', name: 'Lucas', gradeLevel: '6th Grade', pin: '' },
    { username: 'emmett', name: 'Emmett', gradeLevel: '1st Grade', pin: '' }
  ];
  
  for (const student of students) {
    await createStudent(student);
  }
  
  console.log('\n✅ Setup complete!\n');
  console.log('Next steps:');
  console.log('1. Update Firestore rules in Firebase Console (see above)');
  console.log('2. Refresh the BedrockELA website');
  console.log('3. Log in with username (e.g., "asher")');
  
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
