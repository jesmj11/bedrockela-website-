#!/usr/bin/env python3
"""Build ALL 5th grade assessments (every 5th day) with:
1. Vocab matching game (12 words from the week)
2. Grammar/language test
3. Compare/contrast writing assignment
"""

import json, re, os, glob, random

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-"

# 12 grammar skills that rotate
SKILLS = [
    {
        "name": "Complex Sentences",
        "desc": "A complex sentence combines an independent clause (complete thought) with a dependent clause (incomplete thought) using words like <em>because, although, while, when, if, since</em>.",
        "example": "Although Robin was outnumbered, he refused to surrender.",
        "questions": [
            ("Combine these two sentences into one complex sentence using a connecting word (because, although, when, while, if, since):", "The knight drew his sword. He saw danger approaching."),
            ("Identify the dependent clause in this sentence:", "Because the creature was alone, he became angry and desperate."),
            ("Write your own complex sentence about something that happened in this week's reading. Underline the dependent clause.", ""),
        ]
    },
    {
        "name": "Context Clues",
        "desc": "When you find an unfamiliar word, look at the words and sentences around it for clues. Context clues include definitions, examples, synonyms, antonyms, or explanations nearby.",
        "example": "The knight was <em>valiant</em> — brave and courageous in the face of danger.",
        "questions": [
            ("Read this sentence and use context clues to define the underlined word. Explain which clues helped you:", "The forest was so <u>dense</u> that sunlight could barely reach the ground, and travelers often lost their way among the thick, tangled branches."),
            ("Write a sentence using a vocabulary word from this week where the context makes the meaning clear without a dictionary.", ""),
            ("Find a word in this week's reading that was new to you. Write the sentence it appeared in and explain how the context helped you understand it.", ""),
        ]
    },
    {
        "name": "Commas with Dependent Clauses",
        "desc": "When a dependent clause comes <strong>before</strong> the main clause, use a comma. When it comes <strong>after</strong>, usually no comma is needed.",
        "example": "✅ Although he was afraid, he kept walking.<br>✅ He kept walking although he was afraid.",
        "questions": [
            ("Add commas where needed in these sentences:", "1. When the storm hit the travelers sought shelter.\n2. The hero fought bravely because his friends were counting on him.\n3. Before the sun rose the army was already marching."),
            ("Write two sentences about this week's reading — one with the dependent clause first (use a comma) and one with it last (no comma).", ""),
            ("Fix this sentence by adding or removing commas:", "Because he had no choice, the character pressed forward, although he knew the danger."),
        ]
    },
    {
        "name": "Greek and Latin Roots",
        "desc": "Many English words come from Greek and Latin roots. Knowing these roots helps you figure out unfamiliar words.",
        "example": "<strong>trans-</strong> = across (transport, translate) • <strong>morph</strong> = form (metamorphosis) • <strong>bene-</strong> = good (benefit, benevolent)",
        "questions": [
            ("Break these words into their root parts and explain what each part means:", "1. incredible (in- + cred + -ible)\n2. transform (trans- + form)\n3. submarine (sub- + marine)"),
            ("Find a word from this week's vocabulary that has a Greek or Latin root. Identify the root and explain how it connects to the word's meaning.", ""),
            ("Use the root <em>-ject</em> (meaning 'to throw') to list three English words. Write a sentence using one of them.", ""),
        ]
    },
    {
        "name": "Figurative Language: Similes &amp; Metaphors",
        "desc": "A <strong>simile</strong> compares two things using <em>like</em> or <em>as</em>. A <strong>metaphor</strong> makes a direct comparison without like/as.",
        "example": "Simile: His voice was <em>like</em> thunder.<br>Metaphor: The forest was a cathedral of green.",
        "questions": [
            ("Identify whether each example is a simile or metaphor and explain what is being compared:", "1. The warrior's heart was a furnace of rage.\n2. She moved through the crowd like a shadow.\n3. His words cut like a knife."),
            ("Find an example of figurative language from this week's reading. Write the sentence and explain what it means.", ""),
            ("Write one simile and one metaphor about a character or event from this week's stories.", ""),
        ]
    },
    {
        "name": "Dialogue Punctuation",
        "desc": "When writing dialogue: put spoken words inside quotation marks, use a comma before the closing quote if a dialogue tag follows, capitalize the first word of dialogue, and start a new paragraph for each new speaker.",
        "example": "\"I will not yield,\" said Robin, drawing his bow.<br>\"Then you leave me no choice,\" the Sheriff replied.",
        "questions": [
            ("Add correct punctuation to this dialogue:", "Where are you going asked the knight\nI am going to find the truth the hero replied\nThen I will come with you said his companion"),
            ("Write a 4-line dialogue between two characters from this week's reading. Use correct punctuation.", ""),
            ("Find an example of dialogue from this week's reading and explain how the punctuation works.", ""),
        ]
    },
    {
        "name": "Semicolons",
        "desc": "A semicolon connects two related independent clauses (complete sentences) that are closely connected in meaning. Use a semicolon instead of a period when the ideas are too connected to separate completely.",
        "example": "The castle was dark; not a single candle burned in any window.",
        "questions": [
            ("Combine these pairs of sentences using a semicolon:", "1. The hero was brave. His enemies feared him.\n2. The storm raged all night. By morning, the damage was clear.\n3. She had traveled far. Her journey was not yet over."),
            ("Write two sentences about this week's reading connected by a semicolon.", ""),
            ("Explain why a semicolon works better than a period in this sentence:", "The creature wanted companionship; he had been alone since the day he was created."),
        ]
    },
    {
        "name": "Personification &amp; Imagery",
        "desc": "<strong>Personification</strong> gives human qualities to non-human things. <strong>Imagery</strong> uses vivid descriptions that appeal to the five senses (sight, sound, touch, taste, smell).",
        "example": "Personification: The wind <em>whispered</em> through the trees.<br>Imagery: The cold stone floor sent shivers up through his bare feet.",
        "questions": [
            ("Identify the personification or imagery in each sentence and explain which sense it appeals to:", "1. The old house groaned under the weight of the storm.\n2. The bread was warm and golden, filling the room with the smell of honey and wheat.\n3. Shadows danced across the castle walls."),
            ("Find an example of imagery from this week's reading that helped you picture a scene. Write it and explain what you visualized.", ""),
            ("Write a paragraph (3-4 sentences) describing a setting from this week's story using at least one example of personification and one of imagery.", ""),
        ]
    },
    {
        "name": "Point of View",
        "desc": "<strong>First person</strong> (I, me, we) — the narrator is a character in the story.<br><strong>Third person limited</strong> — the narrator knows one character's thoughts.<br><strong>Third person omniscient</strong> — the narrator knows everyone's thoughts.",
        "example": "First: \"I could feel the fear rising in my chest.\"<br>Third limited: \"Victor felt the fear rising in his chest.\"<br>Third omniscient: \"Victor felt afraid, while the creature felt hopeful.\"",
        "questions": [
            ("What point of view is this week's reading written in? Give a specific example from the text that proves it.", ""),
            ("Rewrite this sentence from a different point of view:", "He knew the danger was real, but he could not turn back now."),
            ("How would this week's story be different if it were told from a different character's point of view? Choose a character and explain what would change.", ""),
        ]
    },
    {
        "name": "Prefixes and Suffixes",
        "desc": "<strong>Prefixes</strong> are added to the beginning of words to change meaning (un-, re-, pre-, dis-, mis-, over-).<br><strong>Suffixes</strong> are added to the end (-tion, -ly, -ful, -less, -ment, -ness, -able).",
        "example": "<strong>un</strong>forgivable = not + able to be forgiven<br>care<strong>less</strong>ness = without care + state of being",
        "questions": [
            ("Break each word into prefix/root/suffix and define each part:", "1. unbreakable\n2. misjudgment\n3. overconfident"),
            ("Find two words from this week's reading that use prefixes or suffixes. Identify the parts and explain how they build the word's meaning.", ""),
            ("Add a prefix or suffix to each root word and use the new word in a sentence:", "1. trust\n2. appear\n3. courage"),
        ]
    },
    {
        "name": "Tone and Mood",
        "desc": "<strong>Tone</strong> is the author's attitude toward the subject (serious, humorous, angry, hopeful, sarcastic).<br><strong>Mood</strong> is the feeling the reader experiences (tense, peaceful, eerie, joyful, sad).",
        "example": "\"The dark corridor stretched endlessly before him\" creates an <em>eerie, tense</em> mood.",
        "questions": [
            ("What is the overall mood of this week's reading? Choose 2-3 mood words and support each with a specific quote or detail from the text.", ""),
            ("Find a passage where the mood shifts (changes). What was the mood before and after? What words or events caused the change?", ""),
            ("Write a short paragraph (3-4 sentences) about a scene from this week's reading. First write it with a serious tone, then rewrite it with a humorous tone.", ""),
        ]
    },
    {
        "name": "Appositives",
        "desc": "An <strong>appositive</strong> is a noun or noun phrase that renames or explains another noun right beside it. Set it off with commas.",
        "example": "Arthur, <em>the young king of England</em>, pulled the sword from the stone.<br>Excalibur, <em>a blade of extraordinary power</em>, gleamed in the sunlight.",
        "questions": [
            ("Identify the appositive in each sentence:", "1. Merlin, the greatest wizard in the land, warned Arthur of danger.\n2. The creature, a being of terrible loneliness, wept in the forest.\n3. Sherwood Forest, Robin's beloved home, stretched for miles."),
            ("Write three sentences about characters from this week's reading, each containing an appositive set off by commas.", ""),
            ("Combine these sentence pairs using an appositive:", "1. Victor was a scientist. He created the creature.\n2. The sword was magical. It was called Excalibur."),
        ]
    },
]

