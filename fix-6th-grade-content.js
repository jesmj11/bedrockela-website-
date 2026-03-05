#!/usr/bin/env node
/**
 * Fix 6th grade content injection - works with or without emoji
 */

const fs = require('fs');
const content = JSON.parse(fs.readFileSync('generated-content.json', 'utf8'));

let totalUpdated = 0;

function esc(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

const grade = '6th';
const minWords = 30;

for (let day = 1; day <= 180; day++) {
  if (day % 5 === 0) continue; // Skip assessments
  
  const file = `${grade}-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const data = content[grade]?.[day];
  if (!data) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // === INJECT INFORMATIONAL TEXT TITLE & PART 1 ===
  if (data.informational?.title && data.informational?.part1) {
    // Match the Part 1 heading (with or without emoji)
    const part1Regex = /(<h2>(?:📰 )?Informational Text<\/h2>\s*<h3 style="color: #8B4513;">)[^<]+(Informational Text<\/h3>\s*<p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 1 of 2<\/p>)/;
    
    if (html.match(part1Regex)) {
      const title = esc(data.informational.title);
      html = html.replace(part1Regex, `$1${title}$2`);
      changed = true;
    }
  }
  
  // === INJECT INFORMATIONAL TEXT PART 2 ===
  if (data.informational?.title) {
    const part2Regex = /(<h2>(?:📰 )?Informational Text<\/h2>\s*<h3 style="color: #8B4513;">)[^<]+(Informational Text<\/h3>\s*<p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 2 of 2<\/p>)/;
    
    if (html.match(part2Regex)) {
      const title = esc(data.informational.title);
      html = html.replace(part2Regex, `$1${title}$2`);
      changed = true;
    }
  }
  
  // === INJECT INFORMATIONAL QUESTIONS ===
  if (data.informational?.questions) {
    for (let q = 0; q < 3; q++) {
      const qNum = q + 1;
      const question = data.informational.questions[q];
      if (!question) continue;
      
      // Match question in informational section
      const qRegex = new RegExp(
        `(Question ${qNum} of 3<\\/p>\\s*<div[^>]*>\\s*<p style="font-weight: 600; margin-bottom: 12px;">${qNum}\\. )[^<]+(</p>)`,
        's'
      );
      
      if (html.match(qRegex)) {
        html = html.replace(qRegex, `$1${esc(question)}$2`);
        changed = true;
      }
    }
  }
  
  // === INJECT GRAMMAR ===
  if (data.grammar?.skill) {
    const grammarSkillRegex = /((?:✏️ )?Grammar Workshop<\/h2>\s*<h3 style="color: #DC2626;">)[^<]*(<\/h3>)/;
    if (html.match(grammarSkillRegex)) {
      html = html.replace(grammarSkillRegex, `$1${esc(data.grammar.skill)}$2`);
      changed = true;
    }
  }
  
  // === INJECT OPINION PROMPT ===
  if (data.opinion) {
    const opRegex = /((?:📝 )?Writing Practice<\/h2>[\s\S]*?<strong>Today's Prompt:<\/strong>)[\s\S]*?(<\/p>\s*<\/div>\s*<textarea)/;
    const opMatch = html.match(opRegex);
    if (opMatch) {
      html = html.replace(opMatch[0], `${opMatch[1]} ${esc(data.opinion)}${opMatch[2]}`);
      changed = true;
    }
  }
  
  // === INJECT LANGUAGE ACTIVITY ===
  if (data.language) {
    const langRegex = /((?:🎨 )?Language Skills<\/h2>[\s\S]*?<strong>Today's Activity:<\/strong>)[\s\S]*?(<\/p>\s*<\/div>\s*<textarea)/;
    const langMatch = html.match(langRegex);
    if (langMatch) {
      html = html.replace(langMatch[0], `${langMatch[1]} ${esc(data.language)}${langMatch[2]}`);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, html);
    totalUpdated++;
  }
}

console.log(`✅ 6th grade: ${totalUpdated} files updated`);
