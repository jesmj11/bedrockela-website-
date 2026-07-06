const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const libraryRoot = path.join(root, 'curriculum-library');

const REQUIRED_COMPONENTS = [
  'readingSchedule',
  'vocabulary',
  'journals',
  'writing',
  'questions',
  'informationalTexts',
  'assessments'
];

const regularDayComponents = [
  'reading',
  'vocabulary',
  'journal',
  'comprehensionQuestions',
  'writing',
  'grammarOrLanguage',
  'informationalText'
];

const gradePocketPlans = {
  1: [
    ['g1-p1-foundations', 1, 30, 'Reading Foundations I', 'decoding, sight words, oral language'],
    ['g1-p2-folktales', 31, 60, 'Folktales and Story Sense', 'story elements, retelling'],
    ['g1-p3-animals', 61, 90, 'Animal Stories', 'characters, sequence, details'],
    ['g1-p4-community', 91, 120, 'Community and World', 'informational reading, journals'],
    ['g1-p5-imagination', 121, 150, 'Imagination and Poetry', 'language play, fluency'],
    ['g1-p6-mastery', 151, 180, 'First Grade Mastery', 'review, projects, reading celebration']
  ],
  2: [
    ['g2-p1-fluency', 1, 30, 'Fluency and Story Structure', 'fluency, comprehension, journals'],
    ['g2-p2-fables', 31, 60, 'Fables and Lessons', 'theme, moral, compare stories'],
    ['g2-p3-fairy-tales', 61, 90, 'Fairy Tales and Folktales', 'characters, setting, retelling'],
    ['g2-p4-nature', 91, 120, 'Nature and Observation', 'informational text, description'],
    ['g2-p5-adventure', 121, 150, 'Early Adventure', 'sequence, problem and solution'],
    ['g2-p6-mastery', 151, 180, 'Second Grade Mastery', 'writing portfolio, reading celebration']
  ],
  3: [
    ['g3-p1-classic-launch', 1, 30, 'Classic Story Launch', 'chapter book routines, journals'],
    ['g3-p2-character', 31, 60, 'Character and Change', 'traits, motivation, evidence'],
    ['g3-p3-adventure', 61, 90, 'Adventure and Problem Solving', 'plot, point of view'],
    ['g3-p4-fantasy', 91, 120, 'Fantasy and Imagination', 'worldbuilding, figurative language'],
    ['g3-p5-realistic', 121, 150, 'Realistic Fiction and Growth', 'theme, response writing'],
    ['g3-p6-mastery', 151, 180, 'Third Grade Mastery', 'research, synthesis, portfolio']
  ],
  4: [
    ['g4-p1-hero-journey', 1, 30, "Hero's Journey", 'journals, first narrative, ACE paragraph'],
    ['g4-p2-adventure-pov', 31, 60, 'Adventure and Point of View', 'POV rewrites, comparison, narrative voice'],
    ['g4-p3-into-the-wild', 61, 90, 'Into the Wild', 'figurative language, poetry, first essay'],
    ['g4-p4-around-the-world', 91, 120, 'Around the World', 'travel journal, research paragraphs'],
    ['g4-p5-language-logic-opinion', 121, 150, 'Language, Logic, and Opinion', 'vocabulary journals, opinion essays'],
    ['g4-p6-mastery-capstone', 151, 180, 'Mastery and Capstone', 'research project, theme essay, portfolio']
  ],
  5: [
    ['g5-p1-robin-hood', 1, 20, 'Robin Hood and Justice', 'character, theme, evidence'],
    ['g5-p2-king-arthur', 21, 40, 'King Arthur and Chivalry', 'legend, code, narrative'],
    ['g5-p3-world-tales', 41, 60, 'World Tales', 'cultural comparison, informational writing'],
    ['g5-p4-gothic', 61, 98, 'Gothic and Mystery', 'mood, suspense, argument'],
    ['g5-p5-greek-roman', 99, 138, 'Greek and Roman Worlds', 'myth, roots, informational text'],
    ['g5-p6-norse-frankenstein', 139, 180, 'Norse to Frankenstein', 'epic themes, science ethics, synthesis']
  ],
  6: [
    ['g6-p1-tom-sawyer', 1, 30, 'Coming of Age', 'character development, theme'],
    ['g6-p2-adventure', 31, 60, 'Adventure and Survival', 'plot, setting, informational pairings'],
    ['g6-p3-fantasy', 61, 90, 'Fantasy and Imagination', 'worldbuilding, symbolism'],
    ['g6-p4-journeys', 91, 120, 'Journeys and Quests', 'epic structure, research'],
    ['g6-p5-science-adventure', 121, 150, 'Science Adventure', 'argument, discovery, ethics'],
    ['g6-p6-mastery', 151, 180, 'Sixth Grade Mastery', 'literary analysis, portfolio']
  ],
  8: [
    ['g8-p1-science-adventure', 1, 45, 'Science and Adventure', 'analysis, ethics, scientific discovery'],
    ['g8-p2-survival-engineering', 46, 90, 'Survival and Engineering', 'systems, exploration, argument'],
    ['g8-p3-psychology-science', 91, 135, 'Psychology and Science', 'theme, point of view, gothic inquiry'],
    ['g8-p4-epic-adventures', 136, 180, 'Epic Adventures', 'synthesis, legacy, capstone']
  ]
};

