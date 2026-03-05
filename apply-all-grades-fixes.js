#!/usr/bin/env node
/**
 * Apply ALL 6th grade fixes to 3rd, 4th, 5th grades:
 * 1. Condense book chapters to ~5 pages (550 words/page, 11px font, line-height 1.2)
 * 2. Remove repeated headers from reading pages (keep on page 1 only)
 * 3. Remove repeated headers from informational text pages
 * 4. Fix duplicate chapter titles
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

const grades = ['3rd', '4th', '5th'];

for (const grade of grades) {
  console.log(`\n=== Processing ${grade} grade ===`);
  let totalUpdated = 0;

  for (let day = 1; day <= 180; day++) {
    const file = `${grade}-grade-day-${day}.html`;
    if (!fs.existsSync(file)) continue;
    
    let html = fs.readFileSync(file, 'utf8');
    const original = html;
    let changed = false;
    
    // === FIX 1: CONDENSE BOOK CHAPTERS ===
    const readingPageRegex = /(\/\/ Reading Page \d+ of \d+\s*\{[\s\S]*?render: \(\) => `[\s\S]*?<div class="lesson-page-card content-page">)[\s\S]*?(<p style="font-size: 14px; color: #666; margin-bottom: 15px;">)Page \d+ of (\d+)(<\/p>[\s\S]*?<div[^>]*class="reading-passage"[^>]*>\s*)([\s\S]*?)(\s*<\/div>[\s\S]*?`[\s\S]*?\},)/g;
    
    const matches = [...html.matchAll(readingPageRegex)];
    
    if (matches.length > 0) {
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
      
      if (allParagraphs.length > 0 && bookTitle) {
        const newPages = createPages(allParagraphs, MAX_WORDS_PER_PAGE);
        
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
          changed = true;
          console.log(`  Day ${day}: ${matches.length} pages → ${newPages.length} pages`);
        }
      }
    }
    
    // === FIX 2: REMOVE INFORMATIONAL TEXT HEADERS FROM PART 2 & QUESTIONS ===
    const infoTextBefore = html;
    html = html.replace(
      /(\/\/ Page \d+: Informational Text - Reading \(Part 2\)[\s\S]*?<div class="lesson-page-card content-page">)\s*<h2>(?:📰 )?Informational Text<\/h2>\s*(<h3[^>]*>[^<]+<\/h3>)/g,
      '$1\n                            $2'
    );
    html = html.replace(
      /(\/\/ Page \d+: Informational Text - Question \d+[\s\S]*?<div class="lesson-page-card content-page">)\s*<h2>(?:📰 )?Informational Text<\/h2>\s*(<p)/g,
      '$1\n                            $2'
    );
    if (html !== infoTextBefore) changed = true;
    
    // === FIX 3: FIX DUPLICATE CHAPTER TITLES ===
    const chapterBefore = html;
    html = html.replace(/(Chapter \d+): CHAPTER [IVX\d]+/g, '$1');
    if (html !== chapterBefore) changed = true;
    
    if (changed) {
      fs.writeFileSync(file, html);
      totalUpdated++;
    }
  }
  
  console.log(`✅ ${grade} grade: ${totalUpdated} files updated`);
}

console.log('\n🎉 All grades updated!');
