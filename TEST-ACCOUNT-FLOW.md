# BedrockELA Account Creation Flow Test

## Current Flow (What We Have)

### Step 1: Parent Signup
**Page:** `parent-signup-firebase.html`
- Parent enters: name, email, password
- Creates Firebase auth account
- Stores parent profile in Firestore

### Step 2: Add Students
**Page:** `add-students.html`
- After signup, redirected here
- Add 1+ students with: name, grade level, current lesson
- Stores each student in Firestore under parent's account

### Step 3: Parent Dashboard
**Page:** `parent-dashboard-firebase.html`
- Shows all students as cards
- Can click student to see progress
- Can manage student accounts

### Step 4: Student Login (MISSING?)
**Issue:** How do students log in?
- No `student-login.html` found
- Students might use localStorage only?

### Step 5: Student Dashboard
**Page:** `student-dashboard.html`
- Shows progress, lessons completed
- "Continue to Lesson" button
- Routes to lesson files

## TESTING CHECKLIST

### ✅ Parent Can Create Account
- [ ] Go to parent-signup-firebase.html
- [ ] Enter email/password
- [ ] Successfully creates account
- [ ] Redirected to add-students.html

### ✅ Parent Can Add Students
- [ ] Add student name + grade
- [ ] Select current lesson (Day 1-180)
- [ ] Save to Firestore
- [ ] Can add multiple students

### ❓ Student Can Login
- [ ] Is there a student login page?
- [ ] Or do students select from list?
- [ ] How does student ID get into localStorage?

### ✅ Student Can Access Lessons
- [ ] Student dashboard loads with their data
- [ ] Click "Continue to Lesson" works
- [ ] Lesson saves progress to their account

## ISSUES TO FIX

1. **Student Login Flow Unclear**
   - Need dedicated student-login.html OR
   - Parent selects student from list on shared device

2. **Student Selection**
   - If multiple kids share device, how do they switch?
   - Need "Switch Student" button on dashboard?

3. **First-Time Setup**
   - After parent creates students, how does student first log in?
   - Need clear instructions or automated setup

## RECOMMENDATION

Create simple student selection page:
1. Parent logs in → sees list of their students
2. Parent clicks student → that student's session starts
3. Student dashboard loads with that student's data
4. "Switch Student" button to go back to selection
