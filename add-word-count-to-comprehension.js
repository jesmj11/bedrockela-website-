#!/usr/bin/env node

const fs = require('fs');

// Word count minimums by grade (aligned to CCSS)
const wordCounts = {
  '3rd': 20,
  '4th': 30,
  '5th': 40,
  '6th': 50
};

let totalFixed = 0;

Object.entries(wordCounts).forEach(([grade, minWords]) => {
  const files = fs.readdirSync('.')
    .filter(f => f.startsWith(`${grade}-grade-day-`) && f.endsWith('.html'));
  
  console.log(`\n📝 Processing ${grade} grade (${minWords} word minimum)...`);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Find comprehension question textareas and add word count
    // Pattern: comp-1, comp-2, comp-3 IDs in comprehension questions
    const updated = content.replace(
      /<textarea\s+id="comp-(\d+)"[^>]*>[\s\S]*?<\/textarea>/g,
      (match, questionNum) => {
        // Skip if already has oninput="updateWordCount"
        if (match.includes('updateWordCount')) {
          return match;
        }
        
        modified = true;
        const id = `comp-${questionNum}`;
        const countId = `word-count-comp-${questionNum}`;
        
        return `<textarea 
                                      id="${id}"
                                      style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                      oninput="updateWordCount('${id}', '${countId}', ${minWords})"
                                      placeholder="Write your answer here (minimum ${minWords} words)..."
                                    ></textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                      <span id="${countId}" style="font-size: 14px; color: #666;">0 / ${minWords} words</span>
                                      <span id="${countId}-status" style="font-size: 14px; font-weight: 600;"></span>
                                    </div>`;
      }
    );
    
    if (modified) {
      fs.writeFileSync(file, updated);
      totalFixed++;
      
      if (totalFixed % 50 === 0) {
        console.log(`  ✓ Processed ${totalFixed} files...`);
      }
    }
  });
  
  console.log(`  ✅ Done with ${grade} grade!`);
});

console.log(`\n🎉 Successfully added word count validation to ${totalFixed} lesson files!`);
console.log(`\nWord count minimums by grade:`);
Object.entries(wordCounts).forEach(([grade, count]) => {
  console.log(`  ${grade} grade: ${count} words`);
});
console.log();
