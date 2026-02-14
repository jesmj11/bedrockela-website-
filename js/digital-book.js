/**
 * Digital Book Reader - Vanilla JavaScript
 * Features: Page tracking, audio narration with ElevenLabs
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

function createDigitalBook(containerId, bookConfig) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  let currentPage = -1; // -1 = cover
  let isFlipping = false;
  let pagesRead = new Set(); // Track which pages have been read
  let audioPlaying = false;
  let currentAudio = null;

  const totalPages = bookConfig.pages.length;
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

    const progress = {
      student_id: studentId,
      book_id: bookId,
      pages_read: Array.from(pagesRead),
      total_pages: totalPages,
      completed: pagesRead.size === totalPages
    };

    fetch(`${BACKEND_API}/reading-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress)
    })
      .then(res => res.json())
      .catch(err => console.error('Error saving progress:', err));
  }

  function markPageAsRead(pageNum) {
    if (pageNum >= 0 && pageNum < totalPages) {
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
      // Call ElevenLabs API via backend
      const response = await fetch(`${BACKEND_API}/text-to-speech`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'Rachel' }) // Can make voice configurable
      });

      if (!response.ok) {
        throw new Error('TTS failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      currentAudio = new Audio(audioUrl);
      currentAudio.play();

      currentAudio.onended = () => {
        stopAudio();
      };

      audioBtn.disabled = false;
      audioBtn.onclick = stopAudio;

    } catch (error) {
      console.error('Audio playback error:', error);
      audioBtn.textContent = '🔊';
      audioBtn.disabled = false;
      audioPlaying = false;
      audioBtn.classList.remove('playing');
      alert('Audio unavailable. Please try again.');
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

  function render() {
    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === totalPages - 1;
    const pageData = !isOnCover ? bookConfig.pages[currentPage] : null;
    const palette = !isOnCover
      ? PAGE_PALETTE[currentPage % PAGE_PALETTE.length]
      : { bg: bookConfig.coverColor || "#305853", accent: "#B06821" };

    // Mark current page as read
    if (!isOnCover && currentPage >= 0) {
      markPageAsRead(currentPage);
    }

    // Calculate reading progress
    const progressPercent = totalPages > 0 ? (pagesRead.size / totalPages) * 100 : 0;

    container.innerHTML = `
      <!-- Book -->
      <div class="book-container">
        ${!isOnCover ? '<div class="page-edges"></div>' : ""}

        ${
          isOnCover
            ? `
          <!-- COVER -->
          <div class="page paper-texture cover-page" style="
            background: linear-gradient(145deg, #305853 0%, #1B2A30 100%);
          ">
            <div class="cover-border-top"></div>
            <div class="cover-border-bottom"></div>
            
            <div class="cover-emoji">${bookConfig.coverEmoji}</div>
            
            <h1 class="cover-title">${bookConfig.coverTitle}</h1>
            
            <p class="cover-author">${bookConfig.coverAuthor}</p>
            
            <button class="open-btn" onclick="window.digitalBookFlipNext()">
              Open Book →
            </button>
          </div>
        `
            : `
          <!-- CONTENT PAGE -->
          <div class="page paper-texture content-page" style="background: ${palette.bg};">
            <div class="spine-shadow"></div>
            
            <div class="top-accent" style="background: linear-gradient(90deg, ${palette.accent}00, ${palette.accent}, ${palette.accent}00);"></div>
            
            <div class="page-content">
              ${
                pageData.emoji
                  ? `<div class="page-emoji">${pageData.emoji}</div>`
                  : ""
              }
              
              ${
                pageData.title
                  ? `<h2 class="page-title" style="color: ${palette.accent};">${pageData.title}</h2>`
                  : ""
              }
              
              <p class="page-text">${pageData.text}</p>
            </div>
            
            <div class="page-footer" style="border-top: 1px solid ${palette.accent}20;">
              <button class="audio-btn" style="color: ${palette.accent};" onclick="window.digitalBookPlayAudio('${pageData.text.replace(/'/g, "\\'")}', '${palette.accent}')">
                🔊
              </button>
              <span class="page-number" style="color: ${palette.accent}99;">
                — ${currentPage + 1} of ${totalPages} —
              </span>
              <div style="width: 36px;"></div>
            </div>
          </div>
        `
        }
      </div>

      ${
        !isOnCover
          ? `
        <!-- Navigation -->
        <div class="book-nav">
          <button class="nav-btn" onclick="window.digitalBookFlipPrev()" ${
            isOnCover ? "disabled" : ""
          }>
            ←
          </button>
          
          <div class="page-dots">
            ${bookConfig.pages
              .map(
                (_, i) => `
              <div class="dot ${i === currentPage ? "active" : ""} ${
                  i < currentPage ? "past" : ""
                } ${pagesRead.has(i) ? "read" : ""}"></div>
            `
              )
              .join("")}
          </div>
          
          <button class="nav-btn" onclick="window.digitalBookFlipNext()" ${
            isOnLastPage ? "disabled" : ""
          }>
            →
          </button>
        </div>

        <!-- Reading Progress -->
        <div class="reading-progress">
          <div>📖 ${pagesRead.size} of ${totalPages} pages read</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
        </div>

        ${
          isOnLastPage
            ? `
          <button class="back-to-cover-btn" onclick="window.digitalBookBackToCover()">
            ↩ Back to Cover
          </button>
        `
            : ""
        }
      `
          : ""
      }

      <p class="keyboard-hint">Use ← → arrow keys to flip pages</p>
    `;
  }

  function flipTo(direction) {
    if (isFlipping) return;

    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === totalPages - 1;

    if (direction === "next" && isOnLastPage) return;
    if (direction === "prev" && isOnCover) return;

    // Stop any playing audio when flipping
    stopAudio();

    isFlipping = true;

    // Add flipping animation class
    const page = container.querySelector(".page");
    if (page) {
      page.classList.add(
        direction === "next" ? "flipping-next" : "flipping-prev"
      );
    }

    setTimeout(() => {
      currentPage = direction === "next" ? currentPage + 1 : currentPage - 1;
      isFlipping = false;
      render();
    }, 500);
  }

  function backToCover() {
    stopAudio();
    currentPage = -1;
    render();
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      flipTo("next");
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      flipTo("prev");
    }
  }

  // Attach global functions for button clicks
  window.digitalBookFlipNext = () => flipTo("next");
  window.digitalBookFlipPrev = () => flipTo("prev");
  window.digitalBookBackToCover = backToCover;
  window.digitalBookPlayAudio = (text, accentColor) => playAudio(text, accentColor);

  // Attach keyboard listener
  document.addEventListener("keydown", handleKeyDown);

  // Initial render
  render();

  // Return cleanup function
  return function cleanup() {
    document.removeEventListener("keydown", handleKeyDown);
    stopAudio();
    delete window.digitalBookFlipNext;
    delete window.digitalBookFlipPrev;
    delete window.digitalBookBackToCover;
    delete window.digitalBookPlayAudio;
  };
}
