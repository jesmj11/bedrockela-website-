/**
 * BedrockELA Firebase Cloud Functions
 * Text-to-Speech using ElevenLabs API
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

/**
 * Text-to-Speech Function
 * Converts text to speech using ElevenLabs API
 * 
 * Deploy with: firebase deploy --only functions:textToSpeech
 * Set API key: firebase functions:config:set elevenlabs.api_key="YOUR_KEY"
 */
exports.textToSpeech = onRequest({
  cors: true,
  maxInstances: 10,
  timeoutSeconds: 60,
  memory: "256MiB"
}, async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { text, voice, voiceId, lessonId } = req.body;

  if (!text) {
    res.status(400).json({ success: false, error: 'Text required' });
    return;
  }

  // Get API key from environment variable
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  
  if (!ELEVENLABS_API_KEY) {
    logger.error('ELEVENLABS_API_KEY not set in environment');
    res.status(500).json({ success: false, error: 'TTS service not configured' });
    return;
  }

  // Voice ID mapping
  const voiceIds = {
    'Rachel': '21m00Tcm4TlvDq8ikWAM',
    'Domi': 'AZnzlk1XvdvUeBnXmlld',
    'Bella': 'EXAVITQu4vr4xnSDxMaL',
    'Antoni': 'ErXwobaYiN019PkySvjV',
    'Elli': 'MF3mGyEYCl7XYWbV9V6O',
    'Josh': 'TxGEqnHWrfWFTfGW9XjX',
    'Adam': 'pNInz6obpgDQGcFmaJgB'
  };

  // Use provided voiceId, or map from voice name, or default to Adam
  const selectedVoiceId = voiceId || voiceIds[voice] || voiceIds['Adam'];

  logger.info(`Generating TTS for lesson ${lessonId || 'unknown'} with voice ${selectedVoiceId}`);

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text.substring(0, 5000), // Limit to 5000 chars
          model_id: 'eleven_monolingual_v1',
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
      logger.error(`ElevenLabs API error: ${response.status}`, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    // Get audio buffer
    const buffer = await response.arrayBuffer();
    
    // Set headers and send audio
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(Buffer.from(buffer));

    logger.info(`TTS generated successfully for lesson ${lessonId || 'unknown'}`);

  } catch (error) {
    logger.error('TTS error:', error);
    res.status(500).json({ success: false, error: 'TTS generation failed' });
  }
});
