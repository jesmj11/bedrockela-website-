const fs = require('fs');
const chapters = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-4th-chapters.json', 'utf8'));
const vocabText = fs.readFileSync('./book-data/wizard-of-oz-vocabulary.txt', 'utf8');
const compText = fs.readFileSync('./book-data/wizard-of-oz-comprehension.txt', 'utf8');

const vocabByChapter = {};
const compByChapter = {};

let chNum = null;
vocabText.split('\n\n').forEach(line => {
  const chMatch = line.match(/Chapter (\d+):/);
  if (chMatch) {
    chNum = parseInt(chMatch[1]);
    vocabByChapter[chNum] = [];
  }
  const wordMatch = line.match(/^([a-z\-]+)\s+\(/);
  if (wordMatch && chNum) {
    vocabByChapter[chNum].push({ word: wordMatch[1] });
  }
});

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

// Textarea styling
const textareaStyle = 'width:100%;min-height:100px;padding:12px;border:2px solid #305853;border-radius:8px;font-family:inherit;font-size:16px;line-height:1.6;resize:vertical;';

console.log('Regenerating Wizard of Oz with proper styling...\n');

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
{render:()=>'<div class="lesson-page-card title-page"><h1>Week ${w} Assessment</h1><div class="subtitle">Day ${day}</div><p style="font-size:18px;margin-top:20px">The Wonderful Wizard of Oz</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Vocabulary Quiz</h2><p style="margin:20px 0">Assessment content</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Comprehension</h2><p style="margin:20px 0">Assessment content</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Grammar Review</h2><p style="margin:20px 0">Assessment content</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Language Review</h2><p style="margin:20px 0">Assessment content</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Writing Prompt</h2><p style="margin:20px 0">Assessment content</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Great Work!</h2><p style="font-size:18px;margin:30px 0">You completed Week ${w}! 🎉</p></div>'}
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
<link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer"><div id="lesson-container"></div>
<script src="js/lesson-viewer.js?v=1772665488"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="js/lesson-completion.js?v=1772665488"></script>
<script src="js/lesson-autosave.js?v=1772665488"></script>
<script>
const lesson${day}Config={lessonId:'4th-grade-day-${day}',gradeLevel:'4th-grade',title:'Lesson ${day}',pages:[
{render:()=>'<div class="lesson-page-card title-page"><h1>Lesson ${day}</h1><div class="subtitle">Week ${week} • 4th Grade</div><p style="font-size:20px;margin-top:20px;color:#1B2A4A">The Wonderful Wizard of Oz</p><p style="font-size:16px;color:#666;margin-top:10px">Chapter ${ch.chapter}: ${esc(ch.title)}</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Today You Will:</h2><ul style="margin:20px 0;line-height:2"><li>Read Chapter ${ch.chapter}: <strong>${esc(ch.title)}</strong></li><li>Learn 2 vocabulary words</li><li>Answer comprehension questions</li><li>Practice ${odd?'grammar':'language'} skills</li><li>Complete a ${odd?'writing activity':'journal entry'}</li></ul><p><strong>Time needed:</strong> 45-60 minutes</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Vocabulary Words</h2>${vocab.map((v,i)=>'<div style="padding:20px;background:#f9f9f9;border-radius:10px;margin:20px 0"><h3 style="color:#305853;margin-bottom:15px">'+v.word+'</h3><p style="margin-bottom:10px;font-size:15px">Write a sentence using <strong>'+v.word+'</strong>:</p><textarea id="vocab'+(i+1)+'" style="'+textareaStyle+'"></textarea></div>').join('')}</div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Vocabulary Practice</h2><p style="margin:20px 0">Review today\\'s vocabulary words:</p>${vocab.map(v=>'<p style="margin:15px 0;padding:10px;background:#f0f0f0;border-radius:5px"><strong>'+v.word+'</strong></p>').join('')}<p style="margin-top:20px;color:#666">Watch for these words in today\\'s story!</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${esc(ch.title)} (Part 1)</h2><div style="font-size:16px;line-height:1.8;color:#333">${p1.split('\n\n').map(p=>'<p style="margin-bottom:15px">'+esc(p)+'</p>').join('')}</div></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${esc(ch.title)} (Part 2)</h2><div style="font-size:16px;line-height:1.8;color:#333">${p2.split('\n\n').map(p=>'<p style="margin-bottom:15px">'+esc(p)+'</p>').join('')}</div></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${esc(ch.title)} (Part 3)</h2><div style="font-size:16px;line-height:1.8;color:#333">${p3.split('\n\n').map(p=>'<p style="margin-bottom:15px">'+esc(p)+'</p>').join('')}</div></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Comprehension Questions</h2><div style="margin:25px 0"><p style="font-weight:600;margin-bottom:10px;font-size:16px">1. ${esc(comp.q1)}</p><textarea id="comp1" style="'+textareaStyle+'"></textarea></div><div style="margin:25px 0"><p style="font-weight:600;margin-bottom:10px;font-size:16px">2. ${esc(comp.q2)}</p><textarea id="comp2" style="'+textareaStyle+'"></textarea></div></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${odd?'Grammar Practice':'Language Skills'}</h2><p style="margin:20px 0;font-size:16px">${odd?'Practice grammar skills from today\\'s reading.':'Practice language skills from today\\'s reading.'}</p><textarea id="grammar" style="'+textareaStyle+'"></textarea></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>Learn More</h2><p style="margin:20px 0;padding:20px;background:#f9f9f9;border-radius:10px">Informational text related to today\\'s reading will be added here.</p></div>'},
{render:()=>'<div class="lesson-page-card content-page"><h2>${odd?'Writing Activity':'Journal Entry'}</h2><p style="margin:20px 0 15px;font-size:16px">${odd?'Write your opinion about something from today\\'s reading. Give at least two reasons for your opinion.':'Write about your thoughts and feelings about today\\'s story. How does it connect to your own life?'}</p><textarea id="writing" style="width:100%;min-height:200px;padding:12px;border:2px solid #305853;border-radius:8px;font-family:inherit;font-size:16px;line-height:1.6;resize:vertical;"></textarea><p style="margin-top:15px;color:#666;font-size:14px">Write at least 5-7 sentences.</p></div>'}
]};
if(typeof initLessonViewer==='function')initLessonViewer(lesson${day}Config);
</script></body></html>`);
  
  console.log(`✅ Day ${day}: ${ch.title}`);
}
console.log('\n🎉 Wizard of Oz complete with styling!');
