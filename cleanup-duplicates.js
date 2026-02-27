#!/usr/bin/env node

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanupDuplicates() {
  try {
    console.log('🧹 Cleaning up duplicate students...\n');
    
    // Keep the original accounts (ashj16, emmj19, lucas)
    // Delete the duplicates I created (asher, emmett with different IDs)
    
    // Delete duplicate "asher" (ID: kYXRVzEr5pIwYt63prR0)
    console.log('Deleting duplicate: asher (kYXRVzEr5pIwYt63prR0)');
    await db.collection('students').doc('kYXRVzEr5pIwYt63prR0').delete();
    console.log('✅ Deleted');
    
    // Delete duplicate "emmett" (ID: GlDiwhNPTI7uQlggmAvM)
    console.log('Deleting duplicate: emmett (GlDiwhNPTI7uQlggmAvM)');
    await db.collection('students').doc('GlDiwhNPTI7uQlggmAvM').delete();
    console.log('✅ Deleted');
    
    console.log('\n🎉 Cleanup complete!\n');
    console.log('Remaining students:');
    console.log('  - ashj16 (Asher, 4th Grade)');
    console.log('  - emmj19 (Emmett, 1st Grade)');
    console.log('  - lucas (Lucas, 6th Grade)');
    
    // Verify remaining students
    console.log('\n📚 Verifying remaining students:\n');
    const snapshot = await db.collection('students').get();
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`✅ ${data.username} - ${data.name} (${data.gradeLevel})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanupDuplicates();
