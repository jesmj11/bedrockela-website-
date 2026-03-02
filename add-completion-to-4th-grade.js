const fs = require('fs');
const path = require('path');

// Add lesson-completion.js script to all 4th grade lessons
for (let day = 1; day <= 180; day++) {
    const filename = `4th-grade-day-${day}.html`;
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`Skipping ${filename} - not found`);
        continue;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if already has the script
    if (content.includes('lesson-completion.js')) {
        console.log(`⏭️  ${filename} - already has completion script`);
        continue;
    }
    
    // Add Firebase and lesson-completion scripts before the lesson config
    const scriptInsert = `
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    
    <!-- Lesson completion tracking -->
    <script src="js/lesson-completion.js"></script>
    `;
    
    // Insert before the closing </body> tag or before the lesson config script
    content = content.replace(
        /<script src="js\/lesson-viewer.js"><\/script>/,
        `<script src="js/lesson-viewer.js"></script>${scriptInsert}`
    );
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Added completion tracking to ${filename}`);
}

console.log('\n🎉 All 4th grade lessons updated with completion tracking!');
