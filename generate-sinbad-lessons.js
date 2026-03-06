#!/usr/bin/env node
/**
 * BedrockELA Sinbad Lesson Generator
 * Builds complete 4th grade Sinbad lessons (Days 91-120)
 * 
 * Usage: node generate-sinbad-lessons.js
 */

const fs = require('fs');
const path = require('path');

// ===== CONFIGURATION =====
const CONFIG = {
    startDay: 91,
    endDay: 120,
    startWeek: 19,
    gradeLevel: '4th',
    chaptersFile: './sinbad-chapters.json',
    vocabFile: './sinbad-vocabulary.json',
    questionsFile: './sinbad-questions.json',
    informationalFile: './sinbad-informational-texts.json',
    skillsFile: './sinbad-weekly-skills.json',
    outputFolder: './curriculum/grade4/sinbad'
};

// ===== LESSON PLAN =====
const lessonPlan = [
    // Week 19
    { day: 91, chapter: "The Porter and the Sailor" },
    { day: 92, chapter: "The First Voyage: The Island That Moved" },
    { day: 93, chapter: "The Second Voyage: The Valley of Diamonds" },
    { day: 94, chapter: "The Third Voyage: The Giant's Island" },
    { day: 95, type: "assessment" },
    
    // Week 20
    { day: 96, chapter: "The Fourth Voyage: The Underground Kingdom" },
    { day: 97, chapter: "The Fifth Voyage: The Old Man of the Sea" },
    { day: 98, chapter: "The Sixth Voyage: The River Under the Mountain" },
    { day: 99, chapter: "A Night Off: Hindbad Asks Questions" },
    { day: 100, type: "assessment" },
    
    // Week 21
    { day: 101, chapter: "The Seventh Voyage: The King's Letter" },
    { day: 102, chapter: "Back to the Beginning" },
    { day: 103, chapter: "The Ship That Did Not Wait" },
    { day: 104, chapter: "What the Giant Taught Me" },
    { day: 105, type: "assessment" },
    
    // Week 22
    { day: 106, chapter: "The City Under the Mountain Sky" },
    { day: 107, chapter: "The Letter the Caliph Sent" },
    { day: 108, chapter: "The Elephant and the Secret Valley" },
    { day: 109, chapter: "The Long Way Home" },
    { day: 110, type: "assessment" },
    
    // Week 23
    { day: 111, chapter: "What Wealth Actually Costs" },
    { day: 112, chapter: "The King of Serendib Remembers" },
    { day: 113, chapter: "The Shape of the Sea" },
    { day: 114, chapter: "What Was Lost" },
    { day: 115, type: "assessment" },
    
    // Week 24
    { day: 116, chapter: "The Merchants He Met" },
    { day: 117, chapter: "The Last Thing I Learned" },
    { day: 118, chapter: "Morning at the Sailor's House" },
    { day: 119, chapter: "The Purse of Gold" },
    { day: 120, type: "assessment" }
];

// ===== HELPER FUNCTIONS =====

function getWeekInfo(day) {
    const weekNum = CONFIG.startWeek + Math.floor((day - CONFIG.startDay) / 5);
    const dayInWeek = ((day - CONFIG.startDay) % 5) + 1;
    return { week: weekNum, dayInWeek };
}

function loadJSON(filepath) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

function splitTextIntoPages(text, numPages = 3) {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const parasPerPage = Math.ceil(paragraphs.length / numPages);
    
    const pages = [];
    for (let i = 0; i < numPages; i++) {
        const start = i * parasPerPage;
        const end = Math.min((i + 1) * parasPerPage, paragraphs.length);
        const pageParas = paragraphs.slice(start, end);
        const pageHTML = pageParas.map(p => `<p>${p}</p>`).join('\n            ');
        pages.push(pageHTML);
    }
    
    return pages;
}

function highlightVocab(text, vocabWords) {
    if (!vocabWords || vocabWords.length === 0) return text;
    
    let highlighted = text;
    vocabWords.forEach(v => {
        const regex = new RegExp(`\\b${v.word}\\b`, 'gi');
        highlighted = highlighted.replace(regex, `<span class="vocab-highlight">$&</span>`);
    });
    return highlighted;
}

// ===== LESSON GENERATORS =====

