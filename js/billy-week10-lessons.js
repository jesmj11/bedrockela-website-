/**
 * Week 10 Mini-Lessons: S-blends
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: sc, sk, sm, sn, sp, st, sw, -nd, -nt, -st, -mp, -ft, -lt
 * Sight words: stop, jump, went
 */

class BillyWeek10Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 10 lesson scripts
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
    // Day 1 — Week 10
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! Last week you learned 2-letter blends like bl, cr, and st. But did you know some words have THREE letters that blend together? Today we're learning 3-letter blends!",
                "pause": 10000
          },
          {
                "text": "The 3-letter blends are: scr, spl, spr, str, and thr. They're tricky because you hear THREE sounds sliding together really fast! Listen: /s/-/t/-/r/ = str in 'street.' Try it: str, str, str!",
                "pause": 10000
          },
          {
                "text": "These blends take practice! Your mouth has to move quickly to say all three sounds. Let's say them together: scr, spl, spr, str, thr.",
                "pause": 10000
          },
          {
                "text": "Today we'll learn words like 'string,' 'splash,' 'spray,' 'scrub,' and 'throw.' These are super cool words!",
                "pause": 8000
          },
          {
                "text": "Let's find 3-letter blends in words. Listen: 'string.' What blend? /str/! Say the whole word: /s/-/t/-/r/-/i/-/ng/. The first THREE sounds are the blend!",
                "pause": 12000
          },
          {
                "text": "Now 'splash.' What blend? /spl/! Say it: /s/-/p/-/l/-/a/-/sh/. Three sounds blend together at the start!",
                "pause": 10000
          },
          {
                "text": "'Spray' - what blend? /spr/! 'Scrub' - what blend? /scr/! 'Throw' - what blend? /thr/!",
                "pause": 12000
          },
          {
                "text": "Great work! You can hear all three sounds in these big blends!",
                "pause": 10000
          },
          {
                "text": "3-letter blends always come at the BEGINNING of words, just like 2-letter blends!",
                "pause": 8000
          },
          {
                "text": "Let's blend 3-letter blend words. This is tricky! Listen carefully: /s/-/t/-/r/-/i/-/ng/. What's the word? String! Say it with me: /s/-/t/-/r/-/i/-/ng/... string!",
                "pause": 12000
          },
          {
                "text": "/s/-/p/-/l/-/a/-/sh/. What's the word? Splash! You try: /s/-/p/-/r/-/ay/. What's the word? Spray! Great!",
                "pause": 12000
          },
          {
                "text": "/s/-/c/-/r/-/u/-/b/. What's the word? Scrub! /th/-/r/-/o/. What's the word? Throw!",
                "pause": 12000
          },
          {
                "text": "/s/-/t/-/r/-/a/-/p/. What's the word? Strap! /s/-/p/-/l/-/i/-/t/. What's the word? Split!",
                "pause": 12000
          },
          {
                "text": "Excellent! You're blending three sounds together at the beginning of words!",
                "pause": 10000
          },
          {
                "text": "Let's tap out 3-letter blend words. This is the trickiest part! Ready? 'String.' Tap EACH sound: /s/-/t/-/r/-/i/-/ng/. Five sounds! Remember, we tap /s/, /t/, and /r/ separately!",
                "pause": 14000
          },
          {
                "text": "'Splash.' Tap: /s/-/p/-/l/-/a/-/sh/. Five sounds! The /sh/ at the end is a digraph (one sound), but the /spl/ at the beginning is three separate sounds!",
                "pause": 12000
          },
          {
                "text": "'Scrub.' Tap: /s/-/c/-/r/-/u/-/b/. Five sounds! 'Strap.' Tap: /s/-/t/-/r/-/a/-/p/. Five sounds!",
                "pause": 12000
          },
          {
                "text": "Perfect! 3-letter blends have THREE sounds, so we tap three times at the beginning!",
                "pause": 10000
          },
          {
                "text": "Let's practice hearing the difference between 2-letter and 3-letter blends! I'll say a word. Tell me if it has a 2-letter blend or 3-letter blend. Ready? 'Stop.' 2-letter or 3-letter? 2-letter! /st/!",
                "pause": 14000
          },
          {
                "text": "'String.' 2 or 3? 3-letter! /str/! 'Slip.' 2 or 3? 2-letter! /sl/!",
                "pause": 12000
          },
          {
                "text": "'Splash.' 2 or 3? 3-letter! /spl/! 'Swim.' 2 or 3? 2-letter! /sw/!",
                "pause": 12000
          },
          {
                "text": "Great! You can tell if a blend has two or three sounds!",
                "pause": 10000
          },
          {
                "text": "Let's practice each 3-letter blend! First, /scr/ like in 'scrub,' 'scratch,' and 'scream.' Say them with me: scrub, scratch, scream!",
                "pause": 12000
          },
          {
                "text": "Next, /spl/ like in 'splash,' 'split,' and 'splat.' Say them: splash, split, splat!",
                "pause": 12000
          },
          {
                "text": "Now /spr/ like in 'spray,' 'spring,' and 'spread.' Say them: spray, spring, spread!",
                "pause": 12000
          },
          {
                "text": "/str/ is super common: 'string,' 'strap,' 'street,' 'strong.' Say them: string, strap, street, strong!",
                "pause": 12000
          },
          {
                "text": "And /thr/ like in 'throw,' 'three,' 'throat,' 'throb.' Say them: throw, three, throat, throb! You know all five 3-letter blends!",
                "pause": 12000
          },
          {
                "text": "Let's build words with 3-letter blends! Start with 'strap.' Take away the /t/. What's the word? Srap? Nope! You get /s/-/r/-/a/-/p/ = 'scrap!' We changed a 3-letter blend to a 2-letter blend!",
                "pause": 14000
          },
          {
                "text": "Start with 'string.' Take away the /t/ again. What do you get? /s/-/r/-/i/-/ng/ = 'sring?' Not a word! Some changes don't work. That's okay!",
                "pause": 14000
          },
          {
                "text": "Let's read sentences with 3-letter blends! Listen, then read: 'I can splash in the strong stream.' Point to each word and read.",
                "pause": 14000
          },
          {
                "text": "Another: 'The spring will spray and split the strap.' Let's read together. Three 3-letter blends in one sentence!",
                "pause": 14000
          },
          {
                "text": "One more: 'Throw the string and scrub the street.' Read with me. Excellent!",
                "pause": 12000
          },
          {
                "text": "Amazing work! You learned 3-letter blends today: scr, spl, spr, str, and thr! These are some of the trickiest sounds in English, and you did them! Tomorrow we'll practice more blends. You're an incredible reader! See you next time!",
                "pause": 14000
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 10
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You've learned SO MANY blends! L-blends, R-blends, S-blends, and 3-letter blends! Today we're going to practice ALL of them together and build your fluency!",
                "pause": 10000
          },
          {
                "text": "Remember: blends keep both sounds (or three sounds!) and they slide together. You know bl, cl, fl, gl, pl, sl, br, cr, dr, fr, gr, pr, tr, sc, sk, sm, sn, sp, st, sw, scr, spl, spr, str, and thr. WOW!",
                "pause": 10000
          },
          {
                "text": "Today we'll read LOTS of blend words, practice telling them apart, and read sentences full of blends. You're going to be a blend superstar!",
                "pause": 8000
          },
          {
                "text": "Ready to practice? Let's go!",
                "pause": 6000
          },
          {
                "text": "Let's warm up! I'll say a blend type, and you give me an example word. L-blend? (Flag!) R-blend? (Bring!) S-blend? (Stop!) 3-letter blend? (String!)",
                "pause": 14000
          },
          {
                "text": "Great! Now I'll say a word, you tell me the blend. 'Clap.' What blend? /cl/! 'Frog.' What blend? /fr/!",
                "pause": 12000
          },
          {
                "text": "'Swim.' What blend? /sw/! 'Splash.' What blend? /spl/! 'Plan.' What blend? /pl/!",
                "pause": 12000
          },
          {
                "text": "'Trip.' What blend? /tr/! 'Scrub.' What blend? /scr/! 'Skip.' What blend? /sk/!",
                "pause": 12000
          },
          {
                "text": "Perfect! You can identify all the blends just by listening!",
                "pause": 10000
          },
          {
                "text": "Let's read word lists with ALL the blends mixed together! This tests if you can switch quickly between different blends. Ready? List 1: flag, bring, stop, string.",
                "pause": 14000
          },
          {
                "text": "List 2: clap, frog, swim, splash. Point to each word and read smoothly!",
                "pause": 14000
          },
          {
                "text": "List 3: plan, trip, snap, spray. You're doing great!",
                "pause": 14000
          },
          {
                "text": "List 4: slip, crab, skip, scrub. Keep going!",
                "pause": 14000
          },
          {
                "text": "List 5: glad, drop, smell, throw. Excellent reading!",
                "pause": 14000
          },
          {
                "text": "You just read 20 words with different blends and didn't get confused! That's fluency!",
                "pause": 12000
          },
          {
                "text": "Let's do blend word chains! I'll say a word, then we change ONE part to make a new word. Start with 'flag.' Change /fl/ to /dr/. What's the word? Drag!",
                "pause": 14000
          },
          {
                "text": "Drag. Change /dr/ to /br/. What's the word? Brag! Brag. Change /br/ to /tr/. What's the word? Trap... wait, we changed the vowel too! Trag? Not a word!",
                "pause": 12000
          },
          {
                "text": "Let's try again. Start with 'slip.' Change /sl/ to /fl/. Flip! Change /fl/ to /gr/. Grip! Change /gr/ to /tr/. Trip!",
                "pause": 12000
          },
          {
                "text": "Start with 'plan.' Change /pl/ to /sc/. Scan! Change /sc/ to /sp/. Span! Change /sp/ to /sw/. Swan!",
                "pause": 12000
          },
          {
                "text": "You're amazing at word chains! You can swap blends and make new words!",
                "pause": 10000
          },
          {
                "text": "Let's see how well you can tell blends apart! I'll say two words. Tell me if they have the SAME blend or DIFFERENT blends. Ready? 'Flag' and 'flip.' Same or different? Same! Both have /fl/!",
                "pause": 14000
          },
          {
                "text": "'Bring' and 'brown.' Same or different? Same! Both have /br/! 'Stop' and 'swim.' Same or different? Different! /st/ and /sw/!",
                "pause": 12000
          },
          {
                "text": "'Clap' and 'clam.' Same or different? Same! /cl/! 'Splash' and 'spring.' Same or different? Different! /spl/ and /spr/!",
                "pause": 12000
          },
          {
                "text": "'String' and 'strap.' Same or different? Same! Both have /str/! 'Frog' and 'flag.' Same or different? Different! /fr/ and /fl/!",
                "pause": 12000
          },
          {
                "text": "Perfect! You have excellent blend ears!",
                "pause": 10000
          },
          {
                "text": "Now let's practice reading blends FAST! I'll show you a list, and you read as quickly as you can without making mistakes. Ready? List: flag, bring, stop, splash, clap, frog.",
                "pause": 14000
          },
          {
                "text": "Again, a little faster: slip, crab, skip, string, plan, trip!",
                "pause": 14000
          },
          {
                "text": "One more time, your fastest: glad, swim, spray, scrub, drop, throw!",
                "pause": 14000
          },
          {
                "text": "WOW! You're reading blend words quickly and accurately! That's fluency!",
                "pause": 10000
          },
          {
                "text": "Now let's read phrases with blends. Remember to read smoothly without stopping! 'A black flag.' Read it: A... black... flag. Now smooth: A black flag!",
                "pause": 14000
          },
          {
                "text": "'Bring the frog to swim.' Point and read, then read smooth. Bring the frog to swim!",
                "pause": 14000
          },
          {
                "text": "'Splash in the spring and throw the string.' Read it carefully - lots of blends!",
                "pause": 14000
          },
          {
                "text": "'Stop and scrub the brown crab.' Excellent! You're reading phrases fluently!",
                "pause": 12000
          },
          {
                "text": "Now complete sentences! Read smoothly and with expression. Sentence 1: 'I am glad to bring my flag and plant it in the grass.'",
                "pause": 16000
          },
          {
                "text": "Sentence 2: 'The frog can splash and swim and stop by the brown rock.'",
                "pause": 16000
          },
          {
                "text": "Sentence 3: 'I will skip and trip and drop the string when I spray the scrub.' So many blends! Great reading!",
                "pause": 16000
          },
          {
                "text": "Fantastic work! You practiced ALL the beginning blends today: L-blends, R-blends, S-blends, and 3-letter blends! You read them in words, phrases, and sentences, and you read them FAST!",
                "pause": 14000
          },
          {
                "text": "Tomorrow we'll practice ending blends. Keep up the great work! You're becoming such a fluent reader! See you next time!",
                "pause": 10000
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 10
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! Yesterday we practiced beginning blends, and today it's time for ending blends! Remember, ending blends come at the END of words, and they're super common!",
                "pause": 10000
          },
          {
                "text": "The ending blends are: ft, ld, lk, lt, lp, mp, nd, nk, nt, pt, sk, and st. That's 12 blends! You use these in words like 'left,' 'hand,' 'pink,' 'jump,' and 'fast.'",
                "pause": 10000
          },
          {
                "text": "Today we'll practice all the ending blends, read lots of words, and build your fluency. You're going to read SO MANY words today!",
                "pause": 8000
          },
          {
                "text": "Ready to practice ending blends? Let's go!",
                "pause": 6000
          },
          {
                "text": "Let's warm up! I'll say a word, and you tell me the ending blend. Ready? 'Left.' What's the ending blend? /ft/! 'Hand.' Ending blend? /nd/!",
                "pause": 14000
          },
          {
                "text": "'Pink.' Ending blend? /nk/! 'Jump.' Ending blend? /mp/! 'Fast.' Ending blend? /st/!",
                "pause": 12000
          },
          {
                "text": "'Desk.' Ending blend? /sk/! 'Bent.' Ending blend? /nt/! 'Help.' Ending blend? /lp/!",
                "pause": 12000
          },
          {
                "text": "'Milk.' Ending blend? /lk/! 'Cold.' Ending blend? /ld/! 'Kept.' Ending blend? /pt/!",
                "pause": 12000
          },
          {
                "text": "Perfect! You can hear all the ending blends!",
                "pause": 10000
          },
          {
                "text": "Some ending blends make BIG word families! Let's practice -nd words: hand, sand, land, band, stand, grand. Say them with me!",
                "pause": 14000
          },
          {
                "text": "Now -st words: fast, last, past, best, rest, test, mast, cast. So many -st words!",
                "pause": 14000
          },
          {
                "text": "-nk words: pink, sink, think, bank, thank,rank, drink, stink. These are super common!",
                "pause": 14000
          },
          {
                "text": "-mp words: jump, bump, lump, pump, dump, stump, grump. Say them: jump, bump, lump, pump, dump!",
                "pause": 14000
          },
          {
                "text": "-nt words: bent, sent, went, tent, vent, rent, dent. And: pint, mint, hint, print!",
                "pause": 14000
          },
          {
                "text": "When you know ending blend families, you can read hundreds of words!",
                "pause": 12000
          },
          {
                "text": "Let's read lists with mixed ending blends! List 1: left, hand, pink, jump, fast. Read each word!",
                "pause": 14000
          },
          {
                "text": "List 2: desk, bent, milk, cold, help. Keep going!",
                "pause": 14000
          },
          {
                "text": "List 3: kept, sink, tent, sand, best. Great reading!",
                "pause": 14000
          },
          {
                "text": "List 4: lamp, draft, wilt, melt, honk. Some harder words - you can do it!",
                "pause": 14000
          },
          {
                "text": "List 5: trust, crept, stomp, blend, swept. Excellent! You're reading ending blends fluently!",
                "pause": 12000
          },
          {
                "text": "Let's tap ending blends! Remember, they have TWO sounds at the end! 'Hand.' Tap: /h/-/a/-/n/-/d/. Four sounds!",
                "pause": 14000
          },
          {
                "text": "'Pink.' Tap: /p/-/i/-/n/-/k/. Four sounds! 'Jump.' Tap: /j/-/u/-/m/-/p/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "'Fast.' Tap: /f/-/a/-/s/-/t/. Four sounds! 'Desk.' Tap: /d/-/e/-/s/-/k/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Perfect! You remember that ending blends have TWO sounds!",
                "pause": 10000
          },
          {
                "text": "Some words have BOTH a beginning AND ending blend! Listen: 'plant.' What's the beginning blend? /pl/! What's the ending blend? /nt/! Let's read some double-blend words!",
                "pause": 14000
          },
          {
                "text": "'Stomp' - beginning /st/, ending /mp/! 'Blink' - beginning /bl/, ending /nk/! 'Crept' - beginning /cr/, ending /pt/!",
                "pause": 14000
          },
          {
                "text": "'Craft' - beginning /cr/, ending /ft/! 'Trust' - beginning /tr/, ending /st/! These words have blends at BOTH ends!",
                "pause": 14000
          },
          {
                "text": "When you can read words with two blends, you can read almost anything!",
                "pause": 10000
          },
          {
                "text": "Let's build words by changing ending blends! Start with 'hand.' Change /nd/ to /nk/. What's the word? Hank! Change /nk/ to /nt/. What's the word? Hant? Not a real word!",
                "pause": 14000
          },
          {
                "text": "Start with 'jump.' Change /mp/ to /nk/. What's the word? Junk! Change /nk/ to /st/. What's the word? Just!",
                "pause": 14000
          },
          {
                "text": "Start with 'test.' Change /st/ to /nt/. What's the word? Tent! You can swap ending blends to make new words!",
                "pause": 12000
          },
          {
                "text": "Let's read phrases with ending blends! 'Jump in the sand.' Read smoothly: Jump in the sand!",
                "pause": 14000
          },
          {
                "text": "'Think fast and trust the plan.' Read it: Think fast and trust the plan!",
                "pause": 14000
          },
          {
                "text": "Now sentences! 'I left my pink gift on the desk by the tent.' Point and read!",
                "pause": 16000
          },
          {
                "text": "'The skunk can stomp and blink and think in the cold sand.' Great! So many ending blends!",
                "pause": 16000
          },
          {
                "text": "Amazing work! You practiced all the ending blends today and read SO MANY words with them! You know ft, ld, lk, lt, lp, mp, nd, nk, nt, pt, sk, and st!",
                "pause": 14000
          },
          {
                "text": "Tomorrow we'll practice ALL blends together - beginning AND ending! You're doing fantastic! See you next time!",
                "pause": 10000
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 10
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You know blends (two sounds sliding together) and digraphs (two letters making ONE sound). But did you know that some words have BOTH blends AND digraphs? Today we're reading those tricky combo words!",
                "pause": 10000
          },
          {
                "text": "Remember: Blends = two or three sounds (like bl, str, nd). Digraphs = one sound (like sh, ch, th, wh). Some words have BOTH! Listen: 'splash' has /spl/ (blend) AND /sh/ (digraph)!",
                "pause": 10000
          },
          {
                "text": "Today we'll read words like 'splash,' 'thrash,' 'shrimp,' 'church,' 'stretch,' and 'bunch.' These are some of the trickiest words in English!",
                "pause": 10000
          },
          {
                "text": "If you can read words with blends AND digraphs, you can read almost anything! Let's practice!",
                "pause": 8000
          },
          {
                "text": "Let's find the blend and digraph in words! Listen: 'splash.' What's the blend? /spl/! What's the digraph? /sh/! The word is /s/-/p/-/l/-/a/-/sh/!",
                "pause": 14000
          },
          {
                "text": "'Thrash.' What's the blend? /thr/! What's the digraph? /th/... wait! /thr/ IS the blend, and /sh/ is the digraph at the end! Tricky!",
                "pause": 12000
          },
          {
                "text": "'Shrimp.' What comes first? /sh/ (digraph)! What's the blend? /r/ and /m/ don't blend... oh wait, it's just /sh/-/r/-/i/-/m/-/p/. The /sh/ is the digraph!",
                "pause": 14000
          },
          {
                "text": "'Church.' What's the digraph? /ch/ at the beginning AND /ch/ at the end! Two digraphs in one word!",
                "pause": 12000
          },
          {
                "text": "'Stretch.' What's the blend? /str/! What's the digraph? /ch/ at the end! Blend + digraph!",
                "pause": 12000
          },
          {
                "text": "Great work finding blends and digraphs in the same words!",
                "pause": 10000
          },
          {
                "text": "Let's blend words with both blends and digraphs! This is tricky! Listen: /s/-/p/-/l/-/a/-/sh/. What's the word? Splash! Say it with me!",
                "pause": 14000
          },
          {
                "text": "/s/-/t/-/r/-/e/-/ch/. What's the word? Stretch! You try: /th/-/r/-/u/-/sh/. What's the word? Thrush!",
                "pause": 12000
          },
          {
                "text": "/sh/-/r/-/i/-/m/-/p/. What's the word? Shrimp! /ch/-/i/-/l/-/d/. What's the word? Child!",
                "pause": 12000
          },
          {
                "text": "/b/-/r/-/a/-/n/-/ch/. What's the word? Branch! /s/-/k/-/r/-/a/-/ch/. What's the word? Scratch!",
                "pause": 12000
          },
          {
                "text": "/str/-/o/-/ng/. What's the word? Strong! Wait, that doesn't have a digraph! Just a 3-letter blend! Good catch!",
                "pause": 12000
          },
          {
                "text": "Excellent blending! You're combining blends and digraphs like a pro!",
                "pause": 10000
          },
          {
                "text": "Let's tap words with blends AND digraphs! This is super tricky because you have to remember: blends = tap each sound separately, digraphs = tap once. Ready? 'Splash.' Tap: /s/-/p/-/l/-/a/-/sh/. Five sounds!",
                "pause": 14000
          },
          {
                "text": "'Stretch.' Tap: /s/-/t/-/r/-/e/-/ch/. Five sounds! Three for the blend /str/, one vowel, one for the digraph /ch/!",
                "pause": 12000
          },
          {
                "text": "'Shrimp.' Tap: /sh/-/r/-/i/-/m/-/p/. Five sounds! /sh/ is one sound (digraph), then /r/, /i/, /m/, /p/!",
                "pause": 12000
          },
          {
                "text": "Perfect! You can tap blends and digraphs correctly!",
                "pause": 10000
          },
          {
                "text": "Let's practice common words with blends AND digraphs! Words with /spl/ + /sh/: splash, splish. Say them: splash, splish!",
                "pause": 14000
          },
          {
                "text": "Words with /str/ + /ch/: stretch, scratchy. Say them: stretch, scratchy!",
                "pause": 12000
          },
          {
                "text": "Words with /thr/ + /sh/: thrash, thrush. Say them: thrash, thrush!",
                "pause": 12000
          },
          {
                "text": "Words with blend + /ch/: branch, crunch, bunch, lunch, scrunch. So many -nch words!",
                "pause": 12000
          },
          {
                "text": "Words with digraph + blend: shrimp, chimp, think, chunk, shrink. These have the digraph FIRST!",
                "pause": 12000
          },
          {
                "text": "Let's read a list of blend + digraph words! This is tough! Ready? Splash, stretch, shrimp, branch, crunch.",
                "pause": 16000
          },
          {
                "text": "More words: thrash, church, chunk, shrink, scratch, strong. Great!",
                "pause": 16000
          },
          {
                "text": "Even more: bunch, lunch, thrush, chimp, splish, scrunch. You're doing it!",
                "pause": 16000
          },
          {
                "text": "Last list: munch, french, witch, cloth, blush. Wait - 'witch' and 'cloth' don't have blends! Just digraphs! Good job reading them anyway!",
                "pause": 14000
          },
          {
                "text": "Now let's read sentences with blends and digraphs! 'I splash in the spring and stretch on the branch.' Point and read!",
                "pause": 16000
          },
          {
                "text": "'The shrimp can thrash and the chimp can scratch.' Great reading!",
                "pause": 16000
          },
          {
                "text": "'I will crunch and munch lunch by the strong shrub.' So many combo words!",
                "pause": 16000
          },
          {
                "text": "'At church we think and thank and sing.' Excellent! You're reading complex words!",
                "pause": 14000
          },
          {
                "text": "WOW! You just read words with BOTH blends and digraphs! These are some of the trickiest words in first grade, and you did them! You should be so proud!",
                "pause": 14000
          },
          {
                "text": "Tomorrow is assessment day for ALL blends! You're going to show off everything you learned! You're ready! See you next time!",
                "pause": 10000
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 10
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You've done incredible work for two weeks learning ALL the blends! L-blends, R-blends, S-blends, 3-letter blends, ending blends, and even blends with digraphs! Today you get to show me EVERYTHING you know!",
                "pause": 10000
          },
          {
                "text": "This assessment covers all blend types. You'll identify them, tap them, blend them, and read them. Take your time and do your best!",
                "pause": 8000
          },
          {
                "text": "Remember: blends keep EACH sound, and they slide together. You've got this! Let's begin!",
                "pause": 8000
          },
          {
                "text": "I'll say a word. Tell me what TYPE of blend it has: L-blend, R-blend, S-blend, 3-letter blend, or ending blend. Word 1: 'flag.' What type? L-blend! Word 2: 'bring.' What type? R-blend!",
                "pause": 16000
          },
          {
                "text": "Word 3: 'stop.' What type? S-blend! Word 4: 'string.' What type? 3-letter blend! Word 5: 'hand.' What type? Ending blend!",
                "pause": 14000
          },
          {
                "text": "Word 6: 'clip.' What type? L-blend! Word 7: 'frog.' What type? R-blend! Word 8: 'swim.' What type? S-blend!",
                "pause": 14000
          },
          {
                "text": "Word 9: 'splash.' What type? 3-letter blend! Word 10: 'pink.' What type? Ending blend! Word 11: 'plant.' What types? L-blend AND ending blend! Two blends!",
                "pause": 14000
          },
          {
                "text": "Word 12: 'craft.' Blend types? R-blend AND ending blend! Word 13: 'strong.' Blend types? 3-letter blend, no ending blend!",
                "pause": 14000
          },
          {
                "text": "Great identification! You can tell all the blend types apart!",
                "pause": 10000
          },
          {
                "text": "Now tap out blend words. Remember: blends = tap each sound separately! Word 1: 'flag.' Tap: /f/-/l/-/a/-/g/. Four sounds!",
                "pause": 14000
          },
          {
                "text": "Word 2: 'bring.' Tap: /b/-/r/-/i/-/ng/. Four sounds! Word 3: 'stop.' Tap: /s/-/t/-/o/-/p/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Word 4: 'string.' Tap: /s/-/t/-/r/-/i/-/ng/. Five sounds! Three for the blend! Word 5: 'hand.' Tap: /h/-/a/-/n/-/d/. Four sounds!",
                "pause": 14000
          },
          {
                "text": "Word 6: 'splash.' Tap: /s/-/p/-/l/-/a/-/sh/. Five sounds! Three for blend, one vowel, one for /sh/! Word 7: 'plant.' Tap: /p/-/l/-/a/-/n/-/t/. Five sounds!",
                "pause": 14000
          },
          {
                "text": "Word 8: 'craft.' Tap: /c/-/r/-/a/-/f/-/t/. Five sounds! Word 9: 'stretch.' Tap: /s/-/t/-/r/-/e/-/ch/. Five sounds!",
                "pause": 14000
          },
          {
                "text": "Word 10: 'trust.' Tap: /t/-/r/-/u/-/s/-/t/. Five sounds! Excellent tapping!",
                "pause": 10000
          },
          {
                "text": "I'll say sounds slowly, you blend them. Ready? /fl/-/a/-/g/. What's the word? Flag! /br/-/i/-/ng/. What's the word? Bring!",
                "pause": 14000
          },
          {
                "text": "/st/-/o/-/p/. What's the word? Stop! /s/-/t/-/r/-/i/-/ng/. What's the word? String!",
                "pause": 12000
          },
          {
                "text": "/h/-/a/-/n/-/d/. What's the word? Hand! /s/-/p/-/l/-/a/-/sh/. What's the word? Splash!",
                "pause": 12000
          },
          {
                "text": "/p/-/l/-/a/-/n/-/t/. What's the word? Plant! /c/-/r/-/a/-/f/-/t/. What's the word? Craft!",
                "pause": 12000
          },
          {
                "text": "/s/-/t/-/r/-/e/-/ch/. What's the word? Stretch! /th/-/r/-/u/-/sh/. What's the word? Thrush! Perfect blending!",
                "pause": 12000
          },
          {
                "text": "Read this list of blend words. Take your time. Words 1-5: flag, bring, stop, string, hand.",
                "pause": 18000
          },
          {
                "text": "Words 6-10: clip, frog, swim, splash, pink.",
                "pause": 18000
          },
          {
                "text": "Words 11-15: glad, trip, snap, spray, desk.",
                "pause": 18000
          },
          {
                "text": "Words 16-20: slip, crab, skip, scrub, fast.",
                "pause": 18000
          },
          {
                "text": "Words 21-28: plant, craft, trust, stretch, thrash, branch, crunch, shrimp. Great! You just read 28 blend words!",
                "pause": 18000
          },
          {
                "text": "Let's make sure you know blends from digraphs! I'll say a word. Tell me if the underlined part is a BLEND or a DIGRAPH. 'SHip.' /sh/ - blend or digraph? Digraph!",
                "pause": 14000
          },
          {
                "text": "'SLip.' /sl/ - blend or digraph? Blend! 'THat.' /th/ - blend or digraph? Digraph! 'STand.' /st/ - blend or digraph? Blend!",
                "pause": 12000
          },
          {
                "text": "'SPLash.' /spl/ - blend or digraph? Blend! Even though it ends with /sh/, the /spl/ part is a blend! Perfect!",
                "pause": 12000
          },
          {
                "text": "Read these sentences with LOTS of blends! Sentence 1: 'I am glad to bring my flag and plant it in the grass by the pink desk.'",
                "pause": 16000
          },
          {
                "text": "Sentence 2: 'The frog can splash and swim and stop on the strong branch.'",
                "pause": 16000
          },
          {
                "text": "Sentence 3: 'I will skip and trip and drop the string when I stretch and spray the brown shrub.'",
                "pause": 18000
          },
          {
                "text": "Sentence 4: 'At the spring, the shrimp can thrash and the chimp can scratch and munch crunch.'",
                "pause": 18000
          },
          {
                "text": "Sentence 5: 'The strong skunk will stomp and blink and think in the cold sand by the black tent.' WOW! So many blends!",
                "pause": 16000
          },
          {
                "text": "Last challenge! I'll time you for one minute. Read this passage with ALL kinds of blends. Read smoothly and accurately. Don't rush - read at your best pace. Ready? Go!",
                "pause": 18000
          },
          {
                "text": "[One minute timed reading: 'I am glad to bring my flag and plant it fast. The frog can jump and swim and stop by the strong branch. The shrimp can splash and thrash. I will stretch and sprint and munch lunch by the pink shrub. The brown crab can slip and trip on the craft.']",
                "pause": 16000
          },
          {
                "text": "AMAZING! You showed me that you've mastered ALL the blends: L-blends, R-blends, S-blends, 3-letter blends, and ending blends! You can identify them, tap them, blend them, and read them in words and sentences!",
                "pause": 16000
          },
          {
                "text": "Next week we'll start learning about long vowels! You've built such strong phonics skills. You should be SO proud of yourself! Fantastic work! See you next time!",
                "pause": 12000
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="10"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek10Lesson(day);
    }
  });
}
