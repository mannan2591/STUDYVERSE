import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Timer,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudyStreakModal: React.FC = () => {
  const {
    isStreakTrackerOpen,
    setIsStreakTrackerOpen,
    streak,
    tasks,
    todayFocusMinutes,
    logManualStudySprint,
    subjects,
    navigateTo,
    setIsAddTaskModalOpen
  } = useApp();

  const [quickMinutes, setQuickMinutes] = useState(25);
  const [quickSubject, setQuickSubject] = useState(subjects[0] || 'Mathematics');
  const [quickNote, setQuickNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isStreakTrackerOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const isStudiedToday = streak.lastCompletedDate === todayStr || (streak.activeDates || []).includes(todayStr);

  const todayTasksCompleted = tasks.filter(t => t.completed).length;
  const targetTasks = streak.dailyGoalTasks || 2;
  const targetMinutes = streak.dailyGoalMinutes || 25;

  const handleQuickLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await logManualStudySprint(quickSubject, quickMinutes, quickNote);
    setQuickNote('');
    setIsSubmitting(false);
    setIsStreakTrackerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel bg-white dark:bg-[#171A19] border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-5 overflow-hidden">
        {/* Header with Close */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-[#E6A83A]">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                Daily Study Streak Tracker
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Keep the momentum unbroken every single day
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStreakTrackerOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Streak Main Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-transparent border border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Active Daily Streak
            </div>
            <div className="text-3xl font-black text-neutral-900 dark:text-neutral-50 flex items-baseline gap-1.5">
              <span>{streak.streakCount}</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">Days Active</span>
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span>Best: <strong>{streak.longestStreak || streak.streakCount} days</strong></span>
            </div>
          </div>

          <div className="text-right">
            {isStudiedToday ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0F8B6D] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-[#0F8B6D]/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Checked In 🔥
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                <Zap className="w-3.5 h-3.5" /> Action Needed
              </span>
            )}
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              {streak.freezeCount || 0} Shields Available 🛡️
            </div>
          </div>
        </div>

        {/* Today's Goal Progress */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Tasks Completed</div>
            <div className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
              {todayTasksCompleted} / {targetTasks}
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#0F8B6D] h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((todayTasksCompleted / targetTasks) * 100))}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Focus Minutes Logged</div>
            <div className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
              {todayFocusMinutes}m / {targetMinutes}m
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#E6A83A] h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((todayFocusMinutes / targetMinutes) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Offline Study Logger in Modal */}
        <form onSubmit={handleQuickLog} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2.5">
          <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0F8B6D]" />
            <span>Quick Study Check-in</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-neutral-500">Subject</label>
              <select
                value={quickSubject}
                onChange={e => setQuickSubject(e.target.value)}
                className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs"
              >
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-neutral-500">Duration</label>
              <select
                value={quickMinutes}
                onChange={e => setQuickMinutes(Number(e.target.value))}
                className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs"
              >
                <option value={15}>15 Minutes</option>
                <option value={25}>25 Minutes (1 Pomodoro)</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            placeholder="Focus Topic note (e.g. Chapter revision)..."
            value={quickNote}
            onChange={e => setQuickNote(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-lg bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Log Study Session & Keep Streak (+{Math.max(20, quickMinutes * 2)} XP)</span>
          </button>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => {
              setIsStreakTrackerOpen(false);
              navigateTo('more', 'streak-tracker');
            }}
            className="text-xs font-bold text-[#0F8B6D] hover:underline flex items-center gap-1"
          >
            <span>Open Full Streak Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsStreakTrackerOpen(false);
              navigateTo('more', 'pomodoro');
            }}
            className="text-xs font-semibold text-[#E6A83A] hover:underline flex items-center gap-1"
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Launch Pomodoro</span>
          </button>
        </div>
      </div>
    </div>
  );
};
