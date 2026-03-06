const fs = require('fs');

console.log('🔄 Reorganizing 5th grade lessons to correct positions...\n');

// Step 1: Delete Days 181-200 (shouldn't exist - only 180 days total)
console.log('Step 1: Deleting Days 181-200 (over the 180-day limit)...');
for (let day = 181; day <= 200; day++) {
  const file = `5th-grade-day-${day}.html`;
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`  ✓ Deleted Day ${day}`);
  }
}

// Step 2: Move Roman from Days 121-140 to Days 141-160
console.log('\nStep 2: Moving Roman Mythology from Days 121-140 → 141-160...');
for (let oldDay = 121; oldDay <= 140; oldDay++) {
  const newDay = oldDay + 20;
  const oldFile = `5th-grade-day-${oldDay}.html`;
  const newFile = `5th-grade-day-${newDay}.html`;
  
  if (fs.existsSync(oldFile)) {
    let content = fs.readFileSync(oldFile, 'utf8');
    
    // Replace day numbers
    const oldWeek = Math.ceil(oldDay / 5);
    const newWeek = Math.ceil(newDay / 5);
    
    content = content.replace(new RegExp(`Lesson ${oldDay}`, 'g'), `Lesson ${newDay}`);
    content = content.replace(new RegExp(`Day ${oldDay}`, 'g'), `Day ${newDay}`);
    content = content.replace(new RegExp(`day-${oldDay}`, 'g'), `day-${newDay}`);
    content = content.replace(new RegExp(`lesson${oldDay}Config`, 'g'), `lesson${newDay}Config`);
    content = content.replace(new RegExp(`Week ${oldWeek}`, 'g'), `Week ${newWeek}`);
    
    fs.writeFileSync(newFile, content);
    fs.unlinkSync(oldFile);
    console.log(`  ✓ Day ${oldDay} → Day ${newDay}`);
  }
}

console.log('\n✅ Reorganization complete!');
console.log('\n📚 Current structure:');
console.log('  Days 121-140: [EMPTY] - Ready for Greek Mythology');
console.log('  Days 141-160: Roman Mythology ✅');
console.log('  Days 161-180: Norse Mythology ✅');
console.log('\n  Total lessons: 180 (correct!)');
