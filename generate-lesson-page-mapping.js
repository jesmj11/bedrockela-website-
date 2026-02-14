/**
 * Generate mapping of lesson numbers to available pages in each book
 * For books that span multiple lessons, progressively unlock pages
 */

const fs = require('fs');
const path = require('path');

const mappingPath = path.join(__dirname, 'book-data', 'lesson-to-book-mapping.json');
const bookDataDir = path.join(__dirname, 'book-data');

const lessonToBook = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Build reverse mapping: book -> [lessons]
const bookToLessons = {};
Object.entries(lessonToBook).forEach(([lesson, bookFile]) => {
  if (!bookToLessons[bookFile]) {
    bookToLessons[bookFile] = [];
  }
  bookToLessons[bookFile].push(parseInt(lesson));
});

// Sort lessons for each book
Object.keys(bookToLessons).forEach(bookFile => {
  bookToLessons[bookFile].sort((a, b) => a - b);
});

// Build the lesson -> maxPage mapping
const lessonPageMapping = {};

Object.entries(bookToLessons).forEach(([bookFile, lessons]) => {
  // Load book to get total page count
  const bookPath = path.join(bookDataDir, bookFile);
  const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf-8'));
  const totalPages = bookData.pages.length;
  
  const lessonCount = lessons.length;
  
  // Distribute pages across lessons
  lessons.forEach((lessonNum, index) => {
    // Progressive unlock: lesson N gets pages 0 through (N's position / total lessons * total pages)
    // Round up so later lessons unlock more pages
    const maxPageIndex = Math.ceil(((index + 1) / lessonCount) * totalPages) - 1;
    
    lessonPageMapping[lessonNum] = {
      bookFile,
      maxPageIndex,
      totalPages,
      lessonInSequence: index + 1,
      totalLessons: lessonCount
    };
  });
});

// Save the mapping
const outputPath = path.join(bookDataDir, 'lesson-page-limits.json');
fs.writeFileSync(outputPath, JSON.stringify(lessonPageMapping, null, 2));

console.log('📖 Generated lesson page limits:');
console.log(`   Total lessons: ${Object.keys(lessonPageMapping).length}`);
console.log(`   Saved to: ${outputPath}`);

// Show some examples
console.log('\n📚 Examples:');
[1, 5, 10, 11, 15, 20].forEach(lesson => {
  if (lessonPageMapping[lesson]) {
    const info = lessonPageMapping[lesson];
    console.log(`   Lesson ${lesson}: pages 0-${info.maxPageIndex} of ${info.totalPages} (${info.lessonInSequence}/${info.totalLessons} in book)`);
  }
});
