// Parse Tom Sawyer into individual chapters
const fs = require('fs');

const text = fs.readFileSync('book-data/6th-grade-novels/tom-sawyer.txt', 'utf8');

// Split into lines
const lines = text.split('\n');

// Find where actual chapters start (after table of contents)
// Look for "CHAPTER I" on its own line (not "CHAPTER I. subtitle")
let chapterStartLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'CHAPTER I') {
    chapterStartLine = i;
    break;
  }
}

if (chapterStartLine === -1) {
  console.error('Could not find start of chapters!');
  process.exit(1);
}

// Extract from first chapter onwards
const storyLines = lines.slice(chapterStartLine);
const storyText = storyLines.join('\n');

// Split by chapter markers - look for lines that are JUST "CHAPTER" + Roman numeral
const chapterRegex = /^CHAPTER ([IVX]+)$/gm;
const matches = [];
let match;

while ((match = chapterRegex.exec(storyText)) !== null) {
  matches.push({
    number: match[1],
    index: match.index
  });
}

// Extract text between chapters
const chapters = [];
for (let i = 0; i < matches.length; i++) {
  const start = matches[i].index;
  const end = i < matches.length - 1 ? matches[i + 1].index : storyText.length;
  const chapterText = storyText.substring(start, end).trim();
  
  chapters.push({
    number: matches[i].number,
    text: chapterText
  });
}

// Convert Roman numerals to numbers
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

// Create chapter object with numeric keys
const chaptersObj = {};
chapters.forEach(ch => {
  const num = romanToInt(ch.number);
  chaptersObj[num] = {
    title: ch.text.split('\n')[0],
    text: ch.text
  };
});

// Save to JSON
fs.writeFileSync('book-data/tom-sawyer-chapters.json', JSON.stringify(chaptersObj, null, 2));

console.log(`✅ Parsed ${chapters.length} chapters from Tom Sawyer`);
console.log(`Chapters: ${Object.keys(chaptersObj).join(', ')}`);
