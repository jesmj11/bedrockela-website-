# Example: Adapting Robin Hood Unit Across Grades

**Last Updated:** March 9, 2026

This document shows how to take ONE unit (Robin Hood) and adapt it for 3rd, 4th, and 5th grade using the same story content but different complexity levels.

---

## 📚 The Same Book, Three Grade Levels

### Unit Overview
- **Story:** Tales of Robin Hood (public domain)
- **Length:** 20 lessons (16 regular + 4 assessments)
- **Chapters:** 16 story chapters (one per regular lesson)
- **Theme:** Justice, loyalty, courage, fairness

---

## 5️⃣ 5th Grade Version

### Day 1: Robin Hood Becomes an Outlaw

**Vocabulary (3 words):**
1. **Outlaw** - A person who has broken the law and is hiding from authorities
2. **Valiant** - Possessing or showing courage or determination
3. **Tyranny** - Cruel and oppressive government or rule

**Comprehension Questions (3):**
1. What events led Robin Hood to become an outlaw? Use evidence from the text to support your answer.
2. How does the Sheriff of Nottingham represent tyranny in this chapter?
3. Why do you think Robin Hood chooses Sherwood Forest as his hiding place? What advantages does it provide?

**Grammar Focus:** Complex sentences with subordinating conjunctions
- Example: "While the Sheriff pursued him relentlessly, Robin Hood found refuge in Sherwood Forest."
- Practice: Identify the subordinating conjunction and explain how it connects the two clauses.

**Informational Text (500-600 words):** "Medieval England: Law and Order in the 12th Century"
- Topics: feudal system, role of sheriffs, forest laws, punishments for poaching
- **Questions (3):**
  1. How did the feudal system create inequality in medieval England?
  2. Why were forest laws particularly harsh for common people?
  3. Based on what you learned, do you think Robin Hood's actions were justified? Explain.

**Writing Prompt:** 
"Analyze Robin Hood's moral code. In a well-organized paragraph, explain whether breaking unjust laws can ever be justified. Use evidence from the text and your own reasoning."

---

## 4️⃣ 4th Grade Version

### Day 1: Robin Hood Becomes an Outlaw

**Vocabulary (2 words):**
1. **Outlaw** - A person who has broken the law and is hiding from authorities
2. **Valiant** - Showing bravery and courage

**Comprehension Questions (3):**
1. What happened that made Robin Hood become an outlaw?
2. Where does Robin Hood hide, and why is it a good hiding place?
3. How do you think Robin Hood feels about becoming an outlaw? Use clues from the text.

**Grammar Focus:** Compound sentences with coordinating conjunctions
- Example: "The Sheriff chased Robin Hood, but he escaped to Sherwood Forest."
- Practice: Identify the coordinating conjunction (and, but, or, so) and explain what it connects.

**Informational Text (400-500 words):** "Life in Medieval England"
- Topics: what sheriffs did, who owned the forests, why hunting was illegal for poor people
- **Questions (2):**
  1. Why couldn't common people hunt in the royal forests?
  2. How was life different for rich and poor people in medieval England?

**Writing Prompt:** 
"Is Robin Hood a hero or a thief? Write a paragraph giving at least two reasons for your opinion. Use examples from the story."

---

## 3️⃣ 3rd Grade Version

### Day 1: Robin Hood Becomes an Outlaw

**Vocabulary (2 words):**
1. **Outlaw** - Someone who breaks the law and hides from the police
2. **Brave** - Not afraid to do dangerous things

**Comprehension Questions (2):**
1. What happened to Robin Hood at the beginning of the story?
2. Where did Robin Hood go to hide?

**Grammar Focus:** Complete sentences with subjects and predicates
- Example: "Robin Hood (subject) ran to Sherwood Forest (predicate)."
- Practice: Circle the subject and underline the predicate in three sentences.

**Informational Text (300-400 words):** "Sherwood Forest: A Real Place"
- Topics: where Sherwood Forest is, what it looks like, animals that live there, how forests were used long ago
- **Questions (2):**
  1. Where is Sherwood Forest located?
  2. Why would a forest be a good place to hide?

**Writing Prompt:** 
"Would you want Robin Hood as a friend? Write 4-5 sentences explaining why or why not."

---

## 📊 Side-by-Side Comparison

| Element | 3rd Grade | 4th Grade | 5th Grade |
|---------|-----------|-----------|-----------|
| **Vocab words/day** | 2 (simpler) | 2 (moderate) | 3 (advanced) |
| **Vocab quiz (Fri)** | 8 words | 8 words | 12 words |
| **Comprehension Q's** | 2 (literal) | 3 (mixed) | 3 (analytical) |
| **Grammar focus** | Simple sentences | Compound sentences | Complex sentences |
| **Info text length** | 300-400 words | 400-500 words | 500-600 words |
| **Info text Q's** | 2 | 2 | 3 |
| **Writing length** | 4-5 sentences | 1 paragraph | 1-2 paragraphs |
| **Writing complexity** | Personal opinion | Structured argument | Analytical essay |

