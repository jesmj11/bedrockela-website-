#!/usr/bin/env node
/**
 * Frankenstein Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 121-135) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/8th ela/Frankenstein/Frankenstein_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/Frankenstein/Frankenstein_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/Frankenstein/Frankenstein_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 121;

// ==================== VOCABULARY DATA ====================
const vocabularyWords = [
    // Week 25 (Days 121-125)
    'Pursuit', 'Arctic', 'Obsessed', 'Quarry', 'Demon', 'Philosophy', 'Alchemical', 'Ambition', 'Forbidden', 'Fascination',
    'Chemistry', 'Anatomy', 'Generation',
    // Week 26 (Days 126-130)
    'Professor', 'Modern', 'Experiments', 'Corpses', 'Electrical', 'Animation', 'Isolation',
    'Reanimation', 'Successfully', 'Appearance', 'Abandonment', 'Magnitude', 'Consequences', 'Murder', 'Innocent', 'Accused', 'Executed',
    // Week 27 (Days 131-135)
    'Confrontation', 'Responsibilities', 'Despair', 'Request', 'Proposal', 'Education', 'Observation', 'Literature', 'Language', 'Society',
    'Cottage', 'Family'
];

// Define vocabulary with definitions (placeholder - will be enhanced)
const vocabulary = {
    week25: [
        { word: 'Pursuit', definition: 'The action of following or chasing someone or something' },
        { word: 'Arctic', definition: 'Relating to the regions around the North Pole; extremely cold' },
        { word: 'Obsessed', definition: 'Preoccupied with or constantly thinking about something' },
        { word: 'Quarry', definition: 'A person or thing being hunted or sought' },
        { word: 'Demon', definition: 'An evil spirit or cruel, malevolent being' },
        { word: 'Philosophy', definition: 'The study of fundamental nature of knowledge, reality, and existence' },
        { word: 'Alchemical', definition: 'Relating to alchemy; attempting to transform base materials' },
        { word: 'Ambition', definition: 'A strong desire to achieve something, typically requiring hard work' },
        { word: 'Forbidden', definition: 'Not permitted; banned' },
        { word: 'Fascination', definition: 'The power to attract and hold intense interest' },
        { word: 'Chemistry', definition: 'The science of substances and how they interact' },
        { word: 'Anatomy', definition: 'The bodily structure of organisms' },
        { word: 'Generation', definition: 'The creation or production of something' }
    ],
    week26: [
        { word: 'Professor', definition: 'A university teacher of highest rank' },
        { word: 'Modern', definition: 'Relating to the present or recent times' },
        { word: 'Experiments', definition: 'Scientific procedures to test hypotheses' },
        { word: 'Corpses', definition: 'Dead bodies' },
        { word: 'Electrical', definition: 'Relating to or operated by electricity' },
        { word: 'Animation', definition: 'The state of being brought to life' },
        { word: 'Isolation', definition: 'The state of being alone or separated from others' },
        { word: 'Reanimation', definition: 'Restoration of life; bringing back to life' },
        { word: 'Successfully', definition: 'Accomplishing a desired aim or result' },
        { word: 'Appearance', definition: 'The way someone or something looks' },
        { word: 'Abandonment', definition: 'The action of leaving someone or something behind' },
        { word: 'Magnitude', definition: 'Great size or extent; importance' },
        { word: 'Consequences', definition: 'Results or effects of actions' }
    ],
    week27: [
        { word: 'Murder', definition: 'The unlawful premeditated killing of one person by another' },
        { word: 'Innocent', definition: 'Not guilty of a crime; pure and blameless' },
        { word: 'Accused', definition: 'Charged with an offense or crime' },
        { word: 'Executed', definition: 'Put to death as punishment for a crime' },
        { word: 'Confrontation', definition: 'A hostile or argumentative meeting between opposing parties' },
        { word: 'Responsibilities', definition: 'Duties or obligations one is expected to fulfill' },
        { word: 'Despair', definition: 'Complete loss or absence of hope' },
        { word: 'Request', definition: 'An act of asking politely or formally for something' },
        { word: 'Proposal', definition: 'A plan or suggestion put forward for consideration' },
        { word: 'Education', definition: 'The process of receiving or giving systematic instruction' },
        { word: 'Observation', definition: 'The action of watching carefully; a remark based on something seen' },
        { word: 'Literature', definition: 'Written works, especially those considered of superior or lasting value' }
    ]
};

// ==================== LOAD CHAPTER CONTENT ====================
console.log('📖 Loading chapter content...');
let allChapters = [];

try {
    for (const file of CHAPTER_FILES) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Split content by chapter markers
        const chapterMatches = content.split(/(?=^# Chapter \d+:)/gm);
        
        for (const chapterText of chapterMatches) {
            if (chapterText.trim() && chapterText.includes('# Chapter')) {
                const titleMatch = chapterText.match(/^# Chapter (\d+): (.+)/m);
                if (titleMatch) {
                    const chapterNum = parseInt(titleMatch[1]);
                    const title = titleMatch[2].trim();
                    
                    const storyContent = chapterText
                        .replace(/^# Chapter \d+: .+\n+/m, '')
                        .trim();
                    
                    if (storyContent) {
                        allChapters.push({
                            number: chapterNum,
                            title: title,
                            content: storyContent
                        });
                    }
                }
            }
        }
    }
    
    allChapters.sort((a, b) => a.number - b.number);
    console.log(`✅ Loaded ${allChapters.length} chapters`);
    
} catch (error) {
    console.error('❌ Error loading chapters:', error.message);
    process.exit(1);
}

// ==================== HELPER FUNCTIONS ====================

function splitIntoThreeParts(text) {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const third = Math.ceil(paragraphs.length / 3);
    
    return [
        paragraphs.slice(0, third).join('\n\n'),
        paragraphs.slice(third, third * 2).join('\n\n'),
        paragraphs.slice(third * 2).join('\n\n')
    ];
}

function getVocabForDay(dayNum) {
    const offset = (dayNum - START_DAY) * 3;
    const words = [];
    
    for (let i = 0; i < 3; i++) {
        const idx = offset + i;
        if (idx < vocabularyWords.length) {
            const word = vocabularyWords[idx];
            // Find definition
            let def = '';
            for (const week of Object.values(vocabulary)) {
                const found = week.find(v => v.word === word);
                if (found) {
                    def = found.definition;
                    break;
                }
            }
            words.push({ word, definition: def });
        }
    }
    
    return words;
}

function getVocabGameType(dayNum) {
    const dayOfWeek = ((dayNum - 1) % 5) + 1;
    const games = ['matching', 'fill-in-blank', 'sentence-writing', 'context-clues'];
    return games[dayOfWeek - 1] || 'matching';
}

function getGrammarOrLanguage(dayNum) {
    const dayOfWeek = ((dayNum - 1) % 5) + 1;
    
    if (dayOfWeek === 1 || dayOfWeek === 3) {
        return {
            type: 'grammar',
            topic: 'Gothic Literature Grammar',
            explanation: 'Placeholder grammar content',
            examples: [],
            exercises: []
        };
    } else if (dayOfWeek === 2 || dayOfWeek === 4) {
        return {
            type: 'language',
            topic: 'Science Vocabulary',
            explanation: 'Placeholder language content',
            examples: [],
            exercises: []
        };
    }
    
    return null;
}

// ==================== LESSON TEMPLATE ====================

function generateLessonHTML(dayNum, config) {
    const lessonId = `8th-grade-day-${String(dayNum).padStart(3, '0')}`;
    const filename = `${lessonId}.html`;
    
    const pagesJSON = JSON.stringify(config.pages, null, 4);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <link rel="stylesheet" href="css/student-dashboard.css">
</head>
<body>
    <div class="lesson-container">
        <div class="lesson-content" id="lesson-content"></div>
        
        <div class="navigation-arrows">
            <button class="nav-arrow nav-prev" id="prevBtn" style="display:none;">← Previous</button>
            <button class="nav-arrow nav-next" id="nextBtn">Next →</button>
        </div>
        
        <div class="progress-indicator">
            <span id="pageIndicator">Page 1 of ${config.pages.length}</span>
        </div>
    </div>

    <script>
        const lessonData = ${pagesJSON};
        
        let currentPage = 0;
        
        function renderPage(pageIndex) {
            const page = lessonData[pageIndex];
            const content = document.getElementById('lesson-content');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const pageIndicator = document.getElementById('pageIndicator');
            
            content.innerHTML = page.html;
            
            prevBtn.style.display = pageIndex > 0 ? 'block' : 'none';
            nextBtn.textContent = pageIndex === lessonData.length - 1 ? 'Complete Lesson →' : 'Next →';
            
            pageIndicator.textContent = \`Page \${pageIndex + 1} of \${lessonData.length}\`;
            
            currentPage = pageIndex;
            window.scrollTo(0, 0);
        }
        
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (currentPage > 0) {
                renderPage(currentPage - 1);
            }
        });
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            if (currentPage < lessonData.length - 1) {
                renderPage(currentPage + 1);
            } else {
                window.location.href = 'student-dashboard.html';
            }
        });
        
        renderPage(0);
    </script>
</body>
</html>`;
}

// ==================== PAGE GENERATORS ====================

function generateTitlePage(dayNum, weekNum, chapters) {
    return {
        html: `
            <div class="page-card title-page">
                <h1>📚 8th Grade English Language Arts</h1>
                <h2>Day ${dayNum} - Week ${weekNum}</h2>
                <h3>Frankenstein</h3>
                <p class="subtitle">Chapters ${chapters.join(', ')}</p>
                <p class="instruction">Click "Next" to begin today's lesson.</p>
            </div>
        `
    };
}

function generateWelcomePage(dayNum, objectives) {
    return {
        html: `
            <div class="page-card">
                <h2>📖 Welcome to Day ${dayNum}!</h2>
                <h3>Today's Objectives:</h3>
                <ul class="objectives-list">
                    ${objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
                <p class="instruction">Let's begin!</p>
            </div>
        `
    };
}

function generateVocabularyPage(vocab) {
    return {
        html: `
            <div class="page-card">
                <h2>📝 Vocabulary</h2>
                <div class="vocabulary-section">
                    ${vocab.map(v => `
                        <div class="vocab-word">
                            <h3>${v.word}</h3>
                            <p><strong>Definition:</strong> ${v.definition}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `
    };
}

function generateVocabPracticePage(vocab, gameType) {
    return {
        html: `
            <div class="page-card">
                <h2>🎮 Vocabulary Practice</h2>
                <p class="instruction">Practice using today's vocabulary words.</p>
                <p><em>Game type: ${gameType}</em></p>
                <p class="placeholder">Interactive ${gameType} game will be added here.</p>
            </div>
        `
    };
}

function generateStoryPage(partNum, totalParts, content) {
    return {
        html: `
            <div class="page-card story-page">
                <h2>📖 Story (Part ${partNum} of ${totalParts})</h2>
                <div class="story-content">
                    ${content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>
            </div>
        `
    };
}

function generateComprehensionPage(questions) {
    return {
        html: `
            <div class="page-card">
                <h2>❓ Reading Comprehension</h2>
                ${questions.map((q, i) => `
                    <div class="comprehension-question">
                        <p><strong>${i + 1}. ${q.question}</strong></p>
                        <div class="answer-options">
                            ${q.options.map((opt, j) => `
                                <label>
                                    <input type="radio" name="q${i}" value="${String.fromCharCode(65 + j)}">
                                    ${String.fromCharCode(65 + j)}. ${opt}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `
    };
}

function generateGrammarLanguagePage(content) {
    if (!content) return null;
    
    return {
        html: `
            <div class="page-card">
                <h2>✏️ ${content.type === 'grammar' ? 'Grammar' : 'Language'}</h2>
                <h3>${content.topic}</h3>
                <p><strong>Explanation:</strong> ${content.explanation}</p>
                <p class="placeholder">Full grammar/language content will be added.</p>
            </div>
        `
    };
}

function generateInformationalPage(dayNum) {
    return {
        html: `
            <div class="page-card">
                <h2>📰 Informational Text</h2>
                <p class="placeholder">Informational reading passage for Day ${dayNum} will be added here.</p>
            </div>
        `
    };
}

function generateWritingPage(dayNum) {
    const dayOfWeek = ((dayNum - 1) % 5) + 1;
    const isJournal = (dayOfWeek === 2 || dayOfWeek === 4);
    
    return {
        html: `
            <div class="page-card">
                <h2>✍️ ${isJournal ? 'Journal' : 'Writing Skills'}</h2>
                <p class="instruction">${isJournal ? 'Respond to today\'s journal prompt:' : 'Complete today\'s writing exercise:'}</p>
                <p class="placeholder">Writing prompt will be added here.</p>
            </div>
        `
    };
}

function generateCompletionPage(dayNum) {
    return {
        html: `
            <div class="page-card completion-page">
                <h1>🎉 Great Work!</h1>
                <p>You've completed Day ${dayNum}!</p>
                <p class="instruction">Click "Complete Lesson" to return to your dashboard.</p>
            </div>
        `
    };
}

// ==================== ASSESSMENT GENERATOR ====================

function generateAssessmentLesson(dayNum, weekNum) {
    const pages = [];
    
    pages.push({
        html: `
            <div class="page-card title-page">
                <h1>📚 8th Grade English Language Arts</h1>
                <h2>Day ${dayNum} - Week ${weekNum}</h2>
                <h3>Frankenstein - Assessment</h3>
                <p class="instruction">Click "Next" to begin your assessment.</p>
            </div>
        `
    });
    
    pages.push({
        html: `
            <div class="page-card">
                <h2>📝 Vocabulary Quiz</h2>
                <p class="placeholder">Vocabulary quiz will be added here.</p>
            </div>
        `
    });
    
    pages.push({
        html: `
            <div class="page-card">
                <h2>✏️ Grammar & Language Review</h2>
                <p class="placeholder">Grammar and language review exercises will be added here.</p>
            </div>
        `
    });
    
    pages.push({
        html: `
            <div class="page-card">
                <h2>📖 Comprehension Review</h2>
                <p class="placeholder">Comprehension questions covering this week's chapters will be added here.</p>
            </div>
        `
    });
    
    pages.push({
        html: `
            <div class="page-card">
                <h2>✍️ Writing Prompt</h2>
                <p class="placeholder">Essay prompt will be added here.</p>
            </div>
        `
    });
    
    pages.push(generateCompletionPage(dayNum));
    
    return {
        title: `Day ${dayNum} - Assessment`,
        pages: pages
    };
}

// ==================== REGULAR LESSON GENERATOR ====================

function generateRegularLesson(dayNum, weekNum, chapterNums) {
    const pages = [];
    
    const dayChapters = chapterNums.map(num => allChapters.find(ch => ch.number === num)).filter(Boolean);
    
    if (dayChapters.length === 0) {
        console.error(`❌ No chapters found for day ${dayNum}`);
        return null;
    }
    
    const combinedContent = dayChapters.map(ch => ch.content).join('\n\n');
    const storyParts = splitIntoThreeParts(combinedContent);
    
    pages.push(generateTitlePage(dayNum, weekNum, chapterNums));
    
    const objectives = [
        'Read and analyze chapters from Frankenstein',
        'Learn and practice 3 new vocabulary words',
        'Apply comprehension strategies',
        'Complete grammar or language exercises'
    ];
    pages.push(generateWelcomePage(dayNum, objectives));
    
    const vocab = getVocabForDay(dayNum);
    pages.push(generateVocabularyPage(vocab));
    
    const gameType = getVocabGameType(dayNum);
    pages.push(generateVocabPracticePage(vocab, gameType));
    
    storyParts.forEach((part, i) => {
        pages.push(generateStoryPage(i + 1, 3, part));
    });
    
    const questions = [
        {
            question: 'What drove Victor Frankenstein in this section?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        },
        {
            question: 'How did the creature change?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        },
        {
            question: 'What were the consequences of Victor\'s actions?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        }
    ];
    pages.push(generateComprehensionPage(questions));
    
    const grammarContent = getGrammarOrLanguage(dayNum);
    if (grammarContent) {
        pages.push(generateGrammarLanguagePage(grammarContent));
    }
    
    pages.push(generateInformationalPage(dayNum));
    pages.push(generateWritingPage(dayNum));
    pages.push(generateCompletionPage(dayNum));
    
    return {
        title: `Day ${dayNum} - Frankenstein`,
        pages: pages
    };
}

// ==================== MAIN GENERATION ====================

console.log('\n🚀 Generating Frankenstein lessons (Days 121-135)...\n');

// Chapter mapping (2 chapters per regular day)
const chapterMap = {
    121: [1, 2], 122: [3, 4], 123: [5, 6], 124: [7, 8], 125: null,
    126: [9, 10], 127: [11, 12], 128: [13, 14], 129: [15, 16], 130: null,
    131: [17, 18], 132: [19, 20], 133: [21, 22], 134: [23, 24], 135: null
};

let generatedCount = 0;

for (let day = START_DAY; day <= START_DAY + 14; day++) {
    const weekNum = Math.floor((day - START_DAY) / 5) + 25; // Week 25-27
    const chapters = chapterMap[day];
    
    let lessonConfig;
    
    if (chapters === null) {
        lessonConfig = generateAssessmentLesson(day, weekNum);
    } else {
        lessonConfig = generateRegularLesson(day, weekNum, chapters);
    }
    
    if (lessonConfig) {
        const html = generateLessonHTML(day, lessonConfig);
        const filename = `8th-grade-day-${String(day).padStart(3, '0')}.html`;
        const filepath = path.join(OUTPUT_DIR, filename);
        
        fs.writeFileSync(filepath, html, 'utf8');
        console.log(`✅ Generated: ${filename}`);
        generatedCount++;
    }
}

console.log(`\n🎉 Done! Generated ${generatedCount} lessons (Days ${START_DAY}-${START_DAY + 14})\n`);
