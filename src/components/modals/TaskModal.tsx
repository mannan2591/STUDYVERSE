import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  BookOpen, 
  AlertCircle, 
  Layers, 
  Plus, 
  Check, 
  Briefcase, 
  BookMarked, 
  FolderKanban,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskType, Priority, Task } from '../../types';

export const TaskModal: React.FC = () => {
  const {
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
    editingTask,
    setEditingTask,
    addTask,
    updateTask,
    subjects,
    addCustomSubject,
    requireAuth,
  } = useApp();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState(subjects[0] || 'Mathematics');
  const [taskType, setTaskType] = useState<TaskType>('HOMEWORK');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);

  const [isAddingCustomSubject, setIsAddingCustomSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  // Populate data when editing
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setSubject(editingTask.subject);
      setTaskType(editingTask.taskType);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
      setDescription(editingTask.description || '');
      setProgress(editingTask.progress || 0);
    } else {
      setName('');
      setSubject(subjects[0] || 'Mathematics');
      setTaskType('HOMEWORK');
      setPriority('Medium');
      // Default due tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
      setDescription('');
      setProgress(0);
    }
  }, [editingTask, subjects]);

  if (!isAddTaskModalOpen) return null;

  const handleCreateCustomSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubjectName.trim()) {
      addCustomSubject(newSubjectName.trim());
      setSubject(newSubjectName.trim());
      setNewSubjectName('');
      setIsAddingCustomSubject(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    requireAuth(() => {
      if (editingTask) {
        updateTask(editingTask.id, {
          name: name.trim(),
          subject,
          taskType,
          priority,
          dueDate,
          description: description.trim(),
          progress: taskType === 'PROJECT' ? progress : undefined,
        });
      } else {
        addTask({
          name: name.trim(),
          subject,
          taskType,
          priority,
          dueDate,
          description: description.trim(),
          progress: taskType === 'PROJECT' ? progress : undefined,
        });
      }
    }, 'Save Task', 'Sign in or log in to save homework, assignments, and projects.');
  };

  const handleClose = () => {
    setIsAddTaskModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl glass-dropdown p-6 sm:p-7 border border-[#0F8B6D]/20 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#0F8B6D] text-xs font-bold uppercase tracking-wider">
            <BookMarked className="w-4 h-4" />
            <span>Unified Task System</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#171A19] dark:text-[#F7F4EA] mt-1">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Organize your homework, classwork, or project deadlines.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Task Title / Assignment Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Chapter 4 Exercise 4.2 Problems 1 to 10"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D] focus:ring-1 focus:ring-[#0F8B6D]"
            />
          </div>

          {/* Subject & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Subject Selector */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Subject *
                </label>
                <button
                  type="button"
                  onClick={() => setIsAddingCustomSubject(prev => !prev)}
                  className="text-[11px] font-medium text-[#0F8B6D] hover:underline flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" />
                  <span>Custom</span>
                </button>
              </div>

              {isAddingCustomSubject ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newSubjectName}
                    onChange={e => setNewSubjectName(e.target.value)}
                    placeholder="Subject name"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/70 dark:bg-neutral-900 border border-[#0F8B6D] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCustomSubject}
                    className="px-2.5 py-1.5 bg-[#0F8B6D] text-white rounded-lg text-xs font-medium shrink-0"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
                >
                  {subjects.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Low', 'Medium', 'High'] as Priority[]).map(p => {
                  const isSelected = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-1.5 text-xs rounded-xl font-medium transition-all ${
                        isSelected
                          ? p === 'High'
                            ? 'bg-red-500 text-white font-bold shadow-xs'
                            : p === 'Medium'
                            ? 'bg-[#E6A83A] text-white font-bold shadow-xs'
                            : 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Due Date & Optional Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Due Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
                />
              </div>
            </div>

            {taskType === 'PROJECT' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Project Progress
                  </label>
                  <span className="text-xs font-bold text-[#0F8B6D]">{progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={progress}
                  onChange={e => setProgress(Number(e.target.value))}
                  className="w-full accent-[#0F8B6D] cursor-pointer mt-1"
                />
              </div>
            )}
          </div>

          {/* Optional Description / Details */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Description / Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Needs chart paper, sketch pens, and references from Chapter 3"
              className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
            />
          </div>

          {/* TASK TYPE SELECTION AT BOTTOM OF FORM (All 3 have equal priority) */}
          <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
            <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Select Task Category (Equal Priority)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* HOMEWORK */}
              <button
                type="button"
                onClick={() => setTaskType('HOMEWORK')}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-150 border text-center ${
                  taskType === 'HOMEWORK'
                    ? 'bg-[#0F8B6D] text-white border-[#0F8B6D] shadow-md shadow-[#0F8B6D]/20 scale-[1.02]'
                    : 'bg-white/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700/60 hover:border-[#0F8B6D]/50'
                }`}
              >
                <BookOpen className="w-5 h-5 shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wide">HOMEWORK</span>
              </button>

              {/* CLASSWORK */}
              <button
                type="button"
                onClick={() => setTaskType('CLASSWORK')}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-150 border text-center ${
                  taskType === 'CLASSWORK'
                    ? 'bg-[#0F8B6D] text-white border-[#0F8B6D] shadow-md shadow-[#0F8B6D]/20 scale-[1.02]'
                    : 'bg-white/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700/60 hover:border-[#0F8B6D]/50'
                }`}
              >
                <BookMarked className="w-5 h-5 shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wide">CLASSWORK</span>
              </button>

              {/* PROJECT / RECORD */}
              <button
                type="button"
                onClick={() => setTaskType('PROJECT')}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-150 border text-center ${
                  taskType === 'PROJECT'
                    ? 'bg-[#0F8B6D] text-white border-[#0F8B6D] shadow-md shadow-[#0F8B6D]/20 scale-[1.02]'
                    : 'bg-white/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700/60 hover:border-[#0F8B6D]/50'
                }`}
              >
                <FolderKanban className="w-5 h-5 shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wide leading-tight">PROJECT / RECORD</span>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-98 text-white font-bold text-sm shadow-md shadow-[#0F8B6D]/25 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{editingTask ? 'Save Changes' : 'Save Task to Planner'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
