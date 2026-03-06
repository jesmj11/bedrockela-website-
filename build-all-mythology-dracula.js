#!/usr/bin/env node

/**
 * BUILD ALL 5TH GRADE MYTHOLOGY & DRACULA LESSONS
 * Following CURRICULUM-STRUCTURE.md exactly
 * 
 * Total: 70 lessons
 */

const fs = require('fs');

console.log('🏛️  BedrockELA 5th Grade - Mythology & Dracula Builder\n');
console.log('Building 70 complete lessons...\n');

// ========================================
// LESSON TEMPLATE GENERATORS
// ========================================

function generateLessonHTML(config) {
    const {
        dayNum,
        unitName,
        storyTitle,
        vocabulary,  // Array of {word, definition, sentence}
        storyText,   // Full story text
        comprehension, // Array of questions
        infoText,    // {title, content}
        infoQuestions, // Array of questions for info text
        grammarSkill, // {title, explanation, example, exercises}
        writingPrompt // {type, prompt, wordCount}
    } = config;
    
    // Split story into 3 parts
    const paragraphs = storyText.split('\n\n').filter(p => p.trim());
    const third = Math.ceil(paragraphs.length / 3);
    const part1 = paragraphs.slice(0, third).join('\n\n');
    const part2 = paragraphs.slice(third, third * 2).join('\n\n');
    const part3 = paragraphs.slice(third * 2).join('\n\n');
    
    return `<!DOCTYPE html>
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
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${dayNum}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #B91C1C; font-size: 20px; margin-top: 20px;">
                                ${unitName}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                ${storyTitle}
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Welcome
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${dayNum}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read: <em>${storyTitle}</em></li>
                                <li>Learn 3 new vocabulary words</li>
                                <li>Practice ${grammarSkill.title}</li>
                                <li>Read informational text: ${infoText.title}</li>
                                <li>${writingPrompt.type === 'writing' ? 'Write: CCSS Writing Standard' : 'Journal: Personal reflection'}</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            ${vocabulary.slice(0, 3).map((v, idx) => `
                            <div style="margin: 30px 0; padding: 20px; background: white; border-radius: 12px; border: 2px solid #B91C1C;">
                                <div style="margin-bottom: 12px;">
                                    <span style="font-size: 28px; font-weight: 800; color: #305853;">${v.word}</span>
                                </div>
                                <p style="font-size: 16px; color: #444; margin-bottom: 15px;">
                                    <strong>Definition:</strong> ${v.definition}
                                </p>
                                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                                    Write this word in a sentence of your own:
                                </p>
                                <textarea 
                                  id="vocab-${idx + 1}"
                                  style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  oninput="updateWordCount('vocab-${idx + 1}', 'vocab-count-${idx + 1}', 8)"
                                  placeholder="Write your sentence here (minimum 8 words)..."
                                ></textarea>
                                <div style="margin-top: 8px;">
                                  <span id="vocab-count-${idx + 1}" style="font-size: 13px; color: #666;">0 / 8 words</span>
                                </div>
                            </div>
                            `).join('')}
                            <div style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                <p style="margin: 0;"><strong>Watch for these words</strong> in today's reading!</p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 4: Vocab Game
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Practice</h2>
                            <p style="margin-bottom: 20px;">Match each word to its definition:</p>
                            <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #305853;">
                                ${vocabulary.slice(0, 3).map((v, idx) => `
                                <div style="margin: 15px 0; padding: 15px; background: #f9fafb; border-radius: 8px;">
                                    <p style="font-weight: 700; color: #305853; margin-bottom: 8px;">${idx + 1}. ${v.word}</p>
                                    <input type="text" 
                                           id="vocab-game-${idx + 1}" 
                                           placeholder="Type the definition..."
                                           style="width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 6px; font-size: 14px;" />
                                </div>
                                `).join('')}
                            </div>
                        </div>
                    \`
                },
                
                // Pages 5-7: Story (3 parts)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${storyTitle} (Part 1 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${part1.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${storyTitle} (Part 2 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${part2.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${storyTitle} (Part 3 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${part3.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                
                // Page 8: Comprehension
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 20px;">Answer these questions about the story:</p>
                            ${comprehension.slice(0, 3).map((q, idx) => `
                            <div style="margin: 25px 0;">
                                <p style="font-weight: 600; color: #305853; margin-bottom: 10px;">${idx + 1}. ${q}</p>
                                <textarea 
                                  id="comp-${idx + 1}"
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  oninput="updateWordCount('comp-${idx + 1}', 'comp-count-${idx + 1}', 20)"
                                  placeholder="Write your answer here (minimum 20 words)..."
                                ></textarea>
                                <span id="comp-count-${idx + 1}" style="font-size: 13px; color: #666; display: block; margin-top: 5px;">0 / 20 words</span>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                
                // Page 9: Grammar/Language
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${grammarSkill.title}</h2>
                            <div style="background: rgba(48,88,83,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">${grammarSkill.skill}</p>
                                <p>${grammarSkill.explanation}</p>
                                <p style="margin-top: 10px;"><strong>Example:</strong> ${grammarSkill.example}</p>
                            </div>
                            ${grammarSkill.exercises.map((ex, idx) => `
                            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
                                <p style="font-weight: 600; margin-bottom: 10px;">${idx + 1}. ${ex}</p>
                                <textarea 
                                  id="grammar-${idx + 1}"
                                  style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"
                                  placeholder="Your answer..."
                                ></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                
                // Page 10: Informational Text
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Informational Text: ${infoText.title}</h2>
                            <div style="line-height: 1.8; font-size: 16px; margin-bottom: 25px;">
                                ${infoText.content.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                            <h3 style="margin-top: 30px; color: #B91C1C;">Comprehension Questions</h3>
                            ${infoQuestions.slice(0, 2).map((q, idx) => `
                            <div style="margin: 20px 0;">
                                <p style="font-weight: 600; margin-bottom: 10px;">${idx + 1}. ${q}</p>
                                <textarea 
                                  id="info-${idx + 1}"
                                  style="width: 100%; min-height: 70px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"
                                  oninput="updateWordCount('info-${idx + 1}', 'info-count-${idx + 1}', 15)"
                                  placeholder="Your answer (minimum 15 words)..."
                                ></textarea>
                                <span id="info-count-${idx + 1}" style="font-size: 13px; color: #666; display: block; margin-top: 5px;">0 / 15 words</span>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                
                // Page 11: Writing/Journal
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${writingPrompt.type === 'writing' ? 'Writing Skills (CCSS)' : 'Journal Response'}</h2>
                            <p style="font-size: 16px; margin-bottom: 20px; font-weight: 600; color: #305853;">
                                ${writingPrompt.prompt}
                            </p>
                            <textarea 
                              id="writing-response"
                              style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                              oninput="updateWordCount('writing-response', 'writing-count', ${writingPrompt.wordCount})"
                              placeholder="Write your response here (minimum ${writingPrompt.wordCount} words)..."
                            ></textarea>
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
}

function generateAssessmentHTML(dayNum, unitName, weekVocab) {
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
                            <p style="color: #B91C1C; font-size: 20px; margin-top: 20px;">
                                ${unitName}
                            </p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Quiz</h2>
                            <p style="margin-bottom: 20px;">Write a definition for each word from this week:</p>
                            ${weekVocab.map((word, idx) => `
                            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
                                <p style="font-weight: 700; font-size: 18px; color: #305853; margin-bottom: 10px;">${idx + 1}. ${word}</p>
                                <textarea 
                                  id="vocab-quiz-${idx + 1}"
                                  style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit;"
                                  placeholder="Write the definition..."
                                ></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Great Work This Week!</h2>
                            <p>You've completed another week of ${unitName}. Keep up the excellent work!</p>
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

// ========================================
// GRAMMAR/LANGUAGE SKILL ROTATIONS
// ========================================

const grammarSkills = {
    day1: {
        title: 'Grammar Practice',
        skill: 'Complex Sentences with Subordinating Conjunctions',
        explanation: 'Complex sentences combine an independent clause with a dependent clause using subordinating conjunctions (because, although, when, if, since, etc.).',
        example: '"Although Zeus ruled the gods, he still feared the Fates."',
        exercises: [
            'Combine these sentences using "because": "The hero was rewarded. He saved the village."',
            'Combine using "although": "The goddess was powerful. She showed mercy."',
            'Write your own complex sentence about today\'s myth using "when".'
        ]
    },
    day2: {
        title: 'Language Skills',
        skill: 'Greek & Latin Word Roots',
        explanation: 'Many English words come from Greek and Latin roots. Understanding these roots helps you figure out new words.',
        example: '"Mythology" comes from Greek mythos (story) + logos (study).',
        exercises: [
            'The root "chron" means time. What does "chronological" mean?',
            'The root "morph" means form/shape. What does "metamorphosis" mean?',
            'Find a word from today\'s story that has a Greek or Latin root. Explain it.'
        ]
    },
    day3: {
        title: 'Grammar Practice',
        skill: 'Comma Usage in Complex Sentences',
        explanation: 'When a dependent clause comes BEFORE an independent clause, use a comma. When it comes after, usually no comma.',
        example: 'Comma: "When Hercules completed his tasks, he earned his freedom." No comma: "Hercules earned his freedom when he completed his tasks."',
        exercises: [
            'Add comma if needed: "Although the hero was warned he went ahead."',
            'Add comma if needed: "The god punished him because he was proud."',
            'Write a sentence about today\'s story. Start with "Before" and use a comma correctly.'
        ]
    },
    day4: {
        title: 'Language Skills',
        skill: 'Figurative Language: Simile and Metaphor',
        explanation: 'A simile compares using "like" or "as" (fast like lightning). A metaphor says one thing IS another (he is a rock).',
        example: 'Simile: "Athena was wise as an owl." Metaphor: "Hermes was the wind itself."',
        exercises: [
            'Write a simile comparing a character from today\'s story to an animal.',
            'Write a metaphor about a god\'s power.',
            'Identify: "Zeus\' anger was a thunderstorm." Simile or metaphor?'
        ]
    }
};

function getGrammarSkill(dayNum) {
    const mod4 = (dayNum - 1) % 4;
    return grammarSkills[`day${mod4 + 1}`];
}

function getWritingPrompt(dayNum, storyTitle) {
    const mod4 = (dayNum - 1) % 4;
    
    if (mod4 === 0 || mod4 === 2) { // Days 1, 3 - Writing
        return {
            type: 'writing',
            prompt: mod4 === 0 
                ? `Write your opinion: Which character in "${storyTitle}" made the wisest choice? Support with evidence from the text.`
                : `Explain the main lesson of "${storyTitle}". Use details and examples from the story.`,
            wordCount: 150
        };
    } else { // Days 2, 4 - Journal
        return {
            type: 'journal',
            prompt: mod4 === 1
                ? `How does "${storyTitle}" connect to your life? Have you ever faced a similar challenge or choice?`
                : `If you could ask one character from "${storyTitle}" a question, what would it be and why?`,
            wordCount: 100
        };
    }
}

// ========================================
// BUILD FUNCTIONS
// ========================================

let totalBuilt = 0;

// Celtic Mythology (Days 49-54, 6 lessons)
function buildCeltic() {
    console.log('🍀 Building Celtic Mythology (Days 49-54)...');
    const celticData = JSON.parse(fs.readFileSync('generated-5th-grade-celtic.json', 'utf8'));
    
    // Days 49-53: Regular lessons (5 lessons)
    for (let day = 49; day <= 53; day++) {
        const lesson = celticData[day.toString()];
        
        if (!lesson) {
            console.log(`⚠️  Skipping day ${day} - no data found`);
            continue;
        }
        
        const config = {
            dayNum: day,
            unitName: 'Celtic Mythology',
            storyTitle: lesson.title,
            vocabulary: lesson.vocabulary,
            storyText: lesson.story,
            comprehension: lesson.comprehension,
            infoText: { title: lesson.informational.title, content: lesson.informational.part1 + '\n\n' + lesson.informational.part2 },
            infoQuestions: ['What were the main cultural practices described?', 'How does this connect to the myth?'],
            grammarSkill: getGrammarSkill(day),
            writingPrompt: getWritingPrompt(day, lesson.title)
        };
        
        const html = generateLessonHTML(config);
        fs.writeFileSync(`5th-grade-day-${day}.html`, html);
        totalBuilt++;
    }
    
    // Day 54: Assessment
    const weekVocab = [];
    for (let day = 49; day <= 53; day++) {
        const lesson = celticData[day.toString()];
        if (lesson) {
            weekVocab.push(...lesson.vocabulary.slice(0, 3).map(v => v.word));
        }
    }
    
    const assessmentHTML = generateAssessmentHTML(54, 'Celtic Mythology', weekVocab.slice(0, 12));
    fs.writeFileSync('5th-grade-day-54.html', assessmentHTML);
    totalBuilt++;
    
    console.log('✅ Celtic Mythology complete (6 lessons)\n');
}

// Egyptian Mythology (Days 55-58, 4 lessons)
function buildEgyptian() {
    console.log('🔺 Building Egyptian Mythology (Days 55-58)...');
    const egyptianData = JSON.parse(fs.readFileSync('generated-5th-grade-egyptian.json', 'utf8'));
    
    // Days 55-58: Regular lessons (4 lessons, no assessment)
    for (let day = 55; day <= 58; day++) {
        const lesson = egyptianData[day.toString()];
        
        if (!lesson) {
            console.log(`⚠️  Skipping day ${day} - no data found`);
            continue;
        }
        
        const config = {
            dayNum: day,
            unitName: 'Egyptian Mythology',
            storyTitle: lesson.title,
            vocabulary: lesson.vocabulary,
            storyText: lesson.story,
            comprehension: lesson.comprehension,
            infoText: { title: lesson.informational.title, content: lesson.informational.part1 + '\n\n' + lesson.informational.part2 },
            infoQuestions: ['What were the main cultural practices described?', 'How does this connect to the myth?'],
            grammarSkill: getGrammarSkill(day),
            writingPrompt: getWritingPrompt(day, lesson.title)
        };
        
        const html = generateLessonHTML(config);
        fs.writeFileSync(`5th-grade-day-${day}.html`, html);
        totalBuilt++;
    }
    
    console.log('✅ Egyptian Mythology complete (4 lessons)\n');
}

// Greek Mythology (Days 99-118, 20 lessons)
function buildGreek() {
    console.log('⚡ Building Greek Mythology (Days 99-118)...');
    const greekData = JSON.parse(fs.readFileSync('generated-5th-grade-greek.json', 'utf8'));
    
    const lessons = Object.keys(greekData).map(k => ({
        num: parseInt(k),
        ...greekData[k]
    })).sort((a, b) => a.num - b.num);
    
    let weekVocab = [];
    
    for (let i = 0; i < 20; i++) {
        const day = 99 + i;
        const lesson = lessons[i];
        
        if ((i + 1) % 5 === 0) {
            // Assessment day
            const assessmentHTML = generateAssessmentHTML(day, 'Greek Mythology', weekVocab.slice(0, 12));
            fs.writeFileSync(`5th-grade-day-${day}.html`, assessmentHTML);
            weekVocab = [];
            totalBuilt++;
        } else {
            // Regular day
            const config = {
                dayNum: day,
                unitName: 'Greek Mythology',
                storyTitle: lesson.title,
                vocabulary: lesson.vocabulary,
                storyText: lesson.story,
                comprehension: lesson.comprehension,
                infoText: { title: lesson.informational.title, content: lesson.informational.part1 + '\n\n' + lesson.informational.part2 },
                infoQuestions: ['What were the main cultural practices described?', 'How does this connect to the myth?'],
                grammarSkill: getGrammarSkill(day),
                writingPrompt: getWritingPrompt(day, lesson.title)
            };
            
            weekVocab.push(...lesson.vocabulary.slice(0, 3).map(v => v.word));
            
            const html = generateLessonHTML(config);
            fs.writeFileSync(`5th-grade-day-${day}.html`, html);
            totalBuilt++;
        }
    }
    
    console.log('✅ Greek Mythology complete (20 lessons)\n');
}

// Roman Mythology (Days 119-138, 20 lessons)
function buildRoman() {
    console.log('🏛️ Building Roman Mythology (Days 119-138)...');
    const romanData = JSON.parse(fs.readFileSync('generated-5th-grade-roman-fixed.json', 'utf8'));
    
    const lessons = Object.keys(romanData).map(k => ({
        num: parseInt(k),
        ...romanData[k]
    })).sort((a, b) => a.num - b.num);
    
    let weekVocab = [];
    
    for (let i = 0; i < 20; i++) {
        const day = 119 + i;
        const lesson = lessons[i];
        
        if ((i + 1) % 5 === 0) {
            // Assessment day
            const assessmentHTML = generateAssessmentHTML(day, 'Roman Mythology', weekVocab.slice(0, 12));
            fs.writeFileSync(`5th-grade-day-${day}.html`, assessmentHTML);
            weekVocab = [];
            totalBuilt++;
        } else {
            // Regular day
            const config = {
                dayNum: day,
                unitName: 'Roman Mythology',
                storyTitle: lesson.title,
                vocabulary: lesson.vocabulary,
                storyText: lesson.story,
                comprehension: lesson.comprehension,
                infoText: { title: lesson.informational.title, content: lesson.informational.part1 + '\n\n' + lesson.informational.part2 },
                infoQuestions: ['What were the main cultural practices described?', 'How does this connect to the myth?'],
                grammarSkill: getGrammarSkill(day),
                writingPrompt: getWritingPrompt(day, lesson.title)
            };
            
            weekVocab.push(...lesson.vocabulary.slice(0, 3).map(v => v.word));
            
            const html = generateLessonHTML(config);
            fs.writeFileSync(`5th-grade-day-${day}.html`, html);
            totalBuilt++;
        }
    }
    
    console.log('✅ Roman Mythology complete (20 lessons)\n');
}

// TODO: Norse (already exists as 139-158, need to verify format)
// TODO: Dracula (Days 79-98, needs content creation)

// ========================================
// MAIN EXECUTION
// ========================================

buildCeltic();
buildEgyptian();
buildGreek();
buildRoman();

console.log('='.repeat(50));
console.log(`✅ Total lessons built: ${totalBuilt}`);
console.log('📝 Still needed: Norse verification & Dracula creation');
console.log('='.repeat(50));
