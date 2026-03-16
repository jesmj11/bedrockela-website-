/**
 * Week 20 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek20Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 20 lesson scripts
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
    // Day 1 — Week 20
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 20, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the OU pattern. It makes the /ow/ sound.",
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
                "text": "Listen to this word: out. Can you hear the /ow/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: out. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: shout. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: loud. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: sound. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart out. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: out, shout, loud, sound.",
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
    // Day 2 — Week 20
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 20, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the OW pattern. It makes the /ow/ sound.",
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
                "text": "Listen to this word: cow. Can you hear the /ow/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: cow. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: how. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: now. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: brown. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart cow. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: cow, how, now, brown.",
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
    // Day 3 — Week 20
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 20, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll learn to tell the difference between similar patterns: OU vs OW.",
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
    // Day 4 — Week 20
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 20, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with OU/OW review.",
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
    // Day 5 — Week 20
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 20, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about OU/OW words.",
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
    const container = document.querySelector('[data-billy-week="20"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek20Lesson(day);
    }
  });
}
