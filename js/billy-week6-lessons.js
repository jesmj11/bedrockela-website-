/**
 * Week 6 Mini-Lessons: all short vowels
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: all families
 * Sight words: can, has, like, see
 */

class BillyWeek6Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 6 lesson scripts
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
    // Day 1 — Week 6
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! I'm Billy. This week we review ALL the short vowels we learned. Today: short A and short E!",
                "pause": 2000
          },
          {
                "text": "Say the short A sound: /a/.",
                "pause": 3000
          },
          {
                "text": "Now short E: /e/.",
                "pause": 3000
          },
          {
                "text": "Great! Let's practice telling them apart.",
                "pause": 1500
          },
          {
                "text": "I'll say a word. Tell me if it has /a/ or /e/. Cat. Which vowel?",
                "pause": 4000
          },
          {
                "text": "Bed. Which vowel sound?",
                "pause": 4000
          },
          {
                "text": "Hat. /a/ or /e/?",
                "pause": 4000
          },
          {
                "text": "Net. Which one?",
                "pause": 4000
          },
          {
                "text": "Pan. Tell me.",
                "pause": 4000
          },
          {
                "text": "Ten. Which vowel?",
                "pause": 4000
          },
          {
                "text": "Let's change vowels. Say cat. Now change /a/ to /e/. What word?",
                "pause": 4000
          },
          {
                "text": "You made 'cet'? Actually, try: bat. Change /a/ to /e/.",
                "pause": 4000
          },
          {
                "text": "Bet! Now: pan. Change /a/ to /e/.",
                "pause": 4000
          },
          {
                "text": "Pen! Great vowel switching!",
                "pause": 2000
          },
          {
                "text": "I'll give you word parts. You blend them. Blend: c-a-t.",
                "pause": 3500
          },
          {
                "text": "Blend: b-e-d.",
                "pause": 3500
          },
          {
                "text": "Blend: m-a-n.",
                "pause": 3500
          },
          {
                "text": "Blend: t-e-n.",
                "pause": 3500
          },
          {
                "text": "Read these words. I'll say them, you repeat: cat, bet, man, pen.",
                "pause": 4000
          },
          {
                "text": "Now: ham, red, tag, hen.",
                "pause": 4000
          },
          {
                "text": "Good! Now sentence: The cat sat on a red bed.",
                "pause": 4000
          },
          {
                "text": "One more: Ten men ran and had ham.",
                "pause": 4000
          },
          {
                "text": "Which words had short A? Say them: cat, man, ham, tag, ran, had.",
                "pause": 4000
          },
          {
                "text": "Which had short E? Bet, pen, red, hen, men, ten, bed.",
                "pause": 4000
          },
          {
                "text": "Excellent! You can tell the difference between short A and short E. Tomorrow we'll practice short I and O!",
                "pause": 1500
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 6
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. Today we review short I and short O!",
                "pause": 2000
          },
          {
                "text": "Say short I: /i/.",
                "pause": 3000
          },
          {
                "text": "Now short O: /o/.",
                "pause": 3000
          },
          {
                "text": "Let's practice telling them apart!",
                "pause": 1500
          },
          {
                "text": "Which vowel? Sit. /i/ or /o/?",
                "pause": 4000
          },
          {
                "text": "Hot. Which one?",
                "pause": 4000
          },
          {
                "text": "Big. /i/ or /o/?",
                "pause": 4000
          },
          {
                "text": "Pot. Tell me.",
                "pause": 4000
          },
          {
                "text": "Pin. Which vowel?",
                "pause": 4000
          },
          {
                "text": "Dog. /i/ or /o/?",
                "pause": 4000
          },
          {
                "text": "Change vowels. Say hit. Change /i/ to /o/. What word?",
                "pause": 4000
          },
          {
                "text": "Hot! Now: pit. Change /i/ to /o/.",
                "pause": 4000
          },
          {
                "text": "Pot! Now: big. Change /i/ to /o/.",
                "pause": 4000
          },
          {
                "text": "Bog! Great switching!",
                "pause": 2000
          },
          {
                "text": "Blend: s-i-t.",
                "pause": 3500
          },
          {
                "text": "Blend: d-o-g.",
                "pause": 3500
          },
          {
                "text": "Blend: p-i-n.",
                "pause": 3500
          },
          {
                "text": "Blend: l-o-g.",
                "pause": 3500
          },
          {
                "text": "Read: sit, hot, pin, dog.",
                "pause": 4000
          },
          {
                "text": "Now: big, mop, dig, fox.",
                "pause": 4000
          },
          {
                "text": "Sentence: The big dog sat on the log.",
                "pause": 4000
          },
          {
                "text": "One more: Kim will dig a pit in the hot sun.",
                "pause": 4000
          },
          {
                "text": "Short I words: sit, pin, big, dig, Kim, pit.",
                "pause": 4000
          },
          {
                "text": "Short O words: hot, dog, mop, fox, log, on.",
                "pause": 4000
          },
          {
                "text": "Perfect! You know the difference between short I and O. Tomorrow: short U and ALL vowels!",
                "pause": 1500
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 6
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. Today: short U plus ALL five short vowels together!",
                "pause": 2000
          },
          {
                "text": "Say all five: /a/, /e/, /i/, /o/, /u/.",
                "pause": 4000
          },
          {
                "text": "Great! Let's make sure you know them all.",
                "pause": 1500
          },
          {
                "text": "Which vowel? Cat.",
                "pause": 3500
          },
          {
                "text": "Bed.",
                "pause": 3500
          },
          {
                "text": "Sit.",
                "pause": 3500
          },
          {
                "text": "Hot.",
                "pause": 3500
          },
          {
                "text": "Bug.",
                "pause": 3500
          },
          {
                "text": "Run.",
                "pause": 3500
          },
          {
                "text": "Pet.",
                "pause": 3500
          },
          {
                "text": "Top.",
                "pause": 3500
          },
          {
                "text": "Big.",
                "pause": 3500
          },
          {
                "text": "Fan.",
                "pause": 3500
          },
          {
                "text": "Change vowels. Start with 'bat'. Change /a/ to /u/. What word?",
                "pause": 4000
          },
          {
                "text": "But! Now 'pet'. Change /e/ to /i/.",
                "pause": 4000
          },
          {
                "text": "Pit! Now 'hot'. Change /o/ to /i/.",
                "pause": 4000
          },
          {
                "text": "Hit! You're a vowel expert!",
                "pause": 2000
          },
          {
                "text": "Read all vowels: cat, bed, sit, hot, bug.",
                "pause": 4000
          },
          {
                "text": "More: run, pen, big, mop, ham.",
                "pause": 4000
          },
          {
                "text": "Sentence: The cat and dog sat on the rug.",
                "pause": 4000
          },
          {
                "text": "Harder: Tim will run to get the big red bus.",
                "pause": 5000
          },
          {
                "text": "Excellent reading!",
                "pause": 2000
          },
          {
                "text": "Name all five short vowels: A, E, I, O, U.",
                "pause": 3000
          },
          {
                "text": "Perfect! You mastered all the short vowel sounds!",
                "pause": 2000
          },
          {
                "text": "Tomorrow we practice capitals and periods. Great work!",
                "pause": 1500
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 6
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! It's Billy. Today something new: capitals and periods! These help us read better.",
                "pause": 2000
          },
          {
                "text": "Capitals are BIG letters at the start. Periods are dots at the end.",
                "pause": 2000
          },
          {
                "text": "Let's learn when to use them!",
                "pause": 1500
          },
          {
                "text": "Every sentence starts with a capital letter. Listen: The cat sat.",
                "pause": 2000
          },
          {
                "text": "Hear how 'The' starts the sentence? It gets a capital T.",
                "pause": 2000
          },
          {
                "text": "Listen to more: Big dogs run fast. Capital B starts it.",
                "pause": 2000
          },
          {
                "text": "Sam has a pet. Capital S for Sam's name AND the sentence start.",
                "pause": 2000
          },
          {
                "text": "Names ALWAYS get capitals. Tom, Kim, Ben - all capitals!",
                "pause": 2000
          },
          {
                "text": "Every sentence ends with a period. It's a stop sign for reading.",
                "pause": 2000
          },
          {
                "text": "Listen: The bug is red. Hear the stop? That's the period.",
                "pause": 2000
          },
          {
                "text": "Without periods, we wouldn't know where to pause!",
                "pause": 2000
          },
          {
                "text": "Listen: I can run. I can hop. I can jump. Hear three stops? Three periods!",
                "pause": 3000
          },
          {
                "text": "I'll read sentences. Count the periods. Ready? Tom has a dog. Kim has a cat.",
                "pause": 4000
          },
          {
                "text": "Two periods! Now: The sun is hot.",
                "pause": 3000
          },
          {
                "text": "One period! Now tell me: should 'cat' have a capital if it starts a sentence?",
                "pause": 4000
          },
          {
                "text": "Yes! Now: does 'Ben' need a capital?",
                "pause": 3000
          },
          {
                "text": "Yes, because it's a name! Great job!",
                "pause": 2000
          },
          {
                "text": "I'll read with capitals and periods. Listen: The big cat ran. Tom got the pet.",
                "pause": 3000
          },
          {
                "text": "Now you read, and pause at periods: Sam has a red hat. Kim can run fast.",
                "pause": 5000
          },
          {
                "text": "Good pausing! One more: Ben and Pam sat on the rug. The dog is big.",
                "pause": 5000
          },
          {
                "text": "Perfect! You're reading like a pro!",
                "pause": 2000
          },
          {
                "text": "Remember: Capital letters start sentences and names.",
                "pause": 2000
          },
          {
                "text": "Periods end sentences and tell us to pause.",
                "pause": 2000
          },
          {
                "text": "Tomorrow: big assessment for Week 6! You're ready!",
                "pause": 1500
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 6
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi! Week 6 assessment. This is the BIG one - all five short vowels mixed together!",
                "pause": 2000
          },
          {
                "text": "Words, sentences, capitals, periods. You've got this! Ready?",
                "pause": 2000
          },
          {
                "text": "Read each word. Cat.",
                "pause": 3500
          },
          {
                "text": "Bed.",
                "pause": 3500
          },
          {
                "text": "Sit.",
                "pause": 3500
          },
          {
                "text": "Hot.",
                "pause": 3500
          },
          {
                "text": "Bug.",
                "pause": 3500
          },
          {
                "text": "Pan.",
                "pause": 3500
          },
          {
                "text": "Net.",
                "pause": 3500
          },
          {
                "text": "Big.",
                "pause": 3500
          },
          {
                "text": "Mop.",
                "pause": 3500
          },
          {
                "text": "Sun.",
                "pause": 3500
          },
          {
                "text": "Hat.",
                "pause": 3500
          },
          {
                "text": "Pet.",
                "pause": 3500
          },
          {
                "text": "Dig.",
                "pause": 3500
          },
          {
                "text": "Fox.",
                "pause": 3500
          },
          {
                "text": "Rug.",
                "pause": 3500
          },
          {
                "text": "Man.",
                "pause": 3500
          },
          {
                "text": "Ten.",
                "pause": 3500
          },
          {
                "text": "Win.",
                "pause": 3500
          },
          {
                "text": "Log.",
                "pause": 3500
          },
          {
                "text": "Cut.",
                "pause": 3500
          },
          {
                "text": "Tag.",
                "pause": 3500
          },
          {
                "text": "Red.",
                "pause": 3500
          },
          {
                "text": "Zip.",
                "pause": 3500
          },
          {
                "text": "Box.",
                "pause": 3500
          },
          {
                "text": "Hum.",
                "pause": 3500
          },
          {
                "text": "Read this passage. Remember capitals and periods: Tom has a big red dog. The dog will run and jump in the hot sun. Kim has a pet cat. The cat sat on a soft rug in the den. Ben cut a nut and put it in a cup. Now you read it.",
                "pause": 40000
          },
          {
                "text": "How many sentences were in that passage?",
                "pause": 5000
          },
          {
                "text": "What was the capital letter at the very start?",
                "pause": 4000
          },
          {
                "text": "Did you pause at every period?",
                "pause": 3000
          },
          {
                "text": "Tell me one word with each vowel. Give me a short A word, then E, then I, then O, then U.",
                "pause": 15000
          },
          {
                "text": "Fantastic! You know ALL five short vowels!",
                "pause": 2000
          },
          {
                "text": "Next week we start something NEW: digraphs like SH and CH!",
                "pause": 2000
          },
          {
                "text": "You should be so proud. Great work on Weeks 1-6!",
                "pause": 1500
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="6"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek6Lesson(day);
    }
  });
}
