#!/usr/bin/env python3
"""Build Frankenstein lessons (Days 159-178) for 5th grade BedrockELA."""

import json, re, os, random

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-"

# Load vocab data
fdata = json.load(open(f"{BASE}/frankenstein-data.json"))

# Parse story
text = open(f"{BASE}/frankenstein-full.txt").read()
parts = re.split(r'\n(Chapter \d+: [^\n]+)\n', text)
chapters = {}
for i in range(1, len(parts)-1, 2):
    header = parts[i]
    m = re.match(r'Chapter (\d+): (.+)', header)
    ch_num = int(m.group(1))
    title = m.group(2).strip()
    body = [l.strip() for l in parts[i+1].strip().split('\n') if l.strip()]
    chapters[ch_num] = {'title': title, 'body': body}

# Comprehension questions (written from story content)
questions = {
    1: [
        "Robert Walton is writing letters from the Arctic when he discovers Victor Frankenstein on the ice. What drives Walton to explore such a dangerous place? How is his ambition similar to Victor's?",
        "Victor is described as near death when Walton finds him. Why do you think Victor was out on the ice alone? What does this tell us about what has happened to him?",
        "Walton says he has always dreamed of reaching the North Pole. What does it mean to pursue a dream even when it puts you in danger? Is that courage or recklessness?"
    ],
    2: [
        "Victor describes his childhood in Geneva as happy and loving. How does knowing this make his later story more tragic? Why do authors show us happiness before showing suffering?",
        "Victor becomes fascinated with old books about alchemy and the secrets of life. What is it about forbidden knowledge that attracts people? Have you ever wanted to learn something others said you shouldn't?",
        "Victor's parents are described as kind and generous. How do you think his upbringing shaped the person he became — both the good and the dangerous parts?"
    ],
    3: [
        "Victor's mother dies just before he leaves for university. How does this loss drive his later obsession with creating life? What connection do you see between grief and ambition?",
        "At university, Victor discovers modern science and becomes consumed by the idea of conquering death. Why is the desire to overcome death so powerful — and so dangerous?",
        "Victor's professor warns that knowledge must be pursued responsibly. Do you think there are things humans shouldn't try to learn or create? Where should the line be drawn?"
    ],
    4: [
        "Victor works alone in secret for months, cutting himself off from family and friends. Why does he feel he needs to keep his work hidden? What does secrecy do to a person over time?",
        "The chapter describes Victor collecting body parts from graveyards and slaughterhouses. At what point do you think Victor crossed a moral line? Did he realize it at the time?",
        "Victor is described as obsessed — unable to stop even when he knows something is wrong. How is obsession different from dedication? When does passion become dangerous?"
    ],
    5: [
        "When the Creature opens its eyes, Victor is immediately horrified and runs away. Why does Victor react this way to something he worked so hard to create? What did he expect?",
        "The Creature reaches out to Victor, and Victor flees in terror. How might the story have been different if Victor had stayed? What responsibility does a creator have to their creation?",
        "Victor falls ill with fever after the Creature comes to life. What does his physical collapse tell us about his mental and emotional state? How are guilt and fear connected to physical health?"
    ],
    6: [
        "Victor receives letters from home that remind him of his normal life. Why is the contrast between his dark secret and his family's warmth so painful for him?",
        "Elizabeth's letter is full of love and ordinary news. How does reading about normal, happy life feel when you're carrying a terrible secret? Have you ever felt unable to share something important?",
        "Victor tries to pretend everything is fine. Why do people hide their problems from the people who love them most? Is Victor protecting his family or protecting himself?"
    ],
    7: [
        "Victor's young brother William is murdered, and Victor immediately suspects the Creature. What does it feel like to know something terrible but have no way to prove it?",
        "Victor sees the Creature near the scene of the crime but says nothing. Why does he stay silent? What are the consequences of his silence?",
        "Victor is devastated by the news but also consumed by guilt. How is guilt different from grief? Can a person feel responsible for something they didn't directly do?"
    ],
    8: [
        "Justine, an innocent servant, is blamed and put on trial for William's murder. Victor knows she is innocent but doesn't speak up. Why not? What would you have done?",
        "Justine is convicted based on false evidence. What does this tell us about how justice systems can fail? Why is it so dangerous to convict someone based on circumstantial evidence?",
        "Victor watches an innocent person be condemned for something his creation did. How does this deepen his responsibility? At this point, is Victor more victim or more villain?"
    ],
    9: [
        "After Justine's death, Victor falls into deep despair and isolation. How does guilt change a person? Why does Victor withdraw instead of taking action?",
        "Victor goes to the mountains seeking peace but finds none. Why can't nature heal what he's feeling? What is it about moral guilt that makes it so hard to escape?",
        "Victor considers telling the truth but decides no one would believe him. Is that a real reason or an excuse? What would actually happen if he told someone?"
    ],
    10: [
        "The Creature finds Victor and tells his own story — of waking up alone, confused, and afraid. How does hearing the Creature's perspective change how you feel about him?",
        "The Creature describes being attacked by every person who sees him, despite meaning no harm. What does this tell us about how people judge others based on appearance?",
        "The Creature learned language and kindness by secretly watching a family. What is it like to observe love and belonging from the outside, knowing you can never be part of it?"
    ],
    11: [
        "The Creature asks Victor to create a companion — someone like him who won't be afraid. Is this a reasonable request? Does the Creature have a right to companionship?",
        "The Creature says his violence came from loneliness and rejection, not from evil. Do you believe him? Can suffering and isolation actually turn someone toward cruelty?",
        "The Creature promises to disappear forever if Victor grants his request. Should Victor trust this promise? What would you do in Victor's position?"
    ],
    12: [
        "Victor reluctantly agrees to create a second creature. Why does he agree even though he's terrified? Is he motivated by compassion, guilt, or fear?",
        "Victor dreads the work ahead of him. How is this different from his first creation, when he was excited and obsessed? What has changed in Victor?",
        "The chapter explores the idea of making a terrible promise to prevent something worse. Is it ever right to do something wrong to avoid a greater evil?"
    ],
    13: [
        "Victor travels to gather materials but is filled with doubt the entire time. How does doubt affect the quality of someone's work and decisions?",
        "Victor worries about the consequences of creating a second creature. What specific fears does he have? Are they reasonable?",
        "Victor's conscience wars with his promise. When a promise leads to something you believe is wrong, should you keep it or break it?"
    ],
    14: [
        "Victor destroys the second creature before finishing it, breaking his promise. Was this the right decision? What were the costs either way?",
        "The Creature witnesses Victor destroying his companion and is consumed with rage. Can you understand the Creature's reaction even if you disagree with what he does next?",
        "The Creature says 'I will be with you on your wedding night.' Why does he choose this specific threat? What does it reveal about what the Creature understands about love and loss?"
    ],
    15: [
        "Victor's friend Henry Clerval is murdered by the Creature. How does the Creature's strategy of targeting loved ones make Victor suffer more than a direct attack would?",
        "Victor is accused of Henry's murder and nearly loses his mind. How has Victor's own creation systematically destroyed his life? Is this justice, revenge, or something else?",
        "Victor is eventually cleared but is broken in body and spirit. At what point did Victor lose the ability to stop what was happening? Could he ever have prevented this?"
    ],
    16: [
        "Victor marries Elizabeth despite the Creature's threat. Why does he go through with the wedding? Is this bravery or denial?",
        "Victor prepares for the Creature's attack but looks in the wrong direction. What does this mistake reveal about Victor's understanding of the Creature?",
        "Elizabeth is killed on their wedding night. The Creature took from Victor exactly what Victor took from him — a companion. Is there a dark symmetry in this? Does understanding the pattern make it more or less tragic?"
    ],
    17: [
        "Victor vows vengeance and begins hunting the Creature across the world. How has Victor become a mirror of the Creature — consumed by a single purpose and willing to suffer for it?",
        "The hunter becomes the hunted and the hunted becomes the hunter. How have Victor and the Creature's roles reversed since the beginning of the story?",
        "Victor pursues the Creature into the Arctic ice. Why does the story end where it began — in the frozen North? What does the ice represent?"
    ],
    18: [
        "Victor is found near death on the ice by Walton's ship. His body is broken but his determination to destroy the Creature remains. Is this dedication or madness?",
        "Victor has lost everything — family, friends, health, happiness — all because of one decision he made as a young man. What lesson does his life teach about the relationship between ambition and responsibility?",
        "Victor is adrift on the ice, much like his life has been adrift since creating the Creature. How does the physical setting mirror Victor's emotional and moral state?"
    ],
    19: [
        "Victor tells Walton his story as a warning. What exactly is he warning Walton about? Is it about science, ambition, playing God, or something else?",
        "Victor says he was not wrong to seek knowledge, but wrong in how he used it. Do you agree with this distinction? Is the pursuit of knowledge ever wrong in itself?",
        "Victor dies aboard Walton's ship. Do you feel sympathy for him at the end? Has he paid enough for what he did, or can some mistakes never be fully paid for?"
    ],
    20: [
        "The Creature appears over Victor's body and expresses genuine grief. How can the Creature mourn the person who rejected him and whom he spent years tormenting?",
        "The Creature says he will end his own life now that Victor is gone. Why does Victor's death take away the Creature's reason to live? What does this say about the bond between creator and creation?",
        "Think about the entire book: Who is the real monster — Victor or the Creature? Or is the answer more complicated than that? Use evidence from at least two chapters to support your answer."
    ],
}

