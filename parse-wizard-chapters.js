const fs = require('fs');

// Read the complete text
const text = fs.readFileSync('/Users/mushu/.openclaw/workspace/wizard-of-oz-complete.txt', 'utf8');

// Clean up entities
const cleaned = text
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&amp;/g, '&');

// Split by chapter headers
const chapters = [];
const chapterRegex = /Chapter (\d+):\s*([^\n]+)\n/g;
let matches = [];
let match;

while ((match = chapterRegex.exec(cleaned)) !== null) {
  matches.push({
    number: parseInt(match[1]),
    title: match[2],
    start: match.index
  });
}

// Extract each chapter
for (let i = 0; i < matches.length; i++) {
  const current = matches[i];
  const next = matches[i + 1];
  const start = current.start;
  const end = next ? next.start : cleaned.length;
  
  const chapterText = cleaned.substring(start, end).trim();
  
  // Remove the chapter header line
  const content = chapterText.replace(/^Chapter \d+:.*\n/, '').trim();
  
  chapters.push({
    number: current.number,
    title: current.title,
    content: content
  });
}

// Save as JSON
fs.writeFileSync('wizard-chapters.json', JSON.stringify(chapters, null, 2));

console.log(`✅ Extracted ${chapters.length} chapters`);
chapters.forEach(ch => {
  console.log(`Chapter ${ch.number}: ${ch.title} (${ch.content.length} chars)`);
});
