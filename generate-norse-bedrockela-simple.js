const fs = require('fs');

// Load what data we have
const comprehensionQuestions = JSON.parse(fs.readFileSync('norse-comprehension-questions.json', 'utf8'));
const informationalTexts = JSON.parse(fs.readFileSync('norse-informational-texts.json', 'utf8'));
const informationalQuestions = JSON.parse(fs.readFileSync('norse-informational-questions.json', 'utf8'));

// Norse story titles
const norseStories = {
  "141": "The Creation of the Nine Worlds",
  "142": "Odin's Quest for Wisdom",
  "143": "Thor and the Giants",
  "144": "Loki the Trickster",
  "146": "The Theft of Thor's Hammer",
  "147": "Freya and the Necklace",
  "148": "Balder's Death",
  "149": "The Binding of Fenrir",
  "151": "The World Serpent",
  "152": "Heimdall the Watchman",
  "153": "The Children of Loki",
  "154": "Skadi's Revenge",
  "156": "The Mead of Poetry",
  "157": "Idun's Apples",
  "158": "The Death of Balder",
  "159": "Ragnarok: The Twilight of the Gods"
};

// Vocabulary (3 words per story)
const vocabulary = {
  "141": [
    { word: "void", definition: "Complete emptiness; nothing at all — a space with no matter, no light, no sound." },
    { word: "forge", definition: "To shape metal by heating and hammering it; to create something strong through effort and skill." },
    { word: "realm", definition: "A kingdom or domain; a world or region ruled by someone or governed by particular laws." }
  ],
  "142": [
    { word: "sacrifice", definition: "Giving up something valuable for the sake of something more important; offering something precious to gain wisdom or power." },
    { word: "wisdom", definition: "Deep knowledge and good judgment gained from experience; understanding what is true, right, or lasting." },
    { word: "rune", definition: "An ancient letter from the Norse alphabet; a symbol believed to hold magical power or secret knowledge." }
  ],
  "143": [
    { word: "thunder", definition: "The loud rumbling sound that follows lightning; in Norse myths, the sound of Thor's hammer striking." },
    { word: "defy", definition: "To resist or refuse to obey; to challenge authority or stand up to someone powerful." },
    { word: "triumph", definition: "A great victory or achievement; winning after a hard struggle." }
  ]
  // Add more as needed...
};

const storyDays = [141, 142, 143, 144, 146, 147, 148, 149, 151, 152, 153, 154, 156, 157, 158, 159];
const assessmentDays = [145, 150, 155, 160];

// Generate all lessons
for (let day = 141; day <= 160; day++) {
  if (assessmentDays.includes(day)) {
    generateAssessment(day);
  } else if (storyDays.includes(day)) {
    generateRegularLesson(day);
  }
}

console.log('✅ Generated 20 BedrockELA Norse Mythology lessons (Days 141-160)');

function generateRegularLesson(day) {
  const storyTitle = norseStories[day];
  const vocab = vocabulary[day] || [
    { word: "placeholder1", definition: "Vocabulary will be added" },
    { word: "placeholder2", definition: "Vocabulary will be added" },
    { word: "placeholder3", definition: "Vocabulary will be added" }
  ];
  const questions = comprehensionQuestions[day] || [];
  const infoText = informationalTexts[day] || { title: "Viking Culture", text: "Content coming soon." };
  const infoQuestions = informationalQuestions[day] || [];
  
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
                                ${storyTitle}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Norse Mythology
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
                                <li>Read <em>${storyTitle}</em></li>
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
                
                // Page 4: Story Part 1
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle} (Part 1 of 3)</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                <p style="margin-bottom: 15px;">[Story content will be added]</p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 5: Story Part 2
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle} (Part 2 of 3)</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                <p style="margin-bottom: 15px;">[Story content will be added]</p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 6: Story Part 3
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle} (Part 3 of 3)</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                <p style="margin-bottom: 15px;">[Story content will be added]</p>
                            </div>
                        </div>
                    \`
                },
                
                // Page 7: Comprehension
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
                
                // Page 8: Informational Text
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
                
                // Page 9: Journal
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Journal Response</h2>
                            <p style="margin-bottom: 20px;"><strong>Choose one prompt:</strong></p>
                            <ul style="margin-bottom: 25px; line-height: 2;">
                                <li>What does this story teach us about Norse values or beliefs?</li>
                                <li>How is this character similar to or different from heroes in other stories you've read?</li>
                                <li>If you were in this situation, what would you have done differently?</li>
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
  console.log(`  ✓ Generated Day ${day}: ${storyTitle}`);
}

function generateAssessment(day) {
  const week = Math.ceil(day / 5);
  
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
                                Norse Mythology - Week ${week} Assessment
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
  console.log(`  ✓ Generated Day ${day}: Week ${week} Assessment`);
}
