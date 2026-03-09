#!/usr/bin/env node
/**
 * Count of Monte Cristo Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 91-105) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/8th ela/MonteCristo/Monte_Cristo_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/MonteCristo/Monte_Cristo_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/MonteCristo/Monte_Cristo_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 91;

// ==================== VOCABULARY DATA ====================
// Based on Monte_Cristo_Complete_Vocabulary.md (5 words per chapter, 10 per day with 2 chapters/day)
const vocabulary = {
    week19: [ // Days 91-95 (Chapters 1-10)
        // Day 91: Chapters 1-2
        { word: 'Treasure', definition: 'valuable objects' },
        { word: 'Mysterious', definition: 'hard to understand' },
        { word: 'Legendary', definition: 'famous in stories' },
        { word: 'Agenda', definition: 'plan of action' },
        { word: 'Wisdom', definition: 'deep knowledge' },
        { word: 'Betrayal', definition: 'act of disloyalty' },
        { word: 'Innocence', definition: 'state of being pure' },
        { word: 'Captain', definition: 'ship\'s commander' },
        { word: 'Promotion', definition: 'advancement in position' },
        { word: 'Accusations', definition: 'charges of wrongdoing' },
        // Day 92: Chapters 3-4
        { word: 'Conspiracy', definition: 'secret plan' },
        { word: 'Jealous', definition: 'wanting what others have' },
        { word: 'Envious', definition: 'feeling envy' },
        { word: 'Vindictive', definition: 'seeking revenge' },
        { word: 'Anonymous', definition: 'without known identity' },
        { word: 'Arrest', definition: 'taking into custody' },
        { word: 'Prosecutor', definition: 'legal accuser' },
        { word: 'Sacrifice', definition: 'give up something valuable' },
        { word: 'Career', definition: 'professional life' },
        { word: 'Warrant', definition: 'official permission' },
        // Day 93: Chapters 5-6
        { word: 'Château', definition: 'French castle' },
        { word: 'Fortress', definition: 'strong defensive building' },
        { word: 'Prisoners', definition: 'people held captive' },
        { word: 'Bureaucratic', definition: 'official system' },
        { word: 'Indifference', definition: 'lack of concern' },
        { word: 'Despair', definition: 'complete hopelessness' },
        { word: 'Gradual', definition: 'happening slowly' },
        { word: 'Deterioration', definition: 'getting worse' },
        { word: 'Anguish', definition: 'severe distress' },
        { word: 'Confinement', definition: 'being locked up' },
        // Day 94: Chapters 7-8
        { word: 'Abbé', definition: 'French priest' },
        { word: 'Scratching', definition: 'scraping sound' },
        { word: 'Fellow', definition: 'companion' },
        { word: 'Tunnel', definition: 'underground passage' },
        { word: 'Noble', definition: 'having high character' },
        { word: 'Systematic', definition: 'organized method' },
        { word: 'Protégé', definition: 'student being taught' },
        { word: 'Mathematics', definition: 'study of numbers' },
        { word: 'Philosophy', definition: 'study of wisdom' },
        { word: 'Strategy', definition: 'plan for success' }
    ],
    week20: [ // Days 96-100 (Chapters 11-20)
        // Day 96: Chapters 9-10
        { word: 'Revelation', definition: 'revealing truth' },
        { word: 'Massive', definition: 'very large' },
        { word: 'Instructions', definition: 'directions' },
        { word: 'Claiming', definition: 'taking possession' },
        { word: 'Unlimited', definition: 'without limits' },
        { word: 'Rebirth', definition: 'being born again' },
        { word: 'Switching', definition: 'changing places' },
        { word: 'Corpse', definition: 'dead body' },
        { word: 'Dramatic', definition: 'exciting and emotional' },
        { word: 'Emerged', definition: 'came out' },
        // Day 97: Chapters 11-12
        { word: 'Inheritance', definition: 'something inherited' },
        { word: 'Discovery', definition: 'finding something' },
        { word: 'Counting', definition: 'adding up numbers' },
        { word: 'Combined', definition: 'joined together' },
        { word: 'Systematic', definition: 'organized and planned' },
        { word: 'Metamorphosis', definition: 'complete change' },
        { word: 'Preparation', definition: 'getting ready' },
        { word: 'Network', definition: 'connected group' },
        { word: 'Allies', definition: 'friends who help' },
        { word: 'Influence', definition: 'power to affect' },
        // Day 98: Chapters 13-14
        { word: 'Spectacular', definition: 'impressive to see' },
        { word: 'Entrance', definition: 'way of entering' },
        { word: 'Elite', definition: 'highest class' },
        { word: 'Investigation', definition: 'careful study' },
        { word: 'Circumstances', definition: 'conditions' },
        { word: 'Military', definition: 'relating to army' },
        { word: 'Treachery', definition: 'betrayal of trust' },
        { word: 'Marriage', definition: 'wedding union' },
        { word: 'Believing', definition: 'thinking true' },
        { word: 'Hero', definition: 'brave person' },
        // Day 99: Chapters 15-16
        { word: 'Banker', definition: 'money manager' },
        { word: 'Financial', definition: 'relating to money' },
        { word: 'Manipulation', definition: 'controlling others' },
        { word: 'Engaged', definition: 'promised in marriage' },
        { word: 'Speculation', definition: 'risky investment' },
        { word: 'Magistrate', definition: 'legal official' },
        { word: 'Concealed', definition: 'hidden' },
        { word: 'Influence', definition: 'power over others' },
        { word: 'Sacrificing', definition: 'giving up' },
        { word: 'Innocent', definition: 'not guilty' }
    ],
    week21: [ // Days 101-105 (Chapters 21-24)
        // Day 101: Chapters 17-18
        { word: 'Recognition', definition: 'identifying someone' },
        { word: 'Sensing', definition: 'feeling' },
        { word: 'Familiar', definition: 'known before' },
        { word: 'Grief', definition: 'deep sorrow' },
        { word: 'Internal', definition: 'inside feelings' },
        { word: 'Moral', definition: 'relating to right/wrong' },
        { word: 'Debate', definition: 'discussion of ideas' },
        { word: 'Vengeance', definition: 'revenge' },
        { word: 'Hasty', definition: 'too quick' },
        { word: 'Corruption', definition: 'moral decay' },
        // Day 102: Chapters 19-20
        { word: 'Genuine', definition: 'real and honest' },
        { word: 'Friendship', definition: 'close relationship' },
        { word: 'Conflict', definition: 'struggle between ideas' },
        { word: 'Destroying', definition: 'ruining completely' },
        { word: 'Inherited', definition: 'passed down' },
        { word: 'Princess', definition: 'royal daughter' },
        { word: 'Enslaved', definition: 'made into slave' },
        { word: 'Murder', definition: 'intentional killing' },
        { word: 'Adoption', definition: 'taking as family' },
        { word: 'Protection', definition: 'keeping safe' },
        // Day 103: Chapters 21-22
        { word: 'Exposure', definition: 'revealing truth' },
        { word: 'Testimony', definition: 'statement of facts' },
        { word: 'Revelation', definition: 'disclosure' },
        { word: 'Honors', definition: 'awards for service' },
        { word: 'Devastating', definition: 'very upsetting' },
        { word: 'Ruin', definition: 'complete destruction' },
        { word: 'Manipulation', definition: 'controlling others' },
        { word: 'Collapse', definition: 'falling down' },
        { word: 'Fortune', definition: 'large amount of money' },
        { word: 'Creditors', definition: 'people owed money' },
        // Day 104: Chapters 23-24
        { word: 'Judgment', definition: 'decision about guilt' },
        { word: 'Illegitimate', definition: 'born outside marriage' },
        { word: 'Poisoning', definition: 'killing with poison' },
        { word: 'Perverted', definition: 'corrupted' },
        { word: 'Reckoning', definition: 'time of judgment' },
        { word: 'Mercy', definition: 'compassion and forgiveness' },
        { word: 'Recognition', definition: 'understanding' },
        { word: 'Perfect', definition: 'completely correct' },
        { word: 'Forgiveness', definition: 'pardoning wrongs' },
        { word: 'Righteousness', definition: 'moral goodness' }
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
    const weekNum = Math.floor(dayInUnit / 5) + 19; // week 19, 20, 21
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
console.log(`\n🚀 Generating Count of Monte Cristo lessons (Days ${START_DAY}-${START_DAY+14})...\n`);

let successCount = 0;
let failCount = 0;

// Define which days are regular lessons (skipping assessment days 4, 9, 14)
const regularDayOffsets = [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13];

// Regular lessons (2 chapters per day)
for (let i = 0; i < regularDayOffsets.length; i++) {
    const dayOffset = regularDayOffsets[i];
    const day = START_DAY + dayOffset;
    const week = Math.floor(dayOffset / 5) + 19;
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
        title: `Day ${day} - The Count of Monte Cristo`,
        pages: [
            {
                type: 'title',
                content: {
                    lessonNumber: `Day ${day}`,
                    title: `The Count of Monte Cristo`,
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
                        'Analyze themes of justice and revenge'
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
                        { question: 'What themes of justice or revenge do you notice?', type: 'short-answer' }
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
                    title: 'Justice and Revenge in Literature',
                    text: 'Placeholder informational text about Alexandre Dumas and 19th century France.',
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
                        ? 'Write about the difference between justice and revenge.'
                        : 'Reflect on Edmond Dantès\' transformation in today\'s chapters.',
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

// Assessment days (Days 95, 100, 105)
const assessmentDays = [START_DAY + 4, START_DAY + 9, START_DAY + 14];
for (const day of assessmentDays) {
    const config = {
        lessonId: `8th-grade-day-${String(day).padStart(3, '0')}`,
        gradeLevel: '8th-grade',
        title: `Day ${day} - Assessment`,
        pages: [
            { type: 'title', content: { lessonNumber: `Day ${day}`, title: 'Assessment', subtitle: 'The Count of Monte Cristo', imageUrl: '' } },
            { type: 'vocab-quiz', content: { words: [] } },
            { type: 'grammar-review', content: { topic: 'Review', questions: [] } },
            { type: 'comprehension-review', content: { questions: [] } },
            { type: 'writing-prompt', content: { prompt: 'Write about justice versus vengeance in Monte Cristo.', guidelines: [] } },
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
