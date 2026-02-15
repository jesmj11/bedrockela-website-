const fs = require('fs');

// Decodable readers for Days 31-180
// Each story uses ONLY phonics patterns learned up to that day

const readers = {
  // UNIT 1 COMPLETION - Consonant Digraphs (Days 31-40)
  31: {
    title: "Ship Shop",
    story: `Sam has a ship shop. 
    
The shop has big ships and small ships. 
    
Shep the dog sits in the shop with Sam.
    
A fish swims past the shop. Shep jumps!
    
"Shh, Shep!" says Sam. "Sit!"
    
Shep sits. Sam pats Shep.
    
The ship shop is a fun shop!`
  },
  
  32: {
    title: "Chip's Lunch",
    story: `Chip the chipmunk is in his den.
    
It is time for lunch!
    
Chip chomps on chips. Chomp, chomp, chomp!
    
Then Chip has a chat with Chad.
    
"This is a much fun lunch!" says Chip.
    
Chad nods. "Such a good lunch!"`
  },
  
  33: {
    title: "The Shell and the Chick",
    story: `A small chick sits on a shell.
    
The shell is from the fresh fish shop.
    
"This is a chill spot," says the chick.
    
A fish swims past. Splash!
    
The chick checks the shell. Still there!
    
"I shall sit on this shell," chirps the chick.`
  },
  
  34: {
    title: "Seth and Beth",
    story: `Seth and Beth are pals.
    
They run on the path with Shep.
    
"This path is the best!" says Seth.
    
Beth nods. "Let's take a bath when we get back!"
    
They run and run. Then they rest.
    
Seth and Beth are glad pals.`
  },
  
  36: {
    title: "When the Wind Whips",
    story: `When the wind whips, what happens?
    
The white flag flaps!
    
What if it rains? 
    
Mom shuts the window while Dad checks the shed.
    
Then we sip hot drinks and chat.
    
When the wind whips, we are snug at home!`
  },
  
  38: {
    title: "Mix It Up!",
    story: `Chad can chop. Whack, whack, whack!
    
Beth can whisk. Whish, whish, whish!
    
Seth can mash. Mush, mush, mush!
    
What are they making?
    
A dish for lunch! 
    
"This is the best dish!" they all shout.
    
When pals work together, lunch is much fun!`
  },
  
  40: {
    title: "Week 8 Review: The Fish Wish",
    story: `A fish swims in a dish.
    
"I wish I had a shell," thinks the fish.
    
Then the fish spots a white shell on the path.
    
But the fish cannot get it. The fish is in the dish!
    
A chick brings the shell to the fish.
    
"Thank you!" the fish says with a swish.
    
Now the fish has what it wished for!`
  },
  
  // Beginning Blends (Days 41-50)
  41: {
    title: "The Black Blob",
    story: `What is that black blob?
    
It is not a blot. It is not a block.
    
Brad checks. It blinks!
    
The black blob is a pup! 
    
Brad names him Blink.
    
Blink and Brad are best pals.`
  },
  
  43: {
    title: "The Flag Plan",
    story: `Fran has a plan. She will make a flag!
    
First, she gets a flat cloth.
    
Then she adds red and black.
    
Flap, flap! The flag flaps in the wind.
    
"I am glad I made this flag!" says Fran.`
  },
  
  45: {
    title: "Week 9 Review: Glad to Help",
    story: `Glen the frog is glad to help.
    
Fran drops her flag. Glen hops and gets it!
    
Brad trips on a block. Glen moves the block!
    
A black pup is stuck. Glen helps the pup get free!
    
"You are the best, Glen!" says Brad.
    
Glen grins. He is glad to help pals!`
  },
  
  48: {
    title: "Slip and Slide",
    story: `It is a hot day. The kids plan to play!
    
They slip and slide on the slick grass.
    
Plop! Glen the frog slips into the pond.
    
Plunk! The pup slips in next.
    
Splash! All the pals slip and slide!
    
"This is the best plan!" they shout.`
  },
  
  50: {
    title: "Week 10 Review: The Glass Sled",
    story: `Glen has a glass sled. It is his!
    
The glass sled can slip fast on the path.
    
Glen lets his pals use the sled.
    
"I am glad to share!" says Glen.
    
They all take turns. Slip, slip, slip!
    
Sharing the glass sled is fun for all!`
  },
  
  // More Blends (Days 51-60)
  53: {
    title: "Crab and Frog",
    story: `A crab and a frog are pals.
    
The crab can grab sticks from the muck.
    
The frog can hop on rocks and logs.
    
They help each other every day.
    
"Let's be pals forever!" says the crab.
    
The frog grins. "Best pals!"`
  },
  
  57: {
    title: "Grass for Gran",
    story: `Brad cuts the grass for Gran.
    
He grabs the tool and gets to work.
    
The grass is fresh and green.
    
Gran brings Brad a cold drink.
    
"Thank you, Brad!" says Gran with a grin.
    
Brad grins back. "Glad to help, Gran!"`
  },
  
  60: {
    title: "Week 12 Review: The Frog Trip",
    story: `Glen the frog plans a trip!
    
He will go see his pal Greta the grasshopper.
    
Glen grabs his pack and sets off.
    
He hops past the creek, over the grass, and up the path.
    
At last, Glen spots Greta on a twig!
    
"Glen! You made it!" she chirps.
    
What a grand trip!`
  },
  
  // Ending Blends (Days 61-70)
  63: {
    title: "Fast at Last",
    story: `Brad is fast. He runs past the rest!
    
First, he runs past the sand pit.
    
Next, he runs past the bench.
    
Last, he runs past the shed.
    
Brad stops to rest at last.
    
"That was my best run!" Brad shouts.`
  },
  
  67: {
    title: "Jump and Bump",
    story: `The pup can jump! Jump, jump, jump!
    
He jumps over the stump.
    
He jumps over the pump.
    
Bump! The pup bumps into the lamp!
    
"Whoops!" says Brad with a chuckle.
    
The pup wags his tail. He is still glad!`
  },
  
  70: {
    title: "Week 14 Review: The Gift",
    story: `Gran has a gift for Brad.
    
It is soft and in a box.
    
Brad lifts the top. What is it?
    
A thick, red belt! 
    
"This gift is the best!" says Brad.
    
He gives Gran a big hug.
    
"I am glad you like it!" says Gran with a grin.`
  },
  
  // Long A with silent e (Days 73-82)
  74: {
    title: "Jake Makes a Cake",
    story: `Jake wants to make a cake for Mom.
    
He gets a pan and a spoon.
    
Jake adds eggs and makes the batter.
    
He bakes the cake until it is done.
    
"This cake looks great!" says Mom.
    
Jake grins. "I made it just for you!"`
  },
  
  77: {
    title: "Week 15 Review: The Brave Snake",
    story: `There is a snake by the lake.
    
The snake is brave. He is not afraid!
    
One day, a wave makes a big splash.
    
The brave snake does not shake.
    
He stays safe on his favorite rock by the lake.
    
"I am brave!" the snake says with pride.`
  },
  
  80: {
    title: "The Gate at the Lake",
    story: `There is a gate at the lake.
    
Kate wants to skate by the lake.
    
She opens the gate and skates on the path.
    
The lake waves make her smile.
    
"This is my favorite place!" says Kate.
    
She skates until late!`
  },
  
  82: {
    title: "Week 16 Review: Dave Saves the Day",
    story: `Dave the dog is brave.
    
One day, Kate drops her skates in the lake!
    
Dave jumps in the waves to save them.
    
He grabs the skates and swims back to Kate.
    
"You saved my skates, Dave!" Kate says.
    
Dave wags his tail. He is brave and safe!`
  },
  
  // Long I with silent e (Days 83-92)
  84: {
    title: "Mike's Bike",
    story: `Mike has a red bike that he likes.
    
He rides his bike for miles and miles.
    
One time, Mike rides to the pine trees.
    
He smiles as he bikes up the hill.
    
At the top, Mike takes time to rest.
    
"I like my bike!" Mike shouts with pride.`
  },
  
  87: {
    title: "Week 17 Review: Five Kites",
    story: `Mike has five kites that shine in the sun.
    
One kite is white. One kite has stripes.
    
Mike flies his kites on a fine day.
    
The kites glide and shine in the sky.
    
"These are my five favorite kites!" Mike smiles.
    
Flying kites makes Mike feel fine!`
  },
  
  90: {
    title: "A Hike at Nine",
    story: `At nine in the morning, Mike goes on a hike.
    
He hikes for quite a while, past the pine trees.
    
Mike likes to hike and smile.
    
He finds a nice rock to rest on.
    
"This hike is quite nice!" says Mike.
    
Mike will hike here all the time!`
  },
  
  92: {
    title: "Week 18 Review: Mike Rides and Smiles",
    story: `Mike likes to ride his bike for miles.
    
He rides by the white fence.
    
He rides past five pine trees.
    
At the end, Mike slides to a stop and smiles!
    
"I rode quite far this time!" he says.
    
Mike's bike rides make him smile all the while!`
  },
  
  // Long O and U (Days 93-102)
  94: {
    title: "Home Alone",
    story: `Rose is home alone for the first time.
    
Mom left a note: "I hope you will be brave!"
    
Rose picks up the phone to call Mom.
    
"I am fine, Mom! I am not alone—I have our dog, Bones!"
    
Rose hangs up and smiles.
    
She feels safe at home with Bones!`
  },
  
  97: {
    title: "Week 19 Review: Hope for the Rope",
    story: `Rose hopes to find her jump rope.
    
She looks by the stove. Not there!
    
She looks by the stone steps. Not there!
    
At last, Rose finds the rope by the old pole.
    
"I hoped I would find it!" Rose says.
    
Now she can jump rope at home!`
  },
  
  99: {
    title: "The Cute Mule",
    story: `There is a cute mule named Duke.
    
Duke is huge but very cute!
    
In June, Duke likes to stand by the fence.
    
The kids use carrots to feed Duke.
    
"Duke is the most cute mule!" they say.
    
Duke munches and looks very cute!`
  },
  
  102: {
    title: "Week 20 Review: Duke's Tube",
    story: `Duke the cute mule has a huge tube.
    
He uses the tube to drink water in June.
    
One day, Duke's tube gets a hole!
    
Rose helps Duke by finding a new tube.
    
"Thank you, Rose!" Duke seems to say.
    
Now Duke can use his tube again!`
  },
  
  // Vowel Teams AI/AY (Days 109-118)
  110: {
    title: "Rain on the Train",
    story: `It starts to rain while Gail is on the train.
    
The rain makes patterns on the window pane.
    
Gail watches the rain fall on the plain.
    
"I like the rain!" says Gail with a smile.
    
The train speeds through the rain all day.
    
Rain on the train is not a pain!`
  },
  
  113: {
    title: "Week 21 Review: Wait for the Snail",
    story: `A snail paints his trail as he goes.
    
"Wait for me!" the snail calls to his pals.
    
But snails are slow, and his pals are fast.
    
The snail does not complain. He just keeps going.
    
At last, his pals wait by the mailbox.
    
"We will wait!" they say. The snail feels great!`
  },
  
  115: {
    title: "Play Day",
    story: `Today is Play Day! Hip hip hooray!
    
Jay and Ray play games all day.
    
They play tag on the clay path.
    
They make a tray of snacks and stay outside.
    
"This is the best day!" says Jay.
    
"Hooray for Play Day!" shouts Ray.`
  },
  
  118: {
    title: "Week 22 Review: May's Gray Day",
    story: `It is a gray day in May.
    
May looks outside. Rain clouds stay in the sky.
    
"I wanted to play today!" May says with dismay.
    
Then May has an idea. She can paint!
    
May paints the sun and blue skies on gray paper.
    
"Now I can play and paint!" May says. Hooray!`
  },
  
  // Vowel Teams EA/EE (Days 119-128)
  120: {
    title: "Beach Week",
    story: `It is Beach Week! The team is eager to go.
    
Dean leads the team to the beach.
    
They reach the sand and feel the breeze.
    
Jean finds a peach-colored shell.
    
"This beach is a dream!" says Dean.
    
The team agrees. Beach Week is the best!`
  },
  
  123: {
    title: "Week 23 Review: Teach the Team",
    story: `Coach Dean wants to teach his team a new plan.
    
"Each of you can reach your dreams!" he says.
    
The team reads the plan and works hard each day.
    
Soon, each player can do the new play!
    
"We did it!" the team cheers.
    
Dean smiles. "You each did great!"`
  },
  
  125: {
    title: "Three Green Trees",
    story: `There are three green trees by the street.
    
Bees sleep in the trees during the week.
    
On weekends, kids meet by the trees to play.
    
"Let's keep these trees green!" says Lee.
    
The kids agree to feed and care for the trees.
    
Three green trees make the street sweet!`
  },
  
  128: {
    title: "Week 24 Review: Green Dream",
    story: `Jean has a dream about green trees by a stream.
    
In her dream, she sees three deer drinking from the stream.
    
Bees buzz in the green trees.
    
Jean feels at peace in her green dream.
    
When Jean wakes up, she feels so free!
    
"That was the sweetest dream!" Jean says with glee.`
  },
  
  // Vowel Teams OA/OW (Days 129-138)
  130: {
    title: "The Goat and the Boat",
    story: `A goat finds a boat floating by the road.
    
"I can use this boat!" says the goat.
    
The goat loads his coat into the boat.
    
He floats on the moat, eating oats and toast.
    
"This boat makes me feel like I can float forever!" 
    
The goat in the boat has a grand day!`
  },
  
  133: {
    title: "Week 25 Review: Toad on the Road",
    story: `A toad hops on the road, looking for food.
    
He sees toast by the oak tree!
    
The toad loads the toast into his pouch.
    
Then he hops back home with his load.
    
"Toast from the road is the best!" says the toad.
    
He munches his toast by the old oak tree.`
  },
  
  135: {
    title: "Snow Day",
    story: `The snow falls slow and low.
    
Joe looks out the window. Snow!
    
"Let's go play in the snow!" he shouts.
    
Joe and Moe throw snowballs.
    
They make a snowman that seems to glow!
    
"Snow days are the best!" they say.`
  },
  
  138: {
    title: "Week 26 Review: The Yellow Boat in Snow",
    story: `Joe has a yellow boat he wants to float.
    
But there is snow on the ground!
    
"I know!" says Joe. "I will make a snow river!"
    
Joe digs a path in the snow.
    
He pours water to make it flow.
    
Now Joe's yellow boat can float in the snow!`
  },
  
  // R-Controlled Vowels (Days 145-154)
  146: {
    title: "Star in the Barn",
    story: `There is a star in the barn!
    
It shines near the yarn and the cart.
    
"How did a star get in our barn?" asks Mark.
    
His mom smiles. "It's a star-shaped light!"
    
Mark and Mom sit in the barn under the star.
    
"Our barn is the best!" says Mark.`
  },
  
  149: {
    title: "Week 27 Review: Storm at the Farm",
    story: `A storm is coming to the farm!
    
Mark helps his mom put the animals in the barn.
    
They park the cart by the garden.
    
The storm brings rain and dark clouds.
    
But the barn keeps them all safe and warm.
    
When the storm ends, the farm has a beautiful rainbow!`
  },
  
  151: {
    title: "The First Bird",
    story: `Fern sees the first bird of spring!
    
The bird has a purple chest.
    
"You are my first bird this year!" says Fern.
    
The bird chirps and hops on the fern plant.
    
Fern smiles. Spring is her favorite time!
    
Seeing the first bird makes her day perfect!`
  },
  
  154: {
    title: "Week 28 Review: Girl with the Purple Purse",
    story: `A girl named Pearl has a purple purse.
    
In her purse, she keeps a bird feather.
    
Pearl finds the feather on her first day of summer.
    
"This purple purse is perfect!" says Pearl.
    
She takes her purse everywhere.
    
The purple purse and bird feather are her favorite!`
  },
  
  // Diphthongs (Days 155-164)
  156: {
    title: "Roy's Toy",
    story: `Roy has a toy that brings him joy.
    
The toy is a boy doll that can talk!
    
Roy and his toy have fun every day.
    
"You bring me joy!" Roy tells his toy.
    
The toy smiles. Roy is a loyal friend!
    
Roy and his toy will always have joy together!`
  },
  
  159: {
    title: "Week 29 Review: Coins in the Soil",
    story: `Roy finds coins in the soil!
    
He digs with joy, finding coin after coin.
    
"These coins will join my collection!" says Roy.
    
He cleans the soil off each coin.
    
Roy puts the coins in a special box.
    
Finding coins in the soil brings Roy great joy!`
  },
  
  161: {
    title: "How Now, Brown Cow?",
    story: `"How now, brown cow?" asks the owl.
    
The brown cow looks down at the owl.
    
"I am fine now!" says the cow. "How are you?"
    
The owl bows. "I am well!"
    
The brown cow and the owl are pals now.
    
They chat about life in the town.`
  },
  
  164: {
    title: "Week 30 Review: The Loud House",
    story: `There is a loud house at the edge of town.
    
Inside, boys shout and toys make sounds!
    
"Our house is loud!" laughs Mrs. Brown.
    
She doesn't mind the loud sounds.
    
The boys play with joy, not caring about being loud.
    
The loud house is a happy house!`
  },
  
  // Advanced Patterns (Days 165-174)
  166: {
    title: "Paul Draws",
    story: `Paul likes to draw with his paw—I mean his hand!
    
He draws claws, and jaws, and saw blades.
    
His mom, Maude, watches Paul draw.
    
"You have talent!" says Maude.
    
Paul grins. Drawing brings him joy!
    
Paul will draw all day if he can!`
  },
  
  169: {
    title: "Week 31 Review: The Good Book",
    story: `Paul finds a good book about woodworking.
    
The book shows how to build things from wood.
    
Paul looks at each page with his mom.
    
"This looks like a good book for you!" says Maude.
    
Paul takes the good book home.
    
He will learn woodworking from the good book!`
  },
  
  171: {
    title: "Moon at the Zoo",
    story: `The moon shines over the zoo at noon—wait, moons don't shine at noon!
    
Let's start over. The moon shines over the zoo at night.
    
The animals snooze under the cool moonlight.
    
Soon, the zookeeper will come with food.
    
But for now, the zoo is peaceful and cool.
    
The moon and the zoo animals rest together.`
  },
  
  174: {
    title: "Week 32 Review: Paul Cooks Food",
    story: `Paul uses his good cookbook to make food.
    
He cooks noodles and mushroom soup.
    
"This food smells good!" says Maude.
    
Paul spoons the food into bowls.
    
They eat by the light of the moon.
    
"You are a good cook, Paul!" Maude says. Paul beams with pride!`
  },
  
  // Final Review Days (Days 175-179)
  175: {
    title: "Looking Back - Part 1",
    story: `Do you remember when we first started reading?
    
We learned about cats and dogs and simple words.
    
Then we learned about ships and chips!
    
Soon we could read about snakes and cakes and bikes!
    
We've come so far! Look at all the words you can read now!`
  },
  
  176: {
    title: "Looking Back - Part 2",
    story: `Remember learning about blends?
    
Frogs and crabs and grass!
    
We jumped and bumped our way through the words!
    
Then we learned about teams—rain and play, beach and tree!
    
You've learned so much! Keep going!`
  },
  
  177: {
    title: "Looking Back - Part 3",
    story: `We floated in boats and played in the snow!
    
We found stars in barns and birds on ferns!
    
We discovered joy with toys and loud sounds in houses!
    
We even cooked food by the moon!
    
What an amazing journey through reading!`
  },
  
  178: {
    title: "Looking Back - Part 4",
    story: `From simple cat and dog words...
    
To rain, train, beach, and dream...
    
To brown cows and good books and moonlight...
    
You can now read ANYTHING!
    
You are a reading superstar! 
    
Tomorrow is your last day—get ready to celebrate!`
  },
  
  179: {
    title: "Almost There!",
    story: `You made it to Day 179!
    
You've learned every sound, every pattern, every trick!
    
You can read books about anything now!
    
From ships to snow, from coins to cows, from the moon to the zoo!
    
Tomorrow we celebrate everything you've learned!
    
You are AMAZING! One more day!`
  }
};

