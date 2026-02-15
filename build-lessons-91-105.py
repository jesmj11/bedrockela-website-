import json

# Lessons 91-95 from unit4_days91to95.docx
# Lessons 96-100 from unit4_days96to100.docx  
# Lessons 101-105 from unit4_days101to105.docx

lessons = {
  91: {
    "title": "The Tale of the Bamboo Cutter",
    "subtitle": "Japanese Folktale",
    "vocab": {"word": "impermanence", "type": "noun", "def": "The quality of not lasting forever. In Japanese culture, impermanence is seen as beautiful, not just sad."},
    "tasks": ["Read The Tale of the Bamboo Cutter", "Compare storytelling traditions across cultures", "Notice what reveals Japanese values", "Write in your journal"],
    "journalPrompt": "• Compare Kaguya to a character caught between two worlds\n• How does Japanese storytelling handle endings differently from Western?\n• What does this story reveal about Japanese values?",
    "quiz": [
      {"q": "Where does Princess Kaguya come from?", "c": ["A neighboring village", "Found as a tiny baby inside a glowing bamboo stalk, originally from the moon", "A goddess from the ocean", "An ordinary girl"], "a": 1, "e": "Kaguya comes from the moon!"},
      {"q": "How does this story's ending differ from Western fairy tales?", "c": ["Exactly the same", "Embraces sadness and impermanence rather than ending happily ever after", "There is no ending", "Everyone lives happily"], "a": 1, "e": "Japanese storytelling embraces bittersweet endings!"},
      {"q": "What pattern do Kaguya, Dorothy, Mowgli, and Buck share?", "c": ["All are animals", "All are caught between two worlds", "All are from Kansas", "All are villains"], "a": 1, "e": "All are characters between two worlds!"}
    ]
  },
  92: {
    "title": "Across the Pacific",
    "subtitle": "Chapters 17-22: Pacific and America",
    "vocab": {"word": "momentum", "type": "noun", "def": "The force gained by movement. In storytelling, momentum means the plot moves faster and faster."},
    "tasks": ["Read Chapters 17-22", "Track rising tension as deadline approaches", "Analyze how Verne portrays America", "Write in your journal"],
    "journalPrompt": "• How does ticking-clock tension increase as the deadline nears?\n• How does Verne portray America? What stereotypes appear?\n• Compare critical reading of India vs America",
    "quiz": [
      {"q": "How does tension increase as deadline approaches?", "c": ["Stays the same", "Every delay feels bigger because less time to recover", "Tension decreases", "Fogg stops caring"], "a": 1, "e": "Less time = higher stakes!"},
      {"q": "How should we read Verne's America?", "c": ["Accept as completely accurate", "Enjoy adventure but notice Verne simplifies and stereotypes", "Skip those chapters", "Verne was American so it's perfect"], "a": 1, "e": "Critical reading applies everywhere!"},
      {"q": "What creates momentum in storytelling?", "c": ["Slow pacing", "Short chapters, constant movement, ticking clock", "Long descriptions", "Fewer events"], "a": 1, "e": "Pace accelerates through structure!"}
    ]
  },
  93: {
    "title": "The Final Push",
    "subtitle": "Chapters 23-30: The Atlantic and Return",
    "vocab": {"word": "resolution", "type": "noun", "def": "The conclusion of a story where conflicts are resolved and questions are answered."},
    "tasks": ["Read Chapters 23-30 (ending!)", "Analyze the resolution and twist", "Reflect on the complete journey", "Write in your journal"],
    "journalPrompt": "• How does Fogg win the wager (and what is the twist)?\n• What did Fogg gain beyond money?\n• Is this a satisfying ending? Why or why not?",
    "quiz": [
      {"q": "How does Fogg win the wager?", "c": ["Arrives exactly on time", "Gains a day by traveling east around the world", "Doesn't win", "Fix helps him"], "a": 1, "e": "The International Date Line twist!"},
      {"q": "What does Fogg gain beyond the wager?", "c": ["Nothing", "Love (Aouda), friendship (Passepartout), purpose", "More money", "Fame"], "a": 1, "e": "The journey changed him!"},
      {"q": "What type of character development does Fogg show?", "c": ["None, stays the same", "Transforms from cold and mechanical to warm and human", "Becomes a villain", "Loses everything"], "a": 1, "e": "Character arc complete!"}
    ]
  },
  94: {
    "title": "African Voices",
    "subtitle": "African Folktale (Anansi or other)",
    "vocab": {"word": "trickster", "type": "noun", "def": "A character who uses cleverness and deception to achieve goals, often appearing in folktales."},
    "tasks": ["Read an African folktale", "Identify the trickster archetype", "Compare across global folktales", "Write in your journal"],
    "journalPrompt": "• What makes a trickster different from a hero?\n• Compare the African folktale to Indian and Japanese tales\n• What does this reveal about universal vs unique cultural values?",
    "quiz": [
      {"q": "What is a trickster character?", "c": ["Always a villain", "Uses cleverness and deception, often to teach lessons", "A type of hero", "Always honest"], "a": 1, "e": "Tricksters use wit!"},
      {"q": "What do folktales from different cultures share?", "c": ["Nothing", "Universal themes (wisdom, foolishness, justice) told in culturally specific ways", "Exactly the same stories", "Only differences"], "a": 1, "e": "Universal themes, cultural flavors!"},
      {"q": "Why read folktales FROM multiple cultures?", "c": ["Not important", "See both what's universal and what's culturally unique", "One culture's stories are enough", "They're all the same"], "a": 1, "e": "Both universal and unique!"}
    ]
  },
  95: {
    "title": "Planning Your Persuasive Essay",
    "subtitle": "Writing Workshop - Persuasive Essay Planning",
    "vocab": {"word": "claim", "type": "noun", "def": "The main argument or position you are trying to prove in persuasive writing."},
    "tasks": ["Choose your persuasive topic", "Develop a clear claim", "Gather evidence from books", "Plan counterargument"],
    "journalPrompt": "• What is your claim?\n• What evidence supports it?\n• What counterargument will you address?",
    "quiz": [
      {"q": "What is a claim in persuasive writing?", "c": ["A question", "The main argument you are trying to prove", "A piece of evidence", "The introduction"], "a": 1, "e": "Your position!"},
      {"q": "What makes evidence strong?", "c": ["Vague opinions", "Specific examples from texts with details", "General statements", "Feelings only"], "a": 1, "e": "Specificity wins!"},
      {"q": "Why address counterarguments?", "c": ["Makes your essay longer", "Shows you've thought deeply and strengthens your position", "Weakens your argument", "Not necessary"], "a": 1, "e": "Acknowledging opposition strengthens you!"}
    ]
  },
  96: {
    "title": "Revision: Sharpen Your Argument",
    "subtitle": "Writing Workshop - Revising Persuasive Essay",
    "vocab": {"word": "credible", "type": "adjective", "def": "Believable and trustworthy. A credible argument uses strong evidence and fair reasoning."},
    "tasks": ["Re-read your persuasive essay", "Strengthen evidence and reasoning", "Improve counterargument response", "Use revision checklist"],
    "journalPrompt": "• What is your weakest evidence? How can you strengthen it?\n• Did you present the counterargument fairly?\n• What makes an argument credible?",
    "quiz": [
      {"q": "What makes an argument credible?", "c": ["Loud voice", "Strong evidence, fair reasoning, acknowledges complexity", "Ignoring opposing views", "Long paragraphs"], "a": 1, "e": "Evidence + fairness = credibility!"},
      {"q": "What is a straw man argument?", "c": ["A good technique", "Presenting a weak version of the opposing view to easily defeat it", "Using evidence", "Being fair"], "a": 1, "e": "Straw man weakens YOUR argument!"},
      {"q": "What should revision focus on in persuasive writing?", "c": ["Spelling only", "Strengthening evidence and tightening logic", "Making it longer", "Adding more opinions"], "a": 1, "e": "Evidence and logic!"}
    ]
  },
  97: {
    "title": "Publishing Your Persuasive Essay",
    "subtitle": "Writing Workshop - Final Draft and Sharing",
    "vocab": {"word": "conviction", "type": "noun", "def": "A firm belief. The quality of speaking or writing with certainty and passion."},
    "tasks": ["Edit for conventions", "Write final draft", "Share your argument", "Reflect on persuasive writing"],
    "journalPrompt": "• Was your listener convinced? What was your strongest point?\n• Compare your four major writing projects this year\n• Which type of writing was most satisfying?",
    "quiz": [
      {"q": "What makes persuasive writing different when sharing aloud?", "c": ["No difference", "You're making a case, not telling a story - conviction matters", "Should whisper", "Don't make eye contact"], "a": 1, "e": "Conviction in voice!"},
      {"q": "What four types of writing have you done this year?", "c": ["Only narratives", "Narrative, descriptive, analytical, persuasive", "Only essays", "Only fiction"], "a": 1, "e": "Complete writing toolkit!"},
      {"q": "Why is audience feedback important for persuasive writing?", "c": ["It's not", "Tests whether your argument actually convinces people", "Makes you feel good", "Required by teacher"], "a": 1, "e": "Real-world test!"}
    ]
  },
  98: {
    "title": "Week 20 Review",
    "subtitle": "Unit 4 Skill Review",
    "vocab": {"word": "synthesis", "type": "noun", "def": "Combining information from multiple sources to create new understanding."},
    "tasks": ["Review Unit 4 concepts", "Practice POV identification", "Synthesize learning across cultures", "Prepare for assessment"],
    "journalPrompt": "• What is the most important skill you learned in Unit 4?\n• How has your understanding of other cultures grown?\n• What surprised you most?",
    "quiz": [
      {"q": "What is synthesis in reading?", "c": ["Reading one book", "Combining information from multiple sources to create new understanding", "Summarizing", "Copying"], "a": 1, "e": "Creating new understanding!"},
      {"q": "What did you learn about cultural representation?", "c": ["All portrayals are equal", "Inside voices reveal values; outside voices show surface or stereotypes", "Don't read critically", "Ignore culture"], "a": 1, "e": "Inside vs outside perspectives!"},
      {"q": "What is omniscient POV?", "c": ["First person", "Narrator knows everything about all characters", "No narrator", "Limited to one character"], "a": 1, "e": "All-knowing narrator!"}
    ]
  },
  99: {
    "title": "Looking Ahead to Unit 5",
    "subtitle": "Preview and Goal Setting",
    "vocab": {"word": "anticipate", "type": "verb", "def": "To expect or look forward to something that will happen."},
    "tasks": ["Learn about Unit 5 themes", "Set reading and writing goals", "Reflect on progress", "Prepare for new challenges"],
    "journalPrompt": "• What are you most excited about in Unit 5?\n• What skills do you want to improve?\n• How have you grown as a reader and writer?",
    "quiz": [
      {"q": "What does it mean to anticipate?", "c": ["Look backward", "Expect or look forward to something coming", "Forget", "Ignore"], "a": 1, "e": "Looking forward!"},
      {"q": "Why set goals before a new unit?", "c": ["Not important", "Gives you direction and helps you track growth", "Makes more work", "Required only"], "a": 1, "e": "Direction and tracking!"},
      {"q": "How many major units have you completed?", "c": ["One", "Four (Hero's Journey, Adventure, Nature, Global Literature)", "Two", "None"], "a": 1, "e": "Four complete units!"}
    ]
  },
  100: {
    "title": "Day 100 Celebration!",
    "subtitle": "Milestone Reflection",
    "vocab": {"word": "milestone", "type": "noun", "def": "An important event or achievement marking significant progress."},
    "tasks": ["Celebrate 100 days!", "Reflect on your journey", "Share your growth", "Look ahead to Days 101-180"],
    "journalPrompt": "DAY 100 SPECIAL REFLECTION:\n• What are you most proud of from the first 100 days?\n• Compare yourself on Day 1 vs Day 100\n• What are your goals for Days 101-180?",
    "quiz": [
      {"q": "What is a milestone?", "c": ["A rock", "An important event marking significant progress", "A building", "A mistake"], "a": 1, "e": "Progress marker!"},
      {"q": "What have you accomplished in 100 days?", "c": ["Nothing", "Read 4+ novels, wrote 4 major pieces, learned 100+ words, analyzed POV/theme/culture", "One book only", "Just showed up"], "a": 1, "e": "Incredible growth!"},
      {"q": "How many days remain in the school year?", "c": ["None", "80 days (Days 101-180)", "10 days", "365 days"], "a": 1, "e": "80 more to go!"}
    ]
  },
  101: {
    "title": "Unit 4 Assessment: Global Perspectives Essay",
    "subtitle": "Unit 4 Assessment",
    "vocab": {"word": "empathy", "type": "noun", "def": "The ability to understand and share feelings of someone from a different background or culture."},
    "tasks": ["Answer comprehension questions", "Write text-evidence essay", "Use novel AND folktale evidence", "Demonstrate cultural perspective understanding"],
    "journalPrompt": "Write your Unit 4 assessment essay about how multiple perspectives deepen understanding (see essay prompt)",
    "quiz": [
      {"q": "What is third-person omniscient POV?", "c": ["Uses I", "Narrator knows everything - all characters' thoughts and events", "Knows one character only", "No narrator"], "a": 1, "e": "All-knowing!"},
      {"q": "What is a literary foil?", "c": ["Type of conflict", "Character who contrasts with protagonist, highlighting qualities", "Plot twist", "Figurative language"], "a": 1, "e": "Contrasting character!"},
      {"q": "Difference between reading FROM vs ABOUT a culture?", "c": ["No difference", "FROM reveals values and wisdom; ABOUT shows surface or stereotypes", "ABOUT is better", "FROM is always fiction"], "a": 1, "e": "Inside vs outside voices!"}
    ]
  },
  102: {
    "title": "Best Of Unit 4: Portfolio",
    "subtitle": "Portfolio Day",
    "vocab": {"word": "curate", "type": "verb", "def": "To carefully select and organize items for a collection or presentation."},
    "tasks": ["Select best journal entry", "Select strongest persuasive paragraph", "Reflect on critical reading growth", "Set Unit 5 goals"],
    "journalPrompt": "• Why did you choose this journal entry as your best?\n• What makes your persuasive paragraph convincing?\n• Best moment of critical reading in Unit 4?",
    "quiz": [
      {"q": "What does curate mean?", "c": ["Throw away", "Carefully select and organize for presentation", "Copy everything", "Ignore quality"], "a": 1, "e": "Selective organization!"},
      {"q": "What four types of writing have you done?", "c": ["Only stories", "Narrative, descriptive/analytical, persuasive, and synthesis", "Only essays", "Nothing"], "a": 1, "e": "Complete toolkit!"},
      {"q": "Why build a portfolio?", "c": ["Busy work", "Track growth, showcase best work, reflect on learning", "Teacher requirement only", "No purpose"], "a": 1, "e": "Growth tracking!"}
    ]
  },
  103: {
    "title": "Sharing Our Global Learning",
    "subtitle": "Presentation Day",
    "vocab": {"word": "present", "type": "verb", "def": "To show or introduce something to an audience in a formal way."},
    "tasks": ["Share your Unit 4 portfolio", "Present favorite folktale", "Discuss cultural insights", "Celebrate global reading"],
    "journalPrompt": "• What was the most valuable insight you shared?\n• What did you learn from others' presentations?\n• How has becoming a global reader changed you?",
    "quiz": [
      {"q": "What makes a good presentation?", "c": ["Mumbling", "Clear voice, eye contact, confidence in your ideas", "Reading word-for-word", "Looking down"], "a": 1, "e": "Clarity and confidence!"},
      {"q": "How many cultures' folktales did you read in Unit 4?", "c": ["One", "Three or more (India, Japan, Africa, possibly others)", "None", "Two"], "a": 1, "e": "Truly global reading!"},
      {"q": "What is the value of hearing others' perspectives?", "c": ["None", "Broadens your understanding and reveals ideas you missed", "Waste of time", "Only your view matters"], "a": 1, "e": "Multiple perspectives = deeper understanding!"}
    ]
  },
  104: {
    "title": "Readers' Theater: Around the World",
    "subtitle": "Performance Day",
    "vocab": {"word": "perform", "type": "verb", "def": "To present a work of art or literature to an audience through acting or reading aloud."},
    "tasks": ["Perform a scene from Around the World in 80 Days", "Use voice and expression", "Work with a group", "Celebrate the story"],
    "journalPrompt": "• What scene did you perform and why?\n• How did performing bring the story to life?\n• What did you notice about character voices?",
    "quiz": [
      {"q": "What is readers' theater?", "c": ["Watching a movie", "Reading aloud with expression and character voices", "Silent reading", "Writing only"], "a": 1, "e": "Performance through reading!"},
      {"q": "Why perform literature?", "c": ["No reason", "Brings characters to life, deepens understanding through voice", "Easier than reading", "Required only"], "a": 1, "e": "Brings text to life!"},
      {"q": "What character from Around the World would be most fun to perform?", "c": ["None", "Answers vary - Fogg's calm precision, Passepartout's chaos, Fix's suspicion", "Only the narrator", "No one"], "a": 1, "e": "Each character has unique voice!"}
    ]
  },
  105: {
    "title": "Unit 4 Complete: Global Citizens",
    "subtitle": "Celebration and Reflection",
    "vocab": {"word": "citizen", "type": "noun", "def": "A member of a community. A global citizen sees themselves as part of the worldwide human community."},
    "tasks": ["Celebrate Unit 4 completion", "Reflect on becoming a global reader", "Prepare for Unit 5", "Set new goals"],
    "journalPrompt": "UNIT 4 FINAL REFLECTION:\n• How has reading globally changed how you see the world?\n• What culture's stories do you want to read next?\n• What kind of global citizen do you want to be?",
    "quiz": [
      {"q": "What is a global citizen?", "c": ["Someone who travels", "Someone who sees themselves as part of the worldwide human community", "Someone who speaks many languages", "Someone rich"], "a": 1, "e": "Part of human community!"},
      {"q": "How does literature build global citizenship?", "c": ["It doesn't", "Builds empathy, understanding, and respect for diverse perspectives", "Only through facts", "Through memorization"], "a": 1, "e": "Empathy through stories!"},
      {"q": "What is the most important lesson from Unit 4?", "c": ["Memorize facts", "Reading from multiple perspectives deepens understanding and builds empathy", "Speed reading", "One culture is best"], "a": 1, "e": "Multiple perspectives = depth!"}
    ]
  }
}

