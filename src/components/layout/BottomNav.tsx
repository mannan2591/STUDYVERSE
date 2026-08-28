import React from 'react';
import { 
  Home, 
  CheckSquare, 
  Award, 
  BookOpen, 
  Grid,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, navigateTo, streak, isAuthenticated } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'tasks', label: 'TASKS', icon: CheckSquare },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: Award },
    { id: 'resources', label: 'RESOURCES', icon: BookOpen },
    { id: 'more', label: 'MORE', icon: Grid },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-nav shadow-lg sm:pb-safe">
      <div className="max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-3 py-2 flex items-center justify-around">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id, 'none')}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-[#0F8B6D] dark:text-[#BFE8D7] scale-105'
                  : 'text-neutral-500 hover:text-[#171A19] dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              {/* Active Indicator Glow/Pill */}
              {isActive && (
                <span className="absolute -top-1.5 w-6 h-1 bg-[#0F8B6D] rounded-full shadow-sm"></span>
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.id === 'achievements' && isAuthenticated && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E6A83A] rounded-full animate-ping"></span>
                )}
              </div>

              <span className={`text-[10px] tracking-wider mt-1 font-semibold ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
