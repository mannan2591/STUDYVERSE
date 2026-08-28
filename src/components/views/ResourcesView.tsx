import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  Download, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  FolderOpen,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResourceCategory, ResourceItem } from '../../types';
import { SUBJECT_COLORS } from '../../data/initialData';

export const ResourcesView: React.FC = () => {
  const { resources, subjects } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories: ('ALL' | ResourceCategory)[] = [
    'ALL',
    'Revision Material',
    'Notes',
    'Question Papers',
    'Important Questions',
    'Diagrams',
    'Study Guides',
    'Other',
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const matchesSearch = 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubject === 'ALL' || r.subject === selectedSubject || r.subject === 'All Subjects';
      const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;

      return matchesSearch && matchesSubject && matchesCategory;
    });
  }, [resources, searchQuery, selectedSubject, selectedCategory]);

  return (
    <div className="space-y-6 pb-24 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Academic Resources
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Curated study notes, formula sheets, ray diagrams, question banks, and blueprints.
          </p>
        </div>
      </div>

      {/* 2. FEATURED RESOURCE: 10TH CLASS ABHYAS DEEPIKA ALL SUBJECTS */}
      <div className="rounded-2xl glass-panel border border-[#0F8B6D]/30 p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#0F8B6D] uppercase tracking-wider">
              Official State Board Repository
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              10th Class Abhyas Deepika All Subjects
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Official comprehensive study blueprint, question banks, practice exercises, and model exam sets for SSC 10th Class board examination covering Telugu, Hindi, English, Maths, Science, and Social.
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-[#0F8B6D]">Google Drive Folder</span>
              <span>•</span>
              <span>All Subjects Included</span>
              <span>•</span>
              <span>Free Academic Access</span>
            </div>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Open Google Drive</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notes, diagrams, question papers, formulas..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-neutral-100 dark:border-neutral-800">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
              }`}
            >
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. RESOURCE CARDS GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
          <span>Available Resources ({filteredResources.length})</span>
          <span>Google Drive & PDF Links</span>
        </div>

        {filteredResources.length === 0 ? (
          <div className="p-12 rounded-2xl glass-panel text-center text-xs text-neutral-400 space-y-2">
            <FolderOpen className="w-8 h-8 mx-auto text-neutral-400" />
            <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">No resources match your search or filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('ALL');
                setSelectedCategory('ALL');
              }}
              className="text-[#0F8B6D] font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredResources.map(resource => {
              const colorInfo = SUBJECT_COLORS[resource.subject] || {
                badge: 'bg-[#0F8B6D] text-white',
                bg: 'bg-emerald-50 dark:bg-emerald-950/40',
                border: 'border-emerald-200 dark:border-emerald-800',
              };

              return (
                <div
                  key={resource.id}
                  className="p-4 rounded-2xl glass-panel hover:border-[#0F8B6D]/50 transition-all duration-150 flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2">
                    {/* Top Tags */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${colorInfo.badge}`}>
                        {resource.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-medium">
                        {resource.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-[#0F8B6D] transition-colors">
                      {resource.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                  </div>

                  {/* Footer with Metadata & OPEN Button */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
                    <div className="text-[10px] text-neutral-400">
                      <div>{resource.fileSize || 'PDF Document'}</div>
                      {resource.author && <div>{resource.author}</div>}
                    </div>

                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#0F8B6D] hover:bg-[#0A6650] active:scale-95 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
