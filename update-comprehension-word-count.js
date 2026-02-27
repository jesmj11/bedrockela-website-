#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Update all lesson files to include word count on comprehension questions
 */

const grades = ['1st', '4th', '6th'];
const minWords = 30;

function updateLesson(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Pattern 1: Find comprehension question textareas without word count
    const pattern1 = /<p style="font-weight: 700; margin-bottom: 10px;">(\d+)\. ([^<]+)<\/p>\s*<textarea style="([^"]+)">/g;
    
    if (content.match(pattern1)) {
      content = content.replace(pattern1, (match, num, question, style) => {
        const id = `question-${num}`;
        const countId = `word-count-${num}`;
        modified = true;
        
        return `<p style="font-weight: 700; margin-bottom: 10px;">${num}. ${question}</p>
                    <textarea 
                      id="${id}"
                      style="${style}" 
                      oninput="updateWordCount('${id}', '${countId}', ${minWords})"
                      placeholder="Write your answer here (minimum ${minWords} words)..."
                    >`;
      });
      
      // Add word count displays after each textarea
      const textareaPattern = /<textarea[^>]*id="question-(\d+)"[^>]*><\/textarea>/g;
      content = content.replace(textareaPattern, (match, num) => {
        const countId = `word-count-${num}`;
        return match + `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                      <span id="${countId}" style="font-size: 14px; color: #666;">0 / ${minWords} words</span>
                      <span id="${countId}-status" style="font-size: 14px; font-weight: 600;"></span>
                    </div>`;
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

let totalUpdated = 0;
let totalProcessed = 0;

console.log('🔄 Updating comprehension questions with word count validation...\n');

grades.forEach(grade => {
  console.log(`\n📚 Processing ${grade} grade lessons...`);
  
  // Find all lesson files for this grade
  const files = fs.readdirSync('.').filter(f => 
    f.startsWith(`${grade}-grade-day-`) && f.endsWith('.html')
  );
  
  let gradeUpdated = 0;
  
  files.forEach(file => {
    totalProcessed++;
    if (updateLesson(file)) {
      gradeUpdated++;
      totalUpdated++;
      if (gradeUpdated <= 5) { // Show first 5
        console.log(`  ✅ ${file}`);
      }
    }
  });
  
  if (gradeUpdated > 5) {
    console.log(`  ... and ${gradeUpdated - 5} more`);
  }
  
  console.log(`  Total: ${gradeUpdated}/${files.length} lessons updated`);
});

console.log(`\n🎉 Complete! Updated ${totalUpdated} of ${totalProcessed} lessons`);
console.log(`\nWord count features:`);
console.log(`  - Minimum ${minWords} words required`);
console.log(`  - Live word count display`);
console.log(`  - Visual feedback (color changes)`);
console.log(`  - Status messages ("X more words needed" / "✅ Great job!")`);
