const fs = require('fs');
const path = require('path');

/**
 * Update all 1st grade lessons to use digital-book-v2.js instead of digital-book.js
 */

const lessonFiles = [];
for (let i = 1; i <= 180; i++) {
  lessonFiles.push(`1st-grade-lesson-${i}-v2.html`);
}

lessonFiles.forEach(filename => {
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  Skipping ${filename} (not found)`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');

  // Replace CSS link
  content = content.replace(
    '<link rel="stylesheet" href="css/digital-book.css">',
    '<link rel="stylesheet" href="css/digital-book-v2.css">'
  );

  // Replace JS script
  content = content.replace(
    '<script src="js/digital-book.js"></script>',
    '<script src="js/digital-book-v2.js"></script>'
  );

  // Replace createDigitalBook function call
  content = content.replace(
    /createDigitalBook\(/g,
    'createDigitalBookV2('
  );

  // Write updated file
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ Updated ${filename}`);
});

console.log('\n🎉 All lessons updated to use digital-book-v2!');
