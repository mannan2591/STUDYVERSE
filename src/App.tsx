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
  const { activeTab } = useApp();
  const [isVerifyRoute, setIsVerifyRoute] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('verify') === 'true' || params.get('certId') || params.get('id') || window.location.pathname.startsWith('/verify')) {
      setIsVerifyRoute(true);
    }
  }, []);

  if (isVerifyRoute) {
    return <CertificateVerifyView />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EA] dark:bg-[#171A19] text-[#171A19] dark:text-[#F7F4EA] transition-colors duration-200 flex flex-col font-sans selection:bg-[#0F8B6D] selection:text-white">
      {/* Top Fixed Header Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
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
