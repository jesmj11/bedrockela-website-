const fs = require('fs');

// Complete 1st Grade Lessons 31-180
// Following the systematic phonics scope & sequence

const lessons = [
  // UNIT 1 COMPLETION - Weeks 7-8: Consonant Digraphs (Days 31-40)
  { num: 31, week: 7, day: 1, title: "The SH Sound", focus: "Consonant digraph 'sh'", words: ["ship", "shop", "fish", "wish", "dish", "rush"], sight: ["the", "and"] },
  { num: 32, week: 7, day: 2, title: "The CH Sound", focus: "Consonant digraph 'ch'", words: ["chip", "chop", "chat", "much", "such", "lunch"], sight: ["to", "go"] },
  { num: 33, week: 7, day: 3, title: "SH and CH Together", focus: "Practice sh/ch", words: ["chess", "chill", "shell", "shack", "check", "shift"], sight: ["has", "for"] },
  { num: 34, week: 7, day: 4, title: "The TH Sound", focus: "Consonant digraph 'th'", words: ["that", "this", "then", "with", "bath", "path"], sight: ["you", "see"] },
  { num: 35, week: 7, day: 5, title: "Week 7 Assessment", focus: "Review sh, ch, th", words: ["shop", "chip", "this", "fish", "much", "with"], sight: ["review"], assessment: true },
  
  { num: 36, week: 8, day: 1, title: "The WH Sound", focus: "Consonant digraph 'wh'", words: ["when", "what", "whip", "which", "while", "wheel"], sight: ["was", "my"] },
  { num: 37, week: 8, day: 2, title: "WH and TH Practice", focus: "Practice wh/th", words: ["white", "whack", "think", "thick", "thank", "thump"], sight: ["said", "come"] },
  { num: 38, week: 8, day: 3, title: "All Digraphs Together", focus: "Mix sh, ch, th, wh", words: ["shop", "chat", "that", "when", "fish", "which"], sight: ["here", "look"] },
  { num: 39, week: 8, day: 4, title: "Digraph Stories", focus: "Read with digraphs", words: ["fish shop", "chill chat", "think when", "much wish"], sight: ["have", "like"] },
  { num: 40, week: 8, day: 5, title: "Week 8 Assessment", focus: "All digraphs", words: ["ship", "chip", "this", "when", "wish", "lunch"], sight: ["review"], assessment: true },
  
  // UNIT 2: Blends & Digraphs (Days 41-72)
  // Weeks 9-10: Beginning Blends (bl, cl, fl, gl, pl, sl)
  { num: 41, week: 9, day: 1, title: "BL Blend", focus: "Beginning blend 'bl'", words: ["black", "blob", "blot", "blend", "blank", "blink"], sight: ["this", "with"] },
  { num: 42, week: 9, day: 2, title: "CL Blend", focus: "Beginning blend 'cl'", words: ["clap", "clip", "clam", "class", "clock", "cluck"], sight: ["they", "from"] },
  { num: 43, week: 9, day: 3, title: "FL Blend", focus: "Beginning blend 'fl'", words: ["flag", "flip", "flat", "flash", "flop", "flock"], sight: ["your", "what"] },
  { num: 44, week: 9, day: 4, title: "BL, CL, FL Practice", focus: "Mix bl/cl/fl", words: ["black flag", "clap clip", "flat flip", "clock flash"], sight: ["when", "can"] },
  { num: 45, week: 9, day: 5, title: "Week 9 Assessment", focus: "bl, cl, fl blends", words: ["black", "clap", "flag", "blob", "clip", "flash"], sight: ["review"], assessment: true },
  
  { num: 46, week: 10, day: 1, title: "GL Blend", focus: "Beginning blend 'gl'", words: ["glad", "glob", "glum", "glass", "gloss", "glen"], sight: ["all", "will"] },
  { num: 47, week: 10, day: 2, title: "PL Blend", focus: "Beginning blend 'pl'", words: ["plan", "plot", "plum", "plus", "plank", "plug"], sight: ["up", "down"] },
  { num: 48, week: 10, day: 3, title: "SL Blend", focus: "Beginning blend 'sl'", words: ["sled", "slip", "slap", "slam", "slick", "slot"], sight: ["out", "in"] },
  { num: 49, week: 10, day: 4, title: "GL, PL, SL Practice", focus: "Mix gl/pl/sl", words: ["glad sled", "plan plot", "glass slip", "plum slam"], sight: ["on", "at"] },
  { num: 50, week: 10, day: 5, title: "Week 10 Assessment", focus: "gl, pl, sl blends", words: ["glad", "plan", "sled", "glass", "plug", "slip"], sight: ["review"], assessment: true },
  
  // Weeks 11-12: More Beginning Blends (br, cr, dr, fr, gr, pr, tr)
  { num: 51, week: 11, day: 1, title: "BR Blend", focus: "Beginning blend 'br'", words: ["brick", "brag", "brim", "brush", "branch", "brunch"], sight: ["be", "are"] },
  { num: 52, week: 11, day: 2, title: "CR Blend", focus: "Beginning blend 'cr'", words: ["crab", "crib", "crop", "crash", "crack", "crunch"], sight: ["were", "there"] },
  { num: 53, week: 11, day: 3, title: "DR Blend", focus: "Beginning blend 'dr'", words: ["drop", "drum", "drag", "drip", "drill", "dress"], sight: ["some", "would"] },
  { num: 54, week: 11, day: 4, title: "BR, CR, DR Practice", focus: "Mix br/cr/dr", words: ["brick crab", "brush crash", "drop drum", "drip dress"], sight: ["could", "about"] },
  { num: 55, week: 11, day: 5, title: "Week 11 Assessment", focus: "br, cr, dr blends", words: ["brick", "crab", "drop", "brush", "crash", "drip"], sight: ["review"], assessment: true },
  
  { num: 56, week: 12, day: 1, title: "FR Blend", focus: "Beginning blend 'fr'", words: ["frog", "from", "fresh", "frost", "fried", "French"], sight: ["many", "before"] },
  { num: 57, week: 12, day: 2, title: "GR Blend", focus: "Beginning blend 'gr'", words: ["grass", "grab", "grill", "grand", "grunt", "grip"], sight: ["other", "into"] },
  { num: 58, week: 12, day: 3, title: "PR & TR Blends", focus: "Beginning blends 'pr/tr'", words: ["press", "prim", "trip", "trap", "truck", "track"], sight: ["just", "over"] },
  { num: 59, week: 12, day: 4, title: "FR, GR, PR, TR Practice", focus: "Mix fr/gr/pr/tr", words: ["frog grass", "grab press", "trip truck", "fresh trap"], sight: ["very", "want"] },
  { num: 60, week: 12, day: 5, title: "Week 12 Assessment", focus: "fr, gr, pr, tr blends", words: ["frog", "grass", "press", "trip", "fresh", "truck"], sight: ["review"], assessment: true },
  
  // Weeks 13-14: Ending Blends (-nd, -nk, -st, -sk, -mp, -ft, -lt)
  { num: 61, week: 13, day: 1, title: "ND Ending", focus: "Ending blend '-nd'", words: ["hand", "band", "sand", "land", "send", "bend"], sight: ["make", "take"] },
  { num: 62, week: 13, day: 2, title: "NK Ending", focus: "Ending blend '-nk'", words: ["tank", "bank", "pink", "think", "drink", "skunk"], sight: ["time", "day"] },
  { num: 63, week: 13, day: 3, title: "ST Ending", focus: "Ending blend '-st'", words: ["fast", "last", "past", "best", "rest", "test"], sight: ["way", "little"] },
  { num: 64, week: 13, day: 4, title: "ND, NK, ST Practice", focus: "Mix -nd/-nk/-st", words: ["hand tank", "think fast", "sand bank", "best land"], sight: ["people", "water"] },
  { num: 65, week: 13, day: 5, title: "Week 13 Assessment", focus: "nd, nk, st endings", words: ["hand", "tank", "fast", "send", "pink", "rest"], sight: ["review"], assessment: true },
  
  { num: 66, week: 14, day: 1, title: "SK Ending", focus: "Ending blend '-sk'", words: ["mask", "task", "desk", "disk", "dusk", "tusk"], sight: ["find", "long"] },
  { num: 67, week: 14, day: 2, title: "MP Ending", focus: "Ending blend '-mp'", words: ["jump", "bump", "pump", "lamp", "camp", "damp"], sight: ["part", "call"] },
  { num: 68, week: 14, day: 3, title: "FT & LT Endings", focus: "Ending blends '-ft/-lt'", words: ["left", "gift", "soft", "melt", "belt", "felt"], sight: ["first", "work"] },
  { num: 69, week: 14, day: 4, title: "SK, MP, FT, LT Practice", focus: "Mix endings", words: ["mask jump", "pump left", "gift belt", "soft task"], sight: ["place", "where"] },
  { num: 70, week: 14, day: 5, title: "Week 14 Assessment", focus: "All ending blends", words: ["mask", "jump", "left", "dusk", "camp", "belt"], sight: ["review"], assessment: true },
  
  { num: 71, day: 1, title: "Unit 2 Review Day 1", focus: "Review all blends", words: ["black", "frog", "hand", "jump", "grass", "left"], sight: ["review all"] },
  { num: 72, day: 2, title: "Unit 2 Assessment", focus: "Blends & Digraphs test", words: ["shop", "flag", "crab", "tank", "gift", "truck"], sight: ["100 words"], assessment: true, unitTest: true },
  
  // UNIT 3: Long Vowels & Silent E (Days 73-108)
  // Weeks 15-16: Long A (a_e)
  { num: 73, week: 15, day: 1, title: "Magic E Introduction", focus: "Silent e makes vowel say its name", words: ["cap/cape", "tap/tape", "mad/made", "at/ate"], sight: ["live", "help"] },
  { num: 74, week: 15, day: 2, title: "Long A Words", focus: "CVCe pattern with 'a_e'", words: ["make", "take", "bake", "cake", "name", "game"], sight: ["hand", "right"] },
  { num: 75, week: 15, day: 3, title: "More Long A", focus: "Practice a_e words", words: ["plate", "brave", "shake", "snake", "grape", "skate"], sight: ["old", "same"] },
  { num: 76, week: 15, day: 4, title: "Long A Stories", focus: "Read with a_e words", words: ["Jake makes cake", "brave snake", "grape plate", "skate game"], sight: ["tell", "boy"] },
  { num: 77, week: 15, day: 5, title: "Week 15 Assessment", focus: "Long A mastery", words: ["make", "cake", "brave", "plate", "name", "shake"], sight: ["review"], assessment: true },
  
  { num: 78, week: 16, day: 1, title: "Long A Practice", focus: "More a_e practice", words: ["cave", "wave", "save", "gate", "late", "date"], sight: ["girl", "show"] },
  { num: 79, week: 16, day: 2, title: "Long A Sentences", focus: "Read a_e sentences", words: ["Jake made a cake", "Brave Dave saves snakes"], sight: ["good", "new"] },
  { num: 80, week: 16, day: 3, title: "Long A Fluency", focus: "Read faster with a_e", words: ["The snake ate grapes at the lake gate"], sight: ["write", "own"] },
  { num: 81, week: 16, day: 4, title: "Long A Writing", focus: "Spell and write a_e", words: ["Make your own cake", "Skate at the lake"], sight: ["read", "word"] },
  { num: 82, week: 16, day: 5, title: "Week 16 Assessment", focus: "a_e complete test", words: ["gate", "late", "cave", "wave", "save", "date"], sight: ["review"], assessment: true },
  
  // Weeks 17-18: Long I (i_e)
  { num: 83, week: 17, day: 1, title: "Long I Introduction", focus: "Silent e with i_e", words: ["bit/bite", "kit/kite", "rid/ride", "dim/dime"], sight: ["sentence", "letter"] },
  { num: 84, week: 17, day: 2, title: "Long I Words", focus: "CVCe pattern with 'i_e'", words: ["bike", "like", "hike", "five", "kite", "time"], sight: ["sound", "number"] },
  { num: 85, week: 17, day: 3, title: "More Long I", focus: "Practice i_e words", words: ["shine", "mine", "nine", "fine", "line", "pine"], sight: ["learn", "world"] },
  { num: 86, week: 17, day: 4, title: "Long I Stories", focus: "Read with i_e words", words: ["Mike likes bikes", "Nine fine kites", "Shine in time"], sight: ["year", "school"] },
  { num: 87, week: 17, day: 5, title: "Week 17 Assessment", focus: "Long I mastery", words: ["bike", "kite", "shine", "five", "nine", "time"], sight: ["review"], assessment: true },
  
  { num: 88, week: 18, day: 1, title: "Long I Practice", focus: "More i_e practice", words: ["slide", "pride", "smile", "while", "white", "quite"], sight: ["city", "tree"] },
  { num: 89, week: 18, day: 2, title: "Long I Sentences", focus: "Read i_e sentences", words: ["Mike likes to ride bikes", "Five white kites shine"], sight: ["farm", "house"] },
  { num: 90, week: 18, day: 3, title: "Long I Fluency", focus: "Read faster with i_e", words: ["I like to bike and hike nine miles at a time"], sight: ["book", "story"] },
  { num: 91, week: 18, day: 4, title: "Long I Writing", focus: "Spell and write i_e", words: ["I like to ride", "Nine kites shine"], sight: ["page", "read"] },
  { num: 92, week: 18, day: 5, title: "Week 18 Assessment", focus: "i_e complete test", words: ["slide", "smile", "while", "white", "pride", "quite"], sight: ["review"], assessment: true },
  
  // Weeks 19-20: Long O (o_e) & Long U (u_e)
  { num: 93, week: 19, day: 1, title: "Long O Introduction", focus: "Silent e with o_e", words: ["hop/hope", "not/note", "rob/robe", "rod/rode"], sight: ["animal", "plant"] },
  { num: 94, week: 19, day: 2, title: "Long O Words", focus: "CVCe pattern with 'o_e'", words: ["home", "bone", "hope", "note", "rope", "stone"], sight: ["color", "number"] },
  { num: 95, week: 19, day: 3, title: "More Long O", focus: "Practice o_e words", words: ["hole", "pole", "stove", "drove", "broke", "smoke"], sight: ["family", "friend"] },
  { num: 96, week: 19, day: 4, title: "Long O Stories", focus: "Read with o_e words", words: ["Hope rode home", "Broke the stone", "Smoke from stove"], sight: ["mother", "father"] },
  { num: 97, week: 19, day: 5, title: "Week 19 Assessment", focus: "Long O mastery", words: ["home", "hope", "rope", "hole", "stone", "drove"], sight: ["review"], assessment: true },
  
  { num: 98, week: 20, day: 1, title: "Long U Introduction", focus: "Silent e with u_e", words: ["cub/cube", "tub/tube", "cut/cute", "us/use"], sight: ["sister", "brother"] },
  { num: 99, week: 20, day: 2, title: "Long U Words", focus: "CVCe pattern with 'u_e'", words: ["cute", "huge", "tube", "June", "mule", "flute"], sight: ["baby", "puppy"] },
  { num: 100, week: 20, day: 3, title: "More Long U", focus: "Practice u_e words", words: ["duke", "dune", "fume", "fuse", "rude", "rule"], sight: ["happy", "funny"] },
  { num: 101, week: 20, day: 4, title: "Long U Stories", focus: "Read with u_e words", words: ["Cute mule in June", "Huge tube flute", "Use the rule"], sight: ["sunny", "rainy"] },
  { num: 102, week: 20, day: 5, title: "Week 20 Assessment", focus: "Long U mastery", words: ["cute", "huge", "tube", "June", "rule", "mule"], sight: ["review"], assessment: true },
  
  { num: 103, day: 1, title: "Long Vowels Review 1", focus: "a_e, i_e review", words: ["make", "bike", "cake", "kite", "name", "nine"], sight: ["review"] },
  { num: 104, day: 2, title: "Long Vowels Review 2", focus: "o_e, u_e review", words: ["home", "cute", "hope", "huge", "bone", "tube"], sight: ["review"] },
  { num: 105, day: 3, title: "Long Vowels Review 3", focus: "All CVCe patterns", words: ["Jake likes cute bikes", "Hope rides home in June"], sight: ["review"] },
  { num: 106, day: 4, title: "Long Vowels Review 4", focus: "Mixed practice", words: ["Make cakes and ride bikes at my home"], sight: ["review"] },
  { num: 107, day: 5, title: "Long Vowels Practice Test", focus: "Pre-assessment", words: ["brave", "shine", "broke", "flute", "grape", "white"], sight: ["review"] },
  { num: 108, day: 6, title: "Unit 3 Assessment", focus: "Long vowels test", words: ["plate", "slide", "stone", "cube", "snake", "time"], sight: ["100 words"], assessment: true, unitTest: true },
  
  // UNIT 4: Vowel Teams & Diphthongs (Days 109-144)
  // Weeks 21-22: AI & AY
  { num: 109, week: 21, day: 1, title: "AI Team Introduction", focus: "Vowel team 'ai' says long A", words: ["rain", "train", "snail", "paint", "wait", "tail"], sight: ["morning", "evening"] },
  { num: 110, week: 21, day: 2, title: "More AI Words", focus: "Practice 'ai' words", words: ["brain", "chain", "grain", "plain", "stain", "strain"], sight: ["night", "day"] },
  { num: 111, week: 21, day: 3, title: "AI Stories", focus: "Read with 'ai'", words: ["Train in rain", "Snail paints tail", "Wait for grain"], sight: ["today", "tomorrow"] },
  { num: 112, week: 21, day: 4, title: "AI Practice", focus: "Spell 'ai' words", words: ["The snail waits for rain on the train"], sight: ["yesterday", "week"] },
  { num: 113, week: 21, day: 5, title: "Week 21 Assessment", focus: "ai team mastery", words: ["rain", "train", "paint", "wait", "brain", "chain"], sight: ["review"], assessment: true },
  
  { num: 114, week: 22, day: 1, title: "AY Team Introduction", focus: "Vowel team 'ay' says long A", words: ["play", "day", "may", "say", "way", "stay"], sight: ["month", "year"] },
  { num: 115, week: 22, day: 2, title: "More AY Words", focus: "Practice 'ay' words", words: ["clay", "gray", "pray", "spray", "tray", "pay"], sight: ["hour", "minute"] },
  { num: 116, week: 22, day: 3, title: "AI vs AY", focus: "Compare ai/ay", words: ["rain/rainy", "play/plays", "paint/painter", "day/daily"], sight: ["second", "time"] },
  { num: 117, week: 22, day: 4, title: "AI & AY Stories", focus: "Mix ai/ay", words: ["Play in rain", "Gray snail stays", "Spray paint tray"], sight: ["clock", "watch"] },
  { num: 118, week: 22, day: 5, title: "Week 22 Assessment", focus: "ay team & ai/ay mix", words: ["play", "say", "clay", "stay", "rain", "wait"], sight: ["review"], assessment: true },
  
  // Weeks 23-24: EA & EE
  { num: 119, week: 23, day: 1, title: "EA Team Introduction", focus: "Vowel team 'ea' says long E", words: ["read", "teach", "beach", "peach", "reach", "each"], sight: ["teacher", "student"] },
  { num: 120, week: 23, day: 2, title: "More EA Words", focus: "Practice 'ea' words", words: ["ream", "clean", "dream", "stream", "team", "steam"], sight: ["desk", "chair"] },
  { num: 121, week: 23, day: 3, title: "EA Stories", focus: "Read with 'ea'", words: ["Team at beach", "Clean stream dream", "Teach each team"], sight: ["pencil", "paper"] },
  { num: 122, week: 23, day: 4, title: "EA Practice", focus: "Spell 'ea' words", words: ["I dream of teaching my team at the beach"], sight: ["book", "notebook"] },
  { num: 123, week: 23, day: 5, title: "Week 23 Assessment", focus: "ea team mastery", words: ["read", "teach", "beach", "clean", "dream", "team"], sight: ["review"], assessment: true },
  
  { num: 124, week: 24, day: 1, title: "EE Team Introduction", focus: "Vowel team 'ee' says long E", words: ["see", "tree", "green", "sleep", "need", "keep"], sight: ["table", "window"] },
  { num: 125, week: 24, day: 2, title: "More EE Words", focus: "Practice 'ee' words", words: ["bee", "feet", "meet", "week", "sweet", "three"], sight: ["door", "floor"] },
  { num: 126, week: 24, day: 3, title: "EA vs EE", focus: "Compare ea/ee", words: ["beach/bee", "team/tree", "read/see", "clean/green"], sight: ["wall", "room"] },
  { num: 127, week: 24, day: 4, title: "EA & EE Stories", focus: "Mix ea/ee", words: ["See green trees", "Team sleeps three weeks", "Meet at beach"], sight: ["house", "school"] },
  { num: 128, week: 24, day: 5, title: "Week 24 Assessment", focus: "ee team & ea/ee mix", words: ["see", "tree", "green", "sleep", "beach", "team"], sight: ["review"], assessment: true },
  
  // Weeks 25-26: OA & OW
  { num: 129, week: 25, day: 1, title: "OA Team Introduction", focus: "Vowel team 'oa' says long O", words: ["boat", "coat", "road", "toad", "load", "soap"], sight: ["water", "river"] },
  { num: 130, week: 25, day: 2, title: "More OA Words", focus: "Practice 'oa' words", words: ["float", "goat", "soak", "coach", "toast", "roast"], sight: ["lake", "ocean"] },
  { num: 131, week: 25, day: 3, title: "OA Stories", focus: "Read with 'oa'", words: ["Boat floats", "Goat eats toast", "Coach on road"], sight: ["boat", "ship"] },
  { num: 132, week: 25, day: 4, title: "OA Practice", focus: "Spell 'oa' words", words: ["The toad floats on a boat down the road"], sight: ["beach", "sand"] },
  { num: 133, week: 25, day: 5, title: "Week 25 Assessment", focus: "oa team mastery", words: ["boat", "coat", "road", "float", "goat", "toast"], sight: ["review"], assessment: true },
  
  { num: 134, week: 26, day: 1, title: "OW Team Introduction", focus: "Vowel team 'ow' says long O", words: ["snow", "grow", "blow", "show", "know", "low"], sight: ["winter", "cold"] },
  { num: 135, week: 26, day: 2, title: "More OW Words", focus: "Practice 'ow' words", words: ["slow", "flow", "glow", "throw", "yellow", "window"], sight: ["ice", "snow"] },
  { num: 136, week: 26, day: 3, title: "OA vs OW", focus: "Compare oa/ow", words: ["boat/snow", "road/grow", "float/blow", "toast/show"], sight: ["hot", "warm"] },
  { num: 137, week: 26, day: 4, title: "OA & OW Stories", focus: "Mix oa/ow", words: ["Boat in snow", "Yellow toad grows", "Blow on toast"], sight: ["cool", "freeze"] },
  { num: 138, week: 26, day: 5, title: "Week 26 Assessment", focus: "ow team & oa/ow mix", words: ["snow", "grow", "show", "boat", "float", "toast"], sight: ["review"], assessment: true },
  
  { num: 139, day: 1, title: "Vowel Teams Review 1", focus: "ai/ay review", words: ["rain", "play", "train", "stay", "paint", "clay"], sight: ["review"] },
  { num: 140, day: 2, title: "Vowel Teams Review 2", focus: "ea/ee review", words: ["beach", "tree", "teach", "green", "dream", "sleep"], sight: ["review"] },
  { num: 141, day: 3, title: "Vowel Teams Review 3", focus: "oa/ow review", words: ["boat", "snow", "float", "grow", "toast", "show"], sight: ["review"] },
  { num: 142, day: 4, title: "Vowel Teams Review 4", focus: "All teams mixed", words: ["Rain on boat", "Green tree grows", "Play in snow"], sight: ["review"] },
  { num: 143, day: 5, title: "Vowel Teams Practice Test", focus: "Pre-assessment", words: ["train", "beach", "snow", "stay", "dream", "float"], sight: ["review"] },
  { num: 144, day: 6, title: "Unit 4 Assessment", focus: "Vowel teams test", words: ["paint", "team", "boat", "play", "green", "show"], sight: ["100 words"], assessment: true, unitTest: true },
  
  // UNIT 5: Advanced Patterns & R-Controlled Vowels (Days 145-180)
  // Weeks 27-28: R-Controlled Vowels
  { num: 145, week: 27, day: 1, title: "AR Introduction", focus: "R-controlled vowel 'ar'", words: ["car", "star", "jar", "park", "dark", "shark"], sight: ["space", "planet"] },
  { num: 146, week: 27, day: 2, title: "More AR Words", focus: "Practice 'ar' words", words: ["barn", "yarn", "card", "hard", "farm", "arm"], sight: ["sun", "moon"] },
  { num: 147, week: 27, day: 3, title: "OR Introduction", focus: "R-controlled vowel 'or'", words: ["for", "born", "horn", "corn", "fork", "storm"], sight: ["star", "sky"] },
  { num: 148, week: 27, day: 4, title: "AR & OR Practice", focus: "Mix ar/or", words: ["Park at farm", "Shark in storm", "Dark corn barn"], sight: ["rocket", "astronaut"] },
  { num: 149, week: 27, day: 5, title: "Week 27 Assessment", focus: "ar/or mastery", words: ["star", "park", "born", "storm", "farm", "fork"], sight: ["review"], assessment: true },
  
  { num: 150, week: 28, day: 1, title: "ER Introduction", focus: "R-controlled vowel 'er'", words: ["her", "fern", "term", "clerk", "perch", "serve"], sight: ["earth", "ground"] },
  { num: 151, week: 28, day: 2, title: "IR Introduction", focus: "R-controlled vowel 'ir'", words: ["bird", "first", "girl", "shirt", "dirt", "third"], sight: ["rock", "stone"] },
  { num: 152, week: 28, day: 3, title: "UR Introduction", focus: "R-controlled vowel 'ur'", words: ["turn", "burn", "curl", "hurt", "surf", "purse"], sight: ["mountain", "hill"] },
  { num: 153, week: 28, day: 4, title: "ER, IR, UR Practice", focus: "Mix er/ir/ur (all say /er/)", words: ["Her bird", "First turn", "Girl's purse", "Fern curls"], sight: ["valley", "cliff"] },
  { num: 154, week: 28, day: 5, title: "Week 28 Assessment", focus: "er/ir/ur mastery", words: ["her", "bird", "turn", "first", "girl", "hurt"], sight: ["review"], assessment: true },
  
  // Weeks 29-30: Diphthongs
  { num: 155, week: 29, day: 1, title: "OI Introduction", focus: "Diphthong 'oi'", words: ["oil", "boil", "soil", "coin", "join", "point"], sight: ["garden", "flower"] },
  { num: 156, week: 29, day: 2, title: "OY Introduction", focus: "Diphthong 'oy'", words: ["boy", "toy", "joy", "Roy", "soy", "ploy"], sight: ["plant", "seed"] },
  { num: 157, week: 29, day: 3, title: "OI & OY Practice", focus: "Mix oi/oy (same sound)", words: ["Boy's toy", "Coin in soil", "Roy joins boys"], sight: ["grow", "leaf"] },
  { num: 158, week: 29, day: 4, title: "OU Introduction", focus: "Diphthong 'ou'", words: ["out", "shout", "cloud", "loud", "house", "mouse"], sight: ["root", "stem"] },
  { num: 159, week: 29, day: 5, title: "Week 29 Assessment", focus: "oi/oy/ou mastery", words: ["oil", "boy", "toy", "out", "cloud", "house"], sight: ["review"], assessment: true },
  
  { num: 160, week: 30, day: 1, title: "OW as in Cow", focus: "Diphthong 'ow' (cow sound)", words: ["cow", "now", "how", "brown", "down", "town"], sight: ["spring", "summer"] },
  { num: 161, week: 30, day: 2, title: "OW Two Sounds", focus: "ow = long O or /ow/", words: ["snow/cow", "grow/now", "show/how", "blow/brown"], sight: ["fall", "autumn"] },
  { num: 162, week: 30, day: 3, title: "All Diphthongs", focus: "Mix oi/oy/ou/ow", words: ["Boy shouts", "Brown cow", "Loud toy", "Cloud now"], sight: ["winter", "season"] },
  { num: 163, week: 30, day: 4, title: "Diphthongs Practice", focus: "Read & spell diphthongs", words: ["The brown cow is loud in town now"], sight: ["weather", "climate"] },
  { num: 164, week: 30, day: 5, title: "Week 30 Assessment", focus: "All diphthongs", words: ["boy", "coin", "out", "cow", "brown", "house"], sight: ["review"], assessment: true },
  
  // Weeks 31-32: Advanced Patterns
  { num: 165, week: 31, day: 1, title: "AW Introduction", focus: "Vowel pattern 'aw'", words: ["saw", "paw", "draw", "straw", "claw", "yawn"], sight: ["animal", "creature"] },
  { num: 166, week: 31, day: 2, title: "AU Introduction", focus: "Vowel pattern 'au'", words: ["cause", "Paul", "haul", "fault", "sauce", "laundry"], sight: ["nature", "wild"] },
  { num: 167, week: 31, day: 3, title: "AW & AU Practice", focus: "Mix aw/au (same sound)", words: ["Paul draws", "Paw in straw", "Sauce cause"], sight: ["forest", "woods"] },
  { num: 168, week: 31, day: 4, title: "OO as in Book", focus: "Short 'oo' sound", words: ["book", "look", "cook", "took", "good", "wood"], sight: ["jungle", "safari"] },
  { num: 169, week: 31, day: 5, title: "Week 31 Assessment", focus: "aw/au/oo mastery", words: ["saw", "Paul", "draw", "book", "look", "good"], sight: ["review"], assessment: true },
  
  { num: 170, week: 32, day: 1, title: "OO as in Moon", focus: "Long 'oo' sound", words: ["moon", "soon", "food", "cool", "pool", "zoo"], sight: ["universe", "galaxy"] },
  { num: 171, week: 32, day: 2, title: "OO Two Sounds", focus: "oo = book or moon", words: ["book/moon", "look/pool", "good/food", "wood/zoo"], sight: ["comet", "meteor"] },
  { num: 172, week: 32, day: 3, title: "All OO Words", focus: "Practice both oo sounds", words: ["Good food", "Look at moon", "Cool book at zoo"], sight: ["orbit", "gravity"] },
  { num: 173, week: 32, day: 4, title: "Advanced Patterns Review", focus: "aw/au/oo review", words: ["Paul cooks good food in the afternoon"], sight: ["telescope", "space"] },
  { num: 174, week: 32, day: 5, title: "Week 32 Assessment", focus: "All advanced patterns", words: ["draw", "cause", "book", "moon", "food", "zoo"], sight: ["review"], assessment: true },
  
  // Weeks 33-36: Final Review & Celebration (Days 175-180)
  { num: 175, day: 1, title: "Phonics Review Day 1", focus: "CVC & CVCe patterns", words: ["cat", "make", "dog", "bike", "run", "home"], sight: ["comprehensive"] },
  { num: 176, day: 2, title: "Phonics Review Day 2", focus: "Blends & digraphs", words: ["ship", "flag", "crab", "think", "jump", "left"], sight: ["comprehensive"] },
  { num: 177, day: 3, title: "Phonics Review Day 3", focus: "Vowel teams", words: ["rain", "beach", "boat", "snow", "play", "green"], sight: ["comprehensive"] },
  { num: 178, day: 4, title: "Phonics Review Day 4", focus: "R-controlled & diphthongs", words: ["star", "bird", "boy", "out", "saw", "moon"], sight: ["comprehensive"] },
  { num: 179, day: 5, title: "Final Reading Assessment", focus: "180-day test", words: ["All patterns learned this year"], sight: ["100 sight words"], assessment: true, finalTest: true },
  { num: 180, day: 6, title: "🎉 Celebration Day!", focus: "You did it!", words: ["great", "job", "you", "did", "it", "amazing"], sight: ["congratulations!"], celebration: true }
];

