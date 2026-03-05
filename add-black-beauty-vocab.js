#!/usr/bin/env node
/**
 * Add Black Beauty vocabulary to 4th grade days 91-120
 * 49 chapters across 24 regular lesson days
 */

const fs = require('fs');

// Black Beauty vocab by chapter
const vocabByChapter = {
  1: ['meadow', 'temperament'], 2: ['stampede', 'treacherous'], 3: ['bridle', 'submit'],
  4: ['groom', 'spacious'], 5: ['disposition', 'tranquil'], 6: ['frolic', 'exhilaration'],
  7: ['resentment', 'spirited'], 8: ['mistreat', 'endure'], 9: ['mischievous', 'reprimand'],
  10: ['injustice', 'humanity'], 11: ['candid', 'denounce'], 12: ['instinct', 'peril'],
  13: ['intoxicated', 'reckless'], 14: ['conscientious', 'competent'], 15: ['ostler', 'reminisce'],
  16: ['instinct', 'panic'], 17: ['integrity', 'steadfast'], 18: ['urgent', 'exhaustion'],
  19: ['ignorance', 'consequence'], 20: ['remorse', 'diligent'], 21: ['melancholy', 'farewell'],
  22: ['fashionable', 'vanity'], 23: ['rebellion', 'defiance'], 24: ['composure', 'gallant'],
  25: ['negligence', 'lame'], 26: ['lament', 'deteriorate'], 27: ['degradation', 'speculation'],
  28: ['merciful', 'harsh'], 29: ['incompetent', 'exasperated'], 30: ['cunning', 'suspicious'],
  31: ['pretentious', 'gullible'], 32: ['auctioneer', 'wretched'], 33: ['toil', 'weary'],
  34: ['veteran', 'valor'], 35: ['principled', 'conscientious'], 36: ['sabbath', 'resolve'],
  37: ['compassion', 'ethical'], 38: ['anticipation', 'contentment'], 39: ['exploit', 'poverty'],
  40: ['suffering', 'empathy'], 41: ['cruelty', 'indifferent'], 42: ['campaign', 'persuasion'],
  43: ['benevolent', 'intervene'], 44: ['successor', 'dignity'], 45: ['resolution', 'perseverance'],
  46: ['humane', 'reform'], 47: ['despair', 'resilience'], 48: ['recuperate', 'gratitude'],
  49: ['tranquility', 'cherish']
};

// Map days to chapters (49 chapters, 24 days = ~2 chapters per day)
const fullMapping = {
  91: 1, 92: 3, 93: 5, 94: 7,
  96: 9, 97: 11, 98: 13, 99: 15,
  101: 17, 102: 19, 103: 21, 104: 23,
  106: 25, 107: 27, 108: 29, 109: 31,
  111: 33, 112: 35, 113: 37, 114: 39,
  116: 41, 117: 43, 118: 45, 119: 47
};

let updated = 0;

for (let day = 91; day <= 120; day++) {
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

console.log(`\n✅ Black Beauty vocabulary added to ${updated} lessons!`);
