/**
 * Letter Explorer Game - Vanilla JavaScript
 * Drag-and-drop letter spelling game with definitions
 */

const SLOT_COLORS = [
  "#FF6B6B", "#FF8A5C", "#FFD93D", "#2ECC71",
  "#4ECDC4", "#6C5CE7", "#E056A0", "#00B4D8",
  "#F39C12", "#1ABC9C",
];

const MONSTER_FACES = ["👾", "👻", "🤖", "👽", "🦊", "🐸", "🦉", "🐙"];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speakWord(word) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(word);
    utter.rate = 0.75;
    utter.pitch = 1.1;
    utter.volume = 1;
    window.speechSynthesis.speak(utter);
  }
}

function createLetterExplorer(containerId, config, onComplete) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }
  
  // Callback when all words are completed
  const completionCallback = onComplete || function() {};

  let wordIndex = 0;
  let scrambledLetters = [];
  let slots = [];
  let draggedLetter = null;
  let wordComplete = false;
  let allDone = false;
  let showDefinition = false;
  let bounceSlot = null;
  let shakeSlot = null;
  let monsterFace = MONSTER_FACES[0];
  let monsterMood = "idle";
  let wordsCompleted = 0;
  let touchDragState = null;
  let slotRefs = [];

  const currentWordData = () => config.words[wordIndex];
  const currentWord = () => currentWordData()?.word?.toLowerCase() || "";

  function initWord() {
    if (wordIndex >= config.words.length) {
      allDone = true;
      render();
      return;
    }

    const word = config.words[wordIndex].word.toLowerCase();
    const letters = word.split("").map((l, i) => ({
      id: `letter-${i}-${Date.now()}`,
      char: l,
      originalIndex: i,
      placed: false,
    }));

    scrambledLetters = shuffleArray(letters);
    slots = word.split("").map((l, i) => ({ 
      index: i, 
      expected: l, 
      filled: null 
    }));
    
    wordComplete = false;
    showDefinition = false;
    monsterFace = MONSTER_FACES[Math.floor(Math.random() * MONSTER_FACES.length)];
    monsterMood = "idle";
    bounceSlot = null;
    shakeSlot = null;

    render();

    // Auto-read word
    setTimeout(() => speakWord(currentWord()), 500);
  }

  function handleDragStart(letter) {
    if (letter.placed || wordComplete) return;
    draggedLetter = letter;
    monsterMood = "excited";
    render();
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDropOnSlot(slotIndex) {
    if (!draggedLetter || wordComplete) return;
    const slot = slots[slotIndex];

    if (slot.filled) return;

    if (draggedLetter.char === slot.expected) {
      // Correct!
      slots[slotIndex] = { ...slot, filled: draggedLetter };
      
      scrambledLetters = scrambledLetters.map((l) =>
        l.id === draggedLetter.id ? { ...l, placed: true } : l
      );

      bounceSlot = slotIndex;
      setTimeout(() => {
        bounceSlot = null;
        render();
      }, 500);
      
      monsterMood = "happy";
      setTimeout(() => {
        monsterMood = "idle";
        render();
      }, 800);

      // Check if word is complete
      const allFilled = slots.every((s) => s.filled !== null);
      if (allFilled) {
        setTimeout(() => {
          wordComplete = true;
          monsterMood = "celebrate";
          speakWord(currentWord());
          render();
          setTimeout(() => {
            showDefinition = true;
            render();
          }, 800);
        }, 400);
      }

      render();
    } else {
      // Wrong slot
      shakeSlot = slotIndex;
      monsterMood = "oops";
      render();
      setTimeout(() => {
        shakeSlot = null;
        monsterMood = "idle";
        render();
      }, 500);
    }

    draggedLetter = null;
  }

  function handleNextWord() {
    wordsCompleted++;
    wordIndex++;
    if (wordIndex >= config.words.length) {
      allDone = true;
      // Call completion callback
      completionCallback();
    }
    render();
    if (!allDone) {
      setTimeout(() => initWord(), 100);
    }
  }

  function handleRestart() {
    wordIndex = 0;
    wordsCompleted = 0;
    allDone = false;
    render();
    setTimeout(() => initWord(), 100);
  }

  function render() {
    const progress = (wordsCompleted / config.words.length) * 100;
    const word = currentWordData();

    container.innerHTML = `
      ${!allDone && word ? `
        <!-- Progress bar -->
        <div class="le-progress-container">
          <div class="le-progress-bar">
            <div class="le-progress-fill" style="width: ${progress}%;"></div>
          </div>
          <span class="le-progress-text">${wordsCompleted}/${config.words.length}</span>
        </div>

        <!-- Monster + Emoji -->
        <div class="le-monster-container">
          <div class="le-monster ${monsterMood}">${monsterFace}</div>
          <div class="le-word-emoji">${word.emoji}</div>
          ${!wordComplete ? `
            <button class="le-sound-btn" onclick="window.lePlayWord()">
              🔊 Hear it again
            </button>
          ` : ''}
        </div>

        <!-- Letter slots -->
        <div class="le-slots-container">
          ${slots.map((slot, i) => {
            const color = SLOT_COLORS[i % SLOT_COLORS.length];
            const isBouncing = bounceSlot === i;
            const isShaking = shakeSlot === i;
            
            return `
              <div 
                class="le-slot ${isBouncing ? 'bounce' : ''} ${isShaking ? 'shake' : ''}"
                data-slot="${i}"
                style="
                  background: ${slot.filled ? `linear-gradient(145deg, ${color}, ${color}CC)` : 'rgba(255,255,255,0.65)'};
                  border: ${slot.filled ? `3px solid ${color}` : '3px dashed rgba(211,84,0,0.25)'};
                  color: ${slot.filled ? '#fff' : 'rgba(211,84,0,0.15)'};
                  box-shadow: ${slot.filled ? `0 4px 15px ${color}40` : 'inset 0 2px 6px rgba(0,0,0,0.04)'};
                "
              >
                ${slot.filled ? slot.filled.char : slot.expected}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Scrambled letters -->
        ${!wordComplete ? `
          <div class="le-letters-container">
            ${scrambledLetters.map((letter, i) => {
              const color = SLOT_COLORS[letter.char.charCodeAt(0) % SLOT_COLORS.length];
              return `
                <div
                  class="le-letter ${letter.placed ? 'placed' : ''}"
                  draggable="${!letter.placed}"
                  data-letter-id="${letter.id}"
                  style="
                    background: ${letter.placed ? '#E0D5C1' : `linear-gradient(145deg, ${color}, ${color}DD)`};
                    color: ${letter.placed ? '#C4B99A' : '#fff'};
                    box-shadow: ${letter.placed ? 'inset 0 2px 4px rgba(0,0,0,0.05)' : `0 4px 12px ${color}50`};
                    animation-delay: ${i * 0.15}s;
                  "
                >
                  ${letter.char}
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Word complete -->
        ${wordComplete ? `
          <div class="le-complete-container">
            <div class="le-big-word">${currentWord()}</div>
            
            ${showDefinition ? `
              <div class="le-definition-card">
                <p class="le-definition">${word.definition}</p>
                <div class="le-example-container">
                  <span>📖</span>
                  <p class="le-example">"${word.example}"</p>
                </div>
                <button class="le-sound-btn small" onclick="window.lePlayWord()">
                  🔊 Hear the word
                </button>
              </div>

              <button class="le-next-btn" onclick="window.leNextWord()">
                ${wordIndex < config.words.length - 1 ? 'Next Word →' : 'Finish! 🎉'}
              </button>
            ` : ''}
          </div>
        ` : ''}
      ` : ''}

      ${allDone ? `
        <div class="le-all-done">
          <div class="le-trophy">🏆</div>
          <h2 class="le-congrats">Amazing Job!</h2>
          <p class="le-congrats-text">You spelled all ${config.words.length} words!</p>

          <div class="le-words-review">
            ${config.words.map((w, i) => `
              <div class="le-review-word" style="animation-delay: ${i * 0.1}s; border-color: ${SLOT_COLORS[i % SLOT_COLORS.length]}30;">
                ${w.emoji} ${w.word}
              </div>
            `).join('')}
          </div>

          <button class="le-next-btn" onclick="window.leRestart()">
            Play Again! 🔄
          </button>
        </div>
      ` : ''}
    `;

    // Attach drag listeners
    attachDragListeners();
  }

  function attachDragListeners() {
    // Letters
    container.querySelectorAll('.le-letter:not(.placed)').forEach(letterEl => {
      const letterId = letterEl.getAttribute('data-letter-id');
      const letter = scrambledLetters.find(l => l.id === letterId);
      
      letterEl.addEventListener('dragstart', () => handleDragStart(letter));
    });

    // Slots
    container.querySelectorAll('.le-slot').forEach((slotEl, i) => {
      slotEl.addEventListener('dragover', handleDragOver);
      slotEl.addEventListener('drop', () => handleDropOnSlot(i));
    });
  }

  // Global functions
  window.leNextWord = handleNextWord;
  window.leRestart = handleRestart;
  window.lePlayWord = () => speakWord(currentWord());

  // Initialize
  initWord();

  return function cleanup() {
    delete window.leNextWord;
    delete window.leRestart;
    delete window.lePlayWord;
  };
}
