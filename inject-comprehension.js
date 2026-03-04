#!/usr/bin/env node
/**
 * Injects generated comprehension questions into HTML lesson files.
 * Replaces "[Comprehension question about Chapter X]" placeholders.
 */

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('generated-comprehension.json', 'utf8'));

const grade = process.argv[2]; // e.g. "3rd"
if (!grade || !data[grade]) {
  console.log('Usage: node inject-comprehension.js <grade>');
  console.log('Available:', Object.keys(data).join(', '));
  process.exit(1);
}

function esc(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

let updated = 0, skipped = 0;

for (let day = 1; day <= 180; day++) {
  if (day % 5 === 0) continue;
  
  const file = `${grade}-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const questions = data[grade][day];
  if (!questions || questions.length < 3) { skipped++; continue; }
  
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (let q = 0; q < 3; q++) {
    // Match the placeholder pattern: [Comprehension question about Chapter X]
    const placeholder = new RegExp(
      `(Question ${q+1}:<\\/p>\\s*<p[^>]*>)\\[Comprehension question[^\\]]*\\](<\\/p>)`,
      's'
    );
    const match = html.match(placeholder);
    if (match) {
      html = html.replace(match[0], `${match[1]}${esc(questions[q])}${match[2]}`);
      changed = true;
    }
    
    // Also match alternate format: "Question X:" followed by bracketed placeholder
    const alt = new RegExp(
      `(Question ${q+1}:<\\/p>\\s*<p[^>]*>)\\[Question about[^\\]]*\\](<\\/p>)`,
      's'
    );
    const altMatch = html.match(alt);
    if (altMatch) {
      html = html.replace(altMatch[0], `${altMatch[1]}${esc(questions[q])}${altMatch[2]}`);
      changed = true;
    }
    
    // Also try: [Write about...] pattern
    const write = new RegExp(
      `(Question ${q+1}:<\\/p>\\s*<p[^>]*>)\\[Write about[^\\]]*\\](<\\/p>)`,
      's'
    );
    const writeMatch = html.match(write);
    if (writeMatch) {
      html = html.replace(writeMatch[0], `${writeMatch[1]}${esc(questions[q])}${writeMatch[2]}`);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, html);
    updated++;
  } else {
    skipped++;
  }
}

console.log(`${grade} grade: ${updated} files updated, ${skipped} skipped`);

// Verify
let remaining = 0;
for (let day = 1; day <= 180; day++) {
  if (day % 5 === 0) continue;
  const file = `${grade}-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('[Comprehension question')) remaining++;
}
console.log(`Remaining placeholders: ${remaining} files`);
