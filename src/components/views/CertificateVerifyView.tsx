import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Search, 
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useApp } from '../../context/AppContext';
import { StudyVerseLogo } from '../common/StudyVerseLogo';
import { Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

export const CertificateVerifyView: React.FC = () => {
  const { certificates, navigateTo } = useApp();
  const [searchId, setSearchId] = useState('');
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const performVerification = async (queryCode: string) => {
    const cleanCode = queryCode.trim().toUpperCase();
    if (!cleanCode) return;

    setIsVerifying(true);
    setHasSearched(true);

    // 1. Check local state first
    const localMatch = certificates.find(c => c.certificateId.toUpperCase() === cleanCode);
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
        // Also fallback to check lowercase or ID
        const q2 = query(collection(db, 'certificates'), where('id', '==', cleanCode));
        const s2 = await getDocs(q2);
        if (!s2.empty) {
          setVerifiedCert(s2.docs[0].data() as Certificate);
        } else {
          setVerifiedCert(null);
        }
      }
    } catch (e) {
      console.error('Error verifying certificate in Firestore:', e);
      setVerifiedCert(null);
    } finally {
      setIsVerifying(false);
    }
  };

  // Check URL params on load if any
  useEffect(() => {
    const hash = window.location.hash;
    let certIdFromUrl = '';
    if (hash.includes('verify/')) {
      certIdFromUrl = hash.split('verify/')[1] || '';
    } else {
      const params = new URLSearchParams(window.location.search);
      certIdFromUrl = params.get('id') || params.get('certId') || '';
    }

    if (certIdFromUrl) {
      setSearchId(certIdFromUrl);
      performVerification(certIdFromUrl);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(searchId);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F8B6D] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to StudyVerse</span>
        </button>
        <StudyVerseLogo size="sm" variant="horizontal" />
      </div>

      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#0F8B6D]/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#0F8B6D]/10 text-[#0F8B6D] flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Certificate Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mt-1">
            Real-time verification of official academic course credentials powered by Firebase Firestore.
          </p>
        </div>

        <form onSubmit={handleVerify} className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            required
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Enter Certificate ID (e.g. SV-AI-2026-8F42K7P1)"
            className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm uppercase font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="px-5 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            {isVerifying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>Verify</span>
          </button>
        </form>

        {hasSearched && !isVerifying && (
          <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 text-left">
            {verifiedCert ? (
              <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-[#0F8B6D]/40 space-y-3">
                <div className="flex items-center gap-2 text-[#0F8B6D] font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Valid & Authenticated Certificate</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Student Name</span>
                    <strong className="text-sm text-neutral-900 dark:text-neutral-50">{verifiedCert.studentName}</strong>
                  </div>

                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Course Title</span>
                    <strong className="text-sm text-neutral-900 dark:text-neutral-50">{verifiedCert.courseTitle}</strong>
                  </div>

                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Issued Date</span>
                    <strong className="text-neutral-700 dark:text-neutral-300">{verifiedCert.issueDate}</strong>
                  </div>

                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Certificate ID</span>
                    <strong className="font-mono text-[#0F8B6D]">{verifiedCert.certificateId}</strong>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-500 border-t border-emerald-200/50 dark:border-emerald-900/60 flex flex-wrap items-center justify-between gap-2">
                  <span>Signatory: <strong>Raghuveer (Founder, StudyVerse)</strong></span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Status: Verified Official</span>
                    <button
                      onClick={() => setShowCertModal(true)}
                      className="px-3 py-1 rounded-lg bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-bold text-xs shadow-2xs transition-all"
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-red-50/50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-center space-y-1">
                <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                <h4 className="font-semibold text-sm text-red-700 dark:text-red-300">
                  Certificate Not Found
                </h4>
                <p className="text-xs text-neutral-500">
                  No official record found for certificate ID &ldquo;{searchId}&rdquo;. Please verify the spelling or ID code.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Verified Certificate Modal */}
      {showCertModal && (
        <CertificateModal
          certificate={verifiedCert}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </div>
  );
};
