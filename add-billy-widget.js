/**
 * Add Billy the Helper Goat widget to all lesson HTML files
 */

const fs = require('fs');
const path = require('path');

// Get all lesson files
const lessonFiles = fs.readdirSync('.').filter(f => 
  /^(1st|2nd|3rd|4th|5th|6th)-grade-day-\d+\.html$/.test(f)
);

console.log(`Found ${lessonFiles.length} lesson files`);

// Read the Billy widget code
const billyWidget = fs.readFileSync('billy-widget.html', 'utf8');

// Nunito font link to add to <head>
const nunitoFont = `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">`;

let updatedCount = 0;
let skippedCount = 0;

for (const file of lessonFiles) {
  let html = fs.readFileSync(file, 'utf8');
  
  // Skip if Billy widget already exists
  if (html.includes('br-launcher')) {
    console.log(`⏭️  Skipping ${file} (widget already exists)`);
    skippedCount++;
    continue;
  }
  
  // Add Nunito font to <head> if not already present
  if (!html.includes('fonts.googleapis.com/css2?family=Nunito')) {
    html = html.replace('</head>', `    ${nunitoFont}\n</head>`);
  }
  
  // Add Billy widget before </body>
  html = html.replace('</body>', `\n${billyWidget}\n</body>`);
  
  // Write back
  fs.writeFileSync(file, html, 'utf8');
  console.log(`✅ Updated ${file}`);
  updatedCount++;
}

console.log(`\n🎉 Done!`);
console.log(`   Updated: ${updatedCount} files`);
console.log(`   Skipped: ${skippedCount} files`);
console.log(`\n📌 Next steps:`);
console.log(`   1. Deploy Firebase Cloud Function: cd functions && npm install && firebase deploy --only functions:billyChat`);
console.log(`   2. Test on a lesson page`);
console.log(`   3. Commit and push to GitHub`);
