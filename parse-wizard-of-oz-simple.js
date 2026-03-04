/**
 * Parse Wizard of Oz into JSON chapters
 */

const fs = require('fs');

// Read the text file
const text = fs.readFileSync('./books/wizard-of-oz.txt', 'utf8');

// Roman numeral converter
function romanToInt(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let num = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]];
    const next = map[roman[i + 1]];
    if (next && current < next) {
      num -= current;
    } else {
      num += current;
    }
  }
  return num;
}

// Split by "Chapter" markers (after the table of contents)
const lines = text.split('\n');
const chapters = {};
let currentChapter = null;
let currentText = [];
let inContent = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Look for chapter markers like "Chapter I"
  const chapterMatch = line.match(/^Chapter ([IVXLC]+)$/);
  
  if (chapterMatch && inContent) {
    // Save previous chapter if it exists
    if (currentChapter) {
      chapters[currentChapter.number] = {
        number: currentChapter.number,
        title: currentChapter.title,
        text: currentText.join(' ').replace(/\s+/g, ' ').trim()
      };
      console.log(`✅ Parsed Chapter ${currentChapter.number}: ${currentChapter.title}`);
    }
    
    // Start new chapter
    const chapterNum = romanToInt(chapterMatch[1]);
    const titleLine = lines[i + 1] ? lines[i + 1].trim() : '';
    
    currentChapter = {
      number: chapterNum,
      title: titleLine
    };
    currentText = [];
    i++; // Skip the title line
  } else if (line === 'Introduction') {
    inContent = true; // Start collecting content after Introduction marker
  } else if (currentChapter && line.length > 0 && !line.match(/^[-=]+$/)) {
    currentText.push(line);
  }
}

// Save last chapter
if (currentChapter) {
  chapters[currentChapter.number] = {
    number: currentChapter.number,
    title: currentChapter.title,
    text: currentText.join(' ').replace(/\s+/g, ' ').trim()
  };
  console.log(`✅ Parsed Chapter ${currentChapter.number}: ${currentChapter.title}`);
}

// Save to JSON
fs.writeFileSync(
  './book-data/wizard-of-oz-chapters.json',
  JSON.stringify(chapters, null, 2),
  'utf8'
);

console.log(`\n🎉 Saved ${Object.keys(chapters).length} chapters to book-data/wizard-of-oz-chapters.json`);
