// Build 6th Grade Unit 1: Tom Sawyer (Days 1-20)
const fs = require('fs');
const path = require('path');

// Load Tom Sawyer chapters
const tomSawyerChapters = JSON.parse(fs.readFileSync('book-data/tom-sawyer-chapters.json', 'utf8'));

// Function to get chapter text
function getChapters(chapterNums) {
  return chapterNums.map(num => tomSawyerChapters[num]).filter(Boolean);
}

// BedrockELA color scheme
const colors = {
  white: '#FFFFFF',
  deepTeal: '#305853',
  goldenAmber: '#B06821',
  brickRed: '#9E2C21',
  darkMahogany: '#511B18',
  slateBlue: '#1B2A50'
};

// Unit 1 lesson data
const unit1Lessons = [
  {
    day: 1,
    title: "Welcome to The Adventures of Tom Sawyer",
    type: "intro",
    chapters: "Introduction",
    focus: "Meet Mark Twain and 1840s Missouri",
    vocab: ["satire", "episodic", "Mississippi", "antebellum", "colloquial"],
    content: {
      welcome: "Welcome to Unit 1! Over the next 20 days, you'll journey back to the 1840s and meet Tom Sawyer, one of America's most beloved characters.",
      beforeReading: "What do you know about life along the Mississippi River in the 1840s? What makes a character memorable?",
      mainActivity: "Read about Mark Twain's life and the world of Tom Sawyer. Watch how Twain uses humor and dialect to bring his characters to life.",
      journal: "If you could travel back in time to meet Tom Sawyer, what would you ask him? Why?"
    }
  },
  {
    day: 2,
    title: "Tom and Aunt Polly",
    type: "regular",
    chapters: "Chapters 1-2",
    chapterNumbers: [1, 2],
    focus: "Meet Tom Sawyer and learn about his clever tricks",
    vocab: ["beguiled", "commenced", "ornery", "reckoned", "meditate"],
    passage: "tom-sawyer-ch1-2",
    comprehension: [
      {
        question: "How does Tom trick his friends into whitewashing the fence? Cite two specific strategies he uses.",
        standard: "RL.6.1",
        answer: "Tom makes the work seem desirable by pretending it's fun and exclusive. He refuses to let Ben paint at first, making Ben want to do it even more."
      },
      {
        question: "What does Twain mean when he writes that Tom 'had discovered a great law of human action'?",
        standard: "RL.6.2", 
        answer: "Tom learned that people want things more when they seem difficult to get. Making work look like play changes how people see it."
      }
    ],
    journal: "Tom is very clever at getting out of work. Write about a time you used creativity to solve a problem."
  },
  {
    day: 3,
    title: "Sunday School and First Love",
    type: "regular",
    chapters: "Chapters 3-4",
    chapterNumbers: [3, 4],
    focus: "Tom shows off and falls for Becky Thatcher",
    vocab: ["conspicuous", "diligence", "derision", "mortified", "resolute"],
    passage: "tom-sawyer-ch3-4",
    comprehension: [
      {
        question: "Why does Tom try so hard to win a Bible at Sunday School? What does this reveal about his character?",
        standard: "RL.6.3",
        answer: "Tom wants to impress Becky Thatcher. He cares more about looking good than actual achievement, showing his vanity and desire for attention."
      },
      {
        question: "How does Twain use humor in the church scenes? Give two examples.",
        standard: "RL.6.4",
        answer: "Twain describes the pinch-bug and poodle incident, and Tom's failed attempts to memorize Bible verses with comic exaggeration."
      }
    ],
    journal: "Tom falls in love with Becky at first sight. Do you believe in 'love at first sight'? Why or why not?"
  },
  {
    day: 4,
    title: "Pirates and Adventure",
    type: "regular",
    chapters: "Chapters 5-6",
    chapterNumbers: [5, 6],
    focus: "Tom's imagination and his friendship with Huckleberry Finn",
    vocab: ["rendezvous", "malady", "gratification", "impediment", "pariah"],
    passage: "tom-sawyer-ch5-6",
    comprehension: [
      {
        question: "How is Huckleberry Finn different from the other boys in town? Why do mothers forbid their children to play with him?",
        standard: "RL.6.3",
        answer: "Huck is free, doesn't go to school, sleeps wherever he wants, and has no adult supervision. Mothers see him as a bad influence."
      },
      {
        question: "What does Tom's reaction to Becky ignoring him reveal about his personality?",
        standard: "RL.6.1",
        answer: "Tom is dramatic and emotional. He immediately thinks of running away and becoming a pirate, showing his tendency to exaggerate and seek adventure."
      }
    ],
    journal: "Huck Finn is considered an 'outcast' but Tom admires his freedom. What does freedom mean to you?"
  },
  {
    day: 5,
    title: "Week 1 Check-In",
    type: "assessment",
    chapters: "Review Chapters 1-6",
    focus: "Vocabulary review and reading comprehension check",
    vocabQuiz: [
      // Day 1 words
      { word: "satire", definition: "the use of humor, irony, or exaggeration to criticize", sentence: "Mark Twain used _______ to make fun of human nature." },
      { word: "episodic", definition: "made up of separate episodes or events", sentence: "Tom Sawyer has an _______ structure with many different adventures." },
      { word: "Mississippi", definition: "the great river along which Tom's town sits", sentence: "The _______ River was central to life in 1840s Missouri." },
      { word: "antebellum", definition: "existing before a war, especially the Civil War", sentence: "The story takes place in the _______ South before the Civil War." },
      { word: "colloquial", definition: "informal language used in everyday conversation", sentence: "Twain's characters speak in _______ dialect rather than formal English." },
      
      // Day 2 words
      { word: "beguiled", definition: "charmed or enchanted, sometimes in a deceptive way", sentence: "Tom _______ his friends into doing his work for him." },
      { word: "commenced", definition: "began or started", sentence: "Aunt Polly _______ to scold Tom for his mischief." },
      { word: "ornery", definition: "bad-tempered and difficult to deal with", sentence: "Tom could be quite _______ when he didn't get his way." },
      { word: "reckoned", definition: "thought or supposed", sentence: "Tom _______ he could trick Ben into whitewashing the fence." },
      { word: "meditate", definition: "to think deeply or focus one's mind", sentence: "Tom would _______ on ways to avoid work." },
      
      // Day 3 words
      { word: "conspicuous", definition: "standing out and attracting attention", sentence: "Tom made himself _______ in front of Becky Thatcher." },
      { word: "diligence", definition: "careful and persistent work or effort", sentence: "Tom showed no _______ when it came to his schoolwork." },
      { word: "derision", definition: "contemptuous ridicule or mockery", sentence: "The other boys looked at Tom with _______ when he failed." },
      { word: "mortified", definition: "deeply embarrassed or humiliated", sentence: "Tom was _______ when Becky saw him make a fool of himself." },
      { word: "resolute", definition: "admirably purposeful and determined", sentence: "Tom was _______ in his pursuit of Becky's affection." },
      
      // Day 4 words
      { word: "rendezvous", definition: "a planned meeting at a specific time and place", sentence: "The boys agreed on a _______ at midnight in the graveyard." },
      { word: "malady", definition: "an illness or disease", sentence: "Tom pretended to have a serious _______ to avoid school." },
      { word: "gratification", definition: "pleasure or satisfaction", sentence: "Tom found great _______ in his freedom with Huck." },
      { word: "impediment", definition: "a hindrance or obstruction", sentence: "School was an _______ to Tom's adventurous plans." },
      { word: "pariah", definition: "an outcast rejected by society", sentence: "Huck Finn was treated as a _______ by the respectable townspeople." }
    ],
    comprehension: [
      {
        question: "Describe Tom Sawyer's personality using at least three character traits. Support each trait with evidence from the text.",
        standard: "RL.6.3",
        type: "essay"
      },
      {
        question: "How does Mark Twain use dialect (the way characters talk) to make the story feel real? Give two examples.",
        standard: "RL.6.4",
        type: "short-answer"
      },
      {
        question: "What is the most important thing that has happened in the story so far? Why is it important?",
        standard: "RL.6.2",
        type: "short-answer"
      }
    ],
    journal: "Reflect on what you've read so far. What do you like about Tom Sawyer? What surprises you about life in the 1840s? What questions do you have about the story?"
  }
];

