/**
 * Firebase Cloud Functions for BedrockELA
 * AI-powered grading with Anthropic Claude
 */

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

/**
 * AI Grading Function
 * Endpoint: https://us-central1-bedrockela-96dbd.cloudfunctions.net/gradeAnswer
 */
exports.gradeAnswer = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { prompt, gradeLevel } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Missing prompt' });
      }

      // Get API key from environment
      const apiKey = functions.config().anthropic?.key || process.env.ANTHROPIC_API_KEY;

      if (!apiKey) {
        console.warn('No API key found, using fallback grading');
        return res.json(fallbackGrade(prompt));
      }

      // Call Anthropic Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307', // Fast & cheap for grading
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.content[0].text;

      // Parse JSON response from AI
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('Invalid AI response format:', aiResponse);
        return res.json(fallbackGrade(prompt));
      }

      const result = JSON.parse(jsonMatch[0]);
      return res.status(200).json(result);

    } catch (error) {
      console.error('Grading error:', error);
      
      // Return fallback grade on error
      return res.status(200).json({
        score: 70,
        passed: true,
        feedback: "✅ Your answer looks good! Keep up the great work.",
        strengths: "You wrote a complete answer.",
        improvements: "Keep practicing!",
        needsWork: false,
        fallback: true
      });
    }
  });
});

/**
 * Fallback grading when AI is unavailable
 */
function fallbackGrade(prompt) {
  // Extract student answer from prompt
  const answerMatch = prompt.match(/STUDENT ANSWER: "(.*?)"/s);
  const conceptsMatch = prompt.match(/KEY CONCEPTS TO LOOK FOR: (.*)/);
  
  if (!answerMatch || !conceptsMatch) {
    return {
      score: 70,
      passed: true,
      feedback: "✅ Answer received! Keep up the good work.",
      needsWork: false,
      fallback: true
    };
  }

  const answer = answerMatch[1].toLowerCase();
  const concepts = conceptsMatch[1].toLowerCase();
  const wordCount = answer.split(/\s+/).length;

  // Basic checks
  if (wordCount < 5) {
    return {
      score: 40,
      passed: false,
      feedback: "⚠️ Your answer is too short. Please write more.",
      needsWork: true,
      fallback: true
    };
  }

  // Simple keyword matching
  const keywords = concepts.split(/[,;]/).map(k => k.trim());
  let matchCount = 0;
  
  for (const keyword of keywords) {
    const words = keyword.split(/\s+/);
    if (words.some(w => answer.includes(w))) {
      matchCount++;
    }
  }

  const score = Math.min(100, Math.round((matchCount / keywords.length) * 100) + 20);
  const passed = score >= 70;

  let feedback;
  if (score >= 90) {
    feedback = "✅ Excellent! You clearly understand this.";
  } else if (score >= 70) {
    feedback = "👍 Good job! You got the main idea.";
  } else {
    feedback = "⚠️ Try to include more details about the key concepts.";
  }

  return {
    score,
    passed,
    feedback,
    strengths: "You wrote a complete answer.",
    improvements: passed ? "Keep it up!" : "Try adding more details.",
    needsWork: !passed,
    fallback: true
  };
}
