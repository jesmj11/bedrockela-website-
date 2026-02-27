# BedrockELA Deployment Status

## Current Architecture (as of Feb 27, 2026)

### ✅ ACTIVE: GitHub Pages (Frontend)
- **URL:** https://bedrockela.com
- **Hosting:** GitHub Pages (free)
- **Source:** `jesmj11/bedrockela-website-` main branch
- **Auto-deploy:** Every git push
- **HTTPS:** Valid until Apr 30, 2026

### ✅ ACTIVE: Firebase (Backend)
- **Project:** `bedrockela-96dbd`
- **Services:**
  - Firestore Database (student data, progress, families)
  - Authentication (username/PIN login)
- **Admin Access:** `firebase-admin-key.json` (gitignored)
- **Current Pages:**
  - `student-login.html` → `student-dashboard.html`
  - `parent-login-firebase.html` → `parent-dashboard-firebase.html`

### ⏸️ PAUSED: Railway (Old Backend)
- **URL:** `bedrockela-website-production.up.railway.app`
- **Service:** Node.js + PostgreSQL journal backend
- **Status:** PAUSED (kept as backup, not actively used)
- **Files:** `Procfile`, `railway.json`, `journal-backend/`
- **Legacy Pages Still Referencing It:**
  - `parent-dashboard-live.html`
  - `parent-login.html` (non-firebase)
  - `add-students.html`
  - `family-manage-students.html`

**Note:** These files are NOT linked from the main site (`index.html`)

---

## To Resume Railway (if needed):
1. Go to Railway dashboard
2. Find `bedrockela-website-production` project
3. Click "Wake" or "Resume Service"
4. Update any pages to use Railway API URL

---

## Deployment Workflow

### Frontend Changes (HTML/CSS/JS)
```bash
git add .
git commit -m "Your changes"
git push origin main
# Site updates automatically in ~2-3 minutes
```

### Backend Changes (Firebase Rules/Data)
```bash
# Update Firestore rules manually in Firebase Console
# OR use scripts:
node setup-firebase.js        # Create students
node deploy-rules.js          # Deploy rules (if working)
```

### Adding Students
```bash
# Edit setup-firebase.js, add to students array:
{ username: 'newkid', name: 'New Kid', gradeLevel: '2nd Grade', pin: '' }

# Run:
node setup-firebase.js
```

---

## Firebase Security Rules (Manual Update Required)
Go to: https://console.firebase.google.com/project/bedrockela-96dbd/firestore/rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{student} {
      allow read, write: if true;  // Open for testing
    }
    match /families/{family} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish** to activate.

---

## Emergency Contacts
- Firebase Console: https://console.firebase.google.com/project/bedrockela-96dbd
- GitHub Repo: https://github.com/jesmj11/bedrockela-website-
- Railway Dashboard: https://railway.app/
- Domain: bedrockela.com (GitHub Pages CNAME)
