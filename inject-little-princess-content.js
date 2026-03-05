#!/usr/bin/env node
/**
 * Inject comprehensive content for A Little Princess into 3rd grade days 121-150
 */

const fs = require('fs');
const content = JSON.parse(fs.readFileSync('generated-3rd-grade-little-princess.json', 'utf8'));

let updated = 0;

for (let day = 121; day <= 149; day++) {
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
  
  html = html.replace(
    /(<h2>(?:📰 )?Informational Text<\/h2>\s*<h3[^>]*>)[^<]+(<\/h3>)/,
    `$1${data.informational.title}$2`
  );
  
  const part1Regex = /(Part 1 of 2<\/p>\s*<div style="padding: 25px; background: #f9f9f9[^"]*">\s*)(?:<\/p>\s*)?(<\/div>)/;
  if (html.match(part1Regex)) {
    html = html.replace(part1Regex, `$1<p style="margin-bottom: 15px;">${data.informational.part1}</p>\n$2`);
  }
  
  const part2Regex = /(Part 2 of 2<\/p>\s*<div style="padding: 25px; background: #f9f9f9[^"]*">\s*)(?:<\/p>\s*)?(<\/div>)/;
  if (html.match(part2Regex)) {
    html = html.replace(part2Regex, `$1<p style="margin-bottom: 15px;">${data.informational.part2}</p>\n$2`);
  }
  
  for (let q = 0; q < 3; q++) {
    const qNum = q + 1;
    const question = data.comprehension[q];
    if (!question) continue;
    
    const qRegex = new RegExp(
      `(Question ${qNum}:</p>\\s*<p[^>]*>)[^<]+(</p>)`,
      's'
    );
    if (html.match(qRegex)) {
      html = html.replace(qRegex, `$1${question}$2`);
    }
  }
  
  const journalRegex = /(Journal Reflection<\/h2>[\s\S]*?<p[^>]*>)\[Personal reflection prompt[^\]]*\](<\/p>)/;
  if (html.match(journalRegex)) {
    html = html.replace(journalRegex, `$1${data.journal}$2`);
  }
  
  const opinionRegex = /((?:📝 )?Writing Practice<\/h2>[\s\S]*?Prompt:<\/strong><\/p>\s*<p[^>]*>)[^<]+(Defend your opinion\.|Explain your thinking\.|Use examples[^<]*|Why or why not\?)<\/p>/;
  if (html.match(opinionRegex)) {
    html = html.replace(opinionRegex, `$1${data.opinion}</p>`);
  }
  
  if (data.grammar) {
    const grammarSkillRegex = /((?:✏️ )?Grammar Workshop<\/h2>\s*<h3[^>]*>)[^<]*(<\/h3>)/;
    if (html.match(grammarSkillRegex)) {
      html = html.replace(grammarSkillRegex, `$1${data.grammar.skill}$2`);
    }
    
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

console.log(`\n✅ Injected A Little Princess content into ${updated} lessons!`);
