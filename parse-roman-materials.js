#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');

const romanFolder = '/Users/mushu/Desktop/BedrockELA/5th Grade/roman';

// Extract all story files
const storyFiles = fs.readdirSync(romanFolder).filter(f => f.startsWith('ROMAN_'));

console.log('🏛️ Extracting Roman stories...');
const chapters = {};

storyFiles.forEach(file => {
    const title = file.replace('ROMAN_', '').replace('.docx', '').replace(/_/g, ' ');
    try {
        const text = execSync(`textutil -convert txt -stdout "${romanFolder}/${file}" 2>/dev/null`, { encoding: 'utf-8' });
        chapters[title] = text.trim();
        console.log(`  ✓ ${title}`);
    } catch (err) {
        console.log(`  ✗ Failed: ${title}`);
    }
});

fs.writeFileSync('./roman-chapters.json', JSON.stringify(chapters, null, 2));
console.log(`\n✅ Extracted ${Object.keys(chapters).length} chapters`);

// Parse vocabulary (same logic as Greek)
console.log('\n📖 Parsing vocabulary...');
const vocabText = execSync(`textutil -convert txt -stdout "${romanFolder}/Roman_Mythology_Vocab.docx" 2>/dev/null`, { encoding: 'utf-8' });
const vocabLines = vocabText.split('\n');

const vocab = {};
let currentStory = null;
let currentWord = null;
let vocabArray = [];

for (let i = 0; i < vocabLines.length; i++) {
    const line = vocabLines[i].trim();
    
    if (line && !line.startsWith('\t') && !line.match(/^[a-z]/) && line.length > 5 && line.length < 60) {
        if (currentStory && vocabArray.length > 0) {
            vocab[currentStory] = vocabArray;
        }
        
        if (line.includes('Roman Mythology') || line.includes('Vocabulary') || line.includes('Three words')) {
            continue;
        }
        
        currentStory = line;
        vocabArray = [];
        currentWord = null;
        continue;
    }
    
    if (line && !line.includes(' ') && line.match(/^[a-z]+$/) && line.length > 3) {
        currentWord = line;
        continue;
    }
    
    if (currentWord && line && line.match(/^[A-Z]/) && line.length > 20) {
        const definition = line;
        let context = '';
        
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

if (currentStory && vocabArray.length > 0) {
    vocab[currentStory] = vocabArray;
}

fs.writeFileSync('./roman-vocabulary.json', JSON.stringify(vocab, null, 2));
console.log(`✅ Parsed vocabulary for ${Object.keys(vocab).length} stories`);

// Parse questions
console.log('\n❓ Parsing questions...');
const questionsText = execSync(`textutil -convert txt -stdout "${romanFolder}/Roman_Mythology_Comprehension_Questions.docx" 2>/dev/null`, { encoding: 'utf-8' });
const questionLines = questionsText.split('\n');

const questions = {};
let currentQStory = null;
let questionsArray = [];

for (let i = 0; i < questionLines.length; i++) {
    const line = questionLines[i].trim();
    
    if (line && !line.startsWith('\t') && !line.startsWith('•') && line.length > 5 && line.length < 60) {
        if (currentQStory && questionsArray.length > 0) {
            questions[currentQStory] = questionsArray;
        }
        
        if (line.includes('Roman Mythology') || line.includes('Comprehension') || line.includes('Three questions')) {
            continue;
        }
        
        currentQStory = line;
        questionsArray = [];
        continue;
    }
    
    if (line.startsWith('•') && line.length > 30) {
        const question = line.replace('•', '').trim();
        questionsArray.push(question);
    }
}

if (currentQStory && questionsArray.length > 0) {
    questions[currentQStory] = questionsArray;
}

fs.writeFileSync('./roman-questions.json', JSON.stringify(questions, null, 2));
console.log(`✅ Parsed questions for ${Object.keys(questions).length} stories`);

console.log('\n🎉 Roman materials extraction complete!');
console.log(`   Chapters: ${Object.keys(chapters).length}`);
console.log(`   Vocabulary: ${Object.values(vocab).flat().length} words`);
console.log(`   Questions: ${Object.values(questions).flat().length} questions`);
