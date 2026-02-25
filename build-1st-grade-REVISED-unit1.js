const fs = require('fs');

// REVISED 1st Grade Unit 1: Lessons 1-33
// CCSS-Aligned: Assumes students know letters, teaches word families & patterns

const lessons = [
  // Lessons 1-10: CVC Words & Word Families
  {
    num: 1,
    title: "Word Building Fun",
    subtitle: "The -AT Word Family",
    story: "The Enormous Turnip - Part 1",
    skills: ["-AT family (cat, mat, sat, bat, rat, hat)", "CVC pattern", "Sight words: the, a, is"],
    pages: [
      {
        type: "title",
        title: "Lesson 1",
        subtitle: "Word Building Fun!",
        details: "The -AT Word Family<br>The Enormous Turnip - Part 1"
      },
      {
        type: "content",
        title: "🎯 Today You Will...",
        content: `
          <div style="text-align: left; max-width: 500px; margin: 20px auto;">
            <p style="margin: 15px 0; font-size: 18px;">✓ Build words in the <strong>-AT family</strong></p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Read <strong>cat, mat, sat, bat, rat, hat</strong></p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Learn sight words: <strong>the, a, is</strong></p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Read part of <strong>The Enormous Turnip</strong></p>
          </div>
        `
      },
      {
        type: "content",
        title: "🏗️ Building the -AT Family",
        content: `
          <p style="font-size: 18px; margin-bottom: 20px;">Watch how we build words!</p>
          <div style="font-size: 48px; margin: 30px 0; color: #5B7C99; line-height: 1.5;">
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">c</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">at</span> = <strong>cat</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">m</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">at</span> = <strong>mat</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">s</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">at</span> = <strong>sat</strong>
            </div>
          </div>
          <p style="font-size: 16px; color: #666; margin-top: 20px;">Change the first letter, make a new word!</p>
        `
      },
      {
        type: "content",
        title: "🎮 Word Building Game!",
        content: `
          <p style="font-size: 18px; margin-bottom: 30px;">What word can YOU make?</p>
          <div style="max-width: 400px; margin: 20px auto;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
              <div style="padding: 20px; background: #e8f5e9; border-radius: 10px; font-size: 32px; font-weight: bold; color: #2E7D32; cursor: pointer;">cat</div>
              <div style="padding: 20px; background: #e8f5e9; border-radius: 10px; font-size: 32px; font-weight: bold; color: #2E7D32; cursor: pointer;">bat</div>
              <div style="padding: 20px; background: #e8f5e9; border-radius: 10px; font-size: 32px; font-weight: bold; color: #2E7D32; cursor: pointer;">rat</div>
              <div style="padding: 20px; background: #e8f5e9; border-radius: 10px; font-size: 32px; font-weight: bold; color: #2E7D32; cursor: pointer;">mat</div>
              <div style="padding: 20px; background: #e8f5e9; border-radius: 10px; font-size: 32px; font-weight: bold; color: #2E7D32; cursor: pointer;">hat</div>
              <div style="padding: 20px; background: #e8f5e9; border-radius: 10px; font-size: 32px; font-weight: bold; color: #2E7D32; cursor: pointer;">sat</div>
            </div>
          </div>
          <p style="font-size: 16px; color: #666; margin-top: 20px;">Practice reading each word!</p>
        `
      },
      {
        type: "content",
        title: "👀 Sight Words!",
        content: `
          <p style="font-size: 18px; margin-bottom: 30px;">These words we just need to know by sight!</p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 500px; margin: 20px auto;">
            <div style="padding: 30px; background: #fff4e6; border-radius: 15px; font-size: 48px; font-weight: bold; color: #D4A68F;">the</div>
            <div style="padding: 30px; background: #fff4e6; border-radius: 15px; font-size: 48px; font-weight: bold; color: #D4A68F;">a</div>
            <div style="padding: 30px; background: #fff4e6; border-radius: 15px; font-size: 48px; font-weight: bold; color: #D4A68F;">is</div>
          </div>
          <p style="font-size: 16px; color: #666; margin-top: 20px;">Read them fast!</p>
        `
      },
      {
        type: "content",
        title: "📖 The Enormous Turnip (Part 1)",
        content: `
          <div style="text-align: left; max-width: 600px; margin: 20px auto; line-height: 1.8; font-size: 18px;">
            <p>A man planted a turnip. The turnip grew and grew. It was <strong>enormous</strong>!</p>
            <p>"I will pull up the turnip," said the man.</p>
            <p>He pulled and pulled. But the turnip did not come up.</p>
            <p>The man called his wife. "Come help me pull the turnip!"</p>
            <p style="font-style: italic; color: #666; margin-top: 30px;">To be continued...</p>
          </div>
        `
      },
      {
        type: "content",
        title: "✅ Great Job!",
        content: `
          <div class="completion-badge">Lesson 1 Complete!</div>
          <p style="font-size: 18px; margin: 30px 0;">You learned:</p>
          <div style="text-align: left; max-width: 400px; margin: 20px auto;">
            <p style="margin: 10px 0;">✓ The -AT word family</p>
            <p style="margin: 10px 0;">✓ 6 new words!</p>
            <p style="margin: 10px 0;">✓ 3 sight words!</p>
            <p style="margin: 10px 0;">✓ Started a great story!</p>
          </div>
          <p style="font-size: 16px; color: #666; margin-top: 30px;">See you in Lesson 2! 🎉</p>
        `
      }
    ]
  },
  {
    num: 2,
    title: "Making New Words",
    subtitle: "-AN and -AP Families",
    story: "The Enormous Turnip - Part 2",
    skills: ["-AN family (man, can, ran, pan)", "-AP family (cap, map, tap)", "Sight word: and"],
    pages: [
      {
        type: "title",
        title: "Lesson 2",
        subtitle: "Making New Words!",
        details: "-AN and -AP Families<br>The Enormous Turnip - Part 2"
      },
      {
        type: "content",
        title: "🎯 Today You Will...",
        content: `
          <div style="text-align: left; max-width: 500px; margin: 20px auto;">
            <p style="margin: 15px 0; font-size: 18px;">✓ Build words in the <strong>-AN family</strong></p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Build words in the <strong>-AP family</strong></p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Learn sight word: <strong>and</strong></p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Continue <strong>The Enormous Turnip</strong></p>
          </div>
        `
      },
      {
        type: "content",
        title: "🏗️ The -AN Family",
        content: `
          <div style="font-size: 48px; margin: 30px 0; color: #5B7C99; line-height: 1.5;">
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">m</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">an</span> = <strong>man</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">c</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">an</span> = <strong>can</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">r</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">an</span> = <strong>ran</strong>
            </div>
          </div>
        `
      },
      {
        type: "content",
        title: "🏗️ The -AP Family",
        content: `
          <div style="font-size: 48px; margin: 30px 0; color: #5B7C99; line-height: 1.5;">
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">c</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">ap</span> = <strong>cap</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">m</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">ap</span> = <strong>map</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">t</span> + <span style="background: #fff4e6; padding: 10px 20px; border-radius: 10px;">ap</span> = <strong>tap</strong>
            </div>
          </div>
        `
      },
      {
        type: "content",
        title: "👀 New Sight Word!",
        content: `
          <div style="padding: 40px; background: #fff4e6; border-radius: 20px; font-size: 72px; font-weight: bold; color: #D4A68F; max-width: 300px; margin: 30px auto;">
            and
          </div>
          <p style="font-size: 18px; margin-top: 30px;">Use it in a sentence:</p>
          <p style="font-size: 24px; color: #305853; font-weight: bold; margin: 20px 0;">The cat <span style="color: #B06821;">and</span> the rat.</p>
        `
      },
      {
        type: "content",
        title: "📖 The Enormous Turnip (Part 2)",
        content: `
          <div style="text-align: left; max-width: 600px; margin: 20px auto; line-height: 1.8; font-size: 18px;">
            <p>The man <strong>and</strong> his wife pulled <strong>and</strong> pulled. But the turnip did not come up.</p>
            <p>"Let's get the boy!" said the wife.</p>
            <p>The boy came. The man, the wife, <strong>and</strong> the boy all pulled together.</p>
            <p>They pulled <strong>and</strong> pulled. But the turnip did not come up!</p>
            <p style="font-style: italic; color: #666; margin-top: 30px;">To be continued...</p>
          </div>
        `
      },
      {
        type: "content",
        title: "✅ Excellent Work!",
        content: `
          <div class="completion-badge">Lesson 2 Complete!</div>
          <p style="font-size: 18px; margin: 30px 0;">You learned:</p>
          <div style="text-align: left; max-width: 400px; margin: 20px auto;">
            <p style="margin: 10px 0;">✓ The -AN word family</p>
            <p style="margin: 10px 0;">✓ The -AP word family</p>
            <p style="margin: 10px 0;">✓ New sight word: and</p>
            <p style="margin: 10px 0;">✓ The story continues!</p>
          </div>
          <p style="font-size: 16px; color: #666; margin-top: 30px;">Ready for Lesson 3! 🎉</p>
        `
      }
    ]
  },
  {
    num: 3,
    title: "Short Vowel Power",
    subtitle: "Short A & I",
    story: "The Enormous Turnip - Part 3",
    skills: ["Review short a", "Introduce short i (-it, -in families)", "Sight words: it, in"],
    pages: [
      {
        type: "title",
        title: "Lesson 3",
        subtitle: "Short Vowel Power!",
        details: "Short A & I<br>The Enormous Turnip - Part 3"
      },
      {
        type: "content",
        title: "🎯 Today You Will...",
        content: `
          <div style="text-align: left; max-width: 500px; margin: 20px auto;">
            <p style="margin: 15px 0; font-size: 18px;">✓ Review <strong>short A</strong> words</p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Learn <strong>short I</strong> words</p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Read words with <strong>-it and -in</strong></p>
            <p style="margin: 15px 0; font-size: 18px;">✓ Finish <strong>The Enormous Turnip!</strong></p>
          </div>
        `
      },
      {
        type: "content",
        title: "📝 Short A Review",
        content: `
          <p style="font-size: 18px; margin-bottom: 20px;">Let's review our -AT, -AN, and -AP words!</p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 500px; margin: 20px auto;">
            <div style="padding: 15px; background: #e8f5e9; border-radius: 10px; font-size: 24px; font-weight: bold;">cat</div>
            <div style="padding: 15px; background: #e8f5e9; border-radius: 10px; font-size: 24px; font-weight: bold;">man</div>
            <div style="padding: 15px; background: #e8f5e9; border-radius: 10px; font-size: 24px; font-weight: bold;">tap</div>
            <div style="padding: 15px; background: #e8f5e9; border-radius: 10px; font-size: 24px; font-weight: bold;">bat</div>
            <div style="padding: 15px; background: #e8f5e9; border-radius: 10px; font-size: 24px; font-weight: bold;">can</div>
            <div style="padding: 15px; background: #e8f5e9; border-radius: 10px; font-size: 24px; font-weight: bold;">map</div>
          </div>
        `
      },
      {
        type: "content",
        title: "🆕 Meet Short I!",
        content: `
          <div style="font-size: 48px; margin: 30px 0; color: #5B7C99; line-height: 1.5;">
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">s</span> + <span style="background: #e3f2fd; padding: 10px 20px; border-radius: 10px;">it</span> = <strong>sit</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">h</span> + <span style="background: #e3f2fd; padding: 10px 20px; border-radius: 10px;">it</span> = <strong>hit</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">p</span> + <span style="background: #e3f2fd; padding: 10px 20px; border-radius: 10px;">in</span> = <strong>pin</strong>
            </div>
            <div style="margin: 15px 0;">
              <span style="color: #B06821;">w</span> + <span style="background: #e3f2fd; padding: 10px 20px; border-radius: 10px;">in</span> = <strong>win</strong>
            </div>
          </div>
        `
      },
      {
        type: "content",
        title: "👀 New Sight Words!",
        content: `
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 400px; margin: 30px auto;">
            <div style="padding: 30px; background: #fff4e6; border-radius: 15px; font-size: 48px; font-weight: bold; color: #D4A68F;">it</div>
            <div style="padding: 30px; background: #fff4e6; border-radius: 15px; font-size: 48px; font-weight: bold; color: #D4A68F;">in</div>
          </div>
          <p style="font-size: 18px; margin-top: 30px;">Practice: The cat is <strong>in</strong> the hat. Look at <strong>it</strong>!</p>
        `
      },
      {
        type: "content",
        title: "📖 The Enormous Turnip (Part 3 - End)",
        content: `
          <div style="text-align: left; max-width: 600px; margin: 20px auto; line-height: 1.8; font-size: 18px;">
            <p>"Get the dog!" said the boy. The dog came to help.</p>
            <p>They all pulled. But the turnip would not come up!</p>
            <p>"Get the cat!" said the dog. The cat came. They all pulled together.</p>
            <p>Still, the turnip would not come up!</p>
            <p>Then a little mouse came. "I can help!" said the mouse.</p>
            <p>Everyone pulled together. The man, the wife, the boy, the dog, the cat, <strong>and</strong> the mouse!</p>
            <p style="font-weight: bold; color: #305853;">POP! Up came the enormous turnip at last!</p>
            <p style="font-style: italic; color: #666; margin-top: 30px;">The End</p>
          </div>
        `
      },
      {
        type: "content",
        title: "✅ Amazing Work!",
        content: `
          <div class="completion-badge">Lesson 3 Complete!</div>
          <p style="font-size: 18px; margin: 30px 0;">You learned:</p>
          <div style="text-align: left; max-width: 400px; margin: 20px auto;">
            <p style="margin: 10px 0;">✓ Short I word families</p>
            <p style="margin: 10px 0;">✓ New sight words: it, in</p>
            <p style="margin: 10px 0;">✓ Finished a complete story!</p>
            <p style="margin: 10px 0;">✓ Reading is getting easier!</p>
          </div>
          <p style="font-size: 16px; color: #666; margin-top: 30px;">Next: Three Billy Goats Gruff! 🐐</p>
        `
      }
    ]
  }
];

