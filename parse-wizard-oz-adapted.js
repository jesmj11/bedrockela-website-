const fs = require('fs');

// Read the adapted book
const bookText = fs.readFileSync('./books/wizard-of-oz-4th-adapted.txt', 'utf8');

// Split into chapters
const chapterRegex = /Chapter (\d+): (.+?)\n\n([\s\S]+?)(?=Chapter \d+:|$)/g;
const chapters = [];

let match;
while ((match = chapterRegex.exec(bookText)) !== null) {
  chapters.push({
    chapter: parseInt(match[1]),
    title: match[2].trim(),
    content: match[3].trim()
  });
}

console.log(`📖 Found ${chapters.length} chapters in adapted Wizard of Oz\n`);

chapters.forEach(ch => {
  const preview = ch.content.substring(0, 100).replace(/\n/g, ' ');
  console.log(`Chapter ${ch.chapter}: ${ch.title}`);
  console.log(`  Preview: ${preview}...`);
  console.log(`  Length: ${ch.content.length} chars\n`);
});

// Save to JSON
fs.writeFileSync(
  './book-data/wizard-of-oz-4th-chapters.json',
  JSON.stringify(chapters, null, 2)
);

console.log('✅ Saved to book-data/wizard-of-oz-4th-chapters.json');
console.log('\n🎯 Next: Run your generator to rebuild all lessons with adapted content!');
