// Mock data matching the Laravel TicketSeeder exactly.
// This powers the visual preview of HelpDesk Pro.

export type Role = 'admin' | 'technician' | 'employee';
export type Status = 'open' | 'in_progress' | 'resolved' | 'closed';
export type Priority = 'low' | 'medium' | 'high';
export type Category =
  | 'computer'
  | 'internet'
  | 'printer'
  | 'password'
  | 'software'
  | 'other';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  department: string;
  phone?: string;
}

export interface Comment {
  id: number;
  user: User;
  body: string;
  createdAt: string; // relative time string
}

export interface HistoryEntry {
  id: number;
  user: User | null;
  action: string;
  description: string;
  createdAt: string;
}

export interface Ticket {
  id: number;
  ticketNumber: string;
  title: string;
  description: string;
  category: Category;
  department: string;
  priority: Priority;
  status: Status;
  user: User;
  technician: User | null;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  history: HistoryEntry[];
}

export const CATEGORIES: Record<Category, string> = {
  computer: 'Computer Problem',
  internet: 'Internet Problem',
  printer: 'Printer Issue',
  password: 'Password / Login Problem',
  software: 'Software Installation',
  other: 'Other Technical Issue',
};

export const PRIORITIES: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const STATUSES: Record<Status, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  technician: 'Technician',
  employee: 'Employee',
};

export const USERS: User[] = [
  { id: 1, name: 'Site Administrator', email: 'admin@helpdesk.test', role: 'admin', department: 'IT Department', phone: '+1 (555) 100-2000' },
  { id: 2, name: 'Mahmoud 1', email: 'tech@helpdesk.test', role: 'technician', department: 'IT Department', phone: '+1 (555) 100-2001' },
  { id: 3, name: 'Ahmed Hassan', email: 'ahmed@helpdesk.test', role: 'employee', department: 'Finance', phone: '+1 (555) 100-2002' },
  { id: 4, name: 'Mahmoud 2', email: 'michael.chen@helpdesk.test', role: 'technician', department: 'IT Department', phone: '+1 (555) 200-3001' },
  { id: 5, name: 'Mahmoud 3', email: 'emily.r@helpdesk.test', role: 'technician', department: 'IT Department', phone: '+1 (555) 200-3002' },
  { id: 6, name: 'Priya Patel', email: 'priya.patel@helpdesk.test', role: 'employee', department: 'Marketing' },
  { id: 7, name: 'David Williams', email: 'david.w@helpdesk.test', role: 'employee', department: 'Operations' },
  { id: 8, name: 'Fatima Al-Zahra', email: 'fatima.z@helpdesk.test', role: 'employee', department: 'Human Resources' },
  { id: 9, name: 'James Carter', email: 'james.carter@helpdesk.test', role: 'employee', department: 'Sales' },
  { id: 10, name: 'Lisa Anderson', email: 'lisa.a@helpdesk.test', role: 'employee', department: 'Finance' },
];

const findUser = (email: string): User => USERS.find((u) => u.email === email) ?? USERS[0];
const technicians = USERS.filter((u) => u.role === 'technician');
const admin = USERS[0];

