/**
 * Week 23 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek23Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 23 lesson scripts
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
    // Day 1 — Week 23
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 23, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the ER pattern. It makes the /ər/ sound.",
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
                "text": "Listen to this word: her. Can you hear the /ər/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: her. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: fern. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: jerk. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: term. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart her. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: her, fern, jerk, term.",
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
    // Day 2 — Week 23
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 23, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the IR pattern. It makes the /ər/ sound.",
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
                "text": "Listen to this word: bird. Can you hear the /ər/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: bird. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: girl. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: stir. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: shirt. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart bird. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: bird, girl, stir, shirt.",
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
    // Day 3 — Week 23
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 23, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the UR pattern. It makes the /ər/ sound.",
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
                "text": "Listen to this word: burn. Can you hear the /ər/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: burn. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: turn. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: fur. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: hurt. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart burn. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: burn, turn, fur, hurt.",
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
    // Day 4 — Week 23
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 23, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll learn to tell the difference between similar patterns: ER/IR/UR.",
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

  getDay5Script() {
    // Day 5 — Week 23
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 23, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about ER/IR/UR words.",
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
    const container = document.querySelector('[data-billy-week="23"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek23Lesson(day);
    }
  });
}