// Generate lesson HTML for each day
function buildLesson(lesson) {
  const isAssessment = lesson.type === 'assessment';
  const isIntro = lesson.type === 'intro';
  
  const pages = [];
  
  // Page 1: Title
  pages.push(`
    <div class="lesson-page" data-page="1">
      <div class="page-content title-page">
        <div class="lesson-icon">📚</div>
        <h1 class="lesson-title">Day ${lesson.day}</h1>
        <h2 class="lesson-subtitle">${lesson.title}</h2>
        <p class="lesson-meta">${lesson.chapters}</p>
        <p class="lesson-focus"><strong>Focus:</strong> ${lesson.focus}</p>
      </div>
    </div>
  `);
  
  // Page 2: Welcome
  pages.push(`
    <div class="lesson-page" data-page="2">
      <div class="page-content">
        <h2 style="color: ${colors.deepTeal}; margin-bottom: 20px;">Welcome to Day ${lesson.day}!</h2>
        <div class="welcome-content">
          ${isIntro ? `<p>${lesson.content.welcome}</p>` : 
            `<p>Today we're reading <strong>${lesson.chapters}</strong> from <em>The Adventures of Tom Sawyer</em> by Mark Twain.</p>
            <p><strong>Reading Focus:</strong> ${lesson.focus}</p>`
          }
        </div>
      </div>
    </div>
  `);
  
  // Page 3: Vocabulary or Vocab Quiz
  if (isAssessment) {
    // Vocab QUIZ for assessment days
    pages.push(`
      <div class="lesson-page" data-page="3">
        <div class="page-content">
          <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">📝 Vocabulary Quiz</h2>
          <p style="margin-bottom: 20px;">Fill in the blanks with the correct vocabulary word from this week:</p>
          <div class="vocab-quiz">
            ${lesson.vocabQuiz.map((item, i) => `
              <div class="quiz-item" style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                <p><strong>${i + 1}. ${item.sentence}</strong></p>
                <p style="font-size: 0.9em; color: #666; margin-top: 8px;"><em>Hint: ${item.definition}</em></p>
                <input type="text" class="vocab-answer" style="width: 100%; padding: 10px; margin-top: 10px; border: 2px solid #ddd; border-radius: 6px;" placeholder="Type your answer...">
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `);
  } else {
    // Regular vocab page
    pages.push(`
      <div class="lesson-page" data-page="3">
        <div class="page-content">
          <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">📖 Words of the Day</h2>
          <p style="margin-bottom: 20px;">These words come from today's reading. Learn them to better understand the story!</p>
          <div class="vocab-list">
            ${lesson.vocab.map((word, i) => `
              <div class="vocab-word" style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                <h3 style="color: ${colors.deepTeal}; margin-bottom: 8px;">${i + 1}. ${word}</h3>
                <p class="vocab-def" style="font-style: italic; color: #555;"><em>Definition will be discovered in context during reading</em></p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `);
  }
  
  // Page 4: Reading or Comprehension Assessment
  if (isAssessment) {
    pages.push(`
      <div class="lesson-page" data-page="4">
        <div class="page-content">
          <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">✍️ Reading Comprehension</h2>
          <p style="margin-bottom: 20px;">Answer these questions about what you've read this week:</p>
          <div class="comprehension-questions">
            ${lesson.comprehension.map((q, i) => `
              <div class="comp-question" style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
                <p style="font-weight: 700; margin-bottom: 15px;">${i + 1}. ${q.question}</p>
                <textarea class="comp-answer" rows="5" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write your answer here..."></textarea>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `);
  } else if (isIntro) {
    pages.push(`
      <div class="lesson-page" data-page="4">
        <div class="page-content">
          <h2 style="color: ${colors.deepTeal}; margin-bottom: 20px;">📜 Before You Read</h2>
          <p>${lesson.content.beforeReading}</p>
          <h3 style="color: ${colors.goldenAmber}; margin-top: 30px; margin-bottom: 15px;">Today's Activity:</h3>
          <p>${lesson.content.mainActivity}</p>
        </div>
      </div>
    `);
  } else {
    // Get actual chapter text
    const chapters = lesson.chapterNumbers ? getChapters(lesson.chapterNumbers) : [];
    const chapterHTML = chapters.map(ch => {
      // Format the chapter text with paragraphs
      const paragraphs = ch.text.split('\n\n').map(p => 
        `<p style="margin-bottom: 15px; text-indent: 2em;">${p.trim()}</p>`
      ).join('');
      
      return `
        <div class="chapter-section" style="margin-bottom: 40px;">
          <h3 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">${ch.title}</h3>
          ${paragraphs}
        </div>
      `;
    }).join('');
    
    pages.push(`
      <div class="lesson-page" data-page="4">
        <div class="page-content">
          <h2 style="color: ${colors.deepTeal}; margin-bottom: 20px;">📖 Today's Reading</h2>
          <div class="reading-passage" style="line-height: 1.8; font-size: 1.05em; max-height: 600px; overflow-y: auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
            ${chapterHTML || `<p><em>Reading content will be added soon.</em></p>`}
          </div>
          <p style="margin-top: 20px; color: #666;"><strong>Read carefully and look for the vocabulary words!</strong></p>
        </div>
      </div>
    `);
  }
  
  // Page 5: Comprehension Questions (regular days) or Journal (assessment days)
  if (!isAssessment && !isIntro) {
    pages.push(`
      <div class="lesson-page" data-page="5">
        <div class="page-content">
          <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">🤔 Comprehension Questions</h2>
          <div class="comprehension-questions">
            ${lesson.comprehension.map((q, i) => `
              <div class="comp-question" style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                <p style="font-weight: 700; margin-bottom: 10px;">${i + 1}. ${q.question}</p>
                <textarea class="comp-answer" rows="4" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write your answer with evidence from the text..."></textarea>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `);
  }
  
  // Page 6: Journal
  pages.push(`
    <div class="lesson-page" data-page="${isAssessment ? '5' : '6'}">
      <div class="page-content">
        <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">✏️ Journal Entry</h2>
        <p style="margin-bottom: 20px;"><strong>Prompt:</strong> ${lesson.journal}</p>
        <textarea class="journal-entry" rows="10" style="width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1em;" placeholder="Write your thoughts here..."></textarea>
        <button onclick="window.lessonMarkComplete('journal')" style="margin-top: 20px; padding: 15px 30px; background: ${colors.deepTeal}; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Save Journal Entry</button>
      </div>
    </div>
  `);
  
  // Page 7: Completion
  pages.push(`
    <div class="lesson-page" data-page="${isAssessment ? '6' : '7'}">
      <div class="page-content completion-page" style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
        <h2 style="color: ${colors.deepTeal}; margin-bottom: 15px;">Great Work!</h2>
        <p style="font-size: 1.2em; margin-bottom: 30px;">You've completed Day ${lesson.day}${isAssessment ? ' assessment' : ''}!</p>
        <button onclick="window.location.href='student-dashboard.html'" style="padding: 15px 40px; background: ${colors.goldenAmber}; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Back to Dashboard →</button>
      </div>
    </div>
  `);
  
  return buildFullHTML(lesson, pages);
}

function buildFullHTML(lesson, pages) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>6th Grade - Day ${lesson.day} - BedrockELA</title>
  <link rel="stylesheet" href="css/lesson-viewer.css">
  <style>
    body { font-family: 'Nunito', sans-serif; background: ${colors.white}; margin: 0; padding: 0; }
    .lesson-container { max-width: 900px; margin: 0 auto; padding: 20px; }
    .lesson-page { display: none; min-height: 500px; }
    .lesson-page.active { display: block; }
    .page-content { padding: 30px; }
    .title-page { text-align: center; padding: 60px 30px; }
    .lesson-icon { font-size: 5rem; margin-bottom: 20px; }
    .lesson-title { color: ${colors.deepTeal}; font-size: 2.5rem; margin-bottom: 10px; }
    .lesson-subtitle { color: ${colors.goldenAmber}; font-size: 1.8rem; margin-bottom: 15px; }
    .lesson-meta { color: #666; font-size: 1.2rem; margin-bottom: 10px; }
    .lesson-focus { color: #444; font-size: 1.1rem; font-style: italic; }
    
    .nav-controls { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 10px; }
    .nav-btn { padding: 12px 24px; background: ${colors.deepTeal}; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
    .nav-btn:disabled { background: #ccc; cursor: not-allowed; }
    .progress-bar { flex: 1; margin: 0 20px; height: 8px; background: #e0e0e0; border-radius: 10px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, ${colors.deepTeal}, ${colors.goldenAmber}); transition: width 0.3s; }
  </style>
</head>
<body>
  <div class="lesson-container">
    <div id="lessonContent">
      ${pages.join('\n')}
    </div>
    
    <div class="nav-controls">
      <button class="nav-btn" id="prevBtn" onclick="previousPage()">← Previous</button>
      <div class="progress-bar">
        <div class="progress-fill" id="progressBar"></div>
      </div>
      <button class="nav-btn" id="nextBtn" onclick="nextPage()">Next →</button>
    </div>
  </div>

  <script src="js/lesson-viewer.js"></script>
  <script>
    let currentPage = 1;
    const totalPages = ${pages.length};
    
    function showPage(pageNum) {
      document.querySelectorAll('.lesson-page').forEach(p => p.classList.remove('active'));
      const page = document.querySelector(\`.lesson-page[data-page="\${pageNum}"]\`);
      if (page) page.classList.add('active');
      
      document.getElementById('prevBtn').disabled = (pageNum === 1);
      document.getElementById('nextBtn').disabled = (pageNum === totalPages);
      
      const progress = (pageNum / totalPages) * 100;
      document.getElementById('progressBar').style.width = progress + '%';
      
      currentPage = pageNum;
      window.scrollTo(0, 0);
    }
    
    function nextPage() { if (currentPage < totalPages) showPage(currentPage + 1); }
    function previousPage() { if (currentPage > 1) showPage(currentPage - 1); }
    
    window.lessonMarkComplete = function(type) {
      alert('Progress saved! ✅');
      nextPage();
    };
    
    showPage(1);
  </script>
</body>
</html>`;
}

// Add Days 6-10 (Week 2)
unit1Lessons.push(
  {
    day: 6,
    title: "School and Punishment",
    type: "regular",
    chapters: "Chapters 7-9",
    chapterNumbers: [7, 8, 9],
    focus: "Tom at school, his love for Becky, and the graveyard scene",
    vocab: ["solemn", "melancholy", "vengeance", "ominous", "ghastly"],
    comprehension: [
      { question: "How does Tom get punished at school? How does this lead to sitting next to Becky?", standard: "RL.6.3" },
      { question: "What happens in the graveyard? Why is this scene important to the plot?", standard: "RL.6.5" }
    ],
    journal: "Tom and Huck witness something terrible in the graveyard. Would you have the courage to tell the truth?"
  },
  {
    day: 7,
    title: "The Oath and the Terror",
    type: "regular",
    chapters: "Chapters 10-12",
    chapterNumbers: [10, 11, 12],
    focus: "Tom and Huck's secret oath, fear, and guilt",
    vocab: ["oath", "conscience", "wretched", "haunted", "testimony"],
    comprehension: [
      { question: "Why do Tom and Huck make a blood oath? What are they afraid of?", standard: "RL.6.1" },
      { question: "How does guilt affect Tom's behavior? Give specific examples.", standard: "RL.6.3" }
    ],
    journal: "Tom keeps a dangerous secret. Have you ever kept a secret that weighed on your conscience?"
  },
  {
    day: 8,
    title: "Running Away to Pirate Island",
    type: "regular",
    chapters: "Chapters 13-15",
    chapterNumbers: [13, 14, 15],
    focus: "The boys become pirates and run away",
    vocab: ["exiled", "marauder", "comrade", "forlorn", "triumphant"],
    comprehension: [
      { question: "Why do Tom, Joe, and Huck run away to become pirates?", standard: "RL.6.3" },
      { question: "How do the boys feel on Jackson's Island? How do their feelings change?", standard: "RL.6.3" }
    ],
    journal: "The boys run away to escape their troubles. Is running away ever a solution to problems?"
  },
  {
    day: 9,
    title: "The Glorious Return",
    type: "regular",
    chapters: "Chapters 16-18",
    chapterNumbers: [16, 17, 18],
    focus: "Tom's dramatic return at his own funeral",
    vocab: ["funeral", "mourning", "spectacle", "vanity", "reconcile"],
    comprehension: [
      { question: "Why does Tom sneak home during the night? What does he overhear?", standard: "RL.6.1" },
      { question: "Describe the funeral scene. How does Tom's entrance change everything?", standard: "RL.6.3" }
    ],
    journal: "Tom appears at his own funeral. How would you feel if you discovered someone you mourned was alive?"
  },
  {
    day: 10,
    title: "Week 2 Assessment",
    type: "assessment",
    chapters: "Review Chapters 7-18",
    focus: "Vocab quiz and comprehension check",
    vocabQuiz: [
      { word: "solemn", definition: "serious and dignified", sentence: "The graveyard had a _______ atmosphere at midnight." },
      { word: "melancholy", definition: "deep, long-lasting sadness", sentence: "Tom felt _______ when he thought about being an outcast." },
      { word: "vengeance", definition: "punishment inflicted in retaliation", sentence: "Injun Joe sought _______ against his enemies." },
      { word: "ominous", definition: "giving the impression that something bad will happen", sentence: "The dark clouds looked _______ as they approached." },
      { word: "ghastly", definition: "causing great horror or fear", sentence: "The murder scene was absolutely _______." },
      { word: "oath", definition: "a solemn promise", sentence: "Tom and Huck swore an _______ never to tell what they saw." },
      { word: "conscience", definition: "inner sense of right and wrong", sentence: "Tom's _______ troubled him for keeping the secret." },
      { word: "wretched", definition: "very unhappy or unfortunate", sentence: "Tom felt _______ with guilt." },
      { word: "haunted", definition: "troubled by persistent memories", sentence: "Tom was _______ by visions of the graveyard." },
      { word: "testimony", definition: "formal statement of evidence", sentence: "Tom's _______ would save Muff Potter." },
      { word: "exiled", definition: "banished or expelled", sentence: "The boys felt _______ from society on the island." },
      { word: "marauder", definition: "a raider or plunderer", sentence: "The boys imagined themselves as fearsome _______s." },
      { word: "comrade", definition: "a companion or fellow member", sentence: "Joe Harper was Tom's loyal _______." },
      { word: "forlorn", definition: "sad and lonely", sentence: "The boys felt _______ on their second night away." },
      { word: "triumphant", definition: "victorious and successful", sentence: "Tom's _______ return shocked everyone." },
      { word: "funeral", definition: "ceremony honoring the dead", sentence: "The whole town attended the boys' _______." },
      { word: "mourning", definition: "expressing grief for someone who has died", sentence: "Aunt Polly was in deep _______ for Tom." },
      { word: "spectacle", definition: "remarkable or dramatic display", sentence: "The funeral became quite a _______." },
      { word: "vanity", definition: "excessive pride in oneself", sentence: "Tom's _______ made him crave attention." },
      { word: "reconcile", definition: "restore friendly relations", sentence: "Tom and Becky were able to _______ after their fight." }
    ],
    comprehension: [
      { question: "How does the graveyard scene change the course of the story? What conflict does it create?", standard: "RL.6.5", type: "essay" },
      { question: "Compare Tom's behavior at the beginning vs. the pirate island. Is he changing?", standard: "RL.6.3", type: "essay" },
      { question: "What theme about guilt and conscience emerges in these chapters?", standard: "RL.6.2", type: "short" }
    ],
    journal: "Reflect on Chapters 7-18. What has been the most exciting part so far?"
  }
);

// Add Days 11-15 (Week 3)
unit1Lessons.push(
  {
    day: 11,
    title: "Love and Jealousy",
    type: "regular",
    chapters: "Chapters 19-21",
    chapterNumbers: [19, 20, 21],
    focus: "Tom's relationship with Becky and taking her punishment",
    vocab: ["jealousy", "reconciliation", "noble", "selfless", "humiliation"],
    comprehension: [
      { question: "What does Tom do to protect Becky from punishment? Why?", standard: "RL.6.3" },
      { question: "How does this act change Becky's feelings toward Tom?", standard: "RL.6.3" }
    ],
    journal: "Tom takes Becky's punishment. Write about a time you stood up for someone or took blame for them."
  },
  {
    day: 12,
    title: "Muff Potter on Trial",
    type: "regular",
    chapters: "Chapters 22-24",
    chapterNumbers: [22, 23, 24],
    focus: "Tom's courage in telling the truth at the trial",
    vocab: ["testimony", "verdict", "justice", "courage", "vindication"],
    comprehension: [
      { question: "Why does Tom finally decide to testify at Muff Potter's trial?", standard: "RL.6.3" },
      { question: "What are the consequences of Tom telling the truth? Both good and bad?", standard: "RL.6.5" }
    ],
    journal: "Tom risks his life to tell the truth. When is it important to speak up, even when it's scary?"
  },
  {
    day: 13,
    title: "Treasure Hunting",
    type: "regular",
    chapters: "Chapters 25-27",
    chapterNumbers: [25, 26, 27],
    focus: "Tom and Huck search for treasure and find real danger",
    vocab: ["treasure", "haunted", "discovery", "concealed", "pursuit"],
    comprehension: [
      { question: "What do Tom and Huck find in the haunted house? What do they overhear?", standard: "RL.6.1" },
      { question: "How does this discovery create new suspense in the story?", standard: "RL.6.5" }
    ],
    journal: "If you found a treasure map, would you follow it? Why or why not?"
  },
  {
    day: 14,
    title: "Following Injun Joe",
    type: "regular",
    chapters: "Chapters 28-30",
    chapterNumbers: [28, 29, 30],
    focus: "The boys track the villain while a picnic goes wrong",
    vocab: ["vigilant", "peril", "labyrinth", "desperate", "anguish"],
    comprehension: [
      { question: "How does the picnic and cave exploration begin innocently but turn dangerous?", standard: "RL.6.5" },
      { question: "What creates suspense as Tom and Becky realize they're lost?", standard: "RL.6.4" }
    ],
    journal: "Tom and Becky are lost in the dark cave. Describe a time you felt lost or scared."
  },
  {
    day: 15,
    title: "Week 3 Assessment",
    type: "assessment",
    chapters: "Review Chapters 19-30",
    focus: "Vocab quiz and comprehension check",
    vocabQuiz: [
      { word: "jealousy", definition: "feeling of envy toward someone", sentence: "Tom felt _______ when Becky talked to Alfred." },
      { word: "reconciliation", definition: "restoration of friendly relations", sentence: "Tom and Becky's _______ made both happy." },
      { word: "noble", definition: "having high moral qualities", sentence: "Tom's _______ act impressed everyone." },
      { word: "selfless", definition: "concerned more with others than oneself", sentence: "Taking the punishment was a _______ deed." },
      { word: "humiliation", definition: "the feeling of being ashamed", sentence: "Tom endured public _______ for Becky." },
      { word: "testimony", definition: "formal statement given in court", sentence: "Tom's _______ saved Muff Potter's life." },
      { word: "verdict", definition: "decision made by a jury", sentence: "The _______ would determine Muff's fate." },
      { word: "justice", definition: "fair treatment according to law", sentence: "Tom wanted _______ for the innocent man." },
      { word: "courage", definition: "ability to face danger despite fear", sentence: "It took great _______ to testify against Injun Joe." },
      { word: "vindication", definition: "clearing someone of blame", sentence: "Muff Potter's _______ came through Tom's bravery." },
      { word: "treasure", definition: "valuable items, especially gold or jewels", sentence: "The boys dreamed of finding buried _______." },
      { word: "haunted", definition: "inhabited by ghosts", sentence: "The _______ house terrified most people." },
      { word: "discovery", definition: "the action of finding something", sentence: "Their _______ in the house changed everything." },
      { word: "concealed", definition: "kept secret or hidden", sentence: "Injun Joe had _______ the gold under the floor." },
      { word: "pursuit", definition: "the action of chasing", sentence: "The boys began their _______ of the treasure." },
      { word: "vigilant", definition: "keeping careful watch", sentence: "Huck remained _______ outside the tavern." },
      { word: "peril", definition: "serious and immediate danger", sentence: "Tom and Becky were in grave _______." },
      { word: "labyrinth", definition: "a complicated network of passages", sentence: "The cave was a dark _______." },
      { word: "desperate", definition: "feeling hopeless and in great need", sentence: "Tom grew _______ as their candles burned low." },
      { word: "anguish", definition: "severe mental or physical pain", sentence: "Aunt Polly felt terrible _______ thinking Tom was lost." }
    ],
    comprehension: [
      { question: "How has Tom changed from the beginning? Give 3 examples of his growth.", standard: "RL.6.3", type: "essay" },
      { question: "Analyze how Twain builds suspense in the cave scene. What techniques does he use?", standard: "RL.6.4", type: "essay" },
      { question: "What theme about courage emerges in the trial scene?", standard: "RL.6.2", type: "short" }
    ],
    journal: "We're nearing the end of Tom Sawyer. What has been your favorite part of the story?"
  }
);

// Add Days 16-20 (Week 4 - Finish Tom Sawyer)
unit1Lessons.push(
  {
    day: 16,
    title: "Lost in the Cave",
    type: "regular",
    chapters: "Chapters 31-32",
    chapterNumbers: [31, 32],
    focus: "Tom and Becky's survival and escape from McDougal's Cave",
    vocab: ["ordeal", "resourceful", "despair", "salvation", "perseverance"],
    comprehension: [
      { question: "How does Tom keep hope alive while lost in the cave? What does this show about him?", standard: "RL.6.3" },
      { question: "How does Twain's language create fear and suspense in the cave scenes?", standard: "RL.6.4" }
    ],
    journal: "Tom shows incredible courage and resourcefulness. What strengths would you rely on in a survival situation?"
  },
  {
    day: 17,
    title: "The Fate of Injun Joe",
    type: "regular",
    chapters: "Chapters 33-34",
    chapterNumbers: [33, 34],
    focus: "The villain's fate and the treasure's discovery",
    vocab: ["retribution", "fortune", "revelation", "sealed", "fate"],
    comprehension: [
      { question: "What happens to Injun Joe? How does Tom feel about this outcome?", standard: "RL.6.3" },
      { question: "How does finding the treasure resolve multiple story threads?", standard: "RL.6.5" }
    ],
    journal: "Justice is served, but Tom feels sympathy for Injun Joe. Can you feel sorry for a villain?"
  },
  {
    day: 18,
    title: "Riches and Respectability",
    type: "regular",
    chapters: "Chapter 35",
    chapterNumbers: [35],
    focus: "How wealth changes Tom and Huck's lives",
    vocab: ["prosperity", "civilized", "respectable", "restless", "confined"],
    comprehension: [
      { question: "How does becoming rich change Tom and Huck's lives? Do they both adapt the same way?", standard: "RL.6.3" },
      { question: "What does the ending suggest about Tom's future adventures?", standard: "RL.6.5" }
    ],
    journal: "If you suddenly became wealthy, how would your life change? What would stay the same?"
  },
  {
    day: 19,
    title: "Tom Sawyer Themes and Writing",
    type: "writing",
    chapters: "Full novel review",
    chapterNumbers: [],
    focus: "Begin personal narrative inspired by Tom Sawyer",
    vocab: ["narrative", "episodic", "characterization", "voice", "theme"],
    comprehension: [
      { question: "What is the most important theme in Tom Sawyer? Support with evidence.", standard: "RL.6.2" },
      { question: "How does the episodic structure affect your reading experience?", standard: "RL.6.5" }
    ],
    journal: "Start drafting your own adventure story in the style of Mark Twain. Outline your plot."
  },
  {
    day: 20,
    title: "Unit 1 Final Assessment",
    type: "assessment",
    chapters: "Complete novel review",
    focus: "Final comprehensive assessment of Tom Sawyer",
    vocabQuiz: [
      { word: "ordeal", definition: "a painful or difficult experience", sentence: "The cave was a terrible _______ for Tom and Becky." },
      { word: "resourceful", definition: "able to find clever ways to overcome difficulties", sentence: "Tom was _______ in finding a way out." },
      { word: "despair", definition: "complete loss of hope", sentence: "Becky fell into _______ when the candles went out." },
      { word: "salvation", definition: "deliverance from danger or difficulty", sentence: "Finding the exit was their _______." },
      { word: "perseverance", definition: "continued effort despite difficulty", sentence: "Tom's _______ saved their lives." },
      { word: "retribution", definition: "punishment for wrongdoing", sentence: "Injun Joe faced _______ for his crimes." },
      { word: "fortune", definition: "a large amount of money or assets", sentence: "The boys found a _______ in gold coins." },
      { word: "revelation", definition: "a surprising disclosure", sentence: "The treasure's location was a shocking _______." },
      { word: "sealed", definition: "closed or secured", sentence: "The cave was _______ to prevent more accidents." },
      { word: "fate", definition: "the development of events beyond control", sentence: "Injun Joe's _______ was sealed when the door closed." },
      { word: "prosperity", definition: "the state of being successful", sentence: "The boys now lived in _______." },
      { word: "civilized", definition: "brought to an advanced stage of social development", sentence: "Widow Douglas wanted to make Huck _______." },
      { word: "respectable", definition: "regarded as proper or correct", sentence: "They were now considered _______ citizens." },
      { word: "restless", definition: "unable to rest or relax", sentence: "Huck felt _______ in civilized clothes." },
      { word: "confined", definition: "restricted or limited", sentence: "Huck felt _______ by society's rules." },
      { word: "narrative", definition: "a spoken or written account of events", sentence: "Write a _______ about your own adventure." },
      { word: "episodic", definition: "made up of separate installments", sentence: "Tom Sawyer has an _______ structure." },
      { word: "characterization", definition: "the way an author creates characters", sentence: "Twain's _______ makes Tom feel real." },
      { word: "voice", definition: "the author's distinctive style", sentence: "Twain's humorous _______ is unmistakable." },
      { word: "theme", definition: "the central topic or message", sentence: "A major _______ is the tension between freedom and civilization." }
    ],
    comprehension: [
      { question: "ESSAY: Analyze Tom Sawyer's character development. How does he change from Chapter 1 to Chapter 35? Use specific evidence.", standard: "RL.6.3", type: "essay" },
      { question: "ESSAY: What is Mark Twain's message about childhood, freedom, and society? Support with evidence.", standard: "RL.6.2", type: "essay" },
      { question: "How does Twain use dialect and humor? Analyze with examples.", standard: "RL.6.4", type: "short" },
      { question: "Compare the whitewashing scene to the cave scene. How do both show Tom's cleverness?", standard: "RL.6.3", type: "short" }
    ],
    journal: "Final reflection: What did Tom Sawyer teach you about courage, friendship, and growing up?"
  }
);

// Build all lessons
const numToBuild = process.argv[2] ? parseInt(process.argv[2]) : 10;
console.log(`Building 6th Grade lessons 1-${numToBuild}...\n`);

unit1Lessons.slice(0, numToBuild).forEach(lesson => {
  const html = buildLesson(lesson);
  const filename = `6th-grade-day-${lesson.day}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Day ${lesson.day}: ${lesson.title}`);
});

console.log(`\n🎉 ${numToBuild} lessons complete!`);
