import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HelpDesk Pro — IT Help Desk & Support Ticket System",
  description:
    "A Laravel 10 IT Help Desk & Support Ticket System with role-based access (Admin/Technician/Employee), AJAX interactions, and a public portfolio-ready dashboard.",
  keywords: ["helpdesk", "ticketing", "Laravel", "IT support", "portfolio"],
  authors: [{ name: "HelpDesk Pro" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
