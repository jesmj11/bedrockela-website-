const fs = require('fs');
const path = require('path');

// Load data files
const vocabularyData = require('../../../dracula-vocabulary.json');
const infoTexts = require('./dracula-info-texts.json');

// Load the Dracula chapters
const draculaText = fs.readFileSync(path.join(__dirname, '../../../dracula-full-text.txt'), 'utf8');

// Extract chapters from the text
function extractChapters(text) {
    const chapters = {};
    const chapterRegex = /Chapter (\d+): ([^\n]+)\n([\s\S]*?)(?=Chapter \d+:|$)/g;
    let match;
    
    while ((match = chapterRegex.exec(text)) !== null) {
        const chapterNum = parseInt(match[1]);
        const title = match[2].trim();
        const content = match[3].trim();
        
        chapters[chapterNum] = {
            title: title,
            content: content
        };
    }
    
    return chapters;
}

const chapters = extractChapters(draculaText);

// Split chapter content into 3 parts
function splitIntoThreeParts(text) {
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    const totalParas = paragraphs.length;
    
    const part1End = Math.floor(totalParas / 3);
    const part2End = Math.floor(2 * totalParas / 3);
    
    return {
        part1: paragraphs.slice(0, part1End).join('\n'),
        part2: paragraphs.slice(part1End, part2End).join('\n'),
        part3: paragraphs.slice(part2End).join('\n')
    };
}

