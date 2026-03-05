const fs = require('fs');
const path = require('path');

// Load the generated content
const generatedContent = JSON.parse(
  fs.readFileSync('generated-5th-grade-celtic.json', 'utf8')
);

// Celtic stories for Days 49, 51-54 (skip 50 - assessment day)
const days = [49, 51, 52, 53, 54];

days.forEach(day => {
  const dayStr = day.toString();
  const content = generatedContent[dayStr];
  
  if (!content) {
    console.log(`⚠️  No content for day ${day}`);
    return;
  }
  
  const filename = `5th-grade-day-${day}.html`;
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  File not found: ${filename}`);
    return;
  }
  
  let html = fs.readFileSync(filepath, 'utf8');
  
  // Extract vocabulary words (5th grade only has 2 words per day, not 3)
  const vocab1 = content.vocabulary[0];
  const vocab2 = content.vocabulary[1];
  
  // Extract other content
  const comprehension = content.comprehension;
  const journal = content.journal;
  const informational = content.informational;
  const opinion = content.opinion;
  const grammar = content.grammar;
  
  // 1. Update vocabulary words (replace both occurrences)
  let vocabCount = 0;
  html = html.replace(
    /<span style="font-size: 28px; font-weight: 800; color: #305853;">.*?<\/span>/g,
    (match) => {
      vocabCount++;
      if (vocabCount === 1) {
        return `<span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab1.word}</span>`;
      } else if (vocabCount === 2) {
        return `<span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab2.word}</span>`;
      }
      return match;
    }
  );
  
  // 2. Update comprehension questions - look for the paragraph with the question
  let questionCount = 0;
  html = html.replace(
    /<p style="margin-bottom: 12px; color: #444;">.*?<\/p>/g,
    (match) => {
      if (questionCount < comprehension.length) {
        const question = comprehension[questionCount];
        questionCount++;
        return `<p style="margin-bottom: 12px; color: #444;">${question}</p>`;
      }
      return match;
    }
  );
  
  // 3. Update journal prompt
  html = html.replace(
    /(<h2>Journal Reflection<\/h2>\s*<p style="[^"]*">)[^<]+(<\/p>)/s,
    `$1${journal}$2`
  );
  
  // 4. Update informational text title
  html = html.replace(
    /(<h2>Informational Text<\/h2>\s*<h3 style="[^"]*">)[^<]+(<\/h3>)/s,
    `$1${informational.title}$2`
  );
  
  // 5. Update informational text content (2 paragraphs in reading-passage div)
  const infoRegex = new RegExp(
    '(<div style="padding: 20px; background: #f9f9f9; border-radius: 12px; line-height: 1\\.8;" class="reading-passage">\\s*<p>)[^<]+(</p>\\s*<p>)[^<]+(</p>)',
    's'
  );
  html = html.replace(infoRegex, `$1${informational.part1}$2${informational.part2}$3`);
  
  // 6. Update opinion writing prompt
  html = html.replace(
    /(<h2>Writing Practice: Opinion<\/h2>\s*<p style="[^"]*">)[^<]+(<\/p>)/s,
    `$1${opinion}$2`
  );
  
  // 7. Update grammar skill and example
  html = html.replace(
    /(<h2>Grammar Workshop<\/h2>\s*<h3 style="[^"]*">Today's Skill: )[^<]+(<\/h3>)/s,
    `$1${grammar.skill}$2`
  );
  
  html = html.replace(
    /(<p style="[^"]*"><strong>Example from the story:<\/strong> <em>)[^<]+(<\/em><\/p>)/s,
    `$1${grammar.example}$2`
  );
  
  // Write the updated file
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`✅ Day ${day}: ${content.title}`);
});

console.log('\n🎉 All Celtic mythology lessons updated!');
