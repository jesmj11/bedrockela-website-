/**
 * BedrockELA Vocabulary Practice Games
 * Progressive difficulty games for daily vocabulary practice
 */

// Game 1: MATCHING GAME (Day 1 - Simple matching)
export function createMatchingGame(words, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="vocab-game matching-game">
            <h3>🎯 Vocabulary Practice: Matching</h3>
            <p class="game-instructions">Match each word to its definition!</p>
            <div class="matching-grid" id="matchingGrid"></div>
            <div class="game-feedback" id="matchingFeedback"></div>
            <button class="btn-check-answers" id="checkMatching">Check Answers</button>
        </div>
    `;
    
    const grid = document.getElementById('matchingGrid');
    let selectedWord = null;
    let selectedDef = null;
    let matches = {};
    
    // Shuffle definitions
    const shuffledDefs = [...words].sort(() => Math.random() - 0.5);
    
    // Create word column
    const wordColumn = document.createElement('div');
    wordColumn.className = 'matching-column';
    words.forEach((item, idx) => {
        const wordBtn = document.createElement('button');
        wordBtn.className = 'matching-item word-item';
        wordBtn.textContent = item.word;
        wordBtn.dataset.wordIdx = idx;
        wordBtn.addEventListener('click', () => selectWord(wordBtn, idx));
        wordColumn.appendChild(wordBtn);
    });
    
    // Create definition column
    const defColumn = document.createElement('div');
    defColumn.className = 'matching-column';
    shuffledDefs.forEach((item, idx) => {
        const defBtn = document.createElement('button');
        defBtn.className = 'matching-item def-item';
        defBtn.textContent = item.definition;
        defBtn.dataset.defIdx = idx;
        defBtn.dataset.correctWord = item.word;
        defBtn.addEventListener('click', () => selectDef(defBtn, idx));
        defColumn.appendChild(defBtn);
    });
    
    grid.appendChild(wordColumn);
    grid.appendChild(defColumn);
    
    function selectWord(btn, idx) {
        document.querySelectorAll('.word-item').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedWord = { btn, idx, word: words[idx].word };
        tryMatch();
    }
    
    function selectDef(btn, idx) {
        document.querySelectorAll('.def-item').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedDef = { btn, idx };
        tryMatch();
    }
    
    function tryMatch() {
        if (selectedWord && selectedDef) {
            matches[selectedWord.idx] = selectedDef.idx;
            selectedWord.btn.classList.add('matched');
            selectedDef.btn.classList.add('matched');
            selectedWord.btn.classList.remove('selected');
            selectedDef.btn.classList.remove('selected');
            selectedWord = null;
            selectedDef = null;
        }
    }
    
    document.getElementById('checkMatching').addEventListener('click', () => {
        let correct = 0;
        words.forEach((item, idx) => {
            const matchedDefIdx = matches[idx];
            if (matchedDefIdx !== undefined) {
                const defBtn = defColumn.children[matchedDefIdx];
                if (defBtn.dataset.correctWord === item.word) {
                    correct++;
                    wordColumn.children[idx].classList.add('correct');
                    defBtn.classList.add('correct');
                } else {
                    wordColumn.children[idx].classList.add('incorrect');
                    defBtn.classList.add('incorrect');
                }
            }
        });
        
        const feedback = document.getElementById('matchingFeedback');
        feedback.innerHTML = `<strong>Score: ${correct}/${words.length}</strong>`;
        if (correct === words.length) {
            feedback.innerHTML += ' 🎉 Perfect!';
        }
    });
}

// Game 2: FILL IN THE BLANK (Day 2 - Contextual usage)
export function createFillInTheBlank(words, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="vocab-game fill-blank-game">
            <h3>✏️ Vocabulary Practice: Fill in the Blank</h3>
            <p class="game-instructions">Complete each sentence with the correct vocabulary word!</p>
            <div class="word-bank" id="wordBank"></div>
            <div class="sentences-list" id="sentencesList"></div>
            <button class="btn-check-answers" id="checkFillBlanks">Check Answers</button>
            <div class="game-feedback" id="fillBlankFeedback"></div>
        </div>
    `;
    
    // Word bank
    const wordBank = document.getElementById('wordBank');
    wordBank.innerHTML = '<strong>Word Bank:</strong> ' + words.map(w => w.word).join(', ');
    
    // Generate sentences
    const sentencesList = document.getElementById('sentencesList');
    words.forEach((item, idx) => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'fill-blank-item';
        sentenceDiv.innerHTML = `
            <p>${idx + 1}. ${item.sentence || `The ${item.word} was important.`}</p>
            <input type="text" class="fill-blank-input" data-answer="${item.word.toLowerCase()}" placeholder="Type your answer...">
        `;
        sentencesList.appendChild(sentenceDiv);
    });
    
    document.getElementById('checkFillBlanks').addEventListener('click', () => {
        const inputs = document.querySelectorAll('.fill-blank-input');
        let correct = 0;
        
        inputs.forEach(input => {
            const answer = input.value.trim().toLowerCase();
            const correctAnswer = input.dataset.answer;
            
            if (answer === correctAnswer) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
                correct++;
            } else {
                input.classList.add('incorrect');
                input.classList.remove('correct');
            }
        });
        
        const feedback = document.getElementById('fillBlankFeedback');
        feedback.innerHTML = `<strong>Score: ${correct}/${words.length}</strong>`;
        if (correct === words.length) {
            feedback.innerHTML += ' 🎉 Excellent!';
        }
    });
}

