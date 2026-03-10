const fs = require('fs');

// Load all the content
const chapters = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-4th-chapters.json', 'utf8'));

// Parse vocabulary from the text file
const vocabText = fs.readFileSync('./book-data/wizard-of-oz-vocabulary.txt', 'utf8');
const vocabByChapter = parseVocabulary(vocabText);

// Parse comprehension from text file
const compText = fs.readFileSync('./book-data/wizard-of-oz-comprehension.txt', 'utf8');
const compByChapter = parseComprehension(compText);

function parseVocabulary(text) {
  const vocab = {};
  const lines = text.split('\n\n');
  let currentChapter = null;
  let currentWord = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Chapter header
    if (line.startsWith('Chapter ')) {
      const match = line.match(/Chapter (\d+):/);
      if (match) {
        currentChapter = parseInt(match[1]);
        vocab[currentChapter] = [];
      }
    }
    // Word entry (word followed by part of speech)
    else if (line.match(/^[a-z\-]+\s+\(/)) {
      const match = line.match(/^([a-z\-]+)\s+\(([^)]+)\)/);
      if (match && currentChapter) {
        currentWord = {
          word: match[1],
          pos: match[2],
          definition: '',
          example: '',
          discussion: ''
        };
        vocab[currentChapter].push(currentWord);
      }
    }
    // Definition
    else if (currentWord && !currentWord.definition && !line.startsWith('From the story:') && !line.startsWith('Think about it:')) {
      currentWord.definition = line;
    }
    // Example
    else if (line.startsWith('From the story:')) {
      if (currentWord) currentWord.example = line.replace('From the story: ', '');
    }
    // Discussion
    else if (line.startsWith('Think about it:')) {
      if (currentWord) currentWord.discussion = line.replace('Think about it: ', '');
    }
  }
  return vocab;
}

function parseComprehension(text) {
  const comp = {};
  const lines = text.split('\n\n');
  let currentChapter = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('Chapter ')) {
      const match = line.match(/Chapter (\d+):/);
      if (match) {
        currentChapter = parseInt(match[1]);
        comp[currentChapter] = { mc: {}, sa: {} };
      }
    }
    // Multiple choice question
    else if (line.match(/^1\.\s+/)) {
      if (currentChapter) comp[currentChapter].mc.question = line.replace(/^1\.\s+/, '');
    }
    // MC options
    else if (line.match(/^[A-D]\)/)) {
      if (currentChapter && !comp[currentChapter].mc.options) {
        comp[currentChapter].mc.options = [];
      }
      if (currentChapter) comp[currentChapter].mc.options.push(line);
    }
    // Short answer question
    else if (line.match(/^2\.\s+/)) {
      if (currentChapter) comp[currentChapter].sa.question = line.replace(/^2\.\s+/, '');
    }
    // Hint
    else if (line.startsWith('Hint:')) {
      if (currentChapter) comp[currentChapter].sa.hint = line.replace('Hint: ', '');
    }
  }
  return comp;
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function splitIntoThreeParts(text) {
  const paras = text.split('\n\n').filter(p => p.trim());
  const perPart = Math.ceil(paras.length / 3);
  return [
    paras.slice(0, perPart).join('\n\n'),
    paras.slice(perPart, perPart * 2).join('\n\n'),
    paras.slice(perPart * 2).join('\n\n')
  ];
}

// Grammar and Language skills for 4th grade CCSS
const grammarSkills = {
  1: { topic: 'Complete Sentences', content: 'A complete sentence has a subject (who/what) and a predicate (what they do).' },
  3: { topic: 'Compound Sentences', content: 'Join two sentences with and, but, or, so to make a compound sentence.' },
  6: { topic: 'Past Tense Verbs', content: 'Most verbs add -ed for past tense. Some are irregular (go→went, see→saw).' },
  8: { topic: 'Dialogue Punctuation', content: 'Put quotation marks around what someone says. "Hello," said Dorothy.' },
  11: { topic: 'Action Verbs', content: 'Action verbs show what someone does: run, jump, fly, melt, rescue.' },
  13: { topic: 'Adjectives', content: 'Adjectives describe nouns. They tell what kind, which one, or how many.' },
  16: { topic: 'Commas in Lists', content: 'Use commas to separate items in a list: Dorothy, Scarecrow, and Tin Man.' },
  18: { topic: 'Capitalization', content: 'Capitalize names of people and places: Dorothy, Kansas, Emerald City, Oz.' },
  21: { topic: 'Sentence Variety', content: 'Start sentences different ways to make writing more interesting.' },
  23: { topic: 'Pronouns', content: 'Pronouns replace nouns: he, she, it, they. Make sure they match!' },
  26: { topic: 'Possessives', content: "Add 's to show ownership: Dorothy's dog, the witch's broom." },
  28: { topic: 'Combining Sentences', content: 'Combine short choppy sentences into longer, smoother ones.' }
};

