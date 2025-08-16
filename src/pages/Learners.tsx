import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, User, Sparkles } from 'lucide-react';
import GlassPanel from '../components/ui/GlassPanel';
import AIBadge from '../components/ui/AIBadge';
import { mockLearners } from '../utils/mockData';
import { Learner } from '../types';
import { format } from 'date-fns';

const Learners: React.FC = () => {
  const [learners, setLearners] = useState<Learner[]>(mockLearners);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState('All');

  const filteredLearners = learners.filter(learner => {
    const matchesSearch = learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOutcome = selectedOutcome === 'All' || learner.predictedOutcome === selectedOutcome;
    return matchesSearch && matchesOutcome;
  });

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'Excellent': return 'bg-green-500/20 text-green-400';
      case 'Good': return 'bg-yellow-500/20 text-yellow-400';
      case 'Needs Support': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Learner Analytics</h1>
          <p className="text-gray-400">Monitor progress and performance with AI-powered insights.</p>
        </div>
        <AIBadge text="AI Predictions Active" />
      </div>

      {/* Search and Filters */}
      <GlassPanel className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search learners by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg
                       text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none
                       focus:ring-1 focus:ring-[#3BBC9B] transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedOutcome}
              onChange={(e) => setSelectedOutcome(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white
                       focus:border-[#3BBC9B] focus:outline-none focus:ring-1 focus:ring-[#3BBC9B]"
            >
              <option value="All">All Predictions</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Needs Support">Needs Support</option>
            </select>
          </div>
        </div>
      </GlassPanel>

      {/* AI Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">High Performers</h3>
              <p className="text-sm text-gray-400">AI Score ≥ 90</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {learners.filter(l => l.aiPerformanceScore >= 90).length}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">At Risk</h3>
              <p className="text-sm text-gray-400">Need Support</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {learners.filter(l => l.predictedOutcome === 'Needs Support').length}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#3BBC9B]/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-[#3BBC9B]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Avg AI Score</h3>
              <p className="text-sm text-gray-400">Overall Performance</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#3BBC9B]">
            {Math.round(learners.reduce((sum, l) => sum + l.aiPerformanceScore, 0) / learners.length)}
          </div>
        </GlassPanel>
      </div>

      {/* Learners Table */}
      <GlassPanel className="overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Learner Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Learner</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Courses</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Progress</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">AI Score</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Prediction</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredLearners.map((learner, index) => (
                <motion.tr
                  key={learner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full flex items-center justify-center">
                        {learner.avatar ? (
                          <img src={learner.avatar} alt={learner.name} className="w-full h-full rounded-full" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{learner.name}</p>
                        <p className="text-gray-400 text-sm">{learner.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-white">
                      <span className="font-medium">{learner.enrolledCourses}</span>
                      <span className="text-gray-400"> enrolled</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {learner.completedCourses} completed
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Overall</span>
                          <span className="text-[#3BBC9B]">{learner.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${learner.progress}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#3BBC9B]" />
                      <span className={`font-bold text-lg ${getPerformanceColor(learner.aiPerformanceScore)}`}>
                        {learner.aiPerformanceScore}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Performance Score</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(learner.predictedOutcome)}`}>
                      {learner.predictedOutcome}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-white text-sm">
                      {format(learner.lastActive, 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(learner.lastActive, 'HH:mm')}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default Learners;