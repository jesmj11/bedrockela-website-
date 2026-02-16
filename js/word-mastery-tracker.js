/**
 * Word Mastery Tracking System
 * Tracks individual word mastery with spaced repetition
 * Words must be answered correctly 3 times in a row to graduate
 */

class WordMasteryTracker {
  constructor(studentId, lessonNumber) {
    this.studentId = studentId;
    this.lessonNumber = lessonNumber;
    this.storageKey = `word_mastery_${studentId}_lesson_${lessonNumber}`;
    this.loadProgress();
  }

  // Load progress from localStorage
  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.progress = JSON.parse(saved);
    } else {
      this.progress = {
        words: {}, // { "cat": { correct: 0, attempts: 0, mastered: false, lastSeen: timestamp } }
        masteredWords: [],
        createdAt: Date.now()
      };
    }
  }

  // Save progress to localStorage
  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  // Initialize words for this lesson
  initializeWords(wordList) {
    wordList.forEach(word => {
      if (!this.progress.words[word]) {
        this.progress.words[word] = {
          correct: 0,
          attempts: 0,
          mastered: false,
          lastSeen: null,
          firstSeen: Date.now()
        };
      }
    });
    this.saveProgress();
  }

  // Record a word attempt
  recordAttempt(word, wasCorrect) {
    if (!this.progress.words[word]) {
      this.progress.words[word] = {
        correct: 0,
        attempts: 0,
        mastered: false,
        lastSeen: null,
        firstSeen: Date.now()
      };
    }

    const wordData = this.progress.words[word];
    wordData.attempts++;
    wordData.lastSeen = Date.now();

    if (wasCorrect) {
      wordData.correct++;
      
      // Check if word is mastered (3 correct in a row)
      if (wordData.correct >= 3 && !wordData.mastered) {
        wordData.mastered = true;
        this.progress.masteredWords.push({
          word: word,
          masteredAt: Date.now()
        });
        console.log(`✅ Word "${word}" MASTERED!`);
      }
    } else {
      // Reset correct streak if they get it wrong
      wordData.correct = 0;
    }

    this.saveProgress();
    return wordData.mastered;
  }

  // Get words that need practice (not yet mastered)
  getWordsToStudy() {
    return Object.keys(this.progress.words).filter(word => 
      !this.progress.words[word].mastered
    );
  }

  // Get mastered words
  getMasteredWords() {
    return Object.keys(this.progress.words).filter(word => 
      this.progress.words[word].mastered
    );
  }

  // Get word status for display
  getWordStatus(word) {
    const data = this.progress.words[word];
    if (!data) return { status: 'new', progress: 0 };

    if (data.mastered) {
      return { status: 'mastered', progress: 100 };
    }

    const progress = Math.min((data.correct / 3) * 100, 100);
    return { 
      status: data.correct >= 2 ? 'close' : data.correct >= 1 ? 'learning' : 'new',
      progress: progress,
      correct: data.correct,
      attempts: data.attempts
    };
  }

  // Get statistics
  getStats() {
    const totalWords = Object.keys(this.progress.words).length;
    const mastered = this.getMasteredWords().length;
    const studying = this.getWordsToStudy().length;
    
    return {
      total: totalWords,
      mastered: mastered,
      studying: studying,
      percentMastered: totalWords > 0 ? Math.round((mastered / totalWords) * 100) : 0
    };
  }

  // Reset a specific word (if needed for review)
  resetWord(word) {
    if (this.progress.words[word]) {
      this.progress.words[word].correct = 0;
      this.progress.words[word].mastered = false;
      this.progress.masteredWords = this.progress.masteredWords.filter(
        w => w.word !== word
      );
      this.saveProgress();
    }
  }

  // Clear all progress (for testing)
  clearProgress() {
    localStorage.removeItem(this.storageKey);
    this.loadProgress();
  }
}

/**
 * Adaptive Flashcard Game with Mastery Tracking
 * Only shows words that aren't mastered yet
 */
class AdaptiveFlashcardGame {
  constructor(containerId, config, tracker, onComplete) {
    this.container = document.getElementById(containerId);
    this.allWords = config.wordList || [];
    this.tracker = tracker;
    this.onComplete = onComplete;
    
    // Initialize words in tracker
    this.tracker.initializeWords(this.allWords);
    
    // Get words that need practice
    this.wordsToStudy = this.tracker.getWordsToStudy();
    
    this.currentPair = 0;
    this.correctCount = 0;
    this.attempts = 0;
    
    this.render();
  }