const languageSkills = {
  2: { topic: 'Context Clues', content: 'Use words around an unknown word to figure out what it means.' },
  4: { topic: 'Prefixes', content: 'Un- means not. Re- means again. Dis- means opposite of.' },
  7: { topic: 'Similes', content: 'A simile compares using like or as: as gray as the sky, flew like a bird.' },
  9: { topic: 'Suffixes', content: '-ly makes adverbs (quick→quickly). -ful means full of (wonder→wonderful).' },
  12: { topic: 'Multiple Meanings', content: 'Some words have more than one meaning. Use context to know which one.' },
  14: { topic: 'Synonyms', content: 'Synonyms are words that mean almost the same thing: brave/courageous.' },
  17: { topic: 'Antonyms', content: 'Antonyms are opposites: wicked/good, brave/cowardly, big/small.' },
  19: { topic: 'Root Words', content: 'Find the root word by removing prefixes and suffixes: kindness→kind.' },
  22: { topic: 'Figurative Language', content: 'Figurative language means something different than the literal words.' },
  24: { topic: 'Word Choice', content: 'Choose strong, specific words instead of boring ones: sprinted vs. went.' },
  27: { topic: 'Homophones', content: 'Homophones sound the same but have different meanings: to/two/too, there/their.' },
  29: { topic: 'Descriptive Language', content: 'Use sensory details to help readers see, hear, smell, taste, and feel.' }
};

console.log('📖 Generating Wizard of Oz with full content (Days 1-30)...\n');

