# 🎮 Vocabulary Practice Games

**Status:** ✅ READY TO USE!

## What It Does

Progressive vocabulary practice games that build through the week, preparing students for their Day 5 assessment!

## Weekly Structure (5th Grade Example: 3 words/day)

### **Day 1** - Matching Game
- Learn 3 new words from today's story
- **Game:** Match words to definitions (simple, 3 pairs)
- **Journal:** Regular writing (no vocab requirement yet)

### **Day 2** - Fill in the Blank
- Review Day 1 (3) + Learn Day 2 (3) = **6 total words**
- **Game:** Complete sentences using correct vocabulary words
- **Journal:** "Use at least 1 vocabulary word from this week"

### **Day 3** - Word Scramble
- Review Days 1-2 (6) + Learn Day 3 (3) = **9 total words**
- **Game:** Unscramble all 9 words (with definition hints)
- **Journal:** "Use at least 2 vocabulary words from this week"

### **Day 4** - Matching Challenge
- Review Days 1-3 (9) + Learn Day 4 (3) = **12 total words**
- **Game:** Speed matching challenge (timed, all 12 words)
- **Journal:** "Use at least 2 vocabulary words from this week"

### **Day 5** - Assessment
- **NO GAME** - 12-word vocabulary quiz
- Tests all words from Days 1-4

## How to Integrate Into Lessons

### 1. Add the Script to Your Lesson HTML

```html
<script type="module">
    import { 
        createMatchingGame,
        createFillInTheBlank,
        createWordScramble,
        createMatchingChallenge,
        injectVocabGameStyles
    } from '../js/vocab-games.js';

    // Inject styles once
    injectVocabGameStyles();

    // Define this lesson's vocabulary
    const vocabularyWords = [
        {
            word: "valiant",
            definition: "showing courage or determination",
            sentence: "The _____ warrior faced the dragon without fear."
        },
        {
            word: "treacherous",
            definition: "dangerous or deceptive",
            sentence: "The mountain path was steep and _____."
        },
        {
            word: "eternal",
            definition: "lasting forever; without end",
            sentence: "The gods were believed to have _____ life."
        }
    ];

    // Choose which game based on day of week
    // Day 1: Matching
    createMatchingGame(vocabularyWords, 'vocabGameContainer');

    // Day 2: Fill in the Blank
    // createFillInTheBlank(vocabularyWords, 'vocabGameContainer');

    // Day 3: Word Scramble
    // createWordScramble(vocabularyWords, 'vocabGameContainer');

    // Day 4: Matching Challenge
    // createMatchingChallenge(vocabularyWords, 'vocabGameContainer');
</script>
```

### 2. Add the Game Container to Your Lesson

```html
<!-- After vocabulary introduction, before reading -->
<div id="vocabGameContainer"></div>
```

### 3. Update Journal Prompts

**Day 2-4 prompts should include:**
```html
<p class="vocab-reminder">
    💡 Challenge: Use at least [1-2] vocabulary words from this week in your response!
</p>
```

## Vocabulary Data Format

Each word needs:
- **word**: The vocabulary word (string)
- **definition**: Simple, grade-appropriate definition (string)
- **sentence**: Example sentence with blank (string) - OPTIONAL for matching games

```javascript
{
    word: "valiant",
    definition: "showing courage or determination",
    sentence: "The _____ warrior faced the dragon without fear."
}
```

## Game Features

### Matching Game
- Click word, then click matching definition
- Visual feedback (selected, matched, correct/incorrect)
- Score display

### Fill in the Blank
- Type vocabulary word to complete sentence
- Word bank provided for reference
- Instant feedback on checking

### Word Scramble
- Unscramble letters to spell vocabulary word
- Definition hint provided
- Tests spelling + recognition

### Matching Challenge
- Memory/matching card game
- Timer tracks speed
- All words must be matched
- Gamified review before assessment

## Benefits

✅ **Spaced Repetition** - See words multiple times through the week  
✅ **Progressive Difficulty** - Games get harder as more words accumulate  
✅ **Active Practice** - Games require thinking, not just reading  
✅ **Low Stakes** - Fun practice before the real assessment  
✅ **Engagement** - Interactive beats passive vocabulary lists  
✅ **Confidence Building** - Students feel prepared by Day 5  

## Grade-Specific Implementation

**3rd-4th Grade** (2 words/day, 8-word assessments)
- Smaller word sets (easier matching, shorter games)
- 8 total words by Day 4

**5th Grade** (3 words/day, 12-word assessments)
- Medium word sets
- 12 total words by Day 4

**6th-8th Grade** (5 words/day, 20-word assessments)
- Larger word sets (more challenging)
- 20 total words by Day 4

## Customization

Want to adjust the games? Edit `/js/vocab-games.js`:
- Change colors/styling in `injectVocabGameStyles()`
- Adjust game mechanics in individual game functions
- Add new game types (crossword, word search, etc.)

---

**Built by Mushu 🐉 on March 6, 2026**

Practice makes perfect! 🎯
