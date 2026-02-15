/**
 * Enhanced Digital Book Reader - Vanilla JavaScript
 * Ported animations and features from React/JSX version
 * Features: Page tracking, page flip animations, keyboard nav, decorative stars, audio narration
 */

const PAGE_PALETTE = [
  { bg: "#FFF9F0", accent: "#E8A87C" },
  { bg: "#F0F7FF", accent: "#7FB5D5" },
  { bg: "#FFF5F5", accent: "#E88D8D" },
  { bg: "#F5FFF0", accent: "#82B97E" },
  { bg: "#FFF8F0", accent: "#D4A96A" },
  { bg: "#F0F0FF", accent: "#9B8EC4" },
  { bg: "#FFFFF0", accent: "#C4B83E" },
  { bg: "#FFF0F8", accent: "#C47EA8" },
  { bg: "#F0FFFA", accent: "#6BB5A0" },
  { bg: "#FFF5EB", accent: "#C08050" },
];

const BACKEND_API = 'https://bedrockela-website-production.up.railway.app/api';

function createDigitalBook(containerId, bookConfig, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  // Options
  const maxPageIndex = options.maxPageIndex !== undefined ? options.maxPageIndex : bookConfig.pages.length - 1;
  const lessonNumber = options.lessonNumber || null;
  const onComplete = options.onComplete || function() {};

  let currentPage = -1; // -1 = cover
  let isFlipping = false;
  let flipDirection = null;
  let pagesRead = new Set();
  let audioPlaying = false;
  let currentAudio = null;

  const totalPages = bookConfig.pages.length;
  const availablePages = maxPageIndex + 1;
  const bookId = bookConfig.bookId || 'unknown';
  const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');
  const studentId = studentData.student?.id;

  // Load saved progress
  if (studentId) {
    loadReadingProgress();
  }

  function loadReadingProgress() {
    fetch(`${BACKEND_API}/reading-progress/${studentId}/${bookId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.progress) {
          pagesRead = new Set(data.progress.pages_read || []);
          render();
        }
      })
      .catch(err => console.error('Error loading progress:', err));
  }

  function saveReadingProgress() {
    if (!studentId) return;

    const completed = pagesRead.size === availablePages;
    const progress = {
      student_id: studentId,
      book_id: bookId,
      pages_read: Array.from(pagesRead),
      total_pages: availablePages,
      completed: completed
    };

    fetch(`${BACKEND_API}/reading-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress)
    })
      .then(res => res.json())
      .catch(err => console.error('Error saving progress:', err));
    
    if (completed && onComplete) {
      onComplete();
    }
  }

  function markPageAsRead(pageNum) {
    if (pageNum >= 0 && pageNum <= maxPageIndex) {
      pagesRead.add(pageNum);
      saveReadingProgress();
    }
  }

  async function playAudio(text, accentColor) {
    if (audioPlaying) {
      stopAudio();
      return;
    }

    const audioBtn = document.querySelector('.audio-btn');
    if (!audioBtn) return;

    audioPlaying = true;
    audioBtn.disabled = true;
    audioBtn.textContent = '⏸';
    audioBtn.classList.add('playing');

    try {
      const response = await fetch(`${BACKEND_API}/text-to-speech`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'Rachel' })
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      currentAudio = new Audio(audioUrl);
      currentAudio.play();
      currentAudio.onended = () => stopAudio();
      
      audioBtn.disabled = false;
      audioBtn.onclick = stopAudio;

    } catch (error) {
      console.error('Audio playback error:', error);
      audioBtn.textContent = '🔊';
      audioBtn.disabled = false;
      audioPlaying = false;
      audioBtn.classList.remove('playing');
    }
  }

  function stopAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    audioPlaying = false;
    const audioBtn = document.querySelector('.audio-btn');
    if (audioBtn) {
      audioBtn.textContent = '🔊';
      audioBtn.classList.remove('playing');
    }
  }

  function flipTo(direction) {
    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === maxPageIndex;

    if (isFlipping) return;
    if (direction === 'next' && isOnLastPage) return;
    if (direction === 'prev' && isOnCover) return;

    isFlipping = true;
    flipDirection = direction;

    stopAudio();
    render();

    setTimeout(() => {
      currentPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
      isFlipping = false;
      flipDirection = null;
      render();
    }, 500);
  }

  function render() {
    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === maxPageIndex;
    const pageData = !isOnCover ? bookConfig.pages[currentPage] : null;
    const palette = !isOnCover
      ? PAGE_PALETTE[currentPage % PAGE_PALETTE.length]
      : { bg: bookConfig.coverColor || "#305853", accent: "#FFD700" };

    if (!isOnCover && currentPage >= 0) {
      markPageAsRead(currentPage);
    }

    const progressPercent = availablePages > 0 ? (pagesRead.size / availablePages) * 100 : 0;

    // Create decorative stars
    let stars = '';
    for (let i = 0; i < 12; i++) {
      const left = 5 + Math.random() * 90;
      const top = 5 + Math.random() * 90;
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 3;
      stars += `
        <div class="bg-star" style="
          left: ${left}%;
          top: ${top}%;
          animation-delay: ${delay}s;
          animation-duration: ${duration}s;
        "></div>
      `;
    }

    container.innerHTML = `
      ${stars}
      
      <!-- Book -->
      <div class="book-container">
        ${!isOnCover ? '<div class="page-edges"></div>' : ""}

        ${isOnCover && !isFlipping ? `
          <!-- COVER -->
          <div class="page paper-texture cover-page">
            <div class="cover-border-top"></div>
            <div class="cover-border-bottom"></div>
            
            <div class="cover-emoji">${bookConfig.coverEmoji}</div>
            
            <h1 class="cover-title">${bookConfig.coverTitle}</h1>
            
            <p class="cover-author">${bookConfig.coverAuthor}</p>
            
            ${availablePages < totalPages ? `
              <p class="cover-pages-note">
                📚 ${availablePages} page${availablePages !== 1 ? 's' : ''} available in this lesson
              </p>
            ` : ''}
            
            <button class="open-btn" onclick="window.digitalBookFlipNext()">
              Open Book →
            </button>
          </div>
        ` : ''}

        ${isFlipping ? `
          <!-- FLIPPING PAGE -->
          <div class="page paper-texture flipping-page ${flipDirection === 'next' ? 'flipping-next' : 'flipping-prev'}" 
               style="background: ${isOnCover ? palette.bg : (flipDirection === 'next' ? palette.bg : PAGE_PALETTE[(currentPage + 1) % PAGE_PALETTE.length]?.bg || '#FFF9F0')};">
            <div class="spine-shadow"></div>
          </div>
        ` : ''}

        ${!isOnCover && !isFlipping && pageData ? `
          <!-- CONTENT PAGE -->
          <div class="page paper-texture content-page" style="background: ${palette.bg};">
            <div class="spine-shadow"></div>
            
            <div class="top-accent" style="background: linear-gradient(90deg, ${palette.accent}00, ${palette.accent}, ${palette.accent}00);"></div>
            
            <div class="page-content">
              ${pageData.emoji ? `<div class="page-emoji">${pageData.emoji}</div>` : ""}
              ${pageData.title ? `<h2 class="page-title" style="color: ${palette.accent};">${pageData.title}</h2>` : ""}
              <p class="page-text">${pageData.text}</p>
            </div>
            
            <div class="page-footer" style="border-top: 1px solid ${palette.accent}20;">
              <button class="audio-btn" style="color: ${palette.accent};" onclick="window.digitalBookPlayAudio(\`${pageData.text.replace(/`/g, '\\`').replace(/'/g, "\\'")}\`, '${palette.accent}')">
                🔊
              </button>
              <span class="page-number" style="color: ${palette.accent}99;">
                — ${currentPage + 1} of ${availablePages} —
              </span>
              <div style="width: 36px;"></div>
            </div>
          </div>
        ` : ''}
      </div>

      ${!isOnCover ? `
        <!-- Navigation -->
        <div class="book-nav">
          <button class="nav-btn nav-btn-prev" onclick="window.digitalBookFlipPrev()" ${isOnCover || isFlipping ? "disabled" : ""}>
            ←
          </button>

          <!-- Page dots -->
          <div class="page-dots">
            ${bookConfig.pages.slice(0, availablePages).map((_, i) => `
              <div class="page-dot ${i === currentPage ? 'active' : ''} ${i < currentPage ? 'read' : ''}"></div>
            `).join('')}
          </div>

          <button class="nav-btn nav-btn-next" onclick="window.digitalBookFlipNext()" ${isOnLastPage || isFlipping ? "disabled" : ""}>
            →
          </button>
        </div>

        ${isOnLastPage ? `
          <button class="back-to-cover-btn" onclick="window.digitalBookBackToCover()">
            ↩ Back to Cover
          </button>
        ` : ''}

        <p class="keyboard-hint">Use ← → arrow keys to flip pages</p>
      ` : ''}
    `;
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      flipTo('next');
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      flipTo('prev');
    }
  }

  // Global functions
  window.digitalBookFlipNext = () => flipTo('next');
  window.digitalBookFlipPrev = () => flipTo('prev');
  window.digitalBookBackToCover = () => {
    currentPage = -1;
    render();
  };
  window.digitalBookPlayAudio = playAudio;

  // Keyboard navigation
  document.addEventListener('keydown', handleKeyDown);

  // Initial render
  render();

  // Cleanup function
  return function cleanup() {
    document.removeEventListener('keydown', handleKeyDown);
    delete window.digitalBookFlipNext;
    delete window.digitalBookFlipPrev;
    delete window.digitalBookBackToCover;
    delete window.digitalBookPlayAudio;
  };
}
