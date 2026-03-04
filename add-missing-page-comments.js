#!/usr/bin/env node

const fs = require('fs');

const grades = ['3rd', '4th', '5th', '6th'];
let totalFixed = 0;

grades.forEach(grade => {
  const files = fs.readdirSync('.')
    .filter(f => f.startsWith(`${grade}-grade-day-`) && f.endsWith('.html'))
    .filter(f => !f.includes('day-5.html') && !f.includes('day-10.html')); // Skip assessments
  
  console.log(`\n📝 Processing ${grade} grade...`);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Add page comment before Informational Text if missing
    if (content.includes('📰 Informational Text') && !content.match(/\/\/ Page \d+:.*Informational/)) {
      content = content.replace(
        /(\{[\s]*render: \(\) => `[\s]*<div[^>]*>[\s]*<h2>📰 Informational Text<\/h2>)/,
        '// Page 9: Informational Text\n                $1'
      );
      modified = true;
    }
    
    // Add page comment before Grammar if missing
    if (content.includes('✏️ Grammar Workshop') && !content.match(/\/\/ Page \d+:.*Grammar/)) {
      content = content.replace(
        /(\{[\s]*render: \(\) => `[\s]*<div[^>]*>[\s]*<h2>✏️ Grammar Workshop<\/h2>)/,
        '// Page 10: Grammar Workshop\n                $1'
      );
      modified = true;
    }
    
    // Add page comment before Writing if missing
    if (content.includes('Writing') && !content.match(/\/\/ Page \d+:.*Writing/)) {
      content = content.replace(
        /(\{[\s]*render: \(\) => `[\s]*<div[^>]*>[\s]*<h2>💭.*Writing<\/h2>)/,
        '// Page 11: Writing Practice\n                $1'
      );
      modified = true;
    }
    
    // Add page comment before Language Skills if missing
    if (content.includes('🎨 Language Skills') && !content.match(/\/\/ Page \d+:.*Language/)) {
      content = content.replace(
        /(\{[\s]*render: \(\) => `[\s]*<div[^>]*>[\s]*<h2>🎨 Language Skills<\/h2>)/,
        '// Page 12: Language Skills\n                $1'
      );
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(file, content);
      totalFixed++;
    }
  });
  
  console.log(`  ✅ Done with ${grade} grade!`);
});

console.log(`\n✅ Added missing page comments to ${totalFixed} files!\n`);
