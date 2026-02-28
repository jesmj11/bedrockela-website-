const fs = require('fs');

// 3rd Grade Complete Year - Modern Style
// 180 lessons, 6 classic books, 2 words/day, 8-word assessments every 5th day

const lessons = [
  // UNIT 1: The Velveteen Rabbit (Days 1-20)
  { day: 1, title: "Meeting the Velveteen Rabbit", book: "The Velveteen Rabbit", unit: 1, words: ["velveteen", "nursery"] },
  { day: 2, title: "The Skin Horse's Wisdom", book: "The Velveteen Rabbit", unit: 1, words: ["shabby", "wisdom"] },
  { day: 3, title: "Becoming Real", book: "The Velveteen Rabbit", unit: 1, words: ["real", "magical"] },
  { day: 4, title: "The Boy's Love", book: "The Velveteen Rabbit", unit: 1, words: ["beloved", "constant"] },
  { day: 5, type: 'assessment', title: "Week 1 Assessment", unit: 1, words: ["velveteen", "nursery", "shabby", "wisdom", "real", "magical", "beloved", "constant"] },
  
  { day: 6, title: "Summer Adventures", book: "The Velveteen Rabbit", unit: 1, words: ["adventure", "bracken"] },
  { day: 7, title: "The Real Rabbits", book: "The Velveteen Rabbit", unit: 1, words: ["wild", "hopping"] },
  { day: 8, title: "Feeling Different", book: "The Velveteen Rabbit", unit: 1, words: ["mechanical", "clockwork"] },
  { day: 9, title: "The Boy Falls Ill", book: "The Velveteen Rabbit", unit: 1, words: ["scarlet", "fever"] },
  { day: 10, type: 'assessment', title: "Week 2 Assessment", unit: 1, words: ["adventure", "bracken", "wild", "hopping", "mechanical", "clockwork", "scarlet", "fever"] },
  
  { day: 11, title: "The Bonfire", book: "The Velveteen Rabbit", unit: 1, words: ["bonfire", "bundle"] },
  { day: 12, title: "The Fairy Appears", book: "The Velveteen Rabbit", unit: 1, words: ["fairy", "nursery"] },
  { day: 13, title: "Transformation", book: "The Velveteen Rabbit", unit: 1, words: ["transform", "wings"] },
  { day: 14, title: "Truly Real", book: "The Velveteen Rabbit", unit: 1, words: ["genuine", "spirit"] },
  { day: 15, type: 'assessment', title: "Week 3 Assessment", unit: 1, words: ["bonfire", "bundle", "fairy", "nursery", "transform", "wings", "genuine", "spirit"] },
  
  { day: 16, title: "The Reunion", book: "The Velveteen Rabbit", unit: 1, words: ["reunion", "familiar"] },
  { day: 17, title: "Lessons on Love", book: "The Velveteen Rabbit", unit: 1, words: ["devotion", "treasure"] },
  { day: 18, title: "What Makes You Real", book: "The Velveteen Rabbit", unit: 1, words: ["essence", "cherish"] },
  { day: 19, title: "The Power of Love", book: "The Velveteen Rabbit", unit: 1, words: ["endure", "forever"] },
  { day: 20, type: 'assessment', title: "Unit 1 Final Assessment", unit: 1, words: ["reunion", "familiar", "devotion", "treasure", "essence", "cherish", "endure", "forever"] },
  
  // UNIT 2: Grimm's Fairy Tales (Days 21-50)
  { day: 21, title: "Snow White Begins", book: "Grimm's Fairy Tales", unit: 2, words: ["ebony", "ivory"] },
  { day: 22, title: "The Magic Mirror", book: "Grimm's Fairy Tales", unit: 2, words: ["mirror", "fairest"] },
  { day: 23, title: "The Huntsman's Choice", book: "Grimm's Fairy Tales", unit: 2, words: ["huntsman", "mercy"] },
  { day: 24, title: "The Seven Dwarfs", book: "Grimm's Fairy Tales", unit: 2, words: ["cottage", "dwarfs"] },
  { day: 25, type: 'assessment', title: "Week 5 Assessment", unit: 2, words: ["ebony", "ivory", "mirror", "fairest", "huntsman", "mercy", "cottage", "dwarfs"] },
  
  { day: 26, title: "The Poisoned Apple", book: "Grimm's Fairy Tales", unit: 2, words: ["poison", "disguise"] },
  { day: 27, title: "The Glass Coffin", book: "Grimm's Fairy Tales", unit: 2, words: ["coffin", "enchanted"] },
  { day: 28, title: "True Love's Kiss", book: "Grimm's Fairy Tales", unit: 2, words: ["slumber", "awaken"] },
  { day: 29, title: "Cinderella's Kindness", book: "Grimm's Fairy Tales", unit: 2, words: ["cinders", "hearth"] },
  { day: 30, type: 'assessment', title: "Week 6 Assessment", unit: 2, words: ["poison", "disguise", "coffin", "enchanted", "slumber", "awaken", "cinders", "hearth"] },
  
  { day: 31, title: "The Fairy Godmother", book: "Grimm's Fairy Tales", unit: 2, words: ["godmother", "pumpkin"] },
  { day: 32, title: "The Royal Ball", book: "Grimm's Fairy Tales", unit: 2, words: ["palace", "midnight"] },
  { day: 33, title: "The Glass Slipper", book: "Grimm's Fairy Tales", unit: 2, words: ["slipper", "delicate"] },
  { day: 34, title: "Hansel and Gretel Lost", book: "Grimm's Fairy Tales", unit: 2, words: ["breadcrumbs", "forest"] },
  { day: 35, type: 'assessment', title: "Week 7 Assessment", unit: 2, words: ["godmother", "pumpkin", "palace", "midnight", "slipper", "delicate", "breadcrumbs", "forest"] },
  
  { day: 36, title: "The Gingerbread House", book: "Grimm's Fairy Tales", unit: 2, words: ["gingerbread", "tempting"] },
  { day: 37, title: "The Wicked Witch", book: "Grimm's Fairy Tales", unit: 2, words: ["wicked", "cage"] },
  { day: 38, title: "Gretel's Bravery", book: "Grimm's Fairy Tales", unit: 2, words: ["courage", "clever"] },
  { day: 39, title: "Escape and Return", book: "Grimm's Fairy Tales", unit: 2, words: ["escape", "treasure"] },
  { day: 40, type: 'assessment', title: "Week 8 Assessment", unit: 2, words: ["gingerbread", "tempting", "wicked", "cage", "courage", "clever", "escape", "treasure"] },
  
  { day: 41, title: "Rapunzel's Tower", book: "Grimm's Fairy Tales", unit: 2, words: ["tower", "imprisoned"] },
  { day: 42, title: "The Long Braid", book: "Grimm's Fairy Tales", unit: 2, words: ["braid", "golden"] },
  { day: 43, title: "The Prince Visits", book: "Grimm's Fairy Tales", unit: 2, words: ["prince", "enchanted"] },
  { day: 44, title: "The Witch's Discovery", book: "Grimm's Fairy Tales", unit: 2, words: ["discover", "banish"] },
  { day: 45, type: 'assessment', title: "Week 9 Assessment", unit: 2, words: ["tower", "imprisoned", "braid", "golden", "prince", "enchanted", "discover", "banish"] },
  
  { day: 46, title: "Reunion in the Wilderness", book: "Grimm's Fairy Tales", unit: 2, words: ["wilderness", "restore"] },
  { day: 47, title: "Comparing Fairy Tales", book: "Grimm's Fairy Tales", unit: 2, words: ["compare", "theme"] },
  { day: 48, title: "Moral Lessons", book: "Grimm's Fairy Tales", unit: 2, words: ["moral", "virtue"] },
  { day: 49, title: "Character Analysis", book: "Grimm's Fairy Tales", unit: 2, words: ["character", "trait"] },
  { day: 50, type: 'assessment', title: "Unit 2 Final Assessment", unit: 2, words: ["wilderness", "restore", "compare", "theme", "moral", "virtue", "character", "trait"] },
  
  // UNIT 3: Hans Christian Andersen Tales (Days 51-80)
  { day: 51, title: "The Ugly Duckling Hatches", book: "Hans Christian Andersen Tales", unit: 3, words: ["duckling", "hatch"] },
  { day: 52, title: "Feeling Different", book: "Hans Christian Andersen Tales", unit: 3, words: ["different", "teased"] },
  { day: 53, title: "Running Away", book: "Hans Christian Andersen Tales", unit: 3, words: ["flee", "lonely"] },
  { day: 54, title: "The Harsh Winter", book: "Hans Christian Andersen Tales", unit: 3, words: ["harsh", "survive"] },
  { day: 55, type: 'assessment', title: "Week 11 Assessment", unit: 3, words: ["duckling", "hatch", "different", "teased", "flee", "lonely", "harsh", "survive"] },
  
  { day: 56, title: "Spring Arrives", book: "Hans Christian Andersen Tales", unit: 3, words: ["spring", "blossom"] },
  { day: 57, title: "The Beautiful Swan", book: "Hans Christian Andersen Tales", unit: 3, words: ["swan", "graceful"] },
  { day: 58, title: "Acceptance", book: "Hans Christian Andersen Tales", unit: 3, words: ["accept", "belong"] },
  { day: 59, title: "The Little Match Girl", book: "Hans Christian Andersen Tales", unit: 3, words: ["matches", "shivering"] },
  { day: 60, type: 'assessment', title: "Week 12 Assessment", unit: 3, words: ["spring", "blossom", "swan", "graceful", "accept", "belong", "matches", "shivering"] },
  
  { day: 61, title: "Visions in the Flames", book: "Hans Christian Andersen Tales", unit: 3, words: ["vision", "warmth"] },
  { day: 62, title: "The Grandmother", book: "Hans Christian Andersen Tales", unit: 3, words: ["grandmother", "comfort"] },
  { day: 63, title: "A Peaceful End", book: "Hans Christian Andersen Tales", unit: 3, words: ["peaceful", "ascend"] },
  { day: 64, title: "The Snow Queen Begins", book: "Hans Christian Andersen Tales", unit: 3, words: ["splinter", "mirror"] },
  { day: 65, type: 'assessment', title: "Week 13 Assessment", unit: 3, words: ["vision", "warmth", "grandmother", "comfort", "peaceful", "ascend", "splinter", "mirror"] },
  
  { day: 66, title: "Kai is Captured", book: "Hans Christian Andersen Tales", unit: 3, words: ["captured", "frozen"] },
  { day: 67, title: "Gerda's Quest", book: "Hans Christian Andersen Tales", unit: 3, words: ["quest", "determined"] },
  { day: 68, title: "The Enchanted Garden", book: "Hans Christian Andersen Tales", unit: 3, words: ["garden", "bewitch"] },
  { day: 69, title: "The Robber Girl", book: "Hans Christian Andersen Tales", unit: 3, words: ["robber", "fierce"] },
  { day: 70, type: 'assessment', title: "Week 14 Assessment", unit: 3, words: ["captured", "frozen", "quest", "determined", "garden", "bewitch", "robber", "fierce"] },
  
  { day: 71, title: "Journey to the North", book: "Hans Christian Andersen Tales", unit: 3, words: ["journey", "tundra"] },
  { day: 72, title: "The Ice Palace", book: "Hans Christian Andersen Tales", unit: 3, words: ["palace", "crystal"] },
  { day: 73, title: "The Frozen Heart", book: "Hans Christian Andersen Tales", unit: 3, words: ["frozen", "puzzle"] },
  { day: 74, title: "Tears of Love", book: "Hans Christian Andersen Tales", unit: 3, words: ["tears", "melt"] },
  { day: 75, type: 'assessment', title: "Week 15 Assessment", unit: 3, words: ["journey", "tundra", "palace", "crystal", "frozen", "puzzle", "tears", "melt"] },
  
  { day: 76, title: "Kai is Freed", book: "Hans Christian Andersen Tales", unit: 3, words: ["freed", "rejoice"] },
  { day: 77, title: "The Journey Home", book: "Hans Christian Andersen Tales", unit: 3, words: ["homeward", "grateful"] },
  { day: 78, title: "Andersen's Themes", book: "Hans Christian Andersen Tales", unit: 3, words: ["compassion", "sacrifice"] },
  { day: 79, title: "Emotional Depth", book: "Hans Christian Andersen Tales", unit: 3, words: ["emotion", "depth"] },
  { day: 80, type: 'assessment', title: "Unit 3 Final Assessment", unit: 3, words: ["freed", "rejoice", "homeward", "grateful", "compassion", "sacrifice", "emotion", "depth"] },
  
  // UNIT 4: Heidi (Days 81-120)
  { day: 81, title: "Heidi Arrives in the Alps", book: "Heidi", unit: 4, words: ["mountain", "alpine"] },
  { day: 82, title: "The Grandfather", book: "Heidi", unit: 4, words: ["gruff", "hermit"] },
  { day: 83, title: "The Goat Herder", book: "Heidi", unit: 4, words: ["shepherd", "pasture"] },
  { day: 84, title: "Life on the Mountain", book: "Heidi", unit: 4, words: ["peaceful", "simplicity"] },
  { day: 85, type: 'assessment', title: "Week 17 Assessment", unit: 4, words: ["mountain", "alpine", "gruff", "hermit", "shepherd", "pasture", "peaceful", "simplicity"] },
  
  { day: 86, title: "The Village Below", book: "Heidi", unit: 4, words: ["village", "valley"] },
  { day: 87, title: "Peter the Goat Boy", book: "Heidi", unit: 4, words: ["companion", "mischief"] },
  { day: 88, title: "Grandfather's Past", book: "Heidi", unit: 4, words: ["solitary", "regret"] },
  { day: 89, title: "Heidi's Joy", book: "Heidi", unit: 4, words: ["contentment", "delight"] },
  { day: 90, type: 'assessment', title: "Week 18 Assessment", unit: 4, words: ["village", "valley", "companion", "mischief", "solitary", "regret", "contentment", "delight"] },
  
  { day: 91, title: "Summoned to Frankfurt", book: "Heidi", unit: 4, words: ["summon", "reluctant"] },
  { day: 92, title: "Leaving the Mountains", book: "Heidi", unit: 4, words: ["farewell", "sorrow"] },
  { day: 93, title: "The City Life", book: "Heidi", unit: 4, words: ["refined", "etiquette"] },
  { day: 94, title: "Clara the Invalid", book: "Heidi", unit: 4, words: ["invalid", "wheelchair"] },
  { day: 95, type: 'assessment', title: "Week 19 Assessment", unit: 4, words: ["summon", "reluctant", "farewell", "sorrow", "refined", "etiquette", "invalid", "wheelchair"] },
  
  { day: 96, title: "Learning to Read", book: "Heidi", unit: 4, words: ["lesson", "alphabet"] },
  { day: 97, title: "Homesick", book: "Heidi", unit: 4, words: ["homesick", "yearn"] },
  { day: 98, title: "The Strict Governess", book: "Heidi", unit: 4, words: ["governess", "discipline"] },
  { day: 99, title: "Friendship with Clara", book: "Heidi", unit: 4, words: ["friendship", "kindred"] },
  { day: 100, type: 'assessment', title: "Week 20 Assessment", unit: 4, words: ["lesson", "alphabet", "homesick", "yearn", "governess", "discipline", "friendship", "kindred"] },
  
  { day: 101, title: "The Haunting", book: "Heidi", unit: 4, words: ["haunt", "mystery"] },
  { day: 102, title: "Heidi's Sleepwalking", book: "Heidi", unit: 4, words: ["sleepwalk", "distress"] },
  { day: 103, title: "Return to the Alps", book: "Heidi", unit: 4, words: ["return", "recovery"] },
  { day: 104, title: "Clara Visits", book: "Heidi", unit: 4, words: ["visit", "reunion"] },
  { day: 105, type: 'assessment', title: "Week 21 Assessment", unit: 4, words: ["haunt", "mystery", "sleepwalk", "distress", "return", "recovery", "visit", "reunion"] },
  
  { day: 106, title: "The Healing Power of Nature", book: "Heidi", unit: 4, words: ["healing", "remedy"] },
  { day: 107, title: "Clara Learns to Walk", book: "Heidi", unit: 4, words: ["miracle", "progress"] },
  { day: 108, title: "Peter's Jealousy", book: "Heidi", unit: 4, words: ["jealous", "resentment"] },
  { day: 109, title: "The Wheelchair Incident", book: "Heidi", unit: 4, words: ["incident", "anger"] },
  { day: 110, type: 'assessment', title: "Week 22 Assessment", unit: 4, words: ["healing", "remedy", "miracle", "progress", "jealous", "resentment", "incident", "anger"] },
  
  { day: 111, title: "Clara Stands Alone", book: "Heidi", unit: 4, words: ["triumph", "independence"] },
  { day: 112, title: "The Doctor's Visit", book: "Heidi", unit: 4, words: ["physician", "examine"] },
  { day: 113, title: "Grandfather's Change", book: "Heidi", unit: 4, words: ["transform", "soften"] },
  { day: 114, title: "Community Acceptance", book: "Heidi", unit: 4, words: ["community", "reconcile"] },
  { day: 115, type: 'assessment', title: "Week 23 Assessment", unit: 4, words: ["triumph", "independence", "physician", "examine", "transform", "soften", "community", "reconcile"] },
  
  { day: 116, title: "The Power of Love", book: "Heidi", unit: 4, words: ["devotion", "nurture"] },
  { day: 117, title: "Nature vs. City", book: "Heidi", unit: 4, words: ["contrast", "setting"] },
  { day: 118, title: "Character Growth", book: "Heidi", unit: 4, words: ["development", "mature"] },
  { day: 119, title: "Themes in Heidi", book: "Heidi", unit: 4, words: ["theme", "symbolism"] },
  { day: 120, type: 'assessment', title: "Unit 4 Final Assessment", unit: 4, words: ["devotion", "nurture", "contrast", "setting", "development", "mature", "theme", "symbolism"] },
  
  // UNIT 5: The Story of Dr. Dolittle (Days 121-155)
  { day: 121, title: "Meet Dr. Dolittle", book: "The Story of Dr. Dolittle", unit: 5, words: ["physician", "peculiar"] },
  { day: 122, title: "Learning Animal Language", book: "The Story of Dr. Dolittle", unit: 5, words: ["language", "communicate"] },
  { day: 123, title: "Polynesia the Parrot", book: "The Story of Dr. Dolittle", unit: 5, words: ["parrot", "tutor"] },
  { day: 124, title: "The Animal Patients", book: "The Story of Dr. Dolittle", unit: 5, words: ["patient", "ailment"] },
  { day: 125, type: 'assessment', title: "Week 25 Assessment", unit: 5, words: ["physician", "peculiar", "language", "communicate", "parrot", "tutor", "patient", "ailment"] },
  
  { day: 126, title: "The Crocodile's Toothache", book: "The Story of Dr. Dolittle", unit: 5, words: ["crocodile", "dentist"] },
  { day: 127, title: "The Journey to Africa", book: "The Story of Dr. Dolittle", unit: 5, words: ["voyage", "expedition"] },
  { day: 128, title: "The Monkey Epidemic", book: "The Story of Dr. Dolittle", unit: 5, words: ["epidemic", "cure"] },
  { day: 129, title: "Crossing the Ocean", book: "The Story of Dr. Dolittle", unit: 5, words: ["navigate", "voyage"] },
  { day: 130, type: 'assessment', title: "Week 26 Assessment", unit: 5, words: ["crocodile", "dentist", "voyage", "expedition", "epidemic", "cure", "navigate", "voyage"] },
  
  { day: 131, title: "The Pushmi-Pullyu", book: "The Story of Dr. Dolittle", unit: 5, words: ["rare", "peculiar"] },
  { day: 132, title: "Captured by Pirates", book: "The Story of Dr. Dolittle", unit: 5, words: ["pirate", "captive"] },
  { day: 133, title: "The Great Escape", book: "The Story of Dr. Dolittle", unit: 5, words: ["escape", "clever"] },
  { day: 134, title: "The Return Journey", book: "The Story of Dr. Dolittle", unit: 5, words: ["homebound", "triumphant"] },
  { day: 135, type: 'assessment', title: "Week 27 Assessment", unit: 5, words: ["rare", "peculiar", "pirate", "captive", "escape", "clever", "homebound", "triumphant"] },
  
  { day: 136, title: "The Animal Family", book: "The Story of Dr. Dolittle", unit: 5, words: ["menagerie", "household"] },
  { day: 137, title: "Helping All Creatures", book: "The Story of Dr. Dolittle", unit: 5, words: ["compassion", "universal"] },
  { day: 138, title: "Problem-Solving Adventures", book: "The Story of Dr. Dolittle", unit: 5, words: ["solution", "inventive"] },
  { day: 139, title: "The Value of Communication", book: "The Story of Dr. Dolittle", unit: 5, words: ["understanding", "bridge"] },
  { day: 140, type: 'assessment', title: "Week 28 Assessment", unit: 5, words: ["menagerie", "household", "compassion", "universal", "solution", "inventive", "understanding", "bridge"] },
  
  { day: 141, title: "Animal Characters", book: "The Story of Dr. Dolittle", unit: 5, words: ["personality", "distinct"] },
  { day: 142, title: "Imagination and Adventure", book: "The Story of Dr. Dolittle", unit: 5, words: ["imaginative", "whimsical"] },
  { day: 143, title: "Kindness to Animals", book: "The Story of Dr. Dolittle", unit: 5, words: ["humane", "respect"] },
  { day: 144, title: "The Doctor's Legacy", book: "The Story of Dr. Dolittle", unit: 5, words: ["legacy", "inspire"] },
  { day: 145, type: 'assessment', title: "Week 29 Assessment", unit: 5, words: ["personality", "distinct", "imaginative", "whimsical", "humane", "respect", "legacy", "inspire"] },
  
  { day: 146, title: "Comparing Stories", book: "The Story of Dr. Dolittle", unit: 5, words: ["analyze", "contrast"] },
  { day: 147, title: "Plot Structure", book: "The Story of Dr. Dolittle", unit: 5, words: ["plot", "climax"] },
  { day: 148, title: "Character Motivation", book: "The Story of Dr. Dolittle", unit: 5, words: ["motivation", "intention"] },
  { day: 149, title: "Writing Our Own Adventure", book: "The Story of Dr. Dolittle", unit: 5, words: ["narrative", "creative"] },
  { day: 150, type: 'assessment', title: "Week 30 Assessment", unit: 5, words: ["analyze", "contrast", "plot", "climax", "motivation", "intention", "narrative", "creative"] },
  
  { day: 151, title: "Fictional vs. Real Animals", book: "The Story of Dr. Dolittle", unit: 5, words: ["fiction", "realistic"] },
  { day: 152, title: "The Power of Friendship", book: "The Story of Dr. Dolittle", unit: 5, words: ["loyalty", "bond"] },
  { day: 153, title: "Overcoming Obstacles", book: "The Story of Dr. Dolittle", unit: 5, words: ["obstacle", "persevere"] },
  { day: 154, title: "The Importance of Empathy", book: "The Story of Dr. Dolittle", unit: 5, words: ["empathy", "perspective"] },
  { day: 155, type: 'assessment', title: "Unit 5 Final Assessment", unit: 5, words: ["fiction", "realistic", "loyalty", "bond", "obstacle", "persevere", "empathy", "perspective"] },
  
  // UNIT 6: Robinson Crusoe & Year Review (Days 156-180)
  { day: 156, title: "The Shipwreck", book: "Robinson Crusoe", unit: 6, words: ["shipwreck", "stranded"] },
  { day: 157, title: "Survival Begins", book: "Robinson Crusoe", unit: 6, words: ["survival", "resourceful"] },
  { day: 158, title: "Building a Shelter", book: "Robinson Crusoe", unit: 6, words: ["shelter", "construct"] },
  { day: 159, title: "Finding Food", book: "Robinson Crusoe", unit: 6, words: ["forage", "provision"] },
  { day: 160, type: 'assessment', title: "Week 32 Assessment", unit: 6, words: ["shipwreck", "stranded", "survival", "resourceful", "shelter", "construct", "forage", "provision"] },
  
  { day: 161, title: "The Island Home", book: "Robinson Crusoe", unit: 6, words: ["island", "isolated"] },
  { day: 162, title: "Keeping Track of Time", book: "Robinson Crusoe", unit: 6, words: ["calendar", "routine"] },
  { day: 163, title: "The Footprint", book: "Robinson Crusoe", unit: 6, words: ["footprint", "mysterious"] },
  { day: 164, title: "Fear and Courage", book: "Robinson Crusoe", unit: 6, words: ["courage", "fear"] },
  { day: 165, type: 'assessment', title: "Week 33 Assessment", unit: 6, words: ["island", "isolated", "calendar", "routine", "footprint", "mysterious", "courage", "fear"] },
  
  { day: 166, title: "Meeting Friday", book: "Robinson Crusoe", unit: 6, words: ["companion", "rescue"] },
  { day: 167, title: "Teaching and Learning", book: "Robinson Crusoe", unit: 6, words: ["educate", "culture"] },
  { day: 168, title: "Working Together", book: "Robinson Crusoe", unit: 6, words: ["cooperation", "teamwork"] },
  { day: 169, title: "The Rescue Ship", book: "Robinson Crusoe", unit: 6, words: ["rescue", "civilization"] },
  { day: 170, type: 'assessment', title: "Week 34 Assessment", unit: 6, words: ["companion", "rescue", "educate", "culture", "cooperation", "teamwork", "rescue", "civilization"] },
  
  { day: 171, title: "Comparing All Stories", book: "Year Review", unit: 6, words: ["compare", "evaluate"] },
  { day: 172, title: "Favorite Characters", book: "Year Review", unit: 6, words: ["character", "memorable"] },
  { day: 173, title: "Lessons Learned", book: "Year Review", unit: 6, words: ["lesson", "wisdom"] },
  { day: 174, title: "Writing a Book Review", book: "Year Review", unit: 6, words: ["review", "opinion"] },
  { day: 175, type: 'assessment', title: "Week 35 Assessment", unit: 6, words: ["compare", "evaluate", "character", "memorable", "lesson", "wisdom", "review", "opinion"] },
  
  { day: 176, title: "Literature Discussion", book: "Year Review", unit: 6, words: ["discuss", "interpret"] },
  { day: 177, title: "Final Reading Project", book: "Year Review", unit: 6, words: ["project", "presentation"] },
  { day: 178, title: "Celebrating Growth", book: "Year Review", unit: 6, words: ["growth", "achieve"] },
  { day: 179, title: "Looking Forward", book: "Year Review", unit: 6, words: ["future", "continue"] },
  { day: 180, type: 'assessment', title: "Final Year Assessment", unit: 6, words: ["discuss", "interpret", "project", "presentation", "growth", "achieve", "future", "continue"] },
];

