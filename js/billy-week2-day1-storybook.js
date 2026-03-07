/**
 * Week 2 Day 1 Interactive Storybook: Ben and the Hen
 * Short E word family practice with turn-taking reading
 */

class BillyWeek2Day1StoryBook {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 12;
    this.isPlaying = false;
    
    // Story pages with turn-taking structure
    this.pages = [
      // Page 1 - Narrative (Billy reads)
      {
        type: 'narrative',
        text: 'Ben lived in a small den by a red barn. He had a red net he liked to use at the pond.',
        pause: 2500
      },
      // Page 2 - Decodable (Student reads)
      {
        type: 'decodable',
        text: 'Ben has a red net.',
        pause: 4000
      },
      // Page 3 - Narrative
      {
        type: 'narrative',
        text: 'One wet day a hen sat on a log and pecked near the water. Ben went with his net to see if he could get a bug.',
        pause: 2500
      },
      // Page 4 - Decodable
      {
        type: 'decodable',
        text: 'The hen sat on a log.',
        pause: 4000
      },
      // Page 5 - Narrative
      {
        type: 'narrative',
        text: 'Ben set his net by the edge and watched. A small bug met the net and tried to run. Ben kept very still.',
        pause: 2500
      },
      // Page 6 - Decodable
      {
        type: 'decodable',
        text: 'Ben set the net.',
        pause: 4000
      },
      // Page 7 - Narrative
      {
        type: 'narrative',
        text: 'The hen pecked a crumb and then hopped away. Ben saw a peg float by and used it to stir the net so the bug could not get free.',
        pause: 2500
      },
      // Page 8 - Decodable
      {
        type: 'decodable',
        text: 'The bug ran in the net.',
        pause: 4000
      },
      // Page 9 - Narrative
      {
        type: 'narrative',
        text: 'A dog near the den ran up and barked. Ben held the net up so the bug could not fly off. The dog only wanted to play and ran back to the yard.',
        pause: 2500
      },
      // Page 10 - Decodable
      {
        type: 'decodable',
        text: 'He held the net up.',
        pause: 4000
      },
      // Page 11 - Narrative
      {
        type: 'narrative',
        text: 'Ben fed the hen a bit of bread and let the bug go in the web of grass. The hen pecked at the bread and sat by Ben.',
        pause: 2500
      },
      // Page 12 - Decodable
      {
        type: 'decodable',
        text: 'Ben fed the hen.',
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
          <h2>📖 Ben and the Hen</h2>
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
    window.benHenStory = new BillyWeek2Day1StoryBook();
    window.benHenStory.init();
  });
} else {
  window.benHenStory = new BillyWeek2Day1StoryBook();
  window.benHenStory.init();
}
