# The Bedrock Spine

**Last Updated:** March 10, 2026

The **Bedrock Spine** is the unified lesson structure used across all BedrockELA grades (3rd-8th). It provides consistency and familiarity as students progress through the curriculum, with content complexity scaling by grade level.

---

## 📚 Core Philosophy

**"Same structure, different intensity."**

Students experience the same weekly rhythm and lesson flow at every grade level. This creates:
- **Consistency:** Students know what to expect each day
- **Progression:** Content gets more complex, structure stays familiar  
- **Efficiency:** Teachers and students spend less time on logistics, more on learning
- **Transferability:** Units can be adapted across grades easily

---

## 🏗️ The Bedrock Spine Structure

### Weekly Pattern
- **Monday-Thursday:** Regular lessons (story + skills)
- **Friday:** Assessment (vocab quiz + comprehension + writing)

### Regular Lesson Structure (11 Pages)

1. **Title Page**
   - Day number, week number, book title, chapter title

2. **Welcome & Objectives**
   - Today's learning goals
   - Estimated time (45-60 minutes)

3. **Vocabulary**
   - Grade 3-4: 2 words with definitions
   - Grade 5-8: 3 words with definitions
   - Students write definitions in own words

4. **Vocabulary Practice Game**
   - Matching game (rotating daily)
   - Reinforces word meanings

5. **Story - Part 1**
   - First third of chapter
   - No scrolling within page

6. **Story - Part 2**
   - Second third of chapter
   - No scrolling within page

7. **Story - Part 3**
   - Final third of chapter
   - No scrolling within page

8. **Reading Comprehension**
   - Grade 3: 2 questions
   - Grade 4-8: 3 questions
   - Mix of literal and inferential

9. **Grammar OR Language** (Alternating)
   - **Odd days (Mon, Wed):** Grammar lesson
   - **Even days (Tue, Thu):** Language lesson
   - 3 practice exercises

10. **Informational Text + Questions**
    - Connected to book/theme
    - Grade 3-4: 2 questions
    - Grade 5-8: 3 questions

11. **Writing Skills OR Journal** (Alternating)
    - **Odd days (Mon, Wed):** Structured writing
    - **Even days (Tue, Thu):** Journal response
    - Grade-appropriate length

---

## 📊 Grade-Level Adaptations

### Vocabulary

| Grade | Words/Day | Words/Week | Assessment |
|-------|-----------|------------|------------|
| 3rd   | 2         | 8          | Friday: 8 words |
| 4th   | 2         | 8          | Friday: 8 words |
| 5th   | 3         | 12         | Friday: 12 words |
| 6th   | 3         | 12         | Friday: 12 words |
| 7th   | 3         | 12         | Friday: 12 words |
| 8th   | 3         | 12         | Friday: 12 words |

**Progression:**
- 3rd: Concrete nouns, common verbs
- 4th: Abstract concepts, academic vocab
- 5th-6th: Domain-specific vocabulary
- 7th-8th: Advanced academic and literary terms

### Comprehension Questions

| Grade | Questions | Focus |
|-------|-----------|-------|
| 3rd   | 2         | Literal + basic inference |
| 4th   | 3         | Mix of literal and inferential |
| 5th   | 3         | Analytical (themes, motives) |
| 6th   | 3         | Character development, conflict |
| 7th   | 3         | Theme analysis, author's purpose |
| 8th   | 3         | Literary analysis, text evidence |

### Informational Text

| Grade | Questions | Article Length |
|-------|-----------|----------------|
| 3rd   | 2         | 300-400 words |
| 4th   | 2         | 400-500 words |
| 5th   | 3         | 500-600 words |
| 6th   | 3         | 500-600 words |
| 7th   | 3         | 600-700 words |
| 8th   | 3         | 700-800 words |

### Story Length

| Grade | Total Chapter | Per Part (Pages 5-7) |
|-------|---------------|----------------------|
| 3rd   | 800-1200 words | ~300-400 words each |
| 4th   | 1000-1500 words | ~350-500 words each |
| 5th   | 1500-2000 words | ~500-650 words each |
| 6th   | 1800-2400 words | ~600-800 words each |
| 7th   | 2000-2800 words | ~650-900 words each |
| 8th   | 2400-3600 words | ~800-1200 words each |

---

## 🎯 Grammar vs. Language Days

### Grammar (Odd Days: Mon, Wed)
Focus on sentence structure and mechanics:
- Sentence types and structure
- Parts of speech
- Punctuation rules
- Verb tenses and agreement
- Active/passive voice
- Sentence combining

### Language (Even Days: Tue, Thu)
Focus on word meaning and usage:
- Context clues
- Vocabulary strategies
- Connotation/denotation
- Figurative language
- Greek/Latin roots
- Word relationships (synonyms, antonyms)

---

## 📝 Writing vs. Journal Days

### Writing (Odd Days: Mon, Wed)
Structured, skill-based writing:
- Apply grammar concept from the lesson
- Use vocabulary words
- Specific prompt tied to reading
- Focus on technique (topic sentences, transitions, evidence)

### Journal (Even Days: Tue, Thu)
Personal, reflective writing:
- Respond to reading emotionally/personally
- Make connections to own life
- Express opinions about characters/events
- More freedom in structure

---

## 🎓 Assessment Days (Friday)

**Structure (6-8 pages):**

