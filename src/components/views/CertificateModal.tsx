import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  Share2,
  Maximize2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
  onUpdate?: (updated: Certificate) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ 
  certificate: cert, 
  onClose,
}) => {
  const { addNotification, navigateTo } = useApp();
  const certRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!cert) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cert.verificationUrl);
    addNotification('Verification Link Copied', 'Share this link to verify your authentic StudyVerse certificate.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className={`relative w-full ${isFullscreen ? 'max-w-6xl' : 'max-w-4xl'} rounded-3xl bg-neutral-900/95 border border-[#E6A83A]/40 shadow-2xl p-3 sm:p-5 my-auto text-neutral-100 transition-all`}>
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-lg bg-[#0F8B6D]/20 text-[#0F8B6D] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#0F8B6D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">
                  Official Verified Certificate
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#E6A83A]/20 text-[#E6A83A] text-[10px] font-mono font-extrabold uppercase">
                  {cert.certificateId}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Verifiable credential powered by StudyVerse Academic Registry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-[#0F8B6D] transition-colors"
              title="Copy Live Verification URL"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Fullscreen view */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors hidden sm:flex"
              title="Toggle Fullscreen Size"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Print / Save PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F8B6D] text-white text-xs font-bold hover:bg-[#0A6650] shadow-sm transition-all"
              title="Print or Save as High-Res PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 
          =======================================================
          STUDYVERSE AUTHENTIC CERTIFICATE OF COMPLETION
          Exact reproduction of user's reference certificate image
          Strict Aspect Ratio: 1.414 / 1 (A4 Landscape)
          Mobile-Optimized Breadth and Scaled Geometry
          =======================================================
        */}
        <div className="w-full overflow-x-auto flex justify-center py-2 px-0 sm:px-1 no-scrollbar touch-pan-x">
          <div
            ref={certRef}
            id="studyverse-certificate-print"
            className="relative w-full max-w-[850px] aspect-[1.414/1] bg-[#FAF8F2] text-[#171A19] rounded-xl p-3 sm:p-6 md:p-8 border-[5px] sm:border-[8px] md:border-[10px] border-[#04261D] shadow-2xl flex flex-col justify-between overflow-hidden select-none shrink-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #FAF8F2 65%, #F4EFE3 100%)',
            }}
          >
            {/* Fine Gold Inset Frame */}
            <div className="absolute inset-1.5 sm:inset-3 border-[1px] sm:border-[1.5px] border-[#C59B27] rounded-lg pointer-events-none z-10"></div>

            {/* 
              Corner Ornaments (Top Left, Top Right, Bottom Left, Bottom Right)
              Exact sweeping dark emerald swoosh arches with rich flowing gold ribbons
            */}
            {/* Top Left Corner */}
            <svg 
              className="absolute top-0 left-0 w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cornerGreenTL" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#031E17" />
                  <stop offset="100%" stopColor="#083B2C" />
                </linearGradient>
                <linearGradient id="cornerGoldTL" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9E286" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#996D13" />
                </linearGradient>
              </defs>
              {/* Outer Deep Emerald Swoosh */}
              <path d="M0 0 L160 0 C110 0 45 35 25 90 C12 120 0 145 0 160 Z" fill="url(#cornerGreenTL)" />
              {/* Flowing Gold Ribbon Trim */}
              <path d="M160 0 C115 5 50 40 28 95 C14 125 0 150 0 160 C5 140 20 105 42 70 C70 25 120 0 160 0 Z" fill="url(#cornerGoldTL)" />
              {/* Gold Accent Hairline */}
              <path d="M155 0 C110 8 48 42 26 98 C12 128 2 152 0 160" stroke="#FFF2B2" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Top Right Corner */}
            <svg 
              className="absolute top-0 right-0 w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cornerGreenTR" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#031E17" />
                  <stop offset="100%" stopColor="#083B2C" />
                </linearGradient>
                <linearGradient id="cornerGoldTR" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F9E286" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#996D13" />
                </linearGradient>
              </defs>
              <path d="M160 0 L0 0 C50 0 115 35 135 90 C148 120 160 145 160 160 Z" fill="url(#cornerGreenTR)" />
              <path d="M0 0 C45 5 110 40 132 95 C146 125 160 150 160 160 C155 140 140 105 118 70 C90 25 40 0 0 0 Z" fill="url(#cornerGoldTR)" />
              <path d="M5 0 C50 8 112 42 134 98 C148 128 158 152 160 160" stroke="#FFF2B2" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Bottom Left Corner */}
            <svg 
              className="absolute bottom-0 left-0 w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cornerGreenBL" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#031E17" />
                  <stop offset="100%" stopColor="#083B2C" />
                </linearGradient>
                <linearGradient id="cornerGoldBL" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F9E286" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#996D13" />
                </linearGradient>
              </defs>
              <path d="M0 160 L160 160 C110 160 45 125 25 70 C12 40 0 15 0 0 Z" fill="url(#cornerGreenBL)" />
              <path d="M160 160 C115 155 50 120 28 65 C14 35 0 10 0 0 C5 20 20 55 42 90 C70 135 120 160 160 160 Z" fill="url(#cornerGoldBL)" />
              <path d="M155 160 C110 152 48 118 26 62 C12 32 2 8 0 0" stroke="#FFF2B2" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Bottom Right Corner */}
            <svg 
              className="absolute bottom-0 right-0 w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cornerGreenBR" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#031E17" />
                  <stop offset="100%" stopColor="#083B2C" />
                </linearGradient>
                <linearGradient id="cornerGoldBR" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#F9E286" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#996D13" />
                </linearGradient>
              </defs>
              <path d="M160 160 L0 160 C50 160 115 125 135 70 C148 40 160 15 160 0 Z" fill="url(#cornerGreenBR)" />
              <path d="M0 160 C45 155 110 120 132 65 C146 35 160 10 160 0 C155 20 140 55 118 90 C90 135 40 160 0 160 Z" fill="url(#cornerGoldBR)" />
              <path d="M5 160 C50 152 112 118 134 62 C148 32 158 8 160 0" stroke="#FFF2B2" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Subtle Center Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none">
              <span className="font-cinzel text-6xl sm:text-8xl md:text-9xl font-black text-[#04261D]">SV</span>
            </div>

            {/* ================= TOP HEADER ================= */}
            <div className="relative z-20 flex items-start justify-between px-2 sm:px-5 pt-1 sm:pt-2">
              {/* Top Left: StudyVerse Official Brand Logo */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Stylized Mortarboard Cap + SV Monogram Vector Icon */}
                <div className="relative w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                    {/* Mortarboard Cap */}
                    <path d="M50 12 L88 28 L50 44 L12 28 Z" fill="#04261D" stroke="#D4AF37" strokeWidth="1.5" />
                    <path d="M30 38 L30 52 C30 62 50 68 50 68 C50 68 70 62 70 52 L70 38" fill="#04261D" />
                    {/* Gold Cap Button & Tassel / Pen Nib */}
                    <circle cx="50" cy="28" r="3" fill="#F5DF88" />
                    <path d="M50 28 Q78 30 78 50" stroke="#D4AF37" strokeWidth="2" fill="none" />
                    <path d="M75 50 L81 50 L78 62 Z" fill="#E6A83A" />
                    {/* SV Monogram Text */}
                    <text x="32" y="88" fontFamily="'Cinzel', serif" fontSize="42" fontWeight="900" fill="#04261D" letterSpacing="-2">S</text>
                    <text x="56" y="88" fontFamily="'Cinzel', serif" fontSize="42" fontWeight="900" fill="#083B2C" letterSpacing="-2">V</text>
                    {/* Pen Nib Gold Detail */}
                    <path d="M74 72 L82 72 L78 94 Z" fill="#D4AF37" />
                    <circle cx="78" cy="80" r="1.5" fill="#04261D" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm sm:text-xl md:text-2xl font-black text-[#04261D] tracking-tight leading-none">
                    StudyVerse
                  </div>
                  <div className="text-[7px] sm:text-[10px] md:text-[11px] font-medium text-neutral-600 tracking-wide mt-0.5">
                    Your Smart Study Planner
                  </div>
                </div>
              </div>

              {/* Top Right: Certificate ID Box Matching Reference Design */}
              <div className="text-right">
                <div className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-neutral-700 uppercase tracking-widest">
                  CERTIFICATE ID
                </div>
                <div className="mt-0.5 sm:mt-1 inline-flex items-center px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-md border border-[#04261D]/70 bg-white/80 shadow-2xs">
                  <span className="font-mono text-[8px] sm:text-xs md:text-sm font-extrabold text-[#04261D] tracking-wider select-text">
                    {cert.certificateId}
                  </span>
                </div>
              </div>
            </div>

            {/* ================= CENTER BODY ================= */}
            <div className="relative z-20 text-center my-auto py-1 sm:py-2 space-y-0.5 sm:space-y-1">
              {/* Main Heading */}
              <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#111827] tracking-[0.14em] sm:tracking-[0.16em] uppercase font-cinzel leading-none">
                CERTIFICATE
              </h1>
              
              {/* Subheading in Golden Bronze */}
              <div className="text-[9px] sm:text-sm md:text-base lg:text-lg font-bold text-[#B3781A] tracking-[0.20em] sm:tracking-[0.24em] uppercase font-cinzel">
                OF COMPLETION
              </div>

              {/* Ornate Gold Diamond Center Divider */}
              <div className="flex items-center justify-center gap-2 pt-0.5 pb-0.5">
                <div className="w-10 sm:w-24 md:w-28 h-[1px] bg-[#D4AF37]/80"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rotate-45 bg-[#D4AF37]"></div>
                <div className="w-10 sm:w-24 md:w-28 h-[1px] bg-[#D4AF37]/80"></div>
              </div>

              {/* Presentation Line */}
              <p className="text-[8px] sm:text-xs md:text-sm text-neutral-700 font-medium italic">
                This is proudly presented to
              </p>

              {/* DYNAMIC STUDENT NAME (Alex Brush / Great Vibes Script in Emerald Green) */}
              <div className="py-0.5 sm:py-1">
                <div className="inline-flex items-center justify-center">
                  <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#064E3B] font-calligraphy tracking-wide px-2 sm:px-4 select-text leading-tight drop-shadow-2xs">
                    {cert.studentName}
                  </span>
                </div>
                {/* Thin gold decorative underline under the student name */}
                <div className="w-32 sm:w-72 md:w-88 h-[1px] sm:h-[1.5px] bg-[#D4AF37]/80 mx-auto mt-0.5"></div>
              </div>

              {/* Course Completed Subtitle */}
              <p className="text-[8px] sm:text-xs md:text-sm text-neutral-700 font-medium">
                for successfully completing the course
              </p>

              {/* DYNAMIC COURSE NAME */}
              <div className="text-[11px] sm:text-lg md:text-xl font-black text-[#04261D] uppercase tracking-wide font-cinzel px-2 sm:px-4 py-0.5 line-clamp-1">
                {cert.courseTitle}
              </div>

              {/* Commendation Note */}
              <p className="text-[7px] sm:text-[11px] md:text-xs text-neutral-600 max-w-xl mx-auto leading-relaxed italic px-2 sm:px-4 line-clamp-1 sm:line-clamp-none">
                This achievement reflects your dedication, consistency, and passion for learning.
              </p>
            </div>

            {/* ================= BOTTOM ROW (4 Balanced Columns with Dividers) ================= */}
            <div className="relative z-20 flex items-end justify-between px-1 sm:px-4 pt-1.5 sm:pt-2 pb-0.5 sm:pb-1">
              
              {/* Column 1: Scalloped Gold Medal Badge */}
              <div className="flex items-center justify-start shrink-0">
                <div className="relative w-10 h-10 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center shrink-0">
                  {/* 24-point Scalloped Gold Medal SVG with Realistic Shading */}
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="medalGoldGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFF2B2" />
                        <stop offset="45%" stopColor="#E5C158" />
                        <stop offset="85%" stopColor="#B3781A" />
                        <stop offset="100%" stopColor="#7A4E0B" />
                      </radialGradient>
                      <linearGradient id="medalGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#083B2C" />
                        <stop offset="100%" stopColor="#031E17" />
                      </linearGradient>
                    </defs>
                    {/* 24-point scalloped star rosette */}
                    <path d="M60 2 L66 12 L78 8 L81 20 L94 19 L93 32 L105 35 L100 47 L111 54 L103 64 L111 74 L100 81 L105 93 L93 96 L94 109 L81 108 L78 120 L66 116 L60 126 L54 116 L42 120 L39 108 L26 109 L27 96 L15 93 L20 81 L9 74 L17 64 L9 54 L20 47 L15 35 L27 32 L26 19 L39 20 L42 8 L54 12 Z" fill="url(#medalGoldGrad)" />
                    {/* Inner gold rim & dark green core */}
                    <circle cx="60" cy="64" r="48" fill="#B3781A" />
                    <circle cx="60" cy="64" r="45" fill="url(#medalGoldGrad)" />
                    <circle cx="60" cy="64" r="42" fill="url(#medalGreenGrad)" />
                    <circle cx="60" cy="64" r="40" stroke="#F5DF88" strokeWidth="1" strokeDasharray="3,2" fill="none" />
                    {/* Laurel Wreath */}
                    <path d="M34 66 C34 50 44 38 60 38 C76 38 86 50 86 66 C86 80 74 90 60 90 C46 90 34 80 34 66" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3,3" fill="none" />
                  </svg>
                  {/* Medal Typography */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#F5DF88] pt-1">
                    <span className="text-[8px] sm:text-xs leading-none text-[#F5DF88]">★</span>
                    <span className="text-[4px] sm:text-[7px] md:text-[8px] font-black uppercase tracking-wider leading-tight font-cinzel text-white drop-shadow-xs">
                      COMPLETION<br/>ACHIEVED
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Issued Date */}
              <div className="text-center space-y-0.5 relative px-1 sm:px-3">
                <div className="flex justify-center text-[#04261D]">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#04261D]" />
                </div>
                <div className="text-[6px] sm:text-[8px] md:text-[9px] font-bold text-neutral-600 uppercase tracking-widest">
                  ISSUED DATE
                </div>
                <div className="text-[7px] sm:text-xs md:text-sm font-extrabold text-[#111827] whitespace-nowrap">
                  {cert.issueDate}
                </div>
                {/* Vertical separator on right */}
                <div className="hidden sm:block absolute -right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-neutral-300"></div>
              </div>

              {/* Column 3: CEO Signature */}
              <div className="text-center space-y-0.5 relative px-1 sm:px-4">
                <div className="font-signature text-base sm:text-3xl md:text-4xl text-[#04261D] leading-none select-none">
                  Raghuveer
                </div>
                <div className="w-14 sm:w-24 md:w-28 h-[1px] bg-neutral-400 mx-auto"></div>
                <div className="font-bold text-[#111827] text-[7px] sm:text-xs md:text-sm leading-tight">
                  Raghuveer
                </div>
                <div className="text-[5px] sm:text-[8px] md:text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                  CEO, FOUNDER
                </div>
                <div className="text-[5px] sm:text-[8px] md:text-[9px] font-extrabold text-[#04261D]">
                  StudyVerse
                </div>
                {/* Vertical separator on right */}
                <div className="hidden sm:block absolute -right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-neutral-300"></div>
              </div>

              {/* Column 4: Status */}
              <div className="text-center space-y-0.5 relative px-1 sm:px-3">
                <div className="flex justify-center text-[#04261D]">
                  <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#04261D]" />
                </div>
                <div className="text-[6px] sm:text-[8px] md:text-[9px] font-bold text-neutral-600 uppercase tracking-widest">
                  STATUS
                </div>
                <div className="text-[7px] sm:text-xs md:text-sm font-extrabold text-[#04261D]">
                  Verified
                </div>
              </div>

              {/* Column 5: QR Code Card & Scan to Verify Pill */}
              <div className="flex flex-col items-center justify-end shrink-0">
                <div className="p-1 sm:p-1.5 bg-white rounded-xl border border-neutral-300 shadow-md flex flex-col items-center">
                  <QRCodeSVG
                    value={cert.verificationUrl}
                    size={36}
                    className="w-6 h-6 sm:w-11 sm:h-11 md:w-12 md:h-12"
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="M"
                  />
                  {/* Scan to Verify Pill underneath the QR */}
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#04261D] text-white text-[5px] sm:text-[7px] md:text-[8px] font-bold uppercase tracking-widest hover:bg-[#083B2C] transition-colors"
                  >
                    SCAN TO VERIFY
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Verification URL: <code className="text-amber-300 font-mono text-[10px]">{cert.verificationUrl}</code></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.location.hash = `#verify/${cert.certificateId}`;
                navigateTo('more', 'verify');
                onClose();
              }}
              className="text-[#0F8B6D] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Test Live Verification</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
