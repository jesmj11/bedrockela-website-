# 📖 BedrockELA Digital Books

## Overview

This system adds beautiful, interactive digital books directly into your lessons. Students can read classic literature with:
- **Page-turning animations** (like a real book!)
- **Highlighted vocabulary words** (automatically highlighted in context)
- **Keyboard navigation** (arrow keys to flip pages)
- **Responsive design** (works on mobile, tablet, and desktop)

## Files Created

### 1. Core Components
- **`js/digital-book.js`** - Reusable digital book component
- **`wizard-of-oz-chapter-mapping.js`** - Maps 24 chapters across Days 1-30
- **`parse-wizard-of-oz.js`** - Parser for breaking text into chapters
- **`add-wizard-chapters-to-lessons.js`** - Script to embed books in lessons

### 2. Desktop Reference
- **`~/Desktop/digital-book.jsx`** - Original React component (reference)

## How It Works

### For 4th Grade Wizard of Oz (Days 1-30)

Each regular lesson day gets one chapter embedded as a digital book:
- **Days 1-4**: Chapters 1-4 → **Day 5**: Assessment
- **Days 6-9**: Chapters 5-8 → **Day 10**: Assessment
- **Days 11-14**: Chapters 9-12 → **Day 15**: Assessment
- ...and so on through Day 30

Vocabulary words from each lesson are automatically highlighted in yellow when they appear in the chapter text!

## Quick Start

### Option 1: Manual Embedding (Single Lesson)

Add this to any lesson HTML file:

```html
<!-- Add digital book script -->
<script src="js/digital-book.js"></script>

<!-- Create container for the book -->
<div id="my-digital-book"></div>

<!-- Configure and initialize -->
<script>
  const bookConfig = {
    coverTitle: "Chapter 1",
    coverSubtitle: "The Cyclone",
    coverAuthor: "L. Frank Baum",
    coverEmoji: "📚",
    coverColor: "#1B2A4A",
    vocabWords: ["cyclone", "prairie"], // These get highlighted!
    pages: [
      {
        title: "The Cyclone",
        text: "Dorothy lived in the midst of the great Kansas prairies...",
        emoji: null
      },
      // Add more pages...
    ]
  };
  
  window.digitalBookInstance = new DigitalBook('my-digital-book', bookConfig);
</script>
```

### Option 2: Automated (All 4th Grade Lessons)

Run the automated script:

```bash
cd ~/Desktop/bedrockela-website-
node add-wizard-chapters-to-lessons.js
```

This will:
1. Parse all 24 chapters from Wizard of Oz
2. Map them to Days 1-30 using `wizard-of-oz-chapter-mapping.js`
3. Update each lesson file with embedded chapters
4. Highlight vocabulary words automatically

## Vocabulary Highlighting

The system automatically highlights vocabulary words when they appear in the text:

**Before:**
```
Dorothy lived in the midst of the great Kansas prairies.
```

**After (with vocab: ["prairie"]):**
```html
Dorothy lived in the midst of the great Kansas <span class="vocab-highlight">prairies</span>.
```

The highlighted words:
- Get a **yellow background**
- Show a **golden underline**
- Display **"Vocabulary word"** on hover

## Adding to Other Grade Levels

### For Tom Sawyer (4th Grade Days 31-60)

1. Create `tom-sawyer-chapter-mapping.js`
2. Parse Tom Sawyer text into chapters
3. Run the same embedding script

### For Any Book

```javascript
const bookConfig = {
  coverTitle: "Your Book Title",
  coverAuthor: "Author Name",
  coverEmoji: "📖", // Any emoji
  coverColor: "#1B2A4A", // Cover background color
  vocabWords: ["word1", "word2"], // Words to highlight
  pages: [
    { title: "Chapter 1", text: "Your chapter text..." }
  ]
};

new DigitalBook('container-id', bookConfig);
```

## Keyboard Controls

- **→** or **Space**: Next page
- **←**: Previous page

## Responsive Design

The books automatically adapt to:
- **Mobile** (< 600px): Compact, touch-friendly
- **Tablet** (600-900px): Medium layout
- **Desktop** (> 900px): Full experience

## Next Steps

### To Complete Wizard of Oz Integration:

1. **Save the full Wizard of Oz text** to `wizard-of-oz-full.txt`
2. **Run the parser**: `node parse-wizard-of-oz.js`
3. **Update lessons**: `node add-wizard-chapters-to-lessons.js`
4. **Test Day 1**: Open `4th-grade-day-1.html` in a browser
5. **Deploy**: Commit and push to GitHub

### To Add to 6th Grade:

Same process with:
- Tom Sawyer
- Twenty Thousand Leagues Under the Sea
- Other classic novels

## Design Features

- ✨ **Page-flip animations** with realistic 3D perspective
- 📄 **Paper texture** overlay for authentic book feel
- 🌟 **Twinkling stars** in the background
- 📖 **Page edges** visible on the left (like a real book)
- 🎨 **Color palettes** that rotate for each page
- 🔊 **Gentle animations** (bobbing emojis, page dots)

## Technical Details

- **Pure JavaScript** (no React needed on the site)
- **Zero dependencies** (self-contained)
- **localStorage ready** (can track progress)
- **Accessible** (keyboard navigation, semantic HTML)

## Troubleshooting

**Book not showing?**
- Check that `js/digital-book.js` is loaded
- Verify the container ID matches
- Check browser console for errors

**Vocabulary not highlighting?**
- Ensure `vocabWords` array is set
- Words must match exactly (case-insensitive)
- Check that text contains the words

**Page too long?**
- Break into multiple page objects
- Aim for 200-500 words per page for readability

---

## Questions?

This system is designed to be:
- **Easy to use** (just add a config)
- **Flexible** (works with any book)
- **Beautiful** (students will love it!)

Ready to bring classic literature to life! 📚✨
