import { Role, Difficulty } from "./questions";

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

const ROLE_KEYWORDS: Record<string, string[]> = {
  "Frontend Developer": [
    "react", "component", "hook", "state", "effect", "props", "css", "tailwind", "rendering", "dom", 
    "virtual", "ssr", "ssg", "csr", "bundle", "performance", "webpack", "vite", "redux", "context", 
    "typescript", "accessibility", "seo", "flexbox", "grid", "html", "javascript", "browser", "api"
  ],
  "Backend Developer": [
    "api", "endpoint", "database", "sql", "nosql", "mongodb", "postgresql", "redis", "caching", 
    "authentication", "jwt", "authorization", "server", "express", "node", "go", "python", "java", 
    "microservices", "docker", "kubernetes", "ci/cd", "scalability", "performance", "security", "cors",
    "rest", "graphql", "middleware", "orm"
  ],
  "AI Engineer": [
    "model", "training", "inference", "llm", "gpt", "bert", "transformer", "neural", "network", 
    "weights", "bias", "gradient", "loss", "optimizer", "dataset", "preprocessing", "fine-tuning", 
    "rag", "vector", "embedding", "cosine", "similarity", "pytorch", "tensorflow", "scikit", "python",
    "nlp", "vision", "reinforcement"
  ],
  "HR Interview": [
    "teamwork", "leadership", "conflict", "communication", "culture", "growth", "feedback", "project", 
    "deadline", "priority", "weakness", "strength", "management", "collaboration", "motivation",
    "experience", "challenge", "resolution", "goal"
  ]
};

const HESITATION_MARKERS = ["maybe", "i think", "not sure", "possibly", "um", "uh", "kind of", "sort of"];
const STRUCTURE_MARKERS = ["first", "second", "then", "finally", "because", "however", "consequently", "specifically"];

export function analyzeInterviewLocally(
  transcript: { question: string; answer: string }[],
  role: string,
  difficulty: string
): EvaluationResponse {
  const keywords = ROLE_KEYWORDS[role] || [];
  
  let totalTechnicalScore = 0;
  let totalCommunicationScore = 0;
  let totalConfidenceScore = 0;
  let totalProblemSolvingScore = 0;

  const questionBreakdown: QuestionEvaluation[] = transcript.map((t) => {
    const answer = t.answer.toLowerCase();
    const words = answer.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // Technical Score Heuristic
    let techScore = 40; // Base
    if (wordCount > 50) techScore += 20;
    else if (wordCount > 20) techScore += 10;
    
    let keywordMatches = 0;
    keywords.forEach(kw => {
      if (answer.includes(kw.toLowerCase())) {
        techScore += 5;
        keywordMatches++;
      }
    });
    techScore = Math.min(95, techScore);
    if (wordCount < 10) techScore = Math.max(10, techScore - 40);

    // Communication Score Heuristic
    let commScore = 50; // Base
    if (wordCount > 30) commScore += 15;
    if (answer.split(/[.!?]/).length > 2) commScore += 10; // Sentence complexity
    commScore = Math.min(95, commScore);
    if (wordCount < 5) commScore = 20;

    // Confidence Score Heuristic
    let confScore = 70; // Base
    HESITATION_MARKERS.forEach(marker => {
      if (answer.includes(marker)) confScore -= 8;
    });
    if (wordCount > 40) confScore += 10;
    confScore = Math.max(10, Math.min(95, confScore));

    // Problem Solving Heuristic
    let psScore = 50; // Base
    STRUCTURE_MARKERS.forEach(marker => {
      if (answer.includes(marker)) psScore += 8;
    });
    if (wordCount > 60) psScore += 10;
    psScore = Math.min(95, psScore);

    totalTechnicalScore += techScore;
    totalCommunicationScore += commScore;
    totalConfidenceScore += confScore;
    totalProblemSolvingScore += psScore;

    return {
      question: t.question,
      userAnswer: t.answer,
      expectedAnswer: `A comprehensive answer for this ${role} role would ideally cover core principles, best practices, and practical examples related to the question. Focus on structured reasoning and technical precision.`,
      score: techScore,
      feedback: wordCount < 15 
        ? "Your answer was quite brief. Try to elaborate more on your thought process and provide specific examples." 
        : keywordMatches < 2 
          ? "You communicated clearly, but adding more role-specific terminology could strengthen your technical profile." 
          : "Solid response. You demonstrated good understanding and used appropriate terminology."
    };
  });

  const count = transcript.length || 1;
  const avgTech = Math.round(totalTechnicalScore / count);
  const avgComm = Math.round(totalCommunicationScore / count);
  const avgConf = Math.round(totalConfidenceScore / count);
  const avgPS = Math.round(totalProblemSolvingScore / count);
  
  const overallScore = Math.round((avgTech * 0.4) + (avgComm * 0.2) + (avgPS * 0.2) + (avgConf * 0.2));

  const strengths: string[] = [];
  if (avgTech > 70) strengths.push(`Strong fundamental knowledge in ${role} concepts.`);
  if (avgComm > 75) strengths.push("Excellent communication and clarity in explaining ideas.");
  if (avgConf > 75) strengths.push("Displays high confidence and professional composure.");
  if (avgPS > 70) strengths.push("Structured approach to problem-solving and reasoning.");
  if (strengths.length === 0) strengths.push("Consistently attempted all questions with relevant context.");

  const growthAreas: string[] = [];
  if (avgTech < 60) growthAreas.push(`Deepen technical expertise in core ${role} domains.`);
  if (avgComm < 65) growthAreas.push("Work on articulating complex thoughts more concisely.");
  if (avgConf < 65) growthAreas.push("Reduce use of hesitation markers to project more authority.");
  if (avgPS < 60) growthAreas.push("Practice structured answering techniques like the STAR method.");
  if (growthAreas.length === 0) growthAreas.push("Focus on providing more detailed real-world examples in your answers.");

  let hireRecommendation = "Leaning No Hire";
  if (overallScore >= 85) hireRecommendation = "Strong Hire";
  else if (overallScore >= 75) hireRecommendation = "Hire";
  else if (overallScore >= 65) hireRecommendation = "Leaning Hire";
  else if (overallScore >= 50) hireRecommendation = "No Hire";

  return {
    overallScore,
    technicalAccuracy: avgTech,
    communication: avgComm,
    problemSolving: avgPS,
    confidence: avgConf,
    strengths,
    growthAreas,
    questionBreakdown,
    hireRecommendation,
    finalVerdict: `Local Analysis: You demonstrated an overall proficiency of ${overallScore}%. ${strengths[0]}`
  };
}