chapter_titles = {i: chapters[i]['title'] for i in chapters}

# Days 159-178: 20 days, assessments at 160, 165, 170, 175 (every 5th global day)
# Wait - need to check global assessment pattern
# Global: every 5th day is assessment: 5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,...
# 160 is assessment, 165 is assessment, 170 is assessment, 175 is assessment
# Regular: 159,161,162,163,164, 166,167,168,169, 171,172,173,174, 176,177,178
# That's 16 regular + 4 assessment = 20

regular_days = [159, 161,162,163,164, 166,167,168,169, 171,172,173,174, 176,177,178]
assessment_days = [160, 165, 170, 175]

# But wait - 159 is NOT preceded by an assessment in its week
# Let me recalculate: Days 156,157,158,159,160 = week. 160 is assessment.
# 161,162,163,164,165 = week. 165 is assessment.
# etc. So regular days per week: 4 + 4 + 4 + 4 = 16 regular, need only 16 chapters
# But we have 20 chapters and only 16 regular days + 4 assessments = 20 days
# We need to fit 20 chapters into 16 regular days. Some days get 2 shorter chapters combined?
# OR: re-check - Frankenstein was Days 159-178. That's 20 days.
# Assessment days globally: 160, 165, 170, 175
# Regular: 159, 161,162,163,164, 166,167,168,169, 171,172,173,174, 176,177,178 = 17 days
# Hmm 159 + 4+4+4+4 = 17 regular, only 3 assessment? Let me count:
# Week: 156-160 (160=assess), 161-165 (165=assess), 166-170 (170=assess), 171-175 (175=assess)
# But 159 is in the 156-160 week, and days 156-158 are Norse.
# So from Frankenstein: Day 159 (regular), 160 (assess)
#   161,162,163,164 (regular), 165 (assess)
#   166,167,168,169 (regular), 170 (assess)
#   171,172,173,174 (regular), 175 (assess)
#   176,177,178 (regular)
# That's: 1 + 4 + 4 + 4 + 3 = 16 regular days, 4 assessments = 20 total
# 16 regular days for 20 chapters - need to double up some days or cut 4 chapters