const currentAssignments = {
  4: {
    'g4-p1-hero-journey': 'wizard-of-oz',
    'g4-p2-adventure-pov': 'three-musketeers',
    'g4-p3-into-the-wild': 'sinbad',
    'g4-p4-around-the-world': 'hunchback',
    'g4-p5-language-logic-opinion': 'alice-wonderland',
    'g4-p6-mastery-capstone': 'secret-garden'
  },
  6: {
    'g6-p1-tom-sawyer': 'tom-sawyer'
  },
  8: {
    'g8-p1-science-adventure': ['lost-world', 'war-of-worlds', 'invisible-man'],
    'g8-p2-survival-engineering': ['mysterious-island', 'time-machine'],
    'g8-p3-psychology-science': ['frankenstein', 'dorian-gray'],
    'g8-p4-epic-adventures': ['jekyll-hyde', 'sherlock-holmes', 'beowulf', 'monte-cristo']
  }
};

const generatedShellAssignments = new Map();
const generatedAssignedCardsByPocket = new Map();

const grade4PocketByRange = [
  [1, 30, 'g4-p1-hero-journey'],
  [31, 60, 'g4-p2-adventure-pov'],
  [61, 90, 'g4-p3-into-the-wild'],
  [91, 120, 'g4-p4-around-the-world'],
  [121, 150, 'g4-p5-language-logic-opinion'],
  [151, 180, 'g4-p6-mastery-capstone']
];

const grade8PocketByRange = [
  [1, 45, 'g8-p1-science-adventure'],
  [46, 90, 'g8-p2-survival-engineering'],
  [91, 135, 'g8-p3-psychology-science'],
  [136, 180, 'g8-p4-epic-adventures']
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, data) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-unit-card(?:-4th|-6th)?$/g, '')
    .replace(/^the-/, '');
}

