#!/usr/bin/env python3
"""Split comprehension questions from 1 page into separate pages (6th grade style)."""

import re, os, glob

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5"

def make_comp_page(q_num, q_total, question_text, comp_id):
    """Generate a 6th-grade-style comprehension page."""
    return f'''<div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 30px;">Question {q_num} of {q_total}</p>
                            
                            <div style="margin: 30px 0;">
                                <div style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #8B4513;">
                                    <p style="font-weight: 600; margin-bottom: 12px;">Question {q_num}:</p>
                                    <p style="margin-bottom: 12px; color: #444;">{question_text}</p>
                                    <textarea 
                                      id="{comp_id}"
                                      style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                      oninput="updateWordCount('{comp_id}', 'word-count-{comp_id}', 50)"
                                      placeholder="Write your answer here (minimum 50 words)..."
                                    ><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                      <span id="word-count-{comp_id}" style="font-size: 14px; color: #666;">0 / 50 words</span>
                                      <span id="word-count-{comp_id}-status" style="font-size: 14px; font-weight: 600;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>'''

def extract_questions_arabian(html):
    """Extract questions from Arabian-style comprehension (comprehension-questions div)."""
    # Find the comprehension page
    m = re.search(r'Reading Comprehension.*?<div class="comprehension-questions">(.*?)</div>\s*</div>\s*</div>', html, re.DOTALL)
    if not m:
        return None, None, None
    
    block = m.group(1)
    questions = re.findall(r'<p class="question-text">(.*?)</p>', block, re.DOTALL)
    return questions, m.start(), m.end()

def extract_questions_celtic(html):
    """Extract questions from Celtic/Egyptian/Dracula/Greek/Roman/Norse style."""
    # Find the comprehension page block - it's a render function containing questions-section
    # Pattern: Comprehension Questions ... questions-section ... </div>` (end of render)
    m = re.search(
        r'(render:\s*\(\)\s*=>\s*`<div[^>]*>\s*(?:<div class="page-header">)?\s*<h2>✍️ Comprehension Questions</h2>.*?</div>\s*</div>`)',
        html, re.DOTALL
    )
    if not m:
        return None, None, None
    
    block = m.group(1)
    # Extract question text - different patterns
    # Pattern 1: <p><strong>1.</strong> question text</p>
    questions = re.findall(r'<strong>\d+\.</strong>\s*(.*?)</p>', block, re.DOTALL)
    if not questions:
        # Pattern 2: <p class="question-text">question</p>
        questions = re.findall(r'<p class="question-text">(.*?)</p>', block, re.DOTALL)
    
    return questions, m.start(), m.end()

def process_file(filepath):
    html = open(filepath).read()
    original = html
    
    # Try Arabian style first
    questions, start, end = extract_questions_arabian(html)
    style = "arabian"
    
    if not questions:
        questions, start, end = extract_questions_celtic(html)
        style = "celtic"
    
    if not questions:
        return False, "no comprehension found"
    
    # Build replacement: separate page for each question
    pages_js = []
    for i, q in enumerate(questions):
        q_clean = q.strip()
        comp_id = f"comp-{i+1}"
        page_html = make_comp_page(i+1, len(questions), q_clean, comp_id)
        pages_js.append(f'''                {{
                    render: () => `
                        {page_html}
                    `
                }}''')
    
    new_pages = ',\n'.join(pages_js)
    
    if style == "arabian":
        # Arabian: the whole comprehension is one page object in the pages array
        # Find the page object containing "Reading Comprehension" and "comprehension-questions"
        pattern = r'\{\s*render:\s*\(\)\s*=>\s*`<div class="lesson-page-card content-page">\s*<div class="page-header">.*?Reading Comprehension.*?</div>\s*</div>`\s*\}'
        m = re.search(pattern, html, re.DOTALL)
        if m:
            html = html[:m.start()] + new_pages + html[m.end():]
    else:
        # Celtic/Dracula/Greek/Roman/Norse: render function with questions-section
        # Find the full page object
        # We need to find the { render: () => `...Comprehension Questions...` }
        pattern = r'\{\s*render:\s*\(\)\s*=>\s*`(?:<div[^>]*>\s*)?(?:<div class="page-header">)?\s*<h2>✍️ Comprehension Questions</h2>.*?</div>`\s*\}'
        m = re.search(pattern, html, re.DOTALL)
        if m:
            html = html[:m.start()] + new_pages + html[m.end():]
    
    if html != original:
        open(filepath, 'w').write(html)
        return True, f"{len(questions)} questions split ({style})"
    return False, "no change"

count = 0
for f in sorted(glob.glob(f"{BASE}/*/5th-grade-lesson-*.html") + glob.glob(f"{BASE}/*/5th-grade-day-*.html")):
    day = re.search(r'(\d+)\.html', f).group(1)
    unit = f.split('grade5/')[1].split('/')[0]
    
    # Skip assessments
    html = open(f).read()
    if 'Assessment' in html and 'comprehension-questions' not in html and 'Comprehension Questions' not in html:
        continue
    
    ok, msg = process_file(f)
    if ok:
        count += 1
        print(f"Day {day} ({unit}): ✅ {msg}")
    elif 'no comp' not in msg:
        print(f"Day {day} ({unit}): ⚠️ {msg}")

print(f"\nFixed {count} lessons")
