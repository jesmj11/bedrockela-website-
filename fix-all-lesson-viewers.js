#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.')
  .filter(f => f.match(/^\d+(st|nd|rd|th)-grade-day-\d+\.html$/));

console.log(`🔧 Fixing ${files.length} lesson files...\n`);

let fixed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix the initLessonViewer call to include container ID
  const updated = content.replace(
    /if \(typeof initLessonViewer === 'function'\) \{\s*initLessonViewer\(lesson1Config\);\s*\}/g,
    "if (typeof initLessonViewer === 'function') {\n            initLessonViewer('lesson-container', lesson1Config);\n        }"
  );
  
  if (updated !== content) {
    fs.writeFileSync(file, updated);
    fixed++;
    if (fixed % 50 === 0) {
      console.log(`  ✓ Fixed ${fixed} files...`);
    }
  }
});

console.log(`\n✅ Fixed ${fixed} lesson files!`);
