#!/usr/bin/env node
/**
 * Reset 3rd grade vocab to placeholders (removing Charlotte's Web vocab)
 * Awaiting new vocab from the new books
 */

const fs = require('fs');

let updated = 0;

for (let day = 1; day <= 180; day++) {
  const file = `3rd-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  
  // Replace vocab word 1 with placeholder
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]{0,500}?id="vocab-1")/,
    `$1[Vocabulary Word 1]$2`
  );
  
  // Replace vocab word 2 with placeholder
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]{0,500}?id="vocab-2")/,
    `$1[Vocabulary Word 2]$2`
  );
  
  if (html !== original) {
    fs.writeFileSync(file, html);
    updated++;
  }
}

console.log(`✅ Reset vocabulary to placeholders in ${updated} lessons`);
console.log('⏳ Ready for new vocabulary from public domain books');
