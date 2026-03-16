/**
 * Week 30 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek30Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 30 lesson scripts
    this.lessons = {
      1: this.getDay1Script(),
      2: this.getDay2Script(),
      3: this.getDay3Script(),
      4: this.getDay4Script(),
      5: this.getDay5Script()
    };
    
    this.script = this.lessons[dayNumber] || this.lessons[1];
  }

  getDay1Script() {
    // Day 1 — Week 30
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 30, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Contractions 1 pattern. It makes the two → one sound.",
                "pause": 2500
          },
          {
                "text": "Let's warm up our reading voices. Are you ready?",
                "pause": 1500
          },
          {
                "text": "Great! Let's begin.",
                "pause": 1000
          },
          {
                "text": "Listen to this word: can't. Can you hear the two → one sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: can't. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: don't. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: I'm. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: it's. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart can't. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: can't, don't, I'm, it's.",
                "pause": 4000
          },
          {
                "text": "Now let's read a sentence together.",
                "pause": 1500
          },
          {
                "text": "You'll see the sentence on the screen. Take your time and read it out loud.",
                "pause": 3000
          },
          {
                "text": "Excellent work today! Keep practicing and you'll be a great reader.",
                "pause": 2000
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 30
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 30, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Contractions 2 pattern. It makes the two → one sound.",
                "pause": 2500
          },
          {
                "text": "Let's warm up our reading voices. Are you ready?",
                "pause": 1500
          },
          {
                "text": "Great! Let's begin.",
                "pause": 1000
          },
          {
                "text": "Listen to this word: she's. Can you hear the two → one sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: she's. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: we're. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: they're. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: won't. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart she's. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: she's, we're, they're, won't.",
                "pause": 4000
          },
          {
                "text": "Now let's read a sentence together.",
                "pause": 1500
          },
          {
                "text": "You'll see the sentence on the screen. Take your time and read it out loud.",
                "pause": 3000
          },
          {
                "text": "Excellent work today! Keep practicing and you'll be a great reader.",
                "pause": 2000
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 30
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 30, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Possessives pattern. It makes the belongs to sound.",
                "pause": 2500
          },
          {
                "text": "Let's warm up our reading voices. Are you ready?",
                "pause": 1500
          },
          {
                "text": "Great! Let's begin.",
                "pause": 1000
          },
          {
                "text": "Listen to this word: dog's. Can you hear the belongs to sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: dog's. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: cat's. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: mom's. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: dad's. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart dog's. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: dog's, cat's, mom's, dad's.",
                "pause": 4000
          },
          {
                "text": "Now let's read a sentence together.",
                "pause": 1500
          },
          {
                "text": "You'll see the sentence on the screen. Take your time and read it out loud.",
                "pause": 3000
          },
          {
                "text": "Excellent work today! Keep practicing and you'll be a great reader.",
                "pause": 2000
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 30
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 30, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with Contractions/possessives.",
                "pause": 2000
          },
          {
                "text": "Let's warm up our reading voices. Are you ready?",
                "pause": 1500
          },
          {
                "text": "Great! Let's begin.",
                "pause": 1000
          },
          {
                "text": "Now let's read a sentence together.",
                "pause": 1500
          },
          {
                "text": "You'll see the sentence on the screen. Take your time and read it out loud.",
                "pause": 3000
          },
          {
                "text": "Excellent work today! Keep practicing and you'll be a great reader.",
                "pause": 2000
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 30
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 30, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about Contractions & possessives.",
                "pause": 2000
          },
          {
                "text": "Let's warm up our reading voices. Are you ready?",
                "pause": 1500
          },
          {
                "text": "Great! Let's begin.",
                "pause": 1000
          },
          {
                "text": "Now let's read a sentence together.",
                "pause": 1500
          },
          {
                "text": "You'll see the sentence on the screen. Take your time and read it out loud.",
                "pause": 3000
          },
          {
                "text": "Excellent work today! Keep practicing and you'll be a great reader.",
                "pause": 2000
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="30"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek30Lesson(day);
    }
  });
}
