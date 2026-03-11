const fs = require('fs');

console.log('📚 Generating 4th Grade Wizard of Oz - Bedrock Spine\n');

// Load chapters
const chapters = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-4th-chapters.json', 'utf8'));

// Load vocab (2 words per day for 4th grade)
const vocabText = fs.readFileSync('./book-data/wizard-of-oz-vocabulary.txt', 'utf8');
const vocabByChapter = {};
const vocabChapterRegex = /Chapter (\d+):[^\n]+\n\n([^]+?)(?=\nChapter \d+:|$)/g;
let vocabMatch;
while ((vocabMatch = vocabChapterRegex.exec(vocabText)) !== null) {
  const chapterNum = parseInt(vocabMatch[1]);
  const content = vocabMatch[2].trim();
  const wordRegex = /^(\w+)\s+\(([^)]+)\)\n\n([^\n]+)/gm;
  const words = [];
  let wordMatch;
  while ((wordMatch = wordRegex.exec(content)) !== null) {
    words.push({
      word: wordMatch[1],
      partOfSpeech: wordMatch[2],
      definition: wordMatch[3]
    });
  }
  if (words.length >= 2) {
    vocabByChapter[chapterNum] = words.slice(0, 2); // Only take first 2
  }
}

// Load comprehension
const compText = fs.readFileSync('./book-data/wizard-of-oz-comprehension.txt', 'utf8');
const compByChapter = {};
const compChapterRegex = /Chapter (\d+):[^\n]+\n\n1\. (.+?)\n\n([A-D]\).+?\n\n[A-D]\).+?\n\n[A-D]\).+?\n\n[A-D]\).+?)\n\n2\. (.+?)(?:\n\nHint: (.+?))?\n\n/gs;
let compMatch;
while ((compMatch = compChapterRegex.exec(compText)) !== null) {
  const chapterNum = parseInt(compMatch[1]);
  const mcQuestion = compMatch[2].trim();
  const mcChoicesBlock = compMatch[3].trim();
  const shortQuestion = compMatch[4].trim();
  const hint = compMatch[5] ? compMatch[5].trim() : null;
  const choices = [];
  const choiceRegex = /([A-D])\)\s*(.+?)(?=\n\n[A-D]\)|$)/gs;
  let choiceMatch;
  while ((choiceMatch = choiceRegex.exec(mcChoicesBlock)) !== null) {
    choices.push({ letter: choiceMatch[1], text: choiceMatch[2].trim() });
  }
  compByChapter[chapterNum] = { mc: { question: mcQuestion, choices }, short: { question: shortQuestion, hint } };
}

// Load informational texts and grammar
const infoTexts = JSON.parse(fs.readFileSync('./book-data/wizard-info-texts.json', 'utf8'));
const grammarLessons = JSON.parse(fs.readFileSync('./book-data/wizard-grammar.json', 'utf8'));

