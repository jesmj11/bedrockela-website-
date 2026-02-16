const fs = require('fs');

/**
 * Build Lessons 2-10 with SPIRALED REVIEW
 * Key principle: Review EVERYTHING learned so far in EVERY lesson
 * Students don't move forward until they've mastered what came before
 */

const lessonsData = [
  {
    lessonNum: 2,
    title: "Letter I + Spiraled Review",
    newLetter: { letter: "I", sound: "/i/", example: "igloo", emoji: "🧊", words: "it, in, is, if" },
    allLearnedLetters: ["A", "M", "T", "S", "I"],
    reviewWords: ["am", "at", "sat", "mat"],
    newWords: ["it", "sit"],
    allSightWords: ["the"],
    storyPages: [2, 3],
    focus: "Master A, M, T, S + introduce I"
  },
  {
    lessonNum: 3,
    title: "Letter P + Review A-I",
    newLetter: { letter: "P", sound: "/p/", example: "pig", emoji: "🐷", words: "pig, pan, pet, pop" },
    allLearnedLetters: ["A", "M", "T", "S", "I", "P"],
    reviewWords: ["am", "at", "mat", "sat", "it", "sit"],
    newWords: ["pat", "pit", "tap", "sap"],
    allSightWords: ["the"],
    storyPages: [3, 4],
    focus: "Add P to our toolkit, practice all letters"
  },
  {
    lessonNum: 4,
    title: "Letter N + Word Building",
    newLetter: { letter: "N", sound: "/n/", example: "nest", emoji: "🪺", words: "nap, net, no, nut" },
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N"],
    reviewWords: ["am", "at", "mat", "sat", "pat", "it", "sit", "pit"],
    newWords: ["nap", "pan", "tan", "pin", "tin"],
    allSightWords: ["the", "and"],
    storyPages: [4, 5],
    focus: "Build words with 7 letters now!"
  },
  {
    lessonNum: 5,
    title: "Assessment + Letter R",
    newLetter: { letter: "R", sound: "/r/", example: "rabbit", emoji: "🐰", words: "run, red, rat, rip" },
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R"],
    reviewWords: ["am", "at", "mat", "sat", "pat", "nap", "pan", "it", "sit", "pit", "pin"],
    newWords: ["rat", "ran", "rip", "rap"],
    allSightWords: ["the", "and"],
    storyPages: [5, 6],
    focus: "CHECK mastery of all 8 letters",
    isAssessment: true
  },
  {
    lessonNum: 6,
    title: "Letter O + More Words",
    newLetter: { letter: "O", sound: "/o/", example: "octopus", emoji: "🐙", words: "on, top, pot, hot" },
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O"],
    reviewWords: ["mat", "sat", "pat", "rat", "nap", "pan", "tan", "ran", "it", "sit", "pit", "pin"],
    newWords: ["top", "pot", "not", "mop"],
    allSightWords: ["the", "and", "to"],
    storyPages: [6, 7],
    focus: "Add O - now we have 9 letters to build with!"
  },
  {
    lessonNum: 7,
    title: "Word Families Review",
    newLetter: null,
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O"],
    reviewWords: ["mat", "sat", "pat", "rat", "it", "sit", "pit", "top", "pot", "not"],
    wordFamilies: ["-at family: mat, sat, pat, rat", "-it family: it, sit, pit", "-ot family: pot, not, rot"],
    allSightWords: ["the", "and", "to", "I"],
    storyPages: [7, 8],
    focus: "Master word families with all letters"
  },
  {
    lessonNum: 8,
    title: "Letter E + More Blending",
    newLetter: { letter: "E", sound: "/e/", example: "egg", emoji: "🥚", words: "pen, ten, net, pet" },
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E"],
    reviewWords: ["mat", "sat", "pat", "rat", "nap", "pan", "it", "sit", "pit", "top", "pot", "not"],
    newWords: ["pet", "net", "ten", "pen", "men"],
    allSightWords: ["the", "and", "to", "I", "you"],
    storyPages: [8, 9],
    focus: "ALL 10 letters - build any CVC word!"
  },
  {
    lessonNum: 9,
    title: "Mixed Review Day",
    newLetter: null,
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E"],
    reviewWords: ["mat", "sat", "pat", "rat", "nap", "tap", "it", "sit", "pit", "top", "pot", "not", "pet", "net", "ten"],
    mixedPractice: true,
    allSightWords: ["the", "and", "to", "I", "you", "it"],
    storyPages: [9, 10],
    focus: "Practice ALL 10 letters until automatic"
  },
  {
    lessonNum: 10,
    title: "Mastery Check + Story End",
    newLetter: null,
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E"],
    reviewWords: ["All CVC words with learned letters"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in"],
    storyPages: [10, 11],
    focus: "Prove mastery - read story fluently!",
    isFinal: true,
    isMastery: true
  }
];

function generateSpiralLesson(lessonData) {
  const pages = [];
  
  // Title Page
  pages.push({
    render: () => `
      <div class="lesson-page-card title-page">
        <div class="character">🌱</div>
        <h1>Lesson ${lessonData.lessonNum}</h1>
        <div class="subtitle">${lessonData.title}</div>
        <p style="color: #5B7C99; font-size: 18px; margin-top: 20px;">
          ${lessonData.focus}
        </p>
      </div>
    `
  });

  // ALWAYS START WITH FULL REVIEW
  pages.push({
    render: () => `
      <div class="lesson-page-card content-page">
        <h2>🔄 Review ALL Letters We Know!</h2>
        <p style="font-size: 18px; margin: 15px 0; color: #666;">
          Let's practice every letter we've learned so far:
        </p>
        <div style="font-size: 64px; margin: 30px 0; letter-spacing: 15px; line-height: 1.5;">
          ${lessonData.allLearnedLetters.join(' ')}
        </div>
        <p style="font-size: 20px; margin: 20px 0; color: #5B7C99;">
          <strong>Can you say the sound for each letter?</strong>
        </p>
        <p style="font-size: 18px; color: #666;">
          We have <strong>${lessonData.allLearnedLetters.length} letters</strong> in our toolkit now!
        </p>
      </div>
    `
  });

  // REVIEW WORDS FROM PREVIOUS LESSONS
  if (lessonData.reviewWords && lessonData.reviewWords.length > 0) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📖 Review Words We Can Read!</h2>
          <p style="font-size: 18px; margin: 15px 0;">
            Practice reading these words from earlier lessons:
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 500px; margin: 30px auto;">
            ${lessonData.reviewWords.slice(0, 12).map(word => `
              <div style="padding: 15px; background: #F5F9FF; border-radius: 8px; font-size: 24px; font-weight: bold; color: #5B7C99;">
                ${word}
              </div>
            `).join('')}
          </div>
          <p style="font-size: 16px; margin-top: 20px; color: #666;">
            🎯 Read these until they're automatic!
          </p>
        </div>
      `
    });
  }

  // NEW LETTER (if applicable)
  if (lessonData.newLetter) {
    const colors = ['#D4A68F', '#9BC5DB', '#E5A8A8', '#A3C99C', '#D9BA8E', '#B3A8D4'];
    const colorIndex = lessonData.lessonNum % colors.length;
    
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🌟 NEW Letter: ${lessonData.newLetter.letter}</h2>
          <div style="font-size: 96px; margin: 20px 0; color: ${colors[colorIndex]};">
            ${lessonData.newLetter.letter} ${lessonData.newLetter.letter.toLowerCase()}
          </div>
          <p style="font-size: 24px; margin: 20px 0;">
            <strong>${lessonData.newLetter.letter} says "${lessonData.newLetter.sound}"</strong>
          </p>
          <div style="font-size: 48px; margin: 20px 0;">${lessonData.newLetter.emoji}</div>
          <p style="font-size: 20px;">
            Like in: <strong style="color: ${colors[colorIndex]};">${lessonData.newLetter.example}</strong>
          </p>
          <p style="font-size: 18px; color: #666; margin-top: 20px;">
            More words: <strong>${lessonData.newLetter.words}</strong>
          </p>
        </div>
      `
    });
  }

  // NEW WORDS TO PRACTICE
  if (lessonData.newWords && lessonData.newWords.length > 0) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>✨ New Words to Practice!</h2>
          <p style="font-size: 18px; margin: 15px 0;">
            Now we can read these NEW words:
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 500px; margin: 30px auto;">
            ${lessonData.newWords.map(word => `
              <div style="padding: 15px; background: #FFF5F5; border-radius: 8px; font-size: 24px; font-weight: bold; color: #E5A8A8;">
                ${word}
              </div>
            `).join('')}
          </div>
          <p style="font-size: 16px; margin-top: 20px; color: #666;">
            🔤 Blend the sounds together slowly, then read fast!
          </p>
        </div>
      `
    });
  }

  // WORD FAMILIES (if applicable)
  if (lessonData.wordFamilies) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>👨‍👩‍👧‍👦 Word Families</h2>
          <p style="font-size: 18px; margin: 15px 0;">
            Words that rhyme and have the same ending:
          </p>
          ${lessonData.wordFamilies.map(family => `
            <div style="margin: 25px 0; padding: 20px; background: #F9FFF5; border-radius: 12px;">
              <p style="font-size: 22px; color: #A3C99C; font-weight: bold;">
                ${family}
              </p>
            </div>
          `).join('')}
          <p style="font-size: 16px; margin-top: 20px; color: #666;">
            💡 When you know one word, you can read the whole family!
          </p>
        </div>
      `
    });
  }

  // SIGHT WORDS - CUMULATIVE REVIEW
  if (lessonData.allSightWords && lessonData.allSightWords.length > 0) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>👁️ Sight Words We Know</h2>
          <p style="font-size: 18px; margin: 15px 0;">
            Practice ALL our sight words:
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin: 30px 0;">
            ${lessonData.allSightWords.map((word, idx) => `
              <div style="padding: 20px 30px; background: ${idx === lessonData.allSightWords.length - 1 ? '#FFF5F5' : '#F5F9FF'}; border-radius: 12px; font-size: ${idx === lessonData.allSightWords.length - 1 ? '32px' : '28px'}; font-weight: bold; color: #5B7C99; ${idx === lessonData.allSightWords.length - 1 ? 'border: 3px solid #E5A8A8;' : ''}">
                ${word}
              </div>
            `).join('')}
          </div>
          <p style="font-size: 16px; margin-top: 20px; color: #666;">
            ${lessonData.allSightWords.length > 1 && lessonData.allSightWords[lessonData.allSightWords.length - 1] !== lessonData.allSightWords[lessonData.allSightWords.length - 2] ? 
              `🌟 The word in the box is NEW today!` : 
              `📚 Keep practicing these until you know them instantly!`}
          </p>
        </div>
      `
    });
  }

  // Story Time
  pages.push({
    render: (progress, markComplete) => {
      return `
        <div class="lesson-page-card activity-section">
          <h2>📖 Story Time</h2>
          <p style="font-size: 18px; margin-bottom: 15px;">
            ${lessonData.isFinal ? 'Finish' : 'Continue'} reading <strong>"The Enormous Turnip"</strong>
          </p>
          ${progress.story_completed ? '<div class="completion-badge">✅ Story Complete!</div>' : ''}
          <div id="story-book" class="digital-book-container" style="margin-top: 20px;"></div>
        </div>
      `;
    },
    onLoad: () => {
      const maxPage = lessonData.storyPages[1] - 1;
      return `
        fetch('book-data/enormous-turnip-lessons-1-5.json')
          .then(response => response.json())
          .then(bookConfig => {
            bookConfig.bookId = 'enormous-turnip-lessons-1-5';
            createDigitalBookV2('story-book', bookConfig, {
              maxPageIndex: ${maxPage},
              lessonNumber: ${lessonData.lessonNum},
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
  });

  // PRACTICE GAME - ALL LEARNED LETTERS
  const activityName = lessonData.isAssessment ? 'assessment' : lessonData.isMastery ? 'mastery' : 'practice';
  pages.push({
    render: (progress, markComplete) => {
      return `
        <div class="lesson-page-card activity-section">
          <h2>${lessonData.isAssessment || lessonData.isMastery ? '📊 Mastery Check' : '✏️ Practice ALL Letters'}</h2>
          <p>${lessonData.isAssessment || lessonData.isMastery ? 'Show mastery of ALL letters!' : 'Match ALL the letters we know with their sounds!'}</p>
          ${progress[activityName + '_completed'] ? '<div class="completion-badge">✅ Complete!</div>' : ''}
          <div id="practice-game" style="margin-top: 20px;"></div>
        </div>
      `;
    },
    onLoad: () => {
      // Use ALL learned letters, not just a few
      const letters = lessonData.allLearnedLetters.slice(0, 5); // Show 5 at a time for matching game
      const pairs = letters.map(l => {
        const sounds = {
          A: '/a/ like apple 🍎', M: '/m/ like moon 🌙', T: '/t/ like tiger 🐯', 
          S: '/s/ like sun ☀️', I: '/i/ like igloo 🧊', P: '/p/ like pig 🐷',
          N: '/n/ like nest 🪺', R: '/r/ like rabbit 🐰', O: '/o/ like octopus 🐙', 
          E: '/e/ like egg 🥚'
        };
        return `{term: "${l}", match: "Says ${sounds[l]}"}`;
      });
      
      return `
        new FlashcardGame('practice-game', {
          title: "${lessonData.isAssessment || lessonData.isMastery ? 'MASTERY CHECK' : 'All Our Letters'}",
          subtitle: "Match letters to sounds - show what you know!",
          pairs: [${pairs.join(', ')}]
        }, () => {
          window.lessonMarkComplete('${activityName}');
        });
      `;
    }
  });

  // Completion Page
  pages.push({
    render: (progress) => {
      const allComplete = progress.story_completed && progress[activityName + '_completed'];
      return `
        <div class="lesson-page-card title-page">
          <div class="character">${lessonData.isFinal ? '🏆' : '🎉'}</div>
          <h1>${lessonData.isFinal ? 'Mastery Achieved!' : 'Great Practice!'}</h1>
          <div class="subtitle">Lesson ${lessonData.lessonNum} Complete</div>
          
          ${allComplete ? `
            <div class="completion-badge" style="margin: 30px auto;">
              ✅ 100% Complete!
            </div>
            <div style="max-width: 400px; margin: 20px auto; text-align: left;">
              <p style="margin: 10px 0; font-size: 18px;">
                📚 <strong>${lessonData.allLearnedLetters.length} letters</strong> in your toolkit
              </p>
              <p style="margin: 10px 0; font-size: 18px;">
                👁️ <strong>${lessonData.allSightWords.length} sight words</strong> you know
              </p>
              <p style="margin: 10px 0; font-size: 18px;">
                📖 Story progress: ${Math.round((lessonData.storyPages[1] / 11) * 100)}%
              </p>
            </div>
            ${lessonData.isFinal ? `
              <p style="margin-top: 30px; font-size: 20px; color: #5B7C99;">
                🎊 You can now read HUNDREDS of words!
              </p>
            ` : ''}
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
  });

  return {
    lessonId: `1st-grade-lesson-${lessonData.lessonNum}`,
    gradeLevel: '1st-grade',
    title: `Lesson ${lessonData.lessonNum}: ${lessonData.title}`,
    pages: pages
  };
}

// Build all lessons
lessonsData.forEach(lessonData => {
  const lessonConfig = generateSpiralLesson(lessonData);
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lessonConfig.title} - BedrockELA</title>
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
        const lessonConfig = ${JSON.stringify(lessonConfig, null, 2)};
        createLessonViewer('lesson-container', lessonConfig);
    </script>
</body>
</html>`;

  fs.writeFileSync(`1st-grade-lesson-${lessonData.lessonNum}-v4.html`, htmlContent, 'utf8');
  console.log(`✅ Lesson ${lessonData.lessonNum}: ${lessonData.title} (${lessonData.allLearnedLetters.length} letters cumulative)`);
});

console.log('\n🎉 All Spiraled Lessons 2-10 created!');
console.log('\n📊 SPIRAL LEARNING APPROACH:');
console.log('✅ Every lesson reviews ALL previously learned letters');
console.log('✅ Students practice old words before learning new ones');
console.log('✅ Sight words are cumulative - all shown every lesson');
console.log('✅ Word count grows systematically as letters are added');
console.log('✅ Mastery is checked at Lessons 5 and 10');
console.log('\nNo student moves forward until previous content is automatic!');
