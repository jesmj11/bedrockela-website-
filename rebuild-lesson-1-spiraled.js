const fs = require('fs');

/**
 * Rebuild Lesson 1 with spiral learning foundation
 * Sets up the pattern for cumulative review
 */

const lesson1Config = {
  lessonId: '1st-grade-lesson-1',
  gradeLevel: '1st-grade',
  title: 'Lesson 1: Letters A, M, T, S - The Foundation',
  pages: [
    // Page 1: Title
    {
      render: () => `
        <div class="lesson-page-card title-page">
          <div class="character">🌱</div>
          <h1>Lesson 1</h1>
          <div class="subtitle">Letter Sounds A, M, T, S</div>
          <p style="color: #5B7C99; font-size: 18px; margin-top: 20px;">
            Building your reading foundation!<br>
            Start reading "The Enormous Turnip"
          </p>
        </div>
      `
    },

    // Page 2: Learning Objectives
    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🎯 Today You Will...</h2>
          <div style="text-align: left; max-width: 500px; margin: 20px auto;">
            <p style="margin: 15px 0; font-size: 18px;">
              ✓ Learn 4 letter sounds: <strong>A, M, T, S</strong>
            </p>
            <p style="margin: 15px 0; font-size: 18px;">
              ✓ Blend sounds: <strong>"am"</strong> and <strong>"at"</strong>
            </p>
            <p style="margin: 15px 0; font-size: 18px;">
              ✓ Learn vocabulary for the story
            </p>
            <p style="margin: 15px 0; font-size: 18px;">
              ✓ Start reading <strong>"The Enormous Turnip"</strong>
            </p>
          </div>
        </div>
      `
    },

    // Pages 3-6: Individual Letters
    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🔤 Letter A</h2>
          <div style="font-size: 96px; margin: 20px 0; color: #D4A68F;">A a</div>
          <p style="font-size: 24px; margin: 20px 0;">
            <strong>A says "/a/" like in <span style="color: #D4A68F;">apple</span></strong>
          </p>
          <div style="font-size: 48px; margin: 20px 0;">🍎</div>
          <p style="font-size: 20px;">
            Say it with me: <strong>/a/ /a/ apple!</strong>
          </p>
          <p style="font-size: 18px; color: #666; margin-top: 20px;">
            More words: <strong>ant, alligator, astronaut</strong>
          </p>
        </div>
      `
    },

    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🔤 Letter M</h2>
          <div style="font-size: 96px; margin: 20px 0; color: #9BC5DB;">M m</div>
          <p style="font-size: 24px; margin: 20px 0;">
            <strong>M says "/m/" like in <span style="color: #9BC5DB;">moon</span></strong>
          </p>
          <div style="font-size: 48px; margin: 20px 0;">🌙</div>
          <p style="font-size: 20px;">
            Say it with me: <strong>/m/ /m/ moon!</strong>
          </p>
          <p style="font-size: 18px; color: #666; margin-top: 20px;">
            More words: <strong>mouse, mountain, money</strong>
          </p>
        </div>
      `
    },

    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🔤 Letter T</h2>
          <div style="font-size: 96px; margin: 20px 0; color: #E5A8A8;">T t</div>
          <p style="font-size: 24px; margin: 20px 0;">
            <strong>T says "/t/" like in <span style="color: #E5A8A8;">tiger</span></strong>
          </p>
          <div style="font-size: 48px; margin: 20px 0;">🐯</div>
          <p style="font-size: 20px;">
            Say it with me: <strong>/t/ /t/ tiger!</strong>
          </p>
          <p style="font-size: 18px; color: #666; margin-top: 20px;">
            More words: <strong>table, top, tree</strong>
          </p>
        </div>
      `
    },

    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🔤 Letter S</h2>
          <div style="font-size: 96px; margin: 20px 0; color: #A3C99C;">S s</div>
          <p style="font-size: 24px; margin: 20px 0;">
            <strong>S says "/s/" like in <span style="color: #A3C99C;">sun</span></strong>
          </p>
          <div style="font-size: 48px; margin: 20px 0;">☀️</div>
          <p style="font-size: 20px;">
            Say it with me: <strong>/s/ /s/ sun!</strong>
          </p>
          <p style="font-size: 18px; color: #666; margin-top: 20px;">
            More words: <strong>sock, sandwich, snake</strong>
          </p>
        </div>
      `
    },

    // Page 7: ALL FOUR LETTERS TOGETHER
    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📚 Our Letter Toolkit!</h2>
          <p style="font-size: 20px; margin: 20px 0;">
            Now we have <strong>4 letters</strong> we can use:
          </p>
          <div style="font-size: 72px; margin: 30px 0; letter-spacing: 20px;">
            A M T S
          </div>
          <p style="font-size: 20px; color: #5B7C99; margin: 20px 0;">
            Can you say all 4 sounds?
          </p>
          <p style="font-size: 18px; color: #666;">
            Practice until you can say them fast!
          </p>
        </div>
      `
    },

    // Page 8: First Blending
    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🔗 Blend Sounds Together!</h2>
          <p style="font-size: 20px; margin: 20px 0;">
            Let's put sounds together to make words!
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background: #F5F9FF; border-radius: 12px;">
            <p style="font-size: 32px; margin: 15px 0;">
              <strong style="color: #D4A68F;">A</strong> + 
              <strong style="color: #9BC5DB;">M</strong> = 
              <span style="color: #5B7C99;">am</span>
            </p>
            <p style="font-size: 18px; color: #666;">
              (like "I <strong>am</strong> happy!")
            </p>
          </div>

          <div style="margin: 30px 0; padding: 20px; background: #FFF7F7; border-radius: 12px;">
            <p style="font-size: 32px; margin: 15px 0;">
              <strong style="color: #D4A68F;">A</strong> + 
              <strong style="color: #E5A8A8;">T</strong> = 
              <span style="color: #5B7C99;">at</span>
            </p>
            <p style="font-size: 18px; color: #666;">
              (like "<strong>at</strong> school")
            </p>
          </div>

          <p style="font-size: 18px; margin-top: 30px;">
            🎉 You're reading words now!
          </p>
        </div>
      `
    },

    // Page 9-11: Vocabulary
    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📚 New Word: ENORMOUS</h2>
          <div style="font-size: 72px; margin: 20px 0;">🐘</div>
          <p style="font-size: 32px; margin: 20px 0; color: #5B7C99;">
            <strong>ENORMOUS</strong>
          </p>
          <p style="font-size: 20px; margin: 20px 0;">
            Means: <strong>REALLY, REALLY BIG!</strong>
          </p>
          <p style="font-size: 18px; margin: 20px 0; color: #666;">
            Bigger than big. Bigger than huge!
          </p>
        </div>
      `
    },

    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📚 New Word: TURNIP</h2>
          <div style="font-size: 72px; margin: 20px 0;">🫛</div>
          <p style="font-size: 32px; margin: 20px 0; color: #5B7C99;">
            <strong>TURNIP</strong>
          </p>
          <p style="font-size: 20px; margin: 20px 0;">
            A <strong>vegetable</strong> that grows underground
          </p>
          <p style="font-size: 18px; color: #666;">
            Round and white or purple!
          </p>
        </div>
      `
    },

    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📚 Action Words</h2>
          
          <div style="margin: 25px 0;">
            <p style="font-size: 28px; color: #5B7C99;">
              <strong>PULL</strong> 💪
            </p>
            <p style="font-size: 18px;">
              Grab and try to move it toward you
            </p>
          </div>

          <div style="margin: 25px 0;">
            <p style="font-size: 28px; color: #5B7C99;">
              <strong>STUCK</strong> 🚫
            </p>
            <p style="font-size: 18px;">
              Won't move, no matter how hard you try!
            </p>
          </div>
        </div>
      `
    },

    // Page 12: Story Time
    {
      render: (progress, markComplete) => {
        return `
          <div class="lesson-page-card activity-section">
            <h2>📖 Story Time</h2>
            <p style="font-size: 18px; margin-bottom: 15px;">Start reading <strong>"The Enormous Turnip"</strong></p>
            ${progress.story_completed ? '<div class="completion-badge">✅ Story Complete!</div>' : ''}
            <div id="story-book" class="digital-book-container" style="margin-top: 20px;"></div>
          </div>
        `;
      },
      onLoad: () => {
        return `
          fetch('book-data/enormous-turnip-lessons-1-5.json')
            .then(response => response.json())
            .then(bookConfig => {
              bookConfig.bookId = 'enormous-turnip-lessons-1-5';
              createDigitalBookV2('story-book', bookConfig, {
                maxPageIndex: 1,
                lessonNumber: 1,
                onComplete: () => {
                  window.lessonMarkComplete('story');
                }
              });
            })
            .catch(error => {
              console.error('Error loading book:', error);
              document.getElementById('story-book').innerHTML = \`
                <div style="padding: 20px; background: #FFF5F5; border-radius: 8px;">
                  <p style="color: #E88D8D;">📚 Story book is being prepared...</p>
                </div>
              \`;
            });
        `;
      }
    },

    // Page 13: Letter Practice
    {
      render: (progress, markComplete) => {
        return `
          <div class="lesson-page-card activity-section">
            <h2>✏️ Practice Your Letters!</h2>
            <p>Match all 4 letters with their sounds!</p>
            ${progress.practice_completed ? '<div class="completion-badge">✅ Practice Complete!</div>' : ''}
            <div id="practice-game" style="margin-top: 20px;"></div>
          </div>
        `;
      },
      onLoad: () => {
        return `
          new FlashcardGame('practice-game', {
            title: "Letter Sounds",
            subtitle: "Match the letter to its sound!",
            pairs: [
              {term: "A", match: "Says /a/ like apple 🍎"},
              {term: "M", match: "Says /m/ like moon 🌙"},
              {term: "T", match: "Says /t/ like tiger 🐯"},
              {term: "S", match: "Says /s/ like sun ☀️"}
            ]
          }, () => {
            window.lessonMarkComplete('practice');
          });
        `;
      }
    },

    // Page 14: Completion
    {
      render: (progress) => {
        const allComplete = progress.story_completed && progress.practice_completed;
        return `
          <div class="lesson-page-card title-page">
            <div class="character">🎉</div>
            <h1>Amazing Start!</h1>
            <div class="subtitle">Lesson 1 Complete!</div>
            
            ${allComplete ? `
              <div class="completion-badge" style="margin: 30px auto;">
                ✅ 100% Complete!
              </div>
              <div style="max-width: 400px; margin: 20px auto; text-align: left;">
                <p style="margin: 10px 0; font-size: 18px;">
                  📚 <strong>4 letters</strong> in your toolkit: A, M, T, S
                </p>
                <p style="margin: 10px 0; font-size: 18px;">
                  🔤 <strong>2 words</strong> you can read: am, at
                </p>
                <p style="margin: 10px 0; font-size: 18px;">
                  📖 Story started!
                </p>
              </div>
              <p style="margin-top: 30px; font-size: 18px;">
                🏠 <strong>Practice at home:</strong> Say the sounds for A, M, T, S!
              </p>
            ` : `
              <p style="color: #E88D8D; margin-top: 20px;">
                Go back and complete all activities!
              </p>
            `}
            
            <button 
              onclick="window.location.href='student-dashboard-live.html'" 
              class="nav-arrow"
              style="margin-top: 30px;"
            >
              Back to Dashboard
            </button>
          </div>
        `;
      }
    }
  ]
};

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lesson1Config.title} - BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/digital-book-v2.css">
    <link rel="stylesheet" href="css/flashcard-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    <script src="js/digital-book-v2.js"></script>
    <script src="js/flashcard-game.js"></script>
    
    <script>
        const lesson1Config = ${JSON.stringify(lesson1Config, null, 2)};
        createLessonViewer('lesson-container', lesson1Config);
    </script>
</body>
</html>`;

fs.writeFileSync('1st-grade-lesson-1-v4.html', htmlContent, 'utf8');
console.log('✅ Lesson 1 rebuilt with spiral learning foundation!');
console.log('   Foundation: 4 letters (A, M, T, S) + 2 words (am, at)');
console.log('   Every future lesson will review these!');
