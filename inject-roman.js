const fs = require('fs');
const path = require('path');

// Load the generated content
const content = JSON.parse(fs.readFileSync('generated-5th-grade-roman.json', 'utf-8'));

// Days to inject (skip assessment days: 125, 130, 135, 140)
const days = [121, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 134, 136, 137, 138, 139];

console.log('Starting Roman Mythology content injection...\n');

days.forEach(day => {
  const dayStr = day.toString();
  const data = content[dayStr];
  
  if (!data) {
    console.log(`⚠️  No content for day ${day}`);
    return;
  }
  
  const filename = `5th-grade-day-${day}.html`;
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  File not found: ${filename}`);
    return;
  }
  
  let html = fs.readFileSync(filepath, 'utf-8');
  
  // Extract vocabulary words (3 per day for Roman mythology)
  const vocab1 = data.vocabulary[0];
  const vocab2 = data.vocabulary[1];
  const vocab3 = data.vocabulary[2];
  
  // 1. Update vocabulary words (replace all 3 occurrences)
  let vocabCount = 0;
  html = html.replace(
    /<span style="font-size: 28px; font-weight: 800; color: #305853;">.*?<\/span>/g,
    (match) => {
      vocabCount++;
      if (vocabCount === 1) {
        return `<span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab1.word}</span>`;
      } else if (vocabCount === 2) {
        return `<span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab2.word}</span>`;
      } else if (vocabCount === 3) {
        return `<span style="font-size: 28px; font-weight: 800; color: #305853;">${vocab3.word}</span>`;
      }
      return match;
    }
  );
  
  // 2. Update comprehension questions
  let questionCount = 0;
  html = html.replace(
    /<p style="margin-bottom: 12px; color: #444;">.*?<\/p>/g,
    (match) => {
      if (questionCount < data.comprehension.length) {
        const question = data.comprehension[questionCount];
        questionCount++;
        return `<p style="margin-bottom: 12px; color: #444;">${question}</p>`;
      }
      return match;
    }
  );
  
  // 3. Update journal prompt
  html = html.replace(
    /(<h2>Journal Reflection<\/h2>\s*<p style="[^"]*">)[^<]+(<\/p>)/s,
    `$1${data.journal}$2`
  );
  
  // 4. Update informational text title
  html = html.replace(
    /(<h2>Informational Text<\/h2>\s*<h3 style="[^"]*">)[^<]+(<\/h3>)/s,
    `$1${data.informational.title}$2`
  );
  
  // 5. Update informational text content (2 paragraphs)
  const infoRegex = new RegExp(
    '(<div style="padding: 20px; background: #f9f9f9; border-radius: 12px; line-height: 1\\.8;" class="reading-passage">\\s*<p>)[^<]+(</p>\\s*<p>)[^<]+(</p>)',
    's'
  );
  html = html.replace(infoRegex, `$1${data.informational.part1}$2${data.informational.part2}$3`);
  
  // 6. Update opinion writing prompt
  html = html.replace(
    /(<h2>Writing Practice: Opinion<\/h2>\s*<p style="[^"]*">)[^<]+(<\/p>)/s,
    `$1${data.opinion}$2`
  );
  
  // 7. Update grammar skill
  html = html.replace(
    /(<h2>Grammar Workshop<\/h2>\s*<h3 style="[^"]*">Today's Skill: )[^<]+(<\/h3>)/s,
    `$1${data.grammar.skill}$2`
  );
  
  // 8. Update grammar example
  html = html.replace(
    /(<p style="[^"]*"><strong>Example from the story:<\/strong> <em>)[^<]+(<\/em><\/p>)/s,
    `$1${data.grammar.example}$2`
  );
  
  // Write the updated file
  fs.writeFileSync(filepath, html, 'utf-8');
  console.log(`✅ Day ${day}: ${data.title}`);
});

console.log(`\n🎉 Roman Mythology content injection complete!`);
console.log(`Updated ${days.length} lessons (Days 121-139, skipping assessments)`);
