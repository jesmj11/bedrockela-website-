/**
 * Week 11 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek11Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 11 lesson scripts
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
    // Day 1 — Week 11
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 11, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ake, -ame word families with the /ā/ sound.",
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
                "text": "Listen to this word: cake. Can you hear the /ā/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: cake. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: make. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: game. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: same. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart cake. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: cake, make, game, same.",
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
    // Day 2 — Week 11
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 11, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ape, -ate word families with the /ā/ sound.",
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
                "text": "Listen to this word: tape. Can you hear the /ā/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: tape. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: cape. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: gate. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: late. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart tape. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: tape, cape, gate, late.",
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
    // Day 3 — Week 11
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 11, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ave, -aze word families with the /ā/ sound.",
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
                "text": "Listen to this word: cave. Can you hear the /ā/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: cave. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: wave. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: maze. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: gaze. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart cave. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: cave, wave, maze, gaze.",
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
    // Day 4 — Week 11
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 11, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with Long A review.",
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
    // Day 5 — Week 11
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 11, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about Long A (a_e) words.",
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
    const container = document.querySelector('[data-billy-week="11"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek11Lesson(day);
    }
  });
}
