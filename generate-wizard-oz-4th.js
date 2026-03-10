const fs = require('fs');

// Load chapters
const chapters = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-4th-chapters.json', 'utf8'));

// Vocabulary for each day (2 words per day)
const vocabulary = {
  1: [
    { word: 'cyclone', definition: 'A violent rotating windstorm; a tornado.' },
    { word: 'prairie', definition: 'A large, flat area of grassland with few or no trees.' }
  ],
  2: [
    { word: 'munchkin', definition: 'A small person; in the story, the people who live in the land of Oz.' },
    { word: 'sorceress', definition: 'A woman who practices magic or witchcraft.' }
  ],
  3: [
    { word: 'scarecrow', definition: 'A figure made to look like a person, used to frighten birds away from crops.' },
    { word: 'companion', definition: 'A friend or someone who accompanies you on a journey.' }
  ],
  4: [
    { word: 'emerald', definition: 'A bright green precious stone; also the color of the magical city.' },
    { word: 'journey', definition: 'A trip from one place to another, often a long one.' }
  ],
  6: [
    { word: 'rust', definition: 'A reddish-brown coating that forms on iron when it is exposed to water.' },
    { word: 'woodman', definition: 'A person who cuts down trees or works with wood.' }
  ],
  7: [
    { word: 'courage', definition: 'The ability to do something brave even when you are afraid.' },
    { word: 'timid', definition: 'Shy and nervous; lacking confidence.' }
  ],
  8: [
    { word: 'poppy', definition: 'A bright red flower; in the story, poppies that cause sleep.' },
    { word: 'deadly', definition: 'Capable of causing death; very dangerous.' }
  ],
  9: [
    { word: 'guardian', definition: 'A person who protects or watches over something.' },
    { word: 'gate', definition: 'A movable barrier used to close an opening in a wall or fence.' }
  ],
  11: [
    { word: 'spectacles', definition: 'Eyeglasses; glasses worn to help you see better.' },
    { word: 'magnificent', definition: 'Extremely beautiful, impressive, or grand.' }
  ],
  12: [
    { word: 'throne', definition: 'A special chair for a king, queen, or other ruler.' },
    { word: 'commanded', definition: 'Gave an order; told someone to do something with authority.' }
  ],
  13: [
    { word: 'wicked', definition: 'Evil or morally bad.' },
    { word: 'search', definition: 'To look carefully for something or someone.' }
  ],
  14: [
    { word: 'prisoner', definition: 'A person who is kept locked up or held captive.' },
    { word: 'enslaved', definition: 'Made to work for someone without freedom; forced into slavery.' }
  ],
  16: [
    { word: 'captive', definition: 'A person who has been captured and is being held prisoner.' },
    { word: 'rescue', definition: 'To save someone from a dangerous or difficult situation.' }
  ],
  17: [
    { word: 'dissolve', definition: 'To break apart and disappear, especially in liquid.' },
    { word: 'melt', definition: 'To turn from solid to liquid, usually by heating.' }
  ],
  18: [
    { word: 'winged', definition: 'Having wings; able to fly.' },
    { word: 'monkey', definition: 'A primate animal; in the story, magical flying monkeys.' }
  ],
  19: [
    { word: 'humbug', definition: 'A person who pretends to be something they are not; a fake or fraud.' },
    { word: 'terrible', definition: 'Extremely bad or serious; causing fear.' }
  ],
  21: [
    { word: 'balloon', definition: 'A large bag filled with hot air or gas that can float in the sky.' },
    { word: 'ascending', definition: 'Going up; rising or climbing.' }
  ],
  22: [
    { word: 'porcelain', definition: 'A hard, white material used to make delicate dishes and decorations.' },
    { word: 'dainty', definition: 'Small, delicate, and pretty.' }
  ],
  23: [
    { word: 'china', definition: 'Objects made of porcelain; also refers to delicate dishware.' },
    { word: 'fragile', definition: 'Easily broken or damaged; delicate.' }
  ],
  24: [
    { word: 'journey', definition: 'A trip from one place to another.' },
    { word: 'south', definition: 'The direction opposite of north; toward the bottom on most maps.' }
  ],
  26: [
    { word: 'quadling', definition: 'In the story, people who live in the southern part of Oz.' },
    { word: 'country', definition: 'A nation or land; also means the countryside.' }
  ],
  27: [
    { word: 'glinda', definition: 'The name of the Good Witch of the South in the story.' },
    { word: 'grant', definition: 'To give or allow something that is asked for; to fulfill a wish.' }
  ],
  28: [
    { word: 'slippers', definition: 'Soft, comfortable shoes worn indoors; in the story, magical silver shoes.' },
    { word: 'magic', definition: 'Special powers that can make impossible things happen.' }
  ],
  29: [
    { word: 'gratitude', definition: 'A feeling of thankfulness and appreciation.' },
    { word: 'farewell', definition: 'A goodbye; something you say when parting from someone.' }
  ]
};

// Assessment days (every 5th day)
const assessmentDays = [5, 10, 15, 20, 25, 30];

