const fs = require('fs');

// Read the new adapted Wizard of Oz text
const text = fs.readFileSync('./books/wizard-of-oz-4th-adapted-NEW.txt', 'utf8');

// Split into chapters
const chapters = [];
const chapterRegex = /Chapter (\d+): (.+?)\n\n([\s\S]+?)(?=\nChapter \d+:|$)/g;

let match;
while ((match = chapterRegex.exec(text)) !== null) {
  const chapterNum = parseInt(match[1]);
  const title = match[2].trim();
  const content = match[3].trim();
  
  chapters.push({
    chapter: chapterNum,
    title: title,
    content: content
  });
}

console.log(`Parsed ${chapters.length} chapters from new Wizard of Oz adaptation`);

// Save to JSON
fs.writeFileSync('./book-data/wizard-of-oz-4th-chapters.json', JSON.stringify(chapters, null, 2), 'utf8');

console.log('✅ Saved to book-data/wizard-of-oz-4th-chapters.json');
console.log('\nChapters:');
chapters.forEach(ch => {
  console.log(`  ${ch.chapter}. ${ch.title} (${ch.content.length} chars)`);
});
