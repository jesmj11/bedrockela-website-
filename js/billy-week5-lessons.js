/**
 * Week 5 Mini-Lessons: /u/
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: -ug, -un, -ut, -ub, -um
 * Sight words: up, run, but, just
 */

class BillyWeek5Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 5 lesson scripts
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
    // Day 1 — Week 5
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. Last vowel for short sounds: short U, like in bug. It sounds like /u/. Let's go!",
                "pause": 2000
          },
          {
                "text": "Listen and say /u/.",
                "pause": 3000
          },
          {
                "text": "Good! It's /u/ like in cup, not /you/ like in cube. Say /u/ again.",
                "pause": 3000
          },
          {
                "text": "Perfect! Today: the -ug family.",
                "pause": 1500
          },
          {
                "text": "Listen: bug. What middle sound?",
                "pause": 4000
          },
          {
                "text": "Yes! /u/. Now: hug. What middle sound?",
                "pause": 4000
          },
          {
                "text": "Blend -ug. b-ug, bug.",
                "pause": 3000
          },
          {
                "text": "h-ug, hug.",
                "pause": 3000
          },
          {
                "text": "r-ug, rug.",
                "pause": 3000
          },
          {
                "text": "m-ug, mug.",
                "pause": 3500
          },
          {
                "text": "j-ug, jug.",
                "pause": 3500
          },
          {
                "text": "Break bug into sounds: /b/ /u/ /g/. You try.",
                "pause": 4000
          },
          {
                "text": "Great! Now rug. Say it slowly.",
                "pause": 4000
          },
          {
                "text": "Perfect! /r/ /u/ /g/. Together: rug.",
                "pause": 3000
          },
          {
                "text": "If short U, repeat it. Bug.",
                "pause": 3000
          },
          {
                "text": "Bag.",
                "pause": 2500
          },
          {
                "text": "Hug.",
                "pause": 3000
          },
          {
                "text": "Hog.",
                "pause": 2500
          },
          {
                "text": "Start with bug. Change /b/ to /h/. New word?",
                "pause": 4000
          },
          {
                "text": "Hug! Now rug. Change /r/ to /m/. What word?",
                "pause": 4000
          },
          {
                "text": "Mug! Great work!",
                "pause": 2000
          },
          {
                "text": "Listen: Gus has a bug in a jug. He will hug the rug.",
                "pause": 2000
          },
          {
                "text": "You read: Gus has a bug in a jug.",
                "pause": 4000
          },
          {
                "text": "Now: Put the mug on the rug.",
                "pause": 4000
          },
          {
                "text": "Great job! You learned short U and -ug words like bug, hug, rug, mug, and jug. Click to practice!",
                "pause": 1500
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 5
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. Yesterday: -ug words. Today: -un and -ut families!",
                "pause": 2000
          },
          {
                "text": "Warm up! Say /u/.",
                "pause": 3000
          },
          {
                "text": "Say -ug words: bug, hug, rug. Go!",
                "pause": 3500
          },
          {
                "text": "Great! Two more short U families now.",
                "pause": 1500
          },
          {
                "text": "Listen: run. What vowel sound?",
                "pause": 4000
          },
          {
                "text": "Yes! /u/. Now: cut. What vowel?",
                "pause": 4000
          },
          {
                "text": "Blend -un. r-un, run.",
                "pause": 3000
          },
          {
                "text": "f-un, fun.",
                "pause": 3000
          },
          {
                "text": "s-un, sun.",
                "pause": 3000
          },
          {
                "text": "Now -ut. c-ut, cut.",
                "pause": 3500
          },
          {
                "text": "n-ut, nut.",
                "pause": 3500
          },
          {
                "text": "h-ut, hut.",
                "pause": 3500
          },
          {
                "text": "Segment run: /r/ /u/ /n/. You try.",
                "pause": 4000
          },
          {
                "text": "Good! Now cut. Each sound.",
                "pause": 4000
          },
          {
                "text": "Nice! /c/ /u/ /t/. Together: cut.",
                "pause": 3000
          },
          {
                "text": "Repeat if short U. Fun.",
                "pause": 3000
          },
          {
                "text": "Fan.",
                "pause": 2500
          },
          {
                "text": "Nut.",
                "pause": 3000
          },
          {
                "text": "Say sun. Now without /s/. What's left?",
                "pause": 4000
          },
          {
                "text": "Un! Now nut without /n/.",
                "pause": 4000
          },
          {
                "text": "Listen: Gus will run in the sun. He cut a nut in the hut.",
                "pause": 2000
          },
          {
                "text": "You read: Gus will run in the sun.",
                "pause": 4000
          },
          {
                "text": "Now: The fun run is at the hut.",
                "pause": 4000
          },
          {
                "text": "Excellent reading!",
                "pause": 2000
          },
          {
                "text": "Great work! You learned -un words like run, fun, and sun, plus -ut words like cut, nut, and hut. Practice!",
                "pause": 1500
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 5
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. More short U families: -ub and -um. Let's learn!",
                "pause": 2000
          },
          {
                "text": "Say /u/.",
                "pause": 3000
          },
          {
                "text": "Say: bug, run, cut. Go!",
                "pause": 3500
          },
          {
                "text": "Perfect! Two more families.",
                "pause": 1500
          },
          {
                "text": "Listen: tub. What vowel?",
                "pause": 4000
          },
          {
                "text": "Yes! /u/. Now: gum. What vowel?",
                "pause": 4000
          },
          {
                "text": "Blend -ub. t-ub, tub.",
                "pause": 3000
          },
          {
                "text": "r-ub, rub.",
                "pause": 3000
          },
          {
                "text": "c-ub, cub.",
                "pause": 3000
          },
          {
                "text": "Now -um. g-um, gum.",
                "pause": 3500
          },
          {
                "text": "h-um, hum.",
                "pause": 3500
          },
          {
                "text": "s-um, sum.",
                "pause": 3500
          },
          {
                "text": "Segment tub: /t/ /u/ /b/. You try.",
                "pause": 4000
          },
          {
                "text": "Good! Now gum. Each sound.",
                "pause": 4000
          },
          {
                "text": "Nice! /g/ /u/ /m/. Together: gum.",
                "pause": 3000
          },
          {
                "text": "Repeat if short U. Rub.",
                "pause": 3000
          },
          {
                "text": "Rob.",
                "pause": 2500
          },
          {
                "text": "Hum.",
                "pause": 3000
          },
          {
                "text": "Start with tub. Change /t/ to /r/. New word?",
                "pause": 4000
          },
          {
                "text": "Rub! Now gum. Change /g/ to /h/. What word?",
                "pause": 4000
          },
          {
                "text": "Hum! Excellent!",
                "pause": 2000
          },
          {
                "text": "Listen: The cub will rub the gum. Gus put it in the tub.",
                "pause": 2000
          },
          {
                "text": "You read: The cub will rub the gum.",
                "pause": 4000
          },
          {
                "text": "Now: Hum a sum in the tub.",
                "pause": 4000
          },
          {
                "text": "Awesome! You learned -ub words like tub, rub, and cub, plus -um words like gum, hum, and sum!",
                "pause": 1500
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 5
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. Today we practice all short U families for fluency. Let's read smoothly!",
                "pause": 2000
          },
          {
                "text": "Say /u/.",
                "pause": 3000
          },
          {
                "text": "Great! Time to read fast and smooth.",
                "pause": 1500
          },
          {
                "text": "-ug words: bug, hug, rug, mug, jug. Go!",
                "pause": 3000
          },
          {
                "text": "-un and -ut: run, fun, sun, cut, nut, hut. Say them!",
                "pause": 3500
          },
          {
                "text": "-ub and -um: tub, rub, cub, gum, hum, sum. Your turn!",
                "pause": 3500
          },
          {
                "text": "Phrases. Listen: Gus will run | in the hot sun. You try.",
                "pause": 4000
          },
          {
                "text": "The bug is | in the jug. Say it.",
                "pause": 4000
          },
          {
                "text": "Cut the nut | and put it in the tub. Go!",
                "pause": 4000
          },
          {
                "text": "The cub will hug | the rug. Read it!",
                "pause": 4000
          },
          {
                "text": "Good rhythm!",
                "pause": 2000
          },
          {
                "text": "Passage. Listen: Gus has a bug in a jug. He will run in the sun and hug the cub. Gus cut a nut and put gum in the tub. It is fun!",
                "pause": 3000
          },
          {
                "text": "You read: Gus has a bug in a jug. He will run in the sun and hug the cub.",
                "pause": 5000
          },
          {
                "text": "Again: Gus cut a nut and put gum in the tub. It is fun!",
                "pause": 5000
          },
          {
                "text": "Sight words. Say: up.",
                "pause": 2000
          },
          {
                "text": "us.",
                "pause": 2000
          },
          {
                "text": "but.",
                "pause": 2000
          },
          {
                "text": "just.",
                "pause": 2000
          },
          {
                "text": "much.",
                "pause": 2000
          },
          {
                "text": "With excitement: Run, run, run! Say it!",
                "pause": 3000
          },
          {
                "text": "Surprised: Is that a bug in the jug?!",
                "pause": 3000
          },
          {
                "text": "Perfect!",
                "pause": 2000
          },
          {
                "text": "Fantastic! You can read all short U families smoothly. Tomorrow: assessment for Week 5!",
                "pause": 1500
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 5
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! Week 5 assessment. Show me what you learned about short U!",
                "pause": 2000
          },
          {
                "text": "Words, passage, sight words. Do your best. Ready?",
                "pause": 2000
          },
          {
                "text": "Read each word. Bug.",
                "pause": 3500
          },
          {
                "text": "Hug.",
                "pause": 3500
          },
          {
                "text": "Rug.",
                "pause": 3500
          },
          {
                "text": "Mug.",
                "pause": 3500
          },
          {
                "text": "Jug.",
                "pause": 3500
          },
          {
                "text": "Tug.",
                "pause": 3500
          },
          {
                "text": "Run.",
                "pause": 3500
          },
          {
                "text": "Fun.",
                "pause": 3500
          },
          {
                "text": "Sun.",
                "pause": 3500
          },
          {
                "text": "Bun.",
                "pause": 3500
          },
          {
                "text": "Cut.",
                "pause": 3500
          },
          {
                "text": "Nut.",
                "pause": 3500
          },
          {
                "text": "Hut.",
                "pause": 3500
          },
          {
                "text": "But.",
                "pause": 3500
          },
          {
                "text": "Tub.",
                "pause": 3500
          },
          {
                "text": "Rub.",
                "pause": 3500
          },
          {
                "text": "Cub.",
                "pause": 3500
          },
          {
                "text": "Gum.",
                "pause": 3500
          },
          {
                "text": "Hum.",
                "pause": 3500
          },
          {
                "text": "Sum.",
                "pause": 3500
          },
          {
                "text": "Read this: Gus has a bug in a jug. He will run in the sun. Gus cut a nut in the hut. The cub will hug and rub the rug. It is much fun! Now you read.",
                "pause": 30000
          },
          {
                "text": "Say: up.",
                "pause": 2000
          },
          {
                "text": "us.",
                "pause": 2000
          },
          {
                "text": "but.",
                "pause": 2000
          },
          {
                "text": "just.",
                "pause": 2000
          },
          {
                "text": "much.",
                "pause": 2000
          },
          {
                "text": "What did Gus have in the jug?",
                "pause": 5000
          },
          {
                "text": "Where did Gus cut the nut?",
                "pause": 5000
          },
          {
                "text": "Say a sentence with short U. Example: 'The bug is in the tub.' Your turn.",
                "pause": 15000
          },
          {
                "text": "Excellent! You learned all five short vowels: A, E, I, O, and U! Next week: review all of them. Great work!",
                "pause": 2000
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="5"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek5Lesson(day);
    }
  });
}
