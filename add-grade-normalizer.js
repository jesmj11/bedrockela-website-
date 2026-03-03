/**
 * Add grade normalizer script to all lessons
 * Must load BEFORE offline-sync to fix gradeLevel format
 */

const fs = require('fs');
const path = require('path');

const gradePatterns = [
  /^1st-grade-lesson-\d+\.html$/,
  /^2nd-grade-lesson-\d+-REVISED\.html$/,
  /^3rd-grade-lesson-\d+-REVISED\.html$/,
  /^4th-grade-day-\d+\.html$/,
  /^5th-grade-day-\d+\.html$/,
  /^6th-grade-day-\d+\.html$/
];

const allFiles = fs.readdirSync(__dirname);
const lessonFiles = allFiles.filter(file => {
  return gradePatterns.some(pattern => pattern.test(file));
});

console.log(`Found ${lessonFiles.length} lessons to update\n`);

let updated = 0;

lessonFiles.forEach(filename => {
  const filepath = path.join(__dirname, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Check if already has grade-normalizer.js
  if (content.includes('grade-normalizer.js')) {
    return;
  }
  
  // Add script BEFORE offline-sync.js
  if (content.includes('offline-sync.js')) {
    content = content.replace(
      '<script src="js/offline-sync.js"></script>',
      `<script src="js/grade-normalizer.js"></script>
    <script src="js/offline-sync.js"></script>`
    );
    
    fs.writeFileSync(filepath, content, 'utf8');
    updated++;
    
    if (updated % 50 === 0) {
      console.log(`Updated ${updated} lessons...`);
    }
  }
});

console.log(`\n✅ Added grade normalizer to ${updated} lessons!`);
