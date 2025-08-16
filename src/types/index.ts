export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolled: number;
  rating: number;
  progress?: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Learner {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: number;
  completedCourses: number;
  progress: number;
  lastActive: Date;
  aiPerformanceScore: number;
  predictedOutcome: 'Excellent' | 'Good' | 'Needs Support';
}

export interface Certificate {
  id: string;
  learnerId: string;
  courseId: string;
  learnerName: string;
  courseName: string;
  completionDate: Date;
  certificateUrl: string;
  verified: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  courseId?: string;
  isInstructor: boolean;
}

export interface DashboardStats {
  totalCourses: number;
  totalLearners: number;
  certificatesIssued: number;
  activeCoursesThisMonth: number;
  learnerGrowth: number;
  completionRate: number;
}

export interface AIRecommendation {
  id: string;
  type: 'course' | 'skill' | 'pathway';
  title: string;
  description: string;
  confidence: number;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
}