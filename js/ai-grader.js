/**
 * AI Auto-Grader for BedrockELA
 * 
 * Uses AI to check student work with understanding for:
 * - Misspellings and typos
 * - Multiple valid answers
 * - Age-appropriate expectations
 * - Constructive feedback
 * 
 * NO human grading required!
 */

class AIGrader {
  constructor() {
    this.apiEndpoint = 'https://api.anthropic.com/v1/messages';
    this.apiKey = null; // Will be set from environment or config
    this.gradeCache = new Map(); // Cache recent gradings
  }

  /**
   * Grade a student's answer with AI
   * @param {Object} params - Grading parameters
   * @param {string} params.question - The question asked
   * @param {string} params.studentAnswer - What the student wrote
   * @param {string} params.expectedConcepts - Key concepts that should be present
   * @param {string} params.gradeLevel - Student's grade level (1st-6th)
   * @param {string} params.questionType - vocab|comprehension|grammar|writing|language
   * @returns {Promise<Object>} - Grade result with feedback
   */
  async gradeAnswer(params) {
    const {
      question,
      studentAnswer,
      expectedConcepts,
      gradeLevel,
      questionType = 'comprehension'
    } = params;

    // Basic validation
    if (!studentAnswer || studentAnswer.trim().length < 3) {
      return {
        score: 0,
        feedback: "⚠️ Please write a complete answer. Try again!",
        passed: false,
        needsWork: true
      };
    }

    // Word count check for vocab
    if (questionType === 'vocab') {
      const wordCount = studentAnswer.trim().split(/\s+/).length;
      if (wordCount < 10) {
        return {
          score: 0,
          feedback: `⚠️ Your definition needs at least 10 words. You have ${wordCount}. Add more details!`,
          passed: false,
          needsWork: true
        };
      }
    }

    // Check cache first
    const cacheKey = `${question}|${studentAnswer}|${expectedConcepts}`;
    if (this.gradeCache.has(cacheKey)) {
      return this.gradeCache.get(cacheKey);
    }

    // Build grading prompt
    const prompt = this.buildGradingPrompt(params);

    try {
      // Call AI API (we'll use a simple endpoint for now)
      const result = await this.callGradingAPI(prompt, gradeLevel);
      
      // Cache the result
      this.gradeCache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('AI Grading error:', error);
      
      // Fallback: Simple keyword check
      return this.fallbackGrading(studentAnswer, expectedConcepts);
    }
  }

  /**
   * Build a grading prompt for the AI
   */
  buildGradingPrompt(params) {
    const {
      question,
      studentAnswer,
      expectedConcepts,
      gradeLevel,
      questionType
    } = params;

    const gradeNum = gradeLevel.match(/\d+/)[0];

    return `You are a kind, encouraging teacher grading ${gradeLevel} ELA work.

QUESTION: ${question}

STUDENT ANSWER: "${studentAnswer}"

KEY CONCEPTS TO LOOK FOR: ${expectedConcepts}

QUESTION TYPE: ${questionType}

INSTRUCTIONS:
1. Check if the student understood the core concept, even if:
   - They misspelled words (be VERY forgiving)
   - They used different words than expected
   - Their grammar isn't perfect
   - They wrote more or less than expected

2. Grade based on UNDERSTANDING, not perfection.

3. For ${gradeNum}th grade, expect age-appropriate responses.

4. Give a score:
   - 100: Excellent! Shows clear understanding
   - 80-90: Good! Got the main idea with minor gaps
   - 60-70: Partial understanding, needs improvement
   - 40-50: Misunderstood or incomplete
   - 0-30: Did not answer or way off topic

5. Provide feedback that is:
   - Encouraging (always start with something positive)
   - Specific (tell them what to improve)
   - Helpful (guide them, don't just say "wrong")

RESPOND IN THIS EXACT JSON FORMAT:
{
  "score": <number 0-100>,
  "passed": <true if score >= 70, false otherwise>,
  "feedback": "<2-3 sentences of encouraging feedback>",
  "strengths": "<what they did well>",
  "improvements": "<what they could improve, or 'Great job!' if score is 90+>",
  "needsWork": <true if score < 70>
}`;
  }

