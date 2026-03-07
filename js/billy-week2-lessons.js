/**
 * Week 2 Mini-Lessons: Short /e/ Sound
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: -et, -en, -eg, -ed, -eb families
 * Sight words: the, is, to, he, me
 */

class BillyWeek2Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 2 lesson scripts
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
    // Day 1 — Intro to short /e/ (‑et family focus)
    // Total ≈ 5:00
    return [
      {
        text: "Hi — I'm Billy. This week we'll learn the short e sound /e/ like in bed. Ready? Let's go.",
        pause: 1500
      },
      {
        text: "Listen and say /e/. Ready? /e/.",
        pause: 2000
      },
      {
        text: "Again: /e/. Make a short sound — not /ee/ — just /e/.",
        pause: 2000
      },
      {
        text: "I'll say parts then the whole word. p — et — pet.",
        pause: 2000
      },
      {
        text: "n — et — net.",
        pause: 2000
      },
      {
        text: "b — et — bet.",
        pause: 2000
      },
      {
        text: "s — et — set.",
        pause: 2000
      },
      {
        text: "Say the sounds in a word slowly with me. Word: pet. Sounds: p — /e/ — t. Now say pet.",
        pause: 2500
      },
      {
        text: "Word: set. Sounds: s — /e/ — t. Now say set.",
        pause: 2500
      },
      {
        text: "I will say words. If the word has the short /e/ sound like in bed, say it with me. Sit.",
        pause: 1500
      },
      {
        text: "pet.",
        pause: 1500
      },
      {
        text: "pot.",
        pause: 1500
      },
      {
        text: "set.",
        pause: 1500
      },
      {
        text: "Ben has a red net he uses to catch bugs.",
        pause: 2000
      },
      {
        text: "Now you read: 'Ben has a red net.'",
        pause: 4000
      },
      {
        text: "Say: Ben — has — a — red — net.",
        pause: 3000
      },
      {
        text: "Today's sight word: the. Say the word: the.",
        pause: 2000
      },
      {
        text: "Great! Replay any part or move on to practice.",
        pause: 1000
      }
    ];
  }

  getDay2Script() {
    // Day 2 — Expand rimes (-en, -eg) and sight word practice
    // Total ≈ 5:00
    return [
      {
        text: "Hi — let's warm up with /e/. Say /e/.",
        pause: 1500
      },
      {
        text: "Quick review: p — et — pet.",
        pause: 1500
      },
      {
        text: "n — et — net.",
        pause: 1500
      },
      {
        text: "b — et — bet.",
        pause: 1500
      },
      {
        text: "Listen: h — en — hen.",
        pause: 2000
      },
      {
        text: "m — en — men.",
        pause: 2000
      },
      {
        text: "l — eg — leg.",
        pause: 2000
      },
      {
        text: "b — eg — beg.",
        pause: 2000
      },
      {
        text: "Hear how /e/ stays the same.",
        pause: 1500
      },
      {
        text: "Rime -en: put onsets in your head and say the word. p — en.",
        pause: 2000
      },
      {
        text: "r — en.",
        pause: 2000
      },
      {
        text: "t — en.",
        pause: 2000
      },
      {
        text: "Jen had a little hen that liked to peck.",
        pause: 2000
      },
      {
        text: "Read: 'Jen has a hen.'",
        pause: 4000
      },
      {
        text: "Jen — has — a — hen.",
        pause: 2500
      },
      {
        text: "Today's sight word: is. Say: is.",
        pause: 2000
      },
      {
        text: "Nice work — you can replay if you want more practice.",
        pause: 1000
      }
    ];
  }

  getDay3Script() {
    // Day 3 — More families (-ed, -eb) + sentence building
    // Total ≈ 5:00
    return [
      {
        text: "Hi — say /e/ to start.",
        pause: 1500
      },
      {
        text: "Quick review: pet.",
        pause: 1000
      },
      {
        text: "net.",
        pause: 1000
      },
      {
        text: "hen.",
        pause: 1000
      },
      {
        text: "leg.",
        pause: 1000
      },
      {
        text: "bed.",
        pause: 1000
      },
      {
        text: "b — ed — bed.",
        pause: 2000
      },
      {
        text: "w — eb — web.",
        pause: 2000
      },
      {
        text: "Say: bed.",
        pause: 1500
      },
      {
        text: "Say: web.",
        pause: 1500
      },
      {
        text: "I'll say three words — repeat them: bed — hen — leg.",
        pause: 2500
      },
      {
        text: "Now say a sentence: 'He sat on a bed.' Say it now.",
        pause: 4000
      },
      {
        text: "Ted had a red bed in his den.",
        pause: 2000
      },
      {
        text: "Read: 'Ted sat on the bed.'",
        pause: 4000
      },
      {
        text: "Ted — sat — on — the — bed.",
        pause: 2500
      },
      {
        text: "Sight word today: to. Say: to.",
        pause: 2000
      },
      {
        text: "Great! Try the lesson again to practice more words with /e/.",
        pause: 1000
      }
    ];
  }

  getDay4Script() {
    // Day 4 — Fluency & connected text (phrase reading)
    // Total ≈ 5–6:00
    return [
      {
        text: "Today we read smoothly. Say /e/.",
        pause: 1500
      },
      {
        text: "Listen and copy my rhythm: 'Jen and Ben | sat on a bed.'",
        pause: 3000
      },
      {
        text: "Try: 'The hen | pecks at the seeds.'",
        pause: 3000
      },
      {
        text: "Ben and Jen went to the den. They saw the hen near the net. Ben picked up a small red web toy and put it in the bed.",
        pause: 4000
      },
      {
        text: "Now read this short sentence: 'Ben and Jen sat on the bed.'",
        pause: 4000
      },
      {
        text: "Ben — and — Jen — sat — on — the — bed.",
        pause: 3000
      },
      {
        text: "We'll say a sentence three times: 'The hen pecks at the seeds.' Say it with me twice.",
        pause: 2000
      },
      {
        text: "The hen pecks at the seeds.",
        pause: 2500
      },
      {
        text: "The hen pecks at the seeds.",
        pause: 2500
      },
      {
        text: "Say these: the.",
        pause: 1500
      },
      {
        text: "is.",
        pause: 1500
      },
      {
        text: "to.",
        pause: 1500
      },
      {
        text: "Nice reading — replay to build more speed.",
        pause: 1000
      }
    ];
  }

  getDay5Script() {
    // Day 5 — Check & apply (list read, short passage, speaking prompt)
    // Total ≈ 5–6:00
    return [
      {
        text: "It's review day — do your best and speak clearly.",
        pause: 1500
      },
      {
        text: "Listen and repeat these words. pet.",
        pause: 1500
      },
      {
        text: "net.",
        pause: 1500
      },
      {
        text: "set.",
        pause: 1500
      },
      {
        text: "bet.",
        pause: 1500
      },
      {
        text: "yet.",
        pause: 1500
      },
      {
        text: "hen.",
        pause: 1500
      },
      {
        text: "pen.",
        pause: 1500
      },
      {
        text: "men.",
        pause: 1500
      },
      {
        text: "den.",
        pause: 1500
      },
      {
        text: "ten.",
        pause: 1500
      },
      {
        text: "leg.",
        pause: 1500
      },
      {
        text: "beg.",
        pause: 1500
      },
      {
        text: "peg.",
        pause: 1500
      },
      {
        text: "bed.",
        pause: 1500
      },
      {
        text: "fed.",
        pause: 1500
      },
      {
        text: "web.",
        pause: 1500
      },
      {
        text: "let.",
        pause: 1500
      },
      {
        text: "wet.",
        pause: 1500
      },
      {
        text: "met.",
        pause: 1500
      },
      {
        text: "red.",
        pause: 1500
      },
      {
        text: "Ben had a small hen. The hen sat on a red bed. Ben fed the hen at ten each day.",
        pause: 3000
      },
      {
        text: "Now read that same passage out loud.",
        pause: 30000
      },
      {
        text: "Who sat on the bed?",
        pause: 3000
      },
      {
        text: "What did Ben feed the hen?",
        pause: 3000
      },
      {
        text: "Tell me one sentence about Ben or Jen using a short‑e word. For example: 'The hen sat on the bed.' Say your sentence now.",
        pause: 15000
      },
      {
        text: "Say these words: the.",
        pause: 1500
      },
      {
        text: "is.",
        pause: 1500
      },
      {
        text: "to.",
        pause: 1500
      },
      {
        text: "he.",
        pause: 1500
      },
      {
        text: "me.",
        pause: 1500
      },
      {
        text: "Great week! Replay any part if you want more practice.",
        pause: 1000
      }
    ];
  }
}

// Make available globally
window.BillyWeek2Lesson = BillyWeek2Lesson;
