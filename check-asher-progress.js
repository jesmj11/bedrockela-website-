/**
 * Check Asher's progress in Firebase
 */

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bedrockela-96dbd.firebaseio.com'
});

const db = admin.firestore();

async function checkProgress() {
  try {
    // Asher's username is ashj16
    const studentsRef = db.collection('students');
    const snapshot = await studentsRef.where('username', '==', 'ashj16').get();
    
    if (snapshot.empty) {
      console.log('❌ Asher (ashj16) not found in database');
      return;
    }
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('\n📊 Asher\'s Student Record:');
      console.log('  ID:', doc.id);
      console.log('  Username:', data.username);
      console.log('  Grade:', data.gradeLevel);
      console.log('  Last Active:', data.lastActive);
      console.log('  Completed Lessons:', data.completedLessons || []);
      console.log('  Current Lesson:', data.currentLesson || 1);
      console.log('\n  Progress data:', JSON.stringify(data.progress || {}, null, 2));
    });
    
  } catch (error) {
    console.error('Error checking progress:', error);
  }
  
  process.exit(0);
}

checkProgress();
