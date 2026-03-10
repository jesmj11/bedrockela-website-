# 4th Grade Units 1 & 2 - Ready to Deploy

**Last Updated:** March 9, 2026

---

## 🎯 NEW UNIT ORDER

### Unit 1: The Wonderful Wizard of Oz (Days 1-30)
**Status:** ✅ READY TO DEPLOY  
**Author:** L. Frank Baum  
**Weeks:** 1-6  
**Book:** `books/wizard-of-oz-4th-adapted.txt` (24 chapters)  
**Data:** `book-data/wizard-of-oz-4th-chapters.json`

### Unit 2: The Three Musketeers (Days 31-60)
**Status:** ✅ READY TO DEPLOY  
**Author:** Alexandre Dumas  
**Weeks:** 7-12  
**Book:** `books/three-musketeers-4th.txt` (24 chapters)  
**Data:** `book-data/three-musketeers-4th-chapters.json`

---

## 📊 What We Have

**Total lessons ready:** 60 (48 regular + 12 assessments)  
**Total weeks:** 12 weeks of complete curriculum  
**Total vocabulary:** 96 words (48 per unit)  
**Books:** Both adapted for 4th-5th grade, parsed and ready

---

## 🚀 Deployment Plan

### Step 1: Generate HTML Files ⏳
- Build generator script for Wizard of Oz (Days 1-30)
- Build generator script for Three Musketeers (Days 31-60)
- Generate 60 HTML lesson files

### Step 2: Test Locally ⏳
- Open lessons in browser
- Verify navigation works
- Test Firebase saves
- Check all 11 pages per lesson

### Step 3: Deploy to Production ⏳
- Commit and push to GitHub
- Verify live on bedrockela.com
- Test with student account

---

## 📝 Generator Requirements

**Each generator needs:**
- Read chapter JSON
- Apply 4th grade spine (11 pages regular, 6-8 pages assessment)
- Insert vocabulary (2 words per lesson)
- Create comprehension questions (3 per lesson)
- Add grammar/language sections (alternating)
- Add informational text placeholders
- Add writing prompts (opinion/journal alternating)
- Generate assessment every 5th day

---

## ✅ Quality Checklist

- [ ] All 60 HTML files generated
- [ ] Vocabulary words appropriate for 4th grade
- [ ] Comprehension questions match chapter content
- [ ] Grammar/language alternates correctly (odd/even days)
- [ ] Opinion/journal alternates correctly (odd/even days)
- [ ] Assessments on Days 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
- [ ] Navigation arrows work
- [ ] Firebase completion tracking works
- [ ] All textareas have unique IDs

---

End of 4TH-GRADE-UNITS-1-AND-2.md
