import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  RotateCw, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  BookOpen,
  Award,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Flashcard {
  id: string;
  subject: string;
  topic: string;
  question: string;
  answer: string;
  hint?: string;
}

const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subject: 'Biology',
    topic: 'Cell Biology',
    question: 'What is the powerhouse of the cell and what molecule does it generate?',
    answer: 'The Mitochondrion! It produces ATP (Adenosine Triphosphate) through cellular respiration.',
    hint: 'Think of cellular energy currency.',
  },
  {
    id: 'fc-2',
    subject: 'Physics',
    topic: 'Electromagnetism',
    question: 'State Faraday\'s Law of Electromagnetic Induction.',
    answer: 'The magnitude of induced EMF in a circuit is directly proportional to the time rate of change of magnetic flux through the circuit: ε = -dΦ/dt.',
    hint: 'Discovered in 1831 involving coil and magnet.',
  },
  {
    id: 'fc-3',
    subject: 'Mathematics',
    topic: 'Calculus',
    question: 'What is the derivative of e^(2x) with respect to x?',
    answer: '2 · e^(2x) (by applying the chain rule: d/dx[e^u] = e^u · du/dx).',
    hint: 'Differentiate the exponent 2x and multiply.',
  },
  {
    id: 'fc-4',
    subject: 'Chemistry',
    topic: 'Periodic Table',
    question: 'Why does electronegativity increase across a period from left to right?',
    answer: 'Because the effective nuclear charge increases while electron shielding remains approximately constant, pulling electrons closer to the nucleus.',
    hint: 'More protons in nucleus with same number of shells.',
  },
  {
    id: 'fc-5',
    subject: 'Computer Science',
    topic: 'Data Structures',
    question: 'What is the average and worst-case time complexity of QuickSort?',
    answer: 'Average: O(n log n), Worst-case: O(n²) when the pivot chosen is consistently the smallest or largest element.',
    hint: 'Divide and conquer partitioning technique.',
  },
  {
    id: 'fc-6',
    subject: 'General Science',
    topic: 'Thermodynamics',
    question: 'What does the Second Law of Thermodynamics state regarding entropy?',
    answer: 'The total entropy of an isolated system can never decrease over time; spontaneous processes always increase the total entropy of the universe (ΔS_universe > 0).',
    hint: 'Tendency towards molecular disorder.',
  }
];

export const FlashcardsView: React.FC = () => {
  const { addNotification } = useApp();
  const [cards, setCards] = useState<Flashcard[]>(SAMPLE_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  const handleMarkMastered = () => {
    setKnownCount(prev => prev + 1);
    addNotification('Card Mastered! ✨', 'Great recall! Marked as known.');
    handleNext();
  };

  const handleMarkNeedsReview = () => {
    setReviewCount(prev => prev + 1);
    handleNext();
  };

  const handleResetDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setReviewCount(0);
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6A83A]/10 text-[#E6A83A] text-[11px] font-bold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Active Recall Revision</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
            Study Flashcards Deck
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Test yourself with spaced repetition flashcards. Tap the card to flip between question and answer.
          </p>
        </div>

        <button
          onClick={handleResetDeck}
          className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Deck</span>
        </button>
      </div>

      {/* Progress Counters */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl glass-panel text-center">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Card Progress</span>
          <strong className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">
            {currentIndex + 1} / {cards.length}
          </strong>
        </div>
        <div className="p-4 rounded-2xl glass-panel text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Mastered</span>
          <strong className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
            {knownCount}
          </strong>
        </div>
        <div className="p-4 rounded-2xl glass-panel text-center">
          <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">Review Later</span>
          <strong className="text-base font-extrabold text-amber-600 dark:text-amber-400">
            {reviewCount}
          </strong>
        </div>
      </div>

      {/* Interactive 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[320px] sm:min-h-[360px] p-8 sm:p-12 rounded-3xl glass-panel border-2 border-[#0F8B6D]/30 hover:border-[#0F8B6D] transition-all flex flex-col justify-between items-center text-center shadow-lg relative select-none"
      >
        <div className="w-full flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[#0F8B6D]/15 text-[#0F8B6D] text-xs font-bold">
            {currentCard.subject} • {currentCard.topic}
          </span>
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Tap anywhere to flip</span>
          </span>
        </div>

        <div className="py-6 max-w-lg">
          {!isFlipped ? (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-neutral-400 block">
                Question #{currentIndex + 1}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-snug">
                {currentCard.question}
              </h2>
              {currentCard.hint && (
                <p className="text-xs text-neutral-400 italic">
                  💡 Hint: {currentCard.hint}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F8B6D] block">
                Explanation & Answer
              </span>
              <p className="text-base sm:text-xl font-semibold text-[#0F8B6D] dark:text-emerald-400 leading-relaxed">
                {currentCard.answer}
              </p>
            </div>
          )}
        </div>

        <div className="text-xs text-neutral-400 font-medium">
          {!isFlipped ? '👀 Click to reveal answer' : '🔄 Click to flip back'}
        </div>
      </div>

      {/* Action Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 transition-all active:scale-95"
          title="Previous Card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkNeedsReview}
            className="px-4 sm:px-6 py-3 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
            <span>Need Practice</span>
          </button>

          <button
            onClick={handleMarkMastered}
            className="px-4 sm:px-6 py-3 rounded-2xl bg-[#0F8B6D] text-white hover:bg-[#0A6650] text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Mastered!</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 transition-all active:scale-95"
          title="Next Card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
