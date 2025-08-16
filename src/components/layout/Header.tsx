import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import GlassPanel from '../ui/GlassPanel';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 p-4"
    >
      <GlassPanel className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses, learners, or content..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg
                     text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none
                     focus:ring-1 focus:ring-[#3BBC9B] transition-colors"
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#3BBC9B] rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {currentUser?.displayName || 'Admin User'}
              </p>
              <p className="text-xs text-gray-400">{currentUser?.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </GlassPanel>
    </motion.header>
  );
};

export default Header;