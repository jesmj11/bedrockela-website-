#!/usr/bin/env node
/**
 * Inject informational text content for 4th grade Grimm Brothers fairy tales
 * (Days 31-60 - fills the empty content divs)
 */

const fs = require('fs');
const content = JSON.parse(fs.readFileSync('generated-4th-grade-grimm-informational-text.json', 'utf8'));

let updated = 0;

for (let day = 31; day <= 59; day++) {
  if (day % 5 === 0) continue; // Skip assessment days
  
  const file = `4th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const data = content[day];
  if (!data) {
    console.log(`⚠️  No content for day ${day}`);
    continue;
  }
  
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  
  // Find and replace Part 1 empty div
  // Pattern: <div style="padding: 25px; background: #f9f9f9...">
  //          (empty or whitespace)
  //          </div>
  
  // Part 1: After the first "Part 1 of 2" header
  // Pattern accounts for stray </p> tags in the div
  const part1Regex = /(Part 1 of 2<\/p>\s*<div style="padding: 25px; background: #f9f9f9[^"]*">\s*)(?:<\/p>\s*)?(<\/div>)/;
  if (html.match(part1Regex)) {
    html = html.replace(
      part1Regex,
      `$1<p style="margin-bottom: 15px;">${data.part1}</p>\n$2`
    );
  }
  
  // Part 2: After the "Part 2 of 2" header
  const part2Regex = /(Part 2 of 2<\/p>\s*<div style="padding: 25px; background: #f9f9f9[^"]*">\s*)(?:<\/p>\s*)?(<\/div>)/;
  if (html.match(part2Regex)) {
    html = html.replace(
      part2Regex,
      `$1<p style="margin-bottom: 15px;">${data.part2}</p>\n$2`
    );
  }
  
  if (html !== original) {
    fs.writeFileSync(file, html);
    updated++;
    console.log(`✅ Day ${day}: ${data.title}`);
  } else {
    console.log(`⚠️  Day ${day}: No changes made (pattern mismatch?)`);
  }
}

console.log(`\n✅ Injected informational text into ${updated} lessons!`);
