/**
 * QuizGame - Interactive quiz component for BedrockELA
 * Vanilla JS version with animations and feedback
 */

function createQuizGame(containerId, config, onComplete) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Default config
  const quizConfig = {
    title: config.title || "Reading Check!",
    subtitle: config.subtitle || "Let's see what you know",
    questions: config.questions || [],
    ...config
  };

  let state = {
    currentIndex: 0,
    score: 0,
    selected: null,
    isCorrect: null,
    showExplanation: false,
    attempts: 0,
    answers: []
  };

  const ENCOURAGEMENTS = [
    "Amazing! 🌟", "You got it! ⭐", "Great job! 🎉", "Super smart! 🧠",
    "Wonderful! 💪", "Nailed it! 🎯", "Brilliant! ✨", "Way to go! 🚀"
  ];

  const TRY_AGAIN = [
    "Not quite — try again!", "Almost! Give it another try!",
    "Oops! Try a different one!", "So close! Think about it!"
  ];

  const CHOICE_COLORS = [
    { bg: '#4ECDC4', hover: '#3DB8B0' },
    { bg: '#FF8A5C', hover: '#E87A4F' },
    { bg: '#6C5CE7', hover: '#5B4ED6' },
    { bg: '#FFD93D', hover: '#E8C535' }
  ];

  function render() {
    const question = quizConfig.questions[state.currentIndex];
    const progress = ((state.currentIndex + 1) / quizConfig.questions.length) * 100;
    const isComplete = state.currentIndex >= quizConfig.questions.length;

    if (isComplete) {
      renderComplete();
      return;
    }

    container.innerHTML = `
      <div class="quiz-game">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="quiz-header">
          <h2 class="quiz-title">${quizConfig.title}</h2>
          <p class="quiz-subtitle">Question ${state.currentIndex + 1} of ${quizConfig.questions.length}</p>
        </div>

        <div class="quiz-question-card">
          <p class="quiz-question">${question.question}</p>
          
          <div class="quiz-choices">
            ${question.choices.map((choice, idx) => `
              <button 
                class="quiz-choice ${state.selected === idx ? 'selected' : ''} ${state.isCorrect === true && state.selected === idx ? 'correct' : ''} ${state.isCorrect === false && state.selected === idx ? 'wrong' : ''}"
                data-index="${idx}"
                style="--choice-bg: ${CHOICE_COLORS[idx % 4].bg}; --choice-hover: ${CHOICE_COLORS[idx % 4].hover};"
                ${state.isCorrect === true ? 'disabled' : ''}
              >
                <span class="choice-label">${String.fromCharCode(65 + idx)}</span>
                <span class="choice-text">${choice}</span>
              </button>
            `).join('')}
          </div>

          ${state.isCorrect === true ? `
            <div class="quiz-feedback correct-feedback">
              <span class="feedback-icon">✅</span>
              <span class="feedback-text">${ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]}</span>
            </div>
          ` : ''}

          ${state.isCorrect === false ? `
            <div class="quiz-feedback wrong-feedback">
              <span class="feedback-icon">❌</span>
              <span class="feedback-text">${TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]}</span>
            </div>
          ` : ''}

          ${state.showExplanation && question.explain ? `
            <div class="quiz-explanation">
              <strong>💡 Explanation:</strong> ${question.explain}
            </div>
          ` : ''}

          ${state.isCorrect === true ? `
            <button class="quiz-next-btn" id="quiz-next-btn">
              ${state.currentIndex < quizConfig.questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
            </button>
          ` : ''}
        </div>
      </div>
    `;

    attachListeners();
  }

  function renderComplete() {
    const scorePercent = Math.round((state.score / quizConfig.questions.length) * 100);
    const stars = scorePercent >= 90 ? 3 : scorePercent >= 70 ? 2 : scorePercent >= 50 ? 1 : 0;

    container.innerHTML = `
      <div class="quiz-game">
        <div class="quiz-complete">
          <div class="quiz-complete-icon">🎉</div>
          <h2 class="quiz-complete-title">Quiz Complete!</h2>
          
          <div class="quiz-score-display">
            <div class="quiz-score-number">${state.score}/${quizConfig.questions.length}</div>
            <div class="quiz-score-percent">${scorePercent}% Correct</div>
          </div>

          <div class="quiz-stars">
            ${Array(3).fill(0).map((_, i) => 
              `<span class="quiz-star ${i < stars ? 'filled' : ''}">${i < stars ? '⭐' : '☆'}</span>`
            ).join('')}
          </div>

          <div class="quiz-complete-message">
            ${scorePercent >= 90 ? 'Outstanding work! You really know your stuff! 🌟' :
              scorePercent >= 70 ? 'Great job! You\'re doing well! 👏' :
              scorePercent >= 50 ? 'Good effort! Keep practicing! 💪' :
              'Nice try! Review the material and try again! 📚'}
          </div>

          <button class="quiz-continue-btn" id="quiz-continue-btn">
            Continue to Next Activity →
          </button>
        </div>
      </div>
    `;

    document.getElementById('quiz-continue-btn').addEventListener('click', () => {
      if (onComplete) onComplete();
    });
  }

  function attachListeners() {
    const choices = container.querySelectorAll('.quiz-choice');
    choices.forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.isCorrect === true) return;
        const idx = parseInt(btn.dataset.index);
        handleChoice(idx);
      });
    });

    const nextBtn = container.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', handleNext);
    }
  }

  function handleChoice(idx) {
    const question = quizConfig.questions[state.currentIndex];
    state.selected = idx;
    state.attempts++;

    if (idx === question.correct) {
      state.isCorrect = true;
      state.showExplanation = true;
      if (state.attempts === 1) {
        state.score++;
      }
      state.answers.push({ index: state.currentIndex, firstTry: state.attempts === 1 });
    } else {
      state.isCorrect = false;
      setTimeout(() => {
        state.isCorrect = null;
        state.selected = null;
        render();
      }, 1500);
    }

    render();
  }

  function handleNext() {
    state.currentIndex++;
    state.selected = null;
    state.isCorrect = null;
    state.showExplanation = false;
    state.attempts = 0;
    render();
  }

  // Initial render
  render();
}

// Export for use in lesson pages
window.createQuizGame = createQuizGame;
