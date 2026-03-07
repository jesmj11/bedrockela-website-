/**
 * Interactive Vocabulary Games for BedrockELA
 * Four game types: matching, fill-in-blank, sentence-writing, context-clues
 */

class VocabGames {
    constructor() {
        this.currentGame = null;
    }

    /**
     * Game 1: Matching Game
     * Match vocabulary words to their definitions
     */
    createMatchingGame(words, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Shuffle definitions
        const shuffledDefs = [...words].sort(() => Math.random() - 0.5);
        
        let html = `
            <div class="vocab-game matching-game">
                <p class="game-instructions">Match each word to its definition by clicking a word, then clicking its definition.</p>
                <div class="matching-container">
                    <div class="words-column">
                        ${words.map((w, i) => `
                            <button class="word-btn" data-word="${i}" data-matched="false">
                                ${w.word}
                            </button>
                        `).join('')}
                    </div>
                    <div class="definitions-column">
                        ${shuffledDefs.map((w, i) => {
                            const originalIndex = words.findIndex(word => word.word === w.word);
                            return `
                                <button class="def-btn" data-def="${originalIndex}" data-matched="false">
                                    ${w.definition}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="game-feedback"></div>
                <button class="reset-game-btn" style="display:none;">Try Again</button>
            </div>
        `;

        container.innerHTML = html;
        this.initMatchingGameEvents(containerId);
    }

    initMatchingGameEvents(containerId) {
        const container = document.getElementById(containerId);
        let selectedWord = null;
        let selectedDef = null;
        let matches = 0;

        const wordBtns = container.querySelectorAll('.word-btn');
        const defBtns = container.querySelectorAll('.def-btn');
        const feedback = container.querySelector('.game-feedback');
        const resetBtn = container.querySelector('.reset-game-btn');

        const checkMatch = () => {
            if (selectedWord === null || selectedDef === null) return;

            const wordBtn = container.querySelector(`.word-btn[data-word="${selectedWord}"]`);
            const defBtn = container.querySelector(`.def-btn[data-def="${selectedDef}"]`);

            if (selectedWord === selectedDef) {
                // Correct match!
                wordBtn.classList.add('matched');
                defBtn.classList.add('matched');
                wordBtn.setAttribute('data-matched', 'true');
                defBtn.setAttribute('data-matched', 'true');
                matches++;

                if (matches === wordBtns.length) {
                    feedback.innerHTML = '<p class="success">🎉 Perfect! You matched all the words!</p>';
                    resetBtn.style.display = 'block';
                } else {
                    feedback.innerHTML = '<p class="success">✅ Correct!</p>';
                    setTimeout(() => feedback.innerHTML = '', 1500);
                }
            } else {
                // Incorrect
                wordBtn.classList.add('incorrect');
                defBtn.classList.add('incorrect');
                feedback.innerHTML = '<p class="error">❌ Not quite. Try again!</p>';
                setTimeout(() => {
                    wordBtn.classList.remove('incorrect', 'selected');
                    defBtn.classList.remove('incorrect', 'selected');
                    feedback.innerHTML = '';
                }, 1500);
            }

            selectedWord = null;
            selectedDef = null;
        };

        wordBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.getAttribute('data-matched') === 'true') return;
                
                container.querySelectorAll('.word-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedWord = parseInt(btn.getAttribute('data-word'));
                checkMatch();
            });
        });

        defBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.getAttribute('data-matched') === 'true') return;
                
                container.querySelectorAll('.def-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedDef = parseInt(btn.getAttribute('data-def'));
                checkMatch();
            });
        });

        resetBtn.addEventListener('click', () => {
            matches = 0;
            selectedWord = null;
            selectedDef = null;
            wordBtns.forEach(btn => {
                btn.classList.remove('matched', 'selected', 'incorrect');
                btn.setAttribute('data-matched', 'false');
            });
            defBtns.forEach(btn => {
                btn.classList.remove('matched', 'selected', 'incorrect');
                btn.setAttribute('data-matched', 'false');
            });
            feedback.innerHTML = '';
            resetBtn.style.display = 'none';
        });
    }

    /**
     * Game 2: Fill in the Blank
     * Choose the correct word to complete each sentence
     */
    createFillBlankGame(words, sentences, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div class="vocab-game fill-blank-game">
                <p class="game-instructions">Choose the correct vocabulary word to complete each sentence.</p>
                ${sentences.map((sent, i) => `
                    <div class="fill-blank-question" data-question="${i}">
                        <p class="sentence">${sent.text.replace('___', '<span class="blank">___</span>')}</p>
                        <div class="word-choices">
                            ${words.map((w, wi) => `
                                <button class="choice-btn" data-word="${w.word}" data-correct="${w.word === sent.answer}">
                                    ${w.word}
                                </button>
                            `).join('')}
                        </div>
                        <div class="question-feedback"></div>
                    </div>
                `).join('')}
                <div class="game-score"></div>
            </div>
        `;

        container.innerHTML = html;
        this.initFillBlankEvents(containerId, sentences.length);
    }

