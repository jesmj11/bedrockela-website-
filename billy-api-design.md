# Billy the Goat - API Design & Backend Architecture

## Overview

This document defines the complete API structure, backend architecture, and implementation details for Billy's AI-powered writing assistant.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Writing Area │  │ Billy Panel  │  │ Chat UI      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTPS
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   API Gateway / Router                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ /chat        │  │ /session     │  │ /context     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────────┬─────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ↓                       ↓
┌─────────────────────────┐  ┌─────────────────────────┐
│   Billy Service         │  │  Database / Cache       │
│  ┌──────────────────┐   │  │  ┌──────────────────┐   │
│  │ Prompt Builder   │   │  │  │ Sessions         │   │
│  │ Context Injector │   │  │  │ Chat History     │   │
│  │ Response Filter  │   │  │  │ Lesson Context   │   │
│  └──────────────────┘   │  │  └──────────────────┘   │
└───────────┬─────────────┘  └─────────────────────────┘
            │
            ↓
┌─────────────────────────┐
│    AI Provider          │
│  (OpenAI / Anthropic)   │
└─────────────────────────┘
```

---

## API Endpoints

### 1. POST `/api/billy/chat`

**Purpose:** Send a message to Billy and get a response

**Request:**
```json
{
  "session_id": "ses_abc123",
  "message": "I don't know what to write",
  "context": {
    "grade": 4,
    "lesson_id": "wiz-oz-ch3",
    "prompt": "Write about a time you felt brave like Dorothy.",
    "draft": "When I",
    "time_elapsed_minutes": 5,
    "word_count": 2
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "That's okay! Let's think together. Dorothy felt brave when she stood up to the Wicked Witch. Can you think of a time YOU did something even though you were scared? 🐐",
  "emotion": "encouraging",
  "timestamp": "2026-02-13T16:15:00Z",
  "metadata": {
    "tokens_used": 85,
    "response_time_ms": 1200
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "rate_limit_exceeded",
  "message": "Please wait a moment before sending another message.",
  "retry_after_seconds": 10
}
```

---

### 2. POST `/api/billy/session/start`

**Purpose:** Initialize a new writing session with Billy

**Request:**
```json
{
  "user_id": "usr_123",
  "grade": 4,
  "lesson": {
    "id": "wiz-oz-ch3",
    "title": "The Wizard of Oz - Chapter 3",
    "prompt": "Write about a time you felt brave like Dorothy."
  }
}
```

**Response:**
```json
{
  "success": true,
  "session_id": "ses_abc123",
  "welcome_message": "Hi! I'm Billy! 🐐 I'm here to help you write. Just ask if you get stuck!",
  "expires_at": "2026-02-13T18:00:00Z"
}
```

---

### 3. GET `/api/billy/session/{session_id}`

**Purpose:** Retrieve chat history for a session

**Response:**
```json
{
  "success": true,
  "session_id": "ses_abc123",
  "messages": [
    {
      "role": "assistant",
      "content": "Hi! I'm Billy! 🐐",
      "timestamp": "2026-02-13T16:00:00Z"
    },
    {
      "role": "user",
      "content": "How do you spell scared?",
      "timestamp": "2026-02-13T16:05:00Z"
    },
    {
      "role": "assistant",
      "content": "Let's sound it out together! What sounds do you hear? Ss-kay-rrr-d 📝",
      "timestamp": "2026-02-13T16:05:02Z"
    }
  ],
  "metadata": {
    "total_messages": 3,
    "duration_minutes": 15,
    "student_word_count": 45
  }
}
```

---

### 4. POST `/api/billy/session/end`

**Purpose:** Close a writing session and save final state

**Request:**
```json
{
  "session_id": "ses_abc123",
  "final_draft": "When I stood at the top of the big slide...",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Great work today! You wrote 78 words! 🎉",
  "summary": {
    "duration_minutes": 18,
    "word_count": 78,
    "messages_exchanged": 7,
    "improvements_made": 3
  }
}
```

---

### 5. GET `/api/billy/context/{lesson_id}`

**Purpose:** Get lesson context for Billy (prompt, objectives, etc.)

**Response:**
```json
{
  "success": true,
  "lesson": {
    "id": "wiz-oz-ch3",
    "title": "The Wizard of Oz - Chapter 3",
    "grade": 4,
    "unit": "Novel Study",
    "day": 15,
    "prompt": "Write about a time you felt brave like Dorothy. Describe what you saw, heard, and felt.",
    "learning_objectives": [
      "Use descriptive language",
      "Write in first person",
      "Include sensory details"
    ],
    "vocabulary": ["courage", "fear", "determination"]
  }
}
```

---

### 6. POST `/api/billy/feedback` (Optional - Teacher Dashboard)

**Purpose:** Allow teachers to provide feedback on Billy's responses

**Request:**
```json
{
  "session_id": "ses_abc123",
  "message_id": "msg_789",
  "feedback": "helpful",
  "notes": "Billy helped the student overcome writing block"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your feedback!"
}
```

---

## Backend Service Structure

### Technology Stack Options

**Option 1: Node.js + Express**
```javascript
// Lightweight, fast, good for real-time
const express = require('express');
const openai = require('openai');
const redis = require('redis');

// Good for: Quick MVP, small-to-medium scale
```

**Option 2: Python + FastAPI**
```python
# Better AI library support, more ML tools
from fastapi import FastAPI
from openai import AsyncOpenAI
import redis.asyncio as redis

# Good for: Advanced AI features, ML pipelines
```

**Option 3: Serverless (Vercel/Netlify Functions)**
```javascript
// No server management, scales automatically
export default async function handler(req, res) {
  // API logic here
}

// Good for: Cost optimization, auto-scaling
```

**Recommendation:** Start with **Option 1 (Node.js + Express)** for BedrockELA's GitHub Pages deployment, then migrate to serverless if needed.

---

## Backend Implementation (Node.js)

### Project Structure
```
billy-backend/
├── src/
│   ├── routes/
│   │   ├── chat.js
│   │   ├── session.js
│   │   └── context.js
│   ├── services/
│   │   ├── billyService.js     # Core Billy logic
│   │   ├── promptBuilder.js    # System prompt construction
│   │   ├── aiProvider.js       # OpenAI/Anthropic wrapper
│   │   └── contentFilter.js    # Safety checks
│   ├── models/
│   │   ├── Session.js
│   │   └── Message.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── validation.js
│   └── config/
│       ├── prompts/            # Grade-level prompts
│       │   ├── grades-1-2.txt
│       │   ├── grades-3-5.txt
│       │   └── grades-6-8.txt
│       └── settings.js
├── tests/
├── package.json
└── README.md
```

---

### Core Service: `billyService.js`

```javascript
const { OpenAI } = require('openai');
const promptBuilder = require('./promptBuilder');
const contentFilter = require('./contentFilter');

class BillyService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  /**
   * Generate Billy's response to a student message
   */
  async chat(sessionId, userMessage, context) {
    try {
      // 1. Build system prompt with context
      const systemPrompt = await promptBuilder.build(context.grade, context);

      // 2. Get chat history
      const history = await this.getHistory(sessionId);

      // 3. Check content safety
      const safetyCheck = await contentFilter.check(userMessage);
      if (!safetyCheck.safe) {
        return this.getSafetyResponse(safetyCheck.reason);
      }

      // 4. Call AI provider
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: userMessage }
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: messages,
        temperature: 0.7,
        max_tokens: 150,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
      });

      const billyResponse = response.choices[0].message.content;

      // 5. Save to history
      await this.saveMessage(sessionId, 'user', userMessage);
      await this.saveMessage(sessionId, 'assistant', billyResponse);

      // 6. Detect emotion for UI
      const emotion = this.detectEmotion(billyResponse);

      return {
        success: true,
        message: billyResponse,
        emotion: emotion,
        metadata: {
          tokens_used: response.usage.total_tokens,
          response_time_ms: Date.now() - startTime
        }
      };

    } catch (error) {
      console.error('Billy chat error:', error);
      return {
        success: false,
        error: 'internal_error',
        message: 'Oops! Billy had trouble responding. Try again? 🐐'
      };
    }
  }

  /**
   * Detect emotion from Billy's response for UI animations
   */
  detectEmotion(message) {
    if (message.includes('🎉') || message.includes('YES!') || message.includes('Awesome')) {
      return 'celebrating';
    }
    if (message.includes('🤔') || message.includes('Let\\'s think')) {
      return 'thinking';
    }
    if (message.includes('💡') || message.includes('Great idea')) {
      return 'idea';
    }
    return 'encouraging';
  }

  /**
   * Safety response for filtered content
   */
  getSafetyResponse(reason) {
    return {
      success: true,
      message: "Let's keep our writing focused on the lesson! 🐐",
      emotion: 'neutral',
      flagged: true,
      reason: reason
    };
  }

  // Additional methods...
  async getHistory(sessionId) { /* ... */ }
  async saveMessage(sessionId, role, content) { /* ... */ }
}

