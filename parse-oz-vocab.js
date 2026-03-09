const fs = require('fs');
const { execSync } = require('child_process');

// Extract vocab from docx
const text = execSync('unzip -p /Users/mushu/Downloads/oz_vocab_guide.docx word/document.xml | sed "s/<[^>]*>//g"').toString()
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&amp;/g, '&');

// Parse chapters
const chapterBlocks = text.split(/Chapter \d+:/).slice(1);

const vocab = [];

chapterBlocks.forEach((block, idx) => {
  const chapterNum = idx + 1;
  
  // Extract words (they're bold/standalone at start of each section)
  const wordMatches = [...block.matchAll(/\n([a-z]+)\s+\(([^)]+)\)/gi)];
  
  const words = wordMatches.slice(0, 2).map(match => {
    const word = match[1].trim();
    const pos = match[2].trim();
    
    // Find the definition (next line after the word)
    const wordIdx = block.indexOf(match[0]);
    const afterWord = block.substring(wordIdx + match[0].length);
    const defMatch = afterWord.match(/\n([A-Z][^.\n]+\.)/);
    const definition = defMatch ? defMatch[1].trim() : '';
    
    // Find the story example
    const storyMatch = afterWord.match(/From the story:\s*([^Think]+)/s);
    const storyExample = storyMatch ? storyMatch[1].trim() : '';
    
    // Find the think question
    const thinkMatch = afterWord.match(/Think about it:\s*([^Chapter]+)/s);
    const thinkQuestion = thinkMatch ? thinkMatch[1].trim().replace(/Chapter \d+:.*/, '').trim() : '';
    
    return { word, pos, definition, storyExample, thinkQuestion };
  });
  
  vocab.push({ chapter: chapterNum, words });
});

fs.writeFileSync('oz-vocab.json', JSON.stringify(vocab, null, 2));
console.log(`✅ Parsed vocab for ${vocab.length} chapters`);
vocab.forEach(v => console.log(`Ch ${v.chapter}: ${v.words.map(w => w.word).join(', ')}`));
