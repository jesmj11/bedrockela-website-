const fs = require('fs');

// Lesson data with spiral learning progression
const lessons = [
  {
    num: 1,
    title: "Letters A, M, T, S - The Foundation",
    newLetters: ["A", "M", "T", "S"],
    allLetters: ["A", "M", "T", "S"],
    newWords: ["am", "at"],
    allWords: ["am", "at"],
    story: "The Enormous Turnip - Part 1",
    storyText: "A man plants a tiny turnip seed. The turnip grows and grows. It becomes ENORMOUS! The man tries to pull it up. But it won't come out!"
  },
  {
    num: 2,
    title: "Letter I + Review",
    newLetters: ["I"],
    allLetters: ["A", "I", "M", "S", "T"],
    newWords: ["it", "is", "sit"],
    allWords: ["am", "at", "it", "is", "sit"],
    reviewWords: ["am", "at"],
    story: "The Enormous Turnip - Part 2",
    storyText: "The man calls his wife. 'Help me pull!' They pull and pull. But it still won't come out!"
  },
  {
    num: 3,
    title: "Letter P + Review A-I",
    newLetters: ["P"],
    allLetters: ["A", "I", "M", "P", "S", "T"],
    newWords: ["pat", "pit", "tap"],
    allWords: ["am", "at", "it", "is", "sit", "pat", "pit", "tap"],
    reviewWords: ["am", "at", "it", "sit"],
    story: "The Enormous Turnip - Part 3",
    storyText: "They call the boy. 'Come help us pull!' The man, the wife, and the boy pull. But the turnip stays in the ground!"
  },
  {
    num: 4,
    title: "Letter N + Word Building",
    newLetters: ["N"],
    allLetters: ["A", "I", "M", "N", "P", "S", "T"],
    newWords: ["an", "in", "tan", "pan", "pin"],
    allWords: ["am", "an", "at", "in", "is", "it", "pan", "pat", "pin", "pit", "sit", "tan", "tap"],
    reviewWords: ["am", "at", "it", "sit", "pat", "tap"],
    story: "The Enormous Turnip - Part 4",
    storyText: "They call the dog. 'Come help!' The man, wife, boy, and dog all pull together. Still, the turnip won't budge!"
  },
  {
    num: 5,
    title: "Assessment + Letter R",
    newLetters: ["R"],
    allLetters: ["A", "I", "M", "N", "P", "R", "S", "T"],
    newWords: ["ran", "rat", "rim"],
    allWords: ["am", "an", "at", "in", "is", "it", "pan", "pat", "pin", "pit", "ran", "rat", "rim", "sit", "tan", "tap"],
    reviewWords: ["am", "at", "it", "sit", "pat", "pin", "pan"],
    story: "The Enormous Turnip - Part 5",
    storyText: "The dog calls the cat. 'Meow! I'll help!' Now five are pulling. The turnip starts to move... just a little!"
  },
  {
    num: 6,
    title: "Letter O + More Words",
    newLetters: ["O"],
    allLetters: ["A", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["on", "top", "pot", "not"],
    allWords: ["am", "an", "at", "in", "is", "it", "not", "on", "pan", "pat", "pin", "pit", "pot", "ran", "rat", "rim", "sit", "tan", "tap", "top"],
    reviewWords: ["am", "at", "it", "ran", "rat", "pin", "pan"],
    story: "The Enormous Turnip - Part 6",
    storyText: "The cat calls the mouse. 'Squeak! I'm small but I'll help!' Six friends pull together. Pull... pull... PULL!"
  },
  {
    num: 7,
    title: "Word Families Review",
    newLetters: [],
    allLetters: ["A", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["mat", "mop", "map", "sip", "sap"],
    allWords: ["am", "an", "at", "in", "is", "it", "map", "mat", "mop", "not", "on", "pan", "pat", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "sip", "sit", "tan", "tap", "top"],
    reviewWords: ["am", "at", "it", "on", "top", "pot", "ran"],
    story: "The Enormous Turnip - Part 7",
    storyText: "They pull harder! The ground shakes. The turnip wiggles. It's starting to come loose!"
  },
  {
    num: 8,
    title: "Letter E + More Blending",
    newLetters: ["E"],
    allLetters: ["A", "E", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["met", "net", "pet", "set"],
    allWords: ["am", "an", "at", "in", "is", "it", "map", "mat", "met", "mop", "net", "not", "on", "pan", "pat", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "top"],
    reviewWords: ["am", "it", "on", "pot", "ran", "mat", "mop"],
    story: "The Enormous Turnip - Part 8",
    storyText: "CRACK! The roots start breaking. The turnip moves up... up... UP! Almost there!"
  },
  {
    num: 9,
    title: "Mixed Review Day",
    newLetters: [],
    allLetters: ["A", "E", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["pen", "ten", "men"],
    allWords: ["am", "an", "at", "in", "is", "it", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top"],
    reviewWords: ["am", "at", "it", "on", "ran", "mat", "met", "pet"],
    story: "The Enormous Turnip - Part 9",
    storyText: "One more big pull! Everyone pulls with all their strength. The man, wife, boy, dog, cat, and tiny mouse!"
  },
  {
    num: 10,
    title: "Mastery Check + Story End",
    newLetters: [],
    allLetters: ["A", "E", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: [],
    allWords: ["am", "an", "at", "in", "is", "it", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top"],
    reviewWords: ["am", "at", "it", "on", "ran", "mat", "met", "pet", "pen", "ten"],
    story: "The Enormous Turnip - THE END!",
    storyText: "POP! The enormous turnip comes out! They all fall down laughing. That night, they share the biggest turnip dinner ever. Even the tiny mouse gets a big piece!"
  },
  {
    num: 11,
    title: "The Gingerbread Man Begins",
    newLetters: ["B", "C"],
    allLetters: ["A", "B", "C", "E", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["cab", "cot", "bat", "bit"],
    allWords: ["am", "an", "at", "bat", "bit", "cab", "cot", "in", "is", "it", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top"],
    reviewWords: ["am", "at", "it", "ran", "mat", "met", "pet", "pen", "ten"],
    story: "The Gingerbread Man - Part 1",
    storyText: "An old woman bakes a gingerbread man. She gives him raisin eyes and a candy smile. When she opens the oven door... he jumps out and runs away!"
  },
  {
    num: 12,
    title: "The Great Escape",
    newLetters: ["D", "F"],
    allLetters: ["A", "B", "C", "D", "E", "F", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["dad", "did", "fed", "fit", "fan"],
    allWords: ["am", "an", "at", "bat", "bit", "cab", "cot", "dad", "did", "fan", "fed", "fit", "in", "is", "it", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top"],
    reviewWords: ["am", "it", "ran", "mat", "met", "cab", "bat", "bit"],
    story: "The Gingerbread Man - Part 2",
    storyText: "'Run, run, as fast as you can! You can't catch me, I'm the Gingerbread Man!' He runs past the old woman and the old man. They can't catch him!"
  },
  {
    num: 13,
    title: "More Animals Join",
    newLetters: ["G", "H"],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["got", "hat", "had", "him", "hop"],
    allWords: ["am", "an", "at", "bat", "bit", "cab", "cot", "dad", "did", "fan", "fed", "fit", "got", "had", "hat", "him", "hop", "in", "is", "it", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top"],
    reviewWords: ["am", "it", "mat", "cab", "bat", "dad", "did", "fan"],
    story: "The Gingerbread Man - Part 3",
    storyText: "A pig sees him. 'Stop!' says the pig. But the Gingerbread Man runs faster! A cow tries to catch him. But he's too quick!"
  },
  {
    num: 14,
    title: "The Clever Fox",
    newLetters: ["J", "K"],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "O", "P", "R", "S", "T"],
    newWords: ["job", "jot", "kit", "kid"],
    allWords: ["am", "an", "at", "bat", "bit", "cab", "cot", "dad", "did", "fan", "fed", "fit", "got", "had", "hat", "him", "hop", "in", "is", "it", "job", "jot", "kid", "kit", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top"],
    reviewWords: ["am", "it", "mat", "cab", "dad", "got", "had", "hat"],
    story: "The Gingerbread Man - Part 4",
    storyText: "He comes to a river. A clever fox says, 'I'll help you cross! Hop on my tail.' The Gingerbread Man jumps on."
  },
  {
    num: 15,
    title: "The Gingerbread Man's End",
    newLetters: ["L", "V"],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "V"],
    newWords: ["lap", "lot", "van", "vet"],
    allWords: ["am", "an", "at", "bat", "bit", "cab", "cot", "dad", "did", "fan", "fed", "fit", "got", "had", "hat", "him", "hop", "in", "is", "it", "job", "jot", "kid", "kit", "lap", "lot", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top", "van", "vet"],
    reviewWords: ["am", "it", "mat", "cab", "dad", "got", "hat", "job", "kit"],
    story: "The Gingerbread Man - THE END",
    storyText: "'The water is deep! Jump on my nose!' says the fox. The Gingerbread Man jumps. SNAP! The fox eats him up! That's the end of the Gingerbread Man!"
  },
  {
    num: 16,
    title: "Meet the Lion",
    newLetters: ["U", "W"],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W"],
    newWords: ["up", "us", "web", "wet", "win"],
    allWords: ["am", "an", "at", "bat", "bit", "cab", "cot", "dad", "did", "fan", "fed", "fit", "got", "had", "hat", "him", "hop", "in", "is", "it", "job", "jot", "kid", "kit", "lap", "lot", "map", "mat", "men", "met", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top", "up", "us", "van", "vet", "web", "wet", "win"],
    reviewWords: ["am", "it", "mat", "got", "hat", "job", "kit", "lap", "van"],
    story: "Lion and the Mouse - Part 1",
    storyText: "A mighty lion sleeps under a tree. A tiny mouse runs across his paw. The lion wakes up and catches the mouse in his big paw!"
  },
  {
    num: 17,
    title: "The Mouse's Mistake",
    newLetters: ["Q", "X"],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"],
    newWords: ["fox", "mix", "box", "fix"],
    allWords: ["am", "an", "at", "bat", "bit", "box", "cab", "cot", "dad", "did", "fan", "fed", "fit", "fix", "fox", "got", "had", "hat", "him", "hop", "in", "is", "it", "job", "jot", "kid", "kit", "lap", "lot", "map", "mat", "men", "met", "mix", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top", "up", "us", "van", "vet", "web", "wet", "win"],
    reviewWords: ["am", "mat", "got", "hat", "job", "lap", "van", "up", "web"],
    story: "Lion and the Mouse - Part 2",
    storyText: "'Please don't eat me!' squeaks the mouse. 'I'm so small! Let me go, and someday I will help you!' The lion laughs. How could such a tiny mouse help him?"
  },
  {
    num: 18,
    title: "Lion Shows Mercy",
    newLetters: ["Y", "Z"],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    newWords: ["yes", "yet", "yam", "zip", "zap"],
    allWords: ["am", "an", "at", "bat", "bit", "box", "cab", "cot", "dad", "did", "fan", "fed", "fit", "fix", "fox", "got", "had", "hat", "him", "hop", "in", "is", "it", "job", "jot", "kid", "kit", "lap", "lot", "map", "mat", "men", "met", "mix", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top", "up", "us", "van", "vet", "web", "wet", "win", "yam", "yes", "yet", "zap", "zip"],
    reviewWords: ["mat", "got", "hat", "lap", "van", "up", "web", "fox", "mix"],
    story: "Lion and the Mouse - Part 3",
    storyText: "But the lion is kind. 'You make me smile, little mouse. Go free!' The grateful mouse scurries away into the grass."
  },
  {
    num: 19,
    title: "Lion in Trouble",
    newLetters: [],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    newWords: [],
    allWords: ["am", "an", "at", "bat", "bit", "box", "cab", "cot", "dad", "did", "fan", "fed", "fit", "fix", "fox", "got", "had", "hat", "him", "hop", "in", "is", "it", "job", "jot", "kid", "kit", "lap", "lot", "map", "mat", "men", "met", "mix", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top", "up", "us", "van", "vet", "web", "wet", "win", "yam", "yes", "yet", "zap", "zip"],
    reviewWords: ["mat", "got", "hat", "lap", "up", "web", "fox", "mix", "yes"],
    story: "Lion and the Mouse - Part 4",
    storyText: "Days later, hunters catch the lion in a big rope net! The mighty lion roars and struggles, but he can't escape. He is trapped!"
  },
  {
    num: 20,
    title: "Mouse Saves the Day - ALPHABET COMPLETE!",
    newLetters: [],
    allLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    newWords: [],
    allWords: ["am", "an", "at", "bat", "bit", "box", "cab", "cot", "dad", "did", "fan", "fed", "fit", "fix", "fox", "got", "had", "hat", "him", "hop", "in", "is", "it", "job", "jot", "kid", "kit", "lap", "lot", "map", "mat", "men", "met", "mix", "mop", "net", "not", "on", "pan", "pat", "pen", "pet", "pin", "pit", "pot", "ran", "rat", "rim", "sap", "set", "sip", "sit", "tan", "tap", "ten", "top", "up", "us", "van", "vet", "web", "wet", "win", "yam", "yes", "yet", "zap", "zip"],
    reviewWords: ["mat", "got", "hat", "up", "fox", "mix", "yes", "net", "bit"],
    story: "Lion and the Mouse - THE END!",
    storyText: "The mouse hears the lion's roar. 'I will help!' She gnaws and gnaws at the ropes with her tiny teeth. The net breaks! The lion is free! 'Thank you, little friend!' roars the lion. 'You were right - even the smallest friend can be the biggest help!'"
  }
];

// Helper function to create lesson HTML
function createLessonHTML(lesson) {
  const pages = [];
  
  // Page 1: Title Page
  pages.push(`<div class="lesson-page-card title-page">
    <div class="character">📚</div>
    <h1>Lesson ${lesson.num}</h1>
    <div class="subtitle">${lesson.title}</div>
    <p style="color: #5B7C99; font-size: 18px; margin-top: 20px;">
      ${lesson.newLetters.length > 0 ? `New Letters: ${lesson.newLetters.join(', ')}` : 'Review & Practice'}<br>
      ${lesson.story}
    </p>
  </div>`);
  
  // Page 2: Learning Objectives
  pages.push(`<div class="lesson-page-card content-page">
    <h2>🎯 Today You Will...</h2>
    <div style="text-align: left; max-width: 500px; margin: 20px auto;">
      ${lesson.newLetters.length > 0 ? `<p style="margin: 15px 0; font-size: 18px;">
        ✓ Learn ${lesson.newLetters.length} new letter${lesson.newLetters.length > 1 ? 's' : ''}: <strong>${lesson.newLetters.join(', ')}</strong>
      </p>` : ''}
      ${lesson.reviewWords ? `<p style="margin: 15px 0; font-size: 18px;">
        ✓ Review words: <strong>${lesson.reviewWords.slice(0, 5).join(', ')}</strong>
      </p>` : ''}
      <p style="margin: 15px 0; font-size: 18px;">
        ✓ Practice ${lesson.allLetters.length} letters total
      </p>
      <p style="margin: 15px 0; font-size: 18px;">
        ✓ Continue the story: <strong>${lesson.story.split(' - ')[0]}</strong>
      </p>
    </div>
  </div>`);
  
  // Page 3: Review All Learned Letters (Spiral Learning!)
  pages.push(`<div class="lesson-page-card content-page">
    <h2>🔄 Review Time!</h2>
    <p style="font-size: 18px; margin-bottom: 20px;">Let's review all ${lesson.allLetters.length} letters we know!</p>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; max-width: 500px; margin: 20px auto; font-size: 32px; color: #5B7C99;">
      ${lesson.allLetters.map(letter => `<div style="padding: 10px; background: #f0f8ff; border-radius: 8px; font-weight: bold;">${letter}</div>`).join('')}
    </div>
    <p style="font-size: 16px; color: #666; margin-top: 20px;">Say each letter sound out loud!</p>
  </div>`);
  
  // Pages for new letters
  const letterEmojis = {
    'A': '🍎', 'B': '🏀', 'C': '🐱', 'D': '🐕', 'E': '🥚', 'F': '🦊',
    'G': '🦍', 'H': '🏠', 'I': '🍦', 'J': '🤹', 'K': '🔑', 'L': '🦁',
    'M': '🌙', 'N': '🌙', 'O': '🍊', 'P': '🍕', 'Q': '👸', 'R': '🌈',
    'S': '☀️', 'T': '🐯', 'U': '☂️', 'V': '🎻', 'W': '🍉', 'X': '❌',
    'Y': '💛', 'Z': '🦓'
  };
  
  const letterWords = {
    'A': 'apple', 'B': 'ball', 'C': 'cat', 'D': 'dog', 'E': 'egg', 'F': 'fox',
    'G': 'gorilla', 'H': 'house', 'I': 'ice cream', 'J': 'juggle', 'K': 'key', 'L': 'lion',
    'M': 'moon', 'N': 'nest', 'O': 'orange', 'P': 'pizza', 'Q': 'queen', 'R': 'rainbow',
    'S': 'sun', 'T': 'tiger', 'U': 'umbrella', 'V': 'violin', 'W': 'watermelon', 'X': 'x-ray',
    'Y': 'yellow', 'Z': 'zebra'
  };
  
  lesson.newLetters.forEach(letter => {
    pages.push(`<div class="lesson-page-card content-page">
      <h2>🔤 Letter ${letter}</h2>
      <div style="font-size: 96px; margin: 20px 0; color: #5B7C99;">${letter} ${letter.toLowerCase()}</div>
      <p style="font-size: 24px; margin: 20px 0;">
        <strong>${letter} says "/${letter.toLowerCase()}/" like in <span style="color: #5B7C99;">${letterWords[letter]}</span></strong>
      </p>
      <div style="font-size: 48px; margin: 20px 0;">${letterEmojis[letter]}</div>
      <p style="font-size: 20px;">
        Say it with me: <strong>/${letter.toLowerCase()}/ /${letter.toLowerCase()}/ ${letterWords[letter]}!</strong>
      </p>
    </div>`);
  });
  
  // Page: Review Words (if applicable)
  if (lesson.reviewWords && lesson.reviewWords.length > 0) {
    pages.push(`<div class="lesson-page-card content-page">
      <h2>🔄 Review These Words!</h2>
      <p style="font-size: 18px; margin-bottom: 30px;">Can you still read these?</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 500px; margin: 20px auto;">
        ${lesson.reviewWords.map(word => `
          <div style="padding: 20px; background: #f0f8ff; border-radius: 10px; font-size: 28px; font-weight: bold; color: #5B7C99;">
            ${word}
          </div>
        `).join('')}
      </div>
      <p style="font-size: 16px; color: #666; margin-top: 20px;">Sound out each word!</p>
    </div>`);
  }
  
  // Page: New Words
  if (lesson.newWords && lesson.newWords.length > 0) {
    pages.push(`<div class="lesson-page-card content-page">
      <h2>✨ New Words!</h2>
      <p style="font-size: 18px; margin-bottom: 30px;">Let's learn these new words!</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 500px; margin: 20px auto;">
        ${lesson.newWords.map(word => `
          <div style="padding: 20px; background: #fff4e6; border-radius: 10px; font-size: 32px; font-weight: bold; color: #D4A68F;">
            ${word}
          </div>
        `).join('')}
      </div>
      <p style="font-size: 16px; color: #666; margin-top: 20px;">Blend the sounds together!</p>
    </div>`);
  }
  
  // Page: Story
  pages.push(`<div class="lesson-page-card content-page">
    <h2>📖 ${lesson.story}</h2>
    <div style="text-align: left; max-width: 550px; margin: 30px auto; font-size: 18px; line-height: 1.8; padding: 25px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #5B7C99;">
      ${lesson.storyText}
    </div>
  </div>`);
  
  // Page: Word Practice
  const practiceWords = lesson.allWords.slice(-8);
  pages.push(`<div class="lesson-page-card content-page">
    <h2>✍️ Let's Practice!</h2>
    <p style="font-size: 18px; margin-bottom: 30px;">Read these words out loud!</p>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; max-width: 500px; margin: 20px auto;">
      ${practiceWords.map(word => `
        <div style="padding: 15px; background: #e8f5e9; border-radius: 8px; font-size: 24px; font-weight: bold; color: #2E7D32;">
          ${word}
        </div>
      `).join('')}
    </div>
  </div>`);
  
  // Page: Completion
  const milestone = lesson.num === 10 ? "🎉 You finished The Enormous Turnip!" : 
                    lesson.num === 15 ? "🎉 You finished The Gingerbread Man!" :
                    lesson.num === 20 ? "🏆 ALPHABET COMPLETE! You know ALL 26 letters!" : "";
  
  pages.push(`<div class="lesson-page-card content-page">
    <h2>🎉 Lesson ${lesson.num} Complete!</h2>
    ${milestone ? `<div style="font-size: 32px; margin: 20px 0; color: #FFD700;">${milestone}</div>` : ''}
    <div style="font-size: 64px; margin: 20px 0;">⭐</div>
    <p style="font-size: 20px; margin: 20px 0;">
      You now know <strong>${lesson.allLetters.length} letters</strong>!
    </p>
    <div style="font-size: 24px; margin: 20px 0; color: #5B7C99; max-width: 400px; margin: 20px auto;">
      ${lesson.allLetters.join(' ')}
    </div>
    <p style="font-size: 18px; margin: 20px 0;">
      And you can read <strong>${lesson.allWords.length} words</strong>!
    </p>
    <button 
      onclick="window.location.href='student-dashboard-live.html'" 
      style="margin-top: 30px; padding: 15px 30px; background: linear-gradient(135deg, #5B7C99 0%, #2E4057 100%); color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer;"
    >
      Back to Dashboard
    </button>
  </div>`);
  
  return pages;
}

// Generate all lesson files
console.log('🏗️  Building Lessons 1-20 with Spiral Learning...\n');

lessons.forEach(lesson => {
  const pages = createLessonHTML(lesson);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lesson.num}: ${lesson.title} - BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container">
        <!-- Navigation will be inserted here -->
    </div>

    <script>
        const pages = ${JSON.stringify(pages, null, 8)};
        
        let currentPage = 0;
        
        function renderPage() {
            const container = document.getElementById('lesson-container');
            container.innerHTML = \`
                <div class="lesson-nav">
                    <button class="nav-arrow" onclick="prevPage()" \${currentPage === 0 ? 'disabled' : ''}>←</button>
                    <span class="page-number">Page \${currentPage + 1} of \${pages.length}</span>
                    <button class="nav-arrow" onclick="nextPage()" \${currentPage === pages.length - 1 ? 'disabled' : ''}>→</button>
                </div>
                <div class="lesson-content">
                    \${pages[currentPage]}
                </div>
            \`;
        }
        
        function nextPage() {
            if (currentPage < pages.length - 1) {
                currentPage++;
                renderPage();
            }
        }
        
        function prevPage() {
            if (currentPage > 0) {
                currentPage--;
                renderPage();
            }
        }
        
        // Initial render
        renderPage();
    </script>
</body>
</html>`;
  
  const filename = `1st-grade-lesson-${lesson.num}-v4.html`;
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✅ Lesson ${lesson.num}: ${lesson.title} (${lesson.allLetters.length} letters, ${lesson.allWords.length} words)`);
});

console.log(`\n🎉 All 20 lessons built successfully!`);
console.log(`\n📊 PROGRESSION:`);
console.log(`   Lesson 1: 4 letters (A,M,T,S)`);
console.log(`   Lesson 10: 10 letters - The Enormous Turnip complete`);
console.log(`   Lesson 15: 20 letters - The Gingerbread Man complete`);
console.log(`   Lesson 18: 26 letters - COMPLETE ALPHABET!`);
console.log(`   Lesson 20: Alphabet mastery + Lion and Mouse complete`);
console.log(`\n🔄 SPIRAL LEARNING: Every lesson reviews ALL previous letters!`);
