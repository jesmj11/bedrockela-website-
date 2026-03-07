#!/usr/bin/env python3
"""
Fill in missing vocab (welcome page + vocab write page + vocab game) for lessons that have none.
Skips assessment days. Uses vocab data from source files.
"""
import json, re, glob, os

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"

with open('/tmp/greek_vocab.json') as f: greek_data = json.load(f)
with open('/tmp/roman_vocab.json') as f: roman_data = json.load(f)
with open('/tmp/norse_vocab.json') as f: norse_data = json.load(f)

def get_day(fn):
    nums = re.findall(r'(\d+)', os.path.basename(fn))
    for n in reversed(nums):
        if int(n) > 10: return int(n)
    return int(nums[-1]) if nums else 0

def get_day_in_week(day):
    return ((day - 1) % 5) + 1

def get_week_days(day):
    block_start = day - ((day - 1) % 5)
    return [block_start + i for i in range(5)]

# Map lesson story titles to vocab data keys (fuzzy match)
def find_vocab(story_title, vocab_data):
    """Find vocab words for a story title in vocab data."""
    if not story_title:
        return None
    # Clean title
    clean = story_title.replace("'", "'").replace("'", "'").replace("ö", "o").replace("ý", "y")
    
    for key, words in vocab_data.items():
        key_clean = key.replace("'", "'").replace("'", "'")
        # Exact match
        if clean.lower() == key_clean.lower():
            return words
        # Partial match
        if clean.lower() in key_clean.lower() or key_clean.lower() in clean.lower():
            return words
        # Match main words
        clean_words = set(clean.lower().split())
        key_words = set(key_clean.lower().split())
        overlap = clean_words & key_words
        if len(overlap) >= 2 and len(overlap) >= len(key_words) * 0.5:
            return words
    return None

def build_welcome_page(day, story_title):
    items = []
    if story_title and 'Assessment' not in story_title:
        items.append(f'<li>Read from <em>{story_title}</em></li>')
    items.append('<li>Learn 3 new vocabulary words</li>')
    items.append('<li>Answer reading comprehension questions</li>')
    items.append('<li>Read an informational text</li>')
    items.append('<li>Practice grammar and writing skills</li>')
    items_html = '\n                                '.join(items)
    return f'''<div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson {day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                {items_html}
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>'''

def build_vocab_page(words):
    cards = []
    for i, w in enumerate(words, 1):
        cards.append(f'''
                                <div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                    <div style="margin-bottom: 12px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">{w['word']}</span>
                                    </div>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                                        Look up this word in a dictionary, then write the definition in your own words:
                                    </p>
                                    <textarea 
                                      id="vocab-{i}"
                                      style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                      oninput="updateWordCount('vocab-{i}', 'vocab-count-{i}', 10)"
                                      onpaste="return false"
                                      placeholder="Type the definition here (minimum 10 words, no pasting)..."
                                    ></textarea>
                                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                                      <span id="vocab-count-{i}" style="font-size: 13px; color: #666;">0 / 10 words</span>
                                      <span id="vocab-count-{i}-status" style="font-size: 13px; font-weight: 600;"></span>
                                    </div>
                                </div>''')
    return f'''<div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            <div style="margin: 30px 0;">{''.join(cards)}
                            </div>
                            <div style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                <p style="margin: 0;"><strong>Watch for these words</strong> in today's reading!</p>
                            </div>
                        </div>'''

