/**
 * Week 29 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek29Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 29 lesson scripts
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
    // Day 1 — Week 29
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 29, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Compound pattern. It makes the two parts sound.",
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
                "text": "Listen to this word: sunset. Can you hear the two parts sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: sunset. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: hotdog. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: into. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: bedroom. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart sunset. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: sunset, hotdog, into, bedroom.",
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
    // Day 2 — Week 29
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 29, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the VCCV pattern. It makes the VC/CV sound.",
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
                "text": "Listen to this word: napkin. Can you hear the VC/CV sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: napkin. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: basket. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: rocket. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: kitten. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart napkin. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: napkin, basket, rocket, kitten.",
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
    // Day 3 — Week 29
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 29, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the VCV pattern. It makes the V/CV sound.",
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
                "text": "Listen to this word: robot. Can you hear the V/CV sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: robot. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: music. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: baby. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: tuna. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart robot. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: robot, music, baby, tuna.",
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
    // Day 4 — Week 29
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 29, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with Multi-syllable reading.",
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
    // Day 5 — Week 29
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 29, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about Two-syllable words.",
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
    const container = document.querySelector('[data-billy-week="29"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek29Lesson(day);
    }
  });
}