function generateRegularLesson(lessonData, chapters, vocabulary, questions, infoTexts, skills) {
    const { day, chapter } = lessonData;
    const { week, dayInWeek } = getWeekInfo(day);
    
    // Get chapter text
    const chapterText = chapters[chapter] || 'Chapter text not found';
    
    // Get vocabulary (2 words)
    const vocabWords = vocabulary[chapter] || [];
    
    // Get comprehension questions (2 questions)
    const chapterQuestions = questions[chapter] || [];
    
    // Get informational text (every 3 chapters)
    const infoText = infoTexts[chapter] || null;
    
    // Get weekly skills
    const weekKey = `week${week}`;
    const isOddDay = dayInWeek % 2 === 1;
    const skillType = isOddDay ? 'grammar' : 'language';
    const weeklySkill = skills[weekKey] ? skills[weekKey][skillType] : null;
    
    const grammarOrLanguage = isOddDay ? 'Grammar' : 'Language Skills';
    const journalOrWriting = isOddDay ? 'Journal Reflection' : 'Writing Practice';
    
    // Split chapter into 3 pages
    const chapterPages = splitTextIntoPages(chapterText, 3);
    
    // Highlight vocab in all pages
    const highlightedPages = chapterPages.map(page => highlightVocab(page, vocabWords));
    
    // Calculate cumulative vocab count
    const cumulativeWords = dayInWeek * 2;
    const totalWeekWords = 8;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.gradeLevel} Grade - Day ${day}: ${chapter}</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
    <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</head>