function splitTextIntoParts(text, numParts = 3) {
  const paragraphs = text.split('\n\n');
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

function generateRegularLesson(day) {
  const chapterIndex = Math.floor((day - 1) / 1.25); // Roughly 24 chapters over 30 days (24 regular days)
  const chapter = chapters[chapterIndex] || chapters[chapters.length - 1];
  const week = Math.ceil(day / 5);
  const vocab = vocabulary[day] || [
    { word: 'word', definition: 'Vocabulary word definition' },
    { word: 'word', definition: 'Vocabulary word definition' }
  ];
  
  const storyParts = splitTextIntoParts(chapter.content, 3);
  
  const isOddDay = day % 2 === 1;
  
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
                                Chapter ${chapter.chapter}: ${chapter.title}
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
                                <li>Read from <strong>${chapter.title}</strong></li>
                                <li>Learn 2 new vocabulary words</li>
                                <li>Answer 3 comprehension questions</li>
                                <li>Practice ${isOddDay ? 'grammar' : 'language'} skills</li>
                                <li>Write a ${isOddDay ? 'response' : 'journal entry'}</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary (2 words)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            
                            <div style="margin: 30px 0;">
                                <div style="padding: 25px; background: white; border-radius: 12px; border: 2px solid #1B2A4A; margin-bottom: 20px;">
                                    <div style="margin-bottom: 10px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab[0].word}</span>
                                    </div>
                                    <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">${vocab[0].definition}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Write a sentence using this word:</p>
                                    <textarea id="vocab-1" style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px;"></textarea>
                                </div>
                                
                                <div style="padding: 25px; background: white; border-radius: 12px; border: 2px solid #1B2A4A;">
                                    <div style="margin-bottom: 10px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab[1].word}</span>
                                    </div>
                                    <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">${vocab[1].definition}</p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Write a sentence using this word:</p>
                                    <textarea id="vocab-2" style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px;"></textarea>
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 4: Vocabulary Practice (placeholder)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Practice</h2>
                            <p style="margin: 20px 0;">Review the vocabulary words you just learned.</p>
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
                                <p><strong>${vocab[0].word}:</strong> ${vocab[0].definition}</p>
                                <p style="margin-top: 15px;"><strong>${vocab[1].word}:</strong> ${vocab[1].definition}</p>
                            </div>
                            <p style="margin-top: 20px;">Watch for these words in today's reading!</p>
                        </div>
                    \`
                },
                
                // Pages 5-7: Story (3 parts)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${chapter.title} (Part 1)</h2>
                            <div style="font-size: 16px; line-height: 1.8; color: #333;">
                                ${storyParts[0].split('\n\n').map(p => \`<p style="margin-bottom: 15px;">\${p}</p>\`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${chapter.title} (Part 2)</h2>
                            <div style="font-size: 16px; line-height: 1.8; color: #333;">
                                ${storyParts[1].split('\n\n').map(p => \`<p style="margin-bottom: 15px;">\${p}</p>\`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${chapter.title} (Part 3)</h2>
                            <div style="font-size: 16px; line-height: 1.8; color: #333;">
                                ${storyParts[2].split('\n\n').map(p => \`<p style="margin-bottom: 15px;">\${p}</p>\`).join('')}
                            </div>
                        </div>
                    \`
                },
                
                // Page 8: Comprehension
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <div style="margin: 20px 0;">
                                <div style="margin-bottom: 25px;">
                                    <p style="font-weight: 600; margin-bottom: 10px;">1. What happened in this chapter?</p>
                                    <textarea id="comp-1" style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px;"></textarea>
                                </div>
                                <div style="margin-bottom: 25px;">
                                    <p style="font-weight: 600; margin-bottom: 10px;">2. How did the characters feel or act in this chapter? Why?</p>
                                    <textarea id="comp-2" style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px;"></textarea>
                                </div>
                                <div>
                                    <p style="font-weight: 600; margin-bottom: 10px;">3. What do you think will happen next?</p>
                                    <textarea id="comp-3" style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px;"></textarea>
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 9: Grammar OR Language
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${isOddDay ? 'Grammar Practice' : 'Language Skills'}</h2>
                            <p style="margin: 20px 0;">${isOddDay ? 'Grammar skills practice' : 'Language skills practice'}</p>
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
                            <h2>${isOddDay ? 'Writing Response' : 'Journal Entry'}</h2>
                            <p style="margin: 20px 0 10px;">${isOddDay ? 'Write your opinion about today\'s reading.' : 'Write about your thoughts and feelings about the story.'}</p>
                            <textarea id="writing" style="width: 100%; min-height: 200px; padding: 12px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 1.6;"></textarea>
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
console.log('🌪️ Generating Wizard of Oz lessons (Days 1-30)...\n');

for (let day = 1; day <= 30; day++) {
  const isAssessment = assessmentDays.includes(day);
  const html = isAssessment ? generateAssessmentLesson(day) : generateRegularLesson(day);
  const filename = `4th-grade-day-${String(day).padStart(3, '0')}.html`;
  
  fs.writeFileSync(filename, html);
  console.log(`✅ Generated ${filename} ${isAssessment ? '(ASSESSMENT)' : ''}`);
}

console.log('\n🎉 All 30 Wizard of Oz lessons generated!');
console.log('\nNext: Run `node generate-three-musketeers-4th.js` for Days 31-60');
