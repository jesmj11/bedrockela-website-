const fs = require('fs');

const raw = fs.readFileSync('/tmp/arabian_questions.txt', 'utf8');

// Split by story titles
const stories = raw.split(/\n(?=[A-Z][a-z]+ and |The [A-Z])/);

const questionsData = {};
const dayMap = {
  "Aladdin and the Magic Lamp": "181",
  "Ali Baba and the Forty Thieves": "182",
  "Sinbad and the Valley of Diamonds": "183",
  "The Fisherman and the Genie": "184",
  "The Three Princes and Princess Nouronnihar": "186",
  "The Ebony Horse": "187",
  "Ali Cogia, the Merchant of Baghdad": "188"
};

stories.forEach(block => {
  // Find story title
  let storyTitle = null;
  for (let title of Object.keys(dayMap)) {
    if (block.includes(title)) {
      storyTitle = title;
      break;
    }
  }
  
  if (!storyTitle) return;
  
  // Extract questions (lines starting with bullet •)
  const questions = [];
  const lines = block.split('\n');
  let currentQuestion = '';
  
  lines.forEach(line => {
    if (line.trim().startsWith('•')) {
      if (currentQuestion) questions.push(currentQuestion.trim());
      currentQuestion = line.replace(/^\s*•\s*/, '');
    } else if (currentQuestion && line.trim()) {
      currentQuestion += ' ' + line.trim();
    }
  });
  
  if (currentQuestion) questions.push(currentQuestion.trim());
  
  if (questions.length > 0) {
    questionsData[dayMap[storyTitle]] = questions;
  }
});

fs.writeFileSync('arabian-comprehension-questions.json', JSON.stringify(questionsData, null, 2));
console.log('✅ Created arabian-comprehension-questions.json');
console.log(`   Total questions: ${Object.values(questionsData).flat().length}`);
Object.keys(questionsData).forEach(day => {
  console.log(`   Day ${day}: ${questionsData[day].length} questions`);
});
