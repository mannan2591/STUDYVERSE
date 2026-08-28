import React from 'react';
import { 
  Heart, 
  ExternalLink, 
  Sparkles, 
  Code, 
  ShieldCheck, 
  Users, 
  Award, 
  Globe, 
  Compass, 
  ArrowRight,
  Mail,
  Layers,
  Cpu,
  Palette
} from 'lucide-react';
import { StudyVerseLogo } from '../common/StudyVerseLogo';
import { useApp } from '../../context/AppContext';

export const TeamView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. Hero Header */}
      <div className="relative rounded-3xl glass-panel border-2 border-[#0F8B6D]/30 p-6 sm:p-10 text-center overflow-hidden shadow-sm space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F8B6D]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E6A83A]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col items-center space-y-3">
          <StudyVerseLogo size="lg" variant="icon" />

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F8B6D]/15 text-[#0F8B6D] dark:text-[#BFE8D7] text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E6A83A]" />
              <span>Meet The Creators</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
              Our Visionary Team
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mt-2 leading-relaxed">
              StudyVerse was born from a unified mission: to make academic planning effortless, beautiful, and deeply motivating for ambitious students worldwide.
            </p>
          </div>

          {/* "Made with the love of 7xstudio" Heart Banner */}
          <div className="mt-2 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0F8B6D]/10 via-[#E6A83A]/15 to-[#0F8B6D]/10 border border-[#0F8B6D]/20 shadow-2xs">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
            <span className="text-xs sm:text-sm font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-wide">
              Made with the love of <a href="https://home.7xstudio.site" target="_blank" rel="noreferrer" className="text-[#0F8B6D] hover:underline font-black">7xstudio</a>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Core Leadership Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Founder Card - Raghuveer */}
        <div className="p-6 sm:p-7 rounded-3xl glass-panel border-2 border-[#0F8B6D]/30 flex flex-col justify-between relative group hover:shadow-lg transition-all duration-300">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0F8B6D]/15 text-[#0F8B6D] dark:text-[#BFE8D7] text-[11px] font-extrabold uppercase tracking-wider">
            Founder & CEO
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0F8B6D] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md border-2 border-white/30">
                R
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
                  Raghuveer
                </h2>
                <p className="text-xs font-bold text-[#0F8B6D] mt-0.5">
                  Founder & Principal Architect
                </p>
                <div className="font-signature text-xl text-[#083B2C] dark:text-[#BFE8D7] opacity-80 mt-1 select-none">
                  Raghuveer
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Raghuveer is the visionary founder behind StudyVerse. Driven by a passion to modernize student organization and eliminate academic stress, he conceived the unified 3-category workflow (Homework, Classwork, Project), real-time study streaks, and certified masterclass curriculum.
            </p>

            <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                🎓 Product Vision
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                ⚡ Student Productivity
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                🏆 Academic Excellence
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
            <span>StudyVerse Leadership</span>
            <span className="font-bold text-[#0F8B6D]">Executive Founder</span>
          </div>
        </div>

        {/* Co-Founder Card - 7xstudio */}
        <div className="p-6 sm:p-7 rounded-3xl glass-panel border-2 border-[#E6A83A]/40 flex flex-col justify-between relative group hover:shadow-lg transition-all duration-300">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#E6A83A]/20 text-[#B3781A] dark:text-[#E6A83A] text-[11px] font-extrabold uppercase tracking-wider">
            Co-Founded by
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#0F8B6D] to-[#E6A83A] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md border-2 border-white/30">
                7x
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#171A19] dark:text-[#F7F4EA] tracking-tight flex items-center gap-2">
                  <span>7xstudio</span>
                  <Sparkles className="w-4 h-4 text-[#E6A83A]" />
                </h2>
                <p className="text-xs font-bold text-[#E6A83A] mt-0.5">
                  Co-Founding Technology & Creative Studio
                </p>
                <a 
                  href="https://home.7xstudio.site" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F8B6D] hover:underline mt-0.5"
                >
                  <Globe className="w-3 h-3" />
                  <span>home.7xstudio.site</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              7xstudio serves as the co-founding engineering and design force behind StudyVerse. Specializing in high-performance digital products, responsive web craftsmanship, and intelligent student interfaces, 7xstudio brought the StudyVerse platform to life.
            </p>

            <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                💻 Full-Stack Engineering
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                🎨 UI/UX Design System
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                ⚡ Cloud & Performance
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
            <a
              href="https://home.7xstudio.site"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Visit 7xstudio Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. The Collaboration & Philosophy */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F8B6D]/20 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#0F8B6D]" />
          <h3 className="font-extrabold text-base sm:text-lg text-[#171A19] dark:text-[#F7F4EA]">
            The Story Behind StudyVerse
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          When Raghuveer set out to craft the ultimate study organizer, he envisioned a tool that didn&apos;t just manage dates, but inspired daily momentum. In close collaboration with <strong>7xstudio</strong>, every pixel, interaction curve, certificate canvas, and study algorithm was tuned for peak clarity and student delight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="font-black text-xs text-[#0F8B6D] uppercase tracking-wider">1. Respect For Time</div>
            <p className="text-[11px] text-neutral-500 leading-snug">Quick task captures, 1-click Pomodoro intervals, and instant calendar syncing.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="font-black text-xs text-[#E6A83A] uppercase tracking-wider">2. Authentic Rewards</div>
            <p className="text-[11px] text-neutral-500 leading-snug">Verified completion certificates with cryptographic QR validation and CEO signature.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="font-black text-xs text-[#0F8B6D] uppercase tracking-wider">3. Made With Love</div>
            <p className="text-[11px] text-neutral-500 leading-snug">Continuous enhancements powered by student feedback and 7xstudio engineering.</p>
          </div>
        </div>
      </div>

      {/* 4. Footer Links & Contact */}
      <div className="p-6 rounded-3xl glass-panel border border-neutral-200/60 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
          <Mail className="w-4 h-4 text-[#0F8B6D]" />
          <span>Need to connect with the team? Reach us at <strong className="text-[#0F8B6D]">yourstudyverse@gmail.com</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://home.7xstudio.site"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            <span>7xstudio Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => navigateTo('more', 'about')}
            className="px-3.5 py-1.5 rounded-xl bg-[#0F8B6D]/10 hover:bg-[#0F8B6D]/20 text-[#0F8B6D] font-bold transition-colors flex items-center gap-1"
          >
            <span>About App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
