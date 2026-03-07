#!/usr/bin/env python3
"""Fill missing vocab by reading actual story titles from lesson files and matching to vocab data."""
import json, re, glob, os

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"

with open('/tmp/greek_vocab.json') as f: greek_data = json.load(f)
with open('/tmp/roman_vocab.json') as f: roman_data = json.load(f)
with open('/tmp/norse_vocab.json') as f: norse_data = json.load(f)

UNIT_VOCAB = {'greek': greek_data, 'roman': roman_data, 'norse': norse_data}

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

def fuzzy_match(title, vocab_keys):
    """Match a story title to a vocab key."""
    if not title:
        return None
    # Normalize
    t = title.lower().replace("'", "'").replace("\u2019", "'").replace("ö", "o").replace("ý", "y").replace(",", "").strip()
    
    best_key = None
    best_score = 0
    
    for key in vocab_keys:
        k = key.lower().replace("'", "'").replace("\u2019", "'").replace(",", "").strip()
        
        # Exact
        if t == k:
            return key
        
        # One contains the other
        if t in k or k in t:
            score = min(len(t), len(k)) / max(len(t), len(k))
            if score > best_score:
                best_score = score
                best_key = key
                continue
        
        # Word overlap
        t_words = set(re.findall(r'\w+', t)) - {'the', 'of', 'and', 'a', 'in'}
        k_words = set(re.findall(r'\w+', k)) - {'the', 'of', 'and', 'a', 'in'}
        if t_words and k_words:
            overlap = len(t_words & k_words)
            score = overlap / max(len(t_words), len(k_words))
            if score > best_score:
                best_score = score
                best_key = key
    
    if best_score >= 0.5:
        return best_key
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
                                    <textarea id="vocab-{i}" style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;" oninput="updateWordCount('vocab-{i}', 'vocab-count-{i}', 10)" onpaste="return false" placeholder="Type the definition here (minimum 10 words, no pasting)..."></textarea>
                                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                                      <span id="vocab-count-{i}" style="font-size: 13px; color: #666;">0 / 10 words</span>
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
    wc = len(all_words)
    wi = ''.join(f'<div class="match-word" data-word="{w["word"]}" onclick="selectWord(this)" style="padding:12px 16px;margin:6px;background:#305853;color:white;border-radius:8px;cursor:pointer;font-weight:600;text-align:center;transition:all 0.2s;">{w["word"]}</div>' for w in all_words)
    di = ''.join(f'<div class="match-def" data-word="{w["word"]}" onclick="selectDef(this)" style="padding:12px 16px;margin:6px;background:white;border:2px solid #8B4513;border-radius:8px;cursor:pointer;font-size:14px;transition:all 0.2s;">{w["definition"]}</div>' for w in all_words)
    return f'''<div class="lesson-page-card content-page">
                            <h2>🎮 Vocabulary Game</h2>
                            <p style="color:#666;margin-bottom:5px;">Match each word to its definition! ({wc} words this week so far)</p>
                            <p style="color:#305853;font-weight:600;margin-bottom:20px;">Score: <span id="gameScore">0</span> / {wc}</p>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:0 auto;">
                                <div id="wordColumn" style="display:flex;flex-direction:column;"><h3 style="text-align:center;color:#305853;margin-bottom:10px;">Words</h3>{wi}</div>
                                <div id="defColumn" style="display:flex;flex-direction:column;"><h3 style="text-align:center;color:#8B4513;margin-bottom:10px;">Definitions</h3>{di}</div>
                            </div>
                            <div id="gameFeedback" style="margin-top:20px;padding:15px;border-radius:10px;text-align:center;display:none;"></div>
                            <script>
                            (function(){{let sW=null,sD=null,sc=0;const t={wc};const dc=document.getElementById('defColumn');const ds=Array.from(dc.querySelectorAll('.match-def'));ds.sort(()=>Math.random()-0.5);ds.forEach(d=>dc.appendChild(d));window.selectWord=function(e){{if(e.classList.contains('matched'))return;document.querySelectorAll('.match-word').forEach(x=>x.style.outline='none');e.style.outline='3px solid #B06821';sW=e;tm();}};window.selectDef=function(e){{if(e.classList.contains('matched'))return;document.querySelectorAll('.match-def').forEach(x=>x.style.outline='none');e.style.outline='3px solid #B06821';sD=e;tm();}};function tm(){{if(!sW||!sD)return;if(sW.dataset.word===sD.dataset.word){{sW.classList.add('matched');sD.classList.add('matched');sW.style.opacity='0.5';sD.style.opacity='0.5';sW.style.outline='3px solid #4CAF50';sD.style.outline='3px solid #4CAF50';sc++;document.getElementById('gameScore').textContent=sc;if(sc===t){{const f=document.getElementById('gameFeedback');f.style.display='block';f.style.background='rgba(76,175,80,0.1)';f.innerHTML='<h3>🎉 Perfect!</h3>';}}}}else{{sW.style.outline='3px solid #f44336';sD.style.outline='3px solid #f44336';setTimeout(()=>{{sW.style.outline='none';sD.style.outline='none';sW=null;sD=null;}},600);return;}}sW=null;sD=null;}}}})();
                            </script>
                        </div>'''

