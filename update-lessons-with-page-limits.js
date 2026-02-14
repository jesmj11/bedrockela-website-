/**
 * Update lesson pages to load books with page limits
 */

const fs = require('fs');
const path = require('path');

// Load mappings
const pageLimitsPath = path.join(__dirname, 'book-data', 'lesson-page-limits.json');
const pageLimits = JSON.parse(fs.readFileSync(pageLimitsPath, 'utf-8'));

// Process 1st grade lessons (1-30)
for (let lessonNum = 1; lessonNum <= 30; lessonNum++) {
  const lessonFile = path.join(__dirname, `1st-grade-lesson-${lessonNum}.html`);
  
  if (!fs.existsSync(lessonFile)) {
    console.log(`⏭️  Skipping lesson ${lessonNum} (file not found)`);
    continue;
  }
  
  const pageLimit = pageLimits[lessonNum];
  if (!pageLimit) {
    console.log(`⏭️  Skipping lesson ${lessonNum} (no page limit)`);
    continue;
  }
  
  let html = fs.readFileSync(lessonFile, 'utf-8');
  
  // Find the book loading script and update it to include page limits
  const bookFilename = pageLimit.bookFile;
  const maxPageIndex = pageLimit.maxPageIndex;
  
  // Replace the createDigitalBook call
  const oldPattern = new RegExp(
    `createDigitalBook\\('story-book', bookConfig\\);`,
    'g'
  );
  
  const newCall = `createDigitalBook('story-book', bookConfig, {
                    maxPageIndex: ${maxPageIndex},
                    lessonNumber: ${lessonNum}
                });`;
  
  if (html.match(oldPattern)) {
    html = html.replace(oldPattern, newCall);
    fs.writeFileSync(lessonFile, html);
    console.log(`✅ Updated lesson ${lessonNum}: pages 0-${maxPageIndex} of ${pageLimit.totalPages}`);
  } else {
    console.log(`⏭️  Lesson ${lessonNum} pattern not found`);
  }
}

console.log('\n📚 Done! Lessons updated with progressive page unlocking.');
