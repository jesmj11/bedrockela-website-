#!/usr/bin/env node
/**
 * Inject Sherlock Holmes stories into 4th and 6th grade lessons.
 * Each lesson gets ~4000-6000 chars of text across 2-3 reading pages.
 * Vocab words from each lesson are highlighted in yellow.
 * Stories flow sequentially across lessons until complete.
 */

const fs = require('fs');

// ── Load stories ──────────────────────────────────────────────
function parseStory1() {
  const raw = fs.readFileSync('books/sherlock-holmes.txt', 'utf8');
  const start = raw.indexOf('I. A SCANDAL IN BOHEMIA');
  const end = raw.indexOf('II. THE RED-HEADED LEAGUE');
  let text = raw.substring(start, end).trim();
  text = text.replace(/^I\. A SCANDAL IN BOHEMIA\s*/, '').trim();
  return { title: 'A Scandal in Bohemia', text };
}

function loadStories() {
  const data = JSON.parse(fs.readFileSync('book-data/sherlock-holmes-stories.json', 'utf8'));
  const all = [parseStory1()];
  for (const k of Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b))) {
    const s = data[k];
    // Clean up title (remove number prefix)
    const title = s.title.replace(/^\d+\.\s*/, '');
    all.push({ title, text: s.text });
  }
  return all;
}

// ── Text processing ───────────────────────────────────────────
function splitIntoParagraphs(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    .split(/\n\s*\n/).map(p => p.replace(/\s+/g, ' ').trim()).filter(p => p.length > 0);
}

function highlightVocab(text, words) {
  for (const w of words) {
    text = text.replace(new RegExp(`\\b(${w})\\b`, 'gi'),
      `<span class="vocab-highlight" title="Vocabulary word: ${w}">$1</span>`);
  }
  return text;
}

function parasToHtml(paras, vocabWords) {
  return paras.map(p => {
    const highlighted = highlightVocab(p, vocabWords);
    return `<p style="margin-bottom: 15px; line-height: 1.8;">${highlighted}</p>`;
  }).join('\n                                ');
}

// ── Extract vocab words from lesson HTML ──────────────────────
function extractVocab(html) {
  const matches = html.match(/font-weight:\s*800[^>]*>(\w+)/g) || [];
  return matches.map(m => m.replace(/.*>/, ''));
}

// ── Build a reading stream from all stories ───────────────────
// Returns an array of paragraphs with story title markers
function buildStream(stories) {
  const stream = [];
  for (const story of stories) {
    const paras = splitIntoParagraphs(story.text);
    stream.push({ type: 'title', title: story.title });
    for (const p of paras) {
      stream.push({ type: 'para', text: p, storyTitle: story.title });
    }
  }
  return stream;
}

// ── Assign ~2000 chars per page, ~3 pages per lesson ──────────
function assignToLessons(stream, numLessons, charsPerPage = 1800, pagesPerLesson = 3) {
  const charsPerLesson = charsPerPage * pagesPerLesson;
  const lessons = [];
  let streamIdx = 0;
  let currentTitle = '';
  
  for (let l = 0; l < numLessons; l++) {
    const lessonParas = [];
    let lessonChars = 0;
    let title = currentTitle;
    
    while (streamIdx < stream.length && lessonChars < charsPerLesson) {
      const item = stream[streamIdx];
      if (item.type === 'title') {
        currentTitle = item.title;
        title = title || currentTitle;
        streamIdx++;
        continue;
      }
      lessonParas.push(item.text);
      lessonChars += item.text.length;
      currentTitle = item.storyTitle;
      if (!title) title = currentTitle;
      streamIdx++;
    }
    
    // Split into pages
    const pages = [];
    let pageParas = [];
    let pageChars = 0;
    for (const p of lessonParas) {
      if (pageChars + p.length > charsPerPage && pageParas.length > 0) {
        pages.push(pageParas);
        pageParas = [p];
        pageChars = p.length;
      } else {
        pageParas.push(p);
        pageChars += p.length;
      }
    }
    if (pageParas.length > 0) pages.push(pageParas);
    
    lessons.push({ title: title || 'The Adventures of Sherlock Holmes', pages });
  }
  return lessons;
}

