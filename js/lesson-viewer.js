/**
 * Paginated Lesson Viewer - Teaching Textbooks Style
 * One page at a time with progress tracking
 */

// Railway backend disabled - using Firebase only
// const BACKEND_API = 'https://bedrockela-website-production.up.railway.app/api';

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
      ${typeof window.createSubmitButton === 'function' ? window.createSubmitButton(id, questionText, minWords) : ''}
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

  const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || 'null');
  const studentId = studentData?.id;
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

  // Load saved progress from localStorage (instant) and Firebase (sync)
  if (studentId) {
    loadLessonProgress();
  } else {
    // No student logged in — still render the lesson
    render();
  }

  function loadLessonProgress() {
    // Try localStorage first for instant load
    const localKey = `lesson_progress_${studentId}_${lessonId}`;
    const local = localStorage.getItem(localKey);
    
    if (local) {
      try {
        const data = JSON.parse(local);
        lessonProgress = {
          story_completed: data.story_completed || false,
          letter_explorer_completed: data.letter_explorer_completed || false,
          flashcard_completed: data.flashcard_completed || false,
          current_page: data.current_page || 0,
          total_pages: lessonConfig.pages.length
        };
        currentPage = lessonProgress.current_page;
        render();
      } catch (e) {
        console.error('Error parsing local progress:', e);
        render();
      }
    } else {
      render();
    }
  }

  function saveLessonProgress() {
    if (!studentId) return;

    const progress = {
      story_completed: lessonProgress.story_completed,
      letter_explorer_completed: lessonProgress.letter_explorer_completed,
      flashcard_completed: lessonProgress.flashcard_completed,
      current_page: currentPage,
      total_pages: lessonConfig.pages.length,
      lastUpdated: new Date().toISOString()
    };

    // Save to localStorage immediately
    const localKey = `lesson_progress_${studentId}_${lessonId}`;
    localStorage.setItem(localKey, JSON.stringify(progress));
    
    // Also save to Firebase for cloud backup (no CORS issues!)
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      const db = firebase.firestore();
      db.collection('lessonProgress').doc(`${studentId}_${lessonId}`).set({
        studentId,
        lessonId,
        gradeLevel,
        ...progress
      }).catch(err => console.warn('Firebase save failed (offline?):', err));
    }
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
    const lessonMatch = lessonId.match(/(?:lesson-|day-)(\d+)/);
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

  function calculateProgress() {
    // For 1st grade: track activity completion
    const has1stGradeActivities = 'story_completed' in lessonProgress;
    
    if (has1stGradeActivities) {
      let completed = 0;
      let total = 3; // story, letter explorer, flashcard

      if (lessonProgress.story_completed) completed++;
      if (lessonProgress.letter_explorer_completed) completed++;
      if (lessonProgress.flashcard_completed) completed++;

      return Math.round((completed / total) * 100);
    }
    
    // For grades 2-6: calculate based on page progress
    const totalPages = lessonConfig.pages.length;
    const completedPages = currentPage + 1; // +1 because currentPage is 0-indexed
    return Math.round((completedPages / totalPages) * 100);
  }

  function checkLessonCompletion() {
    const onLastPage = currentPage === lessonConfig.pages.length - 1;
    
    // For 1st grade: check if all activities are complete
    const has1stGradeActivities = 'story_completed' in lessonProgress;
    const allActivitiesComplete = has1stGradeActivities 
      ? (lessonProgress.story_completed && 
         lessonProgress.letter_explorer_completed && 
         lessonProgress.flashcard_completed)
      : true; // For other grades, just reaching the last page is enough
    
    if (onLastPage && allActivitiesComplete && studentId) {
      // Extract lesson number from lessonId
      // Supports: "1st-grade-lesson-5", "4th-grade-day-1", "6th-grade-day-30"
      const lessonMatch = lessonId.match(/(?:lesson-|day-)(\d+)/);
      const lessonNumber = lessonMatch ? parseInt(lessonMatch[1]) : 1;
      
      // Mark complete first
      if (typeof LessonCompletion !== 'undefined') {
        const completion = new LessonCompletion(studentId, lessonNumber, gradeLevel);
        window.lessonCompletion = completion; // Store globally for feedback modal
        
        completion.markComplete().then(() => {
          // Check if there are answers to review
          if (window.answerValidation) {
            const answers = window.answerValidation.getAllSubmittedAnswers();
            if (Object.keys(answers).length > 0) {
              // Show AI feedback modal first
              window.answerValidation.showFeedbackModal();
              return; // Don't show completion modal yet
            }
          }
          
          // No answers to review, show completion modal directly
          completion.showCompletionModal();
        });
      }
    }
  }

  // In-memory store for ALL answers across ALL pages (persists during lesson)
  // Exposed globally so autosave can include answers from non-visible pages
  if (!window._lessonAllAnswers) window._lessonAllAnswers = {};
  const allAnswers = window._lessonAllAnswers;

  // Save all visible field values before page navigation destroys the DOM
  function captureCurrentFields() {
    document.querySelectorAll('textarea, input[type="text"]').forEach(el => {
      if (el.id && el.value) {
        allAnswers[el.id] = el.value;
      }
    });
  }

  // Restore saved field values after page renders
  function restoreFields() {
    document.querySelectorAll('textarea, input[type="text"]').forEach(el => {
      if (el.id && allAnswers[el.id]) {
        el.value = allAnswers[el.id];
        // Trigger word count update
        if (typeof updateWordCount === 'function') {
          const minMatch = el.placeholder?.match(/minimum (\d+) words/);
          const min = minMatch ? parseInt(minMatch[1]) : 15;
          // Try common word-count ID patterns
          const wcId = 'word-count-' + el.id;
          if (document.getElementById(wcId)) {
            updateWordCount(el.id, wcId, min);
          }
        }
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  // Load answers from localStorage on first load
  function loadSavedAnswers() {
    if (!studentId) return;
    const key = `lesson_answers_${studentId}_${lessonId}`;
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved?.answers) {
        Object.assign(allAnswers, saved.answers);
        window._lessonAllAnswers = allAnswers;
      }
    } catch(e) {}
  }
  loadSavedAnswers();

  // Render page content - supports both old (type/content) and new (render function) formats
  function renderPageContent(page) {
    // New format: page has a render() function
    if (typeof page.render === 'function') {
      return page.render(lessonProgress, markSectionComplete);
    }
    
    // Old format: page has type and content properties
    if (page.type && page.content) {
      return `<div class="lesson-page-card ${page.type === 'title' ? 'title-page' : 'content-page'}">${page.content}</div>`;
    }
    
    // Fallback
    return '<div class="lesson-page-card content-page"><p>Content unavailable</p></div>';
  }

  function render() {
    // Capture fields BEFORE destroying the DOM
    captureCurrentFields();

    const page = lessonConfig.pages[currentPage];
    const progress = calculateProgress();

    container.innerHTML = `
    <div class="lesson-container">
      <!-- Top Navigation -->
      <div class="lesson-nav-top">
        <button class="nav-btn-home" onclick="window.location.href='student-dashboard.html'">
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
        ${renderPageContent(page)}
      </div>

      <!-- Billy Avatar Widget -->
      ${window.renderBillyWidget && page.instruction ? window.renderBillyWidget(page.instruction) : ''}

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
          class="nav-arrow" 
          onclick="window.lessonNextPage()"
        >
          ${currentPage === lessonConfig.pages.length - 1 ? 'Finish Lesson ✓' : 'Next →'}
        </button>
      </div>
    </div>
    `;

    // Execute any page-specific initialization
    if (page.onLoad) {
      page.onLoad();
    }

    // Restore saved answers into the newly rendered fields
    setTimeout(() => {
      restoreFields();
    }, 50);

    // Initialize autosave after page renders
    setTimeout(() => {
      if (typeof initializeAutosave === 'function') {
        initializeAutosave();
      }
    }, 100);

    // Register answer fields on this page for validation
    setTimeout(() => {
      if (window.answerValidation) {
        const answerFields = Array.from(document.querySelectorAll('textarea[id^="question-"]'))
          .map(el => el.id);
        window.answerValidation.registerPageAnswers(answerFields);
      }
    }, 100);

    // Check if lesson is complete (all activities done, on last page)
    // Completion handled by Finish Lesson button
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


// Export as initLessonViewer for backward compatibility
// Handles both: initLessonViewer(config) and initLessonViewer('container', config)
window.initLessonViewer = function(first, second) {
  if (typeof first === 'string') {
    return createLessonViewer(first, second);
  } else {
    return createLessonViewer('lesson-container', first);
  }
};

// ===== VOCABULARY MATCHING GAME =====
// Global functions for the vocab matching game (called from onclick handlers in lesson HTML)
(function() {
  let selectedW = null;
  let selectedD = null;
  let score = 0;

  window.selectWord = function(el) {
    if (el.classList.contains('matched')) return;
    document.querySelectorAll('.match-word').forEach(e => e.style.outline = 'none');
    el.style.outline = '3px solid #B06821';
    selectedW = el;
    tryMatch();
  };

  window.selectDef = function(el) {
    if (el.classList.contains('matched')) return;
    document.querySelectorAll('.match-def').forEach(e => e.style.outline = 'none');
    el.style.outline = '3px solid #B06821';
    selectedD = el;
    tryMatch();
  };

  function tryMatch() {
    if (!selectedW || !selectedD) return;
    if (selectedW.dataset.word === selectedD.dataset.word) {
      selectedW.classList.add('matched');
      selectedD.classList.add('matched');
      selectedW.style.opacity = '0.5';
      selectedD.style.opacity = '0.5';
      selectedW.style.outline = '3px solid #4CAF50';
      selectedD.style.outline = '3px solid #4CAF50';
      score++;
      var scoreEl = document.getElementById('gameScore');
      if (scoreEl) scoreEl.textContent = score;
      var total = document.querySelectorAll('.match-word').length;
      if (score >= total) {
        var fb = document.getElementById('gameFeedback');
        if (fb) {
          fb.style.display = 'block';
          fb.style.background = 'rgba(76,175,80,0.1)';
          fb.innerHTML = '<h3>🎉 Perfect! All words matched!</h3><p>Great job learning your vocabulary!</p>';
        }
      }
    } else {
      selectedW.style.outline = '3px solid #f44336';
      selectedD.style.outline = '3px solid #f44336';
      var w = selectedW, d = selectedD;
      setTimeout(function() {
        w.style.outline = 'none';
        d.style.outline = 'none';
      }, 600);
    }
    selectedW = null;
    selectedD = null;
  }

  // Shuffle definitions when a game page loads
  window.initVocabGame = function() {
    score = 0;
    selectedW = null;
    selectedD = null;
    var scoreEl = document.getElementById('gameScore');
    if (scoreEl) scoreEl.textContent = '0';
    var defCol = document.getElementById('defColumn');
    if (defCol) {
      var defs = Array.from(defCol.querySelectorAll('.match-def'));
      defs.sort(function() { return Math.random() - 0.5; });
      defs.forEach(function(d) { defCol.appendChild(d); });
    }
    // Reset all matched states
    document.querySelectorAll('.match-word, .match-def').forEach(function(el) {
      el.classList.remove('matched');
      el.style.opacity = '1';
      el.style.outline = 'none';
    });
  };
})();

// Wrapper function for backward compatibility with 4th grade lessons
function initLessonViewer(config) {
  createLessonViewer('lesson-container', config);
}
