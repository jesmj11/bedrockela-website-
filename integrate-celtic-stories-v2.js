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

function cleanStoryText(text) {
    // Remove the title header blocks (they appear twice in each file)
    const lines = text.split('\n');
    const cleanedLines = [];
    let skipCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip title header sections (they repeat)
        if (line === 'Celtic Mythology' || 
            line.includes('A Tale from') ||
            line.includes('Retold for Young Readers')) {
            skipCount++;
            if (skipCount <= 6) continue; // Skip first two header blocks
        }
        
        cleanedLines.push(lines[i]);
    }
    
    return cleanedLines.join('\n').trim();
}

async function updateCelticLesson(dayNum, storyText) {
    const lessonPath = `/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/celtic/5th-grade-lesson-${dayNum}.html`;
    
    if (!fs.existsSync(lessonPath)) {
        console.log(`⚠️  Lesson file not found: ${lessonPath}`);
        return false;
    }
    
    let html = fs.readFileSync(lessonPath, 'utf8');
    
    // Clean the story text
    const cleaned = cleanStoryText(storyText);
    
    // Split story into 4 parts for reading pages
    const paragraphs = cleaned.split('\n\n').filter(p => p.trim() && p.trim().length > 20);
    const quarter = Math.ceil(paragraphs.length / 4);
    
    const parts = [
        paragraphs.slice(0, quarter).join('\n\n'),
        paragraphs.slice(quarter, quarter * 2).join('\n\n'),
        paragraphs.slice(quarter * 2, quarter * 3).join('\n\n'),
        paragraphs.slice(quarter * 3).join('\n\n')
    ];
    
    // Update each reading page (pages 3-6)
    for (let i = 0; i < 4; i++) {
        const pageNum = i + 3; // Pages 3, 4, 5, 6
        const partNum = i + 1;
        
        // Create HTML paragraphs
        const htmlContent = parts[i]
            .split('\n\n')
            .map(p => `            <p>${p.trim()}</p>`)
            .join('\n');
        
        // Find and replace the reading-text div content
        const regex = new RegExp(
            `(<div class="lesson-page" id="page${pageNum}"[^>]*>[\\s\\S]*?<div class="reading-text">)[\\s\\S]*?(</div>\\s*<div class="page-nav">)`,
            'm'
        );
        
        html = html.replace(regex, `$1\n${htmlContent}\n        $2`);
    }
    
    fs.writeFileSync(lessonPath, html);
    console.log(`✅ Updated Day ${dayNum} with complete story text (${paragraphs.length} paragraphs)`);
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
        
        // Small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n✅ Integration complete! Updated ${successCount} of ${Object.keys(storyFiles).length} lessons.`);
    console.log('\n🔥 Ready to commit and push to GitHub!');
}

main().catch(console.error);
