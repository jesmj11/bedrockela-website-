/**
 * Quiz Game - Vanilla JavaScript
 * Multiple choice quiz with explanations and scoring
 */

const CHOICE_COLORS = [
  { bg: "#4ECDC4", hover: "#3DB8B0", light: "#E6FAF8" },
  { bg: "#FF8A5C", hover: "#E87A4F", light: "#FFF0EA" },
  { bg: "#6C5CE7", hover: "#5B4ED6", light: "#EEECFB" },
  { bg: "#FFD93D", hover: "#E8C535", light: "#FFFBE6" },
];

const CHOICE_LABELS = ["A", "B", "C", "D"];

const ENCOURAGEMENTS = [
  "Amazing! 🌟",
  "You got it! ⭐",
  "Great job! 🎉",
  "Super smart! 🧠",
  "Wonderful! 💪",
  "Nailed it! 🎯",
  "Brilliant! ✨",
  "Way to go! 🚀",
];

const TRY_AGAIN_MSGS = [
  "Not quite — look again!",
  "Almost! Give it another try!",
  "Oops! Try a different one!",
  "So close! Think about it!",
];

function createQuizGame(containerId, config, onComplete) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  const completionCallback = onComplete || function() {};

  let questionIndex = 0;
  let selected = null;
  let isCorrect = null;
  let showExplain = false;
  let score = 0;
  let answers = [];
  let allDone = false;
  let encouragement = "";
  let tryAgainMsg = "";
  let attempts = 0;
  let shakeWrong = null;

  const totalQuestions = config.questions.length;

  function handleChoice(choiceIndex) {
    if (isCorrect === true) return; // Already answered correctly

    const currentQ = config.questions[questionIndex];
    selected = choiceIndex;
    attempts++;

    if (choiceIndex === currentQ.correct) {
      // Correct answer
      isCorrect = true;
      encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
      tryAgainMsg = "";

      // Only count as correct if first attempt
      if (attempts === 1) {
        score++;
        answers.push({ index: questionIndex, firstTry: true });
      } else {
        answers.push({ index: questionIndex, firstTry: false });
      }

      setTimeout(() => {
        showExplain = true;
        render();
      }, 400);
      render();
    } else {
      // Wrong answer
      isCorrect = false;
      shakeWrong = choiceIndex;
      tryAgainMsg = TRY_AGAIN_MSGS[Math.floor(Math.random() * TRY_AGAIN_MSGS.length)];
      encouragement = "";

      render();

      setTimeout(() => {
        shakeWrong = null;
        isCorrect = null;
        selected = null;
        render();
      }, 1200);
    }
  }

  function handleNext() {
    const next = questionIndex + 1;
    if (next >= totalQuestions) {
      allDone = true;
      // Call completion callback
      completionCallback();
      render();
    } else {
      questionIndex = next;
      selected = null;
      isCorrect = null;
      showExplain = false;
      encouragement = "";
      tryAgainMsg = "";
      attempts = 0;
      render();
    }
  }

  function handleRestart() {
    questionIndex = 0;
    selected = null;
    isCorrect = null;
    showExplain = false;
    score = 0;
    answers = [];
    allDone = false;
    encouragement = "";
    tryAgainMsg = "";
    attempts = 0;
    render();
  }

  function render() {
    const progress = (questionIndex / totalQuestions) * 100;
    const currentQ = config.questions[questionIndex];
    const scorePercent = Math.round((score / totalQuestions) * 100);
    const starCount = scorePercent >= 90 ? 3 : scorePercent >= 60 ? 2 : scorePercent >= 30 ? 1 : 0;

    container.innerHTML = `
      ${!allDone ? `
        <!-- Progress bar -->
        <div class="quiz-progress-container">
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progress}%;"></div>
          </div>
          <span class="quiz-progress-text">${questionIndex + 1}/${totalQuestions}</span>
        </div>

        <!-- Question card -->
        <div class="quiz-question-card">
          <p class="quiz-question">${currentQ.question}</p>
        </div>

        <!-- Choices -->
        <div class="quiz-choices">
          ${currentQ.choices.map((choice, i) => {
            const color = CHOICE_COLORS[i % CHOICE_COLORS.length];
            const isSelected = selected === i;
            const isCorrectChoice = i === currentQ.correct;
            const isWrongSelected = isSelected && isCorrect === false;
            const isAnswered = isCorrect === true;
            const isShaking = shakeWrong === i;

            let bgColor = "rgba(255,255,255,0.06)";
            let borderColor = "rgba(255,255,255,0.08)";
            let labelBg = color.bg;

            if (isAnswered && isCorrectChoice) {
              bgColor = "rgba(46, 204, 113, 0.15)";
              borderColor = "#2ECC71";
              labelBg = "#2ECC71";
            } else if (isWrongSelected) {
              bgColor = "rgba(231, 76, 60, 0.12)";
              borderColor = "#E74C3C";
              labelBg = "#E74C3C";
            }

            return `
              <button 
                class="quiz-choice ${isAnswered ? 'disabled' : ''} ${isShaking ? 'shaking' : ''}"
                onclick="window.quizHandleChoice(${i})"
                ${isAnswered ? 'disabled' : ''}
                style="
                  background: ${bgColor};
                  border: 2px solid ${borderColor};
                  animation-delay: ${i * 0.08}s;
                "
              >
                <span class="quiz-choice-label" style="background: ${labelBg};">
                  ${isAnswered && isCorrectChoice ? '✓' : isWrongSelected ? '✗' : CHOICE_LABELS[i]}
                </span>
                <span class="quiz-choice-text">${choice}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${encouragement ? `
          <div class="quiz-encouragement">
            ${encouragement}
          </div>
        ` : ''}

        ${tryAgainMsg ? `
          <div class="quiz-try-again">
            ${tryAgainMsg}
          </div>
        ` : ''}

        ${showExplain && currentQ.explain ? `
          <div class="quiz-explain">
            💡 ${currentQ.explain}
          </div>
        ` : ''}

        ${isCorrect === true ? `
          <div class="quiz-next-container">
            <button class="quiz-next-btn" onclick="window.quizHandleNext()">
              ${questionIndex < totalQuestions - 1 ? 'Next Question →' : 'See Results! 🎉'}
            </button>
          </div>
        ` : ''}
      ` : `
        <!-- Results screen -->
        <div class="quiz-results">
          <div class="quiz-trophy">🏆</div>
          <h2 class="quiz-complete-title">Quiz Complete!</h2>

          <div class="quiz-score-card">
            <p class="quiz-score-big">${score}/${totalQuestions}</p>
            <p class="quiz-score-label">correct on the first try!</p>

            <div class="quiz-stars">
              ${[0, 1, 2].map(i => `
                <span class="quiz-star ${i < starCount ? 'active' : ''}" style="animation-delay: ${0.2 + i * 0.15}s;">⭐</span>
              `).join('')}
            </div>
          </div>

          <div class="quiz-review">
            <p class="quiz-review-title">Review</p>
            ${config.questions.map((q, i) => {
              const answer = answers[i];
              const gotIt = answer?.firstTry;
              return `
                <div class="quiz-review-item" style="animation-delay: ${i * 0.06}s;">
                  <span class="quiz-review-icon ${gotIt ? 'correct' : 'retry'}">
                    ${gotIt ? '✅' : '🔄'}
                  </span>
                  <div class="quiz-review-content">
                    <p class="quiz-review-question">${q.question}</p>
                    <p class="quiz-review-answer ${gotIt ? 'correct' : 'retry'}">
                      ${gotIt ? `✓ ${q.choices[q.correct]}` : `Answer: ${q.choices[q.correct]}`}
                    </p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <button class="quiz-restart-btn" onclick="window.quizHandleRestart()">
            Play Again! 🔄
          </button>
        </div>
      `}
    `;
  }

  // Attach global functions
  window.quizHandleChoice = handleChoice;
  window.quizHandleNext = handleNext;
  window.quizHandleRestart = handleRestart;

  // Initial render
  render();

  return function cleanup() {
    delete window.quizHandleChoice;
    delete window.quizHandleNext;
    delete window.quizHandleRestart;
  };
}
