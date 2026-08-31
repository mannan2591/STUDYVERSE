import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  BookOpen, 
  BookMarked, 
  FolderKanban,
  Check,
  Sparkles,
  Timer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Task, TaskType, Priority } from '../../types';
import { SUBJECT_COLORS } from '../../data/initialData';

export const TasksView: React.FC = () => {
  const {
    tasks,
    toggleTaskCompletion,
    deleteTask,
    setEditingTask,
    setIsAddTaskModalOpen,
    subjects,
    updateTask,
    startPomodoroWithTask,
    navigateTo,
    requireAuth,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'ALL' | TaskType>('ALL');

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      // Search
      const matchesSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Subject
      const matchesSubject = selectedSubject === 'ALL' || t.subject === selectedSubject;

      // Status
      const matchesStatus = 
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && !t.completed) ||
        (statusFilter === 'COMPLETED' && t.completed);

      // Category tab
      const matchesCategory = activeCategoryTab === 'ALL' || t.taskType === activeCategoryTab;

      return matchesSearch && matchesSubject && matchesStatus && matchesCategory;
    });
  }, [tasks, searchQuery, selectedSubject, statusFilter, activeCategoryTab]);

  // Sort tasks intelligently:
  // Active first, nearest due dates at the top, overdue at top, completed at bottom.
  const sortTasks = (taskList: Task[]) => {
    return [...taskList].sort((a, b) => {
      // Completed items go lower
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Nearest due date first
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };

  const homeworkTasks = sortTasks(filteredTasks.filter(t => t.taskType === 'HOMEWORK'));
  const classworkTasks = sortTasks(filteredTasks.filter(t => t.taskType === 'CLASSWORK'));
  const projectTasks = sortTasks(filteredTasks.filter(t => t.taskType === 'PROJECT'));

  const handleEdit = (task: Task) => {
    requireAuth(() => {
      setEditingTask(task);
      setIsAddTaskModalOpen(true);
    }, 'Edit Task', 'Sign in or log in to update homework and assignment details.');
  };

  const handleNewTask = () => {
    requireAuth(() => {
      setEditingTask(null);
      setIsAddTaskModalOpen(true);
    }, 'New Task', 'Sign in or log in to add new homework, classwork, or project tasks.');
  };

  const handleToggle = (taskId: string) => {
    requireAuth(() => {
      toggleTaskCompletion(taskId);
    }, 'Task Completion', 'Sign in or log in to check off tasks and gain XP.');
  };

  const handleDelete = (taskId: string) => {
    requireAuth(() => {
      deleteTask(taskId);
    }, 'Delete Task', 'Sign in or log in to manage your homework list.');
  };

  const handleStartFocus = (taskId: string) => {
    requireAuth(() => {
      startPomodoroWithTask(taskId);
    }, 'Pomodoro Focus Timer', 'Sign in or log in to start focus sessions and log study time.');
  };

  // Render a Single Task Card
  const renderTaskCard = (task: Task) => {
    const isOverdue = !task.completed && new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);
    const colorInfo = SUBJECT_COLORS[task.subject] || {
      badge: 'bg-[#0F8B6D] text-white',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
    };

    return (
      <div
        key={task.id}
        className={`p-4 rounded-2xl glass-panel transition-all duration-150 flex flex-col justify-between gap-3 ${
          task.completed
            ? 'opacity-60 bg-neutral-50/50 dark:bg-neutral-900/30'
            : isOverdue
            ? 'border-red-300 dark:border-red-900/60 bg-red-50/20'
            : 'hover:border-[#0F8B6D]/40'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => handleToggle(task.id)}
            className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
              task.completed
                ? 'border-[#0F8B6D] bg-[#0F8B6D] text-white'
                : 'border-neutral-300 dark:border-neutral-600 hover:border-[#0F8B6D] text-transparent hover:text-[#0F8B6D]'
            }`}
            title={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {/* Task Info */}
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
              {task.priority === 'Medium' && (
                <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-medium">
                  Medium
                </span>
              )}
            </div>

            <h4
              className={`font-semibold text-sm mt-1.5 leading-snug ${
                task.completed
                  ? 'line-through text-neutral-400 dark:text-neutral-500'
                  : 'text-neutral-900 dark:text-neutral-100'
              }`}
            >
              {task.name}
            </h4>

            {task.description && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Task Time Spent & Pomodoro Status */}
            {(task.timeSpentMinutes !== undefined && task.timeSpentMinutes > 0) && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold">
                <Clock className="w-3 h-3" />
                <span>{task.timeSpentMinutes}m spent ({task.pomodoroSessions || 1} 🍅)</span>
              </div>
            )}

            {/* Project Progress Slider (if Project) */}
            {task.taskType === 'PROJECT' && !task.completed && (
              <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500 mb-1">
                  <span>Project Progress</span>
                  <span className="text-[#0F8B6D] font-bold">{task.progress || 0}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={task.progress || 0}
                  onChange={e => {
                    requireAuth(() => {
                      updateTask(task.id, { progress: Number(e.target.value) });
                    }, 'Project Progress', 'Sign in or log in to track and update project progress.');
                  }}
                  className="w-full accent-[#0F8B6D] cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Card Footer: Due date & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          <div
            className={`flex items-center gap-1.5 font-medium ${
              task.completed
                ? 'text-neutral-400'
                : isOverdue
                ? 'text-red-600 font-bold'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {isOverdue ? <AlertTriangle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
            <span>
              {task.completed
                ? 'Completed'
                : isOverdue
                ? `Overdue (${task.dueDate})`
                : `Due ${task.dueDate}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {!task.completed && (
              <button
                onClick={() => handleStartFocus(task.id)}
                className="px-2.5 py-1 rounded-lg bg-[#0F8B6D]/10 hover:bg-[#0F8B6D] text-[#0F8B6D] hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                title="Start Pomodoro Focus on this Task"
              >
                <Timer className="w-3.5 h-3.5" />
                <span>Focus</span>
              </button>
            )}

            <button
              onClick={() => handleEdit(task)}
              className="p-1 rounded-md text-neutral-400 hover:text-[#0F8B6D] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Edit Task"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. Header with Title & Add Task / Pomodoro Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Tasks & Planner
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Homework, Classwork, and Projects organized in a unified deadline system with integrated Pomodoro timer.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => navigateTo('more', 'pomodoro')}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#E6A83A] dark:text-amber-300 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shrink-0 border border-[#E6A83A]/30 active:scale-95"
          >
            <Timer className="w-4 h-4 text-[#E6A83A]" />
            <span>Study Timer</span>
          </button>

          <button
            onClick={handleNewTask}
            className="px-4 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks, subjects, notes..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1">
            {(['ALL', 'ACTIVE', 'COMPLETED'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  statusFilter === s
                    ? 'bg-[#0F8B6D] text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {s.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-neutral-100 dark:border-neutral-800">
          {[
            { id: 'ALL', label: 'All Tasks', count: tasks.length },
            { id: 'HOMEWORK', label: 'Homework', count: tasks.filter(t => t.taskType === 'HOMEWORK').length },
            { id: 'CLASSWORK', label: 'Classwork', count: tasks.filter(t => t.taskType === 'CLASSWORK').length },
            { id: 'PROJECT', label: 'Projects & Records', count: tasks.filter(t => t.taskType === 'PROJECT').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryTab(tab.id as 'ALL' | TaskType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                activeCategoryTab === tab.id
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#0F8B6D]/15 text-[#0F8B6D] rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. VISUALLY SEPARATED TASK SECTIONS */}
      <div className="space-y-8">
        {/* SECTION A: HOMEWORK */}
        {(activeCategoryTab === 'ALL' || activeCategoryTab === 'HOMEWORK') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                    Homework
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Daily practice & assignments sorted by nearest due date
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {homeworkTasks.length} task{homeworkTasks.length === 1 ? '' : 's'}
              </span>
            </div>

            {homeworkTasks.length === 0 ? (
              <div className="p-6 rounded-2xl glass-panel border-dashed border-neutral-300 dark:border-neutral-800 text-center text-xs text-neutral-400">
                No homework tasks matching your filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {homeworkTasks.map(renderTaskCard)}
              </div>
            )}
          </div>
        )}

        {/* SECTION B: CLASSWORK */}
        {(activeCategoryTab === 'ALL' || activeCategoryTab === 'CLASSWORK') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                    Classwork
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Lecture notes, blackboard problems & in-class worksheets
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {classworkTasks.length} task{classworkTasks.length === 1 ? '' : 's'}
              </span>
            </div>

            {classworkTasks.length === 0 ? (
              <div className="p-6 rounded-2xl glass-panel border-dashed border-neutral-300 dark:border-neutral-800 text-center text-xs text-neutral-400">
                No classwork tasks matching your filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {classworkTasks.map(renderTaskCard)}
              </div>
            )}
          </div>
        )}

        {/* SECTION C: PROJECT / RECORD */}
        {(activeCategoryTab === 'ALL' || activeCategoryTab === 'PROJECT') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center">
                  <FolderKanban className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                    Projects & Lab Records
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Lab record submissions, exhibits & multi-stage academic projects
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {projectTasks.length} project{projectTasks.length === 1 ? '' : 's'}
              </span>
            </div>

            {projectTasks.length === 0 ? (
              <div className="p-6 rounded-2xl glass-panel border-dashed border-neutral-300 dark:border-neutral-800 text-center text-xs text-neutral-400">
                No projects or records matching your filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {projectTasks.map(renderTaskCard)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