# Step 1: Read all files and extract story titles, map to vocab
all_day_vocab = {}  # {day: [words]}

for unit in ['greek', 'roman', 'norse']:
    unit_dir = os.path.join(BASE, unit)
    vocab_data = UNIT_VOCAB[unit]
    
    print(f"\n=== {unit.upper()} - Mapping stories to vocab ===")
    
    for f in sorted(glob.glob(os.path.join(unit_dir, "*.html")), key=get_day):
        day = get_day(f)
        if day % 5 == 0:
            continue
        
        with open(f) as fh:
            content = fh.read()
        
        # Get story title from title page
        story = None
        m = re.search(r'color: #666[^>]*>\s*([^<]+)', content)
        if m:
            story = m.group(1).strip()
        if not story or 'Assessment' in story:
            continue
        
        # Check if already has vocab
        existing_words = re.findall(r'font-weight: 800; color: #305853;">([^<]+)', content)
        if existing_words:
            # Already has vocab - extract with definitions from game
            words = []
            for w in existing_words:
                m2 = re.search(rf'data-word="{re.escape(w)}"[^>]*onclick="selectDef[^>]*>([^<]+)', content)
                defn = m2.group(1).strip() if m2 else 'A vocabulary word from the story'
                words.append({'word': w, 'definition': defn})
            all_day_vocab[day] = words
            print(f"  Day {day}: {story} → already has [{', '.join(existing_words)}]")
            continue
        
        # Match story to vocab
        matched_key = fuzzy_match(story, vocab_data.keys())
        if matched_key:
            all_day_vocab[day] = vocab_data[matched_key]
            print(f"  Day {day}: {story} → matched '{matched_key}' = [{', '.join(w['word'] for w in vocab_data[matched_key])}]")
        else:
            print(f"  Day {day}: {story} → ❌ NO MATCH")

# Step 2: Now update files that are missing vocab
print("\n\n=== UPDATING FILES ===")
updated = 0

for unit in ['greek', 'roman', 'norse']:
    unit_dir = os.path.join(BASE, unit)
    
    for f in sorted(glob.glob(os.path.join(unit_dir, "*.html")), key=get_day):
        day = get_day(f)
        if day % 5 == 0:
            continue
        
        with open(f) as fh:
            content = fh.read()
        
        if 'Vocabulary Game' in content:
            continue  # already done
        
        if day not in all_day_vocab:
            continue
        
        words = all_day_vocab[day]
        
        m = re.search(r'color: #666[^>]*>\s*([^<]+)', content)
        story_title = m.group(1).strip() if m else None
        if story_title and 'Assessment' in story_title:
            continue
        
        # Build cumulative words for game
        week_days = get_week_days(day)
        day_in_week = get_day_in_week(day)
        cumulative = []
        for wd in week_days[:day_in_week]:
            if wd in all_day_vocab:
                cumulative.extend(all_day_vocab[wd])
        
        if not cumulative:
            cumulative = words
        
        welcome = build_welcome_page(day, story_title)
        vocab_pg = build_vocab_page(words)
        game_pg = build_game_page(cumulative)
        
        page_matches = list(re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', content, re.DOTALL))
        if len(page_matches) < 2:
            continue
        
        # Replace page 2 with welcome
        p2_start = page_matches[1].start(2)
        p2_end = page_matches[1].end(2)
        new_content = content[:p2_start] + '\n' + welcome + '\n                    ' + content[p2_end:]
        
        # Re-find and insert vocab + game after new page 2
        page_matches2 = list(re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', new_content, re.DOTALL))
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

print(f"\n🎯 Updated {updated} lessons")
