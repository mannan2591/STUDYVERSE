import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import { 
  UserProfile, 
  Task, 
  StudyStreak, 
  Achievement, 
  ResourceItem, 
  Course, 
  Certificate, 
  TimetableSlot, 
  AppNotification, 
  ActiveTab, 
  MoreSubView,
  MoreSubSection,
  PomodoroSettings,
} from '../types';
import { 
  DEFAULT_SUBJECTS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_RESOURCES, 
  INITIAL_COURSES, 
  DEMO_SAMPLE_TASKS,
  DEFAULT_TIMETABLE 
} from '../data/initialData';
import { soundEngine } from '../utils/soundEffects';

interface AppContextType {
  // User & Auth
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string, grade?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot') => void;

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  moreSubView: MoreSubView;
  setMoreSubView: (view: MoreSubView) => void;
  moreSubSection: MoreSubSection;
  setMoreSubSection: (section: MoreSubSection) => void;
  navigateTo: (tab: ActiveTab, subView?: MoreSubView) => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Tasks
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'completed'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  isAddTaskModalOpen: boolean;
  setIsAddTaskModalOpen: (open: boolean) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;

  // Subjects
  subjects: string[];
  addCustomSubject: (name: string) => void;

  // Study Streak & XP
  streak: StudyStreak;
  xp: number;
  level: number;
  nextLevelXp: number;
  levelProgress: number;
  isStreakTrackerOpen: boolean;
  setIsStreakTrackerOpen: (open: boolean) => void;
  openStreakTracker: () => void;
  recordDailyActivity: (source: 'task' | 'pomodoro' | 'course' | 'manual', details?: { minutes?: number; subject?: string; note?: string }) => void;
  useStreakFreeze: () => boolean;
  updateDailyGoals: (goals: { dailyGoalTasks?: number; dailyGoalMinutes?: number }) => void;
  logManualStudySprint: (subject: string, minutes: number, note: string) => Promise<void>;
  todayFocusSessions: number;

  // Pomodoro Focus Timer
  pomodoroSettings: PomodoroSettings;
  updatePomodoroSettings: (settings: Partial<PomodoroSettings>) => void;
  activePomodoroTaskId: string | null;
  setActivePomodoroTaskId: (id: string | null) => void;
  startPomodoroWithTask: (taskId: string) => void;
  logPomodoroSession: (taskId: string | null, durationMinutes: number) => Promise<void>;
  todayFocusMinutes: number;
  todayCompletedSessions: number;

  // Achievements
  achievements: Achievement[];
  recentUnlockedAchievement: Achievement | null;
  dismissAchievementPopup: () => void;

  // Resources
  resources: ResourceItem[];
  addResource: (item: Omit<ResourceItem, 'id'>) => Promise<void>;

  // Courses & Lessons
  courses: Course[];
  activeCourseId: string | null;
  setActiveCourseId: (id: string | null) => void;
  completedLessons: Record<string, string[]>;
  markLessonComplete: (courseId: string, lessonId: string) => Promise<void>;

  // Certificates
  certificates: Certificate[];
  issueCertificate: (courseId: string, customStudentName: string) => Promise<Certificate>;
  createCustomCertificate: (data: { studentName: string; courseTitle: string; courseId?: string; issueDate?: string; certificateId?: string }) => Promise<Certificate>;
  updateCertificate: (certificate: Certificate) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  selectedCertificate: Certificate | null;
  setSelectedCertificate: (cert: Certificate | null) => void;

  // Timetable
  timetable: TimetableSlot[];
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id' | 'userId'>) => Promise<void>;
  updateTimetableSlot: (id: string, updates: Partial<TimetableSlot>) => Promise<void>;
  deleteTimetableSlot: (id: string) => Promise<void>;

