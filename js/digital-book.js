// ═══════════════════════════════════════════════════════════════════════
// 📖 BedrockELA Digital Book Component
// Embeds beautiful, interactive books directly into lessons
// ═══════════════════════════════════════════════════════════════════════

class DigitalBook {
  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    this.config = config;
    this.currentPage = -1; // -1 = cover
    this.isFlipping = false;
    this.flipDirection = null;
    
    this.render();
    this.attachEventListeners();
  }
  
  render() {
    const totalPages = this.config.pages.length;
    const isOnCover = this.currentPage === -1;
    const isOnLastPage = this.currentPage === totalPages - 1;
    
    const pageData = !isOnCover ? this.config.pages[this.currentPage] : null;
    
    this.container.innerHTML = `
      <div class="digital-book-wrapper" tabindex="0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:wght@700;800;900&family=Quicksand:wght@500;600;700&display=swap');
          
          .digital-book-wrapper {
            min-height: 500px;
            background: #2C1810;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: 'Crimson Text', 'Georgia', serif;
            position: relative;
            overflow: hidden;
            outline: none;
            border-radius: 12px;
          }
          
          @keyframes pageFlipNext {
            0% { transform: perspective(1200px) rotateY(0deg); }
            100% { transform: perspective(1200px) rotateY(-180deg); }
          }
          
          @keyframes pageFlipPrev {
            0% { transform: perspective(1200px) rotateY(0deg); }
            100% { transform: perspective(1200px) rotateY(180deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes gentleBob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          
          @keyframes coverGlow {
            0%, 100% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.15), 0 20px 60px rgba(0,0,0,0.5); }
            50% { box-shadow: 0 0 50px rgba(255, 215, 0, 0.25), 0 20px 60px rgba(0,0,0,0.5); }
          }
          
          @keyframes starTwinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.95); }
          }
          
          .book-container {
            position: relative;
            width: min(90vw, 480px);
            aspect-ratio: 3/4;
            cursor: default;
          }
          
          .page {
            position: absolute;
            inset: 0;
            border-radius: 4px 16px 16px 4px;
            overflow: hidden;
            transform-origin: left center;
            backface-visibility: hidden;
          }
          
          .page.flipping-next {
            animation: pageFlipNext 0.5s ease-in-out forwards;
            z-index: 10;
          }
          
          .page.flipping-prev {
            animation: pageFlipPrev 0.5s ease-in-out forwards;
            z-index: 10;
          }
          
          .nav-btn {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .nav-btn:hover:not(:disabled) {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          }
          .nav-btn:active {
            transform: scale(0.95);
          }
          .nav-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
          
          .paper-texture::before {
            content: '';
            position: absolute;
            inset: 0;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            pointer-events: none;
            border-radius: inherit;
          }
          
          .spine-shadow {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 30px;
            background: linear-gradient(to right, rgba(0,0,0,0.15), transparent);
            pointer-events: none;
            z-index: 5;
            border-radius: 4px 0 0 4px;
          }
          
          .page-edges {
            position: absolute;
            left: -3px;
            top: 4px;
            bottom: 4px;
            width: 3px;
            background: repeating-linear-gradient(
              to bottom,
              #D4C5A9 0px,
              #D4C5A9 1px,
              #E8DCC8 1px,
              #E8DCC8 3px
            );
            border-radius: 1px;
            z-index: 2;
          }
          
          .vocab-highlight {
            background: linear-gradient(120deg, #fef3c7 0%, #fde68a 100%);
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 600;
            color: #92400e;
            cursor: help;
            border-bottom: 2px solid #f59e0b;
          }
          
          .vocab-highlight:hover {
            background: linear-gradient(120deg, #fde68a 0%, #fbbf24 100%);
          }
        </style>
        
        ${this.renderStars()}
        
        <div class="book-container">
          ${!isOnCover ? '<div class="page-edges"></div>' : ''}
          
          ${isOnCover ? this.renderCover() : ''}
          ${this.isFlipping ? this.renderFlippingPage() : ''}
          ${!isOnCover && !this.isFlipping ? this.renderContentPage(pageData) : ''}
        </div>
        
        ${!isOnCover ? this.renderNavigation(totalPages, isOnLastPage) : ''}
        ${isOnLastPage && !this.isFlipping ? this.renderBackToCover() : ''}
        
        <p style="position: absolute; bottom: 12px; font-family: 'Quicksand', sans-serif; font-size: 11px; font-weight: 600; color: rgba(255,215,0,0.25); letter-spacing: 0.5px;">
          Use ← → arrow keys to flip pages
        </p>
      </div>
    `;
  }
  
  renderStars() {
    let stars = '';
    for (let i = 0; i < 12; i++) {
      stars += `
        <div style="
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #FFD700;
          opacity: ${0.2 + Math.random() * 0.3};
          left: ${5 + Math.random() * 90}%;
          top: ${5 + Math.random() * 90}%;
          animation: starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite;
          animation-delay: ${Math.random() * 2}s;
          pointer-events: none;
        "></div>
      `;
    }
    return stars;
  }
  
  renderCover() {
    return `
      <div class="page paper-texture" style="
        background: linear-gradient(145deg, ${this.config.coverColor} 0%, ${this.config.coverColor}DD 50%, ${this.config.coverColor}BB 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 30px;
        animation: coverGlow 3s ease infinite, fadeIn 0.6s ease;
        border: 1px solid rgba(255,215,0,0.15);
      ">
        <div style="position: absolute; top: 20px; left: 20px; right: 20px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent);"></div>
        <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent);"></div>
        
        <h1 style="font-family: 'Playfair Display', serif; font-size: clamp(24px, 5.5vw, 38px); font-weight: 800; color: #FFD700; text-align: center; margin: 0 0 12px 0; line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.4); letter-spacing: 0.5px;">
          ${this.config.coverTitle}
        </h1>
        
        ${this.config.coverSubtitle ? `
          <p style="font-family: 'Crimson Text', serif; font-size: clamp(16px, 3.5vw, 22px); font-weight: 600; color: rgba(255,215,0,0.8); text-align: center; margin: 0 0 20px 0; font-style: italic;">
            ${this.config.coverSubtitle}
          </p>
        ` : ''}
        
        <p style="font-family: 'Quicksand', sans-serif; font-size: clamp(14px, 3vw, 18px); font-weight: 600; color: rgba(255,215,0,0.7); text-align: center; margin: 0 0 32px 0; letter-spacing: 1px;">
          ${this.config.coverAuthor}
        </p>
        
        <button class="nav-btn open-btn" onclick="window.digitalBookInstance.flipTo('next')" style="font-family: 'Quicksand', sans-serif; font-size: clamp(15px, 3vw, 18px); font-weight: 700; padding: 12px 32px; border-radius: 99px; border: 2px solid rgba(255,215,0,0.5); background: rgba(255,215,0,0.12); color: #FFD700; cursor: pointer; transition: all 0.2s; letter-spacing: 1px;">
          Open Book
        </button>
      </div>
    `;
  }
  
  renderContentPage(pageData) {
    const palette = this.getPagePalette();
    
    return `
      <div class="page paper-texture" style="
        background: ${palette.bg};
        display: flex;
        flex-direction: column;
        padding: 0;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
        animation: fadeIn 0.3s ease;
      ">
        <div class="spine-shadow"></div>
        
        <div style="height: 4px; background: linear-gradient(90deg, ${palette.accent}00, ${palette.accent}, ${palette.accent}00);"></div>
        
        <div style="flex: 1; display: flex; flex-direction: column; padding: clamp(20px, 5vw, 30px) clamp(24px, 6vw, 40px); position: relative; overflow-y: auto;">
          ${pageData.title ? `
            <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(20px, 4.5vw, 28px); font-weight: 800; color: ${palette.accent}; text-align: center; margin: 0 0 20px 0; line-height: 1.2; letter-spacing: 0.5px;">
              ${pageData.title}
            </h2>
          ` : ''}
          
          <div style="font-family: 'Crimson Text', Georgia, serif; font-size: clamp(15px, 3.5vw, 19px); font-weight: 400; color: #3A2E24; text-align: left; margin: 0; line-height: 1.75; letter-spacing: 0.2px;">
            ${this.highlightVocab(pageData.text, this.config.vocabWords)}
          </div>
        </div>
        
        <div style="padding: 12px 24px; display: flex; justify-content: center; border-top: 1px solid ${palette.accent}20;">
          <span style="font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 600; color: ${palette.accent}99; letter-spacing: 1px;">
            — ${this.currentPage + 1} of ${this.config.pages.length} —
          </span>
        </div>
      </div>
    `;
  }
  
  renderFlippingPage() {
    const direction = this.flipDirection === 'next' ? 'flipping-next' : 'flipping-prev';
    const palette = this.getPagePalette();
    
    return `
      <div class="page paper-texture ${direction}" style="
        background: ${palette.bg};
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      ">
        <div class="spine-shadow"></div>
      </div>
    `;
  }
  
  renderNavigation(totalPages, isOnLastPage) {
    return `
      <div style="display: flex; align-items: center; gap: 20px; margin-top: 24px; animation: fadeIn 0.5s ease 0.2s both;">
        <button class="nav-btn" onclick="window.digitalBookInstance.flipTo('prev')" ${this.currentPage === -1 ? 'disabled' : ''} style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.08); color: #FFD700; font-size: 20px; display: flex; align-items: center; justify-content: center; font-family: 'Quicksand', sans-serif; font-weight: 700;">
          ←
        </button>
        
        <div style="display: flex; gap: 6px; align-items: center;">
          ${this.config.pages.map((_, i) => `
            <div style="
              width: ${i === this.currentPage ? '20px' : '8px'};
              height: 8px;
              border-radius: 99px;
              background: ${i === this.currentPage ? '#FFD700' : i < this.currentPage ? 'rgba(255,215,0,0.4)' : 'rgba(255,215,0,0.15)'};
              transition: all 0.3s ease;
            "></div>
          `).join('')}
        </div>
        
        <button class="nav-btn" onclick="window.digitalBookInstance.flipTo('next')" ${isOnLastPage ? 'disabled' : ''} style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.08); color: #FFD700; font-size: 20px; display: flex; align-items: center; justify-content: center; font-family: 'Quicksand', sans-serif; font-weight: 700;">
          →
        </button>
      </div>
    `;
  }
  
  renderBackToCover() {
    return `
      <button class="nav-btn" onclick="window.digitalBookInstance.backToCover()" style="margin-top: 12px; font-family: 'Quicksand', sans-serif; font-size: 14px; font-weight: 700; padding: 8px 20px; border-radius: 99px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.08); color: #FFD700; letter-spacing: 0.5px; animation: fadeIn 0.5s ease 0.3s both;">
        ↩ Back to Cover
      </button>
    `;
  }
  
  getPagePalette() {
    const palettes = [
      { bg: '#FFF9F0', accent: '#E8A87C' },
      { bg: '#F0F7FF', accent: '#7FB5D5' },
      { bg: '#FFF5F5', accent: '#E88D8D' },
      { bg: '#F5FFF0', accent: '#82B97E' },
      { bg: '#FFF8F0', accent: '#D4A96A' },
      { bg: '#F0F0FF', accent: '#9B8EC4' },
      { bg: '#FFFFF0', accent: '#C4B83E' },
      { bg: '#FFF0F8', accent: '#C47EA8' },
      { bg: '#F0FFFA', accent: '#6BB5A0' },
      { bg: '#FFF5EB', accent: '#C08050' },
    ];
    
    return this.currentPage === -1 
      ? { bg: this.config.coverColor, accent: '#FFD700' }
      : palettes[this.currentPage % palettes.length];
  }
  
  highlightVocab(text, vocabWords) {
    if (!vocabWords || vocabWords.length === 0) return text;
    
    let highlightedText = text;
    vocabWords.forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="vocab-highlight" title="Vocabulary word">$1</span>');
    });
    
    return highlightedText;
  }
  
  flipTo(direction) {
    if (this.isFlipping) return;
    
    const totalPages = this.config.pages.length;
    const isOnCover = this.currentPage === -1;
    const isOnLastPage = this.currentPage === totalPages - 1;
    
    if (direction === 'next' && isOnLastPage) return;
    if (direction === 'prev' && isOnCover) return;
    
    this.isFlipping = true;
    this.flipDirection = direction;
    this.render();
    
    setTimeout(() => {
      this.currentPage = direction === 'next' ? this.currentPage + 1 : this.currentPage - 1;
      this.isFlipping = false;
      this.flipDirection = null;
      this.render();
    }, 500);
  }
  
  backToCover() {
    this.currentPage = -1;
    this.render();
  }
  
  attachEventListeners() {
    const wrapper = this.container.querySelector('.digital-book-wrapper');
    if (wrapper) {
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          this.flipTo('next');
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.flipTo('prev');
        }
      });
    }
  }
}

// Make it globally available
window.DigitalBook = DigitalBook;
