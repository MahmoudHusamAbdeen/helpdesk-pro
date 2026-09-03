'use client';

import { STATS, CATEGORY_BREAKDOWN, CATEGORIES, TICKETS, Ticket } from '@/lib/helpdesk-data';
import { StatusBadge, PriorityBadge, CategoryIcon } from './badges';
import { View } from './sidebar';

interface DashboardViewProps {
  onTicketClick: (ticket: Ticket) => void;
  onNavigate: (view: View) => void;
}

export function DashboardView({ onTicketClick, onNavigate }: DashboardViewProps) {
  const recentTickets = [...TICKETS].slice(0, 8);
  const maxCat = Math.max(...CATEGORY_BREAKDOWN.map((c) => c.count), 1);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Welcome to the public HelpDesk Pro dashboard — sign in to create or manage tickets.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('tickets')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-50"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            View All Tickets
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon="ticket" value={STATS.total} label="Total Tickets" color="from-blue-600 to-blue-400" />
        <StatCard icon="inbox" value={STATS.open} label="Open" color="from-cyan-600 to-cyan-400" />
        <StatCard icon="hourglass" value={STATS.inProgress} label="In Progress" color="from-amber-500 to-amber-300" />
        <StatCard icon="check" value={STATS.resolved} label="Resolved" color="from-emerald-600 to-emerald-400" />
        <StatCard icon="archive" value={STATS.closed} label="Closed" color="from-slate-500 to-slate-400" />
        <StatCard icon="alert" value={STATS.high} label="High Priority" color="from-red-500 to-red-400" />
      </div>

      {/* Recent + Sidebar widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent tickets */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Recent Tickets
            </h3>
            <button
              onClick={() => onNavigate('tickets')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Ticket #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => onTicketClick(ticket)}
                    className="border-b border-slate-100 last:border-0 hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {ticket.ticketNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800 text-sm">{ticket.title.length > 50 ? ticket.title.slice(0, 50) + '…' : ticket.title}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <CategoryIcon category={ticket.category} />
                        {CATEGORIES[ticket.category]}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                        {ticket.department}
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={ticket.status} /></td>
                    <td className="px-4 py-3"><PriorityBadge priority={ticket.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                By Category
              </h3>
            </div>
            <div className="p-5 space-y-3.5">
              {CATEGORY_BREAKDOWN.map((cat) => {
                const percent = (cat.count / maxCat) * 100;
                return (
                  <div key={cat.key}>
                    <div className="flex justify-between items-center mb-1.5 text-sm">
                      <span className="flex items-center gap-2 text-slate-700">
                        <CategoryIcon category={cat.key} />
                        {CATEGORIES[cat.key]}
                      </span>
                      <span className="font-semibold text-slate-800">{cat.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Team
            </h3>
            <div className="text-center py-2">
              <div className="text-3xl font-bold text-blue-600">10</div>
              <div className="text-xs text-slate-500 mt-1">Registered Users</div>
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-start gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500 mt-0.5 flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              You're viewing as a guest. Sign in to interact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: 'ticket' | 'inbox' | 'hourglass' | 'check' | 'archive' | 'alert';
  value: number;
  label: string;
  color: string;
}) {
  const icons = {
    ticket: (
      <path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
    ),
    inbox: (
      <>
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </>
    ),
    hourglass: (
      <>
        <path d="M6 2v6a6 6 0 0 0 12 0V2" />
        <path d="M6 22v-6a6 6 0 0 1 12 0v6" />
      </>
    ),
    check: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
    archive: (
      <>
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </>
    ),
    alert: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icons[icon]}
        </svg>
      </div>
      <div>
        <div className="text-2xl font-extrabold text-slate-900 leading-tight">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}
