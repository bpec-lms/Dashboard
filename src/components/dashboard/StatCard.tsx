import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  changeLabel = 'vs last month', 
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassPanel hover className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-[#3BBC9B]/20 to-[#3BBC9B]/10 rounded-lg">
            <Icon className="w-6 h-6 text-[#3BBC9B]" />
          </div>
          {change !== undefined && (
            <div className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        
        <p className="text-gray-400 text-sm">{title}</p>
        
        {change !== undefined && (
          <p className="text-xs text-gray-500 mt-2">{changeLabel}</p>
        )}
      </GlassPanel>
    </motion.div>
  );
};

export default StatCard;