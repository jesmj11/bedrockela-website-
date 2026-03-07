/**
 * Billy's Games - Memory & Matching for 1st Grade
 * Sight words + decodable words practice
 */

// Sight word progression (cumulative)
const SIGHT_WORDS_BY_DAY = {
  1: ['a', 'the'],
  2: ['a', 'the', 'is'],
  3: ['a', 'the', 'is', 'I'],
  4: ['a', 'the', 'is', 'I', 'my'],
  5: ['a', 'the', 'is', 'I', 'my', 'and', 'to', 'are']
};

// Decodable words by day
const DECODABLE_WORDS_BY_DAY = {
  1: ['cat', 'mat', 'bat', 'sat', 'rat', 'hat'],
  2: ['man', 'pan', 'can', 'ran', 'tan', 'ham', 'jam', 'Sam'],
  3: ['cap', 'map', 'tap', 'bag', 'tag', 'rag', 'dad', 'mad', 'sad', 'cab', 'tab'],
  4: ['van', 'fan', 'pat', 'nap', 'lap'],
  5: ['cat', 'mat', 'bat', 'man', 'pan', 'ham', 'bag', 'cap', 'dad', 'cab']
};

/**
 * Memory Game (Flip Cards)
 */
class BillyMemoryGame {
  constructor(day, containerId) {
    this.day = day;
    this.containerId = containerId;
    this.cards = [];
    this.flipped = [];
    this.matched = [];
    this.moves = 0;
    this.matches = 0;
    
    this.init();
  }
  
  init() {
    const sightWords = SIGHT_WORDS_BY_DAY[this.day] || [];
    const decodableWords = (DECODABLE_WORDS_BY_DAY[this.day] || []).slice(0, 4); // 4 decodable
    
    // Create pairs
    const words = [...sightWords.slice(0, 4), ...decodableWords]; // Mix
    const pairs = words.slice(0, 6); // 6 pairs = 12 cards
    this.cards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    
    this.render();
  }
  
  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h3 style="color: #305853;">🧠 Memory Game</h3>
        <p style="font-size: 18px; color: #666;">Find all the matching pairs!</p>
        <div style="margin-top: 10px;">
          <span style="font-size: 16px; font-weight: 600; color: #B06821;">Moves: <span id="memory-moves">0</span></span>
          <span style="margin: 0 20px;">|</span>
          <span style="font-size: 16px; font-weight: 600; color: #52b788;">Matches: <span id="memory-matches">0</span> / ${this.cards.length / 2}</span>
        </div>
      </div>
      
      <div class="memory-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; max-width: 600px; margin: 0 auto;">
        ${this.cards.map((word, i) => `
          <div class="memory-card" data-index="${i}" onclick="window.memoryGame.flipCard(${i})">
            <div class="memory-card-inner" id="memory-card-${i}">
              <div class="memory-card-front">❓</div>
              <div class="memory-card-back">${word}</div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div id="memory-result" style="text-align: center; margin-top: 30px; font-size: 20px; font-weight: 600;"></div>
      
      <style>
        .memory-card {
          aspect-ratio: 1;
          cursor: pointer;
          perspective: 1000px;
        }
        
        .memory-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .memory-card.flipped .memory-card-inner {
          transform: rotateY(180deg);
        }
        
        .memory-card.matched {
          opacity: 0.5;
          pointer-events: none;
        }
        
        .memory-card-front, .memory-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 800;
          border-radius: 12px;
          border: 3px solid #305853;
        }
        
        .memory-card-front {
          background: linear-gradient(135deg, #FFD700, #fbbf24);
          color: white;
          font-size: 48px;
        }
        
        .memory-card-back {
          background: white;
          color: #305853;
          transform: rotateY(180deg);
        }
      </style>
    `;
  }
  
  flipCard(index) {
    if (this.flipped.length === 2 || this.matched.includes(index) || this.flipped.includes(index)) {
      return;
    }
    
    const card = document.querySelector(`.memory-card[data-index="${index}"]`);
    card.classList.add('flipped');
    this.flipped.push(index);
    
    if (this.flipped.length === 2) {
      this.moves++;
      document.getElementById('memory-moves').textContent = this.moves;
      
      setTimeout(() => this.checkMatch(), 1000);
    }
  }
  
  checkMatch() {
    const [i1, i2] = this.flipped;
    const card1 = document.querySelector(`.memory-card[data-index="${i1}"]`);
    const card2 = document.querySelector(`.memory-card[data-index="${i2}"]`);
    
    if (this.cards[i1] === this.cards[i2]) {
      // Match!
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.matched.push(i1, i2);
      this.matches++;
      document.getElementById('memory-matches').textContent = this.matches;
      
      if (this.matches === this.cards.length / 2) {
        document.getElementById('memory-result').innerHTML = `
          <div style="color: #52b788;">🎉 You found all ${this.matches} pairs in ${this.moves} moves!</div>
        `;
      }
    } else {
      // No match
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }
    
    this.flipped = [];
  }
}

/**
 * Matching Game (Drag & Drop or Click)
 */
class BillyMatchingGame {
  constructor(day, containerId) {
    this.day = day;
    this.containerId = containerId;
    this.pairs = [];
    this.selected = null;
    this.matched = [];
    this.score = 0;
    
    this.init();
  }
  
