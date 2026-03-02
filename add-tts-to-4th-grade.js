const fs = require('fs');
const path = require('path');

// Add TTS to all 4th grade lessons
for (let day = 1; day <= 180; day++) {
    const filename = `4th-grade-day-${day}.html`;
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`Skipping ${filename} - not found`);
        continue;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if already has TTS
    if (content.includes('text-to-speech.js')) {
        console.log(`⏭️  ${filename} - already has TTS`);
        continue;
    }
    
    // Add TTS script after offline-sync
    content = content.replace(
        /<script src="js\/offline-sync.js"><\/script>/,
        `<script src="js/offline-sync.js"></script>\n    <script src="js/text-to-speech.js"></script>`
    );
    
    // Add TTS button injection after digital book initialization
    // Find the digital book section and add TTS button
    content = content.replace(
        /window\.digitalBookInstance = new DigitalBook\('digital-book-day-(\d+)', bookConfig\);/g,
        (match, dayNum) => {
            return `${match}
                                
                                // Add TTS button for chapter reading
                                setTimeout(() => {
                                    const chapterText = bookConfig.pages.map(p => p.text).join('\\n\\n');
                                    const readingCard = document.querySelector('.lesson-page-card.content-page');
                                    if (readingCard && chapterText && window.addTTSButton) {
                                        // Create TTS container at top of digital book
                                        const ttsContainer = document.createElement('div');
                                        ttsContainer.id = 'tts-container-day-${dayNum}';
                                        ttsContainer.style.cssText = 'margin-bottom: 20px;';
                                        
                                        const bookContainer = document.getElementById('digital-book-day-${dayNum}');
                                        if (bookContainer && bookContainer.parentElement) {
                                            bookContainer.parentElement.insertBefore(ttsContainer, bookContainer);
                                            window.addTTSButton(chapterText, '4th-grade-day-${dayNum}', '#tts-container-day-${dayNum}');
                                        }
                                    }
                                }, 500);`;
        }
    );
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Added TTS to ${filename}`);
}

console.log('\n🎉 All 4th grade lessons now have text-to-speech!');
