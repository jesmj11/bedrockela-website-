#!/usr/bin/env python3
"""
Update 5th grade lessons pages 2-3 to match 6th grade style:
- Page 2: Welcome page with objectives + time estimate
- Page 3: Vocab with "look up and write definition" (no pre-given definitions)
- Remove old vocab practice/matching game page
"""
import os, re, glob

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"

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

def extract_vocab_words(page_html):
    """Extract vocabulary words from existing vocab page."""
    words = []
    # Pattern 1: <div class="vocab-word">word</div>
    for m in re.finditer(r'<div class="vocab-word">([^<]+)</div>', page_html):
        words.append(m.group(1).strip())
    # Pattern 2: <h4>1. word</h4>
    for m in re.finditer(r'<h4>\d+\.\s*([^<]+)</h4>', page_html):
        words.append(m.group(1).strip())
    # Pattern 3: <h4>word</h4> inside vocab-word div
    if not words:
        for m in re.finditer(r'class="vocab-word"[^>]*>\s*<h4>([^<]+)</h4>', page_html):
            words.append(m.group(1).strip())
    # Pattern 4: <span...font-weight: 800...>word</span> (6th grade style, shouldn't be here but just in case)
    if not words:
        for m in re.finditer(r'font-weight:\s*800[^>]*>([^<]+)</span>', page_html):
            words.append(m.group(1).strip())
    return words

def extract_story_title(pages_html):
    """Extract the story title from the lesson."""
    for p in pages_html:
        # Look for story name in reading pages
        m = re.search(r'(?:Reading|Part \d).*?</(?:p|div)>', p[:500])
        if m:
            break
    
    # From title page
    for p in pages_html[:1]:
        m = re.search(r'color: #666[^>]*>\s*([^<]+)', p)
        if m:
            return m.group(1).strip()
    return None

def extract_unit_name(pages_html):
    """Get unit name from title page."""
    for p in pages_html[:1]:
        m = re.search(r'color: #8B4513[^>]*>\s*([^<]+)', p)
        if m:
            return m.group(1).strip()
    return None

def extract_lesson_info(pages_html, day):
    """Extract info about what's in the lesson for the welcome page."""
    info = {
        'story': None,
        'vocab_count': 3,
        'info_text': None,
        'grammar': None,
        'writing': None,
        'language': None,
    }
    
    all_text = ' '.join(pages_html)
    
    # Story title from title page
    m = re.search(r'color: #666[^>]*>\s*([^<]+)', pages_html[0])
    if m:
        info['story'] = m.group(1).strip()
    
    # Unit name
    m = re.search(r'color: #8B4513[^>]*>\s*([^<]+)', pages_html[0])
    if m:
        info['unit'] = m.group(1).strip()
    
    # Informational text title
    m = re.search(r'(?:Informational Text|📰|Nonfiction)[^<]*(?:</[^>]+>\s*)*(?:<[^>]+>\s*)*([^<]{10,80})', all_text)
    if not m:
        m = re.search(r'info(?:rmational)?[-_\s]*text[^<]*<[^>]*>([^<]+)', all_text, re.I)
    
    # Grammar topic
    m = re.search(r'(?:Grammar|✏️)[^<]*(?:</[^>]+>\s*)*(?:<[^>]+>\s*)*([^<]{5,60})', all_text)
    
    # Writing type
    m = re.search(r'(?:Writing|Journal|📝)[^<]*(?:</[^>]+>\s*)*(?:<[^>]+>\s*)*([^<]{5,60})', all_text)
    
    return info

