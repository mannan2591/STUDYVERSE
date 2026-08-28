import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Atom, 
  Binary, 
  FlaskConical, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FormulaItem {
  id: string;
  title: string;
  category: 'Mathematics' | 'Physics' | 'Chemistry' | 'Computer Science';
  formula: string;
  description: string;
  variables?: string;
}

const FORMULAS_DATA: FormulaItem[] = [
  // Mathematics
  {
    id: 'math-quad',
    title: 'Quadratic Formula',
    category: 'Mathematics',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    description: 'Finds the roots of any quadratic equation ax² + bx + c = 0.',
    variables: 'a, b, c: coefficients; b²-4ac: discriminant (D)',
  },
  {
    id: 'math-trig-pyth',
    title: 'Pythagorean Trigonometric Identity',
    category: 'Mathematics',
    formula: 'sin²(θ) + cos²(θ) = 1',
    description: 'Fundamental trigonometric identity derived from the unit circle.',
    variables: 'θ: angle in radians or degrees',
  },
  {
    id: 'math-diff-power',
    title: 'Power Rule of Differentiation',
    category: 'Mathematics',
    formula: 'd/dx (xⁿ) = n · xⁿ⁻¹',
    description: 'Calculus derivative of any power function.',
    variables: 'n: real constant exponent',
  },
  {
    id: 'math-int-by-parts',
    title: 'Integration by Parts',
    category: 'Mathematics',
    formula: '∫ u dv = u·v - ∫ v du',
    description: 'Calculus rule for integrating the product of two functions.',
    variables: 'u, v: differentiable functions of x',
  },
  {
    id: 'math-ap-sum',
    title: 'Sum of Arithmetic Progression (AP)',
    category: 'Mathematics',
    formula: 'Sₙ = (n/2) · [2a + (n - 1)d]',
    description: 'Total sum of first n terms in an arithmetic progression.',
    variables: 'a: first term, d: common difference, n: number of terms',
  },

  // Physics
  {
    id: 'phy-kin-3',
    title: "Third Equation of Motion",
    category: 'Physics',
    formula: 'v² = u² + 2as',
    description: 'Relates final velocity, initial velocity, acceleration, and displacement.',
    variables: 'v: final velocity, u: initial velocity, a: acceleration, s: distance',
  },
  {
    id: 'phy-ohms-law',
    title: "Ohm's Law",
    category: 'Physics',
    formula: 'V = I · R',
    description: 'Fundamental law of electrical circuits relating potential, current, and resistance.',
    variables: 'V: Voltage (Volts), I: Current (Amperes), R: Resistance (Ohms)',
  },
  {
    id: 'phy-gravitation',
    title: "Newton's Law of Universal Gravitation",
    category: 'Physics',
    formula: 'F = G · (m₁ · m₂) / r²',
    description: 'Gravitational attraction force between two masses.',
    variables: 'G: 6.674×10⁻¹¹ N·m²/kg², m: masses, r: distance between centers',
  },
  {
    id: 'phy-snell',
    title: "Snell's Law of Refraction",
    category: 'Physics',
    formula: 'n₁ · sin(θ₁) = n₂ · sin(θ₂)',
    description: 'Describes the relationship between angles of incidence and refraction in optics.',
    variables: 'n: refractive indices, θ: incidence/refraction angles',
  },
  {
    id: 'phy-einstein',
    title: 'Mass-Energy Equivalence',
    category: 'Physics',
    formula: 'E = m · c²',
    description: "Einstein's principle of relativity showing mass-energy duality.",
    variables: 'E: energy (Joules), m: mass (kg), c: speed of light (3×10⁸ m/s)',
  },

  // Chemistry
  {
    id: 'chem-ideal-gas',
    title: 'Ideal Gas Law',
    category: 'Chemistry',
    formula: 'P · V = n · R · T',
    description: 'Relates pressure, volume, temperature, and moles of an ideal gas.',
    variables: 'P: pressure (atm/Pa), V: volume (L/m³), n: moles, R: gas constant, T: Kelvin temp',
  },
  {
    id: 'chem-nernst',
    title: 'Nernst Equation',
    category: 'Chemistry',
    formula: 'E = E° - (0.0591 / n) · log₁₀(Q)',
    description: 'Calculates the cell potential of an electrochemical cell under non-standard conditions at 298K.',
    variables: 'E: cell EMF, E°: standard EMF, n: electrons transferred, Q: reaction quotient',
  },
  {
    id: 'chem-molarity',
    title: 'Molarity (M)',
    category: 'Chemistry',
    formula: 'M = moles of solute / volume of solution (in Liters)',
    description: 'Standard measure of chemical concentration in solutions.',
    variables: 'Unit: mol/L or M',
  },
  {
    id: 'chem-ph',
    title: 'pH Definition',
    category: 'Chemistry',
    formula: 'pH = -log₁₀[H⁺]',
    description: 'Measures hydrogen ion concentration and acidity/alkalinity scale.',
    variables: '[H⁺]: molar concentration of hydrogen ions',
  },

  // Computer Science
  {
    id: 'cs-binary-search',
    title: 'Binary Search Time Complexity',
    category: 'Computer Science',
    formula: 'T(n) = O(log₂ n)',
    description: 'Time complexity for searching in a sorted array by halving search space.',
    variables: 'n: number of elements in the array',
  },
  {
    id: 'cs-de-morgans',
    title: "De Morgan's Boolean Laws",
    category: 'Computer Science',
    formula: '¬(A ∧ B) = ¬A ∨ ¬B  and  ¬(A ∨ B) = ¬A ∧ ¬B',
    description: 'Boolean algebra transformations for logic gates and programming conditionals.',
    variables: 'A, B: boolean variables (0/1)',
  }
];

export const FormulaSheetsView: React.FC = () => {
  const { addNotification } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = useMemo(() => {
    return FORMULAS_DATA.filter(f => {
      const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
      const matchesSearch = 
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.formula.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const handleCopy = (item: FormulaItem) => {
    navigator.clipboard.writeText(`${item.title}: ${item.formula}`);
    setCopiedId(item.id);
    addNotification('Copied to Clipboard', `Formula "${item.title}" copied!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Quick Cheat Sheet</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A19] dark:text-[#F7F4EA] tracking-tight">
          Formula Reference & Quick Lookup
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Essential equations, laws, and constants across Mathematics, Physics, Chemistry, and Computer Science.
        </p>
      </div>

      {/* Search & Subject Tabs */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search equations, topics (e.g., Ohm's law, quadratic, derivative)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'ALL', label: 'All Disciplines' },
            { id: 'Mathematics', label: 'Mathematics' },
            { id: 'Physics', label: 'Physics' },
            { id: 'Chemistry', label: 'Chemistry' },
            { id: 'Computer Science', label: 'Computer Science' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#0F8B6D] text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map(item => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl glass-panel border border-neutral-200/80 dark:border-neutral-800 hover:border-[#0F8B6D]/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0F8B6D]/10 text-[#0F8B6D]">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-[#0F8B6D] hover:bg-[#0F8B6D]/10 transition-colors flex items-center gap-1 text-[11px] font-medium"
                    title="Copy Formula"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-[#0F8B6D]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>

                {/* Formula Highlight Box */}
                <div className="my-3 p-3.5 rounded-2xl bg-neutral-900 text-emerald-300 dark:bg-black/80 font-mono text-xs sm:text-sm font-semibold border border-neutral-800 overflow-x-auto">
                  {item.formula}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.variables && (
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
                  <span className="font-semibold text-neutral-500">Variables:</span> {item.variables}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
