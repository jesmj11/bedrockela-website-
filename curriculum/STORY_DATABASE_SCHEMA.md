# BedrockELA Story Reader Database Schema

## Overview
This schema extends the existing BedrockELA lesson database to include story readers that integrate with the curriculum.

---

## Database Structure

### Table: `story_readers`

```sql
CREATE TABLE story_readers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  story_type TEXT NOT NULL, -- 'fairy-tale', 'fable', 'folktale', 'literary-tale', 'pourquoi'
  reading_level TEXT NOT NULL, -- 'read-aloud', 'shared-reading', 'independent', 'chapter-book'
  
  -- Lesson Integration
  lesson_start INTEGER NOT NULL,
  lesson_end INTEGER NOT NULL,
  unit_number INTEGER NOT NULL,
  
  -- Phonics & Skills
  phonics_focus TEXT, -- JSON array of phonics patterns
  sight_words TEXT, -- JSON array of sight words
  decodable_words TEXT, -- JSON array of target decodable words
  
  -- Story Content
  story_text TEXT NOT NULL, -- Full story text (markdown format)
  page_count INTEGER,
  
  -- Comprehension
  comprehension_skills TEXT, -- JSON array of skills (e.g., ["character traits", "cause & effect"])
  discussion_questions TEXT, -- JSON array of questions
  
  -- Teaching Notes
  teacher_notes TEXT, -- How to use this story
  repeated_phrases TEXT, -- JSON array of phrases kids can "read"
  interactive_elements TEXT, -- JSON array of actions/sounds (e.g., ["Tap the table", "Stomp your feet"])
  
  -- Extension Activities
  extension_activities TEXT, -- JSON array of activity objects
  billy_connection TEXT, -- How this connects to Billy the Goat's adventures
  
  -- Metadata
  cultural_origin TEXT, -- e.g., 'European', 'African', 'Japanese', 'General'
  public_domain BOOLEAN DEFAULT true,
  created_date TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'complete', 'published'
  
  -- Cross-curricular
  cross_curricular_subject TEXT, -- e.g., 'science', 'math', 'geography', 'none'
  cross_curricular_connection TEXT -- Brief description of the connection
);
```

---

### Table: `story_pages`
*(For multi-page stories with illustrations)*

```sql
CREATE TABLE story_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  page_text TEXT NOT NULL,
  interactive_prompt TEXT, -- e.g., "[Stomp your feet!]", "[Use a grumpy voice!]"
  illustration_url TEXT, -- Path to illustration image (future enhancement)
  
  FOREIGN KEY (story_id) REFERENCES story_readers(id) ON DELETE CASCADE,
  UNIQUE(story_id, page_number)
);
```

---

### Table: `story_lesson_links`
*(Many-to-many relationship: stories can be used in multiple lessons)*

```sql
CREATE TABLE story_lesson_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  lesson_number INTEGER NOT NULL,
  usage_type TEXT NOT NULL, -- 'primary', 'review', 'extension', 'mentor-text'
  
  FOREIGN KEY (story_id) REFERENCES story_readers(id) ON DELETE CASCADE,
  UNIQUE(story_id, lesson_number)
);
```

---

### Table: `story_phonics_patterns`
*(For filtering stories by phonics skill)*

```sql
CREATE TABLE story_phonics_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  story_id INTEGER NOT NULL,
  pattern_type TEXT NOT NULL, -- 'cvc', 'cvce', 'consonant-team', 'vowel-team', 'r-controlled', 'blend', etc.
  pattern_code TEXT NOT NULL, -- e.g., 'th', 'sh', 'ai', 'ar', 'a_e'
  example_words TEXT, -- JSON array of example words from the story
  
  FOREIGN KEY (story_id) REFERENCES story_readers(id) ON DELETE CASCADE
);
```

---

## JSON Field Structures

