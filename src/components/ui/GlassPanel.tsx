import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassPanel: React.FC<GlassPanelProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick 
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl
        shadow-lg shadow-black/20 
        ${hover ? 'cursor-pointer hover:bg-white/10 hover:border-[#3BBC9B]/30' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { scale: 1.02 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;