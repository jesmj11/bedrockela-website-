const fs = require('fs');
const wizardMapping = require('./wizard-of-oz-chapter-mapping.js');

function embedBookInLesson(dayNum, chapterNum, chapterTitle, vocabWords) {
  const filename = `4th-grade-day-${dayNum}.html`;
  
  if (!fs.existsSync(filename)) {
    console.log(`⚠️  ${filename} not found`);
    return false;
  }
  
  let content = fs.readFileSync(filename, 'utf8');
  
  // 1. Add digital-book.js if needed
  if (!content.includes('digital-book.js')) {
    content = content.replace(
      '<script src="js/lesson-viewer.js"></script>',
      '<script src="js/lesson-viewer.js"></script>\n    <script src="js/digital-book.js"></script>'
    );
  }
  
  // 2. Find the reading section marker
  const marker = `// Page 4: Reading`;
  const markerIndex = content.indexOf(marker);
  
  if (markerIndex === -1) {
    console.log(`⚠️  Day ${dayNum}: Could not find reading page marker`);
    return false;
  }
  
  // 3. Find the end of this page object (look for the next page marker or end)
  const nextPageMarker = `// Page 5:`;
  const endIndex = content.indexOf(nextPageMarker, markerIndex);
  
  if (endIndex === -1) {
    console.log(`⚠️  Day ${dayNum}: Could not find end of reading page`);
    return false;
  }
  
  // 4. Extract everything before and after
  const before = content.substring(0, markerIndex);
  const after = content.substring(endIndex);
  
  // 5. Create the new reading page with embedded book
  const newReadingPage = `// Page 4: Reading (Digital Book)
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
                                            text: "This is Chapter ${chapterNum}: ${chapterTitle} from The Wonderful Wizard of Oz by L. Frank Baum.\\n\\nThe full chapter text will be added here, broken into readable pages of about 400 words each.\\n\\nVocabulary words for this chapter are: ${vocabWords.join(', ')}.\\n\\nThese words will be highlighted in yellow throughout the text to help you learn them in context!"
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
                },
                
                `;
  
  // 6. Combine
  const newContent = before + newReadingPage + after;
  
  // 7. Write back
  fs.writeFileSync(filename, newContent, 'utf8');
  
  return true;
}

// Run for all non-assessment days
console.log('📚 Embedding books in all Wizard of Oz lessons...\n');

let count = 0;
wizardMapping.forEach(lesson => {
  if (lesson.type === 'assessment') {
    console.log(`⏭️  Day ${lesson.day}: Assessment`);
    return;
  }
  
  if (lesson.day === 1) {
    console.log(`✅ Day ${lesson.day}: Already complete`);
    return;
  }
  
  if (embedBookInLesson(lesson.day, lesson.chapter, lesson.title, lesson.words)) {
    console.log(`✅ Day ${lesson.day}: Chapter ${lesson.chapter} - ${lesson.title}`);
    count++;
  }
});

console.log(`\n🎉 Success! Embedded books in ${count} lessons`);
console.log(`📝 Next: Add full chapter text to each book config`);