    initFillBlankEvents(containerId, numQuestions) {
        const container = document.getElementById(containerId);
        const choiceBtns = container.querySelectorAll('.choice-btn');
        let score = 0;
        let answered = 0;

        choiceBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.closest('.fill-blank-question');
                const questionNum = question.getAttribute('data-question');
                const feedback = question.querySelector('.question-feedback');
                const choices = question.querySelectorAll('.choice-btn');

                // Disable all choices for this question
                choices.forEach(c => c.disabled = true);

                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                if (isCorrect) {
                    this.classList.add('correct');
                    feedback.innerHTML = '<p class="success">✅ Correct!</p>';
                    score++;
                } else {
                    this.classList.add('incorrect');
                    const correctBtn = question.querySelector('.choice-btn[data-correct="true"]');
                    correctBtn.classList.add('correct');
                    feedback.innerHTML = `<p class="error">❌ The correct answer is "${correctBtn.getAttribute('data-word')}"</p>`;
                }

                answered++;
                if (answered === numQuestions) {
                    const scoreDiv = container.querySelector('.game-score');
                    const percentage = Math.round((score / numQuestions) * 100);
                    scoreDiv.innerHTML = `<p class="final-score">Score: ${score}/${numQuestions} (${percentage}%)</p>`;
                }
            });
        });
    }

    /**
     * Game 3: Sentence Writing
     * Write original sentences using the vocabulary words
     */
    createSentenceWritingGame(words, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div class="vocab-game sentence-writing-game">
                <p class="game-instructions">Write an original sentence using each vocabulary word correctly.</p>
                ${words.map((w, i) => `
                    <div class="sentence-prompt">
                        <div class="word-display">
                            <strong>${w.word}</strong>
                            <span class="definition-hint">(${w.definition})</span>
                        </div>
                        <textarea 
                            id="sentence-${i}" 
                            rows="2" 
                            placeholder="Write your sentence using '${w.word}'..."
                            data-word="${w.word}"></textarea>
                        <button class="check-sentence-btn" data-index="${i}">Check Sentence</button>
                        <div class="sentence-feedback"></div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
        this.initSentenceWritingEvents(containerId);
    }

    initSentenceWritingEvents(containerId) {
        const container = document.getElementById(containerId);
        const checkBtns = container.querySelectorAll('.check-sentence-btn');

        checkBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const textarea = container.querySelector(`#sentence-${index}`);
                const word = textarea.getAttribute('data-word');
                const sentence = textarea.value.trim();
                const feedback = this.nextElementSibling;

                if (!sentence) {
                    feedback.innerHTML = '<p class="error">Please write a sentence first.</p>';
                    return;
                }

                // Check if word is used
                const wordRegex = new RegExp(`\\b${word}\\b`, 'i');
                if (!wordRegex.test(sentence)) {
                    feedback.innerHTML = `<p class="error">Make sure to use the word "${word}" in your sentence.</p>`;
                    return;
                }

                // Basic checks
                const hasCapital = /^[A-Z]/.test(sentence);
                const hasEnding = /[.!?]$/.test(sentence);
                const hasLength = sentence.split(/\s+/).length >= 5;

                if (!hasCapital || !hasEnding || !hasLength) {
                    let tips = [];
                    if (!hasCapital) tips.push('Start with a capital letter');
                    if (!hasEnding) tips.push('End with punctuation (. ! ?)');
                    if (!hasLength) tips.push('Write at least 5 words');
                    feedback.innerHTML = `<p class="warning">⚠️ ${tips.join(', ')}</p>`;
                    return;
                }

                feedback.innerHTML = '<p class="success">✅ Great sentence! Make sure it shows you understand the word\'s meaning.</p>';
                this.disabled = true;
                this.textContent = 'Completed ✓';
            });
        });
    }

    /**
     * Game 4: Context Clues
     * Read passages and identify which word fits based on context
     */
    createContextCluesGame(words, passages, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div class="vocab-game context-clues-game">
                <p class="game-instructions">Read each passage and choose the vocabulary word that best fits the context.</p>
                ${passages.map((passage, i) => `
                    <div class="context-question" data-question="${i}">
                        <p class="context-passage">${passage.text}</p>
                        <p class="context-prompt"><strong>Which word best fits this context?</strong></p>
                        <div class="word-choices">
                            ${words.map(w => `
                                <button class="choice-btn" data-word="${w.word}" data-correct="${w.word === passage.answer}">
                                    ${w.word}
                                </button>
                            `).join('')}
                        </div>
                        <div class="question-feedback"></div>
                    </div>
                `).join('')}
                <div class="game-score"></div>
            </div>
        `;

        container.innerHTML = html;
        this.initContextCluesEvents(containerId, passages.length);
    }

    initContextCluesEvents(containerId, numQuestions) {
        const container = document.getElementById(containerId);
        const choiceBtns = container.querySelectorAll('.choice-btn');
        let score = 0;
        let answered = 0;

        choiceBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.closest('.context-question');
                const feedback = question.querySelector('.question-feedback');
                const choices = question.querySelectorAll('.choice-btn');

                // Disable all choices
                choices.forEach(c => c.disabled = true);

                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                if (isCorrect) {
                    this.classList.add('correct');
                    feedback.innerHTML = '<p class="success">✅ Correct! You understood the context.</p>';
                    score++;
                } else {
                    this.classList.add('incorrect');
                    const correctBtn = question.querySelector('.choice-btn[data-correct="true"]');
                    correctBtn.classList.add('correct');
                    feedback.innerHTML = `<p class="error">❌ The word that fits best is "${correctBtn.getAttribute('data-word')}"</p>`;
                }

                answered++;
                if (answered === numQuestions) {
                    const scoreDiv = container.querySelector('.game-score');
                    const percentage = Math.round((score / numQuestions) * 100);
                    scoreDiv.innerHTML = `<p class="final-score">Score: ${score}/${numQuestions} (${percentage}%)</p>`;
                }
            });
        });
    }
}

// Initialize games when DOM is ready
if (typeof window !== 'undefined') {
    window.VocabGames = VocabGames;
}
