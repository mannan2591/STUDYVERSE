import React, { useState, useEffect } from 'react';
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
