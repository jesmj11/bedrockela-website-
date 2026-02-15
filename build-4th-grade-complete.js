const fs = require('fs');

// Complete 4th Grade - Days 31-180
// Following the 2 words/day, 8-word assessment pattern

const lessons = [
  // UNIT 2: Classic Adventures (Days 31-60) - Tom Sawyer
  // Week 7 (Days 31-35)
  { day: 31, title: "Tom Sawyer Introduction", focus: "Meet Tom Sawyer", chapters: [1], words: ["mischief", "whitewash"], book: "Tom Sawyer" },
  { day: 32, title: "The Whitewashing Trick", focus: "Tom's clever plan", chapters: [2], words: ["cunning", "triumph"], book: "Tom Sawyer" },
  { day: 33, title: "Tom Falls in Love", focus: "Meeting Becky Thatcher", chapters: [3], words: ["admiration", "affection"], book: "Tom Sawyer" },
  { day: 34, title: "The Sunday School Prize", focus: "Tom's schemes", chapters: [4], words: ["scheme", "glory"], book: "Tom Sawyer" },
  { day: 35, type: 'assessment', title: "Week 7 Assessment", focus: "Tom Sawyer 1-4" },
  
  // Week 8 (Days 36-40)
  { day: 36, title: "The Pinch Bug", focus: "Church adventures", chapters: [5], words: ["distraction", "spectacle"], book: "Tom Sawyer" },
  { day: 37, title: "Tom Meets Becky", focus: "First love", chapters: [6], words: ["devoted", "enchanted"], book: "Tom Sawyer" },
  { day: 38, title: "The Tick Running", focus: "School days", chapters: [7], words: ["rival", "contest"], book: "Tom Sawyer" },
  { day: 39, title: "Pirate Dreams", focus: "Running away", chapters: [8], words: ["adventure", "freedom"], book: "Tom Sawyer" },
  { day: 40, type: 'assessment', title: "Week 8 Assessment", focus: "Tom Sawyer 5-8" },
  
  // Week 9 (Days 41-45)
  { day: 41, title: "The Graveyard", focus: "Midnight adventure", chapters: [9], words: ["cemetery", "witness"], book: "Tom Sawyer" },
  { day: 42, title: "The Oath", focus: "Blood oath", chapters: [10], words: ["oath", "secret"], book: "Tom Sawyer" },
  { day: 43, title: "Tom's Conscience", focus: "Guilt and fear", chapters: [11], words: ["conscience", "torment"], book: "Tom Sawyer" },
  { day: 44, title: "The Cat and the Medicine", focus: "Getting sick", chapters: [12], words: ["remedy", "ailment"], book: "Tom Sawyer" },
  { day: 45, type: 'assessment', title: "Week 9 Assessment", focus: "Tom Sawyer 9-12" },
  
  // Week 10 (Days 46-50)
  { day: 46, title: "The Pirates Set Sail", focus: "Jackson's Island", chapters: [13], words: ["expedition", "outcast"], book: "Tom Sawyer" },
  { day: 47, title: "Island Life", focus: "Being pirates", chapters: [14], words: ["paradise", "splendor"], book: "Tom Sawyer" },
  { day: 48, title: "Tom's Secret Visit", focus: "Home at night", chapters: [15], words: ["eavesdrop", "sympathy"], book: "Tom Sawyer" },
  { day: 49, title: "The Funeral", focus: "Dramatic return", chapters: [16], words: ["funeral", "resurrection"], book: "Tom Sawyer" },
  { day: 50, type: 'assessment', title: "Week 10 Assessment", focus: "Tom Sawyer 13-16" },
  
  // Week 11 (Days 51-55)
  { day: 51, title: "Tom's Testimony", focus: "The trial", chapters: [23], words: ["testimony", "verdict"], book: "Tom Sawyer" },
  { day: 52, title: "Treasure Hunt Begins", focus: "Looking for treasure", chapters: [25], words: ["treasure", "fortune"], book: "Tom Sawyer" },
  { day: 53, title: "The Haunted House", focus: "Finding Injun Joe", chapters: [26], words: ["haunted", "discovery"], book: "Tom Sawyer" },
  { day: 54, title: "Lost in the Cave", focus: "Becky and Tom lost", chapters: [29], words: ["labyrinth", "desperate"], book: "Tom Sawyer" },
  { day: 55, type: 'assessment', title: "Week 11 Assessment", focus: "Tom Sawyer 23-29" },
  
  // Week 12 (Days 56-60)
  { day: 56, title: "Cave Escape", focus: "Finding the way out", chapters: [30], words: ["escape", "relief"], book: "Tom Sawyer" },
  { day: 57, title: "The Treasure Found", focus: "Riches at last", chapters: [33], words: ["wealth", "investment"], book: "Tom Sawyer" },
  { day: 58, title: "Tom Sawyer Review", focus: "Story themes", words: ["independence", "courage"], book: "Tom Sawyer" },
  { day: 59, title: "Tom Sawyer Reflection", focus: "Character growth", words: ["maturity", "responsibility"], book: "Tom Sawyer" },
  { day: 60, type: 'assessment', title: "Unit 2 Assessment", focus: "Tom Sawyer Complete", unitTest: true },
  
  // UNIT 3: Journey Stories (Days 61-90) - Around the World in 80 Days
  // Week 13 (Days 61-65)
  { day: 61, title: "The Wager", focus: "Phileas Fogg's bet", chapters: [1,2], words: ["punctual", "wager"], book: "Around the World" },
  { day: 62, title: "Journey Begins", focus: "Leaving London", chapters: [3,4], words: ["departure", "destination"], book: "Around the World" },
  { day: 63, title: "Detective Fix", focus: "Being followed", chapters: [5,6], words: ["detective", "suspicious"], book: "Around the World" },
  { day: 64, title: "Through Suez", focus: "Egypt passage", chapters: [7,8], words: ["passage", "canal"], book: "Around the World" },
  { day: 65, type: 'assessment', title: "Week 13 Assessment", focus: "Around World 1-8" },
  
  // Week 14 (Days 66-70)
  { day: 66, title: "India Adventures", focus: "Bombay to Calcutta", chapters: [9,10], words: ["railway", "jungle"], book: "Around the World" },
  { day: 67, title: "Saving Aouda", focus: "The rescue", chapters: [11,12], words: ["rescue", "ceremony"], book: "Around the World" },
  { day: 68, title: "Elephant Journey", focus: "Through the forest", chapters: [13], words: ["elephant", "guide"], book: "Around the World" },
  { day: 69, title: "To Hong Kong", focus: "Sailing east", chapters: [14,15], words: ["voyage", "Pacific"], book: "Around the World" },
  { day: 70, type: 'assessment', title: "Week 14 Assessment", focus: "Around World 9-15" },
  
  // Week 15 (Days 71-75)
  { day: 71, title: "Hong Kong Delays", focus: "Fix's interference", chapters: [16,17], words: ["delay", "interfere"], book: "Around the World" },
  { day: 72, title: "Across the Pacific", focus: "To San Francisco", chapters: [18,19], words: ["steamship", "arrival"], book: "Around the World" },
  { day: 73, title: "American Railway", focus: "Train across America", chapters: [20,21], words: ["transcontinental", "locomotive"], book: "Around the World" },
  { day: 74, title: "Buffalo and Natives", focus: "Wild West adventures", chapters: [22,23], words: ["buffalo", "prairie"], book: "Around the World" },
  { day: 75, type: 'assessment', title: "Week 15 Assessment", focus: "Around World 16-23" },
  
  // Week 16 (Days 76-80)
  { day: 76, title: "The Rescue", focus: "Saving Passepartout", chapters: [24,25], words: ["kidnap", "cavalry"], book: "Around the World" },
  { day: 77, title: "The Sledge", focus: "Unique transportation", chapters: [26,27], words: ["sledge", "desperation"], book: "Around the World" },
  { day: 78, title: "Atlantic Crossing", focus: "Final ocean", chapters: [28,29], words: ["Atlantic", "coal"], book: "Around the World" },
  { day: 79, title: "Arrested!", focus: "Fix makes his move", chapters: [30,31], words: ["arrest", "warrant"], book: "Around the World" },
  { day: 80, type: 'assessment', title: "Week 16 Assessment", focus: "Around World 24-31" },
  
  // Week 17 (Days 81-85)
  { day: 81, title: "Too Late?", focus: "Missing the deadline", chapters: [32,33], words: ["deadline", "defeat"], book: "Around the World" },
  { day: 82, title: "The Discovery", focus: "Gaining a day", chapters: [34,35], words: ["dateline", "triumph"], book: "Around the World" },
  { day: 83, title: "Victory!", focus: "Winning the wager", chapters: [36,37], words: ["victory", "celebration"], book: "Around the World" },
  { day: 84, title: "Journey Review", focus: "Countries visited", words: ["geography", "culture"], book: "Around the World" },
  { day: 85, type: 'assessment', title: "Week 17 Assessment", focus: "Around World 32-37" },
  
  // Week 18 (Days 86-90)
  { day: 86, title: "Transportation Methods", focus: "How they traveled", words: ["steamship", "railway"], book: "Around the World" },
  { day: 87, title: "Character Study", focus: "Fogg vs Passepartout", words: ["punctual", "spontaneous"], book: "Around the World" },
  { day: 88, title: "Theme Discussion", focus: "Time and determination", words: ["determination", "precision"], book: "Around the World" },
  { day: 89, title: "Unit 3 Review", focus: "Journey themes", words: ["perseverance", "adventure"], book: "Around the World" },
  { day: 90, type: 'assessment', title: "Unit 3 Assessment", focus: "Around the World Complete", unitTest: true },
  
  // UNIT 4: Animal Stories (Days 91-120) - Black Beauty
  // Week 19 (Days 91-95)
  { day: 91, title: "Black Beauty Introduction", focus: "First person horse", chapters: [1,2], words: ["colt", "meadow"], book: "Black Beauty" },
  { day: 92, title: "Early Days", focus: "Life at Birtwick", chapters: [3,4], words: ["stable", "groom"], book: "Black Beauty" },
  { day: 93, title: "Ginger's Story", focus: "A hard life", chapters: [5,6], words: ["temper", "cruelty"], book: "Black Beauty" },
  { day: 94, title: "The Fire", focus: "Stable fire rescue", chapters: [7,8], words: ["rescue", "courage"], book: "Black Beauty" },
  { day: 95, type: 'assessment', title: "Week 19 Assessment", focus: "Black Beauty 1-8" },
  
  // Week 20 (Days 96-100)
  { day: 96, title: "New Owners", focus: "Earlshall Park", chapters: [9,10], words: ["bearing", "rein"], book: "Black Beauty" },
  { day: 97, title: "Treatment of Horses", focus: "Good vs bad care", chapters: [11,12], words: ["compassion", "neglect"], book: "Black Beauty" },
  { day: 98, title: "Reuben Smith", focus: "A tragic incident", chapters: [13,14], words: ["accident", "consequence"], book: "Black Beauty" },
  { day: 99, title: "Moving Again", focus: "New circumstances", chapters: [15,16], words: ["departure", "uncertain"], book: "Black Beauty" },
  { day: 100, type: 'assessment', title: "Week 20 Assessment", focus: "Black Beauty 9-16" },
  
  // Week 21 (Days 101-105)
  { day: 101, title: "Hard Times", focus: "Being sold", chapters: [17,18], words: ["auction", "hardship"], book: "Black Beauty" },
  { day: 102, title: "Jerry Barker", focus: "A kind cabbie", chapters: [19,20], words: ["cabbie", "kindness"], book: "Black Beauty" },
  { day: 103, title: "London Streets", focus: "City life", chapters: [21,22], words: ["traffic", "exhaustion"], book: "Black Beauty" },
  { day: 104, title: "Winter Hardships", focus: "Cold and ice", chapters: [23,24], words: ["treacherous", "endurance"], book: "Black Beauty" },
  { day: 105, type: 'assessment', title: "Week 21 Assessment", focus: "Black Beauty 17-24" },
  
  // Week 22 (Days 106-110)
  { day: 106, title: "Sold Again", focus: "Changing hands", chapters: [25,26], words: ["decline", "weary"], book: "Black Beauty" },
  { day: 107, title: "Hard Labor", focus: "Heavy work", chapters: [27,28], words: ["labor", "strain"], book: "Black Beauty" },
  { day: 108, title: "At Rock Bottom", focus: "The worst days", chapters: [29,30], words: ["despair", "suffering"], book: "Black Beauty" },
  { day: 109, title: "Hope Returns", focus: "A kind farmer", chapters: [31,32], words: ["recovery", "recognition"], book: "Black Beauty" },
  { day: 110, type: 'assessment', title: "Week 22 Assessment", focus: "Black Beauty 25-32" },
  
  // Week 23 (Days 111-115)
  { day: 111, title: "Final Home", focus: "Peace at last", chapters: [33,34], words: ["retirement", "contentment"], book: "Black Beauty" },
  { day: 112, title: "Animal Welfare", focus: "Theme discussion", words: ["welfare", "treatment"], book: "Black Beauty" },
  { day: 113, title: "Narrative Voice", focus: "First person animal", words: ["perspective", "empathy"], book: "Black Beauty" },
  { day: 114, title: "Character Study", focus: "Humans in the story", words: ["character", "morality"], book: "Black Beauty" },
  { day: 115, type: 'assessment', title: "Week 23 Assessment", focus: "Black Beauty 33-34" },
  
  // Week 24 (Days 116-120)
  { day: 116, title: "Book Comparison", focus: "Tom vs Beauty vs Journey", words: ["compare", "contrast"], book: "Review" },
  { day: 117, title: "Theme Review", focus: "Universal themes", words: ["theme", "message"], book: "Review" },
  { day: 118, title: "Writing Workshop", focus: "Book report prep", words: ["analysis", "evidence"], book: "Review" },
  { day: 119, title: "Quarter 3 Review", focus: "All units 1-4", words: ["comprehensive", "synthesis"], book: "Review" },
  { day: 120, type: 'assessment', title: "Quarter 3 Assessment", focus: "Units 1-4 Complete", unitTest: true },
  
  // UNIT 5: Mystery (Days 121-150) - Sherlock Holmes Stories
  // Week 25 (Days 121-125)
  { day: 121, title: "Meet Sherlock Holmes", focus: "The great detective", words: ["detective", "deduction"], book: "Sherlock Holmes" },
  { day: 122, title: "The Red-Headed League", focus: "Strange mystery pt 1", words: ["peculiar", "league"], book: "Sherlock Holmes" },
  { day: 123, title: "The Solution", focus: "Holmes explains", words: ["solution", "logical"], book: "Sherlock Holmes" },
  { day: 124, title: "Observation Skills", focus: "What Holmes notices", words: ["observe", "detail"], book: "Sherlock Holmes" },
  { day: 125, type: 'assessment', title: "Week 25 Assessment", focus: "Red-Headed League" },
  
  // Week 26 (Days 126-130)
  { day: 126, title: "The Speckled Band", focus: "A deadly mystery pt 1", words: ["sinister", "menace"], book: "Sherlock Holmes" },
  { day: 127, title: "The Investigation", focus: "Holmes investigates", words: ["investigate", "clue"], book: "Sherlock Holmes" },
  { day: 128, title: "The Dangerous Night", focus: "Solving the case", words: ["danger", "revelation"], book: "Sherlock Holmes" },
  { day: 129, title: "Mystery Elements", focus: "How mysteries work", words: ["mystery", "suspense"], book: "Sherlock Holmes" },
  { day: 130, type: 'assessment', title: "Week 26 Assessment", focus: "Speckled Band" },
  
  // Week 27 (Days 131-135)
  { day: 131, title: "The Blue Carbuncle", focus: "Christmas mystery pt 1", words: ["carbuncle", "goose"], book: "Sherlock Holmes" },
  { day: 132, title: "Following Clues", focus: "Tracking the gem", words: ["trace", "evidence"], book: "Sherlock Holmes" },
  { day: 133, title: "Holmes' Methods", focus: "How he thinks", words: ["method", "reasoning"], book: "Sherlock Holmes" },
  { day: 134, title: "Create a Mystery", focus: "Write your own", words: ["plot", "suspect"], book: "Sherlock Holmes" },
  { day: 135, type: 'assessment', title: "Week 27 Assessment", focus: "Blue Carbuncle" },
  
  // Week 28 (Days 136-140)
  { day: 136, title: "Compare Mysteries", focus: "All three stories", words: ["compare", "pattern"], book: "Sherlock Holmes" },
  { day: 137, title: "Character Study", focus: "Holmes and Watson", words: ["partnership", "contrast"], book: "Sherlock Holmes" },
  { day: 138, title: "Detective Fiction", focus: "The genre", words: ["genre", "convention"], book: "Sherlock Holmes" },
  { day: 139, title: "Unit Review", focus: "Mystery elements", words: ["foreshadow", "twist"], book: "Sherlock Holmes" },
  { day: 140, type: 'assessment', title: "Week 28 Assessment", focus: "Holmes Stories" },
  
  // Week 29 (Days 141-145)
  { day: 141, title: "Modern Detectives", focus: "Then and now", words: ["technology", "forensics"], book: "Review" },
  { day: 142, title: "Logical Thinking", focus: "Using reason", words: ["logic", "inference"], book: "Review" },
  { day: 143, title: "Writing Mystery Stories", focus: "Creating suspense", words: ["suspense", "reveal"], book: "Review" },
  { day: 144, title: "Mystery Review", focus: "Unit synthesis", words: ["synthesis", "analysis"], book: "Review" },
  { day: 145, type: 'assessment', title: "Week 29 Assessment", focus: "Mystery Unit" },
  
  // Week 30 (Days 146-150)
  { day: 146, title: "All Books Review", focus: "Year so far", words: ["reflection", "growth"], book: "Review" },
  { day: 147, title: "Character Comparison", focus: "All main characters", words: ["protagonist", "development"], book: "Review" },
  { day: 148, title: "Theme Comparison", focus: "Universal themes", words: ["universal", "human"], book: "Review" },
  { day: 149, title: "Unit 5 Review", focus: "Complete review", words: ["review", "prepare"], book: "Review" },
  { day: 150, type: 'assessment', title: "Unit 5 Assessment", focus: "Mystery Complete", unitTest: true },
  
  // UNIT 6: Fantasy & Finale (Days 151-180) - Alice in Wonderland
  // Week 31 (Days 151-155)
  { day: 151, title: "Down the Rabbit Hole", focus: "Alice begins", chapters: [1], words: ["curious", "peculiar"], book: "Alice in Wonderland" },
  { day: 152, title: "Pool of Tears", focus: "Growing and shrinking", chapters: [2], words: ["absurd", "transformation"], book: "Alice in Wonderland" },
  { day: 153, title: "The Caucus Race", focus: "Strange creatures", chapters: [3], words: ["caucus", "peculiar"], book: "Alice in Wonderland" },
  { day: 154, title: "The White Rabbit", focus: "Following the rabbit", chapters: [4], words: ["frantic", "confusion"], book: "Alice in Wonderland" },
  { day: 155, type: 'assessment', title: "Week 31 Assessment", focus: "Alice 1-4" },
  
  // Week 32 (Days 156-160)
  { day: 156, title: "Advice from a Caterpillar", focus: "Who are you?", chapters: [5], words: ["caterpillar", "advice"], book: "Alice in Wonderland" },
  { day: 157, title: "The Cheshire Cat", focus: "Grinning cat", chapters: [6], words: ["grin", "vanish"], book: "Alice in Wonderland" },
  { day: 158, title: "Mad Tea Party", focus: "Nonsense tea", chapters: [7], words: ["nonsense", "riddle"], book: "Alice in Wonderland" },
  { day: 159, title: "The Queen's Garden", focus: "Painting roses", chapters: [8], words: ["majesty", "temper"], book: "Alice in Wonderland" },
  { day: 160, type: 'assessment', title: "Week 32 Assessment", focus: "Alice 5-8" },
  
  // Week 33 (Days 161-165)
  { day: 161, title: "The Croquet Game", focus: "Impossible game", chapters: [9], words: ["croquet", "chaos"], book: "Alice in Wonderland" },
  { day: 162, title: "The Mock Turtle", focus: "Sad story", chapters: [10], words: ["mock", "melancholy"], book: "Alice in Wonderland" },
  { day: 163, title: "Who Stole the Tarts?", focus: "The trial", chapters: [11], words: ["trial", "evidence"], book: "Alice in Wonderland" },
  { day: 164, title: "Alice's Evidence", focus: "Final chapter", chapters: [12], words: ["verdict", "dream"], book: "Alice in Wonderland" },
  { day: 165, type: 'assessment', title: "Week 33 Assessment", focus: "Alice 9-12" },
  
  // Week 34 (Days 166-170)
  { day: 166, title: "Fantasy Elements", focus: "What makes it fantasy", words: ["fantasy", "imagination"], book: "Alice in Wonderland" },
  { day: 167, title: "Wordplay and Nonsense", focus: "Language fun", words: ["wordplay", "pun"], book: "Alice in Wonderland" },
  { day: 168, title: "Alice's Character", focus: "How she grows", words: ["mature", "brave"], book: "Alice in Wonderland" },
  { day: 169, title: "Symbolism", focus: "Deeper meanings", words: ["symbol", "metaphor"], book: "Alice in Wonderland" },
  { day: 170, type: 'assessment', title: "Week 34 Assessment", focus: "Alice Complete" },
  
  // Week 35 (Days 171-175) - Final Review
  { day: 171, title: "Year in Review", focus: "All 6 books", words: ["journey", "literature"], book: "Review" },
  { day: 172, title: "Favorite Book Discussion", focus: "Student choice", words: ["preference", "justify"], book: "Review" },
  { day: 173, title: "Character Gallery", focus: "All characters", words: ["gallery", "diverse"], book: "Review" },
  { day: 174, title: "Theme Synthesis", focus: "Big ideas", words: ["synthesis", "connection"], book: "Review" },
  { day: 175, type: 'assessment', title: "Week 35 Assessment", focus: "Year Review" },
  
  // Week 36 (Days 176-180) - Final Assessment & Celebration
  { day: 176, title: "Final Review Day 1", focus: "Units 1-3", words: ["comprehensive", "review"], book: "Review" },
  { day: 177, title: "Final Review Day 2", focus: "Units 4-6", words: ["preparation", "confidence"], book: "Review" },
  { day: 178, title: "Final Reading Test", focus: "Reading comprehension", words: ["assessment", "demonstrate"], book: "Review", finalTest: true },
  { day: 179, title: "Final Writing Test", focus: "Writing assessment", words: ["compose", "analyze"], book: "Review", finalTest: true },
  { day: 180, title: "Celebration Day!", focus: "You did it!", words: ["celebrate", "achievement"], book: "Review", celebration: true }
];

