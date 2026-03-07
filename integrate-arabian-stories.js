#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Story files mapping to correct day numbers (Days 41-48)
const storyFiles = {
    41: '/Users/mushu/Desktop/BedrockELA/5th Grade/arabian/ARABIAN_Aladdin_and_the_Magic_Lamp.docx',
    42: '/Users/mushu/Desktop/BedrockELA/5th Grade/arabian/ARABIAN_Ali_Baba_and_the_Forty_Thieves.docx',
    43: '/Users/mushu/Desktop/BedrockELA/5th Grade/arabian/ARABIAN_Ali_Cogia_the_Merchant_of_Baghdad.docx',
    44: '/Users/mushu/Desktop/BedrockELA/5th Grade/arabian/ARABIAN_Sinbad_and_the_Valley_of_Diamonds.docx',
    // Day 45 is assessment
    46: '/Users/mushu/Desktop/BedrockELA/5th Grade/arabian/ARABIAN_The_Ebony_Horse.docx',
    47: '/Users/mushu/Desktop/BedrockELA/5th Grade/arabian/ARABIAN_The_Fisherman_and_the_Genie.docx',
    48: '/Users/mushu/Desktop/BedrockELA/5th Grade/arabian/ARABIAN_The_Three_Princes_and_Princess_Nouronnihar.docx',
};

// Old to new day number mapping
const renumberMap = {
    181: 41,
    182: 42,
    183: 43,
    184: 44,
    185: 45, // Assessment
    186: 46,
    187: 47,
    188: 48,
    // Days 189-190 extras - won't use
};

async function extractTextFromDocx(filePath) {
    try {
        const { stdout } = await execPromise(`textutil -convert txt -stdout "${filePath}"`);
        return stdout.trim();
    } catch (error) {
        console.error(`Error extracting text:`, error);
        return null;
    }
}

function extractStoryBody(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    
    let storyStart = 0;
    let titleCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Tale from') || lines[i].includes('Arabian')) {
            titleCount++;
            if (titleCount >= 2) {
                storyStart = i + 1;
                break;
            }
        }
    }
    
    const storyLines = lines.slice(storyStart);
    return storyLines.join('\n');
}

async function renumberArabianLessons() {
    console.log('📝 Renumbering Arabian lessons from 181-190 to 41-48...\n');
    
    const oldDir = '/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/arabian';
    
    for (const [oldNum, newNum] of Object.entries(renumberMap)) {
        if (parseInt(oldNum) > 188) continue; // Skip extras
        
        const oldPath = `${oldDir}/day-${oldNum}.html`;
        const newPath = `${oldDir}/5th-grade-lesson-${newNum}.html`;
        
        if (fs.existsSync(oldPath)) {
            let content = fs.readFileSync(oldPath, 'utf8');
            
            // Update internal references
            content = content.replace(new RegExp(`Day ${oldNum}`, 'g'), `Day ${newNum}`);
            content = content.replace(new RegExp(`day-${oldNum}`, 'g'), `day-${newNum}`);
            
            fs.writeFileSync(newPath, content);
            fs.unlinkSync(oldPath); // Remove old file
            console.log(`✅ Renamed day-${oldNum}.html → 5th-grade-lesson-${newNum}.html`);
        }
    }
}

async function updateArabianLesson(dayNum, storyText) {
    const lessonPath = `/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/arabian/5th-grade-lesson-${dayNum}.html`;
    
    if (!fs.existsSync(lessonPath)) {
        console.log(`⚠️  Lesson file not found: ${lessonPath}`);
        return false;
    }
    
    const currentContent = fs.readFileSync(lessonPath, 'utf8');
    if (currentContent.length < 1000) {
        console.log(`⚠️  Day ${dayNum} appears to be an assessment`);
        return false;
    }
    
    const storyBody = extractStoryBody(storyText);
    const paragraphs = storyBody
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 10);
    
    console.log(`  Story has ${paragraphs.length} paragraphs`);
    
    const quarter = Math.ceil(paragraphs.length / 4);
    const parts = [
        paragraphs.slice(0, quarter),
        paragraphs.slice(quarter, quarter * 2),
        paragraphs.slice(quarter * 2, quarter * 3),
        paragraphs.slice(quarter * 3)
    ];
    
    let html = currentContent;
    
    for (let i = 0; i < 4; i++) {
        const pageNum = i + 3;
        const htmlContent = parts[i].map(p => `            <p>${p}</p>`).join('\n');
        
        const regex = new RegExp(
            `(<div class="lesson-page" id="page${pageNum}"[^>]*>[\\s\\S]*?<div class="reading-text">)[\\s\\S]*?(</div>\\s*<div class="page-nav">)`,
            'm'
        );
        
        html = html.replace(regex, `$1\n${htmlContent}\n        $2`);
    }
    
    fs.writeFileSync(lessonPath, html);
    console.log(`✅ Updated Day ${dayNum} with complete story (${paragraphs.length} paragraphs)`);
    return true;
}

async function main() {
    console.log('📚 Integrating Arabian Nights stories...\n');
    
    // Step 1: Renumber files
    await renumberArabianLessons();
    
    console.log('\n🔮 Adding story content...\n');
    
    // Step 2: Add story content
    let successCount = 0;
    
    for (const [dayNum, filePath] of Object.entries(storyFiles)) {
        console.log(`Processing Day ${dayNum}...`);
        
        const storyText = await extractTextFromDocx(filePath);
        
        if (storyText) {
            const success = await updateArabianLesson(parseInt(dayNum), storyText);
            if (success) successCount++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n✅ Integration complete! Updated ${successCount} of ${Object.keys(storyFiles).length} lessons.`);
    console.log('\n🔥 Ready to commit and push to GitHub!');
}

main().catch(console.error);
