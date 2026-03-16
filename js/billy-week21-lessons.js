/**
 * Week 21 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek21Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 21 lesson scripts
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
    // Day 1 — Week 21
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 21, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ar word families with the /är/ sound.",
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
                "text": "Listen to this word: car. Can you hear the /är/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: car. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: star. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: far. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: jar. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart car. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: car, star, far, jar.",
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
    // Day 2 — Week 21
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 21, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ark, -art word families with the /är/ sound.",
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
                "text": "Listen to this word: park. Can you hear the /är/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: park. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: dark. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: cart. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: part. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart park. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: park, dark, cart, part.",
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
    // Day 3 — Week 21
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 21, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -arn, -arm word families with the /är/ sound.",
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
                "text": "Listen to this word: barn. Can you hear the /är/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: barn. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: yarn. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: farm. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: harm. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart barn. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: barn, yarn, farm, harm.",
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
    // Day 4 — Week 21
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 21, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with AR words review.",
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
    // Day 5 — Week 21
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 21, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about AR words.",
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
    const container = document.querySelector('[data-billy-week="21"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek21Lesson(day);
    }
  });
}
