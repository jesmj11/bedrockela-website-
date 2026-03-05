#!/usr/bin/env node
/**
 * Fix 6th grade formatting:
 * 1. Reduce reading font size from 16px → 14px
 * 2. Fix duplicate chapter titles (e.g., "Chapter 1: CHAPTER I" → "Chapter 1")
 */

const fs = require('fs');

let updated = 0;

for (let day = 1; day <= 180; day++) {
  const file = `6th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // 1. Reduce font size in reading passages from 16px → 14px
  const fontSizeRegex = /(<div[^>]*class="reading-passage"[^>]*font-size: )16px/g;
  if (html.match(fontSizeRegex)) {
    html = html.replace(fontSizeRegex, '$114px');
    changed = true;
  }
  
  // 2. Fix duplicate chapter titles
  // Pattern: "Chapter X: CHAPTER X" or "Chapter X: CHAPTER N" → "Chapter X"
  // Also handles Roman numerals: "Chapter 1: CHAPTER I" → "Chapter 1"
  const chapterDuplicateRegex = /(Chapter \d+): CHAPTER [IVX\d]+/g;
  if (html.match(chapterDuplicateRegex)) {
    html = html.replace(chapterDuplicateRegex, '$1');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, html);
    updated++;
  }
}

console.log(`✅ Updated ${updated} files`);
