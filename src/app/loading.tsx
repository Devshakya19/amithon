"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center z-[100]">
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-8"
      >
        <Rocket className="w-10 h-10 text-white" />
      </motion.div>
      <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          animate={{ left: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 bg-primary shadow-[0_0_15px_rgba(37,99,235,0.8)]"
        />
      </div>
      <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-primary/50 animate-pulse">
        Initializing Portal
      </p>
    </div>
  );
}
