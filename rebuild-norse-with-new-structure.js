const fs = require('fs');

// Load all existing data
const norseVocab = JSON.parse(fs.readFileSync('norse-vocabulary.json', 'utf8'));
const norseQuestions = JSON.parse(fs.readFileSync('norse-comprehension-questions.json', 'utf8'));
const norseInfoTextsOld = JSON.parse(fs.readFileSync('norse-informational-texts.json', 'utf8'));
const norseInfoQuestions = JSON.parse(fs.readFileSync('norse-informational-questions.json', 'utf8'));
const norseSkills = JSON.parse(fs.readFileSync('norse-weekly-skills.json', 'utf8'));

// Map info texts by story name to day number
const storyNameToDay = {
  "In the Beginning: The Norse Creation": "141",
  "Odin and the Price of Wisdom": "142",
  "Thor and the Theft of Mjölnir": "143",
  "Loki the Trickster": "144",
  "Freyja and the Necklace of the Brisings": "146",
  "Freyr and the Sword That Fought Alone": "147",
  "Heimdall and the Rainbow Bridge": "152",
  "Týr and the Binding of Fenrir": "149",
  "Baldur the Beautiful": "148",
  "The Death of Baldur and Loki's Punishment": "158",
  "Sigurd and the Dragon Fafnir": "154",
  "The Mead of Poetry": "156",
  "The Valkyries: Choosers of the Slain": "153",
  "The Viking Afterlife: Valhalla and Helheim": "157",
  "Ragnarök: The End and the Beginning": "159",
  "The Nine Worlds of Yggdrasil": "151"
};

// Reorganize info texts by day
const norseInfoTexts = {};
Object.keys(norseInfoTextsOld).forEach(storyName => {
  const day = storyNameToDay[storyName];
  if (day) {
    norseInfoTexts[day] = norseInfoTextsOld[storyName];
  }
});

console.log('📚 Reorganized informational texts by day number');
console.log('   Total texts:', Object.keys(norseInfoTexts).length);

// Story files and titles
const storyFiles = {
  "141": "/tmp/NORSE_In_the_Beginning_The_Norse_Creation.txt",
  "142": "/tmp/NORSE_Odin_and_the_Price_of_Wisdom.txt",
  "143": "/tmp/NORSE_Thor_and_the_Theft_of_Mjolnir.txt",
  "144": "/tmp/NORSE_Loki_the_Trickster.txt",
  "146": "/tmp/NORSE_Freyja_and_the_Necklace_of_the_Brisings.txt",
  "147": "/tmp/NORSE_Freyr_and_the_Sword_That_Fought_Alone.txt",
  "148": "/tmp/NORSE_Baldur_the_Beautiful.txt",
  "149": "/tmp/NORSE_Tyr_and_the_Binding_of_Fenrir.txt",
  "151": "/tmp/NORSE_The_Nine_Worlds_of_Yggdrasil.txt",
  "152": "/tmp/NORSE_Heimdall_and_the_Rainbow_Bridge.txt",
  "153": "/tmp/NORSE_The_Valkyries_Choosers_of_the_Slain.txt",
  "154": "/tmp/NORSE_Sigurd_and_the_Dragon_Fafnir.txt",
  "156": "/tmp/NORSE_The_Mead_of_Poetry.txt",
  "157": "/tmp/NORSE_The_Viking_Afterlife_Valhalla_and_Helheim.txt",
  "158": "/tmp/NORSE_The_Death_of_Baldur_and_Lokis_Punishment.txt",
  "159": "/tmp/NORSE_Ragnarok_The_End_and_the_Beginning.txt"
};

const storyTitles = {
  "141": "The Creation of the Nine Worlds",
  "142": "Odin's Quest for Wisdom",
  "143": "Thor and the Theft of Mjolnir",
  "144": "Loki the Trickster",
  "146": "Freyja and the Necklace",
  "147": "Freyr's Sword",
  "148": "Baldur the Beautiful",
  "149": "The Binding of Fenrir",
  "151": "The Nine Worlds of Yggdrasil",
  "152": "Heimdall the Watchman",
  "153": "The Valkyries",
  "154": "Sigurd and the Dragon",
  "156": "The Mead of Poetry",
  "157": "The Viking Afterlife",
  "158": "The Death of Baldur",
  "159": "Ragnarok: The Twilight of the Gods"
};

