#!/usr/bin/env node
/**
 * BedrockELA Mythology Lesson Generator
 * Builds complete 5th grade mythology lessons from story files + vocabulary
 * 
 * Usage: node generate-mythology-lessons.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ===== CONFIGURATION =====
const CONFIG = {
    mythology: 'Greek', // Greek, Greek, Roman, etc.
    startDay: 161,
    endDay: 180,
    startWeek: 33,
    gradeLevel: '5th',
    storyFolder: '/Users/mushu/Desktop/BedrockELA/5th Grade/greek',
    chaptersFile: './greek-chapters.json',
    vocabFile: './greek-vocabulary.json',
    informationalFile: './greek-informational-texts.json',
    questionsFile: './greek-questions.json',
    skillsFile: './greek-weekly-skills.json',
    outputFolder: './curriculum/grade5/greek'
};

// ===== LESSON PLAN =====
const lessonPlan = [
    // Week 29
    { day: 141, story: "In_the_Beginning_The_Greek_Creation", title: "In the Beginning: The Greek Creation" },
    { day: 142, story: "The_Nine_Worlds_of_Yggdrasil", title: "The Nine Worlds of Yggdrasil" },
    { day: 143, story: "Odin_and_the_Price_of_Wisdom", title: "Odin and the Price of Wisdom" },
    { day: 144, story: "Thor_and_the_Theft_of_Mjolnir", title: "Thor and the Theft of Mjölnir" },
    { day: 145, type: "assessment" },
    
    // Week 30
    { day: 146, story: "Freyja_and_the_Necklace_of_the_Brisings", title: "Freyja and the Necklace of the Brisings" },
    { day: 147, story: "Freyr_and_the_Sword_That_Fought_Alone", title: "Freyr and the Sword That Fought Alone" },
    { day: 148, story: "Heimdall_and_the_Rainbow_Bridge", title: "Heimdall and the Rainbow Bridge" },
    { day: 149, story: "Loki_the_Trickster", title: "Loki the Trickster" },
    { day: 150, type: "assessment" },
    
    // Week 31
    { day: 151, story: "Tyr_and_the_Binding_of_Fenrir", title: "Týr and the Binding of Fenrir" },
    { day: 152, story: "Baldur_the_Beautiful", title: "Baldur the Beautiful" },
    { day: 153, story: "The_Death_of_Baldur_and_Lokis_Punishment", title: "The Death of Baldur and Loki's Punishment" },
    { day: 154, story: "Sigurd_and_the_Dragon_Fafnir", title: "Sigurd and the Dragon Fafnir" },
    { day: 155, type: "assessment" },
    
    // Week 32
    { day: 156, story: "The_Mead_of_Poetry", title: "The Mead of Poetry" },
    { day: 157, story: "The_Valkyries_Choosers_of_the_Slain", title: "The Valkyries: Choosers of the Slain" },
    { day: 158, story: "The_Viking_Afterlife_Valhalla_and_Helheim", title: "The Viking Afterlife: Valhalla and Helheim" },
    { day: 159, story: "Ragnarok_The_End_and_the_Beginning", title: "Ragnarök: The End and the Beginning" },
    { day: 160, type: "assessment" }
];

// ===== HELPER FUNCTIONS =====

function loadVocabulary(csvPath) {
    console.log('📚 Loading vocabulary from CSV...');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').slice(1); // Skip header
    
    const vocab = {};
    lines.forEach(line => {
        if (!line.trim()) return;
        
        // Parse CSV line (handle quoted fields)
        const parts = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            if (char === '"' && !inQuotes) {
                inQuotes = true;
            } else if (char === '"' && inQuotes && nextChar === '"') {
                current += '"';
                i++; // Skip next quote
            } else if (char === '"' && inQuotes) {
                inQuotes = false;
            } else if (char === ',' && !inQuotes) {
                parts.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        parts.push(current.trim()); // Add last part
        
        if (parts.length < 4) return;
        
        const story = parts[0];
        const word = parts[1];
        const definition = parts[2];
        const context = parts[3];
        
        if (!vocab[story]) vocab[story] = [];
        vocab[story].push({ word, definition, context });
    });
    
    console.log(`  ✓ Loaded vocabulary for ${Object.keys(vocab).length} stories`);
    return vocab;
}

function extractStoryText(storyFolder, filename) {
    const docxPath = path.join(storyFolder, `NORSE_${filename}.docx`);
    if (!fs.existsSync(docxPath)) {
        console.warn(`  ⚠️  Story file not found: ${docxPath}`);
        return `[Story text for ${filename} not found]`;
    }
    
    try {
        const text = execSync(`textutil -convert txt -stdout "${docxPath}" 2>/dev/null`, { encoding: 'utf-8' });
        return text
            .replace(/Greek Mythology\n/g, '')
            .replace(/A Tale from Greek Mythology\n/g, '')
            .replace(/Retold for Young Readers\n/g, '')
            .split('\n')
            .filter(line => line.trim().length > 0)
            .join('\n\n');
    } catch (error) {
        console.error(`  ✗ Error extracting ${filename}:`, error.message);
        return `[Story text extraction failed for ${filename}]`;
    }
}

function getWeekInfo(day) {
    const weekNum = CONFIG.startWeek + Math.floor((day - CONFIG.startDay) / 5);
    const dayInWeek = ((day - CONFIG.startDay) % 5) + 1;
    return { week: weekNum, dayInWeek };
}

function getVocabGame(dayInWeek) {
    const games = ['Matching', 'Fill in the Blank', 'Word Scramble', 'Matching Challenge'];
    return games[dayInWeek - 1] || 'Matching';
}

function highlightVocab(text, vocabWords) {
    if (!vocabWords) return text;
    
    let highlighted = text;
    vocabWords.forEach(v => {
        const regex = new RegExp(`\\b${v.word}\\b`, 'gi');
        highlighted = highlighted.replace(regex, `<span class="vocab-highlight">$&</span>`);
    });
    return highlighted;
}

function formatStoryForHTML(text, vocabWords) {
    const paragraphs = text.split('\n\n');
    return paragraphs
        .map(p => `<p>${highlightVocab(p, vocabWords)}</p>`)
        .join('\n            ');
}

function splitStoryIntoPages(text, vocabWords, numPages = 4) {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const parasPerPage = Math.ceil(paragraphs.length / numPages);
    
    const pages = [];
    for (let i = 0; i < numPages; i++) {
        const start = i * parasPerPage;
        const end = Math.min((i + 1) * parasPerPage, paragraphs.length);
        const pageParas = paragraphs.slice(start, end);
        const pageHTML = pageParas
            .map(p => `<p>${highlightVocab(p, vocabWords)}</p>`)
            .join('\n            ');
        pages.push(pageHTML);
    }
    
    return pages;
}

// ===== LESSON GENERATORS =====

function generateRegularLesson(lessonData, vocabulary, questions, informationalTexts, infoQuestions, skills) {
    const { day, story, title } = lessonData;
    const { week, dayInWeek } = getWeekInfo(day);
    
    // Get vocabulary for this story
    const storyKey = title;
    const vocabWords = vocabulary[storyKey] || [];
    
    if (vocabWords.length === 0) {
        console.warn(`  ⚠️  No vocabulary found for: ${storyKey}`);
    }
    
    // Get comprehension questions for this story
    const storyQuestions = questions[storyKey] || [];
    
    // Get informational text
    const infoText = informationalTexts[storyKey] || null;
    
    // Get informational text questions
    const informationalQuestions = infoQuestions[storyKey] || [];
    
    // Get weekly skills (grammar on odd days, language on even days)
    const weekKey = `week${week}`;
    const isOddDay = dayInWeek % 2 === 1;
    const skillType = isOddDay ? 'grammar' : 'language';
    const weeklySkill = skills[weekKey] ? skills[weekKey][skillType] : null;
    
    // Extract story text
    console.log(`  📖 Extracting: ${title}...`);
    const storyText = extractStoryText(CONFIG.storyFolder, story);
    
    // Calculate cumulative vocab count
    const daysInWeek = dayInWeek;
    const cumulativeWords = daysInWeek * 3;
    const totalWeekWords = 12;
    
    // Determine game/activity types
    const vocabGame = getVocabGame(dayInWeek);
    const grammarOrLanguage = isOddDay ? 'Grammar' : 'Language Skills';
    const journalOrWriting = isOddDay ? 'Journal Reflection' : 'Writing Practice';
    
    // Generate vocab section HTML
    const vocabHTML = vocabWords.map((v, idx) => `
            <div class="vocab-word">
                <h4>${idx + 1}. ${v.word}</h4>
                <div class="vocab-input-section">
                    <label><strong>Write the definition:</strong></label>
                    <textarea rows="2" placeholder="Type your definition here..." data-answer="${v.definition}"></textarea>
                </div>
                <p class="context"><strong>As used in the story:</strong> <em>"${v.context}"</em></p>
            </div>`).join('\n');
    
    // Generate vocab data for JavaScript
    const vocabJS = JSON.stringify(vocabWords.map(v => ({
        word: v.word,
        definition: v.definition
    })), null, 12);
    
    // Split story into 4 pages for no-scroll reading
    const storyPages = splitStoryIntoPages(storyText, vocabWords, 4);
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.gradeLevel} Grade - Day ${day}: ${title}</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
</head>
<body>
    <!-- Page 1: Title & Objectives -->
    <div class="lesson-page" id="page1">
        <div class="page-header">
            <h1>Day ${day} - Week ${week}</h1>
            <h2>${CONFIG.mythology} Mythology</h2>
        </div>
        <div class="lesson-title">
            <h1>${title}</h1>
            <p class="subtitle">A Tale from ${CONFIG.mythology} Mythology</p>
        </div>
        <div class="learning-objectives">
            <h3>📚 What You'll Learn Today</h3>
            <ul>
                <li>Read the ${CONFIG.mythology} myth: ${title}</li>
                <li>Learn 3 new vocabulary words</li>
                <li>Explore related informational text</li>
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
            <p class="vocab-intro">Learn these 3 words before reading. They appear in today's story!</p>
            ${vocabHTML}
            <div class="vocab-tracker">
                <p><strong>📚 This Week's Words:</strong> ${cumulativeWords} of ${totalWeekWords} learned</p>
                <p class="tracker-note">Keep reviewing! Quiz on Friday (Day ${week * 5}).</p>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Practice Words →</button>
        </div>
    </div>

    <!-- Page 3: Vocabulary Game -->
    <div class="lesson-page" id="page3" style="display: none;">
        <div class="page-header">
            <h2>🎯 Vocabulary Practice</h2>
            <p>Day ${dayInWeek} - ${vocabGame}</p>
        </div>
        <div id="vocabGameContainer"></div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue to Story →</button>
        </div>
    </div>

    <!-- Page 4: Reading (Part 1/4) -->
    <div class="lesson-page" id="page4" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 1 of 4)</h2>
            <p>${title}</p>
        </div>
        <div class="reading-text">
            ${storyPages[0]}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue Reading →</button>
        </div>
    </div>

    <!-- Page 5: Reading (Part 2/4) -->
    <div class="lesson-page" id="page5" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 2 of 4)</h2>
            <p>${title}</p>
        </div>
        <div class="reading-text">
            ${storyPages[1]}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue Reading →</button>
        </div>
    </div>

    <!-- Page 6: Reading (Part 3/4) -->
    <div class="lesson-page" id="page6" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 3 of 4)</h2>
            <p>${title}</p>
        </div>
        <div class="reading-text">
            ${storyPages[2]}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue Reading →</button>
        </div>
    </div>

    <!-- Page 7: Reading (Part 4/4) -->
    <div class="lesson-page" id="page7" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 4 of 4)</h2>
            <p>${title}</p>
        </div>
        <div class="reading-text">
            ${storyPages[3]}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Answer Questions →</button>
        </div>
    </div>

    <!-- Page 8: Comprehension Questions -->
    <div class="lesson-page" id="page8" style="display: none;">
        <div class="page-header">
            <h2>✍️ Comprehension Questions</h2>
            <p>Show what you understood</p>
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
            <button class="btn-next" onclick="nextPage()">Continue to Informational Text →</button>
        </div>
    </div>

    <!-- Page 9: Informational Text -->
    <div class="lesson-page" id="page9" style="display: none;">
        <div class="page-header">
            <h2>📰 Informational Text</h2>
            <p>Connect Myth to Reality</p>
        </div>
        <div class="informational-section">
            ${infoText ? `
            <h3>${infoText.title}</h3>
            ${infoText.content.map(para => `<p>${para}</p>`).join('\n            ')}
            
            ${infoText.comparison ? `
            <div class="comparison-table" style="margin-top: 30px;">
                <h4 style="color: #2c5aa0; margin-bottom: 15px;">Greek Myth vs. Modern Science</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: #fff8e1; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24;">
                        <h5 style="color: #f59e0b; margin-bottom: 10px;">📜 Greek Version</h5>
                        <ul style="margin-left: 20px; line-height: 1.8;">
                            ${infoText.comparison.greek.map(item => `<li>${item}</li>`).join('\n                            ')}
                        </ul>
                    </div>
                    <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <h5 style="color: #2563eb; margin-bottom: 10px;">🔬 Scientific Version</h5>
                        <ul style="margin-left: 20px; line-height: 1.8;">
                            ${infoText.comparison.science.map(item => `<li>${item}</li>`).join('\n                            ')}
                        </ul>
                    </div>
                </div>
            </div>
            ` : ''}
            
            ${infoText.lesson ? `
            <div class="lesson-box" style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #2c5aa0;">
                <h4 style="color: #2c5aa0; margin-bottom: 10px;">💡 The Lesson</h4>
                <p>${infoText.lesson}</p>
            </div>
            ` : ''}
            ` : '<p>Informational text coming soon!</p>'}
        </div>
        
        <div class="questions-section" style="margin-top: 30px;">
            <h3 style="color: #2c5aa0; margin-bottom: 20px;">✍️ Comprehension Questions</h3>
            ${informationalQuestions.map((q, idx) => `
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

    <!-- Page 10: Grammar/Language Game -->
    <div class="lesson-page" id="page10" style="display: none;">
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
                    ${p.sentences ? `<p class="practice-sentence">"${p.sentences}"</p>` : ''}
                    ${p.paragraph ? `<p class="practice-sentence">"${p.paragraph}"</p>` : ''}
                    ${p.conjunction ? `<p class="practice-hint">${p.conjunction}</p>` : ''}
                    ${p.hint ? `<p class="practice-hint">💡 Hint: ${p.hint}</p>` : ''}
                    <textarea rows="3" placeholder="Write your answer here..." data-answer="${p.answer}"></textarea>
                </div>`).join('\n                ')}
            </div>
            ` : '<p>[Grammar/Language content to be added]</p>'}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <!-- Page 8: Journal/Writing -->
    <div class="lesson-page" id="page8" style="display: none;">
        <div class="page-header">
            <h2>📝 ${journalOrWriting}</h2>
            <p>${isOddDay ? 'Think deeply about what you read' : 'Practice your writing skills'}</p>
        </div>
        <div class="${isOddDay ? 'journal' : 'writing'}-section">
            <div class="${isOddDay ? 'journal' : 'writing'}-prompt">
                <h3>Writing Prompt:</h3>
                <p>[${journalOrWriting} prompt for ${title}]</p>
                <p class="vocab-reminder">🎯 <strong>Challenge:</strong> Use at least ${isOddDay ? 'one' : 'two'} vocabulary word(s) from this week!</p>
            </div>
            <textarea class="${isOddDay ? 'journal' : 'writing'}-text" rows="15" placeholder="Write your response here..."></textarea>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Finish Lesson →</button>
        </div>
    </div>

    <!-- Page 9: Completion -->
    <div class="lesson-page" id="page12" style="display: none;">
        <div class="completion-page">
            <h1>🎉 Day ${day} Complete!</h1>
            <h2>${title}</h2>
            <div class="completion-summary">
                <h3>What You Accomplished Today:</h3>
                <ul>
                    <li>✅ Learned 3 new vocabulary words</li>
                    <li>✅ Practiced with ${vocabGame.toLowerCase()}</li>
                    <li>✅ Read ${title}</li>
                    <li>✅ Explored informational text</li>
                    <li>✅ Answered comprehension questions</li>
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

    <script type="module">
        import { 
            create${vocabGame.replace(/ /g, '')}${dayInWeek === 1 ? 'Game' : ''},
            injectVocabGameStyles
        } from '../../../js/vocab-games.js';

        injectVocabGameStyles();

        const vocabularyWords = ${vocabJS};

        // Create appropriate vocab game for day ${dayInWeek}
        ${dayInWeek === 1 ? 'createMatchingGame' : 
          dayInWeek === 2 ? 'createFillInTheBlank' :
          dayInWeek === 3 ? 'createWordScramble' : 
          'createMatchingChallenge'}(vocabularyWords, 'vocabGameContainer');

        // Page Navigation
        let currentPage = 1;
        const totalPages = 12;

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

    <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</body>
</html>`;

    return html;
}

function generateAssessmentLesson(day) {
    const { week } = getWeekInfo(day);
    const firstDayOfWeek = week * 5 - 4;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.gradeLevel} Grade - Day ${day}: Week ${week} Assessment</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
</head>
<body>
    <div class="lesson-page">
        <div class="page-header">
            <h1>Day ${day} - Week ${week}</h1>
            <h2>Assessment Day</h2>
        </div>
        <div class="assessment-intro">
            <h1>📝 Week ${week} Assessment</h1>
            <p>Test your knowledge of this week's vocabulary, grammar, and stories!</p>
            <h3>What's on today's assessment:</h3>
            <ul>
                <li>Vocabulary Quiz (12 words from Days ${firstDayOfWeek}-${day - 1})</li>
                <li>Grammar/Language Skills</li>
                <li>Writing Assessment</li>
            </ul>
            <p class="assessment-note">Take your time and do your best! This helps us see what you've learned.</p>
        </div>
        
        <!-- Assessment content to be added -->
        <div class="assessment-sections">
            <section class="vocab-assessment">
                <h2>Part 1: Vocabulary (12 words)</h2>
                <p>[Vocabulary quiz questions to be added]</p>
            </section>
            
            <section class="grammar-assessment">
                <h2>Part 2: Grammar & Language Skills</h2>
                <p>[Grammar assessment to be added]</p>
            </section>
            
            <section class="writing-assessment">
                <h2>Part 3: Writing</h2>
                <p>[Writing prompt to be added]</p>
            </section>
        </div>
        
        <button class="btn-finish" onclick="submitAssessment()">Submit Assessment</button>
    </div>

    <script>
        function submitAssessment() {
            alert('Assessment submitted! Great work this week!');
            window.location.href = '../../student-dashboard.html';
        }
    </script>

    <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</body>
</html>`;
}

// ===== MAIN EXECUTION =====

function loadQuestions(jsonPath) {
    console.log('📝 Loading comprehension questions...');
    const questionsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`  ✓ Loaded questions for ${Object.keys(questionsData).length} stories`);
    return questionsData;
}

function loadWeeklySkills(jsonPath) {
    console.log('✏️ Loading weekly grammar & language skills...');
    const skillsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`  ✓ Loaded skills for ${Object.keys(skillsData).length} weeks`);
    return skillsData;
}

function loadInformationalTexts(jsonPath) {
    console.log('📰 Loading informational texts...');
    const infoData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`  ✓ Loaded informational texts for ${Object.keys(infoData).length} stories`);
    return infoData;
}

function main() {
    console.log(`\n🐉 BedrockELA ${CONFIG.mythology} Mythology Lesson Generator\n`);
    console.log(`Building Days ${CONFIG.startDay}-${CONFIG.endDay} (Weeks ${CONFIG.startWeek}-${CONFIG.startWeek + 3})\n`);
    
    // Create output directory
    if (!fs.existsSync(CONFIG.outputFolder)) {
        fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
        console.log(`📁 Created output folder: ${CONFIG.outputFolder}\n`);
    }
    
    // Load vocabulary
    const vocabulary = loadVocabulary(CONFIG.vocabFile);
    
    // Load comprehension questions
    const questions = loadQuestions(CONFIG.questionsFile);
    
    // Load informational texts
    const informationalTexts = loadInformationalTexts(CONFIG.informationalFile);
    
    // Load informational text questions
    const infoQuestions = loadQuestions(CONFIG.informationalQuestionsFile);
    
    // Load weekly skills
    const skills = loadWeeklySkills(CONFIG.skillsFile);
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
            console.log(`  📖 Day ${lesson.day}: ${lesson.title}`);
            const html = generateRegularLesson(lesson, vocabulary, questions, informationalTexts, infoQuestions, skills);
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
    console.log(`\n🎉 Ready to use! Open any lesson file in a browser to test.\n`);
}

// Run the generator
if (require.main === module) {
    main();
}

module.exports = { generateRegularLesson, generateAssessmentLesson };

// Load JSON data files
function loadJSONData() {
    const informational = JSON.parse(fs.readFileSync(CONFIG.informationalFile, 'utf-8'));
    const questions = JSON.parse(fs.readFileSync(CONFIG.questionsFile, 'utf-8'));
    const skills = JSON.parse(fs.readFileSync(CONFIG.skillsFile, 'utf-8'));
    return { informational, questions, skills };
}

// Get week key (week29, week30, etc.)
function getWeekKey(week) {
    return `week${week}`;
}

console.log('\n📊 Loading additional content...');
const extraData = loadJSONData();
console.log('  ✓ Informational texts loaded');
console.log('  ✓ Comprehension questions loaded');
console.log('  ✓ Weekly skills loaded\n');

console.log('✅ ALL CONTENT READY!');
console.log('🔨 Regenerating lessons with complete content...\n');

// Re-run main with complete data
main();
