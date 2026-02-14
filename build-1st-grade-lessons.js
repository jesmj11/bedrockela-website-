// Build 1st Grade Lessons 4-30
// Based on the scope & sequence

const fs = require('fs');

const lessons = [
  { num: 4, title: "Climbing Higher", skills: "Phonograms g/d/c/y", words: ["go", "dog", "can", "yes", "cat", "dig"], flashcards: [
    { term: 'G', match: 'go' },
    { term: 'D', match: 'dog' },
    { term: 'C', match: 'cat' },
    { term: 'Y', match: 'yes' }
  ]},
  { num: 5, title: "Words with Two Jobs", skills: "Multiple meaning words", words: ["can", "bat", "run", "play", "bear", "saw"], flashcards: [
    { term: 'can (verb)', match: 'I can jump' },
    { term: 'can (noun)', match: 'Soup can' },
    { term: 'bat (verb)', match: 'Bat the ball' },
    { term: 'bat (noun)', match: 'Baseball bat' }
  ]},
  { num: 6, title: "Mountain Helpers", skills: "Phonograms h/k/r", words: ["hat", "hot", "kit", "kid", "run", "red"], flashcards: [
    { term: 'H', match: 'hat' },
    { term: 'K', match: 'kid' },
    { term: 'R', match: 'run' }
  ]},
  { num: 7, title: "Reading Stories", skills: "Read connected text", words: ["the", "and", "is", "in", "on", "it"], flashcards: [
    { term: 'the', match: 'the cat' },
    { term: 'and', match: 'cat and dog' },
    { term: 'is', match: 'it is' },
    { term: 'in', match: 'in the box' }
  ]},
  { num: 8, title: "New Sounds to Discover", skills: "Phonograms i/v/f/z", words: ["it", "is", "van", "vet", "fun", "zip"], flashcards: [
    { term: 'I', match: 'it' },
    { term: 'V', match: 'van' },
    { term: 'F', match: 'fun' },
    { term: 'Z', match: 'zip' }
  ]},
  { num: 9, title: "Punctuation Practice", skills: "Periods and question marks", words: ["What", "Who", "Where", "When"], flashcards: [
    { term: '.', match: 'End of sentence' },
    { term: '?', match: 'Question' },
    { term: '!', match: 'Excited' }
  ]},
  { num: 10, title: "More Letter Friends", skills: "Phonograms o/l/w", words: ["on", "log", "lot", "will", "well", "we"], flashcards: [
    { term: 'O', match: 'on' },
    { term: 'L', match: 'log' },
    { term: 'W', match: 'will' }
  ]},
  { num: 11, title: "Billy's Trail Tales", skills: "Story comprehension", words: ["trail", "rock", "climb", "up", "down"], flashcards: [
    { term: 'up', match: '⬆️' },
    { term: 'down', match: '⬇️' },
    { term: 'climb', match: '🧗' }
  ]},
  { num: 12, title: "The /u/ Sound", skills: "Phonogram u", words: ["up", "bug", "cup", "sun", "fun", "run"], flashcards: [
    { term: 'U', match: 'bug' },
    { term: 'c_p', match: 'cup' },
    { term: 's_n', match: 'sun' }
  ]},
  { num: 13, title: "Billy's Point of View", skills: "Character perspective", words: ["see", "saw", "look", "think", "feel"], flashcards: [
    { term: 'see', match: '👀' },
    { term: 'think', match: '🤔' },
    { term: 'feel', match: '❤️' }
  ]},
  { num: 14, title: "The Super Vowel E", skills: "Phonogram e", words: ["bed", "red", "ten", "pen", "yes", "wet"], flashcards: [
    { term: 'E', match: 'bed' },
    { term: 'b_d', match: 'bed' },
    { term: 'r_d', match: 'red' },
    { term: 't_n', match: 'ten' }
  ]},
  { num: 15, title: "Story Time Order", skills: "Sequence events", words: ["first", "then", "next", "last"], flashcards: [
    { term: 'first', match: '1️⃣' },
    { term: 'then', match: '2️⃣' },
    { term: 'next', match: '3️⃣' },
    { term: 'last', match: '✅' }
  ]},
  { num: 16, title: "Quick Sounds", skills: "Phonograms qu & x", words: ["quick", "quit", "fox", "box", "six"], flashcards: [
    { term: 'QU', match: 'quick' },
    { term: 'X', match: 'fox' }
  ]},
  { num: 17, title: "Silly Sentence Mountain", skills: "Create sentences", words: ["The", "cat", "jumps", "runs", "sits"], flashcards: [
    { term: 'The cat', match: 'jumps' },
    { term: 'The dog', match: 'runs' },
    { term: 'The bug', match: 'sits' }
  ]},
  { num: 18, title: "Two Letters One Sound", skills: "Consonant team th", words: ["this", "that", "then", "with"], flashcards: [
    { term: 'TH', match: 'this' },
    { term: 'th_t', match: 'that' },
    { term: 'th_n', match: 'then' }
  ]},
  { num: 19, title: "Why Characters Do Things", skills: "Character motivation", words: ["because", "so", "want", "need"], flashcards: [
    { term: 'want', match: 'I want a cookie' },
    { term: 'need', match: 'I need water' },
    { term: 'because', match: 'Why? Because!' }
  ]},
  { num: 20, title: "The Shy Sound", skills: "Consonant team sh", words: ["she", "ship", "shop", "fish", "wish"], flashcards: [
    { term: 'SH', match: 'ship' },
    { term: 'f_sh', match: 'fish' },
    { term: 'w_sh', match: 'wish' }
  ]},
  { num: 21, title: "Where Stories Happen", skills: "Story setting", words: ["where", "here", "there", "place"], flashcards: [
    { term: 'mountain', match: '⛰️' },
    { term: 'forest', match: '🌲' },
    { term: 'home', match: '🏠' }
  ]},
  { num: 22, title: "The Chomping Sound", skills: "Consonant team ch", words: ["chip", "chop", "chat", "much", "such"], flashcards: [
    { term: 'CH', match: 'chip' },
    { term: 'm_ch', match: 'much' },
    { term: 's_ch', match: 'such' }
  ]},
  { num: 23, title: "Pictures Tell Stories", skills: "Use illustrations", words: ["picture", "show", "tell", "draw"], flashcards: [
    { term: '📖', match: 'book' },
    { term: '🖼️', match: 'picture' },
    { term: '✏️', match: 'draw' }
  ]},
  { num: 24, title: "Sounds at the End", skills: "Final blends (ft, lt, mp, nd, nt)", words: ["left", "melt", "jump", "sand", "went"], flashcards: [
    { term: 'le_t', match: 'left' },
    { term: 'ju_p', match: 'jump' },
    { term: 'sa_d', match: 'sand' }
  ]},
  { num: 25, title: "Pictures and Words Together", skills: "Match text with illustrations", words: ["match", "same", "different", "look"], flashcards: [
    { term: '😊', match: 'happy' },
    { term: '😢', match: 'sad' },
    { term: '😠', match: 'mad' }
  ]},
  { num: 26, title: "Sounds at the Start", skills: "Initial blends (bl, cl, fl, gl, pl, sl)", words: ["black", "clap", "flag", "glad", "plan", "slip"], flashcards: [
    { term: 'BL', match: 'black' },
    { term: 'CL', match: 'clap' },
    { term: 'FL', match: 'flag' },
    { term: 'GL', match: 'glad' }
  ]},
  { num: 27, title: "More Starting Blends", skills: "Initial blends (br, cr, dr, fr, gr, tr)", words: ["brick", "crab", "drum", "frog", "grass", "trip"], flashcards: [
    { term: 'BR', match: 'brick' },
    { term: 'CR', match: 'crab' },
    { term: 'DR', match: 'drum' },
    { term: 'FR', match: 'frog' }
  ]},
  { num: 28, title: "Even More Blends", skills: "Initial blends (sc, sk, sm, sn, sp, st, sw)", words: ["scan", "skip", "snap", "spot", "swim"], flashcards: [
    { term: 'SK', match: 'skip' },
    { term: 'SN', match: 'snap' },
    { term: 'SP', match: 'spot' },
    { term: 'SW', match: 'swim' }
  ]},
  { num: 29, title: "Triple Blends", skills: "Three-letter blends (scr, spr, str)", words: ["scrap", "spring", "string", "strip"], flashcards: [
    { term: 'SCR', match: 'scrap' },
    { term: 'SPR', match: 'spring' },
    { term: 'STR', match: 'string' }
  ]},
  { num: 30, title: "Celebration Time!", skills: "Review all sounds learned", words: ["great", "job", "you", "did", "it"], flashcards: [
    { term: 'You', match: '👦' },
    { term: 'did', match: '✅' },
    { term: 'it!', match: '🎉' },
    { term: 'Great', match: '⭐' }
  ]}
];

