/**
 * Interactive Quiz Component for BedrockELA
 * - One question per page/card
 * - Clickable multiple choice answers
 * - Immediate feedback (correct/incorrect)
 * - Auto-saves answers to localStorage + Firebase
 */

class InteractiveQuiz {
  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    this.questions = config.questions; // Array of question objects
    this.currentQuestion = 0;
    this.answers = {};
    this.lessonId = config.lessonId || 'lesson';
    this.userId = config.userId || 'student';
    
    // Load saved answers
    this.loadAnswers();
    
    // Render first question
    this.render();
  }
  
  loadAnswers() {
    const saved = localStorage.getItem(`${this.lessonId}-quiz-answers`);
    if (saved) {
      this.answers = JSON.parse(saved);
    }
  }
  
  saveAnswers() {
    localStorage.setItem(`${this.lessonId}-quiz-answers`, JSON.stringify(this.answers));
    
    // Also save to Firebase if available
    if (window.db && window.currentUser) {
      const userId = window.currentUser.uid;
      const lessonRef = window.db.collection('users').doc(userId)
        .collection('lessons').doc(this.lessonId);
      
      lessonRef.set({
        quizAnswers: this.answers,
        lastUpdated: new Date().toISOString()
      }, { merge: true }).catch(err => console.log('Quiz save error:', err));
    }
  }
  
  selectAnswer(questionIndex, selectedOption) {
    const question = this.questions[questionIndex];
    const isCorrect = selectedOption === question.correct;
    
    // Save answer
    this.answers[questionIndex] = {
      selected: selectedOption,
      correct: isCorrect,
      timestamp: new Date().toISOString()
    };
    
    this.saveAnswers();
    
    // Show feedback
    this.showFeedback(questionIndex, selectedOption, isCorrect);
  }
  
  showFeedback(questionIndex, selectedOption, isCorrect) {
    const question = this.questions[questionIndex];
    const feedbackDiv = document.getElementById('quiz-feedback');
    
    if (isCorrect) {
      feedbackDiv.innerHTML = `
        <div style="padding: 20px; background: #4caf50; color: white; border-radius: 12px; margin-top: 20px; animation: slideDown 0.3s ease;">
          <div style="font-size: 24px; margin-bottom: 10px;">✓ Correct!</div>
          <p style="margin: 0; font-size: 16px;">${question.explanation || 'Great job!'}</p>
        </div>
      `;
      
      // Mark the selected answer as correct
      document.querySelectorAll('.quiz-option').forEach(btn => {
        if (btn.dataset.option === selectedOption) {
          btn.style.background = '#4caf50';
          btn.style.color = 'white';
          btn.style.borderColor = '#4caf50';
        }
        btn.disabled = true;
      });
      
      // Show next button after 1 second
      setTimeout(() => {
        this.showNextButton();
      }, 1000);
      
    } else {
      feedbackDiv.innerHTML = `
        <div style="padding: 20px; background: #ff9800; color: white; border-radius: 12px; margin-top: 20px; animation: slideDown 0.3s ease;">
          <div style="font-size: 24px; margin-bottom: 10px;">Not quite...</div>
          <p style="margin: 0; font-size: 16px;">${question.hint || 'Try reading that part of the story again!'}</p>
        </div>
      `;
      
      // Mark selected answer as incorrect, show correct answer
      document.querySelectorAll('.quiz-option').forEach(btn => {
        if (btn.dataset.option === selectedOption) {
          btn.style.background = '#ff9800';
          btn.style.color = 'white';
          btn.style.borderColor = '#ff9800';
        }
        if (btn.dataset.option === question.correct) {
          btn.style.background = '#4caf50';
          btn.style.color = 'white';
          btn.style.borderColor = '#4caf50';
          btn.innerHTML += ' <span style="font-weight: 800;">← Correct answer</span>';
        }
        btn.disabled = true;
      });
      
      // Show next button after 2 seconds
      setTimeout(() => {
        this.showNextButton();
      }, 2000);
    }
  }
  
  showNextButton() {
    const nextBtnContainer = document.getElementById('quiz-next-container');
    if (this.currentQuestion < this.questions.length - 1) {
      nextBtnContainer.innerHTML = `
        <button 
          onclick="window.quizInstance.nextQuestion()"
          style="padding: 15px 40px; background: #B06821; color: white; border: none; border-radius: 25px; font-size: 18px; font-weight: 700; cursor: pointer; margin-top: 20px;"
        >
          Next Question →
        </button>
      `;
    } else {
      nextBtnContainer.innerHTML = `
        <div style="padding: 20px; background: linear-gradient(135deg, #305853, #B06821); color: white; border-radius: 12px; margin-top: 20px; text-align: center;">
          <div style="font-size: 24px; font-weight: 800; margin-bottom: 10px;">🎉 Quiz Complete!</div>
          <p style="margin: 0;">You've answered all the questions. Great work!</p>
        </div>
      `;
    }
  }
  
  nextQuestion() {
    this.currentQuestion++;
    this.render();
  }
  
  render() {
    if (!this.container) return;
    
    const question = this.questions[this.currentQuestion];
    const totalQuestions = this.questions.length;
    const questionNum = this.currentQuestion + 1;
    const savedAnswer = this.answers[this.currentQuestion];
    
    this.container.innerHTML = `
      <div class="lesson-page-card content-page">
        <div style="text-align: center; margin-bottom: 10px;">
          <span style="display: inline-block; padding: 8px 20px; background: linear-gradient(135deg, #305853, #B06821); color: white; border-radius: 20px; font-size: 14px; font-weight: 700;">
            Question ${questionNum} of ${totalQuestions}
          </span>
        </div>
        
        <h2 style="color: #305853; margin: 30px 0 20px 0; font-size: 24px; line-height: 1.4;">
          ${question.question}
        </h2>
        
        <div style="margin: 30px 0;">
          ${question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = savedAnswer && savedAnswer.selected === optionLetter;
            const isCorrect = optionLetter === question.correct;
            const showFeedback = !!savedAnswer;
            
            let buttonStyle = `
              width: 100%;
              padding: 20px;
              margin-bottom: 15px;
              background: white;
              border: 3px solid #305853;
              border-radius: 12px;
              font-size: 18px;
              text-align: left;
              cursor: pointer;
              transition: all 0.2s;
            `;
            
            if (showFeedback) {
              if (isSelected && isCorrect) {
                buttonStyle += 'background: #4caf50; color: white; border-color: #4caf50;';
              } else if (isSelected && !isCorrect) {
                buttonStyle += 'background: #ff9800; color: white; border-color: #ff9800;';
              } else if (isCorrect) {
                buttonStyle += 'background: #4caf50; color: white; border-color: #4caf50;';
              }
            }
            
            return `
              <button 
                class="quiz-option"
                data-option="${optionLetter}"
                onclick="window.quizInstance.selectAnswer(${this.currentQuestion}, '${optionLetter}')"
                style="${buttonStyle}"
                ${showFeedback ? 'disabled' : ''}
                onmouseover="if(!this.disabled) this.style.background='rgba(48,88,83,0.1)'"
                onmouseout="if(!this.disabled) this.style.background='white'"
              >
                <span style="font-weight: 800; color: #B06821; margin-right: 10px;">${optionLetter})</span>
                ${option}
                ${showFeedback && isCorrect ? '<span style="font-weight: 800; margin-left: 10px;">← Correct answer</span>' : ''}
              </button>
            `;
          }).join('')}
        </div>
        
        <div id="quiz-feedback"></div>
        <div id="quiz-next-container" style="text-align: center;"></div>
      </div>
      
      <style>
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
    `;
    
    // If already answered, show feedback immediately
    if (savedAnswer) {
      this.showFeedback(this.currentQuestion, savedAnswer.selected, savedAnswer.correct);
    }
  }
}

// Make it globally accessible
window.InteractiveQuiz = InteractiveQuiz;
