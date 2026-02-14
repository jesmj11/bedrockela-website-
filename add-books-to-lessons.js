/**
 * Add digital book readers to lesson pages
 * Inserts a "📖 Story Time" section before the flashcard game
 */

const fs = require('fs');
const path = require('path');

// Load the lesson-to-book mapping
const mappingPath = path.join(__dirname, 'book-data', 'lesson-to-book-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Process 1st grade lessons (1-30)
for (let lessonNum = 1; lessonNum <= 30; lessonNum++) {
  const lessonFile = path.join(__dirname, `1st-grade-lesson-${lessonNum}.html`);
  
  // Check if lesson file exists
  if (!fs.existsSync(lessonFile)) {
    console.log(`⏭️  Skipping lesson ${lessonNum} (file not found)`);
    continue;
  }
  
  // Check if this lesson has a book
  const bookFilename = mapping[lessonNum];
  if (!bookFilename) {
    console.log(`⏭️  Skipping lesson ${lessonNum} (no book mapped)`);
    continue;
  }
  
  let html = fs.readFileSync(lessonFile, 'utf-8');
  
  // Check if book already added
  if (html.includes('digital-book.css') || html.includes('story-time-section')) {
    console.log(`✅ Lesson ${lessonNum} already has book reader`);
    continue;
  }
  
  // Add digital-book.css to head (after flashcard-game.css)
  html = html.replace(
    '<link rel="stylesheet" href="css/flashcard-game.css">',
    `<link rel="stylesheet" href="css/flashcard-game.css">
    <link rel="stylesheet" href="css/digital-book.css">`
  );
  
  // Find where to insert the book section (before the flashcard game section)
  const bookSectionHTML = `
        <!-- 📖 Story Time Section -->
        <div class="lesson-card story-time-section">
            <h2 style="color: #B06821; font-size: 1.8rem; margin-bottom: 20px; text-align: center;">
                📖 Story Time
            </h2>
            <div id="story-book" class="digital-book-container" style="min-height: auto; background: transparent; padding: 0;"></div>
        </div>
`;
  
  // Insert before flashcard game section
  const flashcardSectionMarker = '<!-- Flashcard Matching Game Section -->';
  if (html.includes(flashcardSectionMarker)) {
    html = html.replace(flashcardSectionMarker, bookSectionHTML + '\n        ' + flashcardSectionMarker);
  } else {
    // If no flashcard section, insert before nav buttons
    const navButtonsMarker = '<div class="nav-buttons">';
    html = html.replace(navButtonsMarker, bookSectionHTML + '\n        ' + navButtonsMarker);
  }
  
  // Add script to load the book (before closing </body>)
  const bookScript = `
    <script src="js/digital-book.js"></script>
    <script>
        // Load book for this lesson
        fetch('book-data/${bookFilename}')
            .then(response => response.json())
            .then(bookConfig => {
                // Add unique book ID for progress tracking
                bookConfig.bookId = '${bookFilename.replace('.json', '')}';
                createDigitalBook('story-book', bookConfig);
            })
            .catch(error => {
                console.error('Error loading book:', error);
            });
    </script>
`;
  
  // Insert before closing body tag
  html = html.replace('</body>', bookScript + '</body>');
  
  // Write back
  fs.writeFileSync(lessonFile, html);
  console.log(`✅ Added book "${bookFilename}" to lesson ${lessonNum}`);
}

console.log('\n📚 Done! Book readers added to lessons.');
