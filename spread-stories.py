#!/usr/bin/env python3
"""
Spread story text from .docx files across 4 reading pages in Greek and Roman lessons.
Replaces placeholder "Content continues..." pages with actual story content.
"""
import re, glob, os, html

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"
STORIES_DIR = "/tmp/stories"

def get_day(fn):
    nums = re.findall(r'(\d+)', os.path.basename(fn))
    for n in reversed(nums):
        if int(n) > 10: return int(n)
    return int(nums[-1]) if nums else 0

def load_story(filepath):
    """Load and clean story text from .txt file."""
    with open(filepath) as f:
        text = f.read().strip()
    
    # Remove title lines (usually first 1-3 lines are title/subtitle)
    lines = text.split('\n')
    # Skip blank lines and title-looking lines at start
    start = 0
    for i, line in enumerate(lines):
        if i > 4:
            break
        stripped = line.strip()
        if not stripped:
            continue
        # Title lines are usually short and capitalized
        if len(stripped) < 80 and not stripped[0].islower():
            start = i + 1
        else:
            break
    
    text = '\n'.join(lines[start:]).strip()
    
    # Split into paragraphs
    paragraphs = [p.strip() for p in text.split('\n') if p.strip()]
    return paragraphs

def split_into_4_parts(paragraphs):
    """Split paragraphs into 4 roughly equal parts."""
    total_chars = sum(len(p) for p in paragraphs)
    target = total_chars / 4
    
    parts = [[], [], [], []]
    current_part = 0
    current_chars = 0
    
    for p in paragraphs:
        parts[current_part].append(p)
        current_chars += len(p)
        if current_chars >= target and current_part < 3:
            current_part += 1
            current_chars = 0
    
    # Make sure each part has at least something
    # Move from heavy parts to empty ones
    for i in range(4):
        if not parts[i]:
            for j in range(3, -1, -1):
                if len(parts[j]) > 1:
                    parts[i].append(parts[j].pop())
                    break
    
    return parts

def build_reading_page(part_num, total_parts, story_title, paragraphs):
    """Build a reading page HTML."""
    text_html = '\n            '.join(f'<p>{html.escape(p)}</p>' for p in paragraphs)
    
    return f'''<div class="lesson-page-card content-page">
        <div class="page-header">
            <h2>📚 Reading (Part {part_num} of {total_parts})</h2>
            <p>{html.escape(story_title)}</p>
        </div>
        <div class="reading-text">
            {text_html}
        </div>
        <div class="page-nav">
            <button class="btn-prev" onclick="prevPage()">← Back</button>
            <button class="btn-next" onclick="nextPage()">Continue →</button>
        </div>
    </div>'''

# Map story titles in lessons to .docx filenames
def find_story_file(story_title, prefix):
    """Find the story .txt file for a given title."""
    # Normalize title to match filename
    clean = story_title.lower().replace("'", "").replace("'", "").replace(",", "").replace(":", "").replace("ö", "o").replace("ý", "y")
    
    for f in glob.glob(os.path.join(STORIES_DIR, f"{prefix}_*.txt")):
        fname = os.path.basename(f).lower().replace(".txt", "").replace(f"{prefix.lower()}_", "")
        fname_clean = fname.replace("_", " ").replace("'", "").replace(",", "")
        
        # Fuzzy match
        if clean.replace(" ", "") == fname_clean.replace(" ", ""):
            return f
        
        # Word overlap
        title_words = set(re.findall(r'\w+', clean)) - {'the', 'of', 'and', 'a'}
        file_words = set(re.findall(r'\w+', fname_clean)) - {'the', 'of', 'and', 'a'}
        if title_words and file_words:
            overlap = len(title_words & file_words)
            if overlap >= max(2, len(file_words) * 0.5):
                return f
    
    return None

# Process Greek and Roman lessons
updated = 0

for unit, prefix in [('greek', 'GREEK'), ('roman', 'ROMAN')]:
    unit_dir = os.path.join(BASE, unit)
    print(f"\n=== {unit.upper()} ===")
    
    for f in sorted(glob.glob(os.path.join(unit_dir, "*.html")), key=get_day):
        day = get_day(f)
        if day % 5 == 0:
            continue
        
        with open(f) as fh:
            content = fh.read()
        
        pages = re.findall(r'render:\s*\(\)\s*=>\s*\x60(.*?)\x60', content, re.DOTALL)
        
        # Find reading page indices
        reading_indices = []
        for i, p in enumerate(pages):
            if 'Reading' in p[:300] and 'Part' in p[:300]:
                reading_indices.append(i)
        
        if len(reading_indices) < 3:
            continue
        
        # Check if pages need fixing (have placeholder or very short)
        needs_fix = any('Content continues' in pages[idx] or len(pages[idx]) < 600 for idx in reading_indices)
        if not needs_fix:
            # Also check if story is crammed into one page
            sizes = [len(pages[idx]) for idx in reading_indices]
            if not (max(sizes) > 2500 and min(sizes) < 600):
                continue
        
        # Get story title
        story_title = None
        m = re.search(r'color: #666[^>]*>\s*([^<]+)', pages[0])
        if m:
            story_title = m.group(1).strip()
        if not story_title or 'Assessment' in story_title:
            continue
        
        # Find story file
        story_file = find_story_file(story_title, prefix)
        if not story_file:
            print(f"  ❌ Day {day}: {story_title} — no story file found")
            continue
        
        # Load and split story
        paragraphs = load_story(story_file)
        if not paragraphs:
            print(f"  ❌ Day {day}: {story_title} — empty story")
            continue
        
        parts = split_into_4_parts(paragraphs)
        
        # Build new reading pages
        new_reading_pages = []
        for i, part in enumerate(parts, 1):
            new_reading_pages.append(build_reading_page(i, 4, story_title, part))
        
        # Replace reading pages in content
        # Work backwards to preserve positions
        page_positions = list(re.finditer(r'(\{\s*render:\s*\(\)\s*=>\s*`)(.*?)(`\s*\})', content, re.DOTALL))
        
        # Replace each reading page
        replacements = []
        for j, idx in enumerate(reading_indices[:4]):
            if j < len(new_reading_pages) and idx < len(page_positions):
                start = page_positions[idx].start(2)
                end = page_positions[idx].end(2)
                replacements.append((start, end, '\n' + new_reading_pages[j] + '\n                    '))
        
        # Apply replacements in reverse
        replacements.sort(key=lambda x: x[0], reverse=True)
        for start, end, new_html in replacements:
            content = content[:start] + new_html + content[end:]
        
        with open(f, 'w') as fh:
            fh.write(content)
        
        total_chars = sum(len(p) for part in parts for p in part)
        print(f"  ✅ Day {day}: {story_title} ({total_chars} chars across 4 pages)")
        updated += 1

print(f"\n🎯 Updated {updated} lessons with spread stories")
