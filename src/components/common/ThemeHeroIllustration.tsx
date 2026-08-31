import React from 'react';
import { AppThemeId } from '../../types';

interface ThemeHeroIllustrationProps {
  themeId: AppThemeId;
  className?: string;
}

export const ThemeHeroIllustration: React.FC<ThemeHeroIllustrationProps> = ({ themeId, className = 'w-32 h-24 sm:w-44 sm:h-32' }) => {
  switch (themeId) {
    case 'ocean-blue':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="oceanSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="oceanWater" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="lighthouseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
            </defs>
            {/* Background Sky Pill */}
            <rect x="10" y="10" width="180" height="120" rx="24" fill="url(#oceanSky)" />
            
            {/* Sun / Light Halo */}
            <circle cx="155" cy="45" r="22" fill="#93C5FD" fillOpacity="0.4" />
            <circle cx="155" cy="45" r="14" fill="#60A5FA" fillOpacity="0.5" />

            {/* Clouds */}
            <path d="M40 45 C40 38 48 34 54 38 C58 32 68 32 72 38 C78 36 84 41 82 48 Z" fill="#FFFFFF" fillOpacity="0.8" />
            <path d="M100 30 C100 25 106 22 110 25 C113 20 120 20 124 25 C128 23 133 27 131 32 Z" fill="#FFFFFF" fillOpacity="0.6" />

            {/* Seagulls */}
            <path d="M50 25 Q55 20 60 25 Q65 20 70 25" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M75 18 Q79 14 83 18 Q87 14 91 18" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Waves Back */}
            <path d="M10 95 Q40 85 80 95 Q130 105 190 90 L190 130 L10 130 Z" fill="#93C5FD" fillOpacity="0.6" />

            {/* Waves Front */}
            <path d="M10 105 Q60 92 110 106 Q160 115 190 102 L190 130 L10 130 Z" fill="url(#oceanWater)" />
            
            {/* Lighthouse Rock Foundation */}
            <path d="M135 125 L145 78 L170 82 L180 125 Z" fill="#1E3A8A" fillOpacity="0.2" />

            {/* Lighthouse Structure */}
            <path d="M148 115 L153 52 L163 52 L168 115 Z" fill="url(#lighthouseGrad)" />
            {/* Red / Blue Stripes */}
            <path d="M150 98 L166 98 L165 86 L151 86 Z" fill="#2563EB" />
            <path d="M152 72 L164 72 L163 62 L153 62 Z" fill="#2563EB" />
            {/* Lantern Room */}
            <rect x="151" y="44" width="14" height="8" rx="2" fill="#1E40AF" />
            <circle cx="158" cy="48" r="3" fill="#FEF08A" />
            {/* Dome Roof */}
            <path d="M150 44 Q158 36 166 44 Z" fill="#1E3A8A" />
            <line x1="158" y1="36" x2="158" y2="32" stroke="#1E3A8A" strokeWidth="1.5" />

            {/* Light beam */}
            <polygon points="155,48 20,20 20,70" fill="#FEF08A" fillOpacity="0.25" />
          </svg>
        </div>
      );

    case 'midnight-purple':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cosmicSky" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2D235C" />
                <stop offset="50%" stopColor="#221A47" />
                <stop offset="100%" stopColor="#18152E" />
              </linearGradient>
              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="60%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7C3AED" />
              </radialGradient>
              <radialGradient id="nebulaGlow" cx="40%" cy="60%" r="60%">
                <stop offset="0%" stopColor="#9333EA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1E1145" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Cosmic Card */}
            <rect x="10" y="10" width="180" height="120" rx="24" fill="url(#cosmicSky)" stroke="#3E3570" strokeWidth="1.5" />
            
            {/* Nebula Dust */}
            <circle cx="80" cy="80" r="55" fill="url(#nebulaGlow)" />

            {/* Sparkling Stars */}
            <circle cx="35" cy="35" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
            <circle cx="55" cy="22" r="1" fill="#E9D5FF" fillOpacity="0.8" />
            <circle cx="85" cy="40" r="1.8" fill="#FDF4FF" fillOpacity="0.95" />
            <circle cx="110" cy="25" r="1.2" fill="#E9D5FF" />
            <circle cx="45" cy="85" r="1.5" fill="#DDD6FE" />
            <circle cx="70" cy="110" r="1" fill="#FFFFFF" />
            <circle cx="175" cy="95" r="1.5" fill="#C084FC" />
            <circle cx="165" cy="30" r="1.2" fill="#FFFFFF" />
            
            {/* 4-point Diamond Star */}
            <path d="M85 32 L87 39 L94 41 L87 43 L85 50 L83 43 L76 41 L83 39 Z" fill="#F5D0FE" />

            {/* Glowing Moon Halo */}
            <circle cx="145" cy="65" r="42" fill="#A855F7" fillOpacity="0.2" />
            <circle cx="145" cy="65" r="34" fill="#C084FC" fillOpacity="0.3" />

            {/* Main Detailed Cosmic Moon */}
            <circle cx="145" cy="65" r="26" fill="url(#moonGlow)" />
            {/* Moon Craters */}
            <circle cx="138" cy="58" r="4.5" fill="#7E22CE" fillOpacity="0.45" />
            <circle cx="152" cy="72" r="6" fill="#7E22CE" fillOpacity="0.4" />
            <circle cx="154" cy="55" r="3" fill="#6B21A8" fillOpacity="0.35" />
            <circle cx="137" cy="74" r="3" fill="#6B21A8" fillOpacity="0.4" />

            {/* Cosmic Cloud Ribbons */}
            <path d="M10 115 C40 100 80 125 120 110 C150 98 175 105 190 120 L190 130 L10 130 Z" fill="#581C87" fillOpacity="0.4" />
            <path d="M10 122 C50 112 100 128 140 118 C170 110 185 116 190 130 L10 130 Z" fill="#6B21A8" fillOpacity="0.6" />
          </svg>
        </div>
      );

    case 'forest-green':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="forestSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ECFDF5" />
                <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="mountainBack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="mountainFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064E3B" />
              </linearGradient>
            </defs>
            {/* Background Sky */}
            <rect x="10" y="10" width="180" height="120" rx="24" fill="url(#forestSky)" />

            {/* Subtle Sun */}
            <circle cx="55" cy="45" r="18" fill="#A7F3D0" fillOpacity="0.6" />

            {/* Birds */}
            <path d="M40 28 Q44 24 48 28 Q52 24 56 28" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M60 22 Q63 19 66 22 Q69 19 72 22" stroke="#10B981" strokeWidth="1" strokeLinecap="round" fill="none" />

            {/* Distant Mountains */}
            <polygon points="30,120 85,55 140,120" fill="url(#mountainBack)" fillOpacity="0.7" />
            <polygon points="90,120 145,45 190,120" fill="url(#mountainBack)" fillOpacity="0.85" />
            <polygon points="120,120 160,60 190,120" fill="#047857" fillOpacity="0.5" />

            {/* Mountain Snowcaps / Highlights */}
            <polygon points="145,45 137,60 145,55 153,60" fill="#FFFFFF" fillOpacity="0.8" />
            <polygon points="85,55 79,68 85,64 91,68" fill="#FFFFFF" fillOpacity="0.8" />

            {/* Front Mountain Ridge */}
            <path d="M10 110 Q50 90 95 105 Q140 120 190 100 L190 130 L10 130 Z" fill="url(#mountainFront)" />

            {/* Pine Trees */}
            {/* Tree 1 */}
            <polygon points="145,115 138,100 145,102 140,88 145,90 142,78 145,72 148,78 145,90 150,88 145,102 152,100" fill="#064E3B" />
            {/* Tree 2 */}
            <polygon points="160,118 154,105 160,107 155,95 160,97 157,86 160,82 163,86 160,97 165,95 160,107 166,105" fill="#022C22" />
            {/* Tree 3 */}
            <polygon points="132,120 127,108 132,110 128,100 132,102 130,92 132,88 134,92 132,102 136,100 132,110 137,108" fill="#047857" />
            {/* Tree 4 */}
            <polygon points="172,120 168,110 172,111 169,102 172,104 170,95 172,92 174,95 172,104 175,102 172,111 176,110" fill="#064E3B" />
          </svg>
        </div>
      );

    case 'sunset-orange':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFEDD5" />
                <stop offset="60%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FDBA74" />
              </linearGradient>
              <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <linearGradient id="sunsetRidge1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
              <linearGradient id="sunsetRidge2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C2410C" />
                <stop offset="100%" stopColor="#7C2D12" />
              </linearGradient>
            </defs>
            {/* Background Sky */}
            <rect x="10" y="10" width="180" height="120" rx="24" fill="url(#sunsetSky)" />

            {/* Glowing Sunset Sun */}
            <circle cx="145" cy="55" r="32" fill="#FDBA74" fillOpacity="0.4" />
            <circle cx="145" cy="55" r="22" fill="url(#sunGrad)" />

            {/* Birds */}
            <path d="M45 35 Q50 30 55 35 Q60 30 65 35" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M70 25 Q74 21 78 25 Q82 21 86 25" stroke="#F97316" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Layer 1 Hills */}
            <path d="M10 90 Q60 65 110 85 Q160 105 190 80 L190 130 L10 130 Z" fill="url(#sunsetRidge1)" fillOpacity="0.8" />

            {/* Layer 2 Hills Front */}
            <path d="M10 105 Q70 85 130 105 Q170 120 190 105 L190 130 L10 130 Z" fill="url(#sunsetRidge2)" />

            {/* Ambient Sun Reflection Rays */}
            <line x1="145" y1="18" x2="145" y2="24" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
            <line x1="120" y1="28" x2="124" y2="33" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
            <line x1="170" y1="28" x2="166" y2="33" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'minimal-white':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="minimalDesk" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>
            {/* Clean White Card Base */}
            <rect x="10" y="10" width="180" height="120" rx="24" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            
            {/* Lamp Light Cone */}
            <polygon points="148,42 95,115 185,115" fill="#BAE6FD" fillOpacity="0.35" />

            {/* Study Desk Table Surface */}
            <line x1="25" y1="115" x2="175" y2="115" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

            {/* Stack of Study Books */}
            <rect x="45" y="104" width="45" height="11" rx="2" fill="#0284C7" />
            <rect x="48" y="94" width="40" height="10" rx="2" fill="#38BDF8" />
            <rect x="52" y="85" width="34" height="9" rx="2" fill="#64748B" />
            {/* Bookmark Ribbon */}
            <path d="M72 85 L72 98 L75 95 L78 98 L78 85 Z" fill="#F59E0B" />

            {/* Minimalist Desk Lamp */}
            {/* Base */}
            <ellipse cx="145" cy="114" rx="14" ry="4" fill="#334155" />
            {/* Stem */}
            <path d="M145 114 C145 85 162 70 152 48" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Lamp Joint */}
            <circle cx="152" cy="48" r="3.5" fill="#0284C7" />
            {/* Lamp Shade */}
            <path d="M140 42 L162 48 L152 35 Z" fill="#0284C7" />
            <ellipse cx="151" cy="45" rx="8" ry="4" fill="#BAE6FD" />

            {/* Clean Floating Star Accent */}
            <circle cx="110" cy="40" r="2" fill="#0284C7" fillOpacity="0.8" />
            <circle cx="125" cy="30" r="1.5" fill="#94A3B8" />
          </svg>
        </div>
      );

    case 'neon-dark':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="neonDarkBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E2F4A" />
                <stop offset="100%" stopColor="#0E1A2C" />
              </linearGradient>
              <linearGradient id="screenNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Cyber Slate Card Frame */}
            <rect x="10" y="10" width="180" height="120" rx="24" fill="url(#neonDarkBg)" stroke="#29436A" strokeWidth="1.5" />

            {/* Neon Desk Line */}
            <line x1="25" y1="115" x2="175" y2="115" stroke="#10B981" strokeWidth="2" strokeOpacity="0.8" filter="url(#neonGlow)" />

            {/* Cyber Monitor Ambient Glow */}
            <rect x="105" y="32" width="60" height="42" rx="6" fill="#8B5CF6" fillOpacity="0.25" filter="url(#neonGlow)" />

            {/* Monitor Outer Frame */}
            <rect x="110" y="35" width="54" height="36" rx="4" fill="#181822" stroke="#06B6D4" strokeWidth="1.5" />
            {/* Glowing Screen Content */}
            <rect x="113" y="38" width="48" height="30" rx="2" fill="url(#screenNeon)" />
            {/* Code / Chart Lines on Screen */}
            <line x1="117" y1="44" x2="135" y2="44" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="117" y1="49" x2="145" y2="49" stroke="#E0E7FF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="117" y1="54" x2="128" y2="54" stroke="#67E8F9" strokeWidth="1.2" strokeLinecap="round" />
            {/* Sparkline on Screen */}
            <path d="M117 62 L125 58 L133 61 L142 53 L155 57" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Monitor Stand */}
            <rect x="134" y="71" width="6" height="10" fill="#374151" />
            <ellipse cx="137" cy="82" rx="12" ry="3" fill="#1F2937" stroke="#06B6D4" strokeWidth="1" />

            {/* Neon Mechanical Keyboard */}
            <rect x="112" y="96" width="46" height="10" rx="2" fill="#1F2937" stroke="#10B981" strokeWidth="1" />
            {/* Key lights */}
            <line x1="116" y1="101" x2="154" y2="101" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Neon Cyber Potted Plant */}
            <path d="M50 114 L55 98 L70 98 L75 114 Z" fill="#1F2937" stroke="#8B5CF6" strokeWidth="1" />
            {/* Glowing Leaves */}
            <path d="M62 98 Q52 82 45 88 Q55 92 62 98" fill="#10B981" />
            <path d="M62 98 Q72 80 80 86 Q70 91 62 98" fill="#34D399" />
            <path d="M62 98 Q62 76 66 74 Q68 86 62 98" fill="#6EE7B7" />

            {/* Glowing Neon Accent Dots */}
            <circle cx="35" cy="40" r="2" fill="#10B981" filter="url(#neonGlow)" />
            <circle cx="90" cy="25" r="1.5" fill="#06B6D4" filter="url(#neonGlow)" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
