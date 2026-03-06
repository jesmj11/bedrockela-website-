#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const chapters = JSON.parse(fs.readFileSync('./roman-chapters.json', 'utf-8'));
const vocabulary = JSON.parse(fs.readFileSync('./roman-vocabulary.json', 'utf-8'));
const questions = JSON.parse(fs.readFileSync('./roman-questions.json', 'utf-8'));
const infoTexts = JSON.parse(fs.readFileSync('./roman-informational-texts.json', 'utf-8'));
const skills = JSON.parse(fs.readFileSync('./roman-weekly-skills.json', 'utf-8'));

const CONFIG = {
    startDay: 181,
    endDay: 200,
    startWeek: 37,
    gradeLevel: '5th',
    outputFolder: './curriculum/grade5/roman'
};

if (!fs.existsSync(CONFIG.outputFolder)) {
    fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
}

// 16 best Roman stories (skipping Hercules since we did Greek Heracles)
const lessonPlan = [
    { day: 181, story: "Jupiter King of the Gods" },
    { day: 182, story: "Juno Queen of the Gods" },
    { day: 183, story: "Mars Father of Rome" },
    { day: 184, story: "Venus Mother of Rome" },
    { day: 185, type: "assessment" },
    
    { day: 186, story: "Minerva and the Arts of Civilization" },
    { day: 187, story: "Mercury the Messenger" },
    { day: 188, story: "Neptune and the Sea" },
    { day: 189, story: "Vulcan the Divine Craftsman" },
    { day: 190, type: "assessment" },
    
    { day: 191, story: "Romulus and Remus" },
    { day: 192, story: "The Founding of Rome" },
    { day: 193, story: "Aeneas and the Fall of Troy" },
    { day: 194, story: "Junos Wrath and Aeneass Journey" },
    { day: 195, type: "assessment" },
    
    { day: 196, story: "Cupid and Psyche" },
    { day: 197, story: "Proserpina and the Pomegranate" },
    { day: 198, story: "The Story of Lucretia" },
    { day: 199, story: "The Twelve Tables and Roman Law" },
    { day: 200, type: "assessment" }
];

function getWeekInfo(day) {
    const weekNum = CONFIG.startWeek + Math.floor((day - CONFIG.startDay) / 5);
    const dayInWeek = ((day - CONFIG.startDay) % 5) + 1;
    return { week: weekNum, dayInWeek };
}

