import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Plus,
  BookMarked
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECT_COLORS } from '../../data/initialData';

export const CalendarView: React.FC = () => {
  const { tasks, toggleTaskCompletion, setIsAddTaskModalOpen, setEditingTask } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Get tasks for a given date
  const getTasksForDate = (dateStr: string) => {
    return tasks.filter(t => t.dueDate === dateStr);
  };

  const selectedDayTasks = getTasksForDate(selectedDay);

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold uppercase tracking-wider mb-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Deadlines & Schedules</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            Study Calendar
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Visualize your homework, classwork, and project due dates across the month.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setIsAddTaskModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0F8B6D]/25 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Calendar Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Monthly Calendar View */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-5 sm:p-6 border border-[#0F8B6D]/15 space-y-4">
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#171A19] dark:text-[#F7F4EA]">
              {monthName}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-neutral-400 py-1 border-b border-neutral-200/60 dark:border-neutral-800">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty slots for start padding */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 sm:h-20 opacity-0 pointer-events-none" />
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayTasks = getTasksForDate(dateStr);
              const isSelected = selectedDay === dateStr;
              const isToday = new Date().toISOString().split('T')[0] === dateStr;

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDay(dateStr)}
                  className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-[#0F8B6D] bg-[#0F8B6D]/10 dark:bg-[#0F8B6D]/20 shadow-xs'
                      : isToday
                      ? 'border-amber-400 dark:border-amber-600 bg-amber-50/30 dark:bg-amber-950/20'
                      : 'border-neutral-200/60 dark:border-neutral-800/80 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-[#0F8B6D] text-white'
                          : isSelected
                          ? 'text-[#0F8B6D]'
                          : 'text-[#171A19] dark:text-[#F7F4EA]'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {dayTasks.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B6D]"></span>
                    )}
                  </div>

                  {/* Tiny Task Dots / Indicators */}
                  <div className="space-y-0.5 overflow-hidden">
                    {dayTasks.slice(0, 2).map(t => (
                      <div
                        key={t.id}
                        className={`text-[8px] sm:text-[9px] px-1 py-0.2 rounded truncate font-medium ${
                          t.completed
                            ? 'bg-neutral-200 text-neutral-500 line-through'
                            : 'bg-[#0F8B6D]/20 text-[#0F8B6D] dark:text-[#BFE8D7]'
                        }`}
                      >
                        {t.name}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-[8px] text-neutral-400 font-semibold pl-1">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Day Tasks Pane */}
        <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-[#0F8B6D]/15 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Tasks for Date
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-[#171A19] dark:text-[#F7F4EA]">
                  {new Date(selectedDay + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0F8B6D] px-2.5 py-1 rounded-full bg-[#0F8B6D]/10">
                {selectedDayTasks.length} Task{selectedDayTasks.length === 1 ? '' : 's'}
              </span>
            </div>

            {selectedDayTasks.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-400 space-y-2">
                <Clock className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600 stroke-1" />
                <p>No deadlines scheduled for this day.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {selectedDayTasks.map(t => {
                  const colorInfo = SUBJECT_COLORS[t.subject] || { badge: 'bg-[#0F8B6D] text-white' };
                  return (
                    <div
                      key={t.id}
                      className="p-3 rounded-2xl bg-white/70 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => toggleTaskCompletion(t.id)}
                          className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                            t.completed
                              ? 'border-[#0F8B6D] bg-[#0F8B6D] text-white'
                              : 'border-neutral-400 hover:border-[#0F8B6D]'
                          }`}
                        >
                          {t.completed && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${colorInfo.badge}`}>
                              {t.subject}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-medium">
                              {t.taskType}
                            </span>
                          </div>
                          <div className={`text-xs font-semibold mt-1 ${t.completed ? 'line-through text-neutral-400' : 'text-[#171A19] dark:text-[#F7F4EA]'}`}>
                            {t.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setIsAddTaskModalOpen(true);
            }}
            className="w-full py-2.5 rounded-xl bg-[#171A19] dark:bg-[#F7F4EA] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-[#171A19] text-xs font-bold transition-all"
          >
            Add Task for This Date
          </button>
        </div>
      </div>
    </div>
  );
};