# Let's combine: some days get 2 short chapters. Chapters 17-20 are the ending and shorter.
# Actually let's just use 16 chapters (1-16) for regular days, and fold 17-20 content into later days
# OR: better - use all 20, with some days covering 2 chapters (the shorter ones)

# Simplest: map ch 1-16 to 16 regular days, skip ch 17-20 OR combine
# Let me combine: days with 2 chapters: day 176 (ch17+18), day 177 (ch19+20), day 178 gets a review
# Actually easier: 16 regular days = 16 chapters + 4 assessment days with the remaining 4 chapters as reading-during-assessment

# Cleanest approach: pair some chapters
# Regular days get 1 chapter each for ch 1-13 (13 chapters for first 13 regular days)
# Then combine: day 14 gets ch14+15, day 15 gets ch16+17, day 16 gets ch18+19+20
# Nah that's messy.

# Better: just use chapters 1-16 for 16 regular days. The last 4 chapters (17-20) 
# can be bonus reading or we add them as extra reading pages on assessment days.
# Actually cleanest: chapters 1-16, and write the assessment to include summary of 17-20.

# SIMPLEST: Map 20 chapters to 16 regular days by combining the last few
# Days: 159(ch1), 161(ch2), 162(ch3), 163(ch4), 164(ch5), 
#        166(ch6), 167(ch7), 168(ch8), 169(ch9),
#        171(ch10), 172(ch11), 173(ch12), 174(ch13),
#        176(ch14+15), 177(ch16+17), 178(ch18+19+20)
# That works! Later days cover more ground as the story accelerates.

