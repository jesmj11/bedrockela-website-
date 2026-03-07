#!/usr/bin/env node

/**
 * Build 5th Grade Mythology Final Curriculum
 * 
 * NEW LESSONS TO BUILD:
 * - Celtic Mythology (Days 49-54, 6 lessons)
 * - Egyptian Mythology (Days 55-58, 4 lessons)
 * 
 * EXISTING LESSONS TO RENUMBER:
 * - Greek: 161-180 → 99-118
 * - Roman: 181-200 → 119-138
 * - Norse: 141-160 → 139-158
 */

const fs = require('fs');
const path = require('path');

// Load JSON data
const celticData = JSON.parse(fs.readFileSync('generated-5th-grade-celtic.json', 'utf8'));
const egyptianData = JSON.parse(fs.readFileSync('generated-5th-grade-egyptian.json', 'utf8'));

// Helper: Split text into 3 parts
function splitIntoThreeParts(text) {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const third = Math.ceil(paragraphs.length / 3);
    
    return {
        part1: paragraphs.slice(0, third).join('\n\n'),
        part2: paragraphs.slice(third, third * 2).join('\n\n'),
        part3: paragraphs.slice(third * 2).join('\n\n')
    };
}

// Helper: Vocabulary game rotation
function getVocabGame(dayNum, allVocabSoFar) {
    const mod4 = (dayNum - 1) % 4;
    
    if (mod4 === 0) { // Day 1 - Matching
        return {
            type: 'matching',
            title: 'Vocabulary Matching Game',
            instruction: 'Match each word to its definition:',
            words: allVocabSoFar
        };
    } else if (mod4 === 1) { // Day 2 - Fill-in-the-blank
        return {
            type: 'fill-blank',
            title: 'Fill in the Blank',
            instruction: 'Choose the correct vocabulary word to complete each sentence:',
            words: allVocabSoFar
        };
    } else if (mod4 === 2) { // Day 3 - Sentence writing
        return {
            type: 'sentence-writing',
            title: 'Sentence Writing',
            instruction: 'Write original sentences using today\'s vocabulary words:',
            words: allVocabSoFar
        };
    } else { // Day 4 - Context clues
        return {
            type: 'context-clues',
            title: 'Context Clues Challenge',
            instruction: 'Read each passage and identify which vocabulary word fits best:',
            words: allVocabSoFar
        };
    }
}

// Helper: Grammar/Language rotation
function getGrammarOrLanguage(dayNum, mythology) {
    const mod4 = (dayNum - 1) % 4;
    
    if (mod4 === 0) { // Day 1
        return {
            type: 'grammar',
            title: 'Grammar Practice',
            skill: 'Complex Sentences with Subordinating Conjunctions',
            explanation: 'Complex sentences combine an independent clause with a dependent clause using subordinating conjunctions (because, although, when, if, since, etc.).',
            example: `"Although ${mythology} heroes faced danger, they never gave up."`,
            exercises: [
                'Combine these sentences using "because".',
                'Combine using "although".',
                'Write your own complex sentence about today\'s myth using "when".'
            ]
        };
    } else if (mod4 === 1) { // Day 2
        return {
            type: 'language',
            title: 'Language Skills',
            skill: 'Figurative Language: Metaphor and Simile',
            explanation: 'A metaphor says one thing IS another. A simile compares using "like" or "as".',
            example: 'Metaphor: "The hero was a lion in battle." Simile: "The hero fought like a lion."',
            exercises: [
                'Write a simile comparing a character from today\'s story to an animal.',
                'Write a metaphor about courage or wisdom.',
                'Identify whether the example is a simile or metaphor.'
            ]
        };
    } else if (mod4 === 2) { // Day 3
        return {
            type: 'grammar',
            title: 'Grammar Practice',
            skill: 'Comma Usage in Complex Sentences',
            explanation: 'When a dependent clause comes BEFORE an independent clause, use a comma. When it comes after, usually no comma.',
            example: 'Comma: "When the hero arrived, the battle began." No comma: "The battle began when the hero arrived."',
            exercises: [
                'Add comma if needed: "Although the quest was dangerous he accepted it."',
                'Add comma if needed: "The gods were pleased because he showed courage."',
                'Write a sentence about today\'s story starting with "Before" and use a comma correctly.'
            ]
        };
    } else { // Day 4
        return {
            type: 'language',
            title: 'Language Skills',
            skill: 'Word Roots and Etymology',
            explanation: 'Many English words come from ancient languages. Understanding word roots helps you figure out new words.',
            example: '"Hero" comes from the Greek word "heros" meaning protector or defender.',
            exercises: [
                'What root words can you find in today\'s mythology story?',
                'How does knowing word origins help you understand the story better?',
                'Find one word from today\'s story and research its origin.'
            ]
        };
    }
}

