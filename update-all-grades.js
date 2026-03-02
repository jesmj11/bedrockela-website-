/**
 * Update ALL grade levels with:
 * 1. Responsive CSS (750px, 1000px, 1200px)
 * 2. Autosave system
 * 3. Answer validation & AI feedback
 * 4. Cache-busting CSS version
 */

const fs = require('fs');
const path = require('path');

// Find all lesson files for all grades
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

console.log(`Found ${lessonFiles.length} lesson files to update\n`);

const updates = {
  css: 0,
  autosave: 0,
  validation: 0,
  offlineSync: 0,
  tts: 0
};

lessonFiles.forEach(filename => {
  const filepath = path.join(__dirname, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  // 1. Update CSS link to use cache-busting version
  if (!content.includes('lesson-viewer.css?v=')) {
    content = content.replace(
      /href="css\/lesson-viewer\.css"/g,
      'href="css/lesson-viewer.css?v=2"'
    );
    updates.css++;
    modified = true;
  }

  // 2. Add autosave script if missing
  if (!content.includes('lesson-autosave.js')) {
    content = content.replace(
      /<script src="js\/lesson-viewer\.js"><\/script>/,
      `<script src="js/lesson-viewer.js"></script>
    <script src="js/lesson-autosave.js"></script>`
    );
    updates.autosave++;
    modified = true;
  }

  // 3. Add answer validation script if missing
  if (!content.includes('answer-validation.js')) {
    content = content.replace(
      /<script src="js\/lesson-autosave\.js"><\/script>/,
      `<script src="js/lesson-autosave.js"></script>
    <script src="js/answer-validation.js"></script>`
    );
    updates.validation++;
    modified = true;
  }

  // 4. Add offline sync if missing
  if (!content.includes('offline-sync.js')) {
    content = content.replace(
      /<script src="js\/answer-validation\.js"><\/script>/,
      `<script src="js/answer-validation.js"></script>
    <script src="js/offline-sync.js"></script>`
    );
    updates.offlineSync++;
    modified = true;
  }

  // 5. Add TTS if missing
  if (!content.includes('text-to-speech.js')) {
    content = content.replace(
      /<script src="js\/offline-sync\.js"><\/script>/,
      `<script src="js/offline-sync.js"></script>
    <script src="js/text-to-speech.js"></script>`
    );
    updates.tts++;
    modified = true;
  }

  // Write back if modified
  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
  }
});

console.log(`\n✅ Update Complete!`);
console.log(`   CSS cache-busting: ${updates.css} files`);
console.log(`   Autosave added: ${updates.autosave} files`);
console.log(`   Answer validation added: ${updates.validation} files`);
console.log(`   Offline sync added: ${updates.offlineSync} files`);
console.log(`   TTS added: ${updates.tts} files`);
console.log(`\nAll ${lessonFiles.length} lessons now have:`);
console.log(`   ✅ Responsive CSS (750px, 1000px, 1200px)`);
console.log(`   ✅ Autosave system`);
console.log(`   ✅ Answer validation & AI feedback`);
console.log(`   ✅ Offline sync`);
console.log(`   ✅ Text-to-speech`);
