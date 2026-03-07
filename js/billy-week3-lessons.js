/**
 * Week 3 Mini-Lessons: Short /i/ Sound
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: -it, -in, -ig, -ip, -id, -ick families
 * Sight words: I, my, is, in, it
 */

class BillyWeek3Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 3 lesson scripts
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
    // Day 1 — Intro to short /i/ (‑it family focus)
    // Total ≈ 5:00
    return [
      {
        text: "Hi — I'm Billy. This week we learn the short i sound /i/ like in sit. Ready? Let's go.",
        pause: 1500
      },
      {
        text: "Listen and say /i/. Ready? /i/.",
        pause: 2000
      },
      {
        text: "Again: /i/. Make a short sound — not /eye/ — just /i/.",
        pause: 2000
      },
      {
        text: "I'll say the first part, then the rime, then the whole word. s — it — sit.",
        pause: 2000
      },
      {
        text: "b — it — bit.",
        pause: 2000
      },
      {
        text: "h — it — hit.",
        pause: 2000
      },
      {
        text: "f — it — fit.",
        pause: 2000
      },
      {
        text: "Say the sounds slowly with me: Word: sit. Sounds: s — /i/ — t. Now say sit.",
        pause: 2500
      },
      {
        text: "Word: bit. Sounds: b — /i/ — t. Now say bit.",
        pause: 2500
      },
      {
        text: "I'll say words. If the word has the short /i/ sound like in sit, say it with me. sat.",
        pause: 1500
      },
      {
        text: "sit.",
        pause: 1500
      },
      {
        text: "sot.",
        pause: 1500
      },
      {
        text: "fit.",
        pause: 1500
      },
      {
        text: "Tim has a small tin to keep bits.",
        pause: 2000
      },
      {
        text: "Now you read: 'Tim has a tin.'",
        pause: 4000
      },
      {
        text: "Tim — has — a — tin.",
        pause: 3000
      },
      {
        text: "Today's sight word: I. Say: I.",
        pause: 2000
      },
      {
        text: "Nice job — replay any line to practice more.",
        pause: 1000
      }
    ];
  }

  getDay2Script() {
    // Day 2 — Expand rimes (-in, -ig) and sight word practice
    // Total ≈ 5:00
    return [
      {
        text: "Hi — say /i/ to warm up.",
        pause: 1500
      },
      {
        text: "Quick review: s — it — sit.",
        pause: 1500
      },
      {
        text: "b — it — bit.",
        pause: 1500
      },
      {
        text: "h — it — hit.",
        pause: 1500
      },
      {
        text: "Listen: f — in — fin.",
        pause: 2000
      },
      {
        text: "p — in — pin.",
        pause: 2000
      },
      {
        text: "p — ig — pig.",
        pause: 2000
      },
      {
        text: "d — ig — dig.",
        pause: 2000
      },
      {
        text: "Hear how /i/ stays the same.",
        pause: 1500
      },
      {
        text: "Rime -in: put onsets in your head and say the word: c — in.",
        pause: 2000
      },
      {
        text: "r — in.",
        pause: 2000
      },
      {
        text: "t — in.",
        pause: 2000
      },
      {
        text: "Jill saw a small pig near the tin.",
        pause: 2000
      },
      {
        text: "Read: 'Jill has a pig.'",
        pause: 4000
      },
      {
        text: "Jill — has — a — pig.",
        pause: 2500
      },
      {
        text: "Sight word today: my. Say: my.",
        pause: 2000
      },
      {
        text: "Good work — replay if you want extra practice.",
        pause: 1000
      }
    ];
  }

  getDay3Script() {
    // Day 3 — More families (-ip, -id, -ick) + sentence building
    // Total ≈ 5:00
    return [
      {
        text: "Hi — say /i/ with me.",
        pause: 1500
      },
      {
        text: "Quick list: sit.",
        pause: 1000
      },
      {
        text: "bit.",
        pause: 1000
      },
      {
        text: "fin.",
        pause: 1000
      },
      {
        text: "pig.",
        pause: 1000
      },
      {
        text: "pin.",
        pause: 1000
      },
      {
        text: "t — ip — tip.",
        pause: 2000
      },
      {
        text: "l — id — lid.",
        pause: 2000
      },
      {
        text: "p — ick — pick.",
        pause: 2000
      },
      {
        text: "Say: tip.",
        pause: 1500
      },
      {
        text: "Say: lid.",
        pause: 1500
      },
      {
        text: "Say: pick.",
        pause: 1500
      },
      {
        text: "I'll say three words — repeat them: tip — lid — pick.",
        pause: 2500
      },
      {
        text: "Now say a sentence: 'I pick up a lid.' Say it now.",
        pause: 4000
      },
      {
        text: "Nick can pick a stick to fix his tin.",
        pause: 2000
      },
      {
        text: "Read: 'Nick can pick a stick.'",
        pause: 4000
      },
      {
        text: "Nick — can — pick — a — stick.",
        pause: 2500
      },
      {
        text: "Sight word today: is. Say: is.",
        pause: 2000
      },
      {
        text: "Great — try to say five short‑i words aloud now.",
        pause: 1000
      }
    ];
  }

  getDay4Script() {
    // Day 4 — Fluency & connected text (phrase reading)
    // Total ≈ 5–6:00
    return [
      {
        text: "Today we read in phrases. Say /i/ to warm up.",
        pause: 1500
      },
      {
        text: "Listen and copy my rhythm: 'Nick | can pick | a stick.'",
        pause: 3000
      },
      {
        text: "Try: 'I put | it in | my tin.'",
        pause: 3000
      },
      {
        text: "Nick had a tin with bits. He had a stick to fix a toy. He would pick up the stick and dig a bit in the sand.",
        pause: 4000
      },
      {
        text: "Now read this short sentence: 'I put it in my tin.'",
        pause: 4000
      },
      {
        text: "I — put — it — in — my — tin.",
        pause: 3000
      },
      {
        text: "We'll say a sentence twice: 'The pig will dig in the sand.' Say it with me.",
        pause: 2000
      },
      {
        text: "The pig will dig in the sand.",
        pause: 2500
      },
      {
        text: "The pig will dig in the sand.",
        pause: 2500
      },
      {
        text: "Say these: I.",
        pause: 1500
      },
      {
        text: "my.",
        pause: 1500
      },
      {
        text: "is.",
        pause: 1500
      },
      {
        text: "in.",
        pause: 1500
      },
      {
        text: "it.",
        pause: 1500
      },
      {
        text: "Nice work — replay to build speed.",
        pause: 1000
      }
    ];
  }

  getDay5Script() {
    // Day 5 — Check & apply (list read, short passage, speaking prompt)
    // Total ≈ 5–6:00
    return [
      {
        text: "It's review day — speak clearly and do your best.",
        pause: 1500
      },
      {
        text: "Listen and repeat these words. sit.",
        pause: 1500
      },
      {
        text: "bit.",
        pause: 1500
      },
      {
        text: "hit.",
        pause: 1500
      },
      {
        text: "fit.",
        pause: 1500
      },
      {
        text: "kit.",
        pause: 1500
      },
      {
        text: "pin.",
        pause: 1500
      },
      {
        text: "fin.",
        pause: 1500
      },
      {
        text: "tin.",
        pause: 1500
      },
      {
        text: "bin.",
        pause: 1500
      },
      {
        text: "win.",
        pause: 1500
      },
      {
        text: "pig.",
        pause: 1500
      },
      {
        text: "dig.",
        pause: 1500
      },
      {
        text: "wig.",
        pause: 1500
      },
      {
        text: "big.",
        pause: 1500
      },
      {
        text: "rid.",
        pause: 1500
      },
      {
        text: "lid.",
        pause: 1500
      },
      {
        text: "pick.",
        pause: 1500
      },
      {
        text: "kick.",
        pause: 1500
      },
      {
        text: "stick.",
        pause: 1500
      },
      {
        text: "Nick had a small tin. He put a lid on it. He put the tin in his bag and ran.",
        pause: 3000
      },
      {
        text: "Now read that passage aloud.",
        pause: 30000
      },
      {
        text: "What did Nick put on the tin?",
        pause: 3000
      },
      {
        text: "Where did he put the tin?",
        pause: 3000
      },
      {
        text: "Say one sentence about Nick using a short‑i word. For example: 'I put it in my bag.' Say your sentence now.",
        pause: 15000
      },
      {
        text: "Say these words: I.",
        pause: 1500
      },
      {
        text: "my.",
        pause: 1500
      },
      {
        text: "is.",
        pause: 1500
      },
      {
        text: "in.",
        pause: 1500
      },
      {
        text: "it.",
        pause: 1500
      },
      {
        text: "Great week! Replay any part to practice more.",
        pause: 1000
      }
    ];
  }
}

// Make available globally
window.BillyWeek3Lesson = BillyWeek3Lesson;
