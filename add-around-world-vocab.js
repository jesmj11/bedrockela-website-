#!/usr/bin/env node
/**
 * Add Around the World in 80 Days vocabulary to 4th grade days 61-90
 * 37 chapters across 24 regular lesson days
 */

const fs = require('fs');

// Around the World vocab by chapter
const vocabByChapter = {
  1: ['punctual', 'eccentric'], 2: ['methodical', 'composure'], 3: ['wager', 'audacious'],
  4: ['astound', 'itinerary'], 5: ['speculation', 'notorious'], 6: ['impatience', 'surveillance'],
  7: ['passport', 'bureaucratic'], 8: ['prudent', 'indiscreet'], 9: ['traversed', 'resolute'],
  10: ['dismayed', 'venerable'], 11: ['fabulous', 'negotiate'], 12: ['treacherous', 'persevere'],
  13: ['valor', 'suttee'], 14: ['serene', 'tributary'], 15: ['expenditure', 'accumulated'],
  16: ['perplexed', 'obstinate'], 17: ['turbulent', 'provoke'], 18: ['coincidence', 'discretion'],
  19: ['meddle', 'dilemma'], 20: ['confrontation', 'warrant'], 21: ['precarious', 'tempest'],
  22: ['antipodes', 'resourceful'], 23: ['exaggerate', 'gullible'], 24: ['monotonous', 'traverse'],
  25: ['bustling', 'rally'], 26: ['locomotive', 'vast'], 27: ['polygamy', 'doctrine'],
  28: ['frenzy', 'futile'], 29: ['audacity', 'perilous'], 30: ['obligation', 'gallant'],
  31: ['remorse', 'amends'], 32: ['adversity', 'tenacious'], 33: ['ingenuity', 'impromptu'],
  34: ['anguish', 'inevitable'], 35: ['resignation', 'steadfast'], 36: ['vindicated', 'triumphant'],
  37: ['paradox', 'contentment']
};

// Map days to chapters (37 chapters, 24 regular days)
// Distribute evenly: ~1.5 chapters per day
const dayToChapter = {
  61: 1, 62: 2, 63: 3, 64: 4, 66: 5, 67: 6, 68: 7, 69: 8,
  71: 9, 72: 10, 73: 11, 74: 12, 76: 13, 77: 14, 78: 15, 79: 16,
  81: 17, 82: 18, 83: 20, 84: 22, 86: 24, 87: 26, 88: 29, 89: 32
};

// Fill in remaining chapters more densely
const fullMapping = {
  61: 1, 62: 2, 63: 3, 64: 4,
  66: 6, 67: 7, 68: 9, 69: 11,
  71: 13, 72: 15, 73: 17, 74: 19,
  76: 21, 77: 23, 78: 25, 79: 27,
  81: 29, 82: 31, 83: 33, 84: 34,
  86: 35, 87: 36, 88: 37, 89: 37
};

let updated = 0;

for (let day = 61; day <= 90; day++) {
  const file = `4th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const chapter = fullMapping[day];
  if (!chapter) continue;
  
  const vocab = vocabByChapter[chapter];
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
  console.log(`Day ${day} (Ch ${chapter}): ${vocab[0]}, ${vocab[1]}`);
}

console.log(`\n✅ Around the World in 80 Days vocabulary added to ${updated} lessons!`);
