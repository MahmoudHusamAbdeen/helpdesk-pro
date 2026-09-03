import { Status, Priority, STATUSES, PRIORITIES } from '@/lib/helpdesk-data';

const STATUS_STYLES: Record<Status, string> = {
  open: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  resolved: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-slate-100 text-slate-600',
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-sky-100 text-sky-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUSES[status]}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${PRIORITY_STYLES[priority]}`}
    >
      {priority === 'high' && (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.982 1.566a.5.5 0 0 0-.964 0L4.5 12.5h7L8.982 1.566zM7.5 13h1v2h-1v-2z" />
        </svg>
      )}
      {PRIORITIES[priority]}
    </span>
  );
}

const ROLE_STYLES: Record<string, string> = {
  admin: 'bg-gradient-to-br from-purple-600 to-violet-400 text-white',
  technician: 'bg-gradient-to-br from-cyan-600 to-cyan-400 text-white',
  employee: 'bg-gradient-to-br from-slate-600 to-slate-400 text-white',
};

export function RoleBadge({ role }: { role: string }) {
  const labels: Record<string, string> = {
    admin: 'Administrator',
    technician: 'Technician',
    employee: 'Employee',
  };
  return (
    <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${ROLE_STYLES[role]}`}>
      {labels[role]}
    </span>
  );
}

export function CategoryIcon({ category }: { category: string }) {
  const paths: Record<string, React.ReactNode> = {
    computer: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
    internet: (
      <>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </>
    ),
    printer: (
      <>
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </>
    ),
    password: (
      <>
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </>
    ),
    software: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    other: (
      <>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </>
    ),
  };

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[category]}
    </svg>
  );
}
