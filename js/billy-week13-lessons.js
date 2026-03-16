/**
 * Week 13 Mini-Lessons: review
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: various
 * Sight words: review
 */

class BillyWeek13Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 13 lesson scripts
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
    // Day 1 — Week 13
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 13, Lesson 1. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -oke, -ome word families with the /ō/ sound.",
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
                "text": "Listen to this word: joke. Can you hear the /ō/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: joke. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: poke. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: home. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: dome. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart joke. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: joke, poke, home, dome.",
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
    // Day 2 — Week 13
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 13, Lesson 2. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -ope, -ote word families with the /ō/ sound.",
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
                "text": "Listen to this word: hope. Can you hear the /ō/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: hope. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: rope. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: note. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: vote. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart hope. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: hope, rope, note, vote.",
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
    // Day 3 — Week 13
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 13, Lesson 3. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we're learning the -one, -ose word families with the /ō/ sound.",
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
                "text": "Listen to this word: bone. Can you hear the /ō/ sound?",
                "pause": 3000
          },
          {
                "text": "Let's blend: bone. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: cone. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: rose. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Let's blend: nose. You say it with me.",
                "pause": 2500
          },
          {
                "text": "Now let's break apart bone. Tap out each sound.",
                "pause": 3500
          },
          {
                "text": "Great! Now practice these: bone, cone, rose, nose.",
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
    // Day 4 — Week 13
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 13, Lesson 4. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today we'll practice reading fluently with Long O review.",
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
    // Day 5 — Week 13
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Welcome to Week 13, Lesson 5. Let's learn together!",
                "pause": 2000
          },
          {
                "text": "Today is assessment day! Let's see what you've learned about Long O (o_e) words.",
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
    const container = document.querySelector('[data-billy-week="13"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek13Lesson(day);
    }
  });
}
