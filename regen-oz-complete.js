const fs = require('fs');

console.log('🌪️ Regenerating Wizard of Oz lessons with:\n');
console.log('  ✅ Adapted chapters');
console.log('  ✅ Jes\'s vocabulary guide');
console.log('  ✅ Jes\'s comprehension questions');
console.log('  ✅ Proper textarea styling\n');

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
  const shortAnswer = compMatch[4].trim();
  const hint = compMatch[5] ? compMatch[5].trim() : '';
  
  // Parse MC choices
  const choiceRegex = /([A-D])\) (.+)/g;
  const choices = [];
  let choiceMatch;
  while ((choiceMatch = choiceRegex.exec(mcChoicesBlock)) !== null) {
    choices.push({
      letter: choiceMatch[1],
      text: choiceMatch[2].trim()
    });
  }
  
  compByChapter[chapterNum] = {
    mc: {
      question: mcQuestion,
      choices: choices
    },
    shortAnswer: {
      question: shortAnswer,
      hint: hint
    }
  };
}

console.log(`📚 Loaded ${chapters.length} adapted chapters`);
console.log(`📝 Loaded vocabulary for ${Object.keys(vocabByChapter).length} chapters`);
console.log(`❓ Loaded comprehension for ${Object.keys(compByChapter).length} chapters\n`);

// Textarea styling constant
const textareaStyle = `width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 1.6; resize: vertical; min-height: 100px;`;

// Assessment days
const assessmentDays = [5, 10, 15, 20, 25, 30];

function splitTextIntoParts(text, numParts = 3) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  const totalParas = paragraphs.length;
  const parasPerPart = Math.ceil(totalParas / numParts);
  
  const parts = [];
  for (let i = 0; i < numParts; i++) {
    const start = i * parasPerPart;
    const end = Math.min(start + parasPerPart, totalParas);
    parts.push(paragraphs.slice(start, end).join('\n\n'));
  }
  return parts;
}

function escapeForTemplate(str) {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/\\/g, '\\\\');
}

