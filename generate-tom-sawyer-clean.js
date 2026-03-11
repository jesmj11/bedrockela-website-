const fs = require('fs');

console.log('📚 Generating 6th Grade Tom Sawyer - Clean Structure\n');

// Load Tom Sawyer chapters from JSON
const chapters = JSON.parse(fs.readFileSync('./book-data/tom-sawyer-chapters.json', 'utf8'));

console.log(`📖 Loaded ${chapters.length} chapters\n`);

// Vocabulary for each day (Days 1-20, skip assessments 5, 10, 15, 20)
const vocab = {
  1: [
    { word: 'mischief', definition: 'playful misbehavior or troublemaking' },
    { word: 'whitewash', definition: 'white paint used on walls and fences' }
  ],
  2: [
    { word: 'dilapidated', definition: 'falling apart or in poor condition' },
    { word: 'profound', definition: 'very deep or intense' }
  ],
  3: [
    { word: 'admiration', definition: 'respect and approval' },
    { word: 'devoted', definition: 'very loyal or loving' }
  ],
  4: [
    { word: 'spectacle', definition: 'an impressive or dramatic display' },
    { word: 'rival', definition: 'a competitor or opponent' }
  ],
  6: [
    { word: 'solemn', definition: 'serious and dignified' },
    { word: 'melancholy', definition: 'deep sadness' }
  ],
  7: [
    { word: 'oath', definition: 'a serious promise' },
    { word: 'conscience', definition: 'inner sense of right and wrong' }
  ],
  8: [
    { word: 'rendezvous', definition: 'a planned meeting place' },
    { word: 'comrade', definition: 'a close friend or companion' }
  ],
  9: [
    { word: 'triumphant', definition: 'victorious and celebrating' },
    { word: 'spectacle', definition: 'a dramatic or impressive scene' }
  ],
  11: [
    { word: 'jealousy', definition: 'feeling envious of someone' },
    { word: 'noble', definition: 'having high moral character' }
  ],
  12: [
    { word: 'testimony', definition: 'evidence or proof given in court' },
    { word: 'verdict', definition: 'a judgment or decision' }
  ],
  13: [
    { word: 'treasure', definition: 'valuable items like gold or jewels' },
    { word: 'haunted', definition: 'inhabited by ghosts' }
  ],
  14: [
    { word: 'labyrinth', definition: 'a complex maze' },
    { word: 'desperate', definition: 'feeling hopeless or in great need' }
  ],
  16: [
    { word: 'narrative', definition: 'a story or account of events' },
    { word: 'perspective', definition: 'a particular point of view' }
  ],
  17: [
    { word: 'description', definition: 'a detailed account of something' },
    { word: 'sensory', definition: 'relating to the senses' }
  ],
  18: [
    { word: 'revise', definition: 'to review and improve' },
    { word: 'coherence', definition: 'logical and consistent connection' }
  ],
  19: [
    { word: 'publish', definition: 'to make available to the public' },
    { word: 'reflection', definition: 'serious thought or consideration' }
  ]
};

// Grammar lessons (Days 1-19, skip assessments)
const grammar = {
  1: {
    topic: 'Simple, Compound, and Complex Sentences',
    explanation: 'A **simple sentence** has one independent clause. A **compound sentence** joins two independent clauses with a coordinating conjunction (and, but, or, so). A **complex sentence** has an independent clause and a dependent clause.',
    examples: [
      'Tom painted the fence. (simple)',
      'Tom painted the fence, and Ben watched. (compound)',
      'Tom painted the fence because Aunt Polly told him to. (complex)'
    ],
    practice: [
      { prompt: 'Identify the sentence type: "Tom was clever, so he tricked his friends."' },
      { prompt: 'Write a complex sentence about Tom using "although".' },
      { prompt: 'Combine these simple sentences into a compound sentence: "Tom ran. Sid tattled."' }
    ]
  },
  // Add more as needed
};

// Informational texts
const infoTexts = {
  1: {
    title: 'Mark Twain: America\'s Greatest Humorist',
    content: `Mark Twain, born Samuel Clemens in 1835, grew up in Hannibal, Missouri—a small town on the Mississippi River that would inspire his most famous stories. As a boy, Sam loved swimming, fishing, and exploring caves with his friends, just like Tom Sawyer.

Twain didn't have an easy childhood. His father died when he was 11, forcing him to leave school and work as a printer's apprentice. Later, he became a riverboat pilot on the Mississippi, where he got his pen name "Mark Twain"—a riverboat term meaning the water is two fathoms (12 feet) deep, safe for navigation.

After the Civil War ended riverboat traffic, Twain moved west and became a journalist. His humorous stories and sharp observations about human nature made him famous. In 1876, he published "The Adventures of Tom Sawyer," drawing on his own boyhood experiences.

Twain used humor to address serious topics like slavery, greed, and hypocrisy. His writing style was revolutionary—he wrote how people actually talked, using dialects and slang instead of formal literary language. This made his characters feel real and his stories accessible to everyone, not just educated readers.

"Tom Sawyer" wasn't just entertainment. Through Tom's adventures, Twain captured what it meant to be a child in 19th century America—the freedom, the mischief, the friendship, and the moral challenges. The book explores themes of growing up, taking responsibility, and finding courage.

Today, over 145 years later, Tom Sawyer remains one of the most beloved characters in American literature. Mark Twain's influence on American writing cannot be overstated—he helped create a uniquely American voice in literature.`
  }
};

