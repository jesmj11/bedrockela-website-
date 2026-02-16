const fs = require('fs');

/**
 * Build Lessons 2-10 for 1st Grade
 * Based on detailed lesson plans: continuing "The Enormous Turnip"
 */

const lessonsData = [
  {
    lessonNum: 2,
    title: "Letter I + Review",
    newLetter: { letter: "I", sound: "/i/", example: "igloo", emoji: "🧊", words: "it, in, is, if" },
    reviewLetters: ["A", "M", "T", "S"],
    blending: ["I-T = it", "S-I-T = sit", "M-A-T = mat"],
    sightWord: "the",
    storyPages: [2, 3],
    vocabulary: ["pull", "stuck"],
    focus: "Review A, M, T, S + introduce I + sight word 'the'"
  },
  {
    lessonNum: 3,
    title: "Letter P + CVC Words",
    newLetter: { letter: "P", sound: "/p/", example: "pig", emoji: "🐷", words: "pig, pan, pet, pop" },
    reviewLetters: ["A", "M", "T", "S", "I"],
    blending: ["P-A-T = pat", "S-A-P = sap", "T-I-P = tip"],
    sightWord: "the",
    storyPages: [3, 4],
    vocabulary: ["character", "helper"],
    focus: "CVC word building + character analysis"
  },
  {
    lessonNum: 4,
    title: "Letter N + Problem Solving",
    newLetter: { letter: "N", sound: "/n/", example: "nest", emoji: "🪺", words: "nap, net, no, nut" },
    reviewLetters: ["A", "M", "T", "S", "I", "P"],
    blending: ["N-A-P = nap", "T-A-N = tan", "P-A-N = pan"],
    sightWord: "and",
    storyPages: [4, 5],
    vocabulary: ["problem", "solution"],
    focus: "Phoneme manipulation + identify story problem"
  },
  {
    lessonNum: 5,
    title: "Assessment Day + Letter R",
    newLetter: { letter: "R", sound: "/r/", example: "rabbit", emoji: "🐰", words: "run, red, rat, rip" },
    reviewLetters: ["A", "M", "T", "S", "I", "P", "N"],
    blending: ["R-A-T = rat", "R-I-P = rip", "R-A-N = ran"],
    sightWord: "the",
    storyPages: [5, 6],
    vocabulary: [],
    focus: "ASSESSMENT: Check all learned letters + introduce R",
    isAssessment: true
  },
  {
    lessonNum: 6,
    title: "Consonant Blends",
    newLetter: null,
    reviewLetters: ["A", "M", "T", "S", "I", "P", "N", "R"],
    blending: ["TR- blend", "SN- blend", "Practice blending"],
    sightWord: "to",
    storyPages: [6, 7],
    vocabulary: ["sequence", "next"],
    focus: "Beginning consonant blends + story sequencing"
  },
  {
    lessonNum: 7,
    title: "Letter O + Motivation",
    newLetter: { letter: "O", sound: "/o/", example: "octopus", emoji: "🐙", words: "on, top, pot, hot" },
    reviewLetters: ["A", "M", "T", "S", "I", "P", "N", "R"],
    blending: ["T-O-P = top", "P-O-T = pot", "N-O-T = not"],
    sightWord: "I",
    storyPages: [7, 8],
    vocabulary: ["motivation", "teamwork"],
    focus: "Short O sound + character motivations"
  },
  {
    lessonNum: 8,
    title: "Word Families",
    newLetter: null,
    reviewLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O"],
    blending: ["-at family", "-it family", "-ot family"],
    sightWord: "you",
    storyPages: [8, 9],
    vocabulary: ["predict", "ending"],
    focus: "Word families (-at, -it, -ot) + story predictions"
  },
  {
    lessonNum: 9,
    title: "Letter E + Story Climax",
    newLetter: { letter: "E", sound: "/e/", example: "egg", emoji: "🥚", words: "pen, ten, net, pet" },
    reviewLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O"],
    blending: ["P-E-T = pet", "N-E-T = net", "T-E-N = ten"],
    sightWord: "it",
    storyPages: [9, 10],
    vocabulary: ["climax", "excitement"],
    focus: "Short E sound + story climax identification"
  },
  {
    lessonNum: 10,
    title: "Story Completion & Review",
    newLetter: null,
    reviewLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E"],
    blending: ["Review all CVC patterns"],
    sightWord: "in",
    storyPages: [10, 11], // Final pages
    vocabulary: ["theme", "cooperation", "persistence"],
    focus: "Complete 'The Enormous Turnip' + review all letters",
    isFinal: true
  }
];

