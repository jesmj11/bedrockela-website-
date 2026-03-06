const fs = require('fs');

console.log('🔄 Renumbering Norse Mythology lessons: 141-160 → 161-180\n');

// Mapping old day to new day
const dayMap = {};
for (let oldDay = 141; oldDay <= 160; oldDay++) {
  const newDay = oldDay + 20;
  dayMap[oldDay] = newDay;
}

// Week mapping
// Old: 141-145 = week 29, 146-150 = week 30, 151-155 = week 31, 156-160 = week 32
// New: 161-165 = week 33, 166-170 = week 34, 171-175 = week 35, 176-180 = week 36
const getOldWeek = (day) => Math.ceil(day / 5);
const getNewWeek = (day) => Math.ceil(day / 5);

// Process each lesson
for (let oldDay = 141; oldDay <= 160; oldDay++) {
  const newDay = dayMap[oldDay];
  const oldFile = `5th-grade-day-${oldDay}.html`;
  const newFile = `5th-grade-day-${newDay}.html`;
  
  if (!fs.existsSync(oldFile)) {
    console.log(`  ⚠️  Skipping ${oldDay}: file not found`);
    continue;
  }
  
  // Read content
  let content = fs.readFileSync(oldFile, 'utf8');
  
  // Replace all occurrences of old day with new day
  const oldWeek = getOldWeek(oldDay);
  const newWeek = getNewWeek(newDay);
  
  // Replace day numbers
  content = content.replace(new RegExp(`Lesson ${oldDay}`, 'g'), `Lesson ${newDay}`);
  content = content.replace(new RegExp(`Day ${oldDay}`, 'g'), `Day ${newDay}`);
  content = content.replace(new RegExp(`day-${oldDay}`, 'g'), `day-${newDay}`);
  content = content.replace(new RegExp(`lesson${oldDay}Config`, 'g'), `lesson${newDay}Config`);
  
  // Replace week numbers
  content = content.replace(new RegExp(`Week ${oldWeek}`, 'g'), `Week ${newWeek}`);
  
  // Write to new file
  fs.writeFileSync(newFile, content);
  
  console.log(`  ✓ Day ${oldDay} → Day ${newDay} (Week ${oldWeek} → Week ${newWeek})`);
}

// Delete old files
console.log('\n🗑️  Deleting old files (141-160)...\n');
for (let oldDay = 141; oldDay <= 160; oldDay++) {
  const oldFile = `5th-grade-day-${oldDay}.html`;
  if (fs.existsSync(oldFile)) {
    fs.unlinkSync(oldFile);
    console.log(`  ✓ Deleted ${oldFile}`);
  }
}

console.log('\n✅ Norse Mythology successfully renumbered to Days 161-180!');
console.log('   All content preserved, ready for Days 121-140 (Greek) and 141-160 (Roman)');
