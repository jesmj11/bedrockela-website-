# Billy the Goat - UI Design Specification

## Overview

Billy appears as an embedded chat assistant within journal and writing activity sections of BedrockELA lessons. The interface is designed to be non-intrusive, mobile-friendly, and feel like a natural part of the writing experience.

---

## Visual Design

### Billy's Avatar

**Appearance:**
- Friendly cartoon goat character
- Consistent with BedrockELA branding (earthy, warm colors)
- Simple, clean design (works at small sizes)
- Multiple expressions for different states:
  - 🐐 **Default/Listening**: Friendly, attentive
  - ✨ **Encouraging**: Excited, celebrating
  - 🤔 **Thinking**: Pondering, considering
  - 💡 **Idea**: Light bulb moment
  - 👍 **Approval**: Thumbs up, proud

**Size:**
- Avatar icon: 40x40px
- Expanded view: 60x60px
- Could be illustrated or simple emoji-based initially

### Color Palette

**Billy's Theme:**
- Primary: Soft sage green (#8BA888) - calm, natural
- Accent: Warm gold (#F4A460) - friendly, encouraging
- Background: Off-white (#FDFDF8) - clean, easy to read
- Text: Dark gray (#333333) - readable

**Status Indicators:**
- Thinking/typing: Animated dots (gold)
- Active: Green indicator
- Offline/unavailable: Gray

---

## Layout & Placement

### Desktop View (Tablet & Larger)

```
┌─────────────────────────────────────────────────────────┐
│  📚 Lesson Content                                      │
│                                                         │
│  Read the chapter, then answer the questions below:    │
│  [content here]                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ✏️ Writing Journal                                     │
│  ┌────────────────────────────────┐ ┌──────────────┐   │
│  │                                │ │  🐐 Billy    │   │
│  │  [Student writing area]        │ │              │   │
│  │                                │ │  Need help?  │   │
│  │  Text box expands as student   │ │  I'm here!   │   │
│  │  types...                      │ │              │   │
│  │                                │ │  [Chat msgs] │   │
│  │                                │ │              │   │
│  │                                │ │              │   │
│  │                                │ │  [Type here] │   │
│  └────────────────────────────────┘ └──────────────┘   │
│         Writing Area (60%)           Billy Panel (35%)  │
└─────────────────────────────────────────────────────────┘
```

### Mobile View (Phone)

```
┌─────────────────────────────┐
│  ✏️ Writing Journal         │
│                             │
│  [Prompt text]              │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │ [Student writing]     │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 🐐 Need writing help? │  │ <-- Collapsible
│  └───────────────────────┘  │
│                             │
│     [When expanded]         │
│  ┌───────────────────────┐  │
│  │ 🐐 Billy              │  │
│  │                       │  │
│  │ [Chat messages]       │  │
│  │                       │  │
│  │ [Type here...]        │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Component Breakdown

### 1. Billy's Panel Container

**Desktop:**
- Fixed panel to the right of writing area
- 35% of journal section width
- Scrollable if chat history grows
- Always visible when in writing section

**Mobile:**
- Collapsible accordion-style
- Default: Collapsed with "🐐 Need writing help?" button
- Expands to overlay or push content down
- Sticky at bottom of writing area

### 2. Chat Interface

**Message Display:**
```
┌─────────────────────────────────┐
│ 🐐 Billy          [Minimize] ─  │
├─────────────────────────────────┤
│                                 │
│  🐐 What are you trying to      │
│     say here?                   │
│          [2:45 PM]              │
│                                 │
│                    I'm not sure │
│                         [2:46]  │
│                                 │
│  🐐 That's okay! Let's think... │
│                                 │
├─────────────────────────────────┤
│ Type your message... [Send →]   │
└─────────────────────────────────┘
```

**Features:**
- Billy's messages: Left-aligned, with avatar
- Student messages: Right-aligned, different color
- Timestamps (optional, collapsed by default)
- Auto-scroll to newest message
- Message history persists during session

### 3. Input Area

**Simple text input:**
- Single-line text field (expands for long messages)
- Send button (enter key also works)
- Character limit: 500 characters (prevents overwhelming)
- Placeholder: "Ask Billy..." or "Type here..."

**No fancy features needed:**
- No formatting (keeps it simple)
- No attachments
- No emojis picker (Billy uses them, students type plain text)

### 4. States & Animations

**Idle State:**
```
┌──────────────┐
│  🐐 Billy    │
│              │
│  I'm here to │
│  help you    │
│  write!      │
│              │
│  Just ask!   │
└──────────────┘
```

**Thinking State:**
```
┌──────────────┐
│  🐐 Billy    │
│              │
│  🤔 Hmm...   │
│  • • •       │  <-- Animated dots
└──────────────┘
```

**Celebrating:**
```
┌──────────────┐
│  ✨🐐✨      │
│              │
│  That's      │
│  awesome!    │
└──────────────┘
```

---

## Interaction Flow

### Initial Appearance

**On page load:**
1. Writing prompt appears
2. Text area is ready
3. Billy's panel shows welcome message:
   - "Hi! I'm Billy! 🐐"
   - "I'm here to help you write. Just ask if you get stuck!"

**Student starts writing:**
- Billy stays quiet (doesn't interrupt)
- Panel remains visible but passive

**Student stops typing for 30+ seconds:**
- Billy MAY gently prompt (not every time):
  - "How's it going? 🐐"
  - "Need any help?"

### Student-Initiated Help

**Student types question:**
```
Student: "how do you spell scared"
```

**Billy responds immediately:**
```
Billy: "Let's sound it out together! What sounds do you hear? 
Ss-kay-rrr-d. Try writing what you hear! 🐐"
```

### Context-Aware Prompts

Billy knows:
- How long student has been on this task
- How much they've written
- The lesson prompt

**If student has written nothing after 5 minutes:**
```
Billy: "Need help getting started? What's the first thing that pops 
into your head about the prompt? 🤔"
```

**If student wrote a lot:**
```
Billy: "Wow, you're really on a roll! 🌟 Want me to help you check 
anything before you finish?"
```

---

## Technical Specifications

### Frontend Components

**Tech Stack:**
- React component for Billy's panel
- WebSocket or API polling for real-time chat
- Local storage for session persistence
- Responsive CSS (Flexbox/Grid)

**Component Structure:**
```
<WritingJournal>
  <PromptSection />
  <WritingArea />
  <BillyPanel>
    <BillyHeader />
    <ChatHistory />
    <MessageInput />
  </BillyPanel>
</WritingJournal>
```

### Backend Integration

**API Endpoints:**
- `POST /api/billy/chat` - Send message, get response
- `GET /api/billy/context` - Get lesson context for Billy
- `POST /api/billy/session` - Start new writing session

**Data Passed to AI:**
```json
{
  "grade": 4,
  "lesson_id": "wiz-oz-chapter3",
  "prompt": "Write about a time you felt brave like Dorothy.",
  "student_draft": "[current text in writing area]",
  "chat_history": [...],
  "session_duration": 420
}
```

**AI Response:**
```json
{
  "message": "That's a great start! Tell me more about what you saw.",
  "emotion": "encouraging",
  "suggested_actions": []
}
```

### Performance Considerations

**Loading:**
- Billy's panel loads asynchronously (doesn't block lesson content)
- Avatar images: preloaded, cached
- Chat history: last 20 messages (paginate older)

**Responsiveness:**
- Target response time: <2 seconds
- Typing indicator while waiting
- Graceful degradation if API is slow/unavailable

---

## Accessibility

### Keyboard Navigation
- Tab through interface
- Enter to send message
- Escape to minimize Billy panel
- Arrow keys to navigate chat history

### Screen Readers
- ARIA labels on all interactive elements
- Billy's messages announced
- Status updates ("Billy is thinking...")

### Visual Accessibility
- High contrast mode support
- Text size adjustable
- Color-blind friendly palette
- Focus indicators on all controls

---

## Privacy & Safety

### Data Handling
- Chat messages stored only during session
- No personally identifiable information collected
- Parent/teacher dashboard shows chat logs (optional review)
- No messages leave platform without consent

### Content Filtering
- AI monitors for inappropriate content
- Flags for teacher review if detected
- Billy can respond: "Let's keep our writing focused on the lesson! 🐐"

### Parental Controls
- Option to disable Billy entirely
- View all chat interactions
- Download chat transcripts

---

## Future Enhancements (V2+)

### Possible Additions:
- **Voice input**: Speak to Billy instead of typing (accessibility)
- **Text-to-speech**: Billy reads responses aloud (younger students)
- **Writing stats**: "You wrote 3 paragraphs today! 🎉"
- **Personalization**: Billy remembers student's name, preferences
- **Hints system**: Billy offers scaffolded hints for specific skills
- **Celebration animations**: Confetti when student finishes
- **Progress tracking**: "You've improved your sentence variety!"

---

## Design Mockup Notes

### Colors & Branding
- Should match BedrockELA's existing design system
- Billy's panel: subtle drop shadow for separation
- Writing area: clean, distraction-free
- Billy's messages: speech bubble style (friendly, conversational)

### Typography
- Billy's text: Sans-serif, friendly font (like Nunito or Quicksand)
- Student text: Dyslexia-friendly option (OpenDyslexic)
- Size: 14-16px for chat, 16-18px for writing area

### Spacing
- Generous padding in Billy's panel (not cramped)
- Writing area: full width focus when needed
- Mobile: Ensure thumb-friendly tap targets (44x44px minimum)

---

## Implementation Checklist

### Phase 1: MVP
- [ ] Billy personality system prompts by grade
- [ ] Basic chat UI component
- [ ] AI backend integration
- [ ] Desktop layout (side panel)
- [ ] Mobile layout (collapsible)
- [ ] Context awareness (lesson, prompt, draft)

### Phase 2: Polish
- [ ] Billy avatar illustrations
- [ ] Typing indicators
- [ ] Emotion-based responses (celebrating, encouraging)
- [ ] Session persistence
- [ ] Chat history

### Phase 3: Advanced
- [ ] Parent/teacher dashboard
- [ ] Analytics (common questions, usage)
- [ ] A/B testing prompts
- [ ] Multi-language support

---

**Last Updated:** 2026-02-13  
**Version:** 1.0  
**Designer:** Mushu 🐉 & Jes