function stripMarkdown(value) {
  return value
    .replace(/[*_`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(text, patterns, fallback = '') {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return stripMarkdown(match[1]);
  }
  return fallback;
}

function allMatches(text, pattern) {
  return [...text.matchAll(pattern)].map(match => stripMarkdown(match[1]));
}

function parseDayRange(text, filename) {
  const explicit = text.match(/\*\*(?:Curriculum )?Days:\*\*\s*(\d+)\s*[-–]\s*(\d+)/i)
    || text.match(/Days?:\s*(\d+)\s*[-–]\s*(\d+)/i);
  if (explicit) return { start: Number(explicit[1]), end: Number(explicit[2]) };

  if (/LOST-WORLD/i.test(filename)) return { start: 1, end: 15 };
  if (/WAR-OF-WORLDS/i.test(filename)) return { start: 16, end: 30 };
  if (/INVISIBLE-MAN/i.test(filename)) return { start: 31, end: 45 };
  if (/MYSTERIOUS-ISLAND/i.test(filename)) return { start: 46, end: 60 };
  if (/TIME-MACHINE/i.test(filename)) return { start: 61, end: 75 };
  if (/JEKYLL-HYDE/i.test(filename)) return { start: 91, end: 105 };
  if (/FRANKENSTEIN/i.test(filename)) return { start: 106, end: 125 };
  if (/DORIAN-GRAY/i.test(filename)) return { start: 126, end: 140 };
  if (/SHERLOCK-HOLMES/i.test(filename)) return { start: 141, end: 155 };
  if (/BEOWULF/i.test(filename)) return { start: 156, end: 170 };
  if (/MONTE-CRISTO/i.test(filename)) return { start: 166, end: 180 };
  if (/TOM-SAWYER/i.test(filename)) return { start: 1, end: 30 };

  return { start: 1, end: 30 };
}

function parseGrade(text, filename) {
  const explicit = text.match(/\*\*Grade Level:\*\*\s*(\d+)(?:st|nd|rd|th)?/i)
    || text.match(/(\d+)(?:st|nd|rd|th)\s+Grade/i);
  if (explicit) return Number(explicit[1]);
  if (/-4TH/i.test(filename)) return 4;
  if (/-6TH/i.test(filename)) return 6;
  return 8;
}

function weekRange(dayRange) {
  return {
    start: Math.floor((dayRange.start - 1) / 5) + 1,
    end: Math.floor((dayRange.end - 1) / 5) + 1
  };
}

function recommendedPocketId(grade, dayRange) {
  const ranges = grade === 4 ? grade4PocketByRange : grade === 8 ? grade8PocketByRange : [];
  const found = ranges.find(([start, end]) => dayRange.start >= start && dayRange.end <= end);
  if (found) return found[2];
  const gradePlan = gradePocketPlans[grade] || [];
  const match = gradePlan.find(([, start, end]) => dayRange.start >= start && dayRange.end <= end);
  return match ? match[0] : `g${grade}-unassigned`;
}

function extractBulletsAfter(text, headingPattern, maxItems = 40) {
  const heading = text.search(headingPattern);
  if (heading < 0) return [];
  const after = text.slice(heading).split('\n').slice(1);
  const values = [];
  for (const line of after) {
    if (/^#{2,3}\s+/.test(line) && values.length) break;
    const bullet = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
    if (bullet) values.push(stripMarkdown(bullet[1]));
    if (values.length >= maxItems) break;
  }
  return values;
}

function extractWeeks(text) {
  const weekRegex = /###\s+Week\s+(\d+)[^\n]*(?:\(Days\s+(\d+)\s*[-–]\s*(\d+)\))?([\s\S]*?)(?=\n###\s+Week\s+\d+|\n##\s+|$)/gi;
  const weeks = [];
  for (const match of text.matchAll(weekRegex)) {
    const body = match[4] || '';
    const titleLine = stripMarkdown(match[0].split('\n')[0].replace(/^###\s+/, ''));
    const week = Number(match[1]);
    const start = match[2] ? Number(match[2]) : ((week - 1) * 5) + 1;
    const end = match[3] ? Number(match[3]) : start + 4;
    weeks.push({
      week,
      days: { start, end },
      title: titleLine,
      reading: extractReading(body),
      vocabulary: extractVocabulary(body),
      journal: extractBulletsAfter(body, /journal prompts?|journal/i, 8),
      writing: extractBulletsAfter(body, /writing prompts?|writing focus|writing/i, 8),
      questions: extractBulletsAfter(body, /discussion questions?|questions/i, 8),
      informationalText: extractBulletsAfter(body, /informational text/i, 8),
      assessment: /assessment/i.test(body) ? ['Weekly assessment or review day included in source card.'] : []
    });
  }
  return weeks;
}

function extractVocabulary(text) {
  const words = new Set();
  for (const match of text.matchAll(/\*\*Day\s+\d+:\*\*\s*([^\n]+)/gi)) {
    match[1].split(/,\s*/).map(stripMarkdown).filter(Boolean).forEach(word => {
      if (!/^assessment$/i.test(word)) words.add(word);
    });
  }
  for (const match of text.matchAll(/Day\s+\d+:\s+\*\*([^*]+)\*\*/gi)) {
    words.add(stripMarkdown(match[1]));
  }
  return [...words].slice(0, 24);
}

function extractReading(text) {
  const readings = allMatches(text, /\*\*(?:Chapters?|Chapter|Reading|Content|Story):\*\*\s*([^\n]+)/gi);
  for (const match of text.matchAll(/^\s*\*\*?(?:Chapters?|Chapter)\s+([^:\n]+):\*\*?\s*([^\n]+)/gim)) {
    readings.push(stripMarkdown(`Chapters ${match[1]}: ${match[2]}`));
  }
  for (const match of text.matchAll(/^\s*(?:\d+\.\s+)?\*\*([^*]+)\*\*\s*-\s*([^\n]+)/gim)) {
    if (/assessment/i.test(match[1])) continue;
    if (/day\s+\d+/i.test(match[1])) continue;
    if (/vocabulary/i.test(match[1])) continue;
    readings.push(stripMarkdown(`${match[1]} - ${match[2]}`));
  }
  return [...new Set(readings)].slice(0, 12);
}

function shellCardForPocket(pocket) {
  const namedShells = {
    'g2-p5-adventure': {
      id: 'adventure-stories',
      title: 'Adventure Stories'
    },
    'g2-p6-mastery': {
      id: 'poetry-and-nature',
      title: 'Poetry and Nature'
    }
  };
  const named = namedShells[pocket.id] || {};
  const id = named.id || `${pocket.id}-card-shell`;
  generatedShellAssignments.set(pocket.id, id);
  return {
    id,
    title: named.title || `${pocket.title} Card Shell`,
    gradeLevels: [pocket.grade],
    source: {
      type: 'generated-shell',
      path: `curriculum-library/grades/grade-${pocket.grade}/pockets.json#${pocket.id}`
    },
    status: {
      stage: 'needs-card',
      notes: [
        'Generated to put this grade pocket into the Library Card format.',
        'Replace this shell with one or more real book/unit cards before generating daily lessons.'
      ]
    },
    pocket: {
      recommendedGrade: pocket.grade,
      recommendedPocketId: pocket.id,
      dayRange: pocket.dayRange,
      weekRange: pocket.weekRange,
      compatiblePocketIds: [pocket.id]
    },
    book: {
      title: pocket.title,
      author: '',
      textType: 'mixed',
      publicDomain: true,
      readingLevel: '',
      description: pocket.focus
    },
    themes: [pocket.title],
    standards: [],
    dailyPattern: {
      regularDayComponents,
      assessmentDays: weeklyAssessmentDays(pocket.dayRange),
      vocabularyWordsPerRegularDay: 3
    },
    weeks: [],
    requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'missing']))
  };
}

