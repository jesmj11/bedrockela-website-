/**
 * Build all 85 paginated 4th grade lessons
 * Teaching Textbooks style with BedrockELA colors
 * No games yet - just reading and comprehension
 */

const fs = require('fs');
const path = require('path');

// Load page limits for books
const pageLimits = JSON.parse(fs.readFileSync('book-data/lesson-page-limits.json', 'utf-8'));

function generateLesson(lessonNum) {
  const pageLimit = pageLimits[lessonNum];
  const hasBook = pageLimit ? true : false;
  const bookFilename = pageLimit ? pageLimit.bookFile : null;
  const maxPageIndex = pageLimit ? pageLimit.maxPageIndex : 0;

  // Build pages array
  let pagesJS = [];

  // Title page
  pagesJS.push(`{
    render: () => \`
      <div class="lesson-page-card title-page">
        <div class="character">📚</div>
        <h1>Lesson ${lessonNum}</h1>
        <div class="subtitle">4th Grade ELA</div>
        <p style="color: #B06821; font-size: 18px; margin-top: 20px;">
          Reading, comprehension, and critical thinking!
        </p>
      </div>
    \`
  }`);

  // Introduction page
  pagesJS.push(`{
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>📖 Today's Lesson</h2>
        <p>Welcome to Lesson ${lessonNum}! In this lesson you will:</p>
        <ul style="margin: 20px 0;">
          <li>Read carefully and think deeply</li>
          <li>Learn new vocabulary words</li>
          <li>Answer comprehension questions</li>
          <li>Write in your journal</li>
        </ul>
        <p><strong>Time needed:</strong> About 45-60 minutes</p>
        <p style="margin-top: 20px; padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
          💡 <strong>Reading Tip:</strong> Take your time! Good readers read carefully and think about what they're reading.
        </p>
      </div>
    \`
  }`);

  // Story Time page (if has book)
  if (hasBook) {
    pagesJS.push(`{
      render: (progress, markComplete) => {
        return \`
          <div class="lesson-page-card activity-section">
            <h2>📖 Story Time</h2>
            <p>Read today's story carefully. Pay attention to details!</p>
            \${progress.story_completed ? '<div class="completion-badge">✅ Reading Complete!</div>' : ''}
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
              lessonNumber: ${lessonNum},
              onComplete: () => {
                window.lessonMarkComplete('story');
              }
            });
          });
      }
    }`);
  } else {
    // No book - just instruction page
    pagesJS.push(`{
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>📖 Reading Assignment</h2>
          <p>Today's reading assignment is in your textbook or reader.</p>
          <p style="margin: 20px 0; padding: 20px; background: rgba(48,88,83,0.1); border-radius: 10px;">
            <strong>📕 Your Assignment:</strong><br>
            Read the assigned passage carefully. Take notes as you read. Think about:
          </p>
          <ul>
            <li>Who are the main characters?</li>
            <li>What is happening in the story?</li>
            <li>What do you think will happen next?</li>
          </ul>
          <p style="margin-top: 20px;"><em>When you're done reading, click Next to continue.</em></p>
        </div>
      \`
    }`);
  }

  // Comprehension page
  pagesJS.push(`{
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>💭 Think About It</h2>
        <p>Let's check your understanding of what you read.</p>
        <div style="margin: 20px 0; padding: 20px; background: rgba(176,104,33,0.05); border-left: 4px solid #B06821; border-radius: 5px;">
          <h3 style="color: #B06821; font-size: 18px; margin-bottom: 15px;">Comprehension Questions:</h3>
          <p style="margin: 15px 0;"><strong>1.</strong> What was the main event in today's reading?</p>
          <p style="margin: 15px 0;"><strong>2.</strong> How did the characters feel? What clues tell you this?</p>
          <p style="margin: 15px 0;"><strong>3.</strong> What do you think will happen next? Why?</p>
        </div>
        <p style="margin-top: 20px;">💡 <strong>Tip:</strong> Good answers include evidence from the text!</p>
      </div>
    \`
  }`);

  // Journal page
  pagesJS.push(`{
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>✍️ Journal Time</h2>
        <p>Writing helps you think more deeply about what you read!</p>
        <div style="margin: 20px 0; padding: 20px; background: rgba(48,88,83,0.05); border-left: 4px solid #305853; border-radius: 5px;">
          <h3 style="color: #305853; font-size: 18px; margin-bottom: 15px;">Today's Journal Prompt:</h3>
          <p style="font-size: 18px; font-style: italic; margin: 15px 0;">
            Write about your favorite part of today's reading. Why did it stand out to you?
          </p>
        </div>
        <p style="margin-top: 20px;">📝 Write at least 5-7 sentences in your journal.</p>
        <p style="margin-top: 15px; padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
          💡 <strong>Writing Tip:</strong> Start with "My favorite part was..." and explain your thinking!
        </p>
      </div>
    \`
  }`);

  // Completion page
  pagesJS.push(`{
    render: (progress) => {
      const completed = ${hasBook ? 'progress.story_completed' : 'true'};
      return \`
        <div class="lesson-page-card title-page">
          <div class="character">🎉</div>
          <h1>Great Work!</h1>
          <div class="subtitle">You completed Lesson ${lessonNum}!</div>
          \${completed ? \`
            <div class="completion-badge" style="margin: 30px auto;">
              ✅ Lesson Complete!
            </div>
            <p style="margin-top: 20px;">
              You're becoming a stronger reader every day! Keep it up!
            </p>
          \` : \`
            <p style="color: #B06821; margin-top: 20px;">
              Finish reading the story to complete this lesson!
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
    <title>Lesson ${lessonNum} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/digital-book.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    <script src="js/digital-book.js"></script>
    
    <script>
        const lesson${lessonNum}Config = {
            lessonId: '4th-grade-lesson-${lessonNum}',
            gradeLevel: '4th-grade',
            title: 'Lesson ${lessonNum} - 4th Grade',
            pages: [
                ${pagesJS.join(',\n                ')}
            ]
        };

        createLessonViewer('lesson-container', lesson${lessonNum}Config);
    </script>
</body>
</html>`;

  return html;
}

// Generate all 85 lessons
for (let i = 1; i <= 85; i++) {
  const html = generateLesson(i);
  const filename = `4th-grade-lesson-${i}-v2.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Generated ${filename}`);
}

console.log('\n🎉 All 85 4th grade paginated lessons generated!');
