import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Users, Star, Clock } from 'lucide-react';
import GlassPanel from '../components/ui/GlassPanel';
import { mockCourses } from '../utils/mockData';
import { Course } from '../types';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Course Management</h1>
          <p className="text-gray-400">Create, edit, and manage your learning content.</p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 
                   text-white rounded-lg hover:shadow-lg hover:shadow-[#3BBC9B]/25 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Create Course
        </motion.button>
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
              placeholder="Search courses or instructors..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg
                       text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none
                       focus:ring-1 focus:ring-[#3BBC9B] transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white
                       focus:border-[#3BBC9B] focus:outline-none focus:ring-1 focus:ring-[#3BBC9B]"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </GlassPanel>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassPanel hover className="overflow-hidden group">
              {/* Course Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    className="p-2 bg-black/50 text-white rounded-lg hover:bg-[#3BBC9B]/80"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-black/50 text-red-400 rounded-lg hover:bg-red-500/80"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-3">
                  {/* Instructor */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span>{course.instructor}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.enrolled}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {course.progress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-[#3BBC9B]">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <GlassPanel className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Course</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                             text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none
                             focus:ring-1 focus:ring-[#3BBC9B]"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                             text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none
                             focus:ring-1 focus:ring-[#3BBC9B]"
                    placeholder="Enter course description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Level
                    </label>
                    <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                               text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none"
                      placeholder="e.g., 8 weeks"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 
                             text-white rounded-lg hover:shadow-lg hover:shadow-[#3BBC9B]/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Course
                  </motion.button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Courses;