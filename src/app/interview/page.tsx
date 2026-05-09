"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionCard } from "@/components/QuestionCard";
import { SubmitButton } from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { useInterview } from "@/context/InterviewContext";
import { AlertTriangle, Loader2, BrainCircuit, CheckCircle2, Search, BarChart3, Fingerprint, Sparkles } from "lucide-react";

const ANALYSIS_STEPS = [
  { id: 0, text: "Initializing Interview Analysis...", icon: BrainCircuit },
  { id: 1, text: "Evaluating Technical Accuracy...", icon: Search },
  { id: 2, text: "Checking Communication Skills...", icon: Fingerprint },
  { id: 3, text: "Measuring Confidence Level...", icon: BarChart3 },
  { id: 4, text: "Generating Final Report...", icon: Sparkles },
];

export default function InterviewPage() {
  const router = useRouter();
  const { 
    selectedRole, 
    addAnswer, 
    warningCount,
    incrementWarning, 
    terminateInterview, 
    completeInterview,
    sessionQuestions,
    answers,
    difficulty,
    setEvaluationResult
  } = useInterview();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showWarningAlert, setShowWarningAlert] = useState(false);

  const questions = sessionQuestions;
  const totalQuestions = questions.length;

  useEffect(() => {
    if (!selectedRole) {
      router.replace("/");
    } else {
      setTimeLeft(totalQuestions * 5 * 60);
    }
  }, [selectedRole, totalQuestions, router]);

  // Anti-Cheat: Tab Switching Detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isEvaluating) {
        handleViolation();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isEvaluating]);

  // Monitor Warning Count
  useEffect(() => {
    if (warningCount >= 3) {
      terminateInterview();
      router.replace("/terminated");
    }
  }, [warningCount, terminateInterview, router]);

  // Timer Countdown
  useEffect(() => {
    if (timeLeft <= 0 || isEvaluating) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isEvaluating]);

  // Analysis Step Progression
  useEffect(() => {
    if (!isEvaluating) return;

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isEvaluating]);

  const handleViolation = useCallback(() => {
    incrementWarning();
    setShowWarningAlert(true);
    setTimeout(() => setShowWarningAlert(false), 3000);
  }, [incrementWarning]);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    handleViolation();
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    handleViolation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || isSubmitting || isEvaluating) return;

    setIsSubmitting(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    addAnswer(currentQuestion, answer);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
      setIsSubmitting(false);
    } else {
      // Final question - trigger evaluation
      setIsEvaluating(true);
      
      try {
        const transcript = [
          ...answers,
          { question: currentQuestion, answer: answer }
        ];

        // Start API call
        const apiPromise = fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript,
            role: selectedRole,
            difficulty: difficulty
          }),
        });

        // Ensure analysis animation plays for at least a few seconds
        const animationPromise = new Promise(resolve => setTimeout(resolve, 7500));

        const [response] = await Promise.all([apiPromise, animationPromise]);
        const data = await response.json();
        
        if (response.ok) {
          setEvaluationResult(data);
          completeInterview();
          router.replace("/results");
        } else {
          console.error("Evaluation failed", data);
          completeInterview();
          router.replace("/results");
        }
      } catch (error) {
        console.error("Error evaluating interview", error);
        completeInterview();
        router.replace("/results");
      } finally {
        setIsEvaluating(false);
        setIsSubmitting(false);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!selectedRole || questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-purple-500/30 overflow-hidden relative font-sans flex flex-col">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Navbar Minimal */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-4xl mx-auto w-full border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
             <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Battlefield AI</span>
        </div>
        
        <div className="flex items-center gap-4">
          {warningCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20">
              <AlertTriangle className="w-3.5 h-3.5" />
              {warningCount}/3 Warnings
            </div>
          )}
          <div className="text-sm font-mono bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <span className={timeLeft < 300 ? "text-red-400" : "text-white"}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </nav>

      {/* Futuristic Full-screen AI Analysis Overlay */}
      <AnimatePresence>
        {isEvaluating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black backdrop-blur-2xl flex flex-col items-center justify-center p-6"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 max-w-lg w-full">
                {/* Main AI Pulse Icon */}
                <div className="flex justify-center mb-12">
                    <motion.div
                        animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] border border-white/20">
                            <BrainCircuit className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>
                </div>

                <div className="text-center mb-12">
                    <motion.h2 
                        key={analysisStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold text-white mb-2 tracking-tight"
                    >
                        {ANALYSIS_STEPS[analysisStep].text}
                    </motion.h2>
                    <p className="text-gray-500 text-sm">Deep Intelligence Analysis in progress...</p>
                </div>

                {/* Staged Progress Steps */}
                <div className="space-y-4 mb-12">
                    {ANALYSIS_STEPS.map((step, index) => {
                        const isCompleted = index < analysisStep;
                        const isActive = index === analysisStep;
                        const Icon = step.icon;

                        return (
                            <motion.div 
                                key={step.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                    opacity: isActive || isCompleted ? 1 : 0.3,
                                    x: 0 
                                }}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                                    isActive ? 'bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-white/5 border-white/5'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 
                                    isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-gray-600'
                                }`}>
                                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />}
                                </div>
                                <span className={`text-sm font-medium ${isActive ? 'text-white' : isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {step.text}
                                </span>
                                {isActive && (
                                    <div className="ml-auto">
                                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Main Progress Bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: `${((analysisStep + 1) / ANALYSIS_STEPS.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Warning Alert */}
      <AnimatePresence>
        {showWarningAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-24 left-1/2 z-[60] bg-red-500/90 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-medium border border-red-400"
          >
            <AlertTriangle className="w-5 h-5" />
            Anti-Cheat Violation Detected!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center flex-1 pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="w-full flex justify-between text-sm text-gray-400 mb-6 px-1">
          <span className="font-medium">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <QuestionCard 
              role={selectedRole}
              question={currentQuestion}
            />
          </motion.div>
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full mt-8 flex flex-col gap-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-md transition-all duration-300 opacity-0 group-focus-within:opacity-100" />
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onPaste={handlePaste}
              onCopy={handleCopy}
              placeholder="Type your answer here... (Copy & Paste disabled)"
              className="relative w-full h-48 sm:h-64 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none transition-all shadow-inner"
              disabled={isSubmitting || isEvaluating}
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton 
              type="submit" 
              isLoading={isSubmitting} 
              disabled={answer.trim().length === 0 || isEvaluating}
            >
              {currentQuestionIndex === totalQuestions - 1 ? "Complete Interview" : "Submit & Next"}
            </SubmitButton>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