for (let day = 1; day <= 30; day++) {
  // Assessment days
  if (day % 5 === 0) {
    // Generate assessment (simplified for now)
    const week = day / 5;
    const html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>Week ${week} Assessment - 4th Grade</title>
<link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
</head><body class="lesson-viewer">
<div id="lesson-container"></div>
<script src="js/lesson-viewer.js?v=1772665488"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="js/lesson-completion.js?v=1772665488"></script>
<script>
const lesson${day}Config = {
  lessonId: '4th-grade-day-${day}',
  gradeLevel: '4th-grade',
  title: 'Week ${week} Assessment',
  pages: [
    { render: () => '<div class="lesson-page-card title-page"><h1>Week ${week} Assessment</h1><div class="subtitle">4th Grade • Day ${day}</div><p>The Wonderful Wizard of Oz</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Vocabulary Quiz</h2><p>Write the definitions for this week\\'s vocabulary words.</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Reading Comprehension</h2><p>Answer questions about this week\\'s chapters.</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Grammar Review</h2><p>Review this week\\'s grammar skills.</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Language Review</h2><p>Review this week\\'s language skills.</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Writing Prompt</h2><p>Write about this week\\'s reading.</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Great Work!</h2><p>You completed Week ${week}!</p></div>' }
  ]
};
if (typeof initLessonViewer === 'function') initLessonViewer(lesson${day}Config);
</script></body></html>`;
    
    fs.writeFileSync(`4th-grade-day-${String(day).padStart(3, '0')}.html`, html);
    console.log(`✅ Day ${day} (Week ${week} Assessment)`);
    continue;
  }
  
  // Regular lessons
  const chapterNum = Math.min(Math.floor((day - 1) * 0.82) + 1, 24);
  const chapter = chapters[chapterNum - 1];
  const vocab = vocabByChapter[chapterNum] || [];
  const comp = compByChapter[chapterNum] || { mc: {}, sa: {} };
  const week = Math.ceil(day / 5);
  const isOdd = day % 2 === 1;
  
  const [part1, part2, part3] = splitIntoThreeParts(chapter.content);
  
  const grammar = grammarSkills[day] || { topic: 'Grammar', content: 'Grammar practice.' };
  const language = languageSkills[day] || { topic: 'Language', content: 'Language practice.' };
  
  const html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>Lesson ${day} - 4th Grade Wizard of Oz</title>
<link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
</head><body class="lesson-viewer">
<div id="lesson-container"></div>
<script src="js/lesson-viewer.js?v=1772665488"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="js/lesson-completion.js?v=1772665488"></script>
<script src="js/lesson-autosave.js?v=1772665488"></script>
<script>
const lesson${day}Config = {
  lessonId: '4th-grade-day-${day}',
  gradeLevel: '4th-grade',
  title: 'Lesson ${day}',
  pages: [
    {
      render: () => \`
        <div class="lesson-page-card title-page">
          <h1>Lesson ${day}</h1>
          <div class="subtitle">Week ${week} • 4th Grade</div>
          <p style="font-size:20px;margin-top:20px">The Wonderful Wizard of Oz</p>
          <p style="font-size:16px;color:#666;margin-top:10px">Chapter ${chapter.chapter}: ${escapeHtml(chapter.title)}</p>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>Welcome to Lesson ${day}!</h2>
          <p>Today you will:</p>
          <ul style="margin:20px 0;line-height:2">
            <li>Read Chapter ${chapter.chapter}: <strong>${escapeHtml(chapter.title)}</strong></li>
            <li>Learn 2 vocabulary words</li>
            <li>Answer comprehension questions</li>
            <li>Practice ${isOdd ? 'grammar' : 'language'} skills</li>
            <li>Complete a ${isOdd ? 'writing activity' : 'journal entry'}</li>
          </ul>
          <p><strong>Time needed:</strong> 45-60 minutes</p>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>Vocabulary Words</h2>
          ${vocab.map((v, i) => `
            <div style="padding:20px;background:#f9f9f9;border-radius:10px;margin:20px 0">
              <h3 style="color:#305853;margin-bottom:10px">${escapeHtml(v.word)} <span style="font-size:14px;color:#666">(${escapeHtml(v.pos)})</span></h3>
              <p style="margin-bottom:15px"><strong>Definition:</strong> ${escapeHtml(v.definition)}</p>
              <p style="margin-bottom:15px;font-style:italic">${escapeHtml(v.example)}</p>
              <p style="margin-bottom:15px;color:#B06821"><strong>Think about it:</strong> ${escapeHtml(v.discussion)}</p>
              <p style="margin-bottom:8px">Write a sentence using <strong>${escapeHtml(v.word)}</strong>:</p>
              <textarea id="vocab${i+1}" style="width:100%;min-height:80px;padding:10px;border:2px solid #305853;border-radius:8px"></textarea>
            </div>
          `).join('')}
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>Vocabulary Practice</h2>
          <p>Review today's vocabulary words:</p>
          ${vocab.map(v => `<p style="margin:15px 0"><strong>${escapeHtml(v.word)}:</strong> ${escapeHtml(v.definition)}</p>`).join('')}
          <p style="margin-top:20px;color:#666">Watch for these words in today's story!</p>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>${escapeHtml(chapter.title)} (Part 1)</h2>
          <div style="font-size:16px;line-height:1.8;color:#333">
            ${part1.split('\n\n').map(p => '<p style="margin-bottom:15px">' + escapeHtml(p) + '</p>').join('')}
          </div>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>${escapeHtml(chapter.title)} (Part 2)</h2>
          <div style="font-size:16px;line-height:1.8;color:#333">
            ${part2.split('\n\n').map(p => '<p style="margin-bottom:15px">' + escapeHtml(p) + '</p>').join('')}
          </div>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>${escapeHtml(chapter.title)} (Part 3)</h2>
          <div style="font-size:16px;line-height:1.8;color:#333">
            ${part3.split('\n\n').map(p => '<p style="margin-bottom:15px">' + escapeHtml(p) + '</p>').join('')}
          </div>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>Comprehension Questions</h2>
          <div style="margin:20px 0">
            <p style="font-weight:600;margin-bottom:10px">1. ${escapeHtml(comp.mc.question || 'What happened in this chapter?')}</p>
            ${(comp.mc.options || []).map(opt => '<p style="margin-left:20px">' + escapeHtml(opt) + '</p>').join('')}
            <textarea id="comp1" style="width:100%;min-height:80px;margin-top:10px;padding:10px;border:2px solid #305853;border-radius:8px" placeholder="Write your answer..."></textarea>
          </div>
          <div style="margin:30px 0">
            <p style="font-weight:600;margin-bottom:10px">2. ${escapeHtml(comp.sa.question || 'What did you learn from this chapter?')}</p>
            ${comp.sa.hint ? '<p style="font-style:italic;color:#666;margin-bottom:10px">Hint: ' + escapeHtml(comp.sa.hint) + '</p>' : ''}
            <textarea id="comp2" style="width:100%;min-height:120px;padding:10px;border:2px solid #305853;border-radius:8px"></textarea>
          </div>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>${isOdd ? 'Grammar Practice' : 'Language Skills'}</h2>
          <h3 style="color:#305853;margin:20px 0">${isOdd ? escapeHtml(grammar.topic) : escapeHtml(language.topic)}</h3>
          <p style="margin-bottom:20px">${isOdd ? escapeHtml(grammar.content) : escapeHtml(language.content)}</p>
          <p style="margin-bottom:10px">Practice this skill with examples from today's reading:</p>
          <textarea id="grammar" style="width:100%;min-height:150px;padding:10px;border:2px solid #305853;border-radius:8px"></textarea>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>Learn More</h2>
          <p style="margin:20px 0">Informational text will be added here.</p>
        </div>
      \`
    },
    {
      render: () => \`
        <div class="lesson-page-card content-page">
          <h2>${isOdd ? 'Writing Activity' : 'Journal Entry'}</h2>
          <p style="margin:20px 0">${isOdd ? 
            'Write your opinion about something from today\\'s reading. Give at least two reasons for your opinion.' :
            'Write about your thoughts and feelings about today\\'s story. How does it connect to your own life?'
          }</p>
          <textarea id="writing" style="width:100%;min-height:200px;padding:12px;border:2px solid #305853;border-radius:8px;line-height:1.6"></textarea>
          <p style="margin-top:15px;color:#666">Write at least 5-7 sentences.</p>
        </div>
      \`
    }
  ]
};
if (typeof initLessonViewer === 'function') initLessonViewer(lesson${day}Config);
</script></body></html>`;

  fs.writeFileSync(`4th-grade-day-${String(day).padStart(3, '0')}.html`, html);
  console.log(`✅ Day ${day}: ${chapter.title} (${vocab.length} vocab words)`);
}

console.log('\n🎉 Wizard of Oz complete! Now run Three Musketeers generator...');
