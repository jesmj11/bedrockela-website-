#!/usr/bin/env node
/**
 * Mysterious Island Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 46-60) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/Mysterious_Island_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/Mysterious_Island_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/Mysterious_Island_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 46;

// ==================== VOCABULARY DATA ====================
const vocabulary = {
    week10: [
        // Day 46
        { word: 'audacious', definition: 'bold; daring' },
        { word: 'turbulent', definition: 'violently disturbed' },
        { word: 'atmospheric', definition: 'relating to the atmosphere' },
        // Day 47
        { word: 'disoriented', definition: 'confused about direction' },
        { word: 'priorities', definition: 'most important things' },
        { word: 'vegetation', definition: 'plant life' },
        // Day 48
        { word: 'consciousness', definition: 'awareness' },
        { word: 'precision', definition: 'exactness' },
        { word: 'makeshift', definition: 'temporary' },
        // Day 49
        { word: 'engineering', definition: 'design and building' },
        { word: 'hydraulic', definition: 'operated by water pressure' },
        { word: 'combustion', definition: 'process of burning' }
    ],
    week11: [
        // Day 51
        { word: 'geological', definition: 'relating to earth\'s structure' },
        { word: 'erosion', definition: 'wearing away by natural forces' },
        { word: 'irrigation', definition: 'supplying water to crops' },
        // Day 52
        { word: 'benefactor', definition: 'person who helps others' },
        { word: 'systematic', definition: 'organized; methodical' },
        { word: 'intervention', definition: 'getting involved to help' },
        // Day 53
        { word: 'ambitious', definition: 'requiring great effort' },
        { word: 'architectural', definition: 'relating to building design' },
        { word: 'excavate', definition: 'dig out' },
        // Day 54
        { word: 'artillery', definition: 'large mounted guns' },
        { word: 'strategic', definition: 'relating to long-term planning' },
        { word: 'coordination', definition: 'organizing together' }
    ],
    week12: [
        // Day 56
        { word: 'legendary', definition: 'famous in legend' },
        { word: 'technological', definition: 'relating to technology' },
        { word: 'breakthrough', definition: 'important discovery' },
        // Day 57
        { word: 'theoretical', definition: 'based on theory' },
        { word: 'sustainable', definition: 'able to continue' },
        { word: 'revolutionary', definition: 'completely new' },
        // Day 58
        { word: 'volcanic', definition: 'relating to volcanoes' },
        { word: 'catastrophic', definition: 'extremely harmful' },
        { word: 'seismic', definition: 'relating to earthquakes' },
        // Day 59
        { word: 'legacy', definition: 'something left behind' },
        { word: 'innovation', definition: 'new method' },
        { word: 'civilization', definition: 'advanced human society' }
    ]
};

// ==================== LOAD CHAPTER CONTENT ====================
console.log('📖 Loading chapter content...');
let allChapters = [];

try {
    for (const file of CHAPTER_FILES) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Split content by chapter markers (single # for main chapters)
        const chapterMatches = content.split(/(?=^# Chapter \d+:)/gm);
        
        for (const chapterText of chapterMatches) {
            if (chapterText.trim() && chapterText.includes('# Chapter')) {
                // Extract chapter number and title
                const titleMatch = chapterText.match(/^# Chapter (\d+): (.+)/m);
                if (titleMatch) {
                    const chapterNum = parseInt(titleMatch[1]);
                    const title = titleMatch[2].trim();
                    
                    // Extract the story content (everything after the title line until next chapter or end)
                    const storyContent = chapterText
                        .replace(/^# Chapter \d+: .+\n+/m, '') // Remove title line
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
    // Days 46-49 use week10, days 51-54 use week11, days 56-59 use week12
    // Days 50, 55, 60 are assessments
    
    if (dayNum >= 46 && dayNum <= 49) {
        const offset = (dayNum - 46) * 3;
        return vocabulary.week10.slice(offset, offset + 3);
    } else if (dayNum >= 51 && dayNum <= 54) {
        const offset = (dayNum - 51) * 3;
        return vocabulary.week11.slice(offset, offset + 3);
    } else if (dayNum >= 56 && dayNum <= 59) {
        const offset = (dayNum - 56) * 3;
        return vocabulary.week12.slice(offset, offset + 3);
    }
    
    return [];
}

function getVocabGameType(dayNum) {
    const dayOfWeek = ((dayNum - 1) % 5) + 1; // 1-5 (Mon-Fri)
    const games = ['matching', 'fill-in-blank', 'sentence-writing', 'context-clues'];
    return games[dayOfWeek - 1] || 'matching';
}

function getGrammarOrLanguage(dayNum) {
    const dayOfWeek = ((dayNum - 1) % 5) + 1;
    
    if (dayOfWeek === 1 || dayOfWeek === 3) {
        // Grammar days
        if (dayNum === 1) {
            return {
                type: 'grammar',
                topic: 'Verbals - Gerunds and Participles',
                explanation: 'Verbals are verb forms that function as other parts of speech. Gerunds (-ing words) act as nouns. Participles (-ing or -ed words) act as adjectives.',
                examples: [
                    'Exploring the plateau required careful planning. (gerund as subject)',
                    'The roaring dinosaur charged toward the camp. (participle as adjective)',
                    'Cyrus enjoyed documenting the expedition. (gerund as object)'
                ],
                exercises: [
                    'Identify the verbal in this sentence: "The scientists hoped discovering dinosaurs would change their lives."',
                    'Write a sentence using a gerund as the subject.',
                    'Write a sentence using a participle to describe a character from the story.'
                ]
            };
        } else if (dayNum === 3) {
            return {
                type: 'grammar',
                topic: 'Active vs. Passive Voice',
                explanation: 'Active voice: subject performs the action (clear, direct). Passive voice: subject receives the action (can be weaker or deliberately evasive). Use active voice for stronger writing.',
                examples: [
                    'PASSIVE: The plateau was discovered by Professor Challenger.',
                    'ACTIVE: Professor Challenger discovered the plateau.',
                    'ACTIVE: The T-Rex chased the expedition team through the jungle.'
                ],
                exercises: [
                    'Convert to active voice: "The camp was destroyed by the dinosaurs."',
                    'Explain why this sentence is stronger in active voice: "Cyrus took photographs of the creatures."',
                    'Write a sentence about the story in active voice, then rewrite it in passive voice. Which is better? Why?'
                ]
            };
        }
    } else if (dayOfWeek === 2 || dayOfWeek === 4) {
        // Language days
        if (dayNum === 2) {
            return {
                type: 'language',
                topic: 'Context Clues - Using Surrounding Text',
                explanation: 'Context clues help you figure out word meanings from surrounding text. Types: definition (word is defined), example (examples given), contrast (opposite shown), inference (use logic).',
                examples: [
                    '"The terrain was treacherous, with hidden crevasses and loose rocks." (example clues)',
                    '"Unlike the skeptical Dr. Summerlee, Professor Challenger was absolutely certain." (contrast clues)',
                    '"The plateau\'s biodiversity amazed them - species found nowhere else on Earth." (definition clues)'
                ],
                exercises: [
                    'Use context clues to define "indigenous" in: "The indigenous species had evolved in isolation for millions of years."',
                    'What type of context clue is used in: "The expedition was formidable - the size and danger of the task inspired both fear and respect"?',
                    'Write a sentence using a vocabulary word with context clues to help a reader understand it.'
                ]
            };
        } else if (dayNum === 4) {
            return {
                type: 'language',
                topic: 'Greek & Latin Roots - "bio", "geo", "zoo"',
                explanation: 'Many English words come from Greek and Latin roots. Understanding roots helps you decode unfamiliar words. "bio" = life, "geo" = earth, "zoo" = animal.',
                examples: [
                    'biology = bio (life) + logy (study) = study of life',
                    'geology = geo (earth) + logy (study) = study of Earth',
                    'zoology = zoo (animal) + logy (study) = study of animals',
                    'biodiversity = bio (life) + diversity (variety) = variety of life',
                    'geographical = geo (earth) + graph (write) + ical (relating to) = relating to Earth\'s features'
                ],
                exercises: [
                    'Break down "geothermal" using the root "geo" and predict its meaning.',
                    'What does "biography" mean? (Hint: bio + graph)',
                    'List three more words that use "bio", "geo", or "zoo" as a root.'
                ]
            };
        }
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
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
</head>
<body class="lesson-viewer">
    <div id="lesson-container"></div>

    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>

    <script>
        const lesson${dayNum}Config = {
            lessonId: '${lessonId}',
            gradeLevel: '8th-grade',
            title: '${config.title}',
            pages: ${pagesJSON}
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${dayNum}Config);
        } else {
            console.error('initLessonViewer function not found!');
        }
    </script>
</body>
</html>`;
}

// ==================== BUILD REGULAR LESSON ====================

function buildRegularLesson(dayNum) {
    console.log(`\n📝 Building Day ${dayNum}...`);
    
    // Map days to chapters (skipping assessment days 50, 55, 60)
    // Days 46-49 → chapters 1-8 (indices 0-7)
    // Days 51-54 → chapters 9-16 (indices 8-15)
    // Days 56-59 → chapters 17-24 (indices 16-23)
    let readingDayIndex;
    if (dayNum <= 49) {
        readingDayIndex = dayNum - 46; // 0, 1, 2, 3
    } else if (dayNum >= 51 && dayNum <= 54) {
        readingDayIndex = 4 + (dayNum - 51); // 4, 5, 6, 7
    } else if (dayNum >= 56) {
        readingDayIndex = 8 + (dayNum - 56); // 8, 9, 10, 11
    }
    
    const chaptersPerDay = 2;
    const startChapter = readingDayIndex * chaptersPerDay;
    const endChapter = startChapter + chaptersPerDay - 1;
    
    const chapter1 = allChapters[startChapter];
    const chapter2 = allChapters[endChapter];
    
    if (!chapter1 || !chapter2) {
        console.error(`❌ Missing chapters for day ${dayNum}`);
        return null;
    }
    
    console.log(`   Chapters ${chapter1.number} & ${chapter2.number}`);
    
    // Combine both chapters
    const combinedStory = `## ${chapter1.title}\n\n${chapter1.content}\n\n---\n\n## ${chapter2.title}\n\n${chapter2.content}`;
    const [storyPart1, storyPart2, storyPart3] = splitIntoThreeParts(combinedStory);
    
    // Get vocabulary for this day
    const vocabWords = getVocabForDay(dayNum);
    
    // Get grammar/language content
    const skillContent = getGrammarOrLanguage(dayNum);
    
    const weekNum = Math.floor((dayNum - 1) / 5) + 1;
    const dayOfWeek = ((dayNum - 1) % 5) + 1;
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const dayName = dayNames[dayOfWeek - 1];
    
    const config = {
        title: `Day ${dayNum} - The Mysterious Island`,
        pages: [
            // Page 1: Title
            {
                type: 'title',
                content: `
                    <h1>Day ${dayNum}</h1>
                    <h2>The Mysterious Island</h2>
                    <p class="unit-label">8th Grade • Week ${weekNum} • ${dayName}</p>
                    <p class="chapter-info">Chapters ${chapter1.number} & ${chapter2.number}</p>
                `
            },
            
            // Page 2: Welcome & Objectives
            {
                type: 'content',
                content: `
                    <h2>📚 Welcome to Day ${dayNum}!</h2>
                    <div class="objectives-box">
                        <h3>Today's Learning Goals:</h3>
                        <ul>
                            <li>Learn 3 new vocabulary words</li>
                            <li>Read chapters ${chapter1.number} & ${chapter2.number} of The Mysterious Island</li>
                            <li>Practice ${skillContent ? skillContent.topic : 'language skills'}</li>
                            <li>Explore a non-fiction article</li>
                            <li>Complete a ${skillContent && skillContent.type === 'grammar' ? 'writing exercise' : 'journal reflection'}</li>
                        </ul>
                        <p><strong>Estimated time:</strong> 45-60 minutes</p>
                    </div>
                `
            },
            
            // Page 3: Vocabulary (3 words)
            {
                type: 'vocabulary',
                content: `
                    <h2>📖 Vocabulary</h2>
                    <p>Learn these 3 words before reading today's chapters:</p>
                    
                    ${vocabWords.map((v, i) => `
                        <div class="vocab-word-card">
                            <h3>${i + 1}. ${v.word}</h3>
                            <p class="definition"><strong>Definition:</strong> ${v.definition}</p>
                            <label>Write the definition in your own words:</label>
                            <textarea id="vocab-${dayNum}-${i + 1}" rows="10" placeholder="Your definition..."></textarea>
                        </div>
                    `).join('')}
                `
            },
            
            // Page 4: Vocab Game (placeholder)
            {
                type: 'activity',
                content: `
                    <h2>🎮 Vocabulary Practice</h2>
                    <p><strong>Game Type:</strong> ${getVocabGameType(dayNum).replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    <div class="vocab-game-placeholder">
                        <p>Practice using today's vocabulary words:</p>
                        <ul>
                            ${vocabWords.map(v => `<li><strong>${v.word}</strong> - ${v.definition}</li>`).join('')}
                        </ul>
                        <p><em>Interactive game will be added here!</em></p>
                    </div>
                `
            },
            
            // Pages 5-7: Story in 3 parts
            {
                type: 'reading',
                content: `
                    <h2>📖 Reading - Part 1</h2>
                    <div class="story-content">
                        ${storyPart1.replace(/\n/g, '<br><br>')}
                    </div>
                `
            },
            {
                type: 'reading',
                content: `
                    <h2>📖 Reading - Part 2</h2>
                    <div class="story-content">
                        ${storyPart2.replace(/\n/g, '<br><br>')}
                    </div>
                `
            },
            {
                type: 'reading',
                content: `
                    <h2>📖 Reading - Part 3</h2>
                    <div class="story-content">
                        ${storyPart3.replace(/\n/g, '<br><br>')}
                    </div>
                `
            },
            
            // Page 8: Comprehension
            {
                type: 'comprehension',
                content: `
                    <h2>💭 Comprehension Check</h2>
                    <p>Think deeply about what you just read:</p>
                    
                    <div class="question-card">
                        <p><strong>1.</strong> What were the most important events in these chapters?</p>
                        <textarea id="comp-${dayNum}-1" rows="15" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>2.</strong> How do these chapters develop the story's themes of exploration and discovery?</p>
                        <textarea id="comp-${dayNum}-2" rows="15" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>3.</strong> What challenges or conflicts do the characters face?</p>
                        <textarea id="comp-${dayNum}-3" rows="15" placeholder="Your answer..."></textarea>
                    </div>
                `
            },
            
            // Page 9: Grammar OR Language
            {
                type: 'grammar-language',
                content: skillContent ? `
                    <h2>✏️ ${skillContent.topic}</h2>
                    <div class="skill-explanation">
                        <p>${skillContent.explanation}</p>
                    </div>
                    
                    <h3>Examples:</h3>
                    <ul>
                        ${skillContent.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                    
                    <h3>Practice:</h3>
                    ${skillContent.exercises.map((ex, i) => `
                        <div class="exercise-card">
                            <p><strong>${i + 1}.</strong> ${ex}</p>
                            <textarea id="${skillContent.type}-${dayNum}-${i + 1}" rows="12" placeholder="Your answer..."></textarea>
                        </div>
                    `).join('')}
                ` : '<p>Grammar/Language content will be added</p>'
            },
            
            // Page 10: Informational Text (placeholder)
            {
                type: 'informational',
                content: `
                    <h2>🌍 Informational Text</h2>
                    <p><em>Non-fiction article related to today's story will be added here.</em></p>
                    <div class="placeholder-box">
                        <p>Topics might include:</p>
                        <ul>
                            <li>Scientific expeditions and exploration history</li>
                            <li>The Amazon rainforest ecosystem</li>
                            <li>Paleontology and fossil discovery</li>
                            <li>Conservation ethics</li>
                        </ul>
                    </div>
                `
            },
            
            // Page 11: Writing OR Journal
            {
                type: 'writing',
                content: skillContent && skillContent.type === 'grammar' ? `
                    <h2>✍️ Writing Practice</h2>
                    <p>Apply what you've learned about ${skillContent.topic}:</p>
                    <div class="writing-prompt">
                        <p><strong>Prompt:</strong> Write a paragraph about today's chapters using the grammar skills you practiced. Include at least 2 examples of the concept.</p>
                        <textarea id="writing-${dayNum}" rows="25" placeholder="Your paragraph..."></textarea>
                    </div>
                ` : `
                    <h2>📝 Journal Response</h2>
                    <p>Reflect on today's reading:</p>
                    <div class="journal-prompt">
                        <p><strong>Prompt:</strong> Put yourself in Cyrus's position. How would you feel about this expedition? What would excite or worry you?</p>
                        <textarea id="journal-${dayNum}" rows="25" placeholder="Your journal entry..."></textarea>
                    </div>
                `
            }
        ]
    };
    
    return config;
}

// ==================== BUILD ASSESSMENT ====================

function buildAssessment(dayNum) {
    console.log(`\n📊 Building Assessment Day ${dayNum}...`);
    
    const weekNum = Math.ceil(dayNum / 5);
    let vocabList = [];
    
    if (dayNum === 50) {
        vocabList = vocabulary.week10;
    } else if (dayNum === 55) {
        vocabList = vocabulary.week11;
    } else if (dayNum === 60) {
        vocabList = vocabulary.week12;
    }
    
    const config = {
        title: `Day ${dayNum} - Assessment`,
        pages: [
            {
                type: 'title',
                content: `
                    <h1>Day ${dayNum}</h1>
                    <h2>Week ${weekNum} Assessment</h2>
                    <p class="unit-label">8th Grade • The Mysterious Island</p>
                `
            },
            {
                type: 'assessment',
                content: `
                    <h2>📝 Vocabulary Quiz</h2>
                    <p>Write definitions for these words in your own words:</p>
                    ${vocabList.map((v, i) => `
                        <div class="quiz-question">
                            <p><strong>${i + 1}. ${v.word}</strong></p>
                            <textarea id="quiz-${dayNum}-vocab-${i + 1}" rows="8" placeholder="Definition..."></textarea>
                        </div>
                    `).join('')}
                `
            },
            {
                type: 'assessment',
                content: `
                    <h2>✏️ Grammar & Language Review</h2>
                    <p>Answer these questions about this week's skills:</p>
                    <div class="quiz-question">
                        <p><strong>1.</strong> Review question will be added</p>
                        <textarea id="quiz-${dayNum}-skill-1" rows="15"></textarea>
                    </div>
                    <div class="quiz-question">
                        <p><strong>2.</strong> Review question will be added</p>
                        <textarea id="quiz-${dayNum}-skill-2" rows="15"></textarea>
                    </div>
                `
            },
            {
                type: 'assessment',
                content: `
                    <h2>💭 Comprehension Review</h2>
                    <p>Synthesize this week's reading:</p>
                    <div class="quiz-question">
                        <p><strong>1.</strong> What were the major events this week?</p>
                        <textarea id="quiz-${dayNum}-comp-1" rows="15"></textarea>
                    </div>
                    <div class="quiz-question">
                        <p><strong>2.</strong> How did the characters change or grow?</p>
                        <textarea id="quiz-${dayNum}-comp-2" rows="15"></textarea>
                    </div>
                `
            },
            {
                type: 'assessment',
                content: `
                    <h2>✍️ Writing Response</h2>
                    <p><strong>Prompt:</strong> ${dayNum === 50 ? 'What makes a good survivor? Use examples from the story and real survival situations.' : dayNum === 55 ? 'How does engineering knowledge help humans overcome natural challenges? Support with evidence.' : 'What is the value of scientific knowledge in survival situations? Use evidence from The Mysterious Island and the informational articles.'}</p>
                    <textarea id="quiz-${dayNum}-writing" rows="30" placeholder="Write your response (1-2 paragraphs)..."></textarea>
                `
            },
            {
                type: 'completion',
                content: `
                    <h2>🎉 Assessment Complete!</h2>
                    <p>Great work this week! Your answers have been saved.</p>
                    <p>Take a break, then get ready for next week's adventure!</p>
                `
            }
        ]
    };
    
    return config;
}

// ==================== MAIN BUILD FUNCTION ====================

function buildAllLessons() {
    console.log('\n🚀 Starting Mysterious Island lesson generation...\n');
    console.log('=' .repeat(50));
    
    let built = 0;
    let failed = 0;
    
    for (let day = START_DAY; day <= START_DAY + 14; day++) {
        let config;
        
        if (day === 50 || day === 55 || day === 60) {
            config = buildAssessment(day);
        } else {
            config = buildRegularLesson(day);
        }
        
        if (!config) {
            console.error(`❌ Failed to build day ${day}`);
            failed++;
            continue;
        }
        
        try {
            const html = generateLessonHTML(day, config);
            const filename = `8th-grade-day-${String(day).padStart(3, '0')}.html`;
            const filepath = path.join(OUTPUT_DIR, filename);
            
            fs.writeFileSync(filepath, html, 'utf8');
            console.log(`✅ Created ${filename}`);
            built++;
            
        } catch (error) {
            console.error(`❌ Error writing day ${day}:`, error.message);
            failed++;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`\n📊 Build Summary:`);
    console.log(`   ✅ Successfully built: ${built} lessons`);
    console.log(`   ❌ Failed: ${failed} lessons`);
    console.log(`\n🎉 Mysterious Island unit is ready!`);
    console.log(`   Days 46-60 (Weeks 10-12) complete`);
    console.log(`   Location: ${OUTPUT_DIR}`);
}

// ==================== RUN ====================

buildAllLessons();
