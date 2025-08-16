import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, MoreVertical, Paperclip, Smile } from 'lucide-react';
import GlassPanel from '../components/ui/GlassPanel';
import { mockMessages } from '../utils/mockData';
import { Message } from '../types';
import { format } from 'date-fns';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const filteredMessages = selectedCourse === 'all' 
    ? messages 
    : messages.filter(msg => msg.courseId === selectedCourse);

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: '1', name: 'Advanced Machine Learning' },
    { id: '2', name: 'Cloud Architecture' },
    { id: '3', name: 'Data Science for Business' },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'instructor-current',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date(),
      courseId: selectedCourse === 'all' ? undefined : selectedCourse,
      isInstructor: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-8rem)] flex flex-col space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Messages & Forum</h1>
          <p className="text-gray-400">Communicate with learners and manage course discussions.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Sidebar - Course Selection */}
        <div className="lg:col-span-1">
          <GlassPanel className="h-full p-4">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white mb-3">Courses</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm
                           text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              {courses.map((course) => (
                <motion.button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedCourse === course.id 
                      ? 'bg-[#3BBC9B]/20 text-[#3BBC9B] border border-[#3BBC9B]/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <div className="font-medium text-sm">{course.name}</div>
                  {course.id !== 'all' && (
                    <div className="text-xs text-gray-400 mt-1">
                      {messages.filter(m => m.courseId === course.id).length} messages
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <GlassPanel className="flex-1 flex flex-col min-h-0">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {courses.find(c => c.id === selectedCourse)?.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {filteredMessages.length} messages
                </p>
              </div>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isInstructor ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.isInstructor ? 'order-2' : 'order-1'
                  }`}>
                    <div className={`px-4 py-3 rounded-lg ${
                      message.isInstructor 
                        ? 'bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 text-white' 
                        : 'bg-white/10 text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`mt-1 text-xs text-gray-400 ${
                      message.isInstructor ? 'text-right' : 'text-left'
                    }`}>
                      <span className="font-medium">{message.senderName}</span>
                      <span className="mx-1">•</span>
                      <span>{format(message.timestamp, 'HH:mm')}</span>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mx-2 ${
                    message.isInstructor 
                      ? 'bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 order-1' 
                      : 'bg-gray-600 order-2'
                  }`}>
                    <span className="text-white text-sm font-bold">
                      {message.senderName.charAt(0)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:text-[#3BBC9B] transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                             text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none
                             focus:ring-1 focus:ring-[#3BBC9B] transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3BBC9B] transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 text-white rounded-lg
                           hover:shadow-lg hover:shadow-[#3BBC9B]/25 transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;