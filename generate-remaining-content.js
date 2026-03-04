#!/usr/bin/env node

/**
 * RESUME CONTENT GENERATOR - Only generates missing lessons
 * Loads existing generated-content.json and fills in the gaps
 */

const fs = require('fs');
const https = require('https');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || fs.readFileSync('/Users/mushu/.openclaw/workspace/bedrockela-website-/generate-all-content-CORRECT.js', 'utf8').match(/ANTHROPIC_API_KEY = '([^']+)'/)?.[1];

const bookSchedules = {
  '3rd': [
    { days: [1, 20], book: 'The Velveteen Rabbit', author: 'Margery Williams', theme: 'toys, love, becoming real' },
    { days: [21, 50], book: "Grimm's Fairy Tales", author: 'Brothers Grimm', theme: 'classic fairy tales, magic, morals' },
    { days: [51, 80], book: 'Hans Christian Andersen Tales', author: 'Hans Christian Andersen', theme: 'transformation, sacrifice, kindness' },
    { days: [81, 120], book: 'Heidi', author: 'Johanna Spyri', theme: 'Swiss Alps, nature, family, healing' },
    { days: [121, 155], book: 'The Story of Dr. Dolittle', author: 'Hugh Lofting', theme: 'animals, communication, adventure' },
    { days: [156, 180], book: 'Robinson Crusoe', author: 'Daniel Defoe', theme: 'survival, island life, resourcefulness' }
  ],
  '5th': [
    { days: [1, 20], book: 'Robin Hood', author: 'Howard Pyle', theme: 'medieval England, outlaws, archery, Sherwood Forest' },
    { days: [21, 40], book: 'King Arthur', author: 'Various', theme: 'Camelot, knights, chivalry, medieval warfare' },
    { days: [41, 60], book: 'Around the World in 80 Days', author: 'Jules Verne', theme: 'world geography, transportation, 1870s technology' },
    { days: [61, 80], book: 'Frankenstein', author: 'Mary Shelley', theme: 'science, creation, responsibility, gothic horror' },
    { days: [81, 100], book: 'Dracula', author: 'Bram Stoker', theme: 'vampires, Victorian England, Transylvania' },
    { days: [101, 120], book: 'Greek Mythology', author: 'Various', theme: 'ancient Greece, gods, heroes, myths' },
    { days: [121, 140], book: 'Roman Mythology', author: 'Various', theme: 'ancient Rome, gods, founding of Rome' },
    { days: [141, 160], book: 'Norse Mythology', author: 'Various', theme: 'Vikings, Norse gods, Ragnarok' },
    { days: [161, 180], book: 'Year Review', author: 'Various', theme: 'review all books' }
  ],
  '6th': [
    { days: [1, 20], book: 'The Adventures of Tom Sawyer', author: 'Mark Twain', theme: '1840s Missouri, Mississippi River, whitewashing, caves' },
    { days: [21, 40], book: 'Twenty Thousand Leagues Under the Sea', author: 'Jules Verne', theme: 'submarines, ocean exploration, sea creatures' },
    { days: [41, 60], book: 'The Merry Adventures of Robin Hood', author: 'Howard Pyle', theme: 'medieval England, archery, outlaws' },
    { days: [61, 80], book: 'The Swiss Family Robinson', author: 'Johann Wyss', theme: 'shipwreck, island survival, tropical nature' },
    { days: [81, 100], book: 'Journey to the Center of the Earth', author: 'Jules Verne', theme: 'geology, caves, underground exploration' },
    { days: [101, 120], book: 'Norse Mythology', author: 'Various', theme: 'Vikings, Norse gods, Norse culture' },
    { days: [121, 140], book: "A Connecticut Yankee in King Arthur's Court", author: 'Mark Twain', theme: 'time travel, medieval vs modern, satire' },
    { days: [141, 160], book: 'Five Children and It / The Princess and the Goblin', author: 'E. Nesbit / George MacDonald', theme: 'magic, wishes, adventure' },
    { days: [161, 180], book: 'The Odyssey', author: 'Homer', theme: 'ancient Greece, epic journey, Greek heroes' }
  ]
};

