# Sam and the Wolf - Interactive Storybook

## Overview

Added a turn-taking interactive storybook feature to Week 1 Day 1! Billy and the student take turns reading pages.

## How It Works

**Turn-Taking Structure:**
- **Odd pages (1, 3, 5, 7, 9, 11):** Billy reads narrative text (auto-plays when page loads)
- **Even pages (2, 4, 6, 8, 10, 12):** Student reads decodable sentence (prompted by Billy)

**Pacing:**
- After Billy reads: 2.5 second pause before auto-advancing
- After student prompt: 4 second pause for student to read aloud
- Students can navigate freely with Previous/Next buttons or page dots

## Story Content

**Title:** Sam and the Wolf

**Summary:** 
A brave ram named Sam protects his flock from a sneaky wolf using quick thinking and loud noises. The wolf gives up and runs away, and Sam is celebrated as a hero.

**Short A Words Used:**
ram, hat, nap, tan, mat, bad, plan, grab, lamb, ran, damp, gap, pan, hid, Sam, gate, Bang, back, rag, clang, zag, dazed, ran, sang, van, pat, jam, glad, nap

**Page Breakdown:**

1. **Narrative:** Introduces Sam the ram on a hill, wearing a red hat, likes to nap
2. **Decodable:** "Sam naps on a tan mat."
3. **Narrative:** Wolf prowls at night with a bad plan to grab a lamb
4. **Decodable:** "The wolf will grab a lamb."
5. **Narrative:** Wolf creeps through gap in fence, lamb gets scared and runs
6. **Decodable:** "The lamb ran and hid."
7. **Narrative:** Sam doesn't run, rushes to gate and rams it hard, makes loud bang
8. **Decodable:** "Sam ran to the gate and hit it."
9. **Narrative:** Sam waves rag, clangs pan, brave bray, zig-zag moves confuse wolf
10. **Decodable:** "He made a big bang with a pan."
11. **Narrative:** Lambs celebrate Sam as brave, shepherd comes with jam bread
12. **Decodable:** "Sam and the lambs are glad."

## Visual Design

**Narrative Pages (Billy reads):**
- Gold border (#FFD700)
- Cream gradient background
- Badge: "📖 Billy reads"
- Italic serif font for story text (Georgia)
- Indicator: "🔊 Billy is reading..."

**Decodable Pages (Student reads):**
- Orange border (#B06821)
- Yellow gradient background
- Badge: "✏️ You read"
- Large bold text (32px) in orange
- Prompt above: Billy's instruction
- Indicator: "👆 Read the sentence above out loud!"

**Navigation:**
- Previous/Next buttons (orange #B06821)
- Page dots (clickable, active page highlighted)
- Progress: "Page X of 12" at top

## Technical Implementation

**Files:**
- `js/billy-storybook.js` (8.1 KB) - BillyStoryBook class
- `css/billy-instructor.css` - Storybook styling (appended)
- `1st-grade-week-1-day-1-HYBRID.html` - Integrated as Page 8

**Class: BillyStoryBook**

```javascript
new BillyStoryBook(storyData, containerId)
```

**Methods:**
- `render()` - Display current page
- `readCurrentPage()` - Auto-read narrative or prompt student
- `nextPage()` - Navigate forward
- `previousPage()` - Navigate backward
- `goToPage(pageNum)` - Jump to specific page
- `start()` - Begin from page 1 with auto-read

**Story Data Format:**

```javascript
{
  title: "Sam and the Wolf",
  pages: [
    {
      text: "Narrative text or decodable sentence",
      type: "narrative" | "decodable",
      prompt: "Optional prompt for decodable pages"
    }
  ]
}
```

## Integration

**Day 1 Structure (11 pages):**
1. Title
2. Objectives
3. Mini-Lesson (auto-starts)
4. Word Building
5. Sam's Van (original story)
6. Comprehension
7. Sight Words
8. **Sam and the Wolf Storybook** ⭐ NEW!
9. Memory Game
10. Matching Game
11. Completion

**Initialization:**

```javascript
// Triggered when currentPage === 7 (Page 8, 0-indexed)
window.samWolfStory = new BillyStoryBook(samAndTheWolfStory, 'sam-wolf-storybook-container');
window.samWolfStory.start();
```

## Text-to-Speech

**Primary:** ElevenLabs API (Mark voice)
- Uses global `speakBilly()` function
- Cheerful settings (stability 0.3, style 0.4)
- Model: eleven_turbo_v2_5

**Fallback:** Browser Web Speech API
- Rate: 0.85 (slightly slower)
- Pitch: 1.1 (slightly higher)

## Testing

**Test URL:**
```
http://localhost:3000/1st-grade-week-1-day-1-HYBRID.html
```

**Navigate to Page 8:**
1. Click through pages 1-7 OR use arrow keys
2. Page 8 auto-loads story book
3. Billy automatically starts reading Page 1
4. After 2.5s pause, ready to flip to Page 2
5. Page 2 shows decodable sentence for student

**What to test:**
- [ ] Story book loads on Page 8
- [ ] Billy auto-reads narrative pages (odd)
- [ ] Student pages show large bold text (even)
- [ ] Page navigation works (prev/next/dots)
- [ ] Audio uses ElevenLabs (cheerful Mark voice)
- [ ] Pacing feels right for 1st grader
- [ ] Visual design matches BedrockELA standard

## Future Enhancements

**Possible additions:**
- Highlight current word as Billy reads (karaoke style)
- Record student's voice reading decodable pages
- Comprehension check after story (2-3 questions)
- Different story themes for each day/week
- Student can choose story speed (slow/normal/fast)

## Reusability

This storybook component can be reused for ANY story by:

1. Define story data object with pages array
2. Add container div with unique ID
3. Initialize with `new BillyStoryBook(storyData, containerId)`
4. Call `.start()` to begin

**Example:**

```javascript
const myStory = {
  title: "The Cat and the Hat",
  pages: [
    { text: "A cat sat on a mat.", type: "narrative" },
    { prompt: "Now you read:", text: "The cat has a hat.", type: "decodable" },
    // ... more pages
  ]
};

window.myStoryBook = new BillyStoryBook(myStory, 'my-story-container');
myStoryBook.start();
```

## Status

✅ **COMPLETE** - Ready for testing with Emmett (6yo, 1st grade)

**Commit:** 028742d2  
**Pushed to GitHub:** main branch  
**Live servers:**
- HTTP: http://localhost:3000
- TTS API: http://localhost:3002
