const fs = require('fs');

console.log('📚 Embedding Wizard of Oz chapters into digital book reader...\n');
console.log('  ✅ Adapted 4th grade chapters');
console.log('  ✅ Jes\'s vocabulary guide');
console.log('  ✅ Jes\'s comprehension questions');
console.log('  ✅ Beautiful page-turning book widget\n');

// Load adapted chapters
const chapters = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-4th-chapters.json', 'utf8'));

// Parse Jes's vocabulary guide
const vocabText = fs.readFileSync('./book-data/wizard-of-oz-vocabulary.txt', 'utf8');
const vocabByChapter = {};

const vocabChapterRegex = /Chapter (\d+):[^\n]+\n\n([^]+?)(?=\nChapter \d+:|$)/g;
let vocabMatch;
while ((vocabMatch = vocabChapterRegex.exec(vocabText)) !== null) {
  const chapterNum = parseInt(vocabMatch[1]);
  const content = vocabMatch[2].trim();
  
  // Parse individual words
  const wordRegex = /^(\w+)\s+\(([^)]+)\)\n\n([^\n]+)\n\nFrom the story: ([^\n]+)\n\nThink about it: ([^\n]+)/gm;
  const words = [];
  let wordMatch;
  while ((wordMatch = wordRegex.exec(content)) !== null) {
    words.push({
      word: wordMatch[1],
      partOfSpeech: wordMatch[2],
      definition: wordMatch[3],
      example: wordMatch[4],
      discussion: wordMatch[5]
    });
  }
  
  if (words.length === 2) {
    vocabByChapter[chapterNum] = words;
  }
}

// Parse Jes's comprehension questions
const compText = fs.readFileSync('./book-data/wizard-of-oz-comprehension.txt', 'utf8');
const compByChapter = {};

const compChapterRegex = /Chapter (\d+):[^\n]+\n\n1\. (.+?)\n\n([A-D]\).+?\n\n[A-D]\).+?\n\n[A-D]\).+?\n\n[A-D]\).+?)\n\n2\. (.+?)(?:\n\nHint: (.+?))?\n\n(?:\[Your answer\]|\n\nChapter)/gs;
let compMatch;
while ((compMatch = compChapterRegex.exec(compText)) !== null) {
  const chapterNum = parseInt(compMatch[1]);
  const mcQuestion = compMatch[2].trim();
  const mcChoicesBlock = compMatch[3].trim();
  const shortQuestion = compMatch[4].trim();
  const hint = compMatch[5] ? compMatch[5].trim() : null;
  
  const choices = [];
  const choiceRegex = /([A-D])\)\s*(.+?)(?=\n\n[A-D]\)|$)/gs;
  let choiceMatch;
  while ((choiceMatch = choiceRegex.exec(mcChoicesBlock)) !== null) {
    choices.push({
      letter: choiceMatch[1],
      text: choiceMatch[2].trim()
    });
  }
  
  compByChapter[chapterNum] = {
    mc: { question: mcQuestion, choices },
    short: { question: shortQuestion, hint }
  };
}

console.log(`📚 Loaded ${chapters.length} adapted chapters`);
console.log(`📝 Loaded vocabulary for ${Object.keys(vocabByChapter).length} chapters`);
console.log(`❓ Loaded comprehension for ${Object.keys(compByChapter).length} chapters\n`);

// Assessment days (every 5th day)
const assessmentDays = [5, 10, 15, 20, 25, 30];

// Helper: Split chapter into book pages (300-400 words per page)
function splitIntoBookPages(text) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  const pages = [];
  let currentPage = '';
  let wordCount = 0;
  
  for (const para of paragraphs) {
    const paraWords = para.split(/\s+/).length;
    if (wordCount + paraWords > 400 && currentPage) {
      pages.push(currentPage.trim());
      currentPage = para;
      wordCount = paraWords;
    } else {
      currentPage += (currentPage ? '\n\n' : '') + para;
      wordCount += paraWords;
    }
  }
  
  if (currentPage.trim()) {
    pages.push(currentPage.trim());
  }
  
  return pages;
}

