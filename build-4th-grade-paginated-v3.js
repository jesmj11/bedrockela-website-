const fs = require('fs');
const path = require('path');

// Read curriculum lesson files to extract questions and prompts
function extractLessonData(lessonNum) {
  const lessonFile = `curriculum/grade4/lessons/lesson-${String(lessonNum).padStart(3, '0')}-day${lessonNum}.md`;
  
  if (!fs.existsSync(lessonFile)) {
    return null;
  }
  
  const content = fs.readFileSync(lessonFile, 'utf8');
  
  // Extract chapter info
  const chapterMatch = content.match(/Chapter (\d+(?:-\d+)?): (.+)/);
  const chapter = chapterMatch ? chapterMatch[1] : lessonNum;
  const chapterTitle = chapterMatch ? chapterMatch[2] : '';
  
  // Extract vocabulary word
  const vocabMatch = content.match(/(\w+)\s+\((\w+)\)\s*\n([^\n]+)/);
  const vocab = vocabMatch ? {
    word: vocabMatch[1],
    type: vocabMatch[2],
    definition: vocabMatch[3]
  } : null;
  
  // Extract journal prompt
  const journalMatch = content.match(/Today's Journal Prompt:.*?\n\n([^\n]+)/s);
  const journalPrompt = journalMatch ? journalMatch[1].replace(/•/g, '').trim() : null;
  
  return {
    chapter,
    chapterTitle,
    vocab,
    journalPrompt
  };
}

// Chapter-to-lesson mapping
const lessonChapters = {
  1: { chapters: '1', title: 'The Cyclone' },
  2: { chapters: '2', title: 'The Council with the Munchkins' },
  3: { chapters: '3', title: 'How Dorothy Saved the Scarecrow' },
  4: { chapters: '4-5', title: 'The Road Through the Forest' },
  5: { chapters: '6', title: 'The Cowardly Lion' },
  6: { chapters: '7', title: 'The Journey to the Great Oz' },
  7: { chapters: '8', title: 'The Deadly Poppy Field' },
  8: { chapters: '9-10', title: 'The Queen of the Field Mice' },
  9: { chapters: '11', title: 'The Wonderful Emerald City of Oz' },
  10: { chapters: '12', title: 'The Search for the Wicked Witch' },
  11: { chapters: '13-14', title: 'The Rescue & The Winged Monkeys' },
  12: { chapters: '15', title: 'The Discovery of Oz, the Terrible' },
  13: { chapters: '16', title: 'The Magic Art of the Great Humbug' },
  14: { chapters: '17-18', title: 'How the Balloon Was Launched' },
  15: { chapters: '19-24', title: 'The Final Journey Home' }
};

// Sample quiz questions for Wizard of Oz (will be customized per lesson later)
function getQuizQuestions(lessonNum) {
  const quizBank = {
    1: [
      {
        question: "Where does Dorothy live at the beginning of the story?",
        choices: ["A big city", "The Kansas prairies", "A forest", "An island"],
        correct: 1,
        explain: "Dorothy lives on the gray Kansas prairies with Uncle Henry and Aunt Em."
      },
      {
        question: "What natural disaster hits Dorothy's home?",
        choices: ["A tornado", "A cyclone", "A hurricane", "An earthquake"],
        correct: 1,
        explain: "A cyclone (powerful spinning windstorm) carries Dorothy's house away."
      },
      {
        question: "How is Kansas described in the story?",
        choices: ["Green and lush", "Gray and dry", "Snowy", "Rocky"],
        correct: 1,
        explain: "Kansas is described as gray, flat, and dry—which contrasts with the colorful land of Oz."
      }
    ],
    2: [
      {
        question: "Where does Dorothy's house land?",
        choices: ["Back in Kansas", "In the land of Oz", "In a lake", "On a mountain"],
        correct: 1,
        explain: "The house lands in the magical land of Oz, far from Kansas."
      },
      {
        question: "What happens to the Wicked Witch of the East?",
        choices: ["She escapes", "Dorothy's house falls on her", "She disappears", "She becomes good"],
        correct: 1,
        explain: "Dorothy's house accidentally falls on the Wicked Witch of the East."
      }
    ]
  };
  
  return quizBank[lessonNum] || quizBank[1]; // Default to lesson 1 questions if not specified
}

function buildLesson(lessonNum) {
  const lessonInfo = lessonChapters[lessonNum] || { chapters: lessonNum, title: `Lesson ${lessonNum}` };
  const lessonData = extractLessonData(lessonNum);
  const quizQuestions = getQuizQuestions(lessonNum);
  
  const vocab = lessonData?.vocab || {
    word: 'cyclone',
    type: 'noun',
    definition: 'A powerful, spinning windstorm that can cause great destruction.'
  };
  
  const journalPrompt = lessonData?.journalPrompt || 
    `Write 3-5 sentences about today's reading. What happened? What surprised you? What do you think will happen next?`;

  // Calculate max page index for progressive unlocking
  let maxPageIndex = 0;
  for (let i = 1; i <= lessonNum; i++) {
    const info = lessonChapters[i];
    if (info) {
      const chapNums = info.chapters.split('-');
      maxPageIndex += chapNums.length === 2 ? (parseInt(chapNums[1]) - parseInt(chapNums[0]) + 1) : 1;
    }
  }
  maxPageIndex -= 1; // Zero-indexed

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lessonNum} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/digital-book.css">
    <link rel="stylesheet" href="css/quiz-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    <script src="js/digital-book.js"></script>
    <script src="js/quiz-game.js"></script>
    
    <script>
        const lesson${lessonNum}Config = {
            lessonId: '4th-grade-lesson-${lessonNum}',
            gradeLevel: '4th-grade',
            title: 'Lesson ${lessonNum} - 4th Grade',
            pages: [
                // Page 1: Title Page
                {
    render: () => \`
      <div class="lesson-page-card title-page">
        <div class="character">📚</div>
        <h1>Lesson ${lessonNum}</h1>
        <div class="subtitle">4th Grade ELA</div>
        <p style="color: #B06821; font-size: 20px; margin-top: 20px;">
          The Wonderful Wizard of Oz
        </p>
        <p style="color: #666; font-size: 16px; margin-top: 10px;">
          Chapter ${lessonInfo.chapters}: ${lessonInfo.title}
        </p>
      </div>
    \`
  },
                
                // Page 2: Welcome
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>📖 Welcome to Lesson ${lessonNum}!</h2>
        <p>Today you will:</p>
        <ul style="margin: 20px 0; line-height: 2;">
          <li>📖 Read Chapter ${lessonInfo.chapters} of <em>The Wonderful Wizard of Oz</em></li>
          <li>📝 Learn a new vocabulary word</li>
          <li>🎯 Answer comprehension questions</li>
          <li>✍️ Write in your journal</li>
        </ul>
        <p><strong>Time needed:</strong> About 45-60 minutes</p>
        <div style="margin-top: 30px; padding: 20px; background: rgba(176,104,33,0.1); border-radius: 10px; border-left: 4px solid #B06821;">
          <p style="margin: 0;">
            💡 <strong>Reading Tip:</strong> Good readers take their time and think about what they're reading. Don't rush!
          </p>
        </div>
      </div>
    \`
  },

                // Page 3: Before You Read
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>🧐 Before You Read</h2>
        <p>Let's get ready to read! Think about these questions before you start:</p>
        <div style="margin: 30px 0; padding: 25px; background: rgba(48,88,83,0.05); border-radius: 10px;">
          <h3 style="color: #305853; margin-bottom: 20px;">Think About:</h3>
          <p style="margin: 15px 0; font-size: 18px;">
            🤔 What do you remember from the last chapter?
          </p>
          <p style="margin: 15px 0; font-size: 18px;">
            🤔 What do you think will happen in this chapter?
          </p>
          <p style="margin: 15px 0; font-size: 18px;">
            🤔 What questions do you have about the story so far?
          </p>
        </div>
        <p style="margin-top: 20px;">
          <strong>While reading:</strong> Pay attention to characters' feelings, important events, and new information!
        </p>
      </div>
    \`
  },

                // Page 4: Vocabulary
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>📚 Word of the Day</h2>
        <div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 15px; border: 2px solid #B06821;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 42px; font-weight: 800; color: #305853;">${vocab.word}</span>
            <br/>
            <span style="font-size: 18px; color: #666; font-style: italic;">(${vocab.type})</span>
          </div>
          <p style="font-size: 20px; line-height: 1.6; color: #333; text-align: center;">
            ${vocab.definition}
          </p>
        </div>
        <div style="padding: 20px; background: rgba(176,104,33,0.05); border-radius: 10px; margin-top: 20px;">
          <p style="margin: 0;">
            💡 <strong>Try it:</strong> As you read, watch for this word! How is it used in the story?
          </p>
        </div>
      </div>
    \`
  },

                // Page 5: Reading Instructions
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>📖 Time to Read!</h2>
        <p style="font-size: 20px; color: #305853; font-weight: 600; margin-bottom: 20px;">
          Chapter ${lessonInfo.chapters}: ${lessonInfo.title}
        </p>
        <div style="background: white; padding: 25px; border-radius: 12px; border: 3px solid #305853; margin: 20px 0;">
          <p style="font-size: 18px; margin-bottom: 15px;">
            📚 Click the button below to read the chapter:
          </p>
          <a href="https://www.gutenberg.org/files/55/55-h/55-h.htm#chap${String(lessonInfo.chapters.split('-')[0]).padStart(2, '0')}" 
             target="_blank" 
             style="display: inline-block; padding: 15px 30px; background: #B06821; color: white; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 18px; margin: 10px 0;">
            Open Chapter ${lessonInfo.chapters} →
          </a>
          <p style="font-size: 14px; color: #666; margin-top: 15px;">
            (Opens in a new tab on Project Gutenberg)
          </p>
        </div>
        <div style="margin-top: 30px; padding: 20px; background: rgba(48,88,83,0.1); border-radius: 10px;">
          <h3 style="color: #305853; margin-bottom: 15px;">📝 While You Read:</h3>
          <ul style="line-height: 2;">
            <li>What are the main events?</li>
            <li>How do the characters feel?</li>
            <li>What details are important?</li>
          </ul>
        </div>
        <p style="margin-top: 20px; text-align: center; color: #666;">
          <em>When you're done reading, click Next to test your understanding! →</em>
        </p>
      </div>
    \`
  },

                // Page 6: Quiz Game
                {
      render: (progress, markComplete) => {
        return \`
          <div class="lesson-page-card activity-section">
            <h2>🎯 Reading Check Quiz</h2>
            <p>Let's see what you remember from the chapter!</p>
            \${progress.quiz_completed ? '<div class="completion-badge">✅ Quiz Complete!</div>' : ''}
            <div id="quiz-container" style="margin-top: 20px;"></div>
          </div>
        \`;
      },
      onLoad: () => {
        const quizConfig = {
          title: "Chapter ${lessonInfo.chapters} Quiz",
          subtitle: "Test your understanding!",
          questions: ${JSON.stringify(quizQuestions, null, 12)}
        };
        createQuizGame('quiz-container', quizConfig, () => {
          window.lessonMarkComplete('quiz');
        });
      }
    },

                // Page 7: Journal
                {
      render: (progress, markComplete) => {
        return \`
          <div class="lesson-page-card content-page">
            <h2>✍️ Journal Time</h2>
            <p>Writing helps you think more deeply about what you read!</p>
            
            <div style="margin: 25px 0; padding: 25px; background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; border-radius: 8px;">
              <h3 style="color: #B06821; font-size: 20px; margin-bottom: 15px;">Today's Prompt:</h3>
              <p style="font-size: 18px; line-height: 1.8; font-style: italic;">
                ${journalPrompt}
              </p>
            </div>

            <div style="margin: 20px 0;">
              <textarea 
                id="journal-entry-${lessonNum}"
                placeholder="Write your journal entry here..."
                style="width: 100%; min-height: 200px; padding: 15px; font-size: 16px; border: 2px solid #305853; border-radius: 10px; font-family: inherit; resize: vertical;"
              ></textarea>
            </div>

            <div style="padding: 15px; background: rgba(48,88,83,0.05); border-radius: 8px; margin-top: 15px;">
              <p style="margin: 0;">
                💡 <strong>Writing Tip:</strong> Use complete sentences. Include details from the story to support your ideas!
              </p>
            </div>

            \${progress.journal_completed ? 
              '<div class="completion-badge" style="margin-top: 20px;">✅ Journal Entry Saved!</div>' : 
              '<button onclick="window.lessonMarkComplete(\'journal\')" style="margin-top: 20px; padding: 15px 30px; background: #305853; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Save Journal Entry</button>'
            }
          </div>
        \`;
      }
    },

                // Page 8: Completion
                {
    render: () => \`
      <div class="lesson-page-card completion-page">
        <div class="character">🌟</div>
        <h1>Lesson ${lessonNum} Complete!</h1>
        <p style="font-size: 20px; color: #666; margin: 20px 0;">
          Great work today! You've accomplished a lot.
        </p>
        
        <div style="text-align: left; max-width: 400px; margin: 30px auto; background: rgba(48,88,83,0.05); padding: 25px; border-radius: 12px;">
          <h3 style="color: #305853; margin-bottom: 15px;">✅ Today You:</h3>
          <ul style="line-height: 2; font-size: 18px;">
            <li>Read Chapter ${lessonInfo.chapters}</li>
            <li>Learned the word "${vocab.word}"</li>
            <li>Completed the quiz</li>
            <li>Wrote a journal entry</li>
          </ul>
        </div>

        <p style="font-size: 18px; margin-top: 30px;">
          Ready for the next lesson? Keep up the great work! 📚
        </p>

        <a href="student-dashboard-live.html" 
           style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">
          Back to Dashboard
        </a>
      </div>
    \`
  }
            ]
        };

        createLessonViewer('lesson-container', lesson${lessonNum}Config);
    </script>
</body>
</html>`;

  return html;
}

// Build lessons 1-15 (Wizard of Oz unit)
for (let i = 1; i <= 15; i++) {
  const html = buildLesson(i);
  const filename = `4th-grade-lesson-${i}-v3.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Built ${filename}`);
}

console.log('\n✨ All 15 lessons built with 8-page paginated structure!');
console.log('Pages: Title → Welcome → Before You Read → Vocabulary → Reading → Quiz → Journal → Completion');
