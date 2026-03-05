#!/usr/bin/env node
/**
 * Remove repeated "Informational Text" headers from Part 2 and question pages
 * Keep only on Part 1 to save space
 */

const fs = require('fs');

let updated = 0;

for (let day = 1; day <= 180; day++) {
  const file = `6th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  
  // Remove h2 from Part 2 (keep h3 with specific topic)
  html = html.replace(
    /(\/\/ Page \d+: Informational Text - Reading \(Part 2\)[\s\S]*?<div class="lesson-page-card content-page">)\s*<h2>(?:📰 )?Informational Text<\/h2>\s*(<h3[^>]*>[^<]+<\/h3>)/g,
    '$1\n                            $2'
  );
  
  // Remove h2 from question pages (Question 1, 2, 3)
  html = html.replace(
    /(\/\/ Page \d+: Informational Text - Question \d+[\s\S]*?<div class="lesson-page-card content-page">)\s*<h2>(?:📰 )?Informational Text<\/h2>\s*(<p)/g,
    '$1\n                            $2'
  );
  
  if (html !== original) {
    fs.writeFileSync(file, html);
    updated++;
  }
}

console.log(`✅ Updated ${updated} files - removed Informational Text headers from pages 2+`);
