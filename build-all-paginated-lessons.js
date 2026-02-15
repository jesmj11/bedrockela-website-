/**
 * Build all 30 paginated 1st grade lessons
 * Teaching Textbooks style with BedrockELA colors
 */

const fs = require('fs');
const path = require('path');

// Load mappings
const pageLimits = JSON.parse(fs.readFileSync('book-data/lesson-page-limits.json', 'utf-8'));

// Lesson content simplified - one concept per page
const lessons = [
  {
    num: 1,
    title: "Short Vowel Valley",
    subtitle: "Meet Billy and Learn About Vowels!",
    teachingPages: [
      {
        title: "What are Vowels?",
        content: `<p>Every word needs a vowel! Vowels are special letters that make sounds in the middle of words.</p>
          <div style="text-align: center; font-size: 48px; margin: 30px 0;">A E I O U</div>
          <p><strong>These are the vowel letters!</strong> Each one makes its own sound.</p>`
      },
      {
        title: "A says 'ah'",
        content: `<div style="text-align: center; font-size: 72px; margin: 20px 0; color: #B06821;">A</div>
          <p style="font-size: 24px; text-align: center;"><strong>A says "ah" like in cat</strong></p>
          <p>Try saying these words: <strong>cat, hat, mat, pan, ran</strong></p>`
      },
      {
        title: "E says 'eh'",
        content: `<div style="text-align: center; font-size: 72px; margin: 20px 0; color: #B06821;">E</div>
          <p style="font-size: 24px; text-align: center;"><strong>E says "eh" like in bed</strong></p>
          <p>Try saying these words: <strong>bed, red, ten, pen, hen</strong></p>`
      },
      {
        title: "I says 'ih'",
        content: `<div style="text-align: center; font-size: 72px; margin: 20px 0; color: #B06821;">I</div>
          <p style="font-size: 24px; text-align: center;"><strong>I says "ih" like in pig</strong></p>
          <p>Try saying these words: <strong>sit, pig, big, win, hit</strong></p>`
      },
      {
        title: "O says 'ah'",
        content: `<div style="text-align: center; font-size: 72px; margin: 20px 0; color: #B06821;">O</div>
          <p style="font-size: 24px; text-align: center;"><strong>O says "ah" like in dog</strong></p>
          <p>Try saying these words: <strong>dog, hop, box, dot, hot</strong></p>`
      },
      {
        title: "U says 'uh'",
        content: `<div style="text-align: center; font-size: 72px; margin: 20px 0; color: #B06821;">U</div>
          <p style="font-size: 24px; text-align: center;"><strong>U says "uh" like in bug</strong></p>
          <p>Try saying these words: <strong>bug, hug, cup, sun, run</strong></p>`
      }
    ],
    letterExplorer: [
      { word: "cat", emoji: "🐱", definition: "A small furry animal that purrs and says meow!", example: "The cat sat on the mat." },
      { word: "bed", emoji: "🛏️", definition: "A soft place where you sleep at night!", example: "I go to bed at 8 o'clock." },
      { word: "pig", emoji: "🐷", definition: "A pink farm animal that says oink!", example: "The pig rolls in the mud." },
      { word: "dog", emoji: "🐶", definition: "A friendly animal that barks!", example: "The dog loves to play fetch." },
      { word: "sun", emoji: "☀️", definition: "The bright star in the sky!", example: "The sun is shining today." }
    ],
    flashcards: [
      { term: "A", match: 'Says "ah" like cat' },
      { term: "E", match: 'Says "eh" like bed' },
      { term: "I", match: 'Says "ih" like pig' },
      { term: "O", match: 'Says "ah" like dog' },
      { term: "U", match: 'Says "uh" like bug' }
    ]
  }
];

// Duplicate the lesson 1 pattern for all 30 lessons (simplified for now)
for (let i = 2; i <= 30; i++) {
  lessons.push({
    num: i,
    title: `Lesson ${i}`,
    subtitle: "Learn and Practice!",
    teachingPages: [
      {
        title: `Lesson ${i} Introduction`,
        content: `<p>Welcome to Lesson ${i}! Today you'll learn new phonics skills.</p>
          <p>Follow along with Billy the Goat as we explore new sounds and words!</p>`
      }
    ],
    letterExplorer: [
      { word: "cat", emoji: "🐱", definition: "A small furry animal!", example: "The cat sat on the mat." },
      { word: "dog", emoji: "🐶", definition: "A friendly animal!", example: "The dog barks." },
      { word: "sun", emoji: "☀️", definition: "The bright star!", example: "The sun shines." }
    ],
    flashcards: [
      { term: "A", match: "Sound ah" },
      { term: "E", match: "Sound eh" },
      { term: "I", match: "Sound ih" }
    ]
  });
}

