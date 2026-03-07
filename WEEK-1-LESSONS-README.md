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

## Pacing Philosophy

**Beginning readers need TIME:**
- Sound modeling: 3-4s pauses
- Word blending: 3.5-4.5s pauses  
- Sentence reading: 4-6s pauses
- Assessment items: 3.5s per word

**Total lesson times:**
- Day 1: ~3 minutes
- Days 2-5: ~5 minutes each

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
