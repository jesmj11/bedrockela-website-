const fs = require('fs');
const path = require('path');

// Fix all 4th grade day files - replace improperly escaped quotes
for (let day = 1; day <= 180; day++) {
    const filename = `4th-grade-day-${day}.html`;
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`Skipping ${filename} - not found`);
        continue;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Fix the main issue: \\" should be just \"
    // This turns: "text\\" into "text\"  
    content = content.replace(/\\\\"/g, '\\"');
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
}

console.log('\n🎉 All 4th grade lessons fixed!');