day_to_chapters = {
    159: [1], 161: [2], 162: [3], 163: [4], 164: [5],
    166: [6], 167: [7], 168: [8], 169: [9],
    171: [10], 172: [11], 173: [12], 174: [13],
    176: [14, 15], 177: [16, 17], 178: [18, 19, 20]
}

def escape_html(s):
    return s.replace("'", "\\'").replace('"', '&quot;').replace('`', '\\`').replace('${', '\\${').replace('</script>', '<\\/script>')

def split_story_4pages(body_lines):
    if len(body_lines) < 4:
        while len(body_lines) < 4:
            body_lines.append('')
    total = sum(len(l) for l in body_lines)
    target = total / 4
    parts_list = []
    current = []
    current_len = 0
    for line in body_lines:
        current.append(line)
        current_len += len(line)
        if current_len >= target and len(parts_list) < 3:
            parts_list.append(current)
            current = []
            current_len = 0
    if current:
        if len(parts_list) < 4: parts_list.append(current)
        else: parts_list[-1].extend(current)
    while len(parts_list) < 4: parts_list.append([''])
    return parts_list[:4]

def make_vocab_game(words):
    random.seed(len(words))
    word_divs = []
    def_divs = []
    for w in words:
        word_divs.append(f'<div class="match-word" data-word="{escape_html(w["word"])}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">{escape_html(w["word"])}</div>')
        def_divs.append(f'<div class="match-def" data-word="{escape_html(w["word"])}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">{escape_html(w["definition"])}</div>')
    indices = list(range(len(def_divs)))
    random.shuffle(indices)
    shuffled = [def_divs[i] for i in indices]
    return word_divs, shuffled