<body>
    <!-- Page 1: Title & Objectives -->
    <div class="lesson-page" id="page1">
        <div class="page-header">
            <h1>Day ${day} - Week ${week}</h1>
            <h2>Sinbad the Sailor</h2>
        </div>
        <div class="lesson-title">
            <h1>${chapter}</h1>
            <p class="subtitle">An Arabian Adventure Tale</p>
        </div>
        <div class="learning-objectives">
            <h3>📚 What You'll Learn Today</h3>
            <ul>
                <li>Read: ${chapter}</li>
                <li>Learn 2 new vocabulary words</li>
                <li>Answer comprehension questions</li>
                <li>Practice ${grammarOrLanguage.toLowerCase()}</li>
                <li>Complete ${journalOrWriting.toLowerCase()}</li>
            </ul>
        </div>
        <button class="btn-next" onclick="nextPage()">Begin Lesson →</button>
    </div>

    <!-- Page 2: Vocabulary -->
    <div class="lesson-page" id="page2" style="display: none;">
        <div class="page-header">
            <h2>📖 Vocabulary</h2>
            <p>Week ${week} - Day ${dayInWeek} of 5</p>
        </div>
        <div class="vocab-section">
            <h3>Today's New Words</h3>
            <p class="vocab-intro">Learn these 2 words before reading. Look for them in today's story!</p>
            ${vocabWords.map((v, idx) => `
            <div class="vocab-word">
                <h4>${idx + 1}. ${v.word}</h4>
                <div class="vocab-input-section">
                    <label><strong>Definition:</strong></label>
                    <p>${v.definition}</p>
                    <label style="margin-top: 15px;"><strong>Use it in a sentence:</strong></label>
                    <textarea rows="2" placeholder="Write your own sentence using '${v.word}'..."></textarea>
                </div>
            </div>`).join('\n            ')}
            <div class="vocab-tracker">
                <p><strong>📚 This Week's Words:</strong> ${cumulativeWords} of ${totalWeekWords} learned</p>
                <p class="tracker-note">Keep reviewing! Quiz on Friday (Day ${week * 5}).</p>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue to Story →</button>
        </div>
    </div>

    <!-- Pages 3-5: Reading (3 parts) -->
    <div class="lesson-page" id="page3" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 1 of 3)</h2>
            <p>${chapter}</p>
        </div>
        <div class="reading-text">
            ${highlightedPages[0]}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue Reading →</button>
        </div>
    </div>

    <div class="lesson-page" id="page4" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 2 of 3)</h2>
            <p>${chapter}</p>
        </div>
        <div class="reading-text">
            ${highlightedPages[1]}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue Reading →</button>
        </div>
    </div>

    <div class="lesson-page" id="page5" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 3 of 3)</h2>
            <p>${chapter}</p>
        </div>
        <div class="reading-text">
            ${highlightedPages[2]}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Answer Questions →</button>
        </div>
    </div>

    <!-- Page 6: Comprehension Questions -->
    <div class="lesson-page" id="page6" style="display: none;">
        <div class="page-header">
            <h2>✍️ Comprehension Questions</h2>
            <p>Show what you understood</p>
        </div>
        <div class="questions-section">
            ${chapterQuestions.map((q, idx) => `
            <div class="question">
                <p><strong>${idx + 1}.</strong> ${q}</p>
                <textarea rows="4" placeholder="Write your answer here..."></textarea>
            </div>`).join('\n            ')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    ${infoText ? `
    <!-- Page 7: Informational Text -->
    <div class="lesson-page" id="page7" style="display: none;">
        <div class="page-header">
            <h2>📰 Informational Text</h2>
            <p>Learn About the Real Arabian World</p>
        </div>
        <div class="informational-section">
            <h3>${infoText.title}</h3>
            ${infoText.content.map(para => `<p>${para}</p>`).join('\n            ')}
            
            <div class="lesson-box" style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #2c5aa0;">
                <h4 style="color: #2c5aa0; margin-bottom: 10px;">💡 The Lesson</h4>
                <p>${infoText.lesson}</p>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>
    ` : ''}

    <!-- Page 8: Grammar/Language Skills -->
    <div class="lesson-page" id="page${infoText ? '8' : '7'}" style="display: none;">
        <div class="page-header">
            <h2>${isOddDay ? '✏️' : '🎨'} ${grammarOrLanguage}</h2>
            <p>Week ${week} Focus: ${weeklySkill ? weeklySkill.skill : '[Skill Name]'}</p>
        </div>
        <div class="${isOddDay ? 'grammar' : 'language'}-section">
            ${weeklySkill ? `
            <div class="skill-explanation">
                <h3>📚 What You're Learning:</h3>
                <p>${weeklySkill.explanation}</p>
            </div>
            
            <div class="skill-examples">
                <h3>✨ Examples:</h3>
                ${weeklySkill.examples.map(ex => `<p class="language-example">${ex}</p>`).join('\n                ')}
            </div>
            
            <div class="skill-practice">
                <h3>🎯 Your Turn:</h3>
                ${weeklySkill.practice.map((p, idx) => `
                <div class="practice-item">
                    <p><strong>${idx + 1}.</strong> ${p.instruction}</p>
                    ${p.sentence ? `<p class="practice-sentence">"${p.sentence}"</p>` : ''}
                    ${p.sentence1 ? `<p class="practice-sentence">"${p.sentence1}"</p>` : ''}
                    <textarea rows="3" placeholder="Write your answer here..."></textarea>
                </div>`).join('\n                ')}
            </div>
            ` : '<p>[Grammar/Language content coming soon]</p>'}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <!-- Page 9: Journal/Writing -->
    <div class="lesson-page" id="page${infoText ? '9' : '8'}" style="display: none;">
        <div class="page-header">
            <h2>📝 ${journalOrWriting}</h2>
            <p>${isOddDay ? 'Think about what you read' : 'Practice your writing skills'}</p>
        </div>
        <div class="${isOddDay ? 'journal' : 'writing'}-section">
            <div class="${isOddDay ? 'journal' : 'writing'}-prompt">
                <h3>Writing Prompt:</h3>
                <p>${isOddDay ? 
                    `What surprised you most about today's chapter? Why?` : 
                    `If you were in Sinbad's situation in this chapter, what would you have done differently?`
                }</p>
                <p class="vocab-reminder">🎯 <strong>Challenge:</strong> Use at least one vocabulary word from this week!</p>
            </div>
            <textarea class="${isOddDay ? 'journal' : 'writing'}-text" rows="12" placeholder="Write your response here..."></textarea>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Finish Lesson →</button>
        </div>
    </div>

    <!-- Page 10: Completion -->
    <div class="lesson-page" id="page${infoText ? '10' : '9'}" style="display: none;">
        <div class="completion-page">
            <h1>🎉 Day ${day} Complete!</h1>
            <h2>${chapter}</h2>
            <div class="completion-summary">
                <h3>What You Accomplished Today:</h3>
                <ul>
                    <li>✅ Learned 2 new vocabulary words</li>
                    <li>✅ Read: ${chapter}</li>
                    <li>✅ Answered comprehension questions</li>
                    ${infoText ? '<li>✅ Learned about Arabian history and culture</li>' : ''}
                    <li>✅ Practiced ${grammarOrLanguage.toLowerCase()}</li>
                    <li>✅ Completed ${journalOrWriting.toLowerCase()}</li>
                </ul>
            </div>
            <div class="weekly-tracker">
                <h3>📚 Week ${week} Progress:</h3>
                <p><strong>Vocabulary:</strong> ${cumulativeWords} of ${totalWeekWords} words learned</p>
                <p><strong>Assessment Day:</strong> ${dayInWeek === 4 ? 'Tomorrow!' : `Day ${week * 5} (Friday)`}</p>
            </div>
            <button class="btn-finish" onclick="returnToDashboard()">Return to Dashboard</button>
        </div>
    </div>

    <script>
        // Page Navigation
        let currentPage = 1;
        const totalPages = ${infoText ? 10 : 9};

        window.nextPage = function() {
            if (currentPage < totalPages) {
                document.getElementById('page' + currentPage).style.display = 'none';
                currentPage++;
                document.getElementById('page' + currentPage).style.display = 'block';
                window.scrollTo(0, 0);
            }
        };

        window.prevPage = function() {
            if (currentPage > 1) {
                document.getElementById('page' + currentPage).style.display = 'none';
                currentPage--;
                document.getElementById('page' + currentPage).style.display = 'block';
                window.scrollTo(0, 0);
            }
        };

        window.returnToDashboard = function() {
            window.location.href = '../../student-dashboard.html';
        };
    </script>
</body>
</html>`;
    
    return html;
}

function generateAssessmentLesson(day) {
    const { week } = getWeekInfo(day);
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.gradeLevel} Grade - Day ${day}: Week ${week} Assessment</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
    <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</head>
<body>
    <div class="lesson-page" id="page1">
        <div class="assessment-header">
            <h1>📝 Week ${week} Assessment</h1>
            <p>Day ${day}</p>
        </div>
        <div style="max-width: 700px; margin: 40px auto; padding: 20px;">
            <h2>Vocabulary Quiz (8 words)</h2>
            <p style="margin-bottom: 30px;">Write the definition for each word from this week's lessons.</p>
            
            ${[1,2,3,4,5,6,7,8].map(num => `
            <div class="quiz-word">
                <h4>${num}. [Word ${num}]</h4>
                <input type="text" placeholder="Write the definition..." />
            </div>`).join('\n            ')}
            
            <h2 style="margin-top: 40px;">Comprehension Questions</h2>
            <p style="margin-bottom: 30px;">Answer these questions about this week's chapters.</p>
            
            ${[1,2,3].map(num => `
            <div class="question">
                <p><strong>${num}.</strong> [Comprehension question ${num}]</p>
                <textarea rows="4" placeholder="Write your answer here..."></textarea>
            </div>`).join('\n            ')}
            
            <button class="btn-next" onclick="submitAssessment()" style="margin-top: 40px;">Submit Assessment</button>
        </div>
    </div>

    <script>
        function submitAssessment() {
            alert('Assessment submitted! Great work this week!');
            window.location.href = '../../student-dashboard.html';
        }
    </script>
</body>
</html>`;
    
    return html;
}

