const fs = require('fs');

// Complete lesson data from unit4_days86to90.docx
const lessons = {
  86: {
    title: "Around the World in 80 Days",
    subtitle: "Chapters 1-3: The Wager",
    vocab: { word: "eccentric", type: "adjective/noun", def: "Unusual or strange in a way that is interesting rather than alarming. Someone whose habits or personality are unconventional." },
    tasks: ["Read Chapters 1-3", "Meet Phileas Fogg and Passepartout", "Identify third-person omniscient POV", "Write in your journal"],
    journalPrompt: "• How does Fogg compare to every other protagonist you have read about this year?\n• What is the difference between omniscient and limited POV? How will it change the reading experience?\n• Do you think Fogg will succeed? What could go wrong on a trip around the world in 1872?",
    quiz: [
      { q: "What is Phileas Fogg like?", c: ["Emotional and impulsive like Jim", "Precise, wealthy, calm, and lives by an exact daily routine", "Wild and instinctive like Buck", "Friendly and talkative"], a: 1, e: "Fogg is precise and methodical - very different from previous protagonists!" },
      { q: "What is the wager?", c: ["He can climb the tallest mountain", "He can travel around the world in 80 days for 20,000 pounds", "He can write a novel in a month", "He can sail across the Atlantic"], a: 1, e: "Fogg bets 20,000 pounds he can circle the globe in exactly 80 days!" },
      { q: "What is third-person omniscient POV?", c: ["The narrator uses 'I'", "The narrator knows only one character's thoughts", "The narrator knows EVERYTHING — all characters' thoughts and events", "There is no narrator"], a: 2, e: "Omniscient means all-knowing - the narrator can see into every mind!" }
    ]
  },
  87: {
    title: "The Detective on the Trail",
    subtitle: "Chapters 4-6: Enter Detective Fix",
    vocab: { word: "circumstantial", type: "adjective", def: "Based on circumstances that suggest something but do not prove it directly. Circumstantial evidence LOOKS convincing but can be misleading." },
    tasks: ["Read Chapters 4-6", "Meet Detective Fix and understand his mistake", "See how omniscient POV creates dramatic irony", "Write in your journal"],
    journalPrompt: "• How does omniscient POV change the experience of dramatic irony compared to first person?\n• Fix is WRONG about Fogg. Compare his mistake to a misjudgment from an earlier book.\n• Is the Fix subplot funny, suspenseful, or both? Why?",
    quiz: [
      { q: "Why does Fix suspect Fogg?", c: ["He saw Fogg rob the bank", "Fogg left London suddenly, matches the description, and carries a lot of money", "Someone told Fix that Fogg was the robber", "Fogg confessed"], a: 1, e: "Fix's evidence is entirely circumstantial - it LOOKS suspicious but it's all wrong!" },
      { q: "How does omniscient POV create dramatic irony?", c: ["It does not create irony", "The reader can see both Fogg's innocence and Fix's suspicion simultaneously", "Only Fix's thoughts are shown", "The narrator hides information"], a: 1, e: "We see BOTH sides - we know Fogg is innocent while watching Fix make his mistake!" },
      { q: "How is dramatic irony here different from Treasure Island?", c: ["They are exactly the same", "In Treasure Island, irony came from Jim's limited knowledge; here from the omniscient narrator showing BOTH sides", "There is no irony in Around the World", "Treasure Island had no irony"], a: 1, e: "First-person irony is more personal; omniscient irony shows the whole picture!" }
    ]
  },
  88: {
    title: "India: Fiction and Reality",
    subtitle: "Chapters 7-11: The India Chapters",
    vocab: { word: "representation", type: "noun", def: "How a person, group, or culture is depicted or portrayed in media, literature, or art. Representation can be accurate, stereotyped, positive, negative, or complex." },
    tasks: ["Read Chapters 7-11 (India section)", "Meet Aouda, a new major character", "Think critically about cultural representation", "Write in your journal"],
    journalPrompt: "• How does the rescue of Aouda change your view of Fogg as a character?\n• Discuss cultural representation in Around the World. What did Verne get right? What feels stereotyped?\n• Compare reading with an adventure lens and a critical lens. Why is it important to use both?",
    quiz: [
      { q: "What problem does Fogg encounter in India?", c: ["He gets lost", "The railroad is unfinished, so he must travel by elephant", "His money is stolen", "Fix arrests him"], a: 1, e: "The railroad isn't finished, forcing Fogg to improvise with an elephant ride!" },
      { q: "Who is Aouda?", c: ["A detective", "An Indian woman Fogg rescues; she joins their journey", "Fogg's sister", "A ship captain"], a: 1, e: "Aouda is rescued by Fogg and becomes a major character in the story." },
      { q: "Why should we read Verne's portrayal of India critically?", c: ["Old books are always accurate", "Verne wrote from outside the culture and his era's biases led to stereotypes", "India did not exist in 1873", "Verne hated India"], a: 1, e: "Critical reading means recognizing when outside perspectives include biases." }
    ]
  },
  89: {
    title: "Stories From India",
    subtitle: "Indian Folktale (Jataka Tales or Panchatantra)",
    vocab: { word: "perspective", type: "noun (revisited)", def: "The viewpoint shaped by a person's culture, background, and experience. Verne's perspective on India was European. This folktale's perspective is Indian." },
    tasks: ["Read an Indian folktale", "Compare Verne vs. Indian storytellers", "Think about whose voices we hear in literature", "Write in your journal"],
    journalPrompt: "• Compare the two portrayals of India: Verne's European perspective vs. the Indian folktale's inside perspective.\n• What did the folktale teach you about Indian culture that Verne's novel did not?\n• Why is it important to hear stories from INSIDE a culture?",
    quiz: [
      { q: "What is the main difference between Verne's portrayal and the Indian folktale?", c: ["There is no difference", "Verne describes India from outside; the folktale comes from INSIDE the culture", "The folktale is about France", "Verne's portrayal is more accurate"], a: 1, e: "Inside voices reveal values and wisdom that outside observers might miss!" },
      { q: "Why read stories FROM a culture, not just ABOUT a culture?", c: ["It is not important", "Stories from inside a culture reveal its values, humor, and wisdom in ways outsiders cannot", "Outside perspectives are always wrong", "Inside perspectives are always correct"], a: 1, e: "Hearing a culture's OWN stories gives insight no outside observer can provide." }
    ]
  },
  90: {
    title: "Across Asia",
    subtitle: "Chapters 12-16: Hong Kong and Japan",
    vocab: { word: "foil", type: "noun", def: "A character who contrasts with the main character, highlighting certain qualities through their differences. The foil makes the protagonist's traits stand out more clearly." },
    tasks: ["Read Chapters 12-16", "Track the rising tension (time is running out!)", "Analyze Passepartout as a character and comic foil", "Write your end-of-week and HALFWAY journal"],
    journalPrompt: "SPECIAL HALFWAY JOURNAL (write a full paragraph — 6+ sentences!):\n• Day 90 reflection: How have you grown as a reader and writer since Day 1?\n• Compare ALL FOUR novels you have read. Which was your favorite and why?\n• What is the most important skill you have learned this year so far?",
    quiz: [
      { q: "What is a literary foil?", c: ["A villain", "A character who contrasts with the protagonist, highlighting their qualities", "A narrator", "A plot twist"], a: 1, e: "A foil is a contrasting character that makes the protagonist's traits more obvious!" },
      { q: "How is Passepartout a foil for Fogg?", c: ["They are exactly alike", "Passepartout is emotional, impulsive, and clumsy where Fogg is calm, precise, and controlled", "Passepartout is smarter", "They never interact"], a: 1, e: "Passepartout's chaos makes Fogg's precision even funnier!" },
      { q: "How does the ticking clock create suspense?", c: ["It does not", "Every setback costs time, so small problems feel urgent because of the 80-day deadline", "The characters can stop the clock", "There is no deadline"], a: 1, e: "The constant time pressure turns every delay into a crisis!" }
    ]
  }
};

