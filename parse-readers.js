/**
 * Parse markdown readers into digital book format
 * Reads curriculum/readers/*.md and generates book config JSON
 */

const fs = require('fs');
const path = require('path');

const readersDir = path.join(__dirname, 'curriculum', 'readers');
const outputDir = path.join(__dirname, 'book-data');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function extractLessonNumbers(filename) {
  // Extract lesson numbers from filename
  // e.g., "enormous-turnip-lessons-1-5.md" -> [1, 2, 3, 4, 5]
  const match = filename.match(/lessons?-(\d+)(?:-(\d+))?/);
  if (!match) return [];
  
  const start = parseInt(match[1]);
  const end = match[2] ? parseInt(match[2]) : start;
  
  const lessons = [];
  for (let i = start; i <= end; i++) {
    lessons.push(i);
  }
  return lessons;
}

function parseMarkdownToBook(markdown, filename) {
  const lines = markdown.split('\n');
  const pages = [];
  let currentPage = null;
  
  // Extract title from first # heading
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const coverTitle = titleMatch ? titleMatch[1] : 'Story';
  
  // Extract author/subtitle if present
  const authorMatch = markdown.match(/^##\s+(.+)$/m);
  const coverAuthor = authorMatch ? authorMatch[1] : '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip front matter and teacher notes
    if (line.startsWith('**Teacher') || line.startsWith('**For the') || 
        line.startsWith('**Target Lessons') || line.startsWith('**Phonics') ||
        line.startsWith('**Key Sight') || line.startsWith('**Decodable') ||
        line.startsWith('**Comprehension') || line.startsWith('**How to Use')) {
      continue;
    }
    
    // Page marker (### Page 1, ### Page 2, etc.)
    if (line.match(/^###\s+(Page|Chapter)\s+\d+/)) {
      // Save previous page
      if (currentPage && currentPage.text) {
        pages.push(currentPage);
      }
      
      // Start new page
      currentPage = {
        title: line.replace(/^###\s+/, ''),
        text: '',
        emoji: ''
      };
      continue;
    }
    
    // Extract emoji from line
    const emojiMatch = line.match(/([🌠🌼🐞💭🦉✨🌟🌙⭐🐐🌳🏠🍞🌾🥖🐑🐺🦊🌲🐻🏔️🌸🐝🦋🌻🐛🐜🌿🍄🐾🦆🐸🎭🎪🎨🎬🎤🎵🎶🎸🎹🎺🎻🥁🎲🎯🎳🎮🎰🎱🏀⚽🏈⚾🥎🎾🏐🏉🎱🏏🏑🏒🏓🏸🥊🥋🥅⛳⛸🎣🎿⛷️])/);
    if (emojiMatch && currentPage && !currentPage.emoji) {
      currentPage.emoji = emojiMatch[1];
      // Remove emoji from line
      const cleanLine = line.replace(emojiMatch[1], '').trim();
      if (cleanLine) {
        currentPage.text += cleanLine + ' ';
      }
      continue;
    }
    
    // Regular content line
    if (line && !line.startsWith('#') && !line.startsWith('---') && currentPage) {
      // Remove markdown formatting
      let cleanLine = line
        .replace(/\*\*(.+?)\*\*/g, '$1') // bold
        .replace(/\*(.+?)\*/g, '$1')     // italic
        .replace(/\[.+?\]/g, '')         // stage directions in brackets
        .trim();
      
      if (cleanLine) {
        currentPage.text += cleanLine + ' ';
      }
    }
  }
  
  // Save last page
  if (currentPage && currentPage.text) {
    pages.push(currentPage);
  }
  
  // Clean up text
  pages.forEach(page => {
    page.text = page.text.trim();
  });
  
  // Determine cover emoji (use first page emoji or default)
  const coverEmoji = pages.length > 0 && pages[0].emoji ? pages[0].emoji : '📖';
  
  // Build book config
  return {
    coverTitle,
    coverAuthor,
    coverEmoji,
    coverColor: '#1B2A4A',
    pages: pages.map(page => ({
      title: page.title || '',
      text: page.text,
      emoji: page.emoji || ''
    }))
  };
}

// Process all reader files
const files = fs.readdirSync(readersDir).filter(f => f.endsWith('.md'));

const mapping = {}; // Map lesson number -> book filename

files.forEach(file => {
  const filepath = path.join(readersDir, file);
  const markdown = fs.readFileSync(filepath, 'utf-8');
  
  const bookConfig = parseMarkdownToBook(markdown, file);
  
  // Extract lesson numbers
  const lessons = extractLessonNumbers(file);
  
  // Generate output filename
  const bookFilename = file.replace('.md', '.json');
  const outputPath = path.join(outputDir, bookFilename);
  
  // Save book config
  fs.writeFileSync(outputPath, JSON.stringify(bookConfig, null, 2));
  
  // Map lessons to this book
  lessons.forEach(lessonNum => {
    mapping[lessonNum] = bookFilename;
  });
  
  console.log(`✅ Parsed ${file} -> ${bookFilename} (lessons ${lessons.join(', ')})`);
});

// Save mapping file
const mappingPath = path.join(outputDir, 'lesson-to-book-mapping.json');
fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));

console.log(`\n📚 Generated ${files.length} book configs`);
console.log(`📋 Mapping saved to ${mappingPath}`);