---

## 🔄 Adaptation Process

### Step 1: Start with 5th Grade Content
Create the most sophisticated version first with:
- Rich vocabulary from the actual text
- Deep analytical questions
- Complex grammar concepts
- Detailed informational texts
- Advanced writing prompts

### Step 2: Adapt Down to 4th Grade
- **Vocabulary:** Keep 2 of the 3 words (drop the most complex)
- **Comprehension:** Keep all 3 questions but simplify language
- **Grammar:** Shift from complex to compound sentences
- **Info Text:** Shorten by ~100 words, remove 1 question
- **Writing:** Simplify prompt, reduce length requirement

### Step 3: Adapt Down to 3rd Grade
- **Vocabulary:** Replace complex words with simpler synonyms
- **Comprehension:** Keep only 2 most literal questions
- **Grammar:** Focus on sentence basics (subject/predicate)
- **Info Text:** Shorten by another 100 words, keep 2 questions
- **Writing:** Personal/concrete prompt, 4-5 sentences

---

## 🛠️ Generator Script Template

```javascript
function generateRobinHoodLesson(day, chapter, gradeLevel) {
    // Grade-specific settings
    const settings = {
        '3rd-grade': {
            vocabCount: 2,
            vocabDifficulty: 'simple',
            comprehensionCount: 2,
            infoTextLength: 350,
            infoTextQuestions: 2,
            grammarFocus: 'simple-sentences'
        },
        '4th-grade': {
            vocabCount: 2,
            vocabDifficulty: 'moderate',
            comprehensionCount: 3,
            infoTextLength: 450,
            infoTextQuestions: 2,
            grammarFocus: 'compound-sentences'
        },
        '5th-grade': {
            vocabCount: 3,
            vocabDifficulty: 'advanced',
            comprehensionCount: 3,
            infoTextLength: 550,
            infoTextQuestions: 3,
            grammarFocus: 'complex-sentences'
        }
    };
    
    const config = settings[gradeLevel];
    
    // Load vocabulary based on difficulty
    const vocab = getVocabularyForChapter(chapter, config.vocabCount, config.vocabDifficulty);
    
    // Generate comprehension questions
    const questions = generateComprehensionQuestions(chapter, config.comprehensionCount, gradeLevel);
    
    // Create informational text
    const infoText = generateInfoText(chapter.theme, config.infoTextLength);
    const infoQuestions = generateInfoQuestions(infoText, config.infoTextQuestions, gradeLevel);
    
    // Build grammar section
    const grammar = buildGrammarSection(config.grammarFocus, chapter.text);
    
    // Create writing prompt
    const writing = generateWritingPrompt(chapter, gradeLevel);
    
    // Assemble lesson...
    return buildLessonHTML(day, chapter, vocab, questions, infoText, grammar, writing, gradeLevel);
}
```

---

## 📋 Checklist for Creating Multi-Grade Unit

### Planning Phase
- ✅ Choose book/story that works for all three grades
- ✅ Verify it's age-appropriate for 8-11 year olds
- ✅ Divide into 16 story chapters
- ✅ Create master vocabulary list (40+ words)
- ✅ Outline themes for informational texts

### Content Creation
- ✅ Write 5th grade version FIRST (most detailed)
- ✅ Adapt to 4th grade (moderate complexity)
- ✅ Adapt to 3rd grade (simplest version)
- ✅ Create grade-specific grammar sections
- ✅ Write grade-appropriate writing prompts

### Technical Implementation
- ✅ Build generator script with grade parameter
- ✅ Generate all three grade versions (60 files total)
- ✅ Test navigation and completion tracking
- ✅ Verify Firebase saves for all grade levels

### Quality Check
- ✅ Read through one complete week per grade
- ✅ Verify vocabulary difficulty is appropriate
- ✅ Check comprehension questions align with text
- ✅ Test with actual students if possible

---

## 💡 Key Insights

1. **Same spine saves time:** Once you build the structure for one grade, adapting to others is fast

2. **Start complex, simplify down:** It's easier to remove complexity than add it

3. **Vocabulary is the biggest differentiator:** Word choice sets the tone for everything else

4. **Questions drive comprehension level:** Literal vs. inferential vs. analytical questions define depth

5. **Writing prompts reveal grade level:** Personal → Structured → Analytical progression

---

## 🚀 Next Actions

1. **Choose 3 units to pilot:**
   - Robin Hood (adventure/justice)
   - Greek Mythology (heroes/gods)
   - Wind in the Willows (friendship/nature)

2. **Generate all three grade versions** using adapted scripts

3. **Test with students** across grade levels

4. **Refine and document** what works

5. **Scale to full curriculum** (180 days × 3 grades = 540 lessons!)

---

**This approach lets you create ONE unit that serves THREE grades!**

---

End of EXAMPLE-UNIT-ADAPTATION.md
