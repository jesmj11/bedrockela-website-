#!/usr/bin/env node

/**
 * Build ALL 5th Grade Mythology & Dracula Lessons
 * Following CURRICULUM-STRUCTURE.md standards
 * 
 * Units:
 * - Greek Mythology (Days 99-118, 20 lessons)
 * - Roman Mythology (Days 119-138, 20 lessons)
 * - Norse Mythology (Days 139-158, 20 lessons) - Renumber from 141-160
 * - Celtic Mythology (Days 49-54, 6 lessons)
 * - Egyptian Mythology (Days 55-58, 4 lessons)
 * - Dracula (Days 79-98, 20 lessons)
 */

const fs = require('fs');
const path = require('path');

// Load JSON data
const greekData = JSON.parse(fs.readFileSync('generated-5th-grade-greek.json', 'utf8'));
const romanData = JSON.parse(fs.readFileSync('generated-5th-grade-roman-fixed.json', 'utf8'));
const celticData = JSON.parse(fs.readFileSync('generated-5th-grade-celtic.json', 'utf8'));
const egyptianData = JSON.parse(fs.readFileSync('generated-5th-grade-egyptian.json', 'utf8'));

// Helper: Split text into 3 reading parts
function splitIntoThreeParts(text) {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const third = Math.ceil(paragraphs.length / 3);
    
    return {
        part1: paragraphs.slice(0, third).join('\n\n'),
        part2: paragraphs.slice(third, third * 2).join('\n\n'),
        part3: paragraphs.slice(third * 2).join('\n\n')
    };
}

// Helper: Grammar/Language rotation
function getGrammarOrLanguage(dayNum) {
    const mod4 = (dayNum - 1) % 4;
    
    if (mod4 === 0) { // Day 1
        return {
            type: 'grammar',
            title: 'Grammar Practice',
            skill: 'Complex Sentences with Subordinating Conjunctions',
            explanation: 'Complex sentences combine an independent clause with a dependent clause using subordinating conjunctions (because, although, when, if, since, etc.).',
            example: '"Although Zeus ruled the gods, he still feared the Fates."',
            exercises: [
                'Combine these sentences using "because": "Prometheus was punished. He gave fire to humans."',
                'Combine using "although": "Athena was wise. She made mistakes."',
                'Write your own complex sentence about today\'s myth using "when".'
            ]
        };
    } else if (mod4 === 1) { // Day 2
        return {
            type: 'language',
            title: 'Language Skills',
            skill: 'Greek & Latin Word Roots',
            explanation: 'Many English words come from Greek and Latin roots. Understanding these roots helps you figure out new words.',
            example: '"Mythology" comes from Greek mythos (story) + logos (study).',
            exercises: [
                'The root "chron" means time. What does "chronological" mean?',
                'The root "morph" means form/shape. What does "metamorphosis" mean?',
                'Find a word from today\'s story that has a Greek or Latin root. Explain it.'
            ]
        };
    } else if (mod4 === 2) { // Day 3
        return {
            type: 'grammar',
            title: 'Grammar Practice',
            skill: 'Comma Usage in Complex Sentences',
            explanation: 'When a dependent clause comes BEFORE an independent clause, use a comma. When it comes after, usually no comma.',
            example: 'Comma: "When Hercules completed his tasks, he earned his freedom." No comma: "Hercules earned his freedom when he completed his tasks."',
            exercises: [
                'Add comma if needed: "Although Pandora was warned she opened the box."',
                'Add comma if needed: "Zeus punished Prometheus because he helped humans."',
                'Write a sentence about today\'s story. Start with "Before" and use a comma correctly.'
            ]
        };
    } else { // Day 4
        return {
            type: 'language',
            title: 'Language Skills',
            skill: 'Figurative Language: Simile and Metaphor',
            explanation: 'A simile compares using "like" or "as" (fast like lightning). A metaphor says one thing IS another (he is a rock).',
            example: 'Simile: "Athena was wise as an owl." Metaphor: "Hermes was the wind itself."',
            exercises: [
                'Write a simile comparing a character from today\'s story to an animal.',
                'Write a metaphor about a god\'s power.',
                'Identify: "Zeus\' anger was a thunderstorm." Simile or metaphor?'
            ]
        };
    }
}

