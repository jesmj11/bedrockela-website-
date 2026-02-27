#!/usr/bin/env node

const fs = require('fs');

/**
 * Update lessons:
 * 1. Journal entries: 100-word minimum with word count
 * 2. Vocabulary: Short answer forms (no definitions shown, no pasting)
 */

const minJournalWords = 100;
const minVocabWords = 10; // Short definition, 10 words minimum

function updateLesson(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // ===== JOURNAL ENTRY UPDATES =====
    // Pattern 1: 4th grade format <h2>✍️ Journal Entry</h2>
    const journalPattern1 = /<h2>✍️ Journal Entry<\/h2>([\s\S]*?)<textarea([^>]*)><\/textarea>/g;
    
    if (content.match(journalPattern1)) {
      content = content.replace(journalPattern1, (match, beforeTextarea, attrs) => {
        modified = true;
        return `<h2>✍️ Journal Entry</h2>${beforeTextarea}<textarea 
                      id="journal-entry"
                      style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.8;"
                      oninput="updateWordCount('journal-entry', 'journal-word-count', ${minJournalWords})"
                      placeholder="Write your journal entry here (minimum ${minJournalWords} words)..."
                    ></textarea>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                      <span id="journal-word-count" style="font-size: 14px; color: #666;">0 / ${minJournalWords} words</span>
                      <span id="journal-word-count-status" style="font-size: 14px; font-weight: 600;"></span>
                    </div>`;
      });
    }
    
    // Pattern 2: 6th grade format <h2...>✏️ Journal Entry</h2>
    const journalPattern2 = /<h2[^>]*>✏️ Journal Entry<\/h2>([\s\S]*?)<textarea class="journal-entry"([^>]*)><\/textarea>/g;
    
    if (content.match(journalPattern2)) {
      content = content.replace(journalPattern2, (match, beforeTextarea, attrs) => {
        modified = true;
        return `<h2 style="color: #B06821; margin-bottom: 20px;">✏️ Journal Entry</h2>${beforeTextarea}<textarea 
                      id="journal-entry"
                      class="journal-entry"
                      style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.8;"
                      oninput="updateWordCount('journal-entry', 'journal-word-count', ${minJournalWords})"
                      placeholder="Write your journal entry here (minimum ${minJournalWords} words)..."
                    ></textarea>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                      <span id="journal-word-count" style="font-size: 14px; color: #666;">0 / ${minJournalWords} words</span>
                      <span id="journal-word-count-status" style="font-size: 14px; font-weight: 600;"></span>
                    </div>`;
      });
    }
    
    // ===== VOCABULARY UPDATES =====
    // Pattern 1: 4th grade format with [Definition...] 
    const vocabPattern1 = /<div style="margin-bottom: 30px;">\s*<span style="font-size: 32px; font-weight: 800; color: #305853;">([^<]+)<\/span>\s*<p style="[^"]*">\s*\[Definition[^\]]*\]\s*<\/p>\s*<\/div>/g;
    
    // Pattern 2: 6th grade format with "Definition will be discovered"
    const vocabPattern2 = /<div class="vocab-word"[^>]*>\s*<h3[^>]*>(\d+)\.\s*([^<]+)<\/h3>\s*<p class="vocab-def"[^>]*><em>Definition will be discovered[^<]*<\/em><\/p>\s*<\/div>/g;
    
    let vocabQuestionNum = 1;
    
    // Handle 4th grade format
    content = content.replace(vocabPattern1, (match, word) => {
      modified = true;
      const id = `vocab-${vocabQuestionNum}`;
      const countId = `vocab-count-${vocabQuestionNum}`;
      const result = `<div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #B06821;">
                                    <div style="margin-bottom: 12px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${word}</span>
                                    </div>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                                        📖 Look up this word in a dictionary or online, then write the definition in your own words:
                                    </p>
                                    <textarea 
                                      id="${id}"
                                      style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                      oninput="updateWordCount('${id}', '${countId}', ${minVocabWords})"
                                      onpaste="return false"
                                      placeholder="Type the definition here (minimum ${minVocabWords} words, no pasting)..."
                                    ></textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                      <span id="${countId}" style="font-size: 13px; color: #666;">0 / ${minVocabWords} words</span>
                                      <span id="${countId}-status" style="font-size: 13px; font-weight: 600;"></span>
                                    </div>
                                </div>`;
      vocabQuestionNum++;
      return result;
    });
    
    // Handle 6th grade format
    vocabQuestionNum = 1; // Reset for this pattern
    content = content.replace(vocabPattern2, (match, num, word) => {
      modified = true;
      const id = `vocab-${num}`;
      const countId = `vocab-count-${num}`;
      return `<div class="vocab-word" style="margin-bottom: 20px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #B06821;">
                <h3 style="color: #305853; margin-bottom: 12px;">${num}. ${word}</h3>
                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                    📖 Look up this word in a dictionary or online, then write the definition in your own words:
                </p>
                <textarea 
                  id="${id}"
                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                  oninput="updateWordCount('${id}', '${countId}', ${minVocabWords})"
                  onpaste="return false"
                  placeholder="Type the definition here (minimum ${minVocabWords} words, no pasting)..."
                ></textarea>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                  <span id="${countId}" style="font-size: 13px; color: #666;">0 / ${minVocabWords} words</span>
                  <span id="${countId}-status" style="font-size: 13px; font-weight: 600;"></span>
                </div>
              </div>`;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

console.log('🔄 Updating vocabulary and journal sections for ALL grades...\n');

const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
let totalUpdated = 0;
let totalVocabUpdated = 0;
let totalJournalUpdated = 0;

grades.forEach(grade => {
  // Try both naming patterns
  const patterns = [
    `${grade}-grade-day-`,
    `${grade}-grade-lesson-`
  ];
  
  let gradeFiles = [];
  patterns.forEach(pattern => {
    const found = fs.readdirSync('.').filter(f => 
      f.startsWith(pattern) && f.endsWith('.html') && !f.includes('backup')
    );
    gradeFiles = gradeFiles.concat(found);
  });
  
  if (gradeFiles.length === 0) return;
  
  console.log(`\n📚 ${grade} Grade (${gradeFiles.length} lessons):`);
  
  let updated = 0;
  let vocabUpdated = 0;
  let journalUpdated = 0;
  
  gradeFiles.forEach(file => {
    const beforeContent = fs.readFileSync(file, 'utf8');
    const hasVocab = beforeContent.includes('📚 Vocabulary');
    const hasJournal = beforeContent.includes('✍️ Journal');
    
    if (updateLesson(file)) {
      updated++;
      totalUpdated++;
      if (hasVocab) {
        vocabUpdated++;
        totalVocabUpdated++;
      }
      if (hasJournal) {
        journalUpdated++;
        totalJournalUpdated++;
      }
      
      if (updated <= 3) {
        console.log(`  ✅ ${file}`);
      }
    }
  });
  
  if (updated > 3) {
    console.log(`  ... and ${updated - 3} more`);
  }
  
  console.log(`  Updated: ${updated} lessons (${vocabUpdated} vocab, ${journalUpdated} journal)`);
});

console.log(`\n🎉 Complete! Updated ${totalUpdated} lessons across all grades`);
console.log(`\n📊 Total changes:`);
console.log(`  Vocabulary sections: ${totalVocabUpdated} lessons`);
console.log(`    - Students must look up definitions`);
console.log(`    - Type in their own words (${minVocabWords} word minimum)`);
console.log(`    - Pasting is BLOCKED`);
console.log(`\n  Journal entries: ${totalJournalUpdated} lessons`);
console.log(`    - ${minJournalWords}-word minimum requirement`);
console.log(`    - Live word count feedback`);
console.log(`    - Visual progress indicators`);
