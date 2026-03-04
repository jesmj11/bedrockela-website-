/**
 * Create Interactive Assessment Quizzes for 4th Grade
 * Adds multiple choice quizzes to Days 5, 10, 15, 20, 25, 30, etc.
 * 
 * Assessment days get:
 * - 4-5 multiple choice questions
 * - Questions review vocabulary and comprehension from previous 4 days
 * - Immediate feedback (green = correct, shows answer if wrong)
 * - One question per page
 */

const fs = require('fs');

// Quiz questions for each assessment day
const assessmentQuizzes = {
  5: {
    title: "Week 1 Assessment - Chapters 1-4",
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
        explanation: "Dorothy lives on the Kansas prairies with Uncle Henry and Aunt Em in a small gray house."
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
        explanation: "Everything is described as gray - the prairie, the grass, even Uncle Henry and Aunt Em have turned gray from the sun and wind."
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
        explanation: "The cyclone lifts the house up into the air and carries it miles and miles away!"
      },
      {
        question: "Who is the first person Dorothy meets in the Land of Oz?",
        options: [
          "The Wicked Witch of the East",
          "The Scarecrow",
          "The Good Witch of the North",
          "The Wizard of Oz"
        ],
        correct: "C",
        explanation: "After Dorothy's house lands in Oz, she meets the Good Witch of the North and the Munchkins."
      },
      {
        question: "What does the Good Witch tell Dorothy she must do to get home?",
        options: [
          "Click her silver shoes together three times",
          "Find the Wizard of Oz in the Emerald City",
          "Follow the Yellow Brick Road backwards",
          "Ask the Wicked Witch for help"
        ],
        correct: "B",
        explanation: "The Good Witch tells Dorothy she must travel to the Emerald City to ask the great Wizard of Oz for help getting home to Kansas."
      }
    ]
  },
  
  10: {
    title: "Week 2 Assessment - Chapters 5-8",
    questions: [
      {
        question: "Why does the Scarecrow want to visit the Wizard?",
        options: [
          "He wants courage",
          "He wants a heart",
          "He wants brains",
          "He wants to go home"
        ],
        correct: "C",
        explanation: "The Scarecrow believes he has no brains and hopes the Wizard can give him some."
      },
      {
        question: "What does the Tin Woodman want from the Wizard?",
        options: [
          "Brains",
          "A heart",
          "Courage",
          "A new axe"
        ],
        correct: "B",
        explanation: "The Tin Woodman wants a heart so he can love again."
      },
      {
        question: "Why is the Cowardly Lion ashamed?",
        options: [
          "He is supposed to be brave but he is frightened of everything",
          "He ran away from his family",
          "He cannot roar loudly",
          "He is smaller than other lions"
        ],
        correct: "A",
        explanation: "As the King of Beasts, the Lion should be brave, but he admits he is a coward and is frightened of many things."
      },
      {
        question: "What dangerous obstacle do they encounter in the forest?",
        options: [
          "A deep river",
          "The Kalidahs (beasts with bear bodies and tiger heads)",
          "A field of poppies that makes them sleepy",
          "All of the above"
        ],
        correct: "D",
        explanation: "Dorothy and her friends face many dangers: crossing a river, escaping from the Kalidahs, and nearly falling asleep forever in the deadly poppy field."
      }
    ]
  }
};

/**
 * Generate quiz page HTML for a single question
 */
