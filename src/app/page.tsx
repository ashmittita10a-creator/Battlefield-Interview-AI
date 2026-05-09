"use client";

import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Zap, 
  History, 
  ShieldCheck, 
  FileDown, 
  BarChart3, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Fingerprint,
  LineChart,
  Layout,
  Star
} from "lucide-react";
import Link from "next/link";
import { useInterview } from "@/context/InterviewContext";

export default function Home() {
  const { resetInterview } = useInterview();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-[120px] rounded-full z-0" />
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-sm border-b border-white/5 sticky top-0 bg-black/20">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic">Interview Battlefield</span>
        </div>
        <div className="hidden lg:flex gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-400 transition-colors">Methodology</a>
          <Link href="/history" className="flex items-center gap-2 hover:text-white transition-colors">
            <History className="w-4 h-4" />
            Archive
          </Link>
        </div>
        <div className="flex items-center gap-4">
           <Link href="/role" onClick={resetInterview} className="hidden sm:inline-flex px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-blue-400 transition-all">
             Get Started
           </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 mb-8 text-xs font-black uppercase tracking-[0.2em] text-blue-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next-Gen Interview Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase italic"
        >
          Master the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
            Technical Edge.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-12 leading-relaxed font-medium"
        >
          Engineered for high-stakes technical roles. Engage in hyper-realistic simulations 
          with deep behavioral analysis and automated comparative feedback.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="/role" 
            onClick={resetInterview}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 rounded-2xl font-black text-white hover:bg-blue-700 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95"
          >
            Start Assessment
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/history" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <History className="w-5 h-5" />
            Review Archives
          </Link>
        </motion.div>
      </section>

      {/* Dashboard Preview Mockup */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-32">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-2 bg-gradient-to-b from-white/10 to-transparent rounded-[32px] border border-white/10 shadow-2xl"
        >
            <div className="bg-[#050505] rounded-[24px] overflow-hidden aspect-[16/9] flex flex-col">
                <div className="h-12 border-b border-white/5 flex items-center px-6 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                    <div className="ml-4 h-6 w-48 bg-white/5 rounded-full border border-white/5" />
                </div>
                <div className="flex-1 p-8 grid grid-cols-12 gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <div className="col-span-4 space-y-6">
                        <div className="h-48 bg-white/5 rounded-3xl border border-white/5" />
                        <div className="h-24 bg-white/5 rounded-3xl border border-white/5" />
                    </div>
                    <div className="col-span-8 bg-white/5 rounded-3xl border border-white/5" />
                </div>
                {/* Dashboard Highlights Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 w-full max-w-4xl">
                        {[
                            { icon: LineChart, label: "Advanced Metrics", text: "Radar-based skill gap analysis" },
                            { icon: Cpu, label: "Ideal Logic", text: "Senior-level comparative feedback" },
                            { icon: ShieldCheck, label: "Integrity Protect", text: "Anti-cheat behavior monitoring" }
                        ].map((card, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl"
                            >
                                <card.icon className="w-8 h-8 text-blue-500 mb-4" />
                                <h4 className="font-bold text-white mb-1 uppercase tracking-tight">{card.label}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{card.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 mb-32">
        <div className="text-center mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-purple-500 mb-4">Core Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">The Complete <br /> <span className="text-blue-500">Battlefield Kit</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { 
                    icon: Code2, 
                    title: "Role-Specific Core", 
                    text: "100+ scenario-based questions across Frontend, Backend, AI Engineering, and HR Management." 
                },
                { 
                    icon: Cpu, 
                    title: "Comparative Review", 
                    text: "Don't just get scored. Compare your response against senior-level expected answers and architectural notes." 
                },
                { 
                    icon: Fingerprint, 
                    title: "Behavioral Guard", 
                    text: "Sophisticated anti-cheat system monitoring tab-switching and clipboard activity during active sessions." 
                },
                { 
                    icon: FileDown, 
                    title: "Dossier Export", 
                    text: "Generate professional enterprise-grade PDF reports of your performance to share with mentors or teams." 
                },
                { 
                    icon: History, 
                    title: "Session Archiving", 
                    text: "Track your growth with a complete history of past interviews, including full transcripts and AI feedback." 
                },
                { 
                    icon: ShieldCheck, 
                    title: "Real-Time Proctoring", 
                    const: "Experience the pressure of a real technical round with our timed, monitored assessment engine."
                }
            ].map((feature, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 border border-white/5 p-8 rounded-[32px] hover:bg-white/[0.08] hover:border-white/10 transition-all"
                >
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                        <feature.icon className="w-7 h-7 text-blue-500" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-tight italic">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.text}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 py-24 mb-32 bg-blue-600/5 rounded-[64px] border border-blue-600/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="px-8">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Our Methodology</h2>
                <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">How to <br /> Conquer.</h3>
                <div className="space-y-12">
                    {[
                        { step: "01", label: "Sector Selection", text: "Choose your battlefield: Frontend, Backend, AI, or HR leadership." },
                        { step: "02", label: "The Engagement", text: "Complete a timed high-stakes interview with scenario-based technical questions." },
                        { step: "03", label: "AI Intel Extraction", text: "Our LLM engine analyzes your transcript for technical depth and clarity." },
                        { step: "04", label: "Post-Mission Report", text: "Receive your dossier, compare ideal answers, and archive the results." }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start">
                            <span className="text-2xl font-black text-blue-500/30 italic">{step.step}</span>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{step.label}</h4>
                                <p className="text-gray-500 text-sm">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full" />
                <div className="relative aspect-square bg-[#0a0a0a] border border-white/10 rounded-[48px] p-12 flex flex-col justify-center items-center text-center">
                    <BarChart3 className="w-32 h-32 text-blue-500 mb-8" />
                    <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Deep Analytics</h4>
                    <p className="text-gray-500 max-w-xs mx-auto">We don't just score. we provide a multi-dimensional map of your professional technical gaps.</p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
        >
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-12">Ready for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">The Battle?</span></h2>
            <Link 
                href="/role" 
                onClick={resetInterview}
                className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-white text-black rounded-full font-black uppercase text-lg hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
            >
                Initialize Mission
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-md pt-20 pb-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="font-black text-xl tracking-tight uppercase italic">Interview Battlefield</span>
                </div>
                <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                    The premium technical assessment platform for the next generation of software engineers. Simulate reality, conquer the feedback loop, and dominate the tech market.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><a href="#" className="hover:text-blue-400 transition-colors">Start Assessment</a></li>
                    <li><Link href="/history" className="hover:text-blue-400 transition-colors">Interview History</Link></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors">Platform Features</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Product</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><a href="#" className="hover:text-blue-400 transition-colors">Methodology</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors">API Docs</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-600 font-bold uppercase tracking-widest">
            <p>© 2026 Battlefield Intelligence Labs. All rights reserved.</p>
            <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