1. **Title Page**
   - "Week X Assessment"

2. **Vocabulary Quiz**
   - Grade 3-4: 8 words (match or fill-in)
   - Grade 5-8: 12 words (match or fill-in)

3. **Grammar/Language Review**
   - Mixed questions from Mon-Thu lessons
   - 5-8 questions

4. **Comprehension Review**
   - Questions covering whole week's reading
   - 3-5 questions

5. **Writing Prompt**
   - Summative writing task
   - Grade 3-4: Paragraph (5-8 sentences)
   - Grade 5-6: Multi-paragraph (8-12 sentences)
   - Grade 7-8: Essay (12-15 sentences)

6. **Completion Page**
   - "Great job!"
   - Progress summary

---

## 🔧 Technical Implementation

### File Naming
```
[grade]-grade-day-[XXX].html

Examples:
3rd-grade-day-001.html
4th-grade-day-001.html
5th-grade-day-001.html
6th-grade-day-001.html
7th-grade-day-001.html
8th-grade-day-001.html
```

### Lesson Config
```javascript
const lessonConfig = {
    lessonId: '6th-grade-day-001',
    gradeLevel: '6th-grade',
    title: 'Day 1 - [Book Title]',
    pages: [
        { type: 'title', content: '...' },
        { type: 'content', content: '...' },      // Welcome & Objectives
        { type: 'vocabulary', content: '...' },   // 2 or 3 words
        { type: 'activity', content: '...' },     // Vocab game
        { type: 'reading', content: '...' },      // Part 1
        { type: 'reading', content: '...' },      // Part 2
        { type: 'reading', content: '...' },      // Part 3
        { type: 'comprehension', content: '...' }, // 2 or 3 questions
        { type: 'grammar-language', content: '...' }, // Grammar OR Language
        { type: 'informational', content: '...' }, // Info text + 2-3 questions
        { type: 'writing', content: '...' }       // Writing OR Journal
    ]
};
```

---

## 📚 Example: Robin Hood Across Grades

### 3rd Grade - "Robin Hood Becomes an Outlaw"
- **Vocabulary (2):** brave, forest
- **Comprehension (2):** What did Robin Hood do? Why did he go to the forest?
- **Grammar:** Complete sentences (subject + predicate)
- **Language:** Finding synonyms for "brave"
- **Writing:** Would you want Robin Hood as a friend? Why?

### 5th Grade - "How Robin Hood Became an Outlaw"
- **Vocabulary (3):** outlaw, quarry, invincible
- **Comprehension (3):** What led to Robin Hood becoming an outlaw? How does the author portray him? What theme emerges?
- **Grammar:** Complex sentences with subordinating conjunctions
- **Language:** Context clues in medieval vocabulary
- **Writing:** Analyze Robin Hood's moral code and how it conflicts with the law

### 8th Grade - "The Origins of the Robin Hood Legend"
- **Vocabulary (3):** outlaw, sanctuary, tyranny
- **Comprehension (3):** Analyze the historical context. How does the author use characterization? What does this reveal about medieval justice?
- **Grammar:** Sentence variety for effect (simple, compound, complex, compound-complex)
- **Language:** Etymology of law-related terms (Latin/French origins)
- **Writing:** Argue whether Robin Hood is a hero or criminal, using text evidence

---

## 🚀 Implementation Checklist

### Per Grade
- [ ] Create generator script following Bedrock Spine
- [ ] Set vocab count (2 for 3-4, 3 for 5-8)
- [ ] Set comprehension questions (2 for 3, 3 for 4-8)
- [ ] Set info text questions (2 for 3-4, 3 for 5-8)
- [ ] Define grammar progression
- [ ] Define language progression
- [ ] Split chapters into 3 parts
- [ ] Create Friday assessment format

### Current Status
- [x] 1st Grade: Custom structure (not Bedrock Spine)
- [x] 2nd Grade: Not yet built
- [ ] 3rd Grade: Needs Bedrock Spine implementation
- [x] 4th Grade: Needs Bedrock Spine implementation (currently 9 pages)
- [ ] 5th Grade: Already follows Bedrock Spine ✅
- [x] 6th Grade: Follows Bedrock Spine ✅
- [ ] 7th Grade: Needs Bedrock Spine implementation
- [x] 8th Grade: Needs Bedrock Spine implementation (currently 11 pages but wrong format)

---

## 💡 Benefits of the Bedrock Spine

### For Students
- Know what to expect every day
- Same navigation and flow each lesson
- Familiar structure reduces cognitive load
- Can focus on content, not logistics

### For Teachers
- Consistent grading structure
- Easy to track progress across grades
- Can reuse materials with grade-level adjustments
- Less time explaining how lessons work

### For Curriculum Development
- Units transfer between grades easily
- New books fit existing structure
- Generator scripts are reusable
- Quality control is simpler (same checklist every time)

---

## 📖 Resources

- **Full grade differences:** See 3RD-4TH-5TH-SPINE-DIFFERENCES.md (now deprecated)
- **Generator examples:**
  - `generate-6th-grade-spine.js` (reference implementation)
  - `generate-wizard-simple-text.js` (4th grade, needs update)
  - `generate-lost-world-lessons.js` (8th grade, needs update)

---

**This is the Bedrock Spine. Use it for all grades 3-8.**

Every lesson. Every book. Every grade.

One structure. Infinite stories.
