/**
 * Lesson Completion System
 * Tracks completed lessons, unlocks next lesson, saves to database
 */

class LessonCompletion {
  constructor(studentId, lessonNumber, gradeLevel) {
    this.studentId = studentId;
    this.lessonNumber = lessonNumber;
    this.gradeLevel = gradeLevel;
    this.API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3001/api' 
      : 'https://bedrockela-website-production.up.railway.app/api';
  }

  // Mark lesson as complete and save to database
  async markComplete() {
    try {
      // Save to localStorage immediately
      this.saveToLocalStorage();
      
      // Save to database
      const response = await fetch(`${this.API_URL}/student/complete-lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: this.studentId,
          grade_level: this.gradeLevel,
          lesson_number: this.lessonNumber,
          completed_at: new Date().toISOString()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ Lesson ${this.lessonNumber} marked complete in database`);
        return true;
      } else {
        console.warn('Database save failed, but saved locally');
        return false;
      }
    } catch (error) {
      console.error('Error saving lesson completion:', error);
      // Still saved locally, so return true
      return true;
    }
  }

  // Save to localStorage as backup
  saveToLocalStorage() {
    const storageKey = `lesson_completion_${this.studentId}`;
    let completedLessons = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    if (!completedLessons[this.gradeLevel]) {
      completedLessons[this.gradeLevel] = [];
    }
    
    if (!completedLessons[this.gradeLevel].includes(this.lessonNumber)) {
      completedLessons[this.gradeLevel].push(this.lessonNumber);
      completedLessons[this.gradeLevel].sort((a, b) => a - b);
    }
    
    localStorage.setItem(storageKey, JSON.stringify(completedLessons));
  }

  // Check if lesson is complete
  static isLessonComplete(studentId, gradeLevel, lessonNumber) {
    const storageKey = `lesson_completion_${studentId}`;
    const completedLessons = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return completedLessons[gradeLevel]?.includes(lessonNumber) || false;
  }

  // Get all completed lessons for a grade
  static getCompletedLessons(studentId, gradeLevel) {
    const storageKey = `lesson_completion_${studentId}`;
    const completedLessons = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return completedLessons[gradeLevel] || [];
  }

  // Get next lesson number
  getNextLesson() {
    return this.lessonNumber + 1;
  }

  // Check if next lesson exists (for 1st grade, lessons 1-180)
  hasNextLesson() {
    const maxLessons = {
      '1st-grade': 180,
      '2nd-grade': 180,
      '3rd-grade': 180,
      '4th-grade': 180
    };
    return this.lessonNumber < (maxLessons[this.gradeLevel] || 180);
  }

  // Show completion modal with navigation options
  showCompletionModal() {
    const modal = document.createElement('div');
    modal.id = 'completion-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;

    const hasNext = this.hasNextLesson();
    const nextLesson = this.getNextLesson();

    modal.innerHTML = `
      <div style="background: white; border-radius: 24px; padding: 50px 40px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: slideUp 0.4s ease;">
        <div style="font-size: 80px; margin-bottom: 20px;">🎉</div>
        <h1 style="color: #5B7C99; font-size: 32px; margin-bottom: 15px;">Lesson Complete!</h1>
        <p style="color: #666; font-size: 18px; margin-bottom: 30px;">
          Great job finishing Lesson ${this.lessonNumber}!<br>
          ${hasNext ? "You're ready for the next lesson!" : "You've completed all lessons!"}
        </p>

        <div style="background: #F5F9FF; padding: 20px; border-radius: 16px; margin-bottom: 30px;">
          <div style="font-size: 48px; font-weight: bold; color: #5B7C99;">
            ${this.lessonNumber}
          </div>
          <div style="font-size: 14px; color: #666; margin-top: 5px;">
            Lessons Completed
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 15px;">
          ${hasNext ? `
            <button onclick="window.goToNextLesson()" style="
              width: 100%;
              padding: 18px;
              background: linear-gradient(135deg, #5B7C99 0%, #305853 100%);
              color: white;
              border: none;
              border-radius: 15px;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
              Continue to Lesson ${nextLesson} →
            </button>
          ` : ''}
          
          <button onclick="window.goToDashboard()" style="
            width: 100%;
            padding: 18px;
            background: white;
            color: #5B7C99;
            border: 3px solid #5B7C99;
            border-radius: 15px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
            Back to Dashboard
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Setup navigation functions
    window.goToNextLesson = () => {
      window.location.href = `${this.gradeLevel}-lesson-${nextLesson}-v4.html`;
    };

    window.goToDashboard = () => {
      window.location.href = 'student-dashboard-live.html';
    };
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(30px); 
    }
    to { 
      opacity: 1;
      transform: translateY(0); 
    }
  }
`;
document.head.appendChild(style);
