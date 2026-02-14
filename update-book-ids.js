/**
 * Update existing book readers to include bookId for progress tracking
 */

const fs = require('fs');
const path = require('path');

// Load the lesson-to-book mapping
const mappingPath = path.join(__dirname, 'book-data', 'lesson-to-book-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Process 1st grade lessons (1-30)
for (let lessonNum = 1; lessonNum <= 30; lessonNum++) {
  const lessonFile = path.join(__dirname, `1st-grade-lesson-${lessonNum}.html`);
  
  if (!fs.existsSync(lessonFile)) {
    console.log(`⏭️  Skipping lesson ${lessonNum} (file not found)`);
    continue;
  }
  
  const bookFilename = mapping[lessonNum];
  if (!bookFilename) {
    console.log(`⏭️  Skipping lesson ${lessonNum} (no book mapped)`);
    continue;
  }
  
  let html = fs.readFileSync(lessonFile, 'utf-8');
  
  // Find and replace the book loading script
  const oldPattern = new RegExp(
    `fetch\\('book-data/${bookFilename}'\\)\\s*\\.then\\(response => response\\.json\\(\\)\\)\\s*\\.then\\(bookConfig => {\\s*createDigitalBook\\('story-book', bookConfig\\);`,
    'g'
  );
  
  const newScript = `fetch('book-data/${bookFilename}')
            .then(response => response.json())
            .then(bookConfig => {
                // Add unique book ID for progress tracking
                bookConfig.bookId = '${bookFilename.replace('.json', '')}';
                createDigitalBook('story-book', bookConfig);`;
  
  if (html.match(oldPattern)) {
    html = html.replace(oldPattern, newScript);
    fs.writeFileSync(lessonFile, html);
    console.log(`✅ Updated lesson ${lessonNum} with bookId`);
  } else {
    console.log(`⏭️  Lesson ${lessonNum} already updated or pattern not found`);
  }
}

console.log('\n📚 Done! Book IDs updated.');
