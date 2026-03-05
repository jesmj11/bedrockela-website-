#!/usr/bin/env node
/**
 * Update 3rd grade to use public domain books instead of copyrighted ones
 * This updates book titles in placeholders - content generation comes next
 */

const fs = require('fs');

// New public domain book lineup
const books = [
  { days: [1, 30], title: 'The Wind in the Willows', author: 'Kenneth Grahame', chapters: 12 },
  { days: [31, 60], title: 'Peter Pan', author: 'J.M. Barrie', chapters: 17 },
  { days: [61, 90], title: 'Heidi', author: 'Johanna Spyri', chapters: 31 },
  { days: [91, 120], title: 'The Railway Children', author: 'E. Nesbit', chapters: 14 },
  { days: [121, 150], title: 'A Little Princess', author: 'Frances Hodgson Burnett', chapters: 19 },
  { days: [151, 180], title: 'The Secret Garden', author: 'Frances Hodgson Burnett', chapters: 27 }
];

function getBookForDay(day) {
  for (const book of books) {
    if (day >= book.days[0] && day <= book.days[1]) {
      return book;
    }
  }
  return null;
}

let updated = 0;

for (let day = 1; day <= 180; day++) {
  const file = `3rd-grade-day-${day}.html`;
  if (!fs.existsSync(file)) continue;
  
  const book = getBookForDay(day);
  if (!book) continue;
  
  // Calculate chapter number for this day
  const dayInBook = day - book.days[0]; // 0-based within the book
  const regularDays = 24; // 30 days - 6 assessments
  const chapterNum = Math.floor((dayInBook / regularDays) * book.chapters) + 1;
  
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  
  // Update book title in objectives
  html = html.replace(
    /Read from <em>[^<]+<\/em>/,
    `Read from <em>${book.title}</em>`
  );
  
  // Update all reading page placeholders (all 5 pages)
  for (let pageNum = 1; pageNum <= 5; pageNum++) {
    // Update h2 "Reading: [Book Title]"
    const readingH2Regex = new RegExp(
      `(<h2>Reading: )[^<]+(</h2>\\s*<h3[^>]*>Chapter ${chapterNum}</h3>)`,
      'g'
    );
    html = html.replace(readingH2Regex, `$1${book.title}$2`);
    
    // Update placeholder text
    const placeholderRegex = new RegExp(
      `📚 Placeholder for [^-]+ - Chapter ${chapterNum}, Part ${pageNum}`,
      'g'
    );
    html = html.replace(
      placeholderRegex,
      `📚 Placeholder for ${book.title} - Chapter ${chapterNum}, Part ${pageNum}`
    );
    
    // Update book info on page 1
    if (pageNum === 1) {
      const bookInfoRegex = /Book: [^<]+ by [^<]+/;
      html = html.replace(
        bookInfoRegex,
        `Book: ${book.title} by ${book.author}`
      );
    }
  }
  
  if (html !== original) {
    fs.writeFileSync(file, html);
    updated++;
  }
}

console.log(`✅ Updated ${updated} lessons with new public domain books`);
console.log('\n📚 New 3rd Grade Book Lineup:');
books.forEach(book => {
  console.log(`  Days ${book.days[0]}-${book.days[1]}: ${book.title} (${book.chapters} chapters)`);
});
console.log('\n⚠️  NOTE: Comprehension questions, informational text, and vocabulary need regeneration!');
