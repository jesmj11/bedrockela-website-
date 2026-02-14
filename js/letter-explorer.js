// BedrockELA Letter Explorer - Spelling Game
// Converted from React to vanilla JavaScript

class LetterExplorer {
  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    this.config = config;
    this.wordIndex = 0;
    this.wordsCompleted = 0;
    this.scrambledLetters = [];
    this.slots = [];
    this.draggedLetter = null;
    this.wordComplete = false;
    this.allDone = false;
    this.showDefinition = false;
    
    this.colors = [
      "#FF6B6B", "#FF8A5C", "#FFD93D", "#2ECC71",
      "#4ECDC4", "#6C5CE7", "#E056A0", "#00B4D8",
      "#F39C12", "#1ABC9C",
    ];
    
    this.init();
  }
  
  shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  speakWord(word) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.rate = 0.75;
      utter.pitch = 1.1;
      window.speechSynthesis.speak(utter);
    }
  }
  
  init() {
    this.initWord();
  }
  
  initWord() {
    if (this.wordIndex >= this.config.words.length) {
      this.allDone = true;
      this.render();
      return;
    }
    
    const wordData = this.config.words[this.wordIndex];
    const word = wordData.word.toLowerCase();
    
    this.scrambledLetters = word.split("").map((l, i) => ({
      id: `letter-${i}-${Date.now()}`,
      char: l,
      placed: false,
    }));
    this.scrambledLetters = this.shuffleArray(this.scrambledLetters);
    
    this.slots = word.split("").map((l, i) => ({
      index: i,
      expected: l,
      filled: null,
    }));
    
    this.wordComplete = false;
    this.showDefinition = false;
    this.render();
    
    // Speak word after render
    setTimeout(() => this.speakWord(word), 500);
  }
  
  handleDrop(slotIndex, letterId) {
    if (this.wordComplete) return;
    
    const letter = this.scrambledLetters.find(l => l.id === letterId);
    if (!letter || letter.placed) return;
    
    const slot = this.slots[slotIndex];
    if (slot.filled) return;
    
    if (letter.char === slot.expected) {
      // Correct!
      slot.filled = letter;
      letter.placed = true;
      
      // Check if word complete
      const allFilled = this.slots.every(s => s.filled !== null);
      if (allFilled) {
        setTimeout(() => {
          this.wordComplete = true;
          const wordData = this.config.words[this.wordIndex];
          this.speakWord(wordData.word);
          setTimeout(() => {
            this.showDefinition = true;
            this.render();
          }, 800);
          this.render();
        }, 400);
      }
      
      this.render();
    } else {
      // Wrong - shake animation handled in CSS
      const slotEl = document.querySelector(`[data-slot="${slotIndex}"]`);
      if (slotEl) {
        slotEl.classList.add('shake');
        setTimeout(() => slotEl.classList.remove('shake'), 500);
      }
    }
  }
  
  nextWord() {
    this.wordsCompleted++;
    this.wordIndex++;
    if (this.wordIndex >= this.config.words.length) {
      this.allDone = true;
      this.render();
    } else {
      this.initWord();
    }
  }
  
  restart() {
    this.wordIndex = 0;
    this.wordsCompleted = 0;
    this.allDone = false;
    this.initWord();
  }
  
  render() {
    const progress = (this.wordsCompleted / this.config.words.length) * 100;
    const currentWordData = this.config.words[this.wordIndex] || this.config.words[0];
    
    this.container.innerHTML = `
      <div class="letter-explorer-game">
        ${!this.allDone ? `
          <div class="le-header">
            <h2>${this.config.title || 'Letter Explorer'}</h2>
            <p>${this.config.subtitle || 'Drag letters to spell the word!'}</p>
          </div>
          
          <div class="le-progress">
            <div class="le-progress-bar" style="width: ${progress}%"></div>
          </div>
          <div class="le-progress-text">${this.wordsCompleted}/${this.config.words.length}</div>
          
          <div class="le-game-area">
            <div class="le-emoji">${currentWordData.emoji}</div>
            
            ${!this.wordComplete ? `
              <button class="le-sound-btn" onclick="window.currentLetterExplorer.speakWord('${currentWordData.word}')">
                🔊 Hear it again
              </button>
            ` : ''}
            
            <div class="le-slots">
              ${this.slots.map((slot, i) => `
                <div class="le-slot ${slot.filled ? 'filled' : ''}" 
                     data-slot="${i}"
                     ondrop="event.preventDefault(); window.currentLetterExplorer.handleDrop(${i}, event.dataTransfer.getData('letterId'))"
                     ondragover="event.preventDefault()"
                     style="background: ${slot.filled ? `linear-gradient(145deg, ${this.colors[i % this.colors.length]}, ${this.colors[i % this.colors.length]}CC)` : 'rgba(255,255,255,0.65)'}">
                  ${slot.filled ? slot.filled.char : ''}
                </div>
              `).join('')}
            </div>
            
            ${!this.wordComplete ? `
              <div class="le-letters">
                ${this.scrambledLetters.map(letter => `
                  <div class="le-letter ${letter.placed ? 'placed' : ''}"
                       draggable="${!letter.placed}"
                       ondragstart="event.dataTransfer.setData('letterId', '${letter.id}')"
                       style="background: ${letter.placed ? '#E0D5C1' : `linear-gradient(145deg, ${this.colors[letter.char.charCodeAt(0) % this.colors.length]}, ${this.colors[letter.char.charCodeAt(0) % this.colors.length]}DD)`}">
                    ${letter.char}
                  </div>
                `).join('')}
              </div>
            ` : ''}
            
            ${this.wordComplete ? `
              <div class="le-complete">
                <div class="le-word-reveal">${currentWordData.word}</div>
                ${this.showDefinition ? `
                  <div class="le-definition-card">
                    <p class="le-definition">${currentWordData.definition}</p>
                    <div class="le-example">
                      <span>📖</span>
                      <p>"${currentWordData.example}"</p>
                    </div>
                    <button class="le-sound-btn" onclick="window.currentLetterExplorer.speakWord('${currentWordData.word}')">
                      🔊 Hear the word
                    </button>
                  </div>
                  <button class="le-next-btn" onclick="window.currentLetterExplorer.nextWord()">
                    ${this.wordIndex < this.config.words.length - 1 ? 'Next Word →' : 'Finish! 🎉'}
                  </button>
                ` : ''}
              </div>
            ` : ''}
          </div>
        ` : `
          <div class="le-all-done">
            <div class="le-trophy">🏆</div>
            <h2>Amazing Job!</h2>
            <p>You spelled all ${this.config.words.length} words!</p>
            <div class="le-words-review">
              ${this.config.words.map((w, i) => `
                <div class="le-review-word">${w.emoji} ${w.word}</div>
              `).join('')}
            </div>
            <button class="le-next-btn" onclick="window.currentLetterExplorer.restart()">
              Play Again! 🔄
            </button>
          </div>
        `}
      </div>
    `;
  }
}

// Helper function
function createLetterExplorer(containerId, config) {
  const game = new LetterExplorer(containerId, config);
  window.currentLetterExplorer = game; // For onclick handlers
  return game;
}
