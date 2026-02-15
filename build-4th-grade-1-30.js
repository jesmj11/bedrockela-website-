/**
 * Build 4th grade lessons 1-30 with proper page structure
 * Parse content from curriculum/grade4/lessons/ markdown files
 */

const fs = require('fs');
const path = require('path');

function parseLessonMarkdown(lessonNum) {
  const paddedNum = String(lessonNum).padStart(3, '0');
  const filename = `curriculum/grade4/lessons/lesson-${paddedNum}-day${lessonNum}.md`;
  
  if (!fs.existsSync(filename)) {
    console.log(`⚠️  Markdown not found for lesson ${lessonNum}, using template`);
    return null;
  }
  
  const content = fs.readFileSync(filename, 'utf-8');
  
  // Extract title
  const titleMatch = content.match(/^(.+?)$/m);
  const title = titleMatch ? titleMatch[1].trim() : `Lesson ${lessonNum}`;
  
  // Extract book/chapter info (line 2)
  const lines = content.split('\n');
  const bookInfo = lines[1] ? lines[1].trim() : 'Reading Assignment';
  
  // Extract vocabulary word
  const vocabMatch = content.match(/💬\s+Part \d+: Word of the Day\s+([^\n]+)\s+\(([^)]+)\)\s+([^\n]+)/s);
  let vocab = null;
  if (vocabMatch) {
    vocab = {
      word: vocabMatch[1].trim(),
      type: vocabMatch[2].trim(),
      definition: vocabMatch[3].trim()
    };
  }
  
  // Extract quiz questions (multiple choice)
  const questions = [];
  const questionMatches = content.matchAll(/(\d+)\.\s+([^\n]+)\n((?:[A-D]\).+\n)+)/g);
  
  for (const match of questionMatches) {
    const questionText = match[2].trim();
    const choicesText = match[3];
    const choices = [];
    const choiceMatches = choicesText.matchAll(/([A-D])\)\s+([^\n]+)/g);
    
    for (const choiceMatch of choiceMatches) {
      choices.push(choiceMatch[2].trim());
    }
    
    if (choices.length >= 2) {
      questions.push({
        question: questionText,
        choices: choices,
        correct: 1, // Default to B, will need manual adjustment
        explain: "Check your answer against the text!"
      });
    }
  }
  
  return {
    title,
    bookInfo,
    vocab,
    questions: questions.slice(0, 5) // Max 5 questions
  };
}

