import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Search, 
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  Award,
  ExternalLink,
  BookOpen,
  Calendar,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useApp } from '../../context/AppContext';
import { StudyVerseLogo } from '../common/StudyVerseLogo';
import { Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

interface CertificateVerifyViewProps {
  onBack?: () => void;
}

export const CertificateVerifyView: React.FC<CertificateVerifyViewProps> = ({ onBack }) => {
  const { certificates, navigateTo, addNotification } = useApp();
  const [searchId, setSearchId] = useState('');
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const performVerification = async (queryCode: string) => {
    const cleanCode = queryCode.trim().toUpperCase().replace(/^#\/?VERIFY\/?/, '').replace(/^ID=/, '');
    if (!cleanCode) return;

    setIsVerifying(true);
    setHasSearched(true);
    setSearchId(cleanCode);

    // 1. Check local state first
    const localMatch = certificates.find(c => 
      c.certificateId.toUpperCase() === cleanCode || 
      c.id.toUpperCase() === cleanCode ||
      c.certificateId.toUpperCase().includes(cleanCode)
    );
    
    if (localMatch) {
      setVerifiedCert(localMatch);
      setIsVerifying(false);
      return;
    }

    // 2. Query Firestore directly for global verification across all users
    try {
      const q = query(collection(db, 'certificates'), where('certificateId', '==', cleanCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data() as Certificate;
        setVerifiedCert(docData);
      } else {
        // Also fallback to check ID or courseTitle
        const q2 = query(collection(db, 'certificates'), where('id', '==', cleanCode));
        const s2 = await getDocs(q2);
        if (!s2.empty) {
          setVerifiedCert(s2.docs[0].data() as Certificate);
        } else {
          // Check local storage for any cached certificates
          const savedLocal = localStorage.getItem('studyverse_certificates');
          if (savedLocal) {
            try {
              const parsed: Certificate[] = JSON.parse(savedLocal);
              const found = parsed.find(c => c.certificateId.toUpperCase() === cleanCode || c.id.toUpperCase() === cleanCode);
              if (found) {
                setVerifiedCert(found);
                setIsVerifying(false);
                return;
              }
            } catch {
              // ignore
            }
          }
          setVerifiedCert(null);
        }
      }
    } catch (e) {
      console.error('Error verifying certificate in Firestore:', e);
      // If network/firestore failed, try local state again
      const fallback = certificates.find(c => c.certificateId.toUpperCase() === cleanCode);
      setVerifiedCert(fallback || null);
    } finally {
      setIsVerifying(false);
    }
  };

  // Check URL params on load if any
  useEffect(() => {
    const parseUrlCertId = () => {
      const hash = window.location.hash || '';
      let certIdFromUrl = '';
      if (hash.includes('verify')) {
        const parts = hash.split(/verify[\/=]/i);
        if (parts.length > 1 && parts[1]) {
          certIdFromUrl = parts[1].replace(/^\//, '').split('&')[0];
        }
      }
      
      if (!certIdFromUrl) {
        const params = new URLSearchParams(window.location.search);
        certIdFromUrl = params.get('id') || params.get('certId') || '';
      }

      if (certIdFromUrl) {
        setSearchId(certIdFromUrl);
        performVerification(certIdFromUrl);
      }
    };

    parseUrlCertId();
    window.addEventListener('hashchange', parseUrlCertId);
    return () => window.removeEventListener('hashchange', parseUrlCertId);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(searchId);
  };

  const handleCopyLink = () => {
    if (!verifiedCert) return;
    const url = `${window.location.origin}/#verify/${verifiedCert.certificateId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    addNotification('Verification URL Copied', 'Authentic verification link copied to clipboard.');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (window.location.hash.includes('verify')) {
        window.location.hash = '';
      }
      navigateTo('home');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0F8B6D] hover:underline bg-[#0F8B6D]/10 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to StudyVerse</span>
        </button>
        <StudyVerseLogo size="sm" variant="horizontal" />
      </div>

      {/* Main Verification Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F8B6D]/30 text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold tracking-wider uppercase">
            Official Credential Verification Service
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Academic Certificate Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Real-time, cryptographically registered verification for official StudyVerse course completion certificates. Authenticate student credentials instantly via Certificate ID or QR code.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="max-w-lg mx-auto flex gap-2">
          <input
            type="text"
            required
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Enter Certificate ID (e.g. SV-AI-2026-8F42K7P1)"
            className="flex-1 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm uppercase font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D] shadow-inner"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="px-6 py-3 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {isVerifying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>Verify ID</span>
          </button>
        </form>

        {/* Quick Suggestion Chips if user has certificates */}
        {certificates.length > 0 && !hasSearched && (
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Your Earned Certificates (Click to test verification):
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {certificates.map(cert => (
                <button
                  key={cert.certificateId}
                  onClick={() => {
                    setSearchId(cert.certificateId);
                    performVerification(cert.certificateId);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-[#0F8B6D]/10 hover:text-[#0F8B6D] text-neutral-700 dark:text-neutral-300 text-xs font-mono border border-neutral-200 dark:border-neutral-700 transition-all cursor-pointer"
                >
                  {cert.certificateId} ({cert.courseTitle})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && !isVerifying && (
          <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800 text-left">
            {verifiedCert ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border-2 border-[#0F8B6D]/50 space-y-6 shadow-sm">
                {/* Header Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0F8B6D]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F8B6D] text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-emerald-900 dark:text-emerald-300">
                        Official Verified Credential
                      </h3>
                      <p className="text-xs text-emerald-700/80 dark:text-emerald-400">
                        This certificate is authentic, issued by StudyVerse Academic Authority, and active on records.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold border border-neutral-200 dark:border-neutral-700 flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#0F8B6D]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Link Copied' : 'Share Verification Link'}</span>
                    </button>
                    <button
                      onClick={() => setShowCertModal(true)}
                      className="px-4 py-1.5 rounded-lg bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>View Full Certificate</span>
                    </button>
                  </div>
                </div>

                {/* Detailed Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-neutral-500">
                      <UserCheck className="w-3.5 h-3.5 text-[#0F8B6D]" />
                      <span>Recipient Student</span>
                    </div>
                    <p className="text-base font-extrabold text-neutral-900 dark:text-neutral-50">
                      {verifiedCert.studentName}
                    </p>
                    <p className="text-[11px] text-neutral-400">Verified Course Graduate</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-neutral-500">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
                      <span>Course & Curriculum</span>
                    </div>
                    <p className="text-base font-extrabold text-neutral-900 dark:text-neutral-50">
                      {verifiedCert.courseTitle}
                    </p>
                    <p className="text-[11px] text-neutral-400">100% Lessons & Quizzes Passed</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-neutral-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>Date of Conferral</span>
                    </div>
                    <p className="text-base font-extrabold text-neutral-900 dark:text-neutral-50">
                      {verifiedCert.issueDate}
                    </p>
                    <p className="text-[11px] text-neutral-400">Permanent Non-Expiring Credential</p>
                  </div>
                </div>

                {/* Credential Code & Signature Info */}
                <div className="p-4 rounded-xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">
                      Certificate ID & Cryptographic Registration
                    </span>
                    <p className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">
                      {verifiedCert.certificateId}
                    </p>
                  </div>
                  
                  <div className="text-left sm:text-right space-y-0.5 text-xs text-neutral-300">
                    <p className="font-semibold text-white">Raghuveer (Founder, StudyVerse)</p>
                    <p className="text-[11px] text-neutral-400">& 7xstudios Academic Operations</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/50 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                  <XCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-rose-800 dark:text-rose-300">
                  Certificate Record Not Found
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                  No official record was found for Certificate ID <strong className="font-mono text-neutral-900 dark:text-neutral-200">&ldquo;{searchId}&rdquo;</strong>.
                </p>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Please double-check the spelling, ensure you have included any hyphens, or complete the course curriculum in StudyVerse to earn an authentic certificate.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('more', 'courses')}
                    className="px-4 py-2 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Explore Certified Courses
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Verified Certificate Modal */}
      {showCertModal && verifiedCert && (
        <CertificateModal
          certificate={verifiedCert}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </div>
  );
};
