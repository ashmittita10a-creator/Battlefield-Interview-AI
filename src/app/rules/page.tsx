"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Camera, Mic, CheckCircle2, ChevronRight, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInterview } from "@/context/InterviewContext";
import { roleQuestions } from "@/lib/questions";

export default function RulesPage() {
  const router = useRouter();
  const { selectedRole, difficulty, sessionQuestions, resetInterview } = useInterview();
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (!selectedRole || !difficulty || sessionQuestions.length === 0) {
      router.replace("/");
    }
  }, [selectedRole, difficulty, sessionQuestions, router]);

  const numQuestions = sessionQuestions.length;

  const requestPermissions = async () => {
    setRequesting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionsGranted(true);
    } catch (err) {
      console.error("Failed to get permissions", err);
      alert("Microphone and Camera permissions are required to proceed.");
    }
    setRequesting(false);
  };

  const startInterview = () => {
    router.push("/interview");
  };

  if (!selectedRole) return null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 overflow-hidden relative font-sans flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Interview Rules & Setup</h1>
            <p className="text-gray-400 text-sm">
              Role: <span className="text-purple-400 font-semibold mr-3">{selectedRole}</span>
              Difficulty: <span className="text-blue-400 font-semibold">{difficulty}</span>
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div className="bg-white/5 border border-white/5 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" /> Anti-Cheating Policy
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                Do not switch tabs or minimize the window. Doing so will trigger a warning.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                Copying and pasting text into the answer box is strictly prohibited.
              </li>
              <li className="flex items-start gap-2 text-red-400 font-medium">
                <span className="text-red-500 mt-0.5">•</span>
                Warning Limit: 3 warnings will immediately terminate the interview.
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
              <span className="block text-2xl font-bold text-white mb-1">{numQuestions}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Questions</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
              <span className="block text-2xl font-bold text-white mb-1">{numQuestions * 5}m</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Est. Duration</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-[#0a0a0a] flex items-center justify-center">
                  <Camera className="w-4 h-4 text-gray-400" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-[#0a0a0a] flex items-center justify-center">
                  <Mic className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Device Access</p>
                <p className="text-xs text-gray-500">Required for proctoring</p>
              </div>
            </div>
            
            {!permissionsGranted ? (
              <button
                onClick={requestPermissions}
                disabled={requesting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {requesting ? "Requesting..." : "Allow Access"}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
                Granted
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button
            onClick={() => { resetInterview(); router.push("/"); }}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={startInterview}
            disabled={!permissionsGranted}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/5 disabled:hover:border-white/10"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity disabled:hidden" />
            Proceed to Interview
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform disabled:group-hover:translate-x-0" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