function build(num) {
  const L = lessons[num];
  const isHalfway = num === 90;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${num} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/quiz-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>
    <script src="js/lesson-viewer.js"></script>
    <script src="js/quiz-game.js"></script>
    <script>
        const lesson${num}Config = {
            lessonId: '4th-grade-lesson-${num}',
            gradeLevel: '4th-grade',
            title: 'Lesson ${num} - 4th Grade',
            pages: [
                {
    render: () => \`
      <div class="lesson-page-card title-page">
        <div class="character">📚</div>
        <h1>Lesson ${num}</h1>
        <div class="subtitle">4th Grade ELA</div>
        <p style="color: #B06821; font-size: 20px; margin-top: 20px;">${L.title}</p>
        <p style="color: #666; font-size: 16px; margin-top: 10px;">${L.subtitle}</p>
      </div>
    \`
  },
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>📖 Welcome to Lesson ${num}!</h2>
        ${isHalfway ? '<p style="font-size: 24px; color: #B06821; font-weight: 700;">🎉 DAY 90! HALFWAY THROUGH THE YEAR! 🎉</p>' : ''}
        <p>Today you will:</p>
        <ul style="margin: 20px 0; line-height: 2;">
          ${L.tasks.map(t => `<li>${t}</li>`).join('\n          ')}
        </ul>
        <p><strong>Time needed:</strong> About 50-55 minutes</p>
        <div style="margin-top: 30px; padding: 20px; background: rgba(176,104,33,0.1); border-radius: 10px; border-left: 4px solid #B06821;">
          <p style="margin: 0;">💡 <strong>Tip:</strong> ${isHalfway ? 'This is a special reflection day!' : 'Take your time and think deeply!'}</p>
        </div>
      </div>
    \`
  },
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>🧐 Before You Begin</h2>
        <p>Get ready for today's reading!</p>
        <div style="margin: 30px 0; padding: 25px; background: rgba(48,88,83,0.05); border-radius: 10px;">
          <h3 style="color: #305853; margin-bottom: 20px;">Think About:</h3>
          <p style="margin: 15px 0; font-size: 18px;">🤔 What have you learned about this story so far?</p>
          <p style="margin: 15px 0; font-size: 18px;">🤔 How does this connect to previous lessons?</p>
          <p style="margin: 15px 0; font-size: 18px;">🤔 What questions do you have about the journey?</p>
        </div>
      </div>
    \`
  },
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>📚 Word of the Day</h2>
        <div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 15px; border: 2px solid #B06821;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 42px; font-weight: 800; color: #305853;">${L.vocab.word}</span>
            <br/>
            <span style="font-size: 18px; color: #666; font-style: italic;">(${L.vocab.type})</span>
          </div>
          <p style="font-size: 20px; line-height: 1.6; color: #333; text-align: center;">
            ${L.vocab.def}
          </p>
        </div>
        <div style="padding: 20px; background: rgba(176,104,33,0.05); border-radius: 10px; margin-top: 20px;">
          <p style="margin: 0;">💡 <strong>Try it:</strong> Watch for this word in today's reading!</p>
        </div>
      </div>
    \`
  },
                {
    render: () => \`
      <div class="lesson-page-card content-page">
        <h2>📖 Time to Read!</h2>
        <p style="font-size: 20px; color: #305853; font-weight: 600; margin-bottom: 20px;">${L.subtitle}</p>
        <div style="background: white; padding: 25px; border-radius: 12px; border: 3px solid #305853; margin: 20px 0;">
          <p style="font-size: 18px; margin-bottom: 15px;">📚 Read today's chapters as assigned by your teacher</p>
          <p style="font-size: 14px; color: #666; margin-top: 15px;"><em>Around the World in 80 Days</em> by Jules Verne</p>
        </div>
        <div style="margin-top: 30px; padding: 20px; background: rgba(48,88,83,0.1); border-radius: 10px;">
          <h3 style="color: #305853; margin-bottom: 15px;">📝 While You Read:</h3>
          <ul style="line-height: 2;">
            ${L.tasks.slice(0,3).map(t => `<li>${t}</li>`).join('\n            ')}
          </ul>
        </div>
      </div>
    \`
  },
                {
      render: (progress, markComplete) => {
        return \`
          <div class="lesson-page-card activity-section">
            <h2>🎯 Reading Check Quiz</h2>
            <p>Let's check your understanding!</p>
            \${progress.quiz_completed ? '<div class="completion-badge">✅ Quiz Complete!</div>' : ''}
            <div id="quiz-container-${num}" style="margin-top: 20px;"></div>
          </div>
        \`;
      },
      onLoad: () => {
        const quizConfig = {
          title: "Lesson ${num} Quiz",
          subtitle: "Test your understanding!",
          questions: ${JSON.stringify(L.quiz.map(q => ({question: q.q, choices: q.c, correct: q.a, explain: q.e})), null, 12)}
        };
        createQuizGame('quiz-container-${num}', quizConfig, () => {
          window.lessonMarkComplete('quiz');
        });
      }
    },
                {
      render: (progress, markComplete) => {
        return \`
          <div class="lesson-page-card content-page">
            <h2>✍️ Journal Time</h2>
            <p>${isHalfway ? '<strong>SPECIAL HALFWAY JOURNAL!</strong>' : 'Reflect on today' + "'s reading!"}</p>
            
            <div style="margin: 25px 0; padding: 25px; background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; border-radius: 8px;">
              <h3 style="color: #B06821; font-size: 20px; margin-bottom: 15px;">Today's Prompt:</h3>
              <div style="font-size: 16px; line-height: 1.8; white-space: pre-wrap;">${L.journalPrompt}</div>
            </div>

            <div style="margin: 20px 0;">
              <textarea 
                id="journal-entry-${num}"
                placeholder="Write your journal entry here..."
                style="width: 100%; min-height: 200px; padding: 15px; font-size: 16px; border: 2px solid #305853; border-radius: 10px; font-family: inherit; resize: vertical;"
              ></textarea>
            </div>

            <div style="padding: 15px; background: rgba(48,88,83,0.05); border-radius: 8px; margin-top: 15px;">
              <p style="margin: 0;">💡 <strong>Writing Tip:</strong> ${isHalfway ? 'Write at least 6 sentences for this special reflection!' : 'Use evidence from the text to support your ideas!'}</p>
            </div>

            \${progress.journal_completed ? 
              '<div class="completion-badge" style="margin-top: 20px;">✅ Journal Entry Saved!</div>' : 
              '<button onclick="window.lessonMarkComplete(\\'journal\\')" style="margin-top: 20px; padding: 15px 30px; background: #305853; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Save Journal Entry</button>'
            }
          </div>
        \`;
      }
    },
                {
    render: () => \`
      <div class="lesson-page-card completion-page">
        <div class="character">${isHalfway ? '🎉' : '🌟'}</div>
        <h1>Lesson ${num} Complete!</h1>
        ${isHalfway ? '<p style="font-size: 24px; color: #B06821; font-weight: 700; margin: 20px 0;">🎉 HALFWAY THROUGH THE YEAR! 🎉</p>' : ''}
        <p style="font-size: 20px; color: #666; margin: 20px 0;">Excellent work today!</p>
        
        <div style="text-align: left; max-width: 400px; margin: 30px auto; background: rgba(48,88,83,0.05); padding: 25px; border-radius: 12px;">
          <h3 style="color: #305853; margin-bottom: 15px;">✅ Today You:</h3>
          <ul style="line-height: 2; font-size: 18px;">
            ${L.tasks.map(t => `<li>${t}</li>`).join('\n            ')}
            <li>Learned the word "${L.vocab.word}"</li>
            <li>Completed the quiz</li>
            <li>Wrote a journal entry</li>
          </ul>
        </div>

        <p style="font-size: 18px; margin-top: 30px;">
          ${isHalfway ? 'Keep up the amazing work! You\\'re halfway there! 🚀' : 'Keep reading! The adventure continues! ⚓'}
        </p>

        <a href="student-dashboard-live.html" 
           style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">
          Back to Dashboard
        </a>
      </div>
    \`
  }
            ]
        };

        createLessonViewer('lesson-container', lesson${num}Config);
    </script>
</body>
</html>`;
}

// Build all 5 lessons
[86, 87, 88, 89, 90].forEach(num => {
  fs.writeFileSync(`4th-grade-lesson-${num}-v3.html`, build(num));
  console.log(`✅ Built 4th-grade-lesson-${num}-v3.html with full content`);
});

console.log('\n✨ All lessons 86-90 rebuilt with complete curriculum content!');
