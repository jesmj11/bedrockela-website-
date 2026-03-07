#!/usr/bin/env node
/**
 * Dorian Gray Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 166-180) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/8th ela/dorian/Dorian_Gray_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/dorian/Dorian_Gray_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/dorian/Dorian_Gray_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 166;

// ==================== VOCABULARY DATA ====================
const vocabularyWords = [
    // Week 34 (Days 166-170)
    'Corrupted', 'Portrait', 'Revelation', 'Unnatural', 'Damnation', 'Obsession', 'Perfection', 'Masterpiece', 'Captures', 'Representation',
    'Philosopher', 'Hedonistic', 'Temptation',
    // Week 35 (Days 171-175)
    'Corruption', 'Sophisticated', 'Fatal', 'Glimpse', 'Desperate', 'Supernatural', 'Bargain',
    'Infatuation', 'Actress', 'Overwhelming', 'Rejection', 'Mercy', 'Cruelty', 'Realization', 'Embrace', 'Lifestyle', 'Consequences',
    // Week 36 (Days 176-180)
    'Tragedy', 'Suicide', 'Abandonment', 'Justification', 'Callous', 'Celebrating', 'Decadence', 'Systematic', 'Intellectual', 'Poison',
    'Decay', 'Montage'
];

// Define vocabulary with definitions
const vocabulary = {
    week34: [
        { word: 'Corrupted', definition: 'Made morally depraved; changed from good to bad' },
        { word: 'Portrait', definition: 'A painting, drawing, or photograph of a person' },
        { word: 'Revelation', definition: 'A surprising and previously unknown fact that has been disclosed' },
        { word: 'Unnatural', definition: 'Contrary to the ordinary course of nature; abnormal' },
        { word: 'Damnation', definition: 'Condemnation to eternal punishment in hell' },
        { word: 'Obsession', definition: 'An idea or thought that continually preoccupies or intrudes on a person\'s mind' },
        { word: 'Perfection', definition: 'The state of being free from all flaws or defects' },
        { word: 'Masterpiece', definition: 'A work of outstanding artistry or skill' },
        { word: 'Captures', definition: 'Records or represents accurately in words or pictures' },
        { word: 'Representation', definition: 'The action of depicting or portraying something' },
        { word: 'Philosopher', definition: 'A person engaged in philosophical inquiry; a deep thinker' },
        { word: 'Hedonistic', definition: 'Engaged in the pursuit of pleasure; devoted to sensual indulgence' },
        { word: 'Temptation', definition: 'The desire to do something wrong or unwise' }
    ],
    week35: [
        { word: 'Corruption', definition: 'Dishonest or fraudulent conduct; moral decay' },
        { word: 'Sophisticated', definition: 'Having a refined knowledge of the ways of the world; complex' },
        { word: 'Fatal', definition: 'Leading to failure or disaster; causing death' },
        { word: 'Glimpse', definition: 'A momentary or partial view' },
        { word: 'Desperate', definition: 'Feeling or showing hopelessness' },
        { word: 'Supernatural', definition: 'Beyond scientific understanding or the laws of nature' },
        { word: 'Bargain', definition: 'An agreement between two parties as to what each will do for the other' },
        { word: 'Infatuation', definition: 'An intense but short-lived passion or admiration' },
        { word: 'Actress', definition: 'A female performer in plays, films, or television' },
        { word: 'Overwhelming', definition: 'Very great in amount; overpowering' },
        { word: 'Rejection', definition: 'The dismissing or refusing of a proposal or idea' },
        { word: 'Mercy', definition: 'Compassion or forgiveness shown toward someone' },
        { word: 'Cruelty', definition: 'Callous indifference to or pleasure in causing pain and suffering' }
    ],
    week36: [
        { word: 'Realization', definition: 'An act of becoming fully aware of something as a fact' },
        { word: 'Embrace', definition: 'Accept or support willingly and enthusiastically' },
        { word: 'Lifestyle', definition: 'The way in which a person lives' },
        { word: 'Consequences', definition: 'Results or effects of an action or condition' },
        { word: 'Tragedy', definition: 'An event causing great suffering or destruction; a serious drama with an unhappy ending' },
        { word: 'Suicide', definition: 'The act of intentionally causing one\'s own death' },
        { word: 'Abandonment', definition: 'The action of giving up or leaving behind completely' },
        { word: 'Justification', definition: 'The action of showing something to be right or reasonable' },
        { word: 'Callous', definition: 'Showing or having an insensitive and cruel disregard for others' },
        { word: 'Celebrating', definition: 'Acknowledging a significant event with a social gathering or enjoyable activity' },
        { word: 'Decadence', definition: 'Moral or cultural decline as characterized by excessive indulgence in pleasure' },
        { word: 'Systematic', definition: 'Done according to a system or organized method' }
    ]
};

// ==================== LOAD CHAPTER CONTENT ====================
console.log('📖 Loading chapter content...');
let allChapters = [];

try {
    for (const file of CHAPTER_FILES) {
        const content = fs.readFileSync(file, 'utf8');
        
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
            topic: 'Aestheticism & Morality in Writing',
            explanation: 'Placeholder grammar content',
            examples: [],
            exercises: []
        };
    } else if (dayOfWeek === 2 || dayOfWeek === 4) {
        return {
            type: 'language',
            topic: 'Victorian Era Vocabulary',
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
                <h3>The Picture of Dorian Gray</h3>
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
                <h3>Dorian Gray - Assessment</h3>
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
        'Read and analyze chapters from The Picture of Dorian Gray',
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
            question: 'How does Dorian\'s portrait reflect his moral state?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        },
        {
            question: 'What influence does Lord Henry have on Dorian?',
            options: ['Option A', 'Option B', 'Option C', 'Option D']
        },
        {
            question: 'What does beauty mean in this story?',
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
        title: `Day ${dayNum} - Dorian Gray`,
        pages: pages
    };
}

// ==================== MAIN GENERATION ====================

console.log('\n🚀 Generating Dorian Gray lessons (Days 166-180)...\n');

const chapterMap = {
    166: [1, 2], 167: [3, 4], 168: [5, 6], 169: [7, 8], 170: null,
    171: [9, 10], 172: [11, 12], 173: [13, 14], 174: [15, 16], 175: null,
    176: [17, 18], 177: [19, 20], 178: [21, 22], 179: [23, 24], 180: null
};

let generatedCount = 0;

for (let day = START_DAY; day <= START_DAY + 14; day++) {
    const weekNum = Math.floor((day - START_DAY) / 5) + 34; // Week 34-36
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
