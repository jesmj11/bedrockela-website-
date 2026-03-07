#!/usr/bin/env python3
"""Build King Arthur lessons (Days 21-40) for 5th grade BedrockELA."""

import json, re, os

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-"

# Load data
data = json.load(open(f"{BASE}/robin-hood-data.json"))
story_text = open(f"{BASE}/robin-hood-full.txt").read()

# Split into chapters
parts = re.split(r'\n(Chapter \d+)\n', story_text)
chapters = {}
for i in range(1, len(parts)-1, 2):
    ch_num = int(re.search(r'\d+', parts[i]).group())
    content = parts[i+1].strip()
    lines = content.split('\n')
    title = lines[0].strip()
    body_lines = [l.strip() for l in lines[1:] if l.strip()]
    chapters[ch_num] = {'title': title, 'body': body_lines}

# Day mapping: Days 21-40, every 5th day globally is assessment
# Day 25 = assessment (week 5), Day 30 = assessment (week 6), Day 35 = assessment (week 7), Day 40 = assessment (week 8)
# Regular days: 21,22,23,24, 26,27,28,29, 31,32,33,34, 36,37,38,39
# That's 16 regular days for 16 chapters

regular_days = [1,2,3,4, 6,7,8,9, 11,12,13,14, 16,17,18,19]
assessment_days = [5, 10, 15, 20]

chapter_titles = {
    1: "How Robin Hood Became an Outlaw", 2: "Robin Hood Meets Little John", 3: "The Sheriff's First Scheme",
    4: "Friar Tuck and the River Crossing", 5: "The Rescue of Will Stutely", 6: "Alan-a-Dale's Wedding",
    7: "Robin Hood and the Bishop", 8: "The Silver Arrow", 9: "Maid Marian",
    10: "The Poor Knight's Debt", 11: "The Tinker, the Peddler, and the Cook", 12: "The Sheriff's Tax Collectors",
    13: "Robin Hood and Guy of Gisborne", 14: "Little John Goes to the Fair", 15: "The Great Forest Chase",
    16: "The King Returns"
}

def escape_html(s):
    return s.replace("'", "\\'").replace('"', '&quot;').replace('`', '\\`').replace('${', '\\${').replace('</script>', '<\\/script>')

def split_story_4pages(body_lines):
    """Split story paragraphs into 4 roughly equal parts."""
    if len(body_lines) < 4:
        # pad
        while len(body_lines) < 4:
            body_lines.append('')
    
    total = sum(len(l) for l in body_lines)
    target = total / 4
    parts = []
    current = []
    current_len = 0
    
    for line in body_lines:
        current.append(line)
        current_len += len(line)
        if current_len >= target and len(parts) < 3:
            parts.append(current)
            current = []
            current_len = 0
    if current:
        if len(parts) < 4:
            parts.append(current)
        else:
            parts[-1].extend(current)
    while len(parts) < 4:
        parts.append([''])
    
    return parts[:4]

def make_vocab_game_html(words_so_far):
    """Build cumulative vocab matching game."""
    word_divs = []
    def_divs = []
    for w in words_so_far:
        word_divs.append(f'''<div class="match-word" data-word="{escape_html(w['word'])}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">{escape_html(w['word'])}</div>''')
        def_divs.append(f'''<div class="match-def" data-word="{escape_html(w['word'])}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">{escape_html(w['definition'])}</div>''')
    
    # Shuffle definitions display order
    import random
    random.seed(len(words_so_far))  # deterministic shuffle
    indices = list(range(len(def_divs)))
    random.shuffle(indices)
    shuffled_defs = [def_divs[i] for i in indices]
    
    return f'''<div class="lesson-page-card content-page">
                            <h2>🎮 Vocabulary Game</h2>
                            <p style="color: #666; margin-bottom: 5px;">Match each word to its definition! ({len(words_so_far)} words this week so far)</p>
                            <p style="color: #305853; font-weight: 600; margin-bottom: 20px;">Score: <span id="gameScore">0</span> / {len(words_so_far)}</p>
                            
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
                        </div>'''

