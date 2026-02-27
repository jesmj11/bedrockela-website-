/**
 * Add Twenty Thousand Leagues Digital Books to 6th Grade Lessons
 * Days 21-30 (10 days, 2 assessment days)
 */

const fs = require('fs');
const path = require('path');

// Load the parsed chapters
const chaptersData = JSON.parse(
  fs.readFileSync('./book-data/twenty-thousand-leagues-chapters.json', 'utf8')
);

// 6th Grade Days 21-30
// Assessment days: 25, 30
// 8 regular lesson days → 21 chapters spread across them (2-3 per day)
const mapping = {
  21: [1, 2],
  22: [3, 4],
  23: [5, 6],
  24: [7, 8],
  25: null,      // Assessment day
  26: [9, 10, 11],
  27: [12, 13, 14],
  28: [15, 16, 17],
  29: [18, 19, 20, 21],
  30: null       // Assessment day
};

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
 * Create digital book HTML for chapters
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
    coverAuthor: "Jules Verne",
    coverColor: "#1B4D89",
    vocabWords: vocabWords,
    pages: pages
  };

  return `
    <!-- Digital Book Integration -->
    <script src="js/digital-book.js"></script>
    <div id="twenty-thousand-leagues-book"></div>
    <script>
      const twentyThousandLeaguesConfig = ${JSON.stringify(config, null, 2)};
      window.twentyThousandLeaguesBook = new DigitalBook('twenty-thousand-leagues-book', twentyThousandLeaguesConfig);
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
  if (html.includes('twenty-thousand-leagues-book')) {
    console.log(`✅ Digital book already in ${path.basename(lessonPath)}`);
    return true;
  }

  // Extract vocabulary words
  const vocabWords = extractVocabWords(lessonPath);

  // Create the digital book HTML
  const digitalBookHTML = createDigitalBookHTML(chapterNumbers, vocabWords);

  // Find insertion point (after reading section, before comprehension)
  const insertionPoint = html.indexOf('<h2>📝 Comprehension Questions</h2>');
  if (insertionPoint === -1) {
    console.log(`⚠️  Could not find insertion point in ${path.basename(lessonPath)}`);
    return false;
  }

  // Insert the digital book
  html = html.slice(0, insertionPoint) + digitalBookHTML + '\n\n    ' + html.slice(insertionPoint);

  // Write the updated file
  fs.writeFileSync(lessonPath, html, 'utf8');
  console.log(`✅ Added Twenty Thousand Leagues to ${path.basename(lessonPath)} (Chapters: ${chapterNumbers})`);
  return true;
}

/**
 * Process all lessons
 */
function processAllLessons() {
  console.log('🐉 Adding Twenty Thousand Leagues Digital Books to 6th Grade...\n');

  let successCount = 0;
  let totalCount = 0;

  for (let day = 21; day <= 30; day++) {
    const chapterNums = mapping[day];
    if (chapterNums === null) {
      console.log(`⏭️  Day ${day} is assessment day (skipping)`);
      continue;
    }

    totalCount++;
    const lessonPath = `./lessons/6th-grade-day-${day}.html`;
    if (addDigitalBookToLesson(lessonPath, chapterNums)) {
      successCount++;
    }
  }

  console.log(`\n🎉 Done! Added digital books to ${successCount}/${totalCount} lessons`);
}

// Run the script
processAllLessons();