### `phonics_focus` (JSON Array)
```json
[
  {"pattern": "cvc", "description": "Basic consonant-vowel-consonant words"},
  {"pattern": "th", "description": "Consonant team TH"},
  {"pattern": "sh", "description": "Consonant team SH"}
]
```

### `sight_words` (JSON Array)
```json
["the", "a", "of", "was", "to", "said", "I", "he", "you"]
```

### `decodable_words` (JSON Array)
```json
["huff", "puff", "chin", "wish", "rush", "shed", "then", "them"]
```

### `comprehension_skills` (JSON Array)
```json
["character traits", "cause & effect", "predictions", "hard work vs. shortcuts"]
```

### `discussion_questions` (JSON Array)
```json
[
  "How many pigs were there? What did each one make?",
  "Which pig worked the hardest? How do you know?",
  "What did the wolf say to the pigs?"
]
```

### `repeated_phrases` (JSON Array)
```json
[
  "I'll huff, and I'll puff, and I'll blow your den in!",
  "Not by the hair on my chinny-chin-chin!",
  "Swish, swish, swish!"
]
```

### `interactive_elements` (JSON Array)
```json
[
  {"action": "sound", "cue": "Blow like the wolf! WHOOOOSH!"},
  {"action": "movement", "cue": "Run in place!"},
  {"action": "voice", "cue": "Use a grumpy voice for the wolf!"}
]
```

### `extension_activities` (JSON Array)
```json
[
  {
    "title": "TH & SH Sound Hunt",
    "type": "phonics",
    "description": "Find all the words with TH and SH in the story. Make two lists!"
  },
  {
    "title": "Act It Out",
    "type": "drama",
    "description": "Be the pigs! Build pretend dens with pillows. Take turns being the wolf!"
  }
]
```

---

## Sample Record: The Three Little Pigs

```json
{
  "id": 2,
  "title": "The Three Little Pigs",
  "slug": "three-little-pigs",
  "story_type": "fairy-tale",
  "reading_level": "read-aloud",
  
  "lesson_start": 11,
  "lesson_end": 20,
  "unit_number": 1,
  
  "phonics_focus": [
    {"pattern": "vowels", "description": "All five vowels (a, e, i, o, u)"},
    {"pattern": "th", "description": "Consonant team TH"},
    {"pattern": "sh", "description": "Consonant team SH"}
  ],
  
  "sight_words": ["the", "a", "of", "was", "to", "said", "I", "he", "you", "my", "do", "go", "all", "come", "no", "so", "will", "then", "what", "with", "his", "this"],
  
  "decodable_words": ["pig", "big", "run", "fun", "den", "red", "chin", "huff", "puff", "fell", "quit", "shed", "rush", "wish", "fish", "dish", "path", "bath", "that", "this", "then", "them", "with"],
  
  "story_text": "[Full markdown text from the reader file]",
  "page_count": 13,
  
  "comprehension_skills": ["character traits", "cause & effect", "sequence", "predictions"],
  
  "discussion_questions": [
    "How many pigs were there? What did each one make?",
    "Which pig worked the hardest? How do you know?",
    "What did the wolf say to the pigs?",
    "Why couldn't the wolf blow down the brick den?",
    "What happened to the wolf at the end?",
    "What lesson did the wee pig and red pig learn?"
  ],
  
  "teacher_notes": "This retelling uses simple CVC words and introduces consonant teams TH and SH. The famous 'huff and puff' refrain reinforces blending. Use different voices for each pig!",
  
  "repeated_phrases": [
    "I'll huff, and I'll puff, and I'll blow your den in!",
    "Not by the hair on my chinny-chin-chin!",
    "Swish, swish, swish!",
    "Tap, tap, tap!",
    "Thud, thud, thud!"
  ],
  
  "interactive_elements": [
    {"action": "sound", "cue": "Blow like the wolf! WHOOOOSH!"},
    {"action": "movement", "cue": "Run in place!"},
    {"action": "voice", "cue": "Use different voices for each pig!"},
    {"action": "percussion", "cue": "Tap the table! Tap, tap, tap!"}
  ],
  
  "extension_activities": [
    {
      "title": "TH & SH Sound Hunt",
      "type": "phonics",
      "description": "Find all the words with TH and SH in the story. Make two lists!"
    },
    {
      "title": "Act It Out",
      "type": "drama",
      "description": "Be the pigs! Build pretend dens with pillows. Take turns being the wolf!"
    },
    {
      "title": "Three Houses Craft",
      "type": "art",
      "description": "Draw or build the three dens (hay, sticks, bricks). Which is strongest?"
    },
    {
      "title": "Character Discussion",
      "type": "comprehension",
      "description": "Was the big pig bossy or just smart? How would you build your den?"
    }
  ],
  
  "billy_connection": "Billy the Goat also met a mean creature under a bridge! How is the troll like the wolf? How is he different?",
  
  "cultural_origin": "European",
  "public_domain": true,
  "created_date": "2026-02-13",
  "status": "complete",
  
  "cross_curricular_subject": "none",
  "cross_curricular_connection": null
}
```