function generateLesson(lesson) {
  const flashcardsJS = JSON.stringify(lesson.flashcards, null, 20).replace(/\n/g, '\n                ');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lesson.num}: ${lesson.title} - BedrockELA 1st Grade</title>
    <link rel="stylesheet" href="css/flashcard-game.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #1B2A30;
            background: url("./images/lesson-background-universal.png") center / cover no-repeat;
            background-attachment: fixed;
            min-height: 100vh;
        }
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; color: white; margin-bottom: 30px; }
        .header h1 { font-size: 2.5rem; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .billy-avatar {
            width: 80px; height: 80px; border-radius: 50%;
            background: linear-gradient(135deg, #B06821 0%, #305853 100%);
            margin: 0 auto 20px; display: flex; align-items: center;
            justify-content: center; font-size: 40px;
        }
        .lesson-card {
            background: white; border-radius: 25px; padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px;
        }
        .activity-box {
            background: #FFF9E6; border-radius: 15px; padding: 20px;
            margin: 20px 0; border-left: 5px solid #B06821;
        }
        .activity-box h3 { color: #B06821; margin-bottom: 15px; }
        .word-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 10px; margin: 15px 0;
        }
        .word-card {
            background: white; border: 2px solid #305853;
            border-radius: 10px; padding: 15px; text-align: center;
            font-size: 1.3rem; font-weight: bold; color: #305853;
        }
        .billy-says {
            background: rgba(48,88,83,0.08); border-radius: 15px; padding: 20px;
            margin: 15px 0; border-left: 5px solid #305853;
        }
        .billy-says::before { content: "🐐 Little Billy says: "; font-weight: bold; color: #1B2A30; }
        .nav-buttons { display: flex; justify-content: space-between; margin: 30px 0; gap: 15px; }
        .nav-btn {
            background: linear-gradient(135deg, #B06821 0%, #305853 100%);
            color: white; padding: 12px 25px; border-radius: 25px;
            text-decoration: none; display: inline-block; font-weight: bold;
            cursor: pointer; border: none; font-size: 1rem; transition: transform 0.2s;
        }
        .nav-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .top-nav {
            background: rgba(48,88,83,0.95);
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .top-nav .logo {
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
        }
        .top-nav .dashboard-btn {
            background: #B06821;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            text-decoration: none;
            font-weight: bold;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .top-nav .dashboard-btn:hover {
            background: #8B4F19;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="top-nav">
            <div class="logo">📚 BedrockELA - 1st Grade</div>
            <a href="student-dashboard-live.html" class="dashboard-btn">← Back to Dashboard</a>
        </div>
        
        <div class="header">
            <div class="billy-avatar">🐐</div>
            <h1>Lesson ${lesson.num}: ${lesson.title}</h1>
            <p>${lesson.skills}</p>
        </div>

        <div class="lesson-card">
            <div class="billy-says">
                Welcome to Lesson ${lesson.num}, little climber! Today we're learning about ${lesson.skills}. Let's practice these new sounds together!
            </div>
            
            <div class="activity-box">
                <h3>🎯 Today's Words</h3>
                <div class="word-grid">
${lesson.words.map(w => `                    <div class="word-card">${w}</div>`).join('\n')}
                </div>
            </div>
            
            <div class="activity-box">
                <h3>📖 Reading Practice</h3>
                <p><strong>Parent/Teacher:</strong> Read these words together. Point to each letter as you say its sound!</p>
                <ul>
${lesson.words.map(w => `                    <li>Practice: <strong>${w}</strong></li>`).join('\n')}
                </ul>
            </div>
            
            <!-- Flashcard Game -->
            <div style="margin: 30px 0;">
                <h3 style="text-align: center; color: #305853; margin-bottom: 15px;">🎮 Practice Game!</h3>
                <div id="flashcard-game"></div>
            </div>
            
            <div class="billy-says">
                Great work today! You're learning so many new sounds. Keep practicing and you're doing amazing! 🐐
            </div>
        </div>

        <div class="nav-buttons">
            ${lesson.num > 1 ? `<a href="1st-grade-lesson-${lesson.num - 1}.html" class="nav-btn">← Lesson ${lesson.num - 1}</a>` : '<a href="student-dashboard-live.html" class="nav-btn">← Dashboard</a>'}
            ${lesson.num < 30 ? `<a href="1st-grade-lesson-${lesson.num + 1}.html" class="nav-btn">Lesson ${lesson.num + 1} →</a>` : '<a href="student-dashboard-live.html" class="nav-btn">Dashboard →</a>'}
        </div>
    </div>

    <script src="js/flashcard-game.js"></script>
    <script>
        createFlashcardGame('flashcard-game', {
            title: '${lesson.title}',
            subtitle: 'Match the pairs!',
            pairs: ${flashcardsJS}
        });
    </script>
</body>
</html>`;
}

console.log('🚀 Building 1st grade lessons 4-30...');

lessons.forEach(lesson => {
  const html = generateLesson(lesson);
  const filename = `1st-grade-lesson-${lesson.num}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Created ${filename}: ${lesson.title}`);
});

console.log('\n🎉 Done! Created 27 new 1st grade lessons!');
console.log('📚 Total 1st grade lessons: 30 (Lessons 1-30)');
