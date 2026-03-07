#!/usr/bin/env node

/**
 * Convert all 5th grade lessons from old format to BedrockELA lesson-viewer format
 * 
 * OLD FORMAT:
 * - Uses lesson-styles.css
 * - Manual pagination with JavaScript
 * - <div class="page"> structure
 * 
 * NEW FORMAT:
 * - Uses lesson-viewer.css
 * - initLessonViewer() with pages array
 * - <body class="lesson-viewer"><div id="lesson-container"></div>
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const GRADE5_DIR = path.join(__dirname, 'curriculum/grade5');

// Helper function to escape backticks and ${} in template strings
function escapeForTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

// Helper function to extract lesson number from filename
function extractLessonNumber(filename) {
  const match = filename.match(/(?:lesson-|day-)(\d+)/);
  return match ? match[1] : '1';
}

// Helper function to extract unit name from path
function getUnitName(filePath) {
  const parts = filePath.split('/');
  return parts[parts.length - 2]; // Get parent directory name
}

// Convert a single lesson file
function convertLesson(inputPath, outputPath) {
  console.log(`Converting: ${path.basename(inputPath)}`);
  
  const html = fs.readFileSync(inputPath, 'utf-8');
  
  // Check if already converted (has lesson-viewer.css)
  if (html.includes('lesson-viewer.css')) {
    console.log(`  ⏭️  Already in new format, skipping...`);
    return 'skipped';
  }
  
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Extract metadata
  const titleElement = doc.querySelector('title');
  const title = titleElement ? titleElement.textContent : 'Lesson';
  
  // Extract lesson number and unit
  const lessonNumber = extractLessonNumber(path.basename(inputPath));
  const unit = getUnitName(inputPath);
  const lessonId = `5th-grade-lesson-${lessonNumber}`;
  
  // Extract all pages - try both .page and .lesson-page
  let pages = Array.from(doc.querySelectorAll('.page'));
  
  // If no .page elements found, try .lesson-page
  if (pages.length === 0) {
    pages = Array.from(doc.querySelectorAll('.lesson-page'));
  }
  
  if (pages.length === 0) {
    console.warn(`  ⚠️  No pages found in ${path.basename(inputPath)}`);
    return false;
  }
  
  // Convert each page to a render function
  const pageConfigs = pages.map((page, index) => {
    // Get the HTML content of the page
    let pageHtml = page.innerHTML;
    
    // Remove the page-active class from the HTML
    pageHtml = pageHtml.replace(/class="page-active"/g, 'class=""');
    
    // Escape the HTML for template literal
    pageHtml = escapeForTemplate(pageHtml);
    
    // Wrap in content-page or title-page div
    const isFirstPage = index === 0;
    const isCompletionPage = page.classList.contains('completion-page');
    
    let wrappedHtml;
    if (isCompletionPage) {
      wrappedHtml = `<div class="lesson-page-card completion-page">${pageHtml}</div>`;
    } else if (isFirstPage) {
      wrappedHtml = `<div class="lesson-page-card title-page">${pageHtml}</div>`;
    } else {
      wrappedHtml = `<div class="lesson-page-card content-page">${pageHtml}</div>`;
    }
    
    return `                {
                    render: () => \`${wrappedHtml}\`
                }`;
  });
  
  // Generate the new HTML structure
  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../../../css/lesson-viewer.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="../../../js/lesson-viewer.js"></script>
    <script src="../../../firebase-config.js"></script>
    <script src="../../../js/lesson-completion.js"></script>
    <script src="../../../js/lesson-autosave.js"></script>
    <script src="../../../js/save-button-injector.js"></script>
    <script src="../../../js/answer-validation.js"></script>
    <script src="../../../js/grade-normalizer.js"></script>
    <script src="../../../js/offline-sync.js"></script>
    <script src="../../../js/text-to-speech.js"></script>
    <script src="../../../js/digital-book.js"></script>
    <script type="module" src="../../../js/vocab-games.js"></script>
    
    <script>
        const lesson${lessonNumber}Config = {
            lessonId: '${lessonId}',
            gradeLevel: '5th-grade',
            title: '${escapeForTemplate(title)}',
            pages: [
${pageConfigs.join(',\n')}
            ]
        };

        // Initialize the lesson viewer
        window.addEventListener('DOMContentLoaded', () => {
            createLessonViewer('lesson-container', lesson${lessonNumber}Config);
        });
    </script>
</body>
</html>`;
  
  // Write the new file
  fs.writeFileSync(outputPath, newHtml, 'utf-8');
  console.log(`  ✅ Converted successfully! (${pages.length} pages)`);
  return true;
}

// Main execution
function main() {
  console.log('🐉 BedrockELA Grade 5 Lesson Converter\n');
  
  // Find all lesson files
  const units = ['arabian', 'celtic', 'egyptian', 'dracula', 'greek', 'roman', 'norse'];
  let totalConverted = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  
  units.forEach(unit => {
    const unitDir = path.join(GRADE5_DIR, unit);
    
    if (!fs.existsSync(unitDir)) {
      console.warn(`⚠️  Unit directory not found: ${unit}`);
      return;
    }
    
    console.log(`\n📁 Converting ${unit} unit...`);
    
    const files = fs.readdirSync(unitDir)
      .filter(f => f.match(/5th-grade-(lesson-|day-)\d+/) && f.endsWith('.html'))
      .filter(f => !f.includes('-new.html')) // Skip duplicate day-79-new.html
      .sort();
    
    files.forEach(file => {
      const inputPath = path.join(unitDir, file);
      const outputPath = inputPath; // Overwrite the original file
      
      try {
        const result = convertLesson(inputPath, outputPath);
        if (result === 'skipped') {
          totalSkipped++;
        } else if (result === true) {
          totalConverted++;
        } else {
          totalFailed++;
        }
      } catch (error) {
        console.error(`  ❌ Error converting ${file}:`, error.message);
        totalFailed++;
      }
    });
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Conversion complete!`);
  console.log(`   Successfully converted: ${totalConverted} lessons`);
  if (totalSkipped > 0) {
    console.log(`   Already converted (skipped): ${totalSkipped} lessons`);
  }
  if (totalFailed > 0) {
    console.log(`   Failed: ${totalFailed} lessons`);
  }
  console.log(`   Total processed: ${totalConverted + totalSkipped + totalFailed} lessons`);
  console.log('='.repeat(60));
}

// Run the script
main();
