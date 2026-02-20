const fs = require('fs');

// Lesson data structure
const lessonData = {
  23: { title: "Little Goat's Clever Plan", blend: "R-blends (br, cr, dr, tr)", words: ["TRIP", "TRAP", "BRAG", "CRAB", "DRAG"], sightWord: "from", story: "Three Billy Goats Gruff - Part 3", emoji: "🐐" },
  24: { title: "Middle Goat's Turn", blend: "More R-blends", words: ["GRAB", "GRIN", "PROUD", "BRIM", "DROP"], sightWord: "some", story: "Three Billy Goats Gruff - Part 4", emoji: "🐐" },
  25: { title: "Big Billy Goat Saves the Day", blend: "Ending Blends -ND, -NK", words: ["HAND", "LAND", "SINK", "THINK", "STAND"], sightWord: "could", story: "Three Billy Goats Gruff - Part 5", emoji: "🐐" },
  26: { title: "The Happy Ending", blend: "Ending Blends -ST, -LT", words: ["FAST", "LAST", "JUST", "MELT", "BELT"], sightWord: "would", story: "Three Billy Goats Gruff - Part 6", emoji: "🐐" },
  27: { title: "Review Day: All Blends", blend: "Blend Review", words: ["STOP", "CLIP", "TRIP", "HAND", "FAST"], sightWord: "Review", story: "Three Billy Goats Review", emoji: "🎯" },
  28: { title: "Blend Practice Stories", blend: "Blends in Context", words: ["SPEND", "CLAMP", "FROST", "BLEND"], sightWord: "after", story: "Blend Adventure", emoji: "📚" },
  29: { title: "Blend Mastery", blend: "All Blends", words: ["BRING", "FLASH", "SWEPT", "GRAND"], sightWord: "before", story: "Practice Story", emoji: "⭐" },
  30: { title: "Assessment & Celebration", blend: "Blend Assessment", words: ["Review All"], sightWord: "Review", story: "Assessment", emoji: "🎉" },
  
  31: { title: "The Magic E & Goldilocks", blend: "CVCe: Long A (a_e)", words: ["MAKE", "TAKE", "CAME", "GAVE", "SAME", "NAME"], sightWord: "there", story: "Goldilocks - Part 1", emoji: "🐻" },
  32: { title: "Goldilocks Makes Poor Choices", blend: "CVCe: Long I (i_e)", words: ["LIKE", "TIME", "NICE", "FIVE", "MINE", "LIFE"], sightWord: "could", story: "Goldilocks - Part 2", emoji: "🐻" },
  33: { title: "The Three Chairs", blend: "CVCe: Long O (o_e)", words: ["HOME", "HOPE", "RODE", "STONE", "CHOSE", "BROKE"], sightWord: "where", story: "Goldilocks - Part 3", emoji: "🐻" },
  34: { title: "Testing the Beds", blend: "CVCe: Long U (u_e)", words: ["CUTE", "HUGE", "RUDE", "MULE", "TUBE", "FUSE"], sightWord: "when", story: "Goldilocks - Part 4", emoji: "🐻" },
  35: { title: "The Bears Return", blend: "CVCe: Long E (e_e)", words: ["THESE", "THEME", "COMPETE"], sightWord: "which", story: "Goldilocks - Part 5", emoji: "🐻" },
  36: { title: "Goldilocks Runs Away", blend: "CVCe Review", words: ["MAKE", "LIKE", "HOME", "CUTE", "SAFE"], sightWord: "little", story: "Goldilocks - Part 6", emoji: "🐻" },
  37: { title: "Magic E Practice", blend: "CVCe Mixed Practice", words: ["TAKE", "NINE", "HOPE", "JUNE"], sightWord: "never", story: "Practice Story", emoji: "✨" },
  38: { title: "Short vs Long Vowels", blend: "CVC vs CVCe", words: ["MAT/MATE", "CAN/CANE", "HOP/HOPE"], sightWord: "always", story: "Comparison Story", emoji: "🔀" },
  39: { title: "CVCe Mastery", blend: "All Long Vowels", words: ["BRAVE", "SHINE", "THOSE", "FLUTE"], sightWord: "another", story: "Mastery Story", emoji: "⭐" },
  40: { title: "Assessment & Celebration", blend: "CVCe Assessment", words: ["Review All"], sightWord: "Review", story: "Assessment", emoji: "🎉" }
};

