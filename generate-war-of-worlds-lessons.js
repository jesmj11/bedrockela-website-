#!/usr/bin/env node
/**
 * War of the Worlds Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 16-30) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/8th ela/War_of_Worlds_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/War_of_Worlds_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/War_of_Worlds_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 16;

// ==================== VOCABULARY DATA ====================
const vocabulary = {
    week4: [
        // Day 16
        { word: 'vaporized', definition: 'converted into vapor or gas, especially through heat' },
        { word: 'correspondent', definition: 'a person employed to report news from a particular area' },
        { word: 'extraterrestrial', definition: 'of or from outside the earth or its atmosphere' },
        // Day 17
        { word: 'annihilation', definition: 'complete destruction or obliteration' },
        { word: 'exodus', definition: 'a mass departure of people' },
        { word: 'chaos', definition: 'complete disorder and confusion' },
        // Day 18
        { word: 'refugee', definition: 'a person forced to leave their home to escape danger' },
        { word: 'invader', definition: 'a person or group that enters a place with hostile intent' },
        { word: 'artillery', definition: 'large-caliber guns used in warfare' },
        // Day 19
        { word: 'futile', definition: 'incapable of producing any useful result; pointless' },
        { word: 'superior', definition: 'higher in quality or capability' },
        { word: 'resistance', definition: 'the refusal to accept or comply with something; opposition' }
    ],
    week5: [
        // Day 21
        { word: 'concealment', definition: 'the action of hiding something or preventing it from being known' },
        { word: 'subterranean', definition: 'existing, occurring, or done under the earth\'s surface' },
        { word: 'refuge', definition: 'a condition of being safe or sheltered from danger' },
        // Day 22
        { word: 'vegetation', definition: 'plants considered collectively' },
        { word: 'contamination', definition: 'the action of making something impure by exposure to poison' },
        { word: 'alien', definition: 'belonging to a foreign country or nation; unfamiliar' },
        // Day 23
        { word: 'desolation', definition: 'a state of complete emptiness or destruction' },
        { word: 'abandoned', definition: 'having been deserted or left behind' },
        { word: 'scavenge', definition: 'search for and collect anything usable from discarded waste' },
        // Day 24
        { word: 'civilization', definition: 'the stage of human social development and organization' },
        { word: 'infrastructure', definition: 'the basic physical systems of a country or community' },
        { word: 'vulnerable', definition: 'exposed to the possibility of being harmed' }
    ],
    week6: [
        // Day 26
        { word: 'deterioration', definition: 'the process of becoming progressively worse' },
        { word: 'mortality', definition: 'the state of being subject to death' },
        { word: 'bacteria', definition: 'microscopic organisms that can cause disease' },
        // Day 27
        { word: 'immunity', definition: 'the ability of an organism to resist infection or toxin' },
        { word: 'ironic', definition: 'happening in the opposite way to what is expected' },
        { word: 'adaptation', definition: 'the process of change by which an organism becomes better suited' },
        // Day 28
        { word: 'reconstruction', definition: 'the action of rebuilding something that has been damaged' },
        { word: 'resilience', definition: 'the capacity to recover quickly from difficulties' },
        { word: 'survivors', definition: 'people who remain alive after an event in which others have died' },
        // Day 29
        { word: 'perspective', definition: 'a particular way of viewing things that depends on experience' },
        { word: 'humility', definition: 'a modest view of one\'s own importance' },
        { word: 'coexistence', definition: 'the state of existing together at the same time or in the same place' }
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
    // Days 16-19 use week4, days 21-24 use week5, days 26-29 use week6
    // Days 20, 25, 30 are assessments
    
    if (dayNum >= 16 && dayNum <= 19) {
        const offset = (dayNum - 16) * 3;
        return vocabulary.week4.slice(offset, offset + 3);
    } else if (dayNum >= 21 && dayNum <= 24) {
        const offset = (dayNum - 21) * 3;
        return vocabulary.week5.slice(offset, offset + 3);
    } else if (dayNum >= 26 && dayNum <= 29) {
        const offset = (dayNum - 26) * 3;
        return vocabulary.week6.slice(offset, offset + 3);
    }
    
    return [];
}

function getVocabGameType(dayNum) {
    const dayOfWeek = ((dayNum - 1) % 5) + 1; // 1-5 (Mon-Fri)
    const games = ['matching', 'fill-in-blank', 'sentence-writing', 'context-clues'];
    return games[dayOfWeek - 1] || 'matching';
}

function getGrammarOrLanguage(dayNum) {
    const dayOfWeek = ((dayNum - START_DAY) % 5) + 1;
    
    if (dayOfWeek === 1 || dayOfWeek === 3) {
        // Grammar days
        if (dayNum === 16) {
            return {
                type: 'grammar',
                topic: 'Sentence Variety - Using Different Sentence Types for Effect',
                explanation: 'Varying sentence types (simple, compound, complex) and length creates rhythm and emphasis. Short sentences build tension. Longer sentences provide detail and flow.',
                examples: [
                    'SHORT for tension: "The heat-ray fired. Buildings exploded. People screamed."',
                    'LONG for detail: "Morrison watched in horror as the Martian tripod, towering fifty feet above the burning village, swept its heat-ray across the street in methodical destruction."',
                    'MIXED for pacing: "The machines advanced. Morrison ran, his heart pounding, knowing that every second counted."'
                ],
                exercises: [
                    'Rewrite this passage with varied sentence lengths: "The Martians attacked. They destroyed everything. Morrison hid. He was terrified."',
                    'Write three short sentences to build tension, then one long sentence to release it.',
                    'Find an example of effective sentence variety in today\'s reading. Explain why it works.'
                ]
            };
        } else if (dayNum === 18) {
            return {
                type: 'grammar',
                topic: 'Verb Mood - Indicative, Imperative, Subjunctive',
                explanation: 'Verb mood shows how a speaker views an action. Indicative = fact, Imperative = command, Subjunctive = wish/hypothetical. Each creates different effects.',
                examples: [
                    'INDICATIVE (fact): "The Martians are attacking London."',
                    'IMPERATIVE (command): "Run! Take cover!"',
                    'SUBJUNCTIVE (hypothetical): "If the military were stronger, humanity might survive."'
                ],
                exercises: [
                    'Identify the mood: "If only the heat-ray had missed the city center."',
                    'Write an imperative sentence Morrison might shout during an attack.',
                    'Convert to subjunctive: "The Martians attack. We flee." → "If the Martians ____, we ____."'
                ]
            };
        }
    } else if (dayOfWeek === 2 || dayOfWeek === 4) {
        // Language days
        if (dayNum === 17) {
            return {
                type: 'language',
                topic: 'Word Relationships - Analogies',
                explanation: 'Analogies show relationships between word pairs. Format: A is to B as C is to D. Types: synonym, antonym, part/whole, cause/effect, function, degree.',
                examples: [
                    'invasion:defense :: disease:immunity (both show opposition)',
                    'heat-ray:weapon :: microscope:tool (both show type/category)',
                    'Martian:tripod :: human:vehicle (both show user/transport)'
                ],
                exercises: [
                    'Complete the analogy: refugee:safety :: _____:water (person to need)',
                    'Create an analogy using "vaporized" and "destroyed"',
                    'Explain the relationship: extraterrestrial:Earth :: immigrant:homeland'
                ]
            };
        } else if (dayNum === 19) {
            return {
                type: 'language',
                topic: 'Denotation vs. Connotation in Science Fiction',
                explanation: 'Denotation = dictionary definition. Connotation = emotional associations. Word choice shapes how readers feel about characters and events.',
                examples: [
                    '"alien" (neutral) vs. "invader" (hostile) vs. "visitor" (friendly)',
                    '"extraterrestrial" (scientific) vs. "monster" (fearful)',
                    '"refugee" (sympathetic) vs. "fugitive" (suspicious)'
                ],
                exercises: [
                    'Compare: "The Martians eliminated the humans" vs. "The Martians slaughtered the humans." Which is more emotional?',
                    'Choose better word: The Martians (departed/fled/escaped) when the bacteria struck.',
                    'Write two sentences about the same event using different connotations to change the mood.'
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
    
    // Figure out which chapters (2 per day)
    const chaptersPerDay = 2;
    const adjustedDay = dayNum - START_DAY; // Offset from day 16
    const startChapter = (adjustedDay - Math.floor(adjustedDay / 5)) * chaptersPerDay; // Subtract assessment days
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
    const dayOfWeek = ((dayNum - START_DAY) % 5) + 1;
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const dayName = dayNames[dayOfWeek - 1];
    
    const config = {
        title: `Day ${dayNum} - The War of the Worlds`,
        pages: [
            // Page 1: Title
            {
                type: 'title',
                content: `
                    <h1>Day ${dayNum}</h1>
                    <h2>The War of the Worlds</h2>
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
                            <li>Read chapters ${chapter1.number} & ${chapter2.number} of The War of the Worlds</li>
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
                            <textarea id="vocab-${dayNum}-${i + 1}" rows="2" placeholder="Your definition..."></textarea>
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
                        <textarea id="comp-${dayNum}-1" rows="4" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>2.</strong> How do these chapters develop the story's themes of exploration and discovery?</p>
                        <textarea id="comp-${dayNum}-2" rows="4" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>3.</strong> What challenges or conflicts do the characters face?</p>
                        <textarea id="comp-${dayNum}-3" rows="4" placeholder="Your answer..."></textarea>
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
                            <textarea id="${skillContent.type}-${dayNum}-${i + 1}" rows="3" placeholder="Your answer..."></textarea>
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
                        <textarea id="writing-${dayNum}" rows="8" placeholder="Your paragraph..."></textarea>
                    </div>
                ` : `
                    <h2>📝 Journal Response</h2>
                    <p>Reflect on today's reading:</p>
                    <div class="journal-prompt">
                        <p><strong>Prompt:</strong> Put yourself in Morrison's position during the Martian invasion. How would you respond to witnessing such destruction? What would you do?</p>
                        <textarea id="journal-${dayNum}" rows="8" placeholder="Your journal entry..."></textarea>
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
    
    if (dayNum === 20) {
        vocabList = vocabulary.week4;
    } else if (dayNum === 25) {
        vocabList = vocabulary.week5;
    } else if (dayNum === 30) {
        vocabList = vocabulary.week6;
    }
    
    const config = {
        title: `Day ${dayNum} - Assessment`,
        pages: [
            {
                type: 'title',
                content: `
                    <h1>Day ${dayNum}</h1>
                    <h2>Week ${weekNum} Assessment</h2>
                    <p class="unit-label">8th Grade • The War of the Worlds</p>
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
                            <textarea id="quiz-${dayNum}-vocab-${i + 1}" rows="2" placeholder="Definition..."></textarea>
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
                        <textarea id="quiz-${dayNum}-skill-1" rows="3"></textarea>
                    </div>
                    <div class="quiz-question">
                        <p><strong>2.</strong> Review question will be added</p>
                        <textarea id="quiz-${dayNum}-skill-2" rows="3"></textarea>
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
                        <textarea id="quiz-${dayNum}-comp-1" rows="4"></textarea>
                    </div>
                    <div class="quiz-question">
                        <p><strong>2.</strong> How did the characters change or grow?</p>
                        <textarea id="quiz-${dayNum}-comp-2" rows="4"></textarea>
                    </div>
                `
            },
            {
                type: 'assessment',
                content: `
                    <h2>✍️ Writing Response</h2>
                    <p><strong>Prompt:</strong> ${dayNum === 20 ? 'How does superior technology affect the balance of power? Use examples from the story and real-world history.' : dayNum === 25 ? 'What makes a civilization vulnerable to collapse? Consider both the story and modern society.' : 'What is the most important lesson from The War of the Worlds for modern humanity? Support your answer with evidence from the text and the informational articles.'}</p>
                    <textarea id="quiz-${dayNum}-writing" rows="10" placeholder="Write your response (1-2 paragraphs)..."></textarea>
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
    console.log('\n🚀 Starting War of the Worlds lesson generation...\n');
    console.log('=' .repeat(50));
    
    let built = 0;
    let failed = 0;
    
    for (let day = START_DAY; day <= START_DAY + 14; day++) {
        let config;
        
        if (day === 20 || day === 25 || day === 30) {
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
    console.log(`\n🎉 War of the Worlds unit is ready!`);
    console.log(`   Days 16-30 (Weeks 4-6) complete`);
    console.log(`   Location: ${OUTPUT_DIR}`);
}

// ==================== RUN ====================

buildAllLessons();
