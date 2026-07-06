export const WRITING_PATHS = [
  {
    name: 'Story',
    description: 'Students learn to tell compelling stories through character, conflict, dialogue, setting, pacing, and resolution.',
    traditionalWritingTypes: ['Narrative', 'Creative Writing', 'Historical Fiction', 'Science Fiction', 'Memoir', 'Personal Narrative'],
    ccssWritingFocus: 'Narrative Writing',
    requiredInBuilder: true
  },
  {
    name: 'Analysis',
    description: 'Students learn to find meaning in literature by studying character, theme, symbolism, structure, author craft, and literary devices.',
    traditionalWritingTypes: ['Literary Analysis', 'Textual Analysis', 'Theme Analysis', 'Character Analysis', 'Compare Literary Elements'],
    ccssWritingFocus: 'Literary Analysis, Evidence-Based Writing',
    requiredInBuilder: true
  },
  {
    name: 'Argument',
    description: 'Students learn to take a position, support it with evidence, address counterclaims, and defend ideas clearly.',
    traditionalWritingTypes: ['Argumentative Essay', 'Persuasive Essay', 'Position Paper', 'Editorial', 'Debate Preparation'],
    ccssWritingFocus: 'Argument Writing',
    requiredInBuilder: true
  },
  {
    name: 'Discovery',
    description: 'Students learn to investigate, research, explain, synthesize information, and teach what they learn.',
    traditionalWritingTypes: ['Expository Essay', 'Informative Essay', 'Research Paper', 'Technical Writing', 'Cause & Effect', 'Process Analysis'],
    ccssWritingFocus: 'Informative/Explanatory Writing + Research',
    requiredInBuilder: true
  },
  {
    name: 'Reflection',
    description: 'Students learn to connect literature and ideas to life, character, values, growth, and personal understanding.',
    traditionalWritingTypes: ['Reflective Essay', 'Personal Response', 'Journal', 'Philosophy', 'Application Essay', 'Synthesis'],
    ccssWritingFocus: 'Reflective Writing, Narrative Reflection, Informal Analysis',
    requiredInBuilder: true
  },
  {
    name: 'Communication',
    description: 'Students learn to share ideas through speeches, presentations, podcasts, debates, seminars, interviews, and multimedia projects.',
    traditionalWritingTypes: ['Speech', 'Debate', 'Podcast', 'Presentation', 'Documentary', 'Interview', 'TED Talk', 'Seminar'],
    ccssWritingFocus: 'Speaking & Listening',
    requiredInBuilder: false,
    wovenThroughAllPaths: true
  }
];

const authors = {
  'A Midsummer Night’s Dream': 'William Shakespeare',
  'Much Ado About Nothing': 'William Shakespeare',
  'The Hobbit': 'J. R. R. Tolkien',
  'Project Hail Mary': 'Andy Weir',
  Timeline: 'Michael Crichton',
  'Journey to the Center of the Earth': 'Jules Verne',
  'Around the World in 80 Days': 'Jules Verne',
  'Robinson Crusoe': 'Daniel Defoe',
  'Swiss Family Robinson': 'Johann David Wyss',
  'The Lost World': 'Arthur Conan Doyle',
  'The King’s Fifth': 'Scott O’Dell',
  'Crispin: The Cross of Lead': 'Avi',
  'The Black Arrow': 'Robert Louis Stevenson',
  'The Odyssey': 'Homer',
  Beowulf: 'Unknown',
  'Lord of the Nutcracker Men': 'Iain Lawrence',
  'The Eagle of the Ninth': 'Rosemary Sutcliff',
  'The Ramsay Scallop': 'Frances Temple',
  'Ender’s Game': 'Orson Scott Card',
  Macbeth: 'William Shakespeare',
  'Julius Caesar': 'William Shakespeare',
  Hamlet: 'William Shakespeare',
  'Dr. Jekyll and Mr. Hyde': 'Robert Louis Stevenson',
  'Fahrenheit 451': 'Ray Bradbury',
  'The Book Thief': 'Markus Zusak',
  'The Importance of Being Earnest': 'Oscar Wilde',
  'The Hound of the Baskervilles': 'Arthur Conan Doyle',
  'Murder on the Orient Express': 'Agatha Christie',
  'And Then There Were None': 'Agatha Christie',
  'A Christmas Carol': 'Charles Dickens',
  'The Bronze Bow': 'Elizabeth George Speare',
  'The Witch of Blackbird Pond': 'Elizabeth George Speare',
  'Jurassic Park': 'Michael Crichton',
  'I, Robot': 'Isaac Asimov',
  'The Martian': 'Andy Weir',
  'The Killer Angels': 'Michael Shaara',
  'The Ride: Paul Revere and the Night That Saved America': 'David Hackett Fischer',
  'The War of the Worlds': 'H. G. Wells',
  'Les Misérables, abridged': 'Victor Hugo',
  'The Count of Monte Cristo, abridged': 'Alexandre Dumas',
  Sphere: 'Michael Crichton',
  'The Andromeda Strain': 'Michael Crichton',
  'The Time Machine': 'H. G. Wells',
  'Code Talker': 'Joseph Bruchac',
  'The Boys in the Boat, Young Readers Edition': 'Daniel James Brown',
  'Hidden Figures, Young Readers Edition': 'Margot Lee Shetterly',
  'Apollo 13': 'Jim Lovell and Jeffrey Kluger',
  'October Sky': 'Homer Hickam',
  'The Wright Brothers': 'David McCullough',
  Endurance: 'Alfred Lansing',
  'The River of Doubt': 'Candice Millard',
  'Kon-Tiki': 'Thor Heyerdahl',
  'Carry On, Mr. Bowditch': 'Jean Lee Latham',
  'Number the Stars': 'Lois Lowry',
  'Across Five Aprils': 'Irene Hunt',
  'The Sign of the Beaver': 'Elizabeth George Speare',
  'Amos Fortune, Free Man': 'Elizabeth Yates',
  'The California Blue': 'David Klass',
  'The Hiding Place': 'Corrie ten Boom with John and Elizabeth Sherrill',
  'Unbroken, Young Adult Edition': 'Laura Hillenbrand',
  'The Door in the Wall': 'Marguerite de Angeli',
  'The Hitchhiker’s Guide to the Galaxy': 'Douglas Adams'
};