// Game 3: WORD SCRAMBLE (Day 3 - Recognition practice)
export function createWordScramble(words, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    function scramble(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }
    
    container.innerHTML = `
        <div class="vocab-game scramble-game">
            <h3>🔤 Vocabulary Practice: Word Scramble</h3>
            <p class="game-instructions">Unscramble the vocabulary words!</p>
            <div class="scramble-list" id="scrambleList"></div>
            <button class="btn-check-answers" id="checkScramble">Check Answers</button>
            <div class="game-feedback" id="scrambleFeedback"></div>
        </div>
    `;
    
    const scrambleList = document.getElementById('scrambleList');
    words.forEach((item, idx) => {
        const scrambled = scramble(item.word);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'scramble-item';
        itemDiv.innerHTML = `
            <div class="scramble-word">${idx + 1}. <strong>${scrambled}</strong></div>
            <input type="text" class="scramble-input" data-answer="${item.word.toLowerCase()}" placeholder="Unscramble...">
            <div class="scramble-hint">💡 ${item.definition}</div>
        `;
        scrambleList.appendChild(itemDiv);
    });
    
    document.getElementById('checkScramble').addEventListener('click', () => {
        const inputs = document.querySelectorAll('.scramble-input');
        let correct = 0;
        
        inputs.forEach(input => {
            const answer = input.value.trim().toLowerCase();
            const correctAnswer = input.dataset.answer;
            
            if (answer === correctAnswer) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
                correct++;
            } else {
                input.classList.add('incorrect');
                input.classList.remove('correct');
            }
        });
        
        const feedback = document.getElementById('scrambleFeedback');
        feedback.innerHTML = `<strong>Score: ${correct}/${words.length}</strong>`;
        if (correct === words.length) {
            feedback.innerHTML += ' 🎉 You did it!';
        }
    });
}

// Game 4: MATCHING CHALLENGE (Day 4 - Full review with timer)
export function createMatchingChallenge(words, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let startTime = null;
    let matches = 0;
    let attempts = 0;
    
    container.innerHTML = `
        <div class="vocab-game matching-challenge">
            <h3>🏆 Vocabulary Challenge: Speed Matching</h3>
            <p class="game-instructions">Match ALL ${words.length} words as fast as you can!</p>
            <div class="challenge-stats">
                <span id="matchesCount">Matches: 0/${words.length}</span>
                <span id="timerDisplay">Time: 0s</span>
            </div>
            <div class="challenge-grid" id="challengeGrid"></div>
            <div class="game-feedback" id="challengeFeedback"></div>
        </div>
    `;
    
    const grid = document.getElementById('challengeGrid');
    const allCards = [];
    
    // Create cards (word + definition pairs)
    words.forEach(item => {
        allCards.push({ text: item.word, type: 'word', pair: item.word });
        allCards.push({ text: item.definition, type: 'def', pair: item.word });
    });
    
    // Shuffle
    allCards.sort(() => Math.random() - 0.5);
    
    let firstCard = null;
    let secondCard = null;
    let canClick = true;
    
    allCards.forEach((card, idx) => {
        const cardEl = document.createElement('button');
        cardEl.className = 'challenge-card';
        cardEl.textContent = card.text;
        cardEl.dataset.pair = card.pair;
        cardEl.dataset.idx = idx;
        
        cardEl.addEventListener('click', () => {
            if (!canClick || cardEl.classList.contains('matched')) return;
            
            if (!startTime) {
                startTime = Date.now();
                startTimer();
            }
            
            cardEl.classList.add('selected');
            
            if (!firstCard) {
                firstCard = cardEl;
            } else if (!secondCard && cardEl !== firstCard) {
                secondCard = cardEl;
                canClick = false;
                attempts++;
                
                setTimeout(() => {
                    if (firstCard.dataset.pair === secondCard.dataset.pair) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        firstCard.classList.remove('selected');
                        secondCard.classList.remove('selected');
                        matches++;
                        document.getElementById('matchesCount').textContent = `Matches: ${matches}/${words.length}`;
                        
                        if (matches === words.length) {
                            endGame();
                        }
                    } else {
                        firstCard.classList.remove('selected');
                        secondCard.classList.remove('selected');
                    }
                    
                    firstCard = null;
                    secondCard = null;
                    canClick = true;
                }, 600);
            }
        });
        
        grid.appendChild(cardEl);
    });
    
    let timerInterval;
    function startTimer() {
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById('timerDisplay').textContent = `Time: ${elapsed}s`;
        }, 100);
    }
    
    function endGame() {
        clearInterval(timerInterval);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const feedback = document.getElementById('challengeFeedback');
        feedback.innerHTML = `
            <strong>🎉 Complete!</strong><br>
            Time: ${elapsed} seconds | Attempts: ${attempts}<br>
            ${elapsed < 60 ? 'Amazing speed! 🚀' : 'Great job! 👏'}
        `;
    }
}

