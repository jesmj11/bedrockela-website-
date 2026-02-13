// BedrockELA Journal Widget
// Embeds directly into lesson pages

class JournalWidget {
  constructor(config) {
    this.API_URL = config.apiUrl || 'http://localhost:3001/api';
    this.studentId = this.getStudentId();
    this.grade = config.grade;
    this.lessonNumber = config.lessonNumber;
    this.unitNumber = config.unitNumber;
    this.bookTitle = config.bookTitle;
    this.autosaveInterval = 10000; // 10 seconds
    this.autosaveTimer = null;
    this.lastSaved = null;
    
    if (!this.studentId) {
      this.promptLogin();
    } else {
      this.init();
    }
  }

  getStudentId() {
    return localStorage.getItem('bedrockela_student_id');
  }

  setStudentId(id) {
    localStorage.setItem('bedrockela_student_id', id);
    this.studentId = id;
  }

  promptLogin() {
    const loginHtml = `
      <div class="journal-login">
        <h3>👋 Welcome to Your Journal!</h3>
        <p>Enter your name to get started:</p>
        <input type="text" id="student-name" placeholder="Your Name" />
        <input type="text" id="student-username" placeholder="Username (e.g. johnd)" />
        <select id="student-grade">
          <option value="">Select Grade</option>
          <option value="1st">1st Grade</option>
          <option value="4th">4th Grade</option>
          <option value="6th">6th Grade</option>
        </select>
        <button id="journal-login-btn">Start Writing!</button>
      </div>
    `;

    const container = document.querySelector('.journal-widget');
    if (container) {
      container.innerHTML = loginHtml;

      document.getElementById('journal-login-btn').addEventListener('click', () => {
        this.handleLogin();
      });
    }
  }

