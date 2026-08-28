import React from 'react';
import { 
  Plus, 
  Flame, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  GraduationCap, 
  ArrowRight, 
  ExternalLink, 
  Sparkles,
  Calendar,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  FolderKanban,
  BookMarked,
  Timer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyVerseLogo } from '../common/StudyVerseLogo';
import { SUBJECT_COLORS } from '../../data/initialData';

export const HomeView: React.FC = () => {
  const {
    user,
    isAuthenticated,
    tasks,
    toggleTaskCompletion,
    streak,
    openStreakTracker,
    xp,
    level,
    levelProgress,
    achievements,
    resources,
    courses,
    navigateTo,
    setIsAddTaskModalOpen,
    setEditingTask,
    openAuthModal,
    setActiveCourseId,
    todayFocusMinutes,
    todayFocusSessions,
  } = useApp();

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const upcomingTasks = tasks
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const abhyasDeepikaResource = resources.find(r => r.id === 'abhyas-deepika-10th') || resources[0];

  const handleQuickAdd = () => {
    setEditingTask(null);
    setIsAddTaskModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. HERO / WELCOME BANNER */}
      <div className="relative rounded-2xl glass-panel p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-[#0F8B6D]" />
              <span>{todayStr}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              {isAuthenticated ? (
                <>
                  Welcome back, <span className="text-[#0F8B6D]">{user?.name}</span>
                </>
              ) : (
                <>
                  Master your studies with <span className="text-[#0F8B6D]">StudyVerse</span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              {isAuthenticated
                ? `You have ${upcomingTasks.length} pending tasks scheduled for today. Maintain your momentum and study streak.`
                : 'Your smart study planner — seamlessly manage Homework, Classwork, and Projects with smart study streaks and certified masterclasses.'}
            </p>

            {/* Guest Exploration Notice */}
            {!isAuthenticated && (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs mt-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Demo Mode:</strong> You are viewing sample student data. Create an account to save your personal timetable and progress.
                </span>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="font-bold underline ml-1 hover:text-amber-900 dark:hover:text-amber-200"
                >
                  Join Free
                </button>
              </div>
            )}
          </div>

          {/* Quick Action Button & Streak widget */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Streak widget */}
            <div 
              onClick={openStreakTracker}
              className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 dark:bg-amber-500/15 cursor-pointer transition-all active:scale-95 shadow-xs group"
              title="Click to open Daily Study Streak Tracker"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <Flame className={`w-5 h-5 ${streak.streakCount > 0 ? 'fill-amber-500 text-amber-500 animate-pulse' : 'text-neutral-400'}`} />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <span>Daily Study Streak</span>
                  <span className="text-[10px] opacity-75">🔥</span>
                </div>
                <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {streak.streakCount} Day{streak.streakCount === 1 ? '' : 's'} Active
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('more', 'pomodoro')}
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#E6A83A] dark:text-amber-300 font-bold text-xs sm:text-sm border border-[#E6A83A]/30 shadow-xs transition-all flex items-center gap-2 active:scale-95 shrink-0"
            >
              <Timer className="w-4 h-4 text-[#E6A83A]" />
              <span>Pomodoro Timer</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FOUR-PANEL KPI OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pomodoro Focus Time */}
        <div 
          onClick={() => navigateTo('more', 'pomodoro')}
          className="p-5 rounded-2xl glass-panel hover:border-[#0F8B6D]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Today's Focus
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#E6A83A] flex items-center justify-center">
              <Timer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {todayFocusMinutes}m
            </span>
            <span className="text-xs font-semibold text-[#E6A83A]">
              {todayFocusSessions} Session{todayFocusSessions === 1 ? '' : 's'}
            </span>
          </div>
          <div className="text-[11px] text-[#0F8B6D] font-medium mt-3 flex items-center gap-1">
            <span>Launch Pomodoro timer →</span>
          </div>
        </div>

        {/* Homework / Classwork / Projects Overview */}
        <div 
          onClick={() => navigateTo('tasks')}
          className="p-5 rounded-2xl glass-panel hover:border-[#0F8B6D]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Planner Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {completedCount}/{totalCount}
            </span>
            <span className="text-xs font-semibold text-[#0F8B6D]">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#0F8B6D] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Level & XP */}
        <div 
          onClick={() => navigateTo('achievements')}
          className="p-5 rounded-2xl glass-panel hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Student Standing
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              Level {level}
            </span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              {xp} Total XP
            </span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Featured Resource Quick Tile */}
        <div 
          onClick={() => window.open('https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW', '_blank')}
          className="p-5 rounded-2xl glass-panel hover:border-[#0F8B6D]/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0F8B6D]">
              Featured Resource
            </span>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#0F8B6D] transition-colors" />
          </div>
          <div className="mt-2">
            <div className="font-bold text-sm text-neutral-900 dark:text-neutral-50 line-clamp-1">
              10th Class Abhyas Deepika
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              All Subjects Question Bank & Blueprints
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0F8B6D]">
            <span>Open Google Drive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. UPCOMING TASKS SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0F8B6D]" />
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Upcoming Deadlines
            </h2>
          </div>
          <button
            onClick={() => navigateTo('tasks')}
            className="text-xs font-semibold text-[#0F8B6D] hover:underline flex items-center gap-1"
          >
            <span>View All Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {upcomingTasks.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#0F8B6D] mx-auto" />
            <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
              All caught up! No pending deadlines.
            </p>
            <p className="text-xs text-neutral-500">
              Click &ldquo;Add Task&rdquo; to schedule homework, classwork, or a project.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcomingTasks.map(task => {
              const colorInfo = SUBJECT_COLORS[task.subject] || {
                badge: 'bg-[#0F8B6D] text-white',
                bg: 'bg-emerald-50 dark:bg-emerald-950/40',
                border: 'border-emerald-200 dark:border-emerald-800',
              };

              const isOverdue = new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl glass-panel transition-all duration-150 flex flex-col justify-between gap-3 ${
                    isOverdue
                      ? 'border-red-300 dark:border-red-900/60 bg-red-50/20'
                      : 'hover:border-[#0F8B6D]/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        task.completed
                          ? 'border-[#0F8B6D] bg-[#0F8B6D] text-white'
                          : 'border-neutral-300 dark:border-neutral-600 hover:border-[#0F8B6D]'
                      }`}
                      title="Mark task completed"
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${colorInfo.badge}`}>
                          {task.subject}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-medium">
                          {task.taskType}
                        </span>
                        {task.priority === 'High' && (
                          <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 text-[10px] font-semibold">
                            High Priority
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mt-1.5 leading-snug">
                        {task.name}
                      </h3>

                      {task.description && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <div className={`flex items-center gap-1 font-medium ${isOverdue ? 'text-red-600 font-bold' : 'text-neutral-500'}`}>
                      {isOverdue ? <AlertTriangle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                      <span>{isOverdue ? 'Overdue: ' : 'Due: '} {task.dueDate}</span>
                    </div>

                    {task.taskType === 'PROJECT' && (
                      <span className="font-semibold text-[#0F8B6D]">
                        {task.progress || 0}% Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. FEATURED ABHYAS DEEPIKA CARD */}
      <div className="rounded-2xl glass-panel p-6 sm:p-7 border border-[#0F8B6D]/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#0F8B6D] uppercase tracking-wider">
              Official Study Repository
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              10th Class Abhyas Deepika All Subjects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Complete state educational board question banks, model papers, diagrams, and blueprint revision guides for all 10th Class subjects.
            </p>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Open Google Drive</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 5. COURSES & CERTIFICATES PREVIEW */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#0F8B6D]" />
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Featured Free Courses
            </h2>
          </div>
          <button
            onClick={() => navigateTo('more', 'courses')}
            className="text-xs font-semibold text-[#0F8B6D] hover:underline flex items-center gap-1"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {courses.slice(0, 3).map(course => (
            <div
              key={course.id}
              onClick={() => {
                setActiveCourseId(course.id);
                navigateTo('more', 'courses');
              }}
              className="rounded-2xl glass-panel overflow-hidden hover:border-[#0F8B6D]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-36 overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-neutral-900/80 text-white text-[10px] font-semibold backdrop-blur-xs">
                  Free Masterclass
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-[#0F8B6D] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {course.tagline}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
                  <span>{course.duration}</span>
                  <span className="font-semibold text-[#0F8B6D] flex items-center gap-1">
                    <span>Start</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
