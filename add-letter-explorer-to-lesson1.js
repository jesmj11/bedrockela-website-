/**
 * Replace Word Sorting with Letter Explorer in Lesson 1 (test)
 */

const fs = require('fs');
const path = require('path');

const lessonFile = path.join(__dirname, '1st-grade-lesson-1.html');
let html = fs.readFileSync(lessonFile, 'utf-8');

// Add CSS link if not already there
if (!html.includes('letter-explorer.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="css/digital-book.css">',
    `<link rel="stylesheet" href="css/digital-book.css">
    <link rel="stylesheet" href="css/letter-explorer.css">`
  );
}

// Find and replace the Word Sorting Adventure section
const oldSection = `            <div class="activity-box">
                <h3>🎯 Activity: Word Sorting Adventure</h3>
                <p><strong>Parent/Teacher:</strong> Read these words with your child and sort them by vowel sound:</p>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="background: #ffe6e6; padding: 10px; border-radius: 10px;">
                        <strong>A words:</strong> cat, hat, mat, pan, ran
                    </div>
                    <div style="background: #e6ffe6; padding: 10px; border-radius: 10px;">
                        <strong>E words:</strong> bed, red, ten, pen, hen
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="background: #e6f0ff; padding: 10px; border-radius: 10px;">
                        <strong>I words:</strong> sit, pig, big, win, hit
                    </div>
                    <div style="background: #fff0e6; padding: 10px; border-radius: 10px;">
                        <strong>O words:</strong> dog, hop, box, dot, hot
                    </div>
                </div>
                
                <div style="background: #f0e6ff; padding: 10px; border-radius: 10px; margin-top: 15px;">
                    <strong>U words:</strong> bug, hug, cup, sun, run
                </div>
            </div>`;

const newSection = `            <!-- Letter Explorer Game -->
            <div style="margin: 30px 0;">
                <h3 style="text-align: center; color: #B06821; margin-bottom: 15px;">🔤 Letter Explorer: Spell the Words!</h3>
                <div id="letter-explorer-game" class="letter-explorer-container"></div>
            </div>`;

html = html.replace(oldSection, newSection);

// Add the script before closing body tag
const scriptCode = `
    <script src="js/letter-explorer.js"></script>
    <script>
        // Letter Explorer Game for Lesson 1
        createLetterExplorer('letter-explorer-game', {
            title: "Letter Explorer",
            subtitle: "Drag the letters to spell the word!",
            words: [
                {
                    word: "cat",
                    emoji: "🐱",
                    definition: "A small furry animal that purrs and says meow!",
                    example: "The cat sat on the mat."
                },
                {
                    word: "bed",
                    emoji: "🛏️",
                    definition: "A soft place where you sleep at night!",
                    example: "I go to bed at 8 o'clock."
                },
                {
                    word: "pig",
                    emoji: "🐷",
                    definition: "A pink farm animal that says oink!",
                    example: "The pig rolls in the mud."
                },
                {
                    word: "dog",
                    emoji: "🐶",
                    definition: "A friendly animal that barks and wags its tail!",
                    example: "The dog loves to play fetch."
                },
                {
                    word: "sun",
                    emoji: "☀️",
                    definition: "The big bright star in the sky that gives us light!",
                    example: "The sun is shining today."
                }
            ]
        });
    </script>
`;

// Insert before the existing digital book script
const bookScriptMarker = '<script src="js/digital-book.js"></script>';
html = html.replace(bookScriptMarker, scriptCode + '\n    ' + bookScriptMarker);

fs.writeFileSync(lessonFile, html);
console.log('✅ Added Letter Explorer to Lesson 1');