function generateDay(day) {
  const chapter = chapters[day.toString()];
  if (!chapter) return null;
  
  const dayVocab = vocab[day] || [
    { word: 'word1', definition: 'definition 1' },
    { word: 'word2', definition: 'definition 2' }
  ];
  
  const dayGrammar = grammar[day] || grammar[1];
  const dayInfo = infoTexts[day] || infoTexts[1];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} - 6th Grade BedrockELA</title>
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
            lessonId: '6th-grade-day-${day}',
            gradeLevel: '6th-grade',
            title: 'Day ${day} - The Adventures of Tom Sawyer',
            pages: [
    {
        "type": "title",
        "content": \`
                    <h1>Day ${day}</h1>
                    <h2>The Adventures of Tom Sawyer</h2>
                    <p class="unit-label">6th Grade • Week ${Math.ceil(day/5)}</p>
                    <p class="chapter-info">${chapter.title}</p>
                \`
    },
    {
        "type": "content",
        "content": \`
                    <h2>📚 Welcome to Day ${day}!</h2>
                    <div class="objectives-box">
                        <h3>Today's Learning Goals:</h3>
                        <ul>
                            <li>Learn 2 new vocabulary words</li>
                            <li>Read ${chapter.title} of Tom Sawyer</li>
                            <li>Practice ${dayGrammar.topic}</li>
                            <li>Explore informational text</li>
                            <li>Complete a writing exercise</li>
                        </ul>
                        <p><strong>Estimated time:</strong> 45-60 minutes</p>
                    </div>
                \`
    },
    {
        "type": "vocabulary",
        "content": \`
                    <h2>📖 Vocabulary</h2>
                    <p>Learn these 2 words before reading today's chapter:</p>
                    
                    <div class="vocab-word-card">
                        <h3>1. ${dayVocab[0].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${dayVocab[0].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-1" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                    
                    <div class="vocab-word-card">
                        <h3>2. ${dayVocab[1].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${dayVocab[1].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-2" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                \`
    },
    {
        "type": "activity",
        "content": \`
                    <h2>🎮 Vocabulary Practice</h2>
                    <p>Use these words in sentences to show you understand their meaning.</p>
                    <div class="vocab-game-placeholder">
                        <p><strong>${dayVocab[0].word}</strong> - ${dayVocab[0].definition}</p>
                        <textarea id="vocab-sentence-1" rows="3" placeholder="Write a sentence using '${dayVocab[0].word}'..."></textarea>
                        
                        <p style="margin-top: 20px;"><strong>${dayVocab[1].word}</strong> - ${dayVocab[1].definition}</p>
                        <textarea id="vocab-sentence-2" rows="3" placeholder="Write a sentence using '${dayVocab[1].word}'..."></textarea>
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${chapter.title}</h2>
                    <div class="story-content">
                        ${chapter.text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0).join('<br><br><br><br>')}
                    </div>
                \`
    },
    {
        "type": "comprehension",
        "content": \`
                    <h2>💭 Comprehension Check</h2>
                    <p>Think about what you just read:</p>
                    
                    <div class="question-card">
                        <p><strong>1.</strong> What were the most important events in this chapter?</p>
                        <textarea id="comp-${day}-1" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>2.</strong> How does Tom's character develop in this chapter?</p>
                        <textarea id="comp-${day}-2" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>3.</strong> What challenges or conflicts did Tom face?</p>
                        <textarea id="comp-${day}-3" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                \`
    },
    {
        "type": "grammar-language",
        "content": \`
                    <h2>✏️ ${dayGrammar.topic}</h2>
                    <div class="skill-explanation">
                        <p>${dayGrammar.explanation}</p>
                    </div>
                    
                    <h3>Examples:</h3>
                    <ul>
                        ${dayGrammar.examples.map(ex => '<li>' + ex + '</li>').join('')}
                    </ul>
                    
                    <h3>Practice:</h3>
                    ${dayGrammar.practice.map((p, i) => 
                        '<div class="exercise-card">' +
                            '<p><strong>' + (i + 1) + '.</strong> ' + p.prompt + '</p>' +
                            '<textarea id="grammar-' + day + '-' + (i + 1) + '" rows="6" placeholder="Your answer..."></textarea>' +
                        '</div>'
                    ).join('')}
                \`
    },
    {
        "type": "informational",
        "content": \`
                    <h2>🌍 Informational Text: ${dayInfo.title}</h2>
                    <div class="informational-article">
                        ${dayInfo.content.split('\n\n').map(p => '<p>' + p + '</p>').join('')}
                    </div>
                    
                    <h3>Discussion Questions:</h3>
                    <div class="question-card">
                        <p><strong>1.</strong> What did you learn about Mark Twain or his time period?</p>
                        <textarea id="info-${day}-1" rows="6" placeholder="Your answer..."></textarea>
                    </div>
                    <div class="question-card">
                        <p><strong>2.</strong> How does this information help you understand Tom Sawyer better?</p>
                        <textarea id="info-${day}-2" rows="6" placeholder="Your answer..."></textarea>
                    </div>
                \`
    },
    {
        "type": "writing",
        "content": \`
                    <h2>✍️ Writing Practice</h2>
                    <p>Write a paragraph about today's chapter. Use both vocabulary words and apply the grammar concept you learned.</p>
                    <div class="writing-prompt">
                        <textarea id="writing-${day}" rows="12" placeholder="Your paragraph..."></textarea>
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

// Generate Days 1-4 (Week 1, before first assessment)
console.log('🔨 Generating Tom Sawyer lessons...\n');

for (let day = 1; day <= 4; day++) {
  const html = generateDay(day);
  if (html) {
    fs.writeFileSync(`6th-grade-day-${day}.html`, html);
    console.log(`✅ Created 6th-grade-day-${day}.html`);
  }
}

console.log('\n🎉 Clean 6th grade lessons generated!');
console.log('   - 9 pages per lesson (was 17!)');
console.log('   - Story on ONE page (was 4!)');
console.log('   - 2 vocabulary words (was 4!)');
console.log('   - Matches 8th grade structure');
