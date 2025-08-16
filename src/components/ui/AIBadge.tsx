import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIBadgeProps {
  className?: string;
  text?: string;
}

const AIBadge: React.FC<AIBadgeProps> = ({ className = '', text = 'Powered by AI' }) => {
  return (
    <motion.div
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full
        bg-gradient-to-r from-[#3BBC9B]/20 to-[#3BBC9B]/10
        border border-[#3BBC9B]/30
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-4 h-4 text-[#3BBC9B]" />
      </motion.div>
      <span className="text-sm text-[#3BBC9B] font-medium">{text}</span>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3BBC9B]/20 to-transparent rounded-full blur opacity-30 animate-pulse" />
    </motion.div>
  );
};

export default AIBadge;