def build_lesson(day, ch_list, week_num, cumulative_vocab):
    # Combine chapters if multiple
    all_body = []
    all_questions = []
    ch_titles = []
    day_vocab = []
    for ch in ch_list:
        c = chapters.get(ch, {'title': f'Ch {ch}', 'body': []})
        all_body.extend(c['body'])
        all_questions.extend(questions.get(ch, [])[:3])
        ch_titles.append(c['title'])
        day_vocab.extend(fdata['vocab'].get(str(ch), []))
    
    display_title = ' / '.join(ch_titles) if len(ch_titles) <= 2 else ch_titles[0] + ' – ' + ch_titles[-1]
    story_parts = split_story_4pages(all_body)
    use_questions = all_questions[:3]
    use_vocab = day_vocab[:3]  # max 3 vocab words per day
    
    # Highlight vocab
    def highlight(t):
        for w in use_vocab:
            t = re.sub(rf'\b({re.escape(w["word"])})\b', r'<span class="vocab-highlight">\1</span>', t, flags=re.IGNORECASE)
        return t

    # Build pages
    pages = []
    
    # Title
    pages.append(f'''                {{
                    render: () => `
<div class="lesson-page-card title-page">
                            <h1>Lesson {day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">Frankenstein</p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">{escape_html(display_title)}</p>
                        </div>
                    `
                }}''')
    
    # Welcome
    pages.append(f'''                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson {day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read <em>{escape_html(display_title)}</em></li>
                                <li>Learn {len(use_vocab)} new vocabulary words</li>
                                <li>Answer reading comprehension questions</li>
                                <li>Write a journal response</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    `
                }}''')
    
    # Vocab write
    vcards = []
    for j, w in enumerate(use_vocab):
        vcards.append(f'''<div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                    <div style="margin-bottom: 12px;"><span style="font-size: 28px; font-weight: 800; color: #305853;">{escape_html(w["word"])}</span></div>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Look up this word in a dictionary, then write the definition in your own words:</p>
                                    <textarea id="vocab-{j+1}" style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;" oninput="updateWordCount('vocab-{j+1}', 'vocab-count-{j+1}', 10)" onpaste="return false" placeholder="Type the definition here (minimum 10 words, no pasting)..."><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; margin-top: 8px;"><span id="vocab-count-{j+1}" style="font-size: 13px; color: #666;">0 / 10 words</span><span id="vocab-count-{j+1}-status" style="font-size: 13px; font-weight: 600;"></span></div>
                                </div>''')
    
    pages.append(f'''                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            <div style="margin: 30px 0;">{"".join(vcards)}</div>
                            <div style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;"><p style="margin: 0;"><strong>Watch for these words</strong> in today\\'s reading!</p></div>
                        </div>
                    `
                }}''')
    
    # Vocab game (cumulative)
    word_divs, def_divs = make_vocab_game(cumulative_vocab)
    pages.append(f'''                {{
                    render: () => `<div class="lesson-page-card content-page">
                            <h2>🎮 Vocabulary Game</h2>
                            <p style="color: #666; margin-bottom: 5px;">Match each word to its definition! ({len(cumulative_vocab)} words this week so far)</p>
                            <p style="color: #305853; font-weight: 600; margin-bottom: 20px;">Score: <span id="gameScore">0</span> / {len(cumulative_vocab)}</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto;">
                                <div id="wordColumn" style="display: flex; flex-direction: column;">
                                    <h3 style="text-align: center; color: #305853; margin-bottom: 10px;">Words</h3>
                                    {"".join(word_divs)}
                                </div>
                                <div id="defColumn" style="display: flex; flex-direction: column;">
                                    <h3 style="text-align: center; color: #8B4513; margin-bottom: 10px;">Definitions</h3>
                                    {"".join(def_divs)}
                                </div>
                            </div>
                            <div id="gameFeedback" style="margin-top: 20px; padding: 15px; border-radius: 10px; text-align: center; display: none;"></div>
                        </div>`
                ,
                    onLoad: () => {{ if(window.initVocabGame) window.initVocabGame(); }}
                }}''')
    
    # Story pages (4)
    for i, part in enumerate(story_parts):
        paras = '\n'.join(f'<p>{highlight(escape_html(p))}</p>' for p in part if p.strip())
        pages.append(f'''                {{
                    render: () => `<div class="lesson-page-card content-page">
      <div class="page-header">
        <div class="lesson-number">Day {day} • Week {week_num}</div>
        <div class="unit-label">{escape_html(display_title)} • Part {i+1} of 4</div>
      </div>
      <div class="story-text">{paras}</div>
    </div>`
                }}''')
    
    # Comprehension (1 per page)
    for qi, q in enumerate(use_questions):
        pages.append(f'''                {{
                    render: () => `
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 30px;">Question {qi+1} of {len(use_questions)}</p>
                            <div style="margin: 30px 0;">
                                <div style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #8B4513;">
                                    <p style="font-weight: 600; margin-bottom: 12px;">Question {qi+1}:</p>
                                    <p style="margin-bottom: 12px; color: #444;">{escape_html(q)}</p>
                                    <textarea id="comp-{qi+1}" style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;" oninput="updateWordCount('comp-{qi+1}', 'word-count-comp-{qi+1}', 50)" placeholder="Write your answer here (minimum 50 words)..."><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;"><span id="word-count-comp-{qi+1}" style="font-size: 14px; color: #666;">0 / 50 words</span><span id="word-count-comp-{qi+1}-status" style="font-size: 14px; font-weight: 600;"></span></div>
                                </div>
                            </div>
                        </div>
                    `
                }}''')
    
    # Journal
    pages.append(f'''                {{
                    render: () => `<div class="lesson-page-card content-page">
      <div class="page-header">
        <div class="lesson-number">Day {day} • Week {week_num}</div>
        <div class="unit-label">Journal Response</div>
      </div>
      <h2>✍️ Your Response</h2>
      <div style="margin: 20px 0;">
        <p><strong>Choose one:</strong></p>
        <ul style="line-height: 2;">
          <li>Which character in today\\'s reading do you sympathize with most — and why?</li>
          <li>What moral question does this chapter raise? What would you have done differently?</li>
          <li>Connect something from this chapter to your own life or to another story you know.</li>
        </ul>
      </div>
      <textarea style="width: 100%; min-height: 150px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;" placeholder="Write your response here (minimum 50 words)..." id="journal" oninput="updateWordCount('journal', 'journal-wc', 50)"><\\/textarea>
      <span id="journal-wc" style="font-size: 14px; color: #666;">0 / 50 words</span>
    </div>`
                }}''')
    
    # Completion
    pages.append(f'''                {{
                    render: () => `<div class="lesson-page-card completion-page">
      <div class="completion-container">
        <div class="completion-icon">🎉</div>
        <h1>Day {day} Complete!</h1>
        <p class="completion-message">Great work on \\"{escape_html(display_title)}\\"!</p>
        <div class="completion-stats">
          <div class="stat-item"><div class="stat-number">{len(use_vocab)}</div><div class="stat-label">New Words</div></div>
          <div class="stat-item"><div class="stat-number">{len(ch_list)}</div><div class="stat-label">Chapter{"s" if len(ch_list)>1 else ""} Read</div></div>
          <div class="stat-item"><div class="stat-number">{len(use_questions)}</div><div class="stat-label">Questions</div></div>
        </div>
        <button class="completion-button" onclick="markComplete()">Mark Complete &amp; Save Progress</button>
        <div class="completion-footer"><button class="nav-button prev-button" onclick="prevPage()">← Review Lesson</button></div>
      </div>
    </div>`
                }}''')
    
    pages_str = ',\n'.join(pages)
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day {day}: {display_title}</title>
    <link rel="stylesheet" href="../../../css/lesson-viewer.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>
    <script src="../../../js/lesson-viewer.js"><\\/script>
    <script src="../../../firebase-config.js"><\\/script>
    <script src="../../../js/lesson-completion.js"><\\/script>
    <script src="../../../js/lesson-autosave.js"><\\/script>
    <script src="../../../js/save-button-injector.js"><\\/script>
    <script src="../../../js/answer-validation.js"><\\/script>
    <script src="../../../js/grade-normalizer.js"><\\/script>
    <script src="../../../js/offline-sync.js"><\\/script>
    <script src="../../../js/text-to-speech.js"><\\/script>
    <script src="../../../js/digital-book.js"><\\/script>
    <script>
        const lesson{day}Config = {{
            lessonId: '5th-grade-lesson-{day}',
            gradeLevel: '5th-grade',
            title: 'Day {day}: {escape_html(display_title)}',
            pages: [
{pages_str}
            ]
        }};
        window.addEventListener('DOMContentLoaded', () => {{
            createLessonViewer('lesson-container', lesson{day}Config);
        }});
    <\\/script>
