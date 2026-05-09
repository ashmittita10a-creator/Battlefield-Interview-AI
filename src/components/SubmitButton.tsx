"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import React from "react";

interface SubmitButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
}

export function SubmitButton({ isLoading, children, className, ...props }: SubmitButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity disabled:opacity-0" />
      
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {children}
          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </>
      )}
    </motion.button>
  );
}
