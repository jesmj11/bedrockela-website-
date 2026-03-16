/**
 * Week 4 Mini-Lessons: /o/
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: -ot, -op, -og, -ob, -ox
 * Sight words: and, the, a, I
 */

class BillyWeek4Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 4 lesson scripts
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
    // Day 1 — Week 4
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. This week we're learning short O, like in hot. It sounds like /o/. Let's begin!",
                "pause": 2000
          },
          {
                "text": "Listen and say the short O sound: /o/.",
                "pause": 3000
          },
          {
                "text": "Good! It's /o/ like in dot, not /oh/ like in rope. Say /o/ again.",
                "pause": 3000
          },
          {
                "text": "Perfect! Today we'll focus on the -ot word family.",
                "pause": 1500
          },
          {
                "text": "Listen: hot. What sound do you hear in the middle?",
                "pause": 4000
          },
          {
                "text": "Yes! /o/. Try another: pot. What's the middle sound?",
                "pause": 4000
          },
          {
                "text": "Let's blend the -ot family. h-ot, hot.",
                "pause": 3000
          },
          {
                "text": "p-ot, pot.",
                "pause": 3000
          },
          {
                "text": "d-ot, dot.",
                "pause": 3000
          },
          {
                "text": "n-ot, not.",
                "pause": 3500
          },
          {
                "text": "g-ot, got.",
                "pause": 3500
          },
          {
                "text": "Break hot into sounds: /h/ /o/ /t/. You try.",
                "pause": 4000
          },
          {
                "text": "Great! Now segment pot. Say it slowly.",
                "pause": 4000
          },
          {
                "text": "Perfect! /p/ /o/ /t/. Put it together: pot.",
                "pause": 3000
          },
          {
                "text": "If you hear short O, repeat it. If not, stay quiet. Hot.",
                "pause": 3000
          },
          {
                "text": "Hat.",
                "pause": 2500
          },
          {
                "text": "Dot.",
                "pause": 3000
          },
          {
                "text": "Dit.",
                "pause": 2500
          },
          {
                "text": "Start with hot. Change /h/ to /p/. New word?",
                "pause": 4000
          },
          {
                "text": "That's right — pot! Now dot. Change /d/ to /n/. What word?",
                "pause": 4000
          },
          {
                "text": "Not! Changing one sound makes a whole new word!",
                "pause": 2000
          },
          {
                "text": "Listen: Tom has a hot pot. He got a dot on the top.",
                "pause": 2000
          },
          {
                "text": "You read: Tom has a hot pot.",
                "pause": 4000
          },
          {
                "text": "Now: The pot is not in the box.",
                "pause": 4000
          },
          {
                "text": "Great job! You learned the short O sound and -ot words like hot, pot, dot, not, and got. Click the speaker to practice again!",
                "pause": 1500
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 4
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. Yesterday we learned -ot words. Today: -op and -og families with short O!",
                "pause": 2000
          },
          {
                "text": "Warm up! Say /o/.",
                "pause": 3000
          },
          {
                "text": "Say these -ot words: hot, pot, dot. Go!",
                "pause": 3500
          },
          {
                "text": "Great! Now two more short O families.",
                "pause": 1500
          },
          {
                "text": "Listen: hop. What vowel sound?",
                "pause": 4000
          },
          {
                "text": "Yes! /o/. Now: dog. What vowel sound?",
                "pause": 4000
          },
          {
                "text": "Blend -op words. h-op, hop.",
                "pause": 3000
          },
          {
                "text": "m-op, mop.",
                "pause": 3000
          },
          {
                "text": "t-op, top.",
                "pause": 3000
          },
          {
                "text": "Now -og. d-og, dog.",
                "pause": 3500
          },
          {
                "text": "l-og, log.",
                "pause": 3500
          },
          {
                "text": "f-og, fog.",
                "pause": 3500
          },
          {
                "text": "Segment mop: /m/ /o/ /p/. You try.",
                "pause": 4000
          },
          {
                "text": "Good! Now dog. Say each sound.",
                "pause": 4000
          },
          {
                "text": "Perfect! /d/ /o/ /g/. Together: dog.",
                "pause": 3000
          },
          {
                "text": "Repeat if short O. Hop.",
                "pause": 3000
          },
          {
                "text": "Hip.",
                "pause": 2500
          },
          {
                "text": "Log.",
                "pause": 3000
          },
          {
                "text": "Say hop. Now say it without /h/. What's left?",
                "pause": 4000
          },
          {
                "text": "That's right — op! Now dog without /d/.",
                "pause": 4000
          },
          {
                "text": "Listen: The dog will hop on top of the log. Mom will mop in the fog.",
                "pause": 2000
          },
          {
                "text": "You read: The dog will hop on top of the log.",
                "pause": 4000
          },
          {
                "text": "Now: Bob has a mop and a big dog.",
                "pause": 4000
          },
          {
                "text": "Excellent! Lots of short O words there.",
                "pause": 2000
          },
          {
                "text": "Great work! You learned -op words like hop, mop, and top, plus -og words like dog, log, and fog. Keep practicing!",
                "pause": 1500
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 4
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. More short O families today: -ob and -ox. Let's learn!",
                "pause": 2000
          },
          {
                "text": "Quick warm-up. Say /o/.",
                "pause": 3000
          },
          {
                "text": "Say: hot, hop, dog. Go!",
                "pause": 3500
          },
          {
                "text": "Perfect! Now two more families.",
                "pause": 1500
          },
          {
                "text": "Listen: sob. What vowel sound?",
                "pause": 4000
          },
          {
                "text": "Yes! /o/. Now: box. What vowel?",
                "pause": 4000
          },
          {
                "text": "Blend -ob. s-ob, sob.",
                "pause": 3000
          },
          {
                "text": "r-ob, rob.",
                "pause": 3000
          },
          {
                "text": "c-ob, cob.",
                "pause": 3000
          },
          {
                "text": "Now -ox. b-ox, box.",
                "pause": 3500
          },
          {
                "text": "f-ox, fox.",
                "pause": 3500
          },
          {
                "text": "ox.",
                "pause": 3500
          },
          {
                "text": "Segment rob: /r/ /o/ /b/. You try.",
                "pause": 4000
          },
          {
                "text": "Good! Now fox. Say each sound.",
                "pause": 4000
          },
          {
                "text": "Nice! /f/ /o/ /ks/. Together: fox.",
                "pause": 3000
          },
          {
                "text": "Repeat if short O. Bob.",
                "pause": 3000
          },
          {
                "text": "Bib.",
                "pause": 2500
          },
          {
                "text": "Box.",
                "pause": 3000
          },
          {
                "text": "Start with sob. Change /s/ to /r/. New word?",
                "pause": 4000
          },
          {
                "text": "Rob! Now box. Change /b/ to /f/. What word?",
                "pause": 4000
          },
          {
                "text": "Fox! Great sound changing!",
                "pause": 2000
          },
          {
                "text": "Listen: Rob got a box. The fox ran to the log. Bob will not sob.",
                "pause": 2000
          },
          {
                "text": "You read: Rob got a box.",
                "pause": 4000
          },
          {
                "text": "Now: The fox sat on top of the box.",
                "pause": 4000
          },
          {
                "text": "Awesome! You learned -ob words like sob, rob, and cob, plus -ox words like box, fox, and ox. Practice these!",
                "pause": 1500
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 4
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. Today we practice all short O families with fluency. Let's read smoothly!",
                "pause": 2000
          },
          {
                "text": "Say /o/.",
                "pause": 3000
          },
          {
                "text": "Great! Now we'll read fast and smooth.",
                "pause": 1500
          },
          {
                "text": "-ot words: hot, pot, dot, not, got. Go!",
                "pause": 3000
          },
          {
                "text": "-op words: hop, mop, top, pop. Say them!",
                "pause": 3000
          },
          {
                "text": "-og words: dog, log, fog, hog. Your turn!",
                "pause": 3000
          },
          {
                "text": "-ob and -ox: sob, rob, cob, box, fox, ox. Go!",
                "pause": 3500
          },
          {
                "text": "Phrases with rhythm. Listen: The hot dog | sat on top. You try.",
                "pause": 4000
          },
          {
                "text": "Tom got the mop | from the box. Say it.",
                "pause": 4000
          },
          {
                "text": "The fox will hop | on the log. Go!",
                "pause": 4000
          },
          {
                "text": "Rob has a pot | and a big dog. Read it!",
                "pause": 4000
          },
          {
                "text": "Good rhythm! You're grouping words well.",
                "pause": 2000
          },
          {
                "text": "Passage time. Listen: Tom has a big dog named Bob. Bob will hop on the log. Tom got a mop from the box. The fox sat on top in the hot fog.",
                "pause": 3000
          },
          {
                "text": "You read: Tom has a big dog named Bob. Bob will hop on the log.",
                "pause": 5000
          },
          {
                "text": "Again smoother: Tom got a mop from the box. The fox sat on top in the hot fog.",
                "pause": 5000
          },
          {
                "text": "Sight words. Say: do.",
                "pause": 2000
          },
          {
                "text": "no.",
                "pause": 2000
          },
          {
                "text": "go.",
                "pause": 2000
          },
          {
                "text": "so.",
                "pause": 2000
          },
          {
                "text": "of.",
                "pause": 2000
          },
          {
                "text": "Read with excitement: The dog got the fox! Say it!",
                "pause": 3000
          },
          {
                "text": "Now surprised: Is that a hot pot?!",
                "pause": 3000
          },
          {
                "text": "Perfect expression!",
                "pause": 2000
          },
          {
                "text": "Fantastic! You can read all short O families smoothly: -ot, -op, -og, -ob, and -ox. Tomorrow is assessment day!",
                "pause": 1500
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 4
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! Week 4 assessment. Show me what you learned about short O. Do your best!",
                "pause": 2000
          },
          {
                "text": "Words, a passage, and sight words. Take your time. Ready?",
                "pause": 2000
          },
          {
                "text": "Read each word. Hot.",
                "pause": 3500
          },
          {
                "text": "Pot.",
                "pause": 3500
          },
          {
                "text": "Dot.",
                "pause": 3500
          },
          {
                "text": "Not.",
                "pause": 3500
          },
          {
                "text": "Got.",
                "pause": 3500
          },
          {
                "text": "Hop.",
                "pause": 3500
          },
          {
                "text": "Mop.",
                "pause": 3500
          },
          {
                "text": "Top.",
                "pause": 3500
          },
          {
                "text": "Pop.",
                "pause": 3500
          },
          {
                "text": "Stop.",
                "pause": 3500
          },
          {
                "text": "Dog.",
                "pause": 3500
          },
          {
                "text": "Log.",
                "pause": 3500
          },
          {
                "text": "Fog.",
                "pause": 3500
          },
          {
                "text": "Hog.",
                "pause": 3500
          },
          {
                "text": "Sob.",
                "pause": 3500
          },
          {
                "text": "Rob.",
                "pause": 3500
          },
          {
                "text": "Cob.",
                "pause": 3500
          },
          {
                "text": "Box.",
                "pause": 3500
          },
          {
                "text": "Fox.",
                "pause": 3500
          },
          {
                "text": "Ox.",
                "pause": 3500
          },
          {
                "text": "Read this: Tom has a big dog. The dog will hop on the log. Tom got a mop from the box. The fox ran in the hot fog. Rob will not sob. Now you read it.",
                "pause": 30000
          },
          {
                "text": "Say: do.",
                "pause": 2000
          },
          {
                "text": "no.",
                "pause": 2000
          },
          {
                "text": "go.",
                "pause": 2000
          },
          {
                "text": "so.",
                "pause": 2000
          },
          {
                "text": "of.",
                "pause": 2000
          },
          {
                "text": "What does Tom have?",
                "pause": 5000
          },
          {
                "text": "Where did the dog hop?",
                "pause": 5000
          },
          {
                "text": "Say a sentence with a short O word. Example: 'The dog sat in the box.' Your turn.",
                "pause": 15000
          },
          {
                "text": "Excellent! You learned -ot, -op, -og, -ob, and -ox families. That's 20+ short O words! Next week: short U!",
                "pause": 2000
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="4"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek4Lesson(day);
    }
  });
}
