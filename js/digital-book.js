/**
 * Digital Book Reader - Vanilla JavaScript
 * Based on digital-book.jsx, converted for use without React
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

function createDigitalBook(containerId, bookConfig) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  let currentPage = -1; // -1 = cover
  let isFlipping = false;

  const totalPages = bookConfig.pages.length;

  function render() {
    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === totalPages - 1;
    const pageData = !isOnCover ? bookConfig.pages[currentPage] : null;
    const palette = !isOnCover
      ? PAGE_PALETTE[currentPage % PAGE_PALETTE.length]
      : { bg: bookConfig.coverColor || "#1B2A4A", accent: "#FFD700" };

    container.innerHTML = `
      <!-- Decorative background stars -->
      <div class="digital-book-stars">
        ${[...Array(12)]
          .map(
            (_, i) => `
          <div class="star" style="
            left: ${5 + Math.random() * 90}%;
            top: ${5 + Math.random() * 90}%;
            animation-duration: ${2 + Math.random() * 3}s;
            animation-delay: ${Math.random() * 2}s;
            opacity: ${0.2 + Math.random() * 0.3};
          "></div>
        `
          )
          .join("")}
      </div>

      <!-- Book -->
      <div class="book-container">
        ${!isOnCover ? '<div class="page-edges"></div>' : ""}

        ${
          isOnCover
            ? `
          <!-- COVER -->
          <div class="page paper-texture cover-page" style="
            background: linear-gradient(145deg, ${bookConfig.coverColor} 0%, ${bookConfig.coverColor}DD 50%, ${bookConfig.coverColor}BB 100%);
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
              <span class="page-number" style="color: ${palette.accent}99;">
                — ${currentPage + 1} of ${totalPages} —
              </span>
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
                }"></div>
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

  // Attach keyboard listener
  document.addEventListener("keydown", handleKeyDown);

  // Initial render
  render();

  // Return cleanup function
  return function cleanup() {
    document.removeEventListener("keydown", handleKeyDown);
    delete window.digitalBookFlipNext;
    delete window.digitalBookFlipPrev;
    delete window.digitalBookBackToCover;
  };
}
