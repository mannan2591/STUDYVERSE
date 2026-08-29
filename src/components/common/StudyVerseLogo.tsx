import React, { useState } from 'react';

const LOGO_SRC = '/studyverse-logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'full' | 'icon' | 'horizontal' | 'text-only';
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}

export const StudyVerseLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  theme = 'auto',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  // Dimension definitions
  const sizeMap = {
    sm: { icon: 34, text: 'text-lg', tag: 'text-[9px]', height: 34, radius: 'rounded-xl' },
    md: { icon: 44, text: 'text-xl', tag: 'text-[11px]', height: 44, radius: 'rounded-2xl' },
    lg: { icon: 56, text: 'text-2xl', tag: 'text-xs', height: 56, radius: 'rounded-2xl' },
    xl: { icon: 72, text: 'text-3xl', tag: 'text-sm', height: 72, radius: 'rounded-3xl' },
    hero: { icon: 104, text: 'text-4xl', tag: 'text-base', height: 104, radius: 'rounded-3xl' },
  };

  const dim = sizeMap[size];

  // Brand Icon rendering new 3D App Icon with fallback vector
  const BrandIcon = ({ width = dim.icon, height = dim.icon }: { width?: number; height?: number }) => {
    if (!imgError) {
      return (
        <div 
          style={{ width: `${width}px`, height: `${height}px` }} 
          className={`relative shrink-0 overflow-hidden ${dim.radius} border border-[#0F8B6D]/30 shadow-md transition-transform duration-200 hover:scale-105 select-none bg-[#072B21]`}
        >
          <img
            src={LOGO_SRC}
            alt="StudyVerse Logo"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    // High-fidelity fallback SVG
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B4B3B" />
            <stop offset="60%" stopColor="#0F8B6D" />
            <stop offset="100%" stopColor="#062F25" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9D776" />
            <stop offset="50%" stopColor="#E6A83A" />
            <stop offset="100%" stopColor="#B3781A" />
          </linearGradient>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1DC29A" />
            <stop offset="50%" stopColor="#0F8B6D" />
            <stop offset="100%" stopColor="#075E48" />
          </linearGradient>
        </defs>

        <rect x="4" y="4" width="152" height="152" rx="36" fill="url(#bgGrad)" />
        <rect x="4" y="4" width="152" height="152" rx="36" stroke="#1DC29A" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Book */}
        <path d="M 28 132 Q 54 122 80 134 Q 106 122 132 132 Q 120 144 80 144 Q 40 144 28 132 Z" fill="#075E48" />
        <path d="M 32 130 Q 56 120 80 131 Q 104 120 128 130 Q 116 140 80 140 Q 44 140 32 130 Z" fill="#F7F4EA" />
        <path d="M 78 131 L 82 131 L 82 142 L 78 142 Z" fill="#E6A83A" />

        {/* S monogram */}
        <path
          d="M 76 56 C 60 56 46 63 46 75 C 46 92 78 87 78 103 C 78 111 70 116 58 116 C 46 116 38 110 35 103 L 47 98 C 48 102 52 106 58 106 C 63 106 67 104 67 99 C 67 84 35 88 35 73 C 35 60 48 50 68 50 C 74 50 82 52 86 56 L 76 66 Z"
          fill="#F7F4EA"
        />

        {/* Graduation cap */}
        <g transform="translate(42, 14)">
          <polygon points="34,6 66,18 34,30 2,18" fill="url(#emeraldGrad)" stroke="#F7F4EA" strokeWidth="1" />
          <polygon points="34,22 56,15 56,22 34,29 12,22 12,15" fill="#075E48" />
          <circle cx="34" cy="18" r="2.5" fill="url(#goldGrad)" />
          <path d="M 34 18 Q 48 24 50 36" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="37" r="2" fill="url(#goldGrad)" />
        </g>

        {/* Pen forming V */}
        <g transform="translate(80, 48)">
          <path d="M 28 8 L 44 26 L 24 58 L 8 40 Z" fill="url(#emeraldGrad)" stroke="#1DC29A" strokeWidth="0.8" />
          <path d="M 24 58 L 8 40 L 4 45 L 20 63 Z" fill="url(#goldGrad)" />
          <polygon points="20,63 4,45 6,78 13,84" fill="url(#goldGrad)" />
          <line x1="10" y1="56" x2="6" y2="78" stroke="#171A19" strokeWidth="1" />
          <circle cx="10" cy="62" r="1.2" fill="#171A19" />
        </g>
      </svg>
    );
  };

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <BrandIcon />
      </div>
    );
  }

  if (variant === 'text-only') {
    return (
      <div className={`inline-flex flex-col ${className}`}>
        <div className="flex items-center tracking-tight font-bold">
          <span className="text-[#171A19] dark:text-[#F7F4EA]">Study</span>
          <span className="text-[#0F8B6D]">Verse</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="h-[2px] w-4 bg-[#0F8B6D] rounded-full"></span>
          <span className="text-[10px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
            Your Smart Study Planner
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
        <BrandIcon width={Math.max(34, dim.icon * 0.85)} height={Math.max(34, dim.icon * 0.85)} />
        <div className="flex flex-col">
          <div className={`font-black tracking-tight ${dim.text} leading-none flex items-center`}>
            <span className="text-[#171A19] dark:text-[#F7F4EA]">Study</span>
            <span className="text-[#0F8B6D]">Verse</span>
          </div>
          <span className={`font-medium text-neutral-500 dark:text-neutral-400 ${dim.tag} tracking-wider mt-0.5`}>
            Your Smart Study Planner
          </span>
        </div>
      </div>
    );
  }

  // Full Stacked Logo (Default)
  return (
    <div className={`inline-flex flex-col items-center text-center ${className}`}>
      <BrandIcon />
      <div className={`font-extrabold tracking-tight ${dim.text} mt-2 flex items-center`}>
        <span className="text-[#171A19] dark:text-[#F7F4EA]">Study</span>
        <span className="text-[#0F8B6D]">Verse</span>
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="h-[2px] w-3 bg-[#0F8B6D] rounded-full"></span>
        <span className={`font-semibold text-neutral-600 dark:text-neutral-300 ${dim.tag} tracking-wider uppercase`}>
          Your Smart Study Planner
        </span>
        <span className="h-[2px] w-3 bg-[#0F8B6D] rounded-full"></span>
      </div>
    </div>
  );
};
