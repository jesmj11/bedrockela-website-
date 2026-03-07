/**
 * Billy Instructor - Avatar-guided lesson system
 * Billy appears on screen and guides students through lessons with voice + text
 */

class BillyInstructor {
  constructor(config = {}) {
    this.config = {
      container: config.container || 'billy-instructor-container',
      autoSpeak: config.autoSpeak !== false, // Default true
      voice: config.voice || 'Billy', // ElevenLabs voice
      apiEndpoint: '/api/tts', // Proxy to ElevenLabs
      ...config
    };
    
    this.state = {
      currentStep: 0,
      isPlaying: false,
      audioQueue: [],
      lessonData: null
    };
    
    this.audioCache = new Map(); // Cache TTS audio
    this.currentAudio = null;
    
    this.init();
  }
  
  init() {
    this.container = document.getElementById(this.config.container);
    if (!this.container) {
      console.error('Billy Instructor: Container not found');
      return;
    }
    
    this.render();
    this.attachEventListeners();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="billy-instructor">
        <!-- Billy Avatar (larger, center stage) -->
        <div class="billy-avatar-large" id="billy-avatar">
          ${this.getBillyAvatarSVG()}
        </div>
        
        <!-- Speech Bubble -->
        <div class="billy-speech-bubble" id="billy-speech">
          <div class="billy-speech-text" id="billy-speech-text">
            Hi! I'm Billy the Helper Goat. Let's learn together!
          </div>
          <div class="billy-speech-controls">
            <button class="billy-btn billy-replay" id="billy-replay" title="Hear that again">
              🔊
            </button>
            <button class="billy-btn billy-continue" id="billy-continue">
              Continue →
            </button>
          </div>
        </div>
        
        <!-- Activity Area (below Billy) -->
        <div class="billy-activity-area" id="billy-activity">
          <!-- Dynamic activity content loads here -->
        </div>
      </div>
    `;
  }
  
  attachEventListeners() {
    const replayBtn = document.getElementById('billy-replay');
    const continueBtn = document.getElementById('billy-continue');
    
    if (replayBtn) {
      replayBtn.addEventListener('click', () => this.toggleSpeech());
    }
    
    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.nextStep());
    }
  }
  
  /**
   * Toggle speech on/off
   */
  toggleSpeech() {
    const replayBtn = document.getElementById('billy-replay');
    
    if (this.state.isPlaying) {
      // Stop current audio
      this.stopAudio();
      if (replayBtn) replayBtn.textContent = '🔊';
    } else {
      // Play current text
      if (replayBtn) replayBtn.textContent = '⏸️';
      this.replayCurrentSpeech();
    }
  }
  
  /**
   * Stop all audio playback
   */
  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
    }
    this.state.isPlaying = false;
    this.animateBilly('idle');
  }
  
  getBillyAvatarSVG() {
    // Billy's avatar image (satyr character)
    return `<img src="images/billy-avatar.jpg" alt="Billy" class="billy-avatar-img" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">`;
  }
  
  /**
   * Load lesson data and start first step
   */
  async loadLesson(lessonData) {
    this.state.lessonData = lessonData;
    this.state.currentStep = 0;
    
    // Start with welcome message
    await this.speak(lessonData.welcome || "Let's get started!", { animate: true });
    
    // Show continue button
    this.showContinueButton();
  }
  
  /**
   * Speak text using ElevenLabs TTS
   */
  async speak(text, options = {}) {
    const speechText = document.getElementById('billy-speech-text');
    const replayBtn = document.getElementById('billy-replay');
    
    if (speechText) {
      speechText.textContent = text;
    }
    
    this.state.isPlaying = true;
    this.state.currentText = text;
    
    if (options.animate) {
      this.animateBilly('talking');
    }
    
    if (!this.config.autoSpeak) {
      this.state.isPlaying = false;
      return;
    }
    
    try {
      // Check cache first
      const cacheKey = this.hashText(text);
      let audioBlob = this.audioCache.get(cacheKey);
      
      if (!audioBlob) {
        // Generate TTS via backend
        audioBlob = await this.generateTTS(text);
        this.audioCache.set(cacheKey, audioBlob);
      }
      
      // Update button state
      if (replayBtn) replayBtn.textContent = '⏸️';
      
      // Play audio
      await this.playAudio(audioBlob);
      
    } catch (error) {
      console.error('Billy TTS error:', error);
      // Continue without audio
    } finally {
      this.state.isPlaying = false;
      this.animateBilly('idle');
      if (replayBtn) replayBtn.textContent = '🔊';
    }
  }
  
  /**
   * Generate TTS audio via backend (proxies to ElevenLabs)
   */
  async generateTTS(text) {
    // For now, use browser TTS as fallback
    // TODO: Implement ElevenLabs backend endpoint
    return this.generateBrowserTTS(text);
  }
  
  /**
   * Browser TTS fallback
   */
  async generateBrowserTTS(text) {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }
      
      speechSynthesis.cancel(); // Stop any previous speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      
      // Try to find a child-friendly voice
      const voices = speechSynthesis.getVoices();
      const childVoice = voices.find(v => 
        v.name.includes('Samantha') || 
        v.name.includes('Karen') || 
        v.name.includes('female')
      );
      if (childVoice) utterance.voice = childVoice;
      
      utterance.onend = () => {
        this.state.isPlaying = false;
        resolve(null);
      };
      utterance.onerror = (e) => {
        this.state.isPlaying = false;
        reject(e);
      };
      
