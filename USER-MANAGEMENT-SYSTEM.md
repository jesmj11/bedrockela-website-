# BedrockELA - User Management System

**Complete design for parent/teacher accounts + student creation**

---

## 🎯 Overview

BedrockELA needs a simple, secure way for:
1. **Parents/Teachers** to create accounts and manage their students
2. **Students** to log in and access lessons
3. **Everyone** to stay secure without complexity

---

## 👥 User Types

### 1. Parent/Teacher (Admin Account)
- Creates and manages student accounts
- Views all students' progress
- Sets up family/class settings
- Has email + password login

### 2. Student Account
- Simple login (username + optional PIN)
- Accesses lessons and writes journals
- Can't see other students' work
- Managed by parent/teacher

---

## 🗄️ Database Schema

### Current: `students` table
```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    grade_level TEXT NOT NULL,
    pin_code TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### NEW: `parents` table
```sql
CREATE TABLE parents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    family_name TEXT,                    -- "Johnson Family" or "Mrs. Smith's Class"
    account_type TEXT DEFAULT 'family',  -- 'family' or 'classroom'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### NEW: `parent_students` (relationship table)
```sql
CREATE TABLE parent_students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    relationship TEXT,                   -- 'child', 'student', 'sibling'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE(parent_id, student_id)
);
```

---

## 🔐 Authentication Flow

### Parent/Teacher Sign Up

**Step 1: Create Account**
```
POST /api/parent/signup
{
  "email": "jes@example.com",
  "password": "SecurePassword123",
  "name": "Jes Johnson",
  "family_name": "Johnson Family",
  "account_type": "family"
}
```

**Returns:**
```json
{
  "success": true,
  "parent_id": 1,
  "message": "Account created! Please add your students."
}
```

**Step 2: Add Students**
```
POST /api/parent/student/add
{
  "parent_id": 1,
  "student_name": "Bryton",
  "student_username": "bryton_j",
  "grade_level": "10th",
  "pin_code": "1234"
}
```

**Returns:**
```json
{
  "success": true,
  "student_id": 5,
  "username": "bryton_j",
  "login_url": "/student/login?u=bryton_j"
}
```

---

### Parent/Teacher Login

```
POST /api/parent/login
{
  "email": "jes@example.com",
  "password": "SecurePassword123"
}
```

**Returns:**
```json
{
  "success": true,
  "parent_id": 1,
  "name": "Jes Johnson",
  "token": "jwt_token_here",
  "students": [
    { "id": 5, "name": "Bryton", "grade": "10th" },
    { "id": 6, "name": "Riley", "grade": "8th" }
  ]
}
```

---

### Student Login (Simple)

**Option 1: Username + PIN**
```
POST /api/student/login
{
  "username": "bryton_j",
  "pin_code": "1234"
}
```

**Option 2: Click from Parent Dashboard**
Parent dashboard shows "Login as Bryton" button → auto-login without PIN

---

## 🖥️ UI Flow

### 1. Landing Page (`index.html`)

```
┌─────────────────────────────────────┐
│   🏔️ BedrockELA                     │
│                                     │
│   [For Parents/Teachers]            │
│   [For Students]                    │
└─────────────────────────────────────┘
```

**"For Parents/Teachers"** → Parent login/signup  
**"For Students"** → Student login (username + PIN)

---

### 2. Parent Signup Page (`parent-signup.html`)

```
┌─────────────────────────────────────┐
│   Create Your Account               │
│                                     │
│   Email: [____________]             │
│   Password: [____________]          │
│   Name: [____________]              │
│   Family/Class Name: [____________] │
│                                     │
│   Account Type:                     │
│   ( ) Homeschool Family             │
│   ( ) Classroom/Co-op               │
│                                     │
│   [Create Account]                  │
└─────────────────────────────────────┘
```

---

### 3. Parent Dashboard - First Time (`add-students.html`)

```
┌─────────────────────────────────────┐
│   Welcome, Jes! 👋                  │
│                                     │
│   Let's add your students:          │
│                                     │
│   Student 1:                        │
│   Name: [____________]              │
│   Username: [____________]          │
│   Grade: [1st ▼]                    │
│   PIN (optional): [____]            │
│                                     │
│   [+ Add Another Student]           │
│                                     │
│   [Continue to Dashboard]           │
└─────────────────────────────────────┘
```

---

