/**
 * Day 3 Interactive Storybook: The Barn Band
 * Short A word family practice with turn-taking reading
 */

class BillyDay3StoryBook {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 12;
    this.isPlaying = false;
    
    // Story pages with turn-taking structure
    this.pages = [
      // Page 1 - Narrative (Billy reads)
      {
        type: 'narrative',
        text: 'At the back of the farm a band of barn animals liked to play music at dawn. Peg the pig had a pan drum and Sam the ram had a small bell.',
        pause: 2500
      },
      // Page 2 - Decodable (Student reads)
      {
        type: 'decodable',
        text: 'Peg had a pan.',
        pause: 4000
      },
      // Page 3 - Narrative
      {
        type: 'narrative',
        text: 'Each day they met by the old gate and made a happy sound. The crow sang, the lambs tapped, and even the hens clucked the beat.',
        pause: 2500
      },
      // Page 4 - Decodable
      {
        type: 'decodable',
        text: 'They made a band.',
        pause: 4000
      },
      // Page 5 - Narrative
      {
        type: 'narrative',
        text: 'One day a cart went by and a loud clang made the band stop. A small pup near the gate ran and hid, scared of the noise.',
        pause: 2500
      },
      // Page 6 - Decodable
      {
        type: 'decodable',
        text: 'The pup ran and hid.',
        pause: 4000
      },
      // Page 7 - Narrative
      {
        type: 'narrative',
        text: 'Sam struck his bell soft and Peg tapped her pan slow. The sound was calm and the pup came out to see.',
        pause: 2500
      },
      // Page 8 - Decodable
      {
        type: 'decodable',
        text: 'Sam rang the bell.',
        pause: 4000
      },
      // Page 9 - Narrative
      {
        type: 'narrative',
        text: 'The band then played a bright tune: tap-tap, clang, ring. The sound was fun and made the farm folk clap and dance.',
        pause: 2500
      },
      // Page 10 - Decodable
      {
        type: 'decodable',
        text: 'They sang and clapped.',
        pause: 4000
      },
      // Page 11 - Narrative
      {
        type: 'narrative',
        text: 'At dusk the band sat by the barn and ate a small snack: jam on a bun. They felt glad and planned the next day\'s song.',
        pause: 2500
      },
      // Page 12 - Decodable
      {
        type: 'decodable',
        text: 'The barn band is glad.',
        pause: 4000
      }
    ];
    
    this.prompts = [
      "Now you read:",
      "Your turn:",
      "Read this:",
      "You try:",
      "Can you read this?",
      "Read it out loud:"
    ];
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const page = this.pages[this.currentPage - 1];
    const isNarrative = page.type === 'narrative';
    
    const storyHTML = `
      <div class="billy-storybook">
        <div class="storybook-header">
          <h2>📖 The Barn Band</h2>
          <div class="story-progress">Page ${this.currentPage} of ${this.totalPages}</div>
        </div>
        
        <div class="storybook-page ${page.type}-page">
          ${isNarrative ? 
            `<div class="page-badge">📖 Billy reads</div>` : 
            `<div class="page-badge student-badge">✏️ You read</div>`
          }
          
          <div class="page-content">
            ${!isNarrative ? 
              `<div class="student-prompt">${this.getRandomPrompt()}</div>` : 
              ''
            }
            <p class="${isNarrative ? 'narrative-text' : 'decodable-text'}">${page.text}</p>
          </div>
        </div>
        
        <div class="storybook-controls">
          <button class="story-nav-btn" id="prevPage" ${this.currentPage === 1 ? 'disabled' : ''}>
            ← Previous
          </button>
          
          <div class="page-dots">
            ${Array.from({length: this.totalPages}, (_, i) => 
              `<span class="page-dot ${i + 1 === this.currentPage ? 'active' : ''}" data-page="${i + 1}"></span>`
            ).join('')}
          </div>
          
          <button class="story-nav-btn" id="nextPage" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
            Next →
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('storybook-container').innerHTML = storyHTML;
  }

  attachEventListeners() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousPage());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPage());
    }
    
    // Page dots navigation
    document.querySelectorAll('.page-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        const pageNum = parseInt(e.target.dataset.page);
        this.goToPage(pageNum);
      });
    });
  }

  getRandomPrompt() {
    return this.prompts[Math.floor(Math.random() * this.prompts.length)];
  }

  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.render();
      this.attachEventListeners();
      await this.autoPlay();
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.render();
      this.attachEventListeners();
      await this.autoPlay();
    }
  }

  async goToPage(pageNum) {
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPage = pageNum;
      this.render();
      this.attachEventListeners();
      await this.autoPlay();
    }
  }

  async autoPlay() {
    if (this.isPlaying) return;
    
    const page = this.pages[this.currentPage - 1];
    this.isPlaying = true;
    
    // If narrative page, Billy reads automatically
    if (page.type === 'narrative') {
      await this.speakBilly(page.text);
      await this.wait(page.pause);
    } else {
      // If decodable page, pause for student to read
      await this.wait(page.pause);
    }
    
    this.isPlaying = false;
  }

  async speakBilly(text) {
    // Try ElevenLabs first
    try {
      const response = await fetch('http://localhost:3002/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: text,
          voice: 'mark'
        })
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        return new Promise((resolve) => {
          audio.onended = resolve;
          audio.play();
        });
      }
    } catch (err) {
      console.log('ElevenLabs unavailable, using browser TTS');
    }
    
    // Fallback to browser TTS
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async start() {
    this.currentPage = 1;
    this.render();
    this.attachEventListeners();
    await this.autoPlay();
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.barnBandStory = new BillyDay3StoryBook();
    window.barnBandStory.init();
  });
} else {
  window.barnBandStory = new BillyDay3StoryBook();
  window.barnBandStory.init();
}
