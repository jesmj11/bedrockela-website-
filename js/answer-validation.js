/**
 * Answer Validation & AI Feedback System
 * Prevents navigation until answers are submitted
 * Provides AI feedback at end of lesson
 */

class AnswerValidation {
  constructor(lessonId) {
    this.lessonId = lessonId;
    this.storageKey = `answers_${lessonId}`;
    this.submittedAnswers = this.loadSubmittedAnswers();
    this.currentPageAnswers = [];
  }

  // Load submitted answers from localStorage
  loadSubmittedAnswers() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  // Save submitted answers
  saveSubmittedAnswers() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.submittedAnswers));
  }

  // Check if current page has all required answers submitted
  canNavigateNext() {
    const requiredAnswers = this.currentPageAnswers;
    
    if (requiredAnswers.length === 0) {
      return true; // No required answers on this page
    }

    // Check if all required answers are submitted
    return requiredAnswers.every(answerId => {
      return this.submittedAnswers[answerId] !== undefined;
    });
  }

  // Register answer fields on current page
  registerPageAnswers(answerIds) {
    this.currentPageAnswers = answerIds;
    this.updateNavigationState();
  }

  // Submit an answer
  submitAnswer(answerId, questionText, answerText, minWords) {
    // Validate word count
    const wordCount = answerText.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    if (wordCount < minWords) {
      return {
        success: false,
        message: `Please write at least ${minWords} words. You have ${wordCount}.`
      };
    }

    // Save answer
    this.submittedAnswers[answerId] = {
      question: questionText,
      answer: answerText,
      wordCount: wordCount,
      submittedAt: new Date().toISOString()
    };

    this.saveSubmittedAnswers();
    this.updateNavigationState();

    return {
      success: true,
      message: 'Answer submitted!'
    };
  }

  // Update navigation button state
  updateNavigationState() {
    const nextButton = document.querySelector('.lesson-nav-bottom .nav-arrow:last-child');
    if (!nextButton) return;

    const canNavigate = this.canNavigateNext();
    
    if (canNavigate) {
      nextButton.classList.remove('disabled');
      nextButton.disabled = false;
      nextButton.style.opacity = '1';
    } else {
      nextButton.classList.add('disabled');
      nextButton.disabled = true;
      nextButton.style.opacity = '0.5';
      
      // Add tooltip
      nextButton.title = 'Please submit all answers before continuing';
    }
  }

  // Get all submitted answers for AI review
  getAllSubmittedAnswers() {
    return this.submittedAnswers;
  }

  // Clear answers (after lesson completion)
  clearAnswers() {
    localStorage.removeItem(this.storageKey);
    this.submittedAnswers = {};
  }

  // Generate AI feedback for all answers
  async generateAIFeedback() {
    const answers = this.getAllSubmittedAnswers();
    const answerList = Object.values(answers);

    if (answerList.length === 0) {
      return null;
    }

    try {
      // Use Firebase Cloud Function for AI feedback
      const FIREBASE_FUNCTION_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://127.0.0.1:5001/bedrockela-96dbd/us-central1/aiFeedback' // Local emulator
        : 'https://us-central1-bedrockela-96dbd.cloudfunctions.net/aiFeedback'; // Production
      
      const response = await fetch(FIREBASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: answerList
        })
      });

      if (!response.ok) {
        throw new Error('AI feedback generation failed');
      }

      const data = await response.json();
      
      if (data.success && data.feedback) {
        return { feedback: data.feedback };
      } else {
        throw new Error('Invalid feedback response');
      }

    } catch (error) {
      console.error('Error generating AI feedback:', error);
      return null;
    }
  }

  // Show feedback modal at end of lesson
  async showFeedbackModal() {
    const feedback = await this.generateAIFeedback();
    
    if (!feedback) {
      return; // No feedback to show
    }

    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    modal.innerHTML = `
      <div class="feedback-modal-overlay"></div>
      <div class="feedback-modal-content">
        <h2>Your Work Has Been Reviewed!</h2>
        <p style="color: #666; margin-bottom: 30px;">Here's feedback on your answers:</p>
        
        <div class="feedback-list">
          ${feedback.feedback.map(f => `
            <div class="feedback-item">
              <h3>Question ${f.questionNum}</h3>
              <div class="feedback-section positive">
                <strong>What you did well:</strong>
                <p>${f.positive}</p>
              </div>
              ${f.suggestion ? `
                <div class="feedback-section suggestion">
                  <strong>To improve:</strong>
                  <p>${f.suggestion}</p>
                </div>
              ` : ''}
              <div class="feedback-section encouragement">
                <p><em>${f.encouragement}</em></p>
              </div>
            </div>
          `).join('')}
        </div>
        
        <button class="modal-btn modal-btn-primary" onclick="window.answerValidation.closeFeedbackModal()">
          Continue to Lesson Complete
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    // Add CSS for feedback modal
    this.addFeedbackModalStyles();
  }

  closeFeedbackModal() {
    const modal = document.querySelector('.feedback-modal');
    if (modal) {
      modal.remove();
    }
    
    // Now show the completion modal
    if (window.lessonCompletion) {
      window.lessonCompletion.showCompletionModal();
    }
  }

  addFeedbackModalStyles() {
    if (document.getElementById('feedback-modal-styles')) return;

    const style = document.createElement('style');
    style.id = 'feedback-modal-styles';
    style.textContent = `
      .feedback-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .feedback-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .feedback-modal-content {
        position: relative;
        background: white;
        border-radius: 25px;
        padding: 40px;
        max-width: 700px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(48, 88, 83, 0.3);
        animation: modalSlideIn 0.3s ease;
      }

      .feedback-modal-content h2 {
        color: #305853;
        font-size: 28px;
        margin-bottom: 10px;
        text-align: center;
      }

      .feedback-list {
        margin: 20px 0;
      }

      .feedback-item {
        background: rgba(48, 88, 83, 0.05);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
        border: 2px solid rgba(48, 88, 83, 0.1);
      }

      .feedback-item h3 {
        color: #B06821;
        font-size: 18px;
        margin-bottom: 15px;
      }

      .feedback-section {
        margin-bottom: 15px;
      }

      .feedback-section strong {
        color: #305853;
        display: block;
        margin-bottom: 5px;
      }

      .feedback-section p {
        color: #511B18;
        line-height: 1.6;
        margin: 0;
      }

      .feedback-section.positive {
        padding-left: 15px;
        border-left: 4px solid #4CAF50;
      }

      .feedback-section.suggestion {
        padding-left: 15px;
        border-left: 4px solid #FF9800;
      }

      .feedback-section.encouragement {
        text-align: center;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(48, 88, 83, 0.2);
      }

      .feedback-section.encouragement p {
        color: #305853;
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);
  }
}