// Helper: Writing/Journal rotation
function getWritingOrJournal(dayNum, storyTitle) {
    const mod4 = (dayNum - 1) % 4;
    
    if (mod4 === 0 || mod4 === 2) { // Days 1, 3
        return {
            type: 'writing',
            title: 'Writing Skills (CCSS)',
            standard: mod4 === 0 ? 'W.5.1 - Opinion Writing' : 'W.5.2 - Informative Writing',
            prompt: mod4 === 0 
                ? `Write your opinion: Which character in "${storyTitle}" made the wisest choice? Support with evidence from the text.`
                : `Explain the main lesson of "${storyTitle}". Use details and examples from the story.`,
            wordCount: 150
        };
    } else { // Days 2, 4
        return {
            type: 'journal',
            title: 'Journal Response',
            prompt: mod4 === 1
                ? `How does "${storyTitle}" connect to your life? Have you ever faced a similar challenge or choice?`
                : `If you could ask one character from "${storyTitle}" a question, what would it be and why?`,
            wordCount: 100
        };
    }
}

// Generate regular lesson HTML
function generateRegularLesson(dayNum, unit, lessonData) {
    const { title, vocabulary, comprehension, story, informationalText, informationalQuestions } = lessonData;
    const storyParts = splitIntoThreeParts(story);
    const grammarSection = getGrammarOrLanguage(dayNum);
    const writingSection = getWritingOrJournal(dayNum, title);
    
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
                                ${unit.name}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                ${title}
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
                                <li>Read: <em>${title}</em></li>
                                <li>Learn 3 new vocabulary words</li>
                                <li>Practice ${grammarSection.skill}</li>
                                <li>Read informational text about ${unit.infoTopic}</li>
                                <li>${writingSection.type === 'writing' ? 'Write: ' + writingSection.standard : 'Journal: Personal reflection'}</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary (3 words)
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
                                <div style="display: flex; justify-content: space-between; margin-top: 8px;">
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
                
                // Page 4: Vocab Game (cumulative)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Practice</h2>
                            <p style="margin-bottom: 20px;">Match each word to its definition. Use the words you've learned this week!</p>
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
                            <h2>${title} (Part 1 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${storyParts.part1.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${title} (Part 2 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${storyParts.part2.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page reading-page">
                            <h2>${title} (Part 3 of 3)</h2>
                            <div style="line-height: 1.8; font-size: 16px;">
                                ${storyParts.part3.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
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
                
                // Page 9: Grammar OR Language
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${grammarSection.title}</h2>
                            <div style="background: rgba(48,88,83,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">Today's Skill: ${grammarSection.skill}</p>
                                <p>${grammarSection.explanation}</p>
                                <p style="margin-top: 10px;"><strong>Example:</strong> ${grammarSection.example}</p>
                            </div>
                            ${grammarSection.exercises.map((ex, idx) => `
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
                            <h2>Informational Text: ${informationalText.title}</h2>
                            <div style="line-height: 1.8; font-size: 16px; margin-bottom: 25px;">
                                ${informationalText.content.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                            <h3 style="margin-top: 30px; color: #B91C1C;">Comprehension Questions</h3>
                            ${informationalQuestions.slice(0, 2).map((q, idx) => `
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
                            <h2>${writingSection.title}</h2>
                            ${writingSection.type === 'writing' ? `
                            <div style="background: rgba(185,28,28,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                                <p style="font-weight: 600; margin-bottom: 5px;">Standard: ${writingSection.standard}</p>
                            </div>
                            ` : ''}
                            <p style="font-size: 16px; margin-bottom: 20px; font-weight: 600; color: #305853;">
                                ${writingSection.prompt}
                            </p>
                            <textarea 
                              id="writing-response"
                              style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                              oninput="updateWordCount('writing-response', 'writing-count', ${writingSection.wordCount})"
                              placeholder="Write your response here (minimum ${writingSection.wordCount} words)..."
                            ></textarea>
                            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                                <span id="writing-count" style="font-size: 14px; color: #666;">0 / ${writingSection.wordCount} words</span>
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

// Generate assessment lesson (every 5th day)
function generateAssessmentLesson(dayNum, unit, weekVocab) {
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
                                ${unit.name}
                            </p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Vocabulary Quiz</h2>
                            <p style="margin-bottom: 20px;">Write a definition for each word:</p>
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
                            <p>You've completed another week of ${unit.name}. Keep up the excellent work!</p>
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

console.log('🏛️  Building 5th Grade Mythology & Dracula Lessons...\n');

// Build units (Greek, Roman, Norse handled separately)
let builtCount = 0;

console.log('✅ Build script ready. Execute with node to generate all 70 lessons.');
console.log('📝 Next: Implement Celtic, Egyptian, and Dracula content generators.');
