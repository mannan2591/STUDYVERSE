import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Play, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  Check, 
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Zap,
  Lock,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course, CourseLesson, Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

export const CoursesView: React.FC = () => {
  const {
    courses,
    activeCourseId,
    setActiveCourseId,
    completedLessons,
    markLessonComplete,
    issueCertificate,
    certificates,
    user,
    isAuthenticated,
    openAuthModal,
    navigateTo,
    addNotification,
  } = useApp();

  // Active course selection with robust fallback
  const currentCourse: Course = courses.find(c => c.id === activeCourseId) || courses[0] || {
    id: 'course-ai-essentials',
    title: 'AI Essentials',
    tagline: 'Study Smarter with Generative AI & Prompt Engineering',
    description: '',
    thumbnail: '',
    duration: '45 mins',
    level: 'Beginner',
    isFree: true,
    rating: 4.95,
    studentsCount: 1420,
    instructor: 'Raghuveer',
    modules: [],
  };

  // Flattened lessons list from all modules
  const allLessons: CourseLesson[] = useMemo(() => {
    if (!currentCourse || !currentCourse.modules) return [];
    return currentCourse.modules.flatMap(m => m.lessons);
  }, [currentCourse]);

  const courseFinishedIds = (completedLessons && currentCourse ? completedLessons[currentCourse.id] : []) || [];
  const totalLessons = allLessons.length;
  const completedLessonsCount = courseFinishedIds.length;
  const progressPercent = totalLessons > 0 ? Math.min(100, Math.round((completedLessonsCount / totalLessons) * 100)) : 0;
  const isCourseFullyCompleted = totalLessons > 0 && completedLessonsCount >= totalLessons;

  // Lesson player state
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [namePromptModal, setNamePromptModal] = useState(false);
  const [studentCertName, setStudentCertName] = useState(user?.name || 'Valued Student');
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);

  const existingCert = certificates.find(c => c.courseId === currentCourse.id);

  const currentLesson: CourseLesson | undefined = allLessons[activeLessonIndex] || allLessons[0];
  const isLessonCompleted = currentLesson ? courseFinishedIds.includes(currentLesson.id) : false;

  // Lesson navigation
  const handleNextLesson = () => {
    if (activeLessonIndex < totalLessons - 1) {
      setActiveLessonIndex(prev => prev + 1);
      setIsQuizSubmitted(false);
      setQuizAnswers({});
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
      setIsQuizSubmitted(false);
      setQuizAnswers({});
    }
  };

  const handleMarkComplete = () => {
    if (currentLesson) {
      markLessonComplete(currentCourse.id, currentLesson.id);
    }
  };

  // Quiz submission
  const handleQuizOptionSelect = (qIndex: number, oIndex: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!currentLesson?.quizQuestions) return;
    setIsQuizSubmitted(true);
    let correct = 0;
    currentLesson.quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const passed = correct >= Math.ceil(currentLesson.quizQuestions.length * 0.5);
    if (passed && currentLesson) {
      markLessonComplete(currentCourse.id, currentLesson.id);
    }
  };

  // Claim Certificate Trigger
  const handleStartClaim = () => {
    if (!isCourseFullyCompleted) {
      addNotification('Course Incomplete', 'Please complete all lesson topics and quizzes to claim your official certificate.');
      return;
    }
    if (!isAuthenticated) {
      openAuthModal('signup');
      return;
    }
    setStudentCertName(user?.name || '');
    setNamePromptModal(true);
  };

  const handleConfirmCertificateName = async () => {
    if (!isCourseFullyCompleted || !studentCertName.trim()) return;
    const cert = await issueCertificate(currentCourse.id, studentCertName.trim());
    setNamePromptModal(false);
    if (cert) {
      setViewingCertificate(cert);
    }
  };

  // Filter tab state
  const [courseFilter, setCourseFilter] = useState<'all' | 'in-progress' | 'completed' | 'certified'>('all');

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const courseLessons = c.modules?.flatMap(m => m.lessons) || [];
      const cFinished = completedLessons?.[c.id] || [];
      const isCompleted = courseLessons.length > 0 && cFinished.length >= courseLessons.length;
      const isCertClaimed = certificates.some(cert => cert.courseId === c.id);

      if (courseFilter === 'certified') return isCertClaimed;
      if (courseFilter === 'completed') return isCompleted;
      if (courseFilter === 'in-progress') return cFinished.length > 0 && !isCompleted;
      return true;
    });
  }, [courses, completedLessons, certificates, courseFilter]);

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Masterclasses & Certifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            Academic Courses
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Interactive bite-sized masterclasses with verifiable completion certificates.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {certificates.length > 0 && (
            <button
              onClick={() => navigateTo('more', 'certificates')}
              className="text-xs font-semibold text-[#E6A83A] bg-[#E6A83A]/10 hover:bg-[#E6A83A]/20 active:scale-95 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-[#E6A83A]/30 transition-all cursor-pointer shadow-2xs"
            >
              <Award className="w-4 h-4" />
              <span>{certificates.length} Certificate{certificates.length > 1 ? 's' : ''} Earned</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Interactive Course Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'in-progress', 'completed', 'certified'] as const).map(filterKey => (
          <button
            key={filterKey}
            onClick={() => setCourseFilter(filterKey)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              courseFilter === filterKey
                ? 'bg-[#0F8B6D] text-white shadow-xs'
                : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            {filterKey === 'all' && 'All Masterclasses'}
            {filterKey === 'in-progress' && 'In Progress'}
            {filterKey === 'completed' && 'Completed (100%)'}
            {filterKey === 'certified' && 'Certified'}
          </button>
        ))}
      </div>

      {/* 3. Interactive Course Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {filteredCourses.map(c => {
          const isSelected = c.id === currentCourse.id;
          const courseLessons = c.modules?.flatMap(m => m.lessons) || [];
          const cFinished = completedLessons?.[c.id] || [];
          const isCompleted = courseLessons.length > 0 && cFinished.length >= courseLessons.length;
          const isCertClaimed = certificates.some(cert => cert.courseId === c.id);

          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCourseId(c.id);
                setActiveLessonIndex(0);
                setIsQuizSubmitted(false);
                setQuizAnswers({});
              }}
              className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative group active:scale-[0.99] ${
                isSelected
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-[#0F8B6D] ring-2 ring-[#0F8B6D]/20 shadow-md'
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-[#0F8B6D]/50 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 right-4 px-2 py-0.5 bg-[#0F8B6D] text-white text-[9px] font-extrabold uppercase rounded-full tracking-wider shadow-xs">
                  Active Course
                </div>
              )}

              <div className="flex items-start justify-between gap-2 w-full">
                <span className="px-2 py-0.5 rounded bg-[#0F8B6D]/10 text-[#0F8B6D] text-[10px] font-bold">
                  {c.duration}
                </span>
                {isCertClaimed ? (
                  <span className="px-2 py-0.5 rounded bg-[#E6A83A]/15 text-[#E6A83A] text-[10px] font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Certified</span>
                  </span>
                ) : isCompleted ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                ) : null}
              </div>

              <div className="my-2.5 w-full">
                <h3 className="font-extrabold text-sm text-[#171A19] dark:text-[#F7F4EA] leading-snug group-hover:text-[#0F8B6D] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                  {c.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100 dark:border-neutral-800 text-neutral-500 w-full">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#0F8B6D]" />
                  <span>{courseLessons.length} Topics</span>
                </span>
                <span className="font-bold text-[#0F8B6D]">
                  {isCompleted ? '100% Done' : `${cFinished.length}/${courseLessons.length} Done`}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. MAIN COURSE PLAYER CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar: Lesson & Topic Directory strictly for selected course */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-5 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
                Curriculum Topics
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D]">
                {totalLessons} Topics
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
              Showing topics for: <strong className="text-neutral-800 dark:text-neutral-200">{currentCourse.title}</strong>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 bg-neutral-50 dark:bg-neutral-900 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-neutral-600 dark:text-neutral-300">Course Progress</span>
              <span className="text-[#0F8B6D] font-extrabold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#0F8B6D] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Modules & Lessons List - STRICTLY ONLY CURRENT COURSE */}
          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {currentCourse.modules && currentCourse.modules.length > 0 ? (
              currentCourse.modules.map(module => (
                <div key={module.id} className="space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-1 flex items-center justify-between">
                    <span>{module.title}</span>
                    <span className="text-[9px] font-normal lowercase">({module.lessons.length} topics)</span>
                  </div>
                  <div className="space-y-1.5">
                    {module.lessons.map(lesson => {
                      const lIndex = allLessons.findIndex(l => l.id === lesson.id);
                      const isCurrent = lIndex === activeLessonIndex;
                      const isDone = courseFinishedIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveLessonIndex(lIndex >= 0 ? lIndex : 0);
                            setIsQuizSubmitted(false);
                            setQuizAnswers({});
                          }}
                          className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 border active:scale-[0.98] ${
                            isCurrent
                              ? 'bg-[#0F8B6D] text-white border-[#0F8B6D] shadow-sm font-semibold'
                              : isDone
                              ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-800 hover:border-[#0F8B6D]/40'
                              : 'bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-[#0F8B6D]/40 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-[#0F8B6D]'}`} />
                            ) : (
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold ${isCurrent ? 'border-white text-white' : 'border-neutral-400 text-neutral-500'}`}>
                                {lIndex + 1}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-snug truncate">
                              {lesson.title}
                            </div>
                            <div className={`text-[10px] mt-0.5 ${isCurrent ? 'text-emerald-100' : 'text-neutral-500'}`}>
                              {lesson.duration} {lesson.type === 'quiz' ? '• Final Quiz' : ''}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-neutral-400 p-4 text-center">
                No topics found for this course.
              </div>
            )}
          </div>

          {/* Claim Certificate Button (When 100% complete) */}
          {isCourseFullyCompleted || progressPercent === 100 ? (
            existingCert ? (
              <button
                onClick={() => setViewingCertificate(existingCert)}
                className="w-full py-3 px-4 rounded-2xl bg-[#E6A83A] hover:bg-[#D49528] active:scale-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>View Issued Certificate</span>
              </button>
            ) : (
              <button
                onClick={handleStartClaim}
                className="w-full py-3 px-4 rounded-2xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Claim Official Certificate</span>
              </button>
            )
          ) : (
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500">
              <Lock className="w-4 h-4 mx-auto mb-1 text-neutral-400" />
              <span>Complete all {totalLessons} topics to generate your verified certificate.</span>
            </div>
          )}
        </div>

        {/* Right Area: Interactive Lesson Reader & Quiz Player */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          {currentLesson ? (
            <div className="space-y-6">
              {/* Lesson Title Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F8B6D]">
                      Topic {activeLessonIndex + 1} of {totalLessons}
                    </span>
                    <span className="text-neutral-400 text-xs">•</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {currentCourse.title}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] mt-0.5">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isLessonCompleted ? (
                    <button
                      onClick={handleMarkComplete}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-[#0F8B6D] text-xs font-bold flex items-center gap-1.5 border border-[#0F8B6D]/30 transition-all cursor-pointer active:scale-95"
                      title="Click to toggle lesson completion"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleMarkComplete}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-xs transition-all shrink-0 cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark as Done</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lesson Text / Educational Material */}
              {currentLesson.content && (
                <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed space-y-4">
                  {currentLesson.content.split('\n\n').map((paragraph, i) => (
                    <div key={i} className="leading-relaxed whitespace-pre-line">
                      {paragraph.startsWith('###') ? (
                        <h3 className="text-lg font-bold text-[#171A19] dark:text-[#F7F4EA] mt-2 mb-1">
                          {paragraph.replace('###', '').trim()}
                        </h3>
                      ) : paragraph.startsWith('####') ? (
                        <h4 className="text-sm font-bold text-[#0F8B6D] mt-2 mb-1">
                          {paragraph.replace('####', '').trim()}
                        </h4>
                      ) : (
                        <p>{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Quiz Section (If Lesson has Quiz Questions) */}
              {currentLesson.quizQuestions && currentLesson.quizQuestions.length > 0 && (
                <div className="mt-6 p-5 sm:p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#E6A83A]/15 text-[#E6A83A] flex items-center justify-center">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-[#171A19] dark:text-[#F7F4EA]">
                        Comprehension Quiz ({currentLesson.quizQuestions.length} Questions)
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Answer correctly to verify your understanding and earn certification credit.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 pt-2">
                    {currentLesson.quizQuestions.map((q, qIndex) => {
                      const selectedOpt = quizAnswers[qIndex];
                      const isCorrect = isQuizSubmitted && selectedOpt === q.correctAnswer;

                      return (
                        <div key={q.id || qIndex} className="space-y-2.5">
                          <div className="font-bold text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA]">
                            {qIndex + 1}. {q.question}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {q.options.map((opt, oIndex) => {
                              const isChosen = selectedOpt === oIndex;
                              let btnClasses = 'bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-[#0F8B6D]/40';

                              if (isQuizSubmitted) {
                                if (oIndex === q.correctAnswer) {
                                  btnClasses = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                                } else if (isChosen && !isCorrect) {
                                  btnClasses = 'bg-red-600 text-white border-red-600 font-bold';
                                }
                              } else if (isChosen) {
                                btnClasses = 'bg-[#0F8B6D] text-white border-[#0F8B6D] font-bold shadow-xs';
                              }

                              return (
                                <button
                                  key={oIndex}
                                  onClick={() => handleQuizOptionSelect(qIndex, oIndex)}
                                  disabled={isQuizSubmitted}
                                  className={`p-3 rounded-2xl text-left text-xs transition-all border cursor-pointer active:scale-98 ${btnClasses}`}
                                >
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {isQuizSubmitted && (
                            <div className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300'}`}>
                              <strong>{isCorrect ? 'Correct! ' : 'Explanation: '}</strong>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {!isQuizSubmitted ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(quizAnswers).length < currentLesson.quizQuestions.length}
                        className="w-full py-3 rounded-2xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Submit Quiz Answers</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="py-2 px-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 transition-all cursor-pointer active:scale-95"
                      >
                        Retry Quiz
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-400">
              No lesson selected.
            </div>
          )}

          {/* STEP-BY-STEP PROMINENT NAVIGATION BUTTONS */}
          <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrevLesson}
              disabled={activeLessonIndex === 0}
              className="py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-bold text-xs disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Topic</span>
            </button>

            <div className="flex items-center gap-2">
              {!isLessonCompleted && currentLesson && (
                <button
                  onClick={handleMarkComplete}
                  className="py-2.5 px-4 rounded-xl bg-[#0F8B6D]/10 hover:bg-[#0F8B6D]/20 text-[#0F8B6D] font-bold text-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Done</span>
                </button>
              )}

              {activeLessonIndex < totalLessons - 1 ? (
                <button
                  onClick={handleNextLesson}
                  className="py-2.5 px-5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next Topic</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : existingCert ? (
                <button
                  onClick={() => setViewingCertificate(existingCert)}
                  className="py-2.5 px-5 rounded-xl bg-[#E6A83A] hover:bg-[#D49528] active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Issued Certificate</span>
                </button>
              ) : (
                <button
                  onClick={handleStartClaim}
                  className={`py-2.5 px-5 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                    isCourseFullyCompleted 
                      ? 'bg-[#E6A83A] hover:bg-[#D49528] active:scale-95' 
                      : 'bg-neutral-600 hover:bg-neutral-500'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{isCourseFullyCompleted ? 'Claim Certificate' : 'Complete All Topics to Claim'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. NAME CONFIRMATION MODAL BEFORE ISSUING CERTIFICATE */}
      {namePromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl glass-dropdown p-6 sm:p-7 border border-[#E6A83A]/40 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#E6A83A]/15 text-[#E6A83A] flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#171A19] dark:text-[#F7F4EA]">
                Claim Official Certificate
              </h3>
              <p className="text-xs text-neutral-500">
                A unique verifiable Certificate ID and QR code will be generated for your credential.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  value={studentCertName}
                  onChange={e => setStudentCertName(e.target.value)}
                  placeholder="e.g. Student Full Name"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-500">
                  <span>Course</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 text-right">{currentCourse.title}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500">
                  <span>Issue Date</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500">
                  <span>Verification</span>
                  <span className="font-bold text-[#0F8B6D] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Instant Live QR Code</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setNamePromptModal(false)}
                className="flex-1 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCertificateName}
                disabled={!studentCertName.trim()}
                className="flex-1 py-2.5 rounded-2xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CERTIFICATE VIEWER MODAL */}
      <CertificateModal
        certificate={viewingCertificate}
        onClose={() => setViewingCertificate(null)}
      />
    </div>
  );
};
