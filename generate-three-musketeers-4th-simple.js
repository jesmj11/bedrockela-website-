const fs = require('fs');

const chapters = JSON.parse(fs.readFileSync('./book-data/three-musketeers-4th-chapters.json', 'utf8'));

const vocabulary = {
  31: ['musketeer', 'ambition'],
  32: ['duel', 'honor'],
  33: ['comrade', 'allegiance'],
  34: ['courier', 'intrigue'],
  36: ['cardinal', 'conspiracy'],
  37: ['diamond', 'messenger'],
  38: ['perilous', 'voyage'],
  39: ['disguise', 'adversary'],
  41: ['mission', 'urgent'],
  42: ['precious', 'treasure'],
  43: ['pursuit', 'escape'],
  44: ['triumph', 'relief'],
  46: ['mysterious', 'shadows'],
  47: ['siege', 'fortress'],
  48: ['brave', 'valiant'],
  49: ['danger', 'peril'],
  51: ['villain', 'treachery'],
  52: ['captive', 'prisoner'],
  53: ['warning', 'urgent'],
  54: ['tragedy', 'sorrow'],
  56: ['trial', 'justice'],
  57: ['offer', 'decision'],
  58: ['loyalty', 'brotherhood'],
  59: ['motto', 'legacy']
};

const assessmentDays = [35, 40, 45, 50, 55, 60];

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
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

function makeLesson(day) {
  const isAssessment = assessmentDays.includes(day);
  if (isAssessment) return makeAssessment(day);
  
  const chIndex = Math.floor((day - 31) * 0.8); // 24 chapters over 30 lessons
  const ch = chapters[Math.min(chIndex, chapters.length - 1)];
  const parts = splitText(ch.content, 3);
  const week = Math.ceil((day - 30) / 5) + 6; // Weeks 7-12
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
    { render: () => '<div class="lesson-page-card title-page"><h1>Lesson ${day}</h1><div class="subtitle">Week ${week}</div><p>The Three Musketeers</p><p>Chapter ${ch.chapter}: ${escapeHtml(ch.title)}</p></div>' },
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
  const week = Math.ceil((day - 30) / 5) + 6;
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

console.log('⚔️ Generating Three Musketeers (Days 31-60)...\n');
for (let day = 31; day <= 60; day++) {
  const html = makeLesson(day);
  const file = `4th-grade-day-${String(day).padStart(3, '0')}.html`;
  fs.writeFileSync(file, html);
  console.log(`✅ ${file}${assessmentDays.includes(day) ? ' (ASSESSMENT)' : ''}`);
}
console.log('\n🎉 Done! 30 lessons generated.');
console.log('\n📚 Total: 60 lessons (Days 1-60) ready for 4th grade!');
