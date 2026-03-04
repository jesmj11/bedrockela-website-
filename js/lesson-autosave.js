/**
 * Lesson Autosave System with Firebase Cloud Sync
 * Automatically saves student answers every 30 seconds and on input
 * Syncs to Firebase for cross-device access and parent dashboard
 */

class LessonAutosave {
  constructor(studentId, lessonId) {
    this.studentId = studentId;
    this.lessonId = lessonId;
    this.storageKey = `lesson_answers_${studentId}_${lessonId}`;
    this.saveTimeout = null;
    this.lastSaved = Date.now();
    this.db = null;
    
    // Initialize Firebase if available
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      this.db = firebase.firestore();
      console.log('✅ Firebase connected for cloud sync');
    } else {
      console.log('⚠️  Firebase not available - using localStorage only');
    }
    
    // Auto-save every 30 seconds
    this.autoSaveInterval = setInterval(() => this.autoSave(), 30000);
    
    console.log(`✅ Autosave enabled for ${lessonId}`);
  }

  // Save all textareas and inputs
  async saveAllAnswers() {
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
    
    const saveData = {
      answers,
      savedAt: new Date().toISOString(),
      currentPage: this.getCurrentPage()
    };
    
    // Save to localStorage (offline backup)
    localStorage.setItem(this.storageKey, JSON.stringify(saveData));
    
    // Save to Firebase (cloud sync)
    if (this.db) {
      try {
        await this.db.collection('students')
          .doc(this.studentId)
          .collection('lessonProgress')
          .doc(this.lessonId)
          .set({
            ...saveData,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        
        console.log('☁️  Saved to Firebase');
      } catch (error) {
        console.error('Firebase save error:', error);
        // Continue - localStorage still works
      }
    }
    
    this.lastSaved = Date.now();
    this.showSaveIndicator();
    
    return answers;
  }

  // Restore saved answers (from Firebase or localStorage)
  async restoreAnswers() {
    let data = null;
    
    // Try Firebase first (most recent data)
    if (this.db) {
      try {
        const doc = await this.db.collection('students')
          .doc(this.studentId)
          .collection('lessonProgress')
          .doc(this.lessonId)
          .get();
        
        if (doc.exists) {
          data = doc.data();
          console.log('☁️  Restored from Firebase');
        }
      } catch (error) {
        console.error('Firebase restore error:', error);
      }
    }
    
    // Fallback to localStorage
    if (!data) {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        try {
          data = JSON.parse(saved);
          console.log('💾 Restored from localStorage');
        } catch (error) {
          console.error('Error parsing localStorage:', error);
          return null;
        }
      }
    }
    
    // Apply the restored data
    if (data && data.answers) {
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
      
      console.log(`✅ Restored answers from ${savedAt ? new Date(savedAt).toLocaleString() : 'backup'}`);
      return data;
    }
    
    return null;
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
    
    // Remove old listeners first (to avoid duplicates)
    document.querySelectorAll('textarea, input[type="text"]').forEach(element => {
      element.removeEventListener('input', saveOnInput);
    });
    
    // Attach to all textareas and inputs
    document.querySelectorAll('textarea, input[type="text"]').forEach(element => {
      element.addEventListener('input', saveOnInput);
    });
    
    console.log(`✅ Attached autosave listeners to ${document.querySelectorAll('textarea, input[type="text"]').length} fields`);
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
      document.body.appendChild(indicator);
    }
    
    // Update text based on Firebase availability
    indicator.textContent = this.db ? '☁️ Saved to Cloud' : '💾 Saved Locally';
    
    // Show indicator
    indicator.style.opacity = '1';
    
    // Hide after 2 seconds
    setTimeout(() => {
      indicator.style.opacity = '0';
    }, 2000);
  }
  
  // Manual save (called by Save button)
  manualSave() {
    this.saveAllAnswers();
    return true;
  }

  // Get current page number (if available)
  getCurrentPage() {
    // Try to find page indicator
    const pageText = document.querySelector('.lesson-info')?.textContent;
    const match = pageText?.match(/Page (\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  // Clear saved data (call when lesson is completed)
  async clearSaved() {
    // Clear localStorage
    localStorage.removeItem(this.storageKey);
    
    // Clear Firebase
    if (this.db) {
      try {
        await this.db.collection('students')
          .doc(this.studentId)
          .collection('lessonProgress')
          .doc(this.lessonId)
          .delete();
        console.log('☁️  Cleared from Firebase');
      } catch (error) {
        console.error('Firebase clear error:', error);
      }
    }
    
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

// Initialize autosave - called from lesson viewer after pages are rendered
function initializeAutosave() {
  const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || 'null');
  
  if (studentData?.id) {
    // Extract lesson ID from page URL
    const lessonMatch = window.location.pathname.match(/(\d+(?:st|nd|rd|th)-grade-(?:lesson|day)-\d+)/);
    const lessonId = lessonMatch ? lessonMatch[1] : null;
    
    if (lessonId) {
      // Create autosave instance if it doesn't exist
      if (!window.lessonAutosave) {
        window.lessonAutosave = new LessonAutosave(studentData.id, lessonId);
        console.log('✅ Autosave initialized');
      }
      
      // ALWAYS restore answers when this is called (page changes)
      // This ensures saved data appears when navigating between pages
      setTimeout(() => {
        window.lessonAutosave.restoreAnswers();
      }, 50);
      
      // Re-attach input listeners to new elements
      setTimeout(() => {
        window.lessonAutosave.attachAutoSave();
      }, 100);
    }
  }
}

// Also try on DOMContentLoaded as backup
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeAutosave, 1500);
});

// Save before leaving page
window.addEventListener('beforeunload', () => {
  if (window.lessonAutosave) {
    window.lessonAutosave.saveAllAnswers();
  }
});

// Manual save button click handler
window.manualSaveAnswers = function() {
  if (window.lessonAutosave) {
    const btn = document.getElementById('manual-save-btn');
    if (btn) {
      // Change button text temporarily
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Saved!';
      btn.style.background = '#4CAF50';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 2000);
    }
    
    window.lessonAutosave.manualSave();
  }
};

// Helper function to create save button HTML
window.createSaveButton = function() {
  return `
    <div style="text-align: center; margin: 25px 0;">
      <button 
        id="manual-save-btn"
        onclick="manualSaveAnswers()"
        style="
          background: linear-gradient(135deg, #305853 0%, #B06821 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(48,88,83,0.3);
        "
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(48,88,83,0.4)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(48,88,83,0.3)';"
      >
        Save Progress
      </button>
      <p style="font-size: 13px; color: #666; margin-top: 10px;">
        Auto-saves every 30 seconds
      </p>
    </div>
  `;
};