function getBookForDay(grade, day) {
  for (const book of bookSchedules[grade]) {
    if (day >= book.days[0] && day <= book.days[1]) return book;
  }
  return null;
}

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.error) return reject(new Error(parsed.error.message));
          resolve(parsed.content[0].text);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function generateLessonContent(grade, day) {
  const book = getBookForDay(grade, day);
  if (!book) return null;

  const chapterNum = Math.ceil((day - book.days[0] + 1) / 4);

  const prompt = `You are creating educational content for ${grade} grade students reading "${book.book}" by ${book.author}.

Theme: ${book.theme}
This is Day ${day}, approximately Chapter ${chapterNum}.

Generate content as VALID JSON ONLY (no markdown, no extra text):

{
  "informational": {
    "title": "Short article title related to ${book.theme}",
    "part1": "First 100 words of article about ${book.theme}",
    "part2": "Second 100 words continuing the article",
    "questions": [
      "Question 1 about the article",
      "Question 2 about the article", 
      "Question 3 about the article"
    ]
  },
  "opinion": "Opinion prompt about this chapter (1 sentence)",
  "grammar": {
    "skill": "Grammar skill name",
    "explanation": "Brief explanation",
    "example": "Example related to the book"
  },
  "language": "Activity about similes/metaphors/personification from the story (1 sentence)"
}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await callClaude(prompt);
      // Clean the response - remove markdown fences, trailing commas, etc.
      let text = response.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      let jsonStr = jsonMatch[0];
      // Fix common JSON issues: trailing commas before } or ]
      jsonStr = jsonStr.replace(/,\s*([}\]])/g, '$1');
      // Fix unescaped quotes in strings (naive but helps)
      return JSON.parse(jsonStr);
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function generateRemaining() {
  // Load existing
  let output = {};
  try {
    output = JSON.parse(fs.readFileSync('generated-content.json', 'utf8'));
    console.log('📂 Loaded existing content');
  } catch (e) {
    console.log('⚠️  No existing file, starting fresh');
    output = { '3rd': {}, '5th': {}, '6th': {} };
  }

  // Find missing lessons
  const missing = [];
  for (const grade of ['3rd', '5th', '6th']) {
    if (!output[grade]) output[grade] = {};
    for (let day = 1; day <= 180; day++) {
      if (day % 5 === 0) continue; // Skip assessments
      if (!output[grade][day]) {
        missing.push({ grade, day });
      }
    }
  }

  console.log(`\n🔍 Found ${missing.length} missing lessons to generate\n`);
  if (missing.length === 0) {
    console.log('✅ All lessons already generated!');
    return;
  }

  let generated = 0;
  const startTime = Date.now();

  for (const { grade, day } of missing) {
    try {
      const book = getBookForDay(grade, day);
      console.log(`  ${grade} Day ${day}: ${book?.book || 'unknown'}...`);

      const content = await generateLessonContent(grade, day);
      if (content) {
        output[grade][day] = content;
        generated++;

        if (generated % 10 === 0) {
          fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
          const elapsed = Math.round((Date.now() - startTime) / 1000 / 60);
          const total = Object.values(output).reduce((s, g) => s + Object.keys(g).length, 0);
          console.log(`    ✓ ${generated}/${missing.length} new | ${total}/432 total (${elapsed} min)`);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1200));
    } catch (error) {
      console.error(`    ❌ ${grade} Day ${day}: ${error.message}`);
      // On rate limit, wait longer
      if (error.message.includes('rate') || error.message.includes('429')) {
        console.log('    ⏳ Rate limited, waiting 30s...');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    }
  }

  fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
  const totalTime = Math.round((Date.now() - startTime) / 1000 / 60);
  const total = Object.values(output).reduce((s, g) => s + Object.keys(g).length, 0);
  console.log(`\n🎉 Generated ${generated} new lessons (${total}/432 total) in ${totalTime} min!\n`);
}

generateRemaining().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
