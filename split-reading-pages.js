#!/usr/bin/env node
/**
 * Split long reading passages into multiple no-scroll pages
 * and highlight vocabulary words in the text.
 * 
 * Target: ~300 words per reading card for 4th grade
 */
const fs = require('fs');

const WORDS_PER_PAGE = 300; // Fits comfortably on screen without scrolling

const grades = ['3rd', '4th', '5th', '6th'];
let totalFixed = 0;

for (const grade of grades) {
  let gradeFixed = 0;
  
  for (let day = 1; day <= 180; day++) {
    if (day % 5 === 0) continue; // Skip assessments
    
    const filename = `${grade}-grade-day-${day}.html`;
    if (!fs.existsSync(filename)) continue;
    
    let html = fs.readFileSync(filename, 'utf8');
    
    // 1. Extract vocab words for this lesson
    const vocabMatches = html.match(/font-size: 28px; font-weight: 800; color: #305853;">([^<]+)/g);
    const vocabWords = vocabMatches 
      ? vocabMatches.map(m => m.replace(/.*>/, '').trim().toLowerCase())
      : [];
    
    // 2. Find the reading passage
    const passageRegex = /(\/\/ Page \d+: (?:Literature |)Reading[\s\S]*?class="reading-passage"[^>]*>\s*<p[^>]*>)([\s\S]*?)(<\/p>\s*<\/div>\s*[\s\S]*?Vocabulary words[\s\S]*?<\/div>\s*`\s*\})/;
    const match = html.match(passageRegex);
    
    if (!match) continue;
    
    const passageText = match[2];
    
    // Skip if already short enough or already split
    const wordCount = passageText.replace(/<[^>]+>/g, '').split(/\s+/).filter(w => w).length;
    if (wordCount <= WORDS_PER_PAGE + 50) continue; // Small buffer
    
    // 3. Highlight vocab words in the passage
    let highlightedText = passageText;
    for (const word of vocabWords) {
      // Case-insensitive replacement, preserve original case
      const regex = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="vocab-highlight" title="Vocabulary word: $1">$1</span>');
    }
    
    // 4. Split into pages by sentences, targeting WORDS_PER_PAGE words per page
    // Split on sentence boundaries (. ! ?)
    const sentences = highlightedText.split(/(?<=[.!?])\s+(?=[A-Z"'])/);
    
    const pages = [];
    let currentPage = [];
    let currentWordCount = 0;
    
    for (const sentence of sentences) {
      const sentenceWords = sentence.replace(/<[^>]+>/g, '').split(/\s+/).filter(w => w).length;
      
      if (currentWordCount + sentenceWords > WORDS_PER_PAGE && currentPage.length > 0) {
        pages.push(currentPage.join(' '));
        currentPage = [sentence];
        currentWordCount = sentenceWords;
      } else {
        currentPage.push(sentence);
        currentWordCount += sentenceWords;
      }
    }
    if (currentPage.length > 0) {
      pages.push(currentPage.join(' '));
    }
    
    if (pages.length <= 1) continue; // Nothing to split
    
    // 5. Get the chapter title and book title from the original page
    const chapterTitle = html.match(/<h3[^>]*>(Chapter [^<]*)<\/h3>/)?.[1] || '';
    const bookTitle = html.match(/Reading: ([^<]*)<\/h2>/)?.[1] || '';
    
    // 6. Build replacement pages
    const pageHtmls = pages.map((pageText, i) => {
      const pageNum = i + 1;
      const totalPages = pages.length;
      return `
                // Reading Page ${pageNum} of ${totalPages}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Reading: ${bookTitle}</h2>
                            <h3 style="color: var(--book-color, #305853);">${chapterTitle}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Page ${pageNum} of ${totalPages}</p>
                            
                            <div style="padding: 20px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;" class="reading-passage">
                                <p style="margin-bottom: 15px; line-height: 1.8;">${pageText.replace(/`/g, "\\`").replace(/\$/g, "\\$")}</p>
                            </div>
                            ${i === totalPages - 1 ? `
                            <div style="margin-top: 15px; padding: 12px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                <p style="margin: 0;"><strong>Vocabulary words</strong> are <span class="vocab-highlight">highlighted</span> in the text!</p>
                            </div>` : ''}
                        </div>
                    \`
                },`;
    }).join('\n');
    
    // 7. Replace the single reading page with multiple pages
    // Find the full reading page block (from comment to closing })
    const fullPageRegex = /(\/\/ Page \d+: (?:Literature |)Reading\s*\{[\s\S]*?Vocabulary words[\s\S]*?<\/div>\s*`\s*\}),/;
    const fullMatch = html.match(fullPageRegex);
    
    if (!fullMatch) continue;
    
    html = html.replace(fullMatch[0], pageHtmls);
    
    fs.writeFileSync(filename, html);
    gradeFixed++;
    totalFixed++;
    
    if (gradeFixed <= 3) {
      console.log(`  ${grade} Day ${day}: ${wordCount} words → ${pages.length} pages (${vocabWords.length} vocab words highlighted)`);
    }
  }
  
  console.log(`${grade} grade: ${gradeFixed} lessons split`);
}

console.log(`\nTotal: ${totalFixed} lessons updated`);
