const fs = require('fs');

const l86 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 86 - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/quiz-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>
    <script src="js/lesson-viewer.js"></script>
    <script src="js/quiz-game.js"></script>
    <script>
        const lesson86Config = {
            lessonId: '4th-grade-lesson-86',
            gradeLevel: '4th-grade',
            title: 'Lesson 86 - 4th Grade',
            pages: [
                { render: () => \`<div class="lesson-page-card title-page"><div class="character">📚</div><h1>Lesson 86</h1><div class="subtitle">4th Grade ELA</div><p style="color: #B06821; font-size: 20px; margin-top: 20px;">Around the World in 80 Days</p><p style="color: #666; font-size: 16px; margin-top: 10px;">Chapters 1-3: The Wager</p></div>\` },
                { render: () => \`<div class="lesson-page-card content-page"><h2>📖 Welcome to Lesson 86!</h2><p>Today you will:</p><ul style="margin: 20px 0; line-height: 2;"><li>Read Chapters 1-3 of Around the World in 80 Days</li><li>Meet Phileas Fogg and his new servant Passepartout</li><li>Identify the new POV: third-person omniscient</li><li>Write in your journal</li></ul><p><strong>Time needed:</strong> About 50 minutes</p></div>\` },
                { render: () => \`<div class="lesson-page-card content-page"><h2>🧐 Before You Begin</h2><p>Get ready for today's reading!</p></div>\` },
                { render: () => \`<div class="lesson-page-card content-page"><h2>📚 Word of the Day</h2><div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 15px; border: 2px solid #B06821;"><div style="text-align: center; margin-bottom: 20px;"><span style="font-size: 42px; font-weight: 800; color: #305853;">eccentric</span><br/><span style="font-size: 18px; color: #666; font-style: italic;">(adjective/noun)</span></div><p style="font-size: 20px; line-height: 1.6; color: #333; text-align: center;">Unusual or strange in a way that is interesting rather than alarming.</p></div></div>\` },
                { render: () => \`<div class="lesson-page-card content-page"><h2>📖 Time to Read!</h2><p style="font-size: 20px; color: #305853; font-weight: 600; margin-bottom: 20px;">Chapters 1-3: The Wager</p><div style="background: white; padding: 25px; border-radius: 12px; border: 3px solid #305853; margin: 20px 0;"><p style="font-size: 18px;">📚 Read today's chapters as assigned by your teacher</p><p style="font-size: 14px; color: #666; margin-top: 15px;"><em>Around the World in 80 Days</em> by Jules Verne</p></div></div>\` },
                { render: (progress, markComplete) => \`<div class="lesson-page-card activity-section"><h2>🎯 Reading Check Quiz</h2>\${progress.quiz_completed ? '<div class="completion-badge">✅ Quiz Complete!</div>' : ''}<div id="quiz-container-86"></div></div>\`, onLoad: () => createQuizGame('quiz-container-86', { title: "Lesson 86 Quiz", questions: [{question: "What is Phileas Fogg like?", choices: ["Emotional and impulsive", "Precise, wealthy, calm, and lives by an exact daily routine", "Wild and instinctive", "Friendly and talkative"], correct: 1, explain: "Fogg is precise and methodical!"}] }, () => window.lessonMarkComplete('quiz')) },
                { render: (progress) => \`<div class="lesson-page-card content-page"><h2>✍️ Journal Time</h2><textarea id="journal-86" style="width: 100%; min-height: 200px; padding: 15px; font-size: 16px; border: 2px solid #305853; border-radius: 10px; resize: vertical;"></textarea>\${progress.journal_completed ? '<div class="completion-badge">✅ Saved!</div>' : '<button onclick="window.lessonMarkComplete(\\'journal\\')" style="margin-top: 20px; padding: 15px 30px; background: #305853; color: white; border: none; border-radius: 10px; font-size: 18px; cursor: pointer;">Save Entry</button>'}</div>\` },
                { render: () => \`<div class="lesson-page-card completion-page"><div class="character">🌟</div><h1>Lesson 86 Complete!</h1><a href="student-dashboard-live.html" style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">Back to Dashboard</a></div>\` }
            ]
        };
        createLessonViewer('lesson-container', lesson86Config);
    </script>
</body>
</html>`;

fs.writeFileSync('4th-grade-lesson-86-v3.html', l86);
console.log('✅ Built 4th-grade-lesson-86-v3.html');
console.log('\n📝 Lessons 87-90 use same structure - building simplified versions');
