#!/usr/bin/env node

/**
 * Build Greek & Roman Mythology Lessons (40 lessons)
 * Days 99-118 (Greek) + Days 119-138 (Roman)
 */

const fs = require('fs');

// Load data
const greekData = JSON.parse(fs.readFileSync('generated-5th-grade-greek.json', 'utf8'));
const romanData = JSON.parse(fs.readFileSync('generated-5th-grade-roman-fixed.json', 'utf8'));

// Grammar skills rotation
const grammarSkills = [
    {
        title: 'Grammar Practice',
        skill: 'Complex Sentences',
        explanation: 'Complex sentences combine independent and dependent clauses using subordinating conjunctions (because, although, when, if, since).',
        example: '"Although Zeus ruled the gods, he feared the Fates."',
        exercises: [
            'Combine using "because": "The hero was punished. He angered the gods."',
            'Combine using "although": "The goddess was powerful. She showed mercy."',
            'Write your own complex sentence about today\'s myth using "when".'
        ]
    },
    {
        title: 'Language Skills',
        skill: 'Greek & Latin Word Roots',
        explanation: 'Many English words come from Greek and Latin roots. Understanding these roots helps you learn new words.',
        example: '"Mythology" = mythos (story) + logos (study).',
        exercises: [
            'The root "chron" means time. What does "chronological" mean?',
            'The root "morph" means form. What does "metamorphosis" mean?',
            'Find a word from today\'s story with a Greek or Latin root and explain it.'
        ]
    },
    {
        title: 'Grammar Practice',
        skill: 'Comma Usage in Complex Sentences',
        explanation: 'When a dependent clause comes BEFORE an independent clause, use a comma. When it comes after, usually no comma needed.',
        example: 'WITH comma: "When Hercules finished his tasks, he was free." WITHOUT: "Hercules was free when he finished his tasks."',
        exercises: [
            'Add comma if needed: "Although the hero was warned he went ahead."',
            'Add comma if needed: "The god punished him because he was proud."',
            'Write a sentence starting with "Before" and use a comma correctly.'
        ]
    },
    {
        title: 'Language Skills',
        skill: 'Figurative Language: Simile and Metaphor',
        explanation: 'A simile compares using "like" or "as". A metaphor says one thing IS another.',
        example: 'Simile: "wise as an owl" / Metaphor: "Hermes was the wind itself"',
        exercises: [
            'Write a simile comparing a character from today\'s story to an animal.',
            'Write a metaphor about a god\'s power.',
            'Identify: "Zeus\' anger was a thunderstorm." Simile or metaphor?'
        ]
    }
];

function getGrammarSkill(dayNum) {
    return grammarSkills[(dayNum - 1) % 4];
}

function getWritingPrompt(dayNum, storyTitle) {
    const mod4 = (dayNum - 1) % 4;
    
    if (mod4 === 0 || mod4 === 2) { // Writing
        return {
            type: 'writing',
            prompt: mod4 === 0 
                ? `Write your opinion: Which character in "${storyTitle}" made the wisest choice? Support with evidence.`
                : `Explain the main lesson of "${storyTitle}". Use details from the story.`,
            wordCount: 150
        };
    } else { // Journal
        return {
            type: 'journal',
            prompt: mod4 === 1
                ? `How does "${storyTitle}" connect to your life? Have you faced a similar challenge?`
                : `If you could ask one character a question, what would you ask and why?`,
            wordCount: 100
        };
    }
}

function escapeHTML(text) {
    if (!text) return '';
    return text
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$')
        .replace(/\n/g, '\\n');
}

