import React, { useState } from 'react';
import { 
  Flame, 
  ShieldCheck, 
  Trophy, 
  Calendar, 
  Target, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Award, 
  Zap, 
  ChevronRight, 
  ArrowRight,
  HelpCircle,
  BarChart3,
  BookOpen,
  Timer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECT_COLORS } from '../../data/initialData';

export const StudyStreakTrackerView: React.FC = () => {
  const { 
    streak, 
    tasks, 
    todayFocusMinutes, 
    todayFocusSessions,
    xp, 
    level, 
    achievements, 
    subjects,
    logManualStudySprint,
    updateDailyGoals,
    useStreakFreeze,
    navigateTo,
    setIsAddTaskModalOpen
  } = useApp();

  // Quick Study Sprint Modal/Form State
  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || 'Mathematics');
  const [sprintMinutes, setSprintMinutes] = useState(25);
  const [sprintNote, setSprintNote] = useState('');
  const [isLoggingSprint, setIsLoggingSprint] = useState(false);
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false);
  const [customTaskGoal, setCustomTaskGoal] = useState(streak.dailyGoalTasks || 2);
  const [customMinGoal, setCustomMinGoal] = useState(streak.dailyGoalMinutes || 25);

  const todayStr = new Date().toISOString().split('T')[0];
  const isStudiedToday = streak.lastCompletedDate === todayStr || (streak.activeDates || []).includes(todayStr);

  // Today's completed tasks count
  const todayTasksCompleted = tasks.filter(t => t.completed).length;
  const targetTasks = streak.dailyGoalTasks || 2;
  const targetMinutes = streak.dailyGoalMinutes || 25;

  const taskGoalPercent = Math.min(100, Math.round((todayTasksCompleted / targetTasks) * 100));
  const minGoalPercent = Math.min(100, Math.round((todayFocusMinutes / targetMinutes) * 100));
  const overallDailyPercent = Math.round((taskGoalPercent + minGoalPercent) / 2);

  // Calculate 7-Day Current Week Strip (Mon -> Sun)
  const currentWeekDays = React.useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday
    // Adjust so Monday is index 0
    const distanceToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - distanceToMonday);

    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateString = d.toISOString().split('T')[0];
      const isPastOrToday = d <= today;
      const isToday = dateString === todayStr;
      const isActive = (streak.activeDates || []).includes(dateString) || (isToday && isStudiedToday);

      days.push({
        name: dayNames[i],
        dayNumber: d.getDate(),
        dateString,
        isToday,
        isPastOrToday,
        isActive,
      });
    }
    return days;
  }, [streak.activeDates, isStudiedToday, todayStr]);

  // Milestone list
  const milestones = [
    { days: 3, title: '3-Day Momentum', xp: 150, badge: '🔥 Flame Starter', desc: 'Build initial daily momentum' },
    { days: 7, title: '7-Day Warrior', xp: 300, badge: '⚡ Unstoppable', desc: '1 Full week of study + 1 Shield 🛡️' },
    { days: 14, title: '14-Day Consistency', xp: 600, badge: '🏆 Habit Master', desc: 'Two weeks of persistent progress' },
    { days: 30, title: '30-Day Scholar', xp: 1000, badge: '👑 Master of Focus', desc: '1 Month unbreakable study habit' },
    { days: 100, title: '100-Day Legend', xp: 2500, badge: '🌟 Academic Legend', desc: 'Elite top 1% student dedication' },
  ];

  const handleSprintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingSprint(true);
    await logManualStudySprint(selectedSubject, sprintMinutes, sprintNote);
    setSprintNote('');
    setIsLoggingSprint(false);
  };

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    updateDailyGoals({
      dailyGoalTasks: Number(customTaskGoal),
      dailyGoalMinutes: Number(customMinGoal),
    });
    setIsEditGoalsOpen(false);
  };

  return (
    <div className="space-y-6 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Top Header & Overview Banner */}
      <div className="relative rounded-2xl glass-panel p-6 sm:p-8 overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-[#E6A83A] dark:text-amber-300 text-xs font-bold border border-[#E6A83A]/30">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>Daily Study Habit Engine</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Study Streak <span className="text-[#0F8B6D]">Tracker</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Every day you complete a homework task, run a Pomodoro focus sprint, or finish a lesson, your study flame grows brighter. Consistency is the secret weapon of top academic achievers.
            </p>

            {/* Today's Streak Status Pill */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {isStudiedToday ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-[#0F8B6D]/30 text-[#0F8B6D] dark:text-[#BFE8D7] text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0F8B6D]" />
                  <span>Streak Kept Alive for Today! 🔥</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  <Zap className="w-4 h-4 text-amber-600 animate-bounce" />
                  <span>Action Needed Today: Complete 1 task or timer to protect your streak!</span>
                </div>
              )}

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>{streak.freezeCount || 0} Streak Freeze Shields</span>
              </div>
            </div>
          </div>

          {/* Large Flame Metric Card */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-transparent border border-amber-500/30 dark:border-amber-500/20 shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 dark:bg-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
              <Flame className={`w-10 h-10 sm:w-12 sm:h-12 ${streak.streakCount > 0 ? 'fill-amber-500 text-amber-500 animate-pulse' : 'text-neutral-400'}`} />
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight">
                {streak.streakCount} <span className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">Days</span>
              </div>
              <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                Current Active Streak
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Best Record: <strong>{streak.longestStreak || streak.streakCount} days</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Weekly Streak Strip */}
      <div className="rounded-2xl glass-panel p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0F8B6D]" />
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              This Week's Momentum Strip
            </h2>
          </div>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {currentWeekDays.filter(d => d.isActive).length} / 7 Days Active
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {currentWeekDays.map((day) => (
            <div 
              key={day.dateString}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                day.isActive 
                  ? 'bg-emerald-500/15 dark:bg-emerald-500/20 border-[#0F8B6D] text-[#0F8B6D] dark:text-[#BFE8D7] shadow-xs' 
                  : day.isToday
                  ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/50 text-amber-800 dark:text-amber-300'
                  : 'bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-400'
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider">{day.name}</span>
              <span className="text-sm sm:text-base font-bold my-1">{day.dayNumber}</span>
              
              <div className="mt-1">
                {day.isActive ? (
                  <div className="w-6 h-6 rounded-full bg-[#0F8B6D] text-white flex items-center justify-center shadow-xs">
                    <Flame className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                ) : day.isToday ? (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-neutral-200/60 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
                    <span className="text-[10px]">•</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Daily Goals & Quick Study Sprint Logger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: Daily Study Goals Progress */}
        <div className="lg:col-span-6 rounded-2xl glass-panel p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#0F8B6D]" />
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Daily Study Target
              </h2>
            </div>
            <button
              onClick={() => setIsEditGoalsOpen(!isEditGoalsOpen)}
              className="text-xs font-semibold text-[#0F8B6D] hover:underline"
            >
              {isEditGoalsOpen ? 'Close' : 'Edit Goals'}
            </button>
          </div>

          {/* Goal Edit Form */}
          {isEditGoalsOpen ? (
            <form onSubmit={handleSaveGoals} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">Target Tasks / Day</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={customTaskGoal}
                    onChange={e => setCustomTaskGoal(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">Target Focus Mins / Day</label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    step="5"
                    value={customMinGoal}
                    onChange={e => setCustomMinGoal(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#0F8B6D] text-white text-xs font-bold shadow-xs hover:bg-[#0A6650] transition-colors"
              >
                Save Daily Goals
              </button>
            </form>
          ) : null}

          {/* Overall Goal Progress Bar */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-neutral-700 dark:text-neutral-300">Overall Daily Goal Progress</span>
              <span className="text-[#0F8B6D]">{overallDailyPercent}%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#0F8B6D] to-[#E6A83A] rounded-full transition-all duration-500"
                style={{ width: `${overallDailyPercent}%` }}
              />
            </div>
          </div>

          {/* Individual Targets Breakdown */}
          <div className="space-y-3">
            {/* Target 1: Tasks Completed */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-[#0F8B6D] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Tasks Completed Today</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Target: {targetTasks} tasks per day</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{todayTasksCompleted} / {targetTasks}</div>
                <div className={`text-[10px] font-semibold ${taskGoalPercent >= 100 ? 'text-[#0F8B6D]' : 'text-neutral-400'}`}>
                  {taskGoalPercent >= 100 ? 'Completed ✨' : `${taskGoalPercent}%`}
                </div>
              </div>
            </div>

            {/* Target 2: Focus Minutes Logged */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-[#E6A83A] flex items-center justify-center">
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Focus Minutes Logged</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Target: {targetMinutes} mins per day</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{todayFocusMinutes}m / {targetMinutes}m</div>
                <div className={`text-[10px] font-semibold ${minGoalPercent >= 100 ? 'text-[#0F8B6D]' : 'text-neutral-400'}`}>
                  {minGoalPercent >= 100 ? 'Goal Reached 🍅' : `${minGoalPercent}%`}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('more', 'pomodoro')}
              className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#E6A83A] dark:text-amber-300 font-bold text-xs border border-[#E6A83A]/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Launch Pomodoro</span>
            </button>
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Homework Task</span>
            </button>
          </div>
        </div>

        {/* Right 6 cols: Quick Study Sprint Logger */}
        <div className="lg:col-span-6 rounded-2xl glass-panel p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0F8B6D]" />
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Log Offline Study Sprint
              </h2>
            </div>
            <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
              Quick Check-in
            </span>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Did you study offline with textbooks, lecture notes, or solve math problem sets? Log your study session to protect your streak and earn +XP.
          </p>

          <form onSubmit={handleSprintSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Subject</label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-medium focus:ring-2 focus:ring-[#0F8B6D] focus:outline-hidden"
              >
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Study Duration</label>
              <div className="grid grid-cols-4 gap-2 mt-1">
                {[15, 25, 45, 60].map(mins => (
                  <button
                    type="button"
                    key={mins}
                    onClick={() => setSprintMinutes(mins)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      sprintMinutes === mins
                        ? 'bg-[#0F8B6D] text-white border-[#0F8B6D] shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-[#0F8B6D]'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Focus Topic / Note (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Chapter 4 Trigonometry, Physics optics diagrams..."
                value={sprintNote}
                onChange={e => setSprintNote(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-[#0F8B6D] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingSprint}
              className="w-full py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-[#E6A83A]" />
              <span>Log Study Session & Keep Streak (+{Math.max(20, sprintMinutes * 2)} XP)</span>
            </button>
          </form>
        </div>
      </div>

      {/* Streak Milestones Roadmap */}
      <div className="rounded-2xl glass-panel p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Streak Milestone Badges & Rewards
            </h2>
          </div>
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
            Earn Shields & XP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {milestones.map((m) => {
            const isAchieved = (streak.longestStreak || streak.streakCount) >= m.days;
            const progressRatio = Math.min(1, (streak.streakCount || 0) / m.days);
            const percent = Math.round(progressRatio * 100);

            return (
              <div
                key={m.days}
                className={`p-4 rounded-xl border transition-all ${
                  isAchieved
                    ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200'
                    : 'bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{m.badge}</span>
                  {isAchieved && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-neutral-900">
                      Unlocked
                    </span>
                  )}
                </div>

                <div className="text-sm font-black text-neutral-900 dark:text-neutral-100 mt-2">
                  {m.title}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {m.desc}
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span>{streak.streakCount} / {m.days} Days</span>
                    <span className="text-amber-600 dark:text-amber-400">+{m.xp} XP</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Shield & Habit Rules FAQ Card */}
      <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              How do Streak Shields (Freezes) protect you?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed mt-0.5">
              If you fall sick, have exams, or travel without completing a task for a single day, an active Streak Shield automatically preserves your streak counter from resetting to 0. Earn extra shields by reaching 7-day milestones!
            </p>
          </div>
        </div>

        <button
          onClick={useStreakFreeze}
          className="px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/30 shrink-0 transition-colors"
        >
          Check Shield Status
        </button>
      </div>
    </div>
  );
};
