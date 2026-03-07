#!/usr/bin/env python3
"""
Add cumulative vocab game page after the vocab definitions page.
- Day 1 of week: game with 3 words
- Day 2: game with 6 words (day 1 + 2)
- Day 3: game with 9 words
- Day 4: game with 12 words
Then Day 5 (assessment) tests all 12.

Uses git history to recover definitions from original files.
"""
import os, re, glob, subprocess, json

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"
REPO = "/Users/mushu/.openclaw/workspace/bedrockela-website-"

UNIT_NAMES = {
    'arabian': 'Arabian Nights',
    'celtic': 'Celtic Mythology',
    'egyptian': 'Egyptian Mythology',
    'dracula': 'Dracula',
    'greek': 'Greek Mythology',
    'roman': 'Roman Mythology',
    'norse': 'Norse Mythology',
}

def get_day_number(filename):
    nums = re.findall(r'(\d+)', os.path.basename(filename))
    for n in reversed(nums):
        if int(n) > 10:
            return int(n)
    return int(nums[-1]) if nums else 0

def is_assessment(day):
    return day % 5 == 0

def get_week_days(day):
    """Get all days in the same week (group of 5). Returns (day1, day2, day3, day4, assessment)."""
    # Find which 5-day block this day belongs to
    # Days are grouped: 41-45, 46-50, 51-55, etc.
    block_start = day - ((day - 1) % 5)
    return [block_start + i for i in range(5)]

def get_day_in_week(day):
    """Returns 1-4 for regular days, 5 for assessment."""
    return ((day - 1) % 5) + 1

def extract_vocab_from_original(filepath):
    """Extract vocab words + definitions from git history (pre-change version)."""
    rel_path = os.path.relpath(filepath, REPO)
    try:
        result = subprocess.run(
            ['git', 'show', f'HEAD~2:{rel_path}'],
            cwd=REPO, capture_output=True, text=True
        )
        if result.returncode != 0:
            # Try HEAD~1
            result = subprocess.run(
                ['git', 'show', f'HEAD~1:{rel_path}'],
                cwd=REPO, capture_output=True, text=True
            )
        if result.returncode != 0:
            return extract_vocab_from_current(filepath)
        content = result.stdout
    except:
        return extract_vocab_from_current(filepath)
    
    return extract_vocab_pairs(content)

def extract_vocab_from_current(filepath):
    """Extract vocab words from current file (may not have definitions)."""
    with open(filepath) as f:
        content = f.read()
    return extract_vocab_pairs(content)

def extract_vocab_pairs(content):
    """Extract word-definition pairs from HTML content."""
    pairs = []
    
    # Pattern 1: Arabian style - vocab-word + vocab-definition divs
    words = re.findall(r'class="vocab-word">([^<]+)', content)
    defs = re.findall(r'class="vocab-definition"[^>]*>([^<]+)', content)
    if words and defs and len(words) == len(defs):
        return list(zip(words, defs))
    
    # Pattern 2: Dracula/Greek/Roman/Norse - <h4>1. word</h4> ... <p>definition</p>
    blocks = re.findall(r'<h4>\d+\.\s*([^<]+)</h4>\s*<div class="[^"]*">\s*<p[^>]*>([^<]+)', content)
    if blocks:
        return [(w.strip(), d.strip()) for w, d in blocks]
    
    # Pattern 3: vocab-word div with h4 + definition p
    blocks = re.findall(r'class="vocab-word"[^>]*>\s*<h4>([^<]+)</h4>.*?<p[^>]*>([^<]{10,})</p>', content, re.DOTALL)
    if blocks:
        return [(w.strip(), d.strip()) for w, d in blocks]
    
    # Pattern 4: review-card with h4 + p
    blocks = re.findall(r'class="review-card">\s*<h4>([^<]+)</h4>\s*<p>([^<]+)', content)
    if blocks:
        return [(w.strip(), d.strip()) for w, d in blocks]
    
    # Pattern 5: Just get words from current file (new format - font-weight 800)
    words_only = re.findall(r'font-weight: 800; color: #305853;">([^<]+)', content)
    if words_only:
        # No definitions available - create placeholder
        return [(w.strip(), f"(definition for {w.strip()})") for w in words_only]
    
    return pairs

def find_file_for_day(day, unit_dir):
    """Find the HTML file for a given day number."""
    for f in glob.glob(os.path.join(unit_dir, "*.html")):
        if get_day_number(f) == day:
            return f
    return None

