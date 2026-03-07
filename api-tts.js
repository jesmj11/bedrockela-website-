/**
 * Simple Express server for ElevenLabs TTS proxy
 * Run this on Mac mini to serve TTS for BedrockELA lessons
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3002;

// Enable CORS for bedrockela.com
app.use(cors({
  origin: ['http://localhost:8000', 'https://bedrockela.com', 'http://bedrockela.com']
}));

app.use(express.json());

// ElevenLabs API key from environment
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error('ERROR: ELEVENLABS_API_KEY not set!');
  process.exit(1);
}

// Voice IDs for BedrockELA characters
const VOICES = {
  'billy': 'IKne3meq5aSn9XLyUdCD', // Charlie - energetic, confident
  'laura': 'FGY2WhTYpPnrIDTdsKH5', // Laura - enthusiastic
  'liam': 'TX3LPaxmHKxFdv7VOQHJ', // Liam - energetic male
  'default': 'IKne3meq5aSn9XLyUdCD' // Charlie by default
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
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
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
