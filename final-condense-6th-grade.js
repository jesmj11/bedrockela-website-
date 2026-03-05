#!/usr/bin/env node
/**
 * Final condensation: ~550 words/page to get ~5 pages per chapter
 * Font 11px, line-height 1.2, accept scrolling
 */

const fs = require('fs');

const MAX_WORDS_PER_PAGE = 550;

function splitIntoParagraphs(text) {
  return text.match(/<p[^>]*>[\s\S]*?<\/p>/g) || [];
}

function countWords(text) {
  return text.replace(/<[^>]+>/g, '').trim().split(/\s+/).length;
}

function createPages(paragraphs, maxWordsPerPage) {
  const pages = [];
  let currentPage = [];
  let currentWordCount = 0;
  
  for (const p of paragraphs) {
    const pWords = countWords(p);
    
    if (currentWordCount + pWords > maxWordsPerPage && currentPage.length > 0) {
      pages.push(currentPage.join('\n'));
      currentPage = [p];
      currentWordCount = pWords;
    } else {
      currentPage.push(p);
      currentWordCount += pWords;
    }
  }
  
  if (currentPage.length > 0) {
    pages.push(currentPage.join('\n'));
  }
  
  return pages;
}

let totalUpdated = 0;

for (let day = 1; day <= 180; day++) {
  const file = `6th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  
  const readingPageRegex = /(\/\/ Reading Page \d+ of \d+\s*\{[\s\S]*?render: \(\) => `[\s\S]*?<div class="lesson-page-card content-page">)[\s\S]*?(<p style="font-size: 14px; color: #666; margin-bottom: 15px;">)Page \d+ of (\d+)(<\/p>[\s\S]*?<div[^>]*class="reading-passage"[^>]*>\s*)([\s\S]*?)(\s*<\/div>[\s\S]*?`[\s\S]*?\},)/g;
  
  const matches = [...html.matchAll(readingPageRegex)];
  if (matches.length === 0) continue;
  
  let allParagraphs = [];
  let bookTitle = '';
  let chapterTitle = '';
  
  const firstPageMatch = html.match(/<h2>Reading: ([^<]+)<\/h2>\s*<h3[^>]*>(Chapter \d+[^<]*)<\/h3>/);
  if (firstPageMatch) {
    bookTitle = firstPageMatch[1];
    chapterTitle = firstPageMatch[2];
  }
  
  matches.forEach(match => {
    const pageContent = match[5];
    const paragraphs = splitIntoParagraphs(pageContent);
    allParagraphs.push(...paragraphs);
  });
  
  if (allParagraphs.length === 0 || !bookTitle) continue;
  
  const newPages = createPages(allParagraphs, MAX_WORDS_PER_PAGE);
  
  console.log(`Day ${day}: ${matches.length} pages → ${newPages.length} pages`);
  
  let replacementPages = '';
  newPages.forEach((pageContent, idx) => {
    const pageNum = idx + 1;
    const isFirstPage = pageNum === 1;
    
    replacementPages += `
                // Reading Page ${pageNum} of ${newPages.length}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            ${isFirstPage ? `<h2>Reading: ${bookTitle}</h2>
                            <h3 style="color: var(--book-color, #305853);">${chapterTitle}</h3>
                            ` : ''}<p style="font-size: 14px; color: #666; margin-bottom: 15px;">Page ${pageNum} of ${newPages.length}</p>
                            
                            <div style="padding: 15px; background: #f9f9f9; border-radius: 12px; line-height: 1.2; font-size: 11px;" class="reading-passage">
                                ${pageContent}
                            </div>
                            
                        </div>
                    \`
                },
`;
  });
  
  const firstPageMatch2 = html.match(/\/\/ Reading Page 1 of \d+/);
  const lastPageIndex = matches[matches.length - 1].index + matches[matches.length - 1][0].length;
  
  if (firstPageMatch2) {
    const startIndex = html.indexOf(firstPageMatch2[0]);
    html = html.substring(0, startIndex) + replacementPages + html.substring(lastPageIndex);
    fs.writeFileSync(file, html);
    totalUpdated++;
  }
}

console.log(`\n✅ Total: ${totalUpdated} files updated (~550 words/page, 11px font, line-height 1.2)`);
