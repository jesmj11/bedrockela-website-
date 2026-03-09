/**
 * Billy Mini-Lesson - Interactive Audio Teaching
 * Auto-starts when page loads, pauses/resumes on click
 */

class BillyMiniLesson {
  constructor() {
    this.currentStep = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentAudio = null;
    this.micActive = false;
    this.pauseTimeout = null;
    
    // Lesson script - plays sequentially with pauses between steps
    this.script = [
      // Opening
      { 
        text: "Hi — I'm Billy. Today we'll learn the short a sound, like in cat. Let's listen and say it together.", 
        pause: 2000 
      },
      
      // Model the sound
      { 
        text: "Listen and say. Aaaa.", 
        pause: 3000,
        listenForResponse: true
      },
      { 
        text: "Again. Aaaa. Make a short sound, not ay, just a.", 
        pause: 3000,
        listenForResponse: true
      },
      { 
        text: "Say a, like in cat.", 
        pause: 2500,
        listenForResponse: true
      },
      
      // Onset-rime blending
      { 
        text: "Now listen to how we make a whole word. I'll say the first part, then the last part, then the whole word. Ready?", 
        pause: 1500 
      },
      { 
        text: "Cuh. At. Cat.", 
        pause: 3500,
        listenForResponse: true
      },
      { 
        text: "Muh. At. Mat.", 
        pause: 3500,
        listenForResponse: true
      },
      { 
        text: "Buh. At. Bat.", 
        pause: 3500,
        listenForResponse: true
      },
      
      // Segmentation
      { 
        text: "Let's say the sounds in a word slowly. I'll say a word, then I'll say each sound. Repeat after me.", 
        pause: 1500 
      },
      { 
        text: "Word: cat. Sounds: cuh, a, tuh. Now say the word. Cat.", 
        pause: 4000,
        listenForResponse: true
      },
      { 
        text: "Word: bat. Sounds: buh, a, tuh. Now say the word. Bat.", 
        pause: 4000,
        listenForResponse: true
      },
      
      // Discrimination
      { 
        text: "I will say some words. If the word has the short a sound like in cat, say it with me. If it does not, listen but don't say it.", 
        pause: 2500 
      },
      { text: "Sit.", pause: 2500 },
      { text: "Cat.", pause: 3000, listenForResponse: true },
      { text: "Cot.", pause: 2500 },
      { text: "Bat.", pause: 3000, listenForResponse: true },
      
      // Onset swap
      { 
        text: "Now I'll give a rime. At. I'll say some first sounds. Put them together in your head and say the word. Ready?", 
        pause: 2000 
      },
      { text: "Puh. At.", pause: 3500, listenForResponse: true },
      { text: "Ruh. At.", pause: 3500, listenForResponse: true },
      { text: "Huh. At.", pause: 3500, listenForResponse: true },
      { text: "Nice! Those all have the short a sound.", pause: 1500 },
      
      // Short phrase
      { 
        text: "Sam has a blue van. One day it got stuck on a big tan log. Listen to this sentence.", 
        pause: 1500 
      },
      { 
        text: "Sam and Pam push the van.", 
        pause: 2000 
      },
      { 
        text: "Now you say that same sentence.", 
        pause: 3500,
        listenForResponse: true
      },
      
      // Wrap up
      { 
        text: "Great job! You can click the speaker button to hear this lesson again. See you next time!", 
        pause: 1000 
      }
    ];
  }
  
