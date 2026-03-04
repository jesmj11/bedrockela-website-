#!/usr/bin/env node

const fs = require('fs');

const grades = ['3rd', '4th', '5th', '6th'];
let totalFixed = 0;

grades.forEach(grade => {
  const files = fs.readdirSync('.')
    .filter(f => f.startsWith(`${grade}-grade-day-`) && f.endsWith('.html'));
  
  console.log(`\n📚 Processing ${grade} grade...`);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the pages array
    const pagesMatch = content.match(/pages: \[([\s\S]*?)\]\s*};/);
    if (!pagesMatch) {
      console.log(`  ⚠️  No pages array found in ${file}`);
      return;
    }
    
    const pagesContent = pagesMatch[1];
    
    // Split into individual page objects
    const pages = [];
    let depth = 0;
    let currentPage = '';
    
    for (let i = 0; i < pagesContent.length; i++) {
      const char = pagesContent[i];
      currentPage += char;
      
      if (char === '{') depth++;
      if (char === '}') depth--;
      
      // End of a page object
      if (depth === 0 && char === '}' && pagesContent[i + 1] === ',') {
        pages.push(currentPage.trim());
        currentPage = '';
        i++; // Skip the comma
      }
    }
    
    // Add the last page (no trailing comma)
    if (currentPage.trim() && currentPage.trim() !== ',') {
      pages.push(currentPage.trim());
    }
    
    // Identify page types
    const pageTypes = pages.map(page => {
      if (page.includes('title-page')) return 'title';
      if (page.includes('Learning Objectives')) return 'objectives';
      if (page.includes('Vocabulary')) return 'vocabulary';
      if (page.includes('Literature Reading') || page.includes('📖 Reading')) return 'literature';
      if (page.includes('Comprehension Question')) return 'comprehension';
      if (page.includes('Journal Reflection')) return 'journal';
      if (page.includes('Informational Text')) return 'informational';
      if (page.includes('Grammar Workshop')) return 'grammar';
      if (page.includes('Writing Practice')) return 'writing';
      if (page.includes('Language Skills')) return 'language';
      if (page.includes('Great Job') || page.includes('Excellent Work')) return 'completion';
      return 'other';
    });
    
    // Reorder: move completion to the end
    const completionIndex = pageTypes.indexOf('completion');
    if (completionIndex !== -1 && completionIndex !== pages.length - 1) {
      const completionPage = pages.splice(completionIndex, 1)[0];
      pages.push(completionPage);
      
      // Renumber all pages
      const renumbered = pages.map((page, index) => {
        return page.replace(/\/\/ Page \d+:/, `// Page ${index + 1}:`);
      });
      
      // Rebuild the pages array
      const newPagesContent = renumbered.join(',\n                \n                ');
      const newContent = content.replace(pagesMatch[0], `pages: [\n                ${newPagesContent}\n            ]\n        };`);
      
      fs.writeFileSync(file, newContent);
      totalFixed++;
      
      if (totalFixed % 50 === 0) {
        console.log(`  ✓ Processed ${totalFixed} files...`);
      }
    }
  });
  
  console.log(`  ✅ Done with ${grade} grade!`);
});

console.log(`\n🎉 Successfully reordered ${totalFixed} lesson files!`);
console.log(`Completion page is now the LAST page in every lesson.\n`);
