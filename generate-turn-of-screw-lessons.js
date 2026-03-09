#!/usr/bin/env node
/**
 * Turn of the Screw Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 106-120) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/8th ela/Turnofscrew/Turn_of_Screw_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/Turnofscrew/Turn_of_Screw_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/Turnofscrew/Turn_of_Screw_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 106;

// ==================== VOCABULARY DATA ====================
// Gothic psychological thriller vocabulary (5 words per chapter, 10 per day with 2 chapters/day)
const vocabulary = {
    week22: [ // Days 106-110 (Chapters 1-10)
        // Day 106: Chapters 1-2
        { word: 'apparition', definition: 'a ghostly figure; supernatural appearance' },
        { word: 'guardian', definition: 'person responsible for protecting someone' },
        { word: 'supernatural', definition: 'beyond natural; ghostly or magical' },
        { word: 'isolation', definition: 'state of being alone or separated' },
        { word: 'manor', definition: 'large country house with lands' },
        { word: 'governess', definition: 'woman employed to teach children at home' },
        { word: 'authority', definition: 'power to make decisions and give orders' },
        { word: 'consultation', definition: 'seeking advice or guidance' },
        { word: 'circumstances', definition: 'conditions affecting a situation' },
        { word: 'tenure', definition: 'period of holding a position' },
        // Day 107: Chapters 3-4
        { word: 'deportment', definition: 'manner of behaving; conduct' },
        { word: 'sophistication', definition: 'worldly experience and refinement' },
        { word: 'pedagogical', definition: 'relating to teaching methods' },
        { word: 'dismissal', definition: 'removal from a position or place' },
        { word: 'inadvisable', definition: 'not recommended; unwise' },
        { word: 'moral', definition: 'concerning principles of right and wrong' },
        { word: 'conduct', definition: 'manner of behaving' },
        { word: 'drastic', definition: 'severe or extreme' },
        { word: 'exemplary', definition: 'serving as a desirable example' },
        { word: 'dilemma', definition: 'difficult choice between options' },
        // Day 108: Chapters 5-6
        { word: 'corruption', definition: 'moral decay or dishonesty' },
        { word: 'exploitation', definition: 'unfair use of someone for benefit' },
        { word: 'ominous', definition: 'suggesting something bad will happen' },
        { word: 'mourning', definition: 'expression of grief for the dead' },
        { word: 'bereavement', definition: 'state of having lost someone to death' },
        { word: 'aura', definition: 'distinctive atmosphere surrounding someone' },
        { word: 'innocence', definition: 'lack of guilt; purity' },
        { word: 'supernatural', definition: 'beyond scientific understanding' },
        { word: 'acknowledgment', definition: 'accepting or recognizing something' },
        { word: 'familiarity', definition: 'close acquaintance with something' },
        // Day 109: Chapters 7-8
        { word: 'revelation', definition: 'surprising disclosure of information' },
        { word: 'systematic', definition: 'done according to a plan' },
        { word: 'compromise', definition: 'weaken or damage reputation' },
        { word: 'supervision', definition: 'act of watching over someone' },
        { word: 'influence', definition: 'capacity to have effect on someone' },
        { word: 'fragmentary', definition: 'incomplete; in pieces' },
        { word: 'surveillance', definition: 'close observation' },
        { word: 'calculated', definition: 'done with careful planning' },
        { word: 'compliance', definition: 'act of obeying rules or requests' },
        { word: 'stimuli', definition: 'things that cause reactions' }
    ],
    week23: [ // Days 111-115 (Chapters 11-20)
        // Day 111: Chapters 9-10
        { word: 'passionate', definition: 'showing strong feelings' },
        { word: 'transcend', definition: 'go beyond normal limits' },
        { word: 'vigilance', definition: 'careful watchfulness' },
        { word: 'dedication', definition: 'commitment to a task or purpose' },
        { word: 'salvation', definition: 'deliverance from harm or evil' },
        { word: 'nocturnal', definition: 'occurring during the night' },
        { word: 'stealth', definition: 'cautious secret action' },
        { word: 'destination', definition: 'place to which someone is going' },
        { word: 'vigil', definition: 'period of staying awake to watch' },
        { word: 'expedition', definition: 'journey with a purpose' },
        // Day 112: Chapters 11-12
        { word: 'skepticism', definition: 'doubting attitude' },
        { word: 'interpretation', definition: 'explanation or understanding' },
        { word: 'overwrought', definition: 'in state of nervous excitement' },
        { word: 'delusion', definition: 'false belief despite contrary evidence' },
        { word: 'self-deception', definition: 'act of fooling oneself' },
        { word: 'confrontation', definition: 'hostile meeting or encounter' },
        { word: 'transformation', definition: 'complete change in character' },
        { word: 'analytical', definition: 'using logical reasoning' },
        { word: 'philosophical', definition: 'relating to study of fundamental truths' },
        { word: 'devastating', definition: 'highly destructive or shocking' },
        // Day 113: Chapters 13-14
        { word: 'delirium', definition: 'disturbed state of mind with confusion' },
        { word: 'intensity', definition: 'extreme degree of strength' },
        { word: 'agitation', definition: 'state of nervous excitement' },
        { word: 'trauma', definition: 'deeply distressing experience' },
        { word: 'equilibrium', definition: 'state of physical or mental balance' },
        { word: 'abandonment', definition: 'act of leaving completely' },
        { word: 'persecution', definition: 'cruel or unfair treatment' },
        { word: 'contemplation', definition: 'deep reflective thought' },
        { word: 'desperation', definition: 'state of despair with recklessness' },
        { word: 'implications', definition: 'conclusions drawn from something' },
        // Day 114: Chapters 15-16
        { word: 'composure', definition: 'state of being calm and controlled' },
        { word: 'precocity', definition: 'advanced development for one\'s age' },
        { word: 'rationalization', definition: 'attempt to explain away' },
        { word: 'temporal', definition: 'relating to worldly rather than spiritual' },
        { word: 'consciousness', definition: 'awareness of one\'s existence' },
        { word: 'proximity', definition: 'nearness in space or relationship' },
        { word: 'testimony', definition: 'formal statement of evidence' },
        { word: 'manifestation', definition: 'clear appearance or demonstration' },
        { word: 'threshold', definition: 'point of entry or beginning' },
        { word: 'uncertainty', definition: 'state of being unsure' }
    ],
    week24: [ // Days 116-120 (Chapters 21-24)
        // Day 116: Chapters 17-18
        { word: 'triumph', definition: 'great victory or achievement' },
        { word: 'misguided', definition: 'based on faulty judgment' },
        { word: 'climax', definition: 'most intense point in a series' },
        { word: 'tragic', definition: 'causing extreme sadness' },
        { word: 'convulsion', definition: 'violent irregular movement' },
        { word: 'epistemological', definition: 'relating to theory of knowledge' },
        { word: 'preservation', definition: 'act of keeping safe from harm' },
        { word: 'testimony', definition: 'evidence or proof of something' },
        { word: 'narrative', definition: 'spoken or written account of events' },
        { word: 'verification', definition: 'process of establishing truth' },
        // Day 117: Chapters 19-20
        { word: 'Gothic', definition: 'style marked by mystery and horror' },
        { word: 'ambiguity', definition: 'quality of being open to multiple interpretations' },
        { word: 'epistemology', definition: 'study of knowledge and belief' },
        { word: 'paradox', definition: 'seemingly contradictory statement that may be true' },
        { word: 'reciprocal', definition: 'given or done in return' },
        { word: 'psychological', definition: 'relating to the mind' },
        { word: 'reliability', definition: 'quality of being trustworthy' },
        { word: 'perspective', definition: 'particular way of viewing things' },
        { word: 'legacy', definition: 'something handed down from past' },
        { word: 'masterpiece', definition: 'work of outstanding skill' },
        // Day 118: Chapters 21-22
        { word: 'interpretation', definition: 'explanation of meaning' },
        { word: 'sophistication', definition: 'refined understanding' },
        { word: 'complexity', definition: 'state of being intricate' },
        { word: 'uncertainty', definition: 'lack of sure knowledge' },
        { word: 'maturity', definition: 'state of being fully developed' },
        { word: 'coexistence', definition: 'existing together' },
        { word: 'assumption', definition: 'thing accepted as true without proof' },
        { word: 'revelation', definition: 'surprising disclosure' },
        { word: 'philosophical', definition: 'relating to fundamental questions' },
        { word: 'profound', definition: 'very great or intense' },
        // Day 119: Chapters 23-24
        { word: 'epistemological', definition: 'relating to nature of knowledge' },
        { word: 'metaphysical', definition: 'relating to abstract thought' },
        { word: 'ambiguous', definition: 'open to more than one interpretation' },
        { word: 'narrative', definition: 'account of connected events' },
        { word: 'unreliable', definition: 'not able to be trusted' },
        { word: 'perception', definition: 'way of understanding something' },
        { word: 'supernatural', definition: 'beyond scientific understanding' },
        { word: 'literary', definition: 'relating to literature' },
        { word: 'analytical', definition: 'using logical examination' },
        { word: 'masterwork', definition: 'supreme achievement' }
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
                    const storyContent = chapterText.replace(/^# Chapter \d+: .+\n+/m, '').trim();
                    
                    if (storyContent) {
                        allChapters.push({ number: chapterNum, title: title, content: storyContent });
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
    const dayInUnit = dayNum - START_DAY; // 0-14
    const weekNum = Math.floor(dayInUnit / 5) + 22; // week 22, 23, 24
    const weekKey = `week${weekNum}`;
    
    if (!vocabulary[weekKey]) return [];
    
    const dayOfWeek = dayInUnit % 5;
    const startIdx = dayOfWeek * 10; // 10 words per day (2 chapters × 5 words)
    return vocabulary[weekKey].slice(startIdx, startIdx + 10);
}

function generateLessonHTML(dayNum, config) {
    const lessonId = `8th-grade-day-${String(dayNum).padStart(3, '0')}`;
    const pagesJSON = JSON.stringify(config.pages, null, 4);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=${Date.now()}">
</head>
<body>
    <div id="lesson-container"></div>
    <script src="js/lesson-viewer.js?v=${Date.now()}"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=${Date.now()}"></script>
    <script src="js/lesson-autosave.js?v=${Date.now()}"></script>
    <script>
const ${lessonId.replace(/-/g, '_')}Config = ${pagesJSON};

if (typeof initLessonViewer === 'function') {
    initLessonViewer(${lessonId.replace(/-/g, '_')}Config);
}
    </script>
</body>
</html>`;
}

// ==================== BUILD LESSONS ====================
console.log(`\n🚀 Generating Turn of the Screw lessons (Days ${START_DAY}-${START_DAY+14})...\n`);

let successCount = 0;
let failCount = 0;

// Define which days are regular lessons (skipping assessment days 4, 9, 14)
const regularDayOffsets = [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13];

// Regular lessons (2 chapters per day)
for (let i = 0; i < regularDayOffsets.length; i++) {
    const dayOffset = regularDayOffsets[i];
    const day = START_DAY + dayOffset;
    const week = Math.floor(dayOffset / 5) + 22;
    const chapterStart = (i * 2) + 1;
    const chapterEnd = chapterStart + 1;
    
    const ch1 = allChapters.find(c => c.number === chapterStart);
    const ch2 = allChapters.find(c => c.number === chapterEnd);
    
    if (!ch1 || !ch2) {
        console.error(`❌ Missing chapters ${chapterStart}-${chapterEnd} for Day ${day}`);
        failCount++;
        continue;
    }
    
    const combinedStory = ch1.content + '\n\n---\n\n' + ch2.content;
    const [part1, part2, part3] = splitIntoThreeParts(combinedStory);
    const vocab = getVocabForDay(day);
    
    const config = {
        lessonId: `8th-grade-day-${String(day).padStart(3, '0')}`,
        gradeLevel: '8th-grade',
        title: `Day ${day} - The Turn of the Screw`,
        pages: [
            {
                type: 'title',
                content: {
                    lessonNumber: `Day ${day}`,
                    title: `The Turn of the Screw`,
                    subtitle: `Chapters ${chapterStart} & ${chapterEnd} • Week ${week}`,
                    imageUrl: ''
                }
            },
            {
                type: 'welcome',
                content: {
                    title: `Welcome to Day ${day}`,
                    objectives: [
                        `Read Chapters ${chapterStart} & ${chapterEnd}: ${ch1.title} and ${ch2.title}`,
                        'Learn 10 new vocabulary words',
                        'Practice reading comprehension',
                        'Analyze Gothic psychological themes and ambiguity'
                    ],
                    estimatedTime: '45-60 minutes'
                }
            },
            {
                type: 'vocabulary',
                content: {
                    words: vocab.slice(0, 3) // Display first 3 on vocab page
                }
            },
            {
                type: 'vocab-game',
                content: {
                    gameType: ['matching', 'fill-in-blank', 'sentence-writing', 'context-clues'][dayOffset % 4],
                    words: vocab // All 10 for practice
                }
            },
            {
                type: 'story',
                content: {
                    title: `${ch1.title} & ${ch2.title} (Part 1)`,
                    text: part1
                }
            },
            {
                type: 'story',
                content: {
                    title: `${ch1.title} & ${ch2.title} (Part 2)`,
                    text: part2
                }
            },
            {
                type: 'story',
                content: {
                    title: `${ch1.title} & ${ch2.title} (Part 3)`,
                    text: part3
                }
            },
            {
                type: 'comprehension',
                content: {
                    questions: [
                        { question: `What happens in "${ch1.title}"?`, type: 'short-answer' },
                        { question: `What happens in "${ch2.title}"?`, type: 'short-answer' },
                        { question: 'Are the ghosts real or is the governess going mad? Support your interpretation.', type: 'short-answer' }
                    ]
                }
            },
            {
                type: (dayOffset % 4 === 0 || dayOffset % 4 === 2) ? 'grammar' : 'language',
                content: {
                    topic: (dayOffset % 4 === 0 || dayOffset % 4 === 2) ? 'Grammar Practice' : 'Language Skills',
                    explanation: 'Placeholder content',
                    examples: [],
                    exercises: []
                }
            },
            {
                type: 'informational-text',
                content: {
                    title: 'Gothic Literature and Unreliable Narrators',
                    text: 'Placeholder informational text about Henry James, Victorian Gothic fiction, and psychological ambiguity.',
                    questions: [
                        { question: 'What did you learn from this article?', type: 'short-answer' },
                        { question: 'How does it connect to the story?', type: 'short-answer' }
                    ]
                }
            },
            {
                type: (dayOffset % 4 === 0 || dayOffset % 4 === 2) ? 'writing-skills' : 'journal',
                content: {
                    prompt: (dayOffset % 4 === 0 || dayOffset % 4 === 2) 
                        ? 'Write about how unreliable narration creates ambiguity in literature.'
                        : 'Reflect on whether you believe the ghosts are real. What evidence supports your view?',
                    guidelines: []
                }
            }
        ]
    };
    
    const html = generateLessonHTML(day, config);
    const filepath = path.join(OUTPUT_DIR, `8th-grade-day-${String(day).padStart(3, '0')}.html`);
    
    try {
        fs.writeFileSync(filepath, html, 'utf8');
        console.log(`✅ Generated: 8th-grade-day-${String(day).padStart(3, '0')}.html`);
        successCount++;
    } catch (error) {
        console.error(`❌ Failed to write Day ${day}:`, error.message);
        failCount++;
    }
}

// Assessment days (Days 110, 115, 120)
const assessmentDays = [START_DAY + 4, START_DAY + 9, START_DAY + 14];
for (const day of assessmentDays) {
    const config = {
        lessonId: `8th-grade-day-${String(day).padStart(3, '0')}`,
        gradeLevel: '8th-grade',
        title: `Day ${day} - Assessment`,
        pages: [
            { type: 'title', content: { lessonNumber: `Day ${day}`, title: 'Assessment', subtitle: 'The Turn of the Screw', imageUrl: '' } },
            { type: 'vocab-quiz', content: { words: [] } },
            { type: 'grammar-review', content: { topic: 'Review', questions: [] } },
            { type: 'comprehension-review', content: { questions: [] } },
            { type: 'writing-prompt', content: { prompt: 'Write about ambiguity and multiple interpretations in The Turn of the Screw.', guidelines: [] } },
            { type: 'completion', content: { message: 'Great work this week!', nextSteps: [] } }
        ]
    };
    
    const html = generateLessonHTML(day, config);
    const filepath = path.join(OUTPUT_DIR, `8th-grade-day-${String(day).padStart(3, '0')}.html`);
    
    try {
        fs.writeFileSync(filepath, html, 'utf8');
        console.log(`✅ Generated: 8th-grade-day-${String(day).padStart(3, '0')}.html`);
        successCount++;
    } catch (error) {
        console.error(`❌ Failed to write Day ${day}:`, error.message);
        failCount++;
    }
}

console.log(`\n🎉 Done! Generated ${successCount} lessons (Days ${START_DAY}-${START_DAY+14})`);
if (failCount > 0) console.error(`⚠️  ${failCount} lessons failed`);
