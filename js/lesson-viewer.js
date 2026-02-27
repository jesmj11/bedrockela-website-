/**
 * Paginated Lesson Viewer - Teaching Textbooks Style
 * One page at a time with progress tracking
 */

const BACKEND_API = 'https://bedrockela-website-production.up.railway.app/api';

/**
 * Word Count Helper for Comprehension Questions
 * Enforces minimum word count and provides live feedback
 */
function createComprehensionQuestion(questionNumber, questionText, minWords = 30) {
  const id = `question-${questionNumber}`;
  const countId = `word-count-${questionNumber}`;
  
  return `
    <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
      <p style="font-weight: 700; margin-bottom: 10px;">${questionNumber}. ${questionText}</p>
      <textarea 
        id="${id}"
        style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
        oninput="updateWordCount('${id}', '${countId}', ${minWords})"
        placeholder="Write your answer here (minimum ${minWords} words)..."
      ></textarea>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
        <span id="${countId}" style="font-size: 14px; color: #666;">0 / ${minWords} words</span>
        <span id="${countId}-status" style="font-size: 14px; font-weight: 600;"></span>
      </div>
    </div>
  `;
}

/**
 * Update word count for a textarea
 */
window.updateWordCount = function(textareaId, countId, minWords) {
  const textarea = document.getElementById(textareaId);
  const countDisplay = document.getElementById(countId);
  const statusDisplay = document.getElementById(countId + '-status');
  
  if (!textarea || !countDisplay) return;
  
  const text = textarea.value.trim();
  const words = text.length > 0 ? text.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = words.length;
  
  countDisplay.textContent = `${wordCount} / ${minWords} words`;
  
  if (wordCount >= minWords) {
    countDisplay.style.color = '#305853';
    countDisplay.style.fontWeight = '700';
    statusDisplay.textContent = '✅ Great job!';
    statusDisplay.style.color = '#305853';
    textarea.style.borderColor = '#305853';
  } else if (wordCount > 0) {
    const remaining = minWords - wordCount;
    countDisplay.style.color = '#B06821';
    countDisplay.style.fontWeight = '600';
    statusDisplay.textContent = `${remaining} more word${remaining !== 1 ? 's' : ''} needed`;
    statusDisplay.style.color = '#B06821';
    textarea.style.borderColor = '#B06821';
  } else {
    countDisplay.style.color = '#666';
    countDisplay.style.fontWeight = '400';
    statusDisplay.textContent = '';
    textarea.style.borderColor = '#305853';
  }
};