  // Notifications
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type?: AppNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Global Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Helper trigger for requiring auth
  requireAuth: (callback: () => void) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'studyverse_v3_';

const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  soundEnabled: true,
  autoStartBreaks: false,
  autoStartPomodoros: false,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}dark_mode`);
    if (saved !== null) return JSON.parse(saved);
    return false;
  });

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}dark_mode`, JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Auth & User State
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}user`);
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const isAuthenticated = !!user;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [moreSubView, setMoreSubView] = useState<MoreSubView>('none');

  const navigateTo = (tab: ActiveTab, subView: MoreSubView = 'none') => {
    setActiveTab(tab);
    setMoreSubView(subView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subjects
  const [subjects, setSubjects] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}subjects`);
    return saved ? JSON.parse(saved) : DEFAULT_SUBJECTS;
  });

  const addCustomSubject = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || subjects.includes(trimmed)) return;
    const updated = [...subjects, trimmed];
    setSubjects(updated);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}subjects`, JSON.stringify(updated));
    addNotification('Subject Added', `"${trimmed}" is now available for all tasks.`);
  };

  // Tasks State
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}tasks`);
    if (saved) return JSON.parse(saved);
    return DEMO_SAMPLE_TASKS;
  });

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Streak State with Persistence & Defaults
  const [streak, setStreak] = useState<StudyStreak>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}streak`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    return {
      streakCount: 3,
      longestStreak: 5,
      lastCompletedDate: yesterdayStr,
      activeDates: [yesterdayStr],
      dailyGoalTasks: 2,
      dailyGoalMinutes: 25,
      freezeCount: 1,
    };
  });

  const [isStreakTrackerOpen, setIsStreakTrackerOpen] = useState(false);
  const openStreakTracker = () => setIsStreakTrackerOpen(true);

  // XP & Level calculations
  const [xp, setXp] = useState<number>(350);

  const level = Math.max(1, Math.floor(xp / 200) + 1);
  const currentLevelBaseXp = (level - 1) * 200;
  const nextLevelXp = level * 200;
  const levelProgress = Math.min(100, Math.round(((xp - currentLevelBaseXp) / 200) * 100));

  const addXp = useCallback((amount: number) => {
    setXp(prev => {
      const updated = prev + amount;
      if (user?.id) {
        const userRef = doc(db, 'users', user.id);
        updateDoc(userRef, { xp: updated, level: Math.max(1, Math.floor(updated / 200) + 1) }).catch(() => {});
      }
      return updated;
    });
  }, [user?.id]);

  // Pomodoro State & Settings
  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}pomodoro_settings`);
    return saved ? JSON.parse(saved) : DEFAULT_POMODORO_SETTINGS;
  });

  const updatePomodoroSettings = (newSettings: Partial<PomodoroSettings>) => {
    setPomodoroSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}pomodoro_settings`, JSON.stringify(updated));
      return updated;
    });
    addNotification('Timer Settings Saved', 'Pomodoro intervals updated successfully.');
  };

  const [activePomodoroTaskId, setActivePomodoroTaskId] = useState<string | null>(null);

  const startPomodoroWithTask = (taskId: string) => {
    setActivePomodoroTaskId(taskId);
    navigateTo('more', 'pomodoro');
    const target = tasks.find(t => t.id === taskId);
    addNotification('Pomodoro Session', `Focus timer started for: "${target?.name || 'Task'}"`, 'task');
  };

  // Daily focus statistics
  const todayKey = new Date().toISOString().split('T')[0];
  const [todayFocusMinutes, setTodayFocusMinutes] = useState<number>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}focus_mins_${todayKey}`);
    return saved ? Number(saved) : 50; // Default sample
  });

  const [todayCompletedSessions, setTodayCompletedSessions] = useState<number>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}focus_sessions_${todayKey}`);
    return saved ? Number(saved) : 2;
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [recentUnlockedAchievement, setRecentUnlockedAchievement] = useState<Achievement | null>(null);

  const dismissAchievementPopup = () => setRecentUnlockedAchievement(null);

  // Resources
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);

  // Courses & Lessons
  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({});

  // Certificates
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Timetable
  const [timetable, setTimetable] = useState<TimetableSlot[]>(DEFAULT_TIMETABLE);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-welcome',
      title: 'Welcome to StudyVerse V3.0!',
      message: 'Plan homework, run focus Pomodoros, and sync study streaks.',
      type: 'info',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    },
  ]);

  const addNotification = (title: string, message: string, type: AppNotification['type'] = 'info') => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => setNotifications([]);

  // Global Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Require Auth guard helper
  const requireAuth = (callback: () => void) => {
    if (isAuthenticated) {
      callback();
    } else {
      openAuthModal('signup');
    }
  };

  // Achievement Check Helper
  const checkAchievementUnlock = useCallback((achievementId: string, currentVal: number) => {
    setAchievements(prev => {
      let newlyUnlocked: Achievement | null = null;
      const updated = prev.map(ach => {
        if (ach.id === achievementId) {
          const newProgress = Math.min(ach.maxProgress, currentVal);
          const shouldUnlock = newProgress >= ach.maxProgress && !ach.isUnlocked;
          if (shouldUnlock) {
            newlyUnlocked = {
              ...ach,
              progress: newProgress,
              isUnlocked: true,
              unlockedAt: new Date().toISOString(),
            };
            return newlyUnlocked;
          }
          return { ...ach, progress: newProgress };
        }
        return ach;
      });

      if (newlyUnlocked) {
        setRecentUnlockedAchievement(newlyUnlocked);
        addXp(newlyUnlocked.xp);
        addNotification(`Achievement Unlocked!`, `${newlyUnlocked.title} (+${newlyUnlocked.xp} XP)`, 'achievement');
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#E6A83A', '#0F8B6D', '#BFE8D7'],
          });
        } catch {
          // safe
        }
      }

      if (user?.id) {
        const userRef = doc(db, 'users', user.id);
        updateDoc(userRef, { achievements: updated }).catch(() => {});
      }

      return updated;
    });
  }, [addXp, user?.id]);

  // Master Streak & Daily Activity Recording Engine
  const recordDailyActivity = useCallback((
    source: 'task' | 'pomodoro' | 'course' | 'manual',
    _details?: { minutes?: number; subject?: string; note?: string }
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    setStreak(prev => {
      const activeDates = prev.activeDates || [];
      const newActiveDates = activeDates.includes(todayStr) ? activeDates : [...activeDates, todayStr];
      const longestStreak = prev.longestStreak || prev.streakCount || 1;
      const freezeCount = prev.freezeCount !== undefined ? prev.freezeCount : 1;
      const dailyGoalTasks = prev.dailyGoalTasks || 2;
      const dailyGoalMinutes = prev.dailyGoalMinutes || 25;

      let updatedStreak: StudyStreak;

      if (prev.lastCompletedDate === todayStr) {
        // Already active today, streak safe
        updatedStreak = {
          ...prev,
          activeDates: newActiveDates,
        };
      } else if (prev.lastCompletedDate === yesterdayStr) {
        // Active streak extension!
        const newCount = (prev.streakCount || 0) + 1;
        const newLongest = Math.max(longestStreak, newCount);
        let updatedFreeze = freezeCount;

        updatedStreak = {
          streakCount: newCount,
          longestStreak: newLongest,
          lastCompletedDate: todayStr,
          activeDates: newActiveDates,
          dailyGoalTasks,
          dailyGoalMinutes,
          freezeCount: updatedFreeze,
        };

        // Sound celebratory fanfare
        soundEngine.playChime('streak');
        addNotification('🔥 Streak Extended!', `🔥 ${newCount} Day Daily Study Streak! Keep the momentum alive!`, 'achievement');
        
        try {
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#E6A83A', '#0F8B6D', '#FF6B6B'],
          });
        } catch {}

        if (newCount >= 3) checkAchievementUnlock('streak-3', newCount);
        if (newCount >= 7) {
          checkAchievementUnlock('streak-7', newCount);
          updatedStreak.freezeCount = freezeCount + 1;
          addNotification('🛡️ Shield Earned!', 'You earned +1 Streak Freeze for reaching a 7-day streak milestone!', 'success');
        }
        if (newCount >= 14) checkAchievementUnlock('streak-14', newCount);
        if (newCount >= 30) checkAchievementUnlock('streak-30', newCount);
      } else {
        // Check for Streak Freeze protection if missed yesterday
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

        if (prev.lastCompletedDate === twoDaysAgoStr && freezeCount > 0) {
          const newCount = (prev.streakCount || 0) + 1;
          updatedStreak = {
            streakCount: newCount,
            longestStreak: Math.max(longestStreak, newCount),
            lastCompletedDate: todayStr,
            activeDates: newActiveDates,
            dailyGoalTasks,
            dailyGoalMinutes,
            freezeCount: freezeCount - 1,
          };
          soundEngine.playChime('streak');
          addNotification('🛡️ Streak Freeze Shield Used!', `Your shield preserved your streak! Total streak: ${newCount} days.`, 'achievement');
        } else {
          updatedStreak = {
            streakCount: 1,
            longestStreak: Math.max(longestStreak, 1),
            lastCompletedDate: todayStr,
            activeDates: newActiveDates,
            dailyGoalTasks,
            dailyGoalMinutes,
            freezeCount,
          };
          soundEngine.playChime('streak');
          addNotification('🔥 Study Streak Begun!', `1-Day Daily Study Streak started! Complete tasks or Pomodoros daily.`, 'achievement');
        }
      }

      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}streak`, JSON.stringify(updatedStreak));

      if (user?.id) {
        const userRef = doc(db, 'users', user.id);
        updateDoc(userRef, { streak: updatedStreak }).catch(() => {});
      }

      return updatedStreak;
    });
  }, [checkAchievementUnlock, user?.id]);

  // Backward compatibility alias
  const handleTaskCompletionStreakCheck = useCallback(() => {
    recordDailyActivity('task');
  }, [recordDailyActivity]);

  // Use Streak Freeze Shield
  const useStreakFreeze = (): boolean => {
    if ((streak.freezeCount || 0) <= 0) {
      addNotification('No Freezes Available', 'Reach 7-day streaks to earn streak freeze shields.', 'warning');
      return false;
    }
    addNotification('Streak Shield Active 🛡️', 'Your next missed day is protected from streak reset!', 'success');
    return true;
  };

  // Update Daily Goals
  const updateDailyGoals = (goals: { dailyGoalTasks?: number; dailyGoalMinutes?: number }) => {
    setStreak(prev => {
      const updated: StudyStreak = {
        ...prev,
        dailyGoalTasks: goals.dailyGoalTasks ?? prev.dailyGoalTasks ?? 2,
        dailyGoalMinutes: goals.dailyGoalMinutes ?? prev.dailyGoalMinutes ?? 25,
      };
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}streak`, JSON.stringify(updated));
      if (user?.id) {
        const userRef = doc(db, 'users', user.id);
        updateDoc(userRef, { streak: updated }).catch(() => {});
      }
      return updated;
    });
    addNotification('Daily Study Goals Updated', 'Your custom daily focus and task targets are saved.', 'success');
  };

  // Manual Study Session Logger
  const logManualStudySprint = async (subject: string, minutes: number, note: string) => {
    const earnedXp = Math.max(20, minutes * 2);
    addXp(earnedXp);

    const todayKeyCurrent = new Date().toISOString().split('T')[0];
    const newFocusMins = todayFocusMinutes + minutes;
    setTodayFocusMinutes(newFocusMins);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}focus_mins_${todayKeyCurrent}`, String(newFocusMins));

    recordDailyActivity('manual', { minutes, subject, note });
    soundEngine.playChime('complete');
    addNotification(
      'Study Sprint Logged! 📚',
      `Logged ${minutes}m of ${subject} (${note || 'Study Session'}). +${earnedXp} XP awarded!`,
      'achievement'
    );
  };

  // Log Pomodoro Session action
  const logPomodoroSession = async (taskId: string | null, durationMinutes: number) => {
    const todayKeyCurrent = new Date().toISOString().split('T')[0];
    
    // Update daily stats
    const newFocusMins = todayFocusMinutes + durationMinutes;
    const newSessions = todayCompletedSessions + 1;
    setTodayFocusMinutes(newFocusMins);
    setTodayCompletedSessions(newSessions);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}focus_mins_${todayKeyCurrent}`, String(newFocusMins));
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}focus_sessions_${todayKeyCurrent}`, String(newSessions));

    // Sound chime if enabled
    if (pomodoroSettings.soundEnabled) {
      soundEngine.playChime('complete');
    }

    // Award XP
    addXp(50);
    recordDailyActivity('pomodoro', { minutes: durationMinutes });

    // Check Pomodoro achievements
    checkAchievementUnlock('pomodoro-first', 1);
    checkAchievementUnlock('pomodoro-5', newSessions);
    checkAchievementUnlock('pomodoro-20', newSessions);

    // If attached to a specific task, accumulate time & session count
    if (taskId) {
      const target = tasks.find(t => t.id === taskId);
      if (target) {
        const updatedTime = (target.timeSpentMinutes || 0) + durationMinutes;
        const updatedSessions = (target.pomodoroSessions || 0) + 1;
        
        setTasks(prev => prev.map(t => t.id === taskId ? {
          ...t,
          timeSpentMinutes: updatedTime,
          pomodoroSessions: updatedSessions,
        } : t));

        if (user?.id) {
          try {
            const taskRef = doc(db, 'users', user.id, 'tasks', taskId);
            await updateDoc(taskRef, {
              timeSpentMinutes: updatedTime,
              pomodoroSessions: updatedSessions,
            });
          } catch (e) {
            console.error('Error logging task focus session to Firestore:', e);
          }
        }
      }
    }

    addNotification(
      'Focus Session Completed! 🍅', 
      `Logged ${durationMinutes} mins of deep study. +50 XP awarded!`, 
      'achievement'
    );
  };

  // Sync with Firestore on Auth State Change
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      setIsAuthLoading(false);

      if (fUser) {
        let userProfileData: UserProfile = {
          id: fUser.uid,
          name: fUser.displayName || fUser.email?.split('@')[0] || 'Student',
          email: fUser.email || '',
          avatarUrl: fUser.photoURL || undefined,
          grade: 'Class 10',
          school: 'StudyVerse Academy',
          createdAt: new Date().toISOString(),
        };

        try {
          const userRef = doc(db, 'users', fUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            userProfileData = {
              id: fUser.uid,
              name: data.name || fUser.displayName || 'Student',
              email: fUser.email || data.email || '',
              avatarUrl: data.avatarUrl || fUser.photoURL || undefined,
              grade: data.grade || 'Class 10',
              school: data.school || 'State Board High School',
              bio: data.bio || '',
              createdAt: data.createdAt || new Date().toISOString(),
            };
            setUser(userProfileData);
            if (data.xp !== undefined) setXp(data.xp);
            if (data.streak) setStreak(data.streak);
            if (data.achievements) setAchievements(data.achievements);
          } else {
            const initialStreak: StudyStreak = { streakCount: 0, lastCompletedDate: null, activeDates: [] };
            await setDoc(userRef, {
              ...userProfileData,
              xp: 150,
              level: 1,
              streak: initialStreak,
              achievements: INITIAL_ACHIEVEMENTS,
              createdAt: serverTimestamp(),
            });
            setUser(userProfileData);
            setXp(150);
            setStreak(initialStreak);
            setAchievements(INITIAL_ACHIEVEMENTS);
          }
        } catch (e) {
          console.warn('Could not sync user profile from Firestore, using local fallback:', e);
          setUser(userProfileData);
        }

        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}user`, JSON.stringify(userProfileData));

        // Realtime Firestore Tasks Listener
        const tasksCol = collection(db, 'users', fUser.uid, 'tasks');
        const unsubTasks = onSnapshot(tasksCol, (snapshot) => {
          const loadedTasks: Task[] = snapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<Task, 'id'>)
          }));
          if (loadedTasks.length > 0) {
            setTasks(loadedTasks);
          }
        }, () => {});

        // Realtime Firestore Timetable Listener
        const timetableCol = collection(db, 'users', fUser.uid, 'timetable');
        const unsubTimetable = onSnapshot(timetableCol, (snapshot) => {
          const loadedSlots: TimetableSlot[] = snapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<TimetableSlot, 'id'>)
          }));
          if (loadedSlots.length > 0) {
            setTimetable(loadedSlots);
          }
        }, () => {});

        // Realtime Certificates Listener
        const certQuery = query(collection(db, 'certificates'), where('userId', '==', fUser.uid));
        const unsubCerts = onSnapshot(certQuery, (snapshot) => {
          const loadedCerts: Certificate[] = snapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<Certificate, 'id'>)
          }));
          setCertificates(loadedCerts);
        }, () => {});

        // Realtime Course Progress Listener
        const progressCol = collection(db, 'users', fUser.uid, 'courseProgress');
        const unsubProgress = onSnapshot(progressCol, (snapshot) => {
          const map: Record<string, string[]> = {};
          snapshot.docs.forEach(d => {
            const data = d.data();
            if (data.completedLessons) {
              map[d.id] = data.completedLessons;
            }
          });
          setCompletedLessons(map);
        }, () => {});

        return () => {
          unsubTasks();
          unsubTimetable();
          unsubCerts();
          unsubProgress();
        };
      } else {
        setUser(null);
        localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}user`);
        setTasks(DEMO_SAMPLE_TASKS);
        setTimetable(DEFAULT_TIMETABLE);
        setStreak({ streakCount: 0, lastCompletedDate: null, activeDates: [] });
        setXp(350);
        setCertificates([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Sync public resources from Firestore if available
  useEffect(() => {
    const unsubResources = onSnapshot(collection(db, 'resources'), (snapshot) => {
      if (!snapshot.empty) {
        const loaded: ResourceItem[] = snapshot.docs.map(d => ({
          id: d.id,
          ...(d.data() as Omit<ResourceItem, 'id'>)
        }));
        setResources(loaded);
      }
    }, () => {});

    return () => unsubResources();
  }, []);

  // Task Actions with Firestore Cloud Persistence
  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'completed'>) => {
    if (!user?.id) {
      openAuthModal('signup');
      return;
    }

    const taskId = `task-${Date.now()}`;
    const newTask: Task = {
      ...taskData,
      id: taskId,
      userId: user.id,
      completed: false,
      timeSpentMinutes: 0,
      pomodoroSessions: 0,
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
    setIsAddTaskModalOpen(false);
    addNotification('Task Added', `"${newTask.name}" added to ${newTask.taskType.toLowerCase()}.`, 'task');
    addXp(15);

    try {
      const taskRef = doc(db, 'users', user.id, 'tasks', taskId);
      await setDoc(taskRef, newTask);
    } catch (e) {
      console.error('Error adding task to Firestore:', e);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    setEditingTask(null);
    setIsAddTaskModalOpen(false);
    addNotification('Task Updated', 'Task details saved successfully.');

    if (user?.id) {
      try {
        const taskRef = doc(db, 'users', user.id, 'tasks', id);
        await updateDoc(taskRef, updates);
      } catch (e) {
        console.error('Error updating task in Firestore:', e);
      }
    }
  };

  const deleteTask = async (id: string) => {
    const target = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    addNotification('Task Deleted', `"${target?.name || 'Task'}" has been removed.`);

    if (user?.id) {
      try {
        const taskRef = doc(db, 'users', user.id, 'tasks', id);
        await deleteDoc(taskRef);
      } catch (e) {
        console.error('Error deleting task from Firestore:', e);
      }
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const target = tasks.find(t => t.id === id);
    if (!target) return;

    const nextCompleted = !target.completed;
    const completedAt = nextCompleted ? new Date().toISOString() : undefined;
    const updates: Partial<Task> = {
      completed: nextCompleted,
      completedAt,
      progress: target.taskType === 'PROJECT' && nextCompleted ? 100 : target.progress,
    };

    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

    if (nextCompleted) {
      addXp(30);
      addNotification('Task Completed!', `Great job on "${target.name}"! +30 XP`, 'success');
      handleTaskCompletionStreakCheck();

      const completedCount = tasks.filter(t => t.completed || t.id === id).length;
      checkAchievementUnlock('first-task', 1);
      checkAchievementUnlock('tasks-10', completedCount);
      checkAchievementUnlock('tasks-25', completedCount);

      if (target.taskType === 'PROJECT') {
        checkAchievementUnlock('first-project', 1);
      }

      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#0F8B6D', '#BFE8D7', '#E6A83A'],
        });
      } catch {
        // safe
      }
    }

    if (user?.id) {
      try {
        const taskRef = doc(db, 'users', user.id, 'tasks', id);
        await updateDoc(taskRef, updates);
      } catch (e) {
        console.error('Error updating task status in Firestore:', e);
      }
    }
  };

  // Timetable Cloud Actions
  const addTimetableSlot = async (slot: Omit<TimetableSlot, 'id' | 'userId'>) => {
    const slotId = `slot-${Date.now()}`;
    const newSlot: TimetableSlot = {
      ...slot,
      id: slotId,
      userId: user?.id || 'guest',
    };
    setTimetable(prev => [...prev, newSlot]);
    addNotification('Timetable Updated', `${slot.subject} added to ${slot.day}.`);

    if (user?.id) {
      try {
        const slotRef = doc(db, 'users', user.id, 'timetable', slotId);
        await setDoc(slotRef, newSlot);
      } catch (e) {
        console.error('Error adding slot to Firestore:', e);
      }
    }
  };

  const updateTimetableSlot = async (id: string, updates: Partial<TimetableSlot>) => {
    setTimetable(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    addNotification('Timetable Updated', 'Slot details updated successfully.');

    if (user?.id) {
      try {
        const slotRef = doc(db, 'users', user.id, 'timetable', id);
        await updateDoc(slotRef, updates);
      } catch (e) {
        console.error('Error updating slot in Firestore:', e);
      }
    }
  };

  const deleteTimetableSlot = async (id: string) => {
    setTimetable(prev => prev.filter(s => s.id !== id));
    addNotification('Timetable Slot Removed', 'Period has been removed from timetable.');

    if (user?.id) {
      try {
        const slotRef = doc(db, 'users', user.id, 'timetable', id);
        await deleteDoc(slotRef);
      } catch (e) {
        console.error('Error deleting slot from Firestore:', e);
      }
    }
  };

  // Resources Action
  const addResource = async (item: Omit<ResourceItem, 'id'>) => {
    const resId = `res-${Date.now()}`;
    const newItem: ResourceItem = {
      ...item,
      id: resId,
      downloads: 1,
    };
    setResources(prev => [newItem, ...prev]);
    addNotification('Resource Shared', `"${item.title}" added to resource library.`);

    try {
      const resRef = doc(db, 'resources', resId);
      await setDoc(resRef, newItem);
    } catch (e) {
      console.error('Error saving resource to Firestore:', e);
    }
  };

  // Course Progress & Certificates Cloud Actions
  const markLessonComplete = async (courseId: string, lessonId: string) => {
    const currentList = completedLessons[courseId] || [];
    if (currentList.includes(lessonId)) return;

    const updatedList = [...currentList, lessonId];
    const updated = { ...completedLessons, [courseId]: updatedList };
    setCompletedLessons(updated);

    addXp(25);
    addNotification('Lesson Finished', 'Great job! +25 XP awarded.', 'achievement');
    recordDailyActivity('course');

    if (user?.id) {
      try {
        const progRef = doc(db, 'users', user.id, 'courseProgress', courseId);
        await setDoc(progRef, {
          courseId,
          completedLessons: updatedList,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (e) {
        console.error('Error saving course progress to Firestore:', e);
      }
    }
  };

  const issueCertificate = async (courseId: string, customStudentName: string): Promise<Certificate> => {
    const targetCourse = courses.find(c => c.id === courseId);
    const courseTitle = targetCourse ? targetCourse.title : 'StudyVerse Course';
    
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const courseCode = courseId.includes('ai') ? 'AI' : courseId.includes('smart') ? 'SMART' : 'COURSE';
    const certId = `SV-${courseCode}-${new Date().getFullYear()}-${randomHex}`;
    const docId = `cert-${Date.now()}`;
    
    const verificationUrl = `${window.location.origin}/#verify/${certId}`;
    
    const newCert: Certificate = {
      id: docId,
      certificateId: certId,
      userId: user?.id || 'guest-user',
      studentName: customStudentName.trim() || user?.name || 'Valued Scholar',
      courseId,
      courseTitle,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verificationUrl,
      isValid: true,
      issuer: 'StudyVerse Academic Board',
      ceoSignature: 'Raghuveer',
    };

    setCertificates(prev => [newCert, ...prev]);
    checkAchievementUnlock('course-completed', 1);
    addXp(400);

    try {
      const certRef = doc(db, 'certificates', docId);
      await setDoc(certRef, newCert);
    } catch (e) {
      console.error('Error saving certificate to Firestore:', e);
    }

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0F8B6D', '#E6A83A', '#BFE8D7', '#FFFFFF'],
      });
    } catch {
      // safe
    }

    addNotification('Certificate Issued!', `Congratulations ${newCert.studentName}! Your certificate ID is ${newCert.certificateId}`, 'achievement');
    return newCert;
  };

  const createCustomCertificate = async (data: {
    studentName: string;
    courseTitle: string;
    courseId?: string;
    issueDate?: string;
    certificateId?: string;
  }): Promise<Certificate> => {
    const currentYear = new Date().getFullYear();
    const cleanPrefix = data.courseTitle ? data.courseTitle.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase() : 'COURSE';
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    const finalCertId = (data.certificateId && data.certificateId.trim())
      ? data.certificateId.trim().toUpperCase()
      : `SV-${cleanPrefix || 'COURSE'}-${currentYear}-${rand}`;
    const docId = `cert-${Date.now()}`;
    const verificationUrl = `${window.location.origin}/#verify/${finalCertId}`;

    const newCert: Certificate = {
      id: docId,
      certificateId: finalCertId,
      userId: user?.id || 'guest-user',
      studentName: data.studentName.trim() || user?.name || 'Valued Scholar',
      courseId: data.courseId || 'custom-course',
      courseTitle: data.courseTitle.trim() || 'Study Smarter with Generative AI',
      issueDate: data.issueDate?.trim() || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verificationUrl,
      isValid: true,
      issuer: 'StudyVerse Academic Board',
      ceoSignature: 'Raghuveer',
    };

    setCertificates(prev => [newCert, ...prev]);
    addXp(300);

    try {
      const certRef = doc(db, 'certificates', docId);
      await setDoc(certRef, newCert);
    } catch (e) {
      console.error('Error saving custom certificate to Firestore:', e);
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F8B6D', '#E6A83A', '#BFE8D7', '#FFFFFF'],
      });
    } catch {}

    addNotification('Certificate Generated!', `Issued to ${newCert.studentName} with ID ${newCert.certificateId}`, 'achievement');
    return newCert;
  };

  const updateCertificate = async (updatedCert: Certificate): Promise<void> => {
    // Keep verification URL in sync if certificateId changed
    const finalCert: Certificate = {
      ...updatedCert,
      verificationUrl: `${window.location.origin}/#verify/${updatedCert.certificateId}`,
    };

    setCertificates(prev => prev.map(c => c.id === finalCert.id ? finalCert : c));
    try {
      const certRef = doc(db, 'certificates', finalCert.id);
      await setDoc(certRef, finalCert, { merge: true });
      addNotification('Certificate Updated', `Certificate ID ${finalCert.certificateId} saved successfully.`, 'success');
    } catch (e) {
      console.error('Error updating certificate in Firestore:', e);
    }
  };

  const deleteCertificate = async (id: string): Promise<void> => {
    setCertificates(prev => prev.filter(c => c.id !== id));
    try {
      const certRef = doc(db, 'certificates', id);
      await deleteDoc(certRef);
      addNotification('Certificate Removed', 'Certificate deleted from your collection.', 'info');
    } catch (e) {
      console.error('Error deleting certificate from Firestore:', e);
    }
  };

  // Firebase Auth Operations
  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass);
      closeAuthModal();
      addNotification('Welcome Back!', `Signed in as ${userCredential.user.displayName || userCredential.user.email}.`, 'success');
      return true;
    } catch (error: any) {
      console.error('Firebase sign in error:', error);
      throw new Error(error.message || 'Failed to sign in. Please verify your email and password.');
    }
  };

  const signup = async (name: string, email: string, pass: string, grade = 'Class 10'): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const fUser = userCredential.user;

      await updateFirebaseProfile(fUser, {
        displayName: name.trim() || 'Student',
      });

      const initialStreak: StudyStreak = { streakCount: 0, lastCompletedDate: null, activeDates: [] };
      const newProfile: UserProfile = {
        id: fUser.uid,
        name: name.trim() || 'Student',
        email: fUser.email || email.trim(),
        grade,
        school: 'StudyVerse Academy',
        createdAt: new Date().toISOString(),
      };

      const userRef = doc(db, 'users', fUser.uid);
      await setDoc(userRef, {
        ...newProfile,
        xp: 150,
        level: 1,
        streak: initialStreak,
        achievements: INITIAL_ACHIEVEMENTS,
        createdAt: serverTimestamp(),
      });

      setUser(newProfile);
      closeAuthModal();
      addNotification('Account Created!', `Welcome to StudyVerse V3.0, ${newProfile.name}!`, 'success');
      return true;
    } catch (error: any) {
      console.error('Firebase sign up error:', error);
      throw new Error(error.message || 'Failed to create account. Please try again.');
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const fUser = userCredential.user;
      closeAuthModal();
      addNotification('Signed In with Google', `Welcome, ${fUser.displayName || 'Scholar'}!`, 'success');
      return true;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'Google sign-in was cancelled or encountered an error.');
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      addNotification('Password Reset Link', `Reset instructions sent to ${email}.`, 'info');
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset email.');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      addNotification('Logged Out', 'You are now exploring as a guest visitor.');
    } catch (error: any) {
      console.error('Sign out error:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user?.id) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}user`, JSON.stringify(updated));

    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, updates);
      if (updates.name && auth.currentUser) {
        await updateFirebaseProfile(auth.currentUser, { displayName: updates.name });
      }
      addNotification('Profile Updated', 'Your profile details have been saved to the cloud.');
    } catch (e) {
      console.error('Error updating profile in Firestore:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated,
        isAuthLoading,
        login,
        signup,
        loginWithGoogle,
        resetPassword,
        logout,
        updateProfile,
        updateUserProfile: updateProfile,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        setAuthModalMode,
        activeTab,
        setActiveTab,
        moreSubView,
        setMoreSubView,
        moreSubSection: moreSubView,
        setMoreSubSection: setMoreSubView,
        navigateTo,
        isDarkMode,
        toggleDarkMode,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,
        editingTask,
        setEditingTask,
        subjects,
        addCustomSubject,
        streak,
        xp,
        level,
        nextLevelXp,
        levelProgress,
        isStreakTrackerOpen,
        setIsStreakTrackerOpen,
        openStreakTracker,
        recordDailyActivity,
        useStreakFreeze,
        updateDailyGoals,
        logManualStudySprint,
        todayFocusSessions: todayCompletedSessions,
        pomodoroSettings,
        updatePomodoroSettings,
        activePomodoroTaskId,
        setActivePomodoroTaskId,
        startPomodoroWithTask,
        logPomodoroSession,
        todayFocusMinutes,
        todayCompletedSessions,
        achievements,
        recentUnlockedAchievement,
        dismissAchievementPopup,
        resources,
        addResource,
        courses,
        activeCourseId,
        setActiveCourseId,
        completedLessons,
        markLessonComplete,
        certificates,
        issueCertificate,
        createCustomCertificate,
        updateCertificate,
        deleteCertificate,
        selectedCertificate,
        setSelectedCertificate,
        timetable,
        addTimetableSlot,
        updateTimetableSlot,
        deleteTimetableSlot,
        notifications,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        isSearchOpen,
        setIsSearchOpen,
        requireAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
