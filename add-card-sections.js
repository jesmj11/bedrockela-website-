const fs = require('fs');

// More careful approach - wrap each section in a card
function addCardSections(htmlContent) {
  let updated = htmlContent;
  
  // Add section card CSS
  const cardCSS = `
        .lesson-sections {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .section-card {
            background: white;
            border-radius: 20px;
            padding: 35px;
            box-shadow: 0 4px 20px rgba(48,88,83,0.12);
            border: 2px solid rgba(48,88,83,0.08);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .section-card:hover {
            box-shadow: 0 6px 25px rgba(48,88,83,0.18);
        }
        .section-card h3, .section-card h4 {
            margin-top: 0;
        }`;
  
  // Insert CSS before </style>
  updated = updated.replace('</style>', cardCSS + '\n    </style>');
  
  // Change lesson-content to lesson-sections
  updated = updated.replace(
    /<div class="lesson-content">/,
    '<div class="lesson-content lesson-sections">'
  );
  
  // Strategy: Find each major section header and wrap content until next header
  // Pattern: <h3> or <h4> at start of section
  
  // First: Wrap the Welcome section (before first <h3>)
  updated = updated.replace(
    /(<div class="lesson-content lesson-sections">)([\s\S]*?)(<h3>)/,
    '$1\n<div class="section-card">\n$2\n</div>\n<div class="section-card">\n$3'
  );
  
  // Wrap content between each <h3> section
  // Find every <h3> and wrap until next <h3> or </div> (end of content)
  const sections = [];
  let currentSection = '';
  let inSection = false;
  let depth = 0;
  
  const lines = updated.split('\n');
  const result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Start wrapping after lesson-sections div
    if (line.includes('class="lesson-content lesson-sections"')) {
      result.push(line);
      result.push('<div class="section-card">');
      inSection = true;
      continue;
    }
    
    // New section starts with <h3>
    if (inSection && line.trim().startsWith('<h3>')) {
      result.push('</div>');
      result.push('<div class="section-card">');
      result.push(line);
      continue;
    }
    
    // End sections before nav-buttons
    if (line.includes('class="nav-buttons"')) {
      if (inSection) {
        result.push('</div>');
        inSection = false;
      }
      result.push(line);
      continue;
    }
    
    // Close section before final </div> of lesson-content
    if (line.includes('</div>') && line.trim() === '</div>' && i > lines.length - 20) {
      if (inSection) {
        result.push('</div>');
        inSection = false;
      }
      result.push(line);
      continue;
    }
    
    result.push(line);
  }
  
  return result.join('\n');
}

// Process all 4th grade lessons
const lessonFiles = fs.readdirSync('.')
  .filter(f => f.match(/^4th-grade-lesson-\d+\.html$/))
  .sort((a, b) => {
    const aNum = parseInt(a.match(/\d+/)[0]);
    const bNum = parseInt(b.match(/\d+/)[0]);
    return aNum - bNum;
  });

console.log(`Found ${lessonFiles.length} lesson files to update...`);

let updated = 0;
lessonFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Skip if already has section-card
    if (content.includes('section-card')) {
      console.log(`⏭️  ${file} already has section cards`);
      return;
    }
    
    const updatedContent = addCardSections(content);
    fs.writeFileSync(file, updatedContent);
    console.log(`✅ Updated ${file}`);
    updated++;
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
  }
});

console.log(`\n✨ Done! Updated ${updated} of ${lessonFiles.length} lessons.`);
