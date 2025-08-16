import { Course, Learner, Certificate, Message, DashboardStats, AIRecommendation } from '../types';

export const mockStats: DashboardStats = {
  totalCourses: 24,
  totalLearners: 1247,
  certificatesIssued: 89,
  activeCoursesThisMonth: 12,
  learnerGrowth: 23.5,
  completionRate: 78.2
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning with TensorFlow',
    description: 'Master deep learning concepts and build production-ready ML models',
    instructor: 'Dr. Sarah Chen',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    duration: '8 weeks',
    level: 'Advanced',
    enrolled: 156,
    rating: 4.8,
    progress: 65,
    category: 'AI/ML',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '2',
    title: 'Cloud Architecture Fundamentals',
    description: 'Learn to design scalable cloud solutions using AWS and Azure',
    instructor: 'Michael Rodriguez',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    duration: '6 weeks',
    level: 'Intermediate',
    enrolled: 203,
    rating: 4.6,
    progress: 42,
    category: 'Cloud Computing',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '3',
    title: 'Data Science for Business Analytics',
    description: 'Transform raw data into actionable business insights',
    instructor: 'Dr. Emily Johnson',
    thumbnail: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg',
    duration: '10 weeks',
    level: 'Beginner',
    enrolled: 324,
    rating: 4.7,
    progress: 78,
    category: 'Data Science',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '4',
    title: 'Cybersecurity Essentials',
    description: 'Protect digital assets with modern security practices',
    instructor: 'James Wilson',
    thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    duration: '5 weeks',
    level: 'Intermediate',
    enrolled: 187,
    rating: 4.5,
    progress: 23,
    category: 'Security',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-20')
  }
];

export const mockLearners: Learner[] = [
  {
    id: '1',
    name: 'Alice Thompson',
    email: 'alice.thompson@email.com',
    enrolledCourses: 3,
    completedCourses: 2,
    progress: 85,
    lastActive: new Date('2024-02-20'),
    aiPerformanceScore: 92,
    predictedOutcome: 'Excellent'
  },
  {
    id: '2',
    name: 'Bob Martinez',
    email: 'bob.martinez@email.com',
    enrolledCourses: 2,
    completedCourses: 1,
    progress: 67,
    lastActive: new Date('2024-02-19'),
    aiPerformanceScore: 78,
    predictedOutcome: 'Good'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    enrolledCourses: 4,
    completedCourses: 3,
    progress: 94,
    lastActive: new Date('2024-02-21'),
    aiPerformanceScore: 96,
    predictedOutcome: 'Excellent'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    enrolledCourses: 1,
    completedCourses: 0,
    progress: 34,
    lastActive: new Date('2024-02-18'),
    aiPerformanceScore: 65,
    predictedOutcome: 'Needs Support'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    learnerId: '1',
    courseId: '1',
    learnerName: 'Alice Thompson',
    courseName: 'Advanced Machine Learning with TensorFlow',
    completionDate: new Date('2024-02-15'),
    certificateUrl: '#',
    verified: true
  },
  {
    id: '2',
    learnerId: '2',
    courseId: '3',
    learnerName: 'Bob Martinez',
    courseName: 'Data Science for Business Analytics',
    completionDate: new Date('2024-02-10'),
    certificateUrl: '#',
    verified: true
  },
  {
    id: '3',
    learnerId: '3',
    courseId: '2',
    learnerName: 'Carol Davis',
    courseName: 'Cloud Architecture Fundamentals',
    completionDate: new Date('2024-02-20'),
    certificateUrl: '#',
    verified: false
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Alice Thompson',
    content: 'I\'m having trouble with the TensorFlow installation. Could you help?',
    timestamp: new Date('2024-02-21T10:30:00'),
    courseId: '1',
    isInstructor: false
  },
  {
    id: '2',
    senderId: 'instructor1',
    senderName: 'Dr. Sarah Chen',
    content: 'Of course! Let me create a detailed guide for TensorFlow installation. I\'ll post it in the course materials.',
    timestamp: new Date('2024-02-21T11:15:00'),
    courseId: '1',
    isInstructor: true
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'Bob Martinez',
    content: 'Great course! The data visualization section was particularly helpful.',
    timestamp: new Date('2024-02-20T16:45:00'),
    courseId: '3',
    isInstructor: false
  }
];

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'course',
    title: 'Natural Language Processing Fundamentals',
    description: 'Based on your ML progress, this course will complement your AI knowledge',
    confidence: 0.89,
    estimatedTime: '6 weeks',
    priority: 'high'
  },
  {
    id: '2',
    type: 'skill',
    title: 'Advanced Python for Data Science',
    description: 'Strengthen your Python skills for better ML implementations',
    confidence: 0.76,
    estimatedTime: '4 weeks',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'pathway',
    title: 'AI Engineer Career Track',
    description: 'Complete learning pathway to become a professional AI engineer',
    confidence: 0.92,
    estimatedTime: '16 weeks',
    priority: 'high'
  }
];