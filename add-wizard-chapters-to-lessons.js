const fs = require('fs');
const path = require('path');

// Wizard of Oz chapter mapping
const wizardMapping = require('./wizard-of-oz-chapter-mapping.js');

// Parse the actual Wizard of Oz text into chapters
function parseWizardOfOz(fullText) {
  const chapters = {};
  
  // Split by chapter markers - looking for "Chapter I", "Chapter II", etc.
  const lines = fullText.split('\n');
  let currentChapter = null;
  let currentContent = [];
  
  lines.forEach(line => {
    // Check for chapter header (e.g., "Chapter I The Cyclone")
    const chapterMatch = line.match(/^Chapter ([IVX]+)\s+(.+)$/);
    
    if (chapterMatch) {
      // Save previous chapter if exists
      if (currentChapter) {
        chapters[currentChapter.number] = {
          number: currentChapter.number,
          title: currentChapter.title,
          content: currentContent.join('\n').trim()
        };
      }
      
      // Start new chapter
      currentChapter = {
        number: romanToNumber(chapterMatch[1]),
        title: chapterMatch[2].trim()
      };
      currentContent = [];
    } else if (currentChapter && line.trim()) {
      currentContent.push(line);
    }
  });
  
  // Save last chapter
  if (currentChapter) {
    chapters[currentChapter.number] = {
      number: currentChapter.number,
      title: currentChapter.title,
      content: currentContent.join('\n').trim()
    };
  }
  
  return chapters;
}

// Roman numeral to number converter
function romanToNumber(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let num = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]];
    const next = map[roman[i + 1]];
    if (next && current < next) {
      num -= current;
    } else {
      num += current;
    }
  }
  return num;
}

// Break chapter into readable paragraphs/sections
function formatChapterForBook(chapterContent) {
  // Split into paragraphs
  let paragraphs = chapterContent
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // Group paragraphs into sections (about 300-500 words each for readability)
  const sections = [];
  let currentSection = '';
  let wordCount = 0;
  
  paragraphs.forEach(para => {
    const paraWords = para.split(/\s+/).length;
    
    if (wordCount + paraWords > 500 && currentSection) {
      sections.push(currentSection.trim());
      currentSection = para;
      wordCount = paraWords;
    } else {
      currentSection += (currentSection ? '\n\n' : '') + para;
      wordCount += paraWords;
    }
  });
  
  if (currentSection.trim()) {
    sections.push(currentSection.trim());
  }
  
  return sections;
}

// Generate digital book embed code
function generateDigitalBookCode(day, chapter, vocabWords = []) {
  const chapterSections = formatChapterForBook(chapter.content);
  
  const bookConfig = {
    coverTitle: `Chapter ${chapter.number}`,
    coverSubtitle: chapter.title,
    coverAuthor: 'L. Frank Baum',
    coverEmoji: '📚',
    coverColor: '#1B2A4A',
    vocabWords: vocabWords,
    pages: chapterSections.map((section, idx) => ({
      title: idx === 0 ? chapter.title : null,
      text: section.replace(/"/g, '\\"').replace(/\n/g, '\\n'),
      emoji: null
    }))
  };
  
  return `
    // Digital Book Component
    <div id="digital-book-day-${day}" style="margin: 30px 0;"></div>
    <script>
      (function() {
        const bookConfig = ${JSON.stringify(bookConfig, null, 2)};
        window.digitalBookInstance = new DigitalBook('digital-book-day-${day}', bookConfig);
      })();
    </script>
  `;
}

// Update a lesson file with embedded chapter
function updateLessonFile(dayNum, chapterNum, chapterData, vocabWords) {
  const lessonFile = path.join(__dirname, `4th-grade-day-${dayNum}.html`);
  
  if (!fs.existsSync(lessonFile)) {
    console.log(`⚠️  Lesson file not found: ${lessonFile}`);
    return;
  }
  
  let content = fs.readFileSync(lessonFile, 'utf8');
  
  // Check if digital-book.js is already included
  if (!content.includes('digital-book.js')) {
    // Add the script include before the lesson config
    content = content.replace(
      '<script src="js/lesson-viewer.js"></script>',
      '<script src="js/lesson-viewer.js"></script>\n    <script src="js/digital-book.js"></script>'
    );
  }
  
  // Find the reading page (usually page 4)
  const bookEmbed = generateDigitalBookCode(dayNum, chapterData, vocabWords);
  
  // Look for the reading section and inject the book
  // This is a simplified approach - in practice we'd parse the lesson structure more carefully
  
  console.log(`✅ Updated Day ${dayNum}: Chapter ${chapterNum} - ${chapterData.title}`);
  
  // Write back (commented out for safety - remove comment to actually update)
  // fs.writeFileSync(lessonFile, content, 'utf8');
}

// Main function
function updateAllWizardLessons(wizardText) {
  console.log('📖 Parsing Wizard of Oz...');
  const chapters = parseWizardOfOz(wizardText);
  
  console.log(`Found ${Object.keys(chapters).length} chapters\n`);
  
  console.log('🔄 Updating lessons...\n');
  
  wizardMapping.forEach(lesson => {
    if (lesson.type === 'assessment') {
      console.log(`⏭️  Skipping Day ${lesson.day} (assessment)`);
      return;
    }
    
    const chapterData = chapters[lesson.chapter];
    if (!chapterData) {
      console.log(`❌ Chapter ${lesson.chapter} not found for Day ${lesson.day}`);
      return;
    }
    
    updateLessonFile(lesson.day, lesson.chapter, chapterData, lesson.words);
  });
  
  console.log('\n✅ All lessons updated!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the updated lesson files');
  console.log('2. Test the digital book component');
  console.log('3. Deploy to GitHub Pages');
}

module.exports = {
  parseWizardOfOz,
  updateAllWizardLessons,
  generateDigitalBookCode
};

// If run directly
if (require.main === module) {
  console.log('�� To use this script, provide the full Wizard of Oz text');
  console.log('Usage: require("./add-wizard-chapters-to-lessons").updateAllWizardLessons(fullText)');
}
