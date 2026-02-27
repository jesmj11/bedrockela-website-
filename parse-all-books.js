/**
 * Universal Book Parser
 * Parses multiple classic books into chapter JSON format
 */

const fs = require('fs');

/**
 * Generic chapter parser with customizable regex
 */
function parseBook(bookPath, bookName, chapterPattern, options = {}) {
  console.log(`\n📖 Parsing ${bookName}...`);
  
  const text = fs.readFileSync(bookPath, 'utf8');
  const chapters = {};
  
  // Clean up Project Gutenberg header/footer
  let cleanText = text;
  const startMatch = text.match(/\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG[\s\S]*?\*\*\*/i);
  const endMatch = text.match(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG[\s\S]*?\*\*\*/i);
  
  if (startMatch) {
    cleanText = text.slice(startMatch.index + startMatch[0].length);
  }
  if (endMatch) {
    cleanText = cleanText.slice(0, endMatch.index);
  }
  
  // Split by chapter pattern
  const splits = cleanText.split(chapterPattern);
  
  let chapterNum = 1;
  for (let i = 1; i < splits.length; i += 2) {
    const title = splits[i].trim();
    const text = splits[i + 1] ? splits[i + 1].trim() : '';
    
    if (text.length > 100) { // Only include substantial chapters
      chapters[chapterNum] = {
        title: title,
        text: text
      };
      chapterNum++;
    }
  }
  
  // Save to JSON
  const outputPath = `./book-data/${bookName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-chapters.json`;
  fs.writeFileSync(outputPath, JSON.stringify(chapters, null, 2), 'utf8');
  
  console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
  console.log(`📁 Saved to: ${outputPath}`);
  
  return chapters;
}

// Parse Around the World in 80 Days
parseBook(
  './books/around-the-world-in-80-days.txt',
  'Around the World in 80 Days',
  /(CHAPTER [IVXLCDM]+\.?[\s\n]+.*?)(?=\n\n)/gi
);

// Parse Black Beauty
parseBook(
  './books/black-beauty.txt',
  'Black Beauty',
  /((?:CHAPTER|PART) [IVXLCDM]+\.?[\s\n]+.*?)(?=\n\n)/gi
);

// Parse Adventures of Sherlock Holmes
parseBook(
  './books/sherlock-holmes.txt',
  'Sherlock Holmes',
  /((?:I\.|II\.|III\.|IV\.|V\.|VI\.|VII\.|VIII\.|IX\.|X\.|XI\.|XII\.) .*?)(?=\n\n)/gi
);

// Parse Alice in Wonderland
parseBook(
  './books/alice-in-wonderland.txt',
  'Alice in Wonderland',
  /(CHAPTER [IVXLCDM]+\.?[\s\n]+.*?)(?=\n\n)/gi
);

console.log('\n🎉 All books parsed successfully!');
console.log('\nNext: Create chapter mappings and automation scripts for each book.');
