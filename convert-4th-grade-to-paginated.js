const fs = require('fs');

// Convert static 4th grade lessons to paginated format
function convertToPaginated(lessonNum) {
  const staticFile = `4th-grade-lesson-${lessonNum}.html`;
  
  if (!fs.existsSync(staticFile)) {
    console.log(`⏭️  ${staticFile} not found`);
    return;
  }
  
  const html = fs.readFileSync(staticFile, 'utf8');
  
  // Extract title and meta
  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  const metaMatch = html.match(/<p class="meta">(.*?)<\/p>/);
  
  const lessonTitle = titleMatch ? titleMatch[1].replace(/📚\s*/, '').trim() : `Lesson ${lessonNum}`;
  const meta = metaMatch ? metaMatch[1].trim() : '';
  
  // Extract content between <div class="lesson-content and closing </div>
  const contentMatch = html.match(/<div class="lesson-content[^>]*">([\s\S]*?)<div class="nav-buttons">/);
  if (!contentMatch) {
    console.error(`❌ Could not find lesson content in ${staticFile}`);
    return;
  }
  
  let content = contentMatch[1];
  
  // Split by section-card divs or by h3 headers
  const sections = [];
  
  // Method 1: Split by section-card divs
  const cardMatches = content.split(/<div class="section-card">/);
  
  cardMatches.forEach((cardContent, index) => {
    if (index === 0 && !cardContent.trim()) return; // Skip empty first match
    
    // Extract until </div> (but be careful of nested divs)
    let depth = 1;
    let sectionHTML = '';
    let inSection = false;
    
    for (let i = 0; i < cardContent.length; i++) {
      const remaining = cardContent.substring(i);
      
      if (remaining.startsWith('<div')) {
        depth++;
      } else if (remaining.startsWith('</div>')) {
        depth--;
        if (depth === 0) break;
      }
      
      sectionHTML += cardContent[i];
    }
    
    if (sectionHTML.trim()) {
      // Extract title from h3 or h4
      const titleMatch = sectionHTML.match(/<h[34][^>]*>(.*?)<\/h[34]>/);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : `Section ${sections.length + 1}`;
      
      sections.push({
        title,
        content: sectionHTML.trim()
      });
    }
  });
  
  if (sections.length === 0) {
    console.error(`❌ No sections found in ${staticFile}`);
    return;
  }
  
  // Generate paginated HTML
  const escapedContent = sections.map(s => s.content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
  );
  
  const paginatedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lessonTitle} - BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <script src="js/lesson-autosave.js"></script>
    <script src="js/answer-validation.js"></script>
    <script src="js/lesson-completion.js"></script>
</head>
<body class="lesson-viewer">
    <!-- Top Navigation -->
    <div class="lesson-top-nav">
        <a href="student-dashboard.html" class="nav-home">🏠 Home</a>
        <div class="lesson-progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
            <span class="progress-text" id="progress-text">0% Complete</span>
        </div>
        <div class="lesson-day-indicator">
            Day <span id="current-day">${lessonNum}</span>
            <span class="online-indicator">● Online</span>
        </div>
    </div>

    <!-- Lesson Container -->
    <div id="lesson-container" class="lesson-container"></div>

    <!-- Scripts -->
    <script src="js/lesson-viewer.js"></script>
    
    <script>
        // Lesson ${lessonNum} Configuration
        const lesson${lessonNum}Config = {
            lessonId: '4th-grade-day-${lessonNum}',
            gradeLevel: '4th-grade',
            title: '${lessonTitle.replace(/'/g, "\\'")}',
            subtitle: '${meta.replace(/'/g, "\\'")}',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <div class="character">📖</div>
                            <h1>Day ${lessonNum}</h1>
                            <p class="subtitle">4th Grade ELA</p>
                            <p style="font-size: 20px; color: #B06821; margin: 15px 0; font-weight: 600;">${meta.replace(/'/g, "\\'").replace(/•/g, '')}</p>
                        </div>
                    \`
                },
                
${sections.map((section, index) => `                // Page ${index + 2}: ${section.title.replace(/'/g, "\\'")}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            ${escapedContent[index]}
                        </div>
                    \`
                }`).join(',\n\n')}
            ]
        };

        // Initialize lesson viewer
        createLessonViewer('lesson-container', lesson${lessonNum}Config);
        
        // Initialize autosave after a short delay
        setTimeout(() => {
            if (typeof initializeAutosave === 'function') {
                initializeAutosave();
            }
        }, 1000);
    </script>
</body>
</html>`;
  
  // Write paginated version
  fs.writeFileSync(staticFile, paginatedHTML);
  console.log(`✅ Converted lesson ${lessonNum} to paginated format (${sections.length + 1} pages total)`);
}

// Convert all 4th grade lessons
console.log('Converting ALL 4th grade lessons to paginated format...\n');

let successCount = 0;
for (let i = 1; i <= 180; i++) {
  try {
    convertToPaginated(i);
    successCount++;
  } catch (error) {
    console.error(`❌ Error converting lesson ${i}:`, error.message);
  }
}

console.log(`\n✨ Done! Converted ${successCount} lessons to paginated format!`);
console.log('Each lesson now has multiple pages with Next/Previous navigation.');
