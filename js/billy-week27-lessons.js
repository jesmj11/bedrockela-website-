/**
 * Week 27 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek27Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 27 lesson scripts
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
    // Day 1 — Week 27
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 27, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Soft C /s/ pattern. It makes the /s/ sound.",
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
                "text": "Listen to this word: city. Can you hear the /s/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: city. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: race. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: mice. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: ice. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart city. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: city, race, mice, ice.",
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
    // Day 2 — Week 27
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 27, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Hard C /k/ pattern. It makes the /k/ sound.",
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
                "text": "Listen to this word: cat. Can you hear the /k/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: cat. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: can. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: cup. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: cut. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart cat. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: cat, can, cup, cut.",
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
    // Day 3 — Week 27
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 27, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Soft G /j/ pattern. It makes the /j/ sound.",
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
                "text": "Listen to this word: gem. Can you hear the /j/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: gem. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: giant. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: giraffe. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: page. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart gem. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: gem, giant, giraffe, page.",
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
    // Day 4 — Week 27
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 27, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the Hard G /g/ pattern. It makes the /g/ sound.",
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
                "text": "Listen to this word: go. Can you hear the /g/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: go. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: got. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: game. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: bug. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart go. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: go, got, game, bug.",
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

  getDay5Script() {
    // Day 5 — Week 27
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 27, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about Soft/hard C & G.",
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
    const container = document.querySelector('[data-billy-week="27"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek27Lesson(day);
    }
  });
}
