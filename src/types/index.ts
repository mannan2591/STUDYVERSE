export type TaskType = 'HOMEWORK' | 'CLASSWORK' | 'PROJECT';
export type Priority = 'High' | 'Medium' | 'Low';

export type AppThemeId = 
  | 'ocean-blue' 
  | 'midnight-purple' 
  | 'forest-green' 
  | 'sunset-orange' 
  | 'minimal-white' 
  | 'neon-dark';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  accent: string;
  bgCanvas: string;
  cardSurface: string;
}

export interface ThemeConfig {
  id: AppThemeId;
  name: string;
  category: 'light' | 'dark';
  description: string;
  primaryColor: string;
  primaryHover: string;
  accentColor: string;
  badgeText: string;
  bgHex: string;
  cardBgHex: string;
  previewColors: string[];
  colors: ThemeColors;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  grade?: string;
  school?: string;
  bio?: string;
  theme?: AppThemeId;
  createdAt: string;
}

export interface Task {
  id: string;
  userId: string;
  name: string;
  subject: string;
  taskType: TaskType;
  priority: Priority;
  dueDate: string; // YYYY-MM-DD or YYYY-MM-DDTHH:mm
  completed: boolean;
  completedAt?: string;
  description?: string;
  progress?: number; // 0-100 for Project / Record
  timeSpentMinutes?: number; // Accumulated study minutes
  pomodoroSessions?: number; // Completed focus sessions
  createdAt: string;
}

export interface PomodoroSettings {
  focusDuration: number; // in minutes, default 25
  shortBreakDuration: number; // in minutes, default 5
  longBreakDuration: number; // in minutes, default 15
  longBreakInterval: number; // default 4
  soundEnabled: boolean;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

export interface StudyStreak {
  streakCount: number;
  longestStreak?: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
  activeDates: string[]; // List of YYYY-MM-DD
  dailyGoalTasks?: number; // Target daily tasks (default: 2)
  dailyGoalMinutes?: number; // Target focus minutes (default: 25)
  freezeCount?: number; // Available streak freezes / shields
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  badge: string;
  iconName: string;
  category: 'tasks' | 'streak' | 'learning' | 'mastery';
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export type ResourceCategory = 
  | 'Notes'
  | 'Question Papers'
  | 'Important Questions'
  | 'Revision Material'
  | 'Diagrams'
  | 'Study Guides'
  | 'Other';

export interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  category: ResourceCategory;
  description: string;
  link: string;
  isExternal: boolean;
  isFeatured?: boolean;
  downloads?: number;
  fileSize?: string;
  author?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'pdf' | 'quiz' | 'reading';
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  quizQuestions?: QuizQuestion[];
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  isFree: boolean;
  rating: number;
  studentsCount: number;
  instructor: string;
  modules: CourseModule[];
}

export interface Certificate {
  id: string;
  certificateId: string; // e.g. SV-AI-2026-8F42K7P1
  userId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  verificationUrl: string;
  isValid: boolean;
  issuer: string;
  ceoSignature: string;
}

export interface TimetableSlot {
  id: string;
  userId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  timeRange: string;
  subject: string;
  teacher: string;
  room: string;
  color?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'achievement' | 'task';
  timestamp: string;
  read: boolean;
}

export type ActiveTab = 'home' | 'tasks' | 'achievements' | 'resources' | 'more';
export type MoreSubView = 
  | 'none' 
  | 'streak-tracker'
  | 'pomodoro' 
  | 'calendar' 
  | 'timetable' 
  | 'progress' 
  | 'flashcards' 
  | 'gpa-calculator' 
  | 'formulas' 
  | 'courses' 
  | 'certificates' 
  | 'settings' 
  | 'support' 
  | 'team'
  | 'about' 
  | 'profile';
export type MoreSubSection = MoreSubView;