  render() {
    const stats = this.tracker.getStats();
    
    if (this.wordsToStudy.length === 0) {
      // All words mastered!
      this.container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <div style="font-size: 72px; margin-bottom: 20px;">🎉</div>
          <h2 style="color: #5B7C99; margin-bottom: 15px;">All Words Mastered!</h2>
          <p style="font-size: 18px; color: #666; margin-bottom: 20px;">
            You know all ${stats.total} words perfectly!
          </p>
          <div style="padding: 20px; background: #d4edda; border-radius: 12px; margin: 20px 0;">
            <p style="font-size: 20px; color: #155724; font-weight: bold;">
              ✅ ${stats.mastered} / ${stats.total} Words Mastered
            </p>
          </div>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #5B7C99; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
            Review Again
          </button>
        </div>
      `;
      if (this.onComplete) this.onComplete();
      return;
    }

    // Show current word to practice
    const currentWord = this.wordsToStudy[this.currentPair];
    const wordStatus = this.tracker.getWordStatus(currentWord);
    
    this.container.innerHTML = `
      <div class="adaptive-flashcard-game">
        <!-- Progress Stats -->
        <div style="background: #F5F9FF; padding: 15px; border-radius: 12px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
            <div>
              <div style="font-size: 14px; color: #666;">Words to Master</div>
              <div style="font-size: 24px; font-weight: bold; color: #5B7C99;">${this.wordsToStudy.length}</div>
            </div>
            <div>
              <div style="font-size: 14px; color: #666;">Mastered</div>
              <div style="font-size: 24px; font-weight: bold; color: #28a745;">${stats.mastered}</div>
            </div>
            <div>
              <div style="font-size: 14px; color: #666;">Total Progress</div>
              <div style="font-size: 24px; font-weight: bold; color: #5B7C99;">${stats.percentMastered}%</div>
            </div>
          </div>
        </div>

        <!-- Current Word Card -->
        <div style="background: white; border: 3px solid #5B7C99; border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 20px;">
          <div style="font-size: 14px; color: #666; margin-bottom: 10px;">
            Word ${this.currentPair + 1} of ${this.wordsToStudy.length}
          </div>
          <div style="font-size: 48px; font-weight: bold; color: #5B7C99; margin: 20px 0;">
            ${currentWord}
          </div>
          
          <!-- Word Progress Bar -->
          <div style="margin: 20px 0;">
            <div style="background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: ${wordStatus.status === 'close' ? '#ffc107' : '#28a745'}; width: ${wordStatus.progress}%; height: 100%; transition: width 0.3s;"></div>
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 5px;">
              ${wordStatus.correct}/3 correct needed to master
            </div>
          </div>
          
          <div style="font-size: 18px; color: #666; margin-top: 15px;">
            Can you read this word?
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 15px; justify-content: center;">
          <button onclick="window.adaptiveFlashcardAnswer(true)" 
                  style="flex: 1; max-width: 200px; padding: 20px; background: #28a745; color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; transition: transform 0.2s;">
            ✅ I Got It!
          </button>
          <button onclick="window.adaptiveFlashcardAnswer(false)" 
                  style="flex: 1; max-width: 200px; padding: 20px; background: #dc3545; color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; transition: transform 0.2s;">
            ❌ Need Practice
          </button>
        </div>

        <!-- Mastered Words List (collapsible) -->
        ${stats.mastered > 0 ? `
          <div style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 12px;">
            <div style="font-size: 16px; font-weight: bold; color: #155724; margin-bottom: 10px;">
              🎉 Mastered Words (${stats.mastered}):
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${this.tracker.getMasteredWords().map(word => `
                <span style="padding: 6px 12px; background: white; border-radius: 6px; font-weight: bold; color: #155724;">
                  ${word}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Add hover effects
    const buttons = this.container.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
      btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
    });
  }

  handleAnswer(wasCorrect) {
    const currentWord = this.wordsToStudy[this.currentPair];
    
    // Record the attempt
    const wasMastered = this.tracker.recordAttempt(currentWord, wasCorrect);
    
    this.attempts++;
    if (wasCorrect) this.correctCount++;

    // Show feedback
    this.showFeedback(currentWord, wasCorrect, wasMastered);
  }

  showFeedback(word, wasCorrect, wasMastered) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${wasCorrect ? '#d4edda' : '#f8d7da'};
      color: ${wasCorrect ? '#155724' : '#721c24'};
      padding: 30px 40px;
      border-radius: 16px;
      font-size: 24px;
      font-weight: bold;
      z-index: 1000;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      animation: fadeIn 0.3s ease;
    `;
    
    if (wasMastered) {
      feedbackDiv.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
          <div>"${word}" is MASTERED!</div>
          <div style="font-size: 16px; margin-top: 10px; opacity: 0.8;">3 correct in a row!</div>
        </div>
      `;
    } else {
      feedbackDiv.innerHTML = wasCorrect ? 
        `✅ Correct! Keep going!` : 
        `❌ Keep practicing "${word}"`;
    }
    
    document.body.appendChild(feedbackDiv);
    
    setTimeout(() => {
      feedbackDiv.remove();
      this.nextWord();
    }, wasMastered ? 2000 : 1000);
  }

  nextWord() {
    // Refresh words to study (in case one was just mastered)
    this.wordsToStudy = this.tracker.getWordsToStudy();
    
    if (this.wordsToStudy.length === 0) {
      // All done!
      this.render();
      return;
    }

    // Move to next word (cycle back to start if at end)
    this.currentPair = (this.currentPair + 1) % this.wordsToStudy.length;
    this.render();
  }
}

// Global function for button clicks
window.adaptiveFlashcardAnswer = function(wasCorrect) {
  if (window.currentAdaptiveGame) {
    window.currentAdaptiveGame.handleAnswer(wasCorrect);
  }
};

// Simple CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
`;
document.head.appendChild(style);
