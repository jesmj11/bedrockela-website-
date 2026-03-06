const fs = require('fs');

// Load Norse weekly skills
const norseSkills = JSON.parse(fs.readFileSync('norse-weekly-skills.json', 'utf8'));
const norseQuestions = JSON.parse(fs.readFileSync('norse-comprehension-questions.json', 'utf8'));
const norseInfoTexts = JSON.parse(fs.readFileSync('norse-informational-texts.json', 'utf8'));
const norseInfoQuestions = JSON.parse(fs.readFileSync('norse-informational-questions.json', 'utf8'));

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

const vocab = {
  "141": [
    { word: "void", definition: "Complete emptiness; nothing at all — a space with no matter, no light, no sound." },
    { word: "forge", definition: "To shape metal by heating and hammering it; to create something strong through effort and skill." },
    { word: "realm", definition: "A kingdom or domain; a world or region ruled by someone or governed by particular laws." }
  ],
  "142": [
    { word: "sacrifice", definition: "Giving up something valuable for the sake of something more important." },
    { word: "wisdom", definition: "Deep knowledge and good judgment gained from experience." },
    { word: "rune", definition: "An ancient letter from the Norse alphabet; a symbol believed to hold magical power." }
  ],
  "143": [
    { word: "thunder", definition: "The loud rumbling sound that follows lightning." },
    { word: "defy", definition: "To resist or refuse to obey; to challenge authority." },
    { word: "triumph", definition: "A great victory or achievement; winning after a hard struggle." }
  ]
};

console.log('Rebuilding Norse lessons 141-144 with grammar/language sections...');

for (let day = 141; day <= 144; day++) {
  generateNorseLesson(day);
}

console.log('✅ Rebuilt 4 Norse lessons with complete structure including grammar/language');

function generateNorseLesson(day) {
  const week = `week${Math.ceil(day / 5)}`;
  const weekNum = Math.ceil(day / 5);
  const storyTitle = norseStories[day];
  const vocabWords = vocab[day] || [];
  const questions = norseQuestions[day] || [];
  const infoText = norseInfoTexts[day] || { title: "Viking Culture", text: "Content coming soon." };
  const infoQuestions = norseInfoQuestions[day] || [];
  const skills = norseSkills[week];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${day} - 5th Grade BedrockELA</title>
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
                                Norse Mythology • Week ${weekNum}
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
                                <li>Learn 3 new vocabulary words</li>
                                <li>Answer comprehension questions</li>
                                <li>Practice: <em>${skills.grammar.skill}</em></li>
                                <li>Explore: <em>${skills.language.skill}</em></li>
                                <li>Read about Viking culture</li>
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
                            <h2>📖 Vocabulary Words</h2>
                            ${vocabWords.map((v, i) => `
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
                            `).join('')}
                        </div>
                    \`
                },
                
                // Pages 4-6: Story (3 parts)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle}</h2>
                            <p style="color: #666; margin-bottom: 20px;">Part 1 of 3</p>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                <p style="margin-bottom: 15px;">[Story content will be added]</p>
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle}</h2>
                            <p style="color: #666; margin-bottom: 20px;">Part 2 of 3</p>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                <p style="margin-bottom: 15px;">[Story content will be added]</p>
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle}</h2>
                            <p style="color: #666; margin-bottom: 20px;">Part 3 of 3</p>
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
                            <h2>💭 Reading Comprehension</h2>
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
                
                // Page 8: Grammar Practice
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✏️ Grammar: ${skills.grammar.skill}</h2>
                            <div style="background: #f0f7ff; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">What to know:</p>
                                <p style="line-height: 1.6;">${skills.grammar.explanation}</p>
                                
                                <p style="font-weight: 600; margin-top: 15px; margin-bottom: 10px;">Examples:</p>
                                <ul style="line-height: 1.8;">
                                    ${skills.grammar.examples.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <h3 style="margin-bottom: 15px;">Practice</h3>
                            ${skills.grammar.practice.map((p, i) => `
                            <div style="margin: 20px 0;">
                                <p style="font-weight: 600; color: #1E3A8A; margin-bottom: 10px;">${i + 1}. ${p.instruction}</p>
                                ${p.sentence1 ? `<p style="margin-bottom: 8px; font-style: italic;">"${p.sentence1}"</p>` : ''}
                                ${p.sentences ? `<p style="margin-bottom: 8px; font-style: italic;">${p.sentences}</p>` : ''}
                                ${p.sentence ? `<p style="margin-bottom: 8px; font-style: italic;">"${p.sentence}"</p>` : ''}
                                ${p.conjunction ? `<p style="margin-bottom: 8px;">Conjunction: <strong>${p.conjunction}</strong></p>` : ''}
                                <textarea 
                                  id="grammar-${i+1}"
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write your answer here..."
                                ></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },
                
                // Page 9: Language Skills
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎨 Language: ${skills.language.skill}</h2>
                            <div style="background: #fff8f0; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">What to know:</p>
                                <p style="line-height: 1.6;">${skills.language.explanation}</p>
                                
                                <p style="font-weight: 600; margin-top: 15px; margin-bottom: 10px;">Examples:</p>
                                <ul style="line-height: 1.8;">
                                    ${skills.language.examples.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <h3 style="margin-bottom: 15px;">Practice</h3>
                            ${skills.language.practice.map((p, i) => `
                            <div style="margin: 20px 0;">
                                <p style="font-weight: 600; color: #1E3A8A; margin-bottom: 10px;">${i + 1}. ${p.instruction}</p>
                                ${p.sentence ? `<p style="margin-bottom: 8px; font-style: italic;">"${p.sentence}"</p>` : ''}
                                ${p.hint ? `<p style="margin-bottom: 8px; color: #666;"><em>Hint: ${p.hint}</em></p>` : ''}
                                <textarea 
                                  id="language-${i+1}"
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write your answer here..."
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
                            <h2>📰 ${infoText.title}</h2>
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
                
                // Page 11: Journal
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Journal Response</h2>
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

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Day ${day}: ${storyTitle} (with grammar & language)`);
}
