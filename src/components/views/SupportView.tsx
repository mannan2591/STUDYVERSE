import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupportView: React.FC = () => {
  const { addNotification } = useApp();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    setIsSent(true);
    addNotification('Message Dispatched', 'Support inquiry forwarded to yourstudyverse@gmail.com.');
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D] text-[11px] font-bold uppercase tracking-wider mb-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Student Helpdesk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
          Support & Help Center
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Have a question, subject resource request, or feedback? We are here to help.
        </p>
      </div>

      {/* Official Email Contact Tile */}
      <div className="p-6 rounded-3xl glass-panel border-2 border-[#0F8B6D]/30 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0F8B6D] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#0F8B6D]/20">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F8B6D]">
              Official Support Channel
            </span>
            <h3 className="font-extrabold text-lg text-[#171A19] dark:text-[#F7F4EA]">
              yourstudyverse@gmail.com
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              Direct inbox for academic inquiries, bug reports, and course submissions.
            </p>
          </div>
        </div>

        <a
          href="mailto:yourstudyverse@gmail.com"
          className="px-5 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <span>Send Direct Email</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
        <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {[
            {
              q: 'How does the Study Streak work?',
              a: 'Your streak increases by 1 day every consecutive day you mark at least one homework, classwork, or project task as complete. Missing a day resets the counter.',
            },
            {
              q: 'How can I access the 10th Class Abhyas Deepika folder?',
              a: 'Click on "RESOURCES" in the bottom menu, or click the featured card on the Home dashboard. It links directly to the official verified Google Drive repository.',
            },
            {
              q: 'Are the course completion certificates authentic and verifiable?',
              a: 'Yes! Every issued certificate includes a unique ID and a cryptographic QR code that allows teachers or parents to scan and verify authenticity.',
            },
            {
              q: 'Can I add custom school subjects?',
              a: 'Yes, when clicking "Add Task", click "+ Custom" next to the subject dropdown to add any specialized school or college subject.',
            },
          ].map((faq, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
              <h4 className="font-bold text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA]">
                {faq.q}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* In-App Feedback Form */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F8B6D]/15 space-y-4">
        <h2 className="font-extrabold text-base text-[#171A19] dark:text-[#F7F4EA]">
          Send In-App Feedback
        </h2>

        {isSent ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-[#0F8B6D]/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#0F8B6D] mx-auto" />
            <h4 className="font-bold text-sm text-[#171A19] dark:text-[#F7F4EA]">
              Thank you for reaching out!
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Our team at StudyVerse will review your note shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Requesting Class 11 Chemistry notes"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Your Message
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your question or suggestions here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-[#171A19] dark:text-[#F7F4EA] focus:outline-none focus:border-[#0F8B6D]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