def build_game_page(all_words):
    word_count = len(all_words)
    word_items = ''
    def_items = ''
    for i, w in enumerate(all_words):
        word_items += f'''
                                    <div class="match-word" data-word="{w['word']}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">{w['word']}</div>'''
        def_items += f'''
                                    <div class="match-def" data-word="{w['word']}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">{w['definition']}</div>'''
    
    return f'''<div class="lesson-page-card content-page">
                            <h2>🎮 Vocabulary Game</h2>
                            <p style="color: #666; margin-bottom: 5px;">Match each word to its definition! ({word_count} words this week so far)</p>
                            <p style="color: #305853; font-weight: 600; margin-bottom: 20px;">Score: <span id="gameScore">0</span> / {word_count}</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto;">
                                <div id="wordColumn" style="display: flex; flex-direction: column;">
                                    <h3 style="text-align: center; color: #305853; margin-bottom: 10px;">Words</h3>{word_items}
                                </div>
                                <div id="defColumn" style="display: flex; flex-direction: column;">
                                    <h3 style="text-align: center; color: #8B4513; margin-bottom: 10px;">Definitions</h3>{def_items}
                                </div>
                            </div>
                            <div id="gameFeedback" style="margin-top: 20px; padding: 15px; border-radius: 10px; text-align: center; display: none;"></div>
                            <script>
                            (function() {{
                                let selectedW = null, selectedD = null, score = 0;
                                const total = {word_count};
                                const defCol = document.getElementById('defColumn');
                                const defs = Array.from(defCol.querySelectorAll('.match-def'));
                                defs.sort(() => Math.random() - 0.5);
                                defs.forEach(d => defCol.appendChild(d));
                                window.selectWord = function(el) {{
                                    if (el.classList.contains('matched')) return;
                                    document.querySelectorAll('.match-word').forEach(e => e.style.outline = 'none');
                                    el.style.outline = '3px solid #B06821'; selectedW = el; tryMatch();
                                }};
                                window.selectDef = function(el) {{
                                    if (el.classList.contains('matched')) return;
                                    document.querySelectorAll('.match-def').forEach(e => e.style.outline = 'none');
                                    el.style.outline = '3px solid #B06821'; selectedD = el; tryMatch();
                                }};
                                function tryMatch() {{
                                    if (!selectedW || !selectedD) return;
                                    if (selectedW.dataset.word === selectedD.dataset.word) {{
                                        selectedW.classList.add('matched'); selectedD.classList.add('matched');
                                        selectedW.style.opacity = '0.5'; selectedD.style.opacity = '0.5';
                                        selectedW.style.outline = '3px solid #4CAF50'; selectedD.style.outline = '3px solid #4CAF50';
                                        score++; document.getElementById('gameScore').textContent = score;
                                        if (score === total) {{
                                            const fb = document.getElementById('gameFeedback');
                                            fb.style.display = 'block'; fb.style.background = 'rgba(76,175,80,0.1)';
                                            fb.innerHTML = '<h3>🎉 Perfect! All words matched!</h3>';
                                        }}
                                    }} else {{
                                        selectedW.style.outline = '3px solid #f44336'; selectedD.style.outline = '3px solid #f44336';
                                        setTimeout(() => {{ selectedW.style.outline = 'none'; selectedD.style.outline = 'none'; selectedW = null; selectedD = null; }}, 600);
                                        return;
                                    }}
                                    selectedW = null; selectedD = null;
                                }}
                            }})();
                            </script>
                        </div>'''

# Build mapping: unit -> {day: vocab_words}
unit_vocab_map = {}

# Greek: days 99-118 (16 regular + 4 assess)
greek_stories_order = [
    'The Creation of the World', 'The Twelve Olympians', 'Prometheus and the Gift of Fire',
    "Pandora's Box", 'Persephone and the Seasons', 'Orpheus and Eurydice',
    'Icarus and the Wings of Wax', 'Midas and the Golden Touch',
    'Perseus and Medusa', 'Theseus and the Minotaur',
    'Heracles and the Twelve Labors', 'Jason and the Golden Fleece',
    'Atalanta and the Golden Apples', 'Athena and Arachne',
    'Echo and Narcissus', 'Odysseus and the Cyclops'
]
greek_regular_days = [d for d in range(99, 119) if d % 5 != 0]
unit_vocab_map['greek'] = {}
for i, day in enumerate(greek_regular_days):
    if i < len(greek_stories_order):
        story = greek_stories_order[i]
        words = find_vocab(story, greek_data)
        if words:
            unit_vocab_map['greek'][day] = words

# Roman: days 119-138
roman_stories_order = [
    'Jupiter, King of the Gods', 'Juno, Queen of the Gods',
    'Mars, Father of Rome', 'Venus, Mother of Rome',
    'Minerva and the Arts of Civilization', 'Mercury, the Messenger',
    'Neptune and the Sea', 'Vulcan, the Divine Craftsman',
    'Romulus and Remus', 'The Founding of Rome',
    'Aeneas and the Fall of Troy', "Juno's Wrath and Aeneas's Journey",
    'Cupid and Psyche', 'Proserpina and the Pomegranate',
    'The Story of Lucretia', 'The Twelve Tables and Roman Law'
]
roman_regular_days = [d for d in range(119, 139) if d % 5 != 0]
unit_vocab_map['roman'] = {}
for i, day in enumerate(roman_regular_days):
    if i < len(roman_stories_order):
        story = roman_stories_order[i]
        words = find_vocab(story, roman_data)
        if words:
            unit_vocab_map['roman'][day] = words