# Unit info for writing prompts
UNIT_INFO = {
    "Robin Hood": {"stories": "Robin Hood adventures", "info_topics": "medieval England, archery, Sherwood Forest, feudal society"},
    "King Arthur": {"stories": "King Arthur and his knights", "info_topics": "medieval chivalry, the Round Table, Arthurian legend, medieval castles"},
    "Arabian Nights": {"stories": "Arabian Nights tales", "info_topics": "medieval Baghdad, the Silk Road, Islamic Golden Age"},
    "Celtic Mythology": {"stories": "Celtic myths", "info_topics": "Celtic culture, Irish history, ancient druids"},
    "Egyptian Mythology": {"stories": "Egyptian myths", "info_topics": "ancient Egypt, pharaohs, the Nile"},
    "Around the World": {"stories": "Around the World in 80 Days", "info_topics": "Victorian travel, world geography, transportation history"},
    "Dracula": {"stories": "Dracula chapters", "info_topics": "Victorian England, Transylvania, Vlad the Impaler"},
    "Greek Mythology": {"stories": "Greek myths", "info_topics": "ancient Greece, Greek civilization, democracy"},
    "Roman Mythology": {"stories": "Roman myths", "info_topics": "ancient Rome, Roman law, Roman engineering"},
    "Norse Mythology": {"stories": "Norse myths", "info_topics": "Viking culture, Norse cosmology, Scandinavian history"},
    "Frankenstein": {"stories": "Frankenstein chapters", "info_topics": "Mary Shelley, the Romantic era, science and ethics"},
    "Final Review": {"stories": "the year's readings", "info_topics": "all informational texts from this year"},
}

