const fs = require('fs');
const path = require('path');

// Load data files
const stories = JSON.parse(fs.readFileSync('arabian-stories.json', 'utf8'));
const vocabulary = JSON.parse(fs.readFileSync('arabian-vocabulary.json', 'utf8'));
const comprehensionQuestions = JSON.parse(fs.readFileSync('arabian-comprehension-questions.json', 'utf8'));
const informationalTexts = JSON.parse(fs.readFileSync('arabian-informational-texts.json', 'utf8'));
const informationalQuestions = JSON.parse(fs.readFileSync('arabian-informational-questions.json', 'utf8'));
const weeklySkills = JSON.parse(fs.readFileSync('arabian-weekly-skills.json', 'utf8'));

// Ensure output directory exists
const outputDir = 'curriculum/grade5/arabian';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Calculate which week each day belongs to
function getWeek(day) {
  return Math.ceil(day / 5);
}

// Days with stories (7 regular lessons)
const storyDays = [181, 182, 183, 184, 186, 187, 188];
// Assessment days
const assessmentDays = [185, 190];
// Review day
const reviewDay = 189;

// Generate all lessons
for (let day = 181; day <= 190; day++) {
  const week = getWeek(day);
  
  if (assessmentDays.includes(day)) {
    generateAssessmentLesson(day, week);
  } else if (day === reviewDay) {
    generateReviewLesson(day, week);
  } else if (storyDays.includes(day)) {
    generateRegularLesson(day, week);
  }
}

console.log('✅ Generated 10 Arabian Nights lessons (Days 181-190)');
console.log('   Regular lessons: 7');
console.log('   Review lesson: 1');
console.log('   Assessment lessons: 2');

