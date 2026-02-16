const fs = require('fs');

/**
 * Build Lessons 11-20 with SPIRALED REVIEW
 * Lessons 11-15: The Gingerbread Man (complete alphabet by lesson 20!)
 * Lessons 16-20: Lion and the Mouse fable
 */

const lessonsData = [
  // GINGERBREAD MAN STORY (Lessons 11-15)
  {
    lessonNum: 11,
    title: "The Gingerbread Man Begins",
    newLetters: [
      { letter: "B", sound: "/b/", example: "ball", emoji: "⚽", words: "bat, bit, bet" },
      { letter: "C", sound: "/c/", example: "cat", emoji: "🐱", words: "cat, cot, cop" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "B", "C"],
    reviewWords: ["mat", "sat", "pat", "rat", "nap", "pan", "it", "sit", "pit", "top", "pot", "pet"],
    newWords: ["bat", "cab", "cot", "cop"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said"],
    storyName: "The Gingerbread Man",
    storyPart: 1,
    focus: "Start new story! Add B and C to our alphabet"
  },
  {
    lessonNum: 12,
    title: "The Great Escape",
    newLetters: [
      { letter: "D", sound: "/d/", example: "dog", emoji: "🐕", words: "dig, dad, did" },
      { letter: "F", sound: "/f/", example: "fish", emoji: "🐟", words: "fit, fan, fat" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "B", "C", "D", "F"],
    reviewWords: ["mat", "sat", "bat", "cat", "rat", "pan", "it", "sit", "top", "pot", "cot", "cop"],
    newWords: ["dad", "did", "fan", "fat", "fit"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he"],
    storyName: "The Gingerbread Man",
    storyPart: 2,
    focus: "Animals chase! Add D and F - now 14 letters!"
  },
  {
    lessonNum: 13,
    title: "More Animals Join",
    newLetters: [
      { letter: "G", sound: "/g/", example: "goat", emoji: "🐐", words: "got, get, gig" },
      { letter: "H", sound: "/h/", example: "hat", emoji: "🎩", words: "hat, him, hot" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "B", "C", "D", "F", "G", "H"],
    reviewWords: ["mat", "sat", "bat", "cat", "dad", "fan", "it", "sit", "fit", "top", "got", "cot"],
    newWords: ["got", "get", "hat", "him", "hog"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for"],
    storyName: "The Gingerbread Man",
    storyPart: 3,
    focus: "Horse and goat! Add G and H - 16 letters now!"
  },
  {
    lessonNum: 14,
    title: "The Clever Fox",
    newLetters: [
      { letter: "J", sound: "/j/", example: "jam", emoji: "🍓", words: "jam, job, jog" },
      { letter: "K", sound: "/k/", example: "kite", emoji: "🪁", words: "kit, kid, Ken" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "B", "C", "D", "F", "G", "H", "J", "K"],
    reviewWords: ["mat", "bat", "cat", "dad", "fan", "got", "hat", "it", "sit", "fit", "top", "pot"],
    newWords: ["jam", "job", "kit", "kid"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for", "help"],
    storyName: "The Gingerbread Man",
    storyPart: 4,
    focus: "Fox appears! Add J and K - 18 letters!"
  },
  {
    lessonNum: 15,
    title: "The Gingerbread Man's End",
    newLetters: [
      { letter: "L", sound: "/l/", example: "lion", emoji: "🦁", words: "let, lap, lip" },
      { letter: "V", sound: "/v/", example: "van", emoji: "🚐", words: "vet, van" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "B", "C", "D", "F", "G", "H", "J", "K", "L", "V"],
    reviewWords: ["mat", "bat", "cat", "dad", "fan", "got", "hat", "jam", "kit", "it", "sit", "top"],
    newWords: ["let", "lap", "lip", "van", "vet"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for", "help", "my", "all"],
    storyName: "The Gingerbread Man",
    storyPart: 5,
    focus: "Story ends! Add L and V - 20 letters! 🎉",
    isFinal: true
  },

  // LION AND THE MOUSE STORY (Lessons 16-20)
  {
    lessonNum: 16,
    title: "Meet the Lion",
    newLetters: [
      { letter: "U", sound: "/u/", example: "umbrella", emoji: "☂️", words: "up, us, but, cup" },
      { letter: "W", sound: "/w/", example: "web", emoji: "🕸️", words: "wet, win, wag" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "V", "W"],
    reviewWords: ["mat", "bat", "cat", "fan", "got", "hat", "jam", "kit", "let", "van", "sit", "top"],
    newWords: ["up", "us", "but", "cup", "wet", "win"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for", "help", "my", "all", "saw"],
    storyName: "Lion and the Mouse",
    storyPart: 1,
    focus: "NEW STORY! Add U and W - 22 letters!"
  },
  {
    lessonNum: 17,
    title: "The Mouse's Mistake",
    newLetters: [
      { letter: "Q", sound: "/kw/", example: "queen", emoji: "👸", words: "quit, quiz" },
      { letter: "X", sound: "/ks/", example: "box", emoji: "📦", words: "box, fox, mix" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "V", "W", "Q", "X"],
    reviewWords: ["mat", "bat", "fan", "got", "jam", "let", "up", "cup", "wet", "sit", "top", "van"],
    newWords: ["box", "fox", "mix", "fix"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for", "help", "my", "all", "saw", "can"],
    storyName: "Lion and the Mouse",
    storyPart: 2,
    focus: "Mouse wakes lion! Add Q and X - 24 letters!"
  },
  {
    lessonNum: 18,
    title: "Lion Shows Mercy",
    newLetters: [
      { letter: "Y", sound: "/y/", example: "yes", emoji: "✅", words: "yes, yam, yet" },
      { letter: "Z", sound: "/z/", example: "zebra", emoji: "🦓", words: "zip, zap, zoo" }
    ],
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "V", "W", "Q", "X", "Y", "Z"],
    reviewWords: ["mat", "fan", "jam", "up", "wet", "box", "fox", "sit", "top", "van", "let", "got"],
    newWords: ["yes", "yet", "zip", "zap"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for", "help", "my", "all", "saw", "can", "will"],
    storyName: "Lion and the Mouse",
    storyPart: 3,
    focus: "COMPLETE ALPHABET! Add Y and Z - 26 letters! 🎊"
  },
  {
    lessonNum: 19,
    title: "Lion in Trouble",
    newLetters: null,
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "V", "W", "Q", "X", "Y", "Z"],
    reviewWords: ["all 26 letters - practice any CVC words"],
    wordFamilies: ["-at family: mat, bat, cat, sat, rat, fat, hat", "-it family: sit, pit, fit, bit, hit, kit", "-op family: top, pop, cop, mop, hop"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for", "help", "my", "all", "saw", "can", "will", "has"],
    storyName: "Lion and the Mouse",
    storyPart: 4,
    focus: "Review ALL 26 letters! Lion trapped!"
  },
  {
    lessonNum: 20,
    title: "Mouse Saves the Day",
    newLetters: null,
    allLearnedLetters: ["A", "M", "T", "S", "I", "P", "N", "R", "O", "E", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "V", "W", "Q", "X", "Y", "Z"],
    reviewWords: ["Complete alphabet mastery check"],
    allSightWords: ["the", "and", "to", "I", "you", "it", "in", "was", "said", "he", "for", "help", "my", "all", "saw", "can", "will", "has", "from"],
    storyName: "Lion and the Mouse",
    storyPart: 5,
    focus: "ALPHABET MASTERY! Story ends! Moral lesson!",
    isFinal: true,
    isMastery: true
  }
];

function generateSpiralLesson(lessonData) {
  const pages = [];
  
  // Title Page
  const storyInfo = lessonData.storyName ? ` - ${lessonData.storyName}` : '';
  pages.push({
    render: () => `
      <div class="lesson-page-card title-page">
        <div class="character">${lessonData.storyName === "The Gingerbread Man" ? "🍪" : "🦁"}</div>
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
        <h2>🔄 Review ALL Our Letters!</h2>
        <p style="font-size: 18px; margin: 15px 0; color: #666;">
          Let's practice every letter we know:
        </p>
        <div style="font-size: 48px; margin: 30px 0; letter-spacing: 10px; line-height: 1.8; word-wrap: break-word;">
          ${lessonData.allLearnedLetters.join(' ')}
        </div>
        <p style="font-size: 20px; margin: 20px 0; color: #5B7C99;">
          <strong>WOW! ${lessonData.allLearnedLetters.length} letters in our toolkit!</strong>
        </p>
        ${lessonData.allLearnedLetters.length === 26 ? `
          <p style="font-size: 24px; margin: 20px 0; color: #E5A8A8;">
            🎊 <strong>COMPLETE ALPHABET!</strong> 🎊
          </p>
        ` : ''}
      </div>
    `
  });

  // REVIEW WORDS
  if (lessonData.reviewWords && Array.isArray(lessonData.reviewWords) && lessonData.reviewWords.length > 0) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>📖 Words We Can Read!</h2>
          <p style="font-size: 18px; margin: 15px 0;">
            Practice these words until automatic:
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 500px; margin: 30px auto;">
            ${lessonData.reviewWords.slice(0, 12).map(word => `
              <div style="padding: 15px; background: #F5F9FF; border-radius: 8px; font-size: 22px; font-weight: bold; color: #5B7C99;">
                ${word}
              </div>
            `).join('')}
          </div>
        </div>
      `
    });
  }

  // NEW LETTERS
  if (lessonData.newLetters && lessonData.newLetters.length > 0) {
    lessonData.newLetters.forEach((letterData, idx) => {
      const colors = ['#D4A68F', '#9BC5DB', '#E5A8A8', '#A3C99C'];
      const colorIndex = (lessonData.lessonNum + idx) % colors.length;
      
      pages.push({
        render: () => `
          <div class="lesson-page-card content-page">
            <h2>🌟 NEW Letter: ${letterData.letter}</h2>
            <div style="font-size: 96px; margin: 20px 0; color: ${colors[colorIndex]};">
              ${letterData.letter} ${letterData.letter.toLowerCase()}
            </div>
            <p style="font-size: 24px; margin: 20px 0;">
              <strong>${letterData.letter} says "${letterData.sound}"</strong>
            </p>
            <div style="font-size: 48px; margin: 20px 0;">${letterData.emoji}</div>
            <p style="font-size: 20px;">
              Like in: <strong style="color: ${colors[colorIndex]};">${letterData.example}</strong>
            </p>
            <p style="font-size: 18px; color: #666; margin-top: 20px;">
              Words: <strong>${letterData.words}</strong>
            </p>
          </div>
        `
      });
    });
  }

  // NEW WORDS
  if (lessonData.newWords && lessonData.newWords.length > 0) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>✨ New Words Today!</h2>
          <p style="font-size: 18px; margin: 15px 0;">
            With our new letters, we can read:
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 500px; margin: 30px auto;">
            ${lessonData.newWords.map(word => `
              <div style="padding: 15px; background: #FFF5F5; border-radius: 8px; font-size: 22px; font-weight: bold; color: #E5A8A8;">
                ${word}
              </div>
            `).join('')}
          </div>
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
            Words that rhyme and look similar:
          </p>
          ${lessonData.wordFamilies.map(family => `
            <div style="margin: 25px 0; padding: 20px; background: #F9FFF5; border-radius: 12px;">
              <p style="font-size: 20px; color: #A3C99C; font-weight: bold;">
                ${family}
              </p>
            </div>
          `).join('')}
        </div>
      `
    });
  }

  // CUMULATIVE SIGHT WORDS
  if (lessonData.allSightWords && lessonData.allSightWords.length > 0) {
    pages.push({
      render: () => `
        <div class="lesson-page-card content-page">
          <h2>👁️ ALL Our Sight Words</h2>
          <p style="font-size: 18px; margin: 15px 0;">
            Practice reading these instantly:
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin: 30px 0;">
            ${lessonData.allSightWords.map((word, idx) => {
              const isNew = idx >= lessonData.allSightWords.length - 2;
              return `
              <div style="padding: 15px 25px; background: ${isNew ? '#FFF5F5' : '#F5F9FF'}; border-radius: 12px; font-size: ${isNew ? '24px' : '20px'}; font-weight: bold; color: #5B7C99; ${isNew ? 'border: 2px solid #E5A8A8;' : ''}">
                ${word}
              </div>
            `}).join('')}
          </div>
          <p style="font-size: 16px; margin-top: 20px; color: #666;">
            📚 ${lessonData.allSightWords.length} sight words total!
          </p>
        </div>
      `
    });
  }

  // STORY TIME PLACEHOLDER (needs actual book data)
  pages.push({
    render: (progress, markComplete) => {
      return `
        <div class="lesson-page-card activity-section">
          <h2>📖 Story Time</h2>
          <p style="font-size: 18px; margin-bottom: 15px;">
            ${lessonData.isFinal ? 'Finish' : 'Read'} <strong>"${lessonData.storyName}"</strong> Part ${lessonData.storyPart}
          </p>
          <div style="padding: 40px 20px; background: #F5F9FF; border-radius: 12px; text-align: center;">
            <p style="font-size: 20px; color: #5B7C99;">📚</p>
            <p style="font-size: 18px; margin-top: 15px;">
              Story text will be added here<br>
              <span style="font-size: 14px; color: #666;">(Decodable reader coming soon!)</span>
            </p>
          </div>
          ${progress.story_completed ? '<div class="completion-badge" style="margin-top: 20px;">✅ Story Complete!</div>' : ''}
          <button onclick="window.lessonMarkComplete('story')" style="margin-top: 20px; padding: 12px 24px; background: #5B7C99; color: white; border: none; border-radius: 8px; cursor: pointer;">
            Mark Story Complete
          </button>
        </div>
      `;
    }
  });

  // PRACTICE GAME
  const activityName = lessonData.isMastery ? 'mastery' : 'practice';
  pages.push({
    render: (progress, markComplete) => {
      return `
        <div class="lesson-page-card activity-section">
          <h2>${lessonData.isMastery ? '📊 ALPHABET MASTERY!' : '✏️ Practice Letters'}</h2>
          <p>${lessonData.isMastery ? 'Show you know ALL 26 letters!' : 'Match letters to sounds!'}</p>
          ${progress[activityName + '_completed'] ? '<div class="completion-badge">✅ Complete!</div>' : ''}
          <div id="practice-game" style="margin-top: 20px;"></div>
        </div>
      `;
    },
    onLoad: () => {
      const letters = lessonData.allLearnedLetters.slice(-5);
      const sounds = {
        A: '/a/ like apple 🍎', M: '/m/ like moon 🌙', T: '/t/ like tiger 🐯', 
        S: '/s/ like sun ☀️', I: '/i/ like igloo 🧊', P: '/p/ like pig 🐷',
        N: '/n/ like nest 🪺', R: '/r/ like rabbit 🐰', O: '/o/ like octopus 🐙', 
        E: '/e/ like egg 🥚', B: '/b/ like ball ⚽', C: '/c/ like cat 🐱',
        D: '/d/ like dog 🐕', F: '/f/ like fish 🐟', G: '/g/ like goat 🐐',
        H: '/h/ like hat 🎩', J: '/j/ like jam 🍓', K: '/k/ like kite 🪁',
        L: '/l/ like lion 🦁', V: '/v/ like van 🚐', U: '/u/ like umbrella ☂️',
        W: '/w/ like web 🕸️', Q: '/kw/ like queen 👸', X: '/ks/ like box 📦',
        Y: '/y/ like yes ✅', Z: '/z/ like zebra 🦓'
      };
      const pairs = letters.map(l => `{term: "${l}", match: "Says ${sounds[l]}"}`);
      
      return `
        new FlashcardGame('practice-game', {
          title: "${lessonData.isMastery ? 'FINAL ALPHABET CHECK' : 'Letter Sounds'}",
          subtitle: "Match letters to sounds!",
          pairs: [${pairs.join(', ')}]
        }, () => {
          window.lessonMarkComplete('${activityName}');
        });
      `;
    }
  });

  // COMPLETION PAGE
  pages.push({
    render: (progress) => {
      const allComplete = progress.story_completed && progress[activityName + '_completed'];
      return `
        <div class="lesson-page-card title-page">
          <div class="character">${lessonData.isMastery ? '🏆' : lessonData.isFinal ? '🎊' : '🎉'}</div>
          <h1>${lessonData.isMastery ? 'ALPHABET MASTER!' : 'Awesome Work!'}</h1>
          <div class="subtitle">Lesson ${lessonData.lessonNum} Complete!</div>
          
          ${allComplete ? `
            <div class="completion-badge" style="margin: 30px auto;">
              ✅ 100% Complete!
            </div>
            <div style="max-width: 400px; margin: 20px auto; text-align: left;">
              <p style="margin: 10px 0; font-size: 18px;">
                📚 <strong>${lessonData.allLearnedLetters.length} letters</strong> mastered!
              </p>
              <p style="margin: 10px 0; font-size: 18px;">
                👁️ <strong>${lessonData.allSightWords.length} sight words</strong> you know!
              </p>
              ${lessonData.allLearnedLetters.length === 26 ? `
                <p style="margin: 20px 0; font-size: 20px; color: #E5A8A8;">
                  🎊 <strong>COMPLETE ALPHABET!</strong> 🎊<br>
                  You can now read THOUSANDS of words!
                </p>
              ` : ''}
            </div>
          ` : `
            <p style="color: #E88D8D; margin-top: 20px;">
              Complete all activities!
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
  console.log(`✅ Lesson ${lessonData.lessonNum}: ${lessonData.title} (${lessonData.allLearnedLetters.length} letters)`);
});

console.log('\n🎉 Lessons 11-20 created with spiral learning!');
console.log('\n📊 MILESTONE ACHIEVED:');
console.log('✅ Lesson 15: 20 letters (B, C, D, F, G, H, J, K, L, V added)');
console.log('✅ Lesson 18: COMPLETE ALPHABET! (U, W, Q, X, Y, Z added)');
console.log('✅ Lesson 20: ALPHABET MASTERY CHECK');
console.log('\n📖 Stories:');
console.log('   Lessons 11-15: The Gingerbread Man');
console.log('   Lessons 16-20: Lion and the Mouse');
console.log('\n🎊 By Lesson 20, students can decode ANY CVC word!');
