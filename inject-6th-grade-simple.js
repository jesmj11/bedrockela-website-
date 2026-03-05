#!/usr/bin/env node
/**
 * Simple direct injection for 6th grade
 */

const fs = require('fs');
const content = JSON.parse(fs.readFileSync('generated-content.json', 'utf8'));

let updated = 0;

for (let day = 1; day <= 180; day++) {
  if (day % 5 === 0) continue;
  
  const file = `6th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const data = content['6th']?.[day];
  if (!data?.informational?.title) continue;
  
  let html = fs.readFileSync(file, 'utf8');
  const oldTitle = "Tornadoes: How They Form";
  const newTitle = data.informational.title;
  
  if (html.includes(oldTitle)) {
    // Replace ALL occurrences
    html = html.replace(new RegExp(oldTitle, 'g'), newTitle);
    
    // Also update objectives if present
    html = html.replace(
      /Read informational text: "Tornadoes: How They Form"/g,
      `Read informational text: "${newTitle}"`
    );
    
    fs.writeFileSync(file, html);
    updated++;
    console.log(`Day ${day}: ${newTitle}`);
  }
}

console.log(`\n✅ Updated ${updated} lessons`);
