#!/usr/bin/env node
/**
 * Add Charlotte's Web vocabulary words to 3rd grade days 1-30 (FIXED)
 */

const fs = require('fs');

const vocabByChapter = {
  1: ['injustice', 'runt'],
  2: ['enchanted', 'stealthily'],
  3: ['captivity', 'persuade'],
  4: ['salutations', 'monotonous'],
  5: ['sedentary', 'vaguely'],
  6: ['gander', 'goslings'],
  7: ['smite', 'ominous'],
  8: ['hilarious', 'peculiar'],
  9: ['scheme', 'humble'],
  10: ['catastrophe', 'glistening'],
  11: ['miracle', 'astonished'],
  12: ['campaign', 'reluctant'],
  13: ['radiant', 'humble'],
  14: ['marvel', 'reassure'],
  15: ['languish', 'oppressive'],
  16: ['crate', 'reputation'],
  17: ['magnificent', 'boisterous'],
  18: ['versatile', 'sac'],
  19: ['humble', 'illustrious'],
  20: ['fatigue', 'triumph'],
  21: ['languishing', 'legacy'],
  22: ['aeronaut', 'successive']
};

const dayToChapter = {
  1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5,
  11: 6, 12: 6, 13: 7, 14: 7, 15: 8, 16: 9, 17: 10, 18: 11, 19: 12, 20: 13,
  21: 14, 22: 15, 23: 16, 24: 16, 25: 17, 26: 18, 27: 19, 28: 20, 29: 21, 30: 22
};

let updated = 0;

for (let day = 1; day <= 30; day++) {
  const file = `3rd-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const chapter = dayToChapter[day];
  const vocab = vocabByChapter[chapter];
  if (!vocab) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace FIRST occurrence of vocab word span (vocab-1)
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]{0,500}?id="vocab-1")/,
    `$1${vocab[0]}$2`
  );
  
  // Replace SECOND occurrence of vocab word span (vocab-2)
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]{0,500}?id="vocab-2")/,
    `$1${vocab[1]}$2`
  );
  
  fs.writeFileSync(file, html);
  updated++;
  console.log(`Day ${day} (Ch ${chapter}): ${vocab[0]}, ${vocab[1]}`);
}

console.log(`\n✅ Updated ${updated} lessons!`);