def build_welcome_page(day, unit_name, story_title):
    """Build clean 6th-grade-style welcome page."""
    items = []
    if story_title:
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
    """Build 6th-grade-style vocab page with write-your-own definitions."""
    cards = []
    for i, word in enumerate(words, 1):
        cards.append(f'''
                                <div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                    <div style="margin-bottom: 12px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">{word}</span>
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
    
    cards_html = ''.join(cards)
    
    return f'''<div class="lesson-page-card content-page">
                            <h2>Vocabulary Words</h2>
                            
                            <div style="margin: 30px 0;">
                                {cards_html}
                            </div>
                            
                            <div style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                <p style="margin: 0;"><strong>Watch for these words</strong> in today's reading!</p>
                            </div>
                        </div>'''

def process_file(filepath, unit):
    unit_name = UNIT_NAMES.get(unit, unit.title())
    day = get_day_number(filepath)
    
    if is_assessment(day):
        return False, "assessment - skipped"
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Extract all page renders
    page_pattern = r'render:\s*\(\)\s*=>\s*`(.*?)`'
    pages = re.findall(page_pattern, content, re.DOTALL)
    
    if len(pages) < 3:
        return False, f"only {len(pages)} pages"
    
    # Find vocab words from page 2 (or page 3 if page 2 is already a welcome page)
    vocab_words = []
    vocab_page_idx = None
    vocab_practice_idx = None
    
    for i, p in enumerate(pages):
        if not vocab_words and ('vocab-word' in p or 'vocab_word' in p or "Today's New Words" in p or 'New Vocabulary' in p or 'vocab-card' in p):
            vocab_words = extract_vocab_words(p)
            vocab_page_idx = i
        if vocab_practice_idx is None and ('Vocabulary Practice' in p or 'Matching Game' in p or 'Vocabulary Matching' in p or 'vocab-game' in p or 'vocab-review' in p or 'Review your words' in p):
            vocab_practice_idx = i
    
    if not vocab_words:
        return False, "no vocab words found"
    
    # Get story title from title page
    story_title = None
    m = re.search(r'color: #666[^>]*>\s*([^<]+)', pages[0])
    if m:
        story_title = m.group(1).strip()
        if 'Assessment' in story_title:
            story_title = None
    
    # Build new pages
    welcome_page = build_welcome_page(day, unit_name, story_title)
    new_vocab_page = build_vocab_page(vocab_words)
    
    # Now rebuild: replace page 2 with welcome, replace vocab page with new vocab, remove vocab practice
    # Strategy: work with the raw content using regex to find and replace each page render
    
    # Find all page render positions
    page_positions = []
    for m in re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', content, re.DOTALL):
        page_positions.append((m.start(2), m.end(2), m.group(2)))
    
    if len(page_positions) < 3:
        return False, f"only {len(page_positions)} page positions"
    
    # Determine what to do based on current structure
    # We want: [title] [welcome] [vocab-write] [story pages...] [rest...]
    # Currently: [title] [vocab-given] [vocab-practice] [story pages...] [rest...]
    # OR:        [title] [vocab-given] [story pages...] [rest...]
    
    # Build replacement map
    replacements = []  # (start, end, new_content)
    
    # Page index 1 (page 2): Replace with welcome page
    replacements.append((page_positions[1][0], page_positions[1][1], '\n' + welcome_page + '\n                    '))
    
    if vocab_page_idx is not None and vocab_page_idx == 1:
        # Vocab was page 2, now welcome is page 2
        if vocab_practice_idx is not None and vocab_practice_idx == 2:
            # Replace vocab practice (page 3) with new vocab
            replacements.append((page_positions[2][0], page_positions[2][1], '\n' + new_vocab_page + '\n                    '))
        else:
            # No separate practice page - need to INSERT new vocab after welcome
            # Insert by replacing page 3 content with vocab + original page 3
            # Actually easier: just replace page 2 content with welcome, and insert vocab before page 3
            # Let's use a different approach - rebuild the pages array
            pass
    
    # If we only have 2 replacements (welcome + vocab), apply them
    if len(replacements) == 2:
        # Apply in reverse order to preserve positions
        replacements.sort(key=lambda x: x[0], reverse=True)
        for start, end, new_content in replacements:
            content = content[:start] + new_content + content[end:]
    elif len(replacements) == 1:
        # Only replaced page 2 with welcome, need to also handle vocab
        # If vocab_practice exists at index 2, replace it with new vocab page
        # Otherwise we need to insert
        if vocab_practice_idx == 2:
            replacements.append((page_positions[2][0], page_positions[2][1], '\n' + new_vocab_page + '\n                    '))
            replacements.sort(key=lambda x: x[0], reverse=True)
            for start, end, new_content in replacements:
                content = content[:start] + new_content + content[end:]
        else:
            # Replace page 2 with welcome, then insert new vocab page as new page 3
            # First apply page 2 replacement
            start, end, new_content = replacements[0]
            content = content[:start] + new_content + content[end:]
            
            # Now find the boundary between page 2 and page 3 to insert
            # Find the `}, {` between them
            page_positions2 = []
            for m in re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', content, re.DOTALL):
                page_positions2.append(m)
            
            if len(page_positions2) >= 2:
                # Insert after page 2's closing
                insert_point = page_positions2[1].end()
                insert_text = f''',
                {{
                    render: () => `
{new_vocab_page}
                    `
                }}'''
                content = content[:insert_point] + insert_text + content[insert_point:]
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    return True, f"{story_title or 'story'} ({len(vocab_words)} vocab words)"

# Process all units
total = 0
updated = 0
skipped = 0
for unit in sorted(UNIT_NAMES):
    unit_dir = os.path.join(BASE, unit)
    if not os.path.isdir(unit_dir):
        continue
    files = sorted(glob.glob(os.path.join(unit_dir, "*.html")), key=get_day_number)
    if not files:
        continue
    print(f"\n=== {UNIT_NAMES[unit]} ({len(files)} files) ===")
    for f in files:
        total += 1
        day = get_day_number(f)
        success, msg = process_file(f, unit)
        if success:
            updated += 1
            print(f"  ✅ Day {day}: {msg}")
        else:
            skipped += 1
            print(f"  ⏭️  Day {day}: {msg}")

print(f"\n🎯 Updated {updated}/{total} files ({skipped} skipped)")
