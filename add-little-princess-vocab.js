#!/usr/bin/env node
/**
 * Add A Little Princess vocabulary to 3rd grade days 121-150
 * 19 chapters across 30 days (24 regular lesson days, 6 assessments)
 */

const fs = require('fs');

// A Little Princess vocabulary: 2 words per chapter
const vocabByChapter = {
  1: ['forlorn', 'quaint'],
  2: ['fluent', 'condescending'],
  3: ['timid', 'solidarity'],
  4: ['tantrum', 'composure'],
  5: ['drudgery', 'wistful'],
  6: ['speculation', 'lavish'],
  7: ['desolation', 'bewildered'],
  8: ['garret', 'privation'],
  9: ['companionship', 'vermin'],
  10: ['melancholy', 'adjacent'],
  11: ['emaciated', 'mystified'],
  12: ['vicinity', 'intrigue'],
  13: ['degradation', 'imperious'],
  14: ['stealthy', 'transformation'],
  15: ['opulent', 'benevolent'],
  16: ['astounded', 'restitution'],
  17: ['revelation', 'remorse'],
  18: ['resilience', 'dignified'],
  19: ['benevolence', 'contentment']
};

// Map days 121-150 to chapters (skip assessments at 125, 130, 135, 140, 145, 150)
// 19 chapters across 24 regular lesson days
// Chapters 1-5 get 2 days each (10 days), chapters 6-19 get 1 day each (14 days)
const dayToChapter = {
  121: 1,
  122: 1,
  123: 2,
  124: 2,
  // 125: assessment
  126: 3,
  127: 3,
  128: 4,
  129: 4,
  // 130: assessment
  131: 5,
  132: 5,
  133: 6,
  134: 7,
  // 135: assessment
  136: 8,
  137: 9,
  138: 10,
  139: 11,
  // 140: assessment
  141: 12,
  142: 13,
  143: 14,
  144: 15,
  // 145: assessment
  146: 16,
  147: 17,
  148: 18,
  149: 19
  // 150: assessment
};

let updated = 0;

for (let day = 121; day <= 150; day++) {
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

console.log(`\n✅ A Little Princess vocabulary added to ${updated} lessons!`);