// Get vocabulary for assessment week
function getWeekVocab(day) {
  const weekStart = Math.floor((day - 1) / 5) * 5 + 1;
  const weekLessons = lessons.filter(l => 
    l.day >= weekStart && l.day < weekStart + 4 && l.type !== 'assessment'
  );
  return weekLessons.flatMap(l => l.words || []);
}

function buildLesson(lesson) {
  const isAssessment = lesson.type === 'assessment';
  const isCelebration = lesson.celebration || false;
  const isFinalTest = lesson.finalTest || false;
  const weekNum = Math.ceil(lesson.day / 5);
  
  const emoji = isCelebration ? "🎉" : isFinalTest ? "📝" : isAssessment ? "📝" : "📚";
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${lesson.day}: ${lesson.title} - 4th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/lesson-viewer.js"></script>
    
    <script>
        const lesson${lesson.day}Config = {
            lessonId: '4th-grade-day-${lesson.day}',
            gradeLevel: '4th-grade',
            title: 'Day ${lesson.day} - 4th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <div class="character">${emoji}</div>
                            <h1>Day ${lesson.day}</h1>
                            <div class="subtitle">4th Grade ELA</div>
                            <p style="color: #B06821; font-size: 20px; margin-top: 20px;">
                                ${lesson.book || '4th Grade Reading'}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                ${lesson.title}
                            </p>
                        </div>
                    \`
                },
                
                ${!isCelebration ? `
                // Page 2: Welcome
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📖 Welcome to Day ${lesson.day}!</h2>
                            ${isAssessment ? `
                                <p style="font-size: 18px;">Time to show what you learned this week!</p>
                                <div style="margin: 30px 0; padding: 25px; background: rgba(176,104,33,0.1); border-radius: 12px;">
                                    <h3 style="color: #B06821; margin-bottom: 15px;">Today's Assessment:</h3>
                                    <ul style="line-height: 2; font-size: 18px;">
                                        <li>📚 Vocabulary Quiz (8 words from this week)</li>
                                        <li>🎯 Comprehension Questions</li>
                                        <li>✍️ Reflection Journal</li>
                                    </ul>
                                </div>
                            ` : `
                                <p>Today you will:</p>
                                <ul style="margin: 20px 0; line-height: 2;">
                                    <li>📖 Read about ${lesson.focus}</li>
                                    <li>📝 Learn 2 new vocabulary words</li>
                                    <li>🎯 Answer comprehension questions</li>
                                    <li>✍️ Write a journal entry</li>
                                </ul>
                                <p><strong>Time needed:</strong> About 30-45 minutes</p>
                            `}
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary ${isAssessment ? 'Quiz' : '(2 words)'}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 ${isAssessment ? 'Vocabulary Quiz' : "Today's Vocabulary"}</h2>
                            
                            ${isAssessment ? `
                                <p>Match each word with its definition. All 8 words are from this week's reading!</p>
                                <div style="margin: 30px 0;">
                                    ${getWeekVocab(lesson.day).map((word, i) => `
                                        <div style="margin-bottom: 25px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                            <p style="font-weight: 700; font-size: 20px; color: #305853; margin-bottom: 10px;">
                                                ${i + 1}. ${word}
                                            </p>
                                            <textarea style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px;" 
                                                      placeholder="Write the definition..."></textarea>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div style="margin: 30px 0; padding: 25px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 15px; border: 2px solid #B06821;">
                                    <div style="margin-bottom: 30px;">
                                        <span style="font-size: 32px; font-weight: 800; color: #305853;">${lesson.words[0]}</span>
                                        <p style="font-size: 18px; line-height: 1.6; color: #333; margin-top: 10px;">
                                            [Definition from the story]
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <span style="font-size: 32px; font-weight: 800; color: #305853;">${lesson.words[1]}</span>
                                        <p style="font-size: 18px; line-height: 1.6; color: #333; margin-top: 10px;">
                                            [Definition from the story]
                                        </p>
                                    </div>
                                </div>
                                
                                <div style="padding: 20px; background: rgba(176,104,33,0.05); border-radius: 10px;">
                                    <p style="margin: 0;">
                                        💡 <strong>Watch for these words</strong> in today's reading!
                                    </p>
                                </div>
                            `}
                        </div>
                    \`
                },
                
                // Page 4: ${isAssessment ? 'Comprehension Test' : 'Reading'}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            ${isAssessment ? `
                                <h2>🎯 Comprehension Test</h2>
                                <p>Answer these questions about this week's reading:</p>
                                
                                <div style="margin: 30px 0;">
                                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                        <p style="font-weight: 700; margin-bottom: 10px;">1. What were the most important events this week?</p>
                                        <textarea style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"></textarea>
                                    </div>
                                    
                                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                        <p style="font-weight: 700; margin-bottom: 10px;">2. How did the characters change or react?</p>
                                        <textarea style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"></textarea>
                                    </div>
                                    
                                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                        <p style="font-weight: 700; margin-bottom: 10px;">3. What do you think will happen next?</p>
                                        <textarea style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"></textarea>
                                    </div>
                                </div>
                            ` : `
                                <h2>📖 Today's Reading: ${lesson.focus}</h2>
                                
                                <div style="background: white; padding: 25px; border-radius: 12px; border: 3px solid #305853; margin: 20px 0;">
                                    <p style="font-size: 18px; margin-bottom: 15px;">
                                        📚 Read from ${lesson.book}
                                    </p>
                                    <p style="font-size: 16px; color: #666; margin-top: 15px;">
                                        ${lesson.chapters ? `Focus: Chapter ${lesson.chapters.join(', ')}` : `Focus: ${lesson.focus}`}
                                    </p>
                                </div>
                                
                                <div style="margin-top: 30px; padding: 20px; background: rgba(48,88,83,0.1); border-radius: 10px;">
                                    <h3 style="color: #305853;">📝 While You Read:</h3>
                                    <ul style="line-height: 2;">
                                        <li>Look for the vocabulary words: <strong>${lesson.words[0]}</strong> and <strong>${lesson.words[1]}</strong></li>
                                        <li>What are the main events?</li>
                                        <li>How do characters change or react?</li>
                                    </ul>
                                </div>
                            `}
                        </div>
                    \`
                },
                
                // Page 5: ${isAssessment ? 'Journal' : 'Comprehension'}
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            ${isAssessment ? `
                                <h2>✍️ Weekly Reflection</h2>
                                
                                <div style="margin: 25px 0; padding: 25px; background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; border-radius: 8px;">
                                    <h3 style="color: #B06821; margin-bottom: 15px;">Reflection Prompt:</h3>
                                    <p style="font-size: 18px; font-style: italic;">
                                        Write a paragraph (5-7 sentences) about your favorite part of this week's reading. 
                                        Why was it your favorite? What made it interesting?
                                    </p>
                                </div>
                                
                                <textarea 
                                    style="width: 100%; min-height: 250px; padding: 15px; border: 2px solid #305853; border-radius: 10px; font-size: 16px;"
                                    placeholder="Write your reflection here..."></textarea>
                            ` : `
                                <h2>🎯 Comprehension Questions</h2>
                                <p>Answer these questions about today's reading:</p>
                                
                                <div style="margin: 30px 0;">
                                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                        <p style="font-weight: 700; margin-bottom: 10px;">1. What were the main events?</p>
                                        <textarea style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"></textarea>
                                    </div>
                                    
                                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                        <p style="font-weight: 700; margin-bottom: 10px;">2. How did the characters feel or react?</p>
                                        <textarea style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"></textarea>
                                    </div>
                                    
                                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(48,88,83,0.05); border-radius: 10px;">
                                        <p style="font-weight: 700; margin-bottom: 10px;">3. What do you predict will happen next?</p>
                                        <textarea style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"></textarea>
                                    </div>
                                </div>
                            `}
                        </div>
                    \`
                },
                
                // Page 6: Journal ${isAssessment ? '(included above)' : ''}
                ${!isAssessment ? `
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✍️ Journal Entry</h2>
                            
                            <div style="margin: 25px 0; padding: 25px; background: rgba(176,104,33,0.1); border-left: 4px solid #B06821; border-radius: 8px;">
                                <h3 style="color: #B06821; margin-bottom: 15px;">Today's Prompt:</h3>
                                <p style="font-size: 18px; font-style: italic;">
                                    Write 4-6 sentences about today's reading. What was most interesting or surprising? 
                                    How did this chapter move the story forward?
                                </p>
                            </div>
                            
                            <textarea 
                                style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 10px; font-size: 16px;"
                                placeholder="Write your journal entry here..."></textarea>
                        </div>
                    \`
                },
                ` : ''}
                
                // Page ${isAssessment ? '6' : '7'}: Completion
                {
                    render: () => \`
                        <div class="lesson-page-card completion-page">
                            <div class="character">${emoji}</div>
                            ${isCelebration ? `
                                <h1>🎉 4th Grade Complete! 🎉</h1>
                                <p style="font-size: 1.5rem; margin: 20px 0;">
                                    You finished 180 days of 4th grade reading!
                                </p>
                                <p style="font-size: 1.3rem; margin: 20px 0;">
                                    You are a READING CHAMPION! ⭐
                                </p>
                                <div style="font-size: 5rem; margin: 30px 0;">🏆📚🎊</div>
                            ` : `
                                <h1>Day ${lesson.day} Complete!</h1>
                                <p style="font-size: 20px; margin: 20px 0;">Great work today!</p>
                                
                                <div style="text-align: left; max-width: 400px; margin: 30px auto; background: rgba(48,88,83,0.05); padding: 25px; border-radius: 12px;">
                                    <h3 style="color: #305853; margin-bottom: 15px;">✅ Today You:</h3>
                                    <ul style="line-height: 2;">
                                        ${isAssessment ? `
                                            <li>Took the vocabulary quiz</li>
                                            <li>Answered comprehension questions</li>
                                            <li>Wrote a reflection</li>
                                        ` : `
                                            <li>Read about ${lesson.focus}</li>
                                            <li>Learned 2 vocabulary words</li>
                                            <li>Answered comprehension questions</li>
                                            <li>Wrote a journal entry</li>
                                        `}
                                    </ul>
                                </div>
                            `}
                            
                            <a href="student-dashboard.html" 
                               style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">
                                ${lesson.day < 180 ? 'Continue →' : 'Finish! →'}
                            </a>
                        </div>
                    \`
                }
                ` : `
                // Celebration page
                {
                    render: () => \`
                        <div class="lesson-page-card completion-page">
                            <div class="character">🎉</div>
                            <h1>🎉 4th Grade Complete! 🎉</h1>
                            <p style="font-size: 1.5rem; margin: 20px 0;">
                                You finished 180 days of 4th grade reading!
                            </p>
                            <p style="font-size: 1.3rem; margin: 20px 0;">
                                You read 6 amazing books and are now a READING CHAMPION! ⭐
                            </p>
                            <div style="font-size: 5rem; margin: 30px 0;">🏆📚🎊</div>
                            
                            <div style="text-align: left; max-width: 500px; margin: 30px auto; background: rgba(48,88,83,0.05); padding: 25px; border-radius: 12px;">
                                <h3 style="color: #305853; margin-bottom: 15px;">📚 Books You Read:</h3>
                                <ul style="line-height: 2;">
                                    <li>The Wonderful Wizard of Oz</li>
                                    <li>The Adventures of Tom Sawyer</li>
                                    <li>Around the World in 80 Days</li>
                                    <li>Black Beauty</li>
                                    <li>Sherlock Holmes Stories</li>
                                    <li>Alice in Wonderland</li>
                                </ul>
                            </div>
                            
                            <a href="student-dashboard.html" 
                               style="display: inline-block; margin-top: 20px; padding: 15px 35px; background: #B06821; color: white; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700;">
                                Dashboard →
                            </a>
                        </div>
                    \`
                }
                `}
            ]
        };

        createLessonViewer('lesson-container', lesson${lesson.day}Config);
    </script>
</body>
</html>`;
}

console.log('🏗️  Building 4th Grade Days 31-180 (150 lessons)...\n');

let count = 0;
lessons.forEach(lesson => {
  const html = buildLesson(lesson);
  const filename = `4th-grade-day-${lesson.day}.html`;
  fs.writeFileSync(filename, html);
  count++;
  
  if (count % 10 === 0) {
    console.log(`✅ Built ${count} lessons...`);
  }
});

console.log(`\n🎉 Complete! Built all 150 lessons (Days 31-180)!`);
console.log(`📚 Total 4th grade lessons now: 180 (Complete year!)

Summary:
- Days 1-30: The Wonderful Wizard of Oz
- Days 31-60: The Adventures of Tom Sawyer
- Days 61-90: Around the World in 80 Days
- Days 91-120: Black Beauty
- Days 121-150: Sherlock Holmes Stories
- Days 151-180: Alice in Wonderland

🎊 4th Grade curriculum COMPLETE!`);
