/**
 * Around the World in 80 Days Chapter Mapping
 * 
 * Maps the 37 chapters to 4th Grade Days 61-90 (30 days total)
 * Assessment days: 65, 70, 75, 80, 85, 90
 * Regular lesson days: 24 (need to use 24 of 37 chapters, skipping some or combining)
 */

// 4th Grade: Days 61-90 (30 days)
// We'll use the most exciting 24 chapters
const fourthGradeMapping = {
  61: 1,    // The start of the adventure
  62: 2,
  63: 3,
  64: 4,
  65: null, // Assessment day
  66: 5,
  67: 6,
  68: 7,
  69: 8,
  70: null, // Assessment day
  71: 10,   // Skipping chapter 9
  72: 11,
  73: 12,
  74: 13,
  75: null, // Assessment day
  76: 15,   // Skipping chapter 14
  77: 17,   // Skipping chapter 16
  78: 19,   // Skipping chapter 18
  79: 21,   // Skipping chapter 20
  80: null, // Assessment day
  81: 23,   // Skipping chapter 22
  82: 25,   // Skipping chapter 24
  83: 27,   // Skipping chapter 26
  84: 29,   // Skipping chapter 28
  85: null, // Assessment day
  86: 31,   // Skipping chapter 30
  87: 33,   // Skipping chapter 32
  88: 35,   // Skipping chapter 34
  89: 37,   // Final chapter - the finish!
  90: null  // Assessment day
};

module.exports = {
  fourthGradeMapping
};