// Story texts
const storyTexts = {
  23: "Little Billy Goat looked up at the troll. The troll was very big and scary! But the little goat was clever.\n\n\"Please don't eat me!\" said Little Billy Goat. \"I am so small. Wait for my brother. He is much bigger and will make a better meal!\"\n\nThe troll thought about this. \"Hmm, a bigger goat would be better,\" he said. \"Fine! You may cross. But your brother better come soon!\"\n\nLittle Billy Goat ran across the bridge as fast as he could. TRIP TRAP, TRIP TRAP! He made it safely to the other side!\n\nSoon, Middle Billy Goat Gruff started across the bridge. TRIP TRAP, TRIP TRAP! His hoofs were louder than his little brother's.",
  
  24: "The troll heard the louder TRIP TRAP, TRIP TRAP! He jumped up from under the bridge.\n\n\"WHO IS THAT CROSSING MY BRIDGE?\" roared the troll.\n\n\"It is I, Middle Billy Goat Gruff,\" said the middle goat. He was scared, but he remembered what his little brother had done.\n\n\"I'm going to eat you up!\" said the troll with a big grin.\n\n\"Oh, please don't eat me!\" said Middle Billy Goat. \"I am not very big. Wait for my brother! He is much bigger and will make a better meal!\"\n\nThe troll thought this made sense. \"Another bigger goat? Okay, you may cross!\"\n\nMiddle Billy Goat ran across the bridge. Soon he was safe with his little brother on the other side.",
  
  25: "Now it was Big Billy Goat Gruff's turn. He was not scared at all! He was big and strong with huge horns.\n\nTRIP TRAP, TRIP TRAP, TRIP TRAP! His hoofs made the loudest sound on the bridge!\n\nThe troll jumped up. \"WHO IS THAT CROSSING MY BRIDGE?\"\n\n\"It is I, BIG Billy Goat Gruff!\" said the big goat in a loud, deep voice.\n\n\"Well, I'm going to eat YOU up!\" roared the troll.\n\n\"Oh no you won't!\" said Big Billy Goat. He lowered his huge horns and charged at the troll!\n\nCRASH! Big Billy Goat butted the troll with his horns. The troll went flying through the air! SPLASH! He fell into the river and was washed far away.",
  
  26: "Big Billy Goat Gruff crossed the bridge safely. He joined his two brothers on the other side.\n\n\"Hooray!\" cheered Little Billy Goat and Middle Billy Goat. \"You saved us!\"\n\n\"That troll will never bother anyone again,\" said Big Billy Goat proudly.\n\nThe three billy goats ate the sweet, green grass on the hill. They ate and ate until they were full. It was the best grass they had ever tasted!\n\nFrom that day on, the three billy goats could cross the bridge whenever they wanted. They lived happily ever after!\n\nAnd if they haven't gotten too fat from all that grass, they are probably still eating there today!\n\nTHE END",
  
  31: "Once upon a time, three bears lived in a small house in the woods. There was Papa Bear, Mama Bear, and Baby Bear.\n\nOne morning, they made hot porridge for breakfast. \"This porridge is too hot!\" said Mama Bear. \"Let's take a walk while it cools.\"\n\nThe bears left their house. They did not lock the door.\n\nA little girl named Goldilocks lived near the woods. She had long, curly golden hair. Goldilocks liked to explore, but she did not always make good choices.\n\nThat same morning, Goldilocks came upon the bears' house. \"What a cute house!\" she said. She knocked on the door. No one answered.\n\nGoldilocks tried the handle. The door opened! \"Maybe I'll just peek inside,\" she said. This was NOT a wise choice!",
  
  32: "Goldilocks stepped inside. The first thing she saw was three bowls of porridge on the table.\n\n\"This porridge smells good! Maybe I could try just a little,\" she said.\n\nFirst, she tried Papa Bear's big bowl. \"Ouch! Too hot!\" The porridge burned her tongue.\n\nThen she tried Mama Bear's middle-sized bowl. \"Yuck! Too cold!\"\n\nFinally, she tried Baby Bear's small bowl. \"Mmm! Just right!\" She ate every bite.\n\nNow Goldilocks felt tired. \"Maybe I could sit down for a minute,\" she thought.",
  
  33: "Goldilocks saw three chairs. She tried Papa Bear's big chair. \"Too hard!\" she said.\n\nShe tried Mama Bear's middle chair. \"Too soft!\"\n\nThen she tried Baby Bear's small chair. \"Just right!\" But when she sat down hard... CRACK! The chair broke into pieces!\n\n\"Oops!\" said Goldilocks. \"Maybe I should rest instead.\"",
  
  34: "Upstairs, Goldilocks found three beds. She tried Papa Bear's huge bed. \"Too hard!\"\n\nShe tried Mama Bear's medium bed. \"Too soft!\"\n\nThen she tried Baby Bear's small bed. \"Just right!\" She fell fast asleep.\n\nSoon the three bears came home from their walk.",
  
  35: "\"Someone's been eating my porridge!\" said Papa Bear in his deep voice.\n\n\"Someone's been eating MY porridge!\" said Mama Bear.\n\n\"Someone's been eating my porridge... and they ate it ALL UP!\" cried Baby Bear.\n\nThen they saw the chairs. \"Someone's been sitting in my chair!\" said Papa Bear.\n\n\"Someone's been sitting in MY chair!\" said Mama Bear.\n\n\"Someone's been sitting in my chair... and they BROKE it!\" cried Baby Bear.",
  
  36: "The three bears went upstairs. \"Someone's been sleeping in my bed!\" said Papa Bear.\n\n\"Someone's been sleeping in MY bed!\" said Mama Bear.\n\n\"Someone's been sleeping in my bed... and there she IS!\" cried Baby Bear.\n\nGoldilocks woke up and saw the three bears! \"AAAH!\" she screamed. She jumped out of bed and ran down the stairs. She ran out the door and into the woods as fast as she could!\n\nGoldilocks never went back to the bears' house again. She learned an important lesson: Never go into someone's house without permission!\n\nTHE END"
};