function generateLessonHTML(lesson) {
  const pageLimit = pageLimits[lesson.num];
  const bookFilename = pageLimit ? pageLimit.bookFile : null;
  const maxPageIndex = pageLimit ? pageLimit.maxPageIndex : 0;

  // Build pages array
  let pagesJS = [];

  // Title page
  pagesJS.push(`{
    render: () => \`
      <div class="lesson-page-card title-page">
        <div class="character">🐐</div>
        <h1>Lesson ${lesson.num}</h1>
        <div class="subtitle">${lesson.subtitle}</div>
        <p style="color: #B06821; font-size: 18px; margin-top: 20px;">
          Meet Billy the Goat!<br>
          He'll help you learn all about phonics!
        </p>
      </div>
    \`
  }`);

  // Teaching pages
  lesson.teachingPages.forEach(page => {
    pagesJS.push(`{
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>${page.title}</h2>
          ${page.content}
        </div>
      \`
    }`);
  });

  // Story Time page
  if (bookFilename) {
    pagesJS.push(`{
      render: (progress, markComplete) => {
        return \`
          <div class="lesson-page-card activity-section">
            <h2>📖 Story Time</h2>
            <p>Read the story with Billy!</p>
            \${progress.story_completed ? '<div class="completion-badge">✅ Story Complete!</div>' : ''}
            <div id="story-book" class="digital-book-container" style="margin-top: 20px;"></div>
          </div>
        \`;
      },
      onLoad: () => {
        fetch('book-data/${bookFilename}')
          .then(response => response.json())
          .then(bookConfig => {
            bookConfig.bookId = '${bookFilename.replace('.json', '')}';
            createDigitalBook('story-book', bookConfig, {
              maxPageIndex: ${maxPageIndex},
              lessonNumber: ${lesson.num},
              onComplete: () => {
                window.lessonMarkComplete('story');
              }
            });
          });
      }
    }`);
  }

  // Letter Explorer page
  pagesJS.push(`{
    render: (progress, markComplete) => {
      return \`
        <div class="lesson-page-card activity-section">
          <h2>🔤 Letter Explorer</h2>
          <p>Spell words by dragging letters!</p>
          \${progress.letter_explorer_completed ? '<div class="completion-badge">✅ Game Complete!</div>' : ''}
          <div id="letter-explorer-game" class="letter-explorer-container" style="margin-top: 20px;"></div>
        </div>
      \`;
    },
    onLoad: () => {
      createLetterExplorer('letter-explorer-game', {
        title: "Letter Explorer",
        subtitle: "Drag the letters to spell the word!",
        words: ${JSON.stringify(lesson.letterExplorer)}
      }, () => {
        window.lessonMarkComplete('letter-explorer');
      });
    }
  }`);

  // Flashcard Game page
  pagesJS.push(`{
    render: (progress, markComplete) => {
      return \`
        <div class="lesson-page-card activity-section">
          <h2>🎮 Match the Sounds!</h2>
          <p>Match letters with their sounds!</p>
          \${progress.flashcard_completed ? '<div class="completion-badge">✅ Matches Complete!</div>' : ''}
          <div id="flashcard-game-container" style="margin-top: 20px;"></div>
        </div>
      \`;
    },
    onLoad: () => {
      new FlashcardGame('flashcard-game-container', {
        title: "Match the Sounds!",
        subtitle: "Can you match the letters?",
        pairs: ${JSON.stringify(lesson.flashcards)}
      }, () => {
        window.lessonMarkComplete('flashcard');
      });
    }
  }`);

  // Completion page
  pagesJS.push(`{
    render: (progress) => {
      const allComplete = progress.story_completed && 
                        progress.letter_explorer_completed && 
                        progress.flashcard_completed;
      return \`
        <div class="lesson-page-card title-page">
          <div class="character">🎉</div>
          <h1>Great Job!</h1>
          <div class="subtitle">You completed Lesson ${lesson.num}!</div>
          \${allComplete ? \`
            <div class="completion-badge" style="margin: 30px auto;">
              ✅ 100% Complete!
            </div>
            <p style="margin-top: 20px;">
              Billy is proud of you! You learned so much!
            </p>
          \` : \`
            <p style="color: #B06821; margin-top: 20px;">
              Go back and complete all activities to finish this lesson!
            </p>
          \`}
          <button 
            onclick="window.location.href='student-dashboard-live.html'" 
            class="nav-arrow"
            style="margin-top: 30px;"
          >
            Back to Dashboard
          </button>
        </div>
      \`;
    }
  }`);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lesson.num}: ${lesson.title} - BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/digital-book.css">
    <link rel="stylesheet" href="css/letter-explorer.css">
    <link rel="stylesheet" href="css/flashcard-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    <script src="js/digital-book.js"></script>
    <script src="js/letter-explorer.js"></script>
    <script src="js/flashcard-game.js"></script>
    
    <script>
        const lesson${lesson.num}Config = {
            lessonId: '1st-grade-lesson-${lesson.num}',
            gradeLevel: '1st-grade',
            title: 'Lesson ${lesson.num}: ${lesson.title}',
            pages: [
                ${pagesJS.join(',\n                ')}
            ]
        };

        createLessonViewer('lesson-container', lesson${lesson.num}Config);
    </script>
</body>
</html>`;

  return html;
}

// Generate all 30 lessons
lessons.forEach(lesson => {
  const html = generateLessonHTML(lesson);
  const filename = `1st-grade-lesson-${lesson.num}-v2.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Generated ${filename}`);
});

console.log('\n🎉 All 30 paginated lessons generated!');