export const TICKETS: Ticket[] = [
  {
    id: 1,
    ticketNumber: 'HD-2024-00001',
    title: "Laptop won't boot after Windows update",
    description:
      "My Dell Latitude 5520 won't boot after applying last night's Windows 11 cumulative update. It loops at the blue recovery screen. I have already tried pressing F8 with no success. Please help — I have a client presentation at 11 AM.",
    category: 'computer',
    department: 'Finance',
    priority: 'high',
    status: 'in_progress',
    user: findUser('ahmed@helpdesk.test'),
    technician: technicians[0],
    createdAt: '3 days ago',
    updatedAt: '5 hours ago',
    comments: [
      { id: 1, user: findUser('ahmed@helpdesk.test'), body: 'Just checking in — any update on this?', createdAt: '2 days ago' },
      { id: 2, user: technicians[0], body: 'Looking into this now. Will update shortly.', createdAt: '2 days ago' },
      { id: 3, user: technicians[0], body: "I've identified the root cause. Working on a fix.", createdAt: '5 hours ago' },
    ],
    history: [
      { id: 1, user: findUser('ahmed@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '3 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 1.', createdAt: '3 days ago' },
      { id: 3, user: findUser('ahmed@helpdesk.test'), action: 'Comment Added', description: 'Ahmed Hassan added a comment.', createdAt: '2 days ago' },
      { id: 4, user: technicians[0], action: 'Comment Added', description: 'Mahmoud 1 added a comment.', createdAt: '2 days ago' },
      { id: 5, user: technicians[0], action: 'Status Changed', description: 'Status changed from "Open" to "In Progress".', createdAt: '3 days ago' },
      { id: 6, user: technicians[0], action: 'Comment Added', description: 'Mahmoud 1 added a comment.', createdAt: '5 hours ago' },
    ],
  },
  {
    id: 2,
    ticketNumber: 'HD-2024-00002',
    title: 'Cannot connect to office Wi-Fi on 5th floor',
    description:
      "Several users on the 5th floor (Finance & Marketing) cannot connect to the CORP-WIFI network since this morning. The SSID shows up but authentication fails with \"incorrect password\" even though the password hasn't changed.",
    category: 'internet',
    department: 'Marketing',
    priority: 'high',
    status: 'open',
    user: findUser('priya.patel@helpdesk.test'),
    technician: null,
    createdAt: '6 hours ago',
    updatedAt: '6 hours ago',
    comments: [
      { id: 1, user: findUser('priya.patel@helpdesk.test'), body: 'This is blocking multiple people. Please prioritize.', createdAt: '5 hours ago' },
    ],
    history: [
      { id: 1, user: findUser('priya.patel@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '6 hours ago' },
      { id: 2, user: findUser('priya.patel@helpdesk.test'), action: 'Comment Added', description: 'Priya Patel added a comment.', createdAt: '5 hours ago' },
    ],
  },
  {
    id: 3,
    ticketNumber: 'HD-2024-00003',
    title: 'HP LaserJet on 3rd floor printing garbled pages',
    description:
      'The shared HP LaserJet Pro M404 on the 3rd floor has been printing pages with random characters at the top of each sheet. Tried power-cycling. Reinstalled driver but the problem persists.',
    category: 'printer',
    department: 'Operations',
    priority: 'medium',
    status: 'open',
    user: findUser('david.w@helpdesk.test'),
    technician: null,
    createdAt: '1 day ago',
    updatedAt: '1 day ago',
    comments: [],
    history: [
      { id: 1, user: findUser('david.w@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '1 day ago' },
    ],
  },
  {
    id: 4,
    ticketNumber: 'HD-2024-00004',
    title: 'Need password reset for VPN access',
    description:
      'I am locked out of my VPN account after too many failed attempts. Please reset my password or unlock the account. I need to access the intranet remotely this weekend.',
    category: 'password',
    department: 'Human Resources',
    priority: 'medium',
    status: 'resolved',
    user: findUser('fatima.z@helpdesk.test'),
    technician: technicians[1],
    createdAt: '5 days ago',
    updatedAt: '4 days ago',
    comments: [
      { id: 1, user: technicians[1], body: 'Could you please restart your machine and try again?', createdAt: '5 days ago' },
      { id: 2, user: findUser('fatima.z@helpdesk.test'), body: 'Thanks for the update. I\'ll wait for further instructions.', createdAt: '4 days ago' },
    ],
    history: [
      { id: 1, user: findUser('fatima.z@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '5 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 2.', createdAt: '5 days ago' },
      { id: 3, user: technicians[1], action: 'Status Changed', description: 'Status changed from "Open" to "In Progress".', createdAt: '5 days ago' },
      { id: 4, user: technicians[1], action: 'Status Changed', description: 'Status changed from "In Progress" to "Resolved".', createdAt: '4 days ago' },
    ],
  },
  {
    id: 5,
    ticketNumber: 'HD-2024-00005',
    title: 'Install Adobe Photoshop 2024 on design workstation',
    description:
      'Please install Adobe Photoshop 2024 and Illustrator on workstation DESK-DESIGN-02 in the creative corner. I have a license key ready — please contact me before installing.',
    category: 'software',
    department: 'Sales',
    priority: 'low',
    status: 'open',
    user: findUser('james.carter@helpdesk.test'),
    technician: null,
    createdAt: '2 days ago',
    updatedAt: '1 day ago',
    comments: [
      { id: 1, user: findUser('james.carter@helpdesk.test'), body: 'Just checking in — any update on this?', createdAt: '1 day ago' },
    ],
    history: [
      { id: 1, user: findUser('james.carter@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '2 days ago' },
      { id: 2, user: findUser('james.carter@helpdesk.test'), action: 'Comment Added', description: 'James Carter added a comment.', createdAt: '1 day ago' },
    ],
  },
  {
    id: 6,
    ticketNumber: 'HD-2024-00006',
    title: 'Slack desktop app crashes on startup',
    description:
      'The Slack desktop client crashes immediately on startup. I have tried reinstalling from the official site but the issue continues. Browser version works fine, so it\'s not an account issue.',
    category: 'software',
    department: 'Finance',
    priority: 'low',
    status: 'closed',
    user: findUser('lisa.a@helpdesk.test'),
    technician: technicians[1],
    createdAt: '8 days ago',
    updatedAt: '6 days ago',
    comments: [
      { id: 1, user: technicians[1], body: 'Fix applied. Please confirm if everything works on your end.', createdAt: '7 days ago' },
      { id: 2, user: findUser('lisa.a@helpdesk.test'), body: 'Thanks for the update. I\'ll wait for further instructions.', createdAt: '6 days ago' },
      { id: 3, user: technicians[1], body: 'Issue resolved. Closing ticket — feel free to reopen if it happens again.', createdAt: '6 days ago' },
    ],
    history: [
      { id: 1, user: findUser('lisa.a@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '8 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 2.', createdAt: '8 days ago' },
      { id: 3, user: technicians[1], action: 'Status Changed', description: 'Status changed from "Open" to "In Progress".', createdAt: '7 days ago' },
      { id: 4, user: technicians[1], action: 'Status Changed', description: 'Status changed from "In Progress" to "Resolved".', createdAt: '6 days ago' },
      { id: 5, user: technicians[1], action: 'Ticket Closed', description: 'Ticket marked as closed.', createdAt: '6 days ago' },
    ],
  },
  {
    id: 7,
    ticketNumber: 'HD-2024-00007',
    title: 'Email signature not showing in Outlook',
    description:
      'My HTML signature stopped displaying in new emails after the Outlook update yesterday. It still shows in replies. I checked settings and it\'s still configured. Please advise.',
    category: 'other',
    department: 'Finance',
    priority: 'low',
    status: 'resolved',
    user: findUser('ahmed@helpdesk.test'),
    technician: technicians[0],
    createdAt: '4 days ago',
    updatedAt: '3 days ago',
    comments: [
      { id: 1, user: technicians[0], body: 'Looking into this now. Will update shortly.', createdAt: '4 days ago' },
      { id: 2, user: technicians[0], body: 'Fix applied. Please confirm if everything works on your end.', createdAt: '3 days ago' },
    ],
    history: [
      { id: 1, user: findUser('ahmed@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '4 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 1.', createdAt: '4 days ago' },
      { id: 3, user: technicians[0], action: 'Status Changed', description: 'Status changed from "Open" to "Resolved".', createdAt: '3 days ago' },
    ],
  },
  {
    id: 8,
    ticketNumber: 'HD-2024-00008',
    title: 'Monitor flickering on dual-screen setup',
    description:
      'My secondary Dell U2723QE flickers every 30 seconds for about 1-2 seconds. Tried different DisplayPort cable. The primary monitor on HDMI is fine. Happens since yesterday afternoon.',
    category: 'computer',
    department: 'Marketing',
    priority: 'medium',
    status: 'in_progress',
    user: findUser('priya.patel@helpdesk.test'),
    technician: technicians[0],
    createdAt: '2 days ago',
    updatedAt: '1 day ago',
    comments: [
      { id: 1, user: technicians[0], body: 'I\'ve identified the root cause. Working on a fix.', createdAt: '1 day ago' },
    ],
    history: [
      { id: 1, user: findUser('priya.patel@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '2 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 1.', createdAt: '2 days ago' },
      { id: 3, user: technicians[0], action: 'Status Changed', description: 'Status changed from "Open" to "In Progress".', createdAt: '1 day ago' },
    ],
  },
  {
    id: 9,
    ticketNumber: 'HD-2024-00009',
    title: 'Request admin access to Power BI workspace',
    description:
      'Need contributor access to the "Finance Dashboard" Power BI workspace for the upcoming Q4 reporting cycle. Manager approval is attached as PDF.',
    category: 'other',
    department: 'Finance',
    priority: 'medium',
    status: 'open',
    user: findUser('lisa.a@helpdesk.test'),
    technician: null,
    createdAt: '3 days ago',
    updatedAt: '3 days ago',
    comments: [],
    history: [
      { id: 1, user: findUser('lisa.a@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '3 days ago' },
    ],
  },
  {
    id: 10,
    ticketNumber: 'HD-2024-00010',
    title: 'Cannot install company VPN client on personal laptop',
    description:
      'Trying to install the GlobalProtect VPN client on my personal MacBook Pro (M2). Installer keeps failing with "system extension cannot be loaded". Need this for a remote workday tomorrow.',
    category: 'software',
    department: 'Human Resources',
    priority: 'high',
    status: 'open',
    user: findUser('fatima.z@helpdesk.test'),
    technician: technicians[1],
    createdAt: '1 day ago',
    updatedAt: '20 hours ago',
    comments: [
      { id: 1, user: technicians[1], body: 'Escalating to network team for further investigation.', createdAt: '20 hours ago' },
    ],
    history: [
      { id: 1, user: findUser('fatima.z@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '1 day ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 2.', createdAt: '1 day ago' },
      { id: 3, user: technicians[1], action: 'Comment Added', description: 'Mahmoud 2 added a comment.', createdAt: '20 hours ago' },
    ],
  },
  {
    id: 11,
    ticketNumber: 'HD-2024-00011',
    title: 'Network drive (Z:) disappeared from File Explorer',
    description:
      'The Z: drive mapping to the shared Projects folder disappeared from File Explorer after the latest Windows update. I have rebooted twice. Mapping to other drives (Y:, X:) still works.',
    category: 'internet',
    department: 'Sales',
    priority: 'medium',
    status: 'resolved',
    user: findUser('james.carter@helpdesk.test'),
    technician: technicians[1],
    createdAt: '6 days ago',
    updatedAt: '5 days ago',
    comments: [
      { id: 1, user: technicians[1], body: 'Could you please restart your machine and try again?', createdAt: '6 days ago' },
      { id: 2, user: findUser('james.carter@helpdesk.test'), body: 'Thanks for the update. I\'ll wait for further instructions.', createdAt: '5 days ago' },
    ],
    history: [
      { id: 1, user: findUser('james.carter@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '6 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 2.', createdAt: '6 days ago' },
      { id: 3, user: technicians[1], action: 'Status Changed', description: 'Status changed from "Open" to "Resolved".', createdAt: '5 days ago' },
    ],
  },
  {
    id: 12,
    ticketNumber: 'HD-2024-00012',
    title: 'Two-factor authentication codes not arriving',
    description:
      'I am not receiving 2FA SMS codes for the last 2 hours. Tried multiple times, different carriers may be the issue. Need urgent access to submit my expense report before midnight deadline.',
    category: 'password',
    department: 'Operations',
    priority: 'high',
    status: 'in_progress',
    user: findUser('david.w@helpdesk.test'),
    technician: technicians[0],
    createdAt: '4 hours ago',
    updatedAt: '1 hour ago',
    comments: [
      { id: 1, user: technicians[0], body: 'Escalating to network team for further investigation.', createdAt: '1 hour ago' },
    ],
    history: [
      { id: 1, user: findUser('david.w@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '4 hours ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 1.', createdAt: '3 hours ago' },
      { id: 3, user: technicians[0], action: 'Status Changed', description: 'Status changed from "Open" to "In Progress".', createdAt: '1 hour ago' },
    ],
  },
  {
    id: 13,
    ticketNumber: 'HD-2024-00013',
    title: 'Webcam not detected in Microsoft Teams',
    description:
      'Microsoft Teams says "No camera found" even though the integrated webcam shows up in Device Manager and works in the Camera app. Other meeting apps (Zoom, Google Meet) detect it fine.',
    category: 'software',
    department: 'Marketing',
    priority: 'low',
    status: 'open',
    user: findUser('priya.patel@helpdesk.test'),
    technician: null,
    createdAt: '12 hours ago',
    updatedAt: '12 hours ago',
    comments: [],
    history: [
      { id: 1, user: findUser('priya.patel@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '12 hours ago' },
    ],
  },
  {
    id: 14,
    ticketNumber: 'HD-2024-00014',
    title: 'Frozen Excel file on shared drive needs recovery',
    description:
      'An Excel workbook on the shared S: drive crashed and now won\'t open. Says "file format or file extension is not valid". Contains this week\'s revenue summary. Recovery needed ASAP.',
    category: 'computer',
    department: 'Finance',
    priority: 'high',
    status: 'resolved',
    user: findUser('lisa.a@helpdesk.test'),
    technician: technicians[1],
    createdAt: '2 days ago',
    updatedAt: '1 day ago',
    comments: [
      { id: 1, user: technicians[1], body: 'Looking into this now. Will update shortly.', createdAt: '2 days ago' },
      { id: 2, user: technicians[1], body: 'Fix applied. Please confirm if everything works on your end.', createdAt: '1 day ago' },
    ],
    history: [
      { id: 1, user: findUser('lisa.a@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '2 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 2.', createdAt: '2 days ago' },
      { id: 3, user: technicians[1], action: 'Status Changed', description: 'Status changed from "Open" to "In Progress".', createdAt: '2 days ago' },
      { id: 4, user: technicians[1], action: 'Status Changed', description: 'Status changed from "In Progress" to "Resolved".', createdAt: '1 day ago' },
    ],
  },
  {
    id: 15,
    ticketNumber: 'HD-2024-00015',
    title: 'Slow internet on conference room PC',
    description:
      'The PC in Conference Room B (3rd floor) is getting ~2 Mbps down vs ~100 Mbps elsewhere on the same floor. Speeds are consistently slow for the last week. Cable checked and seems fine.',
    category: 'internet',
    department: 'Human Resources',
    priority: 'medium',
    status: 'closed',
    user: findUser('fatima.z@helpdesk.test'),
    technician: technicians[0],
    createdAt: '12 days ago',
    updatedAt: '9 days ago',
    comments: [
      { id: 1, user: technicians[0], body: 'Looking into this now. Will update shortly.', createdAt: '11 days ago' },
      { id: 2, user: findUser('fatima.z@helpdesk.test'), body: 'The issue is still happening. Could you please prioritize?', createdAt: '10 days ago' },
      { id: 3, user: technicians[0], body: 'Issue resolved. Closing ticket — feel free to reopen if it happens again.', createdAt: '9 days ago' },
    ],
    history: [
      { id: 1, user: findUser('fatima.z@helpdesk.test'), action: 'Created', description: 'Ticket created.', createdAt: '12 days ago' },
      { id: 2, user: admin, action: 'Assigned', description: 'Ticket assigned to Mahmoud 1.', createdAt: '12 days ago' },
      { id: 3, user: technicians[0], action: 'Status Changed', description: 'Status changed from "Open" to "In Progress".', createdAt: '11 days ago' },
      { id: 4, user: technicians[0], action: 'Status Changed', description: 'Status changed from "In Progress" to "Resolved".', createdAt: '9 days ago' },
      { id: 5, user: technicians[0], action: 'Ticket Closed', description: 'Ticket marked as closed.', createdAt: '9 days ago' },
    ],
  },
];

export const STATS = {
  total: TICKETS.length,
  open: TICKETS.filter((t) => t.status === 'open').length,
  inProgress: TICKETS.filter((t) => t.status === 'in_progress').length,
  resolved: TICKETS.filter((t) => t.status === 'resolved').length,
  closed: TICKETS.filter((t) => t.status === 'closed').length,
  high: TICKETS.filter((t) => t.priority === 'high').length,
};

export const CATEGORY_BREAKDOWN: { key: Category; count: number }[] = (
  Object.keys(CATEGORIES) as Category[]
).map((key) => ({
  key,
  count: TICKETS.filter((t) => t.category === key).length,
}));
