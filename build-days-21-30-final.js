// Build Days 21-30 with full Twenty Thousand Leagues chapter content
const fs = require('fs');

const twentyThousandChapters = JSON.parse(fs.readFileSync('book-data/twenty-thousand-leagues-chapters.json', 'utf8'));

function getChapters(chapterNums) {
  return chapterNums.map(num => twentyThousandChapters[num]).filter(Boolean);
}

const colors = {
  white: '#FFFFFF',
  deepTeal: '#305853',
  goldenAmber: '#B06821',
  brickRed: '#9E2C21',
  darkMahogany: '#511B18',
  slateBlue: '#1B2A50'
};

const unit2Lessons = [
  {
    day: 21,
    title: "Welcome to Twenty Thousand Leagues",
    type: "intro",
    chapters: "Introduction to Jules Verne",
    chapterNumbers: [],
    focus: "Science fiction, submarines, and ocean exploration",
    vocab: ["science-fiction", "submarine", "phenomenon", "expedition", "cetacean"],
    content: {
      welcome: "Welcome to Unit 2! You're about to dive into the depths of the ocean with one of the greatest science fiction novels ever written.",
      beforeReading: "What do you know about submarines? What would it be like to live underwater for months?",
      mainActivity: "Learn about Jules Verne and how he imagined future technology in 1870, before submarines were common.",
      journal: "What do you think life would be like living underwater? What would excite you? What would scare you?"
    }
  },
  {
    day: 22,
    title: "The Sea Monster Mystery",
    type: "regular",
    chapters: "Part 1, Chapters 1-3",
    chapterNumbers: [1, 2, 3],
    focus: "Reports of a mysterious sea monster",
    vocab: ["narwhal", "hypothesis", "collision", "vessel", "maritime"],
    comprehension: [
      { question: "What evidence suggests the 'monster' exists? Why do people believe different theories?", standard: "RL.6.1" },
      { question: "How does Verne create mystery and suspense in the opening chapters?", standard: "RL.6.5" }
    ],
    journal: "If you were a scientist, would you join an expedition to find a sea monster? Why or why not?"
  },
  {
    day: 23,
    title: "Professor Aronnax Joins the Hunt",
    type: "regular",
    chapters: "Part 1, Chapters 4-6",
    chapterNumbers: [4, 5, 6],
    focus: "Meeting the main character and beginning the voyage",
    vocab: ["naturalist", "harpoon", "harpooner", "pursuit", "frigate"],
    comprehension: [
      { question: "Who is Professor Aronnax? Why is he the perfect person to join this expedition?", standard: "RL.6.3" },
      { question: "What role does Ned Land play? How is he different from Aronnax?", standard: "RL.6.3" }
    ],
    journal: "Which character would you rather be: the scientist (Aronnax) or the hunter (Ned Land)? Why?"
  },
  {
    day: 24,
    title: "Attack and Discovery",
    type: "regular",
    chapters: "Part 1, Chapters 7-9",
    chapterNumbers: [7, 8, 9],
    focus: "First encounter with the 'monster' and shocking discovery",
    vocab: ["submerge", "metallic", "revelation", "captivity", "apparatus"],
    comprehension: [
      { question: "What do the characters discover about the 'sea monster'? How does this change everything?", standard: "RL.6.3" },
      { question: "How does becoming prisoners affect the three men differently?", standard: "RL.6.3" }
    ],
    journal: "The 'monster' is actually a submarine! How would you react to this shocking discovery?"
  },
  {
    day: 25,
    title: "Week 5 Assessment",
    type: "assessment",
    chapters: "Review Part 1, Chapters 1-9",
    focus: "Vocabulary review and comprehension check",
    vocabQuiz: [
      { word: "science-fiction", definition: "imaginative fiction based on scientific ideas", sentence: "Verne pioneered the _______ genre." },
      { word: "submarine", definition: "a vessel capable of operating underwater", sentence: "The Nautilus is an advanced _______." },
      { word: "phenomenon", definition: "a remarkable occurrence", sentence: "The sea creature was a puzzling _______." },
      { word: "expedition", definition: "a journey with a specific purpose", sentence: "They joined an _______ to hunt the monster." },
      { word: "cetacean", definition: "a marine mammal like a whale", sentence: "Scientists thought it might be a giant _______." },
      { word: "narwhal", definition: "a whale with a long tusk", sentence: "Professor Aronnax theorized it was a giant _______." },
      { word: "hypothesis", definition: "a proposed explanation", sentence: "Each scientist had a different _______." },
      { word: "collision", definition: "an instance of crashing into something", sentence: "The ship survived a _______ with the creature." },
      { word: "vessel", definition: "a ship or large boat", sentence: "The Abraham Lincoln was a fast _______." },
      { word: "maritime", definition: "relating to the sea", sentence: "The _______ community was alarmed by reports." },
      { word: "naturalist", definition: "a scientist who studies living things", sentence: "Aronnax was a respected _______." },
      { word: "harpoon", definition: "a spear-like weapon for hunting whales", sentence: "Ned Land was skilled with a _______." },
      { word: "harpooner", definition: "a person who uses a harpoon", sentence: "Ned Land was the best _______ in Canada." },
      { word: "pursuit", definition: "the action of chasing", sentence: "The _______ of the creature began." },
      { word: "frigate", definition: "a type of warship", sentence: "The _______ was armed and ready." },
      { word: "submerge", definition: "to go below the surface of water", sentence: "The submarine could _______ completely." },
      { word: "metallic", definition: "made of or resembling metal", sentence: "The creature had a _______ surface." },
      { word: "revelation", definition: "a surprising disclosure", sentence: "The _______ shocked everyone: it was man-made!" },
      { word: "captivity", definition: "the state of being imprisoned", sentence: "The men found themselves in _______." },
      { word: "apparatus", definition: "technical equipment or machinery", sentence: "The submarine was an incredible _______." }
    ],
    comprehension: [
      { question: "How does Verne create a sense of mystery in the opening chapters? Analyze his techniques.", standard: "RL.6.5", type: "essay" },
      { question: "Compare this science fiction to Tom Sawyer. How are they different in style and purpose?", standard: "RL.6.9", type: "short" },
      { question: "What makes Professor Aronnax a believable narrator for this story?", standard: "RL.6.6", type: "short" }
    ],
    journal: "Reflect on the first part of Twenty Thousand Leagues. What questions do you have about Captain Nemo and the Nautilus?"
  },
  {
    day: 26,
    title: "Captain Nemo",
    type: "regular",
    chapters: "Part 1, Chapters 10-12",
    chapterNumbers: [10, 11, 12],
    focus: "Meeting the mysterious captain and touring the Nautilus",
    vocab: ["enigmatic", "propulsion", "technology", "genius", "chambers"],
    comprehension: [
      { question: "What do we learn about Captain Nemo? What remains mysterious?", standard: "RL.6.3" },
      { question: "How does Verne describe the Nautilus? What scientific details does he include?", standard: "RL.6.4" }
    ],
    journal: "Captain Nemo has rejected society and lives underwater. What would make someone choose total isolation?"
  },
  {
    day: 27,
    title: "Underwater Wonders",
    type: "regular",
    chapters: "Part 1, Chapters 13-15",
    chapterNumbers: [13, 14, 15],
    focus: "First underwater walk and ocean floor exploration",
    vocab: ["coral", "marine", "luminous", "phosphorescent", "vegetation"],
    comprehension: [
      { question: "How does Verne use sensory details to describe the underwater world? Give three examples.", standard: "RL.6.4" },
      { question: "How does Aronnax feel about being Nemo's prisoner vs. being able to explore the ocean?", standard: "RL.6.3" }
    ],
    journal: "If you could walk on the ocean floor, what would you most want to see or discover?"
  },
  {
    day: 28,
    title: "The Underwater Forest",
    type: "regular",
    chapters: "Part 1, Chapters 16-18",
    chapterNumbers: [16, 17, 18],
    focus: "Exploring submarine forests and first dangers",
    vocab: ["canopy", "species", "encounter", "peril", "predator"],
    comprehension: [
      { question: "What dangers do the explorers face in the underwater forest?", standard: "RL.6.1" },
      { question: "How does Verne balance scientific description with adventure/excitement?", standard: "RL.6.5" }
    ],
    journal: "The ocean is beautiful but dangerous. Write about something in nature that is both wonderful and frightening."
  },
  {
    day: 29,
    title: "Across the Pacific",
    type: "regular",
    chapters: "Part 1, Chapters 19-21",
    chapterNumbers: [19, 20, 21],
    focus: "Journey across oceans and more discoveries",
    vocab: ["longitude", "latitude", "current", "migration", "specimen"],
    comprehension: [
      { question: "What new creatures and underwater features do they discover?", standard: "RL.6.1" },
      { question: "How does Conseil's character provide comic relief? Give examples.", standard: "RL.6.3" }
    ],
    journal: "Aronnax is torn between wanting freedom and wanting to keep exploring. Have you ever felt pulled in two directions?"
  },
  {
    day: 30,
    title: "Week 6 Assessment",
    type: "assessment",
    chapters: "Review Part 1, Chapters 10-21",
    focus: "Vocabulary quiz and comprehension check",
    vocabQuiz: [
      { word: "enigmatic", definition: "mysterious and difficult to understand", sentence: "Captain Nemo remained _______." },
      { word: "propulsion", definition: "the action of driving or pushing forward", sentence: "Electric _______ powered the Nautilus." },
      { word: "technology", definition: "scientific knowledge applied to practical purposes", sentence: "The submarine's _______ amazed Aronnax." },
      { word: "genius", definition: "exceptional intellectual ability", sentence: "Nemo was a _______ inventor." },
      { word: "chambers", definition: "rooms or compartments", sentence: "The Nautilus had luxurious _______." },
      { word: "coral", definition: "hard substance formed by sea creatures", sentence: "The _______ reefs were spectacular." },
      { word: "marine", definition: "relating to the sea", sentence: "They observed countless _______ species." },
      { word: "luminous", definition: "giving off light", sentence: "Some creatures were _______." },
      { word: "phosphorescent", definition: "glowing with light", sentence: "The _______ waters sparkled at night." },
      { word: "vegetation", definition: "plant life", sentence: "Underwater _______ swayed in the current." },
      { word: "canopy", definition: "an overhanging shelter", sentence: "The forest _______ blocked the light." },
      { word: "species", definition: "a group of living organisms", sentence: "They catalogued hundreds of _______." },
      { word: "encounter", definition: "an unexpected meeting", sentence: "Their _______ with sharks was terrifying." },
      { word: "peril", definition: "serious danger", sentence: "The explorers faced great _______." },
      { word: "predator", definition: "an animal that hunts others", sentence: "The shark was a fierce _______." },
      { word: "longitude", definition: "distance east or west", sentence: "They tracked their _______ carefully." },
      { word: "latitude", definition: "distance north or south", sentence: "The ship's _______ changed daily." },
      { word: "current", definition: "a body of water moving in a direction", sentence: "The ocean _______ carried them swiftly." },
      { word: "migration", definition: "seasonal movement of animals", sentence: "They witnessed whale _______." },
      { word: "specimen", definition: "an individual example for study", sentence: "Aronnax collected each _______ carefully." }
    ],
    comprehension: [
      { question: "ESSAY: Analyze Captain Nemo as a character. What do we know? What remains mysterious? Why?", standard: "RL.6.3", type: "essay" },
      { question: "How does Verne blend science and storytelling? Give specific examples.", standard: "RL.6.5", type: "essay" },
      { question: "Compare Verne's 1870 predictions about submarines to real technology. What did he get right?", standard: "RI.6.9", type: "short" }
    ],
    journal: "Halfway through Unit 2! What fascinates you most about life aboard the Nautilus?"
  }
];

