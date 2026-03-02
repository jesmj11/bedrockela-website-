const fs = require('fs');
const path = require('path');

// Add autosave script to all 4th grade lessons
for (let day = 1; day <= 180; day++) {
    const filename = `4th-grade-day-${day}.html`;
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`Skipping ${filename} - not found`);
        continue;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if already has the autosave script
    if (content.includes('lesson-autosave.js')) {
        console.log(`⏭️  ${filename} - already has autosave`);
        continue;
    }
    
    // Add autosave script after lesson-completion.js
    content = content.replace(
        /<script src="js\/lesson-completion.js"><\/script>/,
        `<script src="js/lesson-completion.js"></script>\n    <script src="js/lesson-autosave.js"></script>`
    );
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Added autosave to ${filename}`);
}

console.log('\n🎉 All 4th grade lessons now have autosave!');
