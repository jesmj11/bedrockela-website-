/**
 * Add Black Beauty Digital Books to Lesson Files
 * Integrates parsed chapters into 4th Grade Days 91-120
 */

const fs = require('fs');
const path = require('path');
const { fourthGradeMapping } = require('./black-beauty-chapter-mapping.js');

// Load the parsed chapters
const chaptersData = JSON.parse(
  fs.readFileSync('./book-data/black-beauty-chapters.json', 'utf8')
);

/**
 * Extract vocabulary words from a lesson file
 */
function extractVocabWords(lessonPath) {
  const html = fs.readFileSync(lessonPath, 'utf8');
  const vocabMatch = html.match(/<h2>📖 Vocabulary<\/h2>([\s\S]*?)<\/div>/);
  if (!vocabMatch) return [];

  const words = [];
  const wordMatches = html.matchAll(/<p><strong>(.*?)<\/strong>/g);
  for (const match of wordMatches) {
    words.push(match[1].toLowerCase());
  }
  return words;
}

/**
 * Create digital book HTML for chapter(s)
 */
function createDigitalBookHTML(chapterNumbers, vocabWords) {
  const chapters = Array.isArray(chapterNumbers) ? chapterNumbers : [chapterNumbers];
  
  // Build pages from chapters
  const pages = chapters.map(num => {
    const chapter = chaptersData[num];
    if (!chapter) {
      console.error(`Chapter ${num} not found!`);
      return null;
    }
    
    return {
      title: chapter.title,
      text: chapter.text
    };
  }).filter(p => p !== null);

  // Create config
  const config = {
    coverTitle: chapters.length === 1 
      ? `Chapter ${chapters[0]}`
      : `Chapters ${chapters[0]}-${chapters[chapters.length - 1]}`,
    coverSubtitle: pages[0].title,
    coverAuthor: "Anna Sewell",
    coverColor: "#2C2416", // Dark brown/black for the horse
    vocabWords: vocabWords,
    pages: pages
  };

  return `
    <!-- Digital Book Integration -->
    <script src="js/digital-book.js"></script>
    <div id="black-beauty-book"></div>
    <script>
      const blackBeautyConfig = ${JSON.stringify(config, null, 2)};
      window.blackBeautyBook = new DigitalBook('black-beauty-book', blackBeautyConfig);
    </script>
  `;
}

/**
 * Add digital book to a lesson file
 */
function addDigitalBookToLesson(lessonPath, chapterNumbers) {
  if (!fs.existsSync(lessonPath)) {
    console.log(`⚠️  Lesson file not found: ${lessonPath}`);
    return false;
  }

  let html = fs.readFileSync(lessonPath, 'utf8');

  // Check if digital book already exists
  if (html.includes('black-beauty-book')) {
    console.log(`✅ Digital book already in ${path.basename(lessonPath)}`);
    return true;
  }

  // Extract vocabulary words
  const vocabWords = extractVocabWords(lessonPath);

  // Create the digital book HTML
  const digitalBookHTML = createDigitalBookHTML(chapterNumbers, vocabWords);
  if (!digitalBookHTML) return false;

  // Find insertion point (after reading section, before comprehension)
  const insertionPoint = html.indexOf('<h2>🎯 Comprehension Questions</h2>');
  if (insertionPoint === -1) {
    console.log(`⚠️  Could not find insertion point in ${path.basename(lessonPath)}`);
    return false;
  }

  // Insert the digital book
  html = html.slice(0, insertionPoint) + digitalBookHTML + '\n\n    ' + html.slice(insertionPoint);

  // Write the updated file
  fs.writeFileSync(lessonPath, html, 'utf8');
  console.log(`✅ Added Black Beauty to ${path.basename(lessonPath)} (Chapters: ${chapterNumbers})`);
  return true;
}

/**
 * Process all lessons
 */
function processAllLessons() {
  console.log('🐴 Adding Black Beauty Digital Books to Lessons...\n');

  let successCount = 0;
  let totalCount = 0;

  console.log('📚 Processing 4th Grade (Days 91-120)...');
  for (let day = 91; day <= 120; day++) {
    const chapterNums = fourthGradeMapping[day];
    if (chapterNums === null) {
      console.log(`⏭️  Day ${day} is assessment day (skipping)`);
      continue;
    }

    totalCount++;
    const lessonPath = `./4th-grade-day-${day}.html`;
    if (addDigitalBookToLesson(lessonPath, chapterNums)) {
      successCount++;
    }
  }

  console.log(`\n🎉 Done! Added digital books to ${successCount}/${totalCount} lessons`);
}

// Run the script
processAllLessons();
