/**
 * Black Beauty Chapter Mapping
 * 
 * Maps the 49 chapters to 4th Grade Days 91-120 (30 days total)
 * Assessment days: 95, 100, 105, 110, 115, 120
 * Regular lesson days: 24 (need 2 chapters per day on some days)
 */

// 4th Grade: Days 91-120 (30 days)
// We'll do single chapters and doubles where needed
const fourthGradeMapping = {
  91: [1, 2],   // Days with 2 chapters
  92: [3, 4],
  93: [5, 6],
  94: [7, 8],
  95: null,     // Assessment day
  96: [9, 10],
  97: [11, 12],
  98: [13, 14],
  99: [15, 16],
  100: null,    // Assessment day
  101: [17, 18],
  102: [19, 20],
  103: [21, 22],
  104: [23, 24],
  105: null,    // Assessment day
  106: [25, 26],
  107: [27, 28],
  108: [29, 30],
  109: [31, 32],
  110: null,    // Assessment day
  111: [33, 34],
  112: [35, 36],
  113: [37, 38],
  114: [39, 40],
  115: null,    // Assessment day
  116: [41, 42],
  117: [43, 44],
  118: [45, 46],
  119: [47, 48, 49], // Final 3 chapters
  120: null     // Assessment day
};

module.exports = {
  fourthGradeMapping
};