def build_regular_lesson(day, chapter_num, week_num, day_in_week):
    """Build a regular lesson HTML file."""
    ch = chapters.get(chapter_num, {'title': f'Chapter {chapter_num}', 'body': ['Story text here.']})
    title = chapter_titles.get(chapter_num, ch['title'])
    vocab = data['vocab'].get(str(chapter_num), [])
    questions = data['questions'].get(str(chapter_num), [])
    
    # Split story into 4 pages
    story_parts = split_story_4pages(ch['body'])
    
    # Highlight vocab words in story
    vocab_words = [w['word'].lower() for w in vocab]
    
    def highlight_vocab(text):
        for w in vocab:
            word = w['word']
            text = re.sub(rf'\b({re.escape(word)})\b', r'<span class="vocab-highlight">\1</span>', text, flags=re.IGNORECASE)
        return text
    
    # Build story pages
    story_pages = []
    for i, part in enumerate(story_parts):
        paras = '\n'.join(f'<p>{highlight_vocab(escape_html(p))}</p>' for p in part if p.strip())
        story_pages.append(f'''                {{
                    render: () => `<div class="lesson-page-card content-page">
      <div class="page-header">
        <div class="lesson-number">Day {day} • Week {week_num}</div>
        <div class="unit-label">{escape_html(title)} • Part {i+1} of 4</div>
      </div>
      <div class="story-text">
        {paras}
      </div>
    </div>`
                }}''')
    
    # Vocab page
    vocab_cards = []
    for j, w in enumerate(vocab):
        vocab_cards.append(f'''<div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                    <div style="margin-bottom: 12px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">{escape_html(w['word'])}</span>
                                    </div>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                                        Look up this word in a dictionary, then write the definition in your own words:
                                    </p>
                                    <textarea 
                                      id="vocab-{j+1}"
                                      style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                      oninput="updateWordCount('vocab-{j+1}', 'vocab-count-{j+1}', 10)"
                                      onpaste="return false"
                                      placeholder="Type the definition here (minimum 10 words, no pasting)..."
                                    ><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                                      <span id="vocab-count-{j+1}" style="font-size: 13px; color: #666;">0 / 10 words</span>
                                      <span id="vocab-count-{j+1}-status" style="font-size: 13px; font-weight: 600;"></span>
                                    </div>
                                </div>''')
    
    # Cumulative vocab for game: all words from this week so far
    cumulative_words = []
    for prev_ch in range(chapter_num - day_in_week + 1, chapter_num + 1):
        prev_vocab = data['vocab'].get(str(prev_ch), [])
        cumulative_words.extend(prev_vocab)
    
    vocab_game = make_vocab_game_html(cumulative_words)
    
    # Comprehension pages (one per question)
    comp_pages = []
    for qi, q in enumerate(questions[:3]):
        comp_pages.append(f'''                {{
                    render: () => `
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 30px;">Question {qi+1} of {min(len(questions), 3)}</p>
                            
                            <div style="margin: 30px 0;">
                                <div style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #8B4513;">
                                    <p style="font-weight: 600; margin-bottom: 12px;">Question {qi+1}:</p>
                                    <p style="margin-bottom: 12px; color: #444;">{escape_html(q)}</p>
                                    <textarea 
                                      id="comp-{qi+1}"
                                      style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                      oninput="updateWordCount('comp-{qi+1}', 'word-count-comp-{qi+1}', 50)"
                                      placeholder="Write your answer here (minimum 50 words)..."
                                    ><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                      <span id="word-count-comp-{qi+1}" style="font-size: 14px; color: #666;">0 / 50 words</span>
                                      <span id="word-count-comp-{qi+1}-status" style="font-size: 14px; font-weight: 600;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }}''')
    
    # Journal page
    journal_page = f'''                {{
                    render: () => `<div class="lesson-page-card content-page">
      <div class="page-header">
        <div class="lesson-number">Day {day} • Week {week_num}</div>
        <div class="unit-label">Journal Response</div>
      </div>
      <h2>✍️ Your Response</h2>
      <div style="margin: 20px 0;">
        <p><strong>Choose one:</strong></p>
        <ul style="line-height: 2;">
          <li>Which character in this chapter showed the most courage or wisdom? Explain with examples from the text.</li>
          <li>If you could ask one character from today\\'s reading a question, what would it be and why?</li>
          <li>Write about a time in your own life that connects to something that happened in this chapter.</li>
        </ul>
      </div>
      <textarea style="width: 100%; min-height: 150px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;" placeholder="Write your response here (minimum 50 words)..." id="journal" oninput="updateWordCount('journal', 'journal-wc', 50)"><\\/textarea>
      <span id="journal-wc" style="font-size: 14px; color: #666;">0 / 50 words</span>
    </div>`
                }}'''

    # Completion page
    completion_page = f'''                {{
                    render: () => `<div class="lesson-page-card completion-page">
      <div class="completion-container">
        <div class="completion-icon">🎉</div>
        <h1>Day {day} Complete!</h1>
        <p class="completion-message">Great work on \\"{escape_html(title)}\\"!</p>
        <div class="completion-stats">
          <div class="stat-item">
            <div class="stat-number">3</div>
            <div class="stat-label">New Words</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1</div>
            <div class="stat-label">Chapter Read</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">3</div>
            <div class="stat-label">Questions</div>
          </div>
        </div>
        <button class="completion-button" onclick="markComplete()">Mark Complete &amp; Save Progress</button>
        <div class="completion-footer">
          <button class="nav-button prev-button" onclick="prevPage()">← Review Lesson</button>
        </div>
      </div>
    </div>`
                }}'''

    # Assemble all pages
    all_pages = []
    
    # 1. Title page
    all_pages.append(f'''                {{
                    render: () => `
<div class="lesson-page-card title-page">
                            <h1>Lesson {day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">
                                Robin Hood
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                {escape_html(title)}
                            </p>
                        </div>
                    `
                }}''')
    
    # 2. Welcome page
    all_pages.append(f'''                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson {day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read <em>{escape_html(title)}</em></li>
                                <li>Learn 3 new vocabulary words</li>
                                <li>Answer reading comprehension questions</li>
                                <li>Write a journal response</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    `
                }}''')
    
    # 3. Vocab page
    all_pages.append(f'''                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            <div style="margin: 30px 0;">
                                {"".join(vocab_cards)}
                            </div>
                            <div style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                <p style="margin: 0;"><strong>Watch for these words</strong> in today\\'s reading!</p>
                            </div>
                        </div>
                    `
                }}''')
    
    # 4. Vocab game
    all_pages.append(f'''                {{
                    render: () => `{vocab_game}`
                ,
                    onLoad: () => {{ if(window.initVocabGame) window.initVocabGame(); }}
                }}''')
    
    # 5-8. Story pages
    all_pages.extend(story_pages)
    
    # 9-11. Comprehension pages
    all_pages.extend(comp_pages)
    
    # 12. Journal
    all_pages.append(journal_page)
    
    # 13. Completion
    all_pages.append(completion_page)
    
    pages_str = ',\n'.join(all_pages)
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day {day}: {title}</title>
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
            title: 'Day {day}: {escape_html(title)}',
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
    
    return html

