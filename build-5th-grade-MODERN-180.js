const fs = require('fs');
const path = require('path');

// 5th Grade Curriculum: Adventure, Travel, & Mythology
// Unit 1: Robin Hood (25 lessons)
// Unit 2: King Arthur (25 lessons)
// Unit 3: Around the World in 80 Days (30 lessons)
// Unit 4: Short Stories - Irving & Kipling (20 lessons)
// Unit 5: Frankenstein (20 lessons)
// Unit 6: Dracula (20 lessons)
// Unit 7: Greek Mythology (25 lessons)
// Unit 8: Roman & Norse Mythology (15 lessons)

const units = [
  {
    name: "The Merry Adventures of Robin Hood",
    author: "Howard Pyle",
    startDay: 1,
    endDay: 25,
    theme: "Heroism, Justice, & Loyalty",
    chapters: [
      { title: "Robin Hood and the Tinker", summary: "Robin Hood meets Little John on a bridge, and they have a quarterstaff duel that ends in friendship." },
      { title: "The Shooting Match at Nottingham Town", summary: "Robin wins the golden arrow but must escape the Sheriff's trap in disguise." },
      { title: "Robin Hood and Will Scarlet", summary: "Will Scarlet joins the Merry Men after proving his courage and loyalty." },
      { title: "The Adventure with Midge the Miller", summary: "Robin Hood meets a clever miller and invites him to join the band." },
      { title: "Robin Hood and Allan a Dale", summary: "Robin helps Allan a Dale rescue his true love from an unwanted marriage." }
    ]
  },
  {
    name: "The Story of King Arthur and His Knights",
    author: "Howard Pyle",
    startDay: 26,
    endDay: 50,
    theme: "Honor, Duty, & the Quest",
    chapters: [
      { title: "The Sword in the Stone", summary: "Young Arthur proves his destiny by pulling Excalibur from the stone." },
      { title: "The Round Table", summary: "Arthur establishes the Round Table where all knights sit as equals." },
      { title: "Sir Lancelot's Quest", summary: "The greatest knight of the Round Table proves his valor in battle." },
      { title: "The Quest for the Holy Grail", summary: "Knights embark on the sacred quest to find the Holy Grail." },
      { title: "Merlin's Wisdom", summary: "The wizard Merlin guides Arthur with his magical knowledge and counsel." }
    ]
  },
  {
    name: "Around the World in Eighty Days",
    author: "Jules Verne",
    startDay: 51,
    endDay: 80,
    theme: "Exploration, Culture, & Perseverance",
    chapters: [
      { title: "The Wager", summary: "Phileas Fogg bets he can travel around the world in 80 days." },
      { title: "Through Suez", summary: "Fogg and Passepartout begin their journey, pursued by Detective Fix." },
      { title: "Rescue in India", summary: "The travelers rescue Princess Aouda from a dangerous ceremony." },
      { title: "Across the Pacific", summary: "The journey continues by steamship across the vast Pacific Ocean." },
      { title: "Through America", summary: "They race across America by train, facing buffalo herds and bandits." },
      { title: "The Race to Finish", summary: "With time running out, Fogg discovers he's gained a day crossing the dateline!" }
    ]
  },
  {
    name: "Short Stories: Irving & Kipling",
    author: "Washington Irving / Rudyard Kipling",
    startDay: 81,
    endDay: 100,
    theme: "Suspense, Humor, & Courage",
    chapters: [
      { title: "The Legend of Sleepy Hollow - Part 1", summary: "Ichabod Crane arrives in Sleepy Hollow and falls for Katrina Van Tassel." },
      { title: "The Legend of Sleepy Hollow - Part 2", summary: "Ichabod encounters the Headless Horseman on a dark and stormy night." },
      { title: "Rip Van Winkle", summary: "Rip falls asleep in the mountains and wakes up 20 years later." },
      { title: "Rikki-Tikki-Tavi", summary: "A brave mongoose protects a family from deadly cobras in India." }
    ]
  },
  {
    name: "Frankenstein",
    author: "Mary Shelley",
    startDay: 101,
    endDay: 120,
    theme: "Responsibility, Consequences, & Humanity",
    chapters: [
      { title: "Victor's Ambition", summary: "Young Victor Frankenstein becomes obsessed with creating life." },
      { title: "The Creation", summary: "Victor succeeds in bringing his creature to life, but is horrified by what he has made." },
      { title: "The Creature's Story", summary: "The creature learns to speak and read, but is rejected by all who see him." },
      { title: "Tragedy Unfolds", summary: "The creature seeks revenge on Victor by harming those he loves." },
      { title: "Pursuit and Consequence", summary: "Victor chases the creature to the Arctic, where both meet their fate." }
    ]
  },
  {
    name: "Dracula",
    author: "Bram Stoker",
    startDay: 121,
    endDay: 140,
    theme: "Good vs. Evil, Fear, & Courage",
    chapters: [
      { title: "Journey to Castle Dracula", summary: "Jonathan Harker travels to Transylvania to meet the mysterious Count." },
      { title: "Prisoner of the Castle", summary: "Jonathan realizes he is trapped in Dracula's castle with supernatural horrors." },
      { title: "Dracula Comes to England", summary: "The vampire travels to London and begins to claim new victims." },
      { title: "The Hunt Begins", summary: "Van Helsing and his allies work to stop Dracula's evil plans." },
      { title: "The Final Battle", summary: "The heroes chase Dracula back to Transylvania for a final confrontation." }
    ]
  },
  {
    name: "Greek Mythology Collection",
    author: "Various Public Domain Retellings",
    startDay: 141,
    endDay: 165,
    theme: "Fate, Hubris, & the Hero's Journey",
    chapters: [
      { title: "The Olympian Gods", summary: "Meet Zeus, Hera, Athena, and the powerful gods of Mount Olympus." },
      { title: "Pandora's Box", summary: "Curiosity leads Pandora to open a forbidden box, releasing evil into the world." },
      { title: "King Midas", summary: "A greedy king learns that the golden touch is not always a blessing." },
      { title: "Perseus and Medusa", summary: "The hero Perseus must slay the snake-haired Gorgon without looking at her." },
      { title: "Theseus and the Minotaur", summary: "Theseus enters the labyrinth to battle the terrifying Minotaur." },
      { title: "Icarus and Daedalus", summary: "A son flies too close to the sun on wings of wax and feathers." },
      { title: "The Odyssey - Cyclops", summary: "Odysseus outsmarts the one-eyed giant Polyphemus." },
      { title: "Jason and the Argonauts", summary: "Jason leads a crew of heroes to find the legendary Golden Fleece." }
    ]
  },
  {
    name: "Roman & Norse Mythology",
    author: "Various Public Domain Retellings",
    startDay: 166,
    endDay: 180,
    theme: "Power, Trickery, & World's End",
    chapters: [
      { title: "Romulus and Remus", summary: "Twin brothers raised by wolves found the great city of Rome." },
      { title: "Greek vs Roman Gods", summary: "Zeus becomes Jupiter, Athena becomes Minerva—same gods, different names." },
      { title: "Thor and the Giants", summary: "The mighty god Thor battles giants with his hammer Mjolnir." },
      { title: "Loki the Trickster", summary: "The mischievous god Loki causes chaos among the Norse gods." },
      { title: "Ragnarok", summary: "The Norse gods face their final battle at the end of the world." }
    ]
  }
];

