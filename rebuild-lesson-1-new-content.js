const fs = require('fs');

/**
 * Rebuild Lesson 1 with new comprehensive content from scope & sequence
 * Based on detailed lesson plan for Day 1: Letter Sounds A, M, T, S + The Enormous Turnip
 */

const lesson1Config = {
  lessonId: '1st-grade-lesson-1',
  gradeLevel: '1st-grade',
  title: 'Lesson 1: Letter Sounds A, M, T, S',
  pages: [
    // Page 1: Title Page
    {
      render: () => `
        <div class="lesson-page-card title-page">
          <div class="character">🌱</div>
          <h1>Lesson 1</h1>
          <div class="subtitle">Letter Sounds A, M, T, S</div>
          <p style="color: #5B7C99; font-size: 18px; margin-top: 20px;">
            Learn letter sounds and start reading<br>
            "The Enormous Turnip"!
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
              ✓ Learn the sounds for letters <strong>A, M, T, and S</strong>
            </p>
            <p style="margin: 15px 0; font-size: 18px;">
              ✓ Blend sounds together to make words like <strong>"am"</strong> and <strong>"at"</strong>
            </p>
            <p style="margin: 15px 0; font-size: 18px;">
              ✓ Start reading <strong>"The Enormous Turnip"</strong>
            </p>
            <p style="margin: 15px 0; font-size: 18px;">
              ✓ Learn new vocabulary words
            </p>
          </div>
        </div>
      `
    },

    // Page 3: Letter A
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

    // Page 4: Letter M
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

    // Page 5: Letter T
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

    // Page 6: Letter S
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

    // Page 7: Blending Practice
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
            🎉 You can read words now!
          </p>
        </div>
      `
    },

    // Page 8: Vocabulary - Enormous
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
          <p style="font-size: 18px; margin-top: 30px;">
            Example: "The elephant is <strong>enormous</strong>!"
          </p>
        </div>
      `
    },

    // Page 9: Vocabulary - Turnip
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
          <p style="font-size: 18px; margin: 20px 0; color: #666;">
            It's round and white or purple!
          </p>
          <p style="font-size: 18px; margin-top: 30px;">
            Example: "We planted a turnip in the garden."
          </p>
        </div>
      `
    },

    // Page 10: Vocabulary - Pull & Stuck
    {
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📚 Action Words</h2>
          
          <div style="margin: 30px 0;">
            <p style="font-size: 28px; margin: 15px 0; color: #5B7C99;">
              <strong>PULL</strong> 💪
            </p>
            <p style="font-size: 18px;">
              To grab something and try to move it toward you
            </p>
          </div>

          <div style="margin: 30px 0;">
            <p style="font-size: 28px; margin: 15px 0; color: #5B7C99;">
              <strong>STUCK</strong> 🚫
            </p>
            <p style="font-size: 18px;">
              When something won't move, no matter how hard you try!
            </p>
          </div>

          <div style="margin: 30px 0;">
            <p style="font-size: 28px; margin: 15px 0; color: #5B7C99;">
              <strong>FINALLY</strong> 🎉
            </p>
            <p style="font-size: 18px;">
              At last! After trying many times!
            </p>
          </div>
        </div>
      `
    },

    // Page 11: Story Time - Digital Book
    {
      render: (progress, markComplete) => {
        return `
          <div class="lesson-page-card activity-section">
            <h2>📖 Story Time</h2>
            <p style="font-size: 18px; margin-bottom: 15px;">Read <strong>"The Enormous Turnip"</strong> (Part 1)</p>
            ${progress.story_completed ? '<div class="completion-badge">✅ Story Complete!</div>' : ''}
            <div id="story-book" class="digital-book-container" style="margin-top: 20px;"></div>
          </div>
        `;
      },
      onLoad: () => {
        fetch('book-data/enormous-turnip-lessons-1-5.json')
          .then(response => response.json())
          .then(bookConfig => {
            bookConfig.bookId = 'enormous-turnip-lessons-1-5';
            createDigitalBookV2('story-book', bookConfig, {
              maxPageIndex: 1, // First 2 pages for Day 1
              lessonNumber: 1,
              onComplete: () => {
                window.lessonMarkComplete('story');
              }
            });
          })
          .catch(error => {
            console.error('Error loading book:', error);
            document.getElementById('story-book').innerHTML = `
              <div style="padding: 20px; background: #FFF5F5; border-radius: 8px;">
                <p style="color: #E88D8D;">📚 Story book is being prepared...</p>
                <p style="font-size: 14px; margin-top: 10px;">Ask your teacher to help load the story!</p>
              </div>
            `;
          });
      }
    },

    // Page 12: Letter Practice Game
    {
      render: (progress, markComplete) => {
        return `
          <div class="lesson-page-card activity-section">
            <h2>✏️ Letter Practice</h2>
            <p>Match letters with their sounds!</p>
            ${progress.letter_practice_completed ? '<div class="completion-badge">✅ Practice Complete!</div>' : ''}
            <div id="letter-practice-game" style="margin-top: 20px;"></div>
          </div>
        `;
      },
      onLoad: () => {
        new FlashcardGame('letter-practice-game', {
          title: "Letter Sounds",
          subtitle: "Match the letter to its sound!",
          pairs: [
            {term: "A", match: "Says /a/ like apple 🍎"},
            {term: "M", match: "Says /m/ like moon 🌙"},
            {term: "T", match: "Says /t/ like tiger 🐯"},
            {term: "S", match: "Says /s/ like sun ☀️"}
          ]
        }, () => {
          window.lessonMarkComplete('letter_practice');
        });
      }
    },

    // Page 13: Review & Next Steps
    {
      render: (progress) => {
        const allComplete = progress.story_completed && progress.letter_practice_completed;
        return `
          <div class="lesson-page-card title-page">
            <div class="character">🎉</div>
            <h1>Great Job!</h1>
            <div class="subtitle">You completed Lesson 1!</div>
            
            ${allComplete ? `
              <div class="completion-badge" style="margin: 30px auto;">
                ✅ 100% Complete!
              </div>
              <div style="max-width: 400px; margin: 20px auto; text-align: left;">
                <h3 style="color: #5B7C99; margin-bottom: 15px;">Today you learned:</h3>
                <p style="margin: 10px 0;">✓ Letter sounds: A, M, T, S</p>
                <p style="margin: 10px 0;">✓ Blending: "am" and "at"</p>
                <p style="margin: 10px 0;">✓ New words: enormous, turnip, pull, stuck</p>
                <p style="margin: 10px 0;">✓ Started "The Enormous Turnip" story</p>
              </div>
              <p style="margin-top: 30px; font-size: 18px;">
                🏠 <strong>Practice at home:</strong> Find things that start with A, M, T, and S!
              </p>
            ` : `
              <p style="color: #E88D8D; margin-top: 20px;">
                Go back and complete all activities to finish this lesson!
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

// Generate the HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 1: Letter Sounds A, M, T, S - BedrockELA</title>
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

// Write the file
fs.writeFileSync('1st-grade-lesson-1-v3.html', htmlContent, 'utf8');
console.log('✅ Created 1st-grade-lesson-1-v3.html with new comprehensive content!');
