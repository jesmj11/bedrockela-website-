/**
 * Week 12 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek12Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 12 lesson scripts
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
    // Day 1 — Week 12
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 12, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ike, -ime word families with the /ī/ sound.",
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
                "text": "Listen to this word: bike. Can you hear the /ī/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: bike. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: like. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: time. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: dime. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart bike. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: bike, like, time, dime.",
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
    // Day 2 — Week 12
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 12, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ipe, -ite word families with the /ī/ sound.",
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
                "text": "Listen to this word: pipe. Can you hear the /ī/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: pipe. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: ripe. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: bite. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: kite. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart pipe. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: pipe, ripe, bite, kite.",
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
    // Day 3 — Week 12
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 12, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ive, -ine word families with the /ī/ sound.",
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
                "text": "Listen to this word: five. Can you hear the /ī/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: five. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: dive. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: mine. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: pine. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart five. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: five, dive, mine, pine.",
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
    // Day 4 — Week 12
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 12, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with Long I review.",
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
    // Day 5 — Week 12
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 12, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about Long I (i_e) words.",
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
    const container = document.querySelector('[data-billy-week="12"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek12Lesson(day);
    }
  });
}