// Helper: Writing/Journal rotation
function getWritingOrJournal(dayNum, journalPrompt, opinionPrompt) {
    const mod4 = (dayNum - 1) % 4;
    
    if (mod4 === 0 || mod4 === 2) { // Days 1, 3 - Writing Skills
        return {
            type: 'writing',
            title: 'Writing Skills',
            standard: mod4 === 0 ? 'CCSS W.5.1 - Opinion Writing' : 'CCSS W.5.2 - Informative/Explanatory',
            prompt: opinionPrompt || 'Write your opinion about a character\'s choice in today\'s story. Support your opinion with evidence.',
            instruction: mod4 === 0 
                ? 'State your opinion clearly, provide at least 2 reasons with evidence from the story, and write a conclusion.'
                : 'Explain a concept from the story using facts and details. Organize your information logically.'
        };
    } else { // Days 2, 4 - Journal
        return {
            type: 'journal',
            title: 'Journal Response',
            prompt: journalPrompt || 'What did today\'s story teach you? How can you apply this lesson to your own life?',
            instruction: 'Write your personal thoughts and reflections. There are no wrong answers!'
        };
    }
}

// Generate HTML for regular lesson
function generateLesson(dayNum, unit, unitName, weekNum, data) {
    const isAssessment = (dayNum % 5 === 0);
    
    if (isAssessment) {
        return generateAssessment(dayNum, unit, unitName, weekNum);
    }
    
    const story = data[dayNum];
    if (!story) {
        console.error(`No data found for day ${dayNum}`);
        return null;
    }
    
    const weekStart = Math.floor((dayNum - 1) / 5) * 5 + 1;
    const dayInWeek = ((dayNum - 1) % 5) + 1;
    
    // Collect vocabulary for the week so far
    const weekVocab = [];
    for (let d = weekStart; d <= dayNum; d++) {
        if (data[d] && data[d].vocabulary) {
            weekVocab.push(...data[d].vocabulary.map(v => ({
                word: v.word,
                definition: v.definition
            })));
        }
    }
    
    const storyParts = splitIntoThreeParts(story.text);
    const vocabGame = getVocabGame(dayNum, weekVocab);
    const grammarLang = getGrammarOrLanguage(dayNum, unitName);
    const writing = getWritingOrJournal(dayNum, story.journal, story.opinion);
    
    const lessonConfig = {
        lessonId: `5th-grade-day-${dayNum}`,
        gradeLevel: '5th-grade',
        title: `Day ${dayNum}: ${story.title}`,
        pages: [
            // Page 1: Title
            {
                type: 'title',
                title: `Day ${dayNum}: ${story.title}`,
                subtitle: `${unitName} • Week ${Math.ceil(dayNum / 5)}`
            },
            
            // Page 2: Welcome & Objectives
            {
                type: 'objectives',
                title: 'Today\'s Learning Goals',
                objectives: [
                    'Learn 3 new vocabulary words',
                    'Practice vocabulary through games',
                    'Read and comprehend a mythology story',
                    `Practice ${grammarLang.type === 'grammar' ? 'grammar' : 'language'} skills`,
                    'Read an informational text',
                    `Complete ${writing.type === 'writing' ? 'writing skills' : 'journal reflection'}`
                ]
            },
            
            // Page 3: Vocabulary (3 words)
            {
                type: 'vocabulary',
                title: 'New Vocabulary Words',
                words: story.vocabulary.map(v => ({
                    word: v.word,
                    definition: v.definition,
                    sentence: v.sentence
                }))
            },
            
            // Page 4: Vocabulary Game
            {
                type: 'vocab-game',
                title: vocabGame.title,
                instruction: vocabGame.instruction,
                gameType: vocabGame.type,
                words: vocabGame.words
            },
            
            // Pages 5-7: Story (3 parts)
            {
                type: 'reading',
                title: `${story.title} - Part 1`,
                content: storyParts.part1
            },
            {
                type: 'reading',
                title: `${story.title} - Part 2`,
                content: storyParts.part2
            },
            {
                type: 'reading',
                title: `${story.title} - Part 3`,
                content: storyParts.part3
            },
            
            // Page 8: Comprehension
            {
                type: 'comprehension',
                title: 'Reading Comprehension',
                questions: story.comprehension.slice(0, 3).map((q, i) => ({
                    id: `comp-q${i+1}`,
                    question: q
                }))
            },
            
            // Page 9: Grammar or Language
            {
                type: grammarLang.type,
                title: grammarLang.title,
                skill: grammarLang.skill,
                explanation: grammarLang.explanation,
                example: grammarLang.example,
                exercises: grammarLang.exercises.map((ex, i) => ({
                    id: `grammar-${i+1}`,
                    prompt: ex
                }))
            },
            
            // Page 10: Informational Text
            {
                type: 'informational',
                title: story.informational.title,
                content: story.informational.part1 + '\n\n' + story.informational.part2,
                questions: [
                    { id: 'info-q1', question: 'What was the main idea of this informational text?' },
                    { id: 'info-q2', question: 'How does this information help you understand the story better?' }
                ]
            },
            
            // Page 11: Writing or Journal
            {
                type: writing.type,
                title: writing.title,
                standard: writing.standard,
                prompt: writing.prompt,
                instruction: writing.instruction,
                id: writing.type === 'writing' ? 'writing-response' : 'journal-entry'
            }
        ]
    };
    
    return generateHTML(lessonConfig, dayNum, unit);
}

