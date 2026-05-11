import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { analyzeInterviewLocally, EvaluationResponse } from "@/lib/resultAnalyzer";

export const dynamic = "force-dynamic";

// Initialize Groq Client (using OpenAI-compatible SDK)
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "temporary_key_for_build",
  baseURL: "https://api.groq.com/openai/v1",
});

export interface EvaluationRequest {
  transcript: { question: string; answer: string }[];
  role: string;
  difficulty: string;
}

/**
 * Ensures all fields in EvaluationResponse are present and valid
 */
function validateAndSanitize(data: any, fallback: EvaluationResponse): EvaluationResponse {
  const sanitizeNum = (val: any, def: number) => typeof val === 'number' ? Math.min(100, Math.max(0, val)) : def;

  return {
    overallScore: sanitizeNum(data.overallScore ?? data.overall_score, fallback.overallScore),
    technicalAccuracy: sanitizeNum(data.technicalAccuracy ?? data.technical_accuracy, fallback.technicalAccuracy),
    communication: sanitizeNum(data.communication, fallback.communication),
    problemSolving: sanitizeNum(data.problemSolving ?? data.problem_solving, fallback.problemSolving),
    confidence: sanitizeNum(data.confidence, fallback.confidence),
    strengths: Array.isArray(data.strengths) && data.strengths.length > 0 ? data.strengths : fallback.strengths,
    growthAreas: Array.isArray(data.growthAreas ?? data.weaknesses) && (data.growthAreas ?? data.weaknesses).length > 0 
      ? (data.growthAreas ?? data.weaknesses) 
      : fallback.growthAreas,
    questionBreakdown: Array.isArray(data.questionBreakdown ?? data.improved_answers)
      ? (data.questionBreakdown ?? data.improved_answers).map((item: any, idx: number) => {
          const fallbackItem = fallback.questionBreakdown[idx] || fallback.questionBreakdown[0];
          return {
            question: item.question || fallbackItem.question,
            userAnswer: item.userAnswer ?? item.user_answer ?? fallbackItem.userAnswer,
            expectedAnswer: item.expectedAnswer ?? item.ideal_answer ?? fallbackItem.expectedAnswer,
            score: sanitizeNum(item.score, fallbackItem.score),
            feedback: item.feedback || fallbackItem.feedback
          };
        })
      : fallback.questionBreakdown,
    hireRecommendation: data.hireRecommendation ?? data.hire_recommendation ?? fallback.hireRecommendation,
    finalVerdict: data.finalVerdict ?? data.final_verdict ?? fallback.finalVerdict
  };
}

export async function POST(req: NextRequest) {
  console.log("--- Evaluation API Request Started ---");
  
  // 1. GENERATE LOCAL BASELINE IMMEDIATELY
  let localResult: EvaluationResponse | null = null;
  let body: Partial<EvaluationRequest> = {};

  try {
    body = await req.json();
    const { transcript, role, difficulty } = body;

    if (!transcript || !Array.isArray(transcript)) {
      throw new Error("Invalid transcript format");
    }

    localResult = analyzeInterviewLocally(transcript, role || "Software Engineer", difficulty || "Medium");
    console.log("Local Baseline Generated Successfully");

  } catch (err: any) {
    console.error("Error generating local baseline:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }

  // 2. OPTIONAL AI ENHANCEMENT
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "temporary_key_for_build") {
      console.warn("GROQ_API_KEY is missing or invalid. Skipping AI enhancement.");
      return NextResponse.json({ success: true, ...localResult, aiEnhanced: false });
    }

    const { transcript, role, difficulty } = body;
    const formattedTranscript = transcript!
      .map((t, i) => `Q${i + 1}: ${t.question}\nCandidate Answer: ${t.answer}`)
      .join("\n\n");

    const systemPrompt = `
Act as a strict Senior Technical Interviewer for a ${role} position (${difficulty} level).
Evaluate the candidate performance with extreme rigor.

### EVALUATION RULES:
1. ONLY evaluate the questions actually asked in the transcript.
2. If answers are nonsense or empty, the score MUST be near 0.
3. Provide professional "expectedAnswer" and educational "feedback" for each question.

### EXPECTED OUTPUT SCHEMA (JSON ONLY):
{
  "overallScore": number (0-100),
  "technicalAccuracy": number (0-100),
  "communication": number (0-100),
  "problemSolving": number (0-100),
  "confidence": number (0-100),
  "strengths": ["string"],
  "growthAreas": ["string"],
  "questionBreakdown": [
    {
      "question": "string",
      "userAnswer": "string",
      "expectedAnswer": "string",
      "score": number (0-100),
      "feedback": "string"
    }
  ],
  "hireRecommendation": "string",
  "finalVerdict": "string"
}
`;

    const userPrompt = `TRANSCRIPT:\n${formattedTranscript}\n\nReturn ONLY JSON.`;

    console.log("Calling AI for enhancement...");
    
    // Set a timeout for the AI call to ensure "instant" fallback if AI is slow
    const aiPromise = groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.1,
    });

    const response = await Promise.race([
      aiPromise,
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error("AI Timeout")), 8000))
    ]);

    if (!response) throw new Error("AI returned null");

    const rawContent = response.choices[0]?.message?.content || "";
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error("No valid JSON found in AI response");

    const parsed = JSON.parse(jsonMatch[0]);
    const validatedData = validateAndSanitize(parsed, localResult!);

    console.log("AI Enhancement Successful");
    return NextResponse.json({
      success: true,
      ...validatedData,
      aiEnhanced: true
    });

  } catch (error: any) {
    console.error("AI ENHANCEMENT FAILED (using local fallback):", error.message);
    return NextResponse.json({
      success: true,
      ...localResult,
      aiEnhanced: false,
      fallbackReason: error.message
    });
  } finally {
    console.log("--- Evaluation API Request Completed ---");
  }
}
