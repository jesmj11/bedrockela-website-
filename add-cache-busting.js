#!/usr/bin/env node

/**
 * Add cache-busting version numbers to all CSS/JS references
 * This forces browsers to reload fresh files after updates
 */

const fs = require('fs');

const VERSION = Date.now(); // Use timestamp as version
console.log(`🔧 Adding cache buster v${VERSION} to all files...\n`);

const files = fs.readdirSync('.')
  .filter(f => f.endsWith('.html'));

let totalFixed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Update CSS references
  const cssUpdated = content.replace(
    /href="css\/([^"?]+\.css)(\?v=[^"]+)?"/g,
    (match, filename) => {
      modified = true;
      return `href="css/${filename}?v=${VERSION}"`;
    }
  );
  
  // Update JS references
  const jsUpdated = cssUpdated.replace(
    /src="js\/([^"?]+\.js)(\?v=[^"]+)?"/g,
    (match, filename) => {
      modified = true;
      return `src="js/${filename}?v=${VERSION}"`;
    }
  );
  
  if (modified) {
    fs.writeFileSync(file, jsUpdated);
    totalFixed++;
    if (totalFixed % 100 === 0) {
      console.log(`  ✓ Updated ${totalFixed} files...`);
    }
  }
});

console.log(`\n✅ Added cache buster to ${totalFixed} HTML files!`);
console.log(`Version: ${VERSION}`);
console.log(`\nAll CSS/JS files will now load fresh in browsers! 🎉\n`);