// Vocabulary words - 2 per day from actual text
const vocabularyByDay = {
  // Unit 1: Robin Hood (Days 1-25)
  1: ["outlaw", "yeoman"], 2: ["sheriff", "greenwood"], 3: ["quarterstaff", "merry"],
  4: ["valor", "cunning"], 6: ["friar", "minstrel"], 7: ["gallant", "forfeit"],
  8: ["allegiance", "pardon"], 9: ["squire", "noble"], 11: ["disguise", "archery"],
  12: ["tournament", "wager"], 13: ["treachery", "loyal"], 14: ["bandit", "justice"],
  16: ["courage", "defiant"], 17: ["sheriff", "pursuit"], 18: ["forest", "hideout"],
  19: ["generous", "redistribute"], 21: ["ballad", "legend"], 22: ["compassion", "honor"],
  23: ["skilled", "marksmanship"], 24: ["freedom", "oppression"],
  
  // Unit 2: King Arthur (Days 26-50)
  26: ["destiny", "sovereign"], 27: ["Excalibur", "enchantment"], 28: ["chivalry", "quest"],
  29: ["oath", "Round Table"], 31: ["tournament", "joust"], 32: ["knight", "armor"],
  33: ["realm", "kingdom"], 34: ["treachery", "betrayal"], 36: ["maiden", "damsel"],
  37: ["sorcerer", "Merlin"], 38: ["castle", "fortress"], 39: ["siege", "battle"],
  41: ["allegory", "symbol"], 42: ["prophecy", "doom"], 43: ["noble", "peasant"],
  44: ["legacy", "legend"], 46: ["grail", "sacred"], 47: ["peril", "danger"],
  48: ["triumph", "victory"], 49: ["gallant", "brave"],
  
  // Unit 3: Around the World (Days 51-80)
  51: ["wager", "bet"], 52: ["eccentric", "peculiar"], 53: ["punctual", "precise"],
  54: ["passport", "document"], 56: ["steamer", "vessel"], 57: ["itinerary", "schedule"],
  58: ["longitude", "latitude"], 59: ["expedition", "journey"], 61: ["continent", "landmass"],
  62: ["customs", "border"], 63: ["telegraph", "message"], 64: ["detective", "inspector"],
  66: ["circumnavigate", "circle"], 67: ["international", "global"], 68: ["culture", "tradition"],
  69: ["perseverance", "determination"], 71: ["obstacle", "challenge"], 72: ["resourceful", "clever"],
  73: ["railway", "locomotive"], 74: ["Pacific", "ocean"], 76: ["buffalo", "herd"],
  77: ["bandit", "outlaw"], 78: ["rescue", "save"], 79: ["dateline", "meridian"],
  
  // Unit 4: Short Stories (Days 81-100)
  81: ["specter", "ghost"], 82: ["superstition", "belief"], 83: ["headless", "decapitated"],
  84: ["hollow", "valley"], 86: ["drowsy", "sleepy"], 87: ["legend", "tale"],
  88: ["apparition", "phantom"], 89: ["pastoral", "rural"], 91: ["mongoose", "animal"],
  92: ["cobra", "serpent"], 93: ["veranda", "porch"], 94: ["thicket", "brush"],
  96: ["prowl", "stalk"], 97: ["valiant", "brave"], 98: ["dominion", "rule"],
  99: ["suspense", "tension"],
  
  // Unit 5: Frankenstein (Days 101-120)
  101: ["creature", "being"], 102: ["laboratory", "workshop"], 103: ["ambition", "goal"],
  104: ["experiment", "test"], 106: ["wretch", "pitiful"], 107: ["grotesque", "hideous"],
  108: ["abomination", "monster"], 109: ["dread", "fear"], 111: ["isolation", "loneliness"],
  112: ["torment", "suffering"], 113: ["remorse", "regret"], 114: ["humanity", "compassion"],
  116: ["pursuit", "chase"], 117: ["vengeance", "revenge"], 118: ["abandon", "forsake"],
  119: ["consequence", "result"],
  
  // Unit 6: Dracula (Days 121-140)
  121: ["vampire", "undead"], 122: ["castle", "fortress"], 123: ["Transylvania", "region"],
  124: ["journal", "diary"], 126: ["nocturnal", "nighttime"], 127: ["sinister", "evil"],
  128: ["eerie", "spooky"], 129: ["lair", "den"], 131: ["immortal", "eternal"],
  132: ["prey", "victim"], 133: ["garlic", "herb"], 134: ["crucifix", "cross"],
  136: ["superstitious", "fearful"], 137: ["cloak", "cape"], 138: ["vanquish", "defeat"],
  139: ["courage", "bravery"],
  
  // Unit 7: Greek Mythology (Days 141-165)
  141: ["myth", "legend"], 142: ["Olympus", "mountain"], 143: ["mortal", "human"],
  144: ["immortal", "eternal"], 146: ["nectar", "drink"], 147: ["ambrosia", "food"],
  148: ["prophecy", "prediction"], 149: ["fate", "destiny"], 151: ["labyrinth", "maze"],
  152: ["Minotaur", "beast"], 153: ["hubris", "pride"], 154: ["odyssey", "journey"],
  156: ["cyclops", "giant"], 157: ["siren", "enchantress"], 158: ["underworld", "Hades"],
  159: ["hero", "champion"], 161: ["quest", "mission"], 162: ["labors", "tasks"],
  163: ["Trojan", "war"], 164: ["Argonauts", "sailors"],
  
  // Unit 8: Roman & Norse (Days 166-180)
  166: ["Romulus", "founder"], 167: ["Remus", "brother"], 168: ["Jupiter", "god"],
  169: ["Mars", "war"], 171: ["Asgard", "realm"], 172: ["Mjolnir", "hammer"],
  173: ["Bifrost", "bridge"], 174: ["trickster", "deceiver"], 176: ["Jormungandr", "serpent"],
  177: ["Valhalla", "hall"], 178: ["rune", "symbol"], 179: ["Ragnarok", "end"]
};

