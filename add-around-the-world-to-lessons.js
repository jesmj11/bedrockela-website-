/**
 * Add Around the World in 80 Days Digital Books to Lesson Files
 * Integrates parsed chapters into 4th Grade Days 61-90
 */

const fs = require('fs');
const path = require('path');
const { fourthGradeMapping } = require('./around-the-world-chapter-mapping.js');

// Load the parsed chapters
const chaptersData = JSON.parse(
  fs.readFileSync('./book-data/around-the-world-chapters.json', 'utf8')
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
 * Create digital book HTML for a chapter
 */
function createDigitalBookHTML(chapterNumber, vocabWords) {
  const chapter = chaptersData[chapterNumber];
  if (!chapter) {
    console.error(`Chapter ${chapterNumber} not found!`);
    return null;
  }

  const config = {
    coverTitle: `Chapter ${chapterNumber}`,
    coverSubtitle: chapter.title,
    coverAuthor: "Jules Verne",
    coverColor: "#C17817", // Orange/gold for adventure
    vocabWords: vocabWords,
    pages: [{
      title: chapter.title,
      text: chapter.text
    }]
  };

  return `
    <!-- Digital Book Integration -->
    <script src="js/digital-book.js"></script>
    <div id="around-world-book"></div>
    <script>
      const aroundWorldConfig = ${JSON.stringify(config, null, 2)};
      window.aroundWorldBook = new DigitalBook('around-world-book', aroundWorldConfig);
    </script>
  `;
}

/**
 * Add digital book to a lesson file
 */
function addDigitalBookToLesson(lessonPath, chapterNumber) {
  if (!fs.existsSync(lessonPath)) {
    console.log(`⚠️  Lesson file not found: ${lessonPath}`);
    return false;
  }

  let html = fs.readFileSync(lessonPath, 'utf8');

  // Check if digital book already exists
  if (html.includes('around-world-book')) {
    console.log(`✅ Digital book already in ${path.basename(lessonPath)}`);
    return true;
  }

  // Extract vocabulary words
  const vocabWords = extractVocabWords(lessonPath);

  // Create the digital book HTML
  const digitalBookHTML = createDigitalBookHTML(chapterNumber, vocabWords);
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
  console.log(`✅ Added Around the World to ${path.basename(lessonPath)} (Chapter ${chapterNumber})`);
  return true;
}

/**
 * Process all lessons
 */
function processAllLessons() {
  console.log('🌍 Adding Around the World in 80 Days Digital Books to Lessons...\n');

  let successCount = 0;
  let totalCount = 0;

  console.log('📚 Processing 4th Grade (Days 61-90)...');
  for (let day = 61; day <= 90; day++) {
    const chapterNum = fourthGradeMapping[day];
    if (chapterNum === null) {
      console.log(`⏭️  Day ${day} is assessment day (skipping)`);
      continue;
    }

    totalCount++;
    const lessonPath = `./4th-grade-day-${day}.html`;
    if (addDigitalBookToLesson(lessonPath, chapterNum)) {
      successCount++;
    }
  }

  console.log(`\n🎉 Done! Added digital books to ${successCount}/${totalCount} lessons`);
}

// Run the script
processAllLessons();
