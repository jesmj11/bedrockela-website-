// Digital Book Component for BedrockELA
// Vanilla JS version adapted to BedrockELA color scheme

function createDigitalBook(bookConfig) {
  const container = document.createElement('div');
  container.className = 'digital-book-container';
  
  let currentPage = -1; // -1 = cover
  let isFlipping = false;
  
  const totalPages = bookConfig.pages.length;
  
  function render() {
    const isOnCover = currentPage === -1;
    const isOnLastPage = currentPage === totalPages - 1;
    const pageData = !isOnCover ? bookConfig.pages[currentPage] : null;
    
    container.innerHTML = `
      <style>
        .digital-book-container {
          width: 100%;
          max-width: 400px;
          margin: 5px auto;
          perspective: 1200px;
        }
        
        .book-wrapper {
          position: relative;
          width: 100%;
          max-height: 350px;
          aspect-ratio: 3/4;
          cursor: pointer;
        }
        
        .book-page {
          position: absolute;
          inset: 0;
          border-radius: 8px 20px 20px 8px;
          background: #FFFFFF;
          box-shadow: 0 10px 40px rgba(48, 88, 83, 0.2), 
                      0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: left center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .book-page.flipping {
          animation: pageFlip 0.5s ease-in-out;
        }
        
        @keyframes pageFlip {
          0% { transform: perspective(1200px) rotateY(0deg); }
          50% { transform: perspective(1200px) rotateY(-90deg); }
          100% { transform: perspective(1200px) rotateY(-180deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .book-spine-shadow {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 30px;
          background: linear-gradient(to right, rgba(48, 88, 83, 0.15), transparent);
          pointer-events: none;
          z-index: 5;
          border-radius: 8px 0 0 8px;
        }
        
        .book-cover {
          background: linear-gradient(145deg, #305853 0%, #2d5048 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 15px;
          animation: fadeIn 0.5s ease;
          border: 2px solid rgba(176, 104, 33, 0.2);
        }
        
        .book-cover-title {
          font-family: 'Georgia', serif;
          font-size: clamp(18px, 4vw, 24px);
          font-weight: 700;
          color: #B06821;
          text-align: center;
          margin: 10px 0 6px 0;
          line-height: 1.2;
        }
        
        .book-cover-subtitle {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(11px, 2.2vw, 13px);
          font-weight: 600;
          color: rgba(176, 104, 33, 0.7);
          text-align: center;
          margin: 0 0 15px 0;
        }
        
        .book-open-btn {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 20px;
          border: 2px solid rgba(176, 104, 33, 0.5);
          background: rgba(176, 104, 33, 0.15);
          color: #B06821;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .book-open-btn:hover {
          transform: scale(1.05);
          background: rgba(176, 104, 33, 0.25);
          box-shadow: 0 4px 15px rgba(176, 104, 33, 0.3);
        }
        
        .book-content-page {
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.3s ease;
        }
        
        .book-top-accent {
          height: 4px;
          background: linear-gradient(90deg, transparent, #B06821, transparent);
        }
        
        .book-page-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 2.5vw, 20px);
          position: relative;
        }
        
        .book-page-title {
          font-family: 'Georgia', serif;
          font-size: clamp(16px, 3vw, 20px);
          font-weight: 700;
          color: #305853;
          text-align: center;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }
        
        .book-page-text {
          font-family: 'Georgia', serif;
          font-size: clamp(13px, 2.8vw, 16px);
          font-weight: 400;
          color: #511B18;
          text-align: left;
          margin: 0;
          line-height: 1.5;
          max-width: 350px;
        }
        
        .book-bottom-bar {
          padding: 8px 15px;
          display: flex;
          justify-content: center;
          border-top: 1px solid rgba(176, 104, 33, 0.2);
        }
        
        .book-page-number {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(176, 104, 33, 0.7);
          letter-spacing: 0.5px;
        }
        
        .book-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          animation: fadeIn 0.5s ease;
        }
        
        .book-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(48, 88, 83, 0.3);
          background: #FFFFFF;
          color: #305853;
          font-size: 16px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(48, 88, 83, 0.1);
        }
        
        .book-nav-btn:hover:not(:disabled) {
          transform: scale(1.1);
          background: #305853;
          color: white;
          box-shadow: 0 4px 15px rgba(48, 88, 83, 0.3);
        }
        
        .book-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .book-page-dots {
          display: flex;
          gap: 5px;
          align-items: center;
        }
        
        .book-page-dot {
          height: 8px;
          border-radius: 99px;
          background: rgba(48, 88, 83, 0.3);
          transition: all 0.3s ease;
        }
        
        .book-page-dot.active {
          width: 20px;
          background: #305853;
        }
        
        .book-page-dot:not(.active) {
          width: 8px;
        }
      </style>
      
      <div class="book-wrapper">
        ${isFlipping ? '<div class="book-page flipping"></div>' : ''}
        
        <div class="book-page ${isFlipping ? 'hidden' : ''}">
          ${isOnCover ? renderCover() : renderContentPage(pageData, currentPage + 1, totalPages)}
        </div>
      </div>
      
      ${!isOnCover ? renderNavigation(isOnLastPage) : ''}
    `;
    
    attachEventListeners();
  }
  
  function renderCover() {
    return `
      <div class="book-cover">
        <div class="book-cover-title">${bookConfig.title}</div>
        <div class="book-cover-subtitle">${bookConfig.subtitle || ''}</div>
        <button class="book-open-btn" onclick="window.bookInstance.nextPage()">
          Start Reading →
        </button>
      </div>
    `;
  }
  
  function renderContentPage(pageData, pageNum, total) {
    return `
      <div class="book-content-page">
        <div class="book-spine-shadow"></div>
        <div class="book-top-accent"></div>
        <div class="book-page-content">
          ${pageData.title ? `<div class="book-page-title">${pageData.title}</div>` : ''}
          <div class="book-page-text">${pageData.text}</div>
        </div>
        <div class="book-bottom-bar">
          <span class="book-page-number">— ${pageNum} of ${total} —</span>
        </div>
      </div>
    `;
  }
  
  function renderNavigation(isOnLastPage) {
    const dots = bookConfig.pages.map((_, i) => {
      return `<div class="book-page-dot ${i === currentPage ? 'active' : ''}"></div>`;
    }).join('');
    
    return `
      <div class="book-nav">
        <button class="book-nav-btn" 
                onclick="window.bookInstance.prevPage()" 
                ${currentPage === -1 ? 'disabled' : ''}>
          ←
        </button>
        <div class="book-page-dots">${dots}</div>
        <button class="book-nav-btn" 
                onclick="window.bookInstance.nextPage()" 
                ${isOnLastPage ? 'disabled' : ''}>
          →
        </button>
      </div>
    `;
  }
  
  function attachEventListeners() {
    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        nextPage();
      } else if (e.key === 'ArrowLeft' && currentPage > -1) {
        prevPage();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
  }
  
  function nextPage() {
    if (isFlipping || currentPage >= totalPages - 1) return;
    
    isFlipping = true;
    render();
    
    setTimeout(() => {
      currentPage++;
      isFlipping = false;
      render();
    }, 500);
  }
  
  function prevPage() {
    if (isFlipping || currentPage === -1) return;
    
    isFlipping = true;
    render();
    
    setTimeout(() => {
      currentPage--;
      isFlipping = false;
      render();
    }, 500);
  }
  
  // Public API
  window.bookInstance = {
    nextPage,
    prevPage
  };
  
  render();
  return container;
}

// Helper function to initialize a book in a container
function initDigitalBook(containerId, bookConfig) {
  const container = document.getElementById(containerId);
  if (container) {
    const book = createDigitalBook(bookConfig);
    container.appendChild(book);
  }
}