</body>
</html>'''

def build_assessment(day, week_num, week_vocab):
    quiz_items = []
    for i, w in enumerate(week_vocab):
        quiz_items.append(f'''<div style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 10px;">
                                <p style="font-weight: 600; margin-bottom: 8px;">{i+1}. {escape_html(w["word"])}</p>
                                <textarea id="quiz-{i+1}" style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;" placeholder="Write the definition..."><\\/textarea>
                            </div>''')
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5th Grade - Day {day}: Weekly Assessment</title>
    <link rel="stylesheet" href="../../../css/lesson-viewer.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>
    <script src="../../../js/lesson-viewer.js"><\\/script>
    <script src="../../../firebase-config.js"><\\/script>
    <script src="../../../js/lesson-completion.js"><\\/script>
    <script src="../../../js/lesson-autosave.js"><\\/script>
    <script src="../../../js/save-button-injector.js"><\\/script>
    <script src="../../../js/answer-validation.js"><\\/script>
    <script src="../../../js/grade-normalizer.js"><\\/script>
    <script src="../../../js/offline-sync.js"><\\/script>
    <script src="../../../js/text-to-speech.js"><\\/script>
    <script src="../../../js/digital-book.js"><\\/script>
    <script>
        const lesson{day}Config = {{
            lessonId: '5th-grade-lesson-{day}',
            gradeLevel: '5th-grade',
            title: 'Day {day}: Week {week_num} Assessment',
            pages: [
                {{
                    render: () => `
<div class="lesson-page-card title-page">
                            <h1>Day {day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">Frankenstein</p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">Week {week_num} Assessment</p>
                        </div>
                    `
                }},
                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>📝 Vocabulary Quiz</h2>
                            <p style="margin-bottom: 20px;">Write the definition for each word from this week\\'s reading ({len(week_vocab)} words):</p>
                            <div style="margin: 20px 0;">{"".join(quiz_items)}</div>
                        </div>
                    `
                }},
                {{
                    render: () => `<div class="lesson-page-card completion-page">
      <div class="completion-container">
        <div class="completion-icon">⭐</div>
        <h1>Assessment Complete!</h1>
        <p class="completion-message">Great job on the Week {week_num} assessment!</p>
        <div class="completion-stats"><div class="stat-item"><div class="stat-number">{len(week_vocab)}</div><div class="stat-label">Words Reviewed</div></div></div>
        <button class="completion-button" onclick="markComplete()">Mark Complete &amp; Save Progress</button>
        <div class="completion-footer"><button class="nav-button prev-button" onclick="prevPage()">← Review</button></div>
      </div>
    </div>`
                }}
            ]
        }};
        window.addEventListener('DOMContentLoaded', () => {{
            createLessonViewer('lesson-container', lesson{day}Config);
        }});
    <\\/script>
</body>
</html>'''

