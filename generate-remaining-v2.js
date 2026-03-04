#!/usr/bin/env node
const fs = require('fs');
const https = require('https');

const KEY = fs.readFileSync('generate-all-content-CORRECT.js','utf8').match(/API_KEY = '([^']+)'/)[1];

const bookSchedules = {
  '3rd': [
    { days: [1,20], book: 'The Velveteen Rabbit', author: 'Margery Williams', theme: 'toys, love, becoming real' },
    { days: [21,50], book: "Grimm's Fairy Tales", author: 'Brothers Grimm', theme: 'classic fairy tales, magic, morals' },
    { days: [51,80], book: 'Hans Christian Andersen Tales', author: 'Hans Christian Andersen', theme: 'transformation, sacrifice, kindness' },
    { days: [81,120], book: 'Heidi', author: 'Johanna Spyri', theme: 'Swiss Alps, nature, family, healing' },
    { days: [121,155], book: 'The Story of Dr. Dolittle', author: 'Hugh Lofting', theme: 'animals, communication, adventure' },
    { days: [156,180], book: 'Robinson Crusoe', author: 'Daniel Defoe', theme: 'survival, island life, resourcefulness' }
  ],
  '5th': [
    { days: [1,20], book: 'Robin Hood', author: 'Howard Pyle', theme: 'medieval England, outlaws, archery' },
    { days: [21,40], book: 'King Arthur', author: 'Various', theme: 'Camelot, knights, chivalry' },
    { days: [41,60], book: 'Around the World in 80 Days', author: 'Jules Verne', theme: 'world travel, 1870s technology' },
    { days: [61,80], book: 'Frankenstein', author: 'Mary Shelley', theme: 'science, creation, gothic horror' },
    { days: [81,100], book: 'Dracula', author: 'Bram Stoker', theme: 'vampires, Victorian England' },
    { days: [101,120], book: 'Greek Mythology', author: 'Various', theme: 'ancient Greece, gods, heroes' },
    { days: [121,140], book: 'Roman Mythology', author: 'Various', theme: 'ancient Rome, gods' },
    { days: [141,160], book: 'Norse Mythology', author: 'Various', theme: 'Vikings, Norse gods' },
    { days: [161,180], book: 'Year Review', author: 'Various', theme: 'review all books' }
  ],
  '6th': [
    { days: [1,20], book: 'Tom Sawyer', author: 'Mark Twain', theme: 'Missouri, Mississippi River' },
    { days: [21,40], book: 'Twenty Thousand Leagues', author: 'Jules Verne', theme: 'submarines, ocean exploration' },
    { days: [41,60], book: 'Robin Hood', author: 'Howard Pyle', theme: 'medieval England, archery' },
    { days: [61,80], book: 'Swiss Family Robinson', author: 'Johann Wyss', theme: 'island survival, tropical nature' },
    { days: [81,100], book: 'Journey to the Center of the Earth', author: 'Jules Verne', theme: 'geology, underground exploration' },
    { days: [101,120], book: 'Norse Mythology', author: 'Various', theme: 'Vikings, Norse gods' },
    { days: [121,140], book: "Connecticut Yankee in King Arthur's Court", author: 'Mark Twain', theme: 'time travel, satire' },
    { days: [141,160], book: 'The Princess and the Goblin', author: 'George MacDonald', theme: 'magic, wishes, adventure' },
    { days: [161,180], book: 'The Odyssey', author: 'Homer', theme: 'ancient Greece, epic journey' }
  ]
};

function getBook(grade, day) {
  for (const b of bookSchedules[grade]) if (day >= b.days[0] && day <= b.days[1]) return b;
  return null;
}

function callAPI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }]
    });
    const req = https.request({
      hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const p = JSON.parse(body);
          if (p.error) return reject(new Error(p.error.message));
          resolve(p.content[0].text);
        } catch (e) { reject(new Error('Parse error: ' + body.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function cleanAndParse(text) {
  // Strip markdown fences
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '');
  // Find outermost JSON object
  let depth = 0, start = -1, end = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') { if (depth === 0) start = i; depth++; }
    if (text[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (start === -1 || end === -1) throw new Error('No JSON object found');
  let json = text.substring(start, end + 1);
  // Fix trailing commas
  json = json.replace(/,\s*([}\]])/g, '$1');
  // Fix common issues: single quotes to double
  // Try parse as-is first
  try { return JSON.parse(json); } catch(e) {}
  // Try fixing escaped quotes
  json = json.replace(/\\'/g, "'");
  try { return JSON.parse(json); } catch(e) {}
  // Nuclear option: eval in a safe-ish way
  try { return Function('return ' + json)(); } catch(e) {}
  throw new Error('Could not parse JSON');
}

async function generate(grade, day) {
  const book = getBook(grade, day);
  if (!book) return null;
  const ch = Math.ceil((day - book.days[0] + 1) / 4);
  
  const prompt = `Generate educational content for ${grade} grade, Day ${day}, reading "${book.book}" by ${book.author} (Chapter ~${ch}). Theme: ${book.theme}.

Return ONLY a JSON object with these exact keys (no markdown, no explanation):
{"informational":{"title":"article title about ${book.theme}","part1":"100-word article paragraph 1","part2":"100-word article paragraph 2","questions":["q1","q2","q3"]},"opinion":"one-sentence opinion writing prompt","grammar":{"skill":"grammar concept","explanation":"brief explanation","example":"example from the book"},"language":"one-sentence figurative language activity"}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const resp = await callAPI(prompt);
      return cleanAndParse(resp);
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

async function main() {
  let output;
  try {
    output = JSON.parse(fs.readFileSync('generated-content.json', 'utf8'));
    console.log('📂 Loaded existing content');
  } catch(e) {
    output = { '3rd': {}, '5th': {}, '6th': {} };
  }

  const missing = [];
  for (const g of ['3rd', '5th', '6th']) {
    if (!output[g]) output[g] = {};
    for (let d = 1; d <= 180; d++) {
      if (d % 5 === 0) continue;
      if (!output[g][d]) missing.push({ grade: g, day: d });
    }
  }

  console.log(`🔍 ${missing.length} lessons to generate\n`);
  if (!missing.length) { console.log('✅ All done!'); return; }

  let done = 0, errors = 0;
  const t0 = Date.now();

  for (const { grade, day } of missing) {
    const book = getBook(grade, day);
    try {
      const content = await generate(grade, day);
      if (content) {
        output[grade][day] = content;
        done++;
        process.stdout.write(`  ✅ ${grade} Day ${day} (${book?.book}) [${done}/${missing.length}]\n`);
        
        if (done % 5 === 0) {
          fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
          const total = Object.values(output).reduce((s, g) => s + Object.keys(g).length, 0);
          const mins = Math.round((Date.now() - t0) / 60000);
          console.log(`    💾 Saved: ${total}/432 total (${mins} min)\n`);
        }
      }
      await new Promise(r => setTimeout(r, 800));
    } catch (e) {
      errors++;
      console.log(`  ❌ ${grade} Day ${day}: ${e.message.substring(0, 80)}`);
      if (e.message.includes('rate') || e.message.includes('429')) {
        console.log('  ⏳ Rate limited, waiting 30s...');
        await new Promise(r => setTimeout(r, 30000));
      }
    }
  }

  fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
  const total = Object.values(output).reduce((s, g) => s + Object.keys(g).length, 0);
  const mins = Math.round((Date.now() - t0) / 60000);
  console.log(`\n🎉 Done! Generated ${done}, errors ${errors}. Total: ${total}/432 in ${mins} min`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
