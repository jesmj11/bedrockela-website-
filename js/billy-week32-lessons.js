/**
 * Week 32 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek32Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 32 lesson scripts
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
    // Day 1 — Week 32
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! Welcome to Week 32, Lesson 1. This is a mastery week!",
                "pause": 2000
          },
          {
                "text": "We'll review everything you've learned so far. You're doing amazing!",
                "pause": 2500
          },
          {
                "text": "Let's practice reading together.",
                "pause": 1500
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Read the next word carefully.",
                "pause": 2000
          },
          {
                "text": "Great job! Keep up the excellent work!",
                "pause": 2000
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 32
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 32, Lesson 2. Let's learn together!",
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

  getDay3Script() {
    // Day 3 — Week 32
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 32, Lesson 3. Let's learn together!",
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

  getDay4Script() {
    // Day 4 — Week 32
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 32, Lesson 4. Let's learn together!",
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
    // Day 5 — Week 32
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 32, Lesson 5. Let's learn together!",
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
    const container = document.querySelector('[data-billy-week="32"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek32Lesson(day);
    }
  });
}
