#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Story mapping based on the JSON structure
const storyFiles = {
    56: '/Users/mushu/Desktop/BedrockELA/5th Grade/egypt/EGYPTIAN_Horus_and_the_Battle_for_Egypt.docx',
    57: '/Users/mushu/Desktop/BedrockELA/5th Grade/egypt/EGYPTIAN_Osiris_Isis_and_the_Trickery_of_Set.docx',
    58: '/Users/mushu/Desktop/BedrockELA/5th Grade/egypt/EGYPTIAN_Ra_and_the_Secret_Name.docx',
    // Note: The Story of Sinuhe is day 59 in the JSON, but Egyptian unit is only 55-58
    // Day 55 appears to be an assessment based on the curriculum structure
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
        if (lines[i].includes('Tale from') || lines[i].includes('Egyptian Mythology')) {
            titleCount++;
            if (titleCount >= 2) {
                storyStart = i + 1;
                break;
            }
        }
    }
    
    // Get the story content
    const storyLines = lines.slice(storyStart);
    return storyLines.join('\n');
}

async function updateEgyptianLesson(dayNum, storyText) {
    const lessonPath = `/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/egyptian/5th-grade-lesson-${dayNum}.html`;
    
    if (!fs.existsSync(lessonPath)) {
        console.log(`⚠️  Lesson file not found: ${lessonPath}`);
        return false;
    }
    
    // Check if it's an assessment (very small file)
    const currentContent = fs.readFileSync(lessonPath, 'utf8');
    if (currentContent.length < 1000) {
        console.log(`⚠️  Day ${dayNum} appears to be an assessment placeholder`);
        return false;
    }
    
    // Extract just the story body
    const storyBody = extractStoryBody(storyText);
    
    // Split into paragraphs
    const paragraphs = storyBody
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 10);
    
    console.log(`  Story has ${paragraphs.length} paragraphs`);
    
    // Split into 4 roughly equal parts
    const quarter = Math.ceil(paragraphs.length / 4);
    
    const parts = [
        paragraphs.slice(0, quarter),
        paragraphs.slice(quarter, quarter * 2),
        paragraphs.slice(quarter * 2, quarter * 3),
        paragraphs.slice(quarter * 3)
    ];
    
    let html = currentContent;
    
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
    console.log('🔺 Integrating Egyptian mythology stories into lessons...\n');
    
    let successCount = 0;
    
    for (const [dayNum, filePath] of Object.entries(storyFiles)) {
        console.log(`Processing Day ${dayNum}...`);
        
        const storyText = await extractTextFromDocx(filePath);
        
        if (storyText) {
            const success = await updateEgyptianLesson(parseInt(dayNum), storyText);
            if (success) successCount++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n✅ Integration complete! Updated ${successCount} of ${Object.keys(storyFiles).length} lessons.`);
    console.log('\n🔥 Ready to commit and push to GitHub!');
}

main().catch(console.error);
