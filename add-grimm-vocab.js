#!/usr/bin/env node
/**
 * Add Grimm Brothers fairy tales vocabulary to 4th grade days 31-60
 */

const fs = require('fs');

// Vocabulary mapped by day
const vocabByDay = {
  // Snow White
  31: ['vain', 'huntsman'],
  32: ['vain', 'huntsman'],
  33: ['hospitality', 'industrious'],
  34: ['hospitality', 'industrious'],
  36: ['disguise', 'sinister'],
  37: ['treachery', 'susceptible'],
  38: ['enchantment', 'revive'],
  
  // Cinderella
  39: ['drudgery', 'meek'],
  41: ['granted', 'enchanted'],
  42: ['radiant', 'disguise'],
  43: ['pursuit', 'fleeting'],
  44: ['impostor', 'destined'],
  46: ['reconcile', 'retribution'],
  
  // Hansel and Gretel
  47: ['famine', 'desperate'],
  48: ['forsake', 'cunning'],
  49: ['devour', 'foreboding'],
  51: ['disoriented', 'desolate'],
  52: ['entice', 'enchanting'],
  53: ['captive', 'sinister'],
  54: ['scheme', 'deceive'],
  56: ['resourceful', 'pretense'],
  57: ['triumph', 'perish'],
  58: ['abundance', 'glittering'],
  59: ['reunion', 'Providence']
};

let updated = 0;

for (let day = 31; day <= 60; day++) {
  const file = `4th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const vocab = vocabByDay[day];
  if (!vocab) continue; // Skip assessment days
  
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace FIRST occurrence of vocab word span (vocab-1)
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #[0-9A-F]{6};">)\[Vocabulary Word 1\](<\/span>[\s\S]{0,500}?id="vocab-1")/i,
    `$1${vocab[0]}$2`
  );
  
  // Replace SECOND occurrence of vocab word span (vocab-2)
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #[0-9A-F]{6};">)\[Vocabulary Word 2\](<\/span>[\s\S]{0,500}?id="vocab-2")/i,
    `$1${vocab[1]}$2`
  );
  
  fs.writeFileSync(file, html);
  updated++;
  console.log(`Day ${day}: ${vocab[0]}, ${vocab[1]}`);
}

console.log(`\n✅ Grimm Brothers fairy tales vocabulary added to ${updated} lessons!`);
console.log('\n📚 Books:');
console.log('  Days 31-38: Snow White (7 lessons)');
console.log('  Days 39-46: Cinderella (6 lessons)');
console.log('  Days 47-59: Hansel and Gretel (11 lessons)');
