#!/usr/bin/env node
/**
 * Injects generated content (informational text, grammar, opinion, language)
 * into 3rd, 5th, 6th grade HTML lesson files.
 * 4th grade already has content — skip it.
 */

const fs = require('fs');
const content = JSON.parse(fs.readFileSync('generated-content.json', 'utf8'));

const wordCounts = { '3rd': 15, '5th': 25, '6th': 30 };
let totalUpdated = 0;
let totalSkipped = 0;

function esc(s) {
  // Escape for use inside template literals (backtick strings)
  return (s || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

for (const grade of ['3rd', '5th', '6th']) {
  const minWords = wordCounts[grade];
  let gradeUpdated = 0;
  
  for (let day = 1; day <= 180; day++) {
    if (day % 5 === 0) continue; // Skip assessments
    
    const file = `${grade}-grade-day-${day}.html`;
    if (!fs.existsSync(file)) { continue; }
    
    const data = content[grade]?.[day];
    if (!data) { totalSkipped++; continue; }
    
    let html = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // === INJECT INFORMATIONAL TEXT (Part 1) ===
    if (data.informational?.part1) {
      const part1Regex = /(\/\/ Page \d+: Informational Text - Reading \(Part 1\)\s*\{\s*render: \(\) => `\s*<div class="lesson-page-card content-page">\s*<h2>📰 Informational Text<\/h2>\s*<h3 style="color: #8B4513;">)[^<]*(Informational Text<\/h3>\s*<p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 1 of 2<\/p>\s*<div style="padding: 25px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;">\s*)([\s\S]*?)(<\/div>\s*<\/div>\s*`\s*\},)/;
      
      const match = html.match(part1Regex);
      if (match) {
        const title = esc(data.informational.title || 'Informational Text');
        const text = esc(data.informational.part1);
        const newContent = `${match[1]}${title}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 1 of 2</p>
                            
                            <div style="padding: 25px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;">
                                <p style="margin-bottom: 15px;">${text}</p>
                            ${match[4]}`;
        html = html.replace(match[0], newContent);
        changed = true;
      }
    }
    
    // === INJECT INFORMATIONAL TEXT (Part 2) ===
    if (data.informational?.part2) {
      const part2Regex = /(\/\/ Page \d+: Informational Text - Reading \(Part 2\)\s*\{\s*render: \(\) => `\s*<div class="lesson-page-card content-page">\s*<h2>📰 Informational Text<\/h2>\s*<h3 style="color: #8B4513;">)[^<]*(Informational Text<\/h3>\s*<p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 2 of 2<\/p>\s*<div style="padding: 25px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;">\s*)([\s\S]*?)(<\/div>\s*<\/div>\s*`\s*\},)/;
      
      const match = html.match(part2Regex);
      if (match) {
        const title = esc(data.informational.title || 'Informational Text');
        const text = esc(data.informational.part2);
        const newContent = `${match[1]}${title}</h3>
                            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Part 2 of 2</p>
                            
                            <div style="padding: 25px; background: #f9f9f9; border-radius: 12px; line-height: 1.8; font-size: 16px;">
                                <p style="margin-bottom: 15px;">${text}</p>
                            ${match[4]}`;
        html = html.replace(match[0], newContent);
        changed = true;
      }
    }
    
    // === INJECT QUESTIONS ===
    if (data.informational?.questions) {
      for (let q = 0; q < 3; q++) {
        const qNum = q + 1;
        const question = data.informational.questions[q];
        if (!question) continue;
        
        // Match the question text in Question pages
        const qRegex = new RegExp(
          `(Question ${qNum} of 3<\\/p>\\s*<div[^>]*>\\s*<p style="font-weight: 600; margin-bottom: 12px;">)${qNum}\\.[^<]*(</p>)`,
          's'
        );
        const qMatch = html.match(qRegex);
        if (qMatch) {
          html = html.replace(qMatch[0], `${qMatch[1]}${qNum}. ${esc(question)}${qMatch[2]}`);
          changed = true;
        }
      }
    }
    
    // === INJECT GRAMMAR ===
    if (data.grammar) {
      // Update grammar skill name
      const grammarSkillRegex = /(✏️ Grammar Workshop<\/h2>\s*<h3 style="color: #DC2626;">)[^<]*(<\/h3>)/;
      const gsMatch = html.match(grammarSkillRegex);
      if (gsMatch) {
        html = html.replace(gsMatch[0], `${gsMatch[1]}${esc(data.grammar.skill)}${gsMatch[2]}`);
        changed = true;
      }
      
      // Update grammar explanation
      if (data.grammar.explanation) {
        const geRegex = /(📖 What is it\?<\/strong><br>\s*)([\s\S]*?)(<\/p>)/;
        const geMatch = html.match(geRegex);
        if (geMatch) {
          html = html.replace(geMatch[0], `${geMatch[1]}${esc(data.grammar.explanation)}${geMatch[3]}`);
          changed = true;
        }
      }
      
      // Update grammar example
      if (data.grammar.example) {
        const gexRegex = /(💡 Example from today's reading:<\/strong><br>\s*<em>")[^"]*("[\s\S]*?<\/em>)/;
        const gexMatch = html.match(gexRegex);
        if (gexMatch) {
          html = html.replace(gexMatch[0], `${gexMatch[1]}${esc(data.grammar.example)}${gexMatch[2]}`);
          changed = true;
        }
      }
    }
    
    // === INJECT OPINION PROMPT ===
    if (data.opinion) {
      const opRegex = /(📝 Writing Practice<\/h2>[\s\S]*?<strong>Today's Prompt:<\/strong>[^<]*)([\s\S]*?)(<\/p>\s*<\/div>\s*<textarea)/;
      const opMatch = html.match(opRegex);
      if (opMatch) {
        html = html.replace(opMatch[0], `${opMatch[1]}${esc(data.opinion)}${opMatch[3]}`);
        changed = true;
      }
    }
    
    // === INJECT LANGUAGE ACTIVITY ===
    if (data.language) {
      const langRegex = /(🎨 Language Skills<\/h2>[\s\S]*?<strong>Today's Activity:<\/strong>[^<]*)([\s\S]*?)(<\/p>\s*<\/div>\s*<textarea)/;
      const langMatch = html.match(langRegex);
      if (langMatch) {
        html = html.replace(langMatch[0], `${langMatch[1]}${esc(data.language)}${langMatch[3]}`);
        changed = true;
      }
    }
    
    if (changed) {
      fs.writeFileSync(file, html);
      gradeUpdated++;
      totalUpdated++;
    } else {
      totalSkipped++;
    }
  }
  
  console.log(`${grade} grade: ${gradeUpdated} files updated`);
}

console.log(`\n✅ Total: ${totalUpdated} files updated, ${totalSkipped} skipped`);