// Comprehension questions for each chapter
const comprehensionQuestions = {
    1: [
        "Jonathan Harker notices several strange warnings on his journey to Castle Dracula — an old woman gives him garlic and tells him not to go, people grow quiet when he mentions his destination. Why do you think he continues anyway despite these warnings? What does this tell you about his character?",
        "When Jonathan arrives at the castle, Count Dracula greets him by saying 'Come in freely, of your own will.' This phrasing sounds strange and deliberate. Why might the Count need Jonathan to enter willingly? What might this suggest about the rules vampires follow?",
        "The chapter describes the castle as 'black against the stars, tall and jagged, perched on the edge of a cliff. Not a single light showed in any window.' How does this description create a feeling of danger or unease before Jonathan even enters?"
    ],
    2: [
        "Jonathan notices that Count Dracula casts no reflection in the mirror. Instead of confronting the Count about this impossible thing, Jonathan says nothing and keeps shaving. Why might he choose to stay quiet? What would you have done?",
        "The Count is described as being a 'gracious host' who provides good food and interesting conversation, yet Jonathan also notices troubling details (no servants, no reflection, locked doors). How does this combination of hospitality and horror make the situation more frightening than if the Count were obviously evil from the start?",
        "At the end of the chapter, Jonathan discovers the front door is locked from the outside — meaning he is 'a guest who could not leave.' How does this realization change everything about his situation?"
    ],
    3: [
        "Jonathan discovers that Count Dracula can climb down the castle wall headfirst 'like a lizard.' What does this image tell you about what the Count really is? How is this different from how he appears during their polite conversations?",
        "Three mysterious women appear in the castle and approach Jonathan, but before they reach him, Dracula arrives and says 'This one belongs to me.' What does this statement reveal about how Dracula views Jonathan? Why might this be more disturbing than direct violence?",
        "Jonathan decides to write everything in his journal even though he doesn't know if anyone will ever find it. Why is this important? What does it tell you about Jonathan's character and his hope for the future?"
    ],
    4: [
        "Jonathan finds Count Dracula lying in a box filled with earth, with his eyes closed but looking as if he had 'recently fed.' What makes this discovery particularly horrifying? What does it tell Jonathan about what the Count has been doing?",
        "The chapter says Jonathan 'tied his journal carefully in oilcloth and tucked it inside his coat' before attempting his dangerous escape. Why would he protect his journal so carefully even when his own life is in danger? What does this show about what he values?",
        "Jonathan finally escapes the castle by climbing down a wall and running until the castle is out of sight, not stopping 'for a very long time.' What do you think he felt during this escape? How might this experience change him?"
    ],
    5: [
        "Mina writes that she tells herself 'reasonable explanations' for why Jonathan hasn't returned, but she writes this in her journal each night before sleep. What does this tell you about how worried she really is? Why might she need to write these reassurances down?",
        "A ship arrives in Whitby during a storm with no living crew and fifty boxes of 'dark foreign earth' in the hold. Knowing what we learned from Jonathan's chapters, why is this arrival so ominous? What has arrived in England?",
        "Mina describes her friend Lucy as 'bright and funny and the most good-natured person I know,' but then immediately says 'Lucy began walking in her sleep.' Why might the author introduce a happy, innocent character right before something bad starts happening to her? How does this make you feel as a reader?"
    ],
    6: [
        "Mina finds Lucy on the clifftop with a 'dark shape' bending over her and 'two small marks on her neck.' Even though this seems very strange, Mina says 'I thought nothing of them at first. This was my mistake.' Why might Mina not immediately recognize the danger? What does this tell you about how horror can seem ordinary at first?",
        "The chapter says 'Lucy grew pale. Her appetite faded. She slept too much and then could not sleep at all.' These symptoms get worse over weeks. How is this gradual decline more disturbing than if Lucy had been attacked suddenly and obviously?",
        "Professor Van Helsing brings bunches of garlic flowers to protect Lucy, and she teases him about his 'smelly decorations.' Why might humor in a scary situation be important? How does Lucy's teasing make what happens to her more tragic?"
    ],
    7: [
        "Van Helsing carefully hangs garlic flowers around Lucy's room, and on nights when the garlic is in place and windows are closed, Lucy improves. But Lucy's mother, 'not understanding the reason,' opens windows and removes the flowers because she thinks they smell bad. What does this misunderstanding tell you about how dangerous good intentions can be when someone doesn't know the full truth?",
        "Van Helsing asks Mina: 'Do you believe there are things in the world that science does not yet fully explain?' Why is this question important? What is Van Helsing really asking Mina to do?",
        "The chapter shows Van Helsing as both eccentric (bringing garlic flowers, performing strange rituals) and genuinely caring about Lucy. How does this combination make him more believable as a character? Why might readers trust someone who is both unusual and clearly good-hearted?"
    ],
    8: [
        "Two things happen in the same week: Jonathan is found alive (wonderful news), and Lucy dies (terrible news). Why might the author have placed these two events together? How does experiencing both joy and grief so close together feel different from experiencing them separately?",
        "Jonathan's hair has gone 'partly white' even though he's only in his twenties, and he refuses to read his journal because he fears what was in it 'might have been a sickness.' What does this tell you about how his experience in Castle Dracula affected him psychologically, not just physically?",
        "Van Helsing writes to Mina: 'Do not bury Lucy yet. Wait for me. There is something more to be done.' What do you think he plans to do? Why might this be necessary even though Lucy has died?"
    ],
    9: [
        "Children near Lucy's grave start disappearing at night and returning with marks on their necks, describing a 'beautiful lady' who led them away. Why is it particularly horrible that Lucy, who was so good-natured in life, would attack children? What does this tell you about what vampirism does to a person?",
        "Van Helsing tells the group plainly: 'Lucy is gone. What walks in her body is not your Lucy.' Why is this distinction important? How does it help Arthur cope with what they need to do?",
        "After the group frees Lucy from being undead, Arthur says 'She looks like herself. She looks as if she's really sleeping.' What does this peaceful appearance tell you about the difference between the vampire that used her body and Lucy's true self?"
    ],
    10: [
        "The group pieces together Dracula's plan using Jonathan's journal, Van Helsing's knowledge, and careful investigation. Why is this teamwork and shared information important? What does it tell you about how they can defeat someone as powerful as Dracula?",
        "Mina organizes all their journals and letters into 'a single record,' typing everything and putting it in order. Why might this organizational work be just as important as the more obviously heroic actions like fighting? What special strength does Mina bring to the group?",
        "The chapter describes each member of the group — Jonathan, Doctor Seward, Quincey Morris, Arthur, Van Helsing, and Mina — and what each person contributes. Why might the author want to emphasize their different skills and perspectives? What does this tell you about what makes a good team?"
    ],
    11: [
        "The men break into Carfax and find only 29 of the original 50 boxes — Dracula has been moving the rest to other hiding places around London. Why does this discovery make their task harder? What does it tell you about Dracula's intelligence and planning?",
        "As they consecrate the boxes, making them useless to Dracula, the men feel 'as though being watched' but never see Dracula. Why might this invisible presence be more frightening than a direct confrontation? What does it tell you about Dracula's power?",
        "After the mission, Van Helsing examines Mina carefully and tells her 'I believe Dracula has been visiting you.' How does this news change everything? Why might Dracula have targeted Mina specifically?"
    ],
    12: [
        "Van Helsing explains that there is 'a strange mental link' between Dracula and Mina — he can use it to find her, but they might be able to use it in reverse to find him. How does this connection become both a danger and a potential weapon? What does this tell you about how disadvantages can sometimes be turned into advantages?",
        "Through hypnosis each morning at sunrise, Mina can describe what Dracula is experiencing. She becomes their 'compass.' Why is this role both valuable and frightening for Mina? How does it require tremendous courage?",
        "Jonathan tells Mina 'I promise you that' when vowing to end the vampire threat. What do you think Jonathan is feeling after losing Mina once when he was trapped in Castle Dracula, and now facing the possibility of losing her again? How might this fear make him both more determined and more desperate?"
    ],
    13: [
        "After the group destroys most of Dracula's hiding places in London, he takes his last remaining box and flees back to Transylvania. Why does Dracula run instead of staying to fight? What does this tell you about his character and his weaknesses?",
        "Van Helsing explains that if Dracula reaches his castle, 'he would be safe behind his own walls and in his own country, with all of the old powers that came with that.' Why does location matter for Dracula's power? What does this tell you about how the supernatural works in this story?",
        "The group splits into two teams to pursue Dracula. When they say goodbye, the chapter notes 'small, meaningful moments' — checking coats, handshakes, quiet words. Why might the author emphasize these quiet gestures before a dangerous mission? What do they tell you about the relationships between these characters?"
    ],
    14: [
        "Van Helsing tells Mina 'Your mind is strong' when he observes her resisting Dracula's mental influence. What does this tell you about the nature of courage? How is mental resistance as important as physical bravery?",
        "When Mina asks Van Helsing what would happen if they failed to destroy Dracula, he responds: 'Then we would have to find a different way. There is always a different way.' What does this attitude tell you about Van Helsing's character? Why might this kind of thinking be important when facing seemingly impossible challenges?",
        "Mina feels a 'pulling sensation' trying to turn her around and make her stop traveling toward the castle, but she keeps walking anyway. Van Helsing says this is 'remarkable.' What makes Mina's continued forward movement despite this supernatural resistance so impressive? What kind of strength does it require?"
    ],
    15: [
        "Mina and Van Helsing reach Castle Dracula ahead of the others. Van Helsing methodically goes through each room, 'leaving holy water at every doorway and window.' Why is this careful, thorough preparation important? What does it tell you about how to approach danger?",
        "Van Helsing draws a protective circle around their fire using salt and herbs, explaining that within it 'nothing could harm us without our invitation.' Why might protection and boundaries be important themes in this story? What do they tell you about safety and vulnerability?",
        "The chapter ends with Van Helsing saying 'The others will come tomorrow. We wait here.' What does this simple statement tell you about faith, trust, and teamwork? Why is waiting sometimes as important as action?"
    ],
    16: [
        "The men race desperately to intercept Dracula's box before sunset, riding down a snowy hillside with their horses sliding on ice. What makes this race against time particularly tense? Why does sunset matter so much?",
        "Quincey Morris acts without hesitation when he sees the box — he 'came off his horse and onto the box in a single motion.' Why might quick, decisive action be important in a crisis? What does Quincey's immediate response tell you about his character?",
        "The chapter says 'We were many and they were few, but they were not our real fight.' The gypsies carrying Dracula's box aren't the true enemy. Why is this distinction important? What does it tell you about choosing your battles carefully?"
    ],
    17: [
        "When Jonathan finally destroys Dracula, the effect is 'instantaneous' — the Count crumbles to dust and ash. Why might the author choose to make Dracula's end so quick after all the build-up? What does this sudden ending tell you about the nature of evil's hold?",
        "Quincey Morris is fatally wounded in the final battle but lives long enough to know they succeeded. He asks 'Is it over?' and smiles when told yes. What makes this moment both sad and peaceful? Why might knowing his sacrifice mattered be important to Quincey?",
        "The chapter describes Quincey's death simply: 'he smiled, and then he was gone.' Why might this quiet ending be more powerful than something dramatic? What does it tell you about the reality of sacrifice?"
    ],
    18: [
        "When Dracula is destroyed, Mina immediately feels the mental link disappear — 'The silence it left behind was extraordinary.' Why might silence and freedom feel extraordinary after being connected to evil? What does this tell you about the weight of what Mina had been carrying?",
        "The group buries Quincey Morris on a hillside with a 'kind and dignified' priest who 'did not know the full story.' Why might it be important that the burial was normal and respectful? What does this tell you about returning to ordinary life after extraordinary events?",
        "As the group travels home, they begin to separate, each returning to their normal lives. Why might this gradual separation be natural and necessary? What does it tell you about how people process shared trauma?"
    ],
    19: [
        "Mina describes the train ride home as 'not the silence of people who have nothing to say, but the silence of two people who have been through something enormous together.' What's the difference between these two kinds of silence? Why might silence sometimes be more meaningful than words?",
        "Mina thinks about Lucy and believes 'she was at peace, truly herself again.' Why might this belief be important for Mina's healing? How does it help her process both the horror of what happened and the loss of her friend?",
        "The chapter emphasizes Mina's realization: 'I was stronger than I had known. Fear does not disqualify you from being brave — bravery is often just deciding to keep moving while afraid.' What important truth about courage is Mina expressing? How might this apply to challenges you face in your own life?"
    ],
    20: [
        "Seven years later, Mina and Jonathan have a son they named Quincey. Why is this name choice meaningful? What does it tell you about how they want to remember and honor their friend?",
        "Mina says they haven't told young Quincey about the vampire yet because 'he is too young, and the world should be ordinary for him as long as it can be.' Do you agree with this decision? Why might protecting childhood innocence be important, even when you know darker truths exist?",
        "The novel ends with Mina reflecting that they 'helped make' England 'perfectly safe.' What does this ending tell you about the value of courage and sacrifice? How do ordinary people make the world safer for others?"
    ]
};