# Norse: days 139-158
norse_stories_order = [
    'In the Beginning: The Norse Creation', 'The Nine Worlds of Yggdrasil',
    'Odin and the Price of Wisdom', 'Thor and the Theft of Mjolnir',
    'Freyja and the Necklace of the Brisings', 'Freyr and the Sword That Fought Alone',
    'Heimdall and the Rainbow Bridge', 'Loki the Trickster',
    'Tyr and the Binding of Fenrir', 'Baldur the Beautiful',
    'The Death of Baldur and Loki\'s Punishment', 'Sigurd and the Dragon Fafnir',
    'The Mead of Poetry', 'The Valkyries: Choosers of the Slain',
    'The Viking Afterlife: Valhalla and Helheim', 'Ragnarok: The End and the Beginning'
]
norse_regular_days = [d for d in range(139, 159) if d % 5 != 0]
unit_vocab_map['norse'] = {}
for i, day in enumerate(norse_regular_days):
    if i < len(norse_stories_order):
        story = norse_stories_order[i]
        words = find_vocab(story, norse_data)
        if words:
            unit_vocab_map['norse'][day] = words

# Show what we mapped
for unit in ['greek', 'roman', 'norse']:
    print(f"\n=== {unit.upper()} VOCAB MAP ===")
    for day, words in sorted(unit_vocab_map[unit].items()):
        print(f"  Day {day}: {[w['word'] for w in words]}")

# Now process each file that's missing vocab
updated = 0
for unit in ['greek', 'roman', 'norse']:
    unit_dir = os.path.join(BASE, unit)
    vocab_map = unit_vocab_map[unit]
    
    # Build cumulative week data
    all_days_vocab = {}  # day -> words for THIS day
    for day, words in vocab_map.items():
        all_days_vocab[day] = words
    
    # Also include existing vocab from already-processed files
    for f in glob.glob(os.path.join(unit_dir, "*.html")):
        day = get_day(f)
        if day in all_days_vocab:
            continue
        with open(f) as fh:
            content = fh.read()
        # Extract existing vocab words
        existing = re.findall(r'font-weight: 800; color: #305853;">([^<]+)', content)
        if existing:
            # Try to find definitions from review cards or other sources
            words = []
            for w in existing:
                # Search for definition in existing game
                m = re.search(rf'data-word="{re.escape(w)}"[^>]*onclick="selectDef[^>]*>([^<]+)', content)
                if m:
                    words.append({'word': w, 'definition': m.group(1).strip()})
                else:
                    words.append({'word': w, 'definition': f'A vocabulary word from the story'})
            all_days_vocab[day] = words
    
    for f in sorted(glob.glob(os.path.join(unit_dir, "*.html")), key=get_day):
        day = get_day(f)
        if day % 5 == 0:
            continue  # assessment
        
        with open(f) as fh:
            content = fh.read()
        
        if 'Vocabulary Game' in content:
            continue  # already done
        
        if day not in vocab_map:
            print(f"  ⚠️  {unit} Day {day}: no vocab data available")
            continue
        
        words = vocab_map[day]
        
        # Get story title
        m = re.search(r'color: #666[^>]*>\s*([^<]+)', content)
        story_title = m.group(1).strip() if m else None
        if story_title and 'Assessment' in story_title:
            continue
        
        # Build cumulative words for game
        week_days = get_week_days(day)
        day_in_week = get_day_in_week(day)
        cumulative = []
        for wd in week_days[:day_in_week]:
            if wd in all_days_vocab:
                cumulative.extend(all_days_vocab[wd])
        
        welcome = build_welcome_page(day, story_title)
        vocab_pg = build_vocab_page(words)
        game_pg = build_game_page(cumulative)
        
        # Find page positions
        page_matches = list(re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', content, re.DOTALL))
        
        if len(page_matches) < 2:
            print(f"  ⏭️  {unit} Day {day}: too few pages")
            continue
        
        # Replace page 2 with welcome, insert vocab + game after it
        # Page 2 is index 1
        p2_start = page_matches[1].start(2)
        p2_end = page_matches[1].end(2)
        
        new_content = content[:p2_start] + f'''
{welcome}
                    ''' + content[p2_end:]
        
        # Re-find positions after edit
        page_matches2 = list(re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', new_content, re.DOTALL))
        
        # Insert vocab + game after page 2 (welcome)
        insert_point = page_matches2[1].end()
        insert_text = f''',
                {{
                    render: () => `
{vocab_pg}
                    `
                }},
                {{
                    render: () => `
{game_pg}
                    `
                }}'''
        
        new_content = new_content[:insert_point] + insert_text + new_content[insert_point:]
        
        with open(f, 'w') as fh:
            fh.write(new_content)
        
        print(f"  ✅ {unit} Day {day}: {[w['word'] for w in words]} ({len(cumulative)} cumulative)")
        updated += 1

print(f"\n🎯 Updated {updated} lessons with vocab")