// Generate HTML for assessment day
function generateAssessment(dayNum, unit, unitName, weekNum) {
    // Simple assessment structure - you can expand this
    const lessonConfig = {
        lessonId: `5th-grade-day-${dayNum}`,
        gradeLevel: '5th-grade',
        title: `Day ${dayNum}: Assessment`,
        pages: [
            {
                type: 'title',
                title: `Day ${dayNum}: Weekly Assessment`,
                subtitle: `${unitName} • Week ${weekNum}`
            },
            {
                type: 'assessment-intro',
                title: 'Weekly Assessment',
                content: 'Time to show what you\'ve learned this week! Take your time and do your best.'
            },
            {
                type: 'vocab-quiz',
                title: 'Vocabulary Quiz',
                instruction: 'Write the definition for each word:'
            },
            {
                type: 'grammar-quiz',
                title: 'Grammar & Language Review',
                instruction: 'Answer these questions about this week\'s skills:'
            },
            {
                type: 'comprehension-review',
                title: 'Reading Comprehension Review',
                instruction: 'Answer questions about this week\'s stories:'
            },
            {
                type: 'writing-prompt',
                title: 'Writing Prompt',
                prompt: 'Write about the most important lesson from this week\'s mythology stories.'
            },
            {
                type: 'completion',
                title: 'Great Work!',
                message: 'You\'ve completed this week\'s lessons. Keep up the excellent work!'
            }
        ]
    };
    
    return generateHTML(lessonConfig, dayNum, unit);
}

