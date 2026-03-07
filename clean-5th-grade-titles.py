#!/usr/bin/env python3
"""Clean up 5th grade title pages to match 6th grade style."""
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
    """Extract day number - look for the LAST number group (skip '5th')."""
    nums = re.findall(r'(\d+)', os.path.basename(filename))
    # Return the largest/last number (the day), skip "5" from "5th"
    for n in reversed(nums):
        if int(n) > 10:  # day numbers are 41+
            return int(n)
    # fallback for small numbers like day-189
    return int(nums[-1]) if nums else 0

def is_assessment(day):
    return day % 5 == 0

def extract_info_from_content(content):
    """Extract story title and chapter info from existing title page."""
    story = None
    chapter = None
    
    # Arabian style: <h1 class="lesson-title">Story Name</h1>
    m = re.search(r'class="lesson-title">([^<]+)', content)
    if m:
        story = m.group(1).strip()
    
    # Dracula/Greek/Roman/Norse/Egyptian/Celtic: <h1>Chapter X: Title</h1> in lesson-title div
    if not story:
        m = re.search(r'<div class="lesson-title">\s*<h1>([^<]+)</h1>', content)
        if m:
            story = m.group(1).strip()
    
    # Subtitle
    m = re.search(r'<p class="subtitle">([^<]+)</p>', content)
    if m:
        chapter = m.group(1).strip()
    
    # Check if it's an assessment
    is_assess_content = bool(re.search(r'Assessment|assessment|Vocabulary Quiz', content[:3000]))
    
    # Arabian style: reading title from objectives
    if not story:
        m = re.search(r'<strong>Reading:</strong>\s*Read and understand "([^"]+)"', content)
        if m:
            story = m.group(1).strip()
    
    # Try "Read: Title" pattern
    if not story:
        m = re.search(r'<li>Read:?\s*([^<]+)</li>', content)
        if m:
            val = m.group(1).strip()
            if 'Chapter' in val or len(val) > 5:
                story = val
    
    # Unit review
    if not story:
        m = re.search(r'Unit Review', content[:3000])
        if m:
            story = 'Unit Review'
    
    return story, chapter, is_assess_content

def build_clean_title(day, unit_name, story_title, chapter, is_assess):
    lesson_num = day
    
    if is_assess:
        return f'''<div class="lesson-page-card title-page">
                            
                            <h1>Lesson {lesson_num}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">
                                {unit_name}
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Weekly Assessment
                            </p>
                        </div>'''
    
    story_line = story_title or ''
    if story_line:
        story_html = f'''
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                {story_line}
                            </p>'''
    else:
        story_html = ''
    
    return f'''<div class="lesson-page-card title-page">
                            
                            <h1>Lesson {lesson_num}</h1>
                            <div class="subtitle">5th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">
                                {unit_name}
                            </p>{story_html}
                        </div>'''

def process_file(filepath, unit):
    unit_name = UNIT_NAMES.get(unit, unit.title())
    day = get_day_number(filepath)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    story_title, chapter, is_assess_content = extract_info_from_content(content)
    is_assess = is_assessment(day) or is_assess_content
    
    clean_title = build_clean_title(day, unit_name, story_title, chapter, is_assess)
    
    # Replace first page render block
    # Pattern: render: () => `...content...`  }, (next page)
    first_page_pattern = r"(pages:\s*\[\s*\{\s*render:\s*\(\)\s*=>\s*`)(.+?)(`\s*\}\s*,)"
    m = re.search(first_page_pattern, content, re.DOTALL)
    
    if m:
        new_content = content[:m.start(2)] + '\n' + clean_title + '\n                    ' + content[m.end(2):]
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"  ✅ Day {day}: {story_title or 'Assessment'}")
        return True
    
    # Single-page files (some assessments)
    first_page_pattern2 = r"(pages:\s*\[\s*\{\s*render:\s*\(\)\s*=>\s*`)(.+?)(`\s*\}\s*\])"
    m2 = re.search(first_page_pattern2, content, re.DOTALL)
    if m2:
        new_content = content[:m2.start(2)] + '\n' + clean_title + '\n                    ' + content[m2.end(2):]
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"  ✅ Day {day}: {story_title or 'Assessment'} (single-page)")
        return True
    
    print(f"  ❌ Day {day}: Could not find title page pattern")
    return False

total = 0
updated = 0
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
        if process_file(f, unit):
            updated += 1

print(f"\n🎯 Updated {updated}/{total} files")
