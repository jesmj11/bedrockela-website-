#!/usr/bin/env node
/**
 * Re-paginate 6th grade book chapters into smaller chunks (150 words max per page)
 * to prevent internal scrolling
 */

const fs = require('fs');

const MAX_WORDS_PER_PAGE = 150;

function splitIntoParagraphs(text) {
  // Split by <p> tags
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
    
    // If adding this paragraph would exceed max, start new page
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
  let changed = false;
  
  // Find all reading pages
  const readingPageRegex = /(\/\/ Reading Page \d+ of \d+\s*\{[\s\S]*?render: \(\) => `[\s\S]*?<h2>Reading: [^<]+<\/h2>\s*<h3[^>]*>Chapter \d+: [^<]+<\/h3>\s*<p[^>]*>)Page \d+ of (\d+)(<\/p>[\s\S]*?<div[^>]*class="reading-passage">\s*)([\s\S]*?)(\s*<\/div>[\s\S]*?`[\s\S]*?\},)/g;
  
  const matches = [...html.matchAll(readingPageRegex)];
  
  if (matches.length === 0) continue;
  
  // Collect all chapter text from all pages
  let allParagraphs = [];
  let chapterTitle = '';
  let bookTitle = '';
  
  matches.forEach(match => {
    const pageContent = match[4];
    const paragraphs = splitIntoParagraphs(pageContent);
    allParagraphs.push(...paragraphs);
    
    // Extract titles from first match
    if (!chapterTitle) {
      const titleMatch = match[0].match(/<h2>Reading: ([^<]+)<\/h2>\s*<h3[^>]*>(Chapter \d+: [^<]+)<\/h3>/);
      if (titleMatch) {
        bookTitle = titleMatch[1];
        chapterTitle = titleMatch[2];
      }
    }
  });
  
  if (allParagraphs.length === 0) continue;
  
  // Re-paginate into smaller chunks
  const newPages = createPages(allParagraphs, MAX_WORDS_PER_PAGE);
  
  console.log(`Day ${day}: ${matches.length} pages → ${newPages.length} pages`);
  
  // Build replacement pages
  let replacementPages = '';
  newPages.forEach((pageContent, idx) => {
    const pageNum = idx + 1;
    replacementPages += `
                // Reading Page ${pageNum} of ${newPages.length}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading: ${bookTitle}</h2>
                            <h3 style="color: var(--book-color, #305853);">${chapterTitle}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Page ${pageNum} of ${newPages.length}</p>
                            
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;" class="reading-passage">
                                ${pageContent}
                            </div>
                            
                        </div>
                    \`
                },
`;
  });
  
  // Find the first and last reading page to replace the entire block
  const firstPageMatch = html.match(/\/\/ Reading Page 1 of \d+/);
  const lastPageIndex = matches[matches.length - 1].index + matches[matches.length - 1][0].length;
  
  if (firstPageMatch) {
    const startIndex = html.indexOf(firstPageMatch[0]);
    const blockToReplace = html.substring(startIndex, lastPageIndex);
    
    html = html.substring(0, startIndex) + replacementPages + html.substring(lastPageIndex);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, html);
    totalUpdated++;
  }
}

console.log(`\n✅ Total: ${totalUpdated} files updated`);
