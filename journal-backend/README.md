# BedrockELA Journal Database Backend
## Student Journal System with Full Backend Control

---

## 🎯 What This Is

A complete backend API for BedrockELA student journals. Students write journal entries as they complete lessons, and all data is saved to YOUR database. No vendor lock-in, full control!

---

## 🚀 Quick Start

### **1. Install Dependencies**
```bash
cd journal-backend
npm install
```

### **2. Initialize Database**
```bash
npm run init-db
```

This creates `journal.db` with all tables and sample data.

### **3. Start Server**
```bash
npm start
```

**Development mode (auto-restart):**
```bash
npm run dev
```

Server runs on **http://localhost:3001**

---

## 📊 Database Schema

### **students** table
- `id` - Auto-increment primary key
- `name` - Student's name
- `username` - Unique username
- `grade_level` - '1st', '4th', '6th', etc.
- `pin_code` - Optional PIN for security
- `created_at` - Account creation timestamp
- `last_login` - Last login timestamp

### **journal_entries** table
- `id` - Auto-increment primary key
- `student_id` - Foreign key to students
- `grade` - Grade level
- `lesson_number` - 1-180
- `unit_number` - Unit within grade
- `book_title` - Book being read
- `entry_date` - Date of entry
- `entry_text` - The actual journal entry
- `word_count` - Calculated word count
- `revised` - Boolean, has entry been edited
- `created_at` - First save timestamp
- `updated_at` - Last edit timestamp

### **journal_prompts** table
- `id` - Auto-increment primary key
- `grade` - Grade level
- `lesson_number` - Lesson number
- `prompt_text` - The writing prompt

---

## 🔌 API Endpoints

### **Student Management**

**POST** `/api/student/login`
```json
{
  "username": "johndoe",
  "name": "John Doe",
  "grade_level": "4th",
  "pin_code": "1234"
}
```
Returns: Student object with ID

**GET** `/api/student/:id`
Returns: Student profile + stats (total entries, total words)

---

### **Journal Entries**

**POST** `/api/journal/save`
```json
{
  "student_id": 123,
  "grade": "4th",
  "lesson_number": 5,
  "unit_number": 1,
  "book_title": "The Wonderful Wizard of Oz",
  "entry_text": "Today I read about..."
}
```
Auto-calculates word count. Creates new or updates existing.

**GET** `/api/journal/entry/:student_id/:grade/:lesson_number`
Returns: Specific entry

**GET** `/api/journal/student/:student_id?grade=4th&unit=1`
Returns: All entries for student (optional filters)

**GET** `/api/journal/book/:student_id/:book_title`
Returns: All entries for a specific book

**PUT** `/api/journal/entry/:id`
Update existing entry

**DELETE** `/api/journal/entry/:id`
Delete entry

---

### **Prompts**

**GET** `/api/prompt/:grade/:lesson_number`
Returns: Writing prompt for that lesson

---

## 🎨 Frontend Integration

### **1. Add to HTML**
```html
<!-- In lesson page -->
<link rel="stylesheet" href="/css/journal.css">
<script src="/js/journal-widget.js"></script>

<!-- Journal widget container -->
<div class="journal-widget" 
     data-grade="4th" 
     data-lesson="5"
     data-unit="1"
     data-book="The Wonderful Wizard of Oz">
</div>
```

That's it! The widget auto-initializes!

### **2. Configure API URL (optional)**
```html
<div class="journal-widget" 
     data-api-url="https://your-api.com/api"
     data-grade="4th" 
     data-lesson="5">
</div>
```

---

## 🔐 Security Features

**Included:**
- Helmet.js (security headers)
- CORS configured
- Rate limiting (100 requests per 15 minutes per IP)
- No sensitive data in localStorage
- Optional PIN codes for students

**Recommended additions for production:**
- HTTPS (use nginx or Caddy)
- JWT tokens for authentication
- Teacher admin dashboard with auth
- Backup automation

---

## 📦 Deployment Options

### **Option 1: Railway** (Easiest)
1. Create account at railway.app
2. "New Project" → "Deploy from GitHub"
3. Select this repo
4. Set start command: `npm start`
5. Railway auto-deploys!

### **Option 2: Render**
1. Create account at render.com
2. "New Web Service"
3. Connect GitHub repo
4. Build: `npm install`
5. Start: `npm start`

### **Option 3: VPS (DigitalOcean, Linode, etc.)**
1. Create Ubuntu server
2. Install Node.js
3. Clone repo
4. `npm install && npm start`
5. Use PM2 for process management
6. Use nginx as reverse proxy

### **Option 4: Local Network**
Perfect for homeschool families!
1. Run on home computer
2. Access from any device on same WiFi
3. Find your local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
4. Access at `http://YOUR-IP:3001`

---

## 🗄️ Database Location

**Default:** `./journal.db` (SQLite file in same directory)

**Backup:**
```bash
# Copy database file
cp journal.db journal-backup-$(date +%Y%m%d).db

# Or use SQLite dump
sqlite3 journal.db .dump > backup.sql
```

**Migrate to PostgreSQL later:**
Easy migration path when you outgrow SQLite!

---

## 📊 Environment Variables

Create `.env` file:
```env
PORT=3001
NODE_ENV=production
DATABASE_PATH=./journal.db
```

---

## 🧪 Testing

**Health check:**
```bash
curl http://localhost:3001/api/health
```

**Create test student:**
```bash
curl -X POST http://localhost:3001/api/student/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","name":"Test Student","grade_level":"4th"}'
```

**Save test entry:**
```bash
curl -X POST http://localhost:3001/api/journal/save \
  -H "Content-Type: application/json" \
  -d '{"student_id":1,"grade":"4th","lesson_number":1,"entry_text":"This is a test entry."}'
```

---

## 📈 Scaling

**SQLite is great for:**
- Up to ~10,000 students
- Single-server deployments
- Low-write concurrency

**Migrate to PostgreSQL when:**
- Multiple servers needed
- High concurrent writes
- Advanced queries/reporting

**Migration is straightforward:**
1. Change `sqlite3` to `pg` in package.json
2. Update connection code
3. Export/import data

---

## 🎓 Features

**Student Features:**
- ✅ Auto-save (every 10 seconds)
- ✅ Word count tracking
- ✅ View past entries
- ✅ Print journal
- ✅ Offline fallback (localStorage)

**Teacher Features (future):**
- View all student journals
- Track completion rates
- See word count progress
- Export class data

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in .env or:
PORT=3002 npm start
```

**Database locked:**
SQLite only allows one writer at a time. Use PostgreSQL for high concurrency.

**CORS errors:**
Update `cors()` in server.js to allow your frontend domain.

---

## 📝 License

MIT - Use freely for your BedrockELA installation!

---

## 🎉 You Did It!

Your journal backend is running! Students can now:
- Write daily journals
- Auto-save their work
- View past entries
- Print their journals

**Full control. No vendor lock-in. Your data. Your infrastructure.** ✅

---

**Questions?** Check the main BedrockELA README or open an issue!