  async handleLogin() {
    const name = document.getElementById('student-name').value.trim();
    const username = document.getElementById('student-username').value.trim();
    const grade = document.getElementById('student-grade').value;

    if (!name || !username || !grade) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch(`${this.API_URL}/student/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, grade_level: grade })
      });

      const data = await response.json();

      if (data.success) {
        this.setStudentId(data.student.id);
        localStorage.setItem('bedrockela_student_name', data.student.name);
        this.init();
      } else {
        alert('Login failed: ' + data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Could not connect to server. Journal will work in offline mode.');
      // Fallback to localStorage only
      this.setStudentId('offline_' + Date.now());
      localStorage.setItem('bedrockela_student_name', name);
      this.init();
    }
  }

  async init() {
    this.render();
    await this.loadExistingEntry();
    this.setupAutoSave();
    this.setupWordCount();
  }

  render() {
    const studentName = localStorage.getItem('bedrockela_student_name') || 'Student';
    
    const html = `
      <div class="journal-header">
        <h3>✍️ Your Reading Journal</h3>
        <div class="journal-meta">
          <span class="student-name">👤 ${studentName}</span>
          <span class="word-count">0 words</span>
          <span class="save-status">💾 <span id="save-text">Not saved</span></span>
        </div>
      </div>
      
      <div class="journal-prompt">
        <strong>Today's Prompt:</strong>
        <p id="journal-prompt-text">Loading...</p>
      </div>
      
      <textarea 
        id="journal-entry"
        class="journal-textarea"
        placeholder="Write your journal entry here... (2-3 sentences)"
        rows="8">
      </textarea>
      
      <div class="journal-actions">
        <button id="save-entry-btn" class="btn-save">💾 Save Entry</button>
        <button id="view-past-btn" class="btn-view-past">📖 View Past Entries</button>
        <button id="print-journal-btn" class="btn-print">🖨️ Print Journal</button>
      </div>
    `;

    const container = document.querySelector('.journal-widget');
    if (container) {
      container.innerHTML = html;
      this.attachEventListeners();
      this.loadPrompt();
    }
  }

  attachEventListeners() {
    document.getElementById('save-entry-btn').addEventListener('click', () => {
      this.saveEntry(true);
    });

    document.getElementById('view-past-btn').addEventListener('click', () => {
      this.viewPastEntries();
    });

    document.getElementById('print-journal-btn').addEventListener('click', () => {
      this.printJournal();
    });
  }

  async loadPrompt() {
    try {
      const response = await fetch(`${this.API_URL}/prompt/${this.grade}/${this.lessonNumber}`);
      const data = await response.json();
      
      document.getElementById('journal-prompt-text').textContent = data.prompt_text;
    } catch (error) {
      console.error('Load prompt error:', error);
      document.getElementById('journal-prompt-text').textContent = 'Write about what you read today.';
    }
  }

  async loadExistingEntry() {
    try {
      const response = await fetch(
        `${this.API_URL}/journal/entry/${this.studentId}/${this.grade}/${this.lessonNumber}`
      );

      if (response.ok) {
        const data = await response.json();
        document.getElementById('journal-entry').value = data.entry_text;
        this.updateWordCount();
        this.updateSaveStatus('saved', 'Loaded');
      }
    } catch (error) {
      // Entry doesn't exist yet, that's fine
    }
  }

  setupAutoSave() {
    const textarea = document.getElementById('journal-entry');
    
    textarea.addEventListener('input', () => {
      this.updateWordCount();
      this.updateSaveStatus('unsaved', 'Not saved');
      
      // Clear existing timer
      if (this.autosaveTimer) {
        clearTimeout(this.autosaveTimer);
      }

      // Set new timer
      this.autosaveTimer = setTimeout(() => {
        this.saveEntry(false);
      }, this.autosaveInterval);
    });
  }

  setupWordCount() {
    const textarea = document.getElementById('journal-entry');
    textarea.addEventListener('input', () => {
      this.updateWordCount();
    });
    
    // Initial count
    this.updateWordCount();
  }

  updateWordCount() {
    const textarea = document.getElementById('journal-entry');
    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    
    document.querySelector('.word-count').textContent = `${words} words`;
  }

  updateSaveStatus(status, text) {
    const saveText = document.getElementById('save-text');
    if (saveText) {
      saveText.textContent = text;
      saveText.className = status;
    }
  }

  async saveEntry(manual = false) {
    const textarea = document.getElementById('journal-entry');
    const entryText = textarea.value.trim();

    if (!entryText) {
      if (manual) alert('Please write something first!');
      return;
    }

    this.updateSaveStatus('saving', 'Saving...');

    try {
      const response = await fetch(`${this.API_URL}/journal/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: this.studentId,
          grade: this.grade,
          lesson_number: this.lessonNumber,
          unit_number: this.unitNumber,
          book_title: this.bookTitle,
          entry_text: entryText
        })
      });

      const data = await response.json();

      if (data.success) {
        this.lastSaved = new Date();
        this.updateSaveStatus('saved', manual ? 'Saved!' : 'Auto-saved');
        
        if (manual) {
          setTimeout(() => {
            this.updateSaveStatus('saved', 'Saved');
          }, 2000);
        }
      } else {
        this.updateSaveStatus('error', 'Save failed');
        if (manual) alert('Could not save entry: ' + data.error);
      }
    } catch (error) {
      console.error('Save error:', error);
      this.updateSaveStatus('error', 'Offline');
      // Fallback to localStorage
      this.saveToLocalStorage(entryText);
    }
  }

  saveToLocalStorage(entryText) {
    const key = `journal_${this.grade}_${this.lessonNumber}`;
    localStorage.setItem(key, JSON.stringify({
      text: entryText,
      date: new Date().toISOString(),
      studentId: this.studentId
    }));
  }

  viewPastEntries() {
    window.location.href = `/journal-viewer.html?student=${this.studentId}&grade=${this.grade}`;
  }

  printJournal() {
    window.location.href = `/journal-print.html?student=${this.studentId}&grade=${this.grade}&book=${encodeURIComponent(this.bookTitle)}`;
  }
}

// Auto-initialize if widget container exists
document.addEventListener('DOMContentLoaded', () => {
  const widget = document.querySelector('.journal-widget');
  if (widget) {
    const config = {
      apiUrl: widget.dataset.apiUrl || 'http://localhost:3001/api',
      grade: widget.dataset.grade,
      lessonNumber: parseInt(widget.dataset.lesson),
      unitNumber: parseInt(widget.dataset.unit),
      bookTitle: widget.dataset.book
    };

    new JournalWidget(config);
  }
});
