"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Home, 
  RefreshCw, 
  BrainCircuit, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Trophy,
  Zap,
  History,
  MessageSquare,
  Lightbulb,
  FileDown,
  Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useInterview } from "@/context/InterviewContext";
import { useEffect, useState } from "react";
import { generateInterviewPDF } from "@/lib/pdf-generator";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
} from "recharts";

export default function ResultsPage() {
  const router = useRouter();
  const { 
    selectedRole, 
    difficulty,
    answers, 
    isCompleted, 
    evaluationResult,
    resetInterview 
  } = useInterview();

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    // If somehow landed here without completing, redirect home
    if (!isCompleted && answers.length === 0) {
      router.replace("/");
    }
  }, [isCompleted, answers, router]);

  const handleReturnHome = () => {
    resetInterview();
    router.replace("/");
  };

  const handleRetake = () => {
    resetInterview();
    router.replace("/role");
  };

  const handleViewHistory = () => {
    router.push("/history");
  };

  const handleDownloadPDF = () => {
    if (!evaluationResult || !selectedRole) return;

    generateInterviewPDF({
      role: selectedRole,
      difficulty: difficulty || "Medium",
      date: new Date().toISOString(),
      overallScore: evaluationResult.overallScore,
      metrics: {
        technicalAccuracy: evaluationResult.technicalAccuracy,
        communication: evaluationResult.communication,
        problemSolving: evaluationResult.problemSolving,
        confidence: evaluationResult.confidence,
      },
      strengths: evaluationResult.strengths,
      growthAreas: evaluationResult.growthAreas,
      finalVerdict: evaluationResult.finalVerdict,
      questionBreakdown: evaluationResult.questionBreakdown,
    });
  };

  if (!selectedRole || answers.length === 0) return null;

  // Prepare chart data from evaluationResult
  const radarData = evaluationResult ? [
    { subject: 'Technical', A: evaluationResult.technicalAccuracy, fullMark: 100 },
    { subject: 'Communication', A: evaluationResult.communication, fullMark: 100 },
    { subject: 'Problem Solving', A: evaluationResult.problemSolving, fullMark: 100 },
    { subject: 'Confidence', A: evaluationResult.confidence, fullMark: 100 },
  ] : [];

  const statCards = evaluationResult ? [
    { label: "Technical Accuracy", value: evaluationResult.technicalAccuracy, icon: BrainCircuit, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Communication", value: evaluationResult.communication, icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Problem Solving", value: evaluationResult.problemSolving, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Confidence", value: evaluationResult.confidence, icon: ShieldCheck, color: "text-orange-400", bg: "bg-orange-400/10" },
  ] : [];

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-blue-500/30 font-sans pb-24">
      {/* Background Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-[120px] pointer-events-none rounded-full z-0" />
      
      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Battlefield Report</h1>
              <p className="text-xs text-gray-500">Session Completed • {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex items-center mr-4">
              {evaluationResult?.aiEnhanced ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  AI Insights Enabled
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  <ShieldCheck className="w-3 h-3" />
                  Standard Report
                </div>
              )}
            </div>
            <button 
              onClick={handleViewHistory}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </button>
            <button 
              onClick={handleRetake}
              className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Retake</span>
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="px-4 py-2 text-sm font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400 hover:text-white transition-all flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
            <button 
              onClick={handleReturnHome}
              className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Done
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        {/* Top Section: Score & Verdict */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Overall Score Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <Trophy className="w-6 h-6 text-yellow-500 opacity-20" />
            </div>
            
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={553}
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (553 * (evaluationResult?.overallScore || 0)) / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-blue-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white">{evaluationResult?.overallScore || 0}</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Overall Score</span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${evaluationResult?.overallScore && evaluationResult.overallScore >= 70 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'} border mb-4 text-sm font-bold`}>
               {evaluationResult?.hireRecommendation || "Processing..."}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed italic">
              "{evaluationResult?.finalVerdict || "Your results are being processed."}"
            </p>
          </motion.div>

          {/* Analysis & Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row h-full gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Performance Analytics
                </h3>
                <p className="text-gray-400 text-sm mb-8">Role: {selectedRole} • Level: {difficulty}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {statCards.map((stat, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-64 h-64 md:h-full min-h-[250px]">
                {evaluationResult && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} />
                      <Radar
                        name="Candidate"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Section: Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              Key Strengths
            </h3>
            <ul className="space-y-4">
              {evaluationResult?.strengths?.map((strength: string, i: number) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <span className="text-gray-300 leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-orange-500/5 border border-orange-500/20 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-orange-400 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Growth Areas
            </h3>
            <ul className="space-y-4">
              {evaluationResult?.growthAreas?.map((weakness: string, i: number) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <span className="text-gray-300 leading-relaxed">{weakness}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Detailed Question Review */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-400" />
            Interview Breakdown
          </h3>

          <div className="space-y-6">
            {answers.map((item, idx) => {
              const breakdown = evaluationResult?.questionBreakdown?.find((ia: any) => ia.question === item.question);
              const isOpen = activeAccordion === idx;
              
              return (
                <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group transition-all duration-300">
                  <button 
                    onClick={() => setActiveAccordion(isOpen ? null : idx)}
                    className={`w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition-colors ${isOpen ? 'bg-white/5' : ''}`}
                  >
                    <div className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:text-white transition-colors">
                        Q{idx + 1}
                      </span>
                      <p className="font-semibold text-gray-200 group-hover:text-white transition-colors max-w-2xl">{item.question}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="border-t border-white/5 p-6 bg-black/40 space-y-6"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" />
                            Your Answer
                          </p>
                          <div className="text-gray-400 text-sm leading-relaxed p-4 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                            {item.answer}
                          </div>
                        </div>
                        {breakdown && (
                          <div className="space-y-6">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3 flex items-center gap-2">
                                <BrainCircuit className="w-3 h-3" />
                                Ideal Professional Answer
                              </p>
                              <div className="text-blue-100/80 text-sm leading-relaxed p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                {breakdown.expectedAnswer}
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-3 flex items-center gap-2">
                                <Lightbulb className="w-3 h-3" />
                                Improvement Feedback (Score: {breakdown.score}/100)
                              </p>
                              <div className="text-purple-100/80 text-sm leading-relaxed p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                {breakdown.feedback}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 border-t border-white/5">
          <button 
            onClick={handleRetake}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
            Retake New Interview
          </button>
          <button 
             onClick={handleReturnHome}
             className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 rounded-2xl font-bold text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
}
