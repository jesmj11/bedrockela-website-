/**
 * Billy's Story Book - Interactive read-aloud with turn-taking
 * Billy reads narrative pages (odd), student reads decodable sentences (even)
 */

class BillyStoryBook {
  constructor(storyData, containerId = 'storybook-container') {
    this.story = storyData;
    this.container = document.getElementById(containerId);
    this.currentPage = 1;
    this.isPlaying = false;
    this.isPaused = false;
    
    if (!this.container) {
      console.error(`Story book container #${containerId} not found`);
      return;
    }
    
    this.render();
    this.attachListeners();
  }
  
  render() {
    const totalPages = this.story.pages.length;
    const page = this.story.pages[this.currentPage - 1];
    const isNarrative = this.currentPage % 2 === 1; // Odd pages = Billy reads
    
    this.container.innerHTML = `
      <div class="storybook-wrapper">
        <div class="storybook-header">
          <h3>${this.story.title}</h3>
          <div class="storybook-progress">Page ${this.currentPage} of ${totalPages}</div>
        </div>
        
        <div class="storybook-page ${isNarrative ? 'narrative-page' : 'decodable-page'}">
          <div class="page-type-badge">
            ${isNarrative ? '📖 Billy reads' : '✏️ You read'}
          </div>
          
          <div class="page-content">
            ${isNarrative ? `
              <div class="narrative-text">${page.text}</div>
            ` : `
              <div class="decodable-prompt">Billy says: "${page.prompt}"</div>
              <div class="decodable-text">"${page.text}"</div>
            `}
          </div>
          
          ${isNarrative ? `
            <div class="auto-play-indicator">
              ${this.isPlaying ? '🔊 Billy is reading...' : '▶️ Turn page to hear Billy read'}
            </div>
          ` : `
            <div class="student-prompt">
              👆 Read the sentence above out loud!
            </div>
          `}
        </div>
        
        <div class="storybook-nav">
          <button class="story-nav-btn" id="prev-page" ${this.currentPage === 1 ? 'disabled' : ''}>
            ← Previous
          </button>
          
          <div class="page-dots">
            ${this.story.pages.map((_, i) => `
              <span class="page-dot ${i + 1 === this.currentPage ? 'active' : ''}" 
                    data-page="${i + 1}"></span>
            `).join('')}
          </div>
          
          <button class="story-nav-btn" id="next-page" ${this.currentPage === totalPages ? 'disabled' : ''}>
            ${this.currentPage === totalPages ? 'Finish' : 'Next'} →
          </button>
        </div>
      </div>
    `;
  }
  
  attachListeners() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const dots = this.container.querySelectorAll('.page-dot');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousPage());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPage());
    }
    
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const pageNum = parseInt(e.target.dataset.page);
        this.goToPage(pageNum);
      });
    });
  }
  
  async readCurrentPage() {
    const page = this.story.pages[this.currentPage - 1];
    const isNarrative = this.currentPage % 2 === 1;
    
    if (!isNarrative) {
      // Student reads - Billy just prompts
      await this.speakPage(page.prompt, 4000);
      return;
    }
    
    // Billy reads narrative
    this.isPlaying = true;
    this.render(); // Update UI to show "Billy is reading..."
    
    await this.speakPage(page.text, 2500);
    
    this.isPlaying = false;
    this.render();
  }
  
  async speakPage(text, pauseAfter = 2500) {
    // Remove Billy: prefix if present
    const cleanText = text.replace(/^Billy:\s*"?/, '').replace(/"$/, '');
    
    // Try ElevenLabs first (via global speakBilly if available)
    if (typeof speakBilly === 'function') {
      return new Promise((resolve) => {
        // Use the global speakBilly function
        const audioPromise = speakBilly(cleanText);
        
        if (audioPromise && audioPromise.then) {
          audioPromise.then(() => {
            setTimeout(resolve, pauseAfter);
          }).catch(() => {
            // Fallback to browser TTS
            this.fallbackSpeak(cleanText, pauseAfter, resolve);
          });
        } else {
          // Immediate fallback
          this.fallbackSpeak(cleanText, pauseAfter, resolve);
        }
      });
    } else {
      // No speakBilly available, use browser TTS
      return new Promise((resolve) => {
        this.fallbackSpeak(cleanText, pauseAfter, resolve);
      });
    }
  }
  
  fallbackSpeak(text, pauseAfter, resolve) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.onend = () => {
        setTimeout(resolve, pauseAfter);
      };
      speechSynthesis.speak(utterance);
    } else {
      setTimeout(resolve, pauseAfter);
    }
  }
  
  async nextPage() {
    if (this.currentPage >= this.story.pages.length) {
      // Story finished - could trigger completion event
      console.log('Story complete!');
      return;
    }
    
    this.currentPage++;
    this.render();
    this.attachListeners();
    
    // Auto-read if it's a narrative page
    if (this.currentPage % 2 === 1) {
      await this.readCurrentPage();
    }
  }
  
  async previousPage() {
    if (this.currentPage <= 1) return;
    
    this.currentPage--;
    this.render();
    this.attachListeners();
  }
  
  async goToPage(pageNum) {
    if (pageNum < 1 || pageNum > this.story.pages.length) return;
    if (pageNum === this.currentPage) return;
    
    this.currentPage = pageNum;
    this.render();
    this.attachListeners();
    
    // Auto-read if it's a narrative page
    if (this.currentPage % 2 === 1) {
      await this.readCurrentPage();
    }
  }
  
  start() {
    // Start from page 1 and begin reading
    this.currentPage = 1;
    this.render();
    this.attachListeners();
    this.readCurrentPage();
  }
}

// Story data for Week 1 Day 1: Sam and the Wolf
const samAndTheWolfStory = {
  title: "Sam and the Wolf",
  pages: [
    {
      text: "On a green, grassy hill lived a small flock. Sam the ram wore a red hat and liked to nap in the sun.",
      type: "narrative"
    },
    {
      prompt: "Now you read:",
      text: "Sam naps on a tan mat.",
      type: "decodable"
    },
    {
      text: "At night a sly old wolf would prowl near the hill. The wolf had a bad plan — he would try to grab a lamb and run away.",
      type: "narrative"
    },
    {
      prompt: "Your turn:",
      text: "The wolf will grab a lamb.",
      type: "decodable"
    },
    {
      text: "One damp day the wolf crept through a gap in the fence. He tiptoed close to a lamb by a pan. The lamb was scared and darted away to hide.",
      type: "narrative"
    },
    {
      prompt: "Read this:",
      text: "The lamb ran and hid.",
      type: "decodable"
    },
    {
      text: "Sam saw the wolf and would not run. He rushed to the gate and rammed it hard. Bang! The loud sound made the wolf jump back.",
      type: "narrative"
    },
    {
      prompt: "Say the sentence:",
      text: "Sam ran to the gate and hit it.",
      type: "decodable"
    },
    {
      text: "Sam waved a rag, clanged a pan on a rock, and let out a big, brave bray. He ran with zig and zag moves until the wolf was dazed and ran down the road.",
      type: "narrative"
    },
    {
      prompt: "Now read:",
      text: "He made a big bang with a pan.",
      type: "decodable"
    },
    {
      text: "The lambs ran to Sam and sang, 'Sam is brave!' The shepherd came in his van, patted Sam, and gave him a slice of jam bread. Sam felt glad and lay down for a warm nap.",
      type: "narrative"
    },
    {
      prompt: "Your last line:",
      text: "Sam and the lambs are glad.",
      type: "decodable"
    }
  ]
};