def get_unit(day):
    if day <= 20: return "Robin Hood"
    elif day <= 40: return "King Arthur"
    elif day <= 48: return "Arabian Nights"
    elif day <= 54: return "Celtic Mythology"
    elif day <= 58: return "Egyptian Mythology"
    elif day <= 78: return "Around the World"
    elif day <= 98: return "Dracula"
    elif day <= 118: return "Greek Mythology"
    elif day <= 138: return "Roman Mythology"
    elif day <= 158: return "Norse Mythology"
    elif day <= 178: return "Frankenstein"
    else: return "Final Review"

def get_unit_folder(unit):
    return {
        "Robin Hood": "robin-hood", "King Arthur": "king-arthur",
        "Arabian Nights": "arabian", "Celtic Mythology": "celtic",
        "Egyptian Mythology": "egyptian", "Around the World": "around-the-world",
        "Dracula": "dracula", "Greek Mythology": "greek",
        "Roman Mythology": "roman", "Norse Mythology": "norse",
        "Frankenstein": "frankenstein"
    }.get(unit, "")

def escape_html(s):
    return s.replace("'", "\\'").replace('"', '&quot;').replace('`', '\\`').replace('${', '\\${').replace('</script>', '<\\/script>')

def extract_vocab_from_lessons(unit_folder, days):
    """Extract vocab words from the week's regular lessons."""
    vocab = []
    curriculum_dir = f"{BASE}/curriculum/grade5/{unit_folder}"
    
    for day in days:
        for pattern in [f"5th-grade-lesson-{day}.html", f"5th-grade-day-{day}.html"]:
            filepath = os.path.join(curriculum_dir, pattern)
            if os.path.exists(filepath):
                html = open(filepath).read()
                # Extract from match-word divs (vocab game)
                words = re.findall(r'class="match-word" data-word="([^"]+)"', html)
                defs = re.findall(r'class="match-def" data-word="([^"]+)"[^>]*>([^<]+)<', html)
                def_map = {w: d for w, d in defs}
                for w in words:
                    if w not in [v['word'] for v in vocab]:
                        vocab.append({'word': w, 'definition': def_map.get(w, f'Definition of {w}')})
                break
    return vocab

