/**
 * Rebuild 4th grade lessons with proper page structure
 * Using actual lesson content from curriculum/grade4/lessons/
 */

const fs = require('fs');
const path = require('path');

// Read lesson 1 as template
const lesson1Content = fs.readFileSync('curriculum/grade4/lessons/lesson-001-day1.md', 'utf-8');

// Extract quiz questions from lesson 1
const quizQuestions = [
  {
    question: "Where does Dorothy live at the beginning of the story?",
    choices: [
      "A big city with tall buildings",
      "The Kansas prairies with Uncle Henry and Aunt Em",
      "A forest near a river",
      "A small island in the ocean"
    ],
    correct: 1,
    explain: "Dorothy lives on the gray Kansas prairies with Uncle Henry and Aunt Em."
  },
  {
    question: "How does the author describe the land where Dorothy lives?",
    choices: [
      "Green, lush, and full of flowers",
      "Gray, flat, and dry",
      "Covered in snow and ice",
      "Rocky with mountains all around"
    ],
    correct: 1,
    explain: "The author describes Kansas as gray, flat, and dry to show how dull Dorothy's life is."
  },
  {
    question: "What does Dorothy do when the cyclone hits?",
    choices: [
      "She runs outside to watch it",
      "She hides under the bed",
      "She tries to get to the cellar but the house is carried away",
      "She climbs a tree to stay safe"
    ],
    correct: 2,
    explain: "Dorothy tries to reach the cellar for safety, but the house gets picked up by the cyclone!"
  }
];