// Grammar/Language content for Days 1-4
const grammarLanguageContent = {
    day1: {
        type: "grammar",
        title: "Complex Sentences with Subordinating Conjunctions",
        explanation: "A complex sentence has an independent clause (complete thought) and a dependent clause (incomplete thought connected with words like 'because', 'although', 'while', 'when', 'if', 'since').",
        examples: [
            "Jonathan traveled to Transylvania because he needed to complete an assignment for his employer.",
            "Although the villagers warned him, Jonathan continued to the castle.",
            "The Count watched Jonathan carefully while he ate his dinner."
        ],
        exercises: [
            {
                prompt: "Combine these two sentences using the conjunction in parentheses: 'The coach stopped. Jonathan stepped into the castle.' (when)",
                answer: "The coach stopped when Jonathan stepped into the castle."
            },
            {
                prompt: "Combine these two sentences using the conjunction in parentheses: 'The Count was very gracious. Jonathan felt increasingly uneasy.' (although)",
                answer: "Although the Count was very gracious, Jonathan felt increasingly uneasy."
            },
            {
                prompt: "Write your own complex sentence about the story using 'because':",
                answer: "[Student answers will vary]"
            }
        ]
    },
    day2: {
        type: "language",
        title: "Context Clues: Using Surrounding Words to Determine Meaning",
        explanation: "When you encounter an unfamiliar word, look at the words and sentences around it for clues about its meaning. Context clues include definitions, examples, synonyms, antonyms, or explanations.",
        examples: [
            "The landscape became more forbidding — jagged mountains, dark forests, and steep cliffs made the area look dangerous and unwelcoming.",
            "Jonathan felt an uneasiness, a growing worry and discomfort that something was wrong.",
            "The Count moved with an angular grace, his thin, sharp-featured face catching the firelight."
        ],
        exercises: [
            {
                prompt: "Read this sentence and figure out what 'methodical' means from context: 'Van Helsing worked in a methodical way, carefully completing each step in exact order.' What does methodical mean?",
                answer: "Careful, organized, done step-by-step in a planned way"
            },
            {
                prompt: "What does 'proximity' mean in this sentence: 'The asylum's proximity to Carfax made it convenient — the two properties were very close to each other.'",
                answer: "Nearness, closeness"
            },
            {
                prompt: "Write a sentence using a vocabulary word from this week with context clues that help explain its meaning:",
                answer: "[Student answers will vary]"
            }
        ]
    },
    day3: {
        type: "grammar",
        title: "Using Commas in Complex Sentences",
        explanation: "When a dependent clause comes BEFORE the independent clause, use a comma to separate them. When it comes AFTER, usually no comma is needed. Example: 'Although Jonathan was frightened, he continued forward.' vs 'Jonathan continued forward although he was frightened.'",
        examples: [
            "When the Count appeared in the doorway, Jonathan felt a chill run down his spine.",
            "Jonathan felt a chill run down his spine when the Count appeared in the doorway.",
            "Because Mina organized all the records, the group could see patterns they had missed before."
        ],
        exercises: [
            {
                prompt: "Add commas where needed: 'Before Dracula could escape the group destroyed most of his hiding places.'",
                answer: "Before Dracula could escape, the group destroyed most of his hiding places."
            },
            {
                prompt: "Add commas where needed: 'Although Van Helsing seemed eccentric Mina trusted his knowledge completely.'",
                answer: "Although Van Helsing seemed eccentric, Mina trusted his knowledge completely."
            },
            {
                prompt: "Write a complex sentence about the story with the dependent clause FIRST (requiring a comma):",
                answer: "[Student answers will vary]"
            }
        ]
    },
    day4: {
        type: "language",
        title: "Greek and Latin Roots: 'Trans-' and 'Morph'",
        explanation: "Many English words come from Greek and Latin roots. 'Trans-' means 'across' or 'beyond' (Transylvania = beyond the forest). 'Morph' means 'form' or 'shape' (metamorphosis = change in form).",
        examples: [
            "Transport = carry across, Transform = change form across states",
            "Transfusion = transfer (of blood) across from one person to another",
            "Morphology = study of forms and shapes"
        ],
        exercises: [
            {
                prompt: "What does 'transcribe' mean if 'trans-' means 'across' and 'scribe' means 'write'?",
                answer: "To write across (copy from one form to another), like Mina typing everyone's journals"
            },
            {
                prompt: "What does 'transformation' mean? How does it relate to what happens to Dracula's victims?",
                answer: "A complete change in form — vampires transform their victims from human to undead"
            },
            {
                prompt: "Find another word in this week's story that uses a Latin or Greek root and explain its meaning:",
                answer: "[Student answers will vary]"
            }
        ]
    }
};

