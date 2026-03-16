/**
 * Week 7 Mini-Lessons: /sh/ /ch/
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: digraphs
 * Sight words: she, much, with
 */

class BillyWeek7Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 7 lesson scripts
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
    // Day 1 — Week 7
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! Today we're learning a special sound that uses TWO letters working together. It's the /sh/ sound, like when you say 'Shhh, be quiet!' Let's have fun with /sh/ words!",
                "pause": 10000
          },
          {
                "text": "The /sh/ sound is made with the letters S and H together. When you see S-H, they don't make their own sounds - they team up to make /sh/. Watch my mouth: /sh/, /sh/, /sh/.",
                "pause": 8000
          },
          {
                "text": "Let's practice together. When I point to you, say /sh/ three times. Ready? /sh/, /sh/, /sh/. Great job! The air comes out softly between your teeth.",
                "pause": 10000
          },
          {
                "text": "Today we'll learn three word families with /sh/: -ash words like 'fish,' -ish words like 'wish,' and -ush words like 'rush.' Let's start!",
                "pause": 8000
          },
          {
                "text": "First, let's find the /sh/ sound in words. Listen: 'ship.' Can you hear /sh/ at the beginning? Say 'ship' with me. /sh/-/i/-/p/. The /sh/ is at the start!",
                "pause": 10000
          },
          {
                "text": "Now listen to 'dish.' Where's the /sh/? At the end! Say it: /d/-/i/-/sh/. The /sh/ sound is at the end of 'dish.'",
                "pause": 8000
          },
          {
                "text": "Let's try a few more. I'll say a word, and you tell me if /sh/ is at the beginning or the end. Ready? 'Brush.' Where's the /sh/? At the end! 'Shark.' Where's the /sh/? At the beginning!",
                "pause": 10000
          },
          {
                "text": "Excellent listening! You can hear /sh/ at the beginning of words like 'shop' and 'shell,' and at the end of words like 'cash' and 'wash.'",
                "pause": 8000
          },
          {
                "text": "Now let's blend /sh/ words together. I'll say the sounds slowly, then you blend them fast. Listen: /sh/-/o/-/p/. What's the word? Shop! You say it: /sh/-/o/-/p/... shop!",
                "pause": 10000
          },
          {
                "text": "Let's try another. /sh/-/i/-/p/. Blend it together... ship! Now you try: /sh/-/e/-/ll/. What's the word? Shell! Perfect!",
                "pause": 10000
          },
          {
                "text": "Now let's blend words with /sh/ at the END. Listen: /f/-/i/-/sh/. What's the word? Fish! You try: /d/-/i/-/sh/. What's the word? Dish! Great blending!",
                "pause": 10000
          },
          {
                "text": "You're blending /sh/ words like a pro! Remember, S-H together makes one sound: /sh/.",
                "pause": 8000
          },
          {
                "text": "Now let's break /sh/ words into sounds. I'll say a word, and you tap out each sound. Ready? The word is 'shed.' How many sounds? Tap: /sh/-/e/-/d/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Let's try 'rush.' Tap the sounds with me: /r/-/u/-/sh/. Three sounds! Even though S-H is two letters, it makes one sound.",
                "pause": 10000
          },
          {
                "text": "Here's another: 'shop.' Tap it out: /sh/-/o/-/p/. Three sounds! And one more: 'wish.' Tap: /w/-/i/-/sh/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Great tapping! Remember, when you see S-H, it's ONE sound, not two.",
                "pause": 8000
          },
          {
                "text": "Now let's listen carefully. I'll say two words. Tell me if they BOTH have the /sh/ sound, or if only ONE does. Ready? 'Ship' and 'shop.' Do both have /sh/? Yes!",
                "pause": 10000
          },
          {
                "text": "Here's another: 'fish' and 'fast.' Do both have /sh/? No! Only 'fish' has /sh/. 'Fast' has /f/ but no /sh/.",
                "pause": 10000
          },
          {
                "text": "Let's try more. 'Brush' and 'bush.' Both have /sh/? Yes! Now: 'shell' and 'sell.' Both have /sh/? No! Only 'shell' has /sh/.",
                "pause": 10000
          },
          {
                "text": "Your /sh/ ears are working perfectly! You can tell the difference between /sh/ and other sounds.",
                "pause": 8000
          },
          {
                "text": "Now let's build some /sh/ words! Start with the word 'dish.' Say it: dish. Now change /d/ to /f/. What's the new word? Fish! You changed the first sound!",
                "pause": 12000
          },
          {
                "text": "Start with 'fish' again. Now change /f/ to /w/. What's the word? Wish! Let's try one more: change /w/ to /sw/. What's the word? Swish!",
                "pause": 12000
          },
          {
                "text": "Let's try the -ash family. Start with 'cash.' Now change /c/ to /d/. What's the word? Dash! Change /d/ to /m/. What's the word? Mash!",
                "pause": 12000
          },
          {
                "text": "You're building /sh/ words like a word wizard! Just changing one sound makes a whole new word.",
                "pause": 10000
          },
          {
                "text": "Now let's read some sentences with /sh/ words. Listen first, then read with me: 'I wish for a fish.' Point to each word as we read: I... wish... for... a... fish.",
                "pause": 12000
          },
          {
                "text": "Here's another sentence: 'She will wash the dish.' Let's read together: She... will... wash... the... dish. Great reading!",
                "pause": 12000
          },
          {
                "text": "One more: 'The fish can dash and splash.' Read with me: The... fish... can... dash... and... splash. Excellent!",
                "pause": 10000
          },
          {
                "text": "Wow! You learned the /sh/ sound today! Remember, S and H team up to make /sh/. You can read words like 'fish,' 'wish,' 'shop,' and 'brush.' Keep practicing /sh/ words, and I'll see you next time!",
                "pause": 12000
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 7
    // Total ≈ 5:00
    return     [
          {
                "text": "Hello friends! Yesterday we learned /sh/, and today we're learning another special two-letter sound: /ch/! It's like the sound a train makes: /ch/, /ch/, /ch/. Let's have fun!",
                "pause": 10000
          },
          {
                "text": "The /ch/ sound is made with the letters C and H together. When you see C-H, they team up to make /ch/. Watch: /ch/, /ch/, /ch/. Your tongue touches the top of your mouth.",
                "pause": 8000
          },
          {
                "text": "Let's practice together. When I count to three, say /ch/ three times. Ready? One, two, three... /ch/, /ch/, /ch/! Great! Feel how the air pops out?",
                "pause": 10000
          },
          {
                "text": "Today we'll learn /ch/ word families: words like 'chip,' 'chat,' 'much,' and 'lunch.' Let's get started!",
                "pause": 8000
          },
          {
                "text": "First, let's find the /ch/ sound in words. Listen: 'cheese.' Can you hear /ch/ at the beginning? Say 'cheese' with me. /ch/-/ee/-/z/. The /ch/ is at the start!",
                "pause": 10000
          },
          {
                "text": "Now listen to 'lunch.' Where's the /ch/? At the end! Say it: /l/-/u/-/n/-/ch/. The /ch/ sound comes at the end of 'lunch.'",
                "pause": 8000
          },
          {
                "text": "Let's practice more. I'll say a word - you tell me if /ch/ is at the beginning or the end. 'Bench.' Where's the /ch/? At the end! 'Chin.' Where's /ch/? At the beginning!",
                "pause": 10000
          },
          {
                "text": "Perfect listening! You hear /ch/ at the beginning of 'chop' and 'chip,' and at the end of 'much' and 'catch.'",
                "pause": 8000
          },
          {
                "text": "Now let's blend /ch/ words. I'll say the sounds slowly, you blend them fast. Listen: /ch/-/i/-/p/. What's the word? Chip! You say it: /ch/-/i/-/p/... chip!",
                "pause": 10000
          },
          {
                "text": "Another one: /ch/-/o/-/p/. Blend it... chop! Now you try: /ch/-/a/-/t/. What's the word? Chat! Excellent blending!",
                "pause": 10000
          },
          {
                "text": "Let's blend words with /ch/ at the END. Listen: /m/-/u/-/ch/. What's the word? Much! You try: /l/-/u/-/n/-/ch/. What's the word? Lunch! Great!",
                "pause": 10000
          },
          {
                "text": "You're blending /ch/ words perfectly! C-H together makes one sound: /ch/.",
                "pause": 8000
          },
          {
                "text": "Now let's break /ch/ words into sounds. I'll say 'chin,' and you tap out each sound. Ready? Tap: /ch/-/i/-/n/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Let's try 'bench.' Tap the sounds: /b/-/e/-/n/-/ch/. Four sounds! Remember, C-H is one sound, even though it's two letters.",
                "pause": 10000
          },
          {
                "text": "Here's 'chop.' Tap it: /ch/-/o/-/p/. Three sounds! And 'much': tap it out: /m/-/u/-/ch/. Three sounds!",
                "pause": 10000
          },
          {
                "text": "Excellent tapping! You know that C-H makes ONE /ch/ sound.",
                "pause": 8000
          },
          {
                "text": "Let's listen carefully to /ch/ and /sh/ sounds - they're tricky! I'll say a word. Tell me if you hear /ch/ or /sh/. Ready? 'Chip.' Is it /ch/ or /sh/? /ch/!",
                "pause": 10000
          },
          {
                "text": "Here's another: 'ship.' Is it /ch/ or /sh/? /sh/! Good listening! They sound different: /ch/ pops, /sh/ hisses.",
                "pause": 10000
          },
          {
                "text": "Let's try more. 'Catch' - /ch/ or /sh/? /ch/! 'Wish' - /ch/ or /sh/? /sh/! You're telling them apart!",
                "pause": 10000
          },
          {
                "text": "Perfect! You can hear the difference between /ch/ and /sh/. /ch/ is sharper, /sh/ is softer.",
                "pause": 8000
          },
          {
                "text": "Now let's build /ch/ words! Start with 'chip.' Say it: chip. Now change /p/ to /n/. What's the new word? Chin! You changed the last sound!",
                "pause": 12000
          },
          {
                "text": "Start with 'chin.' Now change /ch/ to /th/. What's the word? Thin! Let's try one more: change /th/ back to /ch/. What's the word? Chin again!",
                "pause": 12000
          },
          {
                "text": "Let's try the -unch family. Start with 'lunch.' Now change /l/ to /m/. What's the word? Munch! Change /m/ to /b/. What's the word? Bunch!",
                "pause": 12000
          },
          {
                "text": "You're a /ch/ word builder! Just one sound change makes a brand new word.",
                "pause": 10000
          },
          {
                "text": "Now let's read sentences with /ch/ words. Listen, then read with me: 'I can chat and chop.' Point to each word: I... can... chat... and... chop.",
                "pause": 12000
          },
          {
                "text": "Here's another: 'Munch on lunch at the bench.' Let's read: Munch... on... lunch... at... the... bench. Great reading!",
                "pause": 12000
          },
          {
                "text": "One more: 'The chick can catch a chip.' Read with me: The... chick... can... catch... a... chip. Excellent!",
                "pause": 10000
          },
          {
                "text": "Fantastic work! You learned the /ch/ sound today! Remember, C and H work together to make /ch/. You can read 'chip,' 'chat,' 'lunch,' and 'catch.' Keep practicing, and I'll see you next time!",
                "pause": 12000
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 7
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You've been doing such great work! We learned /sh/ and /ch/ this week. Today we're going to practice BOTH sounds together and make sure we can tell them apart. Ready?",
                "pause": 10000
          },
          {
                "text": "Remember: /sh/ is the soft sound like 'shhh,' and /ch/ is the sharp sound like a train. Let's say them: /sh/... /ch/... /sh/... /ch/. Feel the difference?",
                "pause": 10000
          },
          {
                "text": "The /sh/ sound hisses and the air comes out smoothly. The /ch/ sound pops and the air comes out quickly. Let's practice both today!",
                "pause": 10000
          },
          {
                "text": "We'll read lots of /sh/ and /ch/ words, play with sounds, and read sentences. Let's go!",
                "pause": 8000
          },
          {
                "text": "Let's warm up our /sh/ and /ch/ ears! I'll say a word, and you tell me which sound you hear. Ready? 'Dish.' Do you hear /sh/ or /ch/? /sh/! The word is dish.",
                "pause": 12000
          },
          {
                "text": "Next word: 'chip.' Is it /sh/ or /ch/? /ch/! You're right! Now try 'shop.' /sh/ or /ch/? /sh/! Great listening!",
                "pause": 12000
          },
          {
                "text": "Here's a tricky one: 'bunch.' /sh/ or /ch/? /ch/! And 'brush.' /sh/ or /ch/? /sh/! You can tell them apart!",
                "pause": 12000
          },
          {
                "text": "Let's do a few more fast. 'Lunch' - /ch/! 'Wish' - /sh/! 'Catch' - /ch/! 'Splash' - /sh/! You're a sound expert!",
                "pause": 12000
          },
          {
                "text": "Now let's find words with BOTH sounds! Listen: 'shrimp chips.' That has /sh/ in 'shrimp' AND /ch/ in 'chips.' Can you hear both?",
                "pause": 10000
          },
          {
                "text": "Here's another: 'munch a fish sandwich.' That has /ch/ in 'munch,' /sh/ in 'fish,' and BOTH in 'sandwich!' Amazing!",
                "pause": 10000
          },
          {
                "text": "Now let's blend some /sh/ words. Ready? /sh/-/o/-/p/. What's the word? Shop! You try: /r/-/u/-/sh/. What's the word? Rush!",
                "pause": 10000
          },
          {
                "text": "Great! Now let's blend /ch/ words. Listen: /ch/-/i/-/p/. What's the word? Chip! You try: /m/-/u/-/ch/. What's the word? Much!",
                "pause": 10000
          },
          {
                "text": "Let's mix them up! I'll say sounds, you blend and tell me if it's a /sh/ or /ch/ word. /f/-/i/-/sh/. What's the word? Fish! Is it /sh/ or /ch/? /sh/!",
                "pause": 12000
          },
          {
                "text": "Another: /l/-/u/-/n/-/ch/. What's the word? Lunch! /sh/ or /ch/? /ch/! You're blending and listening at the same time!",
                "pause": 12000
          },
          {
                "text": "One more challenge: /ch/-/a/-/t/. Word? Chat! And /sh/-/e/-/d/. Word? Shed! You're doing both perfectly!",
                "pause": 10000
          },
          {
                "text": "Let's build words with /sh/ and /ch/! Start with 'dish.' Now change /d/ to /f/. What's the new word? Fish! Now change /f/ to /w/. What word? Wish!",
                "pause": 12000
          },
          {
                "text": "Now let's switch to /ch/! Take 'wish' and change /w/-/i/ to /ch/-/i/. What's the word? Chish? No, that's not a word! Let's try /ch/-/i/-/p/. Chip!",
                "pause": 12000
          },
          {
                "text": "Start with 'chip.' Change /ch/ to /sh/. What's the word? Ship! See how one sound changes everything? Change /sh/ back to /ch/. Chip again!",
                "pause": 12000
          },
          {
                "text": "Let's try the end of words. Start with 'cash.' That's /sh/ at the end. Change /sh/ to /ch/. What's the word? Catch! You changed the ending!",
                "pause": 12000
          },
          {
                "text": "Amazing! You can swap /sh/ and /ch/ and make brand new words!",
                "pause": 10000
          },
          {
                "text": "Let's tap out some /sh/ and /ch/ words. First, 'fish.' Tap each sound: /f/-/i/-/sh/. Three sounds! Remember, S-H is one sound.",
                "pause": 10000
          },
          {
                "text": "Now 'chop.' Tap it: /ch/-/o/-/p/. Three sounds! C-H is also one sound.",
                "pause": 10000
          },
          {
                "text": "Here's a longer one: 'lunch.' Tap: /l/-/u/-/n/-/ch/. Four sounds! And 'brush': /b/-/r/-/u/-/sh/. Four sounds!",
                "pause": 10000
          },
          {
                "text": "You're tapping like a pro! You know that S-H and C-H are each ONE sound.",
                "pause": 8000
          },
          {
                "text": "Now let's read sentences with BOTH /sh/ and /ch/! Listen, then read: 'I wish to munch a chip.' Point to each word: I... wish... to... munch... a... chip.",
                "pause": 12000
          },
          {
                "text": "Another one: 'Shush! The chick is on the bench.' Let's read: Shush!... The... chick... is... on... the... bench. Great!",
                "pause": 12000
          },
          {
                "text": "One more: 'Chad can wash and shop for fish.' Read with me: Chad... can... wash... and... shop... for... fish. Excellent reading!",
                "pause": 12000
          },
          {
                "text": "You just read sentences with /sh/ AND /ch/ words! You can tell them apart and read them both perfectly!",
                "pause": 10000
          },
          {
                "text": "Wow! Today you practiced /sh/ and /ch/ together. You can hear the difference, blend both sounds, and read them in sentences. You're becoming such a strong reader!",
                "pause": 12000
          },
          {
                "text": "Remember: /sh/ hisses softly, /ch/ pops sharply. Keep practicing both sounds, and I'll see you next time!",
                "pause": 10000
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 7
    // Total ≈ 5:00
    return     [
          {
                "text": "Hello friends! You've been working so hard with /sh/ and /ch/ sounds! Today we're going to practice reading /sh/ and /ch/ words quickly and smoothly. That's called fluency!",
                "pause": 10000
          },
          {
                "text": "Fluency means reading words without stopping to sound them out every time. The more you practice, the faster you get. Let's build your fluency today!",
                "pause": 8000
          },
          {
                "text": "We'll read word lists, word chains, phrases, and sentences. By the end, you'll be reading /sh/ and /ch/ words like a superstar!",
                "pause": 8000
          },
          {
                "text": "Ready to read fast and smooth? Let's go!",
                "pause": 6000
          },
          {
                "text": "First, let's read a list of /sh/ words. I'll read them, then you read them with me. Ready? Shop, ship, fish, dish, rush, brush. Now you read with me!",
                "pause": 12000
          },
          {
                "text": "Great! Now let's read them again, a little faster. Shop, ship, fish, dish, rush, brush. Point to each word as you read. Nice speed!",
                "pause": 12000
          },
          {
                "text": "Now let's read /ch/ words! Listen: Chip, chop, chat, much, lunch, bench. Now you read with me: Chip, chop, chat, much, lunch, bench!",
                "pause": 12000
          },
          {
                "text": "Excellent! Let's read them faster. Chip, chop, chat, much, lunch, bench. You're getting quicker!",
                "pause": 12000
          },
          {
                "text": "Now let's mix /sh/ and /ch/ words! I'll read, then you read: Shop, chip, fish, much, ship, lunch, brush, chat. Now you read with me - mix them up!",
                "pause": 14000
          },
          {
                "text": "Fantastic! You just read 8 words without stopping. You're building fluency!",
                "pause": 10000
          },
          {
                "text": "Now let's practice word chains. I'll say a word, then we'll change ONE sound to make a new word. Start with 'dish.' Change /d/ to /f/. New word? Fish!",
                "pause": 12000
          },
          {
                "text": "Fish. Change /f/ to /w/. New word? Wish! Wish. Change /w/ to /sw/. New word? Swish! You're chaining words!",
                "pause": 12000
          },
          {
                "text": "Let's try a /ch/ chain. Start with 'chip.' Change /p/ to /n/. New word? Chin! Chin. Change /ch/ to /th/. New word? Thin!",
                "pause": 12000
          },
          {
                "text": "Thin. Change /th/ to /sh/. New word? Shin! Shin. Change /sh/ to /sp/. New word? Spin! You just chained from /ch/ to /sh/ to other sounds!",
                "pause": 12000
          },
          {
                "text": "Word chains help you read faster because you only change ONE sound each time. Great practice!",
                "pause": 10000
          },
          {
                "text": "Now let's read short phrases with /sh/ and /ch/ words. Listen first, then read with me: 'A big fish.' Point and read: A... big... fish.",
                "pause": 12000
          },
          {
                "text": "Next phrase: 'Shop for chips.' Let's read: Shop... for... chips. Now let's read it smoothly without stopping: Shop for chips!",
                "pause": 12000
          },
          {
                "text": "Another: 'Brush my chin.' Point and read: Brush... my... chin. Now smooth: Brush my chin!",
                "pause": 12000
          },
          {
                "text": "Let's try: 'Munch on lunch.' Point: Munch... on... lunch. Smooth: Munch on lunch! You're reading phrases fluently!",
                "pause": 12000
          },
          {
                "text": "One more: 'Rush to the bench.' Point first: Rush... to... the... bench. Now smooth: Rush to the bench! Perfect!",
                "pause": 12000
          },
          {
                "text": "Now let's practice reading complete sentences. First, I'll read. Then you read with me. Then you try alone. Ready? 'I wish to shop for fish.'",
                "pause": 14000
          },
          {
                "text": "Read with me, pointing to each word: I... wish... to... shop... for... fish. Now read it smoothly: I wish to shop for fish!",
                "pause": 12000
          },
          {
                "text": "Next sentence: 'Chad can chop and mash the chips.' Point and read: Chad... can... chop... and... mash... the... chips.",
                "pause": 14000
          },
          {
                "text": "Now read it smoothly: Chad can chop and mash the chips! You're reading whole sentences fluently!",
                "pause": 12000
          },
          {
                "text": "One more challenge: 'She will brush the fish and put it on a dish.' Point first, then read smoothly. You've got this!",
                "pause": 14000
          },
          {
                "text": "Let's practice repeated reading. That means reading the same sentence 2-3 times to get even faster and smoother. Here's the sentence: 'I can chat and munch lunch.'",
                "pause": 12000
          },
          {
                "text": "First read: I... can... chat... and... munch... lunch. Second read, a little faster: I can chat and munch lunch. Third read, your best: I can chat and munch lunch!",
                "pause": 12000
          },
          {
                "text": "Did you feel yourself getting faster and smoother? That's fluency! The more you practice, the better you get.",
                "pause": 10000
          },
          {
                "text": "Wow! Today you practiced reading /sh/ and /ch/ words fluently. You read word lists, word chains, phrases, and sentences. You're becoming a smooth, fast reader!",
                "pause": 12000
          },
          {
                "text": "Tomorrow we'll have an assessment to show off everything you learned this week. Keep practicing, and I'll see you next time. Great work!",
                "pause": 10000
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 7
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You've done amazing work this week learning /sh/ and /ch/ sounds! Today is assessment day - a chance to show me everything you learned. You're going to do great!",
                "pause": 10000
          },
          {
                "text": "An assessment isn't a test - it's just a way for you to show off your skills! You'll read words, tap sounds, and read sentences. Take your time and do your best!",
                "pause": 8000
          },
          {
                "text": "Remember everything you practiced: /sh/ hisses, /ch/ pops, and you can read both sounds in lots of words. Let's get started!",
                "pause": 8000
          },
          {
                "text": "First, I'm going to say some words. You tell me if you hear /sh/, /ch/, or NEITHER sound. Ready? Word 1: 'ship.' What sound? /sh/!",
                "pause": 12000
          },
          {
                "text": "Word 2: 'chip.' What sound? /ch/! Word 3: 'fast.' What sound? Neither! It has /f/ and /s/, but no /sh/ or /ch/.",
                "pause": 10000
          },
          {
                "text": "Word 4: 'lunch.' What sound? /ch/! Word 5: 'wish.' What sound? /sh/! Word 6: 'bench.' What sound? /ch/!",
                "pause": 12000
          },
          {
                "text": "Great listening! You can tell /sh/, /ch/, and other sounds apart. Let's move on!",
                "pause": 10000
          },
          {
                "text": "Now let's tap out sounds in words. I'll say a word, and you tap each sound. Ready? Word 1: 'shop.' Tap the sounds. /sh/-/o/-/p/. Three sounds!",
                "pause": 12000
          },
          {
                "text": "Word 2: 'much.' Tap it out. /m/-/u/-/ch/. Three sounds! Remember, C-H is one sound.",
                "pause": 12000
          },
          {
                "text": "Word 3: 'fish.' Tap: /f/-/i/-/sh/. Three sounds! Word 4: 'lunch.' Tap: /l/-/u/-/n/-/ch/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Word 5: 'brush.' Tap: /b/-/r/-/u/-/sh/. Four sounds! Excellent segmenting!",
                "pause": 10000
          },
          {
                "text": "Now I'll say sounds slowly, and you blend them into a word. Ready? /sh/-/i/-/p/. What's the word? Ship!",
                "pause": 12000
          },
          {
                "text": "/ch/-/o/-/p/. What's the word? Chop! /w/-/i/-/sh/. What's the word? Wish!",
                "pause": 12000
          },
          {
                "text": "/m/-/u/-/ch/. What's the word? Much! /r/-/u/-/sh/. What's the word? Rush!",
                "pause": 12000
          },
          {
                "text": "Perfect blending! You turned sounds into words quickly and correctly!",
                "pause": 10000
          },
          {
                "text": "Now let's read a list of /sh/ and /ch/ words. Read each one aloud. Take your time. Ready? Word 1: 'dish.' Word 2: 'chat.' Word 3: 'shop.'",
                "pause": 14000
          },
          {
                "text": "Word 4: 'bunch.' Word 5: 'rush.' Word 6: 'chip.' Word 7: 'splash.' Word 8: 'chick.'",
                "pause": 14000
          },
          {
                "text": "Word 9: 'bench.' Word 10: 'fish.' Word 11: 'lunch.' Word 12: 'brush.' Word 13: 'catch.' Word 14: 'wish.'",
                "pause": 14000
          },
          {
                "text": "Excellent reading! You read 14 words with /sh/ and /ch/ sounds. Great work!",
                "pause": 10000
          },
          {
                "text": "Now let's read some sentences. Read smoothly and point to each word. Sentence 1: 'I wish for a chip.'",
                "pause": 12000
          },
          {
                "text": "Sentence 2: 'The fish can rush and splash.' Take your time and point to each word.",
                "pause": 12000
          },
          {
                "text": "Sentence 3: 'Chad will chop and mash fish for lunch.' Point and read carefully.",
                "pause": 14000
          },
          {
                "text": "Sentence 4: 'She can brush the dog on the bench.' Point to each word as you read.",
                "pause": 14000
          },
          {
                "text": "Sentence 5: 'I chat and munch on chips when I shop.' Great reading! You read whole sentences fluently!",
                "pause": 12000
          },
          {
                "text": "Now let's change sounds to make new words. Start with 'dish.' Change /d/ to /f/. What's the new word? Fish!",
                "pause": 12000
          },
          {
                "text": "Start with 'chip.' Change /ch/ to /sh/. What's the word? Ship! Change /sh/ back to /ch/. What word? Chip!",
                "pause": 12000
          },
          {
                "text": "Start with 'bench.' Change /b/ to /w/. What's the word? Wench! You can manipulate sounds like a pro!",
                "pause": 12000
          },
          {
                "text": "Last challenge! I'm going to time you for one minute while you read this passage. Read as many words as you can, smoothly and correctly. Don't rush - read at your best pace. Ready? Go!",
                "pause": 15000
          },
          {
                "text": "[One minute of reading the passage: 'I wish to shop for fish and chips. Chad can chat and munch lunch at the bench. She will brush the dish. The chick can rush to the shed.']",
                "pause": 12000
          },
          {
                "text": "Fantastic work! You showed me that you can hear /sh/ and /ch/ sounds, blend them, tap them out, read them in words, and read them in sentences! I'm so proud of you!",
                "pause": 12000
          },
          {
                "text": "Next week we'll learn even more new sounds. Keep practicing /sh/ and /ch/ words, and remember: you're becoming a stronger reader every single day! See you next time!",
                "pause": 10000
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="7"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek7Lesson(day);
    }
  });
}
