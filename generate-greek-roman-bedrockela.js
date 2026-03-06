const fs = require('fs');

// Greek mythology lessons (Days 161-180)
const greekStories = {
  "161": "The Creation of the World",
  "162": "The Twelve Olympians",
  "163": "Prometheus and the Gift of Fire",
  "164": "Pandora's Box",
  "166": "Persephone and the Seasons",
  "167": "Orpheus and Eurydice",
  "168": "King Midas and the Golden Touch",
  "169": "Daedalus and Icarus",
  "171": "Perseus and Medusa",
  "172": "Theseus and the Minotaur",
  "173": "Jason and the Golden Fleece",
  "174": "Odysseus and the Cyclops",
  "176": "Hercules and the Twelve Labors",
  "177": "Achilles and the Trojan War",
  "178": "The Odyssey Begins",
  "179": "Echo and Narcissus"
};

// Roman mythology lessons (Days 181-200) - but we're moving these
const romanStories = {
  "181": "Jupiter, King of the Gods",
  "182": "Romulus and Remus",
  "183": "The Rape of the Sabine Women",
  "184": "Horatius at the Bridge",
  "186": "Cincinnatus the Farmer-Soldier",
  "187": "The Geese Save Rome",
  "188": "Cloelia Escapes",
  "189": "Mucius Scaevola's Courage",
  "191": "The Sibylline Books",
  "192": "Curtius's Sacrifice",
  "193": "Regulus Keeps His Word",
  "194": "The Punic Wars Begin",
  "196": "Scipio Africanus",
  "197": "Cato the Censor",
  "198": "The Gracchi Brothers",
  "199": "Julius Caesar"
};

console.log('Generating Greek mythology lessons (Days 161-180)...');
for (let day = 161; day <= 180; day++) {
  if ([165, 170, 175, 180].includes(day)) {
    generateAssessment(day, 'Greek');
  } else if (greekStories[day]) {
    generateLesson(day, greekStories[day], 'Greek Mythology');
  }
}

console.log('\nGenerating Roman mythology lessons (Days 181-200)...');
for (let day = 181; day <= 200; day++) {
  if ([185, 190, 195, 200].includes(day)) {
    generateAssessment(day, 'Roman');
  } else if (romanStories[day]) {
    generateLesson(day, romanStories[day], 'Roman Mythology');
  }
}

console.log('\n✅ Generated 40 BedrockELA mythology lessons');
console.log('   Greek (Days 161-180): 20 lessons');
console.log('   Roman (Days 181-200): 20 lessons');

function generateLesson(day, title, unit) {
  const vocab = [
    { word: "placeholder1", definition: "Vocabulary will be added" },
    { word: "placeholder2", definition: "Vocabulary will be added" },
    { word: "placeholder3", definition: "Vocabulary will be added" }
  ];
  
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
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #1E3A8A; font-size: 20px; margin-top: 20px;">
                                ${title}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                ${unit}
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
                                <li>Read <em>${title}</em></li>
                                <li>Learn 3 new vocabulary words</li>
                                <li>Answer comprehension questions</li>
                                <li>Read about ${unit.includes('Greek') ? 'Ancient Greece' : 'Ancient Rome'}</li>
                                <li>Write a journal response</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
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
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>${title}</h2>
                            <div style="line-height: 1.8; color: #333; font-size: 16px;">
                                <p style="margin-bottom: 15px;">[Story content will be added]</p>
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 20px;">Answer these questions about the story:</p>
                            <div style="margin: 25px 0;">
                                <p style="font-weight: 600; color: #1E3A8A; margin-bottom: 10px;">Question 1:</p>
                                <p style="margin-bottom: 12px; line-height: 1.6;">[Question will be added]</p>
                                <textarea 
                                  id="comp-1"
                                  style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write your answer here..."
                                ></textarea>
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Journal Response</h2>
                            <p style="margin-bottom: 20px;"><strong>Choose one prompt:</strong></p>
                            <ul style="margin-bottom: 25px; line-height: 2;">
                                <li>What lesson can we learn from this myth today?</li>
                                <li>How would you have acted in this character's situation?</li>
                                <li>Compare this story to a modern story or movie.</li>
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

        if (typeof LessonViewer !== 'undefined') {
            new LessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(`5th-grade-day-${day}.html`, html);
  console.log(`  ✓ Day ${day}: ${title}`);
}

function generateAssessment(day, unit) {
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
                                ${unit} Mythology - Week ${week} Assessment
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
  console.log(`  ✓ Day ${day}: Assessment`);
}
