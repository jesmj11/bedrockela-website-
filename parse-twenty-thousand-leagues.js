// Parse Twenty Thousand Leagues Under the Sea into chapters
const fs = require('fs');

const text = fs.readFileSync('book-data/6th-grade-novels/twenty-thousand-leagues.txt', 'utf8');
const lines = text.split('\n');

// Find where actual story starts (after table of contents)
let partOneStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'PART ONE' || lines[i].trim() === 'PART I') {
    // Look ahead for CHAPTER I
    for (let j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].trim() === 'CHAPTER I') {
        partOneStart = j;
        break;
      }
    }
    if (partOneStart !== -1) break;
  }
}

if (partOneStart === -1) {
  console.error('Could not find start of Part One!');
  process.exit(1);
}

console.log(`Found Part One starting at line ${partOneStart}`);

const storyLines = lines.slice(partOneStart);
const storyText = storyLines.join('\n');

// Split by chapter markers - Roman numerals
const chapterRegex = /^CHAPTER ([IVX]+)$/gm;
const matches = [];
let match;

while ((match = chapterRegex.exec(storyText)) !== null) {
  matches.push({
    number: match[1],
    index: match.index
  });
}

console.log(`Found ${matches.length} chapters`);

// Roman numeral to number conversion
const romanToInt = (roman) => {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100 };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]];
    const next = map[roman[i + 1]];
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
};

// Extract chapters
const chapters = [];
for (let i = 0; i < matches.length; i++) {
  const start = matches[i].index;
  const end = i < matches.length - 1 ? matches[i + 1].index : storyText.length;
  const chapterText = storyText.substring(start, end).trim();
  
  const chapterNum = romanToInt(matches[i].number);
  
  // Get title from next few lines after "CHAPTER X"
  const titleMatch = chapterText.match(/^CHAPTER [IVX]+\s*\n\s*(.+)/);
  const title = titleMatch ? `CHAPTER ${matches[i].number}. ${titleMatch[1].trim()}` : `CHAPTER ${matches[i].number}`;
  
  chapters.push({
    number: chapterNum,
    title: title,
    text: chapterText
  });
}

// Create chapters object
const chaptersObj = {};
chapters.forEach(ch => {
  chaptersObj[ch.number] = {
    title: ch.title,
    text: ch.text
  };
});

fs.writeFileSync('book-data/twenty-thousand-leagues-chapters.json', JSON.stringify(chaptersObj, null, 2));

console.log(`✅ Parsed ${chapters.length} chapters`);
console.log(`Chapters: ${Object.keys(chaptersObj).sort((a, b) => a - b).join(', ')}`);
console.log(`First chapter length: ${chaptersObj[1]?.text.length || 0} chars`);
