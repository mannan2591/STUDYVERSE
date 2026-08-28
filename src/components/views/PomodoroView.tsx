import React, { useState } from 'react';
import { 
  Timer, 
  Target, 
  Clock, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Brain, 
  Coffee, 
  Settings, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PomodoroTimer } from '../pomodoro/PomodoroTimer';
import { Task } from '../../types';
import { SUBJECT_COLORS } from '../../data/initialData';

export const PomodoroView: React.FC = () => {
  const { 
    tasks, 
    activePomodoroTaskId, 
    setActivePomodoroTaskId, 
    todayFocusMinutes, 
    todayCompletedSessions, 
    streak, 
    navigateTo,
    pomodoroSettings
  } = useApp();

  const activeIncompleteTasks = tasks.filter(t => !t.completed);

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold uppercase tracking-wider mb-1">
            <Timer className="w-3.5 h-3.5" />
            <span>Deep Focus Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            Pomodoro Study Timer
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Boost focus with timed study sessions and automatically track time spent per task.
          </p>
        </div>

        <button
          onClick={() => navigateTo('more', 'settings')}
          className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-[#0F8B6D] text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Settings className="w-4 h-4" />
          <span>Timer Settings</span>
        </button>
      </div>

      {/* Main Grid: Timer Component on Left/Center, Quick Tasks on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer Block */}
        <div className="lg:col-span-2 space-y-6">
          <PomodoroTimer />

          {/* Pomodoro Technique Method Card */}
          <div className="p-5 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-3">
            <h3 className="text-sm font-bold text-[#171A19] dark:text-[#F7F4EA] flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#0F8B6D]" />
              <span>The 25/5 Pomodoro Study Protocol</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
                <span className="font-bold text-[#0F8B6D] block mb-1">1. Focus Burst</span>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Work on one single task for {pomodoroSettings.focusDuration} minutes with zero phone interruptions.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
                <span className="font-bold text-[#E6A83A] block mb-1">2. Short Rest</span>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Take a {pomodoroSettings.shortBreakDuration} min rest to stretch, drink water, and rest your eyes.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
                <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">3. Repeat & Earn</span>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  After 4 sessions, enjoy a {pomodoroSettings.longBreakDuration} min long recharge + bonus XP!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Active Tasks & Time Tracked */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#171A19] dark:text-[#F7F4EA] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#0F8B6D]" />
                <span>Tracked Tasks</span>
              </h3>
              <button
                onClick={() => navigateTo('tasks')}
                className="text-xs text-[#0F8B6D] hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>All Tasks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              Click any task below to attach the timer to that assignment.
            </p>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {activeIncompleteTasks.length === 0 ? (
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 text-center text-xs text-neutral-400">
                  No active tasks. Add a homework or classwork task to track time!
                </div>
              ) : (
                activeIncompleteTasks.map(t => {
                  const isSelected = activePomodoroTaskId === t.id;
                  const color = SUBJECT_COLORS[t.subject] || { badge: 'bg-[#0F8B6D] text-white' };

                  return (
                    <div
                      key={t.id}
                      onClick={() => setActivePomodoroTaskId(t.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer text-xs ${
                        isSelected
                          ? 'border-[#0F8B6D] bg-[#0F8B6D]/10 shadow-xs'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-[#0F8B6D]/40 bg-white/50 dark:bg-neutral-900/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold mb-1 ${color.badge}`}>
                            {t.subject}
                          </span>
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                            {t.name}
                          </h4>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#0F8B6D] px-1.5 py-0.5 rounded bg-[#0F8B6D]/15 shrink-0">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#0F8B6D]" />
                          <span>{t.timeSpentMinutes || 0}m logged</span>
                        </span>
                        <span>{t.pomodoroSessions || 0} 🍅</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Daily Streak & Focus Achievement Callout */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0F8B6D]/10 to-[#E6A83A]/10 border border-[#0F8B6D]/20 space-y-2">
            <div className="flex items-center gap-2 text-[#0F8B6D] font-bold text-xs">
              <Flame className="w-4 h-4 text-[#E6A83A]" />
              <span>{streak.streakCount} Day Study Streak Active</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Completing Pomodoros logs study sessions to your streak, leveling up your profile and unlocking badges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
