const fs = require('fs');
const path = require('path');

// Lesson structure: Days 1-30 covering The Wonderful Wizard of Oz
const lessons = [
  // Week 1 (Days 1-4 + Assessment Day 5)
  { day: 1, type: 'regular', chapters: [1], title: 'The Cyclone', vocab: ['cyclone', 'prairie'] },
  { day: 2, type: 'regular', chapters: [2], title: 'The Council with the Munchkins', vocab: ['reverence', 'gratitude'] },
  { day: 3, type: 'regular', chapters: [3], title: 'How Dorothy Saved the Scarecrow', vocab: ['scarecrow', 'cornfield'] },
  { day: 4, type: 'regular', chapters: [4], title: 'The Road Through the Forest', vocab: ['emerald', 'journey'] },
  { day: 5, type: 'assessment', title: 'Week 1 Assessment' },
  
  // Week 2 (Days 6-9 + Assessment Day 10)
  { day: 6, type: 'regular', chapters: [5], title: 'The Rescue of the Tin Woodman', vocab: ['rusty', 'woodman'] },
  { day: 7, type: 'regular', chapters: [6], title: 'The Cowardly Lion', vocab: ['cowardly', 'courage'] },
  { day: 8, type: 'regular', chapters: [7], title: 'The Journey to the Great Oz', vocab: ['guardian', 'spectacles'] },
  { day: 9, type: 'regular', chapters: [8], title: 'The Deadly Poppy Field', vocab: ['poppy', 'fragrance'] },
  { day: 10, type: 'assessment', title: 'Week 2 Assessment' },
  
  // Week 3 (Days 11-14 + Assessment Day 15)
  { day: 11, type: 'regular', chapters: [9], title: 'The Queen of the Field Mice', vocab: ['majesty', 'comrades'] },
  { day: 12, type: 'regular', chapters: [10], title: 'The Guardian of the Gates', vocab: ['magnificent', 'dazzle'] },
  { day: 13, type: 'regular', chapters: [11], title: 'The Emerald City of Oz', vocab: ['emerald', 'attendant'] },
  { day: 14, type: 'regular', chapters: [12], title: 'The Search for the Wicked Witch', vocab: ['wicked', 'obey'] },
  { day: 15, type: 'assessment', title: 'Week 3 Assessment' },
  
  // Week 4 (Days 16-19 + Assessment Day 20)
  { day: 16, type: 'regular', chapters: [13], title: 'The Rescue', vocab: ['captive', 'rescue'] },
  { day: 17, type: 'regular', chapters: [14], title: 'The Winged Monkeys', vocab: ['enchanted', 'summon'] },
  { day: 18, type: 'regular', chapters: [15], title: 'The Discovery of Oz the Terrible', vocab: ['deceive', 'humbug'] },
  { day: 19, type: 'regular', chapters: [16], title: 'The Magic Art of the Great Humbug', vocab: ['magician', 'illusion'] },
  { day: 20, type: 'assessment', title: 'Week 4 Assessment' },
  
  // Week 5 (Days 21-24 + Assessment Day 25)
  { day: 21, type: 'regular', chapters: [17], title: 'How the Balloon Was Launched', vocab: ['balloon', 'launch'] },
  { day: 22, type: 'regular', chapters: [18], title: 'Away to the South', vocab: ['sorceress', 'glinda'] },
  { day: 23, type: 'regular', chapters: [19], title: 'Attacked by the Fighting Trees', vocab: ['branches', 'fierce'] },
  { day: 24, type: 'regular', chapters: [20], title: 'The Dainty China Country', vocab: ['porcelain', 'fragile'] },
  { day: 25, type: 'assessment', title: 'Week 5 Assessment' },
  
  // Week 6 (Days 26-29 + Assessment Day 30)
  { day: 26, type: 'regular', chapters: [21], title: 'The Lion Becomes King of the Beasts', vocab: ['sovereign', 'reign'] },
  { day: 27, type: 'regular', chapters: [22], title: 'The Country of the Quadlings', vocab: ['quadlings', 'stout'] },
  { day: 28, type: 'regular', chapters: [23], title: 'Glinda Grants Dorothy\'s Wish', vocab: ['granted', 'desire'] },
  { day: 29, type: 'regular', chapters: [24], title: 'Home Again', vocab: ['homeward', 'beloved'] },
  { day: 30, type: 'assessment', title: 'Week 6 Assessment - Unit Complete!' }
];