---

## API Endpoints (Future)

### Get Stories for Lesson Range
```
GET /api/stories?lesson_start=11&lesson_end=20
```

### Get Story by Slug
```
GET /api/stories/three-little-pigs
```

### Get Stories by Phonics Pattern
```
GET /api/stories?pattern=th
GET /api/stories?pattern=cvce
```

### Get Stories by Reading Level
```
GET /api/stories?level=read-aloud
```

### Get Stories by Cultural Origin
```
GET /api/stories?culture=African
```

### Get All Stories (with filters)
```
GET /api/stories?unit=1&type=fairy-tale&status=complete
```

---

## Integration with Existing Curriculum Database

The story readers integrate with the existing lesson structure:

1. **Lessons Table**: Each lesson can reference one or more stories via `story_lesson_links`
2. **Dashboard**: Show recommended story for current lesson
3. **Progress Tracking**: Track which stories student has completed
4. **Filtering**: Filter stories by unit, lesson range, phonics pattern, reading level

---

## Load Script Structure

### File: `load-stories.html`

```javascript
const stories = [
  {
    title: "The Three Billy Goats Gruff",
    slug: "three-billy-goats-gruff",
    // ... all fields
  },
  {
    title: "The Three Little Pigs",
    slug: "three-little-pigs",
    // ... all fields
  }
  // ... more stories
];

async function loadStories() {
  for (const story of stories) {
    await fetch('/api/stories', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(story)
    });
  }
}
```

---

## Student Progress Tracking (Future Enhancement)

```sql
CREATE TABLE student_story_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  story_id INTEGER NOT NULL,
  times_read INTEGER DEFAULT 0,
  last_read_date TEXT,
  reading_mode TEXT, -- 'listened', 'shared', 'independent'
  completed BOOLEAN DEFAULT false,
  
  FOREIGN KEY (story_id) REFERENCES story_readers(id) ON DELETE CASCADE,
  UNIQUE(student_id, story_id)
);
```

---

## Implementation Priority

### Phase 1: Core Structure ✅
- [x] Create database schema
- [x] Define JSON field structures
- [ ] Build load script for stories

### Phase 2: Content Loading
- [ ] Load The Three Billy Goats Gruff
- [ ] Load The Three Little Pigs
- [ ] Create story detail page template
- [ ] Create story library page

### Phase 3: Integration
- [ ] Link stories to lesson dashboard
- [ ] Add "Read Today's Story" button to lessons
- [ ] Show story recommendations
- [ ] Filter stories by current lesson

### Phase 4: Enhancements
- [ ] Add illustrations
- [ ] Add audio recordings (Billy the Goat reading!)
- [ ] Student progress tracking
- [ ] Printable PDF generation
- [ ] Parent/teacher story guides

---

**Next Step:** Create the load script and integrate with existing lesson loader!
