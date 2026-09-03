# HelpDesk Pro — Visual Prototype

A live, interactive preview of an IT Help Desk & Support Ticket System UI. Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS 4**.

> **Note:** This is a frontend-only prototype with mock data — no database, no authentication, no backend. It's designed as a portfolio piece to showcase the UI/UX of a help desk application.

## ✨ Features

- **Public Dashboard** — Browse stats, recent tickets, and category breakdown without login
- **Tickets List** — Full table with live search, filters (status, priority, category, assignment), and pagination UI
- **Ticket Detail** — Click any ticket to see description, comments thread, ticket details sidebar, and a color-coded history timeline
- **Login Preview** — A mock login page with one-click demo account buttons
- **Responsive** — Works on desktop, tablet, and mobile (sidebar collapses to off-canvas on mobile)
- **Modern UI** — Dark slate sidebar, blue accents, status/priority badges, hover effects, smooth transitions

## 🎨 Design

- Light theme with blue accent (`#2563eb`)
- Dark slate sidebar with gradient brand logo
- Sticky topbar with global search
- Status badges: Open (blue), In Progress (amber), Resolved (green), Closed (slate)
- Priority badges: Low (sky), Medium (amber), High (red)
- Role-colored avatars: Admin (purple), Technician (cyan), Employee (slate)

## 🚀 Quick Start

```bash
# Install dependencies
npm install
# or: bun install / yarn install / pnpm install

# Run the dev server
npm run dev

# Open http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🗂 Project Structure

```
src/
├── app/
│   ├── globals.css         # Tailwind + global styles
│   ├── layout.tsx          # Root layout with Geist font
│   └── page.tsx            # Main shell (view state navigation)
├── components/
│   └── helpdesk/
│       ├── badges.tsx              # StatusBadge, PriorityBadge, RoleBadge, CategoryIcon
│       ├── sidebar.tsx             # Dark sidebar with nav + demo accounts
│       ├── topbar.tsx              # Sticky topbar with search + user menu
│       ├── dashboard-view.tsx      # Stats grid + recent tickets + category chart
│       ├── tickets-view.tsx        # Filterable ticket list table
│       ├── ticket-detail-view.tsx  # Full ticket detail with comments + history
│       └── login-view.tsx          # Mock login page with demo account buttons
└── lib/
    └── helpdesk-data.ts    # Mock data (15 tickets, 10 users, comments, history)
```

## 📊 Mock Data

The app ships with **15 realistic demo tickets** across all 6 categories (Computer, Internet, Printer, Password, Software, Other) and all 4 statuses (Open, In Progress, Resolved, Closed). Each ticket has comments and a full audit history timeline.

### Demo Accounts (mock only — no actual login)

| Role        | Email                  | Password   |
|-------------|------------------------|------------|
| Admin       | admin@helpdesk.test    | password   |
| Technician  | tech@helpdesk.test     | password   |
| Employee    | ahmed@helpdesk.test    | password   |

Click the demo account buttons on the login page to auto-fill the form.

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4**
- **React 19**

## 📄 License

MIT — free to use for portfolios, learning, or any purpose.

---

Built as a portfolio piece. The full Laravel 10 version (with real database, authentication, and AJAX interactions) is available separately.