function generateLesson(lessonData) {
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

  // Learning Objectives
  let objectives = [];
  if (lessonData.newLetter) {
    objectives.push(`Learn the sound for letter <strong>${lessonData.newLetter.letter}</strong>`);
  }
  objectives.push(`Practice blending sounds together`);
  if (lessonData.sightWord) {
    objectives.push(`Learn sight word <strong>"${lessonData.sightWord}"</strong>`);
  }
  objectives.push(`Continue reading <strong>"The Enormous Turnip"</strong>`);

  pages.push({
    render: () => `
      <div class="lesson-page-card content-page">
        <h2>🎯 Today You Will...</h2>
        <div style="text-align: left; max-width: 500px; margin: 20px auto;">
          ${objectives.map(obj => `
            <p style="margin: 15px 0; font-size: 18px;">✓ ${obj}</p>
          `).join('')}
        </div>
      </div>
    `
  });

  // Review letters if applicable
  if (lessonData.reviewLetters && lessonData.reviewLetters.length > 0 && lessonData.lessonNum <= 4) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📝 Let's Review!</h2>
          <p style="font-size: 20px; margin: 20px 0;">
            Quick review of letters we've learned:
          </p>
          <div style="font-size: 72px; margin: 30px 0; letter-spacing: 20px;">
            ${lessonData.reviewLetters.join(' ')}
          </div>
          <p style="font-size: 18px;">
            Can you say the sound for each letter?
          </p>
        </div>
      `
    });
  }

  // New Letter Introduction (if applicable)
  if (lessonData.newLetter) {
    const colors = ['#D4A68F', '#9BC5DB', '#E5A8A8', '#A3C99C', '#D9BA8E', '#B3A8D4'];
    const colorIndex = lessonData.lessonNum % colors.length;
    
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>🔤 New Letter: ${lessonData.newLetter.letter}</h2>
          <div style="font-size: 96px; margin: 20px 0; color: ${colors[colorIndex]};">
            ${lessonData.newLetter.letter} ${lessonData.newLetter.letter.toLowerCase()}
          </div>
          <p style="font-size: 24px; margin: 20px 0;">
            <strong>${lessonData.newLetter.letter} says "${lessonData.newLetter.sound}" like in 
            <span style="color: ${colors[colorIndex]};">${lessonData.newLetter.example}</span></strong>
          </p>
          <div style="font-size: 48px; margin: 20px 0;">${lessonData.newLetter.emoji}</div>
          <p style="font-size: 20px;">
            Say it with me: <strong>${lessonData.newLetter.sound} ${lessonData.newLetter.sound} ${lessonData.newLetter.example}!</strong>
          </p>
          <p style="font-size: 18px; color: #666; margin-top: 20px;">
            More words: <strong>${lessonData.newLetter.words}</strong>
          </p>
        </div>
      `
    });
  }

  // Blending Practice
  pages.push({
    render: () => `
      <div class="lesson-page-card content-page">
        <h2>🔗 Blend Sounds Together!</h2>
        <p style="font-size: 20px; margin: 20px 0;">
          Let's blend sounds to make words!
        </p>
        ${lessonData.blending.map((blend, idx) => `
          <div style="margin: 20px 0; padding: 15px; background: ${idx % 2 === 0 ? '#F5F9FF' : '#FFF7F7'}; border-radius: 12px;">
            <p style="font-size: 28px; margin: 10px 0; color: #5B7C99;">
              <strong>${blend}</strong>
            </p>
          </div>
        `).join('')}
        <p style="font-size: 18px; margin-top: 30px;">
          🎉 Great blending!
        </p>
      </div>
    `
  });

  // Sight Word (if applicable)
  if (lessonData.sightWord) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>👁️ Sight Word</h2>
          <div style="font-size: 96px; margin: 30px 0; color: #5B7C99;">
            <strong>${lessonData.sightWord}</strong>
          </div>
          <p style="font-size: 24px; margin: 20px 0;">
            This word is <strong>"${lessonData.sightWord}"</strong>
          </p>
          <p style="font-size: 20px; margin: 20px 0; color: #666;">
            We see this word everywhere!
          </p>
          <div style="margin: 30px 0; text-align: left; max-width: 400px; margin-left: auto; margin-right: auto;">
            <p style="font-size: 18px; margin: 10px 0;">• ${lessonData.sightWord} mat</p>
            <p style="font-size: 18px; margin: 10px 0;">• ${lessonData.sightWord} sun</p>
            <p style="font-size: 18px; margin: 10px 0;">• ${lessonData.sightWord} enormous turnip</p>
          </div>
        </div>
      `
    });
  }

  // Vocabulary (if applicable)
  if (lessonData.vocabulary && lessonData.vocabulary.length > 0) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📚 Story Words</h2>
          <p style="font-size: 20px; margin: 20px 0;">
            Important words from today's story:
          </p>
          ${lessonData.vocabulary.map(word => `
            <div style="margin: 25px 0;">
              <p style="font-size: 28px; color: #5B7C99;">
                <strong>${word.toUpperCase()}</strong>
              </p>
            </div>
          `).join('')}
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
            ${lessonData.isAssessment ? ' (Pages for today)' : ''}
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

  // Letter/Word Practice Game
  const activityName = lessonData.isAssessment ? 'assessment' : 'practice';
  pages.push({
    render: (progress, markComplete) => {
      return `
        <div class="lesson-page-card activity-section">
          <h2>${lessonData.isAssessment ? '📊 Quick Check' : '✏️ Practice Time'}</h2>
          <p>${lessonData.isAssessment ? 'Show what you know!' : 'Match letters with their sounds!'}</p>
          ${progress[activityName + '_completed'] ? '<div class="completion-badge">✅ Complete!</div>' : ''}
          <div id="practice-game" style="margin-top: 20px;"></div>
        </div>
      `;
    },
    onLoad: () => {
      const letters = lessonData.reviewLetters.slice(0, 4);
      const pairs = letters.map(l => {
        const sounds = {A: '/a/ like apple 🍎', M: '/m/ like moon 🌙', T: '/t/ like tiger 🐯', 
                       S: '/s/ like sun ☀️', I: '/i/ like igloo 🧊', P: '/p/ like pig 🐷',
                       N: '/n/ like nest 🪺', R: '/r/ like rabbit 🐰', O: '/o/ like octopus 🐙', E: '/e/ like egg 🥚'};
        return `{term: "${l}", match: "Says ${sounds[l]}"}`;
      });
      
      return `
        new FlashcardGame('practice-game', {
          title: "${lessonData.isAssessment ? 'Assessment Check' : 'Letter Sounds'}",
          subtitle: "Match the letter to its sound!",
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
          <div class="character">🎉</div>
          <h1>Great Job!</h1>
          <div class="subtitle">You completed Lesson ${lessonData.lessonNum}!</div>
          
          ${allComplete ? `
            <div class="completion-badge" style="margin: 30px auto;">
              ✅ 100% Complete!
            </div>
            <p style="margin-top: 30px; font-size: 18px;">
              ${lessonData.isFinal ? '🎊 You finished "The Enormous Turnip"!' : '📖 Keep reading tomorrow!'}
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
  const lessonConfig = generateLesson(lessonData);
  
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

  fs.writeFileSync(`1st-grade-lesson-${lessonData.lessonNum}-v3.html`, htmlContent, 'utf8');
  console.log(`✅ Created Lesson ${lessonData.lessonNum}: ${lessonData.title}`);
});

console.log('\n🎉 All Lessons 2-10 created successfully!');
console.log('\nLessons build "The Enormous Turnip" story across Days 1-10');
console.log('Letters taught: A, M, T, S, I, P, N, R, O, E (10 letters total)');
console.log('Sight words: the, and, to, I, you, it, in (8 words total)');
