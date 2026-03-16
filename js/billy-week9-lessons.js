/**
 * Week 9 Mini-Lessons: L/R blends
 * Audio-only Billy scripts (student-led, replay on each line)
 * Days 1-5: bl, cl, fl, gl, pl, sl, br, cr, dr, fr, gr, tr
 * Sight words: from, black, play
 */

class BillyWeek9Lesson extends BillyMiniLesson {
  constructor(dayNumber) {
    super();
    this.dayNumber = dayNumber;
    this.currentStep = 0;
    this.isPlaying = false;
    
    // Week 9 lesson scripts
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
    // Day 1 — Week 9
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! This week we're learning about BLENDS! Blends are different from digraphs. Remember, digraphs make ONE new sound. But blends keep BOTH sounds - they just slide together really fast!",
                "pause": 10000
          },
          {
                "text": "Today we're learning L-blends: bl, cl, fl, gl, pl, and sl. Listen: /b/-/l/ slides into 'bl' in 'block.' You can still hear both sounds! Try it: bl, bl, bl!",
                "pause": 10000
          },
          {
                "text": "Put your hand in front of your mouth. Say 'blue.' Feel how /b/ and /l/ blend together? Now say them separately: /b/... /l/. Now blend them: bl! See the difference?",
                "pause": 10000
          },
          {
                "text": "Today we'll practice all six L-blends and learn to read words like 'black,' 'clap,' 'flag,' 'glad,' 'plan,' and 'slip.' Let's go!",
                "pause": 8000
          },
          {
                "text": "Let's find L-blends at the beginning of words. Listen: 'block.' What blend do you hear? /bl/! Say it: /bl/-/o/-/k/. The first two sounds are /b/ and /l/ blended!",
                "pause": 12000
          },
          {
                "text": "Now 'clap.' What blend? /cl/! Say it: /cl/-/a/-/p/. You can hear both /k/ and /l/!",
                "pause": 10000
          },
          {
                "text": "Let's try: 'flag' - what blend? /fl/! 'Glad' - what blend? /gl/! 'Plan' - what blend? /pl/! 'Slip' - what blend? /sl/!",
                "pause": 10000
          },
          {
                "text": "Excellent! All these blends have /l/ as the second sound. That's why we call them L-blends!",
                "pause": 10000
          },
          {
                "text": "L-blends always come at the BEGINNING of words. You won't find them at the end!",
                "pause": 8000
          },
          {
                "text": "Now let's blend L-blend words together. Listen: /bl/-/a/-/k/. What's the word? Black! Say it with me: /bl/-/a/-/k/... black!",
                "pause": 12000
          },
          {
                "text": "Another: /cl/-/a/-/p/. What's the word? Clap! You try: /fl/-/a/-/g/. What's the word? Flag! Great!",
                "pause": 12000
          },
          {
                "text": "/gl/-/a/-/d/. What's the word? Glad! /pl/-/a/-/n/. What's the word? Plan!",
                "pause": 12000
          },
          {
                "text": "/sl/-/i/-/p/. What's the word? Slip! /bl/-/u/. What's the word? Blue!",
                "pause": 12000
          },
          {
                "text": "You're blending L-blend words perfectly! Remember, you hear BOTH sounds sliding together!",
                "pause": 10000
          },
          {
                "text": "Let's tap out sounds in L-blend words. This is tricky because the blend has TWO sounds! Ready? 'Block.' Tap: /b/-/l/-/o/-/k/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "'Clap.' Tap: /c/-/l/-/a/-/p/. Four sounds! Remember, we tap /c/ and /l/ separately because they're a blend, not a digraph!",
                "pause": 12000
          },
          {
                "text": "'Flag.' Tap: /f/-/l/-/a/-/g/. Four sounds! 'Slip.' Tap: /s/-/l/-/i/-/p/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Perfect! Blends have TWO sounds, so we tap them separately. Digraphs have ONE sound, so we tap them together!",
                "pause": 10000
          },
          {
                "text": "Let's practice telling blends and digraphs apart! I'll say a word. Tell me if it starts with a BLEND (two sounds) or a DIGRAPH (one sound). Ready? 'Ship.' Blend or digraph? Digraph! /sh/ is one sound!",
                "pause": 12000
          },
          {
                "text": "'Slip.' Blend or digraph? Blend! You can hear /s/ and /l/! 'Chat.' Blend or digraph? Digraph! /ch/ is one sound!",
                "pause": 12000
          },
          {
                "text": "'Clap.' Blend or digraph? Blend! /c/ and /l/! 'Flat.' Blend or digraph? Blend! /f/ and /l/!",
                "pause": 12000
          },
          {
                "text": "Excellent! You can tell the difference between blends (two sounds) and digraphs (one sound)!",
                "pause": 10000
          },
          {
                "text": "Let's build L-blend words! Start with 'black.' Change /bl/ to /cl/. What's the word? Clack! Change /cl/ to /sl/. What's the word? Slack!",
                "pause": 12000
          },
          {
                "text": "Start with 'flag.' Change /fl/ to /bl/. What's the word? Blag? Hmm, that's not a real word. Let's try 'flag' to 'sag' - take away the /l/. Sag!",
                "pause": 12000
          },
          {
                "text": "Start with 'plan.' Change /pl/ to /fl/. What's the word? Flan! That's a dessert! Change /fl/ to /cl/. What's the word? Clan!",
                "pause": 12000
          },
          {
                "text": "You're building L-blend words like a word wizard! Changing the first letter changes the whole blend!",
                "pause": 10000
          },
          {
                "text": "Let's practice all six L-blends one more time! Say each blend with me, then I'll give you a word. Ready? /bl/ - 'blue.' /cl/ - 'clap.' /fl/ - 'flag.'",
                "pause": 14000
          },
          {
                "text": "/gl/ - 'glad.' /pl/ - 'plan.' /sl/ - 'slip.' Great! You know all six L-blends: bl, cl, fl, gl, pl, sl!",
                "pause": 14000
          },
          {
                "text": "Now let's read sentences with L-blends. Listen, then read: 'The flag is black and blue.' Point to each word: The... flag... is... black... and... blue.",
                "pause": 14000
          },
          {
                "text": "Another: 'I am glad to clap and plan.' Let's read: I... am... glad... to... clap... and... plan. Great!",
                "pause": 14000
          },
          {
                "text": "One more: 'Slip on the flat glass block.' Read with me. Excellent! You just read sentences with LOTS of L-blends!",
                "pause": 12000
          },
          {
                "text": "Fantastic work! You learned six L-blends today: bl, cl, fl, gl, pl, sl. Remember, blends keep BOTH sounds - they just slide together fast! Tomorrow we'll learn R-blends. See you next time!",
                "pause": 12000
          }
    ];
  }

  getDay2Script() {
    // Day 2 — Week 9
    // Total ≈ 5:00
    return     [
          {
                "text": "Hello friends! Yesterday we learned L-blends, and today we're learning R-blends! R-blends work just like L-blends - two sounds that slide together fast!",
                "pause": 10000
          },
          {
                "text": "Today's R-blends are: br, cr, dr, fr, gr, pr, and tr. That's SEVEN blends! Listen: /b/-/r/ slides into 'br' in 'brave.' Try it: br, br, br!",
                "pause": 10000
          },
          {
                "text": "The /r/ sound can be tricky! Your tongue curls up a little bit. Say /r/... now say /b/... now blend them: br! Feel how they slide together?",
                "pause": 10000
          },
          {
                "text": "Today we'll learn words like 'bring,' 'crab,' 'drop,' 'frog,' 'grass,' 'press,' and 'trip.' Let's practice!",
                "pause": 8000
          },
          {
                "text": "Let's find R-blends at the beginning of words. Listen: 'bring.' What blend do you hear? /br/! Say it: /br/-/i/-/ng/. /b/ and /r/ blend together!",
                "pause": 12000
          },
          {
                "text": "Now 'crab.' What blend? /cr/! Say it: /cr/-/a/-/b/. You can hear both /k/ and /r/!",
                "pause": 10000
          },
          {
                "text": "Let's try: 'drop' - what blend? /dr/! 'Frog' - what blend? /fr/! 'Grass' - what blend? /gr/!",
                "pause": 12000
          },
          {
                "text": "'Press' - what blend? /pr/! 'Trip' - what blend? /tr/! You found all seven R-blends!",
                "pause": 12000
          },
          {
                "text": "Excellent! All these blends have /r/ as the second sound. That's why we call them R-blends!",
                "pause": 10000
          },
          {
                "text": "Just like L-blends, R-blends come at the BEGINNING of words!",
                "pause": 8000
          },
          {
                "text": "Now let's blend R-blend words. Listen: /br/-/i/-/ng/. What's the word? Bring! Say it with me: /br/-/i/-/ng/... bring!",
                "pause": 12000
          },
          {
                "text": "/cr/-/a/-/b/. What's the word? Crab! You try: /dr/-/o/-/p/. What's the word? Drop! Great!",
                "pause": 12000
          },
          {
                "text": "/fr/-/o/-/g/. What's the word? Frog! /gr/-/a/-/s/. What's the word? Grass!",
                "pause": 12000
          },
          {
                "text": "/pr/-/e/-/s/. What's the word? Press! /tr/-/i/-/p/. What's the word? Trip!",
                "pause": 12000
          },
          {
                "text": "Let's try some more! /br/-/a/-/g/. Brag! /gr/-/i/-/n/. Grin!",
                "pause": 12000
          },
          {
                "text": "You're blending R-blend words perfectly! BOTH sounds slide together!",
                "pause": 10000
          },
          {
                "text": "Let's tap out R-blend words. Remember, blends have TWO sounds! Ready? 'Bring.' Tap: /b/-/r/-/i/-/ng/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "'Crab.' Tap: /c/-/r/-/a/-/b/. Four sounds! We tap /c/ and /r/ separately!",
                "pause": 12000
          },
          {
                "text": "'Frog.' Tap: /f/-/r/-/o/-/g/. Four sounds! 'Trip.' Tap: /t/-/r/-/i/-/p/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Perfect tapping! Remember: blends = two sounds, digraphs = one sound!",
                "pause": 10000
          },
          {
                "text": "Let's practice hearing the difference between L-blends and R-blends! I'll say a word. Tell me if it has an L-blend or R-blend. Ready? 'Bring.' L or R? R-blend!",
                "pause": 12000
          },
          {
                "text": "'Flag.' L or R? L-blend! 'Crab.' L or R? R-blend! 'Clap.' L or R? L-blend!",
                "pause": 12000
          },
          {
                "text": "'Frog.' L or R? R-blend! 'Slip.' L or R? L-blend! 'Grass.' L or R? R-blend!",
                "pause": 12000
          },
          {
                "text": "Excellent! You can tell L-blends and R-blends apart just by listening!",
                "pause": 10000
          },
          {
                "text": "Let's build R-blend words! Start with 'bring.' Change /br/ to /gr/. What's the word? Gring? Nope, not a word. Let's try 'bring' to 'ring' - take away the /b/. Ring!",
                "pause": 12000
          },
          {
                "text": "Start with 'crab.' Change /cr/ to /gr/. What's the word? Grab! Change /gr/ to /dr/. What's the word? Drab!",
                "pause": 12000
          },
          {
                "text": "Start with 'trip.' Change /tr/ to /dr/. What's the word? Drip! Change /dr/ to /gr/. What's the word? Grip!",
                "pause": 12000
          },
          {
                "text": "Amazing! You can swap R-blends and make brand new words!",
                "pause": 10000
          },
          {
                "text": "Let's practice all seven R-blends! Say each blend with me, then a word. Ready? /br/ - 'bring.' /cr/ - 'crab.' /dr/ - 'drop.' /fr/ - 'frog.'",
                "pause": 16000
          },
          {
                "text": "/gr/ - 'grass.' /pr/ - 'press.' /tr/ - 'trip.' Fantastic! You know all seven R-blends: br, cr, dr, fr, gr, pr, tr!",
                "pause": 14000
          },
          {
                "text": "Now let's read sentences with R-blends. Listen, then read: 'The frog can trip on grass.' Point to each word: The... frog... can... trip... on... grass.",
                "pause": 14000
          },
          {
                "text": "Another: 'I will bring a crab and drop it.' Let's read: I... will... bring... a... crab... and... drop... it. Great!",
                "pause": 14000
          },
          {
                "text": "One more: 'Press on the trap and grab it.' Read with me. Excellent! So many R-blends!",
                "pause": 12000
          },
          {
                "text": "Wonderful work! You learned seven R-blends today: br, cr, dr, fr, gr, pr, tr. Tomorrow we'll learn S-blends - that's even MORE blends! You're becoming a blend expert! See you next time!",
                "pause": 12000
          }
    ];
  }

  getDay3Script() {
    // Day 3 — Week 9
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! You've learned L-blends and R-blends, and today we're learning S-blends! S-blends are special because /s/ comes FIRST, then another consonant!",
                "pause": 10000
          },
          {
                "text": "Today's S-blends are: sc, sk, sm, sn, sp, st, and sw. That's SEVEN more blends! Listen: /s/-/k/ slides into 'sk' in 'skip.' Try it: sk, sk, sk!",
                "pause": 10000
          },
          {
                "text": "The /s/ sound is easy - it hisses like a snake: /s/. Now add another sound: /s/-/t/ = st! Say them: sc, sk, sm, sn, sp, st, sw!",
                "pause": 10000
          },
          {
                "text": "Today we'll learn words like 'skip,' 'stop,' 'snap,' 'swim,' 'spot,' and 'smell.' Let's go!",
                "pause": 8000
          },
          {
                "text": "Let's find S-blends at the beginning of words. Listen: 'skip.' What blend? /sk/! Say it: /sk/-/i/-/p/. /s/ and /k/ blend together!",
                "pause": 12000
          },
          {
                "text": "Now 'stop.' What blend? /st/! Say it: /st/-/o/-/p/. You hear /s/ and /t/!",
                "pause": 10000
          },
          {
                "text": "'Snap' - what blend? /sn/! 'Swim' - what blend? /sw/! 'Spot' - what blend? /sp/!",
                "pause": 12000
          },
          {
                "text": "'Smell' - what blend? /sm/! 'Scan' - what blend? /sc/! You found all seven!",
                "pause": 12000
          },
          {
                "text": "Great work! All these blends start with /s/. That's why we call them S-blends!",
                "pause": 10000
          },
          {
                "text": "S-blends are super common! You use them all the time in words like 'stop,' 'stand,' 'smile,' and 'snow.'",
                "pause": 10000
          },
          {
                "text": "S-blends always come at the BEGINNING of words, just like L-blends and R-blends!",
                "pause": 8000
          },
          {
                "text": "Let's blend S-blend words! Listen: /sk/-/i/-/p/. What's the word? Skip! Say it with me: /sk/-/i/-/p/... skip!",
                "pause": 12000
          },
          {
                "text": "/st/-/o/-/p/. What's the word? Stop! You try: /sn/-/a/-/p/. What's the word? Snap! Great!",
                "pause": 12000
          },
          {
                "text": "/sw/-/i/-/m/. What's the word? Swim! /sp/-/o/-/t/. What's the word? Spot!",
                "pause": 12000
          },
          {
                "text": "/sm/-/e/-/ll/. What's the word? Smell! /st/-/a/-/nd/. What's the word? Stand!",
                "pause": 12000
          },
          {
                "text": "More practice! /sn/-/o/. What's the word? Snow! /sp/-/i/-/n/. What's the word? Spin!",
                "pause": 12000
          },
          {
                "text": "Perfect blending! You're sliding those S-sounds together smoothly!",
                "pause": 10000
          },
          {
                "text": "Let's tap out S-blend words. Remember, blends = TWO sounds! Ready? 'Skip.' Tap: /s/-/k/-/i/-/p/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "'Stop.' Tap: /s/-/t/-/o/-/p/. Four sounds! We tap /s/ and /t/ separately!",
                "pause": 12000
          },
          {
                "text": "'Snap.' Tap: /s/-/n/-/a/-/p/. Four sounds! 'Swim.' Tap: /s/-/w/-/i/-/m/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Excellent! S-blends have TWO sounds that slide together!",
                "pause": 10000
          },
          {
                "text": "Now you know THREE types of blends: L-blends, R-blends, and S-blends! Let's practice telling them apart. I'll say a word - you tell me which type. Ready? 'Flag.' What type? L-blend!",
                "pause": 14000
          },
          {
                "text": "'Bring.' What type? R-blend! 'Stop.' What type? S-blend! 'Clap.' What type? L-blend!",
                "pause": 12000
          },
          {
                "text": "'Swim.' What type? S-blend! 'Frog.' What type? R-blend! 'Slip.' What type? L-blend!",
                "pause": 12000
          },
          {
                "text": "Amazing! You can identify all three blend types just by listening!",
                "pause": 10000
          },
          {
                "text": "Let's build S-blend words! Start with 'stop.' Change /st/ to /sp/. What's the word? Spop? Nope! Let's try 'stop' to 'top' - take away the /s/. Top!",
                "pause": 12000
          },
          {
                "text": "Start with 'snap.' Change /sn/ to /sl/. What's the word? Slap! Change /sl/ to /cl/. What's the word? Clap!",
                "pause": 12000
          },
          {
                "text": "Start with 'swim.' Change /sw/ to /tr/. What's the word? Trim! Now change /tr/ to /br/. What's the word? Brim!",
                "pause": 12000
          },
          {
                "text": "You're swapping blends like a pro! You can change L, R, and S-blends to make new words!",
                "pause": 10000
          },
          {
                "text": "Let's practice all seven S-blends! Say each one with me, then a word. /sc/ - 'scan.' /sk/ - 'skip.' /sm/ - 'smell.' /sn/ - 'snap.' /sp/ - 'spot.' /st/ - 'stop.' /sw/ - 'swim.' Perfect!",
                "pause": 16000
          },
          {
                "text": "Now let's read sentences with S-blends. Listen, then read: 'Stop and smell the spot.' Point to each word: Stop... and... smell... the... spot.",
                "pause": 14000
          },
          {
                "text": "Another: 'I can skip and swim and spin.' Let's read: I... can... skip... and... swim... and... spin. Great!",
                "pause": 14000
          },
          {
                "text": "One more: 'The snail can snap on the step.' Read with me. Excellent! So many S-blends!",
                "pause": 12000
          },
          {
                "text": "Fantastic work! You learned seven S-blends: sc, sk, sm, sn, sp, st, sw. Now you know L-blends, R-blends, AND S-blends! Tomorrow we'll learn ending blends. You're a blend master! See you next time!",
                "pause": 14000
          }
    ];
  }

  getDay4Script() {
    // Day 4 — Week 9
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! All week you've been learning blends at the BEGINNING of words. But guess what? Some blends come at the END of words too! Today we're learning ending blends!",
                "pause": 10000
          },
          {
                "text": "Ending blends work just like beginning blends - two sounds that slide together. But they come at the END! Listen: 'gift' ends with /ft/. 'Jump' ends with /mp/. Try them: /ft/, /mp/!",
                "pause": 10000
          },
          {
                "text": "Today we'll learn lots of ending blends: ft, ld, lk, lt, mp, nd, nk, nt, pt, sk, and st. That's ELEVEN blends!",
                "pause": 10000
          },
          {
                "text": "We'll read words like 'left,' 'cold,' 'help,' 'jump,' 'hand,' 'pink,' 'bent,' and 'desk.' Let's start!",
                "pause": 8000
          },
          {
                "text": "Let's find ending blends in words. Listen: 'left.' What blend is at the END? /ft/! Say the whole word: /l/-/e/-/ft/. The last two sounds are /f/ and /t/!",
                "pause": 12000
          },
          {
                "text": "Now 'cold.' What ending blend? /ld/! Say it: /c/-/o/-/ld/. /l/ and /d/ at the end!",
                "pause": 10000
          },
          {
                "text": "'Jump' - what ending blend? /mp/! 'Hand' - ending blend? /nd/! 'Pink' - ending blend? /nk/!",
                "pause": 12000
          },
          {
                "text": "'Bent' - ending blend? /nt/! 'Desk' - ending blend? /sk/! 'Fast' - ending blend? /st/!",
                "pause": 12000
          },
          {
                "text": "Great listening! You can hear blends at the END of words, not just the beginning!",
                "pause": 10000
          },
          {
                "text": "Some ending blends are SUPER common, like -nd in 'hand,' 'sand,' and 'land,' or -st in 'fast,' 'last,' and 'best.'",
                "pause": 10000
          },
          {
                "text": "Let's blend words with ending blends. Listen: /l/-/e/-/ft/. What's the word? Left! Say it with me: /l/-/e/-/ft/... left!",
                "pause": 12000
          },
          {
                "text": "/c/-/o/-/ld/. What's the word? Cold! You try: /j/-/u/-/mp/. What's the word? Jump! Great!",
                "pause": 12000
          },
          {
                "text": "/h/-/a/-/nd/. What's the word? Hand! /p/-/i/-/nk/. What's the word? Pink!",
                "pause": 12000
          },
          {
                "text": "/b/-/e/-/nt/. What's the word? Bent! /d/-/e/-/sk/. What's the word? Desk!",
                "pause": 12000
          },
          {
                "text": "/f/-/a/-/st/. What's the word? Fast! /m/-/i/-/lk/. What's the word? Milk!",
                "pause": 12000
          },
          {
                "text": "Excellent blending! You're hearing those ending blends clearly!",
                "pause": 10000
          },
          {
                "text": "Let's tap out words with ending blends. Remember, blends = TWO sounds! Ready? 'Left.' Tap: /l/-/e/-/f/-/t/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "'Jump.' Tap: /j/-/u/-/m/-/p/. Four sounds! We tap the /m/ and /p/ separately at the end!",
                "pause": 12000
          },
          {
                "text": "'Hand.' Tap: /h/-/a/-/n/-/d/. Four sounds! 'Pink.' Tap: /p/-/i/-/n/-/k/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Perfect! Ending blends have TWO sounds, just like beginning blends!",
                "pause": 10000
          },
          {
                "text": "Let's practice hearing where blends are! I'll say a word. Tell me if the blend is at the BEGINNING or the END. Ready? 'Stop.' Beginning or end? Beginning! /st/ starts the word!",
                "pause": 12000
          },
          {
                "text": "'Fast.' Beginning or end? End! /st/ ends the word! Same blend, different position!",
                "pause": 12000
          },
          {
                "text": "'Desk.' Beginning or end? End! /sk/ at the end! 'Skip.' Beginning or end? Beginning! /sk/ at the start!",
                "pause": 12000
          },
          {
                "text": "Excellent! You can tell if a blend is at the beginning or the end just by listening!",
                "pause": 10000
          },
          {
                "text": "Some ending blends are used in LOTS of words! The -nd blend is super popular: 'hand,' 'sand,' 'land,' 'band,' 'stand.' Say them with me!",
                "pause": 14000
          },
          {
                "text": "The -st blend too: 'fast,' 'last,' 'best,' 'rest,' 'test.' So many words end with -st!",
                "pause": 14000
          },
          {
                "text": "And the -nk blend: 'pink,' 'sink,' 'think,' 'bank,' 'thank.' You use these words every day!",
                "pause": 14000
          },
          {
                "text": "When you know ending blends, you can read hundreds of new words!",
                "pause": 10000
          },
          {
                "text": "Let's build words with ending blends! Start with 'hand.' Change /h/ to /b/. What's the word? Band! Change /b/ to /l/. What's the word? Land!",
                "pause": 12000
          },
          {
                "text": "Start with 'fast.' Change /f/ to /l/. What's the word? Last! Change /l/ to /b/. What's the word? Bast? Hmm, not common. Let's try /m/ - mast!",
                "pause": 12000
          },
          {
                "text": "Start with 'pink.' Change /p/ to /s/. What's the word? Sink! Change /s/ to /th/. What's the word? Think! You're building ending-blend words!",
                "pause": 12000
          },
          {
                "text": "Now let's read sentences with ending blends. Listen, then read: 'I left the pink gift on the desk.' Point to each word and read.",
                "pause": 14000
          },
          {
                "text": "Another: 'The cold hand can jump fast in the sand.' Let's read together. Count the ending blends!",
                "pause": 14000
          },
          {
                "text": "One more: 'I think I bent the best tent at camp.' Read with me. Excellent! So many ending blends!",
                "pause": 12000
          },
          {
                "text": "Amazing work! You learned ending blends today! Now you can read blends at the BEGINNING (bl, cr, st) AND at the END (ft, nd, nk, st)! Tomorrow is assessment day. You're ready to show off everything you learned! See you next time!",
                "pause": 14000
          }
    ];
  }

  getDay5Script() {
    // Day 5 — Week 9
    // Total ≈ 5:00
    return     [
          {
                "text": "Hi friends! What an amazing week! You learned L-blends, R-blends, S-blends, AND ending blends! Today is assessment day - time to show me everything you know about blends!",
                "pause": 10000
          },
          {
                "text": "Remember, blends keep BOTH sounds - they just slide together. This assessment will check if you can hear them, blend them, tap them, and read them. You're going to do great!",
                "pause": 8000
          },
          {
                "text": "Take your time and do your best. Let's show off your blend skills!",
                "pause": 8000
          },
          {
                "text": "First, I'll say a word. Tell me if it has an L-blend, R-blend, S-blend, or ending blend. Ready? Word 1: 'flag.' What type? L-blend!",
                "pause": 14000
          },
          {
                "text": "Word 2: 'bring.' What type? R-blend! Word 3: 'stop.' What type? S-blend! Word 4: 'hand.' What type? Ending blend!",
                "pause": 12000
          },
          {
                "text": "Word 5: 'clip.' What type? L-blend! Word 6: 'frog.' What type? R-blend! Word 7: 'swim.' What type? S-blend!",
                "pause": 14000
          },
          {
                "text": "Word 8: 'desk.' What type? Ending blend! Word 9: 'glad.' What type? L-blend! Word 10: 'fast.' What type? Ending blend!",
                "pause": 14000
          },
          {
                "text": "Great! You can identify all four types of blends!",
                "pause": 10000
          },
          {
                "text": "Now let's tap out blend words. Remember, blends have TWO sounds! Word 1: 'flag.' Tap the sounds. /f/-/l/-/a/-/g/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Word 2: 'bring.' Tap: /b/-/r/-/i/-/ng/. Four sounds! Word 3: 'stop.' Tap: /s/-/t/-/o/-/p/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Word 4: 'hand.' Tap: /h/-/a/-/n/-/d/. Four sounds! Word 5: 'swim.' Tap: /s/-/w/-/i/-/m/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Word 6: 'desk.' Tap: /d/-/e/-/s/-/k/. Four sounds! Word 7: 'clip.' Tap: /c/-/l/-/i/-/p/. Four sounds!",
                "pause": 12000
          },
          {
                "text": "Word 8: 'frog.' Tap: /f/-/r/-/o/-/g/. Four sounds! Word 9: 'plant.' Tap: /p/-/l/-/a/-/n/-/t/. Five sounds!",
                "pause": 12000
          },
          {
                "text": "Word 10: 'craft.' Tap: /c/-/r/-/a/-/f/-/t/. Five sounds - a beginning AND ending blend! Excellent!",
                "pause": 10000
          },
          {
                "text": "Now I'll say sounds slowly, and you blend them into words. Ready? /fl/-/a/-/g/. What's the word? Flag!",
                "pause": 12000
          },
          {
                "text": "/br/-/i/-/ng/. What's the word? Bring! /st/-/o/-/p/. What's the word? Stop!",
                "pause": 12000
          },
          {
                "text": "/cl/-/a/-/p/. What's the word? Clap! /fr/-/o/-/g/. What's the word? Frog!",
                "pause": 12000
          },
          {
                "text": "/h/-/a/-/nd/. What's the word? Hand! /sw/-/i/-/m/. What's the word? Swim!",
                "pause": 12000
          },
          {
                "text": "/d/-/e/-/sk/. What's the word? Desk! /pl/-/a/-/nt/. What's the word? Plant! Perfect blending!",
                "pause": 12000
          },
          {
                "text": "Now let's read a list of blend words. Read each one clearly. Word 1: 'flag.' Word 2: 'bring.' Word 3: 'stop.' Word 4: 'hand.' Word 5: 'clip.'",
                "pause": 16000
          },
          {
                "text": "Word 6: 'frog.' Word 7: 'swim.' Word 8: 'desk.' Word 9: 'glad.' Word 10: 'trip.' Word 11: 'snap.' Word 12: 'left.'",
                "pause": 16000
          },
          {
                "text": "Word 13: 'plan.' Word 14: 'crab.' Word 15: 'skip.' Word 16: 'pink.' Word 17: 'slip.' Word 18: 'drop.'",
                "pause": 16000
          },
          {
                "text": "Word 19: 'fast.' Word 20: 'plant.' Word 21: 'craft.' Word 22: 'trust.' Great! You just read 22 blend words!",
                "pause": 14000
          },
          {
                "text": "Let's make sure you know the difference between blends and digraphs! I'll say a word. Tell me if it has a BLEND (two sounds) or a DIGRAPH (one sound). Word 1: 'ship.' Blend or digraph? Digraph!",
                "pause": 14000
          },
          {
                "text": "Word 2: 'slip.' Blend or digraph? Blend! Word 3: 'chat.' Blend or digraph? Digraph! Word 4: 'flag.' Blend or digraph? Blend!",
                "pause": 12000
          },
          {
                "text": "Word 5: 'this.' Blend or digraph? Digraph! Perfect! You know that blends = two sounds, digraphs = one sound!",
                "pause": 12000
          },
          {
                "text": "Now let's read sentences with lots of blends. Read smoothly. Sentence 1: 'I can skip and swim and stop.'",
                "pause": 14000
          },
          {
                "text": "Sentence 2: 'The frog can jump on the desk and trip.' Point to each word and read.",
                "pause": 14000
          },
          {
                "text": "Sentence 3: 'I am glad to bring the pink gift and plant it fast.' Great reading!",
                "pause": 16000
          },
          {
                "text": "Sentence 4: 'The crab can slip on the flat rock and snap at the grass by the pond.' Wow! So many blends in one sentence!",
                "pause": 16000
          },
          {
                "text": "Let's build words by changing blends. Start with 'flag.' Change /fl/ to /bl/. What's the word? Blag? Not a real word! Change /fl/ to /dr/. Drag!",
                "pause": 14000
          },
          {
                "text": "Start with 'hand.' Change /h/ to /b/. What's the word? Band! Change the ending /nd/ to /nk/. What's the word? Bank! You can change blends at the beginning AND the end!",
                "pause": 14000
          },
          {
                "text": "Last challenge! I'll time you for one minute while you read this passage full of blends. Read smoothly and accurately. Don't rush - read at your best pace. Ready? Go!",
                "pause": 16000
          },
          {
                "text": "[One minute timed reading: 'I am glad to bring my flag and plant it fast. The frog can jump and swim and stop by the desk. The crab can slip and trip on the pink rock. I left the gift in the grass by the pond.']",
                "pause": 14000
          },
          {
                "text": "Fantastic work! You showed me that you can identify L-blends, R-blends, S-blends, and ending blends! You can segment them, blend them, and read them in words and sentences!",
                "pause": 14000
          },
          {
                "text": "Next week we'll start learning long vowels! You're becoming such a strong reader. Keep practicing your blends, and I'll see you next time!",
                "pause": 12000
          }
    ];
  }


}

// Auto-initialize if dayNumber is in DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-billy-week="9"]');
    if (container) {
      const day = parseInt(container.getAttribute('data-billy-day') || '1');
      window.billyLesson = new BillyWeek9Lesson(day);
    }
  });
}
