const fs = require('fs');
const path = require('path');

// Add offline-sync.js script to all 4th grade lessons
for (let day = 1; day <= 180; day++) {
    const filename = `4th-grade-day-${day}.html`;
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`Skipping ${filename} - not found`);
        continue;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if already has the offline-sync script
    if (content.includes('offline-sync.js')) {
        console.log(`⏭️  ${filename} - already has offline sync`);
        continue;
    }
    
    // Add offline-sync script after autosave
    content = content.replace(
        /<script src="js\/lesson-autosave.js"><\/script>/,
        `<script src="js/lesson-autosave.js"></script>\n    <script src="js/offline-sync.js"></script>`
    );
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Added offline sync to ${filename}`);
}

console.log('\n🎉 All 4th grade lessons now have offline sync!');