module.exports = new BillyService();
```

---

### Prompt Builder: `promptBuilder.js`

```javascript
const fs = require('fs').promises;
const path = require('path');

class PromptBuilder {
  constructor() {
    this.promptCache = new Map();
  }

  /**
   * Build complete system prompt with grade level + context
   */
  async build(grade, context) {
    // Load base prompt for grade
    const gradePrompt = await this.loadGradePrompt(grade);

    // Inject lesson context
    const contextBlock = this.buildContextBlock(context);

    // Combine
    return `${gradePrompt}\n\n${contextBlock}`;
  }

  /**
   * Load grade-specific prompt from file
   */
  async loadGradePrompt(grade) {
    let promptFile;
    if (grade <= 2) {
      promptFile = 'grades-1-2.txt';
    } else if (grade <= 5) {
      promptFile = 'grades-3-5.txt';
    } else {
      promptFile = 'grades-6-8.txt';
    }

    // Check cache first
    if (this.promptCache.has(promptFile)) {
      return this.promptCache.get(promptFile);
    }

    // Load from file
    const promptPath = path.join(__dirname, '../config/prompts', promptFile);
    const prompt = await fs.readFile(promptPath, 'utf8');
    
    // Cache it
    this.promptCache.set(promptFile, prompt);
    
    return prompt;
  }

