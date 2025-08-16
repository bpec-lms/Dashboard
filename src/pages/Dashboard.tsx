import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, BookOpen, Award, TrendingUp, Activity } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AIRecommendations from '../components/dashboard/AIRecommendations';
import GlassPanel from '../components/ui/GlassPanel';
import { mockStats, mockAIRecommendations, mockLearners } from '../utils/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
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

  const learnerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Learners',
        data: [65, 78, 90, 81, 56, 95],
        borderColor: '#3BBC9B',
        backgroundColor: '#3BBC9B',
        tension: 0.4
      }
    ]
  };

  const courseCompletionData = {
    labels: ['ML Course', 'Cloud Arch', 'Data Science', 'Cybersecurity'],
    datasets: [
      {
        label: 'Completion Rate',
        data: [85, 67, 78, 45],
        backgroundColor: '#3BBC9B',
        borderColor: '#3BBC9B',
        borderWidth: 1
      }
    ]
  };

  const engagementData = {
    labels: ['Highly Engaged', 'Moderately Engaged', 'Low Engagement'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#3BBC9B', '#3BBC9B80', '#3BBC9B40'],
        borderWidth: 0
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
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening with your LMS today.</p>
        </div>
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 text-white rounded-lg
                   hover:shadow-lg hover:shadow-[#3BBC9B]/25 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Export Report
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          title="Total Courses"
          value={mockStats.totalCourses}
          change={12}
          index={0}
        />
        <StatCard
          icon={Users}
          title="Active Learners"
          value={mockStats.totalLearners}
          change={mockStats.learnerGrowth}
          index={1}
        />
        <StatCard
          icon={Award}
          title="Certificates Issued"
          value={mockStats.certificatesIssued}
          change={15}
          index={2}
        />
        <StatCard
          icon={Activity}
          title="Completion Rate"
          value={`${mockStats.completionRate}%`}
          change={5.2}
          index={3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learner Growth Chart */}
          <GlassPanel className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Learner Growth Trend</h2>
            <div className="h-64">
              <Line data={learnerGrowthData} options={chartOptions} />
            </div>
          </GlassPanel>

          {/* Course Completion Rates */}
          <GlassPanel className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Course Completion Rates</h2>
            <div className="h-64">
              <Bar data={courseCompletionData} options={chartOptions} />
            </div>
          </GlassPanel>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Recommendations */}
          <AIRecommendations recommendations={mockAIRecommendations} />

          {/* Engagement Overview */}
          <GlassPanel className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Learner Engagement</h2>
            <div className="h-48 mb-4">
              <Doughnut 
                data={engagementData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                      labels: { color: 'white', padding: 10 }
                    }
                  }
                }}
              />
            </div>
          </GlassPanel>

          {/* Quick Actions */}
          <GlassPanel className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Create New Course', icon: BookOpen },
                { label: 'Send Announcement', icon: Users },
                { label: 'Generate Report', icon: BarChart3 },
                { label: 'Review Certificates', icon: Award }
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white 
                           hover:bg-white/5 rounded-lg transition-all duration-200"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <action.icon className="w-5 h-5 text-[#3BBC9B]" />
                  <span>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Recent Activity */}
      <GlassPanel className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {mockLearners.slice(0, 3).map((learner, index) => (
            <motion.div
              key={learner.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{learner.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{learner.name}</p>
                  <p className="text-gray-400 text-sm">Completed a course milestone</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#3BBC9B] font-medium">{learner.progress}%</p>
                <p className="text-gray-400 text-sm">Progress</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default Dashboard;