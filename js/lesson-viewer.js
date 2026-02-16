/**
 * Paginated Lesson Viewer - Teaching Textbooks Style
 * One page at a time with progress tracking
 */

const BACKEND_API = 'https://bedrockela-website-production.up.railway.app/api';

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
