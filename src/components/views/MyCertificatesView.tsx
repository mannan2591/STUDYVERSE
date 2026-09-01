import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  GraduationCap,
  Search,
  Trash2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

export const MyCertificatesView: React.FC = () => {
  const { 
    certificates, 
    navigateTo, 
    deleteCertificate 
  } = useApp();

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (e: React.MouseEvent, certId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this certificate from your view?')) {
      await deleteCertificate(certId);
    }
  };

  // Filtered certificates list
  const filteredCertificates = certificates.filter(cert => 
    cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6A83A]/20 text-[#E6A83A] text-[11px] font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Earned Course Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            My Certificates
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Official verifiable credentials earned by completing interactive masterclasses.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigateTo('more', 'verify')}
            className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#0F8B6D]" />
            <span>Verification Portal</span>
          </button>

          <button
            onClick={() => navigateTo('more', 'courses')}
            className="px-4 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-bold text-xs shadow-md shadow-[#0F8B6D]/20 transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Go to Courses</span>
          </button>
        </div>
      </div>

      {/* Search Bar if certificates exist */}
      {certificates.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by student name, course, or certificate ID..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
            />
          </div>
          <span className="text-xs text-neutral-500 font-semibold shrink-0">
            {filteredCertificates.length} {filteredCertificates.length === 1 ? 'Certificate' : 'Certificates'} Earned
          </span>
        </div>
      )}

      {/* Certificates Cards */}
      {certificates.length === 0 ? (
        <div className="p-12 rounded-3xl glass-panel border border-[#0F8B6D]/15 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#E6A83A]/15 text-[#E6A83A] flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-[#171A19] dark:text-[#F7F4EA]">
              No Certificates Earned Yet
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              Certificates are awarded upon completing 100% of an interactive masterclass and passing the final quiz. Start learning today to earn your credentials!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('more', 'courses')}
              className="px-5 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-bold text-xs shadow-md shadow-[#0F8B6D]/25 transition-all inline-flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Explore Courses</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCertificates.map(cert => (
            <div
              key={cert.id || cert.certificateId}
              onClick={() => setSelectedCert(cert)}
              className="p-5 sm:p-6 rounded-3xl glass-panel border-2 border-[#E6A83A]/40 hover:border-[#E6A83A] transition-all flex flex-col justify-between shadow-md group relative overflow-hidden cursor-pointer"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/20 to-transparent pointer-events-none"></div>

              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#083B2C] to-[#0F8B6D] text-amber-400 flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-neutral-400 block uppercase">
                      ISSUED DATE
                    </span>
                    <span className="text-xs font-bold text-[#171A19] dark:text-[#F7F4EA]">
                      {cert.issueDate}
                    </span>
                  </div>
                </div>

                {/* Body details */}
                <div>
                  <div className="inline-block px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono font-bold text-[#0F8B6D] tracking-wider mb-1.5 border border-neutral-200 dark:border-neutral-700">
                    {cert.certificateId}
                  </div>
                  <h3 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA] leading-snug">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                    Presented to:{' '}
                    <span className="text-[#0A5C44] dark:text-emerald-400 font-bold text-sm">
                      {cert.studentName}
                    </span>
                  </p>
                </div>
              </div>

              {/* Bottom bar with QR code & Actions */}
              <div className="pt-4 mt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded border border-neutral-200 shadow-2xs">
                    <QRCodeSVG value={cert.verificationUrl} size={36} />
                  </div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider hidden sm:inline">
                    Scan to<br/>Verify
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleDelete(e, cert.id || cert.certificateId)}
                    className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete Certificate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main View Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