function titleFromBookDataFilename(fileName) {
  return fileName
    .replace(/\.json$/i, '')
    .replace(/-lessons?-\d+(?:-\d+)?/i, '')
    .replace(/-lesson-\d+/i, '')
    .replace(/-chapter-book/i, '')
    .split('-')
    .filter(Boolean)
    .map(word => word.length <= 3 && !['and', 'the', 'his'].includes(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/\bAnd\b/g, 'and')
    .replace(/\bThe\b/g, 'the')
    .replace(/^the /i, 'The ');
}

function readBookDataTitle(fileName) {
  const file = path.join(root, 'book-data', fileName);
  if (!fs.existsSync(file)) return titleFromBookDataFilename(fileName);
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data.coverTitle || data.title || titleFromBookDataFilename(fileName);
  } catch {
    return titleFromBookDataFilename(fileName);
  }
}

function grade2BookCards() {
  const mappingFile = path.join(root, 'book-data', 'lesson-to-book-mapping.json');
  if (!fs.existsSync(mappingFile)) return [];
  const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
  const byBook = new Map();

  for (const [dayText, fileName] of Object.entries(mapping)) {
    const day = Number(dayText);
    if (!Number.isFinite(day) || !fileName) continue;
    if (!byBook.has(fileName)) byBook.set(fileName, []);
    byBook.get(fileName).push(day);
  }

  return [...byBook.entries()].map(([fileName, days]) => {
    days.sort((a, b) => a - b);
    const title = stripMarkdown(readBookDataTitle(fileName)).replace(/[.!?]+$/g, '');
    const id = slugify(title || fileName);
    const dayRange = { start: days[0], end: days[days.length - 1] };
    const touchedPocketIds = [...new Set(days.map(day => recommendedPocketId(2, { start: day, end: day })))];
    const pocketId = touchedPocketIds[0] || recommendedPocketId(2, dayRange);
    for (const touchedPocketId of touchedPocketIds) {
      if (!generatedAssignedCardsByPocket.has(touchedPocketId)) generatedAssignedCardsByPocket.set(touchedPocketId, []);
      generatedAssignedCardsByPocket.get(touchedPocketId).push(id);
    }
    const sourcePath = `book-data/${fileName}`;
    const requiredComponents = {
      readingSchedule: 'present',
      vocabulary: 'missing',
      journals: 'missing',
      writing: 'missing',
      questions: 'present',
      informationalTexts: 'missing',
      assessments: days.some(day => day % 5 === 0) ? 'present' : 'missing'
    };
    const missing = Object.entries(requiredComponents)
      .filter(([, status]) => status === 'missing')
      .map(([component]) => component);

    return {
      id,
      title,
      gradeLevels: [2],
      source: {
        type: 'manual-json',
        path: sourcePath
      },
      status: {
        stage: missing.length ? 'needs-content' : 'content-ready',
        notes: [
          `Created from Grade 2 lesson-to-book mapping for days ${dayRange.start}-${dayRange.end}.`,
          missing.length
            ? `Needs ${missing.join(', ')} added before this card can generate complete daily lessons.`
            : 'Structured from existing Grade 2 book-data.'
        ]
      },
      pocket: {
        recommendedGrade: 2,
        recommendedPocketId: pocketId,
        dayRange,
        weekRange: weekRange(dayRange),
        compatiblePocketIds: touchedPocketIds.length ? touchedPocketIds : [pocketId]
      },
      book: {
        title,
        author: '',
        textType: 'story-collection',
        publicDomain: true,
        readingLevel: '2nd grade adaptation',
        description: `Mapped source file: ${sourcePath}`
      },
      themes: [title],
      standards: [],
      dailyPattern: {
        regularDayComponents,
        assessmentDays: days.filter(day => day % 5 === 0),
        vocabularyWordsPerRegularDay: 2
      },
      weeks: [],
      requiredComponents
    };
  });
}

