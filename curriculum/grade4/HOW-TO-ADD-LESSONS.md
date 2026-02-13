# How to Add New 4th Grade Lessons

**For:** Jes  
**Updated:** February 13, 2026

---

## 🎯 Simple Workflow

### Step 1: Build Your Lessons (You)

Create lessons in Word however you like! No specific format required in Word - Mushu will handle formatting.

**Save to:** `~/Desktop/4th ELA/`  
**Name clearly:** Something like `unit3_days61to90.docx` or `call_of_wild_lessons.docx`

**Tips:**
- Keep the same lesson structure you've been using (Welcome, Before You Read, etc.)
- Use emojis if you want (or don't - Mushu can add them)
- Don't worry about perfect formatting in Word
- Just get your content down!

---

### Step 2: Tell Mushu

When you've finished a batch of lessons, just message:

```
"Hey Mushu, new 4th grade lessons ready: unit3_days61to90.docx"
```

or

```
"4th grade lessons 61-90 are on the desktop!"
```

That's it! Mushu will handle the rest.

---

### Step 3: Mushu Handles Everything (Automatic)

Mushu will:
1. ✅ Convert Word → markdown
2. ✅ Split into individual lesson files (`lesson-061-day61.md`, etc.)
3. ✅ Check formatting consistency
4. ✅ Add to curriculum folder
5. ✅ Update progress tracker
6. ✅ Quality check
7. ✅ Tell you when it's done!

**You don't have to do anything technical.** Just write the lessons and drop them on the desktop.

---

## 📁 Where Things Go

### Your Working Files (Desktop):
```
~/Desktop/4th ELA/
├── 4th_grade_ela_scope_sequence.docx (your master plan)
├── lessons_2_to_10.docx ✅ (already converted)
├── lessons_11_to_30.docx ✅ (already converted)
├── unit2_days31to45.docx ✅ (already converted)
├── unit2_days46to60.docx ✅ (already converted)
└── [NEW FILES YOU CREATE GO HERE]
```

### Curriculum Files (Managed by Mushu):
```
workspace/bedrockela-website-/curriculum/grade4/
├── README.md
├── 4TH-GRADE-PROGRESS.md (tracks what's done)
├── QUALITY-CHECK-REPORT.md (QA notes)
├── lessons/
│   ├── lesson-001-day1.md ✅
│   ├── lesson-002-day2.md ✅
│   ├── ...
│   ├── lesson-060-day60.md ✅
│   └── [NEW LESSONS APPEAR HERE AUTOMATICALLY]
```

**You never have to touch the `curriculum/grade4/` folder.** Mushu manages it.

---

## 🔄 Example Workflow

### You're Building Unit 3 (Days 61-90):

**Week 1:**
- You write lessons 61-70 in Word
- Save as `unit3_days61to70.docx` on Desktop
- Message Mushu: "New lessons ready: unit3_days61to70.docx"
- Mushu converts them → adds to curriculum → tells you it's done

**Week 2:**
- You write lessons 71-80
- Save as `unit3_days71to80.docx`
- Message Mushu
- Mushu handles it

**Week 3:**
- You finish lessons 81-90
- Save as `unit3_days81to90.docx`
- Message Mushu
- Done! Unit 3 complete! 🎉

---

## 💡 Tips for Writing Lessons

### Keep Using the Same Structure:

```
UNIT X • LESSON Y OF 180
[Lesson Title]
[Book/Chapter]

📚 Welcome!
[Context and overview]

Today you will:
• [Learning objectives]

Time: About X minutes

🧐 Part 1: Before You Read
[Pre-reading questions/context]

📖 Part 2: Today's Task
[Reading instructions]

💬 Part 3: Word of the Day
[Vocabulary word]

✅ Check Your Understanding
[Comprehension questions]

✍️ Your Reading Journal
[Journal prompt]

🌟 You're Done!
[Celebration message]
```

**This format works great - keep doing exactly this!**

---

## 🎯 Current Status (as of Feb 13, 2026)

✅ **Days 1-60 COMPLETE** (Units 1-2)  
🔜 **Days 61-90 NEXT** (Unit 3: Call of the Wild + Jungle Book)  
🔜 **Days 91-120 AFTER** (Unit 4: Around the World in 80 Days)  
🔜 **Days 121-150 THEN** (Unit 5: Alice in Wonderland)  
🔜 **Days 151-180 FINAL** (Unit 6: Secret Garden)  

**You're 1/3 of the way done! Keep going!** 🚀

---

## ❓ FAQs

**Q: Do I need to format the Word doc perfectly?**  
A: Nope! Just get your content down. Mushu handles formatting.

**Q: Should I add emojis in Word?**  
A: If you want! Or Mushu can add them during conversion.

**Q: What if I build lessons in chunks (like 5 at a time)?**  
A: Totally fine! Send them over whenever you finish a batch.

**Q: Can I revise a lesson after Mushu converts it?**  
A: Yes! Just tell Mushu "I need to update lesson 75" and send the updated Word doc.

**Q: Do the Word docs need to be named a certain way?**  
A: No strict rules, but clear names help (like `unit3_days61to90.docx`). Just avoid super vague names like `new lessons.docx`.

**Q: What if I mess up the lesson numbers?**  
A: Mushu will catch it and fix it during conversion.

---

## 🐉 Mushu's Job (You Don't Need to Worry About This)

When you send new lessons, Mushu will:

1. **Convert Word → Text**
   ```bash
   textutil -convert txt your-file.docx -output staging/file.txt
   ```

2. **Split into Individual Lessons**
   ```python
   # Python script splits by "UNIT X • LESSON Y" headers
   # Saves as lesson-061-day61.md, lesson-062-day62.md, etc.
   ```

3. **Quality Check**
   - Format consistency ✓
   - Lesson numbering ✓
   - File naming ✓
   - Content alignment ✓

4. **Copy to Curriculum Folder**
   ```bash
   cp staging/lessons/*.md curriculum/grade4/lessons/
   ```

5. **Update Progress Tracker**
   - Mark new lessons complete
   - Update percentages
   - Adjust milestones

6. **Tell You It's Done!**
   - "60 lessons ready!" → "90 lessons ready!" etc.

**You focus on content. Mushu handles tech.** 🐉✨

---

## 📞 Contact

**Questions?** Just ask Mushu! 🐉

**Ready to send lessons?** Drop them on the Desktop and ping Mushu!

**Want to see your progress?** Check `4TH-GRADE-PROGRESS.md` anytime!

---

**Your job:** Write amazing lessons  
**Mushu's job:** Make them beautiful and organized  

**Together:** Build the best 4th grade ELA curriculum ever! 🌟

---

**Last Updated:** 2026-02-13  
**Next Batch:** Unit 3, Days 61-90 (Call of the Wild + Jungle Book)  
**Status:** Ready for more lessons whenever you are! 🚀
