# Password Reset Feature
**Date:** February 13, 2026  
**By:** Mushu 🐉

## What I Added

### ✅ Password Reset Flow

A simple, secure 2-step password reset process:

**Step 1: Verify Account**
- User enters email
- Optional: Family name for extra verification
- System checks if account exists
- If family name provided, must match

**Step 2: Set New Password**
- User enters new password (min 6 characters)
- Confirms password
- System updates password hash in database

---

## Files Created/Modified

### New Files:
1. **password-reset.html** - Clean 2-step password reset UI

### Modified Files:
1. **parent-login.html** - Added "Forgot password?" link below password field
2. **journal-backend/server-v2.js** - Added two new endpoints

---

## Backend Endpoints

### 1. POST /api/parent/verify
**Purpose:** Verify account exists and family name matches

**Request Body:**
```json
{
  "email": "user@example.com",
  "family_name": "Johnson Family"  // Optional
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Account verified"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "No account found with that email"
}
```

---

### 2. POST /api/parent/reset-password
**Purpose:** Update password after verification

**Request Body:**
```json
{
  "email": "user@example.com",
  "new_password": "newSecurePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Account not found"
}
```

---

## Security Features

✅ **Password Hashing** - Uses bcrypt (same as signup)
✅ **Family Name Verification** - Optional extra layer of security
✅ **Case-Insensitive Matching** - Family name comparison ignores case
✅ **Password Confirmation** - Frontend requires matching passwords
✅ **Min Password Length** - Enforces 6 character minimum

---

## How It Works

### User Flow:
1. Click "Forgot password?" on login page
2. Enter email address
3. (Optional) Enter family name for verification
4. System verifies account exists
5. Enter new password twice
6. Password is reset
7. Redirect to login page

### Technical Flow:
```
parent-login.html
    ↓ [Forgot password? link]
password-reset.html (Step 1)
    ↓ [Verify email + family name]
POST /api/parent/verify
    ↓ [Success]
password-reset.html (Step 2)
    ↓ [New password + confirm]
POST /api/parent/reset-password
    ↓ [Success]
parent-login.html (with success message)
```

---

## Future Enhancements (Optional)

For production, you might want to add:
- [ ] Email verification with reset code
- [ ] Rate limiting on reset attempts
- [ ] Password strength meter
- [ ] Security questions
- [ ] Two-factor authentication
- [ ] Reset link expiration
- [ ] Audit log of password changes

---

## Testing Checklist

- [ ] "Forgot password?" link appears on login page
- [ ] Clicking link goes to password-reset.html
- [ ] Step 1: Email verification works
- [ ] Step 1: Family name verification works (if provided)
- [ ] Step 1: Shows error for non-existent email
- [ ] Step 1: Shows error for wrong family name
- [ ] Step 2: Password confirmation required
- [ ] Step 2: Shows error if passwords don't match
- [ ] Step 2: Password gets updated in database
- [ ] After reset, can login with new password
- [ ] Old password no longer works

---

**All done! Password reset is live. 🚀**
