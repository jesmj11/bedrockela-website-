const fs = require('fs');

// Chapter to lesson mapping
const lessonChapters = {
  1: [1],
  2: [2],
  3: [3],
  4: [4, 5],
  5: [6],
  6: [7],
  7: [8],
  8: [9, 10],
  9: [11],
  10: [12],
  11: [13, 14],
  12: [15],
  13: [16],
  14: [17, 18],
  15: [19, 20, 21, 22, 23, 24]
};

// Update each 4th grade lesson file (1-15) to load Wizard of Oz
for (let lessonNum = 1; lessonNum <= 15; lessonNum++) {
  const filename = `4th-grade-lesson-${lessonNum}-v2.html`;
  
  if (fs.existsSync(filename)) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Replace the book reference
    content = content.replace(
      /fetch\('book-data\/three-billy-goats-gruff-lessons-1-10\.json'\)/,
      `fetch('book-data/wizard-of-oz-full.json')`
    );
    
    // Update bookId
    content = content.replace(
      /bookConfig\.bookId = 'three-billy-goats-gruff-lessons-1-10';/,
      `bookConfig.bookId = 'wizard-of-oz-full';`
    );
    
    // Update max page index based on chapters for this lesson
    const chapters = lessonChapters[lessonNum];
    // Each lesson can read its assigned chapters (cumulative unlocking)
    let maxPageIndex = 0;
    for (let i = 1; i <= lessonNum; i++) {
      maxPageIndex += lessonChapters[i].length;
    }
    maxPageIndex -= 1; // Zero-indexed
    
    content = content.replace(
      /maxPageIndex: \d+,/,
      `maxPageIndex: ${maxPageIndex},`
    );
    
    fs.writeFileSync(filename, content);
    console.log(`✅ Updated ${filename} - Wizard of Oz chapters ${chapters.join(', ')}, max page ${maxPageIndex}`);
  }
}

console.log('\n✅ All 4th grade lessons 1-15 updated to use Wizard of Oz!');
