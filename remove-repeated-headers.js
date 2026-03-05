#!/usr/bin/env node
/**
 * Remove "Reading:" and "Chapter" headers from pages 2+ of each chapter
 * Keep only on first page to save space
 */

const fs = require('fs');

let updated = 0;

for (let day = 1; day <= 180; day++) {
  const file = `6th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Find all reading pages
  // Match: "// Reading Page X of Y" ... render function with h2 and h3
  const pageRegex = /(\/\/ Reading Page )(\d+)( of \d+[\s\S]*?render: \(\) => `[\s\S]*?<div class="lesson-page-card content-page">)\s*<h2>Reading: [^<]+<\/h2>\s*<h3[^>]*>Chapter \d+[^<]*<\/h3>\s*(<p style="font-size: 14px;)/g;
  
  html = html.replace(pageRegex, (match, prefix, pageNum, middle, after) => {
    const pageNumber = parseInt(pageNum);
    
    // Keep headers on page 1, remove from pages 2+
    if (pageNumber === 1) {
      return match; // Keep as-is
    } else {
      // Remove h2 and h3, keep everything else
      return prefix + pageNum + middle + '\n                            ' + after;
    }
  });
  
  if (html !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, html);
    updated++;
    changed = true;
  }
}

console.log(`✅ Updated ${updated} files - removed headers from pages 2+`);