function generateRegularLesson(day, week) {
  const story = stories[day];
  if (!story) {
    console.log(`  ⚠ Skipping Day ${day}: No story data`);
    return;
  }
  
  const vocab = vocabulary[day] || [];
  const questions = comprehensionQuestions[day] || [];
  const infoText = informationalTexts[day];
  const infoQuestions = informationalQuestions[day] || [];
  
  // Split story into 4 parts (no scrolling)
  const storyParts = splitIntoNParts(story.text, 4);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${day}: ${story.title}</title>
  <link rel="stylesheet" href="../../../css/lesson-styles.css">
  <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</head>
<body>
  <div class="lesson-container" id="lessonContainer">
    
    <!-- Page 1: Title & Objectives -->
    <div class="page page-active">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Arabian Nights</div>
      </div>
      <h1 class="lesson-title">${story.title}</h1>
      <div class="objectives">
        <h3>📚 Today's Learning Goals</h3>
        <ul>
          <li><strong>Vocabulary:</strong> Learn ${vocab.length} new words from the story</li>
          <li><strong>Reading:</strong> Read and understand "${story.title}"</li>
          <li><strong>Comprehension:</strong> Answer questions about the story</li>
          <li><strong>Informational Text:</strong> ${infoText.title}</li>
          <li><strong>Writing:</strong> Journal response</li>
        </ul>
      </div>
      <div class="page-footer">
        <button class="nav-button next-button" onclick="nextPage()">Start Lesson →</button>
      </div>
    </div>

    <!-- Page 2: Vocabulary -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Vocabulary</div>
      </div>
      <h2>📖 New Vocabulary Words</h2>
      <p class="instructions">Read each word and its definition. You'll see these words in today's story.</p>
      <div class="vocab-list">
        ${vocab.map((v, i) => `
        <div class="vocab-card">
          <div class="vocab-word">${v.word}</div>
          <div class="vocab-definition">${v.definition}</div>
          <div class="vocab-input-group">
            <label>Write the definition in your own words:</label>
            <textarea class="answer-input" id="vocab${i+1}" rows="2"></textarea>
          </div>
        </div>
        `).join('')}
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 3: Vocabulary Game -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Vocabulary Practice</div>
      </div>
      <h2>🎮 Vocabulary Matching Game</h2>
      <div id="vocabGame" class="vocab-game-container"></div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Pages 4-7: Story (4 parts, no scrolling) -->
    ${storyParts.map((part, index) => `
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">${story.title} • Part ${index + 1} of 4</div>
      </div>
      <div class="story-text">
        ${highlightVocabWords(part, vocab.map(v => v.word))}
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>
    `).join('')}

    <!-- Page 8: Story Comprehension -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Reading Comprehension</div>
      </div>
      <h2>💭 Understanding the Story</h2>
      <p class="instructions">Answer these questions about "${story.title}":</p>
      <div class="comprehension-questions">
        ${questions.map((q, i) => `
        <div class="question-group">
          <div class="question-number">Question ${i + 1}</div>
          <p class="question-text">${q}</p>
          <textarea class="answer-input" id="comp${i+1}" rows="3"></textarea>
        </div>
        `).join('')}
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 9: Informational Text + Questions -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Informational Text</div>
      </div>
      <h2>📰 ${infoText.title}</h2>
      <div class="info-text">
        ${infoText.text.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}
      </div>
      <h3>Understanding the Text</h3>
      <div class="comprehension-questions">
        ${infoQuestions.map((q, i) => `
        <div class="question-group">
          <div class="question-number">Question ${i + 1}</div>
          <p class="question-text">${q}</p>
          <textarea class="answer-input" id="info${i+1}" rows="2"></textarea>
        </div>
        `).join('')}
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 10: Grammar/Language Game (placeholder for now) -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Language Skills</div>
      </div>
      <h2>✏️ Language Practice</h2>
      <p class="instructions">Practice identifying figurative language from the story:</p>
      <div class="question-group">
        <p class="question-text">Find an example of descriptive language in today's story that helped you picture the scene. Write the phrase and explain what it helped you visualize.</p>
        <textarea class="answer-input" rows="3"></textarea>
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 11: Journal/Writing -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Journal Response</div>
      </div>
      <h2>✍️ Your Response</h2>
      <div class="journal-prompt">
        <p><strong>Choose one:</strong></p>
        <ul>
          <li>Which character in this story showed the most courage or cleverness? Explain your choice with examples from the text.</li>
          <li>If you could ask the main character one question, what would it be and why?</li>
          <li>Write about a time when you had to solve a problem creatively, like a character in this story.</li>
        </ul>
      </div>
      <textarea class="answer-input journal-input" rows="8" placeholder="Write your response here..."></textarea>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Finish Lesson →</button>
      </div>
    </div>

    <!-- Page 12: Completion -->
    <div class="page completion-page">
      <div class="completion-container">
        <div class="completion-icon">🎉</div>
        <h1>Day ${day} Complete!</h1>
        <p class="completion-message">Great work on "${story.title}"!</p>
        <div class="completion-stats">
          <div class="stat-item">
            <div class="stat-number">${vocab.length}</div>
            <div class="stat-label">New Words</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1</div>
            <div class="stat-label">Story Read</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${questions.length + infoQuestions.length}</div>
            <div class="stat-label">Questions</div>
          </div>
        </div>
        <button class="completion-button" onclick="markComplete()">Mark Complete & Save Progress</button>
        <div class="completion-footer">
          <button class="nav-button prev-button" onclick="prevPage()">← Review Lesson</button>
        </div>
      </div>
    </div>

  </div>

  <script type="module">
    import { createVocabGame } from '../../../js/vocab-games.js';
    
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');
    
    window.nextPage = function() {
      if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('page-active');
        currentPage++;
        pages[currentPage].classList.add('page-active');
        window.scrollTo(0, 0);
        
        // Initialize vocab game when reaching that page
        if (currentPage === 2) initVocabGame();
      }
    };
    
    window.prevPage = function() {
      if (currentPage > 0) {
        pages[currentPage].classList.remove('page-active');
        currentPage--;
        pages[currentPage].classList.add('page-active');
        window.scrollTo(0, 0);
      }
    };
    
    function initVocabGame() {
      const gameContainer = document.getElementById('vocabGame');
      if (gameContainer && !gameContainer.hasChildNodes()) {
        const vocabWords = ${JSON.stringify(vocab)};
        createVocabGame(gameContainer, vocabWords);
      }
    }
    
    window.markComplete = function() {
      alert('Lesson marked complete! (Save functionality will be added with Firebase integration)');
    };
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, `day-${day}.html`), html);
  console.log(`  ✓ Generated Day ${day}: ${story.title}`);
}

