/**
 * Grade Level Normalizer
 * Ensures consistent grade level format across the app
 * Converts "4th Grade" → "4th-grade"
 */

// Normalize grade level to lowercase with dashes
function normalizeGradeLevel(grade) {
  if (!grade) return null;
  
  // Handle different formats:
  // "4th Grade" → "4th-grade"
  // "4th" → "4th-grade"
  // "Grade 4" → "4th-grade"
  
  const gradeStr = grade.toString().toLowerCase();
  
  // Extract the number
  const match = gradeStr.match(/(\d+)(st|nd|rd|th)?/);
  if (!match) return grade; // Return original if no match
  
  const number = match[1];
  
  // Add ordinal suffix if missing
  let ordinal;
  if (number === '1') ordinal = '1st';
  else if (number === '2') ordinal = '2nd';
  else if (number === '3') ordinal = '3rd';
  else ordinal = number + 'th';
  
  return `${ordinal}-grade`;
}

// Fix student data on page load
function fixStudentGradeLevel() {
  const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || 'null');
  
  if (studentData && studentData.gradeLevel) {
    const normalized = normalizeGradeLevel(studentData.gradeLevel);
    
    if (normalized !== studentData.gradeLevel) {
      console.log(`🔧 Normalizing grade: "${studentData.gradeLevel}" → "${normalized}"`);
      studentData.gradeLevel = normalized;
      localStorage.setItem('bedrockela_student', JSON.stringify(studentData));
    }
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fixStudentGradeLevel);
} else {
  fixStudentGradeLevel();
}

// Export for use in other scripts
window.normalizeGradeLevel = normalizeGradeLevel;
