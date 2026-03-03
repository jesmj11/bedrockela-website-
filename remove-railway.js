/**
 * Remove all Railway backend references
 * Replace with Firebase-only approach
 */

const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  // HTML files
  'add-students.html',
  'family-manage-students.html',
  'parent-dashboard-live.html',
  'parent-login.html',
  'parent-signup.html',
  'password-reset.html',
  'student-dashboard-live.html',
  'student-picker.html',
  'student-progress.html',
  // JS files
  'js/digital-book-backup.js',
  'js/digital-book-enhanced.js',
  'js/lesson-completion.js'
];

console.log('Removing Railway references...\n');

let updated = 0;

filesToUpdate.forEach(filename => {
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  Skipped: ${filename} (file not found)`);
    return;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;
  
  // Pattern 1: const API_URL = ... ? ... : 'railway.app';
  const pattern1 = /const\s+API_URL\s*=\s*[^;]+railway\.app[^;]+;/g;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, '// Railway backend removed - using Firebase only');
    modified = true;
  }
  
  // Pattern 2: const BACKEND_API = 'railway.app';
  const pattern2 = /const\s+BACKEND_API\s*=\s*'[^']*railway\.app[^']*';/g;
  if (pattern2.test(content)) {
    content = content.replace(pattern2, '// Railway backend removed - using Firebase only');
    modified = true;
  }
  
  // Pattern 3: : 'railway.app'
  const pattern3 = /:\s*'https:\/\/[^']*railway\.app[^']*'/g;
  if (pattern3.test(content)) {
    content = content.replace(pattern3, ': null // Railway removed - use Firebase');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    updated++;
    console.log(`✅ ${filename}`);
  } else {
    console.log(`⚪ ${filename} (no changes needed)`);
  }
});

console.log(`\n✅ Removed Railway from ${updated} files!`);
console.log('\n📝 NOTE: These files may need manual Firebase integration:');
console.log('   - Parent login/signup pages');
console.log('   - Student management pages');
console.log('   - Dashboard pages');
console.log('\n💡 All lesson functionality now uses Firebase + localStorage!');
