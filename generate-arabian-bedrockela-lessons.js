const fs = require('fs');

// Load data
const stories = JSON.parse(fs.readFileSync('arabian-stories.json', 'utf8'));
const vocabulary = JSON.parse(fs.readFileSync('arabian-vocabulary.json', 'utf8'));
const comprehensionQuestions = JSON.parse(fs.readFileSync('arabian-comprehension-questions.json', 'utf8'));
const informationalTexts = JSON.parse(fs.readFileSync('arabian-informational-texts.json', 'utf8'));
const informationalQuestions = JSON.parse(fs.readFileSync('arabian-informational-questions.json', 'utf8'));

// Generate lessons Days 181-190
for (let day = 181; day <= 190; day++) {
  if ([185, 190].includes(day)) {
    generateAssessment(day);
  } else if (day === 189) {
    generateReview(day);
  } else {
    generateRegularLesson(day);
  }
}

console.log('✅ Generated 10 BedrockELA Arabian Nights lessons (Days 181-190)');

function generateRegularLesson(day) {
  const story = stories[day];
  if (!story) return;
  
  const vocab = vocabulary[day] || [];
  const questions = comprehensionQuestions[day] || [];
  const infoText = informationalTexts[day];
  const infoQuestions = informationalQuestions[day] || [];
  
  const storyParts = splitStory(story.text, 3); // 3 parts
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${day} - 5th Grade BedrockELA</title>
    <link rel="stylesheet" href="../../css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="../../js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="../../firebase-config.js"></script>
    <script src="../../js/lesson-completion.js?v=1772665488"></script>
    <script src="../../js/lesson-autosave.js?v=1772665488"></script>
    <script src="../../js/save-button-injector.js?v=1772665488"></script>
    <script src="../../js/answer-validation.js?v=1772665488"></script>
    <script src="../../js/grade-normalizer.js?v=1772665488"></script>
    <script src="../../js/offline-sync.js?v=1772665488"></script>
    <script src="../../js/text-to-speech.js?v=1772665488"></script>
    
    <script>
        const lesson${day}Config = {
            lessonId: '5th-grade-day-${day}',
            gradeLevel: '5th-grade',
            title: 'Lesson ${day} - 5th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #1E3A8A; font-size: 20px; margin-top: 20px;">
                                ${story.title}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Arabian Nights
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Welcome & Objectives
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read <em>${story.title}</em></li>
                                <li>Learn ${vocab.length} new vocabulary words</li>
                                <li>Read informational text: <em>${infoText.title}</em></li>
                                <li>Answer comprehension questions</li>
                                <li>Write a journal response</li>
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
                            ${vocab.map((v, i) => `
                            <div style="margin: 30px 0;">
                                <div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #1E3A8A;">
                                    <div style="margin-bottom: 12px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${v.word}</span>
                                    </div>
                                    <p style="font-size: 16px; color: #666; margin-bottom: 15px; line-height: 1.6;">
                                        ${v.definition}
                                    </p>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                                        Write the definition in your own words:
                                    </p>
                                    <textarea 
                                      id="vocab-${i+1}"
                                      style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                      placeholder="Type the definition here..."
                                    ></textarea>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                
                ${storyParts.map((part, idx) => `
                // Page ${idx + 4}: Story Part ${idx + 1}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${story.title} (Part ${idx + 1} of ${storyParts.length})</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                ${part.replace(/`/g, '\\`').replace(/\$/g, '\\$')}
                            </div>
                        </div>
                    \`
                },
                `).join('\n')}
                
                // Page ${storyParts.length + 4}: Comprehension
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 20px;">Answer these questions about the story:</p>
                            ${questions.map((q, i) => `
                            <div style="margin: 25px 0;">
                                <p style="font-weight: 600; color: #1E3A8A; margin-bottom: 10px;">Question ${i + 1}:</p>
                                <p style="margin-bottom: 12px; line-height: 1.6;">${q}</p>
                                <textarea 
                                  id="comp-${i+1}"
                                  style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write your answer here..."
                                ></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                
                // Page ${storyParts.length + 5}: Informational Text
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${infoText.title}</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px; margin-bottom: 30px;">
                                ${infoText.text.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}
                            </div>
                            <h3 style="margin-top: 30px; margin-bottom: 15px;">Understanding the Text</h3>
                            ${infoQuestions.map((q, i) => `
                            <div style="margin: 25px 0;">
                                <p style="font-weight: 600; color: #1E3A8A; margin-bottom: 10px;">Question ${i + 1}:</p>
                                <p style="margin-bottom: 12px;">${q}</p>
                                <textarea 
                                  id="info-${i+1}"
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write your answer here..."
                                ></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                
                // Page ${storyParts.length + 6}: Journal
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Journal Response</h2>
                            <p style="margin-bottom: 20px;"><strong>Choose one prompt:</strong></p>
                            <ul style="margin-bottom: 25px; line-height: 2;">
                                <li>Which character showed the most courage or cleverness? Explain with examples.</li>
                                <li>If you could ask the main character one question, what would it be and why?</li>
                                <li>Write about a time you solved a problem creatively.</li>
                            </ul>
                            <textarea 
                              id="journal"
                              style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                              placeholder="Write your response here..."
                            ></textarea>
                        </div>
                    \`
                }
            ]
        };

        // Initialize lesson viewer
        if (typeof LessonViewer !== 'undefined') {
            new LessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Generated Day ${day}: ${story.title}`);
}

function generateAssessment(day) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${day} - Assessment - 5th Grade BedrockELA</title>
    <link rel="stylesheet" href="../../css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>
    <script src="../../js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="../../firebase-config.js"></script>
    <script src="../../js/lesson-completion.js?v=1772665488"></script>
    <script>
        const lesson${day}Config = {
            lessonId: '5th-grade-day-${day}',
            gradeLevel: '5th-grade',
            title: 'Lesson ${day} - Assessment',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${day}</h1>
                            <div class="subtitle">5th Grade ELA - Assessment</div>
                            <p style="color: #1E3A8A; font-size: 20px; margin-top: 20px;">
                                Arabian Nights Assessment
                            </p>
                        </div>
                    \`
                }
            ]
        };
        if (typeof LessonViewer !== 'undefined') {
            new LessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;
  
  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Generated Day ${day}: Assessment`);
}

function generateReview(day) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${day} - Review - 5th Grade BedrockELA</title>
    <link rel="stylesheet" href="../../css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>
    <script src="../../js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="../../firebase-config.js"></script>
    <script src="../../js/lesson-completion.js?v=1772665488"></script>
    <script>
        const lesson${day}Config = {
            lessonId: '5th-grade-day-${day}',
            gradeLevel: '5th-grade',
            title: 'Lesson ${day} - Review',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${day}</h1>
                            <div class="subtitle">5th Grade ELA - Review</div>
                            <p style="color: #1E3A8A; font-size: 20px; margin-top: 20px;">
                                Arabian Nights Review
                            </p>
                        </div>
                    \`
                }
            ]
        };
        if (typeof LessonViewer !== 'undefined') {
            new LessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;
  
  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Generated Day ${day}: Review`);
}

function splitStory(text, parts) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  const perPart = Math.ceil(paragraphs.length / parts);
  const result = [];
  
  for (let i = 0; i < parts; i++) {
    const start = i * perPart;
    const end = Math.min(start + perPart, paragraphs.length);
    result.push(paragraphs.slice(start, end).map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join(''));
  }
  
  return result;
}