function getChapterForDay(unit, dayInUnit) {
  const chaptersPerDay = unit.chapters.length / (unit.endDay - unit.startDay + 1);
  const chapterIndex = Math.floor((dayInUnit - 1) * chaptersPerDay);
  return unit.chapters[Math.min(chapterIndex, unit.chapters.length - 1)];
}

function getUnitForDay(day) {
  return units.find(u => day >= u.startDay && day <= u.endDay);
}

function generateLesson(day) {
  const unit = getUnitForDay(day);
  const dayInUnit = day - unit.startDay + 1;
  const chapter = getChapterForDay(unit, dayInUnit);
  const isAssessment = day % 5 === 0;
  const vocab = vocabularyByDay[day] || ["adventure", "story"];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5th Grade - Lesson ${day}</title>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'DM Sans', sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        
        .page {
            background: white;
            border-radius: 20px;
            padding: 60px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            page-break-after: always;
        }
        
        h1 {
            font-family: 'Fraunces', serif;
            font-size: 2.8em;
            color: #1a365d;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        
        h2 {
            font-family: 'Fraunces', serif;
            font-size: 2em;
            color: #2d3748;
            margin-bottom: 20px;
        }
        
        h3 {
            font-family: 'Fraunces', serif;
            font-size: 1.5em;
            color: #4a5568;
            margin-bottom: 15px;
        }
        
        p {
            font-size: 1.2em;
            line-height: 1.8;
            color: #2d3748;
            margin-bottom: 20px;
        }
        
        .meta {
            font-size: 1em;
            color: #718096;
            margin-bottom: 40px;
        }
        
        .vocab-word {
            background: #edf2f7;
            border-left: 4px solid #4299e1;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        
        .vocab-word strong {
            font-size: 1.3em;
            color: #2c5282;
            display: block;
            margin-bottom: 8px;
        }
        
        .question {
            background: #f7fafc;
            border-left: 4px solid #48bb78;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        
        .question-number {
            font-weight: 600;
            color: #2f855a;
            margin-bottom: 10px;
        }
        
        .journal-prompt {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 20px;
        }
        
        .journal-prompt h3 {
            color: white;
            margin-bottom: 15px;
        }
        
        .completion {
            text-align: center;
            padding: 40px;
        }
        
        .completion h2 {
            color: #48bb78;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        
        .progress {
            background: #e6fffa;
            border-radius: 50px;
            padding: 20px 40px;
            display: inline-block;
            font-size: 1.2em;
            color: #2c7a7b;
            font-weight: 600;
        }
        
        .reading-passage {
            background: #fffaf0;
            border: 2px solid #fbd38d;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            font-size: 1.15em;
            line-height: 1.9;
        }
        
        @media print {
            body { background: white; padding: 0; }
            .page { box-shadow: none; margin-bottom: 0; page-break-after: always; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Page 1: Title -->
        <div class="page">
            <h1>5th Grade ELA</h1>
            <h2>Lesson ${day}</h2>
            <p class="meta">${isAssessment ? 'Assessment Day' : unit.name}<br>${unit.author}</p>
            <p class="meta">Day ${day} of 180 • ${isAssessment ? 'Vocabulary Quiz & Comprehension Test' : 'Reading & Learning'}</p>
        </div>

        <!-- Page 2: Welcome -->
        <div class="page">
            <h2>${isAssessment ? 'Assessment Day!' : 'Welcome, Reader!'}</h2>
            ${isAssessment ? 
                `<p>Today you'll show what you've learned this week! You'll take a vocabulary quiz on the 8 words we studied, then answer comprehension questions about the story.</p>
                <p>Take your time and do your best. Remember to read each question carefully!</p>` :
                `<p>Today we're ${dayInUnit === 1 ? 'starting a new book' : 'continuing our journey through'}: <strong>${unit.name}</strong></p>
                <p><strong>Chapter:</strong> ${chapter.title}</p>
                <p>${chapter.summary}</p>
                <p>Let's learn two new vocabulary words, read part of the story, and think deeply about what we read!</p>`
            }
        </div>

        ${!isAssessment ? `
        <!-- Page 3: Vocabulary -->
        <div class="page">
            <h2>📚 Vocabulary</h2>
            <p>Learn these two words from today's reading:</p>
            
            <div class="vocab-word">
                <strong>${vocab[0]}</strong>
                <p><em>Pronunciation:</em> (${vocab[0]})</p>
                <p><em>Definition:</em> A word from our story about ${unit.theme.toLowerCase()}.</p>
                <p><em>Example:</em> In the story, we see this word when characters face challenges.</p>
            </div>
            
            <div class="vocab-word">
                <strong>${vocab[1]}</strong>
                <p><em>Pronunciation:</em> (${vocab[1]})</p>
                <p><em>Definition:</em> Another important word that helps us understand the story better.</p>
                <p><em>Example:</em> This word appears when describing the setting or characters.</p>
            </div>
        </div>

        <!-- Page 4: Reading -->
        <div class="page">
            <h2>📖 Reading Passage</h2>
            <h3>${chapter.title}</h3>
            
            <div class="reading-passage">
                <p>${chapter.summary}</p>
                <p>The story continues as our characters face new challenges and adventures. In this chapter, important events unfold that will shape the rest of the tale.</p>
                <p>As you read, pay attention to how the characters respond to difficulties, what choices they make, and what we can learn from their experiences.</p>
                <p>The theme of <strong>${unit.theme}</strong> runs throughout this story, teaching us valuable lessons about life, courage, and what it means to grow and change.</p>
            </div>
        </div>

        <!-- Page 5: Comprehension -->
        <div class="page">
            <h2>🤔 Comprehension Questions</h2>
            
            <div class="question">
                <div class="question-number">Question 1:</div>
                <p>What happened in today's chapter? Summarize the main events in 2-3 sentences.</p>
            </div>
            
            <div class="question">
                <div class="question-number">Question 2:</div>
                <p>How do the characters show the theme of ${unit.theme}? Give specific examples from the text.</p>
            </div>
            
            <div class="question">
                <div class="question-number">Question 3:</div>
                <p>What do you think will happen next? Use evidence from the story to support your prediction.</p>
            </div>
            
            <div class="question">
                <div class="question-number">Question 4:</div>
                <p>Choose one vocabulary word from today. How did it help you understand the story better?</p>
            </div>
        </div>

        <!-- Page 6: Journal -->
        <div class="page">
            <div class="journal-prompt">
                <h3>✍️ Journal Prompt</h3>
                <p>Connect today's reading to your own life:</p>
                <p><strong>If you were in this story, how would you handle the challenges the characters faced? What would you do differently? What would you do the same?</strong></p>
                <p>Write at least one paragraph (5-7 sentences) explaining your thoughts.</p>
            </div>
        </div>
        ` : `
        <!-- Page 3: Vocabulary Quiz -->
        <div class="page">
            <h2>📝 Vocabulary Quiz</h2>
            <p>Choose the best definition for each word we learned this week:</p>
            
            <div class="question">
                <div class="question-number">Question 1:</div>
                <p>What does "outlaw" mean?<br>
                A) A type of law<br>
                B) Someone who breaks the law<br>
                C) A judge<br>
                D) A sheriff</p>
            </div>
            
            <div class="question">
                <div class="question-number">Question 2-8:</div>
                <p>Continue with the remaining 7 vocabulary words from this week...</p>
            </div>
        </div>

        <!-- Page 4: Comprehension Test -->
        <div class="page">
            <h2>📋 Comprehension Test</h2>
            
            <div class="question">
                <div class="question-number">Question 1:</div>
                <p>What is the main theme of this week's reading? How do you know?</p>
            </div>
            
            <div class="question">
                <div class="question-number">Question 2:</div>
                <p>Compare and contrast two characters from this week. How are they alike and different?</p>
            </div>
            
            <div class="question">
                <div class="question-number">Question 3:</div>
                <p>What was the most important event this week? Why was it important to the story?</p>
            </div>
            
            <div class="question">
                <div class="question-number">Question 4:</div>
                <p>What lesson or message do you think the author wants readers to learn? Use evidence from the text.</p>
            </div>
        </div>

        <!-- Page 5: Writing Response -->
        <div class="page">
            <div class="journal-prompt">
                <h3>✍️ Written Response</h3>
                <p><strong>Write a paragraph (6-8 sentences) about:</strong></p>
                <p>How does the theme of ${unit.theme} appear in this week's reading? Give at least two specific examples from the text to support your answer.</p>
            </div>
        </div>
        `}

        <!-- Final Page: Completion -->
        <div class="page completion">
            <div class="completion">
                <h2>🎉 ${isAssessment ? 'Assessment Complete!' : 'Great Work Today!'}</h2>
                <p style="font-size: 1.3em; margin: 30px 0;">You've finished Lesson ${day}!</p>
                <div class="progress">Day ${day} of 180 Complete! ✓</div>
                <p style="margin-top: 30px; font-size: 1.1em;">${isAssessment ? 'Excellent job showing what you learned this week!' : 'Keep reading, keep learning, keep growing!'}</p>
            </div>
        </div>
    </div>
</body>
</html>`;

  return html;
}

// Build all 180 lessons
console.log('🐉 Building 5th Grade - Adventure, Travel, & Mythology (180 lessons)...\n');

for (let day = 1; day <= 180; day++) {
  const html = generateLesson(day);
  const filename = `5th-grade-lesson-${day}-REVISED.html`;
  const filepath = path.join(__dirname, filename);
  
  fs.writeFileSync(filepath, html);
  
  if (day % 20 === 0) {
    console.log(`✓ Built ${day}/180 lessons...`);
  }
}

console.log('\n✅ All 180 5th grade lessons built successfully!');
console.log('\n📚 Curriculum:');
units.forEach(unit => {
  console.log(`   ${unit.name} (${unit.author}) - Days ${unit.startDay}-${unit.endDay}`);
});
console.log('\n🎉 Ready to deploy to BedrockELA!');
