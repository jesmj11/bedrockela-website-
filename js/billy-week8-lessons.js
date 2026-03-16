/**
 * Week 8 Mini-Lessons: /th/ /wh/
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: digraphs
 * Sight words: this, that, when, what
 */

class BillyWeek8Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 8 lesson scripts
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
    // Day 1 — Week 8
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! This week we're learning two special /th/ sounds. Today we'll learn the BUZZY /th/ sound - the one you use in words like 'this' and 'that.' Put your hand on your throat and say /th/ - feel it buzz?",
                "pause": 10000
          },
          {
                "text": "The /th/ sound is made with T and H together. Your tongue goes between your teeth. Try it: /th/, /th/, /th/. Feel your tongue stick out a tiny bit?",
                "pause": 8000
          },
          {
                "text": "This buzzy /th/ is called VOICED because your voice box vibrates. Say 'this' and feel the buzz in your throat. Now say it with me: this, that, them, then.",
                "pause": 10000
          },
          {
                "text": "Today we'll practice the buzzy /th/ sound and learn to read words like 'this,' 'that,' 'them,' and 'then.' Let's go!",
                "pause": 8000
          },
          {
                "text": "Let's find the buzzy /th/ sound in words. Listen: 'this.' The /th/ is at the beginning. Say it: /th/-/i/-/s/. Put your hand on your throat - feel the buzz?",
                "pause": 10000
          },
          {
                "text": "Now listen to 'them.' Where's the /th/? At the beginning! Say it: /th/-/e/-/m/. Your voice box is buzzing!",
                "pause": 8000
          },
          {
                "text": "Let's try more. 'That' - where's /th/? At the start! 'Then' - where's /th/? At the start! All these words start with buzzy /th/.",
                "pause": 10000
          },
          {
                "text": "Good work! The buzzy /th/ usually comes at the beginning of small words we use a lot: the, this, that, them, then, there.",
                "pause": 8000
          },
          {
                "text": "Now let's blend /th/ words. Listen: /th/-/i/-/s/. What's the word? This! Say it with me: /th/-/i/-/s/... this!",
                "pause": 10000
          },
          {
                "text": "Another one: /th/-/a/-/t/. Blend it together... that! You try: /th/-/e/-/m/. What's the word? Them! Perfect!",
                "pause": 10000
          },
          {
                "text": "Let's try: /th/-/e/-/n/. What's the word? Then! And /th/-/e/. What's the word? The! Great blending!",
                "pause": 10000
          },
          {
                "text": "You're blending buzzy /th/ words like a pro! T-H together makes /th/.",
                "pause": 8000
          },
          {
                "text": "Now let's break /th/ words into sounds. I'll say 'this,' and you tap out each sound. Ready? Tap: /th/-/i/-/s/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Let's try 'that.' Tap the sounds: /th/-/a/-/t/. Three sounds! Remember, T-H is one sound, even though it's two letters.",
                "pause": 10000
          },
          {
                "text": "Here's 'them.' Tap it: /th/-/e/-/m/. Three sounds! And 'then': /th/-/e/-/n/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Excellent! You know that T-H makes ONE buzzy /th/ sound.",
                "pause": 8000
          },
          {
                "text": "Let's practice hearing the difference between buzzy /th/ and other sounds. I'll say a word - tell me if it has buzzy /th/ or not. Ready? 'This.' Does it have /th/? Yes!",
                "pause": 10000
          },
          {
                "text": "Here's another: 'fish.' Does it have /th/? No! It has /f/ and /sh/, but no /th/.",
                "pause": 10000
          },
          {
                "text": "Let's try: 'that' - has /th/? Yes! 'Chat' - has /th/? No! 'Them' - has /th/? Yes!",
                "pause": 10000
          },
          {
                "text": "Perfect! You can hear buzzy /th/ and know when it's there or not.",
                "pause": 8000
          },
          {
                "text": "Now let's build /th/ words! Start with 'that.' Say it: that. Now change /a/ to /i/. What's the new word? This! You changed the middle sound!",
                "pause": 12000
          },
          {
                "text": "Start with 'them.' Now change /m/ to /n/. What's the word? Then! Let's try one more: 'then' - change /e/ to /i/. What's the word? Thin!",
                "pause": 12000
          },
          {
                "text": "Wait - 'thin' has a DIFFERENT /th/ sound! It doesn't buzz as much. We'll learn that one tomorrow. For now, let's stick with buzzy /th/ words.",
                "pause": 12000
          },
          {
                "text": "You're great at building words with buzzy /th/! Just changing one sound makes a whole new word.",
                "pause": 10000
          },
          {
                "text": "Now let's read sentences with buzzy /th/ words. Listen, then read with me: 'This is that.' Point to each word: This... is... that.",
                "pause": 12000
          },
          {
                "text": "Here's another: 'I see them then.' Let's read: I... see... them... then. Great reading!",
                "pause": 12000
          },
          {
                "text": "One more: 'This is the one that I wish for.' Read with me: This... is... the... one... that... I... wish... for. Excellent!",
                "pause": 10000
          },
          {
                "text": "Wonderful work! You learned the buzzy /th/ sound today! T and H work together to make /th/. You can read 'this,' 'that,' 'them,' and 'the.' Tomorrow we'll learn the quiet /th/ sound. See you next time!",
                "pause": 12000
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 8
    // Total ≈ 5:00
    return     [
          {
                "text": "Hello friends! Yesterday we learned the buzzy /th/ sound in 'this' and 'that.' Today we're learning the QUIET /th/ sound - the one in words like 'thin' and 'math.' It doesn't buzz!",
                "pause": 10000
          },
          {
                "text": "Both /th/ sounds use T and H together, and your tongue goes between your teeth for both. But this quiet /th/ doesn't make your throat buzz. Try it: /th/, /th/, /th/ - no buzz!",
                "pause": 8000
          },
          {
                "text": "Put your hand on your throat. Say 'this' - feel the buzz? Now say 'thin' - no buzz! Same tongue position, different sounds. Cool, right?",
                "pause": 10000
          },
          {
                "text": "Today we'll practice the quiet /th/ and read words like 'thin,' 'thick,' 'math,' and 'path.' Let's start!",
                "pause": 8000
          },
          {
                "text": "Let's find the quiet /th/ sound in words. Listen: 'thin.' The /th/ is at the beginning. Say it: /th/-/i/-/n/. No buzz in your throat!",
                "pause": 10000
          },
          {
                "text": "Now listen to 'math.' Where's the /th/? At the end! Say it: /m/-/a/-/th/. The quiet /th/ is at the end!",
                "pause": 8000
          },
          {
                "text": "Let's try more. 'Thick' - where's /th/? At the start! 'Path' - where's /th/? At the end! You can find /th/ at the beginning or end.",
                "pause": 10000
          },
          {
                "text": "Great listening! Quiet /th/ often comes at the beginning (think, thick, thin) or end (math, path, bath) of words.",
                "pause": 8000
          },
          {
                "text": "Now let's blend quiet /th/ words. Listen: /th/-/i/-/n/. What's the word? Thin! Say it with me: /th/-/i/-/n/... thin!",
                "pause": 10000
          },
          {
                "text": "Another one: /th/-/i/-/k/. Blend it... thick! You try: /th/-/i/-/ng/. What's the word? Thing! Perfect!",
                "pause": 10000
          },
          {
                "text": "Now /th/ at the END. Listen: /m/-/a/-/th/. What's the word? Math! And /p/-/a/-/th/. What's the word? Path!",
                "pause": 10000
          },
          {
                "text": "You're blending quiet /th/ words perfectly! Remember - no buzz!",
                "pause": 8000
          },
          {
                "text": "Let's break quiet /th/ words into sounds. I'll say 'thin,' you tap out each sound. Ready? Tap: /th/-/i/-/n/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Now 'thick.' Tap it: /th/-/i/-/k/. Three sounds! T-H is one sound.",
                "pause": 10000
          },
          {
                "text": "Here's 'math.' Tap: /m/-/a/-/th/. Three sounds! And 'path': /p/-/a/-/th/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Excellent tapping! You know T-H makes ONE quiet /th/ sound.",
                "pause": 8000
          },
          {
                "text": "Let's practice hearing BOTH /th/ sounds - buzzy and quiet. I'll say a word - you tell me if it's buzzy /th/ (like 'this') or quiet /th/ (like 'thin'). Ready? 'That.' Buzzy or quiet? Buzzy!",
                "pause": 10000
          },
          {
                "text": "Next: 'thick.' Buzzy or quiet? Quiet! 'Them.' Buzzy or quiet? Buzzy! You're telling them apart!",
                "pause": 10000
          },
          {
                "text": "Let's try: 'math' - buzzy or quiet? Quiet! 'The' - buzzy or quiet? Buzzy! 'Think' - buzzy or quiet? Quiet!",
                "pause": 10000
          },
          {
                "text": "Perfect! You can hear the difference between buzzy /th/ and quiet /th/!",
                "pause": 8000
          },
          {
                "text": "Let's build quiet /th/ words! Start with 'thin.' Now change /th/ to /ch/. What's the word? Chin! Now change /ch/ back to /th/. Thin again!",
                "pause": 12000
          },
          {
                "text": "Start with 'thick.' Change /th/ to /k/. What's the word? Kick! Change /k/ to /p/. What's the word? Pick!",
                "pause": 12000
          },
          {
                "text": "Now let's try end-/th/ words. Start with 'math.' Change /m/ to /p/. What's the word? Path! Change /p/ to /b/. What's the word? Bath!",
                "pause": 12000
          },
          {
                "text": "You're building quiet /th/ words like a champion! Changing sounds is so much fun!",
                "pause": 10000
          },
          {
                "text": "Now let's read sentences with quiet /th/ words. Listen, then read: 'I think that is thin.' Point to each word: I... think... that... is... thin.",
                "pause": 12000
          },
          {
                "text": "Another: 'The path is thick with mud.' Let's read: The... path... is... thick... with... mud. Great!",
                "pause": 12000
          },
          {
                "text": "One more: 'This math path has a thick stick.' Read with me. Notice we have BOTH /th/ sounds in that sentence!",
                "pause": 10000
          },
          {
                "text": "Fantastic! You learned the quiet /th/ sound today! Now you know BOTH /th/ sounds: buzzy /th/ in 'this' and quiet /th/ in 'thin.' Tomorrow we'll practice both together. See you next time!",
                "pause": 12000
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 8
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You've learned so many digraphs this week! Today we're learning /wh/ - the sound at the beginning of question words like 'what,' 'when,' 'where,' and 'why.' These are super important words!",
                "pause": 10000
          },
          {
                "text": "The /wh/ sound is made with W and H together. Some people say it just like /w/, but traditionally you blow a little air first: /hw/. Try it: /wh/, /wh/, /wh/.",
                "pause": 8000
          },
          {
                "text": "Put your hand in front of your mouth and say 'what.' Feel the little puff of air? That's the /wh/ sound! Now say it with me: what, when, where, why, which.",
                "pause": 10000
          },
          {
                "text": "Today we'll practice /wh/ words. Most of them are question words we use all the time. Let's learn them!",
                "pause": 8000
          },
          {
                "text": "Let's find the /wh/ sound in words. Listen: 'when.' The /wh/ is at the beginning. Say it: /wh/-/e/-/n/. Feel that little puff of air?",
                "pause": 10000
          },
          {
                "text": "Now 'what.' Where's the /wh/? At the start! Say it: /wh/-/a/-/t/. /wh/ always comes at the beginning of words.",
                "pause": 8000
          },
          {
                "text": "Let's try more. 'Where' - /wh/ at the start! 'Why' - /wh/ at the start! 'Which' - /wh/ at the start! All question words start with /wh/!",
                "pause": 10000
          },
          {
                "text": "Great work! /wh/ is always at the beginning, and most /wh/ words ask questions.",
                "pause": 8000
          },
          {
                "text": "Now let's blend /wh/ words. Listen: /wh/-/e/-/n/. What's the word? When! Say it with me: /wh/-/e/-/n/... when!",
                "pause": 10000
          },
          {
                "text": "Another: /wh/-/a/-/t/. Blend it... what! You try: /wh/-/ere/. What's the word? Where! Great!",
                "pause": 10000
          },
          {
                "text": "Let's try: /wh/-/y/. What's the word? Why! And /wh/-/i/-/ch/. What's the word? Which! Perfect blending!",
                "pause": 10000
          },
          {
                "text": "You're blending /wh/ words like a star! W-H together makes /wh/.",
                "pause": 8000
          },
          {
                "text": "Let's break /wh/ words into sounds. I'll say 'when,' you tap each sound. Ready? Tap: /wh/-/e/-/n/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Now 'what.' Tap it: /wh/-/a/-/t/. Three sounds! W-H is one sound.",
                "pause": 10000
          },
          {
                "text": "Here's 'which.' Tap: /wh/-/i/-/ch/. Three sounds! And 'whip': /wh/-/i/-/p/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Excellent! You know that W-H makes ONE /wh/ sound.",
                "pause": 8000
          },
          {
                "text": "Let's practice hearing /wh/ and /w/. Some words start with just /w/, like 'will' and 'went.' Others start with /wh/, like 'when' and 'what.' I'll say a word - you tell me: /wh/ or just /w/?",
                "pause": 10000
          },
          {
                "text": "Word: 'when.' Is it /wh/ or /w/? /wh/! 'Win.' /wh/ or /w/? Just /w/!",
                "pause": 10000
          },
          {
                "text": "Let's try: 'what' - /wh/! 'Wet' - /w/! 'Which' - /wh/! 'With' - /w/!",
                "pause": 10000
          },
          {
                "text": "Perfect! You can tell /wh/ words from regular /w/ words!",
                "pause": 8000
          },
          {
                "text": "Most /wh/ words ask questions! Let's practice the five big question words. Ready? 'What' asks about things. 'What is that?' Say it with me: What is that?",
                "pause": 12000
          },
          {
                "text": "'When' asks about time. 'When will we go?' Say it: When will we go? 'Where' asks about places. 'Where is it?' Say it: Where is it?",
                "pause": 12000
          },
          {
                "text": "'Why' asks for reasons. 'Why is it red?' Say it: Why is it red? 'Which' asks you to choose. 'Which one do you want?' Say it: Which one do you want?",
                "pause": 12000
          },
          {
                "text": "You just practiced the five /wh/ question words! You'll use these words every single day!",
                "pause": 10000
          },
          {
                "text": "Let's build /wh/ words! Start with 'when.' Change /n/ to /t/. What's the word? Whet! That's a real word - it means to sharpen something.",
                "pause": 12000
          },
          {
                "text": "Start with 'whip.' Change /p/ to /z/. What's the word? Whiz! Like when something goes really fast: whizzzzz!",
                "pause": 12000
          },
          {
                "text": "Start with 'which.' Change /ch/ to /sk/. What's the word? Whisk! Like a kitchen tool! You're building /wh/ words!",
                "pause": 10000
          },
          {
                "text": "Now let's read sentences with /wh/ words. Listen, then read: 'When will we go?' Point to each word: When... will... we... go?",
                "pause": 12000
          },
          {
                "text": "Another: 'What is that which I see?' Let's read: What... is... that... which... I... see? Great reading!",
                "pause": 12000
          },
          {
                "text": "One more: 'Where can I get the whip?' Read with me. Excellent! You're reading /wh/ words fluently!",
                "pause": 10000
          },
          {
                "text": "Wonderful work! You learned the /wh/ sound and the five question words: what, when, where, why, which. These are words you'll use forever! Keep practicing, and I'll see you tomorrow!",
                "pause": 12000
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 8
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! Wow, you've learned FOUR digraphs in two weeks! /sh/, /ch/, /th/, and /wh/. That's amazing! Today we're going to practice all of them together and make sure you can tell them apart.",
                "pause": 10000
          },
          {
                "text": "Let's review: /sh/ hisses like 'shhh,' /ch/ pops like a train, /th/ has your tongue between your teeth, and /wh/ blows a little air. Say them with me: /sh/, /ch/, /th/, /wh/.",
                "pause": 10000
          },
          {
                "text": "Each digraph uses TWO letters to make ONE sound. That's what makes them special! Today we'll read lots of words with all four sounds.",
                "pause": 10000
          },
          {
                "text": "Ready to practice? Let's show off everything you learned!",
                "pause": 8000
          },
          {
                "text": "First, let's practice hearing all four sounds. I'll say a word, and you tell me which digraph it has: /sh/, /ch/, /th/, or /wh/. Ready? 'Shop.' Which digraph? /sh/!",
                "pause": 12000
          },
          {
                "text": "Next: 'chip.' Which digraph? /ch/! 'This.' Which digraph? /th/! You're doing great!",
                "pause": 12000
          },
          {
                "text": "Let's try: 'when.' Which digraph? /wh/! 'Fish.' Which digraph? /sh/! 'Much.' Which digraph? /ch/!",
                "pause": 12000
          },
          {
                "text": "More practice: 'path.' Which digraph? /th/! 'Which.' Which digraph? /wh/! 'Brush.' Which digraph? /sh/!",
                "pause": 12000
          },
          {
                "text": "Tricky ones: 'bench.' Which digraph? /ch/! 'Thin.' Which digraph? /th/! You can hear all four digraphs perfectly!",
                "pause": 12000
          },
          {
                "text": "Excellent listening! You can tell /sh/, /ch/, /th/, and /wh/ apart. That's a super important skill!",
                "pause": 10000
          },
          {
                "text": "Now let's blend words with all four digraphs mixed together. Ready? /sh/-/i/-/p/. What's the word? Ship!",
                "pause": 10000
          },
          {
                "text": "/ch/-/o/-/p/. What's the word? Chop! /th/-/i/-/s/. What's the word? This!",
                "pause": 10000
          },
          {
                "text": "/wh/-/e/-/n/. What's the word? When! /sh/-/o/-/p/. What's the word? Shop!",
                "pause": 10000
          },
          {
                "text": "/m/-/u/-/ch/. What's the word? Much! /p/-/a/-/th/. What's the word? Path!",
                "pause": 10000
          },
          {
                "text": "/wh/-/i/-/ch/. What's the word? Which! You're blending all the digraphs like a champion!",
                "pause": 10000
          },
          {
                "text": "Let's read word lists with all four digraphs. First, /sh/ words. Read with me: shop, ship, fish, dish, rush, brush.",
                "pause": 12000
          },
          {
                "text": "Now /ch/ words: chip, chop, chat, much, lunch, bench. Great reading!",
                "pause": 12000
          },
          {
                "text": "Now /th/ words: this, that, them, thin, thick, path. You're doing both buzzy and quiet /th/!",
                "pause": 12000
          },
          {
                "text": "Now /wh/ words: when, what, where, why, which, whip. Excellent!",
                "pause": 12000
          },
          {
                "text": "Now let's MIX them all up! Read this list: shop, chip, this, when, fish, much, that, which, brush, path, chat, where. Amazing work!",
                "pause": 12000
          },
          {
                "text": "Let's tap out sounds in digraph words. Remember, each digraph is ONE sound! Ready? 'Shop.' Tap: /sh/-/o/-/p/. Three sounds!",
                "pause": 12000
          },
          {
                "text": "'Chip.' Tap: /ch/-/i/-/p/. Three sounds! 'This.' Tap: /th/-/i/-/s/. Three sounds!",
                "pause": 12000
          },
          {
                "text": "'When.' Tap: /wh/-/e/-/n/. Three sounds! 'Lunch.' Tap: /l/-/u/-/n/-/ch/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "'Brush.' Tap: /b/-/r/-/u/-/sh/. Four sounds! You're tapping digraphs perfectly!",
                "pause": 10000
          },
          {
                "text": "Let's build words by changing digraphs! Start with 'ship.' Change /sh/ to /ch/. What's the word? Chip! Change /ch/ to /wh/. What's the word? Whip!",
                "pause": 12000
          },
          {
                "text": "Start with 'chat.' Change /ch/ to /th/. What's the word? That! Change /th/ to /wh/. What's the word? What!",
                "pause": 12000
          },
          {
                "text": "Start with 'dish.' Change /sh/ to /th/. What's the word? Dith? Nope, not a word! Some changes don't make real words - and that's okay!",
                "pause": 12000
          },
          {
                "text": "Now let's read sentences with ALL FOUR digraphs! Listen, then read: 'When can I shop for fish and chips?' Point to each word and read.",
                "pause": 14000
          },
          {
                "text": "Another: 'This bench is where I chat and munch lunch.' Let's read together. Count how many digraphs you find!",
                "pause": 14000
          },
          {
                "text": "One more challenge: 'What is that thick path which I see?' Read it carefully. Great work!",
                "pause": 14000
          },
          {
                "text": "Fantastic! You just practiced all four digraphs together: /sh/, /ch/, /th/, and /wh/. You can hear them, blend them, tap them, and read them in words and sentences!",
                "pause": 12000
          },
          {
                "text": "Tomorrow is assessment day. You're going to show off all your digraph skills! Keep practicing, and I'll see you next time. You're doing amazing!",
                "pause": 10000
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 8
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You've worked so hard for two weeks learning four digraphs: /sh/, /ch/, /th/, and /wh/. Today is assessment day - your chance to show off everything you learned! You're going to do great!",
                "pause": 10000
          },
          {
                "text": "Remember, this isn't a test - it's a celebration of your learning! You'll identify sounds, read words, tap sounds, and read sentences. Take your time!",
                "pause": 8000
          },
          {
                "text": "Let's review one more time: /sh/ hisses, /ch/ pops, /th/ uses your tongue between teeth, /wh/ blows air. You've got this!",
                "pause": 8000
          },
          {
                "text": "First, I'll say a word and you tell me which digraph you hear: /sh/, /ch/, /th/, or /wh/. Ready? Word 1: 'ship.' Which digraph? /sh/!",
                "pause": 12000
          },
          {
                "text": "Word 2: 'lunch.' Which digraph? /ch/! Word 3: 'that.' Which digraph? /th/! Word 4: 'when.' Which digraph? /wh/!",
                "pause": 12000
          },
          {
                "text": "Word 5: 'brush.' Which digraph? /sh/! Word 6: 'bench.' Which digraph? /ch/! Word 7: 'thick.' Which digraph? /th/!",
                "pause": 12000
          },
          {
                "text": "Word 8: 'which.' Which digraph? /wh/! Word 9: 'fish.' Which digraph? /sh/! Word 10: 'path.' Which digraph? /th/!",
                "pause": 12000
          },
          {
                "text": "Great job identifying digraphs! You can hear all four sounds clearly!",
                "pause": 10000
          },
          {
                "text": "Now let's tap sounds. Remember, each digraph is ONE sound! Word 1: 'shop.' Tap the sounds. /sh/-/o/-/p/. Three sounds!",
                "pause": 12000
          },
          {
                "text": "Word 2: 'chip.' Tap it. /ch/-/i/-/p/. Three sounds! Word 3: 'this.' Tap: /th/-/i/-/s/. Three sounds!",
                "pause": 12000
          },
          {
                "text": "Word 4: 'when.' Tap: /wh/-/e/-/n/. Three sounds! Word 5: 'much.' Tap: /m/-/u/-/ch/. Three sounds!",
                "pause": 12000
          },
          {
                "text": "Word 6: 'brush.' Tap: /b/-/r/-/u/-/sh/. Four sounds! Word 7: 'lunch.' Tap: /l/-/u/-/n/-/ch/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Word 8: 'which.' Tap: /wh/-/i/-/ch/. Three sounds - and it has TWO digraphs! Excellent segmenting!",
                "pause": 10000
          },
          {
                "text": "Now I'll say sounds and you blend them into words. Ready? /sh/-/i/-/p/. What's the word? Ship!",
                "pause": 12000
          },
          {
                "text": "/ch/-/a/-/t/. What's the word? Chat! /th/-/a/-/t/. What's the word? That!",
                "pause": 12000
          },
          {
                "text": "/wh/-/a/-/t/. What's the word? What! /m/-/u/-/ch/. What's the word? Much!",
                "pause": 12000
          },
          {
                "text": "/p/-/a/-/th/. What's the word? Path! /wh/-/i/-/ch/. What's the word? Which! Perfect blending!",
                "pause": 12000
          },
          {
                "text": "Now let's read a list of digraph words. Take your time and read each one clearly. Word 1: 'dish.' Word 2: 'chat.' Word 3: 'this.'",
                "pause": 14000
          },
          {
                "text": "Word 4: 'when.' Word 5: 'shop.' Word 6: 'much.' Word 7: 'that.' Word 8: 'which.'",
                "pause": 14000
          },
          {
                "text": "Word 9: 'fish.' Word 10: 'chip.' Word 11: 'path.' Word 12: 'where.' Word 13: 'rush.' Word 14: 'bench.'",
                "pause": 14000
          },
          {
                "text": "Word 15: 'thick.' Word 16: 'what.' Word 17: 'brush.' Word 18: 'lunch.' Excellent reading! 18 digraph words!",
                "pause": 12000
          },
          {
                "text": "Now let's read sentences. Read smoothly and point to each word. Sentence 1: 'When can I shop for fish?'",
                "pause": 14000
          },
          {
                "text": "Sentence 2: 'This is the bench where I chat.' Take your time and point to each word.",
                "pause": 14000
          },
          {
                "text": "Sentence 3: 'What is that thick path which I see?' Read carefully - lots of digraphs!",
                "pause": 14000
          },
          {
                "text": "Sentence 4: 'I wish to munch chips and brush my teeth.' Great reading!",
                "pause": 14000
          },
          {
                "text": "Sentence 5: 'The chick can rush on the path then splash in the bath.' Wow! You just read a sentence with SIX digraph words!",
                "pause": 14000
          },
          {
                "text": "Let's test your digraph ears one more time! I'll say a word. Tell me if it has /sh/ and /ch/, or /th/ and /wh/, or just ONE digraph. Ready? 'Lunchbox.' What digraphs? /ch/!",
                "pause": 12000
          },
          {
                "text": "'Wishful.' What digraphs? /sh/! 'Bathtub.' What digraphs? /th/ - twice! 'Brushing.' What digraphs? /sh/ and /ing/! You're a digraph expert!",
                "pause": 12000
          },
          {
                "text": "Last challenge! I'll time you for one minute while you read this passage with LOTS of digraphs. Read smoothly and accurately. Don't rush - just read at your best pace. Ready? Go!",
                "pause": 15000
          },
          {
                "text": "[One minute timed reading: 'When I shop, I wish to get fish and chips. I chat with Chad at the bench. This is the path where we rush. What is that which I see? It is thick and much fun!']",
                "pause": 12000
          },
          {
                "text": "Amazing work! You showed me that you can identify /sh/, /ch/, /th/, and /wh/ sounds, segment them, blend them, read them in words, and read them in sentences! I'm so proud of you!",
                "pause": 14000
          },
          {
                "text": "Next week we'll learn consonant blends - sounds that slide together. You're becoming such a strong reader! Keep practicing your digraphs, and I'll see you next time!",
                "pause": 10000
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="8"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek8Lesson(day);
    }
  });
}
