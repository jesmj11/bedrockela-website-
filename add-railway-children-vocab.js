#!/usr/bin/env node
/**
 * Add The Railway Children vocabulary to 3rd grade days 91-120
 * 15 chapters across 30 days (24 regular lesson days, 6 assessments)
 */

const fs = require('fs');

// The Railway Children vocabulary: 2 words per chapter
const vocabByChapter = {
  1: ['prosperous', 'disruption'],
  2: ['smoldering', 'contraband'],
  3: ['benefactor', 'dignified'],
  4: ['stealthy', 'indignant'],
  5: ['persecuted', 'exile'],
  6: ['peril', 'resourceful'],
  7: ['valour', 'commend'],
  8: ['reckless', 'soot'],
  9: ['patronage', 'mortified'],
  10: ['anguish', 'ominous'],
  11: ['frantic', 'treacherous'],
  12: ['destitute', 'humanitarian'],
  13: ['intricate', 'tenacious'],
  14: ['vindicated', 'perseverance'],
  15: ['reunion', 'radiant']
};

// Map days 91-120 to chapters (skip assessments at 95, 100, 105, 110, 115, 120)
// 15 chapters across 24 regular lesson days
// Chapters 1-9 get 2 days each (18 days), chapters 10-15 get 1 day each (6 days)
const dayToChapter = {
  91: 1,
  92: 1,
  93: 2,
  94: 2,
  // 95: assessment
  96: 3,
  97: 3,
  98: 4,
  99: 4,
  // 100: assessment
  101: 5,
  102: 5,
  103: 6,
  104: 6,
  // 105: assessment
  106: 7,
  107: 7,
  108: 8,
  109: 8,
  // 110: assessment
  111: 9,
  112: 9,
  113: 10,
  114: 11,
  // 115: assessment
  116: 12,
  117: 13,
  118: 14,
  119: 15
  // 120: assessment
};

let updated = 0;

for (let day = 91; day <= 120; day++) {
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

console.log(`\n✅ The Railway Children vocabulary added to ${updated} lessons!`);