function splitStoryIntoPages(text, numPages = 4) {
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

function generateRegularLesson(lessonData) {
    const { day, story } = lessonData;
    const { week, dayInWeek } = getWeekInfo(day);
    
    const storyText = chapters[story] || 'Story text not found';
    const vocabWords = vocabulary[story] || [];
    const storyQuestions = questions[story] || [];
    const infoText = infoTexts[story] || null;
    
    const weekKey = `week${week}`;
    const isOddDay = dayInWeek % 2 === 1;
    const skillType = isOddDay ? 'grammar' : 'language';
    const weeklySkill = skills[weekKey] ? skills[weekKey][skillType] : null;
    
    const grammarOrLanguage = isOddDay ? 'Grammar' : 'Language Skills';
    const journalOrWriting = isOddDay ? 'Journal Reflection' : 'Writing Practice';
    
    const storyPages = splitStoryIntoPages(storyText, 4);
    const highlightedPages = storyPages.map(page => highlightVocab(page, vocabWords));
    
    const cumulativeWords = dayInWeek * 3;
    const totalWeekWords = 12;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.gradeLevel} Grade - Day ${day}: ${story}</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
    <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</head>
<body>
    <div class="lesson-page" id="page1">
        <div class="page-header">
            <h1>Day ${day} - Week ${week}</h1>
            <h2>Roman Mythology</h2>
        </div>
        <div class="lesson-title">
            <h1>${story}</h1>
            <p class="subtitle">A Tale from Ancient Rome</p>
        </div>
        <div class="learning-objectives">
            <h3>📚 What You'll Learn Today</h3>
            <ul>
                <li>Read: ${story}</li>
                <li>Learn 3 new vocabulary words</li>
                <li>Answer comprehension questions</li>
                ${infoText ? '<li>Learn about ancient Roman culture</li>' : ''}
                <li>Practice ${grammarOrLanguage.toLowerCase()}</li>
                <li>Complete ${journalOrWriting.toLowerCase()}</li>
            </ul>
        </div>
        <button class="btn-next" onclick="nextPage()">Begin Lesson →</button>
    </div>

    <div class="lesson-page" id="page2" style="display: none;">
        <div class="page-header">
            <h2>📖 Vocabulary</h2>
            <p>Week ${week} - Day ${dayInWeek} of 5</p>
        </div>
        <div class="vocab-section">
            <h3>Today's New Words</h3>
            <p class="vocab-intro">Learn these 3 words before reading!</p>
            ${vocabWords.map((v, idx) => `
            <div class="vocab-word">
                <h4>${idx + 1}. ${v.word}</h4>
                <div class="vocab-input-section">
                    <label><strong>Write the definition:</strong></label>
                    <textarea rows="2" placeholder="Type your definition here..."></textarea>
                </div>
                <p class="context"><strong>As used in the story:</strong> <em>"${v.context}"</em></p>
            </div>`).join('\n            ')}
            <div class="vocab-tracker">
                <p><strong>📚 This Week's Words:</strong> ${cumulativeWords} of ${totalWeekWords} learned</p>
                <p class="tracker-note">Quiz on Friday (Day ${week * 5})!</p>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <div class="lesson-page" id="page3" style="display: none;">
        <div class="page-header">
            <h2>🎯 Vocabulary Practice</h2>
        </div>
        <div class="vocab-review">
            ${vocabWords.map(v => `
            <div class="review-card">
                <h4>${v.word}</h4>
                <p>${v.definition}</p>
            </div>`).join('\n            ')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue to Story →</button>
        </div>
    </div>

    ${[0,1,2,3].map((idx, i) => `
    <div class="lesson-page" id="page${4 + i}" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part ${i + 1} of 4)</h2>
            <p>${story}</p>
        </div>
        <div class="reading-text">
            ${highlightedPages[idx] || '<p>Content continues...</p>'}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">${i === 3 ? 'Answer Questions →' : 'Continue Reading →'}</button>
        </div>
    </div>`).join('\n    ')}

    <div class="lesson-page" id="page8" style="display: none;">
        <div class="page-header">
            <h2>✍️ Comprehension Questions</h2>
        </div>
        <div class="questions-section">
            ${storyQuestions.map((q, idx) => `
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
    <div class="lesson-page" id="page9" style="display: none;">
        <div class="page-header">
            <h2>📰 Informational Text</h2>
            <p>Connect Myth to Reality</p>
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

    <div class="lesson-page" id="page${infoText ? '10' : '9'}" style="display: none;">
        <div class="page-header">
            <h2>${isOddDay ? '✏️' : '🎨'} ${grammarOrLanguage}</h2>
            <p>Week ${week}: ${weeklySkill ? weeklySkill.skill : 'Skill'}</p>
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
                    ${p.sentences ? `<p class="practice-sentence">"${p.sentences}"</p>` : ''}
                    <textarea rows="3" placeholder="Write your answer here..."></textarea>
                </div>`).join('\n                ')}
            </div>
            ` : '<p>Skill content</p>'}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <div class="lesson-page" id="page${infoText ? '11' : '10'}" style="display: none;">
        <div class="page-header">
            <h2>📝 ${journalOrWriting}</h2>
        </div>
        <div class="${isOddDay ? 'journal' : 'writing'}-section">
            <div class="journal-prompt">
                <h3>Writing Prompt:</h3>
                <p>${isOddDay ? 
                    `How do Roman values (duty, honor, service to the state) appear in today's myth? Do you agree with these values?` : 
                    `Compare today's Roman myth to a similar Greek myth you've read. What's different?`
                }</p>
                <p class="vocab-reminder">🎯 Use at least one vocabulary word!</p>
            </div>
            <textarea rows="12" placeholder="Write your response here..."></textarea>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Finish Lesson →</button>
        </div>
    </div>

    <div class="lesson-page" id="page${infoText ? '12' : '11'}" style="display: none;">
        <div class="completion-page">
            <h1>🎉 Day ${day} Complete!</h1>
            <h2>${story}</h2>
            <div class="completion-summary">
                <h3>What You Accomplished:</h3>
                <ul>
                    <li>✅ Learned 3 vocabulary words</li>
                    <li>✅ Read: ${story}</li>
                    <li>✅ Answered comprehension questions</li>
                    ${infoText ? '<li>✅ Learned about Roman culture</li>' : ''}
                    <li>✅ Practiced ${grammarOrLanguage.toLowerCase()}</li>
                    <li>✅ Completed writing</li>
                </ul>
            </div>
            <button class="btn-finish" onclick="returnToDashboard()">Return to Dashboard</button>
        </div>
    </div>

    <script>
        let currentPage = 1;
        const totalPages = ${infoText ? 12 : 11};
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
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${CONFIG.gradeLevel} Grade - Day ${day}: Week ${week} Assessment</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
</head>
<body>
    <div class="lesson-page">
        <div class="assessment-header">
            <h1>📝 Week ${week} Assessment</h1>
            <p>Day ${day} - Roman Mythology</p>
        </div>
        <div style="max-width: 700px; margin: 40px auto; padding: 20px;">
            <h2>Vocabulary Quiz (12 words)</h2>
            <p>Assessment content</p>
            <button class="btn-next" style="margin-top: 40px;" onclick="window.location.href='../../student-dashboard.html'">Submit</button>
        </div>
    </div>
</body>
</html>`;
}

console.log('🏛️ Building Roman Mythology Unit (Days 181-200)\n');

let regularCount = 0;
let assessmentCount = 0;

lessonPlan.forEach(lesson => {
    const filename = `${CONFIG.gradeLevel}-grade-lesson-${lesson.day}.html`;
    const filepath = path.join(CONFIG.outputFolder, filename);
    
    if (lesson.type === 'assessment') {
        console.log(`  📝 Day ${lesson.day}: Assessment (Week ${getWeekInfo(lesson.day).week})`);
        fs.writeFileSync(filepath, generateAssessmentLesson(lesson.day));
        assessmentCount++;
    } else {
        console.log(`  📖 Day ${lesson.day}: ${lesson.story}`);
        fs.writeFileSync(filepath, generateRegularLesson(lesson));
        regularCount++;
    }
});

console.log(`\n✅ Roman Mythology Unit Complete!\n`);
console.log(`📊 Summary:`);
console.log(`   Regular lessons: ${regularCount}`);
console.log(`   Assessment days: ${assessmentCount}`);
console.log(`   Total files: ${regularCount + assessmentCount}`);
console.log(`\n📁 Output: ${CONFIG.outputFolder}`);
console.log(`\n🎉 Roman mythology complete!`);
