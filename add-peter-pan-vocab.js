#!/usr/bin/env node
/**
 * Add Peter Pan vocabulary to 3rd grade lessons (Days 31-60)
 * 17 chapters, 2 words per chapter = 34 words
 * Days 31-60 (minus assessments on 35, 40, 45, 50, 55, 60) = 24 lesson days
 * Pattern: Some days get 1 chapter, some get 2 (17 chapters across 24 days)
 */

const fs = require('fs');

const vocabulary = {
  1: { words: ['contemptible', 'perdition'], defs: ['deserving scorn; worthy of being looked down on', 'complete ruin or destruction'] },
  2: { words: ['nimble', 'roguish'], defs: ['quick and light in movement', 'playfully mischievous'] },
  3: { words: ['indignant', 'iridescent'], defs: ['feeling anger at something unfair', 'showing shifting rainbow-like colors'] },
  4: { words: ['luminous', 'serene'], defs: ['giving off light; glowing', 'calm and peaceful'] },
  5: { words: ['treacherous', 'lagoon'], defs: ['dangerous and untrustworthy', 'a shallow body of water separated from the sea'] },
  6: { words: ['desolate', 'ingenious'], defs: ['empty and lonely; abandoned', 'clever and inventive'] },
  7: { words: ['precarious', 'subterranean'], defs: ['uncertain; not secure or stable', 'underground; beneath the surface'] },
  8: { words: ['plaintive', 'bravado'], defs: ['sounding sad and mournful', 'a show of courage that may be false'] },
  9: { words: ['valiant', 'buoyant'], defs: ['showing great courage; brave', 'able to float; cheerful and light'] },
  10: { words: ['domesticate', 'patronizing'], defs: ['to make comfortable in a home setting', 'treating someone as if they are inferior'] },
  11: { words: ['enthralled', 'sentiment'], defs: ['fascinated; completely captivated', 'a feeling or emotional thought'] },
  12: { words: ['sinister', 'captive'], defs: ['suggesting evil or harm', 'a person or creature held by force'] },
  13: { words: ['malicious', 'diminutive'], defs: ['intending to do harm; spiteful', 'very small in size'] },
  14: { words: ['formidable', 'menacing'], defs: ['inspiring fear or respect through power', 'threatening; suggesting danger'] },
  15: { words: ['dauntless', 'nemesis'], defs: ['fearless; not discouraged by danger', 'a long-standing rival or enemy'] },
  16: { words: ['melancholy', 'wistful'], defs: ['a deep, quiet sadness', 'longing for something lost or out of reach'] },
  17: { words: ['ephemeral', 'reminisce'], defs: ['lasting only a short time; fleeting', 'to think fondly about the past'] }
};

// Map chapters to lesson days (accounting for assessments)
const chapterToDays = {
  1: [31], 2: [32], 3: [33], 4: [34],
  5: [36], 6: [37], 7: [38], 8: [39],
  9: [41], 10: [42], 11: [43], 12: [44],
  13: [46], 14: [47], 15: [48], 16: [49],
  17: [51, 52, 53, 54, 56, 57, 58, 59] // Spread last chapter across remaining days
};

let updated = 0;

for (const [chapter, days] of Object.entries(chapterToDays)) {
  const vocab = vocabulary[chapter];
  if (!vocab) continue;
  
  for (const day of days) {
    const file = `3rd-grade-day-${day}.html`;
    if (!fs.existsSync(file)) continue;
    
    let html = fs.readFileSync(file, 'utf8');
    
    // Update word 1
    html = html.replace(
      /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>)/,
      `$1${vocab.words[0]}$2`
    );
    
    // Update word 2
    html = html.replace(
      /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>)/,
      (match, p1, p2, offset) => {
        // Only replace the second occurrence
        const firstIndex = html.indexOf(vocab.words[0]);
        if (offset > firstIndex + 100) {
          return `${p1}${vocab.words[1]}${p2}`;
        }
        return match;
      }
    );
    
    fs.writeFileSync(file, html);
    updated++;
    console.log(`✅ Day ${day}: ${vocab.words[0]}, ${vocab.words[1]}`);
  }
}

console.log(`\n✅ Updated ${updated} lessons with Peter Pan vocabulary!`);