  init() {
    const sightWords = SIGHT_WORDS_BY_DAY[this.day] || [];
    const decodableWords = (DECODABLE_WORDS_BY_DAY[this.day] || []).slice(0, 3);
    
    // Create word-to-meaning pairs
    this.pairs = [
      ...sightWords.map(w => ({ word: w, type: 'sight', meaning: this.getSightMeaning(w) })),
      ...decodableWords.map(w => ({ word: w, type: 'decodable', meaning: this.getDecodableMeaning(w) }))
    ].slice(0, 6);
    
    // Shuffle meanings
    this.meanings = [...this.pairs.map(p => ({ text: p.meaning, word: p.word }))].sort(() => Math.random() - 0.5);
    
    this.render();
  }
  
  getSightMeaning(word) {
    const meanings = {
      'a': 'one thing',
      'the': 'a specific thing',
      'is': 'to be',
      'I': 'me, myself',
      'my': 'belongs to me',
      'and': 'plus, also',
      'to': 'toward',
      'are': 'more than one is'
    };
    return meanings[word] || word;
  }
  
  getDecodableMeaning(word) {
    const meanings = {
      'cat': '🐱 animal',
      'mat': '🪑 rug',
      'bat': '⚾ sports',
      'man': '👨 person',
      'pan': '🍳 cooking',
      'ham': '🥓 meat',
      'cap': '🧢 hat',
      'bag': '👜 carry things',
      'dad': '👨‍👧 parent',
      'cab': '🚕 taxi',
      'van': '🚐 vehicle',
      'jam': '🍓 fruit spread'
    };
    return meanings[word] || word;
  }
  
  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h3 style="color: #305853;">🎯 Matching Game</h3>
        <p style="font-size: 18px; color: #666;">Click a word, then click its meaning!</p>
        <div style="margin-top: 10px;">
          <span style="font-size: 16px; font-weight: 600; color: #52b788;">Score: <span id="matching-score">0</span> / ${this.pairs.length}</span>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 700px; margin: 0 auto;">
        <!-- Words column -->
        <div class="matching-words">
          ${this.pairs.map((p, i) => `
            <div class="matching-word" data-word="${p.word}" onclick="window.matchingGame.selectWord('${p.word}')" id="match-word-${i}">
              ${p.word}
            </div>
          `).join('')}
        </div>
        
        <!-- Meanings column -->
        <div class="matching-meanings">
          ${this.meanings.map((m, i) => `
            <div class="matching-meaning" data-word="${m.word}" onclick="window.matchingGame.selectMeaning('${m.word}')" id="match-meaning-${i}">
              ${m.text}
            </div>
          `).join('')}
        </div>
      </div>
      
      <div id="matching-feedback" style="text-align: center; margin-top: 20px; font-size: 18px; font-weight: 600;"></div>
      
      <style>
        .matching-word, .matching-meaning {
          background: white;
          border: 3px solid #305853;
          border-radius: 12px;
          padding: 20px;
          margin: 10px 0;
          font-size: 24px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        
        .matching-word:hover, .matching-meaning:hover {
          background: #f5f9ff;
          transform: scale(1.05);
        }
        
        .matching-word.selected, .matching-meaning.selected {
          background: #FFD700;
          border-color: #B06821;
          transform: scale(1.1);
        }
        
        .matching-word.matched, .matching-meaning.matched {
          background: #52b788;
          color: white;
          border-color: #52b788;
          opacity: 0.7;
          pointer-events: none;
        }
        
        .matching-word.wrong, .matching-meaning.wrong {
          background: #f4845f;
          animation: shake 0.3s;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      </style>
    `;
  }
  
  selectWord(word) {
    if (this.matched.includes(word)) return;
    
    // Clear previous selection
    document.querySelectorAll('.matching-word').forEach(el => el.classList.remove('selected'));
    
    // Select this word
    const wordEl = document.querySelector(`.matching-word[data-word="${word}"]`);
    wordEl.classList.add('selected');
    
    this.selected = word;
  }
  
  selectMeaning(word) {
    if (!this.selected || this.matched.includes(word)) return;
    
    const meaningEl = document.querySelector(`.matching-meaning[data-word="${word}"]`);
    const wordEl = document.querySelector(`.matching-word[data-word="${this.selected}"]`);
    
    if (this.selected === word) {
      // Correct match!
      wordEl.classList.remove('selected');
      wordEl.classList.add('matched');
      meaningEl.classList.add('matched');
      this.matched.push(word);
      this.score++;
      document.getElementById('matching-score').textContent = this.score;
      
      if (this.score === this.pairs.length) {
        document.getElementById('matching-feedback').innerHTML = `
          <div style="color: #52b788;">🎉 Perfect! You matched all ${this.score} pairs!</div>
        `;
      }
    } else {
      // Wrong match
      wordEl.classList.add('wrong');
      meaningEl.classList.add('wrong');
      
      setTimeout(() => {
        wordEl.classList.remove('selected', 'wrong');
        meaningEl.classList.remove('wrong');
      }, 600);
    }
    
    this.selected = null;
  }
}

// Make available globally
window.BillyMemoryGame = BillyMemoryGame;
window.BillyMatchingGame = BillyMatchingGame;