function generateReviewLesson(day, week) {
  // Review lesson for Day 189 - practice all 21 vocabulary words
  const allVocab = [];
  [181, 182, 183, 184, 186, 187, 188].forEach(d => {
    if (vocabulary[d]) allVocab.push(...vocabulary[d]);
  });
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${day}: Arabian Nights Review</title>
  <link rel="stylesheet" href="../../../css/lesson-styles.css">
  <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</head>
<body>
  <div class="lesson-container" id="lessonContainer">
    
    <!-- Page 1: Title & Objectives -->
    <div class="page page-active">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Arabian Nights Review</div>
      </div>
      <h1 class="lesson-title">📚 Arabian Nights Unit Review</h1>
      <div class="objectives">
        <h3>Today's Goals</h3>
        <p>Review everything from the Arabian Nights unit:</p>
        <ul>
          <li>Practice all 21 vocabulary words</li>
          <li>Reflect on the 7 stories</li>
          <li>Identify themes and connections</li>
          <li>Prepare for tomorrow's assessment</li>
        </ul>
      </div>
      <div class="page-footer">
        <button class="nav-button next-button" onclick="nextPage()">Begin Review →</button>
      </div>
    </div>

    <!-- Page 2: Vocabulary Review Game -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Vocabulary Review</div>
      </div>
      <h2>🎮 Vocabulary Practice Game</h2>
      <p class="instructions">Review all 21 words from the Arabian Nights unit:</p>
      <div id="vocabGame" class="vocab-game-container"></div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 3: Story Review -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Story Review</div>
      </div>
      <h2>📖 Stories from Arabian Nights</h2>
      <p class="instructions">You've read 7 amazing stories. Can you match each story to its main theme?</p>
      <div class="story-review">
        <div class="story-list">
          <h3>Stories</h3>
          <ol>
            <li>Aladdin and the Magic Lamp</li>
            <li>Ali Baba and the Forty Thieves</li>
            <li>Sinbad and the Valley of Diamonds</li>
            <li>The Fisherman and the Genie</li>
            <li>The Three Princes and Princess Nouronnihar</li>
            <li>The Ebony Horse</li>
            <li>Ali Cogia, the Merchant of Baghdad</li>
          </ol>
        </div>
        <div class="question-group">
          <p class="question-text">Which story best shows the theme of "cleverness over power"? Explain your choice.</p>
          <textarea class="answer-input" rows="3"></textarea>
        </div>
        <div class="question-group">
          <p class="question-text">Which character changed the most during their story? What changed them?</p>
          <textarea class="answer-input" rows="3"></textarea>
        </div>
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 4: Themes & Connections -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Themes</div>
      </div>
      <h2>💭 Common Themes</h2>
      <p class="instructions">Many Arabian Nights stories share similar themes:</p>
      <ul>
        <li>Cleverness defeats power</li>
        <li>Trust and betrayal</li>
        <li>Resourcefulness in difficult situations</li>
        <li>Transformation and growth</li>
        <li>The importance of thinking before acting</li>
      </ul>
      <div class="question-group">
        <p class="question-text">Choose two stories that share a theme. Explain how each story explores that theme differently.</p>
        <textarea class="answer-input" rows="4"></textarea>
      </div>
      <div class="question-group">
        <p class="question-text">What do you think these stories teach about how to solve problems?</p>
        <textarea class="answer-input" rows="3"></textarea>
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Finish Review →</button>
      </div>
    </div>

    <!-- Page 5: Completion -->
    <div class="page completion-page">
      <div class="completion-container">
        <div class="completion-icon">📚</div>
        <h1>Review Complete!</h1>
        <p class="completion-message">You're ready for tomorrow's assessment!</p>
        <div class="completion-stats">
          <div class="stat-item">
            <div class="stat-number">21</div>
            <div class="stat-label">Vocab Words</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">7</div>
            <div class="stat-label">Stories</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">✓</div>
            <div class="stat-label">Ready!</div>
          </div>
        </div>
        <button class="completion-button" onclick="markComplete()">Mark Complete</button>
        <div class="completion-footer">
          <button class="nav-button prev-button" onclick="prevPage()">← Review Again</button>
        </div>
      </div>
    </div>

  </div>

  <script type="module">
    import { createVocabGame } from '../../../js/vocab-games.js';
    
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');
    
    window.nextPage = function() {
      if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('page-active');
        currentPage++;
        pages[currentPage].classList.add('page-active');
        window.scrollTo(0, 0);
        
        // Initialize vocab game when reaching that page
        if (currentPage === 1) initVocabGame();
      }
    };
    
    window.prevPage = function() {
      if (currentPage > 0) {
        pages[currentPage].classList.remove('page-active');
        currentPage--;
        pages[currentPage].classList.add('page-active');
        window.scrollTo(0, 0);
      }
    };
    
    function initVocabGame() {
      const gameContainer = document.getElementById('vocabGame');
      if (gameContainer && !gameContainer.hasChildNodes()) {
        const vocabWords = ${JSON.stringify(allVocab)};
        createVocabGame(gameContainer, vocabWords);
      }
    }
    
    window.markComplete = function() {
      alert('Review complete! (Save functionality will be added with Firebase integration)');
    };
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, `day-${day}.html`), html);
  console.log(`  ✓ Generated Day ${day}: Arabian Nights Review`);
}

