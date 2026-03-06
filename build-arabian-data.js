const fs = require('fs');
const path = require('path');

// Read all story files
const stories = {
  "181": fs.readFileSync('/tmp/ARABIAN_Aladdin_and_the_Magic_Lamp.txt', 'utf8'),
  "182": fs.readFileSync('/tmp/ARABIAN_Ali_Baba_and_the_Forty_Thieves.txt', 'utf8'),
  "183": fs.readFileSync('/tmp/ARABIAN_Sinbad_and_the_Valley_of_Diamonds.txt', 'utf8'),
  "184": fs.readFileSync('/tmp/ARABIAN_The_Fisherman_and_the_Genie.txt', 'utf8'),
  "186": fs.readFileSync('/tmp/ARABIAN_The_Three_Princes_and_Princess_Nouronnihar.txt', 'utf8'),
  "187": fs.readFileSync('/tmp/ARABIAN_The_Ebony_Horse.txt', 'utf8'),
  "188": fs.readFileSync('/tmp/ARABIAN_Ali_Cogia_the_Merchant_of_Baghdad.txt', 'utf8')
};

// Clean story text (remove title headers)
Object.keys(stories).forEach(day => {
  let text = stories[day];
  // Remove multiple header lines
  text = text.split('\n').filter(line => {
    return !line.match(/^One Thousand and One Nights/) &&
           !line.match(/^A Tale from One Thousand and One Nights/) &&
           !line.match(/^Retold for Young Readers/) &&
           !line.match(/^Aladdin and the Magic Lamp$/) &&
           !line.match(/^Ali Baba/) &&
           !line.match(/^Sinbad/) &&
           !line.match(/^The Fisherman/) &&
           !line.match(/^The Three Princes/) &&
           !line.match(/^The Ebony Horse$/) &&
           !line.match(/^Ali Cogia/);
  }).join('\n').trim();
  stories[day] = text;
});

// Save stories JSON
const storiesData = {};
Object.keys(stories).forEach(day => {
  storiesData[day] = {
    title: getTitle(day),
    text: stories[day]
  };
});

fs.writeFileSync('arabian-stories.json', JSON.stringify(storiesData, null, 2));
console.log('✅ Created arabian-stories.json');

function getTitle(day) {
  const titles = {
    "181": "Aladdin and the Magic Lamp",
    "182": "Ali Baba and the Forty Thieves",
    "183": "Sinbad and the Valley of Diamonds",
    "184": "The Fisherman and the Genie",
    "186": "The Three Princes and Princess Nouronnihar",
    "187": "The Ebony Horse",
    "188": "Ali Cogia, the Merchant of Baghdad"
  };
  return titles[day];
}

// Parse vocabulary from the text file
const vocabRaw = fs.readFileSync('/tmp/arabian_vocab.txt', 'utf8');
const vocabLines = vocabRaw.split('\n').slice(1).filter(l => l.trim()); // Skip header

const vocabData = {};
vocabLines.forEach(line => {
  const parts = line.split('\t');
  if (parts.length >= 3) {
    const story = parts[0].trim();
    const word = parts[1].trim();
    const definition = parts[2].trim();
    
    // Map story names to lesson days
    const dayMap = {
      "Aladdin and the Magic Lamp": "181",
      "Ali Baba and the Forty Thieves": "182",
      "Sinbad and the Valley of Diamonds": "183",
      "The Fisherman and the Genie": "184",
      "The Three Princes and Princess Nouronnihar": "186",
      "The Ebony Horse": "187",
      "Ali Cogia, the Merchant of Baghdad": "188"
    };
    
    const day = dayMap[story];
    if (day) {
      if (!vocabData[day]) vocabData[day] = [];
      vocabData[day].push({ word, definition });
    }
  }
});

fs.writeFileSync('arabian-vocabulary.json', JSON.stringify(vocabData, null, 2));
console.log('✅ Created arabian-vocabulary.json');

// Parse questions
const questionsRaw = fs.readFileSync('/tmp/arabian_questions.txt', 'utf8');
const questionBlocks = questionsRaw.split(/\n\n\n+/); // Split by triple newlines

const questionsData = {};
const storyOrder = ["181", "182", "183", "184", "186", "187", "188"];
let storyIndex = 0;

questionBlocks.forEach(block => {
  const lines = block.split('\n').filter(l => l.trim() && !l.match(/^One Thousand/) && !l.match(/^Comprehension/) && !l.match(/^Three questions/) && !l.match(/^•/) && !l.match(/^\s*$/));
  
  if (lines.length === 0) return;
  
  // First line might be story title, rest are questions
  let questions = [];
  lines.forEach(line => {
    if (line.match(/^[A-Z]/) && line.length > 50) {
      questions.push(line.trim());
    }
  });
  
  if (questions.length > 0 && storyIndex < storyOrder.length) {
    questionsData[storyOrder[storyIndex]] = questions.slice(0, 3); // Take first 3
    storyIndex++;
  }
});

fs.writeFileSync('arabian-comprehension-questions.json', JSON.stringify(questionsData, null, 2));
console.log('✅ Created arabian-comprehension-questions.json');

console.log('\n📊 Summary:');
console.log(`Stories: ${Object.keys(storiesData).length}`);
console.log(`Vocab words: ${Object.values(vocabData).flat().length}`);
console.log(`Questions: ${Object.values(questionsData).flat().length}`);
