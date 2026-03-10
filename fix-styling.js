const fs = require('fs');

// Just add styling to existing lessons
const textareaStyle = 'width:100%;min-height:100px;padding:12px;border:2px solid #305853;border-radius:8px;font-family:inherit;font-size:16px;line-height:1.6;resize:vertical;';

console.log('Adding proper styling to all textareas...\n');

for (let day = 1; day <= 60; day++) {
  const filename = `4th-grade-day-${String(day).padStart(3,'0')}.html`;
  let content = fs.readFileSync(filename, 'utf8');
  
  // Replace bare textareas with styled ones
  content = content.replace(/<textarea id="vprairie"><\/textarea>/g, `<textarea id="vprairie" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="vcyclone"><\/textarea>/g, `<textarea id="vcyclone" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="vocab1"><\/textarea>/g, `<textarea id="vocab1" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="vocab2"><\/textarea>/g, `<textarea id="vocab2" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="q1"><\/textarea>/g, `<textarea id="q1" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="q2"><\/textarea>/g, `<textarea id="q2" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="comp1"><\/textarea>/g, `<textarea id="comp1" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="comp2"><\/textarea>/g, `<textarea id="comp2" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="skill"><\/textarea>/g, `<textarea id="skill" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="grammar"><\/textarea>/g, `<textarea id="grammar" style="${textareaStyle}"></textarea>`);
  content = content.replace(/<textarea id="writing" style="min-height:200px"><\/textarea>/g, `<textarea id="writing" style="width:100%;min-height:200px;padding:12px;border:2px solid #305853;border-radius:8px;font-family:inherit;font-size:16px;line-height:1.6;resize:vertical;"></textarea>`);
  
  // Add styling to any remaining bare textareas
  content = content.replace(/<textarea id="([^"]+)"><\/textarea>/g, `<textarea id="$1" style="${textareaStyle}"></textarea>`);
  
  fs.writeFileSync(filename, content);
  console.log(`✅ Day ${day}`);
}

console.log('\n🎉 All textareas now have proper styling!');
