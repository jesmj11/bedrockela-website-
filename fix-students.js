#!/usr/bin/env node

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fixStudents() {
  try {
    console.log('🔧 Fixing student grade levels...\n');
    
    // Fix ashj16 (Asher with grade "4")
    const asherBad = await db.collection('students').doc('10U6aBaRHA7m0kXe1LCA').get();
    if (asherBad.exists) {
      await db.collection('students').doc('10U6aBaRHA7m0kXe1LCA').update({
        gradeLevel: '4th Grade'
      });
      console.log('✅ Fixed ashj16 → Grade: "4th Grade"');
    }
    
    // Fix emmj19 (Emmett with grade "1")
    const emmettBad = await db.collection('students').doc('IgUpkm8FTrWfcEGWrcg0').get();
    if (emmettBad.exists) {
      await db.collection('students').doc('IgUpkm8FTrWfcEGWrcg0').update({
        gradeLevel: '1st Grade'
      });
      console.log('✅ Fixed emmj19 → Grade: "1st Grade"');
    }
    
    console.log('\n🎉 All students fixed!\n');
    console.log('Now try logging in again at: https://bedrockela.com/student-login.html');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixStudents();
