'use client';

import { useState, useMemo } from 'react';
import {
  TICKETS,
  Ticket,
  CATEGORIES,
  STATUSES,
  PRIORITIES,
  Status,
  Priority,
  Category,
  USERS,
} from '@/lib/helpdesk-data';
import { StatusBadge, PriorityBadge, CategoryIcon } from './badges';

interface TicketsViewProps {
  onTicketClick: (ticket: Ticket) => void;
  externalSearch: string;
  onSearchChange: (term: string) => void;
}

type StatusFilter = '' | Status;
type PriorityFilter = '' | Priority;
type CategoryFilter = '' | Category;

export function TicketsView({ onTicketClick, externalSearch, onSearchChange }: TicketsViewProps) {
  const [status, setStatus] = useState<StatusFilter>('');
  const [priority, setPriority] = useState<PriorityFilter>('');
  const [category, setCategory] = useState<CategoryFilter>('');
  const [assignedTo, setAssignedTo] = useState<'' | 'unassigned' | 'any'>('');

  const search = externalSearch;

  const filtered = useMemo(() => {
    return TICKETS.filter((t) => {
      if (search) {
        const q = search.toLowerCase();
        const matches =
          t.ticketNumber.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.department.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (status && t.status !== status) return false;
      if (priority && t.priority !== priority) return false;
      if (category && t.category !== category) return false;
      if (assignedTo === 'unassigned' && t.technician) return false;
      if (assignedTo === 'any' && !t.technician) return false;
      return true;
    });
  }, [search, status, priority, category, assignedTo]);

  const technicians = USERS.filter((u) => u.role === 'technician');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Tickets</h1>
          <p className="text-sm text-slate-500">
            Browsing all tickets as a guest. Sign in to create or manage tickets.
          </p>
        </div>
      </div>

      {/* Filters card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title, description, ticket #..."
              className="bg-transparent border-0 outline-none text-sm flex-1 py-2 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">All Statuses</option>
            {Object.entries(STATUSES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as PriorityFilter)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">All Priorities</option>
            {Object.entries(PRIORITIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryFilter)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">All Categories</option>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value as '' | 'unassigned' | 'any')}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">All Assignments</option>
            <option value="any">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>

        {(search || status || priority || category || assignedTo) && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">Active filters:</span>
            {search && <FilterChip label={`Search: "${search}"`} onClear={() => onSearchChange('')} />}
            {status && <FilterChip label={`Status: ${STATUSES[status]}`} onClear={() => setStatus('')} />}
            {priority && <FilterChip label={`Priority: ${PRIORITIES[priority]}`} onClear={() => setPriority('')} />}
            {category && <FilterChip label={`Category: ${CATEGORIES[category]}`} onClear={() => setCategory('')} />}
            {assignedTo && (
              <FilterChip
                label={assignedTo === 'unassigned' ? 'Unassigned only' : 'Assigned only'}
                onClear={() => setAssignedTo('')}
              />
            )}
            <button
              onClick={() => { onSearchChange(''); setStatus(''); setPriority(''); setCategory(''); setAssignedTo(''); }}
              className="text-xs text-red-500 hover:text-red-600 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Tickets table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 text-slate-300">
              <path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
            </svg>
            <p>No tickets match your filters.</p>
            <button
              onClick={() => { onSearchChange(''); setStatus(''); setPriority(''); setCategory(''); setAssignedTo(''); }}
              className="text-blue-600 text-sm mt-2"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Ticket #</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                    <th className="hidden xl:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Technician</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ticket) => (
                    <tr
                      key={ticket.id}
                      onClick={() => onTicketClick(ticket)}
                      className="border-b border-slate-100 last:border-0 hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {ticket.ticketNumber}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-800 text-sm">
                          {ticket.title.length > 55 ? ticket.title.slice(0, 55) + '…' : ticket.title}
                        </div>
                        <div className="text-xs text-slate-500 md:hidden flex items-center gap-1 mt-0.5">
                          <CategoryIcon category={ticket.category} />
                          {CATEGORIES[ticket.category]}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                          <CategoryIcon category={ticket.category} />
                          {CATEGORIES[ticket.category]}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                          {ticket.department}
                        </span>
                      </td>
                      <td className="px-4 py-3.5"><StatusBadge status={ticket.status} /></td>
                      <td className="px-4 py-3.5"><PriorityBadge priority={ticket.priority} /></td>
                      <td className="hidden xl:table-cell px-4 py-3.5">
                        {ticket.technician ? (
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-gradient-to-br from-cyan-600 to-cyan-400 text-white text-[10px] font-bold flex items-center justify-center">
                              {ticket.technician.name[0]}
                            </span>
                            <span className="text-xs text-slate-700">{ticket.technician.name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="hidden md:table-cell px-4 py-3.5">
                        <span className="text-xs text-slate-500">{ticket.createdAt}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span>
                Showing 1–{filtered.length} of {filtered.length} tickets
              </span>
              <div className="flex gap-1">
                <button className="px-3 py-1 rounded border border-slate-200 text-slate-400 cursor-not-allowed" disabled>
                  ‹ Prev
                </button>
                <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
                <button className="px-3 py-1 rounded border border-slate-200 text-slate-400 cursor-not-allowed" disabled>
                  Next ›
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Technicians reference card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          Available Technicians
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {technicians.map((tech) => {
            const assignedCount = TICKETS.filter((t) => t.technician?.id === tech.id).length;
            return (
              <div key={tech.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-400 text-white text-sm font-bold flex items-center justify-center">
                  {tech.name[0]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{tech.name}</div>
                  <div className="text-xs text-slate-500 truncate">{tech.email}</div>
                </div>
                <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                  {assignedCount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium">
      {label}
      <button onClick={onClear} className="hover:text-blue-900">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </span>
  );
}
