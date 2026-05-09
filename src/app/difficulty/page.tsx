"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Target, TrendingUp, Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInterview } from "@/context/InterviewContext";
import { Difficulty, getRandomQuestions } from "@/lib/questions";
import Link from "next/link";
import { useEffect } from "react";

export default function DifficultySelectionPage() {
  const router = useRouter();
  const { selectedRole, setDifficulty, setSessionQuestions } = useInterview();

  useEffect(() => {
    if (!selectedRole) {
      router.replace("/role");
    }
  }, [selectedRole, router]);

  const handleDifficultySelect = (difficulty: Difficulty) => {
    if (!selectedRole) return;
    
    setDifficulty(difficulty);
    // Generate and store the session questions
    const randomQuestions = getRandomQuestions(selectedRole, difficulty, 5);
    setSessionQuestions(randomQuestions);
    
    router.push("/rules");
  };

  const difficulties = [
    {
      title: "Easy",
      description: "Fundamental concepts and basic practical knowledge. Great for juniors.",
      Icon: Target,
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-400",
      hoverColor: "group-hover:text-green-400"
    },
    {
      title: "Medium",
      description: "In-depth understanding, problem-solving, and system design basics.",
      Icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-400",
      hoverColor: "group-hover:text-blue-400"
    },
    {
      title: "Hard",
      description: "Advanced architecture, performance optimization, and edge cases.",
      Icon: Flame,
      color: "from-orange-500 to-red-600",
      textColor: "text-orange-400",
      hoverColor: "group-hover:text-orange-400"
    }
  ];

  if (!selectedRole) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative font-sans">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />
      
      {/* Navbar minimal */}
      <nav className="relative z-10 flex items-center px-8 py-6 max-w-6xl mx-auto">
        <Link href="/role" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Roles
        </Link>
      </nav>

      {/* Difficulty Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-24">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 text-sm text-purple-400 font-medium tracking-wide uppercase"
          >
            Step 2 of 3
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Select Intensity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            Choose the difficulty level for your <span className="text-white font-semibold">{selectedRole}</span> interview.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {difficulties.map((diff, index) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDifficultySelect(diff.title as Difficulty)}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${diff.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-300`} />
              <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 overflow-hidden flex flex-col items-center text-center transition-colors duration-300 group-hover:border-white/20 hover:bg-[#111] z-10">
                <div className={`mb-6 p-4 rounded-full bg-white/5 border border-white/5 group-hover:border-white/10 transition-all duration-300`}>
                  <diff.Icon className={`w-10 h-10 text-gray-400 ${diff.hoverColor} transition-colors duration-300`} />
                </div>
                <h3 className={`text-2xl font-bold text-white mb-3 ${diff.hoverColor} transition-colors`}>{diff.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {diff.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
