#!/usr/bin/env python3
"""Fill missing Roman comprehension questions from source file."""
import re, os

BASE = "/Users/mushu/.openclaw/workspace/bedrockela-website-/curriculum/grade5/roman"

# Map day -> story key -> 3 questions
questions = {
    119: [  # Jupiter King of the Gods
        "Jupiter was not just a storm god — he was the god of law and the proper structure of things. Why do you think the Romans needed their supreme god to be connected to law and order, not just power? What does it mean for a civilization to put its highest authority behind its legal system?",
        "The Romans put Jupiter on their coins and carried him to every corner of their empire. How does a civilization's religion travel with it when it conquers new places? What happens when the conquered people have their own gods?",
        "Jupiter was powerful, decisive, and not always fair by his own standards. The Romans worshipped him anyway, understanding he was flawed. What does it mean to respect an authority — divine or human — that is genuinely powerful but not always just? Is that different from respecting one that is both?",
    ],
    120: [  # Juno Queen of the Gods
        "Juno is often described as jealous and difficult, but the Romans built her one of Rome's greatest temples and credited her geese with saving the city. What does that tell you about how the Romans thought about powerful, difficult women? Is there a difference between how her stories describe her and how her worship treated her?",
        "Juno's anger at Aeneas had real reasons — she had invested in Carthage's future and was watching the Fates undo it through one man's descendants. Does having good reasons for anger change how we judge what someone does with that anger? At what point does justified anger become something else?",
        "The Romans named June for Juno and considered it the luckiest month for weddings. They carried her name on their coins. They credited her geese with saving Rome. For a goddess who opposed Rome's founding, she ended up woven into Roman life. What does it mean to honor someone whose goals were not always aligned with yours?",
    ],
    121: [  # Mars Father of Rome
        "The Greeks found Ares unpleasant; the Romans loved Mars. The difference was how each culture thought about war — chaos vs. ordered force. What does the god a culture venerates tell you about what that culture values? What god would represent your own society's highest aspirations?",
        "Mars was both a war god and an agricultural god — the same deity who protected crops also sent armies to war. The Romans saw no contradiction. Do you? What is the connection between defending something and growing something? How are those two activities related?",
        "Cincinnatus is the Roman ideal: called from the plow, led the army to victory, returned to the plow. He didn't want the power — he just did what was needed. Why do the Romans hold this up as the ideal citizen? Can you think of anyone in history or today who fits that model?",
    ],
    122: [  # Venus Mother of Rome
        "The Romans chose war and love — Mars and Venus — as their divine ancestors. Not wisdom, not justice, not strength alone. What do you think they meant by that pairing? Is there something that force and beauty together create that neither alone can?",
        "Venus used Cupid to make Dido fall in love with Aeneas because her son needed safe harbor. The love was real even though it was arranged. Does it matter how love starts — whether it's planned, accidental, or engineered — if the feeling itself is genuine?",
        "The Romans believed beauty was divine — that making things beautiful was not frivolous but sacred. Do you agree? Is there a difference between something that is only functional and something that is also beautiful? Does the beauty change what it does to the people who use it?",
    ],
    125: [  # Mercury the Messenger
        "Mercury was the patron of merchants and thieves — acknowledging honestly that both used the same skills. What do you think of a religion that includes that kind of honesty? Does it change anything to say: yes, this skill can be used for good or ill, and we protect it either way?",
        "Mercury walked with the dead as a companion, not a threat — making the unknown passage less frightening. What do you think it would mean to have a guide for the hardest transitions in life? What qualities would you want in someone walking beside you into the unknown?",
        "Mercury was the god everyone wanted to talk to — the most accessible, the most practically helpful. Why do you think he was loved differently than the grander gods? What is the value of a god — or a person — who shows up for ordinary problems, not just extraordinary ones?",
    ],
    127: [  # Vulcan the Divine Craftsman
        "Vulcan was lame and overlooked and married to someone who didn't stay faithful — and he was also the most essential craftsman in the universe, maker of the thunderbolts that Jupiter depended on. What does the story say about the relationship between being underestimated and being genuinely powerful?",
        "Vulcan caught Mars and Venus together in his golden net and called the other gods to witness. Some laughed. He had won a moral and technical victory and was still, somehow, Vulcan. What do you think the Romans were saying with this story? Is winning not always the same as being valued?",
        "The word volcano comes from Vulcan. Vulcanization — treating rubber with heat — still bears his name, thousands of years after his last worshiper died. What does it mean that the god of transformation still shows up in the language of transformation? What other things in the modern world are quietly named for gods people no longer worship?",
    ],
    132: [  # Juno's Wrath and Aeneas's Journey
        "Juno knew from the beginning she couldn't win — the Fates had already decided. She fought anyway for years, making Aeneas's journey as hard as possible. Do you think fighting an inevitable outcome is brave, futile, or both? Is there ever value in resistance even when you know you'll lose?",
        "Aeneas stood on the shore and told his frightened men everything would be fine, while privately he wasn't sure he believed it. Have you ever had to be the calm person for someone else when you were afraid yourself? What does it cost to hold yourself together for others?",
        "The Romans told both sides of the Dido story honestly: Aeneas's duty was real and Rome was worth it, and the grief he left behind was also real. They didn't resolve the tension. Why do you think they were unwilling to simplify it? What does it say about Roman values that they held both things at once?",
    ],
}

def make_comp_pages(qs):
    pages = []
    for i, q in enumerate(qs):
        comp_id = f"comp-{i+1}"
        pages.append(f'''                {{
                    render: () => `
                        <div class="lesson-page-card content-page">
                            <h2>Reading Comprehension</h2>
                            <p style="margin-bottom: 30px;">Question {i+1} of {len(qs)}</p>
                            
                            <div style="margin: 30px 0;">
                                <div style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #8B4513;">
                                    <p style="font-weight: 600; margin-bottom: 12px;">Question {i+1}:</p>
                                    <p style="margin-bottom: 12px; color: #444;">{q}</p>
                                    <textarea 
                                      id="{comp_id}"
                                      style="width: 100%; min-height: 120px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px; line-height: 1.6;"
                                      oninput="updateWordCount('{comp_id}', 'word-count-{comp_id}', 50)"
                                      placeholder="Write your answer here (minimum 50 words)..."
                                    ><\\/textarea>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                                      <span id="word-count-{comp_id}" style="font-size: 14px; color: #666;">0 / 50 words</span>
                                      <span id="word-count-{comp_id}-status" style="font-size: 14px; font-weight: 600;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }}''')
    return ',\n'.join(pages)

count = 0
for day, qs in questions.items():
    filepath = os.path.join(BASE, f"5th-grade-lesson-{day}.html")
    if not os.path.exists(filepath):
        print(f"Day {day}: MISSING FILE")
        continue
    
    html = open(filepath).read()
    
    # Find the empty comprehension page and replace it
    pattern = r'\{\s*render:\s*\(\)\s*=>\s*`(?:<div[^>]*>\s*)?(?:<div class="page-header">)?\s*<h2>✍️ Comprehension Questions</h2>.*?</div>`\s*\}'
    m = re.search(pattern, html, re.DOTALL)
    if m:
        new_pages = make_comp_pages(qs)
        html = html[:m.start()] + new_pages + html[m.end():]
        open(filepath, 'w').write(html)
        count += 1
        print(f"Day {day}: ✅ 3 questions added")
    else:
        print(f"Day {day}: ⚠️ pattern not found")

print(f"\nFilled {count} lessons")
