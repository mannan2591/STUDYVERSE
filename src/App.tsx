import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/views/HomeView';
import { TasksView } from './components/views/TasksView';
import { AchievementsView } from './components/views/AchievementsView';
import { ResourcesView } from './components/views/ResourcesView';
import { MoreMenuHubView } from './components/views/MoreMenuHubView';
import { CertificateVerifyView } from './components/views/CertificateVerifyView';
import { AuthModal } from './components/modals/AuthModal';
import { TaskModal } from './components/modals/TaskModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { AchievementUnlockModal } from './components/modals/AchievementUnlockModal';
import { StudyStreakModal } from './components/modals/StudyStreakModal';

const AppContent: React.FC = () => {
  const { activeTab, themeConfig, currentTheme, navigateTo } = useApp();
  const [isVerifyRoute, setIsVerifyRoute] = useState(false);

  useEffect(() => {
    const checkVerifyRoute = () => {
      const hash = window.location.hash || '';
      const params = new URLSearchParams(window.location.search);
      const pathname = window.location.pathname || '';
      
      const isVerify = 
        hash.includes('verify') ||
        params.get('verify') === 'true' ||
        params.get('certId') !== null ||
        params.get('id') !== null ||
        pathname.startsWith('/verify');

      setIsVerifyRoute(isVerify);
    };

    checkVerifyRoute();
    window.addEventListener('hashchange', checkVerifyRoute);
    window.addEventListener('popstate', checkVerifyRoute);

    return () => {
      window.removeEventListener('hashchange', checkVerifyRoute);
      window.removeEventListener('popstate', checkVerifyRoute);
    };
  }, []);

  const handleExitVerify = () => {
    setIsVerifyRoute(false);
    if (window.location.hash.includes('verify')) {
      window.location.hash = '';
    }
    navigateTo('home');
  };

  if (isVerifyRoute) {
    return <CertificateVerifyView onBack={handleExitVerify} />;
  }

  const currentBgCanvas = themeConfig?.colors?.bgCanvas || themeConfig?.bgHex || '#F7F4EA';

  return (
    <div 
      id="studyverse-app-root"
      data-theme={currentTheme || 'ocean-blue'}
      style={{ backgroundColor: currentBgCanvas }}
      className="min-h-screen w-full max-w-full overflow-x-hidden text-[#171A19] dark:text-[#F7F4EA] transition-colors duration-300 flex flex-col font-sans selection:bg-[#0F8B6D] selection:text-white"
    >
      {/* Top Fixed Header Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden pt-16 sm:pt-20">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'achievements' && <AchievementsView />}
        {activeTab === 'resources' && <ResourcesView />}
        {activeTab === 'more' && <MoreMenuHubView />}

        {/* Global Bottom Footer with Made with love of 7xstudio small box */}
        <footer className="w-full py-8 pb-28 md:pb-12 text-center flex flex-col items-center justify-center gap-2.5 border-t border-neutral-200/40 dark:border-neutral-800/60 mt-12 px-4">
          <a 
            href="https://home.7xstudio.site" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 hover:bg-rose-500/10 border border-neutral-200 dark:border-neutral-800 hover:border-rose-500/30 text-xs text-neutral-600 dark:text-neutral-300 transition-all shadow-xs group cursor-pointer"
          >
            <span>made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform animate-pulse" />
            <span className="font-medium">love of</span>
            <span className="font-extrabold text-[#0F8B6D] dark:text-[#BFE8D7]">7xstudio</span>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-neutral-400">
            <span>StudyVerse • Your Smart Study Planner</span>
            <span>•</span>
            <button 
              onClick={() => navigateTo('more', 'team')}
              className="hover:text-[#0F8B6D] underline cursor-pointer"
            >
              Meet the Team
            </button>
            <span>•</span>
            <a 
              href="https://home.7xstudio.site" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#0F8B6D] underline"
            >
              7xstudio
            </a>
          </div>
        </footer>
      </main>

      {/* Mobile-First Fixed Bottom Navigation Bar (Exact 5 items) */}
      <BottomNav />

      {/* Global Application Modals */}
      <AuthModal />
      <TaskModal />
      <GlobalSearchModal />
      <AchievementUnlockModal />
      <StudyStreakModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
