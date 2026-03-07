#!/usr/bin/env python3
"""Convert Celtic/Egyptian lessons to match Arabian/Greek/Roman/Norse structure."""

import re, os, glob

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"

# Week mapping: day -> week number
def get_week(day):
    return ((day - 1) // 5) + 1

count = 0
for f in sorted(glob.glob(f"{BASE}/celtic/5th-grade-lesson-*.html") + 
                glob.glob(f"{BASE}/egyptian/5th-grade-lesson-*.html")):
    html = open(f).read()
    original = html
    
    day = int(re.search(r'lesson-(\d+)', f).group(1))
    week = get_week(day)
    
    # Skip assessments (no reading pages)
    if 'reading-text' not in html:
        print(f"Day {day}: assessment, skipping")
        continue
    
    # Get story title from Part 1
    title_match = re.search(r'Part 1 of 4\)</h2>\s*<p>([^<]+)</p>', html)
    story_title = title_match.group(1) if title_match else "Story"
    
    # Replace all 4 reading page headers
    for part in range(1, 5):
        # Old: <h2>📚 Reading (Part X of 4)</h2>\n            <p>Story Title</p>
        old_pattern = rf'<h2>📚 Reading \(Part {part} of 4\)</h2>\s*<p>[^<]*</p>'
        new_header = f'<div class="lesson-number">Day {day} • Week {week}</div>\n        <div class="unit-label">{story_title} • Part {part} of 4</div>'
        html = re.sub(old_pattern, new_header, html)
    
    # Replace reading-text with story-text
    html = html.replace('class="reading-text"', 'class="story-text"')
    
    if html != original:
        open(f, 'w').write(html)
        count += 1
        print(f"Day {day}: ✅ converted ({story_title})")

print(f"\nConverted {count} lessons")