// Writing prompts for Days 1 & 3, Journal prompts for Days 2 & 4
const writingJournalPrompts = {
    day1: {
        type: "writing",
        standard: "W.5.1 - Opinion Writing",
        prompt: "Jonathan Harker receives several warnings not to go to Castle Dracula, but he continues anyway because he has a professional assignment. Write a paragraph arguing whether Jonathan made the right choice. Should duty to your job always come first, even when there are warnings of danger? Use evidence from the story and your own reasoning to support your opinion."
    },
    day2: {
        type: "journal",
        prompt: "Count Dracula appears to be a polite, educated gentleman, yet small details reveal he is something far more dangerous. Think about your own life: have you ever met someone or been in a situation where things seemed fine on the surface but small details made you uneasy? What did you notice? How did you respond? What does your gut feeling tell you in uncertain situations?"
    },
    day3: {
        type: "writing",
        standard: "W.5.2 - Informative/Explanatory Writing",
        prompt: "Professor Van Helsing becomes the leader of the group fighting Dracula because he has specialized knowledge about vampires. Write an informative paragraph explaining what makes Van Helsing a good leader. What skills and knowledge does he bring? How does he combine old wisdom (folklore, religious faith) with modern thinking (science, medical knowledge)? Use specific examples from the story."
    },
    day4: {
        type: "journal",
        prompt: "Mina Murray is separated from Jonathan for months without knowing if he's alive or safe. She writes in her journal: 'I tell myself there are reasonable explanations... I tell myself this every night before I go to sleep.' Think about a time you were worried about someone or something important. How did you cope with that worry? What did you tell yourself to stay hopeful?"
    }
};