function createLessonViewer(containerId, lessonConfig) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');
  const studentId = studentData.student?.id;
  const lessonId = lessonConfig.lessonId;
  const gradeLevel = lessonConfig.gradeLevel;

  let currentPage = 0;
  let lessonProgress = {
    story_completed: false,
    letter_explorer_completed: false,
    flashcard_completed: false,
    current_page: 0,
    total_pages: lessonConfig.pages.length
  };

  // Load saved progress
  if (studentId) {
    loadLessonProgress();
  }

  function loadLessonProgress() {
    fetch(`${BACKEND_API}/lesson-progress/${studentId}/${lessonId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.progress) {
          lessonProgress = {
            story_completed: data.progress.story_completed || false,
            letter_explorer_completed: data.progress.letter_explorer_completed || false,
            flashcard_completed: data.progress.flashcard_completed || false,
            current_page: data.progress.current_page || 0,
            total_pages: lessonConfig.pages.length
          };
          currentPage = lessonProgress.current_page;
          render();
        } else {
          render();
        }
      })
      .catch(err => {
        console.error('Error loading lesson progress:', err);
        render();
      });
  }

  function saveLessonProgress() {
    if (!studentId) return;

    const progress = {
      student_id: studentId,
      lesson_id: lessonId,
      grade_level: gradeLevel,
      story_completed: lessonProgress.story_completed,
      letter_explorer_completed: lessonProgress.letter_explorer_completed,
      flashcard_completed: lessonProgress.flashcard_completed,
      current_page: currentPage,
      total_pages: lessonConfig.pages.length
    };

    fetch(`${BACKEND_API}/lesson-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress)
    })
      .then(res => res.json())
      .catch(err => console.error('Error saving lesson progress:', err));
  }

  function markSectionComplete(section) {
    if (section === 'story') {
      lessonProgress.story_completed = true;
    } else if (section === 'letter-explorer') {
      lessonProgress.letter_explorer_completed = true;
    } else if (section === 'flashcard') {
      lessonProgress.flashcard_completed = true;
    }
    saveLessonProgress();
    render();
  }

  function goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= lessonConfig.pages.length) return;
    currentPage = pageIndex;
    saveLessonProgress();
    render();
    window.scrollTo(0, 0);
  }

  function nextPage() {
    goToPage(currentPage + 1);
  }

  function prevPage() {
    goToPage(currentPage - 1);
  }

  function calculateProgress() {
    let completed = 0;
    let total = 3; // story, letter explorer, flashcard

    if (lessonProgress.story_completed) completed++;
    if (lessonProgress.letter_explorer_completed) completed++;
    if (lessonProgress.flashcard_completed) completed++;

    return Math.round((completed / total) * 100);
  }

  function checkLessonCompletion() {
    // Check if all activities are complete and we're on the last page
    const allComplete = lessonProgress.story_completed && 
                        lessonProgress.letter_explorer_completed && 
                        lessonProgress.flashcard_completed;
    const onLastPage = currentPage === lessonConfig.pages.length - 1;
    
    if (allComplete && onLastPage && studentId) {
      // Extract lesson number from lessonId (e.g., "1st-grade-lesson-5" -> 5)
      const lessonMatch = lessonId.match(/lesson-(\d+)/);
      const lessonNumber = lessonMatch ? parseInt(lessonMatch[1]) : 1;
      
      // Show completion modal
      if (typeof LessonCompletion !== 'undefined') {
        const completion = new LessonCompletion(studentId, lessonNumber, gradeLevel);
        completion.markComplete().then(() => {
          completion.showCompletionModal();
        });
      }
    }
  }

  function render() {
    const page = lessonConfig.pages[currentPage];
    const progress = calculateProgress();

    container.innerHTML = `
      <!-- Top Navigation -->
      <div class="lesson-nav-top">
        <button class="nav-btn-home" onclick="window.location.href='student-dashboard-live.html'">
          🏠 Home
        </button>
        
        <div class="lesson-progress-bar">
          <div class="lesson-progress-fill" style="width: ${progress}%;"></div>
          <span class="lesson-progress-text">${progress}% Complete</span>
        </div>

        <div class="lesson-info">
          ${lessonConfig.title}
        </div>
      </div>

      <!-- Page Content -->
      <div class="lesson-page-content">
        ${page.render(lessonProgress, markSectionComplete)}
      </div>

      <!-- Bottom Navigation -->
      <div class="lesson-nav-bottom">
        <button 
          class="nav-arrow ${currentPage === 0 ? 'disabled' : ''}" 
          onclick="window.lessonPrevPage()"
          ${currentPage === 0 ? 'disabled' : ''}
        >
          ← Previous
        </button>

        <div class="page-indicator">
          ${lessonConfig.pages.map((_, i) => `
            <div class="page-dot ${i === currentPage ? 'active' : ''} ${i < currentPage ? 'completed' : ''}"></div>
          `).join('')}
        </div>

        <button 
          class="nav-arrow ${currentPage === lessonConfig.pages.length - 1 ? 'disabled' : ''}" 
          onclick="window.lessonNextPage()"
          ${currentPage === lessonConfig.pages.length - 1 ? 'disabled' : ''}
        >
          Next →
        </button>
      </div>
    `;

    // Execute any page-specific initialization
    if (page.onLoad) {
      page.onLoad();
    }

    // Check if lesson is complete (all activities done, on last page)
    setTimeout(() => checkLessonCompletion(), 500);
  }

  // Global functions
  window.lessonNextPage = nextPage;
  window.lessonPrevPage = prevPage;
  window.lessonMarkComplete = markSectionComplete;

  // Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
      nextPage();
    } else if (e.key === 'ArrowLeft') {
      prevPage();
    }
  }
  document.addEventListener('keydown', handleKeyDown);

  // Initial render
  render();

  return function cleanup() {
    document.removeEventListener('keydown', handleKeyDown);
    delete window.lessonNextPage;
    delete window.lessonPrevPage;
    delete window.lessonMarkComplete;
  };
}
