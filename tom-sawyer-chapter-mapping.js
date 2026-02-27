/**
 * Tom Sawyer Chapter Mapping
 * 
 * Maps the 35 chapters of The Adventures of Tom Sawyer
 * to 4th Grade Days 31-60 (30 days total)
 * and 6th Grade Days 1-20 (20 days total)
 */

// 4th Grade: Days 31-60 (30 days)
// Assessment days: 35, 40, 45, 50, 55, 60
// Regular lesson days get chapters (24 chapters across 24 days)
const fourthGradeMapping = {
  31: 1,   // Day 31 → Chapter 1
  32: 2,
  33: 3,
  34: 4,
  35: null, // Assessment day
  36: 5,
  37: 6,
  38: 7,
  39: 8,
  40: null, // Assessment day
  41: 9,
  42: 10,
  43: 11,
  44: 12,
  45: null, // Assessment day
  46: 13,
  47: 14,
  48: 15,
  49: 16,
  50: null, // Assessment day
  51: 17,
  52: 18,
  53: 19,
  54: 20,
  55: null, // Assessment day
  56: 21,
  57: 22,
  58: 23,
  59: 24,
  60: null  // Assessment day
};

// 6th Grade: Days 1-20 (20 days)
// Assessment days: 5, 10, 15, 20
// Regular lesson days get chapters (16 chapters across 16 days)
// But Tom Sawyer has 35 chapters, so let's spread them more:
// We'll do 2 chapters per lesson for days that need more content
const sixthGradeMapping = {
  1: [1, 2],    // Day 1 → Chapters 1-2
  2: [3, 4],
  3: [5, 6],
  4: [7, 8],
  5: null,      // Assessment day
  6: [9, 10],
  7: [11, 12],
  8: [13, 14],
  9: [15, 16],
  10: null,     // Assessment day
  11: [17, 18],
  12: [19, 20],
  13: [21, 22],
  14: [23, 24],
  15: null,     // Assessment day
  16: [25, 26],
  17: [27, 28],
  18: [29, 30],
  19: [31, 32, 33],
  20: null      // Assessment day
};

module.exports = {
  fourthGradeMapping,
  sixthGradeMapping
};
