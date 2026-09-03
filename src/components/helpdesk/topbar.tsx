'use client';

import { View } from './sidebar';

interface TopbarProps {
  onMobileMenu: () => void;
  onSearch: (term: string) => void;
  searchTerm: string;
  view: View;
  onNavigate: (view: View) => void;
}

export function Topbar({ onMobileMenu, onSearch, searchTerm, view, onNavigate }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center gap-4">
      <button
        onClick={onMobileMenu}
        className="lg:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-50"
        aria-label="Open menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 gap-2 max-w-md flex-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onNavigate('tickets');
          }}
          placeholder="Search tickets..."
          className="bg-transparent border-0 outline-none text-sm flex-1 text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Visual Preview
        </span>

        <button
          onClick={() => onNavigate('login')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-50"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Sign In
        </button>

        <div className="flex items-center gap-2.5 px-2 py-1 rounded-lg border border-slate-200">
          <span className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-blue-400 text-white text-sm font-bold flex items-center justify-center">
            G
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xs font-semibold text-slate-700">Guest</span>
            <span className="text-[11px] text-slate-500">Browsing as visitor</span>
          </div>
        </div>
      </div>
    </header>
  );
}
