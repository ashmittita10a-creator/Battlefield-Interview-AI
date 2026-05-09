"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface RoleCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  delay?: number;
  onClick?: () => void;
}

export function RoleCard({ title, description, Icon, delay = 0, onClick }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, translateY: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-purple-500/40 group-hover:blur-2xl opacity-0 group-hover:opacity-100" />
      <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col items-center text-center transition-colors duration-300 group-hover:border-white/20 hover:bg-black/60 z-10">
        <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 group-hover:border-white/10 transition-all duration-300">
          <Icon className="w-8 h-8 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