def build_vocab_game_page(all_words, day_in_week):
    """Build a matching game page with cumulative vocab words."""
    # all_words is list of (word, definition) tuples
    
    # Build the words data as inline JS
    words_json = json.dumps([{"word": w, "definition": d} for w, d in all_words])
    
    word_count = len(all_words)
    game_type = {1: 'Matching', 2: 'Fill in the Blank', 3: 'Sentence Builder', 4: 'Challenge Round'}
    game_name = game_type.get(day_in_week, 'Matching')
    
    # Build matching game HTML (works for all days, most interactive)
    word_items = ''
    def_items = ''
    for i, (word, defn) in enumerate(all_words):
        word_items += f'''
                                    <div class="match-word" data-word="{word}" onclick="selectWord(this)" style="padding: 12px 16px; margin: 6px; background: #305853; color: white; border-radius: 8px; cursor: pointer; font-weight: 600; text-align: center; transition: all 0.2s;">{word}</div>'''
        def_items += f'''
                                    <div class="match-def" data-word="{word}" onclick="selectDef(this)" style="padding: 12px 16px; margin: 6px; background: white; border: 2px solid #8B4513; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">{defn}</div>'''
    
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
                                let selectedW = null;
                                let selectedD = null;
                                let score = 0;
                                const total = {word_count};
                                
                                // Shuffle definitions
                                const defCol = document.getElementById('defColumn');
                                const defs = Array.from(defCol.querySelectorAll('.match-def'));
                                defs.sort(() => Math.random() - 0.5);
                                defs.forEach(d => defCol.appendChild(d));
                                
                                window.selectWord = function(el) {{
                                    if (el.classList.contains('matched')) return;
                                    document.querySelectorAll('.match-word').forEach(e => e.style.outline = 'none');
                                    el.style.outline = '3px solid #B06821';
                                    selectedW = el;
                                    tryMatch();
                                }};
                                window.selectDef = function(el) {{
                                    if (el.classList.contains('matched')) return;
                                    document.querySelectorAll('.match-def').forEach(e => e.style.outline = 'none');
                                    el.style.outline = '3px solid #B06821';
                                    selectedD = el;
                                    tryMatch();
                                }};
                                function tryMatch() {{
                                    if (!selectedW || !selectedD) return;
                                    if (selectedW.dataset.word === selectedD.dataset.word) {{
                                        selectedW.classList.add('matched');
                                        selectedD.classList.add('matched');
                                        selectedW.style.opacity = '0.5';
                                        selectedD.style.opacity = '0.5';
                                        selectedW.style.outline = '3px solid #4CAF50';
                                        selectedD.style.outline = '3px solid #4CAF50';
                                        score++;
                                        document.getElementById('gameScore').textContent = score;
                                        if (score === total) {{
                                            const fb = document.getElementById('gameFeedback');
                                            fb.style.display = 'block';
                                            fb.style.background = 'rgba(76,175,80,0.1)';
                                            fb.innerHTML = '<h3>🎉 Perfect! All words matched!</h3><p>Great job learning your vocabulary!</p>';
                                        }}
                                    }} else {{
                                        selectedW.style.outline = '3px solid #f44336';
                                        selectedD.style.outline = '3px solid #f44336';
                                        setTimeout(() => {{
                                            selectedW.style.outline = 'none';
                                            selectedD.style.outline = 'none';
                                            selectedW = null;
                                            selectedD = null;
                                        }}, 600);
                                        return;
                                    }}
                                    selectedW = null;
                                    selectedD = null;
                                }}
                            }})();
                            </script>
                        </div>'''

def process_unit(unit):
    unit_dir = os.path.join(BASE, unit)
    if not os.path.isdir(unit_dir):
        return 0
    
    files = sorted(glob.glob(os.path.join(unit_dir, "*.html")), key=get_day_number)
    if not files:
        return 0
    
    # First pass: collect all vocab data per day
    day_vocab = {}
    for f in files:
        day = get_day_number(f)
        if is_assessment(day):
            continue
        pairs = extract_vocab_from_original(f)
        if pairs:
            day_vocab[day] = pairs
    
    if not day_vocab:
        print(f"  No vocab data found")
        return 0
    
    # Second pass: build cumulative lists and insert game pages
    updated = 0
    for f in files:
        day = get_day_number(f)
        if is_assessment(day):
            continue
        
        if day not in day_vocab:
            print(f"  ⏭️  Day {day}: no vocab")
            continue
        
        # Get all days in this week up to current day
        week_days = get_week_days(day)
        day_in_week = get_day_in_week(day)
        
        # Accumulate vocab from day 1 of week through current day
        cumulative_words = []
        for wd in week_days[:day_in_week]:
            if wd in day_vocab:
                cumulative_words.extend(day_vocab[wd])
        
        if not cumulative_words:
            print(f"  ⏭️  Day {day}: no cumulative words")
            continue
        
        # Build game page
        game_page = build_vocab_game_page(cumulative_words, day_in_week)
        
        # Read current file
        with open(f) as fh:
            content = fh.read()
        
        # Find the vocab page (page 3 - "Vocabulary Words") and insert game after it
        # Find all page render positions
        page_matches = list(re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', content, re.DOTALL))
        
        if len(page_matches) < 3:
            print(f"  ⏭️  Day {day}: not enough pages ({len(page_matches)})")
            continue
        
        # Check if game already exists
        if 'Vocabulary Game' in content:
            print(f"  ⏭️  Day {day}: game already exists")
            continue
        
        # Insert after page 3 (vocab page, index 2)
        insert_idx = 2  # After the vocab definitions page
        if insert_idx >= len(page_matches):
            insert_idx = len(page_matches) - 1
        
        insert_point = page_matches[insert_idx].end()
        
        insert_text = f''',
                {{
                    render: () => `
{game_page}
                    `
                }}'''
        
        content = content[:insert_point] + insert_text + content[insert_point:]
        
        with open(f, 'w') as fh:
            fh.write(content)
        
        print(f"  ✅ Day {day}: {len(cumulative_words)} words ({day_in_week} of 4 in week)")
        updated += 1
    
    return updated

# Process all units
total_updated = 0
for unit in sorted(UNIT_NAMES):
    files = glob.glob(os.path.join(BASE, unit, "*.html"))
    if not files:
        continue
    print(f"\n=== {UNIT_NAMES[unit]} ({len(files)} files) ===")
    total_updated += process_unit(unit)

print(f"\n🎯 Added vocab games to {total_updated} lessons")
