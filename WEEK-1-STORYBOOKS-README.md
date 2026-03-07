# Week 1 Storybooks - Complete! 📚

All 5 days now have interactive page-flip storybooks on Page 5!

## Stories by Day

### Day 1: Sam's Van 🚐
**Word families:** -at  
**Decodable words:** Sam, van, tan, sat, Pam, ran, at, can, pat, clap, fast  
**Story:** Sam's van hits a big tan log. Sam and Pam push and push until the van can go!  
**Pages:** 12  
**File:** `stories/sams-van.js`

### Day 2: Pan's Jam 🍓
**Word families:** -an, -am  
**Decodable words:** Pam, pan, tan, can, jam, man, ran, Sam, ham, can, fan  
**Story:** Pam makes jam in a tan pan. Sam runs to help! They fan the hot jam.  
**Pages:** 12  
**File:** `stories/pans-jam.js`

### Day 3: Dad's Cap 🧢
**Word families:** -ap, -ag, -ad, -ab  
**Decodable words:** Dad, cap, map, bag, tag, sad, mad, cab, ran, tap, glad, back  
**Story:** Dad's cap gets stuck with a tag in a bag! He takes a cab and taps the bag to get it free.  
**Pages:** 12  
**File:** `stories/dads-cap.js`

### Day 4: The Nap 😴
**Word families:** all families (fluency practice)  
**Decodable words:** Sam, cat, sat, mat, cap, bag, ran, Dad, sad, bad, map, van, tap, jam, can, ham, pan, nap, lap, pat  
**Story:** Sam the cat and Dad go on a trip in the van. They eat jam and ham, then Sam takes a cozy nap!  
**Pages:** 12  
**File:** `stories/the-nap.js`

### Day 5: At the Camp ⛺
**Word families:** all families (assessment)  
**Decodable words:** Pam, Sam, camp, map, cap, bag, man, van, tan, cab, ran, jam, can, sat, Dad, ham, pan, bat, cat, clap, tap, nap, mat, pat  
**Story:** Pam and Sam go to camp! They see a man with a van, eat ham and jam, and have fun adventures.  
**Pages:** 12  
**File:** `stories/at-the-camp.js`

## Features

Each storybook includes:

✅ **12 pages** with simple, decodable text  
✅ **Emoji illustrations** (colorful, age-appropriate)  
✅ **Two-page spread** (looks like a real book)  
✅ **Page flip animation** (smooth transitions)  
✅ **Read Aloud** (Billy reads each page with Mark's voice)  
✅ **Page numbers** (shows progress)  
✅ **Navigation controls** (Previous, Next)  
✅ **Realistic styling** (cream pages, wooden cover, spine)

## Word Family Progression

- **Day 1:** -at (cat, mat, bat, sat, rat, hat)
- **Day 2:** -an, -am (man, pan, can, ran, tan, ham, jam, Sam)
- **Day 3:** -ap, -ag, -ad, -ab (cap, map, tap, bag, tag, rag, dad, mad, sad, cab, tab)
- **Day 4:** All families mixed (fluency)
- **Day 5:** All families mixed (assessment)

## Usage

Students encounter the storybook on **Page 5** of each lesson:

1. Navigate to Page 5
2. Storybook auto-loads
3. Click "Next →" to turn pages
4. Click "🔊 Read Aloud" to hear Billy read
5. Read through all 12 pages
6. Continue to comprehension questions (Page 6)

## Integration

Each story:
- Uses **only decodable words** from that day + previous days
- Includes **sight words** students have learned
- Tells a **complete story** with beginning, middle, end
- Reinforces the **short A sound** throughout
- Provides **multiple exposures** to target word families

## Technical Details

**Component:** `js/billy-storybook.js` (BillyStorybook class)  
**TTS:** ElevenLabs Mark voice (cheerful, slow pacing for beginning readers)  
**Fallback:** Browser TTS if server unavailable  
**Auto-init:** Loads when student reaches Page 5  
**Self-contained:** All navigation within the storybook (doesn't change lesson page)

---

**Status:** All 5 storybooks complete and deployed! 📖✨
