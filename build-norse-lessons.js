/**
 * Build All 20 Norse Mythology Lessons (Days 141-160)
 * Automated lesson generator for 5th grade
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Lesson mapping (16 regular + 4 assessments)
const lessonPlan = [
    { day: 141, story: "In_the_Beginning_The_Norse_Creation", type: "regular", week: 29, dayInWeek: 1 },
    { day: 142, story: "The_Nine_Worlds_of_Yggdrasil", type: "regular", week: 29, dayInWeek: 2 },
    { day: 143, story: "Odin_and_the_Price_of_Wisdom", type: "regular", week: 29, dayInWeek: 3 },
    { day: 144, story: "Thor_and_the_Theft_of_Mjolnir", type: "regular", week: 29, dayInWeek: 4 },
    { day: 145, story: null, type: "assessment", week: 29, dayInWeek: 5 },
    
    { day: 146, story: "Freyja_and_the_Necklace_of_the_Brisings", type: "regular", week: 30, dayInWeek: 1 },
    { day: 147, story: "Freyr_and_the_Sword_That_Fought_Alone", type: "regular", week: 30, dayInWeek: 2 },
    { day: 148, story: "Heimdall_and_the_Rainbow_Bridge", type: "regular", week: 30, dayInWeek: 3 },
    { day: 149, story: "Loki_the_Trickster", type: "regular", week: 30, dayInWeek: 4 },
    { day: 150, story: null, type: "assessment", week: 30, dayInWeek: 5 },
    
    { day: 151, story: "Tyr_and_the_Binding_of_Fenrir", type: "regular", week: 31, dayInWeek: 1 },
    { day: 152, story: "Baldur_the_Beautiful", type: "regular", week: 31, dayInWeek: 2 },
    { day: 153, story: "The_Death_of_Baldur_and_Lokis_Punishment", type: "regular", week: 31, dayInWeek: 3 },
    { day: 154, story: "Sigurd_and_the_Dragon_Fafnir", type: "regular", week: 31, dayInWeek: 4 },
    { day: 155, story: null, type: "assessment", week: 31, dayInWeek: 5 },
    
    { day: 156, story: "The_Mead_of_Poetry", type: "regular", week: 32, dayInWeek: 1 },
    { day: 157, story: "The_Valkyries_Choosers_of_the_Slain", type: "regular", week: 32, dayInWeek: 2 },
    { day: 158, story: "The_Viking_Afterlife_Valhalla_and_Helheim", type: "regular", week: 32, dayInWeek: 3 },
    { day: 159, story: "Ragnarok_The_End_and_the_Beginning", type: "regular", week: 32, dayInWeek: 4 },
    { day: 160, story: null, type: "assessment", week: 32, dayInWeek: 5 }
];

// Load vocabulary from CSV
function loadVocabulary() {
    const csvPath = '/Users/mushu/Desktop/Norse_Mythology_Vocab.csv';
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').slice(1); // Skip header
    
    const vocab = {};
    lines.forEach(line => {
        if (!line.trim()) return;
        const parts = line.split(',');
        if (parts.length < 4) return;
        
        const story = parts[0].trim();
        const word = parts[1].trim();
        const definition = parts[2].trim().replace(/^"|"$/g, '');
        const context = parts[3].trim().replace(/^"|"$/g, '');
        
        if (!vocab[story]) vocab[story] = [];
        vocab[story].push({ word, definition, context });
    });
    
    return vocab;
}

// Extract story text from .docx using textutil
function extractStoryText(storyFilename) {
    const docxPath = `/Users/mushu/Desktop/norse/NORSE_${storyFilename}.docx`;
    try {
        const text = execSync(`textutil -convert txt -stdout "${docxPath}" 2>/dev/null`, { encoding: 'utf-8' });
        // Clean up the text
        return text
            .replace(/Norse Mythology\n/g, '')
            .replace(/A Tale from Norse Mythology\n/g, '')
            .replace(/Retold for Young Readers\n/g, '')
            .trim();
    } catch (error) {
        console.error(`Error extracting ${storyFilename}:`, error.message);
        return `[Story text for ${storyFilename}]`;
    }
}

// Story titles (human-readable)
const storyTitles = {
    "In_the_Beginning_The_Norse_Creation": "In the Beginning: The Norse Creation",
    "The_Nine_Worlds_of_Yggdrasil": "The Nine Worlds of Yggdrasil",
    "Odin_and_the_Price_of_Wisdom": "Odin and the Price of Wisdom",
    "Thor_and_the_Theft_of_Mjolnir": "Thor and the Theft of Mjölnir",
    "Freyja_and_the_Necklace_of_the_Brisings": "Freyja and the Necklace of the Brisings",
    "Freyr_and_the_Sword_That_Fought_Alone": "Freyr and the Sword That Fought Alone",
    "Heimdall_and_the_Rainbow_Bridge": "Heimdall and the Rainbow Bridge",
    "Loki_the_Trickster": "Loki the Trickster",
    "Tyr_and_the_Binding_of_Fenrir": "Týr and the Binding of Fenrir",
    "Baldur_the_Beautiful": "Baldur the Beautiful",
    "The_Death_of_Baldur_and_Lokis_Punishment": "The Death of Baldur and Loki's Punishment",
    "Sigurd_and_the_Dragon_Fafnir": "Sigurd and the Dragon Fafnir",
    "The_Mead_of_Poetry": "The Mead of Poetry",
    "The_Valkyries_Choosers_of_the_Slain": "The Valkyries: Choosers of the Slain",
    "The_Viking_Afterlife_Valhalla_and_Helheim": "The Viking Afterlife: Valhalla and Helheim",
    "Ragnarok_The_End_and_the_Beginning": "Ragnarök: The End and the Beginning"
};

console.log('🐉 Building Norse Mythology Lessons (Days 141-160)...\n');

// Load vocabulary
console.log('📚 Loading vocabulary...');
const vocabulary = loadVocabulary();
console.log(`✓ Loaded vocabulary for ${Object.keys(vocabulary).length} stories\n`);

// Extract all stories
console.log('📖 Extracting story texts...');
const stories = {};
lessonPlan.forEach(lesson => {
    if (lesson.type === 'regular') {
        const storyKey = lesson.story.replace(/_/g, ' ').replace(/Lokis/, "Loki's");
        console.log(`  Extracting: ${storyKey}...`);
        stories[lesson.story] = extractStoryText(lesson.story);
    }
});
console.log(`✓ Extracted ${Object.keys(stories).length} stories\n`);

console.log('✅ Data collection complete!');
console.log('\nNext: Generate HTML files for all 20 lessons');
console.log('This will create:');
console.log('  - 16 regular lesson files');
console.log('  - 4 assessment files');
console.log('  - Total: 20 files (Days 141-160)');
