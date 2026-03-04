#!/usr/bin/env node

const fs = require('fs');

// Process 4th, 5th, and 6th grade lessons
const grades = ['4th', '5th', '6th'];
let totalFixed = 0;

grades.forEach(grade => {
  const files = fs.readdirSync('.')
    .filter(f => f.startsWith(`${grade}-grade-day-`) && f.endsWith('.html'));
  
  console.log(`\n📚 Processing ${grade} grade (${files.length} files)...`);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the Reading Comprehension page
    const comprehensionMatch = content.match(
      /\/\/ Page \d+: Reading Comprehension\s*\{\s*render: \(\) => `[\s\S]*?`\s*\}/
    );
    
    if (!comprehensionMatch) {
      console.log(`  ⚠️  No comprehension page found in ${file}`);
      return;
    }
    
    const originalPage = comprehensionMatch[0];
    
    // Extract individual questions
    const questionMatches = [...originalPage.matchAll(
      /<div style="margin-bottom: 30px; padding: 20px[^>]*>[\s\S]*?Question (\d+):[\s\S]*?<\/textarea>\s*<\/div>/g
    )];
    
    if (questionMatches.length === 0) {
      console.log(`  ⚠️  No questions found in ${file}`);
      return;
    }
    
    // Create individual pages for each question
    const pageNumber = originalPage.match(/\/\/ Page (\d+):/)[1];
    const individualPages = questionMatches.map((match, index) => {
      const questionNum = index + 1;
      const questionContent = match[0];
      
      return `// Page ${parseInt(pageNumber) + index}: Comprehension Question ${questionNum}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎯 Reading Comprehension</h2>
                            <p style="margin-bottom: 30px;">Question ${questionNum} of ${questionMatches.length}</p>
                            
                            <div style="margin: 30px 0;">
                                ${questionContent}
                            </div>
                        </div>
                    \`
                }`;
    });
    
    // Replace the original comprehension page with individual pages
    const newContent = content.replace(
      originalPage,
      individualPages.join(',\n                \n                ')
    );
    
    fs.writeFileSync(file, newContent);
    totalFixed++;
    
    if (totalFixed % 50 === 0) {
      console.log(`  ✓ Processed ${totalFixed} files...`);
    }
  });
  
  console.log(`  ✅ Done with ${grade} grade!`);
});

console.log(`\n🎉 Successfully split comprehension questions in ${totalFixed} lesson files!`);
console.log(`Each question is now on its own page for better focus.\n`);