// Get vocabulary words for a given week (for assessment days)
function getWeekVocab(day) {
  const weekStart = Math.floor((day - 1) / 5) * 5 + 1;
  const weekLessons = lessons.filter(l => 
    l.day >= weekStart && l.day < weekStart + 4 && l.type === 'regular'
  );
  
  return weekLessons.flatMap(l => l.vocab || []);
}

// Get comprehension questions based on chapters
function getComprehensionQuestions(chapters) {
  // These are placeholder - in production, these should be specific to each chapter
  return [
    { question: "What were the main events in this chapter?", type: "short-answer" },
    { question: "How did the characters feel during these events?", type: "short-answer" },
    { question: "What important details did you notice?", type: "short-answer" }
  ];
}

function buildRegularLesson(lesson) {
  const chapterNum = lesson.chapters[0];
  const vocab1 = lesson.vocab[0] || 'word1';
  const vocab2 = lesson.vocab[1] || 'word2';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${lesson.day} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    
    <script>
        const lesson${lesson.day}Config = {
            lessonId: '4th-grade-day-${lesson.day}',
            gradeLevel: '4th-grade',
            title: 'Day ${lesson.day} - 4th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <div class="character">📚</div>
                            <h1>Day ${lesson.day}</h1>
                            <div class="subtitle">4th Grade ELA</div>
                            <p style="color: #B06821; font-size: 20px; margin-top: 20px;">
                                The Wonderful Wizard of Oz
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Chapter ${chapterNum}: ${lesson.title}
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Welcome
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Welcome to Day ${lesson.day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>📖 Read Chapter ${chapterNum}: ${lesson.title}</li>
                                <li>📝 Learn 2 new vocabulary words from the text</li>
                                <li>🎯 Answer comprehension questions</li>
                                <li>✍️ Write a journal entry</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 30-45 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary (2 words from text)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 Vocabulary Words from Today's Reading</h2>
                            
                            <div style="margin: 30px 0; padding: 25px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 15px; border: 2px solid #B06821;">
                                <div style="margin-bottom: 30px;">
                                    <span style="font-size: 32px; font-weight: 800; color: #305853;">${vocab1}</span>
                                    <p style="font-size: 18px; line-height: 1.6; color: #333; margin-top: 10px;">
                                        [Definition from context in the chapter]
                                    </p>
                                </div>
                                
                                <div>
                                    <span style="font-size: 32px; font-weight: 800; color: #305853;">${vocab2}</span>
                                    <p style="font-size: 18px; line-height: 1.6; color: #333; margin-top: 10px;">
                                        [Definition from context in the chapter]
                                    </p>
                                </div>
                            </div>
                            
                            <div style="padding: 20px; background: rgba(176,104,33,0.05); border-radius: 10px;">
                                <p style="margin: 0;">
                                    💡 <strong>Watch for these words</strong> as you read today's chapter!
                                </p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 4: Reading
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Chapter ${chapterNum}: ${lesson.title}</h2>
                            
                            <div style="background: white; padding: 25px; border-radius: 12px; border: 3px solid #305853; margin: 20px 0;">
                                <p style="font-size: 18px; margin-bottom: 15px;">
                                    📚 Read the chapter from The Wonderful Wizard of Oz:
                                </p>
                                <a href="https://www.gutenberg.org/files/55/55-h/55-h.htm#chap${String(chapterNum).padStart(2, '0')}" 
                                   target="_blank" 
                                   style="display: inline-block; padding: 15px 30px; background: #B06821; color: white; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 18px;">
                                    Read Chapter ${chapterNum} →
                                </a>
                                <p style="font-size: 14px; color: #666; margin-top: 15px;">
                                    (Opens in Project Gutenberg)
                                </p>
                            </div>
                            
                            <div style="margin-top: 30px; padding: 20px; background: rgba(48,88,83,0.1); border-radius: 10px;">
                                <h3 style="color: #305853;">📝 While You Read:</h3>
                                <ul style="line-height: 2;">
                                    <li>Look for the vocabulary words: <strong>${vocab1}</strong> and <strong>${vocab2}</strong></li>
                                    <li>What are the main events?</li>
                                    <li>How do characters change or react?</li>
                                </ul>
                            </div>
                        </div>
                    \`
                },
                
                // Page 5: Comprehension Questions
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎯 Comprehension Questions</h2>
                            <p>Answer these questions about Chapter ${chapterNum}:</p>
                            
                            <div style="margin: 30px 0;">
                                <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                    <p style="font-weight: 700; margin-bottom: 10px;">1. What were the main events in this chapter?</p>
                                    <textarea style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"></textarea>
                                </div>
                                
                                <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                    <p style="font-weight: 700; margin-bottom: 10px;">2. How did the characters feel or react to what happened?</p>
                                    <textarea style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"></textarea>
                                </div>
                                
                                <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                    <p style="font-weight: 700; margin-bottom: 10px;">3. What do you predict will happen next?</p>
                                    <textarea style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"></textarea>
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 6: Journal
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Journal Entry</h2>
                            
                            <div style="margin: 25px 0; padding: 25px; background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; border-radius: 8px;">
                                <h3 style="color: #B06821; margin-bottom: 15px;">Today's Prompt:</h3>
                                <p style="font-size: 18px; font-style: italic;">
                                    Write 4-6 sentences about Chapter ${chapterNum}. What was most interesting or surprising? 
                                    How did this chapter move the story forward?
                                </p>
                            </div>
                            
                            <textarea 
                                style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 10px; font-size: 16px; font-family: inherit;"
                                placeholder="Write your journal entry here..."></textarea>
                        </div>
                    \`
                },
                
                // Page 7: Completion
                {
                    render: () => \`
                        <div class="lesson-page-card completion-page">
                            <div class="character">🌟</div>
                            <h1>Day ${lesson.day} Complete!</h1>
                            <p style="font-size: 20px; margin: 20px 0;">Great work today!</p>
                            
                            <div style="text-align: left; max-width: 400px; margin: 30px auto; background: rgba(48,88,83,0.05); padding: 25px; border-radius: 12px;">
                                <h3 style="color: #305853; margin-bottom: 15px;">✅ Today You:</h3>
                                <ul style="line-height: 2;">
                                    <li>Read Chapter ${chapterNum}</li>
                                    <li>Learned 2 vocabulary words</li>
                                    <li>Answered comprehension questions</li>
                                    <li>Wrote a journal entry</li>
                                </ul>
                            </div>
                            
                            <a href="student-dashboard.html" 
                               style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">
                                Back to Dashboard
                            </a>
                        </div>
                    \`
                }
            ]
        };

        createLessonViewer('lesson-container', lesson${lesson.day}Config);
    </script>
</body>
</html>`;
}

function buildAssessmentLesson(lesson) {
  const weekVocab = getWeekVocab(lesson.day);
  const weekNum = Math.ceil(lesson.day / 5);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${lesson.day} Assessment - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/quiz-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    <script src="js/quiz-game.js"></script>
    
    <script>
        const lesson${lesson.day}Config = {
            lessonId: '4th-grade-day-${lesson.day}',
            gradeLevel: '4th-grade',
            title: 'Day ${lesson.day} Assessment - 4th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <div class="character">📝</div>
                            <h1>Day ${lesson.day}</h1>
                            <div class="subtitle">Week ${weekNum} Assessment</div>
                            <p style="color: #B06821; font-size: 20px; margin-top: 20px;">
                                4th Grade ELA
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Welcome
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📝 Week ${weekNum} Assessment</h2>
                            <p style="font-size: 18px;">Time to show what you learned this week!</p>
                            
                            <div style="margin: 30px 0; padding: 25px; background: rgba(176,104,33,0.1); border-radius: 12px;">
                                <h3 style="color: #B06821; margin-bottom: 15px;">Today's Assessment:</h3>
                                <ul style="line-height: 2; font-size: 18px;">
                                    <li>📚 Vocabulary Quiz (8 words from this week)</li>
                                    <li>🎯 Comprehension Questions</li>
                                    <li>✍️ Reflection Journal</li>
                                </ul>
                            </div>
                            
                            <p style="font-size: 16px; color: #666;">
                                <strong>Take your time</strong> and do your best work!
                            </p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary Quiz (8 words)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 Vocabulary Quiz</h2>
                            <p>Match each word with its definition. All 8 words are from this week's reading!</p>
                            
                            <div style="margin: 30px 0;">
                                ${weekVocab.map((word, i) => `
                                    <div style="margin-bottom: 25px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                        <p style="font-weight: 700; font-size: 20px; color: #305853; margin-bottom: 10px;">
                                            ${i + 1}. ${word}
                                        </p>
                                        <p style="margin-bottom: 10px;">Definition:</p>
                                        <textarea style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;" 
                                                  placeholder="Write the definition..."></textarea>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    \`
                },
                
                // Page 4: Comprehension Test
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎯 Comprehension Questions</h2>
                            <p>Answer these questions about this week's chapters:</p>
                            
                            <div style="margin: 30px 0;">
                                <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                    <p style="font-weight: 700; margin-bottom: 10px;">1. What were the most important events this week?</p>
                                    <textarea style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"></textarea>
                                </div>
                                
                                <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                    <p style="font-weight: 700; margin-bottom: 10px;">2. How have the characters changed or grown?</p>
                                    <textarea style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"></textarea>
                                </div>
                                
                                <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                    <p style="font-weight: 700; margin-bottom: 10px;">3. What do you think will happen in next week's reading?</p>
                                    <textarea style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"></textarea>
                                </div>
                            </div>
                        </div>
                    \`
                },
                
                // Page 5: Journal
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Weekly Reflection</h2>
                            
                            <div style="margin: 25px 0; padding: 25px; background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; border-radius: 8px;">
                                <h3 style="color: #B06821; margin-bottom: 15px;">Reflection Prompt:</h3>
                                <p style="font-size: 18px; font-style: italic;">
                                    Write a paragraph (5-7 sentences) about your favorite part of this week's reading. 
                                    Why was it your favorite? What made it interesting or exciting?
                                </p>
                            </div>
                            
                            <textarea 
                                style="width: 100%; min-height: 250px; padding: 15px; border: 2px solid #305853; border-radius: 10px; font-size: 16px; font-family: inherit;"
                                placeholder="Write your reflection here..."></textarea>
                        </div>
                    \`
                },
                
                // Page 6: Completion
                {
                    render: () => \`
                        <div class="lesson-page-card completion-page">
                            <div class="character">⭐</div>
                            <h1>Week ${weekNum} Complete!</h1>
                            <p style="font-size: 20px; margin: 20px 0;">
                                Excellent work finishing Week ${weekNum}!
                            </p>
                            
                            <div style="text-align: left; max-width: 400px; margin: 30px auto; background: rgba(48,88,83,0.05); padding: 25px; border-radius: 12px;">
                                <h3 style="color: #305853; margin-bottom: 15px;">✅ This Week You:</h3>
                                <ul style="line-height: 2;">
                                    <li>Read 4 chapters</li>
                                    <li>Learned 8 vocabulary words</li>
                                    <li>Completed the assessment</li>
                                    <li>Reflected on your learning</li>
                                </ul>
                            </div>
                            
                            <p style="font-size: 18px; margin-top: 30px;">
                                Ready for Week ${weekNum + 1}? Keep up the great work! 📚
                            </p>
                            
                            <a href="student-dashboard.html" 
                               style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">
                                Back to Dashboard
                            </a>
                        </div>
                    \`
                }
            ]
        };

        createLessonViewer('lesson-container', lesson${lesson.day}Config);
    </script>
</body>
</html>`;
}

// Build all 30 lessons
console.log('🏗️  Building 4th Grade Days 1-30 with updated structure...\n');

lessons.forEach(lesson => {
  const html = lesson.type === 'assessment' 
    ? buildAssessmentLesson(lesson)
    : buildRegularLesson(lesson);
  
  const filename = `4th-grade-day-${lesson.day}.html`;
  fs.writeFileSync(filename, html);
  
  const pageCount = lesson.type === 'assessment' ? 6 : 7;
  console.log(`✅ Built Day ${lesson.day} (${lesson.type}, ${pageCount} pages)`);
});

console.log('\n✨ All 30 lessons built!');
console.log('\n📊 Structure Summary:');
console.log('  Regular days (1-4, 6-9, etc.): 7 pages');
console.log('    1. Title → 2. Welcome → 3. Vocabulary (2 words) → 4. Reading → 5. Comprehension → 6. Journal → 7. Completion');
console.log('  Assessment days (5, 10, 15, 20, 25, 30): 6 pages');
console.log('    1. Title → 2. Welcome → 3. Vocab Quiz (8 words) → 4. Comprehension Test → 5. Journal → 6. Completion');
