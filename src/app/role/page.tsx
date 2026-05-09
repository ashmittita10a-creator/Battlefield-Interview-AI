"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, Server, Bot, Users, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInterview } from "@/context/InterviewContext";
import { Role } from "@/lib/questions";
import { RoleCard } from "@/components/RoleCard";
import Link from "next/link";

export default function RoleSelectionPage() {
  const router = useRouter();
  const { setRole } = useInterview();

  const handleRoleSelect = (role: Role) => {
    setRole(role);
    router.push("/difficulty");
  };

  const roles = [
    {
      title: "Frontend Developer",
      description: "React, Next.js, UI/UX, Performance",
      Icon: LayoutTemplate,
    },
    {
      title: "Backend Developer",
      description: "Node.js, System Design, Databases",
      Icon: Server,
    },
    {
      title: "AI Engineer",
      description: "LLMs, Machine Learning, Python",
      Icon: Bot,
    },
    {
      title: "HR Interview",
      description: "Culture Fit, Behavioral, Soft Skills",
      Icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative font-sans">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />
      
      {/* Navbar minimal */}
      <nav className="relative z-10 flex items-center px-8 py-6 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      {/* Roles Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-24">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 text-sm text-blue-400 font-medium tracking-wide uppercase"
          >
            Step 1 of 3
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Choose Your Battlefield
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            Select a specialized AI interviewer tailored to your target role.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <RoleCard
              key={role.title}
              title={role.title}
              description={role.description}
              Icon={role.Icon}
              delay={0.1 * index}
              onClick={() => handleRoleSelect(role.title as Role)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
