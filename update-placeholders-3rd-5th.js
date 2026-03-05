#!/usr/bin/env node
/**
 * Update 3rd and 5th grade placeholder reading pages to match the final format:
 * - 11px font, line-height 1.2, padding 15px
 * - 5 pages structure with headers only on page 1
 * - Ready to receive actual book text
 */

const fs = require('fs');

const grades = ['3rd', '5th'];

// Map of books for each grade (from curriculum)
const gradeBooks = {
  '3rd': [
    { days: '1-30', title: 'Charlotte\'s Web', author: 'E.B. White' },
    { days: '31-60', title: 'The Tale of Despereaux', author: 'Kate DiCamillo' },
    { days: '61-90', title: 'James and the Giant Peach', author: 'Roald Dahl' },
    { days: '91-120', title: 'The Indian in the Cupboard', author: 'Lynne Reid Banks' },
    { days: '121-150', title: 'Pippi Longstocking', author: 'Astrid Lindgren' },
    { days: '151-180', title: 'The Secret Garden', author: 'Frances Hodgson Burnett' }
  ],
  '5th': [
    { days: '1-30', title: 'The Adventures of Robin Hood', author: 'Howard Pyle' },
    { days: '31-60', title: 'King Arthur and His Knights', author: 'Howard Pyle' },
    { days: '61-90', title: 'Around the World in 80 Days', author: 'Jules Verne' },
    { days: '91-120', title: 'Frankenstein', author: 'Mary Shelley' },
    { days: '121-150', title: 'Dracula', author: 'Bram Stoker' },
    { days: '151-180', title: 'Greek & Norse Mythology', author: 'Various' }
  ]
};

function getBookForDay(grade, day) {
  const books = gradeBooks[grade];
  for (const book of books) {
    const [start, end] = book.days.split('-').map(n => parseInt(n));
    if (day >= start && day <= end) {
      return book;
    }
  }
  return { title: 'Classic Literature', author: 'Various' };
}

for (const grade of grades) {
  console.log(`\n=== Processing ${grade} grade ===`);
  let updated = 0;

  for (let day = 1; day <= 180; day++) {
    const file = `${grade}-grade-day-${day}.html`;
    if (!fs.existsSync(file)) continue;
    
    let html = fs.readFileSync(file, 'utf8');
    
    // Find the placeholder reading page
    const placeholderRegex = /(\/\/ Page \d+: Literature Reading \(placeholder[^\)]*\)[\s\S]*?\{[\s\S]*?render: \(\) => `[\s\S]*?<div class="lesson-page-card content-page">)([\s\S]*?)(<\/div>\s*`\s*\},)/;
    
    const match = html.match(placeholderRegex);
    if (!match) continue;
    
    const book = getBookForDay(grade, day);
    const chapterNum = ((day - 1) % 30) + 1; // 1-30 for each book
    
    // Create 5 placeholder pages with correct format
    let replacementPages = '';
    for (let pageNum = 1; pageNum <= 5; pageNum++) {
      const isFirstPage = pageNum === 1;
      
      replacementPages += `
                // Reading Page ${pageNum} of 5 (Placeholder - awaiting book text)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            ${isFirstPage ? `<h2>Reading: ${book.title}</h2>
                            <h3 style="color: var(--book-color, #305853);">Chapter ${chapterNum}</h3>
                            ` : ''}<p style="font-size: 14px; color: #666; margin-bottom: 15px;">Page ${pageNum} of 5</p>
                            
                            <div style="padding: 15px; background: #f9f9f9; border-radius: 12px; line-height: 1.2; font-size: 11px;" class="reading-passage">
                                <p style="margin-bottom: 15px; line-height: 1.2; color: #999; font-style: italic;">
                                    📚 Placeholder for ${book.title} - Chapter ${chapterNum}, Part ${pageNum}
                                </p>
                                <p style="margin-bottom: 15px; line-height: 1.2; color: #999;">
                                    This page will contain approximately 500 words from the chapter when book text is integrated.
                                    The formatting is ready: 11px font, line-height 1.2, ~5 pages per chapter.
                                </p>
                                ${pageNum === 1 ? `<p style="margin-bottom: 15px; line-height: 1.2; color: #666; font-weight: 600;">
                                    Book: ${book.title} by ${book.author}
                                </p>` : ''}
                            </div>
                            
                        </div>
                    \`
                },
`;
    }
    
    // Replace the single placeholder page with 5 formatted pages
    const before = match[1];
    const after = match[3];
    const startIndex = html.indexOf(match[0]);
    const endIndex = startIndex + match[0].length;
    
    html = html.substring(0, startIndex) + replacementPages + html.substring(endIndex);
    
    fs.writeFileSync(file, html);
    updated++;
  }
  
  console.log(`✅ ${grade} grade: ${updated} files updated with formatted placeholders`);
}

console.log('\n🎉 Placeholders ready for book content!');
