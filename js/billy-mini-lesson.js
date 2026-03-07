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
        pause: 1500 
      },
      
      // Model the sound
      { 
        time: 7000, 
        text: "Listen and say /a/.", 
        pause: 2000,
        listenForResponse: true
      },
      { 
        time: 16000, 
        text: "Again: /a/. Make a short sound — not /ay/ — just /a/.", 
        pause: 2000,
        listenForResponse: true
      },
      { 
        time: 25000, 
        text: "Say /a/ like in cat.", 
        pause: 1500,
        isHint: true,
        listenForResponse: true
      },
      
      // Onset-rime blending
      { 
        time: 25000, 
        text: "Now listen to how we make a whole word. I'll say the first part, then the last part, then the whole word. Ready?", 
        pause: 1000 
      },
      { 
        time: 34000, 
        text: "c — at — cat.", 
        pause: 2500,
        listenForResponse: true
      },
      { 
        time: 42000, 
        text: "m — at — mat.", 
        pause: 2500,
        listenForResponse: true
      },
      { 
        time: 50000, 
        text: "b — at — bat.", 
        pause: 2500,
        listenForResponse: true
      },
      
      // Segmentation
      { 
        time: 55000, 
        text: "Let's say the sounds in a word slowly. I'll say a word, then I'll say each sound. Repeat after me.", 
        pause: 1000 
      },
      { 
        time: 63000, 
        text: "Word: cat. Sounds: c — /a/ — t. Now say the word: cat.", 
        pause: 3000,
        listenForResponse: true
      },
      { 
        time: 73000, 
        text: "Word: bat. Sounds: b — /a/ — t. Now say the word: bat.", 
        pause: 3000,
        listenForResponse: true
      },
      
      // Discrimination
      { 
        time: 85000, 
        text: "I will say some words. If the word has the short /a/ sound like in cat, say it with me. If it does not, listen but don't say it.", 
        pause: 1000 
      },
      { time: 93000, text: "sit.", pause: 1500 },
      { time: 99000, text: "cat.", pause: 2000, listenForResponse: true },
      { time: 106000, text: "cot.", pause: 1500 },
      { time: 112000, text: "bat.", pause: 2000, listenForResponse: true },
      
      // Onset swap
      { 
        time: 115000, 
        text: "Now I'll give a rime: at. I'll say some first sounds. Put them together in your head and say the word. Ready?", 
        pause: 1000 
      },
      { time: 123000, text: "p — at.", pause: 2000, listenForResponse: true },
      { time: 130000, text: "r — at.", pause: 2000, listenForResponse: true },
      { time: 137000, text: "h — at.", pause: 2000, listenForResponse: true },
      { time: 144000, text: "Nice — those all have the short /a/ sound.", pause: 1000 },
      
      // Short phrase
      { 
        time: 145000, 
        text: "Sam has a blue van. One day it got stuck on a big tan log. Listen to this sentence.", 
        pause: 1000 
      },
      { 
        time: 153000, 
        text: "Sam and Pam push the van.", 
        pause: 2000 
      },
      { 
        time: 160000, 
        text: "Now you say that same sentence.", 
        pause: 3000,
        listenForResponse: true
      },
      
      // Wrap up
      { 
        time: 170000, 
        text: "Great job! To practice more, listen again or tap Play to hear a short game with lots of -at words. See you next time!", 
        pause: 500 
      }
    ];
  }
  
  async start() {
    if (this.isPlaying) return;
    
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
    
    // Speak the text
    await this.speak(step.text);
    
    // Wait for pause duration
    if (step.pause) {
      await this.wait(step.pause);
    }
    
    // Optional: Listen for student response
    if (step.listenForResponse && this.micActive) {
      await this.listenForResponse(1500);
    }
    
    // Move to next step
    if (this.isPlaying && !this.isPaused) {
      this.playStep(stepIndex + 1);
    }
  }
  
  async speak(text) {
    return new Promise(async (resolve) => {
      try {
        const response = await fetch('http://localhost:3002/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice: 'mark' })
        });
        
        if (!response.ok) {
          console.error('[Billy] TTS failed, using fallback');
          this.fallbackSpeak(text);
          resolve();
          return;
        }
        
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          resolve();
        };
        this.currentAudio.play();
        
      } catch (error) {
        console.error('[Billy] TTS error:', error);
        this.fallbackSpeak(text);
        resolve();
      }
    });
  }
  
  fallbackSpeak(text) {
    if (!window.speechSynthesis) return;
    
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
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
