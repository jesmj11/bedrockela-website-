#!/usr/bin/env node
/**
 * Update 4th grade Days 31-60 from Tom Sawyer to Grimm Brothers Fairy Tales
 * 3 tales across 30 days (24 regular lessons, 6 assessments)
 */

const fs = require('fs');

// Grimm Brothers fairy tales for 4th grade
// 24 regular lesson days ÷ 3 tales = 8 lessons per tale
const tales = [
  { days: [31, 38], title: 'Snow White', author: 'Brothers Grimm' },
  { days: [39, 46], title: 'Cinderella', author: 'Brothers Grimm' },
  { days: [47, 60], title: 'Hansel and Gretel', author: 'Brothers Grimm' }
];

function getTaleForDay(day) {
  for (const tale of tales) {
    if (day >= tale.days[0] && day <= tale.days[1]) {
      return tale;
    }
  }
  return null;
}

let updated = 0;

for (let day = 31; day <= 60; day++) {
  const file = `4th-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const tale = getTaleForDay(day);
  if (!tale) continue;
  
  // Calculate which "chapter" or section (each tale divided into parts)
  const dayInTale = day - tale.days[0];
  const section = Math.floor(dayInTale / 3) + 1; // 3 days per section
  
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  
  // Update book title in objectives
  html = html.replace(
    /Read from <em>[^<]+<\/em>/,
    `Read from <em>${tale.title}</em>`
  );
  
  // Update reading page headers (if they exist)
  html = html.replace(
    /<h2>Reading: [^<]+<\/h2>/g,
    `<h2>Reading: ${tale.title}</h2>`
  );
  
  // Update chapter references to "Part X"
  html = html.replace(
    /<h3[^>]*>Chapter \d+[^<]*<\/h3>/g,
    `<h3 style="color: var(--book-color, #305853);">Part ${section}</h3>`
  );
  
  // Update any placeholder references
  html = html.replace(
    /Tom Sawyer/g,
    tale.title
  );
  
  // Reset vocabulary to placeholders (will need new vocab for fairy tales)
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]{0,500}?id="vocab-1")/,
    `$1[Vocabulary Word 1]$2`
  );
  
  html = html.replace(
    /(<span style="font-size: 28px; font-weight: 800; color: #305853;">)[^<]+(<\/span>[\s\S]{0,500}?id="vocab-2")/,
    `$1[Vocabulary Word 2]$2`
  );
  
  if (html !== original) {
    fs.writeFileSync(file, html);
    updated++;
  }
}

console.log(`✅ Updated ${updated} lessons with Grimm Brothers fairy tales`);
console.log('\n📚 New 4th Grade Days 31-60:');
tales.forEach(tale => {
  console.log(`  Days ${tale.days[0]}-${tale.days[1]}: ${tale.title}`);
});
console.log('\n⚠️  Note: Vocabulary and content need to be generated for these fairy tales!');
