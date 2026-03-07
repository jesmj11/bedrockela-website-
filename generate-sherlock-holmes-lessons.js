#!/usr/bin/env node
/**
 * Sherlock Holmes Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 61-75) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/8th ela/sherlock/Sherlock_Holmes_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/sherlock/Sherlock_Holmes_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/sherlock/Sherlock_Holmes_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 61;

// ==================== VOCABULARY DATA ====================
const vocabularyWords = [
    // Week 13 (Days 61-65)
    'Detection', 'Deductive', 'Observation',
    'Bizarre', 'Mastermind', 'Elaborate',
    'Precious', 'Gothic', 'Murderous',
    'Deception', 'Counterfeiting', 'Machinery',
    'Innocence', 'Conspiracy', 'Revenge',
    // Week 14 (Days 66-70)
    'Nemesis', 'Network', 'Underworld',
    'Gambit', 'Inevitable', 'Confrontation',
    'Ultimate', 'Intellect', 'Hiatus',
    'Resurrection', 'Framed', 'Elaborate',
    'Cracks', 'Solitary', 'Inheritance',
    // Week 15 (Days 71-72)
    'Fortune', 'Document', 'Security',
    'Methods', 'Reasoning', 'Legacy'
];

// Define vocabulary with definitions
const vocabulary = {
    week13: [
        { word: 'Detection', definition: 'The action or process of discovering or identifying something' },
        { word: 'Deductive', definition: 'Based on logical reasoning from general principles to specific conclusions' },
        { word: 'Observation', definition: 'The action of closely watching and noticing details' },
        { word: 'Bizarre', definition: 'Very strange or unusual' },
        { word: 'Mastermind', definition: 'A person with outstanding intellect who plans and directs an operation' },
        { word: 'Elaborate', definition: 'Involving many carefully arranged parts or details; intricate' },
        { word: 'Precious', definition: 'Of great value; not to be wasted or treated carelessly' },
        { word: 'Gothic', definition: 'Relating to a style of architecture or literature with dark, mysterious elements' },
        { word: 'Murderous', definition: 'Capable of or intending to murder; dangerously violent' },
        { word: 'Deception', definition: 'The action of deceiving someone; a trick or fraud' },
        { word: 'Counterfeiting', definition: 'Making an imitation of something with intent to deceive or defraud' },
        { word: 'Machinery', definition: 'Machines collectively; mechanical equipment' }
    ],
    week14: [
        { word: 'Innocence', definition: 'The state of being not guilty of a crime or offense' },
        { word: 'Conspiracy', definition: 'A secret plan by a group to do something unlawful or harmful' },
        { word: 'Revenge', definition: 'The action of inflicting hurt or harm for an injury or wrong' },
        { word: 'Nemesis', definition: 'An archenemy; a longstanding rival or opponent' },
        { word: 'Network', definition: 'A group of interconnected people or organizations' },
        { word: 'Underworld', definition: 'The world of criminals and organized crime' },
        { word: 'Gambit', definition: 'A calculated move or strategy, especially one involving sacrifice' },
        { word: 'Inevitable', definition: 'Certain to happen; unavoidable' },
        { word: 'Confrontation', definition: 'A hostile or argumentative meeting or situation between opposing parties' },
        { word: 'Ultimate', definition: 'Being the best or most extreme example of its kind; final' },
        { word: 'Intellect', definition: 'The faculty of reasoning and understanding objectively' },
        { word: 'Hiatus', definition: 'A pause or gap in a sequence, series, or process' }
    ],
    week15: [
        { word: 'Resurrection', definition: 'The action of bringing something back to life or use' },
        { word: 'Framed', definition: 'Falsely incriminated for a crime' },
        { word: 'Elaborate', definition: 'Involving many carefully arranged parts or details; intricate' },
        { word: 'Cracks', definition: 'Solves or decodes (as in cracking a code)' },
        { word: 'Solitary', definition: 'Done or existing alone; isolated' },
        { word: 'Inheritance', definition: 'Property or money passed down from previous generations' },
        { word: 'Fortune', definition: 'A large amount of money or assets; wealth' },
        { word: 'Document', definition: 'A piece of written, printed, or electronic matter providing information or evidence' },
        { word: 'Security', definition: 'The state of being free from danger or threat; safety' },
        { word: 'Methods', definition: 'Particular procedures for accomplishing or approaching something' },
        { word: 'Reasoning', definition: 'The action of thinking about something in a logical, sensible way' },
        { word: 'Legacy', definition: 'Something left or handed down by a predecessor' }
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
            topic: 'Mystery Writing Grammar',
            explanation: 'Placeholder grammar content',
            examples: [],
            exercises: []
        };
    } else if (dayOfWeek === 2 || dayOfWeek === 4) {
        return {
            type: 'language',
            topic: 'Detective Vocabulary',
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
                <h3>Sherlock Holmes</h3>
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
    
    // Title page
    pages.push({
        html: `
            <div class="page-card title-page">
                <h1>📚 8th Grade English Language Arts</h1>
                <h2>Day ${dayNum} - Week ${weekNum}</h2>
                <h3>Sherlock Holmes - Assessment</h3>
                <p class="instruction">Click "Next" to begin your assessment.</p>
            </div>
        `
    });
    
    // Vocabulary quiz
    const weekVocab = dayNum === 65 ? vocabulary.week13 :
                      dayNum === 70 ? vocabulary.week14 :
                      vocabulary.week15;
    
    pages.push({
        html: `
            <div class="page-card">
                <h2>📝 Vocabulary Quiz</h2>
                <p class="instruction">Match each word with its definition.</p>
                <p class="placeholder">Vocabulary quiz for ${weekVocab.length} words will be added here.</p>
            </div>
        `
    });
    
    // Grammar/Language review
    pages.push({
        html: `
            <div class="page-card">
                <h2>✏️ Grammar & Language Review</h2>
                <p class="placeholder">Grammar and language review exercises will be added here.</p>
            </div>
        `
    });
    
    // Comprehension review
    pages.push({
        html: `
            <div class="page-card">
                <h2>📖 Comprehension Review</h2>
                <p class="placeholder">Comprehension questions covering this week's chapters will be added here.</p>
            </div>
        `
    });
    
    // Writing prompt
    pages.push({
        html: `
            <div class="page-card">
                <h2>✍️ Writing Prompt</h2>
                <p class="placeholder">Essay prompt will be added here.</p>
            </div>
        `
    });
    
    // Completion
    pages.push(generateCompletionPage(dayNum));
    
    return {
        title: `Day ${dayNum} - Assessment`,
        pages: pages
    };
}

// ==================== REGULAR LESSON GENERATOR ====================

function generateRegularLesson(dayNum, weekNum, chapterNums) {
    const pages = [];
    
    // Get chapters for this day
    const dayChapters = chapterNums.map(num => allChapters.find(ch => ch.number === num)).filter(Boolean);
    
    if (dayChapters.length === 0) {
        console.error(`❌ No chapters found for day ${dayNum}`);
        return null;
    }
    
    // Combine chapter content
    const combinedContent = dayChapters.map(ch => ch.content).join('\n\n');
    const storyParts = splitIntoThreeParts(combinedContent);
    
    // 1. Title page
    pages.push(generateTitlePage(dayNum, weekNum, chapterNums));
    
    // 2. Welcome & objectives
    const objectives = [
        'Read and analyze chapters from Sherlock Holmes',
        'Learn and practice 3 new vocabulary words',
        'Apply comprehension strategies',
        'Complete grammar or language exercises'
    ];
    pages.push(generateWelcomePage(dayNum, objectives));
    
    // 3. Vocabulary
    const vocab = getVocabForDay(dayNum);
    pages.push(generateVocabularyPage(vocab));
    
    // 4. Vocab practice game
    const gameType = getVocabGameType(dayNum);
    pages.push(generateVocabPracticePage(vocab, gameType));
    
    // 5-7. Story (3 parts)
    storyParts.forEach((part, i) => {
        pages.push(generateStoryPage(i + 1, 3, part));
    });
    
    // 8. Comprehension
    const questions = [
        {
            question: 'What was the main mystery in this section?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        },
        {
            question: 'How did Holmes solve the case?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        },
        {
            question: 'What clues were most important?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        }
    ];
    pages.push(generateComprehensionPage(questions));
    
    // 9. Grammar or Language
    const grammarContent = getGrammarOrLanguage(dayNum);
    if (grammarContent) {
        pages.push(generateGrammarLanguagePage(grammarContent));
    }
    
    // 10. Informational text
    pages.push(generateInformationalPage(dayNum));
    
    // 11. Writing
    pages.push(generateWritingPage(dayNum));
    
    // 12. Completion
    pages.push(generateCompletionPage(dayNum));
    
    return {
        title: `Day ${dayNum} - Sherlock Holmes`,
        pages: pages
    };
}

// ==================== MAIN GENERATION ====================

console.log('\n🚀 Generating Sherlock Holmes lessons (Days 61-75)...\n');

// Chapter mapping (2 chapters per regular day)
const chapterMap = {
    61: [1, 2], 62: [3, 4], 63: [5, 6], 64: [7, 8], 65: null, // Assessment
    66: [11, 12], 67: [13, 14], 68: [15, 16], 69: [17, 18], 70: null, // Assessment
    71: [21, 22], 72: [23, 24], 73: null, 74: null, 75: null // Review/Writing/Assessment
};

let generatedCount = 0;

for (let day = START_DAY; day <= START_DAY + 14; day++) {
    const weekNum = Math.floor((day - START_DAY) / 5) + 13; // Week 13-15
    const chapters = chapterMap[day];
    
    let lessonConfig;
    
    if (chapters === null) {
        // Assessment or review day
        lessonConfig = generateAssessmentLesson(day, weekNum);
    } else {
        // Regular lesson
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
