const fs = require('fs');

const titles = [
  "The Cyclone",
  "The Council with the Munchkins",
  "How Dorothy Saved the Scarecrow",
  "The Road Through the Forest",
  "The Rescue of the Tin Woodman",
  "The Cowardly Lion",
  "The Journey to the Great Oz",
  "The Deadly Poppy Field",
  "The Queen of the Field Mice",
  "The Guardian of the Gates",
  "The Great and Terrible Oz",
  "The Search for the Wicked Witch",
  "Dorothy the Prisoner",
  "The Melting of the Witch",
  "The Winged Monkeys",
  "The Discovery of Oz the Terrible",
  "The Magic of Oz",
  "The Balloon",
  "The Journey South",
  "The Dainty China Country",
  "The Country of the Quadlings",
  "Glinda Grants Dorothy's Wish",
  "There's No Place Like Home",
  "Home Again"
];

const chapters = JSON.parse(fs.readFileSync('wizard-chapters.json', 'utf8'));

chapters.forEach((ch, idx) => {
  ch.title = titles[idx];
});

fs.writeFileSync('wizard-chapters.json', JSON.stringify(chapters, null, 2));
console.log('✅ Fixed all chapter titles!');
