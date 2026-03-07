#!/usr/bin/env node
/**
 * Update Lost World lessons with actual informational text content
 * Replaces placeholders with real articles from lost-world-articles.json
 */

const fs = require('fs');
const path = require('path');

// Load the articles
const articlesData = JSON.parse(fs.readFileSync(
    './informational-texts/lost-world-articles.json',
    'utf8'
));

// Map day numbers to articles
const articlesByDay = {};
articlesData.articles.forEach(article => {
    articlesByDay[article.day] = article;
});

// Days that have informational texts (regular days, not assessments)
const daysToUpdate = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14];

let updated = 0;
let failed = 0;

daysToUpdate.forEach(dayNum => {
    const filename = `8th-grade-day-${String(dayNum).padStart(3, '0')}.html`;
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`❌ File not found: ${filename}`);
        failed++;
        return;
    }
    
    const article = articlesByDay[dayNum];
    if (!article) {
        console.log(`❌ No article for day ${dayNum}`);
        failed++;
        return;
    }
    
    // Read the file
    let html = fs.readFileSync(filepath, 'utf8');
    
    // Build the new informational text content
    const paragraphs = article.text.split('\n\n').map(para => 
        `<p>${para.replace(/'/g, "\\'")}</p>`
    ).join('\\n                        ');
    
    const questions = article.questions.map((q, i) => `
                    <div class="question-card">
                        <p><strong>${i + 1}.</strong> ${q.q.replace(/'/g, "\\'")}</p>
                        <textarea id="${q.id}" rows="3" placeholder="Your answer..."></textarea>
                    </div>`).join('');
    
    const newContent = `<h2>🌍 Informational Text</h2>
                    <h3>${article.title}</h3>
                    <div class="informational-article">
                        ${paragraphs}
                    </div>
                    
                    <h3>Comprehension Questions</h3>${questions}`;
    
    // Match the placeholder pattern in the JavaScript config
    const placeholderPattern = /<h2>🌍 Informational Text<\/h2>\\n\s+<p><em>Non-fiction article[\s\S]*?<\/div>\\n\s+<\/div>/;
    
    if (html.match(placeholderPattern)) {
        html = html.replace(placeholderPattern, newContent);
        fs.writeFileSync(filepath, html, 'utf8');
        console.log(`✅ Updated ${filename} with "${article.title}"`);
        updated++;
    } else {
        console.log(`⚠️  Could not find placeholder pattern in ${filename}`);
        failed++;
    }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Updated: ${updated} files`);
console.log(`   ❌ Failed: ${failed} files`);