function generateQuizPage(question, questionNum, totalQuestions, quizId) {
  const optionLetters = ['A', 'B', 'C', 'D'];
  
  return `
                // Assessment Question ${questionNum}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <span style="display: inline-block; padding: 10px 25px; background: linear-gradient(135deg, #305853, #B06821); color: white; border-radius: 25px; font-size: 16px; font-weight: 700;">
                                    Question ${questionNum} of ${totalQuestions}
                                </span>
                            </div>
                            
                            <h2 style="color: #305853; margin: 30px 0 25px 0; font-size: 22px; line-height: 1.5;">
                                ${question.question}
                            </h2>
                            
                            <div id="quiz-${quizId}-q${questionNum}" style="margin: 30px 0;">
                                ${question.options.map((option, index) => {
                                  const letter = optionLetters[index];
                                  return `
                                <button 
                                    class="quiz-option-btn"
                                    data-question="${questionNum}"
                                    data-option="${letter}"
                                    data-correct="${letter === question.correct}"
                                    onclick="checkAnswer${quizId}(${questionNum}, '${letter}', ${letter === question.correct})"
                                    style="
                                        width: 100%;
                                        padding: 18px 20px;
                                        margin-bottom: 12px;
                                        background: white;
                                        border: 3px solid #305853;
                                        border-radius: 12px;
                                        font-size: 17px;
                                        text-align: left;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                        display: block;
                                    "
                                    onmouseover="if(!this.disabled) { this.style.background='rgba(48,88,83,0.1)'; this.style.transform='translateX(5px)'; }"
                                    onmouseout="if(!this.disabled) { this.style.background='white'; this.style.transform='translateX(0)'; }"
                                >
                                    <span style="font-weight: 800; color: #B06821; margin-right: 12px; font-size: 18px;">${letter})</span>
                                    ${option}
                                </button>`;
                                }).join('')}
                            </div>
                            
                            <div id="feedback-${quizId}-q${questionNum}" style="margin-top: 25px;"></div>
                        </div>
                        
                        <script>
                            window.checkAnswer${quizId} = window.checkAnswer${quizId} || function(qNum, selected, isCorrect) {
                                // Disable all buttons
                                document.querySelectorAll(\`[data-question="\${qNum}"]\`).forEach(btn => {
                                    btn.disabled = true;
                                    btn.style.cursor = 'not-allowed';
                                    
                                    const letter = btn.dataset.option;
                                    const isThisCorrect = btn.dataset.correct === 'true';
                                    
                                    if (letter === selected) {
                                        if (isCorrect) {
                                            btn.style.background = '#4caf50';
                                            btn.style.color = 'white';
                                            btn.style.borderColor = '#4caf50';
                                        } else {
                                            btn.style.background = '#ff9800';
                                            btn.style.color = 'white';
                                            btn.style.borderColor = '#ff9800';
                                        }
                                    } else if (isThisCorrect) {
                                        btn.style.background = '#4caf50';
                                        btn.style.color = 'white';
                                        btn.style.borderColor = '#4caf50';
                                        btn.innerHTML += ' <span style="font-weight: 800; margin-left: 10px;">✓ Correct Answer</span>';
                                    }
                                });
                                
                                // Show feedback
                                const feedback = document.getElementById('feedback-${quizId}-q' + qNum);
                                if (isCorrect) {
                                    feedback.innerHTML = \`
                                        <div style="padding: 20px; background: #4caf50; color: white; border-radius: 12px; animation: slideIn 0.3s;">
                                            <div style="font-size: 24px; font-weight: 800; margin-bottom: 10px;">✓ Correct!</div>
                                            <p style="margin: 0; font-size: 16px;">${question.explanation}</p>
                                        </div>
                                    \`;
                                } else {
                                    feedback.innerHTML = \`
                                        <div style="padding: 20px; background: #ff9800; color: white; border-radius: 12px; animation: slideIn 0.3s;">
                                            <div style="font-size: 24px; font-weight: 800; margin-bottom: 10px;">Not quite...</div>
                                            <p style="margin: 0; font-size: 16px;">${question.explanation}</p>
                                        </div>
                                    \`;
                                }
                                
                                // Save answer
                                const answers = JSON.parse(localStorage.getItem('assessment-${quizId}') || '{}');
                                answers['q' + qNum] = { selected, correct: isCorrect, timestamp: Date.now() };
                                localStorage.setItem('assessment-${quizId}', JSON.stringify(answers));
                            };
                        </script>
                        
                        <style>
                            @keyframes slideIn {
                                from { opacity: 0; transform: translateY(-10px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                        </style>
                    \`
                },`;
}

/**
 * Add quiz to an assessment day lesson
 */
function addQuizToAssessmentDay(day, quiz) {
  const lessonPath = `./4th-grade-day-${day}.html`;
  
  if (!fs.existsSync(lessonPath)) {
    console.log(`⚠️  Lesson not found: ${lessonPath}`);
    return false;
  }
  
  let html = fs.readFileSync(lessonPath, 'utf8');
  
  // Check if quiz already added
  if (html.includes(`assessment-day${day}`)) {
    console.log(`✅ Quiz already in Day ${day}`);
    return true;
  }
  
  // Find the comprehension test page and replace it with quiz pages
  // Assessment days use "Page 4: Comprehension Test"
  const comprehensionIndex = html.indexOf('// Page 4: Comprehension Test');
  const journalIndex = html.indexOf('// Page 5: Journal');
  
  if (comprehensionIndex === -1 || journalIndex === -1) {
    console.log(`⚠️  Could not find insertion points in Day ${day}`);
    return false;
  }
  
  // Generate quiz pages
  const quizPages = quiz.questions.map((q, index) => 
    generateQuizPage(q, index + 1, quiz.questions.length, `day${day}`)
  ).join('\n');
  
  // Replace comprehension questions section with quiz
  html = html.slice(0, comprehensionIndex) + quizPages + '\n                ' + html.slice(journalIndex);
  
  // Write updated file
  fs.writeFileSync(lessonPath, html, 'utf8');
  console.log(`✅ Added ${quiz.questions.length} quiz questions to Day ${day}`);
  return true;
}

// Process assessment days
console.log('🎯 Adding Interactive Quizzes to Assessment Days...\n');

let successCount = 0;
Object.entries(assessmentQuizzes).forEach(([day, quiz]) => {
  console.log(`\n📝 Day ${day}: ${quiz.title}`);
  if (addQuizToAssessmentDay(parseInt(day), quiz)) {
    successCount++;
  }
});

console.log(`\n🎉 Done! Added quizzes to ${successCount} assessment days`);
console.log('\nAssessment days now have:');
console.log('  - Multiple choice questions (one per page)');
console.log('  - Immediate feedback with explanations');
console.log('  - Visual indicators (green = correct, orange = try again)');
console.log('  - Progress tracking (Question X of Y)');
console.log('  - Auto-saves answers to localStorage');