const sightWordsList = ["I", "a", "the", "is", "it", "in", "on", "he", "she", "we", "my", "you", "go", "to", "can", "see", "they", "were", "stop", "step", "who"];

function generateLesson(lessonNum) {
  const lesson = lessonData[lessonNum];
  if (!lesson) return null;

  const cumulativeSightWords = [...sightWordsList];
  if (lesson.sightWord !== "Review") {
    cumulativeSightWords.push(lesson.sightWord);
  }
  const sightWordsDisplay = cumulativeSightWords.slice(-10).join(", ");

  // Use File System write with proper template
  const templatePath = '1st-grade-lesson-21-v4.html';
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Simple replacement approach - read lesson 21 as template and modify
  const newHtml = template
    .replace(/Lesson 21/g, `Lesson ${lessonNum}`)
    .replace(/lesson-21/g, `lesson-${lessonNum}`)
    .replace(/The Troll Under the Bridge/g, lesson.title)
    .replace(/L-Blends: BL, CL, FL/g, lesson.blend)
    .replace(/New word: <strong>who<\/strong>/g, `New word: <strong>${lesson.sightWord}</strong>`)
    .replace(/Three Billy Goats Gruff - Part 2/g, lesson.story)
    .replace(/🐐/g, lesson.emoji);
    
  return newHtml;
}

// Generate lessons using simpler approach - copy and modify lesson 22 template
console.log('Building lessons 23-40 in v4 format...\n');

const template22 = fs.readFileSync('1st-grade-lesson-22-v4.html', 'utf8');

for (let i = 23; i <= 40; i++) {
  const lesson = lessonData[i];
  if (!lesson) continue;
  
  let html = template22;
  
  // Basic replacements
  html = html.replace(/Lesson 22/g, `Lesson ${i}`);
  html = html.replace(/lesson-22/g, `lesson-${i}`);
  html = html.replace(/The Troll Under the Bridge/g, lesson.title);
  html = html.replace(/L-Blends: BL, CL, FL/g, lesson.blend);
  html = html.replace(/who/g, lesson.sightWord);
  html = html.replace(/Three Billy Goats Gruff - Part 2/g, lesson.story);
  html = html.replace(/🐐/g, lesson.emoji);
  
  const filename = `1st-grade-lesson-${i}-v4.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Built: ${filename}`);
}

console.log(`\n🎉 Successfully built 18 lessons (23-40) in v4 format!`);
