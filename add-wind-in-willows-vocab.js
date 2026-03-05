#!/usr/bin/env node
/**
 * Add The Wind in the Willows vocabulary to 3rd grade days 1-30
 * 12 chapters, 2 days per chapter (24 regular lesson days)
 */

const fs = require('fs');

// The Wind in the Willows vocabulary: 2 words per chapter
const vocabByChapter = {
  1: ['sculling', 'luminous'],
  2: ['caravan', 'entranced'],
  3: ['treacherous', 'portly'],
  4: ['hospitality', 'warren'],
  5: ['pathos', 'imperious'],
  6: ['reformation', 'complacent'],
  7: ['reverence', 'ethereal'],
  8: ['cajole', 'impersonation'],
  9: ['wanderlust', 'listless'],
  10: ['audacity', 'retort'],
  11: ['stoat', 'indignant'],
  12: ['restitution', 'magnanimous']
};

// Map days to chapters (30 days, 12 chapters, skip assessments)
// 2 days per chapter
const dayToChapter = {
  1: 1, 2: 1,
  3: 2, 4: 2,
  // Day 5 is assessment
  6: 3, 7: 3,
  8: 4, 9: 4,
  // Day 10 is assessment
  11: 5, 12: 5,
  13: 6, 14: 6,
  // Day 15 is assessment
  16: 7, 17: 7,
  18: 8, 19: 8,
  // Day 20 is assessment
  21: 9, 22: 9,
  23: 10, 24: 10,
  // Day 25 is assessment
  26: 11, 27: 11,
  28: 12, 29: 12
  // Day 30 is assessment
};

let updated = 0;

for (let day = 1; day <= 30; day++) {
  const file = `3rd-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const chapter = dayToChapter[day];
  if (!chapter) continue; // Skip assessment days
  
  const vocab = vocabByChapter[chapter];
  if (!vocab) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace FIRST occurrence of vocab word span (vocab-1)
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)\[Vocabulary Word 1\](<\/span>[\s\S]{0,500}?id="vocab-1")/,
    `$1${vocab[0]}$2`
  );
  
  // Replace SECOND occurrence of vocab word span (vocab-2)
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)\[Vocabulary Word 2\](<\/span>[\s\S]{0,500}?id="vocab-2")/,
    `$1${vocab[1]}$2`
  );
  
  fs.writeFileSync(file, html);
  updated++;
  console.log(`Day ${day} (Ch ${chapter}): ${vocab[0]}, ${vocab[1]}`);
}

console.log(`\n✅ The Wind in the Willows vocabulary added to ${updated} lessons!`);
