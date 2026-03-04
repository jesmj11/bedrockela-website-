#!/usr/bin/env node

const fs = require('fs');

const grades = ['3rd', '4th', '5th', '6th'];
const wordCounts = {
  '3rd': 15,
  '4th': 20,
  '5th': 25,
  '6th': 30
};

let totalFixed = 0;

grades.forEach(grade => {
  const files = fs.readdirSync('.')
    .filter(f => f.startsWith(`${grade}-grade-day-`) && f.endsWith('.html'))
    .filter(f => !f.includes('day-5.html') && !f.includes('day-10.html')); // Skip assessments
  
  console.log(`\n📰 Processing ${grade} grade...`);
  const minWords = wordCounts[grade];
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the Informational Text page
    const infoMatch = content.match(
      /\/\/ Page \d+: Informational Text\s*\{\s*render: \(\) => `[\s\S]*?`\s*\}/
    );
    
    if (!infoMatch) return;
    
    const originalPage = infoMatch[0];
    
    // Extract the article content (everything before the questions div)
    const articleMatch = originalPage.match(
      /<div style="padding: 25px[^>]*>([\s\S]*?)<\/div>\s*<div style="padding: 20px; background: white/
    );
    
    if (!articleMatch) return;
    
    const fullArticle = articleMatch[1];
    
    // Split article into paragraphs
    const paragraphs = fullArticle.split(/<\/p>/).filter(p => p.trim());
    const midpoint = Math.floor(paragraphs.length / 2);
    
    const firstHalf = paragraphs.slice(0, midpoint).join('</p>') + '</p>';
    const secondHalf = paragraphs.slice(midpoint).join('</p>') + '</p>';
    
    // Extract questions
    const questionsMatch = [...originalPage.matchAll(
      /<div style="margin-bottom: 20px;">[\s\S]*?<p style="font-weight: 600[^>]*>(\d+)\. ([^<]+)<\/p>[\s\S]*?<textarea[^>]*id="info-\d+"[\s\S]*?<\/textarea>\s*<\/div>/g
    )];
    
    if (questionsMatch.length === 0) return;
    
    // Get the page number
    const pageNum = parseInt(originalPage.match(/\/\/ Page (\d+):/)[1]);
    
    // Create new pages
    const titleMatch = originalPage.match(/<h3 style="color: #8B4513;">([^<]+)<\/h3>/);
    const title = titleMatch ? titleMatch[1] : 'Informational Text';
    
    const newPages = [
      // Reading page 1
      `// Page ${pageNum}: Informational Text - Reading (Part 1)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📰 Informational Text</h2>
                            <h3 style="color: #8B4513;">${title}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 1 of 2</p>
                            
                            <div style="padding: 25px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;">
                                ${firstHalf}
                            </div>
                        </div>
                    \`
                }`,
      
      // Reading page 2
      `// Page ${pageNum + 1}: Informational Text - Reading (Part 2)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📰 Informational Text</h2>
                            <h3 style="color: #8B4513;">${title}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 2 of 2</p>
                            
                            <div style="padding: 25px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;">
                                ${secondHalf}
                            </div>
                        </div>
                    \`
                }`,
      
      // Question pages
      ...questionsMatch.map((match, index) => {
        const questionNum = index + 1;
        const questionText = match[2];
        const id = `info-${questionNum}`;
        const countId = `word-count-${id}`;
        
        return `// Page ${pageNum + 2 + index}: Informational Text - Question ${questionNum}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📰 Informational Text</h2>
                            <p style="margin-bottom: 30px;">Question ${questionNum} of ${questionsMatch.length}</p>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                <p style="font-weight: 600; margin-bottom: 12px;">${questionNum}. ${questionText}</p>
                                <textarea 
                                  id="${id}"
                                  style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                  oninput="updateWordCount('${id}', '${countId}', ${minWords})"
                                  placeholder="Write your answer here (minimum ${minWords} words)..."
                                ></textarea>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                  <span id="${countId}" style="font-size: 14px; color: #666;">0 / ${minWords} words</span>
                                  <span id="${countId}-status" style="font-size: 14px; font-weight: 600;"></span>
                                </div>
                            </div>
                        </div>
                    \`
                }`;
      })
    ];
    
    // Replace the original page with new pages and renumber everything after
    const afterInfoPage = content.substring(content.indexOf(infoMatch[0]) + infoMatch[0].length);
    const beforeInfoPage = content.substring(0, content.indexOf(infoMatch[0]));
    
    // Renumber subsequent pages (+4 because we added 4 pages)
    const renumbered = afterInfoPage.replace(/\/\/ Page (\d+):/g, (match, num) => {
      return `// Page ${parseInt(num) + 4}:`;
    });
    
    const newContent = beforeInfoPage + newPages.join(',\n                \n                ') + ',' + renumbered;
    
    fs.writeFileSync(file, newContent);
    totalFixed++;
    
    if (totalFixed % 50 === 0) {
      console.log(`  ✓ Processed ${totalFixed} files...`);
    }
  });
  
  console.log(`  ✅ Done with ${grade} grade!`);
});

console.log(`\n🎉 Successfully split informational text in ${totalFixed} lesson files!`);
console.log(`\nChanges:`);
console.log(`  - Article split into 2 reading pages (no scrolling)`);
console.log(`  - 3 questions on individual pages with word count validation`);
console.log(`  - Total: +4 pages per lesson (13 → 17 pages)\n`);
