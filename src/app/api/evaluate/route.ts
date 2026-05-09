import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

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

export interface QuestionEvaluation {
  question: string;
  userAnswer: string;
  expectedAnswer: string;
  score: number;
  feedback: string;
}

export interface EvaluationResponse {
  overallScore: number;
  technicalAccuracy: number;
  communication: number;
  problemSolving: number;
  confidence: number;
  strengths: string[];
  growthAreas: string[];
  questionBreakdown: QuestionEvaluation[];
  hireRecommendation: string;
  finalVerdict: string;
}

const FALLBACK_RESPONSE: EvaluationResponse = {
  overallScore: 0,
  technicalAccuracy: 0,
  communication: 0,
  problemSolving: 0,
  confidence: 0,
  strengths: [],
  growthAreas: ["Evaluation parsing failed"],
  questionBreakdown: [],
  hireRecommendation: "Inconclusive",
  finalVerdict: "The evaluation engine encountered an error. Please try again."
};

/**
 * Ensures all fields in EvaluationResponse are present and valid
 */
function validateAndSanitize(data: any): EvaluationResponse {
  const sanitizeNum = (val: any) => typeof val === 'number' ? Math.min(100, Math.max(0, val)) : 0;

  return {
    overallScore: sanitizeNum(data.overallScore ?? data.overall_score),
    technicalAccuracy: sanitizeNum(data.technicalAccuracy ?? data.technical_accuracy),
    communication: sanitizeNum(data.communication),
    problemSolving: sanitizeNum(data.problemSolving ?? data.problem_solving),
    confidence: sanitizeNum(data.confidence),
    strengths: Array.isArray(data.strengths) ? data.strengths : [],
    growthAreas: Array.isArray(data.growthAreas ?? data.weaknesses) ? (data.growthAreas ?? data.weaknesses) : [],
    questionBreakdown: Array.isArray(data.questionBreakdown ?? data.improved_answers)
      ? (data.questionBreakdown ?? data.improved_answers).map((item: any) => ({
        question: item.question || "N/A",
        userAnswer: item.userAnswer ?? item.user_answer ?? "N/A",
        expectedAnswer: item.expectedAnswer ?? item.ideal_answer ?? "N/A",
        score: sanitizeNum(item.score),
        feedback: item.feedback || "N/A"
      }))
      : [],
    hireRecommendation: data.hireRecommendation ?? data.hire_recommendation ?? "N/A",
    finalVerdict: data.finalVerdict ?? data.final_verdict ?? "N/A"
  };
}

export async function POST(req: NextRequest) {
  console.log("--- Evaluation API Request Started ---");
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error("CRITICAL: GROQ_API_KEY is missing");
      return NextResponse.json({ success: false, error: "GROQ_API_KEY missing" }, { status: 500 });
    }

    const body: Partial<EvaluationRequest> = await req.json();
    console.log("Request Body:", JSON.stringify(body, null, 2));

    const { transcript, role, difficulty } = body;

    if (!transcript || !Array.isArray(transcript)) {
      console.error("Invalid transcript format");
      return NextResponse.json({ success: false, error: "Invalid transcript format" }, { status: 400 });
    }

    const formattedTranscript = transcript
      .map((t, i) => `Q${i + 1}: ${t.question}\nCandidate Answer: ${t.answer}`)
      .join("\n\n");

    const systemPrompt = `
Act as a strict Senior Technical Interviewer for a ${role} position (${difficulty} level).
Evaluate the candidate performance with extreme rigor.

### EVALUATION RULES:
1. ONLY evaluate the questions actually asked in the transcript. Do NOT invent new questions.
2. If the candidate's answers are nonsense (e.g., "asdf", "srgws") or empty, the score for that question MUST be near 0.
3. Random gibberish should result in low overall scores.
4. "expectedAnswer" must be a top-tier professional response that demonstrates deep technical knowledge.
5. Provide detailed, educational feedback for each answer.

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
  "hireRecommendation": "string (Strong Hire, Hire, Leaning Hire, Leaning No Hire, No Hire, Strong No Hire)",
  "finalVerdict": "string"
}
`;

    const userPrompt = `
TRANSCRIPT:
${formattedTranscript}

Return ONLY the JSON evaluation according to the schema. No conversational text.
`;

    console.log("Calling Groq API (llama3-8b-8192)...");
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.1,
    });

    const rawContent = response.choices[0]?.message?.content || "";
    console.log("Raw API Response Content:", rawContent);

    // SAFE JSON EXTRACTION LOGIC
    const cleaned = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/`json/g, "")
      .replace(/`/g, "")
      .trim();

    console.log("Cleaned Response Text:", cleaned);

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    console.log("JSON Match Found:", !!jsonMatch);

    if (!jsonMatch) {
      console.error("No valid JSON found in AI response");
      return NextResponse.json({
        success: true,
        ...FALLBACK_RESPONSE,
        growthAreas: ["No valid JSON found in AI response"]
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
      console.log("Parsed Object:", JSON.stringify(parsed, null, 2));
    } catch (parseErr) {
      console.error("JSON Parse Failed:", parseErr);
      return NextResponse.json({
        success: true,
        ...FALLBACK_RESPONSE,
        growthAreas: ["JSON parsing failed"]
      });
    }

    const validatedData = validateAndSanitize(parsed);
    console.log("Final Returned Object (Validated):", JSON.stringify(validatedData, null, 2));

    return NextResponse.json({
      success: true,
      ...validatedData
    });

  } catch (error: any) {
    console.error("GROQ BACKEND ERROR:", error);
    return NextResponse.json({
      success: true,
      ...FALLBACK_RESPONSE,
      finalVerdict: "Internal Server Error: " + (error.message || "Unknown error")
    });
  } finally {
    console.log("--- Evaluation API Request Completed ---");
  }
}
