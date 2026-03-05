#!/usr/bin/env node
/**
 * Add Sherlock Holmes vocabulary to 4th grade days 121-150
 * 12 stories across 24 regular lesson days (2 days per story)
 */

const fs = require('fs');

// Sherlock Holmes vocab by story
const vocabByStory = {
  1: ['discretion', 'disguise'],
  2: ['elaborate', 'vacancy'],
  3: ['suitor', 'forgery'],
  4: ['alibi', 'circumstantial'],
  5: ['ominous', 'vendetta'],
  6: ['opium', 'destitute'],
  7: ['carbuncle', 'plausible'],
  8: ['sinister', 'deduction'],
  9: ['hydraulic', 'treachery'],
  10: ['aristocrat', 'bigamy'],
  11: ['coronet', 'integrity'],
  12: ['governess', 'ominous']
};

// Map days to stories (12 stories, 24 days = 2 days per story)
const dayToStory = {
  121: 1, 122: 1,
  123: 2, 124: 2,
  126: 3, 127: 3,
  128: 4, 129: 4,
  131: 5, 132: 5,
  133: 6, 134: 6,
  136: 7, 137: 7,
  138: 8, 139: 8,
  141: 9, 142: 9,
  143: 10, 144: 10,
  146: 11, 147: 11,
  148: 12, 149: 12
};

let updated = 0;

for (let day = 121; day <= 150; day++) {
  const file = `4th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const story = dayToStory[day];
  if (!story) continue;
  
  const vocab = vocabByStory[story];
  if (!vocab) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #[0-9A-F]{6};">)\[Vocabulary Word 1\](<\/span>[\s\S]{0,500}?id="vocab-1")/i,
    `$1${vocab[0]}$2`
  );
  
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #[0-9A-F]{6};">)\[Vocabulary Word 2\](<\/span>[\s\S]{0,500}?id="vocab-2")/i,
    `$1${vocab[1]}$2`
  );
  
  fs.writeFileSync(file, html);
  updated++;
  console.log(`Day ${day} (Story ${story}): ${vocab[0]}, ${vocab[1]}`);
}

console.log(`\n✅ Sherlock Holmes vocabulary added to ${updated} lessons!`);
