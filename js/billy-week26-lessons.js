/**
 * Week 26 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek26Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 26 lesson scripts
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
    // Day 1 — Week 26
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 26, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the KN pattern. It makes the /n/ sound.",
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
                "text": "Listen to this word: knee. Can you hear the /n/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: knee. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: know. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: knock. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: knife. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart knee. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: knee, know, knock, knife.",
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
    // Day 2 — Week 26
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 26, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the WR pattern. It makes the /r/ sound.",
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
                "text": "Listen to this word: write. Can you hear the /r/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: write. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: wrap. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: wrong. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: wrist. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart write. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: write, wrap, wrong, wrist.",
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
    // Day 3 — Week 26
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 26, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the GN, MB pattern. It makes the /n/, /m/ sound.",
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
                "text": "Listen to this word: gnat. Can you hear the /n/, /m/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: gnat. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: sign. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: lamb. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: climb. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart gnat. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: gnat, sign, lamb, climb.",
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
    // Day 4 — Week 26
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 26, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with Silent letter review.",
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
    // Day 5 — Week 26
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 26, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about Silent letter words.",
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
    const container = document.querySelector('[data-billy-week="26"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek26Lesson(day);
    }
  });
}
