import { Role, Difficulty, QuestionPool } from "./types";
import { frontendQuestions } from "./frontend";
import { backendQuestions } from "./backend";
import { aiQuestions } from "./ai";
import { hrQuestions } from "./hr";

export * from "./types";

export const roleQuestions: Record<Role, QuestionPool> = {
  "Frontend Developer": frontendQuestions,
  "Backend Developer": backendQuestions,
  "AI Engineer": aiQuestions,
  "HR Interview": hrQuestions
};

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets a random selection of questions for a specific role and difficulty
 */
export function getRandomQuestions(role: Role, difficulty: Difficulty, count: number = 5): string[] {
  const pool = roleQuestions[role]?.[difficulty];
  if (!pool) return [];
  
  const shuffledPool = shuffleArray(pool);
  return shuffledPool.slice(0, count);
}