function grade4LocalSourceCards() {
  const localCards = [
    {
      id: 'sinbad',
      title: 'Sinbad the Sailor',
      folder: '/Users/mushu/Desktop/BedrockELA/4th ELA/Sinbad',
      recommendedPocketId: 'g4-p3-into-the-wild',
      compatiblePocketIds: ['g4-p2-adventure-pov', 'g4-p3-into-the-wild', 'g4-p4-around-the-world'],
      dayRange: { start: 61, end: 90 },
      textType: 'adventure-tale',
      description: 'Local 4th grade source folder includes 24-chapter Sinbad text plus vocabulary and comprehension questions. Journal/writing and assessment/project sections still need to be added to make this a complete library card.',
      themes: ['Adventure', 'Cultural tales', 'Courage', 'Problem solving'],
      missingComponents: ['journals', 'writing', 'informationalTexts', 'assessments']
    },
    {
      id: 'hunchback',
      title: 'The Hunchback of Notre-Dame',
      folder: '/Users/mushu/Desktop/BedrockELA/4th ELA/Hunchback',
      recommendedPocketId: 'g4-p4-around-the-world',
      compatiblePocketIds: ['g4-p4-around-the-world', 'g4-p6-mastery-capstone'],
      dayRange: { start: 91, end: 120 },
      textType: 'novel',
      description: 'Local 4th grade source folder includes 24-chapter adapted text plus vocabulary and comprehension questions. This is an advanced optional library card, not part of the official 4th grade spine yet.',
      themes: ['Justice', 'Compassion', 'Identity', 'Courage'],
      missingComponents: ['journals', 'writing', 'informationalTexts', 'assessments']
    }
  ];

  return localCards.map(card => {
    const requiredComponents = Object.fromEntries(REQUIRED_COMPONENTS.map(component => [
      component,
      card.missingComponents.includes(component) ? 'missing' : 'present'
    ]));
    return {
      id: card.id,
      title: card.title,
      gradeLevels: [4],
      source: {
        type: 'manual-json',
        path: card.folder
      },
      status: {
        stage: 'needs-content',
        notes: [
          'Created from local 4th grade source folder audit.',
          `Needs ${card.missingComponents.join(', ')} added before this card can generate complete daily lessons.`
        ]
      },
      pocket: {
        recommendedGrade: 4,
        recommendedPocketId: card.recommendedPocketId,
        dayRange: card.dayRange,
        weekRange: weekRange(card.dayRange),
        compatiblePocketIds: card.compatiblePocketIds
      },
      book: {
        title: card.title,
        author: '',
        textType: card.textType,
        publicDomain: true,
        readingLevel: '4th grade adaptation',
        description: card.description
      },
      themes: card.themes,
      standards: [],
      dailyPattern: {
        regularDayComponents,
        assessmentDays: weeklyAssessmentDays(card.dayRange),
        vocabularyWordsPerRegularDay: 2
      },
      weeks: [],
      requiredComponents
    };
  });
}

