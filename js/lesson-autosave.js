/**
 * Lesson Autosave System
 * Automatically saves student answers every 30 seconds and on input
 */

class LessonAutosave {
  constructor(studentId, lessonId) {
    this.studentId = studentId;
    this.lessonId = lessonId;
    this.storageKey = `lesson_answers_${studentId}_${lessonId}`;
    this.saveTimeout = null;
    this.lastSaved = Date.now();
    
    // Auto-save every 30 seconds
    this.autoSaveInterval = setInterval(() => this.autoSave(), 30000);
    
    console.log(`✅ Autosave enabled for ${lessonId}`);
  }

  // Save all textareas and inputs
  saveAllAnswers() {
    const answers = {};
    
    // Save all textareas (comprehension questions, journal entries)
    document.querySelectorAll('textarea').forEach(textarea => {
      if (textarea.id) {
        answers[textarea.id] = textarea.value;
      }
    });
    
    // Save all text inputs (vocabulary, etc.)
    document.querySelectorAll('input[type="text"]').forEach(input => {
      if (input.id) {
        answers[input.id] = input.value;
      }
    });
    
    // Save to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify({
      answers,
      savedAt: new Date().toISOString(),
      currentPage: this.getCurrentPage()
    }));
    
    this.lastSaved = Date.now();
    this.showSaveIndicator();
    
    return answers;
  }

  // Restore saved answers
  restoreAnswers() {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return null;
    
    try {
      const data = JSON.parse(saved);
      const { answers, savedAt } = data;
      
      // Restore each saved answer
      Object.entries(answers).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && value) {
          element.value = value;
          
          // Trigger word count update if it exists
          const wordCountId = id.replace('question-', 'word-count-').replace('journal-entry', 'journal-word-count');
          if (window.updateWordCount) {
            const minWords = element.placeholder?.match(/minimum (\d+) words/)?.[1] || 30;
            window.updateWordCount(id, wordCountId, parseInt(minWords));
          }
        }
      });
      
      console.log(`✅ Restored answers from ${new Date(savedAt).toLocaleString()}`);
      return data;
    } catch (error) {
      console.error('Error restoring answers:', error);
      return null;
    }
  }

  // Auto-save on typing (debounced)
  attachAutoSave() {
    const saveOnInput = (event) => {
      // Clear existing timeout
      if (this.saveTimeout) {
        clearTimeout(this.saveTimeout);
      }
      
      // Save after 2 seconds of no typing
      this.saveTimeout = setTimeout(() => {
        this.saveAllAnswers();
      }, 2000);
    };
    
    // Attach to all textareas and inputs
    document.querySelectorAll('textarea, input[type="text"]').forEach(element => {
      element.addEventListener('input', saveOnInput);
    });
  }

  // Periodic auto-save
  autoSave() {
    const timeSinceLastSave = Date.now() - this.lastSaved;
    
    // Only save if it's been more than 25 seconds
    if (timeSinceLastSave > 25000) {
      this.saveAllAnswers();
    }
  }

  // Show "Saved" indicator
  showSaveIndicator() {
    let indicator = document.getElementById('autosave-indicator');
    
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'autosave-indicator';
      indicator.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #305853;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
      `;
      indicator.textContent = 'Saved';
      document.body.appendChild(indicator);
    }
    
    // Show indicator
    indicator.style.opacity = '1';
    
    // Hide after 2 seconds
    setTimeout(() => {
      indicator.style.opacity = '0';
    }, 2000);
  }

  // Get current page number (if available)
  getCurrentPage() {
    // Try to find page indicator
    const pageText = document.querySelector('.lesson-info')?.textContent;
    const match = pageText?.match(/Page (\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  // Clear saved data (call when lesson is completed)
  clearSaved() {
    localStorage.removeItem(this.storageKey);
    console.log(`✅ Cleared autosave data for ${this.lessonId}`);
  }

  // Cleanup on destroy
  destroy() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }
}

// Initialize autosave when page loads
window.addEventListener('DOMContentLoaded', () => {
  const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || 'null');
  
  if (studentData?.id) {
    // Extract lesson ID from page URL
    const lessonMatch = window.location.pathname.match(/(\d+(?:st|nd|rd|th)-grade-(?:lesson|day)-\d+)/);
    const lessonId = lessonMatch ? lessonMatch[1] : null;
    
    if (lessonId) {
      // Wait 1 second for page to fully render, then initialize
      setTimeout(() => {
        window.lessonAutosave = new LessonAutosave(studentData.id, lessonId);
        
        // Restore any saved answers
        window.lessonAutosave.restoreAnswers();
        
        // Attach input listeners
        window.lessonAutosave.attachAutoSave();
      }, 1000);
    }
  }
});

// Save before leaving page
window.addEventListener('beforeunload', () => {
  if (window.lessonAutosave) {
    window.lessonAutosave.saveAllAnswers();
  }
});