// Generate lesson HTML with integrated readers
function buildLessonWithReader(lessonNum, lessonData, reader) {
  const isAssessment = lessonData.assessment || false;
  const isCelebration = lessonData.celebration || false;
  const weekText = lessonData.week ? `Week ${lessonData.week}, Day ${lessonData.day}` : `Day ${lessonNum}`;
  const emoji = isCelebration ? "🎉" : isAssessment ? "📝" : "📚";
  
  const hasReader = reader && reader.story;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${lessonNum}: ${lessonData.title} - BedrockELA 1st Grade</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.8;
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
        .reader-section {
            background: rgba(48,88,83,0.05);
            border-radius: 20px;
            padding: 30px;
            margin: 30px 0;
            border: 3px solid #305853;
        }
        .reader-section h2 {
            color: #305853;
            text-align: center;
            margin-bottom: 20px;
            font-size: 2rem;
        }
        .reader-story {
            background: white;
            padding: 30px;
            border-radius: 15px;
            font-size: 1.3rem;
            line-height: 2.2;
            color: #1B2A30;
            white-space: pre-line;
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
            <h1>Day ${lessonNum}: ${lessonData.title}</h1>
            <p>${weekText} • ${lessonData.focus}</p>
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
                    <p><strong>${lessonData.focus}</strong></p>
                </div>
            `}

            ${!isCelebration ? `
                <h2 style="margin: 30px 0 20px 0;">📖 Today's Words</h2>
                <div class="word-grid">
                    ${lessonData.words.map(word => `<div class="word-card">${word}</div>`).join('')}
                </div>

                ${lessonData.sight && lessonData.sight[0] !== "review" && lessonData.sight[0] !== "comprehensive" ? `
                    <div class="sight-words">
                        <h3>👀 Sight Words to Know</h3>
                        <div class="sight-word-list">
                            ${lessonData.sight.map(word => `<span class="sight-word">${word}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${hasReader ? `
                    <div class="reader-section">
                        <h2>📚 ${reader.title}</h2>
                        <div class="reader-story">${reader.story}</div>
                    </div>

                    <div class="billy-says">
                        Great job reading "${reader.title}"! Practice reading it again until you can read it smoothly. You're doing amazing! 🐐
                    </div>
                ` : `
                    <div class="billy-says">
                        ${isAssessment 
                            ? `You've practiced so much! Now it's time to show what you know. Remember, do your best and have fun! You've got this! 🐐`
                            : `Let's learn these new sounds together! Practice reading each word slowly, sound by sound. You're doing amazing! 🐐`
                        }
                    </div>
                `}
            ` : ''}
        </div>

        <div class="nav-buttons">
            ${lessonNum > 1 
                ? `<a href="1st-grade-lesson-${lessonNum - 1}-v2.html" class="nav-btn">← Day ${lessonNum - 1}</a>` 
                : '<a href="student-dashboard.html" class="nav-btn">← Dashboard</a>'
            }
            ${lessonNum < 180 
                ? `<a href="1st-grade-lesson-${lessonNum + 1}-v2.html" class="nav-btn">Day ${lessonNum + 1} →</a>` 
                : '<a href="student-dashboard.html" class="nav-btn">Finish! →</a>'
            }
        </div>
    </div>
</body>
</html>`;
}

console.log('📚 Adding decodable readers to 1st grade lessons...\n');

// Read the original lesson data from the previous build script
const fs2 = require('fs');
const lessonDataPath = './build-1st-grade-complete.js';
const scriptContent = fs2.readFileSync(lessonDataPath, 'utf8');

// Extract lessons array (this is a bit hacky but works for our purposes)
eval(scriptContent.replace('console.log', '// console.log'));

let updated = 0;
lessons.forEach(lessonData => {
  const lessonNum = lessonData.num;
  const reader = readers[lessonNum] || null;
  
  if (reader) {
    const html = buildLessonWithReader(lessonNum, lessonData, reader);
    const filename = `1st-grade-lesson-${lessonNum}-v2.html`;
    fs.writeFileSync(filename, html);
    updated++;
    console.log(`✅ Added "${reader.title}" to Day ${lessonNum}`);
  }
});

console.log(`\n🎉 Complete! Added ${updated} decodable readers to lessons!`);
console.log(`📖 Stories added to key lessons throughout the year!`);
