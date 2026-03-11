const fs = require('fs');

console.log('📚 Generating 6th Grade Tom Sawyer - 5th Grade Spine Structure\n');

// Load Tom Sawyer chapters
const chapters = JSON.parse(fs.readFileSync('./book-data/tom-sawyer-chapters.json', 'utf8'));
console.log(`📖 Loaded ${Object.keys(chapters).length} chapters\n`);

// Vocabulary: 3 words per day (like 5th grade)
const vocab = {
  1: [
    { word: 'mischief', definition: 'playful misbehavior or troublemaking' },
    { word: 'whitewash', definition: 'white paint used on walls and fences' },
    { word: 'triumph', definition: 'a great victory or achievement' }
  ],
  2: [
    { word: 'dilapidated', definition: 'falling apart or in poor condition' },
    { word: 'profound', definition: 'very deep or intense' },
    { word: 'melancholy', definition: 'a feeling of deep sadness' }
  ],
  3: [
    { word: 'admiration', definition: 'respect and approval' },
    { word: 'devoted', definition: 'very loyal or loving' },
    { word: 'enchanted', definition: 'filled with delight; charmed' }
  ],
  4: [
    { word: 'spectacle', definition: 'an impressive or dramatic display' },
    { word: 'rival', definition: 'a competitor or opponent' },
    { word: 'contest', definition: 'a competition or struggle for victory' }
  ]
};

// Grammar lessons (odd days 1, 3, etc.)
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
      { prompt: 'Identify the sentence type: "Tom was clever, so he tricked his friends."', answer: 'compound' },
      { prompt: 'Write a complex sentence about Tom using "although"', answer: 'varies' },
      { prompt: 'Combine into compound: "Tom ran. Sid tattled."', answer: 'Tom ran, and Sid tattled.' }
    ]
  },
  3: {
    topic: 'Active and Passive Voice',
    explanation: 'In **active voice**, the subject performs the action. In **passive voice**, the subject receives the action. Active voice is usually clearer and stronger.',
    examples: [
      'Tom painted the fence. (active)',
      'The fence was painted by Tom. (passive)',
      'Aunt Polly punished Tom. (active)'
    ],
    practice: [
      { prompt: 'Change to passive: "Tom tricked Ben."', answer: 'Ben was tricked by Tom.' },
      { prompt: 'Change to active: "The fence was whitewashed by the boys."', answer: 'The boys whitewashed the fence.' },
      { prompt: 'Why is active voice usually better for storytelling?', answer: 'varies' }
    ]
  }
};

// Language lessons (even days 2, 4, etc.)
const language = {
  2: {
    topic: 'Context Clues',
    explanation: 'Context clues are hints in surrounding words or sentences that help you figure out the meaning of unfamiliar words. Look for: definitions, examples, synonyms, antonyms, or general sense.',
    examples: [
      'The dilapidated fence, with its peeling paint and broken boards, needed repair. (definition)',
      'Tom felt melancholy—sad and gloomy—about his punishment. (synonym)',
      'Unlike his cheerful friends, Tom was melancholy. (antonym)'
    ],
    practice: [
      { prompt: 'Use context clues: "Tom\'s profound sadness was so deep he could barely speak."', answer: 'profound means very deep' },
      { prompt: 'What context clue type is used: "The boys, including Ben and Billy, came to watch."', answer: 'example' },
      { prompt: 'Write a sentence using context clues to define "triumphant"', answer: 'varies' }
    ]
  },
  4: {
    topic: 'Connotation and Denotation',
    explanation: '**Denotation** is a word\'s dictionary definition. **Connotation** is the feeling or association a word carries (positive, negative, or neutral).',
    examples: [
      'Childish vs. Youthful (both mean young, but childish is negative, youthful is positive)',
      'Stubborn vs. Determined (both mean unwilling to change, different feelings)',
      'Clever vs. Sneaky (both mean smart, but sneaky implies dishonesty)'
    ],
    practice: [
      { prompt: 'What\'s the connotation of "mischief" in Tom Sawyer?', answer: 'playful, not seriously bad' },
      { prompt: 'Replace with positive connotation: "Tom was lazy about work."', answer: 'Tom was relaxed about work.' },
      { prompt: 'Why does Twain call Tom "clever" instead of "sneaky"?', answer: 'varies' }
    ]
  }
};