function buildHTML(lesson) {
  const isAssessment = lesson.type === 'assessment';
  const bgColor = '#E8F5F3'; // Light teal background
  const accentColor = '#305853'; // Deep teal
  const goldenColor = '#E8B84B'; // Golden amber
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lesson.day}: ${lesson.title} - BedrockELA</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, ${bgColor} 0%, #f0f9f7 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .lesson-container {
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(48, 88, 83, 0.15);
            max-width: 900px;
            width: 100%;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, ${accentColor} 0%, #4a7872 100%);
            color: white;
            padding: 32px;
            text-align: center;
        }
        .day-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        h1 {
            font-size: 32px;
            margin-bottom: 8px;
            font-weight: 700;
        }
        .book-title {
            font-size: 16px;
            opacity: 0.9;
            font-style: italic;
        }
        .content {
            padding: 40px;
        }
        .page {
            display: none;
            animation: fadeIn 0.3s ease-in;
        }
        .page.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .vocab-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 24px 0;
        }
        .vocab-card {
            background: ${bgColor};
            padding: 20px;
            border-radius: 16px;
            border: 2px solid ${accentColor}20;
        }
        .vocab-word {
            font-size: 24px;
            font-weight: 700;
            color: ${accentColor};
            margin-bottom: 8px;
        }
        .vocab-definition {
            color: #666;
            line-height: 1.6;
        }
        .story-text {
            background: #f8f9fa;
            padding: 28px;
            border-radius: 16px;
            border-left: 4px solid ${goldenColor};
            line-height: 1.8;
            font-size: 18px;
            color: #333;
            margin: 24px 0;
        }
        .question {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin: 16px 0;
            border: 2px solid ${bgColor};
        }
        .question-text {
            font-size: 18px;
            font-weight: 600;
            color: ${accentColor};
            margin-bottom: 12px;
        }
        .answer-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            font-family: inherit;
            transition: border-color 0.2s;
        }
        .answer-input:focus {
            outline: none;
            border-color: ${accentColor};
        }
        .nav-buttons {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            margin-top: 32px;
            padding-top: 32px;
            border-top: 2px solid ${bgColor};
        }
        button {
            padding: 14px 32px;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }
        .btn-primary {
            background: linear-gradient(135deg, ${accentColor} 0%, #4a7872 100%);
            color: white;
            flex: 1;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(48, 88, 83, 0.3);
        }
        .btn-secondary {
            background: ${bgColor};
            color: ${accentColor};
        }
        .btn-secondary:hover {
            background: #d1e8e4;
        }
        .btn-secondary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .progress-bar {
            background: ${bgColor};
            height: 8px;
            border-radius: 4px;
            margin: 20px 0;
            overflow: hidden;
        }
        .progress-fill {
            background: linear-gradient(90deg, ${accentColor} 0%, ${goldenColor} 100%);
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        .page-indicator {
            text-align: center;
            color: #666;
            font-size: 14px;
            margin-top: 12px;
        }
        .completion-message {
            text-align: center;
            padding: 40px;
        }
        .completion-message h2 {
            color: ${accentColor};
            font-size: 36px;
            margin-bottom: 16px;
        }
        .completion-icon {
            font-size: 72px;
            margin-bottom: 20px;
        }
        h2 {
            color: ${accentColor};
            font-size: 28px;
            margin-bottom: 20px;
        }
        h3 {
            color: ${accentColor};
            font-size: 22px;
            margin: 24px 0 16px;
        }
        p {
            line-height: 1.8;
            color: #444;
            margin-bottom: 16px;
        }
        .assessment-grid {
            display: grid;
            gap: 16px;
        }
        .assessment-item {
            background: ${bgColor};
            padding: 16px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .word-number {
            background: ${accentColor};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
        }
        .word-to-define {
            font-size: 20px;
            font-weight: 700;
            color: ${accentColor};
        }
    </style>
</head>
<body>
    <div class="lesson-container">
        <div class="header">
            <div class="day-badge">Day ${lesson.day} ${isAssessment ? '• Assessment' : ''}</div>
            <h1>${lesson.title}</h1>
            <div class="book-title">${lesson.book}</div>
        </div>
        
        <div class="content">
            <div class="progress-bar">
                <div class="progress-fill" id="progressBar" style="width: 0%"></div>
            </div>
            <div class="page-indicator" id="pageIndicator">Page 1 of 7</div>
            
            ${isAssessment ? buildAssessmentPages(lesson) : buildRegularPages(lesson)}
            
            <div class="nav-buttons">
                <button class="btn-secondary" id="prevBtn" onclick="prevPage()" disabled>← Previous</button>
                <button class="btn-primary" id="nextBtn" onclick="nextPage()">Next →</button>
            </div>
        </div>
    </div>

    <script>
        let currentPage = 0;
        const totalPages = ${isAssessment ? 6 : 7};
        
        function updatePage() {
            document.querySelectorAll('.page').forEach((page, index) => {
                page.classList.toggle('active', index === currentPage);
            });
            
            document.getElementById('prevBtn').disabled = currentPage === 0;
            document.getElementById('nextBtn').textContent = 
                currentPage === totalPages - 1 ? 'Complete Lesson ✓' : 'Next →';
            
            const progress = ((currentPage + 1) / totalPages) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('pageIndicator').textContent = 
                \`Page \${currentPage + 1} of \${totalPages}\`;
                
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function nextPage() {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updatePage();
            } else {
                window.location.href = 'student-dashboard.html';
            }
        }
        
        function prevPage() {
            if (currentPage > 0) {
                currentPage--;
                updatePage();
            }
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevPage();
            if (e.key === 'ArrowRight') nextPage();
        });
        
        updatePage();
    </script>
</body>
</html>`;
}

function buildRegularPages(lesson) {
  const [word1, word2] = lesson.words;
  
  return `
    <!-- Page 1: Title & Introduction -->
    <div class="page active">
        <h2>📖 Welcome to Today's Lesson</h2>
        <p>Today we're reading from <strong>${lesson.book}</strong>.</p>
        <p>Get ready to learn two new vocabulary words and enjoy a wonderful story!</p>
        <div style="background: #f0f9f7; padding: 24px; border-radius: 12px; margin-top: 24px;">
            <h3 style="margin-top: 0;">Today's Words:</h3>
            <p style="font-size: 24px; font-weight: 700; color: #305853;">${word1} • ${word2}</p>
        </div>
    </div>

    <!-- Page 2: Vocabulary Word 1 -->
    <div class="page">
        <h2>📚 Vocabulary: ${word1}</h2>
        <div class="vocab-card" style="margin: 24px 0;">
            <div class="vocab-word">${word1}</div>
            <div class="vocab-definition">
                <p><strong>Definition:</strong> [Teacher will explain this word]</p>
                <p><strong>Example:</strong> This word appears in today's story from ${lesson.book}.</p>
            </div>
        </div>
        <p>Listen carefully as we read. Can you find this word in the story?</p>
    </div>

    <!-- Page 3: Vocabulary Word 2 -->
    <div class="page">
        <h2>📚 Vocabulary: ${word2}</h2>
        <div class="vocab-card" style="margin: 24px 0;">
            <div class="vocab-word">${word2}</div>
            <div class="vocab-definition">
                <p><strong>Definition:</strong> [Teacher will explain this word]</p>
                <p><strong>Example:</strong> This word also appears in today's story.</p>
            </div>
        </div>
        <p>Pay attention to how this word is used when we read!</p>
    </div>

    <!-- Page 4: Reading -->
    <div class="page">
        <h2>📖 Today's Reading</h2>
        <div class="story-text">
            <p><em>From <strong>${lesson.book}</strong>:</em></p>
            <p>[Teacher will read aloud from ${lesson.book}. Follow along and listen for our vocabulary words: <strong>${word1}</strong> and <strong>${word2}</strong>.]</p>
            <p style="margin-top: 20px; font-style: italic; color: #666;">This passage comes from the classic story "${lesson.book}" and helps us understand the theme of ${lesson.title}.</p>
        </div>
    </div>

    <!-- Page 5: Comprehension -->
    <div class="page">
        <h2>🤔 Comprehension Questions</h2>
        <div class="question">
            <div class="question-text">1. What happened in today's reading?</div>
            <textarea class="answer-input" rows="3" placeholder="Type your answer here..."></textarea>
        </div>
        <div class="question">
            <div class="question-text">2. How did you see our vocabulary words used in the story?</div>
            <textarea class="answer-input" rows="3" placeholder="Type your answer here..."></textarea>
        </div>
    </div>

    <!-- Page 6: Journal Response -->
    <div class="page">
        <h2>✍️ Journal Response</h2>
        <div class="question">
            <div class="question-text">Write about your favorite part of today's story. Use at least one of our vocabulary words: <strong>${word1}</strong> or <strong>${word2}</strong>.</div>
            <textarea class="answer-input" rows="6" placeholder="Dear Journal,&#10;&#10;Today I read about..."></textarea>
        </div>
    </div>

    <!-- Page 7: Completion -->
    <div class="page">
        <div class="completion-message">
            <div class="completion-icon">🎉</div>
            <h2>Great Job!</h2>
            <p>You completed Day ${lesson.day}!</p>
            <p style="margin-top: 20px;">You learned these words today:</p>
            <div style="font-size: 24px; font-weight: 700; color: #305853; margin: 16px 0;">
                ${word1} • ${word2}
            </div>
            <p style="margin-top: 24px; color: #666;">Click "Complete Lesson" to return to your dashboard.</p>
        </div>
    </div>
  `;
}

function buildAssessmentPages(lesson) {
  const words = lesson.words;
  
  return `
    <!-- Page 1: Assessment Introduction -->
    <div class="page active">
        <h2>📝 Assessment Day</h2>
        <p>Today you'll show what you've learned this week!</p>
        <div style="background: #f0f9f7; padding: 24px; border-radius: 12px; margin-top: 24px;">
            <h3 style="margin-top: 0;">This Week's Words:</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 16px;">
                ${words.map(word => `<div style="background: white; padding: 12px; border-radius: 8px; font-weight: 600; color: #305853;">${word}</div>`).join('')}
            </div>
        </div>
        <p style="margin-top: 24px;">Take your time and do your best!</p>
    </div>

    <!-- Page 2-5: Vocabulary Assessment (2 words per page) -->
    ${[0, 2, 4, 6].map((startIdx, pageNum) => `
    <div class="page">
        <h2>📚 Vocabulary Check - Part ${pageNum + 1}</h2>
        <div class="assessment-grid">
            ${words.slice(startIdx, startIdx + 2).map((word, idx) => `
            <div class="assessment-item">
                <div class="word-number">${startIdx + idx + 1}</div>
                <div style="flex: 1;">
                    <div class="word-to-define">${word}</div>
                    <textarea class="answer-input" rows="2" placeholder="Write the definition..." style="margin-top: 8px;"></textarea>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
    `).join('')}

    <!-- Page 6: Completion -->
    <div class="page">
        <div class="completion-message">
            <div class="completion-icon">⭐</div>
            <h2>Assessment Complete!</h2>
            <p>You did it! You completed this week's assessment.</p>
            <p style="margin-top: 20px;">You were tested on these ${words.length} words:</p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; max-width: 400px; margin: 20px auto;">
                ${words.map(word => `<div style="background: #E8F5F3; padding: 8px; border-radius: 8px; font-weight: 600; color: #305853;">${word}</div>`).join('')}
            </div>
            <p style="margin-top: 24px; color: #666;">Great work this week!</p>
        </div>
    </div>
  `;
}

console.log('🚀 BUILDING COMPLETE 3RD GRADE - MODERN STYLE - ALL 180 LESSONS!\n');
console.log('This will take a minute...\n');

let count = 0;
lessons.forEach(lesson => {
  const html = buildHTML(lesson);
  const filename = `3rd-grade-lesson-${lesson.day}-REVISED.html`;
  fs.writeFileSync(filename, html);
  count++;
  
  if (count % 30 === 0) {
    console.log(`✅ Completed ${count} lessons...`);
  }
});

console.log(`\n✅ Completed ${count} lessons...`);
console.log('\n🎉 ALL 180 LESSONS COMPLETE! 🎓\n');
console.log('📚 FULL YEAR CURRICULUM BREAKDOWN:');
console.log('  • Unit 1 (Days 1-20): The Velveteen Rabbit');
console.log('  • Unit 2 (Days 21-50): Grimm\'s Fairy Tales');
console.log('  • Unit 3 (Days 51-80): Hans Christian Andersen Tales');
console.log('  • Unit 4 (Days 81-120): Heidi');
console.log('  • Unit 5 (Days 121-155): The Story of Dr. Dolittle');
console.log('  • Unit 6 (Days 156-180): Robinson Crusoe & Year Review\n');
console.log('✅ Modern 1st grade style with bright colors');
console.log('✅ 7 pages per lesson (6 for assessments)');
console.log('✅ 2 words/day, 8-word assessments');
console.log('✅ Light teal backgrounds\n');
console.log('🚀 3rd grade curriculum ready to deploy!');
