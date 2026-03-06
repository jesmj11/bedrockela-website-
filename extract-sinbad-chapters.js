#!/usr/bin/env node
const fs = require('fs');

const text = fs.readFileSync('/tmp/sinbad_full.txt', 'utf-8');

// Split by chapter markers
const chapters = {};
const lines = text.split('\n');

let currentChapter = null;
let currentTitle = null;
let currentText = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect chapter start (Chapter X format followed by title)
    if (line.match(/^Chapter \d+$/)) {
        // Save previous chapter
        if (currentChapter && currentTitle && currentText.length > 5) {
            chapters[currentTitle] = currentText.join('\n').trim();
        }
        
        currentChapter = line.trim();
        // Next line should be the title
        currentTitle = lines[i + 1] ? lines[i + 1].trim() : null;
        currentText = [];
        i++; // Skip the title line
        continue;
    }
    
    // Skip the decorative lines
    if (line.match(/^~+$/) || line.match(/^Chapter \d+$/)) {
        continue;
    }
    
    // Collect chapter text
    if (currentChapter && currentTitle) {
        currentText.push(line);
    }
}

// Save last chapter
if (currentChapter && currentTitle && currentText.length > 5) {
    chapters[currentTitle] = currentText.join('\n').trim();
}

console.log(`Extracted ${Object.keys(chapters).length} chapters:`);
Object.keys(chapters).forEach((title, idx) => {
    console.log(`  ${idx + 1}. ${title}`);
});

fs.writeFileSync('./sinbad-chapters.json', JSON.stringify(chapters, null, 2));
console.log('\n✅ Written sinbad-chapters.json');
