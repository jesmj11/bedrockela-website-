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
    
    // Lesson script with timestamps and pauses
    this.script = [
      // Opening
      { 
        time: 0, 
        text: "Hi — I'm Billy. Today we'll learn the short a sound, /a/, like in cat. Let's listen and say it together.", 
        pause: 2000 
      },
      
      // Model the sound
      { 
        time: 7000, 
        text: "Listen and say. Aaaa.", 
        pause: 3000,
        listenForResponse: true
      },
      { 
        time: 16000, 
        text: "Again. Aaaa. Make a short sound, not ay, just a.", 
        pause: 3000,
        listenForResponse: true
      },
      { 
        time: 25000, 
        text: "Say a, like in cat.", 
        pause: 2500,
        isHint: true,
        listenForResponse: true
      },
      
      // Onset-rime blending
      { 
        time: 25000, 
        text: "Now listen to how we make a whole word. I'll say the first part, then the last part, then the whole word. Ready?", 
        pause: 1500 
      },
      { 
        time: 34000, 
        text: "Cuh. At. Cat.", 
        pause: 3500,
        listenForResponse: true
      },
      { 
        time: 42000, 
        text: "Muh. At. Mat.", 
        pause: 3500,
        listenForResponse: true
      },
      { 
        time: 50000, 
        text: "Buh. At. Bat.", 
        pause: 3500,
        listenForResponse: true
      },
      
      // Segmentation
      { 
        time: 55000, 
        text: "Let's say the sounds in a word slowly. I'll say a word, then I'll say each sound. Repeat after me.", 
        pause: 1500 
      },
      { 
        time: 63000, 
        text: "Word: cat. Sounds: cuh, a, tuh. Now say the word. Cat.", 
        pause: 4000,
        listenForResponse: true
      },
      { 
        time: 73000, 
        text: "Word: bat. Sounds: buh, a, tuh. Now say the word. Bat.", 
        pause: 4000,
        listenForResponse: true
      },
      
      // Discrimination
      { 
        time: 85000, 
        text: "I will say some words. If the word has the short a sound like in cat, say it with me. If it does not, listen but don't say it.", 
        pause: 1500 
      },
      { time: 93000, text: "Sit.", pause: 2000 },
      { time: 99000, text: "Cat.", pause: 2500, listenForResponse: true },
      { time: 106000, text: "Cot.", pause: 2000 },
      { time: 112000, text: "Bat.", pause: 2500, listenForResponse: true },
      
      // Onset swap
      { 
        time: 115000, 
        text: "Now I'll give a rime. At. I'll say some first sounds. Put them together in your head and say the word. Ready?", 
        pause: 1500 
      },
      { time: 123000, text: "Puh. At.", pause: 3000, listenForResponse: true },
      { time: 130000, text: "Ruh. At.", pause: 3000, listenForResponse: true },
      { time: 137000, text: "Huh. At.", pause: 3000, listenForResponse: true },
      { time: 144000, text: "Nice! Those all have the short a sound.", pause: 1500 },
      
      // Short phrase
      { 
        time: 145000, 
        text: "Sam has a blue van. One day it got stuck on a big tan log. Listen to this sentence.", 
        pause: 1500 
      },
      { 
        time: 153000, 
        text: "Sam and Pam push the van.", 
        pause: 2500 
      },
      { 
        time: 160000, 
        text: "Now you say that same sentence.", 
        pause: 4000,
        listenForResponse: true
      },
      
      // Wrap up
      { 
        time: 170000, 
        text: "Great job! To practice more, listen again or tap Play to hear a short game with lots of at words. See you next time!", 
        pause: 1000 
      }
    ];
  }
  
  async start() {
    if (this.isPlaying) {
      console.log('[Billy Mini-Lesson] Already playing, ignoring duplicate start');
      return;
    }
    
    // Stop any other audio that might be playing
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
    
    console.log('[Billy Mini-Lesson] Starting...');
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
    
    console.log(`[Billy] Step ${stepIndex}: "${step.text.substring(0, 30)}..."`);
    
    // Speak the text and WAIT for it to complete
    await this.speak(step.text);
    
    if (!this.isPlaying || this.isPaused) return;
    
    // Wait for pause duration (student response time)
    if (step.pause) {
      console.log(`[Billy] Pausing ${step.pause}ms for student response`);
      await this.wait(step.pause);
    }
    
    if (!this.isPlaying || this.isPaused) return;
    
    // Optional: Listen for student response
    if (step.listenForResponse && this.micActive) {
      await this.listenForResponse(1000);
    }
    
    if (!this.isPlaying || this.isPaused) return;
    
    // Move to next step
    this.playStep(stepIndex + 1);
  }
  
  async speak(text) {
    return new Promise(async (resolve) => {
      try {
        console.log('[Billy] Fetching TTS audio...');
        const response = await fetch('http://localhost:3002/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice: 'mark' })
        });
        
        if (!response.ok) {
          console.error('[Billy] TTS failed, using fallback');
          await this.fallbackSpeak(text);
          resolve();
          return;
        }
        
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        console.log('[Billy] Playing audio...');
        this.currentAudio = new Audio(audioUrl);
        
        this.currentAudio.onended = () => {
          console.log('[Billy] Audio finished');
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
        
        await this.currentAudio.play();
        
      } catch (error) {
        console.error('[Billy] TTS error:', error);
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
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async listenForResponse(duration) {
    // Placeholder for mic listening
    // Future: implement Web Speech API for recognition
    console.log(`[Billy] Listening for ${duration}ms...`);
    await this.wait(duration);
  }
  
  pause() {
    this.isPaused = true;
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    if (window.speechSynthesis) {
      speechSynthesis.pause();
    }
    this.updateButtonState('▶️');
    console.log('[Billy] Paused');
  }
  
  resume() {
    this.isPaused = false;
    if (this.currentAudio) {
      this.currentAudio.play();
    }
    if (window.speechSynthesis) {
      speechSynthesis.resume();
    }
    this.updateButtonState('⏸️');
    console.log('[Billy] Resumed');
    
    // Continue from current step
    this.playStep(this.currentStep);
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
