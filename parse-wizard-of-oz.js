// Parse Wizard of Oz from Project Gutenberg and create JSON book data

const fs = require('fs');
const path = require('path');

// Chapter mapping based on curriculum
const chapterMapping = [
  { lesson: 1, chapters: [1], title: "Chapter 1: The Cyclone" },
  { lesson: 2, chapters: [2], title: "Chapter 2: The Council with the Munchkins" },
  { lesson: 3, chapters: [3], title: "Chapter 3: How Dorothy Saved the Scarecrow" },
  { lesson: 4, chapters: [4, 5], title: "Chapters 4-5: The Road Through the Forest & The Rescue of the Tin Woodman" },
  { lesson: 5, chapters: [6], title: "Chapter 6: The Cowardly Lion" },
  { lesson: 6, chapters: [7], title: "Chapter 7: The Journey to the Great Oz" },
  { lesson: 7, chapters: [8], title: "Chapter 8: The Deadly Poppy Field" },
  { lesson: 8, chapters: [9, 10], title: "Chapters 9-10: The Queen of the Field Mice & The Guardian of the Gates" },
  { lesson: 9, chapters: [11], title: "Chapter 11: The Wonderful Emerald City of Oz" },
  { lesson: 10, chapters: [12], title: "Chapter 12: The Search for the Wicked Witch" },
  { lesson: 11, chapters: [13, 14], title: "Chapters 13-14: The Rescue & The Winged Monkeys" },
  { lesson: 12, chapters: [15], title: "Chapter 15: The Discovery of Oz, the Terrible" },
  { lesson: 13, chapters: [16], title: "Chapter 16: The Magic Art of the Great Humbug" },
  { lesson: 14, chapters: [17, 18], title: "Chapters 17-18: How the Balloon Was Launched & Away to the South" },
  { lesson: 15, chapters: [19, 20, 21, 22, 23, 24], title: "Chapters 19-24: The Final Journey Home" }
];

// Chapter titles from the book
const chapterTitles = {
  1: "The Cyclone",
  2: "The Council with the Munchkins",
  3: "How Dorothy Saved the Scarecrow",
  4: "The Road Through the Forest",
  5: "The Rescue of the Tin Woodman",
  6: "The Cowardly Lion",
  7: "The Journey to the Great Oz",
  8: "The Deadly Poppy Field",
  9: "The Queen of the Field Mice",
  10: "The Guardian of the Gates",
  11: "The Wonderful Emerald City of Oz",
  12: "The Search for the Wicked Witch",
  13: "The Rescue",
  14: "The Winged Monkeys",
  15: "The Discovery of Oz, the Terrible",
  16: "The Magic Art of the Great Humbug",
  17: "How the Balloon Was Launched",
  18: "Away to the South",
  19: "Attacked by the Fighting Trees",
  20: "The Dainty China Country",
  21: "The Lion Becomes the King of Beasts",
  22: "The Country of the Quadlings",
  23: "Glinda The Good Witch Grants Dorothy's Wish",
  24: "Home Again"
};

// For now, create placeholder structure - we'll add actual text content later
const bookData = [];

chapterMapping.forEach(mapping => {
  const pages = mapping.chapters.map(chNum => {
    return {
      type: "chapter",
      chapter: chNum,
      title: chapterTitles[chNum],
      content: `[Chapter ${chNum} content from The Wonderful Wizard of Oz by L. Frank Baum]\n\nThis chapter will be populated with the actual public domain text.`
    };
  });
  
  const entry = {
    lesson: mapping.lesson,
    bookTitle: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    pages: pages
  };
  
  bookData.push(entry);
});

// Write individual JSON files for each lesson group
bookData.forEach(entry => {
  const filename = `book-data/wizard-of-oz-lesson-${entry.lesson}.json`;
  fs.writeFileSync(filename, JSON.stringify(entry, null, 2));
  console.log(`Created ${filename}`);
});

console.log('\nCreated placeholder book data for Wizard of Oz lessons 1-15');
console.log('Next step: Download actual book text and populate content');
