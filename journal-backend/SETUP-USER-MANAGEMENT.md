# BedrockELA User Management - Setup Guide

**Complete parent/teacher accounts + student management system**

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Install New Dependencies

```bash
cd journal-backend
npm install bcrypt jsonwebtoken
```

### Step 2: Create .env File

```bash
# Create .env file
cat > .env << 'EOF'
PORT=3001
JWT_SECRET=your-super-secret-random-string-change-this
NODE_ENV=development
EOF
```

**⚠️ IMPORTANT:** Change `JWT_SECRET` to a random string in production!

Generate a random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Initialize Database with User Management

```bash
npm run init-db-v2
```

This creates:
- `parents` table (email, password, name)
- `students` table (username, grade, PIN)
- `parent_students` relationship table
- Sample accounts for testing

### Step 4: Start Server

```bash
npm start
```

Server runs on **http://localhost:3001**

---

## 🧪 Test Accounts Created

### Parent Account:
- **Email:** jes@example.com
- **Password:** password123

### Students:
- **bryton_j** (PIN: 1234) - Grade 10th, Lesson 156
- **riley_j** (PIN: 5678) - Grade 8th, Lesson 45
- **levi_j** (PIN: 9012) - Grade 7th, Lesson 23

---

## 🔌 New API Endpoints

### Parent Management

**POST** `/api/parent/signup`
```json
{
  "email": "parent@example.com",
  "password": "SecurePassword123",
  "name": "Parent Name",
  "family_name": "Smith Family",
  "account_type": "family"
}
```

**POST** `/api/parent/login`
```json
{
  "email": "jes@example.com",
  "password": "password123"
}
```
Returns JWT token + list of students

**GET** `/api/parent/:id` (requires JWT auth)
Get parent profile + students

**GET** `/api/parent/:id/stats` (requires JWT auth)
Get family stats (total lessons, words, etc.)

---

### Student Management (Parent Auth Required)

**POST** `/api/parent/student/add`
```json
{
  "student_name": "New Student",
  "student_username": "newkid",
  "grade_level": "4th",
  "pin_code": "1234"
}
```

**PUT** `/api/parent/student/:id`
Update student info

**DELETE** `/api/parent/student/:id`
Remove student

---

### Student Login

**POST** `/api/student/login`
```json
{
  "username": "bryton_j",
  "pin_code": "1234"
}
```

**GET** `/api/student/:id/progress`
Get student progress (current lesson, journal stats)

**PUT** `/api/student/:id/progress`
```json
{
  "current_lesson": 67
}
```

---

## 🔐 Authentication

### Parent Auth (JWT)
- Parents receive JWT token on login
- Token expires in 7 days
- Include in requests: `Authorization: Bearer <token>`

### Student Auth (Simple)
- Username + optional PIN
- No token needed (session-based)
- Suitable for kids

---

## 🧪 Testing with cURL

### Test Parent Signup:
```bash
curl -X POST http://localhost:3001/api/parent/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123",
    "name": "Test Parent",
    "family_name": "Test Family"
  }'
```

### Test Parent Login:
```bash
curl -X POST http://localhost:3001/api/parent/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jes@example.com",
    "password": "password123"
  }'
```

### Test Student Login:
```bash
curl -X POST http://localhost:3001/api/student/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "bryton_j",
    "pin_code": "1234"
  }'
```

### Test Add Student (requires token from login):
```bash
curl -X POST http://localhost:3001/api/parent/student/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "student_name": "Test Kid",
    "student_username": "testkid",
    "grade_level": "4th",
    "pin_code": "9999"
  }'
```

---

## 📊 Database Schema

### parents
```sql
CREATE TABLE parents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  family_name TEXT,
  account_type TEXT DEFAULT 'family',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);
```

### students
```sql
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  grade_level TEXT NOT NULL,
  pin_code TEXT,
  current_lesson INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);
```

### parent_students (relationship)
```sql
CREATE TABLE parent_students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  relationship TEXT DEFAULT 'child',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  UNIQUE(parent_id, student_id)
);
```

---

## 🔒 Security Features

✅ **Password Hashing** - bcrypt with 10 salt rounds  
✅ **JWT Tokens** - 7-day expiration  
✅ **Rate Limiting** - 5 login attempts per 15 minutes  
✅ **Helmet.js** - Security headers  
✅ **CORS** - Cross-origin protection  
✅ **SQL Injection Protection** - Parameterized queries  

---

## 🚨 Production Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to random string
- [ ] Enable HTTPS (use nginx or Caddy)
- [ ] Set `NODE_ENV=production`
- [ ] Remove test accounts from database
- [ ] Set up database backups
- [ ] Configure CORS for your domain
- [ ] Add logging (Winston, Morgan)
- [ ] Set up monitoring (Sentry)

---

## 🔄 Migration from Old Server

If you have existing student data:

```sql
-- Backup old database
cp journal.db journal-backup.db

-- Run new init script (creates new tables)
npm run init-db-v2

-- Old students table is preserved
-- Create parent account manually, then link students
```

---

## 📝 Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Create `.env` file with JWT secret
3. ✅ Run `npm run init-db-v2`
4. ✅ Start server (`npm start`)
5. 🔜 Build frontend pages (signup, login, dashboard)
6. 🔜 Test full workflow
7. 🔜 Deploy!

---

## 🆘 Troubleshooting

**Error: "Cannot find module 'bcrypt'"**
- Run: `npm install bcrypt jsonwebtoken`

**Error: "JWT_SECRET not defined"**
- Create `.env` file with `JWT_SECRET=your-secret-here`

**Error: "UNIQUE constraint failed"**
- Test accounts already exist
- Delete `journal.db` and run `npm run init-db-v2` again

**Port 3001 already in use:**
- Change port in `.env`: `PORT=3002`
- Or stop other process: `lsof -ti:3001 | xargs kill`

---

## ✅ Status

**Backend:** ✅ Complete  
**Frontend:** 🔜 Next (parent signup/login pages)  
**Integration:** 🔜 After frontend  
**Testing:** 🔜 After integration  

---

**Ready to test the backend!** 🚀

Run `npm start` and test with cURL commands above.

Next: Building frontend HTML pages for parent signup/login!
