/**
 * Add Sherlock Holmes Digital Books to Lesson Files
 * Integrates parsed stories into 4th Grade Days 121-150
 */

const fs = require('fs');
const path = require('path');
const { fourthGradeMapping } = require('./sherlock-holmes-chapter-mapping.js');

// Load the parsed stories
const storiesData = JSON.parse(
  fs.readFileSync('./book-data/sherlock-holmes-stories.json', 'utf8')
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
 * Create digital book HTML for a story
 */
function createDigitalBookHTML(storyNumber, vocabWords) {
  const story = storiesData[storyNumber];
  if (!story) {
    console.error(`Story ${storyNumber} not found!`);
    return null;
  }

  const config = {
    coverTitle: "Sherlock Holmes",
    coverSubtitle: story.title,
    coverAuthor: "Arthur Conan Doyle",
    coverColor: "#4A2C2A", // Victorian brown
    vocabWords: vocabWords,
    pages: [{
      title: story.title,
      text: story.text
    }]
  };

  return `
    <!-- Digital Book Integration -->
    <script src="js/digital-book.js"></script>
    <div id="sherlock-holmes-book"></div>
    <script>
      const sherlockHolmesConfig = ${JSON.stringify(config, null, 2)};
      window.sherlockHolmesBook = new DigitalBook('sherlock-holmes-book', sherlockHolmesConfig);
    </script>
  `;
}

/**
 * Add digital book to a lesson file
 */
function addDigitalBookToLesson(lessonPath, storyNumber) {
  if (!fs.existsSync(lessonPath)) {
    console.log(`⚠️  Lesson file not found: ${lessonPath}`);
    return false;
  }

  let html = fs.readFileSync(lessonPath, 'utf8');

  // Check if digital book already exists
  if (html.includes('sherlock-holmes-book')) {
    console.log(`✅ Digital book already in ${path.basename(lessonPath)}`);
    return true;
  }

  // Extract vocabulary words
  const vocabWords = extractVocabWords(lessonPath);

  // Create the digital book HTML
  const digitalBookHTML = createDigitalBookHTML(storyNumber, vocabWords);
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
  console.log(`✅ Added Sherlock Holmes to ${path.basename(lessonPath)} (Story ${storyNumber})`);
  return true;
}

/**
 * Process all lessons
 */
function processAllLessons() {
  console.log('🔍 Adding Sherlock Holmes Digital Books to Lessons...\n');

  let successCount = 0;
  let totalCount = 0;

  console.log('📚 Processing 4th Grade (Days 121-150)...');
  for (let day = 121; day <= 150; day++) {
    const storyNum = fourthGradeMapping[day];
    if (storyNum === null) {
      console.log(`⏭️  Day ${day} is assessment day (skipping)`);
      continue;
    }

    totalCount++;
    const lessonPath = `./4th-grade-day-${day}.html`;
    if (addDigitalBookToLesson(lessonPath, storyNum)) {
      successCount++;
    }
  }

  console.log(`\n🎉 Done! Added digital books to ${successCount}/${totalCount} lessons`);
}

// Run the script
processAllLessons();
