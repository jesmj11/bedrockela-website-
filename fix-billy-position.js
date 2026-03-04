/**
 * Move Billy up so he doesn't overlap with the Next button
 */

const fs = require('fs');

// Get all lesson files
const lessonFiles = fs.readdirSync('.').filter(f => 
  /^(1st|2nd|3rd|4th|5th|6th)-grade-day-\d+\.html$/.test(f)
);

console.log(`Moving Billy up in ${lessonFiles.length} lesson files...`);

let fixedCount = 0;

for (const file of lessonFiles) {
  let html = fs.readFileSync(file, 'utf8');
  
  // Move Billy from bottom: 24px to bottom: 100px
  const before = html;
  html = html.replace(
    'bottom: 24px;',
    'bottom: 100px;'
  );
  
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount} files`);
console.log(`\nBilly is now positioned higher, clear of the Next button!`);
