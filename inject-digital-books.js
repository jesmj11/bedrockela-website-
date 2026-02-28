const fs = require('fs');
const path = require('path');

// Load all parsed books
const books = {
  'tom-sawyer': JSON.parse(fs.readFileSync('./book-data/tom-sawyer-chapters.json', 'utf8')),
  'twenty-thousand-leagues': JSON.parse(fs.readFileSync('./book-data/twenty-thousand-leagues-chapters.json', 'utf8')),
  'wizard-of-oz': JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-full.json', 'utf8')),
  'around-the-world': JSON.parse(fs.readFileSync('./book-data/around-the-world-chapters.json', 'utf8')),
  'black-beauty': JSON.parse(fs.readFileSync('./book-data/black-beauty-chapters.json', 'utf8')),
  'sherlock-holmes': JSON.parse(fs.readFileSync('./book-data/sherlock-holmes-stories.json', 'utf8')),
  'alice-in-wonderland': JSON.parse(fs.readFileSync('./book-data/alice-in-wonderland-chapters.json', 'utf8'))
};

// Book configurations for each grade/day range
const bookMappings = {
  // 4th Grade
  '4th': {
    '1-30': { book: 'wizard-of-oz', title: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', color: '#1B2A4A' },
    '31-60': { book: 'tom-sawyer', title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', color: '#8B4513' },
    '61-90': { book: 'around-the-world', title: 'Around the World in 80 Days', author: 'Jules Verne', color: '#C17817' },
    '91-120': { book: 'black-beauty', title: 'Black Beauty', author: 'Anna Sewell', color: '#2C2416' },
    '121-150': { book: 'sherlock-holmes', title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', color: '#4A2C2A' },
    '151-180': { book: 'alice-in-wonderland', title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', color: '#6B4C9A' }
  },
  // 6th Grade
  '6th': {
    '1-20': { book: 'tom-sawyer', title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', color: '#8B4513' },
    '21-40': { book: 'twenty-thousand-leagues', title: 'Twenty Thousand Leagues Under the Sea', author: 'Jules Verne', color: '#0B3D91' }
  },
  // 5th Grade (only Around the World for now)
  '5th': {
    '51-80': { book: 'around-the-world', title: 'Around the World in 80 Days', author: 'Jules Verne', color: '#C17817' }
  }
};

// Get book config for a specific grade and day
function getBookConfig(grade, day) {
  const gradeMappings = bookMappings[grade];
  if (!gradeMappings) return null;
  
  for (const [range, config] of Object.entries(gradeMappings)) {
    const [start, end] = range.split('-').map(Number);
    if (day >= start && day <= end) {
      return config;
    }
  }
  return null;
}

// Calculate which chapter(s) for a given day
function getChaptersForDay(bookKey, dayInUnit, totalDaysInUnit) {
  const bookData = books[bookKey];
  if (!bookData) return null;
  
  const totalChapters = Object.keys(bookData).length;
  const regularDays = totalDaysInUnit - Math.floor(totalDaysInUnit / 5); // subtract assessment days
  const chaptersPerDay = totalChapters / regularDays;
  
  // Map day to chapter(s)
  const chapterIndex = Math.floor((dayInUnit - 1) * chaptersPerDay);
  const chapterNum = Math.min(chapterIndex + 1, totalChapters);
  
  return [chapterNum];
}

// Extract vocab words from lesson HTML
function extractVocabWords(html) {
  const words = [];
  const vocabRegex = /<strong>([^<]+)<\/strong>/g;
  const vocabSection = html.match(/📚 Vocabulary[\s\S]*?<\/div>/);
  
  if (vocabSection) {
    let match;
    while ((match = vocabRegex.exec(vocabSection[0])) !== null) {
      const word = match[1].toLowerCase().trim();
      if (word.length > 2 && !words.includes(word)) {
        words.push(word);
      }
    }
  }
  
  return words.slice(0, 10); // max 10 words
}

// Create digital book HTML
function createDigitalBookHTML(bookConfig, chapterNums, vocabWords) {
  const bookData = books[bookConfig.book];
  if (!bookData) return '';
  
  const pages = chapterNums.map(num => {
    const chapter = bookData[num];
    if (!chapter) return null;
    return {
      title: chapter.title || `Chapter ${num}`,
      text: chapter.text || chapter.content || ''
    };
  }).filter(p => p !== null);
  
  if (pages.length === 0) return '';
  
  const config = {
    coverTitle: chapterNums.length === 1 ? `Chapter ${chapterNums[0]}` : `Chapters ${chapterNums[0]}-${chapterNums[chapterNums.length - 1]}`,
    coverSubtitle: pages[0].title,
    coverAuthor: bookConfig.author,
    coverColor: bookConfig.color,
    vocabWords: vocabWords,
    pages: pages
  };
  
  return `
    <!-- Digital Book Integration -->
    <script src="js/digital-book.js"></script>
    <div id="digital-book-container" style="margin: 40px 0;"></div>
    <script>
      const bookConfig = ${JSON.stringify(config, null, 2)};
      window.digitalBook = new DigitalBook('digital-book-container', bookConfig);
    </script>
  `;
}

// Inject digital book into a lesson file
function injectDigitalBook(filepath) {
  if (!fs.existsSync(filepath)) {
    return false;
  }
  
  let html = fs.readFileSync(filepath, 'utf8');
  
  // Check if digital book already exists
  if (html.includes('digital-book-container')) {
    console.log(`  ⏭️  Already has digital book: ${path.basename(filepath)}`);
    return false;
  }
  
  // Extract grade and lesson number from filename
  const match = path.basename(filepath).match(/(\d+)[a-z]{2}-grade-lesson-(\d+)/);
  if (!match) return false;
  
  const [, grade, lessonNum] = match;
  const day = parseInt(lessonNum);
  
  // Skip assessment days (every 5th day)
  if (day % 5 === 0) {
    return false;
  }
  
  // Get book config
  const bookConfig = getBookConfig(`${grade}th`, day);
  if (!bookConfig) {
    return false; // No book for this grade/day range
  }
  
  // Calculate which chapter(s)
  const [rangeStart] = Object.keys(bookMappings[`${grade}th`]).find(range => {
    const [start, end] = range.split('-').map(Number);
    return day >= start && day <= end;
  }).split('-').map(Number);
  
  const dayInUnit = day - rangeStart + 1;
  const [rangeEnd] = Object.keys(bookMappings[`${grade}th`]).find(range => {
    const [start, end] = range.split('-').map(Number);
    return day >= start && day <= end;
  }).split('-').map(Number).reverse();
  
  const totalDaysInUnit = rangeEnd - rangeStart + 1;
  const chapterNums = getChaptersForDay(bookConfig.book, dayInUnit, totalDaysInUnit);
  
  if (!chapterNums) return false;
  
  // Extract vocab words
  const vocabWords = extractVocabWords(html);
  
  // Create digital book HTML
  const digitalBookHTML = createDigitalBookHTML(bookConfig, chapterNums, vocabWords);
  if (!digitalBookHTML) return false;
  
  // Find insertion point (after Reading page, before Comprehension)
  const insertionPoint = html.indexOf('<!-- Page 5: Comprehension -->');
  if (insertionPoint === -1) {
    console.log(`  ⚠️  Could not find insertion point: ${path.basename(filepath)}`);
    return false;
  }
  
  // Insert digital book
  html = html.slice(0, insertionPoint) + digitalBookHTML + '\n\n        ' + html.slice(insertionPoint);
  
  // Write updated file
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`  ✅ Added ${bookConfig.title} Chapter ${chapterNums}: ${path.basename(filepath)}`);
  return true;
}

// Process all lessons for a grade
function processGrade(grade, totalLessons) {
  console.log(`\n📚 Processing ${grade} Grade (${totalLessons} lessons)...`);
  
  let successCount = 0;
  for (let lesson = 1; lesson <= totalLessons; lesson++) {
    const gradeNum = grade.replace(/\D/g, ''); // extract number
    const filepath = `./${gradeNum}th-grade-lesson-${lesson}-REVISED.html`;
    
    if (injectDigitalBook(filepath)) {
      successCount++;
    }
  }
  
  console.log(`✨ Added digital books to ${successCount} lessons`);
  return successCount;
}

// Main execution
console.log('🐉 Injecting Digital Books into Lessons...\n');

let totalAdded = 0;

// 4th Grade - all 6 books
totalAdded += processGrade('4th', 180);

// 6th Grade - 2 books (Days 1-40)
totalAdded += processGrade('6th', 40);

// 5th Grade - Around the World (Days 51-80)
totalAdded += processGrade('5th', 80);

console.log(`\n🎉 DONE! Added digital books to ${totalAdded} total lessons!`);
console.log('\nNext steps:');
console.log('1. Test a lesson file in browser');
console.log('2. git add . && git commit && git push');
console.log('3. Digital books will be live on bedrockela.com! 📚✨');
