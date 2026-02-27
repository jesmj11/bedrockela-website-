// Wizard of Oz Chapter Mapping for 4th Grade Days 1-30
// 24 chapters total + 6 assessment/review days

const wizardOfOzMapping = [
  // Week 1 (Days 1-5)
  { day: 1, chapter: 1, title: "The Cyclone", words: ["cyclone", "prairie"] },
  { day: 2, chapter: 2, title: "The Council with the Munchkins", words: ["munchkin", "sorceress"] },
  { day: 3, chapter: 3, title: "How Dorothy Saved the Scarecrow", words: ["scarecrow", "emerald"] },
  { day: 4, chapter: 4, title: "The Road Through the Forest", words: ["dismal", "lonesome"] },
  { day: 5, type: 'assessment', title: "Week 1 Assessment", focus: "Chapters 1-4" },
  
  // Week 2 (Days 6-10)
  { day: 6, chapter: 5, title: "The Rescue of the Tin Woodman", words: ["woodman", "joints"] },
  { day: 7, chapter: 6, title: "The Cowardly Lion", words: ["cowardly", "courage"] },
  { day: 8, chapter: 7, title: "The Journey to the Great Oz", words: ["ditch", "kalidah"] },
  { day: 9, chapter: 8, title: "The Deadly Poppy Field", words: ["poppy", "fragrance"] },
  { day: 10, type: 'assessment', title: "Week 2 Assessment", focus: "Chapters 5-8" },
  
  // Week 3 (Days 11-15)
  { day: 11, chapter: 9, title: "The Queen of the Field Mice", words: ["wildcat", "queen"] },
  { day: 12, chapter: 10, title: "The Guardian of the Gate", words: ["guardian", "spectacles"] },
  { day: 13, chapter: 11, title: "The Wonderful City of Oz", words: ["brilliant", "marble"] },
  { day: 14, chapter: 12, title: "The Search for the Wicked Witch", words: ["wicked", "slaves"] },
  { day: 15, type: 'assessment', title: "Week 3 Assessment", focus: "Chapters 9-12" },
  
  // Week 4 (Days 16-20)
  { day: 16, chapter: 13, title: "The Rescue", words: ["rescue", "tinsmith"] },
  { day: 17, chapter: 14, title: "The Winged Monkeys", words: ["winged", "charm"] },
  { day: 18, chapter: 15, title: "The Discovery of Oz, the Terrible", words: ["humbug", "ventriloquist"] },
  { day: 19, chapter: 16, title: "The Magic Art of the Great Humbug", words: ["bran", "sawdust"] },
  { day: 20, type: 'assessment', title: "Week 4 Assessment", focus: "Chapters 13-16" },
  
  // Week 5 (Days 21-25)
  { day: 21, chapter: 17, title: "How the Balloon Was Launched", words: ["balloon", "basket"] },
  { day: 22, chapter: 18, title: "Away to the South", words: ["glinda", "quadlings"] },
  { day: 23, chapter: 19, title: "Attacked by the Fighting Trees", words: ["branches", "china"] },
  { day: 24, chapter: 20, title: "The Dainty China Country", words: ["dainty", "brittle"] },
  { day: 25, type: 'assessment', title: "Week 5 Assessment", focus: "Chapters 17-20" },
  
  // Week 6 (Days 26-30)
  { day: 26, chapter: 21, title: "The Lion Becomes the King of Beasts", words: ["spider", "forest"] },
  { day: 27, chapter: 22, title: "The Country of the Quadlings", words: ["hammer-head", "castle"] },
  { day: 28, chapter: 23, title: "Glinda The Good Witch Grants Dorothy's Wish", words: ["silver", "kansas"] },
  { day: 29, chapter: 24, title: "Home Again", words: ["stockings", "desert"] },
  { day: 30, type: 'assessment', title: "Unit Assessment", focus: "Complete Book Review", unitTest: true },
];

module.exports = wizardOfOzMapping;
