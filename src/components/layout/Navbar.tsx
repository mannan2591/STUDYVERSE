import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Flame, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Award, 
  FileCheck, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Info, 
  Sun, 
  Moon, 
  Check, 
  Plus,
  Sparkles,
  ChevronDown,
  Users,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyVerseLogo } from '../common/StudyVerseLogo';

export const Navbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    openAuthModal,
    logout,
    streak,
    openStreakTracker,
    xp,
    level,
    isDarkMode,
    toggleDarkMode,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setIsSearchOpen,
    setIsAddTaskModalOpen,
    setEditingTask,
    navigateTo,
    requireAuth,
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickAdd = () => {
    requireAuth(() => {
      setEditingTask(null);
      setIsAddTaskModalOpen(true);
    }, 'Task Planner', 'Sign in or create an account to schedule homework and organize your assignments.');
  };

  const handleStreakClick = () => {
    requireAuth(() => {
      openStreakTracker();
    }, 'Daily Study Streak', 'Sign in or log in to track your daily study streaks and earn shields.');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#0F8B6D]/15 dark:border-[#BFE8D7]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1 sm:gap-3">
        {/* Left: Brand Logo */}
        <div 
          onClick={() => navigateTo('home')}
          className="cursor-pointer transition-transform duration-200 active:scale-95 shrink-0 flex items-center"
        >
          <StudyVerseLogo size="md" variant="horizontal" />
        </div>

        {/* Center: Search & Quick Add (Desktop/Tablet) */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/70 dark:bg-[#171A19]/80 border border-neutral-200/80 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-[#0F8B6D] dark:hover:border-[#0F8B6D] transition-all duration-200 text-sm shadow-sm group"
          >
            <Search className="w-4 h-4 text-neutral-400 group-hover:text-[#0F8B6D] transition-colors" />
            <span className="text-xs sm:text-sm font-normal">Search tasks, subjects, resources...</span>
            <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Search on Mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-1.5 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-300" />
          </button>

          {/* Quick Add Task Button (Tablet/Desktop) */}
          <button
            onClick={handleQuickAdd}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-sm shadow-[#0F8B6D]/25 transition-all duration-150"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>

          {/* Study Streak Display */}
          <button 
            onClick={handleStreakClick}
            title="Daily Study Streak: Completing tasks, Pomodoro sessions, or lessons keeps your streak alive! Click to open tracker."
            className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-semibold cursor-pointer transition-all active:scale-95 shadow-xs"
          >
            <Flame className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${streak.streakCount > 0 ? 'text-[#E6A83A] fill-[#E6A83A] animate-pulse' : 'text-neutral-400'}`} />
            <span>{streak.streakCount}</span>
            <span className="hidden sm:inline text-[11px] font-normal text-amber-800/80 dark:text-amber-300/80">days</span>
          </button>

          {/* XP & Level Badge (Desktop) */}
          {isAuthenticated && (
            <div 
              onClick={() => navigateTo('achievements')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0F8B6D]/10 dark:bg-[#0F8B6D]/20 border border-[#0F8B6D]/20 text-[#0F8B6D] dark:text-[#BFE8D7] text-xs font-semibold cursor-pointer hover:bg-[#0F8B6D]/15 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E6A83A]" />
              <span>Lv.{level}</span>
              <span className="text-[11px] font-normal opacity-80">({xp} XP)</span>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
            aria-label="Toggle Theme"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#171A19]" />}
          </button>

          {/* Quick Settings Button (Desktop - on mobile available in More tab) */}
          <button
            onClick={() => navigateTo('more', 'settings')}
            className="hidden md:flex p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors group"
            aria-label="Settings"
            title="Settings & Preferences"
          >
            <SettingsIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300 group-hover:rotate-45 transition-transform duration-300" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(prev => !prev)}
              className="relative p-1.5 sm:p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#171A19] animate-pulse"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-dropdown p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#0F8B6D]" />
                    <span className="font-semibold text-sm text-[#171A19] dark:text-[#F7F4EA]">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#0F8B6D] text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-neutral-500 hover:text-red-500 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60 my-1">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-neutral-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-xl transition-colors cursor-pointer text-left ${
                          n.read ? 'opacity-70' : 'bg-[#0F8B6D]/5 dark:bg-[#0F8B6D]/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[#171A19] dark:text-[#F7F4EA]">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-neutral-400">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Top-Right Profile / Avatar Area */}
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(prev => !prev)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-[#0F8B6D]/40 transition-all active:scale-95"
                aria-label="User Profile"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#0F8B6D]/30"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#0F8B6D] text-white flex items-center justify-center font-bold text-sm shadow-xs border border-white/20">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'R'}
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
              </button>

              {/* Compact Dropdown Card */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-dropdown p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* User Info Header */}
                  <div className="p-3 pb-2.5 border-b border-neutral-200/60 dark:border-neutral-800">
                    <div className="font-bold text-sm text-[#171A19] dark:text-[#F7F4EA] truncate">
                      {user?.name}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {user?.email}
                    </div>
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-md bg-[#0F8B6D]/10 text-[#0F8B6D] dark:text-[#BFE8D7] text-[11px] font-semibold">
                      <span>{user?.grade || 'Class 10'}</span>
                      <span>•</span>
                      <span>Level {level}</span>
                    </div>
                  </div>

                  {/* Profile Menu Options */}
                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('more', 'team');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <Users className="w-4 h-4 text-[#0F8B6D]" />
                      <span className="font-semibold text-[#0F8B6D] dark:text-[#BFE8D7]">Our Team & Creators</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('more', 'courses');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Certified Courses</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('more', 'profile');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#0F8B6D]" />
                      <span>Edit Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('achievements');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <Award className="w-4 h-4 text-[#E6A83A]" />
                      <span>Achievements & Badges</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('more', 'certificates');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <FileCheck className="w-4 h-4 text-[#0F8B6D]" />
                      <span>My Certificates</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('more', 'settings');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <SettingsIcon className="w-4 h-4 text-neutral-500" />
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('more', 'support');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-neutral-500" />
                      <span>Support & Help Center</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateTo('more', 'about');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-[#0F8B6D]/10 dark:hover:bg-[#0F8B6D]/20 transition-colors"
                    >
                      <Info className="w-4 h-4 text-neutral-500" />
                      <span>About Developer</span>
                    </button>
                  </div>

                  {/* Logout Action */}
                  <div className="pt-1 mt-1 border-t border-neutral-200/60 dark:border-neutral-800">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => openAuthModal('login')}
                className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#0F8B6D] text-white hover:bg-[#0A6650] active:scale-95 transition-all whitespace-nowrap shadow-xs"
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
