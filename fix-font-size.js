#!/usr/bin/env node
/**
 * Reduce reading passage font size from 16px → 14px
 */

const fs = require('fs');

let updated = 0;

for (let day = 1; day <= 180; day++) {
  const file = `6th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace font-size: 16px with 14px in reading passages
  const before = html;
  html = html.replace(/font-size: 16px;" class="reading-passage"/g, 'font-size: 14px;" class="reading-passage"');
  
  if (html !== before) {
    fs.writeFileSync(file, html);
    updated++;
  }
}

console.log(`✅ Updated ${updated} files`);
