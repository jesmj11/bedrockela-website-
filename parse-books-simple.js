/**
 * Simple Book Parser
 * Uses line-by-line approach for reliability
 */

const fs = require('fs');

// Helper to clean Project Gutenberg headers/footers
function cleanGutenbergText(text) {
  const lines = text.split('\n');
  let startIndex = 0;
  let endIndex = lines.length;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('*** START OF') && lines[i].includes('PROJECT GUTENBERG')) {
      startIndex = i + 1;
      break;
    }
  }
  
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('*** END OF') && lines[i].includes('PROJECT GUTENBERG')) {
      endIndex = i;
      break;
    }
  }
  
  return lines.slice(startIndex, endIndex).join('\n');
}

// Roman to Int
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

// Parse Around the World in 80 Days
function parseAroundTheWorld() {
  console.log('\n📖 Parsing Around the World in 80 Days...');
  const text = cleanGutenbergText(fs.readFileSync('./books/around-the-world-in-80-days.txt', 'utf8'));
  
  const chapters = {};
  const parts = text.split(/(?=^CHAPTER [IVXLCDM]+\.$)/gm);
  
  for (const part of parts) {
    const lines = part.split('\n');
    const firstLine = lines[0].trim();
    
    const match = firstLine.match(/^CHAPTER ([IVXLCDM]+)\.$/);
    if (match) {
      const chapterNum = romanToInt(match[1]);
      const title = lines.slice(1).find(l => l.trim().length > 0) || '';
      const content = lines.slice(2).join('\n').trim();
      
      if (content.length > 500) {
        chapters[chapterNum] = {
          title: `Chapter ${chapterNum}: ${title.trim()}`,
          text: content
        };
      }
    }
  }
  
  fs.writeFileSync(
    './book-data/around-the-world-chapters.json',
    JSON.stringify(chapters, null, 2),
    'utf8'
  );
  
  console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
}

// Parse Black Beauty
function parseBlackBeauty() {
  console.log('\n📖 Parsing Black Beauty...');
  const text = cleanGutenbergText(fs.readFileSync('./books/black-beauty.txt', 'utf8'));
  
  const chapters = {};
  const lines = text.split('\n');
  
  let currentChapter = null;
  let currentTitle = '';
  let currentText = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this is a chapter header (just a number at start of line)
    const chapterMatch = line.match(/^(\d+)$/);
    if (chapterMatch && i < lines.length - 1) {
      // Save previous chapter
      if (currentChapter && currentText.join('\n').trim().length > 500) {
        chapters[currentChapter] = {
          title: `Chapter ${currentChapter}: ${currentTitle}`,
          text: currentText.join('\n').trim()
        };
      }
      
      // Start new chapter
      currentChapter = parseInt(chapterMatch[1]);
      currentTitle = lines[i + 1].trim();
      currentText = [];
      i++; // Skip the title line
    } else if (currentChapter) {
      currentText.push(lines[i]);
    }
  }
  
  // Save last chapter
  if (currentChapter && currentText.join('\n').trim().length > 500) {
    chapters[currentChapter] = {
      title: `Chapter ${currentChapter}: ${currentTitle}`,
      text: currentText.join('\n').trim()
    };
  }
  
  fs.writeFileSync(
    './book-data/black-beauty-chapters.json',
    JSON.stringify(chapters, null, 2),
    'utf8'
  );
  
  console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
}

// Parse Sherlock Holmes
function parseSherlockHolmes() {
  console.log('\n📖 Parsing Adventures of Sherlock Holmes...');
  const text = cleanGutenbergText(fs.readFileSync('./books/sherlock-holmes.txt', 'utf8'));
  
  const stories = {};
  const parts = text.split(/(?=^[IVXLCDM]+\.\s+)/gm);
  
  for (const part of parts) {
    const lines = part.split('\n');
    const firstLine = lines[0].trim();
    
    const match = firstLine.match(/^([IVXLCDM]+)\.\s+(.+)$/);
    if (match) {
      const storyNum = romanToInt(match[1]);
      const title = match[2].trim();
      const content = lines.slice(1).join('\n').trim();
      
      if (content.length > 500) {
        stories[storyNum] = {
          title: `${storyNum}. ${title}`,
          text: content
        };
      }
    }
  }
  
  fs.writeFileSync(
    './book-data/sherlock-holmes-stories.json',
    JSON.stringify(stories, null, 2),
    'utf8'
  );
  
  console.log(`✅ Parsed ${Object.keys(stories).length} stories`);
}

// Run all
console.log('🐉 Parsing all books with improved algorithm...');
parseAroundTheWorld();
parseBlackBeauty();
parseSherlockHolmes();

console.log('\n🎉 All books parsed!');
console.log('✅ Alice in Wonderland already parsed (12 chapters)');
console.log('\nCheck book-data/ directory for JSON files.');
