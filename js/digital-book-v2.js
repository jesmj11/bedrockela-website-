/**
 * Digital Book Reader V2 - Enhanced Page-Flipping Book
 * Ported from React/JSX component with full animations
 */

const PAGE_PALETTE_V2 = [
  { bg: "#FFF9F5", accent: "#D4A68F" },
  { bg: "#F5F9FF", accent: "#9BC5DB" },
  { bg: "#FFF7F7", accent: "#E5A8A8" },
  { bg: "#F9FFF5", accent: "#A3C99C" },
  { bg: "#FFFAF5", accent: "#D9BA8E" },
  { bg: "#F7F7FF", accent: "#B3A8D4" },
  { bg: "#FFFFFА", accent: "#D4C77A" },
  { bg: "#FFF5FA", accent: "#D49BB8" },
  { bg: "#F5FFFA", accent: "#8EC5B3" },
  { bg: "#FFF8F0", accent: "#C99780" },
];

function createDigitalBookV2(containerId, bookConfig, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  // Options
  const maxPageIndex = options.maxPageIndex !== undefined ? options.maxPageIndex : bookConfig.pages.length - 1;
  const onComplete = options.onComplete || function() {};

  let currentPage = -1; // -1 = cover
  let isFlipping = false;
  let flipDirection = null;

  const totalPages = bookConfig.pages.length;
  const availablePages = maxPageIndex + 1;
  
  // Unique ID for this book instance
  const bookInstanceId = 'book_' + Math.random().toString(36).substr(2, 9);

  function flipTo(direction) {
    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === maxPageIndex;

    if (isFlipping) return;
    if (direction === 'next' && isOnLastPage) return;
    if (direction === 'prev' && isOnCover) return;

    isFlipping = true;
    flipDirection = direction;

    render();

    setTimeout(() => {
      currentPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
      isFlipping = false;
      flipDirection = null;
      
      // Mark as complete when reaching last page
      if (currentPage === maxPageIndex && onComplete) {
        onComplete();
      }
      
      render();
    }, 500);
  }

  function backToCover() {
    currentPage = -1;
    isFlipping = false;
    render();
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

  function render() {
    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === maxPageIndex;
    const pageData = !isOnCover ? bookConfig.pages[currentPage] : null;
    const palette = !isOnCover
      ? PAGE_PALETTE_V2[currentPage % PAGE_PALETTE_V2.length]
      : { bg: bookConfig.coverColor || "#5B7C99", accent: "#D4AF37" };

    // Create decorative stars
    let stars = '';
    for (let i = 0; i < 12; i++) {
      const left = 5 + Math.random() * 90;
      const top = 5 + Math.random() * 90;
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 3;
      const opacity = 0.15 + Math.random() * 0.2;
      stars += `
        <div style="
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #D4AF37;
          opacity: ${opacity};
          left: ${left}%;
          top: ${top}%;
          animation: starTwinkle ${duration}s ease-in-out infinite;
          animation-delay: ${delay}s;
          pointer-events: none;
        "></div>
      `;
    }

    container.innerHTML = `
      <div tabindex="0" class="digital-book-v2-wrapper">
        ${stars}
        
        <!-- Book Container -->
        <div class="book-container-v2">
          ${!isOnCover ? '<div class="page-edges-v2"></div>' : ''}

          <!-- COVER -->
          ${isOnCover && !isFlipping ? `
            <div class="page-v2 paper-texture-v2" style="
              background: linear-gradient(145deg, ${bookConfig.coverColor || '#5B7C99'} 0%, ${bookConfig.coverColor || '#5B7C99'}DD 50%, ${bookConfig.coverColor || '#5B7C99'}BB 100%);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px 30px;
              animation: coverGlow 3s ease infinite, fadeInV2 0.6s ease;
              border: 1px solid rgba(212,175,55,0.2);
            ">
              <!-- Decorative borders -->
              <div style="
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
              "></div>
              <div style="
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
              "></div>

              <!-- Cover emoji -->
              <div style="
                font-size: clamp(60px, 15vw, 100px);
                margin-bottom: 20px;
                animation: gentleBob 3s ease-in-out infinite;
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
              ">
                ${bookConfig.coverEmoji}
              </div>

              <!-- Title -->
              <h1 style="
                font-family: 'Playfair Display', serif;
                font-size: clamp(24px, 5.5vw, 38px);
                font-weight: 800;
                color: #F5E6D3;
                text-align: center;
                margin: 0 0 12px 0;
                line-height: 1.2;
                text-shadow: 0 2px 8px rgba(0,0,0,0.3);
                letter-spacing: 0.5px;
              ">
                ${bookConfig.coverTitle}
              </h1>

              <!-- Author -->
              <p style="
                font-family: 'Quicksand', sans-serif;
                font-size: clamp(14px, 3vw, 18px);
                font-weight: 600;
                color: rgba(245,230,211,0.8);
                text-align: center;
                margin: 0 0 32px 0;
                letter-spacing: 1px;
              ">
                ${bookConfig.coverAuthor}
              </p>

              <!-- Open button -->
              <button class="open-btn-v2" onclick="window['${bookInstanceId}_next']()">
                Open Book →
              </button>
            </div>
          ` : ''}

          <!-- FLIPPING PAGE -->
          ${isFlipping ? `
            <div class="page-v2 paper-texture-v2 ${flipDirection === 'next' ? 'flipping-next-v2' : 'flipping-prev-v2'}"
                 style="background: ${isOnCover ? palette.bg : (flipDirection === 'next' ? palette.bg : PAGE_PALETTE_V2[(currentPage + 1) % PAGE_PALETTE_V2.length]?.bg || '#FFF9F0')};
                 box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
              <div class="spine-shadow-v2"></div>
            </div>
          ` : ''}

          <!-- CONTENT PAGE -->
          ${!isOnCover && !isFlipping && pageData ? `
            <div class="page-v2 paper-texture-v2" style="
              background: ${palette.bg};
              display: flex;
              flex-direction: column;
              padding: 0;
              box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
              animation: fadeInV2 0.3s ease;
            ">
              <div class="spine-shadow-v2"></div>

              <!-- Top accent bar -->
              <div style="
                height: 4px;
                background: linear-gradient(90deg, ${palette.accent}00, ${palette.accent}, ${palette.accent}00);
              "></div>

              <!-- Page content -->
              <div style="
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: clamp(20px, 5vw, 40px) clamp(24px, 6vw, 48px);
                position: relative;
              ">
                <!-- Page emoji illustration -->
                ${pageData.emoji ? `
                  <div style="
                    font-size: clamp(44px, 10vw, 72px);
                    margin-bottom: 16px;
                    animation: gentleBob 4s ease-in-out infinite;
                    filter: drop-shadow(0 3px 8px rgba(0,0,0,0.1));
                  ">
                    ${pageData.emoji}
                  </div>
                ` : ''}

                <!-- Chapter/page title -->
                ${pageData.title ? `
                  <h2 style="
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(20px, 4.5vw, 28px);
                    font-weight: 800;
                    color: ${palette.accent};
                    text-align: center;
                    margin: 0 0 14px 0;
                    line-height: 1.2;
                    letter-spacing: 0.5px;
                  ">
                    ${pageData.title}
                  </h2>
                ` : ''}

                <!-- Main text -->
                <p style="
                  font-family: 'Crimson Text', Georgia, serif;
                  font-size: clamp(17px, 3.8vw, 22px);
                  font-weight: 400;
                  color: #3A2E24;
                  text-align: center;
                  margin: 0;
                  line-height: 1.65;
                  max-width: 380px;
                  letter-spacing: 0.2px;
                ">
                  ${pageData.text}
                </p>
              </div>

              <!-- Bottom bar with page number -->
              <div style="
                padding: 12px 24px;
                display: flex;
                justify-content: center;
                border-top: 1px solid ${palette.accent}20;
              ">
                <span style="
                  font-family: 'Quicksand', sans-serif;
                  font-size: 13px;
                  font-weight: 600;
                  color: ${palette.accent}99;
                  letter-spacing: 1px;
                ">
                  — ${currentPage + 1} of ${availablePages} —
                </span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Navigation -->
        ${!isOnCover ? `
          <div style="
            display: flex;
            align-items: center;
            gap: 20px;
            margin-top: 24px;
            animation: fadeInV2 0.5s ease 0.2s both;
          ">
            <!-- Previous button -->
            <button class="nav-btn-v2" onclick="window['${bookInstanceId}_prev']()" ${isOnCover || isFlipping ? 'disabled' : ''}>
              ←
            </button>

            <!-- Page dots -->
            <div style="display: flex; gap: 6px; align-items: center;">
              ${bookConfig.pages.slice(0, availablePages).map((_, i) => `
                <div style="
                  width: ${i === currentPage ? '20px' : '8px'};
                  height: 8px;
                  border-radius: 99px;
                  background: ${i === currentPage ? '#5B7C99' : (i < currentPage ? 'rgba(91,124,153,0.4)' : 'rgba(91,124,153,0.2)')};
                  transition: all 0.3s ease;
                "></div>
              `).join('')}
            </div>

            <!-- Next button -->
            <button class="nav-btn-v2" onclick="window['${bookInstanceId}_next']()" ${isOnLastPage || isFlipping ? 'disabled' : ''}>
              →
            </button>
          </div>

          <!-- Back to cover button (on last page) -->
          ${isOnLastPage ? `
            <button class="nav-btn-v2" onclick="window['${bookInstanceId}_cover']()" style="
              margin-top: 12px;
              font-family: 'Quicksand', sans-serif;
              font-size: 14px;
              font-weight: 700;
              padding: 8px 20px;
              border-radius: 99px;
              border: 2px solid rgba(91,124,153,0.3);
              background: rgba(91,124,153,0.1);
              color: #5B7C99;
              letter-spacing: 0.5px;
              animation: fadeInV2 0.5s ease 0.3s both;
            ">
              ↩ Back to Cover
            </button>
          ` : ''}

          <!-- Keyboard hint -->
          <p style="
            position: absolute;
            bottom: 12px;
            font-family: 'Quicksand', sans-serif;
            font-size: 11px;
            font-weight: 600;
            color: rgba(91,124,153,0.4);
            letter-spacing: 0.5px;
          ">
            Use ← → arrow keys to flip pages
          </p>
        ` : ''}
      </div>
    `;

    // Attach keyboard listener to wrapper
    const wrapper = container.querySelector('.digital-book-v2-wrapper');
    if (wrapper) {
      wrapper.focus();
      wrapper.addEventListener('keydown', handleKeyDown);
    }
  }

  // Global functions with unique instance ID
  window[`${bookInstanceId}_next`] = () => flipTo('next');
  window[`${bookInstanceId}_prev`] = () => flipTo('prev');
  window[`${bookInstanceId}_cover`] = backToCover;

  // Initial render
  render();

  // Cleanup function
  return function cleanup() {
    delete window[`${bookInstanceId}_next`];
    delete window[`${bookInstanceId}_prev`];
    delete window[`${bookInstanceId}_cover`];
  };
}