function generateLesson(dayNum, unitName, lesson) {
    const { title, vocabulary, comprehension, story, informational } = lesson;
    
    // Split story
    const paragraphs = story.split('\n\n').filter(p => p.trim());
    const third = Math.ceil(paragraphs.length / 3);
    const part1 = paragraphs.slice(0, third).join('\n\n');
    const part2 = paragraphs.slice(third, third * 2).join('\n\n');
    const part3 = paragraphs.slice(third * 2).join('\n\n');
    
    const grammarSkill = getGrammarSkill(dayNum);
    const writingPrompt = getWritingPrompt(dayNum, title);
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${dayNum} - 5th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>
    <script src="js/save-button-injector.js?v=1772665488"></script>
    <script src="js/answer-validation.js?v=1772665488"></script>
    <script src="js/grade-normalizer.js?v=1772665488"></script>
    <script src="js/offline-sync.js?v=1772665488"></script>
    <script src="js/text-to-speech.js?v=1772665488"></script>
    
    <script>
        const lesson${dayNum}Config = {
            lessonId: '5th-grade-day-${dayNum}',
            gradeLevel: '5th-grade',
            title: 'Lesson ${dayNum} - 5th Grade',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${dayNum}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #B91C1C; font-size: 20px; margin-top: 20px;">${unitName}</p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">${escapeHTML(title)}</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${dayNum}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read: <em>${escapeHTML(title)}</em></li>
                                <li>Learn 3 new vocabulary words</li>
                                <li>Practice ${escapeHTML(grammarSkill.skill)}</li>
                                <li>Read about ancient cultures</li>
                                <li>${writingPrompt.type === 'writing' ? 'Write: CCSS Standard' : 'Journal: Personal reflection'}</li>
                            </ul>
                            <p><strong>Time needed:</strong> 45-60 minutes</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            ${vocabulary.slice(0, 3).map((v, i) => `
                            <div style="margin: 30px 0; padding: 20px; background: white; border-radius: 12px; border: 2px solid #B91C1C;">
                                <div style="margin-bottom: 12px;">
                                    <span style="font-size: 28px; font-weight: 800; color: #305853;">${escapeHTML(v.word)}</span>
                                </div>
                                <p style="font-size: 16px; color: #444; margin-bottom: 15px;">
                                    <strong>Definition:</strong> ${escapeHTML(v.definition)}
                                </p>
                                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                                    Write this word in a sentence:
                                </p>
                                <textarea id="vocab-${i+1}" style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;" placeholder="Write your sentence (minimum 8 words)..."></textarea>
                                <div style="margin-top: 8px;">
                                  <span id="vocab-count-${i+1}" style="font-size: 13px; color: #666;">0 / 8 words</span>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Practice</h2>
                            <p style="margin-bottom: 20px;">Match each word to its definition:</p>
                            ${vocabulary.slice(0, 3).map((v, i) => `
                            <div style="margin: 15px 0; padding: 15px; background: #f9fafb; border-radius: 8px;">
                                <p style="font-weight: 700; color: #305853; margin-bottom: 8px;">${i+1}. ${escapeHTML(v.word)}</p>
                                <input type="text" id="vocab-game-${i+1}" placeholder="Type the definition..." style="width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 6px;" />
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${escapeHTML(title)} (Part 1 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${part1.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${escapeHTML(p)}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${escapeHTML(title)} (Part 2 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${part2.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${escapeHTML(p)}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${escapeHTML(title)} (Part 3 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${part3.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${escapeHTML(p)}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 20px;">Answer these questions about the story:</p>
                            ${comprehension.slice(0, 3).map((q, i) => `
                            <div style="margin: 25px 0;">
                                <p style="font-weight: 600; color: #305853; margin-bottom: 10px;">${i+1}. ${escapeHTML(q)}</p>
                                <textarea id="comp-${i+1}" style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;" placeholder="Write your answer (minimum 20 words)..."></textarea>
                                <span id="comp-count-${i+1}" style="font-size: 13px; color: #666;">0 / 20 words</span>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${escapeHTML(grammarSkill.title)}</h2>
                            <div style="background: rgba(48,88,83,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">${escapeHTML(grammarSkill.skill)}</p>
                                <p>${escapeHTML(grammarSkill.explanation)}</p>
                                <p style="margin-top: 10px;"><strong>Example:</strong> ${escapeHTML(grammarSkill.example)}</p>
                            </div>
                            ${grammarSkill.exercises.map((ex, i) => `
                            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
                                <p style="font-weight: 600; margin-bottom: 10px;">${i+1}. ${escapeHTML(ex)}</p>
                                <textarea id="grammar-${i+1}" style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;" placeholder="Your answer..."></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Informational Text: ${escapeHTML(informational.title)}</h2>
                            <div style="line-height: 1.8; font-size: 16px; margin-bottom: 25px;">
                                ${[informational.part1, informational.part2].filter(p => p).map(p => `<p style="margin-bottom: 15px;">${escapeHTML(p)}</p>`).join('')}
                            </div>
                            <h3 style="margin-top: 30px; color: #B91C1C;">Comprehension Questions</h3>
                            ${['What were the main cultural practices described?', 'How does this connect to the myth?'].map((q, i) => `
                            <div style="margin: 20px 0;">
                                <p style="font-weight: 600; margin-bottom: 10px;">${i+1}. ${escapeHTML(q)}</p>
                                <textarea id="info-${i+1}" style="width: 100%; min-height: 70px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;" placeholder="Your answer (minimum 15 words)..."></textarea>
                                <span id="info-count-${i+1}" style="font-size: 13px; color: #666;">0 / 15 words</span>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${writingPrompt.type === 'writing' ? 'Writing Skills (CCSS)' : 'Journal Response'}</h2>
                            <p style="font-size: 16px; margin-bottom: 20px; font-weight: 600; color: #305853;">
                                ${escapeHTML(writingPrompt.prompt)}
                            </p>
                            <textarea id="writing-response" style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;" placeholder="Write your response (minimum ${writingPrompt.wordCount} words)..."></textarea>
                            <div style="margin-top: 10px;">
                                <span id="writing-count" style="font-size: 14px; color: #666;">0 / ${writingPrompt.wordCount} words</span>
                            </div>
                        </div>
                    \`
                }
            ]
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${dayNum}Config);
        }
    </script>
</body>
</html>`;
    
    return html;
}

function generateAssessment(dayNum, unitName, weekVocab) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assessment ${dayNum} - 5th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>
    
    <script>
        const lesson${dayNum}Config = {
            lessonId: '5th-grade-day-${dayNum}',
            gradeLevel: '5th-grade',
            title: 'Assessment ${dayNum} - 5th Grade',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Week Assessment</h1>
                            <div class="subtitle">Lesson ${dayNum}</div>
                            <p style="color: #B91C1C; font-size: 20px; margin-top: 20px;">${unitName}</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Quiz</h2>
                            <p style="margin-bottom: 20px;">Write a definition for each word:</p>
                            ${weekVocab.map((word, i) => `
                            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
                                <p style="font-weight: 700; font-size: 18px; color: #305853; margin-bottom: 10px;">${i+1}. ${word}</p>
                                <textarea id="vocab-quiz-${i+1}" style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;" placeholder="Definition..."></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Great Work This Week!</h2>
                            <p>You've completed another week of ${unitName}!</p>
                            <div style="text-align: center; margin: 40px 0;">
                                <div style="font-size: 80px;">🎉</div>
                                <p style="font-size: 24px; font-weight: 700; color: #B91C1C; margin-top: 20px;">Week Complete!</p>
                            </div>
                        </div>
                    \`
                }
            ]
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${dayNum}Config);
        }
    </script>
</body>
</html>`;
}

console.log('🏛️  Building Greek & Roman Mythology Lessons\n');

let built = 0;

// Greek Mythology (Days 99-118)
console.log('⚡ Building Greek Mythology (Days 99-118)...');
const greekLessons = Object.keys(greekData).map(k => ({ num: parseInt(k), ...greekData[k] })).sort((a, b) => a.num - b.num);
let weekVocab = [];

for (let i = 0; i < 20; i++) {
    const day = 99 + i;
    const lesson = greekLessons[i];
    
    if ((i + 1) % 5 === 0) {
        fs.writeFileSync(`5th-grade-day-${day}.html`, generateAssessment(day, 'Greek Mythology', weekVocab.slice(0, 12)));
        weekVocab = [];
        built++;
        console.log(`  ✓ Day ${day} (Assessment)`);
    } else {
        fs.writeFileSync(`5th-grade-day-${day}.html`, generateLesson(day, 'Greek Mythology', lesson));
        weekVocab.push(...lesson.vocabulary.slice(0, 3).map(v => v.word));
        built++;
        console.log(`  ✓ Day ${day}: ${lesson.title}`);
    }
}

// Roman Mythology (Days 119-138)
console.log('\n🏛️  Building Roman Mythology (Days 119-138)...');
const romanLessons = Object.keys(romanData).map(k => ({ num: parseInt(k), ...romanData[k] })).sort((a, b) => a.num - b.num);
weekVocab = [];

for (let i = 0; i < 20; i++) {
    const day = 119 + i;
    const lesson = romanLessons[i];
    
    if ((i + 1) % 5 === 0) {
        fs.writeFileSync(`5th-grade-day-${day}.html`, generateAssessment(day, 'Roman Mythology', weekVocab.slice(0, 12)));
        weekVocab = [];
        built++;
        console.log(`  ✓ Day ${day} (Assessment)`);
    } else {
        fs.writeFileSync(`5th-grade-day-${day}.html`, generateLesson(day, 'Roman Mythology', lesson));
        weekVocab.push(...lesson.vocabulary.slice(0, 3).map(v => v.word));
        built++;
        console.log(`  ✓ Day ${day}: ${lesson.title}`);
    }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`✅ Built ${built} lessons (Greek + Roman mythology)`);
console.log(`${'='.repeat(50)}\n`);
