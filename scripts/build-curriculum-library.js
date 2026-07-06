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
  7: [
    ['g7-p1-imagination-belonging', 1, 30, 'Imagination and Belonging', 'character voice, identity, descriptive writing'],
    ['g7-p2-gardens-growth', 31, 60, 'Secrets and Growth', 'setting, symbolism, healing, transformation'],
    ['g7-p3-legends-world-tales', 61, 90, 'Legends and World Tales', 'frame stories, culture, theme comparison'],
    ['g7-p4-survival-courage', 91, 120, 'Survival and Courage', 'war, fear, moral courage, realism'],
    ['g7-p5-journeys-sea', 121, 150, 'Journeys by Land and Sea', 'adventure, conflict, informational pairings'],
    ['g7-p6-mastery-classics', 151, 180, 'Seventh Grade Mastery', 'synthesis, research, literary analysis portfolio']
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
    'g6-p1-tom-sawyer': 'tom-sawyer',
    'g6-p2-adventure': 'robin-hood',
    'g6-p3-fantasy': 'princess-goblin',
    'g6-p4-journeys': 'swiss-family-robinson',
    'g6-p5-science-adventure': 'twenty-thousand-leagues',
    'g6-p6-mastery': 'connecticut-yankee'
  },
  7: {
    'g7-p1-imagination-belonging': 'anne-green-gables',
    'g7-p2-gardens-growth': 'secret-garden',
    'g7-p3-legends-world-tales': 'arabian-nights',
    'g7-p4-survival-courage': 'red-badge-courage',
    'g7-p5-journeys-sea': 'kidnapped',
    'g7-p6-mastery-classics': 'moby-dick'
  },
  8: {
    'g8-p1-science-adventure': ['lost-world', 'war-of-worlds', 'invisible-man'],
    'g8-p2-survival-engineering': ['mysterious-island', 'time-machine', 'turn-of-the-screw'],
    'g8-p3-psychology-science': ['jekyll-hyde', 'frankenstein', 'dorian-gray'],
    'g8-p4-epic-adventures': ['sherlock-holmes', 'beowulf', 'monte-cristo']
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
  if (/TURN-OF-THE-SCREW|TURN-OF-SCREW/i.test(filename)) return { start: 76, end: 90 };
  if (/JEKYLL-HYDE/i.test(filename)) return { start: 91, end: 105 };
  if (/FRANKENSTEIN/i.test(filename)) return { start: 106, end: 120 };
  if (/DORIAN-GRAY/i.test(filename)) return { start: 121, end: 135 };
  if (/SHERLOCK-HOLMES/i.test(filename)) return { start: 136, end: 150 };
  if (/BEOWULF/i.test(filename)) return { start: 151, end: 165 };
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
  const extractedCardsFile = path.join(root, 'data', 'grade-2-library-cards.json');
  if (fs.existsSync(extractedCardsFile)) return grade2ExtractedBookCards(extractedCardsFile);

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

const grade2QuarterPocketMap = {
  1: {
    recommendedPocketId: 'g2-p1-fluency',
    compatiblePocketIds: ['g2-p1-fluency', 'g2-p2-fables'],
    dayRange: { start: 1, end: 30 }
  },
  2: {
    recommendedPocketId: 'g2-p2-fables',
    compatiblePocketIds: ['g2-p2-fables', 'g2-p3-fairy-tales', 'g2-p4-nature'],
    dayRange: { start: 31, end: 60 }
  },
  3: {
    recommendedPocketId: 'g2-p4-nature',
    compatiblePocketIds: ['g2-p3-fairy-tales', 'g2-p4-nature', 'g2-p5-adventure'],
    dayRange: { start: 91, end: 120 }
  },
  4: {
    recommendedPocketId: 'g2-p5-adventure',
    compatiblePocketIds: ['g2-p5-adventure', 'g2-p6-mastery'],
    dayRange: { start: 121, end: 150 }
  }
};

function grade2ExtractedBookCards(extractedCardsFile) {
  const data = JSON.parse(fs.readFileSync(extractedCardsFile, 'utf8'));
  return data.cards.map(card => {
    const placement = grade2QuarterPocketMap[card.quarter] || grade2QuarterPocketMap[1];
    const chapters = card.sections.vocabulary || [];
    const chapterList = chapters.map(chapter => `Chapter ${chapter.number}: ${chapter.title}`);
    const journalPrompts = card.sections.journalWritingPrompts || [];
    const informationalPairings = card.sections.informationalTextPairing || [];
    const assessmentUse = card.sections.assessmentUse || [];
    const weekTitle = `${card.title} Book Card`;
    const requiredComponents = Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']));

    for (const pocketId of placement.compatiblePocketIds) {
      if (!generatedAssignedCardsByPocket.has(pocketId)) generatedAssignedCardsByPocket.set(pocketId, []);
      generatedAssignedCardsByPocket.get(pocketId).push(card.id);
    }

    return {
      id: card.id,
      title: card.title,
      gradeLevels: [2],
      source: {
        type: 'desktop-docx-extract',
        path: card.sourceFile
      },
      status: {
        stage: 'content-ready',
        notes: [
          `Integrated from the real Grade 2 ${card.sourceMetadata} source file.`,
          `${card.choiceGuidance.difficultyBand} card: ${card.choiceGuidance.reason}.`
        ]
      },
      pocket: {
        recommendedGrade: 2,
        recommendedPocketId: placement.recommendedPocketId,
        dayRange: placement.dayRange,
        weekRange: weekRange(placement.dayRange),
        compatiblePocketIds: placement.compatiblePocketIds
      },
      book: {
        title: card.title,
        author: '',
        textType: 'short-chapter-book',
        publicDomain: true,
        readingLevel: `2nd grade ${card.choiceGuidance.difficultyBand.toLowerCase()} reader`,
        description: `${card.title} includes a six-chapter reading sequence, vocabulary, comprehension questions, journal/writing prompts, and assessment checks.`
      },
      themes: [card.title, card.choiceGuidance.difficultyBand, `Quarter ${card.quarter}`],
      standards: [],
      choiceGuidance: {
        quarter: card.quarter,
        bookNumber: card.bookNumber,
        recommendedPlacement: card.choiceGuidance.recommendedPlacement,
        difficultyBand: card.choiceGuidance.difficultyBand,
        wordCount: card.choiceGuidance.wordCount,
        averageSentenceWords: card.choiceGuidance.averageSentenceWords,
        reason: card.choiceGuidance.reason
      },
      dailyPattern: {
        regularDayComponents,
        assessmentDays: [placement.dayRange.end],
        vocabularyWordsPerRegularDay: 2
      },
      weeks: [
        {
          week: weekRange(placement.dayRange).start,
          days: placement.dayRange,
          title: weekTitle,
          reading: chapterList.length ? chapterList : card.sections.reading,
          vocabulary: chapters.flatMap(chapter => chapter.vocabulary || []),
          journal: journalPrompts,
          writing: journalPrompts,
          questions: chapters.flatMap(chapter => chapter.comprehensionQuestions || []),
          informationalText: informationalPairings,
          assessment: assessmentUse
        }
      ],
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

const grade4GeneratedReadings = {
  sinbad: [
    'Chapters 1-4: Sinbad leaves home and begins his first dangerous voyage',
    'Chapters 5-8: Island dangers, strange creatures, and survival choices',
    'Chapters 9-12: New lands, riches, mistakes, and rescue',
    'Chapters 13-16: The valley, the sea, and another test of courage',
    'Chapters 17-20: Sinbad weighs risk, reward, and responsibility',
    'Chapters 21-24: Final voyage, return home, and lessons from adventure'
  ],
  hunchback: [
    'Chapters 1-4: Paris, Notre-Dame, and the public festival',
    'Chapters 5-8: Quasimodo, Esmeralda, and first impressions',
    'Chapters 9-12: Judgment, mercy, and misunderstood characters',
    'Chapters 13-16: Trouble deepens around the cathedral',
    'Chapters 17-20: Loyalty, fear, and difficult choices',
    'Chapters 21-24: Consequences, compassion, and final reflection'
  ]
};

const grade4InformationalPairings = {
  'wizard-of-oz': [
    'Cyclones and prairie weather',
    'Kansas farms and travel in the late 1800s',
    'How stage plays and early films adapted fantasy stories',
    'Maps, roads, and symbolic journeys',
    'Inventors, humbug, and the language of persuasion',
    'What makes a classic children\'s book last'
  ],
  'three-musketeers': [
    'Cardinal Richelieu and royal France',
    'Musketeers, guards, and codes of honor',
    'Letters, messengers, and secrecy before modern communication',
    'Fencing, training, and discipline',
    'Friendship oaths in history and literature',
    'How historical fiction blends fact and invention'
  ],
  sinbad: [
    'Trade routes across the Indian Ocean',
    'Navigation by stars, winds, and currents',
    'Legends from One Thousand and One Nights',
    'Gemstones, spices, and medieval trade goods',
    'Shipwreck survival and problem solving',
    'How oral tales change across cultures'
  ],
  hunchback: [
    'Notre-Dame Cathedral and Gothic architecture',
    'Medieval Paris streets, markets, and laws',
    'Bells, bell ringers, and sound in cathedral life',
    'Fairness, public judgment, and historical punishments',
    'Architecture preservation and why old buildings matter',
    'How authors ask readers to see outsiders differently'
  ],
  'alice-wonderland': [
    'Victorian childhood games and manners',
    'Logic puzzles, riddles, and wordplay',
    'How dreams work in stories',
    'Courtrooms, juries, and evidence',
    'Nonsense poetry and invented language',
    'Fantasy worlds and rules that keep stories together'
  ],
  'secret-garden': [
    'Gardens, soil, and seasonal plant growth',
    'Yorkshire moors and English country houses',
    'How fresh air and movement affect health',
    'Friendship, loneliness, and emotional growth',
    'Animal helpers and observation journals',
    'Restoration: bringing neglected places back to life'
  ]
};

function grade4WeekSeed(card, index) {
  const week = card.weeks[index] || {};
  const reading = (week.reading && week.reading.length)
    ? week.reading[0]
    : (grade4GeneratedReadings[card.id] || [])[index] || `Chapters ${(index * 4) + 1}-${(index + 1) * 4}`;
  const info = (grade4InformationalPairings[card.id] || [])[index] || `Background article connected to ${card.title}`;
  const theme = (card.themes && card.themes[index % card.themes.length]) || 'character growth';
  return {
    reading,
    info,
    theme
  };
}

function enrichGrade4Card(card) {
  if (!card.gradeLevels.includes(4) || card.status.stage === 'missing-source') return card;

  const startWeek = weekRange(card.pocket.dayRange).start;
  const weeks = Array.from({ length: 6 }, (_, index) => {
    const existing = card.weeks[index] || {};
    const dayStart = card.pocket.dayRange.start + (index * 5);
    const days = existing.days || { start: dayStart, end: dayStart + 4 };
    const seed = grade4WeekSeed(card, index);
    const title = existing.title || `Week ${startWeek + index}: ${card.title} Part ${index + 1} (Days ${days.start}-${days.end})`;
    const baseVocabulary = existing.vocabulary && existing.vocabulary.length
      ? existing.vocabulary
      : [
          `${seed.theme}: identify and explain the word in context`,
          `precise evidence: choose a quotation that supports an answer`,
          `transition words: connect events and ideas clearly`
        ];

    return {
      week: existing.week || startWeek + index,
      days,
      title,
      reading: existing.reading && existing.reading.length ? existing.reading : [seed.reading],
      vocabulary: baseVocabulary,
      journal: existing.journal && existing.journal.length ? existing.journal : [
        `What does this week's reading show about ${seed.theme}? Use one scene as evidence.`,
        `Choose one character decision from ${seed.reading}. Would you make the same choice? Explain why.`
      ],
      writing: existing.writing && existing.writing.length ? existing.writing : [
        `Write an ACE paragraph answering one comprehension question with text evidence.`,
        `Draft a short ${index < 2 ? 'narrative response' : index < 4 ? 'informational paragraph' : 'opinion paragraph'} connected to this week's reading.`
      ],
      questions: existing.questions && existing.questions.length ? existing.questions : [
        `What problem or conflict matters most in ${seed.reading}?`,
        'Which detail best reveals a character trait, motivation, or change?',
        'How does the setting affect what happens in this section?',
        'What lesson, theme, or big idea is starting to develop?'
      ],
      informationalText: existing.informationalText && existing.informationalText.length ? existing.informationalText : [seed.info],
      assessment: existing.assessment && existing.assessment.length ? existing.assessment : [
        'Weekly vocabulary check, comprehension response, and short written reflection.',
        index === 5 ? 'End-of-card assessment: theme response, writing portfolio selection, and parent conference note.' : 'Review day: revise one journal response into a polished paragraph.'
      ]
    };
  });

  return {
    ...card,
    status: {
      stage: 'content-ready',
      notes: [
        'Library card sections completed for parent choice: reading, vocabulary, journals, writing, questions, informational text, and assessments.',
        ...card.status.notes.filter(note => !/^Needs /i.test(note))
      ]
    },
    book: {
      ...card.book,
      description: `${card.book.description || card.title} This card now includes complete weekly library sections for Grade 4 use.`
    },
    weeks,
    requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']))
  };
}

function grade6LocalSourceCards() {
  const root6 = '/Users/mushu/Desktop/BedrockELA/6th ELA';
  const cards = [
    {
      id: 'twenty-thousand-leagues',
      title: 'Twenty Thousand Leagues Under the Sea',
      folder: `${root6}/20,000`,
      recommendedPocketId: 'g6-p5-science-adventure',
      compatiblePocketIds: ['g6-p2-adventure', 'g6-p5-science-adventure'],
      dayRange: { start: 121, end: 150 },
      textType: 'science-fiction',
      readingLevel: '6th grade adaptation',
      description: 'Local source folder includes 24-chapter adapted text, vocabulary companion, and comprehension questions.',
      themes: ['Science fiction', 'Exploration', 'Mystery', 'Technology', 'Ethics'],
      chapterCount: 24,
      missingComponents: []
    },
    {
      id: 'journey-center-earth',
      title: 'Journey to the Center of the Earth',
      folder: `${root6}/journey`,
      recommendedPocketId: 'g6-p5-science-adventure',
      compatiblePocketIds: ['g6-p4-journeys', 'g6-p5-science-adventure'],
      dayRange: { start: 121, end: 150 },
      textType: 'science-fiction',
      readingLevel: '6th grade adaptation',
      description: 'Local source folder includes 24-chapter adapted text, vocabulary companion, comprehension questions, and writing/journal signals.',
      themes: ['Exploration', 'Scientific curiosity', 'Courage', 'Problem solving'],
      chapterCount: 24,
      missingComponents: []
    },
    {
      id: 'odyssey',
      title: 'The Odyssey',
      folder: `${root6}/Odyssey `,
      recommendedPocketId: 'g6-p6-mastery',
      compatiblePocketIds: ['g6-p4-journeys', 'g6-p6-mastery'],
      dayRange: { start: 151, end: 180 },
      textType: 'epic',
      readingLevel: '6th grade adaptation',
      description: 'Local source folder includes a 24-chapter adapted epic text. Vocabulary, questions, journals, and assessments are supplied by the generated library card sections until companion docs are added.',
      themes: ['Epic journey', 'Loyalty', 'Cleverness', 'Homecoming'],
      chapterCount: 24,
      missingComponents: []
    },
    {
      id: 'princess-goblin',
      title: 'The Princess and the Goblin',
      folder: `${root6}/princess`,
      recommendedPocketId: 'g6-p3-fantasy',
      compatiblePocketIds: ['g6-p3-fantasy', 'g6-p6-mastery'],
      dayRange: { start: 61, end: 90 },
      textType: 'fantasy',
      readingLevel: '6th grade adaptation',
      description: 'Local source folder includes 18-chapter adapted text, vocabulary companion, and comprehension questions.',
      themes: ['Courage', 'Trust', 'Hidden worlds', 'Good and evil'],
      chapterCount: 18,
      missingComponents: []
    },
    {
      id: 'robin-hood',
      title: 'The Merry Adventures of Robin Hood',
      folder: `${root6}/Robin Hood`,
      recommendedPocketId: 'g6-p2-adventure',
      compatiblePocketIds: ['g6-p1-tom-sawyer', 'g6-p2-adventure'],
      dayRange: { start: 31, end: 60 },
      textType: 'legend-adventure',
      readingLevel: '6th grade adaptation',
      description: 'Local source folder includes 24-chapter adapted text, vocabulary companion, comprehension questions, and plain-text exports.',
      themes: ['Justice', 'Leadership', 'Loyalty', 'Outlaws and society'],
      chapterCount: 24,
      missingComponents: []
    },
    {
      id: 'swiss-family-robinson',
      title: 'The Swiss Family Robinson',
      folder: `${root6}/SwissFamily `,
      recommendedPocketId: 'g6-p4-journeys',
      compatiblePocketIds: ['g6-p2-adventure', 'g6-p4-journeys'],
      dayRange: { start: 91, end: 120 },
      textType: 'survival-adventure',
      readingLevel: '6th grade adaptation',
      description: 'Local source folder includes 24-chapter adapted text, vocabulary companion, comprehension questions, and plain-text exports.',
      themes: ['Survival', 'Resourcefulness', 'Family', 'Nature'],
      chapterCount: 24,
      missingComponents: []
    },
    {
      id: 'connecticut-yankee',
      title: "A Connecticut Yankee in King Arthur's Court",
      folder: `${root6}/yankee2`,
      recommendedPocketId: 'g6-p6-mastery',
      compatiblePocketIds: ['g6-p3-fantasy', 'g6-p6-mastery'],
      dayRange: { start: 151, end: 180 },
      textType: 'satire-fantasy',
      readingLevel: '6th grade adaptation',
      description: 'Local source folder includes 18-chapter adapted text, vocabulary companion, and comprehension questions.',
      themes: ['Satire', 'Time travel', 'Power', 'Technology and society'],
      chapterCount: 18,
      missingComponents: []
    }
  ];

  return cards.map(card => enrichGrade6Card({
    id: card.id,
    title: card.title,
    gradeLevels: [6],
    source: {
      type: 'desktop-docx-source',
      path: card.folder
    },
    status: {
      stage: 'content-ready',
      notes: [
        'Created from local 6th grade source folder audit.',
        card.description
      ]
    },
    pocket: {
      recommendedGrade: 6,
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
      readingLevel: card.readingLevel,
      description: card.description
    },
    themes: card.themes,
    standards: [],
    chapterCount: card.chapterCount,
    dailyPattern: {
      regularDayComponents,
      assessmentDays: weeklyAssessmentDays(card.dayRange),
      vocabularyWordsPerRegularDay: 3
    },
    weeks: [],
    requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']))
  }));
}

const grade6InformationalPairings = {
  'twenty-thousand-leagues': [
    'Early submarine design and underwater exploration',
    'Marine biology and ocean zones',
    'Navigation, pressure, and life aboard a vessel',
    'Captain Nemo, invention, and ethical questions',
    'Science fiction predictions that became real',
    'How explorers record discoveries'
  ],
  'journey-center-earth': [
    'Geology, volcanoes, and layers of Earth',
    'Scientific observation and field notes',
    'Icelandic landscapes and exploration routes',
    'Fossils, extinct species, and deep time',
    'Risk, evidence, and scientific claims',
    'How adventure stories make science dramatic'
  ],
  odyssey: [
    'Epic poetry and oral storytelling',
    'Ancient Greek hospitality and values',
    'Maps of the Mediterranean world',
    'Monsters, symbols, and human fears',
    'Hero traits across cultures',
    'Homecoming stories and enduring themes'
  ],
  'princess-goblin': [
    'Victorian fantasy and fairy-tale traditions',
    'Mines, mountains, and underground settings',
    'Symbolism in fantasy stories',
    'Courage and trust in coming-of-age literature',
    'Comparing human and hidden societies',
    'How fantasy reveals real-world choices'
  ],
  'robin-hood': [
    'Medieval England and forest law',
    'Ballads, legends, and oral tradition',
    'Justice, taxes, and social class',
    'Archery, skill, and training',
    'Outlaw heroes across cultures',
    'How legends change over time'
  ],
  'swiss-family-robinson': [
    'Shipwreck survival and emergency planning',
    'Island ecosystems and natural resources',
    'Shelter, tools, and problem solving',
    'Family roles and cooperation',
    'Natural history writing and observation',
    'Survival stories and human adaptation'
  ],
  'connecticut-yankee': [
    'King Arthur legends and medieval society',
    'Satire and exaggeration as criticism',
    'Technology before and after the Industrial Revolution',
    'Power, leadership, and public persuasion',
    'Time travel as a way to compare societies',
    'How humor can carry serious arguments'
  ]
};

function enrichGrade6Card(card) {
  if (!card.gradeLevels.includes(6)) return card;

  const startWeek = weekRange(card.pocket.dayRange).start;
  const chaptersPerWeek = Math.max(3, Math.ceil((card.chapterCount || 24) / 6));
  const weeks = Array.from({ length: 6 }, (_, index) => {
    const dayStart = card.pocket.dayRange.start + (index * 5);
    const chapterStart = (index * chaptersPerWeek) + 1;
    const chapterEnd = Math.min(card.chapterCount || 24, (index + 1) * chaptersPerWeek);
    const theme = card.themes[index % card.themes.length] || 'adventure';
    const info = (grade6InformationalPairings[card.id] || [])[index] || `Background article connected to ${card.title}`;
    const reading = chapterStart <= chapterEnd
      ? `Chapters ${chapterStart}-${chapterEnd}: ${card.title}`
      : `Culminating review and extension: ${card.title}`;

    return {
      week: startWeek + index,
      days: { start: dayStart, end: dayStart + 4 },
      title: `Week ${startWeek + index}: ${card.title} Part ${index + 1} (Days ${dayStart}-${dayStart + 4})`,
      reading: [reading],
      vocabulary: [
        `${theme}: define, use in context, and connect to the week's reading`,
        'text evidence: quote accurately and explain the quotation',
        'academic discussion: build on another reader\'s idea'
      ],
      journal: [
        `What does this section reveal about ${theme}? Use evidence from the reading.`,
        `Which choice, challenge, or discovery matters most this week? Explain your thinking.`
      ],
      writing: [
        index < 2
          ? 'Write an evidence paragraph explaining a character decision.'
          : index < 4
            ? 'Write an informational paragraph connecting the book to the paired nonfiction topic.'
            : 'Write a short literary analysis paragraph about theme, conflict, or author craft.',
        index === 5
          ? 'Select one journal entry to revise for the end-of-card writing portfolio.'
          : 'Revise one answer by adding stronger text evidence and a clearer explanation.'
      ],
      questions: [
        'What is the central conflict or challenge in this section?',
        'How does the setting shape what the characters can or cannot do?',
        'Which quotation best supports your understanding of a character?',
        'How is the author building theme, suspense, humor, or wonder?'
      ],
      informationalText: [info],
      assessment: [
        'Weekly vocabulary check and comprehension response.',
        index === 5
          ? 'End-of-card assessment: literary response, writing portfolio selection, and reflection.'
          : 'Review day: discuss questions, revise writing, and prepare for the next section.'
      ]
    };
  });

  return {
    ...card,
    weeks,
    status: {
      stage: 'content-ready',
      notes: [
        'Library card sections completed for parent assignment: reading, vocabulary, journals, writing, questions, informational text, and assessments.',
        ...card.status.notes
      ]
    },
    requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']))
  };
}

function grade8LocalSourceCards() {
  return [
    {
      id: 'turn-of-the-screw',
      title: 'The Turn of the Screw',
      gradeLevels: [8],
      source: {
        type: 'desktop-markdown-source',
        path: '/Users/mushu/Desktop/BedrockELA/8th ela/Turnofscrew'
      },
      status: {
        stage: 'content-ready',
        notes: [
          'Created from local 8th grade source folder audit.',
          'Source folder includes chapter markdown files and a complete vocabulary file.'
        ]
      },
      pocket: {
        recommendedGrade: 8,
        recommendedPocketId: 'g8-p2-survival-engineering',
        dayRange: { start: 76, end: 90 },
        weekRange: weekRange({ start: 76, end: 90 }),
        compatiblePocketIds: ['g8-p2-survival-engineering', 'g8-p3-psychology-science']
      },
      book: {
        title: 'The Turn of the Screw',
        author: 'Henry James',
        textType: 'gothic-novella',
        publicDomain: true,
        readingLevel: '8th grade adaptation',
        description: 'A gothic psychological mystery card used as the final Quarter 2 option before the psychology and science quarter.'
      },
      themes: ['Ambiguity', 'Gothic suspense', 'Point of view', 'Psychological mystery'],
      standards: [],
      dailyPattern: {
        regularDayComponents,
        assessmentDays: weeklyAssessmentDays({ start: 76, end: 90 }),
        vocabularyWordsPerRegularDay: 3
      },
      weeks: [],
      requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']))
    }
  ].map(enrichGrade8Card);
}

function grade7LocalSourceCards() {
  const root7 = '/Users/mushu/Desktop/BedrockELA/7th ela';
  const cards = [
    {
      id: 'anne-green-gables',
      title: 'Anne of Green Gables',
      folder: `${root7}/Anne`,
      recommendedPocketId: 'g7-p1-imagination-belonging',
      compatiblePocketIds: ['g7-p1-imagination-belonging', 'g7-p2-gardens-growth'],
      dayRange: { start: 1, end: 30 },
      textType: 'coming-of-age-novel',
      themes: ['Imagination', 'Belonging', 'Family', 'Voice'],
      description: 'Source folder includes 24-chapter adapted text plus vocabulary and comprehension questions.'
    },
    {
      id: 'secret-garden',
      title: 'The Secret Garden',
      folder: `${root7}/Secret`,
      recommendedPocketId: 'g7-p2-gardens-growth',
      compatiblePocketIds: ['g7-p1-imagination-belonging', 'g7-p2-gardens-growth'],
      dayRange: { start: 31, end: 60 },
      textType: 'classic-novel',
      themes: ['Growth', 'Healing', 'Setting', 'Friendship'],
      description: 'Source folder includes 24-chapter adapted text plus vocabulary and comprehension questions.'
    },
    {
      id: 'arabian-nights',
      title: 'Tales from the Arabian Nights',
      folder: `${root7}/Arabian`,
      recommendedPocketId: 'g7-p3-legends-world-tales',
      compatiblePocketIds: ['g7-p3-legends-world-tales', 'g7-p6-mastery-classics'],
      dayRange: { start: 61, end: 90 },
      textType: 'frame-tale-collection',
      themes: ['Storytelling', 'Wisdom', 'Adventure', 'Culture'],
      description: 'Source folder includes 24-chapter adapted text plus vocabulary and comprehension questions.'
    },
    {
      id: 'red-badge-courage',
      title: 'The Red Badge of Courage',
      folder: `${root7}/redbadge`,
      recommendedPocketId: 'g7-p4-survival-courage',
      compatiblePocketIds: ['g7-p4-survival-courage', 'g7-p6-mastery-classics'],
      dayRange: { start: 91, end: 120 },
      textType: 'war-novel',
      themes: ['Courage', 'Fear', 'Identity', 'Realism'],
      description: 'Source folder includes 24-chapter adapted text plus vocabulary and comprehension questions.'
    },
    {
      id: 'kidnapped',
      title: 'Kidnapped',
      folder: `${root7}/kidnapped`,
      recommendedPocketId: 'g7-p5-journeys-sea',
      compatiblePocketIds: ['g7-p4-survival-courage', 'g7-p5-journeys-sea'],
      dayRange: { start: 121, end: 150 },
      textType: 'adventure-novel',
      themes: ['Adventure', 'Loyalty', 'Conflict', 'Justice'],
      description: 'Source folder includes 24-chapter adapted text plus vocabulary and comprehension questions.'
    },
    {
      id: 'moby-dick',
      title: 'Moby Dick',
      folder: `${root7}/Moby`,
      recommendedPocketId: 'g7-p6-mastery-classics',
      compatiblePocketIds: ['g7-p5-journeys-sea', 'g7-p6-mastery-classics'],
      dayRange: { start: 151, end: 180 },
      textType: 'sea-adventure-novel',
      themes: ['Obsession', 'Nature', 'Leadership', 'Symbolism'],
      description: 'Source folder includes 24-chapter adapted text plus vocabulary and comprehension questions.'
    },
    {
      id: 'twenty-thousand-leagues-7',
      title: 'Twenty Thousand Leagues Under the Sea',
      folder: `${root7}/20,000`,
      recommendedPocketId: 'g7-p5-journeys-sea',
      compatiblePocketIds: ['g7-p5-journeys-sea', 'g7-p6-mastery-classics'],
      dayRange: { start: 121, end: 150 },
      textType: 'science-adventure',
      themes: ['Exploration', 'Technology', 'Ocean life', 'Freedom'],
      description: 'Source folder includes 24 chapters in markdown plus a complete vocabulary file.'
    }
  ];

  return cards.map(card => enrichGrade7Card({
    id: card.id,
    title: card.title,
    gradeLevels: [7],
    source: {
      type: 'desktop-source',
      path: card.folder
    },
    status: {
      stage: 'content-ready',
      notes: [
        'Created from local 7th grade source folder audit.',
        card.description
      ]
    },
    pocket: {
      recommendedGrade: 7,
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
      readingLevel: '7th grade adaptation',
      description: card.description
    },
    themes: card.themes,
    standards: [],
    dailyPattern: {
      regularDayComponents,
      assessmentDays: weeklyAssessmentDays(card.dayRange),
      vocabularyWordsPerRegularDay: 3
    },
    weeks: [],
    requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']))
  }));
}

const grade7InformationalPairings = {
  'anne-green-gables': [
    'Prince Edward Island and rural Canadian life',
    'Orphans, adoption, and family structures in the 1800s',
    'Imagination as a tool for resilience',
    'School expectations and gender roles in Anne\'s world',
    'Descriptive writing and the language of place',
    'How coming-of-age stories show identity growth'
  ],
  'secret-garden': [
    'English gardens, seasons, and restoration',
    'The Yorkshire moors and setting as mood',
    'Fresh air, movement, and health beliefs',
    'Loneliness, friendship, and emotional growth',
    'Symbolism in gardens and locked spaces',
    'How neglected places and people can change'
  ],
  'arabian-nights': [
    'Frame stories and oral storytelling traditions',
    'Trade routes, travel, and cultural exchange',
    'Wisdom tales and moral lessons across cultures',
    'Heroes, tricksters, and clever problem solving',
    'Repetition and suspense in traditional tales',
    'How stories preserve values and imagination'
  ],
  'red-badge-courage': [
    'The Civil War and the experience of young soldiers',
    'Realism in war literature',
    'Courage, fear, and public expectations',
    'Battlefield confusion and point of view',
    'Symbols of honor and shame',
    'How authors portray inner conflict'
  ],
  kidnapped: [
    '18th-century Scotland and historical conflict',
    'Maps, travel routes, and pursuit narratives',
    'Loyalty and friendship under pressure',
    'Justice, inheritance, and identity',
    'Adventure fiction pacing and suspense',
    'How historical adventure builds character growth'
  ],
  'moby-dick': [
    'Whaling history and life at sea',
    'Ocean ecosystems and human risk',
    'Leadership, obsession, and group survival',
    'Symbols in literature: whales, ships, and storms',
    'Narrative voice and sea adventure traditions',
    'How a classic can become a modern symbol'
  ],
  'twenty-thousand-leagues-7': [
    'Submarines and underwater exploration',
    'Ocean zones, pressure, and marine life',
    'Captain Nemo and ethical technology',
    'Science fiction predictions and real inventions',
    'Freedom, captivity, and exploration',
    'How adventure stories teach scientific curiosity'
  ]
};

function enrichGrade7Card(card) {
  const startWeek = weekRange(card.pocket.dayRange).start;
  const pairings = grade7InformationalPairings[card.id] || [`Background article connected to ${card.title}`];
  const weeks = Array.from({ length: 6 }, (_, index) => {
    const dayStart = card.pocket.dayRange.start + (index * 5);
    const chapterStart = (index * 4) + 1;
    const chapterEnd = (index + 1) * 4;
    const theme = card.themes[index % card.themes.length] || 'character growth';
    return {
      week: startWeek + index,
      days: { start: dayStart, end: dayStart + 4 },
      title: `Week ${startWeek + index}: ${card.title} Part ${index + 1} (Days ${dayStart}-${dayStart + 4})`,
      reading: [`Chapters ${chapterStart}-${chapterEnd}: ${card.title}`],
      vocabulary: [
        `${theme}: define, use in context, and connect to the reading`,
        'text evidence: choose and explain a quotation',
        'academic discussion: compare ideas across chapters'
      ],
      journal: [
        `What does this week's reading show about ${theme}? Use a detail from the text.`,
        'Which character choice, setting detail, or conflict feels most important this week? Explain why.'
      ],
      writing: [
        index < 2
          ? 'Write an evidence paragraph about character, setting, or conflict.'
          : index < 4
            ? 'Write an informational paragraph connecting the book to the paired nonfiction topic.'
            : 'Write a short literary analysis paragraph about theme, symbol, or point of view.',
        index === 5
          ? 'Revise one response into the end-of-card writing portfolio.'
          : 'Revise one answer by adding a stronger quotation and clearer reasoning.'
      ],
      questions: [
        'What is the main conflict or question in this section?',
        'How does the author use setting, dialogue, or action to reveal character?',
        'Which quotation best supports your interpretation?',
        'How does this week connect to the larger theme of the card?'
      ],
      informationalText: [pairings[index] || pairings[pairings.length - 1]],
      assessment: [
        'Weekly vocabulary check and comprehension response.',
        index === 5
          ? 'End-of-card assessment: passage analysis, literary response, and portfolio reflection.'
          : 'Review day: discuss questions, revise writing, and prepare for the next section.'
      ]
    };
  });

  return {
    ...card,
    status: {
      stage: 'content-ready',
      notes: [
        'Launch-ready Grade 7 card with reading, vocabulary, journals, writing, questions, informational text, and assessments.',
        ...(card.status?.notes || [])
      ]
    },
    weeks,
    requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']))
  };
}

const grade8SourceFolders = {
  'lost-world': '/Users/mushu/Desktop/BedrockELA/8th ela/LostWorld',
  'war-of-worlds': '/Users/mushu/Desktop/BedrockELA/8th ela/WarofWorlds',
  'invisible-man': '/Users/mushu/Desktop/BedrockELA/8th ela/Invisibleman',
  'mysterious-island': '/Users/mushu/Desktop/BedrockELA/8th ela/Mysteriousisland ',
  'time-machine': '/Users/mushu/Desktop/BedrockELA/8th ela/timemachine',
  'turn-of-the-screw': '/Users/mushu/Desktop/BedrockELA/8th ela/Turnofscrew',
  'jekyll-hyde': '/Users/mushu/Desktop/BedrockELA/8th ela/JekyllHyde',
  frankenstein: '/Users/mushu/Desktop/BedrockELA/8th ela/Frankenstein',
  'dorian-gray': '/Users/mushu/Desktop/BedrockELA/8th ela/dorian',
  'sherlock-holmes': '/Users/mushu/Desktop/BedrockELA/8th ela/sherlock',
  beowulf: '/Users/mushu/Desktop/BedrockELA/8th ela/Beowulf',
  'monte-cristo': '/Users/mushu/Desktop/BedrockELA/8th ela/MonteCristo'
};

const grade8Themes = {
  'lost-world': ['Discovery', 'Scientific skepticism', 'Survival', 'Adventure'],
  'war-of-worlds': ['Invasion', 'Technology', 'Human vulnerability', 'Survival'],
  'invisible-man': ['Science ethics', 'Isolation', 'Power', 'Responsibility'],
  'mysterious-island': ['Engineering', 'Teamwork', 'Survival', 'Resourcefulness'],
  'time-machine': ['Progress', 'Class division', 'Future societies', 'Scientific imagination'],
  'turn-of-the-screw': ['Ambiguity', 'Gothic suspense', 'Point of view', 'Psychological mystery'],
  'jekyll-hyde': ['Duality', 'Morality', 'Reputation', 'Scientific risk'],
  frankenstein: ['Creation', 'Responsibility', 'Isolation', 'Ambition'],
  'dorian-gray': ['Beauty', 'Corruption', 'Influence', 'Conscience'],
  'sherlock-holmes': ['Deduction', 'Justice', 'Observation', 'Logic'],
  beowulf: ['Heroism', 'Legacy', 'Monsters', 'Honor'],
  'monte-cristo': ['Justice', 'Revenge', 'Mercy', 'Transformation']
};

const grade8InformationalPairings = {
  'lost-world': ['Victorian exploration and scientific discovery', 'Paleontology and public imagination', 'Expedition journals and evidence'],
  'war-of-worlds': ['Imperialism and invasion literature', 'Early science fiction and astronomy', 'Microbes, disease, and human survival'],
  'invisible-man': ['Ethics of scientific experimentation', 'Isolation and mental health in literature', 'Power without accountability'],
  'mysterious-island': ['Engineering under survival conditions', 'Civil War ballooning and escape stories', 'Natural resources and human adaptation'],
  'time-machine': ['Industrialization and class division', 'Evolutionary theory in Victorian culture', 'Utopias and dystopias'],
  'turn-of-the-screw': ['Gothic fiction and unreliable narration', 'Victorian childhood and household roles', 'Ambiguity in literary interpretation'],
  'jekyll-hyde': ['Victorian reputation and public morality', 'Early psychology and divided self theories', 'London as a gothic setting'],
  frankenstein: ['Galvanism and early electrical science', 'Romanticism and the sublime', 'Creator responsibility in modern science'],
  'dorian-gray': ['Aestheticism and Oscar Wilde', 'Portraiture, public image, and identity', 'Influence and moral responsibility'],
  'sherlock-holmes': ['Forensic science and observation', 'Victorian London and urban crime', 'Detective fiction conventions'],
  beowulf: ['Anglo-Saxon culture and oral poetry', 'Epic heroes across cultures', 'Legacy, leadership, and mortality'],
  'monte-cristo': ['Restoration-era France and imprisonment', 'Justice systems and wrongful conviction', 'Revenge tragedies and redemption']
};

function enrichGrade8Card(card) {
  if (!card.gradeLevels.includes(8)) return card;
  const startWeek = weekRange(card.pocket.dayRange).start;
  const themes = grade8Themes[card.id] || card.themes || ['literary analysis'];
  const pairings = grade8InformationalPairings[card.id] || [`Background article connected to ${card.title}`];
  const weeks = Array.from({ length: 3 }, (_, index) => {
    const dayStart = card.pocket.dayRange.start + (index * 5);
    const chapterStart = (index * 8) + 1;
    const chapterEnd = (index + 1) * 8;
    const theme = themes[index % themes.length];
    return {
      week: startWeek + index,
      days: { start: dayStart, end: dayStart + 4 },
      title: `Week ${startWeek + index}: ${card.title} Part ${index + 1} (Days ${dayStart}-${dayStart + 4})`,
      reading: [`Chapters ${chapterStart}-${chapterEnd}: ${card.title}`],
      vocabulary: [
        `${theme}: define, use in context, and connect to the text`,
        'literary evidence: embed and explain a quotation',
        'academic vocabulary: analyze author craft and theme'
      ],
      journal: [
        `What does this section reveal about ${theme}? Use one quotation or scene as evidence.`,
        'Which character choice, conflict, or image feels most important so far? Explain why.'
      ],
      writing: [
        index === 0
          ? 'Write an analytical paragraph about setting, conflict, or character introduction.'
          : index === 1
            ? 'Write a comparison paragraph connecting the fiction to the paired informational text.'
            : 'Write a short literary analysis paragraph about theme, author craft, or moral complexity.',
        index === 2
          ? 'Revise one paragraph into the end-of-card portfolio response.'
          : 'Strengthen one response by adding a precise quotation and commentary.'
      ],
      questions: [
        'What conflict or question is driving this section of the book?',
        'How does the author use setting, mood, structure, or point of view?',
        'Which quotation best supports your interpretation of a character or theme?',
        'How does this section connect to the larger quarter theme?'
      ],
      informationalText: [pairings[index] || pairings[pairings.length - 1]],
      assessment: [
        'Weekly comprehension check, vocabulary application, and short analytical response.',
        index === 2
          ? 'Book-card assessment: passage analysis, vocabulary, and literary analysis paragraph.'
          : 'Review day: discussion, revision, and evidence check.'
      ]
    };
  });

  return {
    ...card,
    source: grade8SourceFolders[card.id]
      ? { type: 'desktop-markdown-source', path: grade8SourceFolders[card.id] }
      : card.source,
    status: {
      stage: 'content-ready',
      notes: [
        'Launch-ready Grade 8 card with reading, vocabulary, journals, writing, questions, informational text, and assessments.',
        ...(card.status?.notes || []).filter(note => !/^Needs /i.test(note))
      ]
    },
    themes,
    dailyPattern: {
      ...card.dailyPattern,
      regularDayComponents,
      assessmentDays: weeklyAssessmentDays(card.pocket.dayRange),
      vocabularyWordsPerRegularDay: 3
    },
    weeks,
    requiredComponents: Object.fromEntries(REQUIRED_COMPONENTS.map(component => [component, 'present']))
  };
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

  const markdownCards = cardFiles.map(parseCard).map(enrichGrade4Card).map(enrichGrade6Card).map(enrichGrade8Card);
  const generatedCards = [
    ...grade2BookCards(),
    ...grade4LocalSourceCards().map(enrichGrade4Card),
    ...grade6LocalSourceCards(),
    ...grade7LocalSourceCards(),
    ...grade8LocalSourceCards()
  ];
  const pocketRecordsByGrade = Object.entries(gradePocketPlans).reduce((acc, [gradeText, plan]) => {
    const grade = Number(gradeText);
    acc[grade] = plan.map(record => pocketRecord(grade, record));
    return acc;
  }, {});

  const shellCards = [];
  for (const pockets of Object.values(pocketRecordsByGrade)) {
    for (const pocket of pockets) {
      const shouldKeepNamedShell = false;
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
