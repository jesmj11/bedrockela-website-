const fs = require('fs');

// Load all data
const norseVocab = JSON.parse(fs.readFileSync('norse-vocabulary.json', 'utf8'));
const norseQuestions = JSON.parse(fs.readFileSync('norse-comprehension-questions.json', 'utf8'));
const norseInfoTexts = JSON.parse(fs.readFileSync('norse-informational-texts.json', 'utf8'));
const norseInfoQuestions = JSON.parse(fs.readFileSync('norse-informational-questions.json', 'utf8'));
const norseSkills = JSON.parse(fs.readFileSync('norse-weekly-skills.json', 'utf8'));

// Story mapping
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

console.log('🏛️ Generating complete Norse Mythology lessons (Days 141-144)...\n');

// Start with just first 4 days to test
for (let day = 141; day <= 160; day++) {
  generateCompleteLesson(day);
}

console.log('\n✅ Generated 20 complete Norse lessons!');

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
  const skills = norseSkills[weekKey] || { grammar: {skill: 'Grammar', explanation: '', examples: [], practice: []}, language: {skill: 'Language', explanation: '', examples: [], practice: []} };
  
  // Split story into 3 parts
  const storyParts = splitStoryInto3Parts(storyText);
  
  // Determine pattern
  const hasGrammar = (dayInWeek === 1 || dayInWeek === 3);
  const hasLanguage = (dayInWeek === 2 || dayInWeek === 4);
  const hasInfoText = (dayInWeek === 1 || dayInWeek === 4);
  const hasWriting = (dayInWeek === 2);
  const hasJournal = (dayInWeek === 3);
  
  const vocabGameTypes = ['Matching', 'Fill-in-the-Blank', 'Sentence Writing', 'Context Clues'];
  const vocabGameType = vocabGameTypes[dayInWeek - 1];
  
  // Build HTML content more carefully
  let grammarLanguageContent = '';
  if (hasGrammar) {
    grammarLanguageContent = `
                // Page 9: Grammar Practice
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Grammar Practice</h2>
                            <p>Grammar content will be added</p>
                        </div>
                    \`
                },`;
  } else if (hasLanguage) {
    grammarLanguageContent = `
                // Page 9: Language Skills
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Language Skills</h2>
                            <p>Language content will be added</p>
                        </div>
                    \`
                },`;
  }
  
  let finalPageContent = '';
  if (hasInfoText) {
    const infoTextHtml = infoText.text.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('');
    finalPageContent = `
                // Page 10: Informational Text
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${infoText.title}</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                ${infoTextHtml}
                            </div>
                        </div>
                    \`
                }`;
  } else if (hasWriting) {
    finalPageContent = `
                // Page 10: Writing Skills
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Writing Skills (CCSS)</h2>
                            <p>Writing practice will be added</p>
                        </div>
                    \`
                }`;
  } else if (hasJournal) {
    finalPageContent = `
                // Page 10: Journal Response
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Journal Response</h2>
                            <textarea style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px;"></textarea>
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
                            <p><strong>Time needed:</strong> 45-60 minutes</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Vocabulary</h2>
                            ${vocab.map((v, i) => `<div style="margin: 20px 0;"><h3>${v.word}</h3><p>${v.definition}</p></div>`).join('')}
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎮 Vocab Game: ${vocabGameType}</h2>
                            <p>Game will be added</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle} - Part 1</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                ${storyParts[0]}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle} - Part 2</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                ${storyParts[1]}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${storyTitle} - Part 3</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                ${storyParts[2]}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>💭 Comprehension</h2>
                            ${questions.map((q, i) => `<div style="margin: 20px 0;"><p><strong>${i+1}.</strong> ${q}</p><textarea style="width: 100%; height: 100px;"></textarea></div>`).join('')}
                        </div>
                    \`
                },
                ${grammarLanguageContent}
                ${finalPageContent}
            ]
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Day ${day}: ${storyTitle} - ${hasGrammar ? 'Grammar' : 'Language'} + ${hasInfoText ? 'Info' : hasWriting ? 'Writing' : 'Journal'}`);
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