def build_assessment(day, week_num, chapters_covered):
    """Build an assessment lesson (every 5th day)."""
    # Collect all vocab from the 4 chapters in this week
    all_vocab = []
    for ch in chapters_covered:
        vocab = data['vocab'].get(str(ch), [])
        all_vocab.extend(vocab)
    
    # Build vocab quiz items
    quiz_items = []
    for i, w in enumerate(all_vocab):
        quiz_items.append(f'''<div style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 10px;">
                                <p style="font-weight: 600; margin-bottom: 8px;">{i+1}. {escape_html(w['word'])}</p>
                                <textarea 
                                  id="quiz-{i+1}"
                                  style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                  placeholder="Write the definition..."
                                ><\\/textarea>
                            </div>''')
    
    title = f"Week {week_num} Assessment"
    
    html = f'''<!DOCTYPE html>
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
            title: 'Day {day}: {title}',
            pages: [
                {{
                    render: () => `
<div class="lesson-page-card title-page">
                            <h1>Day {day}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">
                                Robin Hood
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                {title}
                            </p>
                        </div>
                    `
                }},
                {{
                    render: () => `
<div class="lesson-page-card content-page">
                            <h2>📝 Vocabulary Quiz</h2>
                            <p style="margin-bottom: 20px;">Write the definition for each word from this week's reading ({len(all_vocab)} words):</p>
                            <div style="margin: 20px 0;">
                                {"".join(quiz_items)}
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
          <div class="stat-item">
            <div class="stat-number">{len(all_vocab)}</div>
            <div class="stat-label">Words Reviewed</div>
          </div>
        </div>
        <button class="completion-button" onclick="markComplete()">Mark Complete &amp; Save Progress</button>
        <div class="completion-footer">
          <button class="nav-button prev-button" onclick="prevPage()">← Review</button>
        </div>
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
    
    return html

# Create output directory
outdir = f"{BASE}/curriculum/grade5/robin-hood"
os.makedirs(outdir, exist_ok=True)

# Build regular lessons
ch_num = 1
week_chapters = {}  # week_num -> list of chapter nums

for i, day in enumerate(regular_days):
    week_num = ((day - 1) // 5) + 1
    day_in_week = i % 4 + 1  # 1-4 within the week
    
    if week_num not in week_chapters:
        week_chapters[week_num] = []
    week_chapters[week_num].append(ch_num)
    
    html = build_regular_lesson(day, ch_num, week_num, day_in_week)
    filepath = f"{outdir}/5th-grade-lesson-{day}.html"
    open(filepath, 'w').write(html)
    print(f"Day {day}: ✅ Ch.{ch_num} - {chapter_titles.get(ch_num, '?')}")
    ch_num += 1

# Build assessments
for day in assessment_days:
    week_num = ((day - 1) // 5) + 1
    chs = week_chapters.get(week_num, [])
    html = build_assessment(day, week_num, chs)
    filepath = f"{outdir}/5th-grade-lesson-{day}.html"
    open(filepath, 'w').write(html)
    print(f"Day {day}: ✅ Assessment (Week {week_num}, chapters {chs})")

print(f"\nBuilt {len(regular_days) + len(assessment_days)} lessons in {outdir}")
