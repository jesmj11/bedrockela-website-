const fs = require('fs');
const path = require('path');

// Load the generated content
const content = JSON.parse(fs.readFileSync('generated-5th-grade-roman.json', 'utf-8'));

// Days to inject (skip assessment days: 125, 130, 135, 140)
const days = [121, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 134, 136, 137, 138, 139];

console.log('Starting Roman Mythology content injection...\n');

days.forEach(day => {
  const filename = `5th-grade-day-${day}.html`;
  const filePath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filename}`);
    return;
  }
  
  let html = fs.readFileSync(filePath, 'utf-8');
  const data = content[day];
  
  if (!data) {
    console.log(`⚠️  No content data for day ${day}`);
    return;
  }
  
  // 1. Update Vocabulary Section (Page 2)
  const vocabWords = data.vocabulary.map((v, i) => `
                <div class="vocab-word">
                    <h4>${i + 1}. ${v.word}</h4>
                    <p class="definition"><strong>Definition:</strong> ${v.definition}</p>
                    <p class="example"><strong>Example:</strong> ${v.sentence}</p>
                </div>`).join('\n');
  
  html = html.replace(
    /<div class="vocab-list">[\s\S]*?<\/div>\s*<\/div>\s*<!-- End Vocabulary List -->/,
    `<div class="vocab-list">${vocabWords}
            </div>
        </div>
        <!-- End Vocabulary List -->`
  );
  
  // 2. Update Reading Comprehension Questions (Page 4)
  const comprehensionQuestions = data.comprehension.map((q, i) => `
                <div class="question">
                    <label for="q${i + 1}-day${day}">${i + 1}. ${q}</label>
                    <textarea id="q${i + 1}-day${day}" rows="3" placeholder="Write your answer here..."></textarea>
                </div>`).join('\n');
  
  html = html.replace(
    /<div class="questions">[\s\S]*?<\/div>\s*<button class="nav-button next-page">Next Page/,
    `<div class="questions">${comprehensionQuestions}
            </div>
            <button class="nav-button next-page">Next Page`
  );
  
  // 3. Update Journal Reflection (Page 5)
  html = html.replace(
    /<p class="journal-prompt">.*?<\/p>/,
    `<p class="journal-prompt">${data.journal}</p>`
  );
  
  // 4. Update Informational Text (Pages 7-8)
  // Page 7 - First paragraph
  html = html.replace(
    /<!-- Page 7: Informational Text -->[\s\S]*?<h3>.*?<\/h3>\s*<div class="reading-passage">\s*<p>([\s\S]*?)<\/p>/,
    `<!-- Page 7: Informational Text -->
        <div class="page">
            <h2>Day ${day}: ${data.title}</h2>
            <h3>${data.informational.title}</h3>
            <div class="reading-passage">
                <p>${data.informational.part1}</p>`
  );
  
  // Page 8 - Second paragraph
  html = html.replace(
    /<!-- Page 8: Informational Text Continued -->[\s\S]*?<div class="reading-passage">\s*<p>([\s\S]*?)<\/p>/,
    `<!-- Page 8: Informational Text Continued -->
        <div class="page">
            <div class="reading-passage">
                <p>${data.informational.part2}</p>`
  );
  
  // 5. Update Opinion Writing (Page 9)
  html = html.replace(
    /<p class="writing-prompt"><strong>Prompt:<\/strong>.*?<\/p>/,
    `<p class="writing-prompt"><strong>Prompt:</strong> ${data.opinion}</p>`
  );
  
  // 6. Update Grammar Workshop (Page 10)
  html = html.replace(
    /<p><strong>Today's Skill:<\/strong>.*?<\/p>\s*<div class="example-box">\s*<p><strong>Example:<\/strong>[\s\S]*?<\/p>\s*<\/div>/,
    `<p><strong>Today's Skill:</strong> ${data.grammar.skill}</p>
            <div class="example-box">
                <p><strong>Example:</strong> ${data.grammar.example}</p>
            </div>`
  );
  
  // Write the updated file
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Updated ${filename} - ${data.title}`);
});

console.log('\n🎉 Roman Mythology content injection complete!');
console.log(`Updated ${days.length} lessons (Days 121-139, skipping assessments at 125, 130, 135, 140)`);
