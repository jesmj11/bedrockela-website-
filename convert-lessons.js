// BedrockELA Lesson Converter
// Converts markdown lessons to HTML pages

const fs = require('fs');
const path = require('path');

// Lesson template
function generateLessonHTML(lessonData) {
  const { number, title, content, book, unit, prevLesson, nextLesson } = lessonData;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${number}: ${title} - BedrockELA</title>
    <link rel="stylesheet" href="css/flashcard-game.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.8;
            color: #1B2A30;
            background: linear-gradient(135deg, #B06821 0%, #305853 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        .header {
            background: white;
            border-radius: 20px 20px 0 0;
            padding: 30px;
            text-align: center;
            border-bottom: 4px solid #B06821;
        }
        .header h1 { color: #305853; font-size: 2rem; margin-bottom: 5px; }
        .header .meta { color: #666; font-size: 0.9rem; }
        .lesson-content {
            background: white;
            padding: 40px;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .lesson-content h2 { color: #B06821; margin: 30px 0 15px 0; font-size: 1.5rem; }
        .lesson-content h3 { color: #305853; margin: 25px 0 12px 0; font-size: 1.2rem; }
        .lesson-content h4 { color: #666; margin: 20px 0 10px 0; }
        .lesson-content p { margin: 15px 0; }
        .lesson-content ul, .lesson-content ol { margin: 15px 0 15px 30px; }
        .lesson-content li { margin: 8px 0; }
        .lesson-content strong { color: #305853; }
        .lesson-content em { color: #B06821; }
        .reading-tip {
            background: #FFF9E6;
            border-left: 4px solid #B06821;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .vocab-box {
            background: #E8F4F8;
            border-left: 4px solid #305853;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .question {
            background: #f5f5f5;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
        }
        .nav-buttons {
            display: flex;
            justify-content: space-between;
            margin: 30px 0;
            gap: 15px;
        }
        .nav-btn {
            background: linear-gradient(135deg, #B06821 0%, #305853 100%);
            color: white;
            padding: 12px 25px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s;
            display: inline-block;
        }
        .nav-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .nav-btn.disabled { opacity: 0.4; pointer-events: none; }
        .top-nav {
            background: rgba(48,88,83,0.95);
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .top-nav .logo {
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
        }
        .top-nav .dashboard-btn {
            background: #B06821;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            text-decoration: none;
            font-weight: bold;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .top-nav .dashboard-btn:hover {
            background: #8B4F19;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="top-nav">
            <div class="logo">📚 BedrockELA - 4th Grade</div>
            <a href="student-dashboard-live.html" class="dashboard-btn">← Back to Dashboard</a>
        </div>
        
        <div class="header">
            <h1>📚 Lesson ${number}: ${title}</h1>
            <p class="meta">${book}${unit ? ' • Unit ' + unit : ''}</p>
        </div>
        
        <div class="lesson-content">
${content}
        </div>

        <div class="nav-buttons">
            ${prevLesson ? `<a href="4th-grade-lesson-${prevLesson}.html" class="nav-btn">← Lesson ${prevLesson}</a>` : '<span class="nav-btn disabled">← First Lesson</span>'}
            <a href="student-dashboard-live.html" class="nav-btn">Dashboard</a>
            ${nextLesson ? `<a href="4th-grade-lesson-${nextLesson}.html" class="nav-btn">Lesson ${nextLesson} →</a>` : '<span class="nav-btn disabled">Last Lesson →</span>'}
        </div>
    </div>
</body>
</html>`;
}

// Parse markdown lesson
function parseMarkdownLesson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Extract lesson number from filename
  const filename = path.basename(filePath);
  const lessonMatch = filename.match(/lesson-(\d+)/);
  const lessonNumber = lessonMatch ? parseInt(lessonMatch[1]) : 1;
  
  // Parse title and metadata
  let title = '';
  let book = '';
  let unit = '';
  let htmlContent = '';
  
  // First line often has: UNIT X • LESSON X OF 180
  // Second line: Title
  if (lines[1]) title = lines[1].trim();
  if (lines[2]) book = lines[2].trim();
  
  // Convert markdown to HTML (simple conversion)
  let inList = false;
  for (let i = 4; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip empty lines
    if (!line.trim()) {
      if (inList) {
        htmlContent += '</ul>\n';
        inList = false;
      }
      htmlContent += '<br>\n';
      continue;
    }
    
    // Headers
    if (line.startsWith('###')) {
      htmlContent += `<h4>${line.replace(/^###\s*/, '')}</h4>\n`;
    } else if (line.startsWith('##')) {
      htmlContent += `<h3>${line.replace(/^##\s*/, '')}</h3>\n`;
    } else if (line.startsWith('#')) {
      htmlContent += `<h2>${line.replace(/^#\s*/, '')}</h2>\n`;
    }
    // Emoji headers (common in our lessons)
    else if (line.match(/^[📚🧐🔍💬✅✍️🌟]/)) {
      if (line.includes('Part 1:') || line.includes('Part 2:') || line.includes('Part 3:') || line.includes('Part 4:') || line.includes('Part 5:')) {
        htmlContent += `<h3>${line}</h3>\n`;
      } else {
        htmlContent += `<h4>${line}</h4>\n`;
      }
    }
    // Bullet points
    else if (line.startsWith('•')) {
      if (!inList) {
        htmlContent += '<ul>\n';
        inList = true;
      }
      htmlContent += `<li>${line.replace(/^•\s*/, '')}</li>\n`;
    }
    // Reading tips / special boxes
    else if (line.includes('💡') || line.includes('Reading tip:')) {
      htmlContent += `<div class="reading-tip">${line}</div>\n`;
    }
    // Vocab
    else if (line.match(/^\w+\s+\(noun\)|^\w+\s+\(verb\)|^\w+\s+\(adjective\)/)) {
      htmlContent += `<div class="vocab-box"><strong>${line}</strong></div>\n`;
    }
    // Questions
    else if (line.match(/^\d+\./)) {
      htmlContent += `<div class="question">${line}</div>\n`;
    }
    // Regular paragraphs
    else {
      if (inList && !line.startsWith('•')) {
        htmlContent += '</ul>\n';
        inList = false;
      }
      // Bold and italic
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/\*(.+?)\*/g, '<em>$1</em>');
      htmlContent += `<p>${line}</p>\n`;
    }
  }
  
  if (inList) {
    htmlContent += '</ul>\n';
  }
  
  return {
    number: lessonNumber,
    title: title || `Day ${lessonNumber}`,
    content: htmlContent,
    book: book || 'The Wonderful Wizard of Oz',
    unit: '',
    prevLesson: lessonNumber > 1 ? lessonNumber - 1 : null,
    nextLesson: lessonNumber < 85 ? lessonNumber + 1 : null
  };
}

// Main conversion
const lessonsDir = path.join(__dirname, 'curriculum/grade4/lessons');
const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.md')).sort();

console.log(`🚀 Converting ${files.length} lessons...`);

files.forEach((file, index) => {
  const filePath = path.join(lessonsDir, file);
  const lessonData = parseMarkdownLesson(filePath);
  const html = generateLessonHTML(lessonData);
  
  const outputPath = path.join(__dirname, `4th-grade-lesson-${lessonData.number}.html`);
  fs.writeFileSync(outputPath, html);
  
  console.log(`✅ Converted lesson ${lessonData.number}: ${lessonData.title}`);
});

console.log(`\n🎉 Done! Created ${files.length} HTML lesson pages!`);
