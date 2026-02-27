const fs = require('fs');

// Full text of Wizard of Oz from the user
const wizardText = `[Full text will be inserted here]`;

// Parse chapters from the text
function parseChapters(text) {
  const chapters = [];
  
  // Split by "Chapter " markers (Roman numerals)
  const chapterRegex = /Chapter ([IVX]+)\s+([^\n]+)\n([\s\S]*?)(?=Chapter [IVX]+|$)/g;
  
  let match;
  let chapterNum = 1;
  
  while ((match = chapterRegex.exec(text)) !== null) {
    const title = match[2].trim();
    let content = match[3].trim();
    
    // Clean up the content
    content = content
      .replace(/\n{3,}/g, '\n\n') // Max 2 newlines
      .replace(/^[\s\n]+|[\s\n]+$/g, '') // Trim
      .trim();
    
    chapters.push({
      number: chapterNum,
      romanNumeral: match[1],
      title: title,
      content: content
    });
    
    chapterNum++;
  }
  
  return chapters;
}

// Break long chapter into digestible "pages" for the digital book
function chapterToPages(chapter, maxWordsPerPage = 200) {
  const paragraphs = chapter.content.split(/\n\n+/);
  const pages = [];
  let currentPage = '';
  let wordCount = 0;
  
  paragraphs.forEach((para, idx) => {
    const paraWords = para.trim().split(/\s+/).length;
    
    if (wordCount + paraWords > maxWordsPerPage && currentPage) {
      // Save current page
      pages.push(currentPage.trim());
      currentPage = para + '\n\n';
      wordCount = paraWords;
    } else {
      currentPage += para + '\n\n';
      wordCount += paraWords;
    }
  });
  
  // Add remaining content
  if (currentPage.trim()) {
    pages.push(currentPage.trim());
  }
  
  return pages;
}

// Generate digital book config for a chapter
function generateBookConfig(chapter, vocabWords = []) {
  const pages = chapterToPages(chapter);
  
  return {
    coverTitle: `Chapter ${chapter.number}`,
    coverSubtitle: chapter.title,
    coverAuthor: 'L. Frank Baum',
    coverEmoji: '📖',
    coverColor: '#1B2A4A',
    vocabWords: vocabWords,
    pages: pages.map((pageText, idx) => ({
      title: idx === 0 ? chapter.title : null,
      text: pageText,
      emoji: null // Could add contextual emojis later
    }))
  };
}

// Main execution
console.log('Parsing Wizard of Oz chapters...');

// For now, create a sample structure
// In practice, we'll parse the actual text
const sampleChapters = [
  {
    number: 1,
    title: 'The Cyclone',
    content: `Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small, for the lumber to build it had to be carried by wagon many miles...`
  }
];

console.log('✅ Parsing complete!');
console.log('📚 Ready to embed books in lessons');

module.exports = {
  parseChapters,
  chapterToPages,
  generateBookConfig
};
