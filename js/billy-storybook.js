/**
 * Billy's Storybook - Page-flip book component
 * Nested inside lesson pages
 */

class BillyStorybook {
  constructor(story, containerId) {
    this.story = story; // { title, pages: [{text, image}, ...] }
    this.containerId = containerId;
    this.currentPage = 0;
    this.isReading = false;
    
    this.render();
  }
  
  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    
    const page = this.story.pages[this.currentPage];
    const totalPages = this.story.pages.length;
    const pageNum = this.currentPage + 1;
    
    container.innerHTML = `
      <div class="storybook-container">
        <div class="storybook-title">
          <h3>${this.story.title}</h3>
        </div>
        
        <div class="storybook-book">
          <div class="storybook-spine"></div>
          
          <!-- Left page (always shows page number) -->
          <div class="storybook-page storybook-page-left">
            ${this.currentPage > 0 ? this.renderPageContent(this.story.pages[this.currentPage - 1], this.currentPage) : '<div class="storybook-cover-inside"></div>'}
          </div>
          
          <!-- Right page (current page) -->
          <div class="storybook-page storybook-page-right">
            ${this.renderPageContent(page, pageNum)}
          </div>
        </div>
        
        <div class="storybook-controls">
          <button 
            class="storybook-btn" 
            onclick="window.storybook.prevPage()" 
            ${this.currentPage === 0 ? 'disabled' : ''}
          >
            ← Previous
          </button>
          
          <span class="storybook-page-indicator">
            Page ${pageNum} of ${totalPages}
          </span>
          
          <button 
            class="storybook-btn storybook-btn-read" 
            onclick="window.storybook.readPage()"
          >
            🔊 Read Aloud
          </button>
          
          <button 
            class="storybook-btn" 
            onclick="window.storybook.nextPage()"
            ${this.currentPage === totalPages - 1 ? 'disabled' : ''}
          >
            Next →
          </button>
        </div>
      </div>
      
      <style>
        .storybook-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .storybook-title {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .storybook-title h3 {
          color: #305853;
          font-size: 28px;
          margin: 0;
        }
        
        .storybook-book {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: #8B4513;
          padding: 10px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          min-height: 400px;
          margin-bottom: 20px;
        }
        
        .storybook-spine {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #654321 0%, #8B4513 50%, #654321 100%);
          transform: translateX(-50%);
          box-shadow: 
            -2px 0 4px rgba(0,0,0,0.3),
            2px 0 4px rgba(0,0,0,0.3);
          z-index: 10;
        }
        
        .storybook-page {
          background: #FFFEF0;
          padding: 30px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 380px;
          transition: transform 0.6s ease;
        }
        
        .storybook-page-left {
          border-right: 1px solid #ddd;
          box-shadow: inset -10px 0 20px rgba(0,0,0,0.05);
        }
        
        .storybook-page-right {
          border-left: 1px solid #ddd;
          box-shadow: inset 10px 0 20px rgba(0,0,0,0.05);
        }
        
        .storybook-page:hover {
          transform: scale(1.01);
        }
        
        .storybook-page-content {
          text-align: center;
        }
        
        .storybook-page-image {
          width: 100%;
          max-width: 250px;
          height: 200px;
          margin: 0 auto 20px;
          background: #f0f0f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
        }
        
        .storybook-page-text {
          font-size: 20px;
          line-height: 1.8;
          color: #305853;
          font-family: 'Nunito', sans-serif;
          text-align: center;
        }
        
        .storybook-page-number {
          position: absolute;
          bottom: 15px;
          font-size: 14px;
          color: #999;
          font-style: italic;
        }
        
        .storybook-page-left .storybook-page-number {
          left: 15px;
        }
        
        .storybook-page-right .storybook-page-number {
          right: 15px;
        }
        
        .storybook-cover-inside {
          background: linear-gradient(135deg, #FFD700 0%, #fbbf24 100%);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
        }
        
        .storybook-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }
        
        .storybook-btn {
          background: #305853;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Nunito', sans-serif;
        }
        
        .storybook-btn:hover:not(:disabled) {
          background: #B06821;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(176, 104, 33, 0.3);
        }
        
        .storybook-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        .storybook-btn-read {
          background: #FFD700;
          color: #305853;
        }
        
        .storybook-btn-read:hover {
          background: #fbbf24;
        }
        
        .storybook-page-indicator {
          font-size: 16px;
          color: #666;
          font-weight: 600;
        }
        
        /* Page flip animation */
        .storybook-page.flipping {
          animation: pageFlip 0.6s ease;
        }
        
        @keyframes pageFlip {
          0% { transform: perspective(1000px) rotateY(0deg); }
          50% { transform: perspective(1000px) rotateY(-15deg); }
          100% { transform: perspective(1000px) rotateY(0deg); }
        }
      </style>
    `;
  }
  
  renderPageContent(page, pageNum) {
    if (!page) return '';
    
    return `
      <div class="storybook-page-content">
        ${page.image ? `<div class="storybook-page-image">${page.image}</div>` : ''}
        <div class="storybook-page-text">${page.text}</div>
      </div>
      <div class="storybook-page-number">${pageNum}</div>
    `;
  }
  
  nextPage() {
    if (this.currentPage < this.story.pages.length - 1) {
      this.addFlipAnimation();
      setTimeout(() => {
        this.currentPage++;
        this.render();
      }, 300);
    }
  }
  
  prevPage() {
    if (this.currentPage > 0) {
      this.addFlipAnimation();
      setTimeout(() => {
        this.currentPage--;
        this.render();
      }, 300);
    }
  }
  
  addFlipAnimation() {
    const rightPage = document.querySelector('.storybook-page-right');
    if (rightPage) {
      rightPage.classList.add('flipping');
    }
  }
  
  async readPage() {
    const page = this.story.pages[this.currentPage];
    if (!page || this.isReading) return;
    
    this.isReading = true;
    const btn = document.querySelector('.storybook-btn-read');
    if (btn) {
      btn.textContent = '⏸️ Reading...';
      btn.disabled = true;
    }
    
    try {
      const response = await fetch('http://localhost:3002/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: page.text, 
          voice: 'mark' 
        })
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.isReading = false;
          if (btn) {
            btn.textContent = '🔊 Read Aloud';
            btn.disabled = false;
          }
        };
        
        await audio.play();
      } else {
        this.fallbackRead(page.text);
      }
    } catch (error) {
      console.error('TTS error:', error);
      this.fallbackRead(page.text);
    }
  }
  
  fallbackRead(text) {
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      
      utterance.onend = () => {
        this.isReading = false;
        const btn = document.querySelector('.storybook-btn-read');
        if (btn) {
          btn.textContent = '🔊 Read Aloud';
          btn.disabled = false;
        }
      };
      
      speechSynthesis.speak(utterance);
    }
  }
}

// Make available globally
window.BillyStorybook = BillyStorybook;
