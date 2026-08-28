import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Flame, 
  Award, 
  PieChart as PieChartIcon, 
  BarChart3, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProgressAnalyticsView: React.FC = () => {
  const { tasks, streak, xp, level, achievements, completedLessons, courses, certificates } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const rate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Breakdown by type
  const homework = tasks.filter(t => t.taskType === 'HOMEWORK');
  const classwork = tasks.filter(t => t.taskType === 'CLASSWORK');
  const projects = tasks.filter(t => t.taskType === 'PROJECT');

  const hwRate = homework.length > 0 ? Math.round((homework.filter(t => t.completed).length / homework.length) * 100) : 0;
  const cwRate = classwork.length > 0 ? Math.round((classwork.filter(t => t.completed).length / classwork.length) * 100) : 0;
  const prRate = projects.length > 0 ? Math.round((projects.filter(t => t.completed).length / projects.length) * 100) : 0;

  // Completed courses count
  const completedCoursesCount = (courses || []).filter(c => {
    const courseLessons = c.modules?.flatMap(m => m.lessons) || [];
    const done = completedLessons?.[c.id]?.length || 0;
    return courseLessons.length > 0 && done >= courseLessons.length;
  }).length;

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold uppercase tracking-wider mb-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Productivity Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
          Progress & Study Analytics
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Detailed metrics on your completion rates, category distributions, and streak consistency.
        </p>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-panel border border-[#0F8B6D]/20 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500">Overall Completion</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F8B6D] mt-1">{rate}%</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">{completedTasks} of {totalTasks} tasks done</div>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-[#E6A83A]/20 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500">Active Streak</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#E6A83A] mt-1 flex items-center gap-1.5">
            <Flame className="w-6 h-6 fill-[#E6A83A]" />
            <span>{streak.streakCount} Days</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Best record this month</div>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-[#0F8B6D]/20 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500">XP Points Bank</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] mt-1">
            {xp} XP
          </div>
          <div className="text-[11px] text-[#0F8B6D] font-bold mt-0.5">Level {level} Scholar</div>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-teal-500/20 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500">Courses Completed</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">
            {completedCoursesCount}
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Certificates earned</div>
        </div>
      </div>

      {/* Breakdown by Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Homework */}
        <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#171A19] dark:text-[#F7F4EA]">Homework</h3>
            <span className="text-xs font-bold text-[#0F8B6D]">{hwRate}%</span>
          </div>
          <div className="text-2xl font-extrabold text-[#171A19] dark:text-[#F7F4EA]">
            {homework.filter(t => t.completed).length} / {homework.length}
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div className="bg-[#0F8B6D] h-full rounded-full" style={{ width: `${hwRate}%` }}></div>
          </div>
          <p className="text-[11px] text-neutral-500">Practice tasks & home problem sets</p>
        </div>

        {/* Classwork */}
        <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#171A19] dark:text-[#F7F4EA]">Classwork</h3>
            <span className="text-xs font-bold text-[#0F8B6D]">{cwRate}%</span>
          </div>
          <div className="text-2xl font-extrabold text-[#171A19] dark:text-[#F7F4EA]">
            {classwork.filter(t => t.completed).length} / {classwork.length}
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div className="bg-[#0F8B6D] h-full rounded-full" style={{ width: `${cwRate}%` }}></div>
          </div>
          <p className="text-[11px] text-neutral-500">In-class derivations & lab experiments</p>
        </div>

        {/* Projects */}
        <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#171A19] dark:text-[#F7F4EA]">Projects & Records</h3>
            <span className="text-xs font-bold text-[#0F8B6D]">{prRate}%</span>
          </div>
          <div className="text-2xl font-extrabold text-[#171A19] dark:text-[#F7F4EA]">
            {projects.filter(t => t.completed).length} / {projects.length}
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div className="bg-[#0F8B6D] h-full rounded-full" style={{ width: `${prRate}%` }}></div>
          </div>
          <p className="text-[11px] text-neutral-500">Term projects and comprehensive records</p>
        </div>
      </div>
    </div>
  );
};