// Create language lessons for even days (12 lessons)
const languageLessons = {
  2: {
    topic: 'Context Clues',
    explanation: 'Context clues help you figure out unknown words by looking at surrounding words and sentences.',
    examples: [
      '"The cyclone was devastating, destroying everything in its path." (devastating = very destructive)',
      '"Unlike the gray Kansas, Oz was colorful and bright." (contrast clue)'
    ],
    practice: [
      { prompt: 'Use context clues: "Dorothy felt melancholy - sad and lonely - on the gray prairie."' },
      { prompt: 'What does "emerald" mean in: "The city was emerald green, sparkling like a jewel"?' }
    ]
  },
  4: {
    topic: 'Prefixes and Suffixes',
    explanation: 'Prefixes come before a word (un-, re-). Suffixes come after (- ly, -ful). They change the meaning.',
    examples: [
      'un + happy = unhappy (not happy)',
      'care + ful = careful (full of care)',
      're + build = rebuild (build again)'
    ],
    practice: [
      { prompt: 'Add prefix or suffix to "kind" to mean "without kindness"' },
      { prompt: 'What does "wonderful" mean? Break it into parts.' }
    ]
  },
  6: { topic: 'Synonyms and Antonyms', explanation: 'Synonyms are words with similar meanings. Antonyms are opposites.', examples: ['happy/joyful (synonyms)', 'hot/cold (antonyms)'], practice: [{ prompt: 'Name a synonym for "brave"' }, { prompt: 'What is the antonym of "wicked"?' }] },
  8: { topic: 'Multiple Meaning Words', explanation: 'Some words have more than one meaning depending on context.', examples: ['"The witch was mean." (cruel)', '"What does that word mean?" (definition)'], practice: [{ prompt: 'Use "fair" in two different ways' }] },
  11: { topic: 'Figurative Language - Similes', explanation: 'Similes compare two things using "like" or "as".', examples: ['"As gray as ashes"', '"Like a feather in the wind"'], practice: [{ prompt: 'Write a simile about the tornado' }] },
  12: { topic: 'ABC Order', explanation: 'Alphabetical order helps us organize and find words quickly.', examples: ['ant, bear, cat (alphabetical)', 'apple, apricot, avocado (look at 2nd letter)'], practice: [{ prompt: 'Put these in ABC order: yellow, brick, road, follow' }] },
  13: { topic: 'Root Words', explanation: 'Many words are built from root words.', examples: ['care → careful, careless, caring'], practice: [{ prompt: 'Find the root word in "wonderful"' }] },
  14: { topic: 'Adjectives and Adverbs', explanation: 'Adjectives describe nouns. Adverbs describe verbs (often end in -ly).', examples: ['"The wicked witch" (adjective)', '"Dorothy walked quickly" (adverb)'], practice: [{ prompt: 'Find the adjective: "The yellow brick road"' }, { prompt: 'Find the adverb: "Toto barked loudly"' }] },
  16: { topic: 'Homophones', explanation: 'Words that sound the same but have different meanings and spellings.', examples: ['there/their/they\'re', 'to/two/too'], practice: [{ prompt: 'Use "witch" and "which" correctly' }] },
  18: { topic: 'Compound Words', explanation: 'Two words combined to make one new word.', examples: ['sun + light = sunlight', 'rain + bow = rainbow'], practice: [{ prompt: 'Make a compound word with "yellow"' }] },
  21: { topic: 'Word Relationships', explanation: 'Understanding how words relate to each other.', examples: ['hot is to cold as up is to down'], practice: [{ prompt: 'good is to bad as brave is to ___?' }] },
  22: { topic: 'Cause and Effect Words', explanation: 'Some words signal cause and effect: because, so, since, therefore.', examples: ['"Dorothy was scared because of the tornado."', '"The house fell, so Dorothy went to Oz."'], practice: [{ prompt: 'Write a sentence using "because"' }] },
  23: { topic: 'Shades of Meaning', explanation: 'Some words are similar but have slightly different meanings.', examples: ['walk, stroll, march (all mean moving on foot but differently)'], practice: [{ prompt: 'How is "terrified" different from "scared"?' }] },
  24: { topic: 'Sequence Words', explanation: 'Words that show order: first, then, next, finally.', examples: ['"First, Dorothy met the Scarecrow. Then she met the Tin Man."'], practice: [{ prompt: 'Retell part of the story using sequence words' }] },
  26: { topic: 'Figurative Language - Metaphors', explanation: 'Metaphors say one thing IS another to make a comparison.', examples: ['"Her heart was ice." (She was cold and unfeeling)'], practice: [{ prompt: 'Write a metaphor about courage' }] },
  28: { topic: 'Idioms', explanation: 'Phrases that mean something different from the literal words.', examples: ['"It\'s raining cats and dogs" means heavy rain'], practice: [{ prompt: 'What does "follow the yellow brick road" really mean?' }] }
};

console.log(`📚 Loaded ${chapters.length} chapters`);
console.log(`📝 Loaded vocab for ${Object.keys(vocabByChapter).length} chapters`);
console.log(`❓ Loaded comprehension for ${Object.keys(compByChapter).length} chapters\n`);