# Build all lessons
outdir = f"{BASE}/curriculum/grade5/frankenstein"
os.makedirs(outdir, exist_ok=True)

# Track cumulative vocab per week
week_vocab_tracker = {}
count = 0

for day in sorted(day_to_chapters.keys()):
    week_num = ((day - 1) // 5) + 1
    ch_list = day_to_chapters[day]
    
    # Get this day's vocab
    day_vocab = []
    for ch in ch_list:
        day_vocab.extend(fdata['vocab'].get(str(ch), []))
    day_vocab = day_vocab[:3]
    
    # Track for assessment
    if week_num not in week_vocab_tracker:
        week_vocab_tracker[week_num] = []
    week_vocab_tracker[week_num].extend(day_vocab)
    
    # Cumulative vocab for game
    cumulative = week_vocab_tracker[week_num][:]
    
    html = build_lesson(day, ch_list, week_num, cumulative)
    open(f"{outdir}/5th-grade-lesson-{day}.html", 'w').write(html)
    chs = '+'.join(str(c) for c in ch_list)
    print(f"Day {day}: ✅ Ch.{chs} - {', '.join(chapters[c]['title'] for c in ch_list)}")
    count += 1

# Build assessments
for day in assessment_days:
    week_num = ((day - 1) // 5) + 1
    wv = week_vocab_tracker.get(week_num, [])
    html = build_assessment(day, week_num, wv)
    open(f"{outdir}/5th-grade-lesson-{day}.html", 'w').write(html)
    print(f"Day {day}: ✅ Assessment (Week {week_num}, {len(wv)} vocab words)")
    count += 1

print(f"\nBuilt {count} Frankenstein lessons!")