  async start() {
    if (this.isPlaying && !this.isPaused) {
      console.log('[Billy Mini-Lesson] Already playing, ignoring duplicate start');
      return;
    }
    
    // Stop any other audio that might be playing
    this.stop();
    
    if (window.currentAudio) {
      window.currentAudio.pause();
      window.currentAudio = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    this.isPlaying = true;
    this.isPaused = false;
    this.currentStep = 0;
    
    console.log('[Billy Mini-Lesson] Starting from beginning...');
    this.updateButtonState('⏸️');
    
    await this.playStep(0);
  }
  
  async playStep(stepIndex) {
    if (stepIndex >= this.script.length || !this.isPlaying) {
      this.complete();
      return;
    }
    
    if (this.isPaused) return;
    
    const step = this.script[stepIndex];
    this.currentStep = stepIndex;
    
    console.log(`[Billy] Step ${stepIndex + 1}/${this.script.length}: "${step.text.substring(0, 40)}..."`);
    
    // Speak the text and WAIT for it to complete
    await this.speak(step.text);
    
    if (!this.isPlaying || this.isPaused) return;
    
    // Wait for pause duration (student response time)
    if (step.pause) {
      console.log(`[Billy] Waiting ${step.pause}ms for student response`);
      await this.wait(step.pause);
    }
    
    if (!this.isPlaying || this.isPaused) return;
    
    // Optional: Listen for student response (future feature)
    if (step.listenForResponse && this.micActive) {
      await this.listenForResponse(1000);
    }
    
    if (!this.isPlaying || this.isPaused) return;
    
    // Move to next step
    this.playStep(stepIndex + 1);
  }
  
  async speak(text) {
    // Stop any previous audio first
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    
    return new Promise(async (resolve) => {
      try {
        console.log('[Billy] Fetching TTS audio...');
        const response = await fetch('http://localhost:3002/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice: 'mark' })
        });
        
        if (!response.ok) {
          console.error('[Billy] TTS server error, using browser fallback');
          await this.fallbackSpeak(text);
          resolve();
          return;
        }
        
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        this.currentAudio = new Audio(audioUrl);
        
        this.currentAudio.onended = () => {
          console.log('[Billy] ✓ Audio complete');
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          resolve();
        };
        
        this.currentAudio.onerror = (e) => {
          console.error('[Billy] Audio playback error:', e);
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          resolve();
        };
        
        try {
          await this.currentAudio.play();
        } catch (playError) {
          console.error('[Billy] Play failed:', playError);
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          resolve();
        }
        
      } catch (error) {
        console.error('[Billy] TTS fetch error:', error);
        await this.fallbackSpeak(text);
        resolve();
      }
    });
  }
  
  fallbackSpeak(text) {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }
      
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slower for better comprehension
      utterance.pitch = 1.1;
      
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      
      speechSynthesis.speak(utterance);
    });
  }
  
  wait(ms) {
    return new Promise(resolve => {
      this.pauseTimeout = setTimeout(() => {
        this.pauseTimeout = null;
        resolve();
      }, ms);
    });
  }
  
  async listenForResponse(duration) {
    // Placeholder for mic listening
    // Future: implement Web Speech API for recognition
    console.log(`[Billy] Listening for ${duration}ms...`);
    await this.wait(duration);
  }
  
  pause() {
    this.isPaused = true;
    
    // Stop current audio
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    if (window.speechSynthesis) {
      speechSynthesis.pause();
    }
    
    // Clear any waiting timeouts
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
      this.pauseTimeout = null;
    }
    
    this.updateButtonState('▶️');
    console.log('[Billy] Paused');
  }
  
  resume() {
    if (!this.isPlaying) {
      // If not playing at all, restart from beginning
      this.start();
      return;
    }
    
    this.isPaused = false;
    
    // Resume current audio if it was playing
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play().catch(e => {
        console.log('[Billy] Could not resume audio, moving to next step');
        // Audio couldn't resume, just continue to next step
        this.playStep(this.currentStep + 1);
      });
    } else if (window.speechSynthesis && speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      // No audio playing, move to next step
      this.playStep(this.currentStep + 1);
    }
    
    this.updateButtonState('⏸️');
    console.log('[Billy] Resumed');
  }
  
  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 0;
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
    }
    
    this.updateButtonState('🔊');
    console.log('[Billy] Stopped');
  }
  
  complete() {
    console.log('[Billy] Lesson complete!');
    this.stop();
  }
  
  toggle() {
    if (!this.isPlaying) {
      this.start();
    } else if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }
  
  updateButtonState(emoji) {
    const btn = document.getElementById('billy-speaker');
    if (btn) {
      btn.textContent = emoji;
    }
  }
}

// Global instance
window.billyMiniLesson = new BillyMiniLesson();