function generateRegularLesson(day) {
  const chapterIndex = Math.floor((day - 1) / 1.25); // 24 chapters over 30 days
  const chapter = chapters[Math.min(chapterIndex, chapters.length - 1)];
  const chapterNum = chapter.chapter;
  const week = Math.ceil(day / 5);
  
  const vocab = vocabByChapter[chapterNum] || [
    { word: 'word1', definition: 'Definition 1', example: 'Example 1', discussion: 'Think about it' },
    { word: 'word2', definition: 'Definition 2', example: 'Example 2', discussion: 'Think about it' }
  ];
  
  const comp = compByChapter[chapterNum] || {
    mc: { question: 'Question?', choices: [{letter: 'A', text: 'Choice A'}, {letter: 'B', text: 'Choice B'}, {letter: 'C', text: 'Choice C'}, {letter: 'D', text: 'Choice D'}] },
    short: { question: 'Short answer question?', hint: null }
  };
  
  // Split chapter into pages for digital book
  const bookPages = splitIntoBookPages(chapter.content);
  const vocabWords = vocab.map(v => v.word);
  
  const isOddDay = day % 2 === 1;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container"></div>

    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="js/digital-book.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>
    
    <script>
        const lesson${day}Config = {
            lessonId: '4th-grade-day-${day}',
            gradeLevel: '4th-grade',
            title: 'Day ${day} - Wizard of Oz',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Day ${day}</h1>
                            <div class="subtitle">4th Grade ELA • Week ${week}</div>
                            <p style="color: #1B2A4A; font-size: 20px; margin-top: 20px;">
                                The Wonderful Wizard of Oz
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Chapter ${chapterNum}: ${chapter.title}
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Objectives
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Day ${day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Learn 2 new vocabulary words</li>
                                <li>Read <strong>${chapter.title}</strong> in our digital book</li>
                                <li>Answer 2 comprehension questions</li>
                                <li>Practice ${isOddDay ? 'grammar' : 'language'} skills</li>
                                <li>Complete a writing task</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Vocabulary Words</h2>
                            
                            <div style="margin: 30px 0;">
                                <div style="padding: 25px; background: white; border-radius: 12px; border: 2px solid #1B2A4A; margin-bottom: 20px;">
                                    <div style="margin-bottom: 10px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab[0].word}</span>
                                        <span style="font-size: 14px; color: #666; margin-left: 10px;">(${vocab[0].partOfSpeech})</span>
                                    </div>
                                    <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">${vocab[0].definition}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 8px;"><strong>From the story:</strong> ${vocab[0].example}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 15px;"><strong>Think about it:</strong> ${vocab[0].discussion}</p>
                                    <textarea id="vocab-1" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 1.6; resize: vertical; min-height: 100px;" placeholder="Write a sentence using this word..."></textarea>
                                </div>
                                
                                <div style="padding: 25px; background: white; border-radius: 12px; border: 2px solid #1B2A4A;">
                                    <div style="margin-bottom: 10px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab[1].word}</span>
                                        <span style="font-size: 14px; color: #666; margin-left: 10px;">(${vocab[1].partOfSpeech})</span>
                                    </div>
                                    <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">${vocab[1].definition}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 8px;"><strong>From the story:</strong> ${vocab[1].example}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 15px;"><strong>Think about it:</strong> ${vocab[1].discussion}</p>
                                    <textarea id="vocab-2" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 1.6; resize: vertical; min-height: 100px;" placeholder="Write a sentence using this word..."></textarea>
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 4: Digital Book Reader
                {
                    render: () => {
                        setTimeout(() => {
                            if (!window.day${day}BookInitialized) {
                                const bookConfig = {
                                    coverTitle: "Chapter ${chapterNum}",
                                    coverSubtitle: "${chapter.title}",
                                    coverAuthor: "L. Frank Baum (adapted for 4th grade)",
                                    coverColor: "#1B2A4A",
                                    vocabWords: ${JSON.stringify(vocabWords)},
                                    pages: ${JSON.stringify(bookPages.map(text => ({ text })))}
                                };
                                window.digitalBookInstance = new DigitalBook('digital-book-day-${day}', bookConfig);
                                window.day${day}BookInitialized = true;
                            }
                        }, 100);
                        
                        return \`
                            <div class="lesson-page-card content-page">
                                <h2>📖 Chapter ${chapterNum}: ${chapter.title}</h2>
                                <p style="margin: 10px 0 20px; color: #666;">Click the arrows to turn pages. Vocabulary words are highlighted in yellow!</p>
                                <div id="digital-book-day-${day}"></div>
                            </div>
                        \`;
                    }
                },
                
                // Page 5: Comprehension - Multiple Choice
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>💭 Reading Comprehension</h2>
                            <div style="margin: 20px 0;">
                                <p style="font-weight: 600; margin-bottom: 15px;">1. ${comp.mc.question}</p>
                                <div>
                                    ${comp.mc.choices.map(choice => 
                                        '<label style="display: block; margin: 10px 0; padding: 12px; background: white; border: 2px solid #ddd; border-radius: 8px; cursor: pointer;">' +
                                            '<input type="radio" name="mc-q1" value="' + choice.letter + '" style="margin-right: 10px;">' +
                                            '<strong>' + choice.letter + ')</strong> ' + choice.text +
                                        '</label>'
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 6: Comprehension - Short Answer
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>💭 Short Answer</h2>
                            <div style="margin: 20px 0;">
                                <p style="font-weight: 600; margin-bottom: 15px;">2. ${comp.short.question}</p>
                                ${comp.short.hint ? '<p style="font-size: 14px; color: #666; margin-bottom: 15px;"><strong>Hint:</strong> ' + comp.short.hint + '</p>' : ''}
                                <textarea id="comp-short" style="width: 100%; padding: 12px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 1.6; resize: vertical; min-height: 120px;" placeholder="Write your answer here..."></textarea>
                            </div>
                        </div>
                    \`
                },
                
                // Page 7: Grammar/Language (placeholder)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✏️ ${isOddDay ? 'Grammar Practice' : 'Language Skills'}</h2>
                            <p>Practice ${isOddDay ? 'sentence structure and grammar' : 'vocabulary and language concepts'}.</p>
                            <div style="margin: 20px 0; padding: 20px; background: #f9f9f9; border-radius: 8px;">
                                <p><em>Practice exercises will be added here.</em></p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 8: Writing
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Writing Time</h2>
                            <p style="margin-bottom: 15px;">${isOddDay ? 'Write a paragraph about what you read today. Use at least one vocabulary word.' : 'Write a journal entry about what happened in today\'s chapter. How would you feel if you were Dorothy?'}</p>
                            <textarea id="writing" style="width: 100%; padding: 12px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 1.6; resize: vertical; min-height: 150px;" placeholder="Start writing..."></textarea>
                        </div>
                    \`
                },
                
                // Page 9: Completion
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h2 style="color: #305853; font-size: 36px; margin-bottom: 20px;">Great Job! 🎉</h2>
                            <p style="font-size: 18px; color: #666;">You've completed Day ${day}!</p>
                            <p style="font-size: 16px; color: #666; margin-top: 15px;">Click "Finish Lesson" to save your progress.</p>
                        </div>
                    \`
                }
            ]
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;
}

// Generate assessment lessons (same as before, no changes needed)
function generateAssessmentLesson(day) {
  const week = Math.ceil(day / 5);
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} Assessment - 4th Grade</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
</head>
<body class="lesson-viewer">
    <div id="lesson-container"></div>
    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>
    <script>
        const lesson${day}Config = {
            lessonId: '4th-grade-day-${day}',
            gradeLevel: '4th-grade',
            title: 'Day ${day} - Week ${week} Assessment',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Week ${week} Assessment</h1>
                            <p style="font-size: 18px; margin-top: 20px;">Show what you've learned this week!</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎯 Assessment Complete!</h2>
                            <p>Great work this week! You're ready for the next chapter.</p>
                        </div>
                    \`
                }
            ]
        };
        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;
}

// Generate all 30 days
console.log('🔨 Generating Days 1-30 with digital books...\n');

for (let day = 1; day <= 30; day++) {
  const filename = `4th-grade-day-${String(day).padStart(3, '0')}.html`;
  const content = assessmentDays.includes(day) 
    ? generateAssessmentLesson(day)
    : generateRegularLesson(day);
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`✅ Day ${day} ${assessmentDays.includes(day) ? '(ASSESSMENT)' : ''}`);
}

console.log(`\n🎉 All 30 Wizard of Oz lessons generated with digital books!`);
console.log(`\n📝 Summary:`);
console.log(`  • Adapted 4th grade chapters embedded`);
console.log(`  • Jes's vocabulary with examples & discussion`);
console.log(`  • Jes's comprehension (MC + short answer)`);
console.log(`  • Beautiful page-turning digital book widget`);
console.log(`  • Automatic vocabulary highlighting`);
console.log(`\n🚀 Push to GitHub and test!`);
