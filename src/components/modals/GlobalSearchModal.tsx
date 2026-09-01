import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  CheckSquare, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  Filter,
  Flame,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Task, ResourceItem, Course } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    tasks, 
    resources, 
    courses, 
    navigateTo,
    setActiveCourseId
  } = useApp();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'tasks' | 'resources' | 'courses'>('all');

  const filteredTasks = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tasks.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.subject.toLowerCase().includes(q) || 
      (t.description && t.description.toLowerCase().includes(q))
    );
  }, [tasks, query]);

  const filteredResources = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return resources.filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.subject.toLowerCase().includes(q) || 
      r.category.toLowerCase().includes(q) || 
      r.description.toLowerCase().includes(q)
    );
  }, [resources, query]);

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return courses.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q)
    );
  }, [courses, query]);

  if (!isSearchOpen) return null;

  const totalResults = 
    (filterType === 'all' || filterType === 'tasks' ? filteredTasks.length : 0) +
    (filterType === 'all' || filterType === 'resources' ? filteredResources.length : 0) +
    (filterType === 'all' || filterType === 'courses' ? filteredCourses.length : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl glass-dropdown p-4 sm:p-6 border border-[#0F8B6D]/20 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        {/* Search Input Header */}
        <div className="relative flex items-center border-b border-neutral-200/80 dark:border-neutral-800 pb-3">
          <Search className="w-5 h-5 text-[#0F8B6D] absolute left-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tasks, subjects, resources, guides, courses..."
            className="w-full pl-10 pr-10 py-2 bg-transparent text-sm sm:text-base text-[#171A19] dark:text-[#F7F4EA] placeholder-neutral-400 focus:outline-none font-medium"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar">
          {(['all', 'tasks', 'resources', 'courses'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all shrink-0 ${
                filterType === f
                  ? 'bg-[#0F8B6D] text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              {f}
            </button>
          ))}
          {query.trim() && (
            <span className="ml-auto text-[11px] text-neutral-400 shrink-0">
              {totalResults} matches
            </span>
          )}
        </div>

        {/* Search Results Content */}
        <div className="flex-1 overflow-y-auto pr-1 divide-y divide-neutral-100 dark:divide-neutral-800/60 mt-1">
          {!query.trim() ? (
            <div className="py-12 text-center text-xs text-neutral-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600 stroke-1" />
              <p>Type keywords to search across your whole study universe</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['Mathematics', 'Abhyas Deepika', 'Physics Diagrams', 'AI Essentials', 'Homework'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-300 hover:bg-[#0F8B6D]/10 hover:text-[#0F8B6D] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-400">
              No results found for &ldquo;<span className="text-[#0F8B6D] font-medium">{query}</span>&rdquo;
            </div>
          ) : (
            <>
              {/* Tasks Results */}
              {(filterType === 'all' || filterType === 'tasks') && filteredTasks.length > 0 && (
                <div className="py-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-[#0F8B6D]" />
                    <span>Tasks ({filteredTasks.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredTasks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('tasks');
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#0F8B6D]/5 dark:hover:bg-[#0F8B6D]/10 border border-transparent hover:border-[#0F8B6D]/20 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-xs text-[#171A19] dark:text-[#F7F4EA]">
                            {t.name}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500 mt-0.5">
                            <span className="font-medium text-[#0F8B6D]">{t.subject}</span>
                            <span>•</span>
                            <span>{t.taskType}</span>
                            <span>•</span>
                            <span>Due {t.dueDate}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources Results */}
              {(filterType === 'all' || filterType === 'resources') && filteredResources.length > 0 && (
                <div className="py-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0F8B6D]" />
                    <span>Resources ({filteredResources.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResources.map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          if (r.isExternal) {
                            window.open(r.link, '_blank');
                          } else {
                            navigateTo('resources');
                          }
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#0F8B6D]/5 dark:hover:bg-[#0F8B6D]/10 border border-transparent hover:border-[#0F8B6D]/20 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-xs text-[#171A19] dark:text-[#F7F4EA]">
                            {r.title}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500 mt-0.5">
                            <span className="font-medium text-[#0F8B6D]">{r.subject}</span>
                            <span>•</span>
                            <span>{r.category}</span>
                            <span>•</span>
                            <span>{r.fileSize || 'PDF'}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {(filterType === 'all' || filterType === 'courses') && filteredCourses.length > 0 && (
                <div className="py-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0F8B6D]" />
                    <span>Courses ({filteredCourses.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredCourses.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setActiveCourseId(c.id);
                          navigateTo('more', 'courses');
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#0F8B6D]/5 dark:hover:bg-[#0F8B6D]/10 border border-transparent hover:border-[#0F8B6D]/20 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-xs text-[#171A19] dark:text-[#F7F4EA]">
                            {c.title}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500 mt-0.5">
                            <span className="font-medium text-[#0F8B6D]">{c.level}</span>
                            <span>•</span>
                            <span>{c.duration}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