function generateRegularDay(day) {
  const chapterIndex = day - 1;
  const chapter = chapters[Math.min(chapterIndex, chapters.length - 1)];
  const chapterNum = chapter.chapter;
  const week = Math.ceil(day / 5);
  
  const vocab = vocabByChapter[chapterNum] || [
    { word: 'word1', partOfSpeech: 'noun', definition: 'Definition 1' },
    { word: 'word2', partOfSpeech: 'noun', definition: 'Definition 2' }
  ];
  
  const comp = compByChapter[chapterNum] || {
    mc: { question: 'Question?', choices: [{letter: 'A', text: 'A'}, {letter: 'B', text: 'B'}] },
    short: { question: 'Short question?', hint: null }
  };
  
  const isOdd = day % 2 === 1;
  const skill = isOdd ? grammarLessons[day] : languageLessons[day];
  const info = infoTexts[day] || infoTexts[1];
  
  // Split chapter into 3 parts (handle both \n\n and \n paragraph breaks)
  let paragraphs = chapter.content.split('\n\n').filter(p => p.trim().length > 0);
  // If no double-newline breaks found, try single newlines
  if (paragraphs.length === 1) {
    paragraphs = chapter.content.split('\n').filter(p => p.trim().length > 0);
  }
  const third = Math.ceil(paragraphs.length / 3);
  const part1 = paragraphs.slice(0, third).join('\n\n');
  const part2 = paragraphs.slice(third, third * 2).join('\n\n');
  const part3 = paragraphs.slice(third * 2).join('\n\n');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} - 4th Grade BedrockELA</title>
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
            lessonId: '4th-grade-day-${String(day).padStart(3, '0')}',
            gradeLevel: '4th-grade',
            title: 'Day ${day} - The Wizard of Oz',
            pages: [
    {
        "type": "title",
        "content": \`
                    <h1>Day ${day}</h1>
                    <h2>The Wizard of Oz</h2>
                    <p class="unit-label">4th Grade • Week ${week}</p>
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
                            <li>Read ${chapter.title}</li>
                            <li>Practice ${skill ? skill.topic : 'skills'}</li>
                            <li>Explore informational text</li>
                            <li>Complete a ${isOdd ? 'writing' : 'journal'} activity</li>
                        </ul>
                        <p><strong>Estimated time:</strong> 45-60 minutes</p>
                    </div>
                \`
    },
    {
        "type": "vocabulary",
        "content": \`
                    <h2>📖 Vocabulary</h2>
                    <p>Learn these 2 words before reading:</p>
                    
                    <div class="vocab-word-card">
                        <h3>1. ${vocab[0].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${vocab[0].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-1" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                    
                    <div class="vocab-word-card">
                        <h3>2. ${vocab[1].word}</h3>
                        <p class="definition"><strong>Definition:</strong> ${vocab[1].definition}</p>
                        <label>Write the definition in your own words:</label>
                        <textarea id="vocab-${day}-2" rows="5" placeholder="Your definition..."></textarea>
                    </div>
                \`
    },
    {
        "type": "activity",
        "content": \`
                    <h2>🎮 Vocabulary Matching Game</h2>
                    <p style="color: #666; margin-bottom: 5px;">Match each word to its definition!</p>
                    <p style="color: #305853; font-weight: 600; margin-bottom: 20px;">Score: <span id="gameScore">0</span> / 2</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto;">
                        <div id="wordColumn" style="display: flex; flex-direction: column;">
                            <h3 style="text-align: center; color: #305853; margin-bottom: 10px;">Words</h3>
                            <div class="match-word" data-word="${vocab[0].word}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">${vocab[0].word}</div>
                            <div class="match-word" data-word="${vocab[1].word}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">${vocab[1].word}</div>
                        </div>
                        <div id="defColumn" style="display: flex; flex-direction: column;">
                            <h3 style="text-align: center; color: #8B4513; margin-bottom: 10px;">Definitions</h3>
                            <div class="match-def" data-word="${vocab[0].word}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">${vocab[0].definition}</div>
                            <div class="match-def" data-word="${vocab[1].word}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">${vocab[1].definition}</div>
                        </div>
                    </div>
                    
                    <div id="gameFeedback" style="margin-top: 20px; padding: 15px; border-radius: 10px; text-align: center; display: none;"></div>
                \`,
                onLoad: () => { if(window.initVocabGame) window.initVocabGame(); }
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${chapter.title} - Part 1</h2>
                    <div class="story-content">
                        ${part1.split('\n\n').map(p => '<p style="margin-bottom: 15px;">' + p + '</p>').join('')}
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${chapter.title} - Part 2</h2>
                    <div class="story-content">
                        ${part2.split('\n\n').map(p => '<p style="margin-bottom: 15px;">' + p + '</p>').join('')}
                    </div>
                \`
    },
    {
        "type": "reading",
        "content": \`
                    <h2>📖 ${chapter.title} - Part 3</h2>
                    <div class="story-content">
                        ${part3.split('\n\n').map(p => '<p style="margin-bottom: 15px;">' + p + '</p>').join('')}
                    </div>
                \`
    },
    {
        "type": "comprehension",
        "content": \`
                    <h2>💭 Reading Comprehension</h2>
                    <p>Answer these questions about today's reading:</p>
                    
                    <div class="question-card">
                        <p><strong>1.</strong> ${comp.mc.question}</p>
                        ${comp.mc.choices.map(c => 
                            '<label style="display: block; margin: 10px 0; padding: 12px; background: white; border: 2px solid #ddd; border-radius: 8px; cursor: pointer;">' +
                                '<input type="radio" name="mc-q1" value="' + c.letter + '" style="margin-right: 10px;">' +
                                '<strong>' + c.letter + ')</strong> ' + c.text +
                            '</label>'
                        ).join('')}
                    </div>
                    
                    <div class="question-card" style="margin-top: 20px;">
                        <p><strong>2.</strong> ${comp.short.question}</p>
                        ${comp.short.hint ? '<p style="font-size: 14px; color: #666; margin-bottom: 10px;"><strong>Hint:</strong> ' + comp.short.hint + '</p>' : ''}
                        <textarea id="comp-short" rows="8" placeholder="Your answer..."></textarea>
                    </div>
                \`
    },
    {
        "type": "grammar-language",
        "content": skill ? \`
                    <h2>✏️ ${skill.topic}</h2>
                    <div class="skill-explanation">
                        <p>${skill.explanation}</p>
                    </div>
                    
                    <h3>Examples:</h3>
                    <ul>
                        ${skill.examples.map(ex => '<li>' + ex + '</li>').join('')}
                    </ul>
                    
                    <h3>Practice:</h3>
                    ${skill.practice.map((p, i) =>
                        '<div class="exercise-card">' +
                            '<p><strong>' + (i + 1) + '.</strong> ' + p.prompt + '</p>' +
                            '<textarea id="skill-' + day + '-' + (i + 1) + '" rows="6" placeholder="Your answer..."></textarea>' +
                        '</div>'
                    ).join('')}
                \` : '<p>Skill content will be added.</p>'
    },
    {
        "type": "informational",
        "content": \`
                    <h2>🌍 Informational Text: ${info.title || 'Learning More'}</h2>
                    <div class="informational-article">
                        ${(info.content || 'Content will be added.').split('\n\n').map(p => '<p>' + p + '</p>').join('')}
                    </div>
                    
                    <h3>Questions:</h3>
                    <div class="question-card">
                        <p><strong>1.</strong> What did you learn from this text?</p>
                        <textarea id="info-${day}-1" rows="6" placeholder="Your answer..."></textarea>
                    </div>
                    <div class="question-card">
                        <p><strong>2.</strong> How does this information help you understand the story?</p>
                        <textarea id="info-${day}-2" rows="6" placeholder="Your answer..."></textarea>
                    </div>
                \`
    },
    {
        "type": "writing",
        "content": isOdd ? \`
                    <h2>✍️ Writing Practice</h2>
                    <p>Write a paragraph about today's chapter. Use both vocabulary words.</p>
                    <div class="writing-prompt">
                        <textarea id="writing-${day}" rows="12" placeholder="Your paragraph..."></textarea>
                    </div>
                \` : \`
                    <h2>📝 Journal Response</h2>
                    <p>Reflect on today's reading. How would you feel if you were Dorothy? What would you do?</p>
                    <div class="journal-prompt">
                        <textarea id="journal-${day}" rows="12" placeholder="Your journal entry..."></textarea>
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

// Generate Days 1-4, 6-9, 11-14, 16-19, 21-24, 26-29 (24 regular days)
const regularDays = [];
for (let week = 1; week <= 6; week++) {
  for (let dayInWeek = 1; dayInWeek <= 4; dayInWeek++) {
    const day = (week - 1) * 5 + dayInWeek;
    regularDays.push(day);
  }
}

console.log('🔨 Generating 4th grade lessons with Bedrock Spine...\n');

let successCount = 0;
regularDays.forEach(day => {
  try {
    const html = generateRegularDay(day);
    const filename = `4th-grade-day-${String(day).padStart(3, '0')}.html`;
    fs.writeFileSync(filename, html);
    console.log(`✅ Created ${filename}`);
    successCount++;
  } catch (err) {
    console.log(`❌ Failed day ${day}: ${err.message}`);
  }
});

console.log(`\n🎉 4th grade Bedrock Spine complete!`);
console.log(`   - 11 pages per lesson (was 10)`);
console.log(`   - Story split into 3 parts (was 1)`);
console.log(`   - Vocabulary game added`);
console.log(`   - Grammar/Language alternating`);
console.log(`   - Writing/Journal alternating`);
console.log(`   - Successfully built: ${successCount}/24 lessons`);
