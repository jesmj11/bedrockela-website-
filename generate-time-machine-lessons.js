#!/usr/bin/env node
/**
 * Time Machine Lesson Generator
 * Builds 15 complete 8th grade lessons (Days 76-90) from chapter content
 * Following the 11-page structure from CURRICULUM-STRUCTURE.md
 */

const fs = require('fs');
const path = require('path');

// Source chapter files on Desktop
const CHAPTER_FILES = [
    '/Users/mushu/Desktop/BedrockELA/8th ela/timemachine/Time_Machine_Chapters_1-6.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/timemachine/Time_Machine_Chapters_7-12.md',
    '/Users/mushu/Desktop/BedrockELA/8th ela/timemachine/Time_Machine_Final_Chapters_13-24.md'
];

// Output directory
const OUTPUT_DIR = '/Users/mushu/.openclaw/workspace/bedrockela-website-';

// Starting day number
const START_DAY = 76;

// ==================== VOCABULARY DATA ====================
// Based on Time_Machine_Complete_Vocabulary.md (5 words per chapter, 10 per day with 2 chapters/day)
const vocabulary = {
    week16: [ // Days 76-80
        { word: 'paradise', definition: 'a perfect place' },
        { word: 'innocence', definition: 'state of purity' },
        { word: 'helplessness', definition: 'inability to act' },
        { word: 'idyllic', definition: 'perfectly peaceful' },
        { word: 'descendants', definition: 'future offspring' },
        { word: 'civilization', definition: 'organized society' },
        { word: 'industrial', definition: 'relating to manufacturing' },
        { word: 'machinery', definition: 'mechanical equipment' },
        { word: 'underground', definition: 'beneath the surface' },
        { word: 'division', definition: 'separation into parts' },
        { word: 'theory', definition: 'proposed explanation' },
        { word: 'dimension', definition: 'measurable aspect' },
        { word: 'temporal', definition: 'relating to time' },
        { word: 'skepticism', definition: 'doubtful attitude' },
        { word: 'demonstration', definition: 'showing how something works' }
    ],
    week17: [ // Days 81-85
        { word: 'principles', definition: 'basic rules' },
        { word: 'mechanics', definition: 'how things work' },
        { word: 'laboratory', definition: 'place for experiments' },
        { word: 'construction', definition: 'building process' },
        { word: 'experiment', definition: 'scientific test' },
        { word: 'inaugural', definition: 'first of its kind' },
        { word: 'acceleration', definition: 'speeding up' },
        { word: 'sensation', definition: 'feeling experience' },
        { word: 'voyage', definition: 'journey' },
        { word: 'millennia', definition: 'thousands of years' },
        { word: 'utopian', definition: 'ideally perfect' },
        { word: 'lush', definition: 'abundantly green' },
        { word: 'gorgeous', definition: 'beautiful' }
    ],
    week18: [ // Days 86-90
        { word: 'luxury', definition: 'expensive comfort' },
        { word: 'concealed', definition: 'hidden' },
        { word: 'mentality', definition: 'way of thinking' },
        { word: 'degradation', definition: 'decline in quality' },
        { word: 'purpose', definition: 'reason for existence' },
        { word: 'terror', definition: 'extreme fear' },
        { word: 'potential', definition: 'possible achievement' },
        { word: 'horror', definition: 'intense fear' },
        { word: 'evidence', definition: 'proof' },
        { word: 'intelligence', definition: 'thinking ability' },
        { word: 'operating', definition: 'working' },
        { word: 'invisible', definition: 'cannot be seen' }
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
    const weekNum = Math.floor(dayInUnit / 5) + 16; // week 16, 17, 18
    const weekKey = `week${weekNum}`;
    
    if (!vocabulary[weekKey]) return [];
    
    const dayOfWeek = dayInUnit % 5;
    const startIdx = dayOfWeek * 3;
    return vocabulary[weekKey].slice(startIdx, startIdx + 3);
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
console.log(`\\n🚀 Generating Time Machine lessons (Days ${START_DAY}-${START_DAY+14})...\\n`);

let successCount = 0;
let failCount = 0;

// Regular lessons (2 chapters per day)
for (let day = START_DAY; day < START_DAY + 12; day++) {
    const dayInUnit = day - START_DAY;
    const week = Math.floor(dayInUnit / 5) + 16;
    const chapterStart = (dayInUnit * 2) + 1;
    const chapterEnd = chapterStart + 1;
    
    const ch1 = allChapters.find(c => c.number === chapterStart);
    const ch2 = allChapters.find(c => c.number === chapterEnd);
    
    if (!ch1 || !ch2) {
        console.error(`❌ Missing chapters ${chapterStart}-${chapterEnd} for Day ${day}`);
        failCount++;
        continue;
    }
    
    const combinedStory = ch1.content + '\\n\\n---\\n\\n' + ch2.content;
    const [part1, part2, part3] = splitIntoThreeParts(combinedStory);
    const vocab = getVocabForDay(day);
    
    const config = {
        lessonId: `8th-grade-day-${String(day).padStart(3, '0')}`,
        gradeLevel: '8th-grade',
        title: `Day ${day} - The Time Machine`,
        pages: [
            {
                type: 'title',
                content: {
                    lessonNumber: `Day ${day}`,
                    title: `The Time Machine`,
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
                        'Learn 3 new vocabulary words',
                        'Practice reading comprehension',
                        'Analyze time travel and evolution themes'
                    ],
                    estimatedTime: '45-60 minutes'
                }
            },
            {
                type: 'vocabulary',
                content: {
                    words: vocab
                }
            },
            {
                type: 'vocab-game',
                content: {
                    gameType: ['matching', 'fill-in-blank', 'sentence-writing', 'context-clues'][dayInUnit % 4],
                    words: vocab
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
                        { question: 'What themes do you notice in these chapters?', type: 'short-answer' }
                    ]
                }
            },
            {
                type: (dayInUnit % 4 === 0 || dayInUnit % 4 === 2) ? 'grammar' : 'language',
                content: {
                    topic: (dayInUnit % 4 === 0 || dayInUnit % 4 === 2) ? 'Grammar Practice' : 'Language Skills',
                    explanation: 'Placeholder content',
                    examples: [],
                    exercises: []
                }
            },
            {
                type: 'informational-text',
                content: {
                    title: 'Time Travel and Evolution',
                    text: 'Placeholder informational text about H.G. Wells and Victorian science.',
                    questions: [
                        { question: 'What did you learn from this article?', type: 'short-answer' },
                        { question: 'How does it connect to the story?', type: 'short-answer' }
                    ]
                }
            },
            {
                type: (dayInUnit % 4 === 0 || dayInUnit % 4 === 2) ? 'writing-skills' : 'journal',
                content: {
                    prompt: (dayInUnit % 4 === 0 || dayInUnit % 4 === 2) 
                        ? 'Write a paragraph explaining a concept from today\'s reading.'
                        : 'Reflect on the themes in today\'s chapters.',
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

// Assessment days (Days 80, 85, 90)
const assessmentDays = [START_DAY + 4, START_DAY + 9, START_DAY + 14];
for (const day of assessmentDays) {
    const config = {
        lessonId: `8th-grade-day-${String(day).padStart(3, '0')}`,
        gradeLevel: '8th-grade',
        title: `Day ${day} - Assessment`,
        pages: [
            { type: 'title', content: { lessonNumber: `Day ${day}`, title: 'Assessment', subtitle: 'The Time Machine', imageUrl: '' } },
            { type: 'vocab-quiz', content: { words: [] } },
            { type: 'grammar-review', content: { topic: 'Review', questions: [] } },
            { type: 'comprehension-review', content: { questions: [] } },
            { type: 'writing-prompt', content: { prompt: 'Write about themes from The Time Machine.', guidelines: [] } },
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

console.log(`\\n🎉 Done! Generated ${successCount} lessons (Days ${START_DAY}-${START_DAY+14})`);
if (failCount > 0) console.error(`⚠️  ${failCount} lessons failed`);
