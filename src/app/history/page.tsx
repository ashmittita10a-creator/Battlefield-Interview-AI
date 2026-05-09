"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  ChevronLeft, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Award,
  AlertTriangle,
  FileText
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useInterview } from "@/context/InterviewContext";
import Link from "next/link";

export default function HistoryPage() {
  const router = useRouter();
  const { history, deleteHistoryItem, setEvaluationResult, resetInterview } = useInterview();

  const handleViewSession = (session: any) => {
    // We populate the context with this session's data so the Results page can render it
    // First reset to clear current
    resetInterview();
    
    // Manually trigger a context update for viewing a past session
    // This is a bit of a hack but avoids creating a whole new dynamic route for now
    // In a real app, you'd use /history/[id]
    setEvaluationResult(session.evaluation);
    // Note: The context needs the answers too to render results properly
    // Let's refine the context to support 'viewPastSession'
    localStorage.setItem("interviewState", JSON.stringify({
      sessionId: session.id,
      selectedRole: session.role,
      difficulty: session.difficulty,
      sessionQuestions: session.questions,
      answers: session.answers,
      isCompleted: true,
      evaluationResult: session.evaluation
    }));
    
    // Reload window to let useEffect pick up the new state
    window.location.href = "/results";
  };

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-blue-500/30 font-sans pb-24">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-[120px] pointer-events-none rounded-full z-0" />

      <header className="relative z-50 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-blue-500" />
            <h1 className="font-bold text-lg tracking-tight">Interview History</h1>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Past Assessments</h2>
          <p className="text-gray-400">Review your technical growth and previous evaluation reports.</p>
        </motion.div>

        {history.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-20 text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white">No history yet</h3>
            <p className="text-gray-500 max-w-xs">Complete your first interview to see your detailed performance reports here.</p>
            <Link 
              href="/role"
              className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Start Interview
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {history.map((session, idx) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                         <span className="text-[10px] font-bold text-gray-500 uppercase leading-none mb-1">Score</span>
                         <span className="text-xl font-black text-blue-400 leading-none">{session.evaluation?.overallScore || 0}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          {session.role}
                          {session.isTerminated && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 font-black uppercase">Terminated</span>
                          )}
                        </h3>
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-purple-400" />
                            {session.difficulty}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            {new Date(session.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-gray-400" />
                            {session.answers.length} Questions
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <button 
                        onClick={() => handleViewSession(session)}
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all group"
                      >
                        View Report
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                      <button 
                        onClick={() => deleteHistoryItem(session.id)}
                        className="p-2.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all border border-transparent hover:border-red-400/20"
                        title="Delete Session"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