// ── Inject into HTML ──────────────────────────────────────────
function injectIntoHtml(fileName, lessonData, grade) {
  let html = fs.readFileSync(fileName, 'utf8');
  
  if (!html.includes('will be inserted here')) {
    return false;
  }
  
  const vocabWords = extractVocab(html);
  const { title, pages } = lessonData;
  
  // Replace the placeholder reading passage with page 1
  const placeholderRegex = /(<div[^>]*(?:class="reading-passage"|background:\s*#f9f9f9)[^>]*>)\s*\n\s*<p><em>\[Reading passage from[^\]]*\]<\/em><\/p>/;
  
  if (!placeholderRegex.test(html)) {
    console.log(`  ⚠️  ${fileName} - no placeholder pattern found`);
    return false;
  }
  
  // Build page 1 replacement
  const page1Html = parasToHtml(pages[0] || ['Text not available.'], vocabWords);
  const continueNote = pages.length > 1 
    ? `\n                            <p style="text-align: center; margin-top: 20px; font-style: italic; color: #666;">Continue reading on the next page →</p>` 
    : '';
  
  html = html.replace(placeholderRegex, 
    `$1\n                                ${page1Html}\n                            </div>${continueNote}`
  );
  
  // For additional pages, inject them as new page objects into the pages array
  if (pages.length > 1) {
    const additionalPageObjects = [];
    for (let i = 1; i < pages.length; i++) {
      const pageHtml = parasToHtml(pages[i], vocabWords);
      const partLabel = ` (Part ${i + 1} of ${pages.length})`;
      const cont = i < pages.length - 1 
        ? `<p style="text-align: center; margin-top: 20px; font-style: italic; color: #666;">Continue reading on the next page →</p>`
        : '';
      
      // Escape backticks in content
      const escapedHtml = pageHtml.replace(/`/g, "'").replace(/\${/g, "\\${");
      
      additionalPageObjects.push(`
                {
                    title: "Reading${partLabel}",
                    content: \`
                            <h2>Reading: ${title.replace(/`/g, "'")}${partLabel}</h2>
                            <div style="background: #FFF8E1; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #f6c94e;">
                                <p style="margin: 0;"><strong>Vocabulary words</strong> are <span class="vocab-highlight">highlighted</span> in the text!</p>
                            </div>
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;" class="reading-passage">
                                ${escapedHtml}
                            </div>
                            ${cont}
                    \`
                },`);
    }
    
    // Insert after "// Page 5:" comment (which follows reading page)
    const insertMarker = '// Page 5:';
    const insertIdx = html.indexOf(insertMarker);
    if (insertIdx > 0) {
      html = html.substring(0, insertIdx) + additionalPageObjects.join('\n') + '\n                ' + html.substring(insertIdx);
    }
  }
  
  // Add vocab-highlight CSS if missing
  if (!html.includes('.vocab-highlight')) {
    html = html.replace('</style>', `
    .vocab-highlight {
      background: linear-gradient(180deg, transparent 60%, rgba(246, 201, 78, 0.4) 60%);
      padding: 0 2px;
      border-radius: 2px;
      cursor: help;
    }
</style>`);
  }
  
  fs.writeFileSync(fileName, html);
  const vocabStr = vocabWords.length > 0 ? vocabWords.join(', ') : 'none';
  console.log(`  ✅ ${fileName} - ${pages.length} pages, story: ${title}, vocab: [${vocabStr}]`);
  return true;
}

// ── Main ──────────────────────────────────────────────────────
const stories = loadStories();
console.log(`Loaded ${stories.length} Sherlock Holmes stories`);
stories.forEach((s, i) => console.log(`  ${i + 1}. ${s.title} (${s.text.length} chars)`));

const stream = buildStream(stories);
console.log(`Total stream: ${stream.filter(s => s.type === 'para').length} paragraphs`);

// Regular days (skip every 5th = assessment)
function getRegularDays(start, end) {
  const days = [];
  for (let d = start; d <= end; d++) {
    if (d % 5 !== 0) days.push(d);
  }
  return days;
}

// 4th grade: days 121-149
const days4th = getRegularDays(121, 149);
const lessons4th = assignToLessons(buildStream(stories), days4th.length);
console.log(`\n4th grade: ${days4th.length} lessons`);
let count4 = 0;
for (let i = 0; i < days4th.length; i++) {
  const f = `4th-grade-day-${days4th[i]}.html`;
  if (fs.existsSync(f) && injectIntoHtml(f, lessons4th[i], '4th')) count4++;
}

// 6th grade: days 141-159
const days6th = getRegularDays(141, 159);
const lessons6th = assignToLessons(buildStream(stories), days6th.length);
console.log(`\n6th grade: ${days6th.length} lessons`);
let count6 = 0;
for (let i = 0; i < days6th.length; i++) {
  const f = `6th-grade-day-${days6th[i]}.html`;
  if (fs.existsSync(f) && injectIntoHtml(f, lessons6th[i], '6th')) count6++;
}

console.log(`\nDone! Updated ${count4 + count6} files.`);