function componentStatus(text, component) {
  const checks = {
    readingSchedule: [/week\s+\d+/i, /chapter/i, /reading/i],
    vocabulary: [/vocabulary/i, /words?\s*per\s*day/i],
    journals: [/journal/i],
    writing: [/writing/i, /essay/i, /prompt/i],
    questions: [/questions/i, /discussion/i, /comprehension/i],
    informationalTexts: [/informational text/i, /articles?/i, /nonfiction/i],
    assessments: [/assessment/i, /quiz/i]
  };
  return checks[component].some(pattern => pattern.test(text)) ? 'present' : 'missing';
}

function inferTextType(title) {
  if (/call of the wild.*jungle book/i.test(title)) return 'paired-novels';
  if (/beowulf|myth|norse|greek|roman/i.test(title)) return 'mythology';
  return 'novel';
}

function parseCard(file) {
  const filename = path.basename(file);
  const text = fs.readFileSync(file, 'utf8');
  const rawTitle = firstMatch(text, [/^#\s+(.+)$/m], filename.replace(/\.md$/i, ''));
  const title = stripMarkdown(rawTitle.replace(/\s*(?:-|–)\s*Unit Card.*$/i, ''));
  const id = slugify(filename.replace(/\.md$/i, ''));
  const grade = parseGrade(text, filename);
  const dayRange = parseDayRange(text, filename);
  const weeks = extractWeeks(text);
  const author = firstMatch(text, [/\*\*Author:\*\*\s*([^\n]+)/i], '');
  const themes = firstMatch(text, [/\*\*Theme:\*\*\s*([^\n]+)/i, /\*\*Themes:\*\*\s*([^\n]+)/i], '')
    .split(/,|;|\band\b/)
    .map(stripMarkdown)
    .filter(Boolean);
  const standards = [...new Set(text.match(/\b(?:RL|RI|W|SL|L)\.\d+\.\d+\b/g) || [])].sort();
  const requiredComponents = Object.fromEntries(
    REQUIRED_COMPONENTS.map(component => [component, componentStatus(text, component)])
  );
  const missing = Object.entries(requiredComponents)
    .filter(([, status]) => status === 'missing')
    .map(([component]) => component);
  const stage = missing.length ? 'planning-card' : 'content-ready';
  const notes = missing.length
    ? [`Needs ${missing.join(', ')} added before this card can generate complete daily lessons.`]
    : ['Structured from existing markdown unit card.'];

  if (grade === 4 && id === 'three-musketeers') {
    notes.push('This is currently assigned to the 4th grade Unit 2 pocket because the local 4th grade file set does not include Treasure Island yet.');
  }
  if (grade === 4 && id === 'treasure-island') {
    notes.push('Official 4th grade scope card, but the local source files are not present yet. Keep hidden from parent choice until the story, vocabulary, questions, and writing materials exist.');
  }
  const missingGrade4LocalSourceCards = new Set([
    'treasure-island',
    'call-of-wild-jungle-book',
    'around-world-80-days'
  ]);
  const isMissingFutureCard = grade === 4 && missingGrade4LocalSourceCards.has(id);

  return {
    id,
    title,
    gradeLevels: [grade],
    source: {
      type: 'unit-card-markdown',
      path: path.relative(root, file)
    },
    status: { stage: isMissingFutureCard ? 'missing-source' : stage, notes },
    pocket: {
      recommendedGrade: grade,
      recommendedPocketId: recommendedPocketId(grade, dayRange),
      dayRange,
      weekRange: weekRange(dayRange),
      compatiblePocketIds: isMissingFutureCard ? [] : [recommendedPocketId(grade, dayRange)]
    },
    book: {
      title,
      author,
      textType: inferTextType(title),
      publicDomain: true,
      readingLevel: firstMatch(text, [/\*\*Reading Level:\*\*\s*([^\n]+)/i], ''),
      description: firstMatch(text, [/\n\n([^#\n][\s\S]{120,500}?)(?=\n\n|\n##)/], '')
    },
    themes,
    standards,
    dailyPattern: {
      regularDayComponents,
      assessmentDays: weeklyAssessmentDays(dayRange),
      vocabularyWordsPerRegularDay: /3 words\/day|3\s+words/i.test(text) ? 3 : 2
    },
    weeks,
    requiredComponents
  };
}

function weeklyAssessmentDays(dayRange) {
  const days = [];
  for (let day = dayRange.start + 4; day <= dayRange.end; day += 5) {
    days.push(day);
  }
  return days;
}

function pocketRecord(grade, record) {
  const [id, start, end, title, focus] = record;
  return {
    id,
    grade,
    title,
    dayRange: { start, end },
    weekRange: weekRange({ start, end }),
    lengthDays: end - start + 1,
    focus,
    expectedCardComponents: REQUIRED_COMPONENTS,
    defaultRegularDayComponents: regularDayComponents
  };
}

function yearMapRecord(grade, pockets, cards) {
  const assignment = currentAssignments[grade] || {};
  return {
    grade,
    schoolYearLengthDays: 180,
    generatedFrom: 'scripts/build-curriculum-library.js',
    pockets: pockets.map(pocket => {
      const assigned = assignment[pocket.id] || null;
      const generatedAssigned = generatedAssignedCardsByPocket.get(pocket.id) || [];
      const assignedCards = Array.isArray(assigned)
        ? assigned
        : assigned
          ? [assigned]
          : generatedAssigned.length
            ? generatedShellAssignments.has(pocket.id)
              ? [...generatedAssigned, generatedShellAssignments.get(pocket.id)]
              : generatedAssigned
            : generatedShellAssignments.has(pocket.id)
              ? [generatedShellAssignments.get(pocket.id)]
              : [];
      return {
        pocketId: pocket.id,
        dayRange: pocket.dayRange,
        assignedCards,
        compatibleCards: cards
          .filter(card => card.gradeLevels.includes(grade) && card.pocket.compatiblePocketIds.includes(pocket.id))
          .map(card => card.id)
      };
    })
  };
}

function auditGradeDays(grade) {
  const regex = new RegExp(`^${grade}(?:st|nd|rd|th)-grade-day-0*(\\d+)\\.html$`);
  const days = new Map();
  for (const file of fs.readdirSync(root)) {
    const match = file.match(regex);
    if (!match) continue;
    const day = Number(match[1]);
    if (!days.has(day)) days.set(day, []);
    days.get(day).push(file);
  }
  const missing = [];
  for (let day = 1; day <= 180; day += 1) {
    if (!days.has(day)) missing.push(day);
  }
  const extras = [...days.keys()].filter(day => day > 180).sort((a, b) => a - b);
  const duplicates = [...days.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([day, files]) => ({ day, files: files.sort() }));
  return {
    uniqueDayCount: days.size,
    missing,
    extras,
    duplicateDayFiles: duplicates
  };
}

function build() {
  fs.rmSync(libraryRoot, { recursive: true, force: true });
  ensureDir(libraryRoot);

  const cardFiles = fs.readdirSync(root)
    .filter(file => /UNIT-CARD.*\.md$/i.test(file) && file !== 'UNIT-CARDS-STATUS.md')
    .map(file => path.join(root, file));

  const markdownCards = cardFiles.map(parseCard);
  const generatedCards = [...grade2BookCards(), ...grade4LocalSourceCards()];
  const pocketRecordsByGrade = Object.entries(gradePocketPlans).reduce((acc, [gradeText, plan]) => {
    const grade = Number(gradeText);
    acc[grade] = plan.map(record => pocketRecord(grade, record));
    return acc;
  }, {});

  const shellCards = [];
  for (const pockets of Object.values(pocketRecordsByGrade)) {
    for (const pocket of pockets) {
      const shouldKeepNamedShell = pocket.id === 'g2-p6-mastery';
      const hasCard = [...markdownCards, ...generatedCards].some(card => (
        card.gradeLevels.includes(pocket.grade)
        && card.pocket.compatiblePocketIds.includes(pocket.id)
      ));
      if (!hasCard || shouldKeepNamedShell) shellCards.push(shellCardForPocket(pocket));
    }
  }

  const cards = [...markdownCards, ...generatedCards, ...shellCards].sort((a, b) => a.id.localeCompare(b.id));

  for (const [gradeText, plan] of Object.entries(gradePocketPlans)) {
    const grade = Number(gradeText);
    const gradeDir = path.join(libraryRoot, 'grades', `grade-${grade}`);
    const pockets = pocketRecordsByGrade[grade];
    writeJson(path.join(gradeDir, 'pockets.json'), pockets);
    writeJson(path.join(gradeDir, 'year-map.json'), yearMapRecord(grade, pockets, cards));
  }

  for (const card of cards) {
    const grade = card.pocket.recommendedGrade;
    writeJson(path.join(libraryRoot, 'cards', `grade-${grade}`, `${card.id}.json`), card);
  }

  const audit = {
    generatedAt: new Date().toISOString(),
    summary: {
      gradesWithPocketMaps: Object.keys(gradePocketPlans).map(Number),
      cardCount: cards.length,
      cardsByGrade: cards.reduce((acc, card) => {
        const grade = card.pocket.recommendedGrade;
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
      }, {})
    },
    gradeDayFiles: Object.keys(gradePocketPlans).map(Number).reduce((acc, grade) => {
      acc[`grade-${grade}`] = auditGradeDays(grade);
      return acc;
    }, {}),
    cardReadiness: cards.map(card => ({
      id: card.id,
      grade: card.pocket.recommendedGrade,
      recommendedPocketId: card.pocket.recommendedPocketId,
      stage: card.status.stage,
      missingComponents: Object.entries(card.requiredComponents)
        .filter(([, status]) => status === 'missing')
        .map(([component]) => component),
      notes: card.status.notes
    }))
  };

  writeJson(path.join(libraryRoot, 'audit.json'), audit);
}

build();
