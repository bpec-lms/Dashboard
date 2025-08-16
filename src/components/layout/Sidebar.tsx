import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Users,
  Award,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import GlassPanel from "../ui/GlassPanel";

const menuItems = [
  { icon: BarChart3, label: "Overview", path: "/dashboard" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Users, label: "Learners", path: "/learners" },
  { icon: Award, label: "Certificates", path: "/certificates" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      className="relative z-30 h-screen pointer-events-auto"
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Collapse Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-8 h-8 bg-[#3BBC9B] rounded-full flex items-center justify-center
                   text-white hover:bg-[#3BBC9B]/80 transition-colors z-50 shadow-lg"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <GlassPanel className="h-full flex flex-col p-4 m-2 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Top: logo + nav */}
          <div className="flex-1 overflow-y-auto">
            {/* Logo / Icon */}
            <div className="flex items-center justify-center mb-8 px-2">
              {isCollapsed ? (
                <img src="/Icon.png" alt="Logo Icon" className="w-8 h-8 object-contain" />
              ) : (
                <img
                  src="/Logo.webp"
                  alt="BPEC-LMS Logo"
                  className="w-full h-auto rounded-lg shadow-lg object-contain"
                />
              )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-2" aria-label="Sidebar">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === "/dashboard"}
                      className={({ isActive }) =>
                        `relative flex items-center ${
                          isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-3"
                        } rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-[#3BBC9B]/20 text-[#3BBC9B] border border-[#3BBC9B]/30 shadow-lg shadow-[#3BBC9B]/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 flex-shrink-0 relative z-10" />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="font-medium relative z-10"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Active indicator */}
                      <NavLink
                        to={item.path}
                        end={item.path === "/dashboard"}
                        className={({ isActive }) =>
                          isActive
                            ? "pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#3BBC9B] rounded-l-full"
                            : ""
                        }
                      />
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Bottom: AI Status */}
          <div className={`mt-4 ${isCollapsed ? "flex justify-center" : ""}`}>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-3 bg-gradient-to-r from-[#3BBC9B]/20 to-[#3BBC9B]/10 rounded-lg border border-[#3BBC9B]/20 flex flex-col items-start"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-[#3BBC9B]" />
                    </motion.div>
                    <span className="text-sm font-medium text-[#3BBC9B]">AI Active</span>
                  </div>
                 <p className="text-sm text-gray-400">Ready for NVIDIA Merlin SDK integration</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default Sidebar;