// Map day numbers (79-98) to their properties
function getDayInfo(dayNum) {
    // Days 79-98 = Weeks 16-19 (4 weeks)
    // Day 79 = Week 16 Day 1
    // Day 83 = Week 16 Day 5 (Assessment)
    // Day 84 = Week 17 Day 1
    // Day 88 = Week 17 Day 5 (Assessment)
    // etc.
    
    const weekNum = Math.floor((dayNum - 79) / 5) + 16;
    const dayOfWeek = ((dayNum - 79) % 5) + 1;
    const isAssessment = (dayOfWeek === 5);
    
    // Map to chapter number (Days 79-82 = Chapters 1-4, Days 84-87 = Chapters 5-8, etc.)
    let chapterNum;
    if (dayNum <= 82) chapterNum = dayNum - 78;  // Days 79-82 → Chapters 1-4
    else if (dayNum === 83) chapterNum = 0; // Assessment
    else if (dayNum <= 87) chapterNum = dayNum - 83;  // Days 84-87 → Chapters 5-8
    else if (dayNum === 88) chapterNum = 0; // Assessment
    else if (dayNum <= 92) chapterNum = dayNum - 88;  // Days 89-92 → Chapters 9-12
    else if (dayNum === 93) chapterNum = 0; // Assessment
    else if (dayNum <= 97) chapterNum = dayNum - 93;  // Days 94-97 → Chapters 13-16
    else chapterNum = 0; // Day 98 = Assessment
    
    // Adjust chapter number for regular days
    if (!isAssessment) {
        const weekIndex = Math.floor((dayNum - 79) / 5);
        chapterNum = weekIndex * 4 + dayOfWeek;
    }
    
    return {
        dayNum,
        weekNum,
        dayOfWeek,
        isAssessment,
        chapterNum: isAssessment ? 0 : chapterNum
    };
}