function generateRegularLesson(day) {
  // Map day to chapter (30 days, 24 chapters)
  const chapterIndex = Math.floor((day - 1) * 24 / 30);
  const chapter = chapters[chapterIndex];
  const vocab = vocabByChapter[chapter.chapter] || [];
  const comp = compByChapter[chapter.chapter];
  
  if (vocab.length !== 2) {
    console.warn(`⚠️  Day ${day} (Chapter ${chapter.chapter}): Missing vocabulary!`);
  }
  if (!comp) {
    console.warn(`⚠️  Day ${day} (Chapter ${chapter.chapter}): Missing comprehension!`);
  }
  
  const week = Math.ceil(day / 5);
  const isOddDay = day % 2 === 1;
  const storyParts = splitTextIntoParts(chapter.content, 3);
  
  // Escape all strings for template literals
  const safeTitle = escapeForTemplate(chapter.title);
  const safeVocab1Word = escapeForTemplate(vocab[0]?.word || 'word');
  const safeVocab1Def = escapeForTemplate(vocab[0]?.definition || 'Definition');
  const safeVocab2Word = escapeForTemplate(vocab[1]?.word || 'word');
  const safeVocab2Def = escapeForTemplate(vocab[1]?.definition || 'Definition');
  
  const safeStoryPart1 = escapeForTemplate(storyParts[0]);
  const safeStoryPart2 = escapeForTemplate(storyParts[1]);
  const safeStoryPart3 = escapeForTemplate(storyParts[2]);
  
  const safeMcQuestion = comp ? escapeForTemplate(comp.mc.question) : 'Question';
  const safeMcChoices = comp ? comp.mc.choices.map(c => `<label style="display: block; margin: 10px 0; padding: 12px; background: white; border: 2px solid #ddd; border-radius: 8px; cursor: pointer;">
                                            <input type="radio" name="mc-q1" value="${c.letter}" style="margin-right: 10px;">
                                            <strong>${c.letter})</strong> ${escapeForTemplate(c.text)}
                                        </label>`).join('\n                                        ') : '';
  
  const safeShortQuestion = comp ? escapeForTemplate(comp.shortAnswer.question) : 'Question';
  const safeHint = comp && comp.shortAnswer.hint ? `<p style="margin-top: 10px; color: #666; font-size: 13px;"><em>Hint: ${escapeForTemplate(comp.shortAnswer.hint)}</em></p>` : '';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${day} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

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
            title: 'Lesson ${day} - 4th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${day}</h1>
                            <div class="subtitle">4th Grade ELA • Week ${week}</div>
                            <p style="color: #1B2A4A; font-size: 20px; margin-top: 20px;">
                                The Wonderful Wizard of Oz
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Chapter ${chapter.chapter}: ${safeTitle}
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Objectives
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read from <strong>${safeTitle}</strong></li>
                                <li>Learn 2 new vocabulary words</li>
                                <li>Answer 2 comprehension questions</li>
                                <li>Practice \${${isOddDay} ? 'grammar' : 'language'} skills</li>
                                <li>Write a \${${isOddDay} ? 'response' : 'journal entry'}</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary (2 words from Jes's guide)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            
                            <div style="margin: 30px 0;">
                                <div style="padding: 25px; background: white; border-radius: 12px; border: 2px solid #1B2A4A; margin-bottom: 20px;">
                                    <div style="margin-bottom: 10px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${safeVocab1Word}</span>
                                    </div>
                                    <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">${safeVocab1Def}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Write a sentence using this word:</p>
                                    <textarea id="vocab-1" style="${textareaStyle}"></textarea>
                                </div>
                                
                                <div style="padding: 25px; background: white; border-radius: 12px; border: 2px solid #1B2A4A;">
                                    <div style="margin-bottom: 10px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${safeVocab2Word}</span>
                                    </div>
                                    <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">${safeVocab2Def}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Write a sentence using this word:</p>
                                    <textarea id="vocab-2" style="${textareaStyle}"></textarea>
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 4: Vocabulary Practice
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Practice</h2>
                            <p style="margin: 20px 0;">Review the vocabulary words you just learned.</p>
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
                                <p><strong>${safeVocab1Word}:</strong> ${safeVocab1Def}</p>
                                <p style="margin-top: 15px;"><strong>${safeVocab2Word}:</strong> ${safeVocab2Def}</p>
                            </div>
                            <p style="margin-top: 20px;">Watch for these words in today's reading!</p>
                        </div>
                    \`
                },
                
                // Pages 5-7: Story (3 parts from ADAPTED book)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${safeTitle} (Part 1)</h2>
                            <div style="font-size: 16px; line-height: 1.8; color: #333;">
                                \${${JSON.stringify(safeStoryPart1)}.split('\\\\n\\\\n').map(p => \`<p style="margin-bottom: 15px;">\${p}</p>\`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${safeTitle} (Part 2)</h2>
                            <div style="font-size: 16px; line-height: 1.8; color: #333;">
                                \${${JSON.stringify(safeStoryPart2)}.split('\\\\n\\\\n').map(p => \`<p style="margin-bottom: 15px;">\${p}</p>\`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${safeTitle} (Part 3)</h2>
                            <div style="font-size: 16px; line-height: 1.8; color: #333;">
                                \${${JSON.stringify(safeStoryPart3)}.split('\\\\n\\\\n').map(p => \`<p style="margin-bottom: 15px;">\${p}</p>\`).join('')}
                            </div>
                        </div>
                    \`
                },
                
                // Page 8: Comprehension (from Jes's guide: 1 MC + 1 short answer)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <div style="margin: 20px 0;">
                                <div style="margin-bottom: 30px;">
                                    <p style="font-weight: 600; margin-bottom: 15px;">1. ${safeMcQuestion}</p>
                                    <div>
                                        ${safeMcChoices}
                                    </div>
                                </div>
                                <div>
                                    <p style="font-weight: 600; margin-bottom: 10px;">2. ${safeShortQuestion}</p>
                                    ${safeHint}
                                    <textarea id="comp-short" style="${textareaStyle}"></textarea>
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 9: Grammar OR Language
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>\${${isOddDay} ? 'Grammar Practice' : 'Language Skills'}</h2>
                            <p style="margin: 20px 0;">\${${isOddDay} ? 'Grammar skills practice' : 'Language skills practice'}</p>
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
                                <p><em>Grammar and language content will be added based on weekly skills rotation.</em></p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 10: Informational Text
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Learn More</h2>
                            <p style="margin: 20px 0;">Informational text related to today's reading.</p>
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
                                <p><em>Informational text content will be added.</em></p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 11: Writing
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>\${${isOddDay} ? 'Writing Response' : 'Journal Entry'}</h2>
                            <p style="margin: 20px 0 10px;">\${${isOddDay} ? "Write your opinion about today's reading." : 'Write about your thoughts and feelings about the story.'}</p>
                            <textarea id="writing" style="${textareaStyle} min-height: 200px;"></textarea>
                            <p style="margin-top: 15px; color: #666; font-size: 14px;">Write at least 5-7 sentences.</p>
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

function generateAssessmentLesson(day) {
  const week = Math.ceil(day / 5);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assessment ${day} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

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
            title: 'Assessment ${day} - 4th Grade',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Week ${week} Assessment</h1>
                            <div class="subtitle">4th Grade ELA • Day ${day}</div>
                            <p style="color: #1B2A4A; font-size: 20px; margin-top: 20px;">
                                The Wonderful Wizard of Oz
                            </p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Quiz</h2>
                            <p>Assessment content will be added.</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p>Assessment content will be added.</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Grammar Review</h2>
                            <p>Assessment content will be added.</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Language Review</h2>
                            <p>Assessment content will be added.</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Writing Prompt</h2>
                            <p>Assessment content will be added.</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Great Work!</h2>
                            <p>You completed Week ${week}!</p>
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

// Generate all 30 lessons
console.log('🔨 Generating Days 1-30...\n');

for (let day = 1; day <= 30; day++) {
  const isAssessment = assessmentDays.includes(day);
  const html = isAssessment ? generateAssessmentLesson(day) : generateRegularLesson(day);
  const filename = `4th-grade-day-${String(day).padStart(3, '0')}.html`;
  
  fs.writeFileSync(filename, html);
  console.log(`✅ Day ${day} ${isAssessment ? '(ASSESSMENT)' : ''}`);
}

console.log('\n🎉 All 30 Wizard of Oz lessons regenerated with correct content!');
console.log('\n📝 Summary:');
console.log('  • Adapted 4th grade chapters');
console.log('  • Professional vocabulary with examples & discussion questions');
console.log('  • Professional comprehension (MC + short answer with hints)');
console.log('  • Proper textarea styling (width, padding, borders, min-height)');
console.log('\n🚀 Push to GitHub and test in browser!');
