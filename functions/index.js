/**
 * BedrockELA Firebase Cloud Functions
 * Text-to-Speech using ElevenLabs API
 * AI Feedback using Claude API
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

/**
 * AI Feedback Function
 * Reviews student answers and provides constructive feedback
 * 
 * Deploy with: firebase deploy --only functions:aiFeedback
 * Set API key: Set ANTHROPIC_API_KEY in environment
 */
exports.aiFeedback = onRequest({
  cors: true,
  maxInstances: 5,
  timeoutSeconds: 30,
  memory: "256MiB"
}, async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    res.status(400).json({ success: false, error: 'Answers array required' });
    return;
  }

  // Get API key from environment variable
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  
  if (!ANTHROPIC_API_KEY) {
    logger.error('ANTHROPIC_API_KEY not set in environment');
    res.status(500).json({ success: false, error: 'AI service not configured' });
    return;
  }

  // Build prompt
  const prompt = `You are a helpful 4th grade ELA teacher. Review these student answers and provide encouraging, constructive feedback. Keep feedback brief (2-3 sentences per answer) and age-appropriate.

${answers.map((a, i) => `
Question ${i + 1}: ${a.question}
Student's Answer: ${a.answer}
`).join('\n')}

For each answer, provide:
1. What they did well
2. One specific suggestion for improvement (if needed)
3. Overall encouragement

Format your response as JSON:
{
  "feedback": [
    {
      "questionNum": 1,
      "positive": "Great observation about...",
      "suggestion": "Consider adding...",
      "encouragement": "Keep up the good work!"
    }
  ]
}`;

  logger.info(`Generating AI feedback for ${answers.length} answers`);

  try {
    const response = await fetch(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`Claude API error: ${response.status}`, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const feedbackText = data.content[0].text;
    
    // Parse JSON response
    let feedback;
    try {
      feedback = JSON.parse(feedbackText);
    } catch (parseError) {
      logger.error('Failed to parse Claude response as JSON:', feedbackText);
      throw new Error('Invalid AI response format');
    }
    
    // Send feedback
    res.json({ success: true, feedback: feedback.feedback });

    logger.info(`AI feedback generated successfully for ${answers.length} answers`);

  } catch (error) {
    logger.error('AI feedback error:', error);
    res.status(500).json({ success: false, error: 'AI feedback generation failed' });
  }
});
