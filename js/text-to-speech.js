/**
 * ElevenLabs Text-to-Speech Integration
 * Converts chapter text to natural-sounding audio
 */

class TextToSpeech {
  constructor() {
    this.apiKey = null; // Will be set from backend
    this.voiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice (clear, professional male)
    // Alternative voices: 
    // 'EXAVITQu4vr4xnSDxMaL' - Bella (young female)
    // '21m00Tcm4TlvDq8ikWAM' - Rachel (calm female)
    this.audioCache = {};
    this.currentAudio = null;
    this.isPlaying = false;
  }

  // Generate speech from text
  async generateSpeech(text, lessonId) {
    // Check cache first
    const cacheKey = this.getCacheKey(lessonId);
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      console.log('✅ Using cached audio');
      return cached;
    }

    try {
      // Determine API URL based on environment
      const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3001'
        : 'https://bedrockela-website-production.up.railway.app';
      
      // Call our backend proxy (keeps API key secure)
      const response = await fetch(`${API_URL}/api/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.substring(0, 5000), // Limit to 5000 chars to avoid hitting ElevenLabs limits
          voiceId: this.voiceId,
          lessonId: lessonId
        })
      });

      if (!response.ok) {
        throw new Error('TTS generation failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Cache the audio URL
      this.saveToCache(cacheKey, audioUrl);
      
      return audioUrl;
      
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  // Play audio
  async play(text, lessonId, button) {
    if (this.isPlaying && this.currentAudio) {
      this.pause();
      return;
    }

    try {
      // Show loading state
      this.updateButton(button, 'loading');
      
      // Generate or get cached audio
      const audioUrl = await this.generateSpeech(text, lessonId);
      
      // Create audio element if needed
      if (!this.currentAudio) {
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.addEventListener('ended', () => {
          this.isPlaying = false;
          this.updateButton(button, 'play');
        });
      } else {
        this.currentAudio.src = audioUrl;
      }
      
      // Play audio
      await this.currentAudio.play();
      this.isPlaying = true;
      this.updateButton(button, 'pause');
      
    } catch (error) {
      console.error('Error playing audio:', error);
      this.updateButton(button, 'error');
      
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        this.fallbackToWebSpeech(text);
      }
    }
  }

  // Pause audio
  pause() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.isPlaying = false;
    }
  }

  // Stop and reset
  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  // Update button UI
  updateButton(button, state) {
    if (!button) return;
    
    const states = {
      play: {
        text: '🔊 Listen to Chapter',
        class: 'tts-button'
      },
      pause: {
        text: '⏸️ Pause',
        class: 'tts-button playing'
      },
      loading: {
        text: '⏳ Generating audio...',
        class: 'tts-button loading'
      },
      error: {
        text: '❌ Audio unavailable',
        class: 'tts-button error'
      }
    };
    
    const config = states[state] || states.play;
    button.textContent = config.text;
    button.className = config.class;
  }

  // Fallback to browser Web Speech API
  fallbackToWebSpeech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // Cache management
  getCacheKey(lessonId) {
    return `tts_audio_${lessonId}`;
  }

  getFromCache(key) {
    const cached = localStorage.getItem(key);
    return cached || null;
  }

  saveToCache(key, audioUrl) {
    try {
      localStorage.setItem(key, audioUrl);
    } catch (error) {
      console.warn('Failed to cache audio:', error);
    }
  }
}

// Create global TTS instance
window.tts = new TextToSpeech();

// Add TTS button to reading pages
function addTTSButton(chapterText, lessonId, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const button = document.createElement('button');
  button.className = 'tts-button';
  button.textContent = '🔊 Listen to Chapter';
  button.style.cssText = `
    background: linear-gradient(135deg, #5B7C99 0%, #305853 100%);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    margin: 20px auto;
    display: block;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(48,88,83,0.3);
  `;
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 6px 20px rgba(48,88,83,0.4)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 15px rgba(48,88,83,0.3)';
  });
  
  button.addEventListener('click', () => {
    window.tts.play(chapterText, lessonId, button);
  });

  container.insertBefore(button, container.firstChild);
}

// Export for use in lessons
window.addTTSButton = addTTSButton;
