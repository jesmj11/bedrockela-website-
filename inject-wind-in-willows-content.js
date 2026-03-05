#!/usr/bin/env node
/**
 * Inject generated content for Wind in the Willows into 3rd grade days 1-30
 */

const fs = require('fs');
const content = JSON.parse(fs.readFileSync('generated-3rd-grade-wind-in-willows.json', 'utf8'));

let updated = 0;

for (let day = 1; day <= 30; day++) {
  if (day % 5 === 0) continue; // Skip assessment days
  
  const file = `3rd-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const data = content[day];
  if (!data) {
    console.log(`⚠️  No content for day ${day}`);
    continue;
  }
  
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  
  // 1. Update informational text title
  html = html.replace(
    /(<h2>(?:📰 )?Informational Text<\/h2>\s*<h3[^>]*>)[^<]+(<\/h3>)/,
    `$1${data.informational.title}$2`
  );
  
  // 2. Update comprehension questions (3 questions)
  for (let q = 0; q < 3; q++) {
    const qNum = q + 1;
    const question = data.comprehension[q];
    if (!question) continue;
    
    // Match question text
    const qRegex = new RegExp(
      `(Question ${qNum}:</p>\\s*<p[^>]*>)[^<]+(</p>)`,
      's'
    );
    if (html.match(qRegex)) {
      html = html.replace(qRegex, `$1${question}$2`);
    }
  }
  
  // 3. Update journal reflection prompt
  const journalRegex = /(Journal Reflection<\/h2>[\s\S]*?<p[^>]*>)\[Personal reflection prompt[^\]]*\](<\/p>)/;
  if (html.match(journalRegex)) {
    html = html.replace(journalRegex, `$1${data.journal}$2`);
  }
  
  // 4. Update opinion writing prompt
  const opinionRegex = /(Opinion Writing<\/h2>[\s\S]*?<p[^>]*>)[^<]+(Defend your opinion\.|Explain your thinking\.|Use examples[^<]*)<\/p>/;
  if (html.match(opinionRegex)) {
    html = html.replace(opinionRegex, `$1${data.opinion}</p>`);
  }
  
  // 5. Update grammar skill and example
  if (data.grammar) {
    // Skill name
    const grammarSkillRegex = /((?:✏️ )?Grammar Workshop<\/h2>\s*<h3[^>]*>)[^<]*(<\/h3>)/;
    if (html.match(grammarSkillRegex)) {
      html = html.replace(grammarSkillRegex, `$1${data.grammar.skill}$2`);
    }
    
    // Grammar example
    const grammarExampleRegex = /(💡 Example from today's reading:<\/strong><br>\s*<em>")[^"]*(")/;
    if (html.match(grammarExampleRegex)) {
      html = html.replace(grammarExampleRegex, `$1${data.grammar.example}$2`);
    }
  }
  
  if (html !== original) {
    fs.writeFileSync(file, html);
    updated++;
    console.log(`✅ Day ${day}: ${data.informational.title}`);
  }
}

console.log(`\n✅ Injected content into ${updated} lessons!`);