// Build lesson HTML
function buildLesson(lesson) {
  const pagesJS = lesson.pages.map((page, idx) => {
    if (page.type === "title") {
      return `\`<div class="lesson-page-card title-page">
    <h1>${page.title}</h1>
    <div class="subtitle">${page.subtitle}</div>
    <p style="color: #5B7C99; font-size: 18px; margin-top: 20px;">
      ${page.details}
    </p>
  </div>\``;
    } else {
      return `\`<div class="lesson-page-card content-page">
    <h2>${page.title}</h2>
    ${page.content}
  </div>\``;
    }
  }).join(',\n\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lesson.num}: ${lesson.title} - BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container">
        <!-- Navigation will be inserted here -->
    </div>

    <script>
        const pages = [
        ${pagesJS}
        ];

        let currentPage = 0;

        function renderPage() {
            const container = document.getElementById('lesson-container');
            
            // Simple navigation
            const nav = \`
                <div class="lesson-nav">
                    <button class="nav-arrow" onclick="prevPage()" \${currentPage === 0 ? 'disabled' : ''}>←</button>
                    <span class="page-number">Page \${currentPage + 1} of \${pages.length}</span>
                    <button class="nav-arrow" onclick="nextPage()" \${currentPage === pages.length - 1 ? 'disabled' : ''}>→</button>
                </div>
            \`;

            const content = \`
                <div class="lesson-content">
                    \${pages[currentPage]}
                </div>
            \`;

            container.innerHTML = nav + content;
        }

        function nextPage() {
            if (currentPage < pages.length - 1) {
                currentPage++;
                renderPage();
                window.scrollTo(0, 0);
            } else {
                // Last page - go to dashboard
                window.location.href = 'student-dashboard.html';
            }
        }

        function prevPage() {
            if (currentPage > 0) {
                currentPage--;
                renderPage();
                window.scrollTo(0, 0);
            }
        }

        // Initialize
        renderPage();
    </script>
</body>
</html>`;
}

// Generate lessons 1-3 first (testing batch)
console.log('Building REVISED 1st Grade Lessons 1-3...');

lessons.forEach(lesson => {
  const html = buildLesson(lesson);
  const filename = `1st-grade-lesson-${lesson.num}-REVISED.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Built ${filename}`);
});

console.log('\n🎉 REVISED lessons 1-3 complete!');
console.log('📝 These are CCSS-aligned for proper 1st grade level');
console.log('🔄 Ready to build more or switch to dashboard');
