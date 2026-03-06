#!/usr/bin/env node
const fs = require('fs');

const text = fs.readFileSync('/tmp/sinbad_qa.txt', 'utf-8');
const lines = text.split('\n');

const vocab = {};
const questions = {};

let currentChapter = null;
let currentTitle = null;
let collectingQuestions = false;
let collectingVocab = false;
let questionNum = 0;
let questions_array = [];
let vocab_array = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect chapter start
    if (line.match(/^Chapter \d+$/)) {
        // Save previous chapter
        if (currentTitle && questions_array.length > 0) {
            questions[currentTitle] = questions_array;
            vocab[currentTitle] = vocab_array;
        }
        
        currentChapter = line;
        const nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
        currentTitle = nextLine;
        questions_array = [];
        vocab_array = [];
        collectingQuestions = false;
        collectingVocab = false;
        questionNum = 0;
    }
    
    // Detect sections
    if (line === 'Comprehension Questions') {
        collectingQuestions = true;
        collectingVocab = false;
        continue;
    }
    
    if (line === 'Vocabulary') {
        collectingQuestions = false;
        collectingVocab = true;
        continue;
    }
    
    // Collect questions
    if (collectingQuestions && line.match(/^\d+\.\s+/)) {
        const question = line.replace(/^\d+\.\s+/, '').trim();
        if (question && question.length > 10) {
            questions_array.push(question);
        }
    }
    
    // Collect vocabulary
    if (collectingVocab && line.includes('—') && !line.startsWith('Use it')) {
        const parts = line.split('—');
        if (parts.length >= 2) {
            const word = parts[0].trim();
            const definition = parts.slice(1).join('—').trim();
            if (word && definition && word.length < 30) {
                vocab_array.push({
                    word: word,
                    definition: definition
                });
            }
        }
    }
}

// Save last chapter
if (currentTitle && questions_array.length > 0) {
    questions[currentTitle] = questions_array;
    vocab[currentTitle] = vocab_array;
}

console.log(`Parsed ${Object.keys(questions).length} chapters`);
console.log(`Total questions: ${Object.values(questions).flat().length}`);
console.log(`Total vocab words: ${Object.values(vocab).flat().length}`);

fs.writeFileSync('./sinbad-questions.json', JSON.stringify(questions, null, 2));
fs.writeFileSync('./sinbad-vocabulary.json', JSON.stringify(vocab, null, 2));

console.log('✅ Written sinbad-questions.json');
console.log('✅ Written sinbad-vocabulary.json');
