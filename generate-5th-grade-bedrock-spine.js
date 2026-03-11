const fs = require('fs');

console.log('📚 Generating 5th Grade Robin Hood - Bedrock Spine\n');

// Load grammar and language lessons
const grammarLessons = JSON.parse(fs.readFileSync('./book-data/robin-hood-grammar.json', 'utf8'));
const languageLessons = JSON.parse(fs.readFileSync('./book-data/robin-hood-language.json', 'utf8'));

console.log(`📝 Loaded ${Object.keys(grammarLessons).length} grammar lessons`);
console.log(`📝 Loaded ${Object.keys(languageLessons).length} language lessons\n`);

// Create informational texts (placeholder for now - to be filled later)
const infoTexts = {
  1: {
    title: "Medieval England: The Time of Robin Hood",
    content: `<p>Robin Hood's story takes place during the reign of King Richard I (called "Richard the Lionheart") in the late 1100s. This was the height of the Middle Ages in England, a time when society was strictly divided into classes.</p>
    <p>At the top were the nobles — dukes, earls, and barons who owned vast estates and served the king in exchange for land. Below them were knights, who fought in armor and followed a code of honor called chivalry. The church was also powerful, with bishops and abbots controlling huge amounts of wealth.</p>
    <p>At the bottom were the common people: farmers, craftsmen, servants, and laborers. They had almost no rights. The nobles could tax them heavily, and if someone couldn't pay, they could lose everything. Poaching (hunting the king's deer) was a crime punishable by death or mutilation.</p>
    <p>The forest laws were especially harsh. The king claimed all forests and their animals as his property. Poor people who hunted to feed their families could be hanged, blinded, or have their hands cut off. This cruelty is why Robin Hood became a symbol of resistance — he stole from the rich to help those crushed by an unfair system.</p>`,
    questions: [
      "Why were the forest laws so important in medieval England?",
      "How does understanding this historical context help you understand why Robin Hood became a hero to common people?"
    ]
  }
};

// Copy info text 1 for all 30 days (can be customized later)
for (let i = 2; i <= 30; i++) {
  if (i % 5 === 0) continue; // Skip assessment days (5, 10, 15, 20, 25, 30)
  infoTexts[i] = infoTexts[1];
}

function generateRegularDay(day) {
  const week = Math.ceil(day / 5);
  const isOdd = day % 2 === 1;
  const skill = isOdd ? (grammarLessons[day] || null) : (languageLessons[day] || null);
  const info = infoTexts[day] || infoTexts[1];
  
  // Placeholder content (would be replaced with actual Robin Hood chapters)
  const storyTitle = `Day ${day} Story`;
  const storyContent = `<p>[Story content for Day ${day} would go here - this needs to be filled with actual Robin Hood chapters]</p>`;
  
  // Placeholder vocab (would be replaced with actual words from the story)
  const vocab = [
    { word: `word${day}a`, definition: `Definition for word ${day}a` },
    { word: `word${day}b`, definition: `Definition for word ${day}b` },
    { word: `word${day}c`, definition: `Definition for word ${day}c` }
  ];
  
  // Placeholder comprehension questions
  const compQuestions = [
    `Question 1 about Day ${day} reading?`,
    `Question 2 about Day ${day} reading?`,
    `Question 3 about Day ${day} reading?`
  ];
  
  // Build skill content string
  const skillContent = skill ? `
                    <h2>✏️ ${skill.topic}</h2>
                    <div class="skill-explanation">
                        <p>${skill.explanation.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <h3>Examples:</h3>
                    <ul>
                        ${skill.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                    
                    <h3>Practice:</h3>
                    ${skill.practice.map((p, i) => `<div class="exercise-card"><p><strong>${i + 1}.</strong> ${p.prompt}</p><textarea id="skill-${day}-${i + 1}" rows="6" placeholder="Your answer..."></textarea></div>`).join('')}
                ` : '<p>Skill content will be added.</p>';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} - 5th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
