# 📚 Digital Books Integration Roadmap

## Overview

This document tracks the integration of beautiful, interactive digital books across all BedrockELA grade levels.

## 🎯 Progress Tracker

### 4th Grade (180 lessons total)

| Days | Book | Chapters | Status | Script |
|------|------|----------|--------|--------|
| 1-30 | The Wonderful Wizard of Oz | 24 | ⏳ In Progress | `add-wizard-chapters-to-lessons.js` |
| 31-60 | The Adventures of Tom Sawyer | 35 | ✅ Ready | `add-tom-sawyer-to-lessons.js` |
| 61-90 | Around the World in 80 Days | 37 | ✅ Parsed! | Need to create script |
| 91-120 | Black Beauty | 49 | ✅ Parsed! | Need to create script |
| 121-150 | Sherlock Holmes Stories | 11 | ✅ Parsed! | Need to create script |
| 151-180 | Alice in Wonderland | 12 | ✅ Parsed! | Need to create script |

### 6th Grade (30 lessons complete, can extend to 180)

| Days | Book | Chapters | Status | Script |
|------|------|----------|--------|--------|
| 1-20 | The Adventures of Tom Sawyer | 35 | ✅ Ready | `add-tom-sawyer-to-lessons.js` |
| 21-30 | Twenty Thousand Leagues | 47 | ✅ Ready | `add-twenty-thousand-leagues-to-lessons.js` |

### 1st Grade

Uses **decodable readers** (59 readers already integrated). No classic books needed.

### 2nd Grade

Uses **classic stories** from JSON files in `book-data/`. No digital book component needed (already embedded).

---

## 🚀 Quick Start: Add Books Now!

### Step 1: Run Existing Scripts

For books we already have parsed:

```bash
cd ~/. openclaw/workspace/bedrockela-website-

# Add Tom Sawyer to 4th Grade (Days 31-60) and 6th Grade (Days 1-20)
node add-tom-sawyer-to-lessons.js

# Add Twenty Thousand Leagues to 6th Grade (Days 21-30)
node add-twenty-thousand-leagues-to-lessons.js

# Add Wizard of Oz to 4th Grade (Days 1-30) - when chapter mapping is done
node add-wizard-chapters-to-lessons.js
```

### Step 2: Get Missing Books

We need to download/parse these public domain books:

