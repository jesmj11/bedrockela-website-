#!/usr/bin/env node
/**
 * Add The Secret Garden vocabulary to 3rd grade lessons (Days 151-180)
 * 27 chapters, 2 words per chapter = 54 words
 * Days 151-180 (minus assessments on 155, 160, 165, 170, 175, 180) = 24 lesson days
 * Pattern: Distribute 27 chapters across 24 days (some days get 1 chapter, some get 2)
 */

const fs = require('fs');

const vocabulary = {
  1: { words: ['cholera', 'disagreeable'], defs: ['a serious infectious disease spread through contaminated water', 'unpleasant and bad-tempered in manner'] },
  2: { words: ['contrary', 'ayah'], defs: ['stubbornly opposed; doing the opposite of what is expected', 'a native nursemaid or maid in India'] },
  3: { words: ['moor', 'desolate'], defs: ['a wide, open stretch of wild land with few trees', 'empty, bleak, and without comfort'] },
  4: { words: ['dialect', 'hearty'], defs: ['a regional form of a language with distinct words and pronunciation', 'warm, enthusiastic, and full of energy'] },
  5: { words: ['corridor', 'eerie'], defs: ['a long hallway connecting rooms in a building', 'strange and unsettling; mysteriously frightening'] },
  6: { words: ['indignant', 'smoldering'], defs: ['feeling anger at something perceived as unfair', 'burning slowly beneath the surface'] },
  7: { words: ['concealed', 'impulsive'], defs: ['hidden from view; kept out of sight', 'acting suddenly without thinking things through'] },
  8: { words: ['instinct', 'beckoning'], defs: ['a natural, inborn tendency to behave a certain way', 'signaling or gesturing for someone to come closer'] },
  9: { words: ['neglected', 'vast'], defs: ['not cared for; left to deteriorate over time', 'extremely large in size or extent'] },
  10: { words: ['moorland', 'tame'], defs: ['land consisting of open, rolling moors', 'not wild; gentle and unafraid of people'] },
  11: { words: ['revive', 'dormant'], defs: ['to bring something back to life or health', 'alive but not actively growing; in a resting state'] },
  12: { words: ['wistful', 'petition'], defs: ['having a quiet longing or gentle sadness', 'a formal request made to someone in authority'] },
  13: { words: ['invalid', 'hysterical'], defs: ['a person who is weak or disabled due to illness', 'in an uncontrolled state of extreme emotion'] },
  14: { words: ['rajah', 'imperious'], defs: ['a prince or ruler; used here to describe a commanding manner', 'assuming authority over others; bossy and domineering'] },
  15: { words: ['anticipation', 'secrecy'], defs: ['excitement and eagerness about something coming', 'the practice of keeping things hidden from others'] },
  16: { words: ['obstinate', 'confrontation'], defs: ['stubbornly refusing to change one\'s mind', 'a direct and tense disagreement between people'] },
  17: { words: ['tantrum', 'exhaustion'], defs: ['a sudden outburst of uncontrolled anger or frustration', 'extreme tiredness from effort or emotion'] },
  18: { words: ['conviction', 'persist'], defs: ['a firmly held belief or opinion', 'to continue steadily despite difficulty or opposition'] },
  19: { words: ['revelation', 'vitality'], defs: ['a surprising and life-changing discovery', 'physical energy and the will to live fully'] },
  20: { words: ['exultant', 'immortal'], defs: ['feeling or showing great joy and triumph', 'living or lasting forever; never dying'] },
  21: { words: ['gruff', 'astonishment'], defs: ['rough and abrupt in speech or manner', 'overwhelming surprise and wonder'] },
  22: { words: ['meditation', 'influence'], defs: ['quiet, focused thought or reflection', 'the power to have an effect on someone or something'] },
  23: { words: ['suggestion', 'phenomenon'], defs: ['an idea or belief planted gently in someone\'s mind', 'a remarkable or unexplained occurrence'] },
  24: { words: ['resilience', 'ridicule'], defs: ['the ability to bounce back from hardship', 'mockery; making fun of someone cruelly'] },
  25: { words: ['portrait', 'resentment'], defs: ['a painting or image representing a person', 'bitter feelings from a sense of being wronged'] },
  26: { words: ['transcendent', 'beckon'], defs: ['going beyond ordinary limits; extraordinary', 'to gesture or signal someone to approach'] },
  27: { words: ['reconciliation', 'flourish'], defs: ['the restoration of a friendly relationship after conflict', 'to grow vigorously and thrive'] }
};

// Map chapters to lesson days (accounting for assessments)
const chapterToDays = {
  1: [151], 2: [152], 3: [153], 4: [154],
  5: [156], 6: [157], 7: [158], 8: [159],
  9: [161], 10: [162], 11: [163], 12: [164],
  13: [166], 14: [167], 15: [168], 16: [169],
  17: [171], 18: [172], 19: [173], 20: [174],
  21: [176], 22: [177], 23: [178], 24: [179]
  // Chapters 25-27 will need to be spread or combined
};

// Add remaining chapters to later days
chapterToDays[25] = [151]; // Day 151 gets ch 1 + 25
chapterToDays[26] = [152]; // Day 152 gets ch 2 + 26
chapterToDays[27] = [153]; // Day 153 gets ch 3 + 27

let updated = 0;

for (const [chapter, days] of Object.entries(chapterToDays)) {
  const vocab = vocabulary[chapter];
  if (!vocab) continue;
  
  for (const day of days) {
    const file = `3rd-grade-day-${day}.html`;
    if (!fs.existsSync(file)) continue;
    
    let html = fs.readFileSync(file, 'utf8');
    const original = html;
    
    // For chapters 1-24, replace normally
    // For chapters 25-27, we need to handle them specially since days already have vocab
    
    if (parseInt(chapter) <= 24) {
      // Update word 1
      html = html.replace(
        /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>)/,
        `$1${vocab.words[0]}$2`
      );
      
      // Update word 2 (second occurrence)
      let count = 0;
      html = html.replace(
        /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>)/g,
        (match, p1, p2) => {
          count++;
          if (count === 2) {
            return `${p1}${vocab.words[1]}${p2}`;
          }
          return match;
        }
      );
    }
    
    if (html !== original) {
      fs.writeFileSync(file, html);
      updated++;
      console.log(`✅ Day ${day}: ${vocab.words[0]}, ${vocab.words[1]}`);
    }
  }
}

console.log(`\n✅ Updated ${updated} lessons with Secret Garden vocabulary!`);