### 4. Parent Dashboard - Main View (`parent-dashboard.html`)

```
┌─────────────────────────────────────────────────────┐
│  🏔️ BedrockELA       Johnson Family    [Settings]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📚 Your Students                                   │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────┐       │
│  │ 👤 Bryton        │  │ 👤 Riley         │       │
│  │ Grade: 10th      │  │ Grade: 8th       │       │
│  │ Lesson: 156/180  │  │ Lesson: 45/180   │       │
│  │ [Login as →]     │  │ [Login as →]     │       │
│  │ [View Progress]  │  │ [View Progress]  │       │
│  └──────────────────┘  └──────────────────┘       │
│                                                     │
│  [+ Add Student]                                    │
│                                                     │
│  📊 Family Overview                                 │
│  • Total lessons completed: 201                     │
│  • Total words written: 12,458                      │
│  • Most active: Bryton (156 lessons)                │
└─────────────────────────────────────────────────────┘
```

**"Login as →"** button → Opens student dashboard in new tab/window, auto-logged-in

---

### 5. Student Login Page (`student-login.html`)

```
┌─────────────────────────────────────┐
│   Student Login                     │
│                                     │
│   Username: [____________]          │
│   PIN: [____]                       │
│                                     │
│   [Login]                           │
│                                     │
│   📝 Don't have an account?         │
│   Ask your parent or teacher!       │
└─────────────────────────────────────┘
```

---

### 6. Student Dashboard (`student-dashboard.html`)

```
┌─────────────────────────────────────────────────────┐
│  🏔️ BedrockELA       Hi, Bryton!       [Logout]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📖 4th Grade                                       │
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │ 🏔️ Current Lesson                    │          │
│  │                                      │          │
│  │ Lesson 65: Call of the Wild Ch. 3   │          │
│  │ [Continue Reading →]                │          │
│  └──────────────────────────────────────┘          │
│                                                     │
│  📚 Your Progress                                   │
│  ████████████░░░░░░░░ 65/180 lessons               │
│                                                     │
│  ✏️ Your Journals                                   │
│  • 65 entries written                              │
│  • 3,245 words total                               │
│  [View All Journals]                               │
└─────────────────────────────────────────────────────┘
```

---

## 🔌 New API Endpoints

### Parent/Teacher Management

**POST** `/api/parent/signup`
Create parent/teacher account

**POST** `/api/parent/login`
Login parent/teacher

**GET** `/api/parent/:id/students`
Get all students for this parent

**POST** `/api/parent/student/add`
Add new student to parent's account

**PUT** `/api/parent/student/:id`
Update student info

**DELETE** `/api/parent/student/:id`
Remove student (soft delete recommended)

**GET** `/api/parent/:id/stats`
Family/class overview stats

---

### Student Management

**POST** `/api/student/login`
Student login (username + optional PIN)

**GET** `/api/student/:id/progress`
Get student's lesson progress

**PUT** `/api/student/:id/progress`
Update current lesson number

---

## 🔐 Security Considerations

### Password Storage
- Use `bcrypt` to hash passwords (never store plaintext!)
- Salt rounds: 10-12

```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10);
```

### JWT Tokens
- Use JWT for parent/teacher sessions
- Students use simpler session (username + student_id)

```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign({ parent_id: 1 }, process.env.JWT_SECRET, { expiresIn: '7d' });
```

### Student PINs
- Optional 4-digit PIN (for younger kids)
- Stored as plaintext (low security risk, just prevents sibling access)
- If security is concern, can be hashed

### Rate Limiting
- Limit login attempts (5 per 15 minutes per IP)
- Prevent brute force attacks

---

## 🎨 Implementation Order

### Phase 1: Basic Parent Accounts (MVP)
1. ✅ `parents` table + `parent_students` table
2. ✅ Parent signup page
3. ✅ Parent login page
4. ✅ "Add Student" form
5. ✅ Parent dashboard showing students

### Phase 2: Student Login
6. ✅ Student login page (username + PIN)
7. ✅ Student dashboard
8. ✅ "Login as Student" from parent dashboard

### Phase 3: Progress Tracking
9. ✅ Track current lesson per student
10. ✅ Show progress bars on parent dashboard
11. ✅ Stats (lessons completed, words written)

### Phase 4: Settings & Management
12. ✅ Edit student info
13. ✅ Reset student PIN
14. ✅ Archive/delete students
15. ✅ Parent account settings

