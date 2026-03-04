#!/usr/bin/env node
/**
 * Fix chapter-to-day mapping for 4th grade embedded book text.
 * Each regular day (non-assessment) gets the next sequential chapter.
 */
const fs = require('fs');

const bookConfigs = {
  '4th': [
    { start: 1, end: 30, file: 'book-data/wizard-of-oz-chapters.json', title: 'The Wonderful Wizard of Oz' },
    { start: 31, end: 60, file: 'book-data/tom-sawyer-chapters.json', title: 'The Adventures of Tom Sawyer' },
    { start: 61, end: 90, file: 'book-data/around-the-world-chapters.json', title: 'Around the World in 80 Days' },
    { start: 91, end: 120, file: 'book-data/black-beauty-chapters.json', title: 'Black Beauty' },
    { start: 121, end: 150, file: 'book-data/sherlock-holmes-stories.json', title: 'Sherlock Holmes Stories' },
    { start: 151, end: 180, file: 'book-data/alice-in-wonderland-chapters.json', title: 'Alice in Wonderland' }
  ]
};

function escapeHtml(text) {
  return text.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

let totalFixed = 0;

for (const [grade, books] of Object.entries(bookConfigs)) {
  console.log(`\n📚 Fixing ${grade} grade chapter mapping...`);
  
  for (const bookInfo of books) {
    if (!fs.existsSync(bookInfo.file)) {
      console.log(`  ⚠️ ${bookInfo.file} not found`);
      continue;
    }
    
    const bookData = JSON.parse(fs.readFileSync(bookInfo.file, 'utf8'));
    
    // Get chapters array (handle both formats)
    let chapters;
    if (Array.isArray(bookData)) {
      chapters = bookData;
    } else if (bookData.chapters) {
      chapters = bookData.chapters;
    } else {
      // Object with numeric keys — find all numeric keys and sort
      chapters = [];
      const keys = Object.keys(bookData).filter(k => /^\d+$/.test(k)).map(Number).sort((a,b) => a-b);
      for (const k of keys) {
        chapters.push(bookData[k]);
      }
    }
    
    if (!chapters.length) {
      console.log(`  ⚠️ No chapters in ${bookInfo.file}`);
      continue;
    }
    
    // Get regular days (skip assessments every 5th day)
    const regularDays = [];
    for (let day = bookInfo.start; day <= bookInfo.end; day++) {
      if (day % 5 !== 0) regularDays.push(day);
    }
    
    console.log(`  ${bookInfo.title}: ${regularDays.length} regular days, ${chapters.length} chapters`);
    
    for (let i = 0; i < regularDays.length && i < chapters.length; i++) {
      const day = regularDays[i];
      const chapter = chapters[i];
      const chapterNum = i + 1;
      const chapterTitle = chapter.title || `Chapter ${chapterNum}`;
      const chapterText = chapter.text || chapter.content || '';
      
      const filename = `${grade}-grade-day-${day}.html`;
      if (!fs.existsSync(filename)) continue;
      
      let html = fs.readFileSync(filename, 'utf8');
      
      // Fix the chapter heading: replace "Chapter X: ..." with correct chapter
      const oldChapterHeading = html.match(/<h3[^>]*>Chapter \d+:[^<]*<\/h3>/);
      if (oldChapterHeading) {
        html = html.replace(oldChapterHeading[0], 
          `<h3 style="color: var(--book-color, #305853);">Chapter ${chapterNum}: ${escapeHtml(chapterTitle)}</h3>`);
      }
      
      // Fix the title page chapter reference
      html = html.replace(
        /Chapter \d+\s*<\/p>\s*<\/div>/,
        `Chapter ${chapterNum}</p>\n                        </div>`
      );
      
      // Fix the welcome page chapter reference
      html = html.replace(
        /Chapter \d+ of/g,
        `Chapter ${chapterNum} of`
      );
      
      // Replace the reading passage text if we have chapter text
      if (chapterText && chapterText.length > 100) {
        const passageRegex = /(<div[^>]*class="reading-passage"[^>]*>\s*<p[^>]*>)([\s\S]*?)(<\/p>\s*<\/div>)/;
        const match = html.match(passageRegex);
        if (match) {
          // Preserve vocab highlights from original if possible
          const escapedText = escapeHtml(chapterText);
          html = html.replace(match[0], `${match[1]}${escapedText}${match[3]}`);
        }
      }
      
      fs.writeFileSync(filename, html);
      totalFixed++;
    }
    
    console.log(`  ✅ Fixed ${Math.min(regularDays.length, chapters.length)} lessons`);
  }
}

console.log(`\n🎉 Total: ${totalFixed} files fixed`);
