# Bedrock Spine Rollout Plan

**Goal:** Implement the Bedrock Spine structure across all grades 3-8.

**Date:** March 10, 2026

---

## ✅ Current Status

### Grades Already Using Bedrock Spine
- **5th Grade:** ✅ Already matches perfectly (Robin Hood, Norse Mythology, etc.)
- **6th Grade:** ✅ Just updated to Bedrock Spine (Tom Sawyer Days 1-4)

### Grades Needing Updates
- **3rd Grade:** Not yet built
- **4th Grade:** ❌ Has 9-page structure (needs 11-page Bedrock Spine)
- **7th Grade:** Not yet built  
- **8th Grade:** ❌ Has 11 pages but wrong format (no vocab game, no story split)

---

## 🔨 Implementation Tasks

### 4th Grade (Wizard of Oz)

**Current:** 9 pages
1. Title
2. Objectives
3. Vocabulary (2 words)
4. Story (full chapter, single page)
5. Comprehension MC
6. Comprehension Short Answer
7. Informational Text
8. Grammar
9. Writing
10. Completion

**Needs to become:** 11 pages (Bedrock Spine)
1. Title
2. Welcome & Objectives
3. Vocabulary (2 words) ← keep same
4. Vocabulary Practice Game ← ADD
5. Story - Part 1 ← SPLIT chapter into 3
6. Story - Part 2 ← SPLIT
7. Story - Part 3 ← SPLIT
8. Reading Comprehension (3 questions) ← COMBINE MC + short answer
9. Grammar OR Language (alternating) ← ADD language days
10. Informational Text + 2 Questions ← keep same
11. Writing OR Journal (alternating) ← ADD journal days

**Files to update:**
- `embed-wizard-simple-text.js` - Add vocab game, split chapters, alternate grammar/language
- `book-data/wizard-grammar.json` - Already has 24 lessons ✅
- Need to create: `book-data/wizard-language.json` - 12 language lessons

**Estimated time:** 2-3 hours

---

### 8th Grade (Lost World, War of Worlds, Invisible Man)

**Current:** 11 pages
1. Title
2. Welcome & Objectives
3. Vocabulary (3 words)
4. Vocabulary Practice (placeholder) ← needs actual game
5. Story - Part 1
6. Story - Part 2  
7. Story - Part 3
8. Comprehension (3 questions)
9. Grammar OR Language ← Already alternating! ✅
10. Informational Text + 3 Questions
11. Writing (always writing, no journal)

**Needs to become:** 11 pages (Bedrock Spine)
- Same structure! Just needs:
  - ✅ Vocabulary game (add interactive matching)
  - ✅ Alternate Writing/Journal (currently all writing)

**Files to update:**
- `generate-lost-world-lessons.js` - Add vocab game, alternate writing/journal
- `generate-war-of-worlds-lessons.js` - Same updates
- `generate-invisible-man-lessons.js` - Same updates

**Estimated time:** 1-2 hours (mostly copy 6th grade vocab game code)

---

### 3rd Grade (Not Yet Built)

**Task:** Build first 3rd grade unit using Bedrock Spine

**Recommended book:** Grimm's Fairy Tales (short, accessible)

**Bedrock Spine configuration:**
- 2 vocabulary words per day
- 2 comprehension questions
- 2 informational text questions
- Simpler grammar concepts
- Shorter writing prompts

**Files to create:**
- `generate-3rd-grade-grimm.js`
- `book-data/grimm-chapters.json`
- `book-data/grimm-vocab.json`
- `book-data/grimm-grammar.json`
- `book-data/grimm-language.json`

**Estimated time:** 6-8 hours (new content creation)

---

### 7th Grade (Not Yet Built)

**Task:** Build first 7th grade unit using Bedrock Spine

**Recommended book:** Treasure Island or Call of the Wild

**Bedrock Spine configuration:**
- 3 vocabulary words per day
- 3 comprehension questions
- 3 informational text questions
- Advanced grammar concepts
- Multi-paragraph writing

**Files to create:**
- Generator script
- Parsed chapters
- Vocab lists
- Grammar lessons
- Language lessons

**Estimated time:** 6-8 hours (new content creation)

---

## 📅 Rollout Priority

### Phase 1: Fix Existing (1-2 days)
1. **8th Grade** - Quick fix (just add vocab game + journal alternation)
2. **4th Grade** - Moderate fix (split chapters, add game, alternate skills)

### Phase 2: Build New (1-2 weeks)
3. **7th Grade** - New unit (Treasure Island or Call of the Wild)
4. **3rd Grade** - New unit (Grimm's Fairy Tales)

---

## 🎯 Success Criteria

A grade uses the Bedrock Spine when:
- [ ] Exactly 11 pages for regular lessons
- [ ] Vocab count matches grade level (2 for 3-4, 3 for 5-8)
- [ ] Vocabulary practice game on page 4
- [ ] Story split into 3 parts (pages 5-7)
- [ ] Comprehension question count matches grade (2 for 3, 3 for 4-8)
- [ ] Grammar/Language alternate odd/even days
- [ ] Informational text questions match grade (2 for 3-4, 3 for 5-8)
- [ ] Writing/Journal alternate odd/even days
- [ ] Friday assessments follow format

---

## 🔧 Generator Template

```javascript
// Bedrock Spine Generator Template
// Works for grades 3-8 with grade-level parameters

const GRADE_CONFIG = {
  '3rd-grade': {
    vocabPerDay: 2,
    vocabPerWeek: 8,
    comprehensionQuestions: 2,
    infoTextQuestions: 2,
    chapterLength: '800-1200 words'
  },
  '4th-grade': {
    vocabPerDay: 2,
    vocabPerWeek: 8,
    comprehensionQuestions: 3,
    infoTextQuestions: 2,
    chapterLength: '1000-1500 words'
  },
  '5th-grade': {
    vocabPerDay: 3,
    vocabPerWeek: 12,
    comprehensionQuestions: 3,
    infoTextQuestions: 3,
    chapterLength: '1500-2000 words'
  },
  // ... 6th, 7th, 8th
};

function generateBedrockLesson(day, chapter, gradeLevel) {
  const config = GRADE_CONFIG[gradeLevel];
  
  return {
    pages: [
      generateTitlePage(day, chapter),
      generateObjectivesPage(day),
      generateVocabPage(day, config.vocabPerDay),
      generateVocabGame(day, config.vocabPerDay),
      generateStoryPart(chapter, 1),
      generateStoryPart(chapter, 2),
      generateStoryPart(chapter, 3),
      generateComprehension(day, config.comprehensionQuestions),
      generateGrammarOrLanguage(day),
      generateInfoText(day, config.infoTextQuestions),
      generateWritingOrJournal(day)
    ]
  };
}
```

---

## 📊 Tracking Progress

| Grade | Status | Days Built | Generator | Last Updated |
|-------|--------|------------|-----------|--------------|
| 3rd   | Not started | 0/180 | - | - |
| 4th   | Needs update | 30/180 | embed-wizard-simple-text.js | Mar 10 |
| 5th   | ✅ Complete | 180/180 | Multiple | Mar 9 |
| 6th   | ✅ Bedrock Spine | 4/180 | generate-6th-grade-spine.js | Mar 10 |
| 7th   | Not started | 0/180 | - | - |
| 8th   | Needs update | 45/180 | generate-*-lessons.js | Mar 7 |

---

## 🎉 Vision

**When complete:**
- Every grade 3-8 follows the same structure
- Teachers move students through predictable lessons
- Content scales naturally by grade
- New units are fast to build (same template)
- Students progress smoothly year to year

**One Spine. All Grades. BedrockELA.**
