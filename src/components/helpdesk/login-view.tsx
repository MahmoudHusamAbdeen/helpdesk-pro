'use client';

import { useState } from 'react';
import { View } from './sidebar';

interface LoginViewProps {
  onNavigate: (view: View) => void;
}

export function LoginView({ onNavigate }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Brand header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-6 text-center">
          <div className="inline-flex items-center gap-2 text-white text-xl font-bold mb-1">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </span>
            <span>HelpDesk <span className="text-blue-400">Pro</span></span>
          </div>
          <p className="text-slate-400 text-sm">Sign in to access your dashboard</p>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-bold text-slate-900 text-center mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 text-center mb-5">Sign in to access your helpdesk dashboard.</p>

          <form onSubmit={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded border-slate-300" />
                Keep me signed in
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm shadow-blue-600/20 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400 uppercase tracking-wider">Demo Accounts</span>
            </div>
          </div>

          <div className="space-y-2">
            <DemoButton
              color="from-purple-600 to-violet-400"
              letter="A"
              name="Admin"
              email="admin@helpdesk.test"
              onClick={() => fillDemo('admin@helpdesk.test')}
            />
            <DemoButton
              color="from-cyan-600 to-cyan-400"
              letter="S"
              name="Technician"
              email="tech@helpdesk.test"
              onClick={() => fillDemo('tech@helpdesk.test')}
            />
            <DemoButton
              color="from-slate-600 to-slate-400"
              letter="A"
              name="Employee"
              email="ahmed@helpdesk.test"
              onClick={() => fillDemo('ahmed@helpdesk.test')}
            />
          </div>

          <p className="text-center text-sm text-slate-500 mt-5">
            All demo passwords: <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">password</code>
          </p>

          <p className="text-center text-sm text-slate-500 mt-3">
            New to HelpDesk Pro?{' '}
            <button onClick={() => onNavigate('dashboard')} className="text-blue-600 hover:text-blue-700 font-medium">
              Create an account
            </button>
          </p>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full mt-4 text-sm text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function DemoButton({
  color,
  letter,
  name,
  email,
  onClick,
}: {
  color: string;
  letter: string;
  name: string;
  email: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
    >
      <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
        {letter}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-800">{name}</div>
        <div className="text-xs text-slate-500 font-mono truncate">{email}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