function generateLesson(lessonNum) {
  const parsed = parseLessonMarkdown(lessonNum);
  
  const title = parsed ? parsed.title : `Lesson ${lessonNum}`;
  const bookInfo = parsed ? parsed.bookInfo : 'Reading Assignment';
  const vocab = (parsed && parsed.vocab) ? parsed.vocab : { word: 'vocabulary', type: 'noun', definition: 'New word for today' };
  const questions = parsed && parsed.questions.length > 0 ? parsed.questions : [
    {
      question: "What was the main idea of today's reading?",
      choices: ["Setting", "Characters", "Plot", "Theme"],
      correct: 2,
      explain: "The main idea focuses on what happens in the story."
    }
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lessonNum}: ${title} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/quiz-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    <script src="js/quiz-game.js"></script>
    
    <script>
        const lesson${lessonNum}Config = {
            lessonId: '4th-grade-lesson-${lessonNum}',
            gradeLevel: '4th-grade',
            title: 'Lesson ${lessonNum}: ${title}',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <div class="character">📚</div>
                            <h1>Lesson ${lessonNum}</h1>
                            <div class="subtitle">${title}</div>
                            <p style="color: #B06821; font-size: 18px; margin-top: 20px;">
                                ${bookInfo}
                            </p>
                        </div>
                    \`
                },
                
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 Welcome to Today's Lesson!</h2>
                            <p>Today you're going to read, think, and write about an exciting story!</p>
                            <div style="background: rgba(176,104,33,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                                <p><strong>Today you will:</strong></p>
                                <ul style="margin: 10px 0;">
                                    <li>Read today's chapter carefully</li>
                                    <li>Answer quiz questions about what you read</li>
                                    <li>Write in your reading journal</li>
                                    <li>Learn a new vocabulary word</li>
                                </ul>
                                <p style="margin-top: 15px;"><strong>Time:</strong> About 45-60 minutes</p>
                            </div>
                        </div>
                    \`
                },
                
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🧐 Before You Read</h2>
                            <p>Before we jump into the story, let's get ready to read!</p>
                            <div style="background: rgba(48,88,83,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                                <p><strong>As you read, think about:</strong></p>
                                <ul>
                                    <li>What is happening in the story?</li>
                                    <li>Who are the main characters?</li>
                                    <li>What problem do the characters face?</li>
                                    <li>How do you think they'll solve it?</li>
                                </ul>
                            </div>
                            <p style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                💡 <strong>Reading Tip:</strong> Good readers ask questions as they read. If something confuses you, read that part again!
                            </p>
                        </div>
                    \`
                },
                
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>💬 Word of the Day</h2>
                            <div style="background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #B06821; font-size: 28px; margin-bottom: 10px;">${vocab.word}</h3>
                                <p style="font-style: italic; color: #511B18;">(${vocab.type})</p>
                                <p style="margin: 15px 0;"><strong>Definition:</strong> ${vocab.definition}</p>
                            </div>
                            <p style="margin-top: 20px; padding: 15px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                <strong>💭 Think:</strong> How might this word appear in today's story? Can you use it in a sentence?
                            </p>
                        </div>
                    \`
                },
                
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Time to Read!</h2>
                            <p>Open your book and read today's chapter. Take your time and enjoy the story!</p>
                            <div style="background: rgba(176,104,33,0.1); padding: 20px; border-radius: 15px; border-left: 4px solid #B06821; margin: 20px 0;">
                                <p><strong>💡 Reading Tips:</strong></p>
                                <ul>
                                    <li>Read at a comfortable pace</li>
                                    <li>Use context clues for new words</li>
                                    <li>Picture the scenes in your mind</li>
                                    <li>Ask yourself questions as you read</li>
                                </ul>
                            </div>
                            <p style="margin-top: 20px; font-style: italic;">When you finish reading, click Next to test your understanding! ⬇️</p>
                        </div>
                    \`
                },
                
                {
                    render: (progress, markComplete) => {
                        return \`
                            <div class="lesson-page-card activity-section">
                                <h2>✅ Check Your Understanding</h2>
                                <p>Let's see what you remember from today's reading!</p>
                                \${progress.letter_explorer_completed ? '<div class="completion-badge">✅ Quiz Complete!</div>' : ''}
                                <div id="quiz-game-container" class="quiz-game-container" style="margin-top: 20px;"></div>
                            </div>
                        \`;
                    },
                    onLoad: () => {
                        createQuizGame('quiz-game-container', {
                            title: "Reading Check!",
                            subtitle: "Test your comprehension",
                            questions: ${JSON.stringify(questions)}
                        }, () => {
                            window.lessonMarkComplete('letter-explorer');
                        });
                    }
                },
                
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Your Reading Journal</h2>
                            <p>Time to write about what you read! Your journal entries help you think more deeply about the story.</p>
                            <div style="background: rgba(48,88,83,0.05); border-left: 4px solid #305853; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #305853; font-size: 18px; margin-bottom: 15px;">Today's Journal Prompt:</h3>
                                <p style="font-size: 18px;">Write 3-5 sentences about today's chapter. You can:</p>
                                <ul style="margin: 15px 0;">
                                    <li>Summarize what happened</li>
                                    <li>Describe your favorite part</li>
                                    <li>Make a prediction about what happens next</li>
                                    <li>Connect the story to your own life</li>
                                </ul>
                            </div>
                            <p style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                💡 <strong>Writing Tip:</strong> Use complete sentences with capital letters and punctuation. Include details from the story!
                            </p>
                        </div>
                    \`
                },
                
                {
                    render: (progress) => {
                        const completed = progress.letter_explorer_completed;
                        return \`
                            <div class="lesson-page-card title-page">
                                <div class="character">🎉</div>
                                <h1>Great Work!</h1>
                                <div class="subtitle">You completed Lesson ${lessonNum}!</div>
                                \${completed ? \`
                                    <div style="margin: 30px 0; padding: 20px; background: rgba(46,204,113,0.1); border-radius: 15px;">
                                        <p><strong>What you accomplished:</strong></p>
                                        <ul style="text-align: left; margin: 15px auto; max-width: 300px;">
                                            <li>✅ Read today's chapter</li>
                                            <li>✅ Learned new vocabulary</li>
                                            <li>✅ Answered comprehension questions</li>
                                            <li>✅ Wrote in your journal</li>
                                        </ul>
                                    </div>
                                \` : \`
                                    <p style="color: #B06821; margin-top: 20px;">
                                        Complete the quiz to finish this lesson!
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
                }
            ]
        };

        createLessonViewer('lesson-container', lesson${lessonNum}Config);
    </script>
</body>
</html>`;

  return html;
}

// Generate lessons 1-30
for (let i = 1; i <= 30; i++) {
  const html = generateLesson(i);
  const filename = `4th-grade-lesson-${i}-v3.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Generated ${filename}`);
}

console.log('\n🎉 All 30 4th grade lessons generated with proper structure!');
