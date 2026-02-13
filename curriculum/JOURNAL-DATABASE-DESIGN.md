# Journal Database Design
## BedrockELA Student Journal System

---

## 🎯 Requirements

**Students need to:**
1. Write journal entries directly in lessons
2. Entries auto-save as they type
3. Retrieve past entries
4. View all entries for a book/unit
5. Print their complete journal
6. Export as PDF

---

## 🗄️ Database Schema

### **Table: students**
```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE,
    grade_level TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### **Table: journal_entries**
```sql
CREATE TABLE journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    grade TEXT NOT NULL,                -- '1st', '4th', '6th'
    lesson_number INTEGER NOT NULL,      -- 1-180
    unit_number INTEGER,                 -- 1-6 (for 4th grade)
    book_title TEXT,                     -- 'Wizard of Oz', 'Enormous Turnip', etc.
    entry_date DATE DEFAULT CURRENT_DATE,
    entry_text TEXT NOT NULL,
    word_count INTEGER,
    revised BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (student_id) REFERENCES students(id),
    
    UNIQUE(student_id, grade, lesson_number)
);
```

### **Table: journal_prompts**
```sql
CREATE TABLE journal_prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grade TEXT NOT NULL,
    lesson_number INTEGER NOT NULL,
    prompt_text TEXT NOT NULL,
    
    UNIQUE(grade, lesson_number)
);
```

---

## 🔧 API Endpoints

### **Authentication / Student Management:**

**POST /api/student/login**
```json
{
    "username": "johndoe",
    "name": "John Doe",
    "grade_level": "4th"
}
```

**GET /api/student/:id**
Returns student profile and stats

---

### **Journal Entry Management:**

**POST /api/journal/save**
```json
{
    "student_id": 123,
    "grade": "4th",
    "lesson_number": 5,
    "unit_number": 1,
    "book_title": "The Wonderful Wizard of Oz",
    "entry_text": "Today I read about the Cowardly Lion..."
}
```
Returns: `{ success: true, entry_id: 456, auto_saved: true }`

**GET /api/journal/entry/:student_id/:grade/:lesson_number**
Returns specific entry for a lesson

**GET /api/journal/student/:student_id?grade=4th&unit=1**
Returns all entries for a student (filtered by grade/unit)

**PUT /api/journal/entry/:id**
Update existing entry

**DELETE /api/journal/entry/:id**
Delete entry

---

### **Retrieval & Export:**

**GET /api/journal/book/:student_id/:book_title**
Returns all entries for a specific book
```json
{
    "student_name": "John Doe",
    "book_title": "The Wonderful Wizard of Oz",
    "entries": [
        {
            "lesson": 1,
            "date": "2026-02-13",
            "text": "Today I learned...",
            "word_count": 45
        }
    ],
    "total_entries": 30,
    "total_words": 1250
}
```

**GET /api/journal/export/pdf/:student_id?grade=4th&unit=1**
Generates PDF of journal entries

**GET /api/journal/export/markdown/:student_id**
Exports as markdown file

---

## 🎨 Frontend Components

### **1. Journal Entry Widget (embedded in lessons)**

```html
<div class="journal-widget" data-lesson="5" data-grade="4th">
    <div class="journal-header">
        <h3>✍️ Your Reading Journal</h3>
        <span class="word-count">0 words</span>
        <span class="save-status">💾 Saved</span>
    </div>
    
    <div class="journal-prompt">
        <strong>Today's Prompt:</strong>
        <p>What do you think of the Cowardly Lion so far? 
           Do you think he's really a coward? Why or why not?</p>
    </div>
    
    <textarea 
        id="journal-entry"
        class="journal-textarea"
        placeholder="Write your journal entry here... (2-3 sentences)"
        data-student-id="123"
        data-lesson="5"
        data-autosave="true">
    </textarea>
    
    <div class="journal-actions">
        <button class="btn-save">Save Entry</button>
        <button class="btn-view-past">View Past Entries</button>
    </div>
</div>
```

**Features:**
- Auto-save every 10 seconds
- Word counter updates live
- Visual save indicator
- Loads previous entry if exists
- Mobile-friendly

---

### **2. Journal Viewer Page**

```html
<div class="journal-viewer">
    <div class="journal-sidebar">
        <h3>My Journals</h3>
        <select id="grade-filter">
            <option>4th Grade</option>
            <option>1st Grade</option>
        </select>
        
        <div class="journal-books">
            <div class="book-item active">
                <h4>📖 Wizard of Oz</h4>
                <span>10 entries</span>
            </div>
            <div class="book-item">
                <h4>📖 Treasure Island</h4>
                <span>0 entries</span>
            </div>
        </div>
    </div>
    
    <div class="journal-main">
        <div class="journal-header">
            <h2>The Wonderful Wizard of Oz</h2>
            <button class="btn-print">🖨️ Print Journal</button>
            <button class="btn-export">📄 Export PDF</button>
        </div>
        
        <div class="journal-entries">
            <!-- Entry cards here -->
            <div class="entry-card">
                <div class="entry-meta">
                    <span>Lesson 5</span>
                    <span>Feb 13, 2026</span>
                    <span>45 words</span>
                </div>
                <div class="entry-prompt">
                    <strong>Prompt:</strong> What do you think of the Cowardly Lion?
                </div>
                <div class="entry-text">
                    I think the Lion is actually brave even though he doesn't 
                    know it yet. He wanted to protect Dorothy and the others...
                </div>
                <div class="entry-actions">
                    <button class="btn-edit">✏️ Edit</button>
                    <button class="btn-delete">🗑️ Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

