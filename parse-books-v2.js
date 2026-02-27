/**
 * Improved Book Parsers
 * Handles the actual format of each book properly
 */

const fs = require('fs');

// Helper to clean Project Gutenberg text
function cleanGutenbergText(text) {
  let clean = text;
  const startMatch = text.match(/\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG[\s\S]*?\*\*\*/i);
  const endMatch = text.match(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG[\s\S]*?\*\*\*/i);
  
  if (startMatch) {
    clean = text.slice(startMatch.index + startMatch[0].length);
  }
  if (endMatch) {
    clean = clean.slice(0, endMatch.index);
  }
  
  return clean;
}

// Parse Around the World in 80 Days
function parseAroundTheWorld() {
  console.log('\n📖 Parsing Around the World in 80 Days...');
  const text = cleanGutenbergText(fs.readFileSync('./books/around-the-world-in-80-days.txt', 'utf8'));
  
  const chapters = {};
  const chapterRegex = /CHAPTER ([IVXLCDM]+)\. (.*?)\n\n([\s\S]*?)(?=CHAPTER [IVXLCDM]+\.|$)/g;
  
  let match;
  while ((match = chapterRegex.exec(text)) !== null) {
    const [, numRoman, title, content] = match;
    const chapterNum = romanToInt(numRoman);
    
    if (content.trim().length > 100) {
      chapters[chapterNum] = {
        title: `Chapter ${chapterNum}: ${title.trim()}`,
        text: content.trim()
      };
    }
  }
  
  fs.writeFileSync(
    './book-data/around-the-world-chapters.json',
    JSON.stringify(chapters, null, 2),
    'utf8'
  );
  
  console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
  return chapters;
}

// Parse Black Beauty
function parseBlackBeauty() {
  console.log('\n📖 Parsing Black Beauty...');
  const text = cleanGutenbergText(fs.readFileSync('./books/black-beauty.txt', 'utf8'));
  
  const chapters = {};
  // Black Beauty uses numbered chapters like "1 My First Home"
  const chapterRegex = /(\d+) ([^\n]+)\n\n([\s\S]*?)(?=\n\n\d+ [^\n]+\n\n|$)/g;
  
  let match;
  while ((match = chapterRegex.exec(text)) !== null) {
    const [, num, title, content] = match;
    const chapterNum = parseInt(num);
    
    if (content.trim().length > 100 && chapterNum > 0) {
      chapters[chapterNum] = {
        title: `Chapter ${chapterNum}: ${title.trim()}`,
        text: content.trim()
      };
    }
  }
  
  fs.writeFileSync(
    './book-data/black-beauty-chapters.json',
    JSON.stringify(chapters, null, 2),
    'utf8'
  );
  
  console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
  return chapters;
}

// Parse Sherlock Holmes Stories
function parseSherlockHolmes() {
  console.log('\n📖 Parsing Adventures of Sherlock Holmes...');
  const text = cleanGutenbergText(fs.readFileSync('./books/sherlock-holmes.txt', 'utf8'));
  
  const stories = {};
  // Sherlock Holmes has 12 stories
  const storyTitles = [
    "A Scandal in Bohemia",
    "The Red-Headed League",
    "A Case of Identity",
    "The Boscombe Valley Mystery",
    "The Five Orange Pips",
    "The Man with the Twisted Lip",
    "The Adventure of the Blue Carbuncle",
    "The Adventure of the Speckled Band",
    "The Adventure of the Engineer's Thumb",
    "The Adventure of the Noble Bachelor",
    "The Adventure of the Beryl Coronet",
    "The Adventure of the Copper Beeches"
  ];
  
  const storyRegex = /([IVXLCDM]+)\.\s+([^\n]+)\n\n([\s\S]*?)(?=[IVXLCDM]+\.\s+[^\n]+\n\n|$)/g;
  
  let storyNum = 1;
  let match;
  while ((match = storyRegex.exec(text)) !== null) {
    const [, numRoman, title, content] = match;
    
    if (content.trim().length > 500) {
      stories[storyNum] = {
        title: `${storyNum}. ${title.trim()}`,
        text: content.trim()
      };
      storyNum++;
    }
  }
  
  fs.writeFileSync(
    './book-data/sherlock-holmes-stories.json',
    JSON.stringify(stories, null, 2),
    'utf8'
  );
  
  console.log(`✅ Parsed ${Object.keys(stories).length} stories`);
  return stories;
}

// Helper: Roman numeral to integer
function romanToInt(s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const current = map[s[i]];
    const next = map[s[i + 1]];
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

// Run all parsers
console.log('🐉 Parsing all books...');
parseAroundTheWorld();
parseBlackBeauty();
parseSherlockHolmes();

console.log('\n🎉 All books parsed!');
console.log('\n✅ Alice in Wonderland already parsed (12 chapters)');
console.log('\nNext: Create chapter mappings and automation scripts.');
