# 3rd, 4th, and 5th Grade Spine Differences

**Last Updated:** March 9, 2026

This document defines how the same Library Pocket structure adapts across grade levels.

---

## 🏗️ The Common Spine (All Grades)

### Weekly Pattern
- **Mon-Thu:** Regular lessons (story + skills)
- **Friday:** Assessment (vocab quiz + comprehension test)

### Lesson Structure (All Grades)
1. Title Page
2. Welcome & Objectives
3. Vocabulary (with definitions)
4. Vocabulary Practice Game (rotating daily)
5-7. Story (split into 3 parts, no scrolling)
8. Reading Comprehension
9. Grammar OR Language (alternating odd/even days)
10. Informational Text + Questions
11. Writing Skills OR Journal (alternating odd/even days)

**Regular days:** 11 pages  
**Assessment days:** 6-8 pages

---

## 📊 Grade-Level Adaptations

### 3rd Grade (Ages 8-9)

**Vocabulary:**
- **2 words per day** (instead of 3)
- **8 words per week** (instead of 12)
- Simpler words from text (concrete nouns, common verbs)
- Friday quiz: 8 words

**Reading Comprehension:**
- **2 questions** (instead of 3)
- More literal questions ("What happened when...?")
- Focus on story sequence and basic inference

**Story Length:**
- Shorter chapters (800-1200 words split across 3 pages)
- Simpler sentence structure
- More dialogue and action

**Grammar/Language:**
- Basic concepts (nouns, verbs, adjectives, simple sentences)
- Sentence types (statement, question, exclamation)
- Basic punctuation (periods, question marks, commas in lists)
- Simple prefixes/suffixes (un-, re-, -ly, -er)
- Basic figurative language (simile, metaphor introduced)

**Writing:**
- Shorter writing prompts (3-5 sentences)
- More scaffolding and sentence starters
- Focus on complete sentences and basic organization
- Journal prompts more concrete and personal

**Informational Text:**
- Shorter articles (300-400 words)
- More visual/descriptive content
- **2 questions** (instead of 3)
- Topics connected to books but simplified

**Standards:** CCSS 3rd Grade (RL.3, RI.3, W.3, L.3)

---

### 4th Grade (Ages 9-10)

**Vocabulary:**
- **2 words per day** (instead of 3)
- **8 words per week** (instead of 12)
- More challenging words than 3rd (abstract concepts, academic vocab)
- Friday quiz: 8 words

**Reading Comprehension:**
- **3 questions** (like 5th grade)
- Mix of literal and inferential
- Beginning to analyze character motives

**Story Length:**
- Medium chapters (1000-1500 words split across 3 pages)
- More complex plots and vocabulary
- Building chapter-to-chapter connections

**Grammar/Language:**
- More complex concepts (compound subjects/predicates, conjunctions)
- Expanding sentences with phrases
- More advanced punctuation (commas in compound sentences, apostrophes)
- Greek/Latin roots introduced
- Context clues strategies
- Figurative language expanded (idioms, adages, proverbs)

**Writing:**
- Paragraph-length responses (5-8 sentences)
- Beginning to organize multi-paragraph pieces
- Focus on details and examples
- More sophisticated opinion/narrative writing

**Informational Text:**
- Medium articles (400-500 words)
- **2 questions**
- More depth than 3rd grade
- Topics connected to books with historical/cultural context

**Standards:** CCSS 4th Grade (RL.4, RI.4, W.4, L.4)

---

### 5th Grade (Ages 10-11)

**Vocabulary:**
- **3 words per day** (current standard)
- **12 words per week**
- Academic and domain-specific vocabulary
- More sophisticated definitions required
- Friday quiz: 12 words

