/**
 * Sherlock Holmes Stories Mapping
 * 
 * Maps the 11 stories to 4th Grade Days 121-150 (30 days total)
 * Assessment days: 125, 130, 135, 140, 145, 150
 * Regular lesson days: 24 (spread 11 stories across 24 days = ~2 days per story)
 */

// 4th Grade: Days 121-150 (30 days)
// Each story gets 2 lesson days (except a few get more)
// Note: Stories are indexed 2-12 in the JSON
const fourthGradeMapping = {
  121: 2,   // Story 2 (part 1)
  122: 2,   // Story 2 (part 2)
  123: 3,   // Story 3 (part 1)
  124: 3,   // Story 3 (part 2)
  125: null, // Assessment day
  126: 4,   // Story 4
  127: 5,   // Story 5
  128: 6,   // Story 6
  129: 7,   // Story 7
  130: null, // Assessment day
  131: 7,   // Story 7 (part 2)
  132: 8,   // Story 8
  133: 9,   // Story 9 (part 1)
  134: 9,   // Story 9 (part 2)
  135: null, // Assessment day
  136: 10,  // Story 10
  137: 11,  // Story 11
  138: 11,  // Story 11 (part 2)
  139: 12,  // Story 12 (part 1)
  140: null, // Assessment day
  141: 12,  // Story 12 (part 2)
  142: 12,  // Story 12 (part 3)
  143: 2,   // Revisit favorites
  144: 9,   // Revisit favorites
  145: null, // Assessment day
  146: 3,   // Revisit favorites
  147: 4,   // Revisit favorites
  148: 8,   // Revisit favorites
  149: 5,   // Revisit favorites
  150: null  // Assessment day
};

module.exports = {
  fourthGradeMapping
};
