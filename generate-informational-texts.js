#!/usr/bin/env node

/**
 * Generate grade-appropriate informational texts for each lesson
 * This creates 432 unique articles (144 per grade for 3rd, 5th, 6th)
 */

const fs = require('fs');

// Topic themes for each grade based on their literature
const gradeTopics = {
  '3rd': {
    book: "Charlotte's Web",
    themes: [
      'Farm animals and their behaviors',
      'Spider anatomy and silk production',
      'Friendship in the animal kingdom',
      'Life cycle of pigs',
      'How spiders catch food',
      'State fairs in rural America',
      'Barn structure and farming',
      'Writing and language (Charlotte writes!)',
      'Seasons on a farm',
      'Animal intelligence and communication',
      'Web construction',
      'Egg sacs and spider babies',
      'Farm chores and daily life',
      'Kindness and sacrifice',
      'Country vs city living in the 1950s'
    ]
  },
  '5th': {
    book: "Robin Hood",
    themes: [
      'Medieval England society',
      'Sherwood Forest ecology',
      'Archery techniques and equipment',
      'Life in the Middle Ages',
      'Castles and fortifications',
      'Medieval justice system',
      'Outlaws and forest law',
      'Medieval weapons and armor',
      'Kings and nobility',
      'Medieval food and feasts',
      'Traveling minstrels and storytelling',
      'Medieval markets and trade',
      'Hunting in medieval times',
      'Medieval medicine',
      'Legends vs historical truth'
    ]
  },
  '6th': {
    book: "Tom Sawyer",
    themes: [
      'Mississippi River geography',
      'Steamboats and river trade',
      'Life in 1840s Missouri',
      'Whitewashing and paint chemistry',
      'Superstitions in 19th century America',
      'One-room schoolhouses',
      'Graveyards and burial customs',
      'Pirates and treasure in American folklore',
      'Cave formation and exploration',
      'Small town life in the 1800s',
      'Medicine and health in the 1840s',
      'Children\'s games and pastimes',
      'Mark Twain and American literature',
      'The American frontier',
      'Crime and punishment in the Old West'
    ]
  }
};

console.log('📚 Informational Text Generator\n');
console.log('This will generate 432 unique articles for:');
console.log('  - 3rd grade (Charlotte\'s Web): 144 texts');
console.log('  - 5th grade (Robin Hood): 144 texts');
console.log('  - 6th grade (Tom Sawyer): 144 texts\n');

// We'll generate a JSON file for each grade with all topics
// Then a separate script will inject them into the HTML files

const output = {};

['3rd', '5th', '6th'].forEach(grade => {
  const topics = gradeTopics[grade];
  const articles = [];
  
  console.log(`\n📝 Planning ${grade} grade topics (${topics.book})...`);
  
  // We need 144 articles, cycle through themes
  for (let day = 1; day <= 180; day++) {
    // Skip assessment days (every 5th day)
    if (day % 5 === 0) continue;
    
    // Pick a theme (cycle through the list)
    const themeIndex = (articles.length) % topics.themes.length;
    const theme = topics.themes[themeIndex];
    
    articles.push({
      day: day,
      theme: theme,
      needsGeneration: true
    });
  }
  
  output[grade] = {
    book: topics.book,
    totalArticles: articles.length,
    articles: articles
  };
  
  console.log(`  ✓ Planned ${articles.length} topics`);
});

// Save the structure
fs.writeFileSync('informational-topics.json', JSON.stringify(output, null, 2));

console.log('\n✅ Topic structure saved to informational-topics.json');
console.log('\nNext step: Run the AI generator to create actual article content.');
console.log('This will take 20-30 minutes to generate all 432 articles.\n');
