/**
 * Simple Express server for ElevenLabs TTS proxy
 * Run this on Mac mini to serve TTS for BedrockELA lessons
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3002;

// Enable CORS for bedrockela.com and Firebase hosting
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000', 'http://localhost:8001', 'https://bedrockela.com', 'http://bedrockela.com', 'https://bedrockela-96dbd.web.app', 'https://bedrockela-96dbd.firebaseapp.com']
}));

app.use(express.json());

// ElevenLabs API key from environment
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error('ERROR: ELEVENLABS_API_KEY not set!');
  process.exit(1);
}

// Voice IDs for BedrockELA characters (using YOUR custom voices!)
const VOICES = {
  'billy': 'UgBBYS2sOqTuMpoF3BR0', // Mark - Natural Conversations (BILLY!)
  'mark': 'UgBBYS2sOqTuMpoF3BR0', // Mark - Natural Conversations
  'john': '7rQX8r6PVq3gfJ8rZzyE', // John of the North - Warm character voice
  'adam': 'NFG5qt843uXKj4pFvR7C', // Adam Stone - Smooth narrator
  'marshal': 'nzeAacJi50IvxcyDnMXa', // Marshal - Friendly, Funny Professor
  'default': 'UgBBYS2sOqTuMpoF3BR0' // Mark by default
};

/**
 * POST /tts
 * Body: { text: string, voice?: string }
 * Returns: audio/mpeg stream
 */
app.post('/tts', async (req, res) => {
  try {
    const { text, voice = 'default' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }
    
    // Get voice ID
    const voiceId = VOICES[voice] || VOICES.default;
    
    console.log(`[TTS] Generating audio for: "${text.substring(0, 50)}..." (voice: ${voice})`);
    
    // Call ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_turbo_v2_5', // Fast, high quality
          voice_settings: {
            stability: 0.3,  // Lower = more expressive, cheerful
            similarity_boost: 0.75,
            style: 0.4,  // Higher = more emotion, less robotic
            use_speaker_boost: true
          }
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[TTS] ElevenLabs error:', errorText);
      return res.status(response.status).json({ 
        error: 'TTS generation failed',
        details: errorText
      });
    }
    
    // Stream audio back to client
    res.set('Content-Type', 'audio/mpeg');
    response.body.pipe(res);
    
    console.log(`[TTS] Audio generated successfully`);
    
  } catch (error) {
    console.error('[TTS] Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', voices: Object.keys(VOICES) });
});

app.listen(PORT, () => {
  console.log(`✅ TTS API server running on http://localhost:${PORT}`);
  console.log(`Available voices: ${Object.keys(VOICES).join(', ')}`);
  console.log(`Endpoint: POST /tts with { text: string, voice?: string }`);
});
