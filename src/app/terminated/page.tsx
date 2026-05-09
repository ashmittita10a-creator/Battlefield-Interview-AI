"use client";

import { motion } from "framer-motion";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInterview } from "@/context/InterviewContext";

export default function TerminatedPage() {
  const router = useRouter();
  const { resetInterview } = useInterview();

  const handleRestart = () => {
    resetInterview();
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-black text-foreground overflow-hidden relative font-sans flex items-center justify-center p-4">
      {/* Harsh red background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-red-600/20 blur-[150px] pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-lg bg-[#0a0a0a] border border-red-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6">
          <AlertOctagon className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Interview Terminated</h1>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          Your interview session has been revoked due to multiple violations of our <span className="text-red-400 font-medium">anti-cheating policy</span>. 
          Leaving the tab or attempting to copy/paste answers is strictly prohibited.
        </p>

        <button
          onClick={handleRestart}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-red-500/10 border border-red-500/20 rounded-xl overflow-hidden transition-all hover:bg-red-500/20 hover:border-red-500/30 w-full sm:w-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Return to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