**For 4th Grade:**
- [Around the World in 80 Days](https://www.gutenberg.org/ebooks/103) by Jules Verne
- [Black Beauty](https://www.gutenberg.org/ebooks/271) by Anna Sewell
- [Sherlock Holmes Stories](https://www.gutenberg.org/ebooks/1661) by Arthur Conan Doyle
- [Alice in Wonderland](https://www.gutenberg.org/ebooks/11) by Lewis Carroll

### Step 3: Parse New Books

For each new book:

1. **Download** from Project Gutenberg
2. **Parse** into chapters using a script like `parse-wizard-of-oz.js`
3. **Save** as JSON in `book-data/`
4. **Create mapping** file (like `tom-sawyer-chapter-mapping.js`)
5. **Create automation** script (like `add-tom-sawyer-to-lessons.js`)
6. **Run** the automation

---

## 📖 Book Details & Mappings

### 4th Grade Structure

Every 4th grade unit follows this pattern:
- **30 days total**
- **Assessment every 5th day** (Days 5, 10, 15, 20, 25, 30)
- **24 regular lesson days** get chapters
- **6 assessment days** have no new reading

### Days 1-30: Wizard of Oz ⏳

- **24 chapters** → 24 regular lesson days
- **Author:** L. Frank Baum
- **Cover Color:** `#1B2A4A`
- **Mapping:** `wizard-of-oz-chapter-mapping.js`
- **Chapters JSON:** `book-data/wizard-of-oz-full.json`
- **Script:** `add-wizard-chapters-to-lessons.js`

### Days 31-60: Tom Sawyer ✅

- **35 chapters** → 24 regular lesson days (some days skip chapters)
- **Author:** Mark Twain
- **Cover Color:** `#8B4513`
- **Mapping:** `tom-sawyer-chapter-mapping.js`
- **Chapters JSON:** `book-data/tom-sawyer-chapters.json`
- **Script:** `add-tom-sawyer-to-lessons.js`

### Days 61-90: Around the World in 80 Days ❌

- **~44 chapters** → 24 regular lesson days (2 chapters per day, or skip some)
- **Author:** Jules Verne
- **Cover Color:** `#C17817` (orange/gold for adventure)
- **Source:** https://www.gutenberg.org/ebooks/103
- **Todo:** Download, parse, create mapping, create script

### Days 91-120: Black Beauty ❌

- **49 chapters** → 24 regular lesson days (2 chapters per day)
- **Author:** Anna Sewell
- **Cover Color:** `#2C2416` (dark brown/black for the horse)
- **Source:** https://www.gutenberg.org/ebooks/271
- **Todo:** Download, parse, create mapping, create script

### Days 121-150: Sherlock Holmes Stories ❌

- **Multiple stories** (from "Adventures of Sherlock Holmes")
- **12 stories total** → distribute across 24 regular lesson days
- **Author:** Arthur Conan Doyle
- **Cover Color:** `#4A2C2A` (Victorian brown)
- **Source:** https://www.gutenberg.org/ebooks/1661
- **Todo:** Download, parse, create mapping, create script
- **Note:** Each story is a standalone mystery, easier to map

### Days 151-180: Alice in Wonderland ❌

- **12 chapters** → 24 regular lesson days (repeat some chapters or split long ones)
- **Author:** Lewis Carroll
- **Cover Color:** `#6B4C9A` (purple/whimsical)
- **Source:** https://www.gutenberg.org/ebooks/11
- **Todo:** Download, parse, create mapping, create script

---

## 🎨 Digital Book Features

Each digital book includes:

- ✨ **Page-turning animations** with 3D perspective
- 📄 **Paper texture** overlay
- 🌟 **Twinkling stars** background
- 📖 **Page edges** on the left
- 🎨 **Color-coded covers** per book
- 💛 **Automatic vocabulary highlighting** (yellow background + gold underline)
- ⌨️ **Keyboard navigation** (arrow keys, spacebar)
- 📱 **Responsive design** (mobile, tablet, desktop)
- 🚫 **No emojis** (clean, distraction-free)

---

## 🛠 How to Parse a New Book

### Template Script

```javascript
const fs = require('fs');

// 1. Read the book text
const bookText = fs.readFileSync('./books/your-book.txt', 'utf8');

// 2. Split into chapters (adjust regex for your book's format)
const chapterRegex = /CHAPTER ([IVXLCDM]+|\\d+)[\\s\\S]*?(?=CHAPTER [IVXLCDM]+|\\d+|$)/gi;
const chapters = {};
let chapterNum = 1;

let match;
while ((match = chapterRegex.exec(bookText)) !== null) {
  chapters[chapterNum] = {
    title: match[0].split('\\n')[0].trim(),
    text: match[0].trim()
  };
  chapterNum++;
}

// 3. Save as JSON
fs.writeFileSync(
  './book-data/your-book-chapters.json',
  JSON.stringify(chapters, null, 2),
  'utf8'
);

console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
```

### Chapter Mapping Template

```javascript
// Assessment pattern: every 5th day
const mapping = {
  1: 1,    // Day 1 → Chapter 1
  2: 2,
  3: 3,
  4: 4,
  5: null, // Assessment day
  6: 5,
  // ... continue pattern
};

module.exports = { mapping };
```

---

## 📋 Next Steps

1. **Finish Wizard of Oz integration** (4th Grade Days 1-30)
2. **Run Tom Sawyer script** for 4th + 6th Grade
3. **Run Twenty Thousand Leagues script** for 6th Grade
4. **Download remaining 4 books** from Project Gutenberg
5. **Parse each book** into chapters JSON
6. **Create chapter mappings** for each book
7. **Create automation scripts** for each book
8. **Run all scripts** to integrate digital books
9. **Test on live site** (bedrockela.com)
10. **Update MEMORY.md** with completion status

---

## 💡 Tips

- **Project Gutenberg** has all public domain classics: https://www.gutenberg.org
- **Chapter detection** varies by book — check the format first
- **Cover colors** should match the book's theme/era
- **Vocabulary highlighting** is automatic — just pass the words from each lesson
- **Mobile-first** — all digital books are fully responsive

---

## 🎉 Vision

When complete, students will have:
- **360+ lessons** with embedded classic literature
- **Beautiful page-turning experience** like real books
- **Automatic vocabulary highlighting** in context
- **All public domain** (no licensing issues)
- **Works offline** (self-contained JavaScript)

This is next-level curriculum! 🔥
