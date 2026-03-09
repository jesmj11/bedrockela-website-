const fs = require('fs');

// Load the 24 chapters
const chapters = JSON.parse(fs.readFileSync('wizard-chapters.json', 'utf8'));

// For each chapter, generate a lesson
chapters.forEach((chapter, idx) => {
  const dayNum = chapter.number;
  const filename = `4th-grade-day-${String(dayNum).padStart(3, '0')}.html`;
  
  console.log(`Generating ${filename}: ${chapter.title}...`);
  
  // Split chapter content into 4 reading pages
  const words = chapter.content.split(' ');
  const wordsPerPage = Math.ceil(words.length / 4);
  
  const pages = [
    words.slice(0, wordsPerPage).join(' '),
    words.slice(wordsPerPage, wordsPerPage * 2).join(' '),
    words.slice(wordsPerPage * 2, wordsPerPage * 3).join(' '),
    words.slice(wordsPerPage * 3).join(' ')
  ];
  
  // Generate HTML (keeping existing structure, swapping content)
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${dayNum} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/billy-tts.js"></script>
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
    <script src="js/digital-book.js?v=1772665488"></script>
    
    <script>
        const lesson${dayNum}Config = {
            lessonId: '4th-grade-day-${dayNum}',
            gradeLevel: '4th-grade',
            title: 'Lesson ${dayNum} - 4th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${dayNum}</h1>
                            <div class="subtitle">4th Grade ELA</div>
                            <p style="color: #1B2A4A; font-size: 20px; margin-top: 20px;">
                                The Wonderful Wizard of Oz
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Chapter ${dayNum}: ${chapter.title}</p>
                        </div>
                    \`
                },
                
                // Page 2: Welcome & Learning Objectives
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${dayNum}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read Chapter ${dayNum}: ${chapter.title}</li>
                                <li>Learn new vocabulary words</li>
                                <li>Answer comprehension questions</li>
                                <li>Practice writing skills</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                
                // Reading Pages (4 pages)
                ${pages.map((pageContent, pageIdx) => `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading: The Wonderful Wizard of Oz</h2>
                            <h3 style="color: #305853;">Chapter ${dayNum}: ${chapter.title}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Page ${pageIdx + 1} of 4</p>
                            
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;" class="reading-passage">
                                <p>${pageContent.replace(/"/g, '\\"').replace(/`/g, '\\`')}</p>
                            </div>
                        </div>
                    \`
                }`).join(',\n                ')}
            ]
        };

        // Initialize the lesson viewer
        if (window.LessonViewer) {
            new window.LessonViewer(lesson${dayNum}Config);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(filename, html);
});

console.log(`\n✅ Generated ${chapters.length} lesson files!`);
