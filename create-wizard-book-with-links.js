const fs = require('fs');

const chapters = [
  { num: 1, title: "The Cyclone" },
  { num: 2, title: "The Council with the Munchkins" },
  { num: 3, title: "How Dorothy Saved the Scarecrow" },
  { num: 4, title: "The Road Through the Forest" },
  { num: 5, title: "The Rescue of the Tin Woodman" },
  { num: 6, title: "The Cowardly Lion" },
  { num: 7, title: "The Journey to the Great Oz" },
  { num: 8, title: "The Deadly Poppy Field" },
  { num: 9, title: "The Queen of the Field Mice" },
  { num: 10, title: "The Guardian of the Gates" },
  { num: 11, title: "The Wonderful Emerald City of Oz" },
  { num: 12, title: "The Search for the Wicked Witch" },
  { num: 13, title: "The Rescue" },
  { num: 14, title: "The Winged Monkeys" },
  { num: 15, title: "The Discovery of Oz, the Terrible" },
  { num: 16, title: "The Magic Art of the Great Humbug" },
  { num: 17, title: "How the Balloon Was Launched" },
  { num: 18, title: "Away to the South" },
  { num: 19, title: "Attacked by the Fighting Trees" },
  { num: 20, title: "The Dainty China Country" },
  { num: 21, title: "The Lion Becomes the King of Beasts" },
  { num: 22, title: "The Country of the Quadlings" },
  { num: 23, title: "Glinda The Good Witch Grants Dorothy's Wish" },
  { num: 24, title: "Home Again" }
];

const pages = chapters.map(ch => ({
  type: "chapter",
  chapter: ch.num,
  title: ch.title,
  content: `<div style="padding: 20px;">
  <h2 style="color: #305853; margin-bottom: 20px;">Chapter ${ch.num}: ${ch.title}</h2>
  
  <div style="background: rgba(176,104,33,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
    <p style="font-size: 16px; line-height: 1.6;">
      📖 <strong>Read this chapter from The Wonderful Wizard of Oz by L. Frank Baum</strong>
    </p>
    <p style="margin-top: 15px;">
      You can read Chapter ${ch.num} online at:<br/>
      <a href="https://www.gutenberg.org/files/55/55-h/55-h.htm#chap${String(ch.num).padStart(2, '0')}" 
         target="_blank" 
         style="color: #B06821; text-decoration: underline; font-weight: bold;">
        Project Gutenberg - Chapter ${ch.num}
      </a>
    </p>
    <p style="margin-top: 15px; font-size: 14px; color: #666;">
      Or if you have a printed copy of the book, read Chapter ${ch.num}.
    </p>
  </div>
  
  <div style="margin-top: 30px;">
    <h3 style="color: #305853;">Chapter ${ch.num}: ${ch.title}</h3>
    <p style="font-style: italic; color: #666; margin-top: 10px;">
      [Full chapter text will be added here - for now, please use the link above to read this chapter]
    </p>
  </div>
</div>`
}));

const bookData = {
  bookTitle: "The Wonderful Wizard of Oz",
  author: "L. Frank Baum",
  year: 1900,
  description: "Follow Dorothy and her friends—the Scarecrow, Tin Woodman, and Cowardly Lion—on their journey down the yellow brick road to meet the Wizard of Oz.",
  coverImage: "https://www.gutenberg.org/cache/epub/55/pg55.cover.medium.jpg",
  pages: pages
};

fs.writeFileSync('book-data/wizard-of-oz-full.json', JSON.stringify(bookData, null, 2));
console.log('✅ Created book-data/wizard-of-oz-full.json with 24 chapters');
console.log('📚 Each chapter links to Project Gutenberg for reading');
console.log('\nTo add full text later: Replace the content field in each page with actual chapter text');