def build_assessment(day, week_num):
    unit = get_unit(day)
    unit_folder = get_unit_folder(unit)
    skill = SKILLS[(week_num - 1) % len(SKILLS)]
    unit_info = UNIT_INFO.get(unit, {"stories": "this week's stories", "info_topics": "this week's topics"})
    
    # Get the 4 regular days before this assessment
    regular_days = [day - 4, day - 3, day - 2, day - 1]
    
    # Extract vocab
    vocab = extract_vocab_from_lessons(unit_folder, regular_days)
    if not vocab:
        # Try loading from data files
        for data_file in ['robin-hood-data.json', 'king-arthur-data.json', 'frankenstein-data.json']:
            fpath = os.path.join(BASE, data_file)
            if os.path.exists(fpath):
                data = json.load(open(fpath))
                for d in regular_days:
                    # Map day to chapter number based on unit
                    # This is approximate - just grab what we can
                    for ch_str, v in data['vocab'].items():
                        vocab.extend(v)
                if vocab:
                    break
    
    # Deduplicate and limit to 12
    seen = set()
    unique_vocab = []
    for v in vocab:
        if v['word'] not in seen:
            seen.add(v['word'])
            unique_vocab.append(v)
    vocab = unique_vocab[:12]
    
    # Shuffle for game
    random.seed(day)
    game_vocab = vocab[:]
    
    word_divs = []
    def_divs = []
    for w in game_vocab:
        word_divs.append(f'<div class="match-word" data-word="{escape_html(w["word"])}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">{escape_html(w["word"])}</div>')
        def_divs.append(f'<div class="match-def" data-word="{escape_html(w["word"])}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">{escape_html(w["definition"])}</div>')
    
    indices = list(range(len(def_divs)))
    random.shuffle(indices)
    shuffled_defs = [def_divs[i] for i in indices]
    
    # Build grammar questions
    grammar_qs = []
    for qi, (prompt, content) in enumerate(skill['questions']):
        content_html = f'<p style="margin: 15px 0; padding: 15px; background: #f0f0f0; border-radius: 8px; font-style: italic; white-space: pre-line;">{escape_html(content)}</p>' if content else ''
        grammar_qs.append(f'''<div style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #305853;">
                                    <p style="font-weight: 600; margin-bottom: 12px;">Question {qi+1}:</p>
                                    <p style="margin-bottom: 12px; color: #444;">{escape_html(prompt)}</p>
                                    {content_html}
                                    <textarea id="grammar-{qi+1}" style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;" oninput="updateWordCount('grammar-{qi+1}', 'wc-grammar-{qi+1}', 20)" placeholder="Write your answer here (minimum 20 words)..."><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;"><span id="wc-grammar-{qi+1}" style="font-size: 14px; color: #666;">0 / 20 words</span><span id="wc-grammar-{qi+1}-status" style="font-size: 14px; font-weight: 600;"></span></div>
                                </div>''')
    
    # Pages
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson {day}: Week {week_num} Assessment</title>
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
            title: 'Lesson {day}: Week {week_num} Assessment',
            pages: [
                {{
                    render: () => `
<div class="lesson-page-card title-page">
                            <h1>Lesson {day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">{escape_html(unit)}</p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">Week {week_num} Assessment</p>
                        </div>
                    `
                }},
                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>🎮 Vocabulary Review</h2>
                            <p style="color: #666; margin-bottom: 5px;">Match all {len(vocab)} vocabulary words from this week!</p>
                            <p style="color: #305853; font-weight: 600; margin-bottom: 20px;">Score: <span id="gameScore">0</span> / {len(vocab)}</p>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto;">
                                <div id="wordColumn" style="display: flex; flex-direction: column;">
                                    <h3 style="text-align: center; color: #305853; margin-bottom: 10px;">Words</h3>
                                    {"".join(word_divs)}
                                </div>
                                <div id="defColumn" style="display: flex; flex-direction: column;">
                                    <h3 style="text-align: center; color: #8B4513; margin-bottom: 10px;">Definitions</h3>
                                    {"".join(shuffled_defs)}
                                </div>
                            </div>
                            
                            <div id="gameFeedback" style="margin-top: 20px; padding: 15px; border-radius: 10px; text-align: center; display: none;"></div>
                        </div>`
                ,
                    onLoad: () => {{ if(window.initVocabGame) window.initVocabGame(); }}
                }},
                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>✏️ Grammar &amp; Language: {skill['name']}</h2>
                            <div style="margin: 20px 0; padding: 20px; background: rgba(48,88,83,0.08); border-radius: 12px;">
                                <p style="margin-bottom: 10px;">{skill['desc']}</p>
                                <p style="font-style: italic; color: #555;">Example: {skill['example']}</p>
                            </div>
                            <div style="margin: 20px 0;">
                                {grammar_qs[0]}
                            </div>
                        </div>
                    `
                }},
                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>✏️ Grammar &amp; Language: {skill['name']}</h2>
                            <div style="margin: 20px 0;">
                                {grammar_qs[1]}
                            </div>
                        </div>
                    `
                }},
                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>✏️ Grammar &amp; Language: {skill['name']}</h2>
                            <div style="margin: 20px 0;">
                                {grammar_qs[2]}
                            </div>
                        </div>
                    `
                }},
                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>📝 Writing Assignment: Compare &amp; Contrast</h2>
                            <div style="margin: 20px 0; padding: 20px; background: rgba(139,69,19,0.08); border-radius: 12px;">
                                <p style="margin-bottom: 15px;">This week you read {escape_html(unit_info['stories'])} and learned about {escape_html(unit_info['info_topics'])}.</p>
                                <p><strong>Your task:</strong> Write a compare and contrast essay connecting the <em>fiction</em> you read this week with the <em>informational text</em>. How do the stories and the real-world information connect? What did the informational text help you understand about the story — or what did the story help you understand about the real world?</p>
                            </div>
                            
                            <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 10px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">Your essay should include:</p>
                                <ul style="line-height: 2; color: #444;">
                                    <li>An introduction that names both the story and the informational text</li>
                                    <li>At least 2 similarities between the fiction and non-fiction</li>
                                    <li>At least 1 difference between the fiction and non-fiction</li>
                                    <li>A conclusion with your own thoughts</li>
                                </ul>
                            </div>
                            
                            <textarea id="writing" style="width: 100%; min-height: 200px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;" oninput="updateWordCount('writing', 'wc-writing', 150)" placeholder="Write your compare and contrast essay here (minimum 150 words)..."><\\/textarea>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                <span id="wc-writing" style="font-size: 14px; color: #666;">0 / 150 words</span>
                                <span id="wc-writing-status" style="font-size: 14px; font-weight: 600;"></span>
                            </div>
                        </div>
                    `
                }},
                {{
                    render: () => `<div class="lesson-page-card completion-page">
      <div class="completion-container">
        <div class="completion-icon">⭐</div>
        <h1>Assessment Complete!</h1>
        <p class="completion-message">Great job on the Week {week_num} assessment!</p>
        <div class="completion-stats">
          <div class="stat-item"><div class="stat-number">{len(vocab)}</div><div class="stat-label">Vocab Reviewed</div></div>
          <div class="stat-item"><div class="stat-number">3</div><div class="stat-label">Grammar Questions</div></div>
          <div class="stat-item"><div class="stat-number">1</div><div class="stat-label">Essay Written</div></div>
        </div>
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
    return html, len(vocab)

# Build all assessments
count = 0
for week in range(1, 37):
    day = week * 5
    unit = get_unit(day)
    unit_folder = get_unit_folder(unit)
    
    # Skip Around the World (no files yet) and Final Review
    if unit in ("Around the World", "Final Review"):
        print(f"Lesson {day} (Week {week}): ⏭️  {unit} - skipped (no files)")
        continue
    
    outdir = f"{BASE}/curriculum/grade5/{unit_folder}"
    os.makedirs(outdir, exist_ok=True)
    
    html, vocab_count = build_assessment(day, week)
    
    # Save with lesson naming
    filepath = f"{outdir}/5th-grade-lesson-{day}.html"
    open(filepath, 'w').write(html)
    
    skill_name = SKILLS[(week - 1) % len(SKILLS)]['name']
    print(f"Lesson {day} (Week {week}): ✅ {unit} | {vocab_count} vocab | {skill_name}")
    count += 1

print(f"\nBuilt {count} assessments")
