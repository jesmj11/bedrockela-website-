#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

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
    
    // Find where the actual story starts
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
    
    const storyLines = lines.slice(storyStart);
    return storyLines.join('\n');
}

async function main() {
    console.log('🍀 Adding The Children of Lir to Day 54...\n');
    
    const storyPath = '/Users/mushu/Desktop/BedrockELA/5th Grade/celtic/CELTIC_The_Children_of_Lir.docx';
    const lessonPath = '/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/celtic/5th-grade-lesson-54.html';
    
    // Check if this is actually a lesson file (not assessment)
    if (fs.existsSync(lessonPath)) {
        const currentContent = fs.readFileSync(lessonPath, 'utf8');
        if (currentContent.length < 1000) {
            console.log('⚠️  Day 54 appears to be an assessment placeholder (only 784 bytes)');
            console.log('Skipping - Day 54 must be the assessment day.\n');
            console.log('Celtic lessons complete: Days 49, 51, 52, 53 have stories!');
            return;
        }
    }
    
    const storyText = await extractTextFromDocx(storyPath);
    if (!storyText) {
        console.log('❌ Could not extract story text');
        return;
    }
    
    const storyBody = extractStoryBody(storyText);
    const paragraphs = storyBody
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 10);
    
    console.log(`Story has ${paragraphs.length} paragraphs`);
    
    // Split into 4 parts
    const quarter = Math.ceil(paragraphs.length / 4);
    const parts = [
        paragraphs.slice(0, quarter),
        paragraphs.slice(quarter, quarter * 2),
        paragraphs.slice(quarter * 2, quarter * 3),
        paragraphs.slice(quarter * 3)
    ];
    
    let html = fs.readFileSync(lessonPath, 'utf8');
    
    // Update reading pages
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
    console.log(`✅ Updated Day 54 with The Children of Lir (${paragraphs.length} paragraphs)`);
}

main().catch(console.error);
