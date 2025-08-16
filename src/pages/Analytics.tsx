import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Clock, Target, Brain } from 'lucide-react';
import GlassPanel from '../components/ui/GlassPanel';
import AIBadge from '../components/ui/AIBadge';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: 'white' }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  const engagementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Active Users',
        data: [120, 135, 140, 128, 155, 167],
        borderColor: '#3BBC9B',
        backgroundColor: '#3BBC9B20',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const coursePerformanceData = {
    labels: ['ML Course', 'Cloud Arch', 'Data Science', 'Cybersecurity', 'DevOps'],
    datasets: [
      {
        label: 'Completion Rate %',
        data: [85, 72, 91, 68, 76],
        backgroundColor: '#3BBC9B',
        borderColor: '#3BBC9B',
        borderWidth: 1
      }
    ]
  };

  const learnerDistributionData = {
    labels: ['Beginners', 'Intermediate', 'Advanced'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#3BBC9B', '#3BBC9B80', '#3BBC9B40'],
        borderWidth: 0
      }
    ]
  };

  const skillsRadarData = {
    labels: ['Technical Skills', 'Problem Solving', 'Communication', 'Leadership', 'Innovation', 'Collaboration'],
    datasets: [
      {
        label: 'Average Skill Level',
        data: [85, 78, 72, 65, 80, 88],
        backgroundColor: '#3BBC9B20',
        borderColor: '#3BBC9B',
        borderWidth: 2
      }
    ]
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
          <h1 className="text-3xl font-bold text-white mb-2">Advanced Analytics</h1>
          <p className="text-gray-400">Deep insights powered by AI and machine learning algorithms.</p>
        </div>
        <div className="flex items-center gap-4">
          <AIBadge text="AI Analytics Active" />
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 text-white rounded-lg
                     hover:shadow-lg hover:shadow-[#3BBC9B]/25 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Export Report
          </motion.button>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassPanel className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#3BBC9B]/20 rounded-lg">
                <Brain className="w-5 h-5 text-[#3BBC9B]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Predictions</h3>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-[#3BBC9B] mb-2">94.2%</div>
            <p className="text-xs text-gray-400">Machine learning accuracy</p>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassPanel className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Engagement Growth</h3>
                <p className="text-sm text-gray-400">This month</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-400 mb-2">+28.5%</div>
            <p className="text-xs text-gray-400">vs previous month</p>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassPanel className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Learning Goals</h3>
                <p className="text-sm text-gray-400">Completion</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-2">87.3%</div>
            <p className="text-xs text-gray-400">On track to complete</p>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassPanel className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Avg Study Time</h3>
                <p className="text-sm text-gray-400">Per learner</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-2">4.2h</div>
            <p className="text-xs text-gray-400">Daily average</p>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <GlassPanel className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">User Engagement Trends</h2>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#3BBC9B]" />
              <span className="text-sm text-[#3BBC9B]">AI Analyzed</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={engagementData} options={chartOptions} />
          </div>
        </GlassPanel>

        {/* Course Performance */}
        <GlassPanel className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Course Performance Metrics</h2>
          <div className="h-64">
            <Bar data={coursePerformanceData} options={chartOptions} />
          </div>
        </GlassPanel>

        {/* Learner Distribution */}
        <GlassPanel className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Learner Level Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={learnerDistributionData} 
              options={{
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                    labels: { color: 'white', padding: 20 }
                  }
                }
              }}
            />
          </div>
        </GlassPanel>

        {/* Skills Radar */}
        <GlassPanel className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Skills Assessment Radar</h2>
            <AIBadge text="AI Generated" className="text-xs" />
          </div>
          <div className="h-64">
            <Radar 
              data={skillsRadarData} 
              options={{
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  r: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: 'white' }
                  }
                }
              }}
            />
          </div>
        </GlassPanel>
      </div>

      {/* AI Insights Section */}
      <GlassPanel className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-[#3BBC9B]" />
          <h2 className="text-xl font-bold text-white">AI-Generated Insights</h2>
          <AIBadge text="Powered by NVIDIA Merlin SDK" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <h3 className="font-semibold text-green-400">Performance Insight</h3>
            </div>
            <p className="text-sm text-gray-300">
              Learners who engage with interactive content show 34% higher completion rates. Consider adding more hands-on exercises.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <h3 className="font-semibold text-yellow-400">Optimization Tip</h3>
            </div>
            <p className="text-sm text-gray-300">
              Peak learning hours are between 9-11 AM. Schedule important announcements during this time for maximum engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gradient-to-br from-[#3BBC9B]/10 to-[#3BBC9B]/5 border border-[#3BBC9B]/20 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#3BBC9B] rounded-full animate-pulse" />
              <h3 className="font-semibold text-[#3BBC9B]">Prediction Alert</h3>
            </div>
            <p className="text-sm text-gray-300">
              3 learners are predicted to need additional support. Early intervention could improve their success rate by 67%.
            </p>
          </motion.div>
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default Analytics;