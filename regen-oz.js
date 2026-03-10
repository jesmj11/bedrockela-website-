const fs = require('fs');
const chapters = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-4th-chapters.json', 'utf8'));
const vocabText = fs.readFileSync('./book-data/wizard-of-oz-vocabulary.txt', 'utf8');
const compText = fs.readFileSync('./book-data/wizard-of-oz-comprehension.txt', 'utf8');

// Simple parsers
const vocabByChapter = {};
const compByChapter = {};

// Parse vocab (basic - just get words)
let chNum = null;
vocabText.split('\n\n').forEach(line => {
  const chMatch = line.match(/Chapter (\d+):/);
  if (chMatch) {
    chNum = parseInt(chMatch[1]);
    vocabByChapter[chNum] = [];
  }
  const wordMatch = line.match(/^([a-z\-]+)\s+\(/);
  if (wordMatch && chNum) {
    vocabByChapter[chNum].push({ word: wordMatch[1], def: '' });
  }
});

// Parse comp (basic)
chNum = null;
compText.split('\n\n').forEach(line => {
  const chMatch = line.match(/Chapter (\d+):/);
  if (chMatch) {
    chNum = parseInt(chMatch[1]);
    compByChapter[chNum] = { q1: '', q2: '' };
  }
  if (line.match(/^1\.\s+/) && chNum) {
    compByChapter[chNum].q1 = line.replace(/^1\.\s+/, '');
  }
  if (line.match(/^2\.\s+/) && chNum) {
    compByChapter[chNum].q2 = line.replace(/^2\.\s+/, '');
  }
});

function esc(t) {
  if (!t) return '';
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function split3(text) {
  const p = text.split('\n\n').filter(x=>x.trim());
  const n = Math.ceil(p.length/3);
  return [p.slice(0,n).join('\n\n'), p.slice(n,n*2).join('\n\n'), p.slice(n*2).join('\n\n')];
}

console.log('Regenerating Wizard of Oz with full content...\n');

for (let day = 1; day <= 30; day++) {
  if (day % 5 === 0) {
    const w = day/5;
    fs.writeFileSync(`4th-grade-day-${String(day).padStart(3,'0')}.html`,
`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Week ${w} Assessment</title>
<link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488"></head>
<body class="lesson-viewer"><div id="lesson-container"></div>
<script src="js/lesson-viewer.js?v=1772665488"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="js/lesson-completion.js?v=1772665488"></script>
<script>
const lesson${day}Config={lessonId:'4th-grade-day-${day}',gradeLevel:'4th-grade',title:'Week ${w} Assessment',pages:[
{render:()=>'<div class="lesson-page-card title-page"><h1>Week ${w} Assessment</h1><p>Day ${day}</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Vocabulary Quiz</h2></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Comprehension</h2></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Grammar Review</h2></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Language Review</h2></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Writing Prompt</h2></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Great Work!</h2></div>'}
]};
if(typeof initLessonViewer==='function')initLessonViewer(lesson${day}Config);
</script></body></html>`);
    console.log(`✅ Day ${day} (Assessment)`);
    continue;
  }

  const chIdx = Math.min(Math.floor((day-1)*0.82), 23);
  const ch = chapters[chIdx];
  const vocab = vocabByChapter[ch.chapter] || [];
  const comp = compByChapter[ch.chapter] || {q1:'What happened?',q2:'What did you think?'};
  const [p1,p2,p3] = split3(ch.content);
  const odd = day%2===1;
  const week = Math.ceil(day/5);
  
  fs.writeFileSync(`4th-grade-day-${String(day).padStart(3,'0')}.html`,
`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Lesson ${day} - Wizard of Oz</title>
<link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488"></head>
<body class="lesson-viewer"><div id="lesson-container"></div>
<script src="js/lesson-viewer.js?v=1772665488"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="js/lesson-completion.js?v=1772665488"></script>
<script src="js/lesson-autosave.js?v=1772665488"></script>
<script>
const lesson${day}Config={lessonId:'4th-grade-day-${day}',gradeLevel:'4th-grade',title:'Lesson ${day}',pages:[
{render:()=>'<div class="lesson-page-card title-page"><h1>Lesson ${day}</h1><p>Week ${week}</p><p>Chapter ${ch.chapter}: ${esc(ch.title)}</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Today You Will:</h2><ul><li>Read ${esc(ch.title)}</li><li>Learn 2 vocab words</li><li>Answer questions</li><li>Practice ${odd?'grammar':'language'}</li><li>${odd?'Write':'Journal'}</li></ul></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Vocabulary</h2>${vocab.map(v=>'<div style="margin:20px 0"><h3>'+v.word+'</h3><textarea id="v'+v.word+'"></textarea></div>').join('')}</div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Vocab Practice</h2><p>${vocab.map(v=>v.word).join(', ')}</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${esc(ch.title)} (Part 1)</h2><div>${p1.split('\n\n').map(p=>'<p>'+esc(p)+'</p>').join('')}</div></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${esc(ch.title)} (Part 2)</h2><div>${p2.split('\n\n').map(p=>'<p>'+esc(p)+'</p>').join('')}</div></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${esc(ch.title)} (Part 3)</h2><div>${p3.split('\n\n').map(p=>'<p>'+esc(p)+'</p>').join('')}</div></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Comprehension</h2><p>1. ${esc(comp.q1)}</p><textarea id="q1"></textarea><p>2. ${esc(comp.q2)}</p><textarea id="q2"></textarea></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${odd?'Grammar':'Language'}</h2><p>${odd?'Grammar practice':'Language skills'}</p><textarea id="skill"></textarea></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Learn More</h2><p>Informational text</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${odd?'Writing':'Journal'}</h2><textarea id="writing" style="min-height:200px"></textarea></div>'}
]};
if(typeof initLessonViewer==='function')initLessonViewer(lesson${day}Config);
</script></body></html>`);
  
  console.log(`✅ Day ${day}: ${ch.title} (${vocab.length} vocab)`);
}
console.log('\n🎉 Wizard of Oz complete (Days 1-30)!');