  /**
   * Build context block for injection
   */
  buildContextBlock(context) {
    return `
CURRENT CONTEXT:
- Grade: ${context.grade}
- Lesson: ${context.lesson_id || 'Unknown'}
- Writing Prompt: "${context.prompt || 'Write about the topic.'}"
- Student's Current Draft: "${context.draft || '[Nothing written yet]'}"
- Time Elapsed: ${context.time_elapsed_minutes || 0} minutes
- Word Count: ${context.word_count || 0} words

Refer to this context when responding. Be specific to their situation.
`;
  }
}

module.exports = new PromptBuilder();
```

---

### Content Filter: `contentFilter.js`

```javascript
class ContentFilter {
  constructor() {
    // Inappropriate keywords (basic filter)
    this.blockedWords = [
      /* Add age-appropriate filter list */
    ];
  }

  /**
   * Check if content is safe for students
   */
  async check(message) {
    const lower = message.toLowerCase();

    // Check for blocked words
    for (const word of this.blockedWords) {
      if (lower.includes(word)) {
        return {
          safe: false,
          reason: 'inappropriate_language',
          flagged_word: word
        };
      }
    }

    // Check for personal information requests
    if (this.containsPersonalInfoRequest(lower)) {
      return {
        safe: false,
        reason: 'personal_info_request'
      };
    }

    // Could add AI-based content moderation here
    // const moderation = await openai.moderations.create({ input: message });

    return { safe: true };
  }

  containsPersonalInfoRequest(text) {
    const patterns = [
      'what is your address',
      'where do you live',
      'what is your phone number',
      'tell me your email'
    ];
    return patterns.some(pattern => text.includes(pattern));
  }
}

module.exports = new ContentFilter();
```

---

### Route Example: `routes/chat.js`

```javascript
const express = require('express');
const router = express.Router();
const billyService = require('../services/billyService');
const { validateSession, validateMessage } = require('../middleware/validation');
const rateLimit = require('../middleware/rateLimit');

/**
 * POST /api/billy/chat
 * Send message to Billy
 */
router.post('/', 
  rateLimit({ max: 30, window: '1m' }), // 30 messages per minute
  validateSession,
  validateMessage,
  async (req, res) => {
    try {
      const { session_id, message, context } = req.body;

      const response = await billyService.chat(session_id, message, context);

      res.json(response);

    } catch (error) {
      console.error('Chat endpoint error:', error);
      res.status(500).json({
        success: false,
        error: 'internal_error',
        message: 'Something went wrong. Please try again.'
      });
    }
  }
);

