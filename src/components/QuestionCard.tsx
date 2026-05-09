"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

interface QuestionCardProps {
  role: string;
  question: string;
}

export function QuestionCard({ role, question }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl transition-all duration-300 opacity-50" />
      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <BrainCircuit className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Current Role
            </span>
            <span className="text-sm text-gray-300">{role}</span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
          {question}
        </h2>
      </div>
    </motion.div>
  );
}
