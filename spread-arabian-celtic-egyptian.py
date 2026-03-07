#!/usr/bin/env python3
"""Spread story text across 4 reading pages for Arabian, Celtic, Egyptian lessons."""

import re, os, textwrap

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"

# Regular days (not assessments)
REGULAR_DAYS = {
    "arabian": [41, 42, 43, 44, 46, 47, 48],
    "celtic": [49, 51, 52, 53, 54],
    "egyptian": [56, 57, 58],
}

def split_text_into_parts(text, n=4):
    """Split text into n roughly equal parts by paragraphs."""
    # Split into paragraphs
    paragraphs = [p.strip() for p in text.split('\n') if p.strip()]
    if not paragraphs:
        return [''] * n
    
    # If few paragraphs, split the longest ones
    if len(paragraphs) < n:
        # Just distribute what we have
        result = []
        for i in range(n):
            idx = int(i * len(paragraphs) / n)
            end = int((i + 1) * len(paragraphs) / n)
            result.append('\n'.join(paragraphs[idx:end]) if idx < end else '')
        return result
    
    # Distribute paragraphs evenly by character count
    total_chars = sum(len(p) for p in paragraphs)
    target = total_chars / n
    
    parts = []
    current = []
    current_len = 0
    part_idx = 0
    
    for p in paragraphs:
        current.append(p)
        current_len += len(p)
        if current_len >= target and part_idx < n - 1:
            parts.append(current)
            current = []
            current_len = 0
            part_idx += 1
    
    if current:
        if len(parts) < n:
            parts.append(current)
        else:
            parts[-1].extend(current)
    
    # Pad if needed
    while len(parts) < n:
        parts.append([])
    
    return ['\n'.join(ps) for ps in parts[:n]]

def extract_story_html(html):
    """Extract story content from Part 1's story-text div."""
    # Find Part 1 of 4's story-text content
    pattern = r'(Part 1 of 4.*?<div class="story-text">)\s*(.*?)\s*(</div>\s*<div class="page-footer">)'
    m = re.search(pattern, html, re.DOTALL)
    if not m:
        return None, None, None
    return m.group(2), m.start(2), m.end(2)

def process_file(filepath):
    with open(filepath, 'r') as f:
        html = f.read()
    
    story_html, _, _ = extract_story_html(html)
    if not story_html or not story_html.strip():
        print(f"  SKIP: No story content found")
        return False
    
    # Extract text content, preserving vocab highlights
    # Split by <p> tags or just by paragraphs
    # The story is usually in one big <p> tag
    story_content = story_html.strip()
    
    # Remove wrapping <p> tags if present
    if story_content.startswith('<p>') and story_content.endswith('</p>'):
        story_content = story_content[3:-4]
    
    # Split into paragraphs by newlines (the stories use \n between paragraphs)
    paragraphs = [p.strip() for p in story_content.split('\n') if p.strip()]
    
    if len(paragraphs) < 4:
        # Try splitting by sentences if only one big block
        sentences = re.split(r'(?<=[.!?])\s+', story_content)
        if len(sentences) >= 8:
            per_part = len(sentences) // 4
            parts = []
            for i in range(4):
                start = i * per_part
                end = start + per_part if i < 3 else len(sentences)
                parts.append(' '.join(sentences[start:end]))
        else:
            print(f"  SKIP: Too few paragraphs/sentences ({len(paragraphs)} paras, {len(sentences)} sentences)")
            return False
    else:
        # Distribute paragraphs evenly
        total_chars = sum(len(p) for p in paragraphs)
        target = total_chars / 4
        
        parts_lists = []
        current = []
        current_len = 0
        part_idx = 0
        
        for p in paragraphs:
            current.append(p)
            current_len += len(p)
            if current_len >= target and part_idx < 3:
                parts_lists.append(current)
                current = []
                current_len = 0
                part_idx += 1
        
        if current:
            if len(parts_lists) < 4:
                parts_lists.append(current)
            else:
                parts_lists[-1].extend(current)
        
        while len(parts_lists) < 4:
            parts_lists.append([])
        
        # Wrap each paragraph in <p> tags
        parts = []
        for plist in parts_lists[:4]:
            wrapped = '\n'.join(f'<p>{p}</p>' if not p.startswith('<p>') else p for p in plist)
            parts.append(wrapped)
    
    # Now replace each Part's story-text content
    for i in range(4):
        part_num = i + 1
        # Pattern to find this part's story-text div
        pattern = rf'(Part {part_num} of 4.*?<div class="story-text">)\s*(.*?)\s*(</div>\s*<div class="page-footer">)'
        m = re.search(pattern, html, re.DOTALL)
        if m:
            replacement = f'{m.group(1)}\n        {parts[i]}\n      {m.group(3)}'
            html = html[:m.start()] + replacement + html[m.end():]
    
    with open(filepath, 'w') as f:
        f.write(html)
    return True

count = 0
for unit, days in REGULAR_DAYS.items():
    for day in days:
        filepath = os.path.join(BASE, unit, f"5th-grade-lesson-{day}.html")
        if not os.path.exists(filepath):
            print(f"MISSING: {filepath}")
            continue
        print(f"Processing {unit}/Day {day}...", end="")
        if process_file(filepath):
            count += 1
            print(" ✅")
        else:
            print(" ⚠️")

print(f"\nDone! Spread stories in {count} lessons.")
