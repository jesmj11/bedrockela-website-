/**
 * Lesson Completion System
 * Tracks completed lessons, unlocks next lesson, saves to database
 */

class LessonCompletion {
  constructor(studentId, lessonNumber, gradeLevel) {
    this.studentId = studentId;
    this.lessonNumber = lessonNumber;
    this.gradeLevel = gradeLevel;
  }

  // Mark lesson as complete - save to localStorage + Firebase
  async markComplete() {
    try {
      // Save to localStorage immediately (works offline)
      this.saveToLocalStorage();
      
      // Save to Firebase if online
      await this.saveToFirebase();
      
      console.log(`✅ Lesson ${this.lessonNumber} marked complete`);
      return true;
      
    } catch (error) {
      console.error('Error saving lesson completion:', error);
      
      // If offline, track for sync later
      if (!navigator.onLine && window.offlineSync) {
        window.offlineSync.trackOfflineCompletion(
          this.studentId,
          this.lessonNumber,
          this.gradeLevel
        );
      }
      
      // Still saved locally, so return true
      return true;
    }
  }

  // Save to Firebase Firestore
  async saveToFirebase() {
    if (typeof firebase === 'undefined' || !navigator.onLine) {
      console.log('Firebase offline - saved to localStorage');
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection('students').doc(this.studentId).update({
        completedLessons: firebase.firestore.FieldValue.arrayUnion(this.lessonNumber),
        lastActive: new Date().toISOString(),
        [`progress.${this.gradeLevel}.lesson${this.lessonNumber}`]: {
          completedAt: new Date().toISOString()
        }
      });
      
      console.log(`☁️ Synced to Firebase`);
    } catch (error) {
      console.warn('Firebase save failed (offline?):', error);
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
      '4th-grade': 180,
      '5th-grade': 180,
      '6th-grade': 180
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
        <h1 style="color: #305853; font-size: 32px; margin-bottom: 15px;">Lesson Complete!</h1>
        <p style="color: #666; font-size: 18px; margin-bottom: 30px;">
          Great job finishing Lesson ${this.lessonNumber}!<br>
          ${hasNext ? "You're ready for the next lesson!" : "You've completed all lessons!"}
        </p>

        <div style="background: #F5F9FF; padding: 20px; border-radius: 16px; margin-bottom: 30px;">
          <div style="font-size: 48px; font-weight: bold; color: #305853;">
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

    // Setup navigation functions — navigate FIRST, save in background
    window.goToNextLesson = () => {
      const nextUrl = this.getNextLessonUrl(nextLesson);
      // Fire and forget — don't block navigation on Firebase
      this.updateFirebaseProgress(nextLesson).catch(e => console.warn('Firebase save failed:', e));
      window.location.href = nextUrl;
    };

    window.goToDashboard = () => {
      this.updateFirebaseProgress(nextLesson).catch(e => console.warn('Firebase save failed:', e));
      window.location.href = 'student-dashboard.html';
    };
  }

  // Get correct URL for next lesson based on grade
  getNextLessonUrl(lessonNum) {
    // All grades use the same URL format: Xth-grade-day-N.html
    return `${this.gradeLevel}-day-${lessonNum}.html`;
  }

  // Update student progress in Firebase
  async updateFirebaseProgress(nextLesson) {
    try {
      const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || 'null');
      if (!studentData || !studentData.id) {
        console.warn('No student data found in localStorage');
        return;
      }

      // Import Firebase if not already loaded
      if (typeof firebase === 'undefined') {
        console.warn('Firebase not loaded - progress not saved to cloud');
        return;
      }

      const db = firebase.firestore();
      await db.collection('students').doc(studentData.id).update({
        currentLesson: nextLesson,
        completedLessons: firebase.firestore.FieldValue.arrayUnion(this.lessonNumber),
        lastActive: new Date().toISOString()
      });

      console.log(`✅ Updated Firebase: currentLesson = ${nextLesson}`);
    } catch (error) {
      console.error('Error updating Firebase progress:', error);
    }
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
