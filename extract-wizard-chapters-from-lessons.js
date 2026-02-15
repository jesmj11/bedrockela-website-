const fs = require('fs');
const path = require('path');

// We'll create a script to help manually populate the book content
// For now, let's update the JSON files with better structure and note where content should go

const lessons = [
  {num: 1, chapters: [1], title: "The Cyclone"},
  {num: 2, chapters: [2], title: "The Council with the Munchkins"},
  {num: 3, chapters: [3], title: "How Dorothy Saved the Scarecrow"},
  {num: 4, chapters: [4, 5], titles: ["The Road Through the Forest", "The Rescue of the Tin Woodman"]},
  {num: 5, chapters: [6], title: "The Cowardly Lion"},
  {num: 6, chapters: [7], title: "The Journey to the Great Oz"},
  {num: 7, chapters: [8], title: "The Deadly Poppy Field"},
  {num: 8, chapters: [9, 10], titles: ["The Queen of the Field Mice", "The Guardian of the Gates"]},
  {num: 9, chapters: [11], title: "The Wonderful Emerald City of Oz"},
  {num: 10, chapters: [12], title: "The Search for the Wicked Witch"},
  {num: 11, chapters: [13, 14], titles: ["The Rescue", "The Winged Monkeys"]},
  {num: 12, chapters: [15], title: "The Discovery of Oz, the Terrible"},
  {num: 13, chapters: [16], title: "The Magic Art of the Great Humbug"},
  {num: 14, chapters: [17, 18], titles: ["How the Balloon Was Launched", "Away to the South"]},
  {num: 15, chapters: [19, 20, 21, 22, 23, 24], titles: [
    "Attacked by the Fighting Trees",
    "The Dainty China Country", 
    "The Lion Becomes the King of Beasts",
    "The Country of the Quadlings",
    "Glinda The Good Witch Grants Dorothy's Wish",
    "Home Again"
  ]}
];

// Create a consolidated book file that maps to all lessons
const bookPages = [];

lessons.forEach(lesson => {
  if (Array.isArray(lesson.titles)) {
    lesson.chapters.forEach((chNum, idx) => {
      bookPages.push({
        type: "chapter",
        chapter: chNum,
        title: lesson.titles[idx],
        lesson: lesson.num,
        content: `# Chapter ${chNum}: ${lesson.titles[idx]}\n\n[Full chapter text from The Wonderful Wizard of Oz by L. Frank Baum will be inserted here]`
      });
    });
  } else {
    lesson.chapters.forEach(chNum => {
      bookPages.push({
        type: "chapter",
        chapter: chNum,
        title: lesson.title,
        lesson: lesson.num,
        content: `# Chapter ${chNum}: ${lesson.title}\n\n[Full chapter text from The Wonderful Wizard of Oz by L. Frank Baum will be inserted here]`
      });
    });
  }
});

const bookData = {
  bookTitle: "The Wonderful Wizard of Oz",
  author: "L. Frank Baum",
  year: 1900,
  description: "Join Dorothy and her friends on the yellow brick road in this timeless American fairy tale.",
  lessons: "1-15",
  pages: bookPages
};

// Save consolidated book file
fs.writeFileSync('book-data/wizard-of-oz-full.json', JSON.stringify(bookData, null, 2));
console.log('Created book-data/wizard-of-oz-full.json with structure for 24 chapters');

// Now create the lesson-to-book mapping update
console.log('\nNext: Update lesson-to-book-mapping.json to include Wizard of Oz');
