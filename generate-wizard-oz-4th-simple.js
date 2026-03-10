const fs = require('fs');

// Load chapters
const chapters = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-4th-chapters.json', 'utf8'));

// Vocabulary for each day
const vocabulary = {
  1: ['cyclone', 'prairie'],
  2: ['munchkin', 'sorceress'],
  3: ['scarecrow', 'companion'],
  4: ['emerald', 'journey'],
  6: ['rust', 'woodman'],
  7: ['courage', 'timid'],
  8: ['poppy', 'deadly'],
  9: ['guardian', 'gate'],
  11: ['spectacles', 'magnificent'],
  12: ['throne', 'commanded'],
  13: ['wicked', 'search'],
  14: ['prisoner', 'enslaved'],
  16: ['captive', 'rescue'],
  17: ['dissolve', 'melt'],
  18: ['winged', 'monkey'],
  19: ['humbug', 'terrible'],
  21: ['balloon', 'ascending'],
  22: ['porcelain', 'dainty'],
  23: ['china', 'fragile'],
  24: ['journey', 'south'],
  26: ['quadling', 'country'],
  27: ['glinda', 'grant'],
  28: ['slippers', 'magic'],
  29: ['gratitude', 'farewell']
};

const assessmentDays = [5, 10, 15, 20, 25, 30];

function splitText(text, parts = 3) {
  const paras = text.split('\n\n');
  const perPart = Math.ceil(paras.length / parts);
  const result = [];
  for (let i = 0; i < parts; i++) {
    result.push(paras.slice(i * perPart, (i + 1) * perPart).join('\n\n'));
  }
  return result;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Simple lesson template
function makeLesson(day) {
  const isAssessment = assessmentDays.includes(day);
  if (isAssessment) return makeAssessment(day);
  
  const chIndex = Math.floor((day - 1) * 0.8); // 24 chapters over 30 lessons
  const ch = chapters[Math.min(chIndex, chapters.length - 1)];
  const parts = splitText(ch.content, 3);
  const week = Math.ceil(day / 5);
  const vocab = vocabulary[day] || ['word1', 'word2'];
  const odd = day % 2 === 1;
  
  return `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>Lesson ${day} - 4th Grade</title>
<link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
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
    { render: () => '<div class="lesson-page-card title-page"><h1>Lesson ${day}</h1><div class="subtitle">Week ${week}</div><p>The Wonderful Wizard of Oz</p><p>Chapter ${ch.chapter}: ${escapeHtml(ch.title)}</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Today You Will:</h2><ul><li>Read ${escapeHtml(ch.title)}</li><li>Learn 2 vocabulary words</li><li>Answer 3 questions</li></ul></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Vocabulary</h2><p><strong>${vocab[0]}</strong> and <strong>${vocab[1]}</strong></p><textarea id="vocab1"></textarea><textarea id="vocab2"></textarea></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Vocab Practice</h2><p>Practice using the words</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>${escapeHtml(ch.title)} (Part 1)</h2><div>${parts[0].split('\n\n').map(p => '<p>' + escapeHtml(p) + '</p>').join('')}</div></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>${escapeHtml(ch.title)} (Part 2)</h2><div>${parts[1].split('\n\n').map(p => '<p>' + escapeHtml(p) + '</p>').join('')}</div></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>${escapeHtml(ch.title)} (Part 3)</h2><div>${parts[2].split('\n\n').map(p => '<p>' + escapeHtml(p) + '</p>').join('')}</div></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Comprehension</h2><textarea id="q1"></textarea><textarea id="q2"></textarea><textarea id="q3"></textarea></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>${odd ? 'Grammar' : 'Language'}</h2><p>Skills practice</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Learn More</h2><p>Informational text</p></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Writing</h2><textarea id="writing"></textarea></div>' }
  ]
};
if (typeof initLessonViewer === 'function') initLessonViewer(lesson${day}Config);
</script></body></html>`;
}

function makeAssessment(day) {
  const week = Math.ceil(day / 5);
  return `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>Assessment ${day} - 4th Grade</title>
<link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
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
  title: 'Assessment ${day}',
  pages: [
    { render: () => '<div class="lesson-page-card title-page"><h1>Week ${week} Assessment</h1><div class="subtitle">Day ${day}</div></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Vocabulary Quiz</h2></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Comprehension</h2></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Grammar Review</h2></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Language Review</h2></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Writing Prompt</h2></div>' },
    { render: () => '<div class="lesson-page-card content-page"><h2>Great Work!</h2><p>Week ${week} complete!</p></div>' }
  ]
};
if (typeof initLessonViewer === 'function') initLessonViewer(lesson${day}Config);
</script></body></html>`;
}

console.log('🌪️ Generating Wizard of Oz (Days 1-30)...\n');
for (let day = 1; day <= 30; day++) {
  const html = makeLesson(day);
  const file = `4th-grade-day-${String(day).padStart(3, '0')}.html`;
  fs.writeFileSync(file, html);
  console.log(`✅ ${file}${assessmentDays.includes(day) ? ' (ASSESSMENT)' : ''}`);
}
console.log('\n🎉 Done! 30 lessons generated.');
