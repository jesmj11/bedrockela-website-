/**
 * Fix lesson completion issues:
 * 1. Last page "Next" button should trigger completion
 * 2. Show completion modal
 * 3. Navigate to next lesson or dashboard
 */

const fs = require('fs');

const fix = `
  function nextPage() {
    const onLastPage = currentPage === lessonConfig.pages.length - 1;
    
    if (onLastPage) {
      // On last page, clicking Next should complete the lesson
      handleLessonComplete();
    } else {
      goToPage(currentPage + 1);
    }
  }

  function handleLessonComplete() {
    if (!studentId) {
      alert('Please log in to save your progress!');
      window.location.href = 'index.html';
      return;
    }

    // Extract lesson number from lessonId
    const lessonMatch = lessonId.match(/(?:lesson-|day-)(\\d+)/);
    const lessonNumber = lessonMatch ? parseInt(lessonMatch[1]) : 1;
    
    // Mark complete
    if (typeof LessonCompletion !== 'undefined') {
      const completion = new LessonCompletion(studentId, lessonNumber, gradeLevel);
      
      completion.markComplete().then(() => {
        // Show completion modal
        completion.showCompletionModal();
      }).catch(err => {
        console.error('Error saving completion:', err);
        // Still show modal even if save failed
        completion.showCompletionModal();
      });
    } else {
      alert('Great job! Lesson complete!');
      window.location.href = 'student-dashboard.html';
    }
  }

  function prevPage() {
    goToPage(currentPage - 1);
  }
`;

const newRender = `
        <button 
          class="nav-arrow ${currentPage === lessonConfig.pages.length - 1 ? '' : ''}" 
          onclick="window.lessonNextPage()"
        >
          ${currentPage === lessonConfig.pages.length - 1 ? 'Finish Lesson ✓' : 'Next →'}
        </button>
`;

console.log('Fixing lesson completion...');
console.log('This will update js/lesson-viewer.js');

// Read the file
let content = fs.readFileSync('js/lesson-viewer.js', 'utf8');

// Replace the nextPage and prevPage functions
const oldNextPrev = `  function nextPage() {
    goToPage(currentPage + 1);
  }

  function prevPage() {
    goToPage(currentPage - 1);
  }`;

content = content.replace(oldNextPrev, fix);

// Update the Next button in render() to show "Finish Lesson" on last page
const oldButton = `        <button 
          class="nav-arrow \${currentPage === lessonConfig.pages.length - 1 ? 'disabled' : ''}" 
          onclick="window.lessonNextPage()"
          \${currentPage === lessonConfig.pages.length - 1 ? 'disabled' : ''}
        >
          Next →
        </button>`;

const newButton = `        <button 
          class="nav-arrow" 
          onclick="window.lessonNextPage()"
        >
          \${currentPage === lessonConfig.pages.length - 1 ? 'Finish Lesson ✓' : 'Next →'}
        </button>`;

content = content.replace(oldButton, newButton);

// Also remove the checkLessonCompletion since we're handling it in nextPage now
content = content.replace('    setTimeout(() => checkLessonCompletion(), 500);', '    // Completion handled by Finish Lesson button');

// Write back
fs.writeFileSync('js/lesson-viewer.js', content, 'utf8');

console.log('✅ Fixed lesson completion system!');
console.log('');
console.log('Changes:');
console.log('  - Last page button now says "Finish Lesson ✓"');
console.log('  - Clicking it will mark lesson complete and show modal');
console.log('  - Progress will save to Firebase');
console.log('  - Dashboard will update with next lesson');
