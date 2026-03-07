/**
 * Billy Week 1 Mini-Lessons (Days 1-5)
 * Interactive audio teaching for Short A sound
 */

const WEEK1_LESSONS = {
  // Day 1 - already implemented in billy-mini-lesson.js
  
  // Day 2 - Blend practice + new rimes (-an, -am)
  day2: [
    { text: "Hi — it's Billy. Let's warm up with the short a. Say a.", pause: 3000, listenForResponse: true },
    
    // Quick review blending
    { text: "Cuh. At. Cat.", pause: 3000, listenForResponse: true },
    { text: "Muh. At. Mat.", pause: 3000, listenForResponse: true },
    { text: "Buh. At. Bat.", pause: 3000, listenForResponse: true },
    
    // Introduce new rimes: -an, -am
    { text: "Listen. Muh. An. Man.", pause: 3500, listenForResponse: true },
    { text: "Puh. An. Pan.", pause: 3500, listenForResponse: true },
    { text: "Huh. Am. Ham.", pause: 3500, listenForResponse: true },
    { text: "Say each with me. Man.", pause: 3000, listenForResponse: true },
    { text: "Pan.", pause: 3000, listenForResponse: true },
    { text: "Ham.", pause: 3000, listenForResponse: true },
    { text: "Hear how a stays the same and the last part changes.", pause: 2000 },
    
    // Mental onset swap practice
    { text: "Rime an. Put onsets in your head and say the word. Cuh. An.", pause: 4500, listenForResponse: true },
    { text: "Ruh. An.", pause: 4500, listenForResponse: true },
    { text: "Tuh. An.", pause: 4500, listenForResponse: true },
    
    // Decodable phrase + sight word
    { text: "Ann makes jam in a pan. Listen to this sentence. Ann can make jam.", pause: 2500 },
    { text: "Now you say. Ann can make jam.", pause: 4500, listenForResponse: true },
    { text: "Sight word for today. A. Say. A.", pause: 3500, listenForResponse: true },
    
    // Wrap
    { text: "Good job! Replay any part, or hear more an and am words.", pause: 1500 }
  ],
  
  // Day 3 - Wider practice (-ap, -ag, -ad, -ab)
  day3: [
    { text: "Hi. Let's say a together.", pause: 3000, listenForResponse: true },
    
    // Review families rapid
    { text: "Cat. Mat. Bat.", pause: 3000, listenForResponse: true },
    { text: "Man. Pan. Ham.", pause: 3000, listenForResponse: true },
    { text: "Pat. Map. Rag.", pause: 3000, listenForResponse: true },
    
    // Introduce additional rimes
    { text: "Listen. Cuh. Ap. Cap.", pause: 3500, listenForResponse: true },
    { text: "Buh. Ag. Bag.", pause: 3500, listenForResponse: true },
    { text: "Duh. Ad. Dad.", pause: 3500, listenForResponse: true },
    { text: "Cuh. Ab. Cab.", pause: 3500, listenForResponse: true },
    { text: "Say each with me. Cap.", pause: 3000, listenForResponse: true },
    { text: "Bag.", pause: 3000, listenForResponse: true },
    { text: "Dad.", pause: 3000, listenForResponse: true },
    { text: "Cab.", pause: 3000, listenForResponse: true },
    
    // Spoken word chain
    { text: "I'll say three words in a row. Repeat them. Bag. Cap. Dad.", pause: 5000, listenForResponse: true },
    { text: "Now. Map. Pan. Rat.", pause: 5000, listenForResponse: true },
    
    // Sentence model
    { text: "Max has a hat he likes to wear. Listen to this sentence. I put on my hat.", pause: 2500 },
    { text: "Now you say. I put on my hat.", pause: 4500, listenForResponse: true },
    { text: "Sight word for today. The. Say. The.", pause: 3500, listenForResponse: true },
    
    // Wrap
    { text: "Great! Try saying five ap, ag, or ad words aloud. See you soon.", pause: 1500 }
  ],
  
  // Day 4 - Fluency practice
  day4: [
    { text: "Today we read smoothly. Say a to warm up.", pause: 3000, listenForResponse: true },
    
    // Phrase modeling
    { text: "Listen to this phrase and copy my rhythm. Sam and Pam, push the van.", pause: 3000 },
    { text: "Now try. Sam and Pam, push the van.", pause: 5000, listenForResponse: true },
    { text: "Now try. Ann can, make jam.", pause: 5000, listenForResponse: true },
    
    // Connected text
    { text: "Sam has a blue van. One day it got stuck on a big tan log. Sam and Pam push and push the van.", pause: 2500 },
    { text: "Now read the short sentence. Sam and Pam push the van.", pause: 5000, listenForResponse: true },
    
    // Repeated phrase for fluency
    { text: "We'll say a sentence three times. Say it with me. Ann pats the jam on a bun.", pause: 4500, listenForResponse: true },
    { text: "Again. Ann pats the jam on a bun.", pause: 4500, listenForResponse: true },
    { text: "One more time. Ann pats the jam on a bun.", pause: 4500, listenForResponse: true },
    
    // Sight word review
    { text: "Say these sight words. A.", pause: 3000, listenForResponse: true },
    { text: "The.", pause: 3000, listenForResponse: true },
    { text: "Is.", pause: 3000, listenForResponse: true },
    { text: "I.", pause: 3000, listenForResponse: true },
    { text: "My.", pause: 3000, listenForResponse: true },
    
    // Wrap
    { text: "Nice fluency work. Try reading two short sentences in a row now.", pause: 1500 }
  ],
  
  // Day 5 - Assessment
  day5: [
    { text: "Hi. It's assessment day. Just do your best and speak clearly.", pause: 2000 },
    
    // Cold read probe
    { text: "I will say a list of words. After each one, say it out loud. Ready?", pause: 2000 },
    { text: "Cat.", pause: 3500, listenForResponse: true },
    { text: "Mat.", pause: 3500, listenForResponse: true },
    { text: "Bat.", pause: 3500, listenForResponse: true },
    { text: "Man.", pause: 3500, listenForResponse: true },
    { text: "Pan.", pause: 3500, listenForResponse: true },
    { text: "Ham.", pause: 3500, listenForResponse: true },
    { text: "Bag.", pause: 3500, listenForResponse: true },
    { text: "Cap.", pause: 3500, listenForResponse: true },
    { text: "Dad.", pause: 3500, listenForResponse: true },
    { text: "Cab.", pause: 3500, listenForResponse: true },
    
    // One-minute fluency
    { text: "Sam has a van. The van got stuck on a log. Sam and Pam push the van and it moves.", pause: 2500 },
    { text: "Now read this same passage aloud.", pause: 6000, listenForResponse: true },
    
    // Comprehension check
    { text: "Who helped push the van?", pause: 5000, listenForResponse: true },
    { text: "What did Ann make?", pause: 5000, listenForResponse: true },
    
    // Writing/speaking prompt
    { text: "Tell me one sentence about the week using a short a word. For example, I see a cat. Say your sentence now.", pause: 6000, listenForResponse: true },
    
    // Wrap
    { text: "Great work this week! Keep practicing words with a. Try the review lesson if any words were hard.", pause: 1500 }
  ]
};

/**
 * Billy Week 1 Mini-Lesson Player
 * Extends the base BillyMiniLesson class with multiple days
 */
class BillyWeek1Lesson extends BillyMiniLesson {
  constructor(day) {
    super();
    this.day = day;
    this.loadDay(day);
  }
  
  loadDay(day) {
    const dayKey = `day${day}`;
    if (WEEK1_LESSONS[dayKey]) {
      this.script = WEEK1_LESSONS[dayKey];
      console.log(`[Billy Week 1] Loaded Day ${day} lesson (${this.script.length} steps)`);
    } else {
      console.error(`[Billy Week 1] No lesson found for Day ${day}`);
      this.script = [];
    }
  }
  
  // Override start to show which day is playing
  async start() {
    console.log(`[Billy Week 1] Starting Day ${this.day} lesson`);
    return super.start();
  }
}

// Make available globally
window.BillyWeek1Lesson = BillyWeek1Lesson;
window.WEEK1_LESSONS = WEEK1_LESSONS;
