const fs = require('fs');

const csv = fs.readFileSync('/Users/mushu/Desktop/BedrockELA/5th Grade/norse/Norse_Mythology_Vocab.csv', 'utf8');
const lines = csv.split('\n').slice(1).filter(l => l.trim());

const vocabByDay = {
  "141": [], "142": [], "143": [], "144": [],
  "146": [], "147": [], "148": [], "149": [],
  "151": [], "152": [], "153": [], "154": [],
  "156": [], "157": [], "158": [], "159": []
};

const storyToDayMap = {
  "In the Beginning: The Norse Creation": "141",
  "Odin and the Price of Wisdom": "142",
  "Thor and the Theft of Mjolnir": "143",
  "Loki the Trickster": "144",
  "Freyja and the Necklace of the Brisings": "146",
  "The Mead of Poetry": "156",
  "Baldur the Beautiful": "148"
};

lines.forEach(line => {
  const parts = line.split(',');
  if (parts.length >= 3) {
    const story = parts[0].trim();
    const word = parts[1].trim().replace(/^"/, '').replace(/"$/, '');
    const definition = parts[2].trim().replace(/^"/, '').replace(/"$/, '');
    
    const day = storyToDayMap[story];
    if (day && vocabByDay[day].length < 3) {
      vocabByDay[day].push({ word, definition });
    }
  }
});

fs.writeFileSync('norse-vocabulary.json', JSON.stringify(vocabByDay, null, 2));
console.log('✅ Created norse-vocabulary.json');
console.log(`   Total days with vocab: ${Object.keys(vocabByDay).filter(d => vocabByDay[d].length > 0).length}`);
