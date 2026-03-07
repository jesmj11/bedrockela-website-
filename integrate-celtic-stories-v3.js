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

function extractStoryBody(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    
    // Find where the actual story starts (after the second title repeat)
    let storyStart = 0;
    let titleCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Tale from') && lines[i].includes('Mythology')) {
            titleCount++;
            if (titleCount === 2) {
                storyStart = i + 1;
                break;
            }
        }
    }
    
    // Get the story content
    const storyLines = lines.slice(storyStart);
    return storyLines.join('\n');
}

async function updateCelticLesson(dayNum, storyText) {
    const lessonPath = `/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/celtic/5th-grade-lesson-${dayNum}.html`;
    
    if (!fs.existsSync(lessonPath)) {
        console.log(`⚠️  Lesson file not found: ${lessonPath}`);
        return false;
    }
    
    let html = fs.readFileSync(lessonPath, 'utf8');
    
    // Extract just the story body
    const storyBody = extractStoryBody(storyText);
    
    // Split into paragraphs (each line break is a paragraph)
    const paragraphs = storyBody
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 10); // Filter out very short lines
    
    console.log(`  Story has ${paragraphs.length} paragraphs`);
    
    // Split into 4 roughly equal parts
    const quarter = Math.ceil(paragraphs.length / 4);
    
    const parts = [
        paragraphs.slice(0, quarter),
        paragraphs.slice(quarter, quarter * 2),
        paragraphs.slice(quarter * 2, quarter * 3),
        paragraphs.slice(quarter * 3)
    ];
    
    // Update each reading page (pages 3-6)
    for (let i = 0; i < 4; i++) {
        const pageNum = i + 3;
        
        // Create HTML paragraphs
        const htmlContent = parts[i]
            .map(p => `            <p>${p}</p>`)
            .join('\n');
        
        // Find and replace the reading-text div content for this page
        const regex = new RegExp(
            `(<div class="lesson-page" id="page${pageNum}"[^>]*>[\\s\\S]*?<div class="reading-text">)[\\s\\S]*?(</div>\\s*<div class="page-nav">)`,
            'm'
        );
        
        html = html.replace(regex, `$1\n${htmlContent}\n        $2`);
    }
    
    fs.writeFileSync(lessonPath, html);
    console.log(`✅ Updated Day ${dayNum} with complete story (${paragraphs.length} paragraphs across 4 pages)`);
    return true;
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
        
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n✅ Integration complete! Updated ${successCount} of ${Object.keys(storyFiles).length} lessons.`);
    console.log('\n🔥 Ready to commit and push to GitHub!');
}

main().catch(console.error);
