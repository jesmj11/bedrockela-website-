// BedrockELA Flashcard Matching Game
// Converted from React to vanilla JavaScript

class FlashcardGame {
  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    this.config = config;
    this.cards = [];
    this.flipped = [];
    this.matched = [];
    this.attempts = 0;
    this.isChecking = false;
    this.gameWon = false;
    
    this.colors = [
      { bg: "#FF6B6B", light: "#FFE0E0" },
      { bg: "#4ECDC4", light: "#D4F5F2" },
      { bg: "#FFD93D", light: "#FFF4CC" },
      { bg: "#6C5CE7", light: "#E4E0FF" },
      { bg: "#FF8A5C", light: "#FFE4D6" },
      { bg: "#2ECC71", light: "#D5F5E3" },
      { bg: "#E056A0", light: "#FADCE9" },
      { bg: "#00B4D8", light: "#CCF0F8" },
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
  
  buildCards(pairs) {
    const cards = [];
    pairs.forEach((pair, i) => {
      const color = this.colors[i % this.colors.length];
      cards.push({
        id: `term-${i}`,
        pairId: i,
        content: pair.term,
        type: "term",
        color,
      });
      cards.push({
        id: `match-${i}`,
        pairId: i,
        content: pair.match,
        type: "match",
        color,
      });
    });
    return this.shuffleArray(cards);
  }
  
  init() {
    this.startGame();
  }
  
  startGame() {
    this.cards = this.buildCards(this.config.pairs);
    this.flipped = [];
    this.matched = [];
    this.attempts = 0;
    this.gameWon = false;
    this.isChecking = false;
    this.render();
  }
  
  handleCardClick(cardId) {
    if (this.isChecking) return;
    if (this.flipped.includes(cardId)) return;
    
    const card = this.cards.find(c => c.id === cardId);
    if (this.matched.includes(card.pairId)) return;
    
    this.flipped.push(cardId);
    this.updateCard(cardId, true);
    
    if (this.flipped.length === 2) {
      this.isChecking = true;
      this.attempts++;
      this.updateStats();
      
      const first = this.cards.find(c => c.id === this.flipped[0]);
      const second = this.cards.find(c => c.id === this.flipped[1]);
      
      if (first.pairId === second.pairId) {
        // Match!
        setTimeout(() => {
          this.matched.push(first.pairId);
          this.markAsMatched(first.pairId);
          this.flipped = [];
          this.isChecking = false;
          this.updateStats();
          this.showStar();
          
          if (this.matched.length === this.config.pairs.length) {
            setTimeout(() => this.showWinScreen(), 600);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          this.shakeCards(this.flipped);
          setTimeout(() => {
            this.flipped.forEach(id => this.updateCard(id, false));
            this.flipped = [];
            this.isChecking = false;
          }, 500);
        }, 700);
      }
    }
  }
  
  updateCard(cardId, flip) {
    const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardEl) {
      const inner = cardEl.querySelector('.card-inner');
      if (flip) {
        inner.classList.add('flipped');
      } else {
        inner.classList.remove('flipped');
      }
    }
  }
  
  markAsMatched(pairId) {
    const matchedCards = this.cards.filter(c => c.pairId === pairId);
    matchedCards.forEach(card => {
      const cardEl = document.querySelector(`[data-card-id="${card.id}"]`);
      if (cardEl) {
        cardEl.classList.add('card-matched');
        const inner = cardEl.querySelector('.card-inner');
        inner.classList.add('matched');
      }
    });
  }
  
  shakeCards(cardIds) {
    cardIds.forEach(id => {
      const cardEl = document.querySelector(`[data-card-id="${id}"]`);
      if (cardEl) {
        const inner = cardEl.querySelector('.card-inner');
        inner.classList.add('shaking');
        setTimeout(() => inner.classList.remove('shaking'), 500);
      }
    });
  }
  
  updateStats() {
    const progress = (this.matched.length / this.config.pairs.length) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
    document.querySelector('.matched-count').textContent = this.matched.length;
    document.querySelector('.attempts-count').textContent = this.attempts;
  }
  
  showStar() {
    const star = document.createElement('div');
    star.className = 'star-animation';
    star.textContent = '⭐';
    star.style.left = (50 + (Math.random() - 0.5) * 40) + '%';
    star.style.top = (50 + (Math.random() - 0.5) * 20) + '%';
    this.container.appendChild(star);
    setTimeout(() => star.remove(), 1000);
  }
  
  showWinScreen() {
    this.gameWon = true;
    const winScreen = this.container.querySelector('.win-screen');
    winScreen.style.display = 'flex';
    winScreen.querySelector('.total-pairs').textContent = this.config.pairs.length;
    winScreen.querySelector('.total-attempts').textContent = this.attempts;
    
    // Confetti
    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)].bg;
      confetti.style.animationDelay = (Math.random() * 0.5) + 's';
      this.container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2000);
    }
  }
  
  render() {
    const gridCols = this.cards.length <= 8 ? 4 : 4;
    
    this.container.innerHTML = `
      <div class="flashcard-game">
        <div class="game-header">
          <h2>${this.config.title || 'Flashcard Match!'}</h2>
          <p>${this.config.subtitle || 'Find the matching pairs'}</p>
        </div>
        
        <div class="game-stats">
          <div class="progress-container">
            <div class="progress-bar" style="width: 0%"></div>
          </div>
          <span class="progress-text"><span class="matched-count">0</span>/${this.config.pairs.length} ⭐</span>
        </div>
        
        <div class="attempts-display">
          <span>Tries: <span class="attempts-count">0</span></span>
        </div>
        
        <div class="card-grid" style="grid-template-columns: repeat(${gridCols}, 1fr)">
          ${this.cards.map((card, index) => `
            <div class="card-container" data-card-id="${card.id}" data-index="${index}">
              <div class="card-inner">
                <div class="card-front">
                  <span>?</span>
                </div>
                <div class="card-back" style="background: linear-gradient(145deg, ${card.color.bg}, ${card.color.light})">
                  <span>${card.content}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="reset-btn-container">
          <button class="reset-btn">🔄 Shuffle & Restart</button>
        </div>
        
        <div class="win-screen" style="display: none;">
          <div class="win-content">
            <div class="win-emoji">🎉</div>
            <h2>Great Job!</h2>
            <p>You found all <span class="total-pairs">0</span> pairs<br>in <span class="total-attempts">0</span> tries!</p>
            <button class="play-again-btn">Play Again! 🔄</button>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    this.container.querySelectorAll('.card-container').forEach(card => {
      card.addEventListener('click', () => {
        this.handleCardClick(card.dataset.cardId);
      });
      
      // Animate in
      setTimeout(() => {
        card.style.animation = `slideUp 0.3s ease ${parseInt(card.dataset.index) * 0.04}s both`;
      }, 10);
    });
    
    this.container.querySelector('.reset-btn').addEventListener('click', () => {
      this.startGame();
    });
    
    this.container.querySelector('.play-again-btn').addEventListener('click', () => {
      this.container.querySelector('.win-screen').style.display = 'none';
      this.startGame();
    });
  }
}

// Helper function to create a flashcard game
function createFlashcardGame(containerId, config) {
  return new FlashcardGame(containerId, config);
}
