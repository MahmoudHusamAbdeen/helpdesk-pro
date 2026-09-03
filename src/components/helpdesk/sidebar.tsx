'use client';

import { RoleBadge } from './badges';

export type View = 'dashboard' | 'tickets' | 'ticket-detail' | 'login';

interface SidebarProps {
  view: View;
  onNavigate: (view: View) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  key: View;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    key: 'tickets',
    label: 'All Tickets',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
        <line x1="13" y1="5" x2="13" y2="19" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    key: 'login',
    label: 'Login Preview',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    ),
  },
];

export function Sidebar({ view, onNavigate, isMobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-white text-lg font-bold"
          >
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </span>
            <span>
              HelpDesk <span className="text-blue-400">Pro</span>
            </span>
          </button>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Menu
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = view === item.key || (item.key === 'tickets' && view === 'ticket-detail');
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-5 flex justify-center">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="px-3 mt-6 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Demo Accounts
          </div>
          <div className="px-3 py-2 rounded-lg bg-white/5 space-y-2">
            <DemoAccountRow color="from-purple-600 to-violet-400" letter="A" name="Admin" email="admin@helpdesk.test" />
            <DemoAccountRow color="from-cyan-600 to-cyan-400" letter="S" name="Technician" email="tech@helpdesk.test" />
            <DemoAccountRow color="from-slate-600 to-slate-400" letter="A" name="Employee" email="ahmed@helpdesk.test" />
            <p className="text-[10px] text-slate-500 pt-1">Password: <span className="font-mono text-slate-300">password</span></p>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-white/5">
          <div className="px-3 py-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Preview Mode · Laravel 10
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function DemoAccountRow({
  color,
  letter,
  name,
  email,
}: {
  color: string;
  letter: string;
  name: string;
  email: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`w-7 h-7 rounded-md bg-gradient-to-br ${color} text-white text-xs font-bold flex items-center justify-center`}>
        {letter}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-slate-200">{name}</div>
        <div className="text-[10px] text-slate-500 truncate">{email}</div>
      </div>
    </div>
  );
}
