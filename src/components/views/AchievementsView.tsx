import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Zap, 
  Crown, 
  Trophy, 
  GraduationCap, 
  FolderKanban,
  Lock,
  Star,
  ShieldCheck,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../../context/AppContext';
import { Achievement, Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

export const AchievementsView: React.FC = () => {
  const { 
    achievements, 
    certificates,
    xp, 
    level, 
    levelProgress, 
    nextLevelXp, 
    streak,
    user,
    isAuthenticated,
    navigateTo 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'badges' | 'certificates'>('badges');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Icon mapping
  const renderIcon = (iconName: string, isUnlocked: boolean) => {
    const props = { className: `w-6 h-6 ${isUnlocked ? 'text-[#E6A83A]' : 'text-neutral-400'}` };
    switch (iconName) {
      case 'Flame': return <Flame {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'CheckCircle2': return <CheckCircle2 {...props} />;
      case 'FolderKanban': return <FolderKanban {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      default: return <Award {...props} />;
    }
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl glass-panel p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Trophy className="w-3.5 h-3.5" />
              <span>Milestones & Verified Credentials</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Achievements & Standing
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              Earn experience points, advance your academic tier, unlock milestone badges, and claim verifiable course certificates.
            </p>
          </div>

          {/* Level Badge Circle */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center text-amber-600 dark:text-amber-400">
              <span className="text-[9px] font-semibold text-neutral-500 dark:text-neutral-400">LVL</span>
              <span className="text-lg font-bold leading-none">{level}</span>
            </div>
            <div>
              <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">Current Rank</div>
              <div className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {level >= 10 ? 'Grand Scholar' : level >= 5 ? 'Senior Achiever' : 'Active Learner'}
              </div>
              <div className="text-xs font-semibold text-[#0F8B6D]">{xp} Total XP</div>
            </div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-neutral-600 dark:text-neutral-300">Level {level} Progress</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">{levelProgress}% ({xp % 200}/200 XP to next level)</span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. STATS SUMMARY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl glass-panel text-center">
          <div className="text-xs font-medium text-neutral-500">Badges Unlocked</div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            {unlockedCount} / {totalCount}
          </div>
          <div className="text-xs font-semibold text-[#0F8B6D] mt-0.5">{completionPercentage}% Completed</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel text-center">
          <div className="text-xs font-medium text-neutral-500">Active Streak</div>
          <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span>{streak.streakCount} Days</span>
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">Daily consecutive study</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel text-center">
          <div className="text-xs font-medium text-neutral-500">Certificates</div>
          <div className="text-xl sm:text-2xl font-bold text-[#E6A83A] mt-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-5 h-5" />
            <span>{certificates.length}</span>
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">Official Credentials</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel text-center">
          <div className="text-xs font-medium text-neutral-500">Academic Standing</div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            Tier {Math.min(5, Math.ceil(level / 2))}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Honor Roll</div>
        </div>
      </div>

      {/* 3. SUB-TABS: Badges vs Official Certificates */}
      <div className="flex items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'badges'
                ? 'bg-[#0F8B6D] text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Milestone Badges ({unlockedCount}/{totalCount})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('certificates')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'certificates'
                ? 'bg-[#0F8B6D] text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official Certificates ({certificates.length})</span>
          </button>
        </div>

        <button
          onClick={() => navigateTo('more', 'courses')}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0F8B6D] hover:underline"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Explore Courses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. ACTIVE SUB-TAB CONTENT */}
      {activeSubTab === 'badges' ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map(achievement => {
              const isUnlocked = achievement.isUnlocked;
              const progressRatio = Math.min(100, Math.round((achievement.progress / achievement.maxProgress) * 100));

              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-2xl glass-panel transition-all duration-150 flex flex-col justify-between relative overflow-hidden ${
                    isUnlocked
                      ? 'border-amber-400/60 dark:border-amber-600/40 bg-amber-50/10'
                      : 'opacity-75'
                  }`}
                >
                  {/* Unlocked Gold Corner Tag */}
                  {isUnlocked && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 text-white text-[10px] font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>Unlocked</span>
                    </div>
                  )}

                  <div>
                    {/* Badge Icon */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isUnlocked
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {isUnlocked ? (
                          renderIcon(achievement.iconName, true)
                        ) : (
                          <Lock className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                          {achievement.badge}
                        </span>
                        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                          {achievement.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Progress Bar & XP reward */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-500">
                        Progress: {achievement.progress} / {achievement.maxProgress}
                      </span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        +{achievement.xp} XP
                      </span>
                    </div>

                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isUnlocked ? 'bg-amber-500' : 'bg-[#0F8B6D]'
                        }`}
                        style={{ width: `${progressRatio}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* CERTIFICATES SUB-TAB */
        <div className="space-y-4">
          {certificates.length === 0 ? (
            <div className="p-10 rounded-2xl glass-panel text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  No Official Certificates Claimed Yet
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  Complete interactive academic masterclasses (AI for Students, Study Techniques, Time Management) to unlock verified certificates.
                </p>
              </div>
              <button
                onClick={() => navigateTo('more', 'courses')}
                className="px-5 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Start a Free Course</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map(cert => (
                <div
                  key={cert.certificateId}
                  className="p-5 rounded-2xl glass-panel border border-[#E6A83A]/40 hover:border-[#E6A83A] transition-all flex flex-col justify-between shadow-xs space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#0F8B6D]">
                        {cert.certificateId}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
                      {cert.courseTitle}
                    </h4>

                    <div className="text-xs text-neutral-500">
                      Certified to: <strong className="text-neutral-800 dark:text-neutral-200">{cert.studentName}</strong>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Issued: {cert.issueDate}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <div className="p-1 bg-white rounded border border-neutral-200">
                      <QRCodeSVG value={cert.verificationUrl} size={32} />
                    </div>

                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-semibold text-xs shadow-2xs transition-all flex items-center gap-1.5"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Certificate Viewer Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
