# 1st Grade Curriculum Spine

**Official structure for all 36 weeks of 1st grade BedrockELA**

## Week Format: 5 Days

**Days 1-4:** Instruction Days (11-13 pages)  
**Day 5:** Assessment Day (24 pages)

---

## Regular Day Structure (Days 1-4)

### Standard 11-Page Format:

1. **Title Page**
   - Grade badge, Day #, Week #
   - Word families being taught
   - Story title with emoji badge

2. **Welcome & Objectives**
   - Greeting
   - What they'll learn today (bulleted list)
   - Billy avatar appears

3. **Mini-Lesson** (Billy auto-starts)
   - Phoneme introduction/review
   - Word family instruction
   - Blending practice
   - ~5 minutes, audio-guided by Billy

4. **Word Building Activity**
   - Interactive tap-to-build
   - Onset cards + rime selector (or fixed rime)
   - Tap letter → hear word
   - Visual feedback (card turns green when selected)

5. **Decodable Story**
   - Short story (8-10 lines)
   - Uses only taught phonics patterns
   - Large text, line breaks for readability

6. **Comprehension Question 1**
   - Multiple choice (3-4 options)
   - Immediate feedback (green/red)
   - Question about story content

7. **Comprehension Question 2** (Optional: Day 1 has 3 = 13 pages)
   - Same format as Q1
   - Different aspect of story

8. **Sight Words**
   - 1-2 words introduced/reviewed
   - Large display cards
   - Tap to hear
   - Example sentences

9. **Interactive Storybook** (Turn-Taking Reading)
   - 12 pages total
   - Odd pages: Billy reads narrative (auto-plays, 2.5s pause)
   - Even pages: Student reads decodable sentence (4s pause)
   - Page dots navigation
   - Visual badges: 📖 Billy reads / ✏️ You read

10. **Game**
    - Memory game (match pairs) OR
    - Matching game (connect related) OR
    - Word sorting activity

11. **Completion**
    - Celebration message
    - Stats (Day X Complete, Week X In Progress)
    - Return to Dashboard button

---

## Assessment Day Structure (Day 5)

### 24-Page Format:

1. **Title Page**
   - "Week X Assessment"
   - "Show What You Know!"
   - Celebration emoji (🌟)

2. **Welcome & Instructions**
   - Billy explains format
   - "No pressure, no rush, just do your best!"
   - What they'll do today (bulleted)

3-22. **Individual Word Pages (20 pages)**
   - ONE WORD PER PAGE
   - "Word X of 20" progress indicator
   - Huge word display (120px font)
   - "Try to read it first, then tap to hear!"
   - Tap → ElevenLabs TTS plays word
   - Word turns green when played

23. **Sight Word Quiz**
    - Practice all sight words from the week
    - Tap to hear
    - Example sentences shown

24. **Completion**
    - Celebration: "Week X Complete!"
    - Stats: X words, X sight words, X stories, 5 days
    - Preview: "Next week: [Next phoneme]"
    - Return to Dashboard

---

## Progressive Content Pattern

### Days 1-4 Progression:

**Day 1:** Introduce first word family  
**Day 2:** Add 1-2 more word families  
**Day 3:** Add 2-3 more word families (wider practice)  
**Day 4:** Review ALL families + fluency focus

### Example (Week 1 - Short A):
- Day 1: -at (cat, mat, bat, sat, rat)
- Day 2: -an, -am (man, pan, jam, ham)
- Day 3: -ap, -ag, -ad, -ab (cap, bag, dad, cab)
- Day 4: Review all 6 families + phrase reading
- Day 5: Assessment (20 words from all families)

---

## Key Features (All Days)

✅ **Billy Instructor System**
- Avatar-guided learning
- ElevenLabs Mark voice (cheerful, clear)
- Auto-starts on mini-lesson pages
- Replay button always available

✅ **Interactive Activities**
- Tap/click, not passive reading
- Immediate audio/visual feedback
- No keyboard input required

✅ **Turn-Taking Storybooks**
- Billy reads narrative (context, story arc)
- Student reads decodables (CVC words, taught patterns)
- Alternating pages create natural rhythm

✅ **Visual Design**
- No scrolling (one card fills screen)
- Arrow navigation (← →)
- Page dots at bottom
- Progress indicator at top
- Color-coded feedback (green = correct, red = incorrect)

✅ **Accessibility**
- Text-to-speech on all words
- Large, clear fonts
- High contrast colors
- Simple, intuitive interface

---

## Time Estimates

- **Regular Day (1-4):** 25-30 minutes
- **Assessment Day (5):** 15-20 minutes
- **Full Week:** ~2 hours total

---

## Technical Stack

**Files per day:**
- 1 HTML page (day-X-HYBRID.html)
- Shared JS: billy-mini-lesson.js, billy-week1-lessons.js, billy-games.js
- Unique JS: billy-dayX-storybook.js (one per day)
- Shared CSS: lesson-viewer.css, billy-instructor.css

**Dependencies:**
- ElevenLabs TTS API (localhost:3002 server)
- Browser Web Speech API (fallback)
- Firebase (progress tracking - optional)

---

## Content Requirements Per Week

**To build a complete week, you need:**

1. **Phoneme focus** (e.g., Short A, Short E, etc.)
2. **Word families** (6-8 families per week)
3. **4 decodable stories** (8-10 lines each, Days 1-4)
4. **4 interactive storybooks** (12 pages each, narrative + decodables)
5. **Sight words** (2-3 new words per week)
6. **20 assessment words** (from all families taught)
7. **Billy mini-lesson scripts** (Days 1-4, ~5 min each)

---

## Replication Instructions

**To build Week 2-36:**

1. Copy Day 1-5 HTML files from Week 1
2. Update content:
   - Phoneme focus (e.g., Short E)
   - Word families (e.g., -et, -en, -eg)
   - Story titles and text
   - Storybook content (12 pages each)
   - Sight words
   - Billy lesson scripts
3. Update file names: `1st-grade-week-X-day-Y-HYBRID.html`
4. Update JS storybook files: `billy-weekX-dayY-storybook.js`
5. Update mini-lesson scripts in `billy-weekX-lessons.js`
6. Test in browser
7. Push to GitHub

**This spine ensures consistency across all 180 days of 1st grade!** 📚

---

## Week 1 Status: ✅ COMPLETE

All 5 days built, tested, and live:
- Day 1: 13 pages (cat, mat, bat + Sam & the Wolf)
- Day 2: 11 pages (man, jam + The Lost Hat)
- Day 3: 11 pages (cap, bag, dad + The Barn Band)
- Day 4: 11 pages (Review + The Map to the Meadow)
- Day 5: 24 pages (20 words + sight words)

**Ready to replicate for Weeks 2-36!** 🎉
