/**
 * Fix Billy widget search - expose BR to window scope
 */

const fs = require('fs');

// Get all lesson files
const lessonFiles = fs.readdirSync('.').filter(f => 
  /^(1st|2nd|3rd|4th|5th|6th)-grade-day-\d+\.html$/.test(f)
);

console.log(`Fixing Billy search in ${lessonFiles.length} lesson files...`);

let fixedCount = 0;

for (const file of lessonFiles) {
  let html = fs.readFileSync(file, 'utf8');
  
  // Fix: const BR = (() => { to window.BR = (() => {
  const before = html;
  html = html.replace('const BR = (() => {', 'window.BR = (() => {');
  
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount} files`);
console.log(`\nBilly's dictionary search now works!`);
