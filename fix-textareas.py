#!/usr/bin/env python3
"""Replace old-style textareas with proper styled ones + word count."""

import re, glob, os

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"

# Counter for unique IDs within each file
count = 0

def make_styled_textarea(textarea_id, min_words=50, placeholder="Write your answer here (minimum 50 words)..."):
    return f'''<textarea 
                                      id="{textarea_id}"
                                      style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                      oninput="updateWordCount('{textarea_id}', 'word-count-{textarea_id}', {min_words})"
                                      placeholder="{placeholder}"
                                    ><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                      <span id="word-count-{textarea_id}" style="font-size: 14px; color: #666;">0 / {min_words} words</span>
                                      <span id="word-count-{textarea_id}-status" style="font-size: 14px; font-weight: 600;"></span>
                                    </div>'''

total_files = 0

for f in sorted(glob.glob(f"{BASE}/*/5th-grade-*.html")):
    html = open(f).read()
    original = html
    
    # Track textarea counter per file
    ta_counter = [0]
    
    def replace_textarea(m):
        ta_counter[0] += 1
        full = m.group(0)
        
        # Skip textareas that already have updateWordCount (already styled)
        if 'updateWordCount' in full:
            return full
        
        # Extract existing id if any
        id_match = re.search(r'id="([^"]*)"', full)
        existing_id = id_match.group(1) if id_match else None
        
        # Determine context from surrounding text to pick appropriate id prefix
        # Use existing id or generate one
        if existing_id:
            ta_id = existing_id
        else:
            ta_id = f"text-{ta_counter[0]}"
        
        # Determine min words based on context
        # Journal/writing = 50, info questions = 30, language practice = 20
        min_words = 50
        
        # Extract placeholder if any
        ph_match = re.search(r'placeholder="([^"]*)"', full)
        placeholder = ph_match.group(1) if ph_match else f"Write your answer here (minimum {min_words} words)..."
        if 'minimum' not in placeholder:
            placeholder = f"Write your answer here (minimum {min_words} words)..."
        
        return make_styled_textarea(ta_id, min_words, placeholder)
    
    # Match old-style textareas: <textarea ...rows="X"...>...</textarea> or <textarea ...class="answer-input"...>
    # Pattern: textarea with rows= or class="answer-input" that does NOT have updateWordCount
    html = re.sub(
        r'<textarea[^>]*(?:rows="[0-9]"|class="answer-input")[^>]*>(?:</textarea>|<\\/textarea>)?',
        replace_textarea,
        html
    )
    
    if html != original:
        open(f, 'w').write(html)
        total_files += 1
        day = re.search(r'(\d+)\.html', f).group(1)
        unit = f.split('grade5/')[1].split('/')[0]
        print(f"Day {day} ({unit}): ✅ {ta_counter[0]} textareas fixed")

print(f"\nFixed textareas in {total_files} files")