function generateLesson1() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 1: The Adventure Begins - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/quiz-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    <script src="js/quiz-game.js"></script>
    
    <script>
        const lesson1Config = {
            lessonId: '4th-grade-lesson-1',
            gradeLevel: '4th-grade',
            title: 'Lesson 1: The Adventure Begins',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <div class="character">📚</div>
                            <h1>Lesson 1</h1>
                            <div class="subtitle">The Adventure Begins</div>
                            <p style="color: #B06821; font-size: 18px; margin-top: 20px;">
                                The Wonderful Wizard of Oz<br>
                                Chapter 1: The Cyclone
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Welcome
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 Welcome to Your Reading Adventure!</h2>
                            <p>Hey there, reader! Today is Day 1 of a big year. Over the next 180 lessons, you are going to read incredible stories, travel the world, meet unforgettable characters, and become a stronger reader and writer than you ever thought possible.</p>
                            <p>But first — we start with a girl named Dorothy, a little dog named Toto, and a really, really big storm.</p>
                            <div style="background: rgba(176,104,33,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                                <p><strong>Today you will:</strong></p>
                                <ul style="margin: 10px 0;">
                                    <li>Read Chapter 1 of The Wonderful Wizard of Oz</li>
                                    <li>Answer quiz questions about what you read</li>
                                    <li>Write your very first journal entry</li>
                                    <li>Learn a new vocabulary word</li>
                                </ul>
                                <p style="margin-top: 15px;"><strong>Time:</strong> About 45-50 minutes</p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 3: Before You Read
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🧐 Before You Read</h2>
                            <p>Before we jump into the story, let's think for a moment.</p>
                            <div style="background: rgba(48,88,83,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                                <p><strong>Think about this:</strong> Imagine a huge storm is coming — the biggest storm you've ever seen. The wind is shaking your house. What would you do? What would you grab? Where would you hide?</p>
                            </div>
                            <p>Hold that thought. Dorothy is about to face exactly this situation. As you read, pay attention to what she does when the storm hits. Does she react the way you would?</p>
                            <div style="margin: 20px 0;">
                                <p><strong>🔍 What to look for while you read:</strong></p>
                                <ul>
                                    <li>Where does Dorothy live? What is her life like before the storm?</li>
                                    <li>What happens when the cyclone hits?</li>
                                    <li>How does Dorothy feel? How do you know?</li>
                                </ul>
                            </div>
                        </div>
                    \`
                },
                
                // Page 4: Vocabulary
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>💬 Word of the Day</h2>
                            <div style="background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #B06821; font-size: 28px; margin-bottom: 10px;">cyclone</h3>
                                <p style="font-style: italic; color: #511B18;">(noun)</p>
                                <p style="margin: 15px 0;"><strong>Definition:</strong> A powerful, spinning windstorm that can cause great destruction.</p>
                            </div>
                            <p><strong>From the story:</strong> "From the far north they heard a low wail of the wind, and Uncle Henry and Dorothy could see where the long grass bowed in waves before the coming storm."</p>
                            <p style="margin-top: 20px; padding: 15px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                <strong>💭 Think about it:</strong> Why do you think L. Frank Baum chose to start Dorothy's story with a cyclone? What does it do to the story right away?
                            </p>
                        </div>
                    \`
                },
                
                // Page 5: Reading Instructions
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Read Chapter 1 — "The Cyclone"</h2>
                            <p>Open your copy of <em>The Wonderful Wizard of Oz</em> and read Chapter 1: "The Cyclone."</p>
                            <p style="margin: 20px 0;">This is a short chapter — it should take about 10-15 minutes to read.</p>
                            <div style="background: rgba(176,104,33,0.1); padding: 20px; border-radius: 15px; border-left: 4px solid #B06821;">
                                <p><strong>💡 Reading tip:</strong></p>
                                <p>Don't rush! If you hit a word you don't know, try reading the sentence around it to figure out what it means. That's called using "context clues" — and it's a superpower you'll build all year.</p>
                            </div>
                            <p style="margin-top: 20px; font-style: italic;">When you're done reading, click Next to answer questions about the story. ⬇️</p>
                        </div>
                    \`
                },
                
                // Page 6: Comprehension Quiz
                {
                    render: (progress, markComplete) => {
                        return \`
                            <div class="lesson-page-card activity-section">
                                <h2>✅ Check Your Understanding</h2>
                                <p>Let's see what you picked up from Chapter 1!</p>
                                \${progress.letter_explorer_completed ? '<div class="completion-badge">✅ Quiz Complete!</div>' : ''}
                                <div id="quiz-game-container" class="quiz-game-container" style="margin-top: 20px;"></div>
                            </div>
                        \`;
                    },
                    onLoad: () => {
                        createQuizGame('quiz-game-container', {
                            title: "Reading Check!",
                            subtitle: "Chapter 1: The Cyclone",
                            questions: ${JSON.stringify(quizQuestions)}
                        }, () => {
                            window.lessonMarkComplete('letter-explorer');
                        });
                    }
                },
                
                // Page 7: Journal
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Your Reading Journal</h2>
                            <p>This is your reading journal. You're going to write in it every single lesson this year. By the end, you'll have a whole book of your own thoughts about every story you've read. Pretty cool, right?</p>
                            <div style="background: rgba(48,88,83,0.05); border-left: 4px solid #305853; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #305853; font-size: 18px; margin-bottom: 15px;">Today's Journal Prompt:</h3>
                                <p style="font-size: 18px;">Write 2-3 sentences about Chapter 1. You can answer any of these questions, or write about whatever stuck with you:</p>
                                <ul style="margin: 15px 0;">
                                    <li>What happened in this chapter?</li>
                                    <li>What surprised you?</li>
                                    <li>What do you think will happen next?</li>
                                </ul>
                            </div>
                            <p style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                💡 <strong>Reminder:</strong> Start each sentence with a capital letter and end it with a period. That's it — just 2-3 good sentences.
                            </p>
                        </div>
                    \`
                },
                
                // Page 8: Completion
                {
                    render: (progress) => {
                        const completed = progress.letter_explorer_completed;
                        return \`
                            <div class="lesson-page-card title-page">
                                <div class="character">🎉</div>
                                <h1>You're Done with Day 1!</h1>
                                <div class="subtitle">Nice work!</div>
                                \${completed ? \`
                                    <div style="margin: 30px 0; padding: 20px; background: rgba(46,204,113,0.1); border-radius: 15px;">
                                        <p><strong>Here's what you accomplished today:</strong></p>
                                        <ul style="text-align: left; margin: 15px auto; max-width: 300px;">
                                            <li>✅ Read Chapter 1 of The Wizard of Oz</li>
                                            <li>✅ Learned a new vocabulary word (cyclone)</li>
                                            <li>✅ Answered comprehension questions</li>
                                            <li>✅ Wrote your first reading journal entry</li>
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

        createLessonViewer('lesson-container', lesson1Config);
    </script>
</body>
</html>`;

  return html;
}

// Generate lesson 1
const lesson1HTML = generateLesson1();
fs.writeFileSync('4th-grade-lesson-1-v3.html', lesson1HTML);
console.log('✅ Generated 4th-grade-lesson-1-v3.html');

console.log('\n🎉 Done! Lesson 1 rebuilt with proper pages and quiz game!');
