import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Printer, 
  Download, 
  Sparkles, 
  GraduationCap,
  ArrowRight,
  Search,
  Plus,
  Edit3,
  Trash2,
  RefreshCw,
  Calendar,
  User,
  BookOpen,
  Hash,
  Share2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

const PRESET_COURSES = [
  'AI for Students: Study Smarter with Generative AI',
  'How to Study Effectively & Retain More',
  'Mastering Class 10 Mathematics & Trigonometry',
  'Deep Work, Focus & Time Management Mastery',
  'Physics: Motion, Optics & Electricity Fundamentals',
  'Organic & Inorganic Chemistry Revision Masterclass',
  'English Writing, Grammar & Comprehension Excellence',
];

export const MyCertificatesView: React.FC = () => {
  const { 
    certificates, 
    navigateTo, 
    createCustomCertificate, 
    deleteCertificate,
    user 
  } = useApp();

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for creating / generating a new certificate
  const [newName, setNewName] = useState(user?.name || 'Student Full Name');
  const [newCourse, setNewCourse] = useState(PRESET_COURSES[0]);
  const [isCustomCourse, setIsCustomCourse] = useState(false);
  const [customCourseTitle, setCustomCourseTitle] = useState('');
  const [newDate, setNewDate] = useState(
    new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  );
  const [customId, setCustomId] = useState('');

  // Generate random cert ID
  const handleRandomizeId = () => {
    const courseTitle = isCustomCourse ? customCourseTitle : newCourse;
    const cleanPrefix = courseTitle ? courseTitle.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase() : 'COURSE';
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    const generated = `SV-${cleanPrefix || 'COURSE'}-${new Date().getFullYear()}-${rand}`;
    setCustomId(generated);
  };

  const handleOpenCreateModal = () => {
    setNewName(user?.name || 'Student Full Name');
    handleRandomizeId();
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCourseTitle = isCustomCourse ? (customCourseTitle.trim() || 'StudyVerse Masterclass') : newCourse;
    if (!newName.trim() || !finalCourseTitle.trim()) return;

    const cert = await createCustomCertificate({
      studentName: newName.trim(),
      courseTitle: finalCourseTitle,
      issueDate: newDate.trim(),
      certificateId: customId.trim(),
    });

    setShowCreateModal(false);
    if (cert) {
      setSelectedCert(cert);
    }
  };

  const handleDelete = async (e: React.MouseEvent, certId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this certificate from your wallet?')) {
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
      {/* Header with quick creation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6A83A]/20 text-[#E6A83A] text-[11px] font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Credentials & Certificate Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            My Certificates
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Every certificate features a dynamic unique ID, authentic QR code, customized student name, course title, and issuance date.
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
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-bold text-xs shadow-md shadow-[#0F8B6D]/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Issue / Generate Certificate</span>
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
            {filteredCertificates.length} {filteredCertificates.length === 1 ? 'Certificate' : 'Certificates'} Available
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
              Complete interactive courses to earn verified credentials, or generate a custom certificate for any student name and subject using the certificate studio.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('more', 'courses')}
              className="px-5 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-bold text-xs shadow-md shadow-[#0F8B6D]/25 transition-all inline-flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Explore Free Courses</span>
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Custom Certificate</span>
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
                    <span>View / Edit</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE NEW CERTIFICATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl glass-dropdown p-5 sm:p-7 border border-[#E6A83A]/50 shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#0F8B6D]/15 text-[#0F8B6D] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900 dark:text-neutral-100">
                    Generate New Certificate
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Dynamic unique ID, QR code, student name, and course details
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              {/* Student Name */}
              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0F8B6D]" />
                  <span>Student Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Student Full Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                />
              </div>

              {/* Course Title Selection */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0F8B6D]" />
                    <span>Course Name</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomCourse(!isCustomCourse)}
                    className="text-[11px] text-[#0F8B6D] font-bold hover:underline"
                  >
                    {isCustomCourse ? 'Choose from Presets' : '+ Type Custom Course'}
                  </button>
                </div>

                {isCustomCourse ? (
                  <input
                    type="text"
                    required
                    value={customCourseTitle}
                    onChange={e => setCustomCourseTitle(e.target.value)}
                    placeholder="e.g. Mastering Class 10 Chemistry & Physics"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                  />
                ) : (
                  <select
                    value={newCourse}
                    onChange={e => setNewCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                  >
                    {PRESET_COURSES.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Date & Unique ID Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date */}
                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0F8B6D]" />
                    <span>Issued Date</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    placeholder="e.g. 28 August 2026"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                  />
                </div>

                {/* Dynamic Cert ID */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-[#0F8B6D]" />
                      <span>Certificate ID</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomizeId}
                      className="text-[11px] text-[#E6A83A] font-bold flex items-center gap-0.5 hover:underline"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Randomize</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={customId}
                    onChange={e => setCustomId(e.target.value.toUpperCase())}
                    placeholder="SV-COURSE-2026-XXXXX"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase focus:outline-none focus:border-[#0F8B6D]"
                  />
                </div>
              </div>

              {/* Live QR Code Preview Pill */}
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                <div className="p-1 bg-white rounded border border-neutral-300 shadow-2xs">
                  <QRCodeSVG value={`${window.location.origin}/#verify/${customId || 'DEMO'}`} size={42} />
                </div>
                <div className="space-y-0.5 text-[11px]">
                  <div className="font-bold text-neutral-800 dark:text-neutral-200">
                    Live Verifiable QR Code
                  </div>
                  <div className="text-neutral-500 font-mono text-[10px]">
                    Encodes: #verify/{customId || 'SV-COURSE-2026-XXXXX'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-md shadow-[#0F8B6D]/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main View / Edit Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
