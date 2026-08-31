import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Trash2, 
  Save, 
  Sparkles, 
  LogOut, 
  Mail, 
  GraduationCap, 
  Timer, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  AlertCircle,
  Palette,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThemeHeroIllustration } from '../common/ThemeHeroIllustration';

export const SettingsView: React.FC = () => {
  const { 
    user, 
    updateUserProfile, 
    currentTheme,
    setTheme,
    themeList,
    themeConfig,
    isDarkMode, 
    toggleDarkMode, 
    logout, 
    isAuthenticated, 
    openAuthModal,
    addNotification,
    pomodoroSettings,
    updatePomodoroSettings
  } = useApp();

  // Profile Form state
  const [name, setName] = useState(user?.name || 'Raghuveer');
  const [grade, setGrade] = useState(user?.grade || 'Class 10');
  const [school, setSchool] = useState(user?.school || 'StudyVerse Academy');
  const [bio, setBio] = useState(user?.bio || '');

  // Pomodoro Settings Form state
  const [focusDuration, setFocusDuration] = useState(pomodoroSettings.focusDuration || 25);
  const [shortBreak, setShortBreak] = useState(pomodoroSettings.shortBreakDuration || 5);
  const [longBreak, setLongBreak] = useState(pomodoroSettings.longBreakDuration || 15);
  const [soundEnabled, setSoundEnabled] = useState(pomodoroSettings.soundEnabled ?? true);

  // Logout confirmation state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, grade, school, bio });
    addNotification('Profile Saved', 'Your student profile details were updated in the cloud.');
  };

  const handleSaveTimerSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePomodoroSettings({
      focusDuration: Number(focusDuration),
      shortBreakDuration: Number(shortBreak),
      longBreakDuration: Number(longBreak),
      soundEnabled,
    });
  };

  const handleClearLocalData = () => {
    if (window.confirm('Are you sure you want to reset your local planner cache and sample tasks? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleConfirmLogout = async () => {
    await logout();
    setShowLogoutConfirm(false);
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold uppercase tracking-wider mb-1">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Preferences & Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
          Settings & Account
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Configure your student profile, Pomodoro focus timer intervals, interface theme, and session login status.
        </p>
      </div>

      {/* 1. Profile Section */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
                Student Profile
              </h2>
              <p className="text-xs text-neutral-500">
                {isAuthenticated ? `Signed in as ${user?.email}` : 'Signed in as Guest Visitor'}
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cloud Synced</span>
            </span>
          )}
        </div>

        {isAuthenticated ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Grade / Academic Standard
                </label>
                <select
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
                >
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10 (SSC / Board)</option>
                  <option value="Class 11 / Inter 1st">Class 11 / Inter 1st Year</option>
                  <option value="Class 12 / Inter 2nd">Class 12 / Inter 2nd Year</option>
                  <option value="Degree / College">College / University</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  School / College Name
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
                  placeholder="e.g. Hyderabad Public School"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Academic Bio / Focus Goals
                </label>
                <input
                  type="text"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
                  placeholder="e.g. Aiming for 95% in Board Exams"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>

              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className="px-4 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold flex items-center gap-1.5 transition-colors border border-red-200 dark:border-red-900/60"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50/50 dark:bg-neutral-800/60 border border-[#E6A83A]/30">
            <div className="text-xs text-neutral-600 dark:text-neutral-300">
              Sign up or log in to sync your study planner, time tracking, and certificates across all your devices.
            </div>
            <button
              onClick={() => openAuthModal('signup')}
              className="px-4 py-2 rounded-xl bg-[#0F8B6D] text-white text-xs font-bold shrink-0"
            >
              Sign In / Register
            </button>
          </div>
        )}
      </div>

      {/* 2. Pomodoro Study Timer Settings */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-neutral-200/60 dark:border-neutral-800">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-[#E6A83A] flex items-center justify-center">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
              Pomodoro Study Timer Settings
            </h2>
            <p className="text-xs text-neutral-500">
              Customize focus session lengths and break intervals.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveTimerSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Focus Duration (Minutes)
              </label>
              <select
                value={focusDuration}
                onChange={e => setFocusDuration(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
              >
                <option value={15}>15 mins (Quick Burst)</option>
                <option value={20}>20 mins</option>
                <option value={25}>25 mins (Standard Pomodoro)</option>
                <option value={30}>30 mins</option>
                <option value={45}>45 mins (Deep Session)</option>
                <option value={50}>50 mins (50/10 Rule)</option>
                <option value={60}>60 mins</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Short Break (Minutes)
              </label>
              <select
                value={shortBreak}
                onChange={e => setShortBreak(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
              >
                <option value={3}>3 mins</option>
                <option value={5}>5 mins (Standard)</option>
                <option value={8}>8 mins</option>
                <option value={10}>10 mins</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Long Break (Minutes)
              </label>
              <select
                value={longBreak}
                onChange={e => setLongBreak(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
              >
                <option value={10}>10 mins</option>
                <option value={15}>15 mins (Standard)</option>
                <option value={20}>20 mins</option>
                <option value={30}>30 mins</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#0F8B6D]" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-400" />
              )}
              <div>
                <span className="font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                  Timer Sound Chimes
                </span>
                <p className="text-[11px] text-neutral-400">
                  Play harmonic bell chords when intervals begin and finish.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                soundEnabled
                  ? 'bg-[#0F8B6D] text-white'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
              }`}
            >
              {soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Timer Settings</span>
          </button>
        </form>
      </div>

      {/* 3. Appearance & 6 Visual Themes Selection */}
      <div id="theme-settings-section" className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200/60 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
                  StudyVerse Themes & Appearance
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0F8B6D]/10 text-[#0F8B6D]">
                  6 Themes Available
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Personalize your workspace palette, illustrations, and focus ambiance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-neutral-500 font-medium hidden sm:inline">Active:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-[#171A19] dark:text-[#F7F4EA] border border-neutral-200 dark:border-neutral-700">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: themeConfig?.colors?.primary || themeConfig?.primaryColor || '#059669' }}
              />
              {themeConfig?.name || 'Ocean Blue'}
            </span>
          </div>
        </div>

        {/* 6 Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themeList.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                id={`theme-card-${theme.id}`}
                onClick={() => setTheme(theme.id)}
                className={`relative flex flex-col text-left p-4 rounded-2xl transition-all group overflow-hidden border ${
                  isSelected
                    ? 'ring-2 ring-[#0F8B6D] border-[#0F8B6D] bg-white dark:bg-neutral-900 shadow-md scale-[1.01]'
                    : 'border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900/70 hover:shadow-xs'
                }`}
              >
                {/* Active Selection Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0F8B6D] text-white text-[11px] font-bold shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Active</span>
                  </div>
                )}

                {/* Theme Hero Illustration */}
                <div className="w-full h-32 flex items-center justify-center rounded-xl bg-neutral-100/70 dark:bg-neutral-950/60 p-2 mb-3 overflow-hidden border border-neutral-200/40 dark:border-neutral-800/40">
                  <ThemeHeroIllustration themeId={theme.id} className="w-full h-full" />
                </div>

                {/* Theme Details */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-[#171A19] dark:text-[#F7F4EA]">
                        {theme.name}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        theme.category === 'dark' 
                          ? 'bg-neutral-800 text-neutral-300' 
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}>
                        {theme.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>

                {/* Palette Swatches Bar */}
                <div className="mt-auto pt-3 border-t border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                      style={{ backgroundColor: theme.colors.primary }}
                      title="Primary Color"
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                      style={{ backgroundColor: theme.colors.accent }}
                      title="Accent Color"
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                      style={{ backgroundColor: theme.colors.bgCanvas }}
                      title="Canvas Background"
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                      style={{ backgroundColor: theme.colors.cardSurface }}
                      title="Card Surface"
                    />
                  </div>

                  <span className={`text-[11px] font-bold transition-colors ${
                    isSelected ? 'text-[#0F8B6D]' : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                  }`}>
                    {isSelected ? 'Selected' : 'Apply Theme →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Mode Toggle Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50/90 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA]">
                Quick Dark / Light Toggle
              </div>
              <div className="text-[11px] text-neutral-500">
                Instantly switch between daytime and nighttime focus presets.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:border-[#0F8B6D] text-xs font-bold transition-all"
          >
            Switch to {isDarkMode ? 'Light (Ocean Blue)' : 'Dark (Midnight Purple)'}
          </button>
        </div>
      </div>

      {/* 4. Prominent Log Out Option */}
      <div className="p-6 rounded-3xl glass-panel border border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
              Session & Log Out
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {isAuthenticated
                ? `Currently signed in as ${user?.name} (${user?.email}). Logging out will switch you to guest mode.`
                : 'You are currently in guest mode. Sign in to sync your data.'}
            </p>
          </div>

          {isAuthenticated ? (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-4 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0"
            >
              <User className="w-4 h-4" />
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. Data & Storage Management */}
      <div className="p-6 rounded-3xl glass-panel border border-red-500/20 space-y-4">
        <h2 className="font-extrabold text-base text-red-600 dark:text-red-400">
          Data Management
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA]">
              Reset Local Storage Cache
            </div>
            <div className="text-xs text-neutral-500">
              Clears local cached state and resets default sample courses and tasks.
            </div>
          </div>

          <button
            onClick={handleClearLocalData}
            className="px-4 py-2.5 rounded-xl border border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Cache</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-neutral-900 p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-base text-neutral-900 dark:text-neutral-100">
                Confirm Log Out
              </h3>
              <p className="text-xs text-neutral-500">
                Are you sure you want to log out of <strong>{user?.email}</strong>? You can log back in anytime to sync your progress.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