      speechSynthesis.speak(utterance);
    });
  }
  
  /**
   * Play audio blob
   */
  async playAudio(audioBlob) {
    if (!audioBlob) return;
    
    const audio = new Audio(URL.createObjectURL(audioBlob));
    this.currentAudio = audio;
    
    return new Promise((resolve, reject) => {
      audio.onended = resolve;
      audio.onerror = reject;
      audio.play().catch(reject);
    });
  }
  
  /**
   * Replay current speech
   */
  async replayCurrentSpeech() {
    if (this.state.currentText) {
      await this.speak(this.state.currentText, { animate: true });
    }
  }
  
  /**
   * Animate Billy (talking, idle, celebrating, etc.)
   */
  animateBilly(animation) {
    const avatar = document.getElementById('billy-avatar');
    if (!avatar) return;
    
    avatar.classList.remove('billy-talking', 'billy-celebrating', 'billy-thinking');
    
    switch (animation) {
      case 'talking':
        avatar.classList.add('billy-talking');
        break;
      case 'celebrating':
        avatar.classList.add('billy-celebrating');
        break;
      case 'thinking':
        avatar.classList.add('billy-thinking');
        break;
      default:
        // idle - no special class
        break;
    }
  }
  
  /**
   * Show/hide continue button
   */
  showContinueButton() {
    const btn = document.getElementById('billy-continue');
    if (btn) btn.style.display = 'inline-block';
  }
  
  hideContinueButton() {
    const btn = document.getElementById('billy-continue');
    if (btn) btn.style.display = 'none';
  }
  
  /**
   * Move to next step in lesson
   */
  async nextStep() {
    if (!this.state.lessonData || !this.state.lessonData.steps) {
      console.warn('No lesson steps defined');
      return;
    }
    
    this.state.currentStep++;
    
    if (this.state.currentStep >= this.state.lessonData.steps.length) {
      // Lesson complete!
      await this.lessonComplete();
      return;
    }
    
    const step = this.state.lessonData.steps[this.state.currentStep];
    await this.executeStep(step);
  }
  
  /**
   * Execute a lesson step
   */
  async executeStep(step) {
    this.hideContinueButton();
    
    // Speak instruction
    if (step.instruction) {
      await this.speak(step.instruction, { animate: true });
    }
    
    // Load activity
    if (step.activity) {
      this.loadActivity(step.activity);
    } else {
      this.showContinueButton();
    }
  }
  
  /**
   * Load activity into activity area
   */
  loadActivity(activity) {
    const activityArea = document.getElementById('billy-activity');
    if (!activityArea) return;
    
    switch (activity.type) {
      case 'flashcards':
        this.loadFlashcards(activity.data);
        break;
      case 'drag-drop':
        this.loadDragDrop(activity.data);
        break;
      case 'multiple-choice':
        this.loadMultipleChoice(activity.data);
        break;
      default:
        console.warn('Unknown activity type:', activity.type);
        this.showContinueButton();
    }
  }
  
  /**
   * Load flashcard activity (placeholder)
   */
  loadFlashcards(data) {
    const activityArea = document.getElementById('billy-activity');
    activityArea.innerHTML = `
      <div class="flashcard-activity">
        <h3>Flashcards Activity</h3>
        <p>Coming soon: ${data.words?.join(', ')}</p>
        <button onclick="billyInstructor.activityComplete()">Done</button>
      </div>
    `;
  }
  
  /**
   * Load drag-drop activity (placeholder)
   */
  loadDragDrop(data) {
    const activityArea = document.getElementById('billy-activity');
    activityArea.innerHTML = `
      <div class="drag-drop-activity">
        <h3>Word Building Activity</h3>
        <p>Drag onset to rime: ${data.rime}</p>
        <button onclick="billyInstructor.activityComplete()">Done</button>
      </div>
    `;
  }
  
  /**
   * Load multiple choice activity (placeholder)
   */
  loadMultipleChoice(data) {
    const activityArea = document.getElementById('billy-activity');
    const choices = data.choices.map((choice, i) => 
      `<button class="choice-btn" onclick="billyInstructor.checkAnswer(${i}, '${data.correct}')">${choice}</button>`
    ).join('');
    
    activityArea.innerHTML = `
      <div class="multiple-choice-activity">
        <h3>${data.question}</h3>
        <div class="choices">${choices}</div>
      </div>
    `;
  }
  
  /**
   * Check multiple choice answer
   */
  async checkAnswer(selected, correct) {
    const choices = this.state.lessonData.steps[this.state.currentStep].activity.data.choices;
    
    if (choices[selected] === correct) {
      await this.speak("Yes! That's correct! Great job!", { animate: true });
      this.animateBilly('celebrating');
      setTimeout(() => this.activityComplete(), 2000);
    } else {
      await this.speak("Not quite. Try again!", { animate: true });
    }
  }
  
  /**
   * Activity completed - move to next step
   */
  activityComplete() {
    const activityArea = document.getElementById('billy-activity');
    if (activityArea) activityArea.innerHTML = '';
    
    this.showContinueButton();
  }
  
  /**
   * Lesson complete
   */
  async lessonComplete() {
    await this.speak("Awesome work! You finished the lesson!", { animate: true });
    this.animateBilly('celebrating');
    
    // Fire completion event
    this.container.dispatchEvent(new CustomEvent('lesson-complete', {
      detail: { lessonData: this.state.lessonData }
    }));
  }
  
  /**
   * Simple hash for text caching
   */
  hashText(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString();
  }
}

// Global instance
let billyInstructor = null;

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('billy-instructor-container');
  if (container) {
    billyInstructor = new BillyInstructor();
  }
});