---

### **3. Print Layout (CSS)**

```css
@media print {
    .journal-print {
        font-family: Georgia, serif;
        max-width: 8.5in;
        margin: 0 auto;
    }
    
    .entry-card {
        page-break-inside: avoid;
        border: 1px solid #ddd;
        padding: 20px;
        margin-bottom: 20px;
    }
    
    .entry-meta {
        font-size: 0.9em;
        color: #666;
        margin-bottom: 10px;
    }
    
    .entry-text {
        line-height: 1.8;
        font-size: 12pt;
    }
    
    /* Hide UI elements */
    .btn-edit, .btn-delete, .journal-actions {
        display: none;
    }
}
```

---

## 💾 Technology Stack Options

### **Option A: Serverless (Recommended for MVP)**
- **Database:** Firebase Firestore or Supabase
- **Auth:** Firebase Auth or Supabase Auth
- **Hosting:** GitHub Pages + Firebase
- **Benefits:** 
  - No server to manage
  - Free tier generous
  - Real-time sync
  - Easy scaling

### **Option B: Traditional Backend**
- **Database:** SQLite or PostgreSQL
- **Backend:** Node.js + Express
- **Auth:** JWT tokens
- **Hosting:** Railway, Render, or Vercel
- **Benefits:**
  - Full control
  - Portable
  - No vendor lock-in

### **Option C: Hybrid (Local Storage + Optional Cloud)**
- **Primary:** Browser LocalStorage
- **Backup:** Optional cloud sync
- **Benefits:**
  - Works offline
  - No server required initially
  - Privacy-friendly
  - Can add cloud later

---

## 🚀 Implementation Phases

### **Phase 1: Basic Journal (LocalStorage)**
**Time: 2-3 hours**
- Store entries in browser localStorage
- Auto-save functionality
- View past entries
- Print current entry
- **Good for:** Testing, single-device use

### **Phase 2: Cloud Sync (Firebase)**
**Time: 4-6 hours**
- Firebase Firestore integration
- Multi-device sync
- Student authentication
- View entries anywhere
- **Good for:** Real classroom use

### **Phase 3: Advanced Features**
**Time: 6-8 hours**
- PDF export with nice formatting
- Word count tracking & goals
- Entry revision history
- Teacher dashboard (view student journals)
- Analytics (words written, entries completed)

---

## 📱 User Flow

### **Student Experience:**

1. **Login/Setup:**
   - Enter name
   - Select grade level
   - (Optional) Create username/password

2. **During Lesson:**
   - Read lesson content
   - Reach journal section
   - See today's prompt
   - Type entry (auto-saves every 10 seconds)
   - Word count updates live
   - Click "Save Entry" when done

3. **View Past Entries:**
   - Click "View Past Entries" in any lesson
   - See all entries for current book
   - Filter by book/unit
   - Edit past entries if needed

4. **Print/Export:**
   - Click "Print Journal" 
   - Preview formatted journal
   - Print or save as PDF
   - Share with parents/teacher

---

## 🎯 Success Metrics

**What we'll track:**
- Total entries written
- Average entry length
- Completion rate (lessons with entries)
- Revision frequency
- Print/export usage

**Student benefits:**
- Portfolio of their learning journey
- See their growth over time
- Tangible accomplishment
- Keep forever!

---

## 🔒 Privacy & Data

**Important considerations:**
- COPPA compliance (students under 13)
- No email required for young students
- Parent/teacher control over data
- Export/delete all data option
- Optional anonymous mode

**Data stored:**
- Student first name (no last names required)
- Journal entries
- Timestamps
- Grade level

**NOT stored:**
- No personal info beyond name
- No email addresses (unless parent-provided)
- No tracking cookies

---

## 📋 Next Steps

**To implement, we need to decide:**

1. **Which phase to start with?**
   - Phase 1 (LocalStorage) = Quick MVP
   - Phase 2 (Firebase) = Production-ready

2. **Student authentication?**
   - Simple username (no password)
   - Username + PIN
   - Teacher-managed accounts
   - None (device-based only)

3. **Teacher dashboard needed?**
   - Yes = more complex but powerful
   - No = simpler, student-focused only

---

## 💡 Recommended Approach

**Start with Phase 1 (LocalStorage)**
- Get it working quickly
- Test with your boys
- See what features matter most
- No complex auth needed

**Then add Phase 2 (Cloud) if needed**
- Based on real usage feedback
- When multi-device sync is essential
- When sharing with other families

**Phase 3 when scaling**
- Teacher dashboards
- Analytics
- Advanced features

---

## 🛠️ Quick Implementation Plan

**Week 1:**
- [ ] Build journal widget component
- [ ] Add auto-save functionality
- [ ] Test in lesson pages

**Week 2:**
- [ ] Create journal viewer page
- [ ] Add print styling
- [ ] Test with real lessons

**Week 3:**
- [ ] Polish UI/UX
- [ ] Add export features
- [ ] Deploy & test with students

---

**Ready to start building? Which phase should we tackle first?** 🚀
