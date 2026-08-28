import React, { useState } from 'react';
import { 
  CalendarDays, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Sparkles,
  Clock,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECT_COLORS } from '../../data/initialData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const TimetableWeeklyView: React.FC = () => {
  const { timetable, updateTimetableSlot, subjects, addNotification } = useApp();

  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Monday');
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);

  // Form edit state for slot
  const [editSubject, setEditSubject] = useState('');
  const [editStartTime, setEditStartTime] = useState('09:00 AM');
  const [editEndTime, setEditEndTime] = useState('09:45 AM');
  const [editRoom, setEditRoom] = useState('Room 101');
  const [editTeacher, setEditTeacher] = useState('');

  const currentSlots = timetable[selectedDay] || [];

  const handleEditSlot = (index: number) => {
    const slot = currentSlots[index];
    setEditingSlotIndex(index);
    setEditSubject(slot.subject);
    setEditStartTime(slot.startTime);
    setEditEndTime(slot.endTime);
    setEditRoom(slot.room || '');
    setEditTeacher(slot.teacher || '');
  };

  const handleSaveSlot = (index: number) => {
    updateTimetableSlot(selectedDay, index, {
      subject: editSubject,
      startTime: editStartTime,
      endTime: editEndTime,
      room: editRoom,
      teacher: editTeacher,
    });
    setEditingSlotIndex(null);
    addNotification('Timetable Saved', `Period updated for ${selectedDay}.`);
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Weekly Class Routine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            School & College Timetable
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Configure your daily lecture schedule, classrooms, and subject periods.
          </p>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => {
              setSelectedDay(day);
              setEditingSlotIndex(null);
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedDay === day
                ? 'bg-[#0F8B6D] text-white shadow-md shadow-[#0F8B6D]/20 scale-102'
                : 'bg-white/70 dark:bg-neutral-800/70 text-neutral-600 dark:text-neutral-300 hover:bg-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slots List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <span>{selectedDay}&apos;s Class Periods</span>
          <span>{currentSlots.length} Periods Scheduled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSlots.map((slot, idx) => {
            const isEditing = editingSlotIndex === idx;
            const colorInfo = SUBJECT_COLORS[slot.subject] || {
              badge: 'bg-[#0F8B6D] text-white',
              border: 'border-emerald-200 dark:border-emerald-800',
            };

            return (
              <div
                key={slot.id || idx}
                className="p-5 rounded-3xl glass-panel border border-[#0F8B6D]/15 hover:border-[#0F8B6D]/40 transition-all flex flex-col justify-between shadow-xs space-y-4"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F8B6D]">
                      <span>Edit Period {idx + 1}</span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Subject</label>
                      <select
                        value={editSubject}
                        onChange={e => setEditSubject(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                      >
                        {subjects.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Start Time</label>
                        <input
                          type="text"
                          value={editStartTime}
                          onChange={e => setEditStartTime(e.target.value)}
                          className="w-full p-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-500 mb-1">End Time</label>
                        <input
                          type="text"
                          value={editEndTime}
                          onChange={e => setEditEndTime(e.target.value)}
                          className="w-full p-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Room</label>
                        <input
                          type="text"
                          value={editRoom}
                          onChange={e => setEditRoom(e.target.value)}
                          placeholder="e.g. Room 102"
                          className="w-full p-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Teacher</label>
                        <input
                          type="text"
                          value={editTeacher}
                          onChange={e => setEditTeacher(e.target.value)}
                          placeholder="Teacher Name"
                          className="w-full p-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleSaveSlot(idx)}
                        className="flex-1 py-2 rounded-xl bg-[#0F8B6D] text-white text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setEditingSlotIndex(null)}
                        className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${colorInfo.badge}`}>
                          Period {idx + 1}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.startTime} – {slot.endTime}</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
                        {slot.subject}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-neutral-500 pt-1">
                        {slot.room && <span>Room: <strong className="text-neutral-700 dark:text-neutral-300">{slot.room}</strong></span>}
                        {slot.teacher && <span>Teacher: <strong className="text-neutral-700 dark:text-neutral-300">{slot.teacher}</strong></span>}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex justify-end">
                      <button
                        onClick={() => handleEditSlot(idx)}
                        className="p-1.5 rounded-xl text-neutral-500 hover:text-[#0F8B6D] hover:bg-[#0F8B6D]/10 text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Period</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