// ===== MAIN =====

function main() {
    console.log(`\n🐉 BedrockELA Sinbad Lesson Generator\n`);
    console.log(`Building Days ${CONFIG.startDay}-${CONFIG.endDay} (Weeks ${CONFIG.startWeek}-${CONFIG.startWeek + 5})\n`);
    
    // Create output directory
    if (!fs.existsSync(CONFIG.outputFolder)) {
        fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
        console.log(`📁 Created output folder: ${CONFIG.outputFolder}\n`);
    }
    
    // Load data
    console.log('📚 Loading data files...');
    const chapters = loadJSON(CONFIG.chaptersFile);
    const vocabulary = loadJSON(CONFIG.vocabFile);
    const questions = loadJSON(CONFIG.questionsFile);
    const infoTexts = loadJSON(CONFIG.informationalFile);
    const skills = loadJSON(CONFIG.skillsFile);
    console.log(`  ✓ Loaded ${Object.keys(chapters).length} chapters`);
    console.log(`  ✓ Loaded vocabulary for ${Object.keys(vocabulary).length} chapters`);
    console.log(`  ✓ Loaded questions for ${Object.keys(questions).length} chapters`);
    console.log(`  ✓ Loaded ${Object.keys(infoTexts).length} informational texts`);
    console.log(`  ✓ Loaded skills for ${Object.keys(skills).length} weeks`);
    console.log('');
    
    // Generate lessons
    console.log('🔨 Generating lesson files...\n');
    
    let regularCount = 0;
    let assessmentCount = 0;
    
    lessonPlan.forEach(lesson => {
        const filename = `${CONFIG.gradeLevel}-grade-lesson-${lesson.day}.html`;
        const filepath = path.join(CONFIG.outputFolder, filename);
        
        if (lesson.type === 'assessment') {
            console.log(`  📝 Day ${lesson.day}: Assessment (Week ${getWeekInfo(lesson.day).week})`);
            const html = generateAssessmentLesson(lesson.day);
            fs.writeFileSync(filepath, html);
            assessmentCount++;
        } else {
            console.log(`  📖 Day ${lesson.day}: ${lesson.chapter}`);
            const html = generateRegularLesson(lesson, chapters, vocabulary, questions, infoTexts, skills);
            fs.writeFileSync(filepath, html);
            regularCount++;
        }
    });
    
    console.log(`\n✅ Generation complete!\n`);
    console.log(`📊 Summary:`);
    console.log(`   Regular lessons: ${regularCount}`);
    console.log(`   Assessment days: ${assessmentCount}`);
    console.log(`   Total files: ${regularCount + assessmentCount}`);
    console.log(`\n📁 Output location: ${CONFIG.outputFolder}`);
    console.log(`\n🎉 Ready to use! Open any lesson file in a browser to test.`);
}

main();