console.log('\n🏛️ Rebuilding Norse lessons with NEW 11-page structure...\n');

// Generate all regular lessons
for (let day = 141; day <= 160; day++) {
  if ([145, 150, 155, 160].includes(day)) {
    generateAssessment(day);
  } else if (storyFiles[day]) {
    generateCompleteLesson(day);
  }
}

console.log('\n✅ Generated 20 Norse lessons with NEW structure!');
console.log('   - 11 pages per regular lesson');
console.log('   - Informational Text on EVERY day');
console.log('   - Writing/Journal alternating');

function generateCompleteLesson(day) {
  const week = Math.ceil(day / 5);
  const weekKey = `week${week}`;
  const dayInWeek = ((day - 1) % 5) + 1;
  
  // Load story text
  let storyText = "Story content coming soon.";
  if (storyFiles[day] && fs.existsSync(storyFiles[day])) {
    storyText = fs.readFileSync(storyFiles[day], 'utf8');
  }
  
  const storyTitle = storyTitles[day];
  const vocab = norseVocab[day] || [];
  const questions = norseQuestions[day] || [];
  const infoText = norseInfoTexts[day] || { title: "Viking Culture", text: "Content coming soon." };
  const infoQuestions = norseInfoQuestions[day] || [];
  const skills = norseSkills[weekKey] || { 
    grammar: {skill: 'Grammar', explanation: '', examples: [], practice: []}, 
    language: {skill: 'Language', explanation: '', examples: [], practice: []} 
  };
  
  // Split story into 3 parts
  const storyParts = splitStoryInto3Parts(storyText);
  
  // NEW PATTERN (following updated CURRICULUM-STRUCTURE.md):
  // Day 1: Grammar + Info Text + Writing
  // Day 2: Language + Info Text + Journal
  // Day 3: Grammar + Info Text + Writing
  // Day 4: Language + Info Text + Journal
  const hasGrammar = (dayInWeek === 1 || dayInWeek === 3);
  const hasLanguage = (dayInWeek === 2 || dayInWeek === 4);
  const hasWriting = (dayInWeek === 1 || dayInWeek === 3);
  const hasJournal = (dayInWeek === 2 || dayInWeek === 4);
  
  const vocabGameTypes = ['Matching', 'Fill-in-the-Blank', 'Sentence Writing', 'Context Clues'];
  const vocabGameType = vocabGameTypes[dayInWeek - 1];
  
  // Build pages carefully
  const storyPages = storyParts.map((part, idx) => `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle}</h2>
                            <p style="color: #666; margin-bottom: 20px;">Part ${idx + 1} of 3</p>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                ${part.replace(/`/g, '\\`').replace(/\$/g, '\\$')}
                            </div>
                        </div>
                    \`
                },`).join('\n');
  
  const comprehensionPage = `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>💭 Reading Comprehension</h2>
                            <p style="margin-bottom: 20px;">Answer these questions about the story:</p>
                            ${questions.map((q, i) => `
                            <div style="margin: 25px 0;">
                                <p style="font-weight: 600; color: #1E3A8A; margin-bottom: 10px;">Question ${i + 1}:</p>
                                <p style="margin-bottom: 12px; line-height: 1.6;">${q.replace(/`/g, '\\`').replace(/\$/g, '\\$')}</p>
                                <textarea 
                                  id="comp-${i+1}"
                                  style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write your answer here..."
                                ></textarea>
                            </div>
                            `).join('')}
                        </div>
                    \`
                },`;
  
  // Grammar or Language page
  let grammarLanguagePage = '';
  if (hasGrammar) {
    grammarLanguagePage = `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✏️ Grammar Practice</h2>
                            <p>Grammar skills will be added here</p>
                        </div>
                    \`
                },`;
  } else {
    grammarLanguagePage = `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎨 Language Skills</h2>
                            <p>Language skills will be added here</p>
                        </div>
                    \`
                },`;
  }
  
  // Informational Text page (EVERY DAY)
  const infoTextHtml = (infoText.text || "Content coming soon.").split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p.replace(/`/g, '\\`').replace(/\$/g, '\\$')}</p>`).join('');
  const infoPage = `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📰 ${infoText.title.replace(/`/g, '\\`').replace(/\$/g, '\\$')}</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px; margin-bottom: 30px;">
                                ${infoTextHtml}
                            </div>
                            ${infoQuestions.length > 0 ? `
                            <h3 style="margin-top: 30px; margin-bottom: 15px;">Understanding the Text</h3>
                            ${infoQuestions.map((q, i) => `
                            <div style="margin: 25px 0;">
                                <p style="font-weight: 600; color: #1E3A8A; margin-bottom: 10px;">Question ${i + 1}:</p>
                                <p style="margin-bottom: 12px;">${q.replace(/`/g, '\\`').replace(/\$/g, '\\$')}</p>
                                <textarea 
                                  id="info-${i+1}"
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write your answer here..."
                                ></textarea>
                            </div>
                            `).join('')}
                            ` : ''}
                        </div>
                    \`
                },`;
  
  // Writing or Journal page
  let finalPage = '';
  if (hasWriting) {
    finalPage = `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Writing Skills (CCSS)</h2>
                            <div style="background: #f0fff4; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">Today's Writing Standard: W.5.1 - Opinion Writing</p>
                                <p style="line-height: 1.6;">Write a paragraph stating your opinion about a character or event from today's story. Support your opinion with reasons and evidence from the text.</p>
                            </div>
                            <textarea 
                              id="writing"
                              style="width: 100%; min-height: 250px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                              placeholder="Write your opinion paragraph here..."
                            ></textarea>
                        </div>
                    \`
                }`;
  } else {
    finalPage = `
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
                }`;
  }
  
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
    
    <script>
        const lesson${day}Config = {
            lessonId: '5th-grade-day-${day}',
            gradeLevel: '5th-grade',
            title: 'Lesson ${day} - 5th Grade',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #1E3A8A; font-size: 20px; margin-top: 20px;">
                                ${storyTitle}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Norse Mythology • Week ${week}
                            </p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read <em>${storyTitle}</em></li>
                                <li>Learn 3 new vocabulary words</li>
                                <li>Practice: ${vocabGameType} game</li>
                                <li>${hasGrammar ? 'Grammar Practice' : 'Language Skills'}</li>
                                <li>Read about Viking culture</li>
                                <li>${hasWriting ? 'Writing Skills (CCSS)' : 'Journal Response'}</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Vocabulary Words</h2>
                            ${vocab.map((v, i) => `
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
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎮 Vocabulary Practice: ${vocabGameType}</h2>
                            <p style="margin-bottom: 20px;">Practice this week's vocabulary words!</p>
                            <div id="vocab-game-container" style="padding: 20px; background: #f0f7ff; border-radius: 12px;">
                                <p style="color: #666; font-style: italic;">Vocabulary game will be added here</p>
                            </div>
                        </div>
                    \`
                },
                ${storyPages}
                ${comprehensionPage}
                ${grammarLanguagePage}
                ${infoPage}
                ${finalPage}
            ]
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Day ${day}: ${storyTitle} - ${hasGrammar ? 'Grammar' : 'Language'} + Info + ${hasWriting ? 'Writing' : 'Journal'}`);
}

function generateAssessment(day) {
  const week = Math.ceil(day / 5);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${day} - Assessment - 5th Grade BedrockELA</title>
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
        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;
  
  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Day ${day}: Week ${week} Assessment`);
}

function splitStoryInto3Parts(text) {
  text = text.replace(/^Norse Mythology.*\n/gm, '')
            .replace(/^One Thousand and One Nights.*\n/gm, '')
            .replace(/^Retold for Young Readers.*\n/gm, '')
            .trim();
  
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
  const parts = [];
  const parasPerPart = Math.ceil(paragraphs.length / 3);
  
  for (let i = 0; i < 3; i++) {
    const start = i * parasPerPart;
    const end = Math.min(start + parasPerPart, paragraphs.length);
    const part = paragraphs.slice(start, end)
      .map(p => `<p style="margin-bottom: 15px;">${p}</p>`)
      .join('\n');
    parts.push(part);
  }
  
  return parts;
}