// Helper function to create submit button for questions
window.createSubmitButton = function(questionId, questionText, minWords = 30) {
  return `
    <button 
      id="submit-${questionId}"
      class="submit-answer-btn"
      onclick="handleSubmitAnswer('${questionId}', '${questionText.replace(/'/g, "\\'")}', ${minWords})"
      style="
        background: linear-gradient(135deg, #B06821 0%, #8B5319 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 10px;
        transition: all 0.2s;
        box-shadow: 0 4px 15px rgba(176,104,33,0.3);
      "
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(176,104,33,0.4)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(176,104,33,0.3)';"
    >
      Submit Answer
    </button>
    <div id="submit-status-${questionId}" style="margin-top: 10px; font-weight: 600;"></div>
  `;
};

// Handle answer submission
window.handleSubmitAnswer = function(questionId, questionText, minWords) {
  const textarea = document.getElementById(questionId);
  const submitBtn = document.getElementById(`submit-${questionId}`);
  const statusDiv = document.getElementById(`submit-status-${questionId}`);
  
  if (!textarea || !window.answerValidation) return;

  const answerText = textarea.value.trim();
  
  const result = window.answerValidation.submitAnswer(
    questionId,
    questionText,
    answerText,
    minWords
  );

  if (result.success) {
    // Hide textarea and submit button
    textarea.style.display = 'none';
    submitBtn.style.display = 'none';
    
    // Show success message
    statusDiv.innerHTML = `
      <div style="color: #4CAF50; padding: 15px; background: rgba(76,175,80,0.1); border-radius: 10px; border: 2px solid #4CAF50;">
        ✅ ${result.message} Your answer has been saved for review.
      </div>
    `;
    
    // Hide word count
    const wordCountDisplay = document.getElementById(`word-count-${questionId.replace('question-', '')}`);
    if (wordCountDisplay) {
      wordCountDisplay.style.display = 'none';
    }
    
  } else {
    // Show error message
    statusDiv.innerHTML = `
      <div style="color: #f44336; padding: 15px; background: rgba(244,67,54,0.1); border-radius: 10px; border: 2px solid #f44336;">
        ❌ ${result.message}
      </div>
    `;
    
    setTimeout(() => {
      statusDiv.innerHTML = '';
    }, 3000);
  }
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  const lessonMatch = window.location.pathname.match(/(\d+(?:st|nd|rd|th)-grade-day-\d+)/);
  if (lessonMatch) {
    window.answerValidation = new AnswerValidation(lessonMatch[1]);
  }
});
