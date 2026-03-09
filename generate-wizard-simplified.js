const fs = require('fs');

const chapters = JSON.parse(fs.readFileSync('wizard-chapters.json', 'utf8'));
const vocab = JSON.parse(fs.readFileSync('oz-vocab.json', 'utf8'));
const questions = JSON.parse(fs.readFileSync('oz-questions.json', 'utf8'));

chapters.forEach((chapter, idx) => {
  const dayNum = chapter.number;
  const filename = `4th-grade-day-${String(dayNum).padStart(3, '0')}.html`;
  const chapterVocab = vocab[idx];
  const chapterQuestions = questions[idx];
  
  console.log(`Generating ${filename}: ${chapter.title}...`);
  
  // Split chapter into 4 reading pages
  const words = chapter.content.split(' ');
  const wordsPerPage = Math.ceil(words.length / 4);
  const pages = [
    words.slice(0, wordsPerPage).join(' '),
    words.slice(wordsPerPage, wordsPerPage * 2).join(' '),
    words.slice(wordsPerPage * 2, wordsPerPage * 3).join(' '),
    words.slice(wordsPerPage * 3).join(' ')
  ];
  
  // Use only first vocab word and MC question
  const vocabWord = chapterVocab.words[0];
  const mcQ = chapterQuestions.questions[0];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${dayNum} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/billy-tts.js"></script>
    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>
    <script src="js/save-button-injector.js?v=1772665488"></script>
    <script src="js/answer-validation.js?v=1772665488"></script>
    <script src="js/grade-normalizer.js?v=1772665488"></script>
    <script src="js/offline-sync.js?v=1772665488"></script>
    <script src="js/text-to-speech.js?v=1772665488"></script>
    <script src="js/digital-book.js?v=1772665488"></script>
    
    <script>
        const lesson${dayNum}Config = {
            lessonId: '4th-grade-day-${dayNum}',
            gradeLevel: '4th-grade',
            title: 'Lesson ${dayNum} - 4th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${dayNum}</h1>
                            <div class="subtitle">4th Grade ELA</div>
                            <p style="color: #1B2A4A; font-size: 20px; margin-top: 20px;">
                                The Wonderful Wizard of Oz
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Chapter ${dayNum}: ${chapter.title}</p>
                        </div>
                    \`
                },
                
                // Page 2: Objectives
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${dayNum}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read Chapter ${dayNum}: <strong>${chapter.title}</strong></li>
                                <li>Learn 1 new vocabulary word</li>
                                <li>Answer 1 comprehension question</li>
                                <li>Practice critical thinking</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 30-45 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary (1 word)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Word</h2>
                            
                            <div style="margin: 40px 0;">
                                <div style="padding: 30px; background: white; border-radius: 12px; border: 2px solid #1B2A4A;">
                                    <div style="margin-bottom: 15px;">
                                        <span style="font-size: 32px; font-weight: 800; color: #305853;">${vocabWord.word}</span>
                                        <span style="font-size: 16px; color: #666; margin-left: 12px;">(${vocabWord.pos})</span>
                                    </div>
                                    <p style="font-size: 18px; font-weight: 600; margin-bottom: 20px; line-height: 1.6;">${vocabWord.definition}</p>
                                    <p style="font-size: 15px; color: #666; margin-bottom: 12px;">
                                        Write a sentence using this word:
                                    </p>
                                    <textarea 
                                      id="vocab-1"
                                      style="width: 100%; min-height: 100px; padding: 12px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                      placeholder="Type your sentence here..."
                                    ></textarea>
                                </div>
                            </div>
                            
                            <div style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                <p style="margin: 0;"><strong>Watch for this word</strong> in today's reading!</p>
                            </div>
                        </div>
                    \`
                },
                
                // Reading Pages (4 pages)
                ${pages.map((pageContent, pageIdx) => `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading: The Wonderful Wizard of Oz</h2>
                            <h3 style="color: #305853;">Chapter ${dayNum}: ${chapter.title}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Page ${pageIdx + 1} of 4</p>
                            
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;" class="reading-passage">
                                <p>${pageContent.replace(/"/g, '\\"').replace(/`/g, '\\`')}</p>
                            </div>
                        </div>
                    \`
                }`).join(',\n                ')},
                
                // Comprehension: Multiple Choice Only
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            
                            <div style="margin: 40px 0;">
                                <div style="padding: 30px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #1B2A4A;">
                                    <p style="font-weight: 600; font-size: 18px; margin-bottom: 20px; line-height: 1.6;">${mcQ.question.replace(/'/g, "\\'")}</p>
                                    ${mcQ.options.map((opt, oidx) => `
                                    <div style="margin: 15px 0;">
                                        <label style="display: flex; align-items: start; cursor: pointer; padding: 12px; border-radius: 8px; transition: background 0.2s; border: 2px solid transparent;" onmouseover="this.style.background='#f0f0f0'; this.style.borderColor='#305853'" onmouseout="this.style.background='transparent'; this.style.borderColor='transparent'">
                                            <input type="radio" name="mc-q1" value="${oidx}" style="margin-right: 12px; margin-top: 4px;">
                                            <span style="font-size: 16px;">${opt.replace(/'/g, "\\'")}</span>
                                        </label>
                                    </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Completion
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎉 Excellent Work!</h2>
                            <p style="font-size: 18px; margin: 20px 0;">You completed Lesson ${dayNum}: <strong>${chapter.title}</strong></p>
                            
                            <div style="padding: 20px; background: rgba(48,88,83,0.1); border-radius: 12px; margin: 20px 0;">
                                <p style="margin: 0; font-size: 16px;"><strong>Next:</strong> ${dayNum < 24 ? 'Lesson ' + (dayNum + 1) : 'You finished the entire story!'}</p>
                            </div>
                            
                            <div style="padding: 15px; background: #fff; border: 2px solid #B06821; border-radius: 10px; margin-top: 20px;">
                                <p style="margin: 0; color: #B06821; font-weight: 600;">📚 Keep reading!</p>
                            </div>
                        </div>
                    \`
                }
            ]
        };

        // Initialize
        if (window.LessonViewer) {
            new window.LessonViewer(lesson${dayNum}Config);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(filename, html);
});

console.log(`\n✅ Generated ${chapters.length} SIMPLIFIED lessons!`);
console.log('Each lesson: Title + Objectives + 1 Vocab Word + Reading (4 pages) + 1 MC Question + Completion');