// Generate HTML for a regular lesson day
function generateRegularDay(dayNum) {
    const info = getDayInfo(dayNum);
    const chapter = chapters[info.chapterNum];
    const vocab = vocabularyData[info.chapterNum];
    const parts = splitIntoThreeParts(chapter.content);
    const questions = comprehensionQuestions[info.chapterNum];
    
    // Determine info text key
    const infoKey = `week${info.weekNum}_day${info.dayOfWeek}`;
    const infoText = infoTexts[infoKey];
    
    // Determine grammar/language content
    const glContent = grammarLanguageContent[`day${info.dayOfWeek}`];
    
    // Determine writing/journal prompt
    const wjPrompt = writingJournalPrompts[`day${info.dayOfWeek}`];
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5th Grade - Day ${dayNum}: ${chapter.title}</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
</head>
<body>
    <!-- Page 1: Title & Objectives -->
    <div class="lesson-page" id="page1">
        <div class="page-header">
            <h1>Day ${dayNum} - Week ${info.weekNum}</h1>
            <h2>Dracula</h2>
        </div>
        <div class="lesson-title">
            <h1>Chapter ${info.chapterNum}: ${chapter.title}</h1>
            <p class="subtitle">A Tale from Dracula by Bram Stoker</p>
        </div>
        <div class="learning-objectives">
            <h3>📚 What You'll Learn Today</h3>
            <ul>
                <li>Read Chapter ${info.chapterNum}: ${chapter.title}</li>
                <li>Learn 3 new vocabulary words</li>
                <li>Practice vocabulary with interactive activities</li>
                <li>Answer comprehension questions</li>
                <li>Explore related informational text</li>
                <li>Practice ${glContent.type === 'grammar' ? 'grammar' : 'language skills'}</li>
                <li>Complete ${wjPrompt.type === 'writing' ? 'writing exercise' : 'journal reflection'}</li>
            </ul>
        </div>
        <button class="btn-next" onclick="nextPage()">Begin Lesson →</button>
    </div>

    <!-- Page 2: Vocabulary -->
    <div class="lesson-page" id="page2" style="display: none;">
        <div class="page-header">
            <h2>📖 Vocabulary</h2>
            <p>Week ${info.weekNum} - Day ${info.dayOfWeek} of 5</p>
        </div>
        <div class="vocab-section">
            <h3>Today's New Words</h3>
            <p class="vocab-intro">Learn these 3 words before reading. They appear in today's story!</p>
            
            ${vocab.map((word, index) => `
            <div class="vocab-word">
                <h4>${index + 1}. ${word.word}</h4>
                <div class="vocab-input-section">
                    <label><strong>Definition:</strong></label>
                    <p class="vocab-definition">${word.definition}</p>
                    <label><strong>Write the definition in your own words:</strong></label>
                    <textarea id="vocab${index + 1}" rows="2" placeholder="Type your definition here..."></textarea>
                </div>
            </div>
            `).join('\n')}
            
            <div class="vocab-tracker">
                <p><strong>📚 This Week's Words:</strong> ${(info.dayOfWeek - 1) * 3 + 3} of 12 learned</p>
                <p class="tracker-note">Keep reviewing! Quiz on Friday (Day ${info.weekNum === 16 ? 83 : info.weekNum === 17 ? 88 : info.weekNum === 18 ? 93 : 98}).</p>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue to Story →</button>
        </div>
    </div>

    <!-- Page 3: Reading Part 1 -->
    <div class="lesson-page" id="page3" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 1 of 3)</h2>
            <p>Chapter ${info.chapterNum}: ${chapter.title}</p>
        </div>
        <div class="reading-text">
            ${parts.part1.split('\n').map(p => `<p>${p}</p>`).join('\n')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue Reading →</button>
        </div>
    </div>

    <!-- Page 4: Reading Part 2 -->
    <div class="lesson-page" id="page4" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 2 of 3)</h2>
            <p>Chapter ${info.chapterNum}: ${chapter.title}</p>
        </div>
        <div class="reading-text">
            ${parts.part2.split('\n').map(p => `<p>${p}</p>`).join('\n')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue Reading →</button>
        </div>
    </div>

    <!-- Page 5: Reading Part 3 -->
    <div class="lesson-page" id="page5" style="display: none;">
        <div class="page-header">
            <h2>📚 Reading (Part 3 of 3)</h2>
            <p>Chapter ${info.chapterNum}: ${chapter.title}</p>
        </div>
        <div class="reading-text">
            ${parts.part3.split('\n').map(p => `<p>${p}</p>`).join('\n')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Answer Questions →</button>
        </div>
    </div>

    <!-- Page 6: Comprehension Questions -->
    <div class="lesson-page" id="page6" style="display: none;">
        <div class="page-header">
            <h2>✍️ Comprehension Questions</h2>
            <p>Show what you understood</p>
        </div>
        <div class="questions-section">
            ${questions.map((q, index) => `
            <div class="question">
                <p><strong>${index + 1}.</strong> ${q}</p>
                <textarea id="comp${index + 1}" rows="4" placeholder="Write your answer here..."></textarea>
            </div>
            `).join('\n')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue to Informational Text →</button>
        </div>
    </div>

    <!-- Page 7: Informational Text -->
    <div class="lesson-page" id="page7" style="display: none;">
        <div class="page-header">
            <h2>📰 Informational Text</h2>
            <p>Connect Story to Reality</p>
        </div>
        <div class="informational-section">
            <h3>${infoText.title}</h3>
            ${infoText.content}
        </div>
        
        <div class="questions-section" style="margin-top: 30px;">
            <h3 style="color: #2c5aa0; margin-bottom: 20px;">✍️ Comprehension Questions</h3>
            ${infoText.questions.map((q, index) => `
            <div class="question">
                <p><strong>${index + 1}.</strong> ${q.question}</p>
                <textarea id="info${index + 1}" rows="4" placeholder="Write your answer here..."></textarea>
            </div>
            `).join('\n')}
        </div>
        
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <!-- Page 8: Grammar/Language -->
    <div class="lesson-page" id="page8" style="display: none;">
        <div class="page-header">
            <h2>✏️ ${glContent.type === 'grammar' ? 'Grammar' : 'Language Skills'}</h2>
            <p>Week ${info.weekNum} Focus: ${glContent.title}</p>
        </div>
        <div class="${glContent.type === 'grammar' ? 'grammar' : 'language'}-section">
            <div class="skill-explanation">
                <h3>📚 What You're Learning:</h3>
                <p>${glContent.explanation}</p>
            </div>
            
            <div class="skill-examples">
                <h3>✨ Examples:</h3>
                ${glContent.examples.map(ex => `<p class="language-example">${ex}</p>`).join('\n')}
            </div>
            
            <div class="skill-practice">
                <h3>🎯 Your Turn:</h3>
                ${glContent.exercises.map((ex, index) => `
                <div class="practice-item">
                    <p><strong>${index + 1}.</strong> ${ex.prompt}</p>
                    <textarea id="grammar${index + 1}" rows="3" placeholder="Write your answer here..."></textarea>
                </div>
                `).join('\n')}
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <!-- Page 9: Writing/Journal -->
    <div class="lesson-page" id="page9" style="display: none;">
        <div class="page-header">
            <h2>✍️ ${wjPrompt.type === 'writing' ? 'Writing Skills' : 'Journal Reflection'}</h2>
            ${wjPrompt.type === 'writing' ? `<p>Standard: ${wjPrompt.standard}</p>` : '<p>Personal Response</p>'}
        </div>
        <div class="writing-section">
            <div class="writing-prompt">
                <h3>📝 Your Prompt:</h3>
                <p>${wjPrompt.prompt}</p>
            </div>
            <div class="writing-space">
                <textarea id="writing-response" rows="12" placeholder="Write your response here..."></textarea>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Finish Lesson →</button>
        </div>
    </div>

    <!-- Page 10: Completion -->
    <div class="lesson-page" id="page10" style="display: none;">
        <div class="page-header">
            <h2>🎉 Lesson Complete!</h2>
            <p>Day ${dayNum} - Chapter ${info.chapterNum}: ${chapter.title}</p>
        </div>
        <div class="completion-section">
            <h3>Great work today!</h3>
            <p>You've completed:</p>
            <ul>
                <li>✅ Learned 3 new vocabulary words</li>
                <li>✅ Read Chapter ${info.chapterNum} of Dracula</li>
                <li>✅ Answered comprehension questions</li>
                <li>✅ Explored informational text about ${infoText.title.toLowerCase()}</li>
                <li>✅ Practiced ${glContent.type === 'grammar' ? 'grammar' : 'language'} skills</li>
                <li>✅ Completed ${wjPrompt.type === 'writing' ? 'writing exercise' : 'journal reflection'}</li>
            </ul>
            <p class="next-lesson-note">📚 Tomorrow: Chapter ${info.chapterNum + 1} awaits!</p>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
        </div>
    </div>

    <script src="js/lesson-viewer.js?v=${Date.now()}"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=${Date.now()}"></script>
    <script src="js/lesson-autosave.js?v=${Date.now()}"></script>
    <script>
        const lesson${dayNum}Config = {
            lessonId: '5th-grade-day-${dayNum}',
            gradeLevel: '5th-grade',
            title: 'Lesson ${dayNum} - 5th Grade',
            pages: [] // Populated by lesson-viewer.js
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${dayNum}Config);
        }
    </script>
</body>
</html>`;
    
    return html;
}

// Generate assessment day (every 5th day)
function generateAssessmentDay(dayNum) {
    const info = getDayInfo(dayNum);
    
    // Collect the 12 vocabulary words from this week
    const weekStartDay = ((dayNum - 79) - 4);
    const weekChapters = [1, 2, 3, 4].map(i => weekStartDay + i);
    const weekVocab = [];
    weekChapters.forEach(chapterNum => {
        if (vocabularyData[chapterNum]) {
            weekVocab.push(...vocabularyData[chapterNum]);
        }
    });
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5th Grade - Day ${dayNum}: Week ${info.weekNum} Assessment</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
</head>
<body>
    <!-- Page 1: Title -->
    <div class="lesson-page" id="page1">
        <div class="page-header">
            <h1>Day ${dayNum} - Week ${info.weekNum}</h1>
            <h2>Dracula - Weekly Assessment</h2>
        </div>
        <div class="assessment-title">
            <h1>📝 Week ${info.weekNum} Assessment</h1>
            <p class="subtitle">Chapters ${weekStartDay + 1}-${weekStartDay + 4}</p>
            <p>Today you'll show what you've learned this week!</p>
        </div>
        <div class="assessment-sections">
            <h3>What's on today's assessment:</h3>
            <ul>
                <li>📚 Vocabulary Quiz (12 words)</li>
                <li>✏️ Grammar & Language Review</li>
                <li>📖 Reading Comprehension Review</li>
                <li>✍️ Writing Prompt</li>
            </ul>
        </div>
        <button class="btn-next" onclick="nextPage()">Begin Assessment →</button>
    </div>

    <!-- Page 2-3: Vocabulary Quiz -->
    <div class="lesson-page" id="page2" style="display: none;">
        <div class="page-header">
            <h2>📖 Vocabulary Quiz</h2>
            <p>Part 1: Words 1-6</p>
        </div>
        <div class="vocab-quiz-section">
            <h3>Match each word to its definition or use it in a sentence</h3>
            ${weekVocab.slice(0, 6).map((word, index) => `
            <div class="quiz-item">
                <h4>${index + 1}. ${word.word}</h4>
                <p><strong>Write the definition:</strong></p>
                <textarea id="vocab-quiz-${index + 1}" rows="2" placeholder="Type the definition..."></textarea>
            </div>
            `).join('\n')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <div class="lesson-page" id="page3" style="display: none;">
        <div class="page-header">
            <h2>📖 Vocabulary Quiz</h2>
            <p>Part 2: Words 7-12</p>
        </div>
        <div class="vocab-quiz-section">
            ${weekVocab.slice(6, 12).map((word, index) => `
            <div class="quiz-item">
                <h4>${index + 7}. ${word.word}</h4>
                <p><strong>Write the definition:</strong></p>
                <textarea id="vocab-quiz-${index + 7}" rows="2" placeholder="Type the definition..."></textarea>
            </div>
            `).join('\n')}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <!-- Page 4: Grammar/Language Review -->
    <div class="lesson-page" id="page4" style="display: none;">
        <div class="page-header">
            <h2>✏️ Grammar & Language Review</h2>
            <p>This Week's Skills</p>
        </div>
        <div class="review-section">
            <h3>Answer these questions about this week's grammar and language lessons:</h3>
            
            <div class="quiz-item">
                <p><strong>1.</strong> Write a complex sentence about this week's chapters using a subordinating conjunction (because, although, when, if, etc.):</p>
                <textarea id="grammar-1" rows="3" placeholder="Write your sentence here..."></textarea>
            </div>
            
            <div class="quiz-item">
                <p><strong>2.</strong> Explain what context clues are and give an example from this week's reading:</p>
                <textarea id="grammar-2" rows="3" placeholder="Write your explanation..."></textarea>
            </div>
            
            <div class="quiz-item">
                <p><strong>3.</strong> Write a sentence with a dependent clause BEFORE an independent clause (requiring a comma):</p>
                <textarea id="grammar-3" rows="3" placeholder="Write your sentence here..."></textarea>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>

    <!-- Page 5: Comprehension Review -->
    <div class="lesson-page" id="page5" style="display: none;">
        <div class="page-header">
            <h2>📖 Reading Comprehension Review</h2>
            <p>Chapters ${weekStartDay + 1}-${weekStartDay + 4}</p>
        </div>
        <div class="review-section">
            <h3>Answer these questions about this week's chapters:</h3>
            
            <div class="quiz-item">
                <p><strong>1.</strong> What are three important events that happened in this week's chapters? Summarize them briefly:</p>
                <textarea id="comp-review-1" rows="4" placeholder="Write your answer here..."></textarea>
            </div>
            
            <div class="quiz-item">
                <p><strong>2.</strong> Choose one character from this week's reading. How did they change or what did they learn?</p>
                <textarea id="comp-review-2" rows="4" placeholder="Write your answer here..."></textarea>
            </div>
            
            <div class="quiz-item">
                <p><strong>3.</strong> What do you think was the most important moment in this week's chapters? Why?</p>
                <textarea id="comp-review-3" rows="4" placeholder="Write your answer here..."></textarea>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue to Writing →</button>
        </div>
    </div>

    <!-- Page 6: Writing Prompt -->
    <div class="lesson-page" id="page6" style="display: none;">
        <div class="page-header">
            <h2>✍️ Writing Prompt</h2>
            <p>Show your understanding through writing</p>
        </div>
        <div class="writing-section">
            <div class="writing-prompt">
                <h3>📝 Your Prompt:</h3>
                <p>This week, you read about characters facing difficult and frightening situations. Choose one character and write 2-3 paragraphs about how they showed courage or made an important decision. Use specific examples from the text and explain why their actions were significant.</p>
            </div>
            <div class="writing-space">
                <textarea id="writing-response" rows="15" placeholder="Write your response here..."></textarea>
            </div>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Finish Assessment →</button>
        </div>
    </div>

    <!-- Page 7: Completion -->
    <div class="lesson-page" id="page7" style="display: none;">
        <div class="page-header">
            <h2>🎉 Assessment Complete!</h2>
            <p>Week ${info.weekNum} - Days ${dayNum - 4} through ${dayNum}</p>
        </div>
        <div class="completion-section">
            <h3>Excellent work this week!</h3>
            <p>You've completed Week ${info.weekNum} of Dracula:</p>
            <ul>
                <li>✅ Learned 12 new vocabulary words</li>
                <li>✅ Read Chapters ${weekStartDay + 1}-${weekStartDay + 4}</li>
                <li>✅ Explored grammar and language skills</li>
                <li>✅ Connected the story to real history and culture</li>
                <li>✅ Completed weekly assessment</li>
            </ul>
            <p class="next-lesson-note">📚 Next week: The story continues with Chapter ${weekStartDay + 5}!</p>
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
        </div>
    </div>

    <script src="js/lesson-viewer.js?v=${Date.now()}"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=${Date.now()}"></script>
    <script src="js/lesson-autosave.js?v=${Date.now()}"></script>
    <script>
        const lesson${dayNum}Config = {
            lessonId: '5th-grade-day-${dayNum}',
            gradeLevel: '5th-grade',
            title: 'Lesson ${dayNum} - 5th Grade Assessment',
            pages: []
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${dayNum}Config);
        }
    </script>
</body>
</html>`;
    
    return html;
}

// Generate all lessons (Days 79-98)
console.log('🧛 Generating Dracula lessons (Days 79-98)...\n');

for (let day = 79; day <= 98; day++) {
    const info = getDayInfo(day);
    let html;
    
    if (info.isAssessment) {
        console.log(`📝 Day ${day}: Week ${info.weekNum} Assessment`);
        html = generateAssessmentDay(day);
    } else {
        console.log(`📖 Day ${day}: Chapter ${info.chapterNum} - ${chapters[info.chapterNum].title}`);
        html = generateRegularDay(day);
    }
    
    const filename = path.join(__dirname, `../../../5th-grade-day-${day}.html`);
    fs.writeFileSync(filename, html, 'utf8');
}

console.log('\n✅ All 20 Dracula lessons generated!');
console.log('📁 Files: 5th-grade-day-79.html through 5th-grade-day-98.html');
