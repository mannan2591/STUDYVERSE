import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Target, 
  Flame, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Music, 
  Coffee, 
  Brain,
  ListTodo,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundEngine } from '../../utils/soundEffects';
import { Task } from '../../types';

interface PomodoroTimerProps {
  initialTaskId?: string | null;
  onSessionComplete?: () => void;
  compact?: boolean;
}

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ 
  initialTaskId, 
  onSessionComplete,
  compact = false 
}) => {
  const { 
    tasks, 
    pomodoroSettings, 
    activePomodoroTaskId, 
    setActivePomodoroTaskId, 
    logPomodoroSession,
    todayFocusMinutes,
    todayCompletedSessions,
    toggleTaskCompletion,
    navigateTo,
    requireAuth,
  } = useApp();

  const selectedTaskId = activePomodoroTaskId || initialTaskId || null;
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  // Timer modes & durations in seconds
  const [mode, setMode] = useState<TimerMode>('focus');
  
  const getDurationForMode = useCallback((m: TimerMode) => {
    if (m === 'focus') return (pomodoroSettings.focusDuration || 25) * 60;
    if (m === 'shortBreak') return (pomodoroSettings.shortBreakDuration || 5) * 60;
    return (pomodoroSettings.longBreakDuration || 15) * 60;
  }, [pomodoroSettings.focusDuration, pomodoroSettings.shortBreakDuration, pomodoroSettings.longBreakDuration]);

  const [timeLeft, setTimeLeft] = useState<number>(() => getDurationForMode('focus'));
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompletedThisStreak, setSessionsCompletedThisStreak] = useState(0);

  // Ambient sound choice
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'whitenoise' | 'binaural'>('none');
  const [ambientVolume, setAmbientVolume] = useState(0.15);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update duration if settings change while paused
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getDurationForMode(mode));
    }
  }, [mode, pomodoroSettings, getDurationForMode, isRunning]);

  // Ambient sound management
  useEffect(() => {
    if (isRunning && ambientSound !== 'none') {
      soundEngine.startAmbient(ambientSound, ambientVolume);
    } else {
      soundEngine.stopAmbient();
    }
    return () => {
      soundEngine.stopAmbient();
    };
  }, [isRunning, ambientSound, ambientVolume]);

  // Main countdown loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, selectedTaskId]);

  const handleTimerComplete = async () => {
    setIsRunning(false);

    if (mode === 'focus') {
      const focusDuration = pomodoroSettings.focusDuration || 25;
      await logPomodoroSession(selectedTaskId, focusDuration);
      
      const newStreakCount = sessionsCompletedThisStreak + 1;
      setSessionsCompletedThisStreak(newStreakCount);

      if (onSessionComplete) onSessionComplete();

      // Switch to break
      if (newStreakCount % (pomodoroSettings.longBreakInterval || 4) === 0) {
        setMode('longBreak');
        setTimeLeft(getDurationForMode('longBreak'));
      } else {
        setMode('shortBreak');
        setTimeLeft(getDurationForMode('shortBreak'));
      }
    } else {
      // Break completed -> back to focus
      if (pomodoroSettings.soundEnabled) {
        soundEngine.playChime('break');
      }
      setMode('focus');
      setTimeLeft(getDurationForMode('focus'));
    }
  };

  const handleTogglePlay = () => {
    if (!isRunning) {
      requireAuth(() => {
        if (pomodoroSettings.soundEnabled) {
          soundEngine.playChime('start');
        }
        setIsRunning(true);
      }, 'Pomodoro Focus Timer', 'Sign in or log in to start focus sessions and log study time.');
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getDurationForMode(mode));
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      setMode('shortBreak');
      setTimeLeft(getDurationForMode('shortBreak'));
    } else {
      setMode('focus');
      setTimeLeft(getDurationForMode('focus'));
    }
  };

  const handleSwitchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getDurationForMode(newMode));
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration = getDurationForMode(mode);
  const progressPercent = Math.max(0, Math.min(100, ((totalDuration - timeLeft) / totalDuration) * 100));

  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  return (
    <div className={`rounded-3xl glass-panel border border-[#0F8B6D]/20 overflow-hidden ${compact ? 'p-4' : 'p-6 sm:p-8'}`}>
      {/* Mode Selector Header */}
      <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800/70 max-w-sm mx-auto mb-6">
        <button
          onClick={() => handleSwitchMode('focus')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'focus'
              ? 'bg-[#0F8B6D] text-white shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Focus (25m)</span>
        </button>

        <button
          onClick={() => handleSwitchMode('shortBreak')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'shortBreak'
              ? 'bg-[#0F8B6D] text-white shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>Short Break</span>
        </button>

        <button
          onClick={() => handleSwitchMode('longBreak')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'longBreak'
              ? 'bg-[#0F8B6D] text-white shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Long Break</span>
        </button>
      </div>

      {/* Task Assignment Selector */}
      <div className="mb-6 max-w-md mx-auto">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1 text-center">
          Assigned Task for This Session
        </label>
        <div className="relative">
          <select
            value={selectedTaskId || ''}
            onChange={e => setActivePomodoroTaskId(e.target.value || null)}
            className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D] appearance-none"
          >
            <option value="">🎯 General Study (No specific task)</option>
            {tasks
              .filter(t => !t.completed)
              .map(t => (
                <option key={t.id} value={t.id}>
                  [{t.subject}] {t.name} {t.timeSpentMinutes ? `(⏱️ ${t.timeSpentMinutes}m)` : ''}
                </option>
              ))}
          </select>
          <Target className="w-4 h-4 text-[#0F8B6D] absolute left-3 top-3 pointer-events-none" />
          <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
        </div>

        {/* Selected Task Details Banner */}
        {selectedTask && (
          <div className="mt-2.5 p-3 rounded-2xl bg-[#0F8B6D]/8 border border-[#0F8B6D]/20 flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0F8B6D] truncate">{selectedTask.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0F8B6D]/15 text-[#0F8B6D] font-semibold">
                  {selectedTask.subject}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Total Tracked: <strong className="text-neutral-800 dark:text-neutral-200">{selectedTask.timeSpentMinutes || 0} mins</strong> ({selectedTask.pomodoroSessions || 0} sessions)
              </p>
            </div>

            <button
              onClick={() => toggleTaskCompletion(selectedTask.id)}
              className="p-1.5 rounded-xl bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-[#0F8B6D] hover:border-[#0F8B6D] border border-neutral-200 dark:border-neutral-700 shadow-xs shrink-0 transition-colors"
              title="Mark Task Complete"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Circular Timer Display */}
      <div className="flex flex-col items-center justify-center my-6">
        <div className="relative w-60 h-60 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Circular Progress SVG */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Track Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-neutral-200 dark:stroke-neutral-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Active Animated Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className={`transition-all duration-500 ease-linear ${
                mode === 'focus' ? 'stroke-[#0F8B6D]' : 'stroke-[#E6A83A]'
              }`}
              strokeWidth="6"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
              {formattedTime}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mt-1">
              {mode === 'focus' ? 'Deep Focus' : mode === 'shortBreak' ? 'Short Rest' : 'Long Rest'}
            </span>
            <span className="text-[11px] text-[#0F8B6D] font-semibold mt-0.5">
              {isRunning ? '⏳ In Progress' : '⏸️ Paused'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all active:scale-95"
            title="Reset Interval"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className={`px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                : 'bg-[#0F8B6D] hover:bg-[#0A6650] shadow-[#0F8B6D]/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Focus</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all active:scale-95"
            title="Skip to Next Session"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Focus Soundscapes & Ambient Sound Controls */}
      <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-[#0F8B6D]" />
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Focus Ambient Soundscapes
            </span>
          </div>
          {ambientSound !== 'none' && (
            <span className="text-[11px] font-semibold text-[#0F8B6D] animate-pulse">
              Playing in background
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'none', label: 'Mute', icon: VolumeX },
            { id: 'rain', label: 'Gentle Rain', icon: Volume2 },
            { id: 'whitenoise', label: 'White Noise', icon: Volume2 },
            { id: 'binaural', label: 'Alpha Waves', icon: Sparkles },
          ].map(snd => (
            <button
              key={snd.id}
              onClick={() => setAmbientSound(snd.id as 'none' | 'rain' | 'whitenoise' | 'binaural')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                ambientSound === snd.id
                  ? 'bg-[#0F8B6D]/15 text-[#0F8B6D] border border-[#0F8B6D]/40 font-bold'
                  : 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
              }`}
            >
              <snd.icon className="w-3.5 h-3.5" />
              <span>{snd.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Focus Stats */}
      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-2 text-center max-w-lg mx-auto">
        <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Today&apos;s Focus</span>
          <strong className="text-sm font-extrabold text-[#0F8B6D]">{todayFocusMinutes}m</strong>
        </div>

        <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Completed</span>
          <strong className="text-sm font-extrabold text-neutral-900 dark:text-neutral-50">{todayCompletedSessions} 🍅</strong>
        </div>

        <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 block">XP Reward</span>
          <strong className="text-sm font-extrabold text-[#E6A83A]">+50 XP / session</strong>
        </div>
      </div>
    </div>
  );
};
