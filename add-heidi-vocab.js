#!/usr/bin/env node
/**
 * Add Heidi vocabulary to 3rd grade days 61-90
 * 23 chapters across 30 days (24 regular lesson days, 6 assessments)
 */

const fs = require('fs');

// Heidi vocabulary: 2 words per chapter
const vocabByChapter = {
  1: ['trudge', 'alpine'],
  2: ['surly', 'hayloft'],
  3: ['frolic', 'pasture'],
  4: ['decrepit', 'plaintive'],
  5: ['bustling', 'reluctant'],
  6: ['governess', 'imposing'],
  7: ['indignant', 'mischievous'],
  8: ['bewildered', 'apparition'],
  9: ['stern', 'disconcerted'],
  10: ['compassion', 'consolation'],
  11: ['melancholy', 'yearn'],
  12: ['spectral', 'vigil'],
  13: ['homesick', 'frail'],
  14: ['devout', 'reverence'],
  15: ['resolved', 'anticipation'],
  16: ['convalescent', 'tranquil'],
  17: ['recompense', 'gratitude'],
  18: ['desolate', 'persevere'],
  19: ['persistent', 'earnest'],
  20: ['correspondence', 'longing'],
  21: ['vigorous', 'industrious'],
  22: ['astonishment', 'exertion'],
  23: ['bittersweet', 'cherish']
};

// Map days 61-90 to chapters (skip assessments at 65, 70, 75, 80, 85, 90)
// 23 chapters across 24 regular lesson days
// Most chapters get 1 day, chapter 23 gets 2 days (88-89)
const dayToChapter = {
  61: 1,
  62: 2,
  63: 3,
  64: 4,
  // 65: assessment
  66: 5,
  67: 6,
  68: 7,
  69: 8,
  // 70: assessment
  71: 9,
  72: 10,
  73: 11,
  74: 12,
  // 75: assessment
  76: 13,
  77: 14,
  78: 15,
  79: 16,
  // 80: assessment
  81: 17,
  82: 18,
  83: 19,
  84: 20,
  // 85: assessment
  86: 21,
  87: 22,
  88: 23,
  89: 23
  // 90: assessment
};

let updated = 0;

for (let day = 61; day <= 90; day++) {
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

console.log(`\n✅ Heidi vocabulary added to ${updated} lessons!`);