</head>
<body class="lesson-viewer">
    <div id="lesson-container"></div>

    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>

    <script>
        const lesson${day}Config = {
            lessonId: '5th-grade-day-${String(day).padStart(3, '0')}',
            gradeLevel: '5th-grade',
            title: 'Day ${day} - Robin Hood',
            pages: [
    {
        "type": "title",
        "content": \`
                    <h1>Day ${day}</h1>
                    <h2>Robin Hood</h2>
                    <p class="unit-label">5th Grade • Week ${week}</p>
                    <p class="chapter-info">${storyTitle}</p>
                \`
    },
    {
        "type": "content",
        "content": \`
                    <h2>📚 Welcome to Day ${day}!</h2>
                    <div class="objectives-box">
                        <h3>Today's Learning Goals:</h3>
                        <ul>
                            <li>Learn 3 new vocabulary words</li>
                            <li>Read today's Robin Hood chapter</li>
                            <li>Practice ${skill ? skill.topic : 'skills'}</li>
                            <li>Explore informational text</li>
                            <li>Complete a ${isOdd ? 'writing' : 'journal'} activity</li>
                        </ul>
                        <p><strong>Estimated time:</strong> 45-60 minutes</p>
                    </div>
                \`
    },
    {
        "type": "vocabulary",
        "content": \`
                    <h2>📖 Vocabulary</h2>
                    <p>Learn these 3 words before reading:</p>
                    
                    <div class="vocab-word-card">
                        <h3>1. ${vocab[0].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${vocab[0].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-1" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                    
                    <div class="vocab-word-card">
                        <h3>2. ${vocab[1].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${vocab[1].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-2" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                    
                    <div class="vocab-word-card">
                        <h3>3. ${vocab[2].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${vocab[2].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-3" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                \`
    },
    {
        "type": "activity",
        "content": \`
                    <h2>🎮 Vocabulary Matching Game</h2>
                    <p style="color: #666; margin-bottom: 5px;">Match each word to its definition!</p>
                    <p style="color: #305853; font-weight: 600; margin-bottom: 20px;">Score: <span id="gameScore">0</span> / 3</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto;">
                        <div id="wordColumn" style="display: flex; flex-direction: column;">
                            <h3 style="text-align: center; color: #305853; margin-bottom: 10px;">Words</h3>
                            <div class="match-word" data-word="${vocab[0].word}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">${vocab[0].word}</div>
                            <div class="match-word" data-word="${vocab[1].word}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">${vocab[1].word}</div>
                            <div class="match-word" data-word="${vocab[2].word}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">${vocab[2].word}</div>
                        </div>
                        <div id="defColumn" style="display: flex; flex-direction: column;">
                            <h3 style="text-align: center; color: #8B4513; margin-bottom: 10px;">Definitions</h3>
                            <div class="match-def" data-word="${vocab[0].word}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">${vocab[0].definition}</div>
                            <div class="match-def" data-word="${vocab[1].word}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">${vocab[1].definition}</div>
                            <div class="match-def" data-word="${vocab[2].word}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">${vocab[2].definition}</div>
                        </div>
                    </div>
                    
                    <div id="gameFeedback" style="margin-top: 20px; padding: 15px; border-radius: 10px; text-align: center; display: none;"></div>
                \`,
                onLoad: () => { if(window.initVocabGame) window.initVocabGame(); }
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${storyTitle} - Part 1</h2>
                    <div class="story-content">
                        ${storyContent}
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${storyTitle} - Part 2</h2>
                    <div class="story-content">
                        ${storyContent}
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${storyTitle} - Part 3</h2>
                    <div class="story-content">
                        ${storyContent}
                    </div>
                \`
    },
    {
        "type": "comprehension",
        "content": \`
                    <h2>💭 Reading Comprehension</h2>
                    <p>Answer these questions about today's reading:</p>
                    
                    <div class="question-card">
                        <p><strong>1.</strong> ${compQuestions[0]}</p>
                        <textarea id="comp-${day}-1" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card" style="margin-top: 20px;">
                        <p><strong>2.</strong> ${compQuestions[1]}</p>
                        <textarea id="comp-${day}-2" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card" style="margin-top: 20px;">
                        <p><strong>3.</strong> ${compQuestions[2]}</p>
                        <textarea id="comp-${day}-3" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                \`
    },
    {
        "type": "grammar-language",
        "content": \`${skillContent}\`
    },
    {
        "type": "informational",
        "content": \`
                    <h2>🌍 Informational Text: ${info.title}</h2>
                    <div class="informational-article">
                        ${info.content}
                    </div>
                    
                    <h3>Questions:</h3>
                    <div class="question-card">
                        <p><strong>1.</strong> ${info.questions[0]}</p>
                        <textarea id="info-${day}-1" rows="6" placeholder="Your answer..."></textarea>
                    </div>
                    <div class="question-card">
                        <p><strong>2.</strong> ${info.questions[1]}</p>
                        <textarea id="info-${day}-2" rows="6" placeholder="Your answer..."></textarea>
                    </div>
                \`
    },
    {
        "type": "writing",
        "content": isOdd ? \`
                    <h2>✍️ Writing Practice</h2>
                    <p>Write a paragraph about today's chapter. Use all three vocabulary words.</p>
                    <div class="writing-prompt">
                        <textarea id="writing-${day}" rows="15" placeholder="Your paragraph..."></textarea>
                    </div>
                \` : \`
                    <h2>📝 Journal Response</h2>
                    <p>Reflect on today's reading. What did you learn about the characters or the story?</p>
                    <div class="journal-prompt">
                        <textarea id="journal-${day}" rows="15" placeholder="Your journal entry..."></textarea>
                    </div>
                \`
    }
]
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        } else {
            console.error('initLessonViewer function not found!');
        }
    </script>
</body>
</html>`;
}

console.log('🔨 Generating 5th grade lessons with Bedrock Spine...\n');

// Generate first 30 days (6 weeks = first unit)
const regularDays = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28, 29];

regularDays.forEach(day => {
  const html = generateRegularDay(day);
  const filename = `5th-grade-day-${String(day).padStart(3, '0')}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Created ${filename}`);
});

console.log(`\n🎉 5th grade Bedrock Spine STRUCTURE complete!
   - 11 pages per lesson ✅
   - Story split into 3 parts ✅
   - Vocabulary game added ✅
   - Grammar/Language alternating ✅
   - Informational Text added ✅
   - Writing/Journal alternating ✅
   - Successfully built: ${regularDays.length}/24 lessons
   
📝 NOTE: Content placeholders need to be replaced with:
   - Actual Robin Hood chapter text (currently placeholder)
   - Actual vocabulary words from each chapter
   - Actual comprehension questions
   
The STRUCTURE is complete and matches Bedrock Spine!`);