function generateAssessmentLesson(day, week) {
  // Calculate which vocabulary words to test
  let vocabToTest = [];
  
  if (day === 185) {
    // Week 37 assessment: Days 181-184 (12 words)
    for (let d = 181; d <= 184; d++) {
      if (vocabulary[d]) vocabToTest.push(...vocabulary[d]);
    }
  } else if (day === 190) {
    // Week 38 assessment: Days 186-188 (9 words)
    for (let d = 186; d <= 188; d++) {
      if (vocabulary[d]) vocabToTest.push(...vocabulary[d]);
    }
  }
  
  const skillData = weeklySkills[week];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${day}: Week ${week} Assessment</title>
  <link rel="stylesheet" href="../../../css/lesson-styles.css">
  <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</head>
<body>
  <div class="lesson-container" id="lessonContainer">
    
    <!-- Page 1: Title & Instructions -->
    <div class="page page-active">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Weekly Assessment</div>
      </div>
      <h1 class="lesson-title">📝 Week ${week} Assessment</h1>
      <div class="objectives">
        <h3>Today's Assessment</h3>
        <p>This assessment covers everything you learned this week:</p>
        <ul>
          <li><strong>Vocabulary Quiz:</strong> ${vocabToTest.length} words from this week's stories</li>
          <li><strong>Language Skills:</strong> ${skillData.title}</li>
          <li><strong>Writing:</strong> Short reflection</li>
        </ul>
        <p class="instructions"><strong>Take your time and do your best!</strong></p>
      </div>
      <div class="page-footer">
        <button class="nav-button next-button" onclick="nextPage()">Begin Assessment →</button>
      </div>
    </div>

    <!-- Page 2: Vocabulary Quiz -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Vocabulary Quiz</div>
      </div>
      <h2>📖 Vocabulary Quiz</h2>
      <p class="instructions">Write the definition for each word:</p>
      <div class="vocab-quiz">
        ${vocabToTest.map((v, i) => `
        <div class="quiz-item">
          <div class="quiz-number">${i + 1}.</div>
          <div class="quiz-word">${v.word}</div>
          <textarea class="answer-input" id="quiz${i+1}" rows="2" placeholder="Write the definition..."></textarea>
        </div>
        `).join('')}
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 3: Language Skills Game -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Language Skills</div>
      </div>
      <h2>✏️ ${skillData.title}</h2>
      <p class="instructions">${skillData.instructions}</p>
      <div class="skill-questions">
        ${skillData.questions.map((q, i) => `
        <div class="question-group">
          <div class="question-number">Question ${i + 1}</div>
          ${q.sentence ? `<p class="sentence-context">${q.sentence}</p>` : ''}
          ${q.root ? `<p class="root-info"><strong>${q.root}</strong><br>Examples: ${q.examples}</p>` : ''}
          <p class="question-text">${q.question}</p>
          <div class="multiple-choice">
            ${q.options.map((opt, j) => `
            <label class="choice-label">
              <input type="radio" name="skill${i}" value="${opt}">
              <span>${opt}</span>
            </label>
            `).join('')}
          </div>
        </div>
        `).join('')}
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 4: Story Comprehension (review from this week) -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Comprehension Review</div>
      </div>
      <h2>💭 This Week's Stories</h2>
      <p class="instructions">Answer these questions about the stories you read this week:</p>
      <div class="comprehension-questions">
        <div class="question-group">
          <div class="question-number">Question 1</div>
          <p class="question-text">Which story from this week was your favorite? Why?</p>
          <textarea class="answer-input" rows="3"></textarea>
        </div>
        <div class="question-group">
          <div class="question-number">Question 2</div>
          <p class="question-text">What lesson or theme did you notice appearing in multiple stories this week?</p>
          <textarea class="answer-input" rows="3"></textarea>
        </div>
        <div class="question-group">
          <div class="question-number">Question 3</div>
          <p class="question-text">Choose one character from this week's stories. What made them memorable?</p>
          <textarea class="answer-input" rows="3"></textarea>
        </div>
      </div>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Continue →</button>
      </div>
    </div>

    <!-- Page 5: Writing -->
    <div class="page">
      <div class="page-header">
        <div class="lesson-number">Day ${day} • Week ${week}</div>
        <div class="unit-label">Writing</div>
      </div>
      <h2>✍️ Reflection</h2>
      <div class="journal-prompt">
        <p><strong>Writing Prompt:</strong></p>
        <p>The Arabian Nights stories often feature characters who solve problems through cleverness rather than strength. Write about a time when you (or someone you know) solved a difficult problem by thinking creatively. What was the problem? What creative solution worked?</p>
      </div>
      <textarea class="answer-input journal-input" rows="10" placeholder="Write your reflection here..."></textarea>
      <div class="page-footer">
        <button class="nav-button prev-button" onclick="prevPage()">← Back</button>
        <button class="nav-button next-button" onclick="nextPage()">Finish Assessment →</button>
      </div>
    </div>

    <!-- Page 6: Completion -->
    <div class="page completion-page">
      <div class="completion-container">
        <div class="completion-icon">🎉</div>
        <h1>Assessment Complete!</h1>
        <p class="completion-message">Great work on Week ${week}!</p>
        <div class="completion-stats">
          <div class="stat-item">
            <div class="stat-number">${vocabToTest.length}</div>
            <div class="stat-label">Vocab Words</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${skillData.questions.length}</div>
            <div class="stat-label">Language Skills</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">3</div>
            <div class="stat-label">Comprehension</div>
          </div>
        </div>
        <button class="completion-button" onclick="markComplete()">Submit Assessment</button>
        <div class="completion-footer">
          <button class="nav-button prev-button" onclick="prevPage()">← Review Assessment</button>
        </div>
      </div>
    </div>

  </div>

  <script>
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');
    
    window.nextPage = function() {
      if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('page-active');
        currentPage++;
        pages[currentPage].classList.add('page-active');
        window.scrollTo(0, 0);
      }
    };
    
    window.prevPage = function() {
      if (currentPage > 0) {
        pages[currentPage].classList.remove('page-active');
        currentPage--;
        pages[currentPage].classList.add('page-active');
        window.scrollTo(0, 0);
      }
    };
    
    window.markComplete = function() {
      alert('Assessment submitted! (Save functionality will be added with Firebase integration)');
    };
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, `day-${day}.html`), html);
  console.log(`  ✓ Generated Day ${day}: Week ${week} Assessment`);
}

// Helper function to split text into N parts (roughly equal)
function splitIntoNParts(text, n) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  const parts = [];
  const parasPerPart = Math.ceil(paragraphs.length / n);
  
  for (let i = 0; i < n; i++) {
    const start = i * parasPerPart;
    const end = Math.min(start + parasPerPart, paragraphs.length);
    const part = paragraphs.slice(start, end).map(p => `<p>${p}</p>`).join('\n');
    parts.push(part);
  }
  
  return parts;
}

// Helper function to highlight vocabulary words in text
function highlightVocabWords(text, words) {
  let highlighted = text;
  words.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    highlighted = highlighted.replace(regex, '<span class="vocab-highlight">$1</span>');
  });
  return highlighted;
}