---

## 🧪 Sample Data (for testing)

### Parent Account:
```sql
INSERT INTO parents (email, password_hash, name, family_name, account_type)
VALUES ('jes@example.com', '$2b$10$...', 'Jes Johnson', 'Johnson Family', 'family');
```

### Students:
```sql
INSERT INTO students (name, username, grade_level, pin_code)
VALUES 
  ('Bryton', 'bryton_j', '10th', '1234'),
  ('Riley', 'riley_j', '8th', '5678'),
  ('Levi', 'levi_j', '7th', '9012');

INSERT INTO parent_students (parent_id, student_id, relationship)
VALUES 
  (1, 1, 'child'),
  (1, 2, 'child'),
  (1, 3, 'child');
```

---

## 📱 Mobile Considerations

### Parent Dashboard
- Responsive design (works on phone/tablet)
- Touch-friendly buttons
- Stacked cards on small screens

### Student Dashboard
- Large, kid-friendly buttons
- Simple navigation
- Touch-optimized

---

## 🚀 Deployment

### Environment Variables
```env
PORT=3001
JWT_SECRET=your_random_secret_here_change_this
SESSION_SECRET=another_random_secret
DATABASE_PATH=./journal.db
NODE_ENV=production
```

### Security Checklist
- [ ] HTTPS enabled (use Caddy or nginx)
- [ ] JWT secret is random and secure
- [ ] Passwords are hashed with bcrypt
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] Database backups automated

---

## 🎓 User Experience Flow

### New Family Signing Up:

1. Visit bedrockela.com
2. Click "For Parents/Teachers"
3. Click "Create Account"
4. Fill in email, password, name
5. Add students (name, username, grade, PIN)
6. See dashboard with students
7. Click "Login as [Student]" → Opens student view
8. Student starts lessons!

**Time to first lesson: ~3 minutes** ⏱️

---

## 🔄 Existing Users:

### Parent:
1. Visit bedrockela.com
2. Click "For Parents/Teachers"
3. Login with email + password
4. See dashboard with all students
5. View progress, journals, stats

### Student:
1. Visit bedrockela.com
2. Click "For Students"
3. Enter username + PIN
4. Access lessons and journals

**Or:** Parent clicks "Login as [Student]" from dashboard (faster!)

---

## 📊 What Data is Tracked?

### Per Student:
- Current lesson number (1-180)
- Current grade level
- Journal entries (all saved)
- Words written (total count)
- Last login date
- Account creation date

### Per Parent/Family:
- Number of students
- Total lessons completed (across all students)
- Total words written
- Most active student
- Account creation date

### Privacy:
- ✅ No tracking cookies
- ✅ No analytics by default
- ✅ No third-party services
- ✅ All data stored in YOUR database
- ✅ No data sharing

---

## 💡 Future Enhancements

### Phase 5: Advanced Features
- Email notifications (weekly progress reports)
- Export journals as PDF
- Print certificates (lesson milestones)
- Share progress with teachers/co-ops
- Gradebook integration
- Assignment scheduling

### Phase 6: Community Features (Optional)
- Teacher forums
- Share lesson plans
- Co-op management tools
- Student portfolios

---

## 🛠️ Technical Stack

**Backend:**
- Node.js + Express
- SQLite (or PostgreSQL for scale)
- bcrypt (password hashing)
- jsonwebtoken (JWT auth)
- express-rate-limit (security)

**Frontend:**
- HTML + CSS + JavaScript (vanilla)
- No framework required!
- Responsive design (mobile-friendly)

**Deployment:**
- Railway, Render, or VPS
- Can run on local network for homeschool families

---

## 📝 Next Steps

To implement this:

1. **Update database schema** - Add `parents` and `parent_students` tables
2. **Build parent signup/login** - HTML pages + API endpoints
3. **Build "Add Student" flow** - Form + API
4. **Update parent dashboard** - Show students, progress
5. **Build student login** - Simple username + PIN
6. **Connect everything** - JWT auth, sessions, etc.

**Want me to build this?** I can create:
- Updated database schema SQL
- API endpoints (Node.js)
- HTML pages (signup, login, dashboards)
- Complete working system

Just say the word! 🐉

---

**Last Updated:** 2026-02-13  
**Status:** Design complete, ready to implement  
**Estimated Build Time:** 1-2 weeks for MVP
