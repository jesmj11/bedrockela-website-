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
    // Find journal entry textareas and add word count
    const journalPattern = /<h2>✍️ Journal Entry<\/h2>([\s\S]*?)<textarea([^>]*)><\/textarea>/g;
    
    if (content.match(journalPattern)) {
      content = content.replace(journalPattern, (match, beforeTextarea, attrs) => {
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
    
    // ===== VOCABULARY UPDATES =====
    // Find vocabulary sections and replace with lookup forms
    // Pattern: vocabulary word boxes with definitions already shown
    const vocabPattern = /<div style="margin-bottom: 30px;">\s*<span style="font-size: 32px; font-weight: 800; color: #305853;">([^<]+)<\/span>\s*<p style="[^"]*">\s*\[Definition[^\]]*\]\s*<\/p>\s*<\/div>/g;
    
    let vocabQuestionNum = 1;
    content = content.replace(vocabPattern, (match, word) => {
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

console.log('🔄 Updating vocabulary and journal sections...\n');

// Process 4th grade lessons
const files = fs.readdirSync('.').filter(f => 
  f.startsWith('4th-grade-day-') && f.endsWith('.html')
);

let updated = 0;
let vocabUpdated = 0;
let journalUpdated = 0;

files.forEach(file => {
  const beforeContent = fs.readFileSync(file, 'utf8');
  const hasVocab = beforeContent.includes('📚 Vocabulary');
  const hasJournal = beforeContent.includes('✍️ Journal Entry');
  
  if (updateLesson(file)) {
    updated++;
    if (hasVocab) vocabUpdated++;
    if (hasJournal) journalUpdated++;
    
    if (updated <= 5) {
      console.log(`  ✅ ${file}`);
    }
  }
});

if (updated > 5) {
  console.log(`  ... and ${updated - 5} more`);
}

console.log(`\n🎉 Complete! Updated ${updated} lessons`);
console.log(`\n📊 Changes made:`);
console.log(`  Vocabulary sections: ${vocabUpdated} lessons`);
console.log(`    - Students must look up definitions`);
console.log(`    - Type in their own words (${minVocabWords} word minimum)`);
console.log(`    - Pasting is BLOCKED`);
console.log(`\n  Journal entries: ${journalUpdated} lessons`);
console.log(`    - ${minJournalWords}-word minimum requirement`);
console.log(`    - Live word count feedback`);
console.log(`    - Visual progress indicators`);