**Reading Comprehension:**
- **3 questions**
- Analytical questions (themes, character development, author's purpose)
- Text evidence required

**Story Length:**
- Longer chapters (1500-2000 words split across 3 pages)
- Complex plots with multiple themes
- Deeper character development

**Grammar/Language:**
- Advanced concepts (complex sentences, subordinating conjunctions)
- Sentence variety and combining
- Intentional tense shifts
- Advanced punctuation (quotes, commas in complex sentences)
- Greek/Latin roots in depth
- Connotation, tone, mood
- Advanced figurative language

**Writing:**
- Multi-paragraph responses (8-12 sentences)
- Clear thesis statements
- Supporting evidence from text
- Opinion, informative, and narrative writing fully developed

**Informational Text:**
- Longer articles (500-600 words)
- **3 questions**
- More complex analysis
- Topics with historical, cultural, and thematic depth

**Standards:** CCSS 5th Grade (RL.5, RI.5, W.5, L.5)

---

## 📚 How Book Units Transfer Between Grades

The same book can be used across multiple grades with adjustments:

### Example: Robin Hood

**5th Grade Version:**
- 3 vocab/day: "valiant," "archery," "tyranny"
- 3 comprehension questions (analytical)
- Longer chapter excerpts
- Grammar: Complex sentences with subordinating conjunctions
- Writing: "Analyze Robin Hood's moral code and how it conflicts with the law."

**4th Grade Version:**
- 2 vocab/day: "valiant," "archery"
- 3 comprehension questions (mix of literal/inferential)
- Medium chapter excerpts
- Grammar: Compound sentences with coordinating conjunctions
- Writing: "Is Robin Hood a hero or a thief? Give two reasons."

**3rd Grade Version:**
- 2 vocab/day: "brave," "forest"
- 2 comprehension questions (more literal)
- Shorter chapter excerpts
- Grammar: Complete sentences with subjects and predicates
- Writing: "Would you want Robin Hood as a friend? Why or why not?"

---

## 🔧 Technical Implementation

### File Structure
All grades use the same HTML structure:
- `3rd-grade-day-XXX.html`
- `4th-grade-day-XXX.html`
- `5th-grade-day-XXX.html`

### Lesson Config Changes
```javascript
// 3rd Grade Example
const lesson001Config = {
    lessonId: '3rd-grade-day-001',
    gradeLevel: '3rd-grade',
    title: 'Lesson 1 - 3rd Grade',
    pages: [
        { type: 'title', ... },
        { type: 'welcome', ... },
        { 
            type: 'vocab',
            words: 2,  // ← 3rd grade: 2 words
            wordList: [...]
        },
        { type: 'vocab-game', ... },
        { type: 'story-part1', ... },
        { type: 'story-part2', ... },
        { type: 'story-part3', ... },
        { 
            type: 'comprehension',
            questions: 2  // ← 3rd grade: 2 questions
        },
        { type: 'grammar', ... },
        { 
            type: 'informational',
            questions: 2  // ← 3rd grade: 2 questions
        },
        { type: 'writing', ... }
    ]
};
```

### Assessment Config Changes
```javascript
// Friday Assessment
{
    type: 'vocab-quiz',
    wordCount: 8  // ← 3rd/4th: 8 words (5th: 12 words)
}
```

---

## 🎯 Generator Script Updates Needed

### Current Generators (Need Updating)
1. `generate-norse-mythology-lessons.js` (5th grade)
2. `generate-greek-mythology-lessons.js` (5th grade)
3. `generate-sinbad-lessons.js` (4th grade)
4. Any other unit generators

### Changes Required Per Generator
1. Add grade level parameter
2. Adjust vocab count based on grade (2 or 3)
3. Adjust comprehension question count (2 or 3)
4. Adjust informational text length and question count
5. Adjust grammar/language complexity
6. Adjust writing prompt complexity

### Example Generator Function
```javascript
function generateLesson(day, chapterData, gradeLevel) {
    const vocabPerDay = (gradeLevel === '5th-grade') ? 3 : 2;
    const comprehensionQs = (gradeLevel === '3rd-grade') ? 2 : 3;
    const infoTextQs = (gradeLevel === '3rd-grade') ? 2 : 3;
    const vocabQuizTotal = (gradeLevel === '5th-grade') ? 12 : 8;
    
    // Generate lesson with grade-appropriate content...
}
```

---

## 📋 Action Items

### To Adapt 5th Grade Units to 4th Grade:
1. ✅ Copy 5th grade unit card (e.g., `ROBIN-HOOD-UNIT-CARD.md`)
2. Reduce vocabulary from 3/day to 2/day
3. Adjust vocab quiz from 12 to 8 words
4. Adjust informational text questions from 3 to 2
5. Simplify grammar/language concepts
6. Simplify writing prompts
7. Run generator with grade parameter

### To Adapt 5th Grade Units to 3rd Grade:
1. ✅ Copy 5th grade unit card
2. Reduce vocabulary from 3/day to 2/day (simpler words)
3. Adjust vocab quiz from 12 to 8 words
4. Reduce comprehension questions from 3 to 2
5. Reduce informational text questions from 3 to 2
6. Simplify grammar/language concepts (more basic)
7. Add more scaffolding to writing prompts
8. Shorten chapter excerpts if needed
9. Run generator with grade parameter

---

## 🚀 Next Steps

1. **Update CURRICULUM-STRUCTURE.md** to include all three grades
2. **Create grade-aware generator scripts** that accept grade parameter
3. **Build 4th grade versions** of 5th grade mythology units
4. **Build 3rd grade versions** of classic literature units
5. **Test with actual students** to verify difficulty levels

---

## 💡 Key Philosophy

**Same spine, different intensity.** The structure stays consistent so students have a familiar routine as they progress through grades. The content gets progressively more complex, but the weekly rhythm stays the same.

---

**This document should be referenced when:**
- Creating new units for any grade
- Adapting units between grades
- Building generator scripts
- Reviewing curriculum quality

---

End of 3RD-4TH-5TH-SPINE-DIFFERENCES.md
