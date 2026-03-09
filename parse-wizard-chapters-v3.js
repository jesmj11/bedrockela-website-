const fs = require('fs');

const text = fs.readFileSync('/Users/mushu/.openclaw/workspace/wizard-of-oz-complete.txt', 'utf8')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&amp;/g, '&');

// Extract chapters using a better regex
const chapters = [];
const chapterMatches = [...text.matchAll(/Chapter (\d+):\s*([^.!?]+[.!?])/g)];

chapterMatches.forEach((match, idx) => {
  const num = parseInt(match[1]);
  const fullTitle = match[2].trim();
  
  // The title is just the first sentence
  const titleMatch = fullTitle.match(/^([A-Za-z\s']+)/);
  const title = titleMatch ? titleMatch[1].trim() : fullTitle;
  
  // Find content between this chapter and the next
  const startIdx = match.index + match[0].length;
  const nextMatch = chapterMatches[idx + 1];
  const endIdx = nextMatch ? nextMatch.index : text.length;
  
  const content = text.substring(startIdx, endIdx).trim();
  
  chapters.push({ number: num, title, content });
});

fs.writeFileSync('wizard-chapters.json', JSON.stringify(chapters, null, 2));

console.log(`✅ Extracted ${chapters.length} chapters`);
chapters.forEach(ch => console.log(`Chapter ${ch.number}: "${ch.title}" (${(ch.content.length/1024).toFixed(1)}KB)`));