const pathMetadata = {
  Story: {
    category: 'Literature and narrative craft',
    themes: ['Character', 'Conflict', 'Setting', 'Resolution'],
    connections: ['History', 'Drama', 'World literature']
  },
  Analysis: {
    category: 'Literary analysis',
    themes: ['Theme', 'Symbolism', 'Structure', 'Author craft'],
    connections: ['Philosophy', 'History', 'Rhetoric']
  },
  Argument: {
    category: 'Argument and ideas',
    themes: ['Ethics', 'Evidence', 'Counterclaim', 'Responsibility'],
    connections: ['Science', 'Civics', 'History']
  },
  Discovery: {
    category: 'Research and inquiry',
    themes: ['Investigation', 'Innovation', 'Survival', 'Evidence'],
    connections: ['Science', 'Biography', 'Geography']
  },
  Reflection: {
    category: 'Character and meaning',
    themes: ['Identity', 'Values', 'Growth', 'Memory'],
    connections: ['History', 'Psychology', 'Ethics']
  },
  Communication: {
    category: 'Speaking and presentation',
    themes: ['Audience', 'Voice', 'Medium', 'Collaboration'],
    connections: ['Media studies', 'Speech', 'Seminar']
  }
};

const rawBooks = [
  ['A Midsummer Night’s Dream', 'Story', 'Analysis'],
  ['Much Ado About Nothing', 'Story', 'Analysis'],
  ['The Hobbit', 'Story', 'Analysis'],
  ['Project Hail Mary', 'Story', 'Discovery'],
  ['Timeline', 'Story', 'Discovery'],
  ['Journey to the Center of the Earth', 'Story', 'Discovery'],
  ['Around the World in 80 Days', 'Story', 'Reflection'],
  ['Robinson Crusoe', 'Story', 'Reflection'],
  ['Swiss Family Robinson', 'Story', 'Discovery'],
  ['The Lost World', 'Story', 'Discovery'],
  ['The King’s Fifth', 'Story', 'Discovery'],
  ['Crispin: The Cross of Lead', 'Story', 'Reflection'],
  ['The Black Arrow', 'Story', 'Analysis'],
  ['The Odyssey', 'Story', 'Analysis'],
  ['Beowulf', 'Story', 'Analysis'],
  ['Lord of the Nutcracker Men', 'Story', 'Reflection'],
  ['The Eagle of the Ninth', 'Story', 'Discovery'],
  ['The Ramsay Scallop', 'Story', 'Reflection'],
  ['Ender’s Game', 'Analysis', 'Argument'],
  ['Macbeth', 'Analysis', 'Argument'],
  ['Julius Caesar', 'Analysis', 'Argument'],
  ['Hamlet', 'Analysis', 'Reflection'],
  ['Dr. Jekyll and Mr. Hyde', 'Analysis', 'Story'],
  ['Fahrenheit 451', 'Analysis', 'Argument'],
  ['The Book Thief', 'Analysis', 'Reflection'],
  ['The Importance of Being Earnest', 'Analysis', 'Communication'],
  ['The Hound of the Baskervilles', 'Analysis', 'Discovery'],
  ['Murder on the Orient Express', 'Analysis', 'Discovery'],
  ['And Then There Were None', 'Analysis', 'Argument'],
  ['A Christmas Carol', 'Analysis', 'Reflection'],
  ['The Bronze Bow', 'Analysis', 'Reflection'],
  ['The Witch of Blackbird Pond', 'Analysis', 'Reflection'],
  ['Jurassic Park', 'Argument', 'Discovery'],
  ['I, Robot', 'Argument', 'Discovery'],
  ['The Martian', 'Argument', 'Discovery'],
  ['The Killer Angels', 'Argument', 'Discovery'],
  ['The Ride: Paul Revere and the Night That Saved America', 'Argument', 'Discovery'],
  ['The War of the Worlds', 'Argument', 'Analysis'],
  ['Les Misérables, abridged', 'Argument', 'Reflection'],
  ['The Count of Monte Cristo, abridged', 'Argument', 'Reflection'],
  ['Sphere', 'Argument', 'Discovery'],
  ['The Andromeda Strain', 'Argument', 'Discovery'],
  ['The Time Machine', 'Discovery', 'Analysis'],
  ['Code Talker', 'Discovery', 'Reflection'],
  ['The Boys in the Boat, Young Readers Edition', 'Discovery', 'Reflection'],
  ['Hidden Figures, Young Readers Edition', 'Discovery', 'Communication'],
  ['Apollo 13', 'Discovery', 'Communication'],
  ['October Sky', 'Discovery', 'Reflection'],
  ['The Wright Brothers', 'Discovery', 'Communication'],
  ['Endurance', 'Discovery', 'Reflection'],
  ['The River of Doubt', 'Discovery', 'Reflection'],
  ['Kon-Tiki', 'Discovery', 'Reflection'],
  ['Carry On, Mr. Bowditch', 'Discovery', 'Story'],
  ['Number the Stars', 'Discovery', 'Reflection'],
  ['Across Five Aprils', 'Discovery', 'Reflection'],
  ['The Sign of the Beaver', 'Discovery', 'Reflection'],
  ['Amos Fortune, Free Man', 'Discovery', 'Reflection'],
  ['The California Blue', 'Discovery', 'Reflection'],
  ['The Hiding Place', 'Reflection', 'Communication'],
  ['Unbroken, Young Adult Edition', 'Reflection', 'Discovery'],
  ['The Door in the Wall', 'Reflection', 'Story'],
  ['The Hitchhiker’s Guide to the Galaxy', 'Communication', 'Story']
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function essentialQuestion(title, primaryPath) {
  const starters = {
    Story: 'How can a story carry truth through character, conflict, and change?',
    Analysis: 'How does careful reading reveal meaning that is not obvious at first?',
    Argument: 'What claims does this text invite us to test, defend, or challenge?',
    Discovery: 'What can inquiry teach us about courage, evidence, and the wider world?',
    Reflection: 'How can a text help us examine identity, values, and growth?',
    Communication: 'How can ideas from a text be shaped for an audience?'
  };
  return `${starters[primaryPath]} How does ${title} help answer that question?`;
}

export const FOUNDING_LIBRARY = rawBooks.map(([title, primaryPath, secondaryPath], index) => {
  const meta = pathMetadata[primaryPath];
  return {
    id: slugify(title),
    title,
    author: authors[title] || 'To be added',
    gradeBand: '9-12',
    category: meta.category,
    primaryPath,
    secondaryPath,
    essentialQuestion: essentialQuestion(title, primaryPath),
    themes: meta.themes,
    crossCurricularConnections: meta.connections,
    overview: `${title} is seeded as a Grade 9-12 Pocket Curriculum in the Tessory Founding Library.`,
    whyItEarnedItsPlace: 'This title is included because it can awaken curiosity, invite deeper questions, support meaningful discussion, and offer lasting educational value.',
    writingPossibilities: [
      `${primaryPath} notebook entries and short constructed responses`,
      `${secondaryPath} project or essay option`,
      'End-of-pocket portfolio piece'
    ],
    discussionPossibilities: [
      'Socratic seminar question set',
      'Character, idea, or evidence conference',
      'Student-led discussion or presentation'
    ],
    ccssAlignment: 'CCSS alignment placeholder for reading, writing, speaking/listening, and language standards.',
    contentNotes: 'Content notes placeholder. Review edition, adaptation, and family preferences before publishing the full Pocket Curriculum.',
    status: index < 12 ? 'In Development' : 'Planned'
  };
});
