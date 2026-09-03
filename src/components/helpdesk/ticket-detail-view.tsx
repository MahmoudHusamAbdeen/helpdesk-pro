'use client';

import { Ticket, CATEGORIES, STATUSES, PRIORITIES, ROLE_LABELS } from '@/lib/helpdesk-data';
import { StatusBadge, PriorityBadge } from './badges';
import { View } from './sidebar';

interface TicketDetailViewProps {
  ticket: Ticket;
  onBack: () => void;
  onNavigate: (view: View) => void;
}

export function TicketDetailView({ ticket, onBack, onNavigate }: TicketDetailViewProps) {
  return (
    <div className="space-y-5">
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Tickets
      </button>

      {/* Ticket header card */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded">
              {ticket.ticketNumber}
            </span>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-3">{ticket.title}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            {CATEGORIES[ticket.category]}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
            </svg>
            {ticket.department}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {ticket.user.name}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {ticket.createdAt}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column: description + comments */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Description
              </h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Comments
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold">
                  {ticket.comments.length}
                </span>
              </h3>
            </div>
            <div className="p-5">
              {ticket.comments.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 text-slate-300">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <p className="text-sm">No comments yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ticket.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className={`w-9 h-9 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0 ${roleAvatarClass(comment.user.role)}`}>
                        {comment.user.name[0]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-slate-800 text-sm">{comment.user.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {ROLE_LABELS[comment.user.role]}
                          </span>
                          <span className="text-xs text-slate-400 ml-auto">{comment.createdAt}</span>
                        </div>
                        <div className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3 leading-relaxed">
                          {comment.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>
                    <strong>Sign in</strong> to add a comment. Guests can view but not post.
                  </span>
                  <button
                    onClick={() => onNavigate('login')}
                    className="ml-auto text-blue-600 text-xs font-semibold hover:text-blue-700"
                  >
                    Sign In →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar column: details + history */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Ticket Details
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <DetailRow label="Status">
                <StatusBadge status={ticket.status} />
              </DetailRow>
              <DetailRow label="Priority">
                <PriorityBadge priority={ticket.priority} />
              </DetailRow>
              <DetailRow label="Category">
                <span className="text-sm text-slate-700">{CATEGORIES[ticket.category]}</span>
              </DetailRow>
              <DetailRow label="Department">
                <span className="text-sm text-slate-700">{ticket.department}</span>
              </DetailRow>
              <DetailRow label="Created by">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded text-white text-xs font-bold flex items-center justify-center ${roleAvatarClass(ticket.user.role)}`}>
                    {ticket.user.name[0]}
                  </span>
                  <div>
                    <div className="text-sm text-slate-800">{ticket.user.name}</div>
                    <div className="text-xs text-slate-500">{ticket.user.email}</div>
                  </div>
                </div>
              </DetailRow>
              <DetailRow label="Assigned to">
                {ticket.technician ? (
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded text-white text-xs font-bold flex items-center justify-center ${roleAvatarClass(ticket.technician.role)}`}>
                      {ticket.technician.name[0]}
                    </span>
                    <div>
                      <div className="text-sm text-slate-800">{ticket.technician.name}</div>
                      <div className="text-xs text-slate-500">{ticket.technician.email}</div>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400 italic">Unassigned</span>
                )}
              </DetailRow>
              <DetailRow label="Created">
                <span className="text-sm text-slate-700">{ticket.createdAt}</span>
              </DetailRow>
              <DetailRow label="Last updated">
                <span className="text-sm text-slate-700">{ticket.updatedAt}</span>
              </DetailRow>
            </div>
          </div>

          {/* History timeline */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <polyline points="3 3 3 8 8 8" />
                  <path d="M12 7v5l4 2" />
                </svg>
                History
              </h3>
            </div>
            <div className="p-5">
              <ol className="relative border-l-2 border-slate-200 ml-2 space-y-4">
                {ticket.history.map((h, i) => (
                  <li key={h.id} className="ml-4 relative">
                    <span className={`absolute -left-[1.4rem] top-1 w-3 h-3 rounded-full border-2 border-white ${historyDotClass(h.action)}`} />
                    <div className="text-[10px] font-bold uppercase tracking-wide text-slate-700">{h.action}</div>
                    <div className="text-sm text-slate-700 mt-0.5">{h.description}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {h.user && <span>{h.user.name} · </span>}
                      <span>{h.createdAt}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function roleAvatarClass(role: string): string {
  switch (role) {
    case 'admin':
      return 'bg-gradient-to-br from-purple-600 to-violet-400';
    case 'technician':
      return 'bg-gradient-to-br from-cyan-600 to-cyan-400';
    default:
      return 'bg-gradient-to-br from-slate-600 to-slate-400';
  }
}

function historyDotClass(action: string): string {
  if (action.includes('Created')) return 'bg-blue-600 ring-blue-600';
  if (action.includes('Status')) return 'bg-amber-500 ring-amber-500';
  if (action.includes('Priority')) return 'bg-red-500 ring-red-500';
  if (action.includes('Assigned')) return 'bg-cyan-600 ring-cyan-600';
  if (action.includes('Comment')) return 'bg-slate-500 ring-slate-500';
  if (action.includes('Closed')) return 'bg-slate-700 ring-slate-700';
  if (action.includes('Reopened')) return 'bg-emerald-500 ring-emerald-500';
  return 'bg-blue-600 ring-blue-600';
}
