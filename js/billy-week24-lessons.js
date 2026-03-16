/**
 * Week 24 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek24Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 24 lesson scripts
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
    // Day 1 — Week 24
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 24, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the OI pattern. It makes the /oy/ sound.",
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
                "text": "Listen to this word: oil. Can you hear the /oy/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: oil. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: coin. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: join. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: point. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart oil. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: oil, coin, join, point.",
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
    // Day 2 — Week 24
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 24, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the OY pattern. It makes the /oy/ sound.",
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
                "text": "Listen to this word: boy. Can you hear the /oy/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: boy. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: toy. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: joy. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: enjoy. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart boy. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: boy, toy, joy, enjoy.",
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
    // Day 3 — Week 24
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 24, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll learn to tell the difference between similar patterns: OI vs OY.",
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
    // Day 4 — Week 24
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 24, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with OI/OY review.",
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
    // Day 5 — Week 24
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 24, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about OI/OY words.",
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
    const container = document.querySelector('[data-billy-week="24"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek24Lesson(day);
    }
  });
}
