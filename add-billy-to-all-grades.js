/**
 * Add Billy avatar widget to all grade levels
 */

const fs = require('fs');
const path = require('path');

const grades = ['2nd', '3rd', '4th', '5th', '6th'];

const billyCss = `        /* Billy corner widget - gold circle with speaker */
        .billy-corner-widget {
            position: fixed;
            bottom: 80px;
            right: 30px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
        }
        
        .billy-avatar-circle {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FFD700, #fbbf24);
            padding: 5px;
            box-shadow: 0 4px 12px rgba(176, 104, 33, 0.4);
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .billy-avatar-circle:hover {
            transform: scale(1.05);
        }
        
        .billy-mini-avatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .billy-speak-btn {
            background: #B06821;
            border: none;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            font-size: 22px;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 3px 10px rgba(176, 104, 33, 0.4);
            color: white;
        }
        
        .billy-speak-btn:hover {
            transform: scale(1.1);
            background: #8B5319;
        }
        
        .billy-speak-btn:active {
            transform: scale(0.95);
        }
`;

const billyHtmlCode = `
                // Add Billy avatar if showing Billy
                ${showBilly ? \`
                <div class="billy-corner-widget">
                    <div class="billy-avatar-circle" onclick="speakCurrentPage()">
                        <img src="images/billy-avatar.jpg" alt="Billy" class="billy-mini-avatar">
                    </div>
                    <button class="billy-speak-btn" id="billy-speaker" onclick="speakCurrentPage()" title="Hear Billy's instructions">🔊</button>
                </div>
                \` : ''}`;

for (const grade of grades) {
    const filename = `${grade}-grade-day-1.html`;
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        continue;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if Billy CSS already exists
    if (content.includes('billy-corner-widget')) {
        console.log(`✓ ${filename} already has Billy avatar, skipping...`);
        continue;
    }
    
    // Add Billy CSS after the opening <style> tag
    const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
    if (!styleMatch) {
        console.log(`⚠️  ${filename} has no <style> tag, skipping...`);
        continue;
    }
    
    // Insert Billy CSS at the beginning of the style block
    content = content.replace('<style>', '<style>\n' + billyCss);
    
    // Find where to add Billy HTML widget (in the renderPage function, after lesson page card)
    // Look for pattern: </div>\n            `;
    const insertPattern = /(lesson-page-card[^`]*<\/div>\s*`)/;
    if (!insertPattern.test(content)) {
        console.log(`⚠️  ${filename} doesn't match expected structure, manual check needed`);
        continue;
    }
    
    // Add Billy HTML rendering code
    content = content.replace(
        /(lesson-page-card[^`]*<\/div>)\s*`/,
        '$1' + billyHtmlCode + '\n            `'
    );
    
    // Write the updated file
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Added Billy to ${filename}`);
}

console.log('\n✨ Billy avatar deployment complete!');