  /**
   * Call the AI grading API (Firebase Function)
   */
  async callGradingAPI(prompt, gradeLevel) {
    // Call Firebase Cloud Function
    const functionUrl = 'https://us-central1-bedrockela-96dbd.cloudfunctions.net/gradeAnswer';
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        gradeLevel
      })
    });

    if (!response.ok) {
      throw new Error('Grading API failed');
    }

    return await response.json();
  }

  /**
   * Fallback grading when AI is unavailable
   */
  fallbackGrading(studentAnswer, expectedConcepts) {
    const answer = studentAnswer.toLowerCase();
    const concepts = expectedConcepts.toLowerCase().split(/[,;]/);
    
    let matchCount = 0;
    for (const concept of concepts) {
      // Fuzzy matching for concepts
      const words = concept.trim().split(/\s+/);
      if (words.some(word => answer.includes(word.toLowerCase()))) {
        matchCount++;
      }
    }

    const score = Math.round((matchCount / concepts.length) * 100);
    const passed = score >= 70;

    let feedback;
    if (score >= 90) {
      feedback = "✅ Excellent work! You clearly understand this concept.";
    } else if (score >= 70) {
      feedback = "👍 Good job! You got the main idea. Try to add more details next time.";
    } else if (score >= 50) {
      feedback = "⚠️ You're on the right track, but your answer is incomplete. Try to include more information.";
    } else {
      feedback = "❌ This answer needs work. Re-read the text and try to answer the question more completely.";
    }

    return {
      score,
      passed,
      feedback,
      needsWork: !passed,
      usingFallback: true
    };
  }

  /**
   * Grade an entire lesson page
   */
  async gradePage(pageData) {
    const results = {
      questions: [],
      overallScore: 0,
      passed: false,
      feedback: []
    };

    let totalScore = 0;
    let questionCount = 0;

    for (const question of pageData.questions) {
      const result = await this.gradeAnswer({
        question: question.text,
        studentAnswer: question.studentAnswer,
        expectedConcepts: question.expectedConcepts,
        gradeLevel: pageData.gradeLevel,
        questionType: question.type
      });

      results.questions.push({
        question: question.text,
        result
      });

      totalScore += result.score;
      questionCount++;

      if (result.needsWork) {
        results.feedback.push(`• ${question.text}: ${result.feedback}`);
      }
    }

    results.overallScore = Math.round(totalScore / questionCount);
    results.passed = results.overallScore >= 70;

    return results;
  }

  /**
   * Batch grade multiple answers at once (more efficient)
   */
  async batchGrade(answers) {
    // Grade all answers in parallel
    const promises = answers.map(answer => this.gradeAnswer(answer));
    return await Promise.all(promises);
  }
}

// Create global instance
window.aiGrader = new AIGrader();

// Auto-grading function that can be called from lessons
window.autoGradeAnswer = async function(questionId, questionText, expectedConcepts, questionType = 'comprehension') {
  const textarea = document.getElementById(questionId);
  if (!textarea) return null;

  const studentAnswer = textarea.value.trim();
  if (!studentAnswer) return null;

  // Get student data for grade level
  const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || '{}');
  const gradeLevel = studentData.gradeLevel || '4th-grade';

  // Show grading indicator
  const indicator = document.getElementById(`${questionId}-status`);
  if (indicator) {
    indicator.innerHTML = '⏳ Checking...';
    indicator.style.color = '#F59E0B';
  }

  try {
    const result = await window.aiGrader.gradeAnswer({
      question: questionText,
      studentAnswer,
      expectedConcepts,
      gradeLevel,
      questionType
    });

    // Show result
    if (indicator) {
      if (result.passed) {
        indicator.innerHTML = `✅ ${result.score}% - ${result.feedback}`;
        indicator.style.color = '#059669';
      } else {
        indicator.innerHTML = `${result.feedback}`;
        indicator.style.color = '#DC2626';
      }
    }

    // Store result in Firebase
    await window.saveGradingResult(questionId, result);

    return result;
  } catch (error) {
    console.error('Grading failed:', error);
    if (indicator) {
      indicator.innerHTML = '⚠️ Could not grade. Try again.';
      indicator.style.color = '#DC2626';
    }
    return null;
  }
};

// Save grading result to Firebase
window.saveGradingResult = async function(questionId, result) {
  const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || '{}');
  if (!studentData.uid || !window.db) return;

  const lessonId = window.currentLessonId || 'unknown';
  
  try {
    await window.db.collection('students')
      .doc(studentData.uid)
      .collection('gradedWork')
      .add({
        lessonId,
        questionId,
        score: result.score,
        passed: result.passed,
        feedback: result.feedback,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  } catch (error) {
    console.error('Failed to save grade:', error);
  }
};

console.log('✅ AI Auto-Grader loaded!');
