const fs = require('fs');
const path = require('path');

const wizardMapping = require('./wizard-of-oz-chapter-mapping.js');

// Step 1: Add digital-book.js to all lesson files
function addDigitalBookScript(dayNum) {
  const filename = `4th-grade-day-${dayNum}.html`;
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    return false;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Add digital-book.js if not already there
  if (!content.includes('digital-book.js')) {
    content = content.replace(
      '<script src="js/lesson-viewer.js"></script>',
      '<script src="js/lesson-viewer.js"></script>\n    <script src="js/digital-book.js"></script>'
    );
    
    fs.writeFileSync(filepath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Step 2: Replace reading page with digital book placeholder
function addDigitalBookPlaceholder(dayNum, chapterNum, chapterTitle, vocabWords) {
  const filename = `4th-grade-day-${dayNum}.html`;
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  File not found: ${filename}`);
    return false;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Create the placeholder book code
  const bookCode = `                // Page 4: Reading (Digital Book)
                {
                    render: () => {
                        setTimeout(() => {
                            if (!window.day${dayNum}BookInitialized) {
                                const bookConfig = {
                                    coverTitle: "Chapter ${chapterNum}",
                                    coverSubtitle: "${chapterTitle}",
                                    coverAuthor: "L. Frank Baum",
                                    coverColor: "#1B2A4A",
                                    vocabWords: ${JSON.stringify(vocabWords)},
                                    pages: [
                                        {
                                            title: "${chapterTitle}",
                                            text: "Chapter ${chapterNum} will be loaded here.\\n\\nThe full text from The Wonderful Wizard of Oz will appear in this beautiful digital book format.\\n\\nFor now, this is a placeholder. The chapter will include the complete text broken into readable pages, with vocabulary words highlighted in yellow!\\n\\nVocabulary words for this chapter: ${vocabWords.join(', ')}"
                                        }
                                    ]
                                };
                                window.digitalBookInstance = new DigitalBook('digital-book-day-${dayNum}', bookConfig);
                                window.day${dayNum}BookInitialized = true;
                            }
                        }, 100);
                        
                        return \`
                            <div class="lesson-page-card content-page">
                                <h2>📖 Chapter ${chapterNum}: ${chapterTitle}</h2>
                                <p style="margin: 10px 0 20px; color: #666;">Read the chapter below. Vocabulary words are highlighted in yellow!</p>
                                <div id="digital-book-day-${dayNum}"></div>
                            </div>
                        \`;
                    }
                },`;
  
  // Find and replace the reading page
  // Pattern matches from "// Page 4: Reading" through the closing of that page object
  const readingPagePattern = /\/\/ Page 4: Reading\s*\{[\s\S]*?`\s*\}\s*\},/;
  
  if (readingPagePattern.test(content)) {
    content = content.replace(readingPagePattern, bookCode);
    fs.writeFileSync(filepath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
console.log('📚 Adding digital books to Wizard of Oz lessons...\n');

let scriptAdded = 0;
let booksAdded = 0;
let skipped = 0;

wizardMapping.forEach(lesson => {
  const dayNum = lesson.day;
  
  // Skip assessments
  if (lesson.type === 'assessment') {
    console.log(`⏭️  Day ${dayNum}: Assessment (skipped)`);
    skipped++;
    return;
  }
  
  // Skip Day 1 (already done manually)
  if (dayNum === 1) {
    console.log(`✅ Day ${dayNum}: Already complete`);
    return;
  }
  
  // Add script tag
  if (addDigitalBookScript(dayNum)) {
    scriptAdded++;
  }
  
  // Add book placeholder
  if (addDigitalBookPlaceholder(dayNum, lesson.chapter, lesson.title, lesson.words)) {
    console.log(`✅ Day ${dayNum}: Chapter ${lesson.chapter} - ${lesson.title}`);
    booksAdded++;
  } else {
    console.log(`⚠️  Day ${dayNum}: Could not update`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Scripts added: ${scriptAdded}`);
console.log(`✅ Books added: ${booksAdded}`);
console.log(`⏭️  Assessments skipped: ${skipped}`);
console.log(`\n🎉 All Wizard of Oz lessons now have digital books!`);
console.log(`📝 Next: Add full chapter text to replace placeholders`);
