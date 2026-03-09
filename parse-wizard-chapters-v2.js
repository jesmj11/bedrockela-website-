const fs = require('fs');

// Read the raw docx extraction
const text = fs.readFileSync('/Users/mushu/.openclaw/workspace/wizard-of-oz-complete.txt', 'utf8')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&amp;/g, '&');

// Split on "Chapter N:" pattern
const parts = text.split(/(?=Chapter \d+:)/);

const chapters = [];

parts.forEach((part, idx) => {
  const match = part.match(/^Chapter (\d+):\s*([^\n.]+)/);
  if (match) {
    const num = parseInt(match[1]);
    const title = match[2].trim();
    
    // Remove the chapter header from content
    const content = part.replace(/^Chapter \d+:.*?(?=[A-Z])/, '').trim();
    
    chapters.push({
      number: num,
      title: title,
      content: content
    });
  }
});

// Save
fs.writeFileSync('wizard-chapters.json', JSON.stringify(chapters, null, 2));

console.log(`✅ Extracted ${chapters.length} chapters`);
chapters.forEach(ch => {
  console.log(`Chapter ${ch.number}: ${ch.title} (${(ch.content.length / 1024).toFixed(1)}KB)`);
});