// Informational texts
const infoTexts = {
  1: {
    title: 'Mark Twain: America\'s Greatest Humorist',
    content: `Mark Twain, born Samuel Clemens in 1835, grew up in Hannibal, Missouri—a small town on the Mississippi River that would inspire his most famous stories. As a boy, Sam loved swimming, fishing, and exploring caves with his friends, just like Tom Sawyer.

Twain didn't have an easy childhood. His father died when he was 11, forcing him to leave school and work as a printer's apprentice. Later, he became a riverboat pilot on the Mississippi, where he got his pen name "Mark Twain"—a riverboat term meaning the water is two fathoms (12 feet) deep, safe for navigation.

After the Civil War ended riverboat traffic, Twain moved west and became a journalist. His humorous stories and sharp observations about human nature made him famous. In 1876, he published "The Adventures of Tom Sawyer," drawing on his own boyhood experiences.

Twain used humor to address serious topics like slavery, greed, and hypocrisy. His writing style was revolutionary—he wrote how people actually talked, using dialects and slang instead of formal literary language. This made his characters feel real and his stories accessible to everyone, not just educated readers.`,
    questions: [
      { question: 'How did Samuel Clemens get the pen name "Mark Twain"?', answer: 'From riverboat terminology meaning safe water depth' },
      { question: 'What made Twain\'s writing style revolutionary?', answer: 'He used realistic dialogue and dialects instead of formal language' },
      { question: 'How did Twain\'s childhood influence Tom Sawyer?', answer: 'He drew on his own boyhood experiences in Hannibal' }
    ]
  },
  2: {
    title: 'Life in 1840s Missouri',
    content: `When Tom Sawyer was written in 1876, Mark Twain set the story about 40 years earlier—in the 1840s, when he was a boy. Life in small-town Missouri was very different from today.

Most families lived in simple wooden houses. There was no electricity, no running water, and no indoor bathrooms. People used oil lamps for light, drew water from wells or pumps, and had outhouses in their yards. In summer, homes were hot; in winter, they were cold despite wood-burning stoves.

Children had responsibilities adults today would find shocking. By age 10, boys like Tom were expected to do serious chores: chopping wood, hauling water, tending animals, and helping with farm work. Girls cooked, sewed, cleaned, and cared for younger siblings. School was often interrupted by harvest season or bad weather.

The Mississippi River was the highway of its time. Steamboats carried passengers and cargo up and down the river. Boys dreamed of becoming riverboat pilots—it was one of the most respected, highest-paid jobs available. The river was also dangerous; drownings were common, and no one knew how to swim properly.`,
    questions: [
      { question: 'Why was whitewashing a fence such hard work in the 1840s?', answer: 'No modern tools, had to mix paint and do everything by hand' },
      { question: 'Why did boys like Tom dream of becoming riverboat pilots?', answer: 'It was respected and high-paying' },
      { question: 'How was childhood different in the 1840s?', answer: 'Children had serious responsibilities and chores from young age' }
    ]
  }
};

