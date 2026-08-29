import React, { useState, useMemo } from 'react';
import { 
  Grid, 
  Calendar as CalendarIcon, 
  CalendarDays, 
  TrendingUp, 
  GraduationCap, 
  Award, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Flame,
  ChevronRight,
  Timer,
  Calculator,
  BookOpen,
  Layers,
  Search,
  CheckCircle2,
  LogOut,
  User,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MoreSubSection } from '../../types';
import { PomodoroView } from './PomodoroView';
import { GpaCalculatorView } from './GpaCalculatorView';
import { FormulaSheetsView } from './FormulaSheetsView';
import { FlashcardsView } from './FlashcardsView';
import { CalendarView } from './CalendarView';
import { TimetableWeeklyView } from './TimetableWeeklyView';
import { ProgressAnalyticsView } from './ProgressAnalyticsView';
import { CoursesView } from './CoursesView';
import { MyCertificatesView } from './MyCertificatesView';
import { StudyStreakTrackerView } from './StudyStreakTrackerView';
import { SettingsView } from './SettingsView';
import { SupportView } from './SupportView';
import { TeamView } from './TeamView';
import { AboutView } from './AboutView';

export const MoreMenuHubView: React.FC = () => {
  const { 
    moreSubSection, 
    navigateTo, 
    certificates, 
    streak, 
    xp, 
    level,
    user,
    isAuthenticated,
    logout,
    openAuthModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHubCategory, setSelectedHubCategory] = useState<'ALL' | 'STUDY' | 'ACADEMIC' | 'ACCOUNT'>('ALL');

  // If a sub-section is active, render that sub-section with a clean top breadcrumb back button
  if (moreSubSection !== 'none') {
    return (
      <div className="space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <button
            onClick={() => navigateTo('more', 'none')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F8B6D] hover:underline bg-[#0F8B6D]/10 px-3.5 py-2 rounded-xl transition-colors active:scale-95"
          >
            <span>← Back to All Tools & Utilities</span>
          </button>
        </div>

        {moreSubSection === 'streak-tracker' && <StudyStreakTrackerView />}
        {moreSubSection === 'pomodoro' && <PomodoroView />}
        {moreSubSection === 'gpa-calculator' && <GpaCalculatorView />}
        {moreSubSection === 'formulas' && <FormulaSheetsView />}
        {moreSubSection === 'flashcards' && <FlashcardsView />}
        {moreSubSection === 'calendar' && <CalendarView />}
        {moreSubSection === 'timetable' && <TimetableWeeklyView />}
        {moreSubSection === 'progress' && <ProgressAnalyticsView />}
        {moreSubSection === 'courses' && <CoursesView />}
        {moreSubSection === 'certificates' && <MyCertificatesView />}
        {moreSubSection === 'settings' && <SettingsView />}
        {moreSubSection === 'support' && <SupportView />}
        {moreSubSection === 'team' && <TeamView />}
        {moreSubSection === 'about' && <AboutView />}
      </div>
    );
  }

  // Hub Menu Grid Items
  const allMenuSections = [
    {
      id: 'team' as MoreSubSection,
      title: 'Our Team & Leadership',
      desc: 'Raghuveer (Founder) & 7xstudio (Co-Founder) • Made with love',
      icon: Users,
      category: 'ACCOUNT',
      badge: '★ Team & Creators',
      badgeColor: 'bg-[#0F8B6D] text-white',
      color: 'bg-[#0F8B6D]/15 text-[#0F8B6D]',
    },
    {
      id: 'courses' as MoreSubSection,
      title: 'Certified Courses',
      desc: 'Interactive masterclasses with certificates (AI, Study Science, Time)',
      icon: GraduationCap,
      category: 'ACADEMIC',
      badge: 'Free & Certified',
      badgeColor: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      id: 'streak-tracker' as MoreSubSection,
      title: 'Daily Study Streak Tracker',
      desc: 'Habit fire counter, weekly momentum strips, freeze shields & XP milestones',
      icon: Flame,
      category: 'STUDY',
      badge: '🔥 Active',
      badgeColor: 'bg-amber-500 text-neutral-950 font-bold',
      color: 'bg-amber-500/10 text-[#E6A83A]',
    },
    {
      id: 'pomodoro' as MoreSubSection,
      title: 'Pomodoro Study Timer',
      desc: '25/5 focus intervals, task time tracking & ambient soundscapes',
      icon: Timer,
      category: 'STUDY',
      badge: 'Featured',
      badgeColor: 'bg-[#0F8B6D] text-white',
      color: 'bg-emerald-500/10 text-[#0F8B6D]',
    },
    {
      id: 'flashcards' as MoreSubSection,
      title: 'Study Flashcards Deck',
      desc: 'Active recall spaced repetition for exam concepts',
      icon: Layers,
      category: 'STUDY',
      badge: 'Interactive',
      badgeColor: 'bg-amber-500/15 text-[#E6A83A]',
      color: 'bg-amber-500/10 text-[#E6A83A]',
    },
    {
      id: 'gpa-calculator' as MoreSubSection,
      title: 'GPA & Marks Calculator',
      desc: 'Percentage estimator, CGPA converter & target marks predictor',
      icon: Calculator,
      category: 'ACADEMIC',
      badge: 'Calculator',
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      id: 'formulas' as MoreSubSection,
      title: 'Formula Quick Reference',
      desc: 'Searchable cheat sheets for Math, Physics, and Chemistry',
      icon: BookOpen,
      category: 'ACADEMIC',
      badge: 'Cheat Sheets',
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      id: 'certificates' as MoreSubSection,
      title: 'My Certificates',
      desc: 'Official verified credentials with QR validation',
      icon: Award,
      category: 'ACADEMIC',
      badge: certificates.length > 0 ? `${certificates.length} Earned` : undefined,
      badgeColor: 'bg-amber-500/15 text-[#E6A83A]',
      color: 'bg-amber-500/10 text-[#E6A83A]',
    },
    {
      id: 'calendar' as MoreSubSection,
      title: 'Study Calendar',
      desc: 'Monthly deadline planner & day schedule breakdown',
      icon: CalendarIcon,
      category: 'STUDY',
      color: 'bg-emerald-500/10 text-[#0F8B6D]',
    },
    {
      id: 'timetable' as MoreSubSection,
      title: 'Weekly Timetable',
      desc: 'Daily school/college period schedule & classrooms',
      icon: CalendarDays,
      category: 'STUDY',
      color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
    {
      id: 'progress' as MoreSubSection,
      title: 'Progress & Analytics',
      desc: 'Completion rates, streak metrics & study graphs',
      icon: TrendingUp,
      category: 'STUDY',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      id: 'settings' as MoreSubSection,
      title: 'Settings & Preferences',
      desc: 'Grade, dark theme, timer duration, notifications & log out',
      icon: SettingsIcon,
      category: 'ACCOUNT',
      color: 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-300',
    },
    {
      id: 'support' as MoreSubSection,
      title: 'Support & Helpdesk',
      desc: 'Email yourstudyverse@gmail.com & FAQ guide',
      icon: HelpCircle,
      category: 'ACCOUNT',
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
    {
      id: 'about' as MoreSubSection,
      title: 'About StudyVerse V3.0',
      desc: 'Founders, philosophy & version history',
      icon: Info,
      category: 'ACCOUNT',
      color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
  ];

  const filteredSections = allMenuSections.filter(item => {
    const matchesCategory = selectedHubCategory === 'ALL' || item.category === selectedHubCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header with Quick Profile Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Tools, Utilities & Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Pomodoro timer, GPA calculator, flashcards, timetable, formula sheets & preferences.
          </p>
        </div>

        {/* Quick User / Auth status pill with direct Log in / Log out button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
              <div className="w-7 h-7 rounded-xl bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div className="min-w-0 pr-2">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 block truncate max-w-[120px]">
                  {user?.name}
                </span>
                <span className="text-[10px] text-neutral-400 block truncate max-w-[120px]">
                  {user?.grade || 'Student'}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-2.5 py-1 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-[11px] font-bold flex items-center gap-1 transition-colors"
                title="Log Out of StudyVerse"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-4 py-2 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Log In / Sign Up</span>
            </button>
          )}
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tools (Pomodoro, GPA, Formulas, Timetable, Settings)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
            />
          </div>

          <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'ALL', label: 'All Modules' },
              { id: 'STUDY', label: 'Study & Focus' },
              { id: 'ACADEMIC', label: 'Academic Tools' },
              { id: 'ACCOUNT', label: 'Preferences' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedHubCategory(cat.id as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedHubCategory === cat.id
                    ? 'bg-[#0F8B6D] text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredSections.map(item => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => navigateTo('more', item.id)}
              className="p-5 rounded-3xl glass-panel hover:border-[#0F8B6D]/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 group-hover:text-[#0F8B6D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#0F8B6D]">
                <span>Launch tool</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
