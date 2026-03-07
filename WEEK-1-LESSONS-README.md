# Week 1 Billy Mini-Lessons - Complete! 🎉

## What's Built

All 5 days of Week 1 (Short A sound) are now complete with interactive mini-lessons:

### **Day 1** - Introduction to Short A (~3 min)
- File: `1st-grade-week-1-day-1-HYBRID.html`
- Script: `js/billy-mini-lesson.js`
- Topics: /a/ sound, -at family, blending (cat, mat, bat)
- Status: ✅ **LIVE & TESTED**

### **Day 2** - Blend Practice + New Rimes (~5 min)
- Script: `js/billy-week1-lessons.js` (day2)
- Topics: Review -at, introduce -an/-am (man, pan, ham)
- Sight word: "a"
- Status: ✅ **SCRIPT READY** - needs HTML page

### **Day 3** - Wider Practice (~5 min)
- Script: `js/billy-week1-lessons.js` (day3)
- Topics: -ap, -ag, -ad, -ab families (cap, bag, dad, cab)
- Word chains, sentence building
- Sight word: "the"
- Status: ✅ **SCRIPT READY** - needs HTML page

### **Day 4** - Fluency Practice (~5 min)
- Script: `js/billy-week1-lessons.js` (day4)
- Topics: Phrase reading, connected text, repeated reading
- Sight word review: a, the, is, I, my
- Status: ✅ **SCRIPT READY** - needs HTML page

### **Day 5** - Assessment (~5 min)
- Script: `js/billy-week1-lessons.js` (day5)
- Topics: Cold read probe (10 words), fluency passage, comprehension, writing prompt
- Assessment format
- Status: ✅ **SCRIPT READY** - needs HTML page

## How to Use

### Current Setup (Day 1)
```html
<!-- Day 1 uses its own dedicated script -->
<script src="js/billy-mini-lesson.js"></script>
```

### Days 2-5 Setup
```html
<!-- Include base class + week lessons -->
<script src="js/billy-mini-lesson.js"></script>
<script src="js/billy-week1-lessons.js"></script>

<!-- In your page script -->
<script>
  // Create lesson for specific day (2-5)
  window.billyMiniLesson = new BillyWeek1Lesson(2); // Day 2
  
  // Auto-start on page load
  setTimeout(() => {
    window.billyMiniLesson.start();
  }, 500);
</script>
```

## Lesson Features

All lessons include:
- ✅ Auto-start when page loads
- ✅ Pause/resume with 🔊 button
- ✅ Proper pacing for beginning readers (3-5s pauses)
- ✅ Student response time built in
- ✅ Cheerful, conversational tone
- ✅ ElevenLabs TTS (Mark voice) with fallback
- ✅ Natural pronunciation (phonetic spellings)
- ✅ **Memory game** (flip cards - match pairs)
- ✅ **Matching game** (word-to-meaning matching)
- ✅ **Cumulative sight words** (spirals from previous days)

## Sight Word Progression (Cumulative)

Each day adds new sight words and reviews previous ones:

- **Day 1:** a, the (2 words)
- **Day 2:** a, the + is (3 words)
- **Day 3:** a, the, is + I (4 words)
- **Day 4:** a, the, is, I + my (5 words)
- **Day 5:** a, the, is, I, my + and, to, are **(8 words total!)**

By assessment day, students have practiced all 8 sight words multiple times through games!

## Games on Every Day

**Page 8 - Memory Game (Flip Cards):**
- 6 pairs (12 cards total)
- Mix of sight words + decodable words from the lesson
- Tracks moves and matches
- Celebrates completion

**Page 9 - Matching Game (Word-to-Meaning):**
- 6 word-meaning pairs
- Click word, then click its meaning
- Visual feedback (green = correct, red = wrong)
- Includes emojis for decodable words (🐱 cat, 🍳 pan, etc.)

## Pacing Philosophy

**Beginning readers need TIME:**
- Sound modeling: 3-4s pauses
- Word blending: 3.5-4.5s pauses  
- Sentence reading: 4-6s pauses
- Assessment items: 3.5s per word

**Total lesson times:**
- Day 1: ~3 minutes (mini-lesson) + games
- Days 2-5: ~5 minutes (mini-lesson) + games

## Next Steps

To complete Week 1, create HTML pages for Days 2-5:
1. Copy `1st-grade-week-1-day-1-HYBRID.html`
2. Update title and content for each day
3. Change script initialization to use `BillyWeek1Lesson(dayNumber)`
4. Add appropriate visual content for each lesson topic

## File Structure

```
bedrockela-website-/
├── js/
│   ├── billy-mini-lesson.js      # Base class + Day 1
│   └── billy-week1-lessons.js    # Days 2-5 scripts
├── 1st-grade-week-1-day-1-HYBRID.html  # Day 1 (complete)
└── WEEK-1-LESSONS-README.md      # This file
```

## Testing

**Day 1 (Current):**
```
http://localhost:3000/1st-grade-week-1-day-1-HYBRID.html
```

**Days 2-5 (To be created):**
```
http://localhost:3000/1st-grade-week-1-day-2-HYBRID.html
http://localhost:3000/1st-grade-week-1-day-3-HYBRID.html
http://localhost:3000/1st-grade-week-1-day-4-HYBRID.html
http://localhost:3000/1st-grade-week-1-day-5-HYBRID.html
```

---

**Status:** Week 1 core lessons complete! Ready to build remaining HTML pages and integrate into curriculum.
