#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Story mapping: Day number -> file name
const storyFiles = {
    49: '/Users/mushu/Desktop/BedrockELA/5th Grade/celtic/CELTIC_C_Chulainn_and_the_Champions_Bargain.docx',
    51: '/Users/mushu/Desktop/BedrockELA/5th Grade/celtic/CELTIC_Finn_MacCool_and_the_Salmon_of_Knowledge.docx',
    52: '/Users/mushu/Desktop/BedrockELA/5th Grade/celtic/CELTIC_Pwyll_and_the_Lord_of_the_Otherworld.docx',
    53: '/Users/mushu/Desktop/BedrockELA/5th Grade/celtic/CELTIC_Taliesin_the_Greatest_Bard.docx',
    // Day 50 and 54 are assessments - no story needed
};

async function extractTextFromDocx(filePath) {
    try {
        const { stdout } = await execPromise(`textutil -convert txt -stdout "${filePath}"`);
        return stdout.trim();
    } catch (error) {
        console.error(`Error extracting text from ${filePath}:`, error);
        return null;
    }
}

async function updateCelticLesson(dayNum, storyText) {
    const lessonPath = `/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/celtic/5th-grade-lesson-${dayNum}.html`;
    
    if (!fs.existsSync(lessonPath)) {
        console.log(`⚠️  Lesson file not found: ${lessonPath}`);
        return false;
    }
    
    let html = fs.readFileSync(lessonPath, 'utf8');
    
    // Split story into 4 parts for reading pages (Pages 4-7 in the 11-page structure)
    const paragraphs = storyText.split('\n\n').filter(p => p.trim());
    const quarter = Math.ceil(paragraphs.length / 4);
    
    const parts = [
        paragraphs.slice(0, quarter).join('\n\n'),
        paragraphs.slice(quarter, quarter * 2).join('\n\n'),
        paragraphs.slice(quarter * 2, quarter * 3).join('\n\n'),
        paragraphs.slice(quarter * 3).join('\n\n')
    ];
    
    // Find and replace placeholder story text in pages 4-7
    // Looking for the reading section divs
    let updated = false;
    
    for (let i = 0; i < 4; i++) {
        const pageNum = i + 4;
        const partNum = i + 1;
        
        // Create properly formatted HTML paragraphs
        const htmlParagraphs = parts[i]
            .split('\n\n')
            .map(p => `                <p>${p}</p>`)
            .join('\n');
        
        // Find the reading page div and update its content
        const pageRegex = new RegExp(
            `(<div class="lesson-page" id="page${pageNum}"[^>]*>.*?<div class="reading-text">)([\\s\\S]*?)(</div>\\s*<div class="page-nav">)`,
            'g'
        );
        
        html = html.replace(pageRegex, (match, before, content, after) => {
            updated = true;
            return `${before}\n${htmlParagraphs}\n            ${after}`;
        });
    }
    
    if (updated) {
        fs.writeFileSync(lessonPath, html);
        console.log(`✅ Updated Day ${dayNum} with story text`);
        return true;
    } else {
        console.log(`⚠️  Could not find reading pages in Day ${dayNum}`);
        return false;
    }
}

async function main() {
    console.log('🍀 Integrating Celtic mythology stories into lessons...\n');
    
    let successCount = 0;
    
    for (const [dayNum, filePath] of Object.entries(storyFiles)) {
        console.log(`Processing Day ${dayNum}...`);
        
        const storyText = await extractTextFromDocx(filePath);
        
        if (storyText) {
            const success = await updateCelticLesson(parseInt(dayNum), storyText);
            if (success) successCount++;
        }
    }
    
    console.log(`\n✅ Integration complete! Updated ${successCount} of ${Object.keys(storyFiles).length} lessons.`);
}

main().catch(console.error);