// CSS for all games (call this once to inject styles)
export function injectVocabGameStyles() {
    if (document.getElementById('vocab-game-styles')) return; // Already injected
    
    const style = document.createElement('style');
    style.id = 'vocab-game-styles';
    style.textContent = `
        .vocab-game {
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .vocab-game h3 {
            color: #305853;
            margin-bottom: 10px;
        }
        
        .game-instructions {
            color: #666;
            margin-bottom: 20px;
        }
        
        .btn-check-answers {
            background: linear-gradient(135deg, #305853 0%, #1B2A30 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
        }
        
        .btn-check-answers:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .game-feedback {
            margin-top: 20px;
            padding: 15px;
            background: #f0f8ff;
            border-radius: 8px;
            font-size: 1.1rem;
            text-align: center;
        }
        
        /* Matching Game */
        .matching-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .matching-column {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .matching-item {
            padding: 15px;
            background: #f8f9fa;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: left;
        }
        
        .matching-item:hover {
            background: #e9ecef;
        }
        
        .matching-item.selected {
            border-color: #305853;
            background: #d4f1e8;
        }
        
        .matching-item.matched {
            opacity: 0.5;
            cursor: default;
        }
        
        .matching-item.correct {
            background: #d4edda;
            border-color: #28a745;
        }
        
        .matching-item.incorrect {
            background: #f8d7da;
            border-color: #dc3545;
        }
        
        /* Fill in the Blank */
        .word-bank {
            background: #fff9e6;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            color: #856404;
        }
        
        .fill-blank-item {
            margin-bottom: 20px;
        }
        
        .fill-blank-input {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            margin-top: 8px;
        }
        
        .fill-blank-input.correct {
            border-color: #28a745;
            background: #d4edda;
        }
        
        .fill-blank-input.incorrect {
            border-color: #dc3545;
            background: #f8d7da;
        }
        
        /* Word Scramble */
        .scramble-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .scramble-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
        }
        
        .scramble-word {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
        
        .scramble-input {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            margin: 10px 0;
        }
        
        .scramble-hint {
            color: #666;
            font-size: 0.9rem;
            font-style: italic;
        }
        
        .scramble-input.correct {
            border-color: #28a745;
            background: #d4edda;
        }
        
        .scramble-input.incorrect {
            border-color: #dc3545;
            background: #f8d7da;
        }
        
        /* Matching Challenge */
        .challenge-stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .challenge-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 10px;
            margin: 20px 0;
        }
        
        .challenge-card {
            padding: 20px;
            background: #f8f9fa;
            border: 3px solid #e0e0e0;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            min-height: 100px;
            font-size: 0.95rem;
        }
        
        .challenge-card:hover {
            background: #e9ecef;
            transform: scale(1.05);
        }
        
        .challenge-card.selected {
            border-color: #305853;
            background: #d4f1e8;
            transform: scale(1.05);
        }
        
        .challenge-card.matched {
            background: #d4edda;
            border-color: #28a745;
            cursor: default;
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .matching-grid {
                grid-template-columns: 1fr;
            }
            
            .challenge-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;
    
    document.head.appendChild(style);
}
