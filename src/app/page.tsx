'use client';

import { useState } from 'react';
import { Sidebar, View } from '@/components/helpdesk/sidebar';
import { Topbar } from '@/components/helpdesk/topbar';
import { DashboardView } from '@/components/helpdesk/dashboard-view';
import { TicketsView } from '@/components/helpdesk/tickets-view';
import { TicketDetailView } from '@/components/helpdesk/ticket-detail-view';
import { LoginView } from '@/components/helpdesk/login-view';
import { Ticket } from '@/lib/helpdesk-data';

export default function Home() {
  const [view, setView] = useState<View>('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [search, setSearch] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setView('ticket-detail');
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (newView: View) => {
    setView(newView);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        view={view}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Topbar
          onMobileMenu={() => setIsMobileSidebarOpen(true)}
          onSearch={setSearch}
          searchTerm={search}
          view={view}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 p-4 lg:p-7 max-w-[1400px] w-full mx-auto">
          {view === 'dashboard' && (
            <DashboardView onTicketClick={handleTicketClick} onNavigate={handleNavigate} />
          )}
          {view === 'tickets' && (
            <TicketsView
              onTicketClick={handleTicketClick}
              externalSearch={search}
              onSearchChange={setSearch}
            />
          )}
          {view === 'ticket-detail' && selectedTicket && (
            <TicketDetailView
              ticket={selectedTicket}
              onBack={() => handleNavigate('tickets')}
              onNavigate={handleNavigate}
            />
          )}
          {view === 'login' && <LoginView onNavigate={handleNavigate} />}
        </main>

        <footer className="bg-white border-t border-slate-200 px-6 py-3 flex flex-wrap justify-between items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2024 HelpDesk Pro</span>
            <span className="opacity-50">·</span>
            <span>Built with Laravel 10 + Bootstrap 5 (Next.js preview)</span>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live preview
            </span>
            <a href="#" className="hover:text-blue-600">Laravel</a>
            <a href="#" className="hover:text-blue-600">Bootstrap</a>
            <a href="#" className="hover:text-blue-600">SweetAlert2</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
