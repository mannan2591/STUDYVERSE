import React from 'react';
import { Award, Sparkles, X, CheckCircle, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AchievementUnlockModal: React.FC = () => {
  const { recentUnlockedAchievement, dismissAchievementPopup } = useApp();

  if (!recentUnlockedAchievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-sm rounded-3xl glass-dropdown p-6 border-2 border-[#E6A83A] shadow-2xl text-center overflow-hidden">
        {/* Glow behind badge */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-[#E6A83A]/30 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={dismissAchievementPopup}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gold Trophy Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-[#B3781A] via-[#E6A83A] to-[#F9D776] p-1 shadow-lg shadow-[#E6A83A]/30 mb-4 animate-bounce">
          <div className="w-full h-full rounded-full bg-[#171A19] flex items-center justify-center text-[#E6A83A]">
            <Award className="w-10 h-10" />
          </div>
          <span className="absolute -bottom-1 -right-1 p-1 bg-[#0F8B6D] text-white rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Banner Label */}
        <div className="inline-block px-3 py-1 rounded-full bg-[#E6A83A]/15 text-[#E6A83A] text-[11px] font-extrabold uppercase tracking-widest mb-1.5">
          Achievement Unlocked!
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-extrabold text-[#171A19] dark:text-[#F7F4EA]">
          {recentUnlockedAchievement.title}
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1.5 px-2 leading-relaxed">
          {recentUnlockedAchievement.description}
        </p>

        {/* XP Reward Pill */}
        <div className="mt-4 py-2 px-4 rounded-2xl bg-[#0F8B6D]/10 dark:bg-[#0F8B6D]/20 border border-[#0F8B6D]/25 flex items-center justify-center gap-2 text-[#0F8B6D] dark:text-[#BFE8D7] font-bold text-sm">
          <Zap className="w-4 h-4 fill-[#0F8B6D]" />
          <span>+{recentUnlockedAchievement.xp} XP Earned</span>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={dismissAchievementPopup}
          className="mt-5 w-full py-2.5 rounded-xl bg-[#171A19] dark:bg-[#F7F4EA] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-[#171A19] font-bold text-xs shadow-md transition-all active:scale-98"
        >
          Claim & Continue
        </button>
      </div>
    </div>
  );
};
