/**
 * Add Interactive Quizzes to 4th Grade Lessons
 * Replaces scrolling comprehension questions with one-question-per-page interactive quiz
 */

const fs = require('fs');

// Quiz questions for Wizard of Oz Chapter 1
const wizardDay1Quiz = {
  questions: [
    {
      question: "Where does Dorothy live at the beginning of the story?",
      options: [
        "A big city with tall buildings",
        "The Kansas prairies with Uncle Henry and Aunt Em",
        "A forest near a river",
        "A small island in the ocean"
      ],
      correct: "B",
      explanation: "Dorothy lives on the Kansas prairies with Uncle Henry and Aunt Em in a small house.",
      hint: "Look at the first paragraph - where does the story say Dorothy's house is located?"
    },
    {
      question: "How does the author describe the land where Dorothy lives?",
      options: [
        "Green, lush, and full of flowers",
        "Gray, flat, and dry",
        "Covered in snow and ice",
        "Rocky with tall mountains"
      ],
      correct: "B",
      explanation: "The story describes everything as gray - the prairie, the grass, even Aunt Em and Uncle Henry!",
      hint: "The author uses the word 'gray' many times. What color is everything around Dorothy?"
    },
    {
      question: "What is a cyclone cellar?",
      options: [
        "A place to store food for the winter",
        "An underground shelter to protect from dangerous windstorms",
        "A room where they keep their horses",
        "A special kitchen for cooking"
      ],
      correct: "B",
      explanation: "A cyclone cellar is an underground shelter where the family can go to stay safe when a cyclone (tornado) comes.",
      hint: "The story explains that it's where the family goes when great whirlwinds arise."
    },
    {
      question: "What happens to Dorothy's house during the cyclone?",
      options: [
        "It gets destroyed and falls apart",
        "It stays on the ground but shakes a lot",
        "It rises up into the air and is carried away",
        "Uncle Henry saves it by tying it down"
      ],
      correct: "C",
      explanation: "The house is lifted up by the cyclone and carried miles and miles away through the air!",
      hint: "Dorothy feels like she's in a balloon. What is happening to the house?"
    }
  ]
};

function addQuizToLesson(lessonPath, quizData, dayNumber) {
  if (!fs.existsSync(lessonPath)) {
    console.log(`⚠️  Lesson not found: ${lessonPath}`);
    return false;
  }
  
  let html = fs.readFileSync(lessonPath, 'utf8');
  
  // Check if quiz already added
  if (html.includes('interactive-quiz.js')) {
    console.log(`✅ Quiz already in ${lessonPath}`);
    return true;
  }
  
  // Find where to insert the quiz pages (after comprehension questions page)
  // We'll insert before the Journal page (Page 6)
  const journalPageIndex = html.indexOf('// Page 6: Journal');
  
  if (journalPageIndex === -1) {
    console.log(`⚠️  Could not find journal page in ${lessonPath}`);
    return false;
  }
  
  // Create quiz pages (one per question)
  const quizPagesCode = quizData.questions.map((q, index) => {
    return `
                // Page ${5 + index}: Quiz Question ${index + 1}
                {
                    render: () => \`
                        <div id="quiz-question-${index + 1}"></div>
                        <script>
                          if (!window.quizInstance) {
                            window.quizInstance = new InteractiveQuiz('quiz-question-${index + 1}', {
                              lessonId: '4th-grade-day-${dayNumber}',
                              questions: ${JSON.stringify(quizData.questions, null, 16)}
                            });
                            window.quizInstance.currentQuestion = ${index};
                            window.quizInstance.render();
                          } else {
                            window.quizInstance.currentQuestion = ${index};
                            window.quizInstance.render();
                            const container = document.getElementById('quiz-question-${index + 1}');
                            if (container && window.quizInstance.container) {
                              container.innerHTML = window.quizInstance.container.innerHTML;
                            }
                          }
                        </script>
                    \`
                },`;
  }).join('\n');
  
  // Insert quiz pages before journal
  html = html.slice(0, journalPageIndex) + quizPagesCode + '\n                ' + html.slice(journalPageIndex);
  
  // Add quiz script include (before lesson-viewer.js)
  if (!html.includes('interactive-quiz.js')) {
    html = html.replace(
      '<script src="js/lesson-viewer.js"></script>',
      '<script src="js/interactive-quiz.js"></script>\n    <script src="js/lesson-viewer.js"></script>'
    );
  }
  
  // Write updated file
  fs.writeFileSync(lessonPath, html, 'utf8');
  console.log(`✅ Added interactive quiz to ${lessonPath}`);
  return true;
}

// For now, just add to Day 1 as a test
console.log('🎯 Adding Interactive Quizzes to 4th Grade...\n');

const success = addQuizToLesson('./4th-grade-day-1.html', wizardDay1Quiz, 1);

if (success) {
  console.log('\n🎉 Interactive quiz added to Day 1!');
  console.log('\nFeatures:');
  console.log('  - One question per page');
  console.log('  - Click to select answers');
  console.log('  - Immediate feedback (correct/incorrect)');
  console.log('  - Auto-saves to localStorage + Firebase');
  console.log('  - Shows progress (Question X of Y)');
} else {
  console.log('\n❌ Failed to add quiz');
}
