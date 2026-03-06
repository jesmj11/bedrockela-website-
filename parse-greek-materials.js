#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');

const greekFolder = '/Users/mushu/Desktop/BedrockELA/5th Grade/greek';

// Extract all story files
const storyFiles = fs.readdirSync(greekFolder).filter(f => f.startsWith('GREEK_'));

console.log('📚 Extracting Greek stories...');
const chapters = {};

storyFiles.forEach(file => {
    const title = file.replace('GREEK_', '').replace('.docx', '').replace(/_/g, ' ');
    try {
        const text = execSync(`textutil -convert txt -stdout "${greekFolder}/${file}" 2>/dev/null`, { encoding: 'utf-8' });
        chapters[title] = text.trim();
        console.log(`  ✓ ${title}`);
    } catch (err) {
        console.log(`  ✗ Failed: ${title}`);
    }
});

fs.writeFileSync('./greek-chapters.json', JSON.stringify(chapters, null, 2));
console.log(`\n✅ Extracted ${Object.keys(chapters).length} chapters`);

// Parse vocabulary
console.log('\n📖 Parsing vocabulary...');
const vocabText = execSync(`textutil -convert txt -stdout "${greekFolder}/Greek_Mythology_Vocab.docx" 2>/dev/null`, { encoding: 'utf-8' });
const vocabLines = vocabText.split('\n');

const vocab = {};
let currentStory = null;
let currentWord = null;
let vocabArray = [];

for (let i = 0; i < vocabLines.length; i++) {
    const line = vocabLines[i].trim();
    
    // Detect story titles (not indented, significant text)
    if (line && !line.startsWith('\t') && !line.match(/^[a-z]/) && line.length > 5 && line.length < 60) {
        // Save previous story
        if (currentStory && vocabArray.length > 0) {
            vocab[currentStory] = vocabArray;
        }
        
        // Skip headers
        if (line.includes('Greek Mythology') || line.includes('Vocabulary') || line.includes('Three words')) {
            continue;
        }
        
        currentStory = line;
        vocabArray = [];
        currentWord = null;
        continue;
    }
    
    // Detect vocab words (single lowercase word)
    if (line && !line.includes(' ') && line.match(/^[a-z]+$/) && line.length > 3) {
        currentWord = line;
        continue;
    }
    
    // Detect definitions (starts with capital, has content)
    if (currentWord && line && line.match(/^[A-Z]/) && line.length > 20) {
        const definition = line;
        const nextLine = vocabLines[i + 1] ? vocabLines[i + 1].trim() : '';
        let context = '';
        
        // Look for "As used:" line
        for (let j = i + 1; j < i + 5; j++) {
            const checkLine = vocabLines[j] ? vocabLines[j].trim() : '';
            if (checkLine.startsWith('As used:')) {
                context = checkLine.replace('As used:', '').trim();
                break;
            }
        }
        
        if (definition && currentWord) {
            vocabArray.push({
                word: currentWord,
                definition: definition,
                context: context || `(See story for context)`
            });
            currentWord = null;
        }
    }
}

// Save last story
if (currentStory && vocabArray.length > 0) {
    vocab[currentStory] = vocabArray;
}

fs.writeFileSync('./greek-vocabulary.json', JSON.stringify(vocab, null, 2));
console.log(`✅ Parsed vocabulary for ${Object.keys(vocab).length} stories`);

// Parse questions
console.log('\n❓ Parsing questions...');
const questionsText = execSync(`textutil -convert txt -stdout "${greekFolder}/Greek_Mythology_Comprehension_Questions.docx" 2>/dev/null`, { encoding: 'utf-8' });
const questionLines = questionsText.split('\n');

const questions = {};
let currentQStory = null;
let questionsArray = [];

for (let i = 0; i < questionLines.length; i++) {
    const line = questionLines[i].trim();
    
    // Detect story titles
    if (line && !line.startsWith('\t') && !line.startsWith('•') && line.length > 5 && line.length < 60) {
        // Save previous story
        if (currentQStory && questionsArray.length > 0) {
            questions[currentQStory] = questionsArray;
        }
        
        // Skip headers
        if (line.includes('Greek Mythology') || line.includes('Comprehension') || line.includes('Three questions')) {
            continue;
        }
        
        currentQStory = line;
        questionsArray = [];
        continue;
    }
    
    // Detect questions (starts with bullet)
    if (line.startsWith('•') && line.length > 30) {
        const question = line.replace('•', '').trim();
        questionsArray.push(question);
    }
}

// Save last story
if (currentQStory && questionsArray.length > 0) {
    questions[currentQStory] = questionsArray;
}

fs.writeFileSync('./greek-questions.json', JSON.stringify(questions, null, 2));
console.log(`✅ Parsed questions for ${Object.keys(questions).length} stories`);

console.log('\n🎉 Greek materials extraction complete!');
console.log(`   Chapters: ${Object.keys(chapters).length}`);
console.log(`   Vocabulary: ${Object.values(vocab).flat().length} words`);
console.log(`   Questions: ${Object.values(questions).flat().length} questions`);