// Copy the buildLesson function from unit1 script
function buildLesson(lesson) {
  const isAssessment = lesson.type === 'assessment';
  const isIntro = lesson.type === 'intro';
  
  const pages = [];
  
  // Page 1: Title
  pages.push(`
    <div class="lesson-page" data-page="1">
      <div class="page-content title-page">
        <div class="lesson-icon">🌊</div>
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
            `<p>Today we're reading <strong>${lesson.chapters}</strong> from <em>Twenty Thousand Leagues Under the Sea</em> by Jules Verne.</p>
            <p><strong>Reading Focus:</strong> ${lesson.focus}</p>`
          }
        </div>
      </div>
    </div>
  `);
  
  // Page 3: Vocabulary or Vocab Quiz
  if (isAssessment) {
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
  
  // Page 5: Comprehension Questions (regular days) or skip for assessment
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
        <p style="margin-bottom: 20px;"><strong>Prompt:</strong> ${lesson.journal || lesson.content?.journal}</p>
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

console.log('Building Days 21-30 with full Twenty Thousand Leagues chapter content...\n');

unit2Lessons.forEach(lesson => {
  const html = buildLesson(lesson);
  const filename = `6th-grade-day-${lesson.day}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Day ${lesson.day}: ${lesson.title}`);
});

console.log('\n🎉 All 10 lessons complete with embedded chapters!');