function generateRegularDay(day) {
  const chapter = chapters[day.toString()];
  if (!chapter) return null;
  
  const dayVocab = vocab[day] || vocab[1];
  const isOdd = day % 2 === 1;
  const skillContent = isOdd ? grammar[day] || grammar[1] : language[day] || language[2];
  const dayInfo = infoTexts[day] || infoTexts[1];
  
  // Split chapter into 3 parts
  const paragraphs = chapter.text.split('\n\n').filter(p => p.trim().length > 0);
  const third = Math.ceil(paragraphs.length / 3);
  const part1 = paragraphs.slice(0, third).join('\n\n');
  const part2 = paragraphs.slice(third, third * 2).join('\n\n');
  const part3 = paragraphs.slice(third * 2).join('\n\n');
  
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
                            <li>Learn 3 new vocabulary words</li>
                            <li>Read ${chapter.title} of Tom Sawyer</li>
                            <li>Practice ${skillContent.topic}</li>
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
                    <p>Learn these 3 words before reading today's chapter:</p>
                    
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
                    
                    <div class="vocab-word-card">
                        <h3>3. ${dayVocab[2].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${dayVocab[2].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-3" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                \`
    },
    {
        "type": "activity",
        "content": \`
                    <h2>🎮 Vocabulary Practice</h2>
                    <p>Match each word to its definition!</p>
                    <div class="vocab-game-placeholder">
                        <p><strong>${dayVocab[0].word}:</strong> ${dayVocab[0].definition}</p>
                        <p><strong>${dayVocab[1].word}:</strong> ${dayVocab[1].definition}</p>
                        <p><strong>${dayVocab[2].word}:</strong> ${dayVocab[2].definition}</p>
                        <p style="margin-top: 20px;"><em>Interactive matching game will be added here!</em></p>
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${chapter.title} - Part 1</h2>
                    <div class="story-content">
                        ${part1.split('\n\n').map(p => p.trim()).join('<br><br><br><br>')}
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${chapter.title} - Part 2</h2>
                    <div class="story-content">
                        ${part2.split('\n\n').map(p => p.trim()).join('<br><br><br><br>')}
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${chapter.title} - Part 3</h2>
                    <div class="story-content">
                        ${part3.split('\n\n').map(p => p.trim()).join('<br><br><br><br>')}
                    </div>
                \`
    },
    {
        "type": "comprehension",
        "content": \`
                    <h2>💭 Reading Comprehension</h2>
                    <p>Answer these questions about what you just read:</p>
                    
                    <div class="question-card">
                        <p><strong>1.</strong> What were the most important events in this chapter?</p>
                        <textarea id="comp-${day}-1" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>2.</strong> How does Tom's character develop in this chapter?</p>
                        <textarea id="comp-${day}-2" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                    
                    <div class="question-card">
                        <p><strong>3.</strong> What challenges or conflicts did the characters face?</p>
                        <textarea id="comp-${day}-3" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                \`
    },
    {
        "type": "grammar-language",
        "content": \`
                    <h2>✏️ ${skillContent.topic}</h2>
                    <div class="skill-explanation">
                        <p>${skillContent.explanation}</p>
                    </div>
                    
                    <h3>Examples:</h3>
                    <ul>
                        ${skillContent.examples.map(ex => '<li>' + ex + '</li>').join('')}
                    </ul>
                    
                    <h3>Practice:</h3>
                    ${skillContent.practice.map((p, i) =>
                        '<div class="exercise-card">' +
                            '<p><strong>' + (i + 1) + '.</strong> ' + p.prompt + '</p>' +
                            '<textarea id="skill-' + day + '-' + (i + 1) + '" rows="6" placeholder="Your answer..."></textarea>' +
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
                    ${dayInfo.questions.map((q, i) =>
                        '<div class="question-card">' +
                            '<p><strong>' + (i + 1) + '.</strong> ' + q.question + '</p>' +
                            '<textarea id="info-' + day + '-' + (i + 1) + '" rows="6" placeholder="Your answer..."></textarea>' +
                        '</div>'
                    ).join('')}
                \`
    },
    {
        "type": "writing",
        "content": \`
                    <h2>✍️ ${isOdd ? 'Writing Practice' : 'Journal Response'}</h2>
                    <p>${isOdd ? 
                        'Write a paragraph about today\'s chapter. Use all three vocabulary words and apply the grammar concept you learned.' :
                        'Reflect on today\'s reading. How would you feel if you were in Tom\'s situation? What would you do differently?'
                    }</p>
                    <div class="writing-prompt">
                        <textarea id="writing-${day}" rows="15" placeholder="Your ${isOdd ? 'paragraph' : 'journal entry'}..."></textarea>
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
console.log('🔨 Generating 6th grade lessons with 5th grade spine...\n');

for (let day = 1; day <= 4; day++) {
  const html = generateRegularDay(day);
  if (html) {
    fs.writeFileSync(`6th-grade-day-${day}.html`, html);
    console.log(`✅ Created 6th-grade-day-${day}.html`);
  }
}

console.log('\n🎉 6th grade lessons generated with 5th grade spine!');
console.log('   - 11 pages per lesson (matches 5th grade)');
console.log('   - 3 vocabulary words (not 2)');
console.log('   - Story split into 3 parts (not 1)');
console.log('   - Grammar/Language alternating odd/even');
console.log('   - Informational text with 3 questions');
console.log('   - Writing/Journal alternating');
