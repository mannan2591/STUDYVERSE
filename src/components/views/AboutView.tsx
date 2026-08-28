import React from 'react';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Users, 
  Award, 
  BookOpen, 
  Mail, 
  Code,
  Compass, 
  CheckCircle2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { StudyVerseLogo } from '../common/StudyVerseLogo';
import { useApp } from '../../context/AppContext';

export const AboutView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. Header Banner with Brand Identity */}
      <div className="relative rounded-3xl glass-panel border-2 border-[#0F8B6D]/30 p-6 sm:p-8 text-center overflow-hidden shadow-sm space-y-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F8B6D]/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E6A83A]/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>

        <div className="relative z-10 flex flex-col items-center space-y-3">
          <StudyVerseLogo size="lg" variant="icon" />

          <div>
            <span className="px-3 py-1 rounded-full bg-[#0F8B6D]/15 text-[#0F8B6D] dark:text-[#BFE8D7] text-xs font-bold uppercase tracking-widest">
              StudyVerse V3.0
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight mt-1">
              Your Smart Study Planner
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto mt-1 leading-relaxed">
              Empowering students to organize daily homework, classwork, and projects with ease, focus, and genuine motivation.
            </p>
          </div>

          {/* "Made with the love of 7xstudio" Heart Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0F8B6D]/10 via-[#E6A83A]/15 to-[#0F8B6D]/10 border border-[#0F8B6D]/20 text-xs font-bold text-[#171A19] dark:text-[#F7F4EA]">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Made with the love of <a href="https://home.7xstudio.site" target="_blank" rel="noreferrer" className="text-[#0F8B6D] hover:underline font-extrabold">7xstudio</a></span>
          </div>
        </div>

        {/* 6-Pillar Core Experience Banner */}
        <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-2 pt-4 border-t border-neutral-200/60 dark:border-neutral-800">
          {[
            { label: 'PLAN', sub: 'Prioritize' },
            { label: 'STUDY', sub: 'Deep Focus' },
            { label: 'TRACK', sub: 'Deadlines' },
            { label: 'ACHIEVE', sub: 'Streaks & XP' },
            { label: 'LEARN', sub: 'Courses' },
            { label: 'GROW', sub: 'Excellence' },
          ].map((pillar, i) => (
            <div key={i} className="p-2 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 text-center">
              <div className="font-extrabold text-[11px] sm:text-xs text-[#0F8B6D]">{pillar.label}</div>
              <div className="text-[9px] text-neutral-500 font-medium">{pillar.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Leadership & Team Section */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0F8B6D]" />
            <span>Leadership & Team</span>
          </h2>
          <button
            onClick={() => navigateTo('more', 'team')}
            className="text-xs font-bold text-[#0F8B6D] hover:underline flex items-center gap-1"
          >
            <span>View Full Team Page</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Founder - Raghuveer */}
          <div className="p-5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center font-bold text-sm">
                R
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0F8B6D]/15 text-[#0F8B6D]">
                Founder & CEO
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
                Raghuveer
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                Founder of StudyVerse. Architect of student productivity workflows, daily habits, and certified curriculum standards.
              </p>
            </div>
          </div>

          {/* Co-Founder - 7xstudio */}
          <div className="p-5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E6A83A]/15 text-[#E6A83A] flex items-center justify-center font-bold text-sm">
                7x
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E6A83A]/20 text-[#B3781A] dark:text-[#E6A83A]">
                Co-Founded by
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
                  7xstudio
                </h3>
                <a
                  href="https://home.7xstudio.site"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#0F8B6D] hover:underline flex items-center gap-1"
                >
                  <span>home.7xstudio.site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                Co-founding technology and digital design studio. Building full-stack architecture, user experience, and cloud intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Team Footer Note */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/60 via-amber-50/40 to-emerald-50/60 dark:from-emerald-950/20 dark:via-amber-950/20 dark:to-emerald-950/20 border border-[#0F8B6D]/20 text-center">
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold flex items-center justify-center gap-2">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Made with the love of <a href="https://home.7xstudio.site" target="_blank" rel="noreferrer" className="text-[#0F8B6D] hover:underline font-bold">7xstudio</a> for students everywhere.</span>
          </p>
        </div>
      </div>

      {/* 3. Official Contact & Mission */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
        <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
          Product Mission & Integrity
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          StudyVerse is designed exclusively for students. We believe academic success comes from steady consistency, clear prioritization without overwhelm, and celebrated daily progress. Every task category (Homework, Classwork, and Project) is treated with equal academic respect to give students a balanced view of their study obligations.
        </p>

        <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 gap-2">
          <span>Official Support: <strong className="text-[#0F8B6D]">yourstudyverse@gmail.com</strong></span>
          <span>© 2026 StudyVerse. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};
