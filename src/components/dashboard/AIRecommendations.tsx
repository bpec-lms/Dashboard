import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, TrendingUp } from 'lucide-react';
import { AIRecommendation } from '../../types';
import GlassPanel from '../ui/GlassPanel';
import AIBadge from '../ui/AIBadge';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ recommendations }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '📚';
      case 'skill': return '🎯';
      case 'pathway': return '🛤️';
      default: return '💡';
    }
  };

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">AI Learning Recommendations</h2>
          <p className="text-gray-400 text-sm">Personalized suggestions powered by machine learning</p>
        </div>
        <AIBadge />
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassPanel hover className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(rec.type)}</span>
                  <div>
                    <h3 className="font-semibold text-white">{rec.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{rec.description}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                  {rec.priority}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{Math.round(rec.confidence * 100)}% match</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{rec.estimatedTime}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Confidence Score</span>
                  <span className="text-xs text-[#3BBC9B]">{Math.round(rec.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${rec.confidence * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-[#3BBC9B]/20 to-[#3BBC9B]/10
                 border border-[#3BBC9B]/30 text-[#3BBC9B] font-medium rounded-lg
                 hover:bg-[#3BBC9B]/30 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          View All AI Recommendations
        </div>
      </motion.button>
    </GlassPanel>
  );
};

export default AIRecommendations;