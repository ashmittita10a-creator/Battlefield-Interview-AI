"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Role, Difficulty } from "@/lib/questions";

export interface AnswerRecord {
  question: string;
  answer: string;
}

export interface InterviewSession {
  id: string;
  role: Role | null;
  difficulty: Difficulty | null;
  date: string;
  questions: string[];
  answers: AnswerRecord[];
  evaluation: any | null;
  isCompleted: boolean;
  isTerminated: boolean;
}

interface InterviewState {
  // Current Session State
  sessionId: string | null;
  selectedRole: Role | null;
  difficulty: Difficulty | null;
  sessionQuestions: string[];
  answers: AnswerRecord[];
  warningCount: number;
  isTerminated: boolean;
  isCompleted: boolean;
  evaluationResult: any | null;
  
  // History
  history: InterviewSession[];
  
  // Actions
  setRole: (role: Role) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setSessionQuestions: (questions: string[]) => void;
  addAnswer: (question: string, answer: string) => void;
  setEvaluationResult: (result: any) => void;
  incrementWarning: () => void;
  terminateInterview: () => void;
  completeInterview: () => void;
  resetInterview: () => void;
  deleteHistoryItem: (id: string) => void;
}

const InterviewContext = createContext<InterviewState | undefined>(undefined);

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  // Session State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [warningCount, setWarningCount] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);
  
  // Global App State
  const [history, setHistory] = useState<InterviewSession[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedState = localStorage.getItem("interviewState");
    const storedHistory = localStorage.getItem("interviewHistory");

    if (storedState) {
      try {
        const parsed = JSON.parse(storedState);
        setSessionId(parsed.sessionId || null);
        setSelectedRole(parsed.selectedRole || null);
        setDifficulty(parsed.difficulty || null);
        setSessionQuestions(parsed.sessionQuestions || []);
        setAnswers(parsed.answers || []);
        setWarningCount(parsed.warningCount || 0);
        setIsTerminated(parsed.isTerminated || false);
        setIsCompleted(parsed.isCompleted || false);
        setEvaluationResult(parsed.evaluationResult || null);
      } catch (e) {
        console.error("Failed to parse local storage state", e);
      }
    }

    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    setIsInitialized(true);
  }, []);

  // Save Current Session to local storage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(
      "interviewState",
      JSON.stringify({
        sessionId,
        selectedRole,
        difficulty,
        sessionQuestions,
        answers,
        warningCount,
        isTerminated,
        isCompleted,
        evaluationResult,
      })
    );
  }, [sessionId, selectedRole, difficulty, sessionQuestions, answers, warningCount, isTerminated, isCompleted, evaluationResult, isInitialized]);

  // Save History to local storage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("interviewHistory", JSON.stringify(history));
  }, [history, isInitialized]);

  const setRole = (role: Role) => {
    // If there's an existing session that's completed or we're starting fresh, reset first
    if (isCompleted || isTerminated || answers.length > 0) {
      resetInterview();
    }
    const newId = Date.now().toString();
    setSessionId(newId);
    setSelectedRole(role);
  };

  const setDifficultyState = (diff: Difficulty) => setDifficulty(diff);
  const setQuestionsState = (questions: string[]) => setSessionQuestions(questions);
  
  const addAnswer = (question: string, answer: string) => {
    setAnswers((prev) => [...prev, { question, answer }]);
  };

  const incrementWarning = () => {
    setWarningCount((prev) => prev + 1);
  };

  const terminateInterview = () => {
    setIsTerminated(true);
    archiveSession(true, false);
  };
  
  const completeInterview = () => {
    setIsCompleted(true);
    // archiveSession is called from the results/loading flow once evaluation is set
  };

  const archiveSession = (terminated: boolean, completed: boolean, evaluation: any = null) => {
    if (!sessionId || !selectedRole) return;

    const newSession: InterviewSession = {
      id: sessionId,
      role: selectedRole,
      difficulty: difficulty,
      date: new Date().toISOString(),
      questions: sessionQuestions,
      answers: answers,
      evaluation: evaluation || evaluationResult,
      isCompleted: completed,
      isTerminated: terminated
    };

    setHistory(prev => {
      // Prevent duplicates in history
      const exists = prev.find(s => s.id === sessionId);
      if (exists) return prev;
      return [newSession, ...prev];
    });
  };

  // We call this when evaluation is received to finalize the session in history
  const setEvaluationResultWithArchive = (result: any) => {
    setEvaluationResult(result);
    if (sessionId && selectedRole) {
      const newSession: InterviewSession = {
        id: sessionId,
        role: selectedRole,
        difficulty: difficulty,
        date: new Date().toISOString(),
        questions: sessionQuestions,
        answers: answers,
        evaluation: result,
        isCompleted: true,
        isTerminated: isTerminated
      };
      setHistory(prev => {
        const filtered = prev.filter(s => s.id !== sessionId);
        return [newSession, ...filtered];
      });
    }
  };

  const resetInterview = () => {
    setSessionId(null);
    setSelectedRole(null);
    setDifficulty(null);
    setSessionQuestions([]);
    setAnswers([]);
    setWarningCount(0);
    setIsTerminated(false);
    setIsCompleted(false);
    setEvaluationResult(null);
    localStorage.removeItem("interviewState");
    // History is preserved as it's separate
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(s => s.id !== id));
  };

  return (
    <InterviewContext.Provider
      value={{
        sessionId,
        selectedRole,
        difficulty,
        sessionQuestions,
        answers,
        warningCount,
        isTerminated,
        isCompleted,
        evaluationResult,
        history,
        setRole,
        setDifficulty: setDifficultyState,
        setSessionQuestions: setQuestionsState,
        addAnswer,
        setEvaluationResult: setEvaluationResultWithArchive,
        incrementWarning,
        terminateInterview,
        completeInterview,
        resetInterview,
        deleteHistoryItem,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
}
