#!/usr/bin/env node
/**
 * Add Charlotte's Web vocabulary words to 3rd grade days 1-30
 * 22 chapters mapped across 30 days
 */

const fs = require('fs');

// Charlotte's Web vocabulary: 2 words per chapter
const vocabByChapter = {
  1: [
    { word: 'injustice', definition: 'unfairness; treating someone wrongly' },
    { word: 'runt', definition: 'the smallest and weakest animal in a litter' }
  ],
  2: [
    { word: 'enchanted', definition: 'filled with delight or wonder' },
    { word: 'stealthily', definition: 'moving quietly so as not to be noticed' }
  ],
  3: [
    { word: 'captivity', definition: 'the state of being kept in a pen or enclosure' },
    { word: 'persuade', definition: 'to convince someone to do something' }
  ],
  4: [
    { word: 'salutations', definition: 'greetings; a friendly opening word' },
    { word: 'monotonous', definition: 'dull and repetitive; always the same' }
  ],
  5: [
    { word: 'sedentary', definition: 'staying in one place; not active' },
    { word: 'vaguely', definition: 'in an unclear or uncertain way' }
  ],
  6: [
    { word: 'gander', definition: 'a male goose' },
    { word: 'goslings', definition: 'baby geese' }
  ],
  7: [
    { word: 'smite', definition: 'to hit or strike hard' },
    { word: 'ominous', definition: 'suggesting something bad is coming' }
  ],
  8: [
    { word: 'hilarious', definition: 'extremely funny' },
    { word: 'peculiar', definition: 'strange or unusual' }
  ],
  9: [
    { word: 'scheme', definition: 'a plan, often a clever or secret one' },
    { word: 'humble', definition: 'not proud; modest' }
  ],
  10: [
    { word: 'catastrophe', definition: 'a sudden disaster or terrible event' },
    { word: 'glistening', definition: 'shining with a sparkling light' }
  ],
  11: [
    { word: 'miracle', definition: 'an amazing event that seems impossible' },
    { word: 'astonished', definition: 'greatly surprised; shocked' }
  ],
  12: [
    { word: 'campaign', definition: 'an organized effort to achieve a goal' },
    { word: 'reluctant', definition: 'unwilling; hesitant to do something' }
  ],
  13: [
    { word: 'radiant', definition: 'glowing; bright and beautiful' },
    { word: 'humble', definition: 'low; not boastful' }
  ],
  14: [
    { word: 'marvel', definition: 'something wonderful or amazing' },
    { word: 'reassure', definition: 'to comfort someone who is worried' }
  ],
  15: [
    { word: 'languish', definition: 'to grow weak or dull; to lose energy' },
    { word: 'oppressive', definition: 'heavy; causing a feeling of burden' }
  ],
  16: [
    { word: 'crate', definition: 'a slatted wooden box used to transport animals' },
    { word: 'reputation', definition: 'what others think or say about you' }
  ],
  17: [
    { word: 'magnificent', definition: 'impressively grand or beautiful' },
    { word: 'boisterous', definition: 'loud, lively, and full of energy' }
  ],
  18: [
    { word: 'versatile', definition: 'able to do many different things' },
    { word: 'sac', definition: 'a pouch-like structure (like Charlotte\'s egg sac)' }
  ],
  19: [
    { word: 'humble', definition: 'modest; not showy' },
    { word: 'illustrious', definition: 'famous and respected' }
  ],
  20: [
    { word: 'fatigue', definition: 'extreme tiredness; exhaustion' },
    { word: 'triumph', definition: 'a great victory or achievement' }
  ],
  21: [
    { word: 'languishing', definition: 'becoming weak and fading' },
    { word: 'legacy', definition: 'something left behind that is remembered' }
  ],
  22: [
    { word: 'aeronaut', definition: 'a person (or creature) who travels through the air' },
    { word: 'successive', definition: 'following one after another in order' }
  ]
};

// Map days to chapters (30 days, 22 chapters)
const dayToChapter = {
  1: 1, 2: 1,
  3: 2, 4: 2,
  5: 3, 6: 3,
  7: 4, 8: 4,
  9: 5, 10: 5,
  11: 6, 12: 6,
  13: 7, 14: 7,
  15: 8,
  16: 9,
  17: 10,
  18: 11,
  19: 12,
  20: 13,
  21: 14,
  22: 15,
  23: 16, 24: 16,
  25: 17,
  26: 18,
  27: 19,
  28: 20,
  29: 21,
  30: 22
};

let updated = 0;

for (let day = 1; day <= 30; day++) {
  const file = `3rd-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const chapter = dayToChapter[day];
  const vocab = vocabByChapter[chapter];
  if (!vocab) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  
  // Replace the two vocabulary word placeholders
  // Find the vocab section and replace word 1 and word 2
  
  // Word 1
  const word1Regex = /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]*?Look up this word in a dictionary, then write the definition in your own words:[\s\S]*?<textarea[\s\S]*?id="vocab-1")/;
  if (html.match(word1Regex)) {
    html = html.replace(word1Regex, `$1${vocab[0].word}$2`);
  }
  
  // Word 2
  const word2Regex = /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]*?Look up this word in a dictionary, then write the definition in your own words:[\s\S]*?<textarea[\s\S]*?id="vocab-2")/;
  if (html.match(word2Regex)) {
    html = html.replace(word2Regex, `$1${vocab[1].word}$2`);
  }
  
  if (html !== original) {
    fs.writeFileSync(file, html);
    updated++;
    console.log(`Day ${day} (Ch ${chapter}): ${vocab[0].word}, ${vocab[1].word}`);
  }
}

console.log(`\n✅ Charlotte's Web vocabulary added to ${updated} lessons!`);
