import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Download, 
  Printer, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Share2,
  Edit3,
  RefreshCw,
  Save,
  Calendar,
  User,
  BookOpen,
  Hash,
  Copy,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
  onUpdate?: (updated: Certificate) => void;
}

// Generate unique formatted certificate ID
const generateNewCertId = (courseName: string): string => {
  const currentYear = new Date().getFullYear();
  const cleanPrefix = courseName 
    ? courseName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase() 
    : 'COURSE';
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SV-${cleanPrefix || 'COURSE'}-${currentYear}-${rand}`;
};

export const CertificateModal: React.FC<CertificateModalProps> = ({ 
  certificate: initialCert, 
  onClose,
}) => {
  const { addNotification, updateCertificate, navigateTo } = useApp();
  const certRef = useRef<HTMLDivElement>(null);

  // Editable local state for changing Certificate ID, QR Code, Student Name, Course Name, Date
  const [cert, setCert] = useState<Certificate | null>(initialCert);
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state when initialCert changes
  useEffect(() => {
    setCert(initialCert);
  }, [initialCert]);

  if (!cert) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cert.verificationUrl);
    addNotification('Verification Link Copied', 'Share this link to verify your authentic StudyVerse certificate.');
  };

  // Regenerate Certificate ID & QR Code
  const handleRegenerateId = () => {
    const newId = generateNewCertId(cert.courseTitle);
    const newVerificationUrl = `${window.location.origin}/#verify/${newId}`;
    setCert(prev => prev ? {
      ...prev,
      certificateId: newId,
      verificationUrl: newVerificationUrl,
    } : null);
    addNotification('New Certificate ID & QR Code Generated', `Updated ID: ${newId}`);
  };

  // Set today's date formatted
  const handleSetTodayDate = () => {
    const todayStr = new Date().toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setCert(prev => prev ? { ...prev, issueDate: todayStr } : null);
  };

  // Save changes to Firestore
  const handleSaveChanges = async () => {
    if (!cert) return;
    await updateCertificate(cert);
    setIsEditing(false);
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
            {/* Toggle Customizer / Editor */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isEditing 
                  ? 'bg-[#E6A83A] text-neutral-900 shadow-md font-bold' 
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
              }`}
              title="Change Certificate ID, QR code, Student Name, Course, or Date"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Close Editor' : 'Edit Certificate'}</span>
            </button>

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

        {/* Live Customizer Drawer (when isEditing is true) */}
        {isEditing && (
          <div className="mb-4 p-4 rounded-2xl bg-neutral-800/90 border border-[#E6A83A]/50 space-y-3 animate-in slide-in-from-top duration-200 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Certificate Customizer (Live Updates)</span>
              </div>
              <button
                onClick={handleRegenerateId}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate ID & QR</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Student Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400 flex items-center gap-1">
                  <User className="w-3 h-3 text-[#0F8B6D]" />
                  <span>Student Name</span>
                </label>
                <input
                  type="text"
                  value={cert.studentName}
                  onChange={e => setCert({ ...cert, studentName: e.target.value })}
                  placeholder="Enter Student Name"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Course Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#0F8B6D]" />
                  <span>Course Name</span>
                </label>
                <input
                  type="text"
                  value={cert.courseTitle}
                  onChange={e => setCert({ ...cert, courseTitle: e.target.value })}
                  placeholder="Enter Course Title"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Issue Date Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0F8B6D]" />
                    <span>Issue Date</span>
                  </label>
                  <button 
                    onClick={handleSetTodayDate} 
                    className="text-[9px] text-amber-400 hover:underline"
                  >
                    Today
                  </button>
                </div>
                <input
                  type="text"
                  value={cert.issueDate}
                  onChange={e => setCert({ ...cert, issueDate: e.target.value })}
                  placeholder="e.g. 28 August 2026"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Certificate ID */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400 flex items-center gap-1">
                  <Hash className="w-3 h-3 text-[#0F8B6D]" />
                  <span>Certificate ID</span>
                </label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={cert.certificateId}
                    onChange={e => {
                      const newId = e.target.value.toUpperCase();
                      setCert({ 
                        ...cert, 
                        certificateId: newId, 
                        verificationUrl: `${window.location.origin}/#verify/${newId}` 
                      });
                    }}
                    placeholder="SV-COURSE-2026-XXXXX"
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-amber-300 font-mono font-bold uppercase focus:border-amber-400 focus:outline-none text-[11px]"
                  />
                  <button
                    onClick={handleSaveChanges}
                    className="px-3 py-1.5 rounded-lg bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-bold flex items-center gap-1 shrink-0"
                    title="Save Changes to Database"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 
          =======================================================
          STUDYVERSE AUTHENTIC CERTIFICATE OF COMPLETION
          Faithful reproduction of reference design (IMG_20260828_164902_015.jpg)
          Strict Aspect Ratio: 1.414 / 1 (A4 Landscape)
          Mobile-Optimized Breadth and Scaled Geometry
          =======================================================
        */}
        <div className="w-full overflow-x-auto flex justify-center py-2 px-0 sm:px-1 no-scrollbar touch-pan-x">
          <div
            ref={certRef}
            id="studyverse-certificate-print"
            className="relative w-full max-w-[850px] aspect-[1.414/1] bg-[#FAF7F0] text-[#171A19] rounded-xl p-2.5 sm:p-6 md:p-8 border-[4px] sm:border-[8px] md:border-[10px] border-[#083B2C] shadow-2xl flex flex-col justify-between overflow-hidden select-none shrink-0"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #FFFFFF 0%, #FAF7F0 60%, #F5EFE0 100%)',
            }}
          >
            {/* Fine Gold Inset Frame */}
            <div className="absolute inset-1 sm:inset-2 border-[1px] sm:border-[1.5px] border-[#D4AF37] rounded-lg pointer-events-none"></div>

            {/* 
              Corner Ornaments (Top Left, Top Right, Bottom Left, Bottom Right)
              Emerald green and metallic gold sweeping curved arches exactly matching the reference design
            */}
            {/* Top Left Corner */}
            <svg 
              className="absolute top-0 left-0 w-14 h-14 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 L160 0 C110 0 0 110 0 160 Z" fill="#083B2C" />
              <path d="M0 0 L140 0 C95 10 10 95 0 140 Z" fill="#D4AF37" />
              <path d="M0 0 L120 0 C80 15 15 80 0 120 Z" fill="#0E5C45" />
              <path d="M0 145 C15 100 100 15 145 0" stroke="#F5DF88" strokeWidth="2" fill="none" />
            </svg>

            {/* Top Right Corner */}
            <svg 
              className="absolute top-0 right-0 w-14 h-14 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0 rotate-90" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 L160 0 C110 0 0 110 0 160 Z" fill="#083B2C" />
              <path d="M0 0 L140 0 C95 10 10 95 0 140 Z" fill="#D4AF37" />
              <path d="M0 0 L120 0 C80 15 15 80 0 120 Z" fill="#0E5C45" />
              <path d="M0 145 C15 100 100 15 145 0" stroke="#F5DF88" strokeWidth="2" fill="none" />
            </svg>

            {/* Bottom Left Corner */}
            <svg 
              className="absolute bottom-0 left-0 w-14 h-14 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0 -rotate-90" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 L160 0 C110 0 0 110 0 160 Z" fill="#083B2C" />
              <path d="M0 0 L140 0 C95 10 10 95 0 140 Z" fill="#D4AF37" />
              <path d="M0 0 L120 0 C80 15 15 80 0 120 Z" fill="#0E5C45" />
              <path d="M0 145 C15 100 100 15 145 0" stroke="#F5DF88" strokeWidth="2" fill="none" />
            </svg>

            {/* Bottom Right Corner */}
            <svg 
              className="absolute bottom-0 right-0 w-14 h-14 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none z-0 rotate-180" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 L160 0 C110 0 0 110 0 160 Z" fill="#083B2C" />
              <path d="M0 0 L140 0 C95 10 10 95 0 140 Z" fill="#D4AF37" />
              <path d="M0 0 L120 0 C80 15 15 80 0 120 Z" fill="#0E5C45" />
              <path d="M0 145 C15 100 100 15 145 0" stroke="#F5DF88" strokeWidth="2" fill="none" />
            </svg>

            {/* Subtle Center Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none">
              <span className="font-cinzel text-6xl sm:text-8xl md:text-9xl font-black text-[#083B2C]">SV</span>
            </div>

            {/* ================= TOP HEADER ================= */}
            <div className="relative z-10 flex items-start justify-between px-1 sm:px-4 pt-0.5 sm:pt-1">
              {/* Top Left: StudyVerse Official Logo */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Official 3D SV Logo */}
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs border border-[#083B2C]/30 shrink-0 bg-[#072B21]">
                  <img 
                    src="/studyverse-logo.png" 
                    alt="StudyVerse Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div>
                  <div className="text-xs sm:text-lg md:text-xl font-extrabold text-[#083B2C] tracking-tight leading-none">
                    Study<span className="text-[#0E5C45]">Verse</span>
                  </div>
                  <div className="text-[7px] sm:text-[10px] md:text-[11px] font-medium text-neutral-600 tracking-wide mt-0.5">
                    Your Smart Study Planner
                  </div>
                </div>
              </div>

              {/* Top Right: Certificate ID Box */}
              <div className="text-right">
                <div className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  CERTIFICATE ID
                </div>
                <div className="mt-0.5 inline-block px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md border border-neutral-400 bg-white/90 shadow-2xs">
                  <span className="font-mono text-[8px] sm:text-xs md:text-sm font-extrabold text-neutral-900 tracking-wider">
                    {cert.certificateId}
                  </span>
                </div>
              </div>
            </div>

            {/* ================= CENTER BODY ================= */}
            <div className="relative z-10 text-center my-auto py-0.5 sm:py-2 space-y-0.5 sm:space-y-1">
              {/* Main Heading */}
              <h1 className="text-base sm:text-3xl md:text-4xl font-black text-[#111827] tracking-[0.12em] sm:tracking-[0.14em] uppercase font-cinzel leading-none">
                CERTIFICATE
              </h1>
              
              {/* Subheading in Gold */}
              <div className="text-[8px] sm:text-sm md:text-base font-extrabold text-[#B3781A] tracking-[0.18em] sm:tracking-[0.22em] uppercase font-cinzel">
                OF COMPLETION
              </div>

              {/* Ornate Gold Diamond Center Line */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-0.5 pb-0.5">
                <div className="w-8 sm:w-20 h-[1px] bg-[#D4AF37]/80"></div>
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rotate-45 bg-[#D4AF37]"></div>
                <div className="w-8 sm:w-20 h-[1px] bg-[#D4AF37]/80"></div>
              </div>

              {/* Presentation Line */}
              <p className="text-[8px] sm:text-xs md:text-sm text-neutral-600 font-medium italic">
                This is proudly presented to
              </p>

              {/* DYNAMIC STUDENT NAME (Alex Brush / Great Vibes Script) */}
              <div className="py-0.5">
                <div className="inline-flex items-center justify-center">
                  <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#0A5C44] font-calligraphy tracking-wide px-2 sm:px-4 select-text leading-tight">
                    {cert.studentName}
                  </span>
                </div>
                {/* Thin gold decorative underline under the name */}
                <div className="w-28 sm:w-64 md:w-80 h-[1px] sm:h-[1.5px] bg-[#D4AF37]/80 mx-auto mt-0.5"></div>
              </div>

              {/* Course Completed Subtitle */}
              <p className="text-[8px] sm:text-xs md:text-sm text-neutral-600 font-medium">
                for successfully completing the course
              </p>

              {/* DYNAMIC COURSE NAME */}
              <div className="text-[10px] sm:text-lg md:text-xl font-black text-[#111827] uppercase tracking-wide font-cinzel px-2 sm:px-4 py-0.5 line-clamp-1">
                {cert.courseTitle}
              </div>

              {/* Commendation Note */}
              <p className="text-[7px] sm:text-[11px] md:text-xs text-neutral-600 max-w-lg mx-auto leading-relaxed italic px-2 sm:px-4 line-clamp-1 sm:line-clamp-none">
                This achievement reflects your dedication, consistency, and passion for learning.
              </p>
            </div>

            {/* ================= BOTTOM ROW (4 Columns with Dividers) ================= */}
            <div className="relative z-10 grid grid-cols-4 items-end gap-1 sm:gap-3 pt-1.5 sm:pt-3 pb-0.5 sm:pb-1 border-t border-neutral-300/80">
              
              {/* Column 1: Gold Rosette Seal Badge */}
              <div className="flex items-center justify-start pl-0.5 sm:pl-2">
                <div className="relative w-8 h-8 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center shrink-0">
                  {/* Scalloped Gold Rosette SVG */}
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="#D4AF37" />
                    <circle cx="50" cy="50" r="44" stroke="#F5DF88" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
                    <circle cx="50" cy="50" r="38" fill="#083B2C" />
                    {/* Laurel Wreath */}
                    <path d="M26,50 C26,36 36,24 50,24 C64,24 74,36 74,50 C74,64 64,76 50,76 C36,76 26,64 26,50" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,3" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#F5DF88] p-0.5">
                    <span className="text-[7px] sm:text-xs leading-none">★</span>
                    <span className="text-[4px] sm:text-[7px] md:text-[8px] font-black uppercase tracking-wider leading-tight font-cinzel text-white">
                      COMPLETION<br/>ACHIEVED
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Issued Date */}
              <div className="text-center space-y-0.5 sm:space-y-1 relative pr-0.5 sm:pr-2">
                <div className="flex justify-center text-[#083B2C]">
                  <Calendar className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#083B2C]" />
                </div>
                <div className="text-[6px] sm:text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  ISSUED DATE
                </div>
                <div className="text-[7px] sm:text-xs md:text-sm font-extrabold text-[#111827]">
                  {cert.issueDate}
                </div>
                {/* Thin vertical divider on right */}
                <div className="hidden sm:block absolute -right-1 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-neutral-300/80"></div>
              </div>

              {/* Column 3: CEO Signature */}
              <div className="text-center space-y-0.5 relative px-0.5 sm:px-2">
                <div className="font-signature text-base sm:text-3xl md:text-4xl text-[#083B2C] leading-none select-none">
                  Raghuveer
                </div>
                <div className="w-12 sm:w-24 md:w-28 h-[1px] bg-neutral-400 mx-auto"></div>
                <div className="font-bold text-[#111827] text-[7px] sm:text-xs md:text-sm leading-tight">
                  Raghuveer
                </div>
                <div className="text-[5px] sm:text-[8px] md:text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                  CEO, FOUNDER
                </div>
                <div className="text-[5px] sm:text-[8px] md:text-[9px] font-extrabold text-[#083B2C]">
                  StudyVerse
                </div>
                {/* Thin vertical divider on right */}
                <div className="hidden sm:block absolute -right-1 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-neutral-300/80"></div>
              </div>

              {/* Column 4: Status & Dynamic QR Code */}
              <div className="flex flex-col items-end justify-center text-right space-y-0.5 sm:space-y-1 pr-0.5 sm:pr-2">
                <div className="flex items-center gap-0.5 sm:gap-1 text-[6px] sm:text-[9px] md:text-[10px] font-bold text-neutral-600">
                  <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#083B2C]" />
                  <span>STATUS: <strong className="text-[#083B2C]">Verified</strong></span>
                </div>
                
                {/* Dynamic QR Code */}
                <div className="p-0.5 sm:p-1 bg-white rounded-md border border-neutral-300 shadow-2xs">
                  <QRCodeSVG
                    value={cert.verificationUrl}
                    size={32}
                    className="w-6 h-6 sm:w-11 sm:h-11 md:w-12 md:h-12"
                    bgColor="#FFFFFF"
                    fgColor="#083B2C"
                    level="M"
                  />
                </div>

                {/* Scan to Verify Pill */}
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-1 sm:px-2 py-0.5 rounded-full bg-[#083B2C] text-white text-[5px] sm:text-[7px] md:text-[8px] font-bold uppercase tracking-widest hover:bg-[#0E5C45] transition-colors"
                >
                  SCAN TO VERIFY
                </a>
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
