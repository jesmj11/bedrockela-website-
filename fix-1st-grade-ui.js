const fs = require('fs');

// Fix UI issues in 1st grade lessons 1-30
console.log('🔧 Fixing UI issues in 1st grade lessons...\n');

for (let lessonNum = 1; lessonNum <= 30; lessonNum++) {
  const filename = `1st-grade-lesson-${lessonNum}-v2.html`;
  
  if (!fs.existsSync(filename)) {
    console.log(`⏭️  Skipping lesson ${lessonNum} (file not found)`);
    continue;
  }
  
  let html = fs.readFileSync(filename, 'utf-8');
  let changes = [];
  
  // Fix 1: Remove emoji from Letter Explorer header
  if (html.includes('🔤 Letter Explorer')) {
    html = html.replace(/🔤 Letter Explorer/g, 'Letter Explorer');
    changes.push('Removed emoji from Letter Explorer');
  }
  
  // Fix 2: Replace Story Time emoji with SVG book icon
  if (html.includes('📖 Story Time')) {
    html = html.replace(
      /📖 Story Time/g,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 8px;">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
      </svg>Story Time`
    );
    changes.push('Replaced Story Time emoji with SVG book');
  }
  
  // Fix 3: Center content in vowel introduction pages
  // Look for "What are Vowels?" and similar pages
  if (html.includes('What are Vowels?')) {
    // Add text-align: center to the vowel pages
    html = html.replace(
      /<div class="lesson-page-card content-page">\s*<h2>What are Vowels\?<\/h2>/,
      `<div class="lesson-page-card content-page" style="text-align: center;">
          <h2>What are Vowels?</h2>`
    );
    changes.push('Centered "What are Vowels?" page');
  }
  
  // Center individual vowel letter pages (A says 'ah', E says 'eh', etc.)
  const vowelPatterns = [
    "A says 'ah'",
    "E says 'eh'",
    "I says 'ih'",
    "O says 'ah'",
    "U says 'uh'"
  ];
  
  vowelPatterns.forEach(pattern => {
    const regex = new RegExp(`<div class="lesson-page-card content-page">\\s*<h2>${pattern.replace(/'/g, "['']")}</h2>`, 'g');
    if (html.match(regex)) {
      html = html.replace(
        regex,
        `<div class="lesson-page-card content-page" style="text-align: center;">
          <h2>${pattern}</h2>`
      );
      if (!changes.includes('Centered vowel pages')) {
        changes.push('Centered vowel pages');
      }
    }
  });
  
  // Write updated file
  if (changes.length > 0) {
    fs.writeFileSync(filename, html);
    console.log(`✅ Lesson ${lessonNum}: ${changes.join(', ')}`);
  } else {
    console.log(`⏭️  Lesson ${lessonNum}: No changes needed`);
  }
}

console.log('\n🎉 UI fixes complete!');
