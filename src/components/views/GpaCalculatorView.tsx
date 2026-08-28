import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Sparkles, 
  Award, 
  Percent, 
  Target, 
  RotateCcw, 
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SubjectMark {
  id: string;
  name: string;
  marksObtained: number;
  maxMarks: number;
  credits: number;
}

const DEFAULT_SUBJECTS_LIST: SubjectMark[] = [
  { id: '1', name: 'Mathematics', marksObtained: 88, maxMarks: 100, credits: 4 },
  { id: '2', name: 'Physics', marksObtained: 82, maxMarks: 100, credits: 4 },
  { id: '3', name: 'Chemistry', marksObtained: 79, maxMarks: 100, credits: 4 },
  { id: '4', name: 'English Literature', marksObtained: 91, maxMarks: 100, credits: 3 },
  { id: '5', name: 'Computer Science', marksObtained: 95, maxMarks: 100, credits: 4 },
];

export const GpaCalculatorView: React.FC = () => {
  const { addNotification } = useApp();
  const [subjects, setSubjects] = useState<SubjectMark[]>(DEFAULT_SUBJECTS_LIST);
  const [targetPercentage, setTargetPercentage] = useState<number>(90);

  const handleAddSubject = () => {
    const newSubject: SubjectMark = {
      id: `subj-${Date.now()}`,
      name: `Subject ${subjects.length + 1}`,
      marksObtained: 80,
      maxMarks: 100,
      credits: 3,
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleUpdate = (id: string, field: keyof SubjectMark, val: string | number) => {
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: typeof s[field] === 'number' ? Number(val) || 0 : val } : s))
    );
  };

  const handleDelete = (id: string) => {
    if (subjects.length <= 1) {
      addNotification('Minimum 1 Subject', 'You need at least one subject to calculate grades.');
      return;
    }
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleReset = () => {
    setSubjects(DEFAULT_SUBJECTS_LIST);
  };

  // Calculations
  const totalObtained = subjects.reduce((acc, s) => acc + s.marksObtained, 0);
  const totalMax = subjects.reduce((acc, s) => acc + s.maxMarks, 0);
  const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);

  const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
  
  // Calculate GPA on 10.0 scale (CBSE/Indian/International standard)
  const weightedGpaSum = subjects.reduce((acc, s) => {
    const subjectPct = s.maxMarks > 0 ? (s.marksObtained / s.maxMarks) * 100 : 0;
    let gradePoint = 10;
    if (subjectPct >= 91) gradePoint = 10;
    else if (subjectPct >= 81) gradePoint = 9;
    else if (subjectPct >= 71) gradePoint = 8;
    else if (subjectPct >= 61) gradePoint = 7;
    else if (subjectPct >= 51) gradePoint = 6;
    else if (subjectPct >= 41) gradePoint = 5;
    else if (subjectPct >= 33) gradePoint = 4;
    else gradePoint = 0;

    return acc + gradePoint * s.credits;
  }, 0);

  const gpa = totalCredits > 0 ? (weightedGpaSum / totalCredits).toFixed(2) : '0.00';

  let division = 'First Class with Distinction';
  let gradeLetter = 'O (Outstanding)';
  if (percentage < 33) {
    division = 'Needs Improvement';
    gradeLetter = 'F (Re-appear)';
  } else if (percentage < 50) {
    division = 'Third Division';
    gradeLetter = 'C (Pass)';
  } else if (percentage < 60) {
    division = 'Second Division';
    gradeLetter = 'B (Good)';
  } else if (percentage < 75) {
    division = 'First Division';
    gradeLetter = 'A (Very Good)';
  } else if (percentage < 90) {
    division = 'First Class Distinction';
    gradeLetter = 'A+ (Excellent)';
  }

  // Target marks calculation
  const targetRequiredMarks = Math.round((targetPercentage / 100) * totalMax);
  const marksDifference = targetRequiredMarks - totalObtained;

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>Academic Performance Tool</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            GPA & Marks Calculator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Calculate your semester percentages, weighted GPA, and predict target exam scores.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Reset Defaults"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleAddSubject}
            className="px-4 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* Summary Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-5 rounded-3xl glass-panel border border-[#0F8B6D]/20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Overall Percentage
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#0F8B6D] tracking-tight">
            {percentage.toFixed(1)}%
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">
            {totalObtained} / {totalMax} Marks
          </span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-[#E6A83A]/20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            CGPA (10.0 Scale)
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#E6A83A] tracking-tight">
            {gpa}
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">
            {totalCredits} Total Credits
          </span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-purple-500/20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Letter Grade
          </span>
          <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 tracking-tight">
            {gradeLetter.split(' ')[0]}
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">
            {gradeLetter}
          </span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-blue-500/20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Division Awarded
          </span>
          <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 line-clamp-2">
            {division}
          </span>
          <span className="text-[11px] text-neutral-500 block mt-1">
            Academic Status
          </span>
        </div>
      </div>

      {/* Main Table: Subjects & Marks Entry */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
        <h3 className="font-bold text-base text-[#171A19] dark:text-[#F7F4EA] flex items-center justify-between">
          <span>Subjects & Scores Breakdown</span>
          <span className="text-xs font-normal text-neutral-400">
            Edit marks or credits directly in the inputs
          </span>
        </h3>

        <div className="space-y-3">
          {subjects.map((sub, index) => {
            const subPct = sub.maxMarks > 0 ? (sub.marksObtained / sub.maxMarks) * 100 : 0;
            return (
              <div
                key={sub.id}
                className="p-3.5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={sub.name}
                    onChange={e => handleUpdate(sub.id, 'name', e.target.value)}
                    className="flex-1 font-semibold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 bg-transparent border-b border-transparent hover:border-neutral-300 focus:border-[#0F8B6D] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-neutral-400 text-[11px]">Marks:</span>
                    <input
                      type="number"
                      min="0"
                      max={sub.maxMarks}
                      value={sub.marksObtained}
                      onChange={e => handleUpdate(sub.id, 'marksObtained', e.target.value)}
                      className="w-14 px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-center font-bold text-xs text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-[#0F8B6D]"
                    />
                    <span className="text-neutral-400">/</span>
                    <input
                      type="number"
                      min="1"
                      value={sub.maxMarks}
                      onChange={e => handleUpdate(sub.id, 'maxMarks', e.target.value)}
                      className="w-14 px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-center text-xs text-neutral-500 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-[#0F8B6D]"
                    />
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-neutral-400 text-[11px]">Credits:</span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={sub.credits}
                      onChange={e => handleUpdate(sub.id, 'credits', e.target.value)}
                      className="w-10 px-1 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-center font-semibold text-xs text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <div className="w-16 text-right font-bold text-xs text-[#0F8B6D]">
                    {subPct.toFixed(0)}%
                  </div>

                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0"
                    title="Delete Subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Marks Predictor */}
      <div className="p-6 rounded-3xl glass-panel border border-[#E6A83A]/20 space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[#E6A83A]" />
          <h3 className="font-bold text-base text-[#171A19] dark:text-[#F7F4EA]">
            Target Marks & Exam Score Predictor
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Select Desired Target Goal: <span className="text-[#0F8B6D] font-bold">{targetPercentage}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              step="1"
              value={targetPercentage}
              onChange={e => setTargetPercentage(Number(e.target.value))}
              className="w-full accent-[#0F8B6D] cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#E6A83A]/30 text-xs sm:w-80">
            {marksDifference > 0 ? (
              <p className="text-neutral-700 dark:text-neutral-200">
                You need <strong className="text-[#0F8B6D]">+{marksDifference} more marks</strong> across your remaining exams/internals to hit your goal of <strong>{targetPercentage}%</strong> ({targetRequiredMarks} total marks).
              </p>
            ) : (
              <p className="text-emerald-700 dark:text-emerald-300 font-semibold">
                🎉 Congratulations! Your current marks ({totalObtained}) already exceed your goal of {targetPercentage}%!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