module.exports = router;
```

---

## Database Schema

### Sessions Table
```sql
CREATE TABLE sessions (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  grade INTEGER NOT NULL,
  lesson_id VARCHAR(100),
  lesson_title TEXT,
  prompt TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  completed BOOLEAN DEFAULT FALSE,
  final_draft TEXT,
  INDEX idx_user_created (user_id, created_at)
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(50) REFERENCES sessions(id),
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  emotion VARCHAR(50), -- for Billy's messages
  flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session_created (session_id, created_at)
);
```

### Session Metadata Table
```sql
CREATE TABLE session_metadata (
  session_id VARCHAR(50) PRIMARY KEY REFERENCES sessions(id),
  total_messages INTEGER DEFAULT 0,
  total_tokens_used INTEGER DEFAULT 0,
  duration_minutes INTEGER DEFAULT 0,
  student_word_count INTEGER DEFAULT 0,
  improvements_made INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Rate Limiting & Cost Control

### Per-Student Limits
```javascript
const limits = {
  messagesPerSession: 50,      // Max 50 messages per writing session
  sessionsPerDay: 10,           // Max 10 sessions per student per day
  tokensPerSession: 5000,       // Max tokens per session (~$0.25)
  concurrentSessions: 2         // Max 2 active sessions per student
};
```

### Cost Estimation
```
GPT-4 Pricing (as of 2024):
- Input: $0.03 / 1K tokens
- Output: $0.06 / 1K tokens

Average session:
- 20 messages × 150 tokens each = 3,000 tokens
- Cost: ~$0.15 per session

1,000 students × 180 days × 1 session/day = 180,000 sessions
Total cost: ~$27,000/year

With GPT-3.5-turbo (cheaper):
- ~$2,700/year (90% savings)
```

**Recommendation:** Start with GPT-3.5-turbo for MVP, upgrade to GPT-4 for premium tier.

---

## Security & Privacy

### Authentication
```javascript
// JWT token validation
const jwt = require('jsonwebtoken');

function validateSession(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'invalid_token' });
  }
}
```

### Data Retention
- Chat messages: 30 days (then deleted)
- Session summaries: 1 year (for analytics)
- No personal information stored beyond user_id
- COPPA/FERPA compliance

### HTTPS Only
- All API endpoints require HTTPS
- No unencrypted data transmission
- API keys stored in environment variables

---

## Deployment Options

### Option 1: Vercel (Recommended for MVP)
```bash
# Deploy serverless functions
vercel deploy

# Environment variables in Vercel dashboard
OPENAI_API_KEY=sk-...
DATABASE_URL=postgres://...
JWT_SECRET=...
```

**Pros:** Easy, auto-scaling, free tier generous  
**Cons:** Cold starts (mitigated with warming)

### Option 2: Railway / Render
```yaml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
```

**Pros:** Always warm, simple pricing  
**Cons:** Minimum monthly cost (~$5-10)

### Option 3: Self-Hosted (VPS)
```bash
# PM2 for process management
pm2 start src/index.js --name billy-api
pm2 save
```

**Pros:** Full control, lowest cost at scale  
**Cons:** More DevOps work

---

## Testing Strategy

### Unit Tests
```javascript
// tests/billyService.test.js
describe('BillyService', () => {
  it('should respond encouragingly to stuck student', async () => {
    const response = await billyService.chat(
      'test_session',
      "I don't know what to write",
      { grade: 4, prompt: "Write about..." }
    );
    
    expect(response.success).toBe(true);
    expect(response.message).toContain('okay');
    expect(response.emotion).toBe('encouraging');
  });
});
```

### Integration Tests
```javascript
// Test full API flow
it('should complete a full chat session', async () => {
  // Start session
  const session = await request(app)
    .post('/api/billy/session/start')
    .send({ grade: 4, lesson: {...} });
  
  // Send message
  const chat = await request(app)
    .post('/api/billy/chat')
    .send({ session_id: session.body.session_id, message: "help!" });
  
  expect(chat.body.success).toBe(true);
});
```

---

## Monitoring & Analytics

### Key Metrics to Track
- Response time (target: <2s)
- Success rate (target: >99%)
- Token usage (cost monitoring)
- Session completion rate
- Most common student questions
- Average messages per session

### Tools
- **Logging:** Winston or Pino
- **Monitoring:** Sentry for errors
- **Analytics:** Custom dashboard (sessions, costs, usage)

---

## Next Steps

1. **Set up development environment**
   - Initialize Node.js project
   - Install dependencies (Express, OpenAI, etc.)
   
2. **Implement core services**
   - BillyService with OpenAI integration
   - Prompt builder with grade-level logic
   - Content filtering
   
3. **Build API endpoints**
   - Chat, session management, context retrieval
   
4. **Set up database**
   - PostgreSQL or MongoDB
   - Session and message tables
   
5. **Deploy MVP**
   - Vercel or Railway
   - Environment variables configured
   
6. **Frontend integration**
   - Connect React components to API
   - Handle loading states, errors

---

**Last Updated:** 2026-02-13  
**Version:** 1.0  
**Ready for Implementation**
