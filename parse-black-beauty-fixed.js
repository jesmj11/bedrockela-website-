/**
 * Black Beauty Parser (Fixed)
 * Chapters are formatted as: "02 The Hunt" (number + title)
 */

const fs = require('fs');

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

console.log('📖 Parsing Black Beauty...');
const text = cleanGutenbergText(fs.readFileSync('./books/black-beauty.txt', 'utf8'));

const chapters = {};
// Split on pattern like "02 The Hunt"
const parts = text.split(/(?=^\d{2}\s+[A-Z])/gm);

for (const part of parts) {
  const lines = part.split('\n');
  const firstLine = lines[0].trim();
  
  const match = firstLine.match(/^(\d{2})\s+(.+)$/);
  if (match) {
    const chapterNum = parseInt(match[1]);
    const title = match[2].trim();
    const content = lines.slice(1).join('\n').trim();
    
    if (content.length > 500) {
      chapters[chapterNum] = {
        title: `Chapter ${chapterNum}: ${title}`,
        text: content
      };
    }
  }
}

fs.writeFileSync(
  './book-data/black-beauty-chapters.json',
  JSON.stringify(chapters, null, 2),
  'utf8'
);

console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
console.log('📁 Saved to: book-data/black-beauty-chapters.json');
