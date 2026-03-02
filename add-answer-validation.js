/**
 * Add answer validation script to all 4th grade lessons
 */

const fs = require('fs');
const path = require('path');

// Find all 4th grade lesson files
const lessonFiles = [];
for (let i = 1; i <= 180; i++) {
  const filename = `4th-grade-day-${i}.html`;
  const filepath = path.join(__dirname, filename);
  if (fs.existsSync(filepath)) {
    lessonFiles.push(filepath);
  }
}

console.log(`Found ${lessonFiles.length} lessons to update`);

let updatedCount = 0;

lessonFiles.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Check if already has answer-validation.js
  if (content.includes('answer-validation.js')) {
    console.log(`✓ ${path.basename(filepath)} already has answer validation`);
    return;
  }
  
  // Add script after lesson-autosave.js
  const scriptToAdd = `    <script src="js/answer-validation.js"></script>`;
  
  content = content.replace(
    '<script src="js/lesson-autosave.js"></script>',
    `<script src="js/lesson-autosave.js"></script>\n${scriptToAdd}`
  );
  
  // Write back
  fs.writeFileSync(filepath, content, 'utf8');
  updatedCount++;
  
  if (updatedCount % 20 === 0) {
    console.log(`Updated ${updatedCount} lessons...`);
  }
});

console.log(`\n✅ Added answer validation to ${updatedCount} lessons!`);