for num, L in lessons.items():
    quiz_json = json.dumps([{
        "question": q["q"],
        "choices": q["c"],
        "correct": q["a"],
        "explain": q["e"]
    } for q in L["quiz"]], indent=12)
    
    tasks_html = '\n          '.join([f'<li>{t}</li>' for t in L["tasks"]])
    
    is_special = num in [100, 101, 105]
    special_emoji = '🎉' if num == 100 else '📝' if num == 101 else '🌟'
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson {num} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
    <link rel="stylesheet" href="css/quiz-game.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>
    <script src="js/lesson-viewer.js"></script>
    <script src="js/quiz-game.js"></script>
    <script>
        const lesson{num}Config = {{
            lessonId: '4th-grade-lesson-{num}',
            gradeLevel: '4th-grade',
            title: 'Lesson {num} - 4th Grade',
            pages: [
                {{
    render: () => `
      <div class="lesson-page-card title-page">
        <div class="character">{special_emoji}</div>
        <h1>Lesson {num}</h1>
        <div class="subtitle">4th Grade ELA</div>
        <p style="color: #B06821; font-size: 20px; margin-top: 20px;">{L["title"]}</p>
        <p style="color: #666; font-size: 16px; margin-top: 10px;">{L["subtitle"]}</p>
      </div>
    `
  }},
                {{
    render: () => `
      <div class="lesson-page-card content-page">
        <h2>📖 Welcome to Lesson {num}!</h2>
        {"<p style='font-size: 24px; color: #B06821; font-weight: 700;'>🎉 DAY 100! MAJOR MILESTONE! 🎉</p>" if num == 100 else ""}
        <p>Today you will:</p>
        <ul style="margin: 20px 0; line-height: 2;">
          {tasks_html}
        </ul>
        <p><strong>Time needed:</strong> About 45-55 minutes</p>
      </div>
    `
  }},
                {{
    render: () => `
      <div class="lesson-page-card content-page">
        <h2>🧐 Before You Begin</h2>
        <p>{"This is a celebration day! Reflect on how far you've come." if num == 100 else "Get ready for today's lesson!"}</p>
      </div>
    `
  }},
                {{
    render: () => `
      <div class="lesson-page-card content-page">
        <h2>📚 Word of the Day</h2>
        <div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 15px; border: 2px solid #B06821;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 42px; font-weight: 800; color: #305853;">{L["vocab"]["word"]}</span>
            <br/>
            <span style="font-size: 18px; color: #666; font-style: italic;">({L["vocab"]["type"]})</span>
          </div>
          <p style="font-size: 20px; line-height: 1.6; color: #333; text-align: center;">
            {L["vocab"]["def"]}
          </p>
        </div>
      </div>
    `
  }},
                {{
    render: () => `
      <div class="lesson-page-card content-page">
        <h2>📖 Today's Activity</h2>
        <p style="font-size: 20px; color: #305853; font-weight: 600; margin-bottom: 20px;">{L["subtitle"]}</p>
        <div style="background: white; padding: 25px; border-radius: 12px; border: 3px solid #305853; margin: 20px 0;">
          <p style="font-size: 18px;">Complete today's lesson as assigned by your teacher</p>
        </div>
      </div>
    `
  }},
                {{
      render: (progress, markComplete) => {{
        return `
          <div class="lesson-page-card activity-section">
            <h2>🎯 Reading Check Quiz</h2>
            <p>Let's check your understanding!</p>
            ${{progress.quiz_completed ? '<div class="completion-badge">✅ Quiz Complete!</div>' : ''}}
            <div id="quiz-container-{num}" style="margin-top: 20px;"></div>
          </div>
        `;
      }},
      onLoad: () => {{
        const quizConfig = {{
          title: "Lesson {num} Quiz",
          subtitle: "Test your understanding!",
          questions: {quiz_json}
        }};
        createQuizGame('quiz-container-{num}', quizConfig, () => {{
          window.lessonMarkComplete('quiz');
        }});
      }}
    }},
                {{
      render: (progress, markComplete) => {{
        return `
          <div class="lesson-page-card content-page">
            <h2>✍️ Journal Time</h2>
            <p>{"<strong>SPECIAL DAY 100 REFLECTION!</strong>" if num == 100 else "Reflect on today's lesson!"}</p>
            
            <div style="margin: 25px 0; padding: 25px; background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; border-radius: 8px;">
              <h3 style="color: #B06821; font-size: 20px; margin-bottom: 15px;">Today's Prompt:</h3>
              <p style="font-size: 16px; line-height: 1.8; white-space: pre-wrap;">{L["journalPrompt"]}</p>
            </div>

            <div style="margin: 20px 0;">
              <textarea 
                id="journal-entry-{num}"
                placeholder="Write your journal entry here..."
                style="width: 100%; min-height: 200px; padding: 15px; font-size: 16px; border: 2px solid #305853; border-radius: 10px; resize: vertical;"
              ></textarea>
            </div>

            ${{progress.journal_completed ? 
              '<div class="completion-badge" style="margin-top: 20px;">✅ Journal Entry Saved!</div>' : 
              '<button onclick="window.lessonMarkComplete(\\\\'journal\\\\')" style="margin-top: 20px; padding: 15px 30px; background: #305853; color: white; border: none; border-radius: 10px; font-size: 18px; cursor: pointer;">Save Journal Entry</button>'
            }}
          </div>
        `;
      }}
    }},
                {{
    render: () => `
      <div class="lesson-page-card completion-page">
        <div class="character">{special_emoji}</div>
        <h1>Lesson {num} Complete!</h1>
        {"<p style='font-size: 24px; color: #B06821; font-weight: 700; margin: 20px 0;'>🎉 100 DAYS DONE! 🎉</p>" if num == 100 else ""}
        {"<p style='font-size: 24px; color: #B06821; font-weight: 700; margin: 20px 0;'>🌟 UNIT 4 COMPLETE! 🌟</p>" if num == 105 else ""}
        <p style="font-size: 20px; color: #666; margin: 20px 0;">Excellent work today!</p>
        
        <div style="text-align: left; max-width: 400px; margin: 30px auto; background: rgba(48,88,83,0.05); padding: 25px; border-radius: 12px;">
          <h3 style="color: #305853; margin-bottom: 15px;">✅ Today You:</h3>
          <ul style="line-height: 2; font-size: 18px;">
            {tasks_html}
            <li>Learned the word "{L["vocab"]["word"]}"</li>
          </ul>
        </div>

        <a href="student-dashboard-live.html" 
           style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">
          Back to Dashboard
        </a>
      </div>
    `
  }}
            ]
        }};

        createLessonViewer('lesson-container', lesson{num}Config);
    </script>
</body>
</html>'''
    
    with open(f'4th-grade-lesson-{num}-v3.html', 'w') as f:
        f.write(html)
    
    print(f'✅ Built 4th-grade-lesson-{num}-v3.html')

print('\n✨ All lessons 91-105 built successfully!')
print('📚 Lessons 91-95: Japanese folktale, Pacific crossing, final chapters, African folktale, persuasive planning')
print('📝 Lessons 96-100: Revision, publishing, review, preview, DAY 100 celebration!')
print('🎓 Lessons 101-105: Assessment, portfolio, presentations, readers theater, unit celebration')