function generateLesson(lesson) {
  const isAssessment = lesson.assessment || false;
  const isCelebration = lesson.celebration || false;
  const weekText = lesson.week ? `Week ${lesson.week}, Day ${lesson.day}` : `Day ${lesson.num}`;
  
  const emoji = isCelebration ? "🎉" : isAssessment ? "📝" : "📚";
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${lesson.num}: ${lesson.title} - BedrockELA 1st Grade</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #1B2A30;
            background: linear-gradient(135deg, #F5F1E8 0%, #E8DCC8 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        .header {
            text-align: center;
            background: linear-gradient(135deg, #305853 0%, #1B2A30 100%);
            color: white;
            padding: 30px;
            border-radius: 20px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .header p { font-size: 1.2rem; opacity: 0.9; }
        .lesson-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .focus-box {
            background: rgba(176,104,33,0.1);
            border-left: 5px solid #B06821;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        }
        .focus-box h3 { color: #B06821; margin-bottom: 10px; }
        .word-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .word-card {
            background: linear-gradient(135deg, #305853 0%, #1B2A30 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 15px;
            font-size: 1.5rem;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .sight-words {
            background: rgba(48,88,83,0.08);
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
        }
        .sight-words h3 { color: #305853; margin-bottom: 15px; }
        .sight-word-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .sight-word {
            background: white;
            padding: 10px 20px;
            border-radius: 10px;
            border: 2px solid #305853;
            font-weight: 600;
        }
        .nav-buttons {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            margin: 30px 0;
        }
        .nav-btn {
            background: linear-gradient(135deg, #B06821 0%, #511B18 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        }
        .nav-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .billy-says {
            background: rgba(48,88,83,0.08);
            border-radius: 15px;
            padding: 25px;
            margin: 20px 0;
            border-left: 5px solid #305853;
        }
        .billy-says::before {
            content: "🐐 Little Billy says: ";
            font-weight: bold;
            font-size: 1.1rem;
            color: #305853;
        }
        .celebration {
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            border-radius: 20px;
            margin: 20px 0;
        }
        .celebration h2 {
            font-size: 3rem;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="font-size: 4rem; margin-bottom: 15px;">${emoji}</div>
            <h1>Day ${lesson.num}: ${lesson.title}</h1>
            <p>${weekText} • ${lesson.focus}</p>
        </div>

        <div class="lesson-card">
            ${isCelebration ? `
                <div class="celebration">
                    <h2>🎉 CONGRATULATIONS! 🎉</h2>
                    <p style="font-size: 1.5rem; margin: 20px 0;">
                        You completed 180 days of 1st grade reading!
                    </p>
                    <p style="font-size: 1.3rem; margin: 20px 0;">
                        You are now a READING SUPERSTAR! ⭐
                    </p>
                    <div style="font-size: 5rem; margin: 30px 0;">🏆📚🐐🎊</div>
                </div>
            ` : isAssessment ? `
                <div class="focus-box">
                    <h3>📝 Assessment Day</h3>
                    <p>Time to show what you've learned! Take your time and do your best.</p>
                </div>
            ` : `
                <div class="focus-box">
                    <h3>🎯 Today's Focus</h3>
                    <p><strong>${lesson.focus}</strong></p>
                </div>
            `}

            ${!isCelebration ? `
                <h2 style="margin: 30px 0 20px 0;">📖 Today's Words</h2>
                <div class="word-grid">
                    ${lesson.words.map(word => `<div class="word-card">${word}</div>`).join('')}
                </div>

                ${lesson.sight && lesson.sight[0] !== "review" && lesson.sight[0] !== "comprehensive" ? `
                    <div class="sight-words">
                        <h3>👀 Sight Words to Know</h3>
                        <div class="sight-word-list">
                            ${lesson.sight.map(word => `<span class="sight-word">${word}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="billy-says">
                    ${isAssessment 
                        ? `You've practiced so much! Now it's time to show what you know. Remember, do your best and have fun! You've got this! 🐐`
                        : `Let's learn these new sounds together! Practice reading each word slowly, sound by sound. You're doing amazing! 🐐`
                    }
                </div>
            ` : ''}
        </div>

        <div class="nav-buttons">
            ${lesson.num > 1 
                ? `<a href="1st-grade-lesson-${lesson.num - 1}-v2.html" class="nav-btn">← Day ${lesson.num - 1}</a>` 
                : '<a href="student-dashboard.html" class="nav-btn">← Dashboard</a>'
            }
            ${lesson.num < 180 
                ? `<a href="1st-grade-lesson-${lesson.num + 1}-v2.html" class="nav-btn">Day ${lesson.num + 1} →</a>` 
                : '<a href="student-dashboard.html" class="nav-btn">Finish! →</a>'
            }
        </div>
    </div>
</body>
</html>`;
}

console.log('🚀 Building 1st Grade Days 31-180 (150 lessons)...\n');

let count = 0;
lessons.forEach(lesson => {
  const html = generateLesson(lesson);
  const filename = `1st-grade-lesson-${lesson.num}-v2.html`;
  fs.writeFileSync(filename, html);
  count++;
  
  if (count % 10 === 0) {
    console.log(`✅ Built ${count} lessons...`);
  }
});

console.log(`\n🎉 Complete! Built all 150 lessons (Days 31-180)!`);
console.log(`📚 Total 1st grade lessons now: 180 (Complete year!)

Summary:
- Days 1-30: Foundation (already built)
- Days 31-40: Consonant digraphs
- Days 41-72: Blends & more digraphs
- Days 73-108: Long vowels & silent e
- Days 109-144: Vowel teams & diphthongs
- Days 145-180: R-controlled vowels & advanced patterns

🎊 1st Grade curriculum COMPLETE!`);