// Generate actual HTML file
function generateHTML(config, dayNum, unit) {
    const pagesHTML = config.pages.map((page, idx) => {
        return `<div class="lesson-page" data-page="${idx + 1}">
            ${generatePageContent(page, dayNum)}
        </div>`;
    }).join('\n');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} - BedrockELA</title>
    <link rel="stylesheet" href="../../../css/lesson-viewer.css?v=${Date.now()}">
    <style>
        body { font-family: 'Georgia', serif; background: #f5f5f5; }
        .lesson-container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .lesson-page { background: white; padding: 40px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        textarea { width: 100%; min-height: 100px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        .vocab-word { font-size: 1.5em; color: #2c5aa0; font-weight: bold; margin: 10px 0; }
        .vocab-definition { font-style: italic; color: #666; margin: 5px 0; }
        .vocab-sentence { margin: 10px 0; padding: 10px; background: #f9f9f9; border-left: 3px solid #2c5aa0; }
    </style>
</head>
<body>
    <div class="lesson-container">
        <div id="lesson-viewer">${pagesHTML}</div>
    </div>
    
    <script src="../../../js/lesson-viewer.js?v=${Date.now()}"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="../../../firebase-config.js"></script>
    <script src="../../../js/lesson-completion.js?v=${Date.now()}"></script>
    <script src="../../../js/lesson-autosave.js?v=${Date.now()}"></script>
    
    <script>
        const lesson${dayNum}Config = ${JSON.stringify(config, null, 2)};
        
        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${dayNum}Config);
        } else {
            console.error('initLessonViewer function not found');
        }
    </script>
</body>
</html>`;
}

// Generate page content based on type
function generatePageContent(page, dayNum) {
    switch (page.type) {
        case 'title':
            return `<h1>${page.title}</h1><p class="subtitle">${page.subtitle || ''}</p>`;
        
        case 'objectives':
            return `<h2>${page.title}</h2><ul>${page.objectives.map(obj => `<li>${obj}</li>`).join('')}</ul>`;
        
        case 'vocabulary':
            return `<h2>${page.title}</h2>${page.words.map((w, i) => `
                <div class="vocab-item">
                    <div class="vocab-word">${w.word}</div>
                    <div class="vocab-definition">${w.definition}</div>
                    <div class="vocab-sentence">${w.sentence}</div>
                    <label>Write the definition in your own words:</label>
                    <textarea id="vocab-${i+1}" data-autosave></textarea>
                </div>
            `).join('')}`;
        
        case 'vocab-game':
            return `<h2>${page.title}</h2><p>${page.instruction}</p><div class="vocab-game">${page.words.map(w => `<p><strong>${w.word}:</strong> ${w.definition}</p>`).join('')}</div>`;
        
        case 'reading':
            return `<h2>${page.title}</h2><div class="story-text">${page.content.replace(/\n\n/g, '</p><p>')}</p></div>`;
        
        case 'comprehension':
            return `<h2>${page.title}</h2>${page.questions.map(q => `
                <div class="question">
                    <label>${q.question}</label>
                    <textarea id="${q.id}" data-autosave></textarea>
                </div>
            `).join('')}`;
        
        case 'grammar':
        case 'language':
            return `<h2>${page.title}</h2>
                <p><strong>${page.skill}</strong></p>
                <p>${page.explanation}</p>
                <p><em>Example: ${page.example}</em></p>
                ${page.exercises.map(ex => `
                    <div class="exercise">
                        <label>${ex.prompt}</label>
                        <textarea id="${ex.id}" data-autosave></textarea>
                    </div>
                `).join('')}`;
        
        case 'informational':
            return `<h2>${page.title}</h2><div class="info-text">${page.content.replace(/\n\n/g, '</p><p>')}</p></div>
                ${page.questions.map(q => `
                    <div class="question">
                        <label>${q.question}</label>
                        <textarea id="${q.id}" data-autosave></textarea>
                    </div>
                `).join('')}`;
        
        case 'writing':
        case 'journal':
            return `<h2>${page.title}</h2>
                ${page.standard ? `<p><strong>${page.standard}</strong></p>` : ''}
                <p>${page.prompt}</p>
                <p><em>${page.instruction}</em></p>
                <textarea id="${page.id}" data-autosave style="min-height: 200px;"></textarea>`;
        
        default:
            return `<div>${JSON.stringify(page)}</div>`;
    }
}

// === MAIN BUILD PROCESS ===

console.log('🐉 Building 5th Grade Mythology - Final Curriculum');

// 1. Build Celtic lessons (Days 49-54)
console.log('\n📗 Building Celtic Mythology (Days 49-54)...');
const celticDir = 'curriculum/grade5/celtic';
if (!fs.existsSync(celticDir)) {
    fs.mkdirSync(celticDir, { recursive: true });
}

// Celtic has: 49, 51, 52, 53, 54 (day 50 would be assessment)
[49, 51, 52, 53, 54].forEach(day => {
    const html = generateLesson(day, 'celtic', 'Celtic Mythology', Math.ceil(day / 5), celticData);
    if (html) {
        fs.writeFileSync(path.join(celticDir, `5th-grade-lesson-${day}.html`), html);
        console.log(`✅ Built Day ${day}`);
    }
});

// Build assessment for day 50
const day50Assessment = generateAssessment(50, 'celtic', 'Celtic Mythology', 10);
fs.writeFileSync(path.join(celticDir, '5th-grade-lesson-50.html'), day50Assessment);
console.log(`✅ Built Day 50 (Assessment)`);

// 2. Build Egyptian lessons (Days 55-58)
console.log('\n📘 Building Egyptian Mythology (Days 55-58)...');
const egyptianDir = 'curriculum/grade5/egyptian';
if (!fs.existsSync(egyptianDir)) {
    fs.mkdirSync(egyptianDir, { recursive: true });
}

// Egyptian has: 56, 57, 58, 59 - using 56, 57, 58 as requested
[56, 57, 58].forEach(day => {
    const html = generateLesson(day, 'egyptian', 'Egyptian Mythology', Math.ceil(day / 5), egyptianData);
    if (html) {
        fs.writeFileSync(path.join(egyptianDir, `5th-grade-lesson-${day}.html`), html);
        console.log(`✅ Built Day ${day}`);
    }
});

// Build assessment for day 55
const day55Assessment = generateAssessment(55, 'egyptian', 'Egyptian Mythology', 11);
fs.writeFileSync(path.join(egyptianDir, '5th-grade-lesson-55.html'), day55Assessment);
console.log(`✅ Built Day 55 (Assessment)`);

console.log('\n✅ NEW LESSONS COMPLETE!');
console.log('📋 Next: Run renumber script for existing lessons (Greek, Roman, Norse)');
