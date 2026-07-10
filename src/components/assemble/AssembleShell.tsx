// ABOUTME: Assemble-style app shell: white sidebar on the left, light gray canvas.
// ABOUTME: On mobile the sidebar collapses into a slim top bar with nav and switcher.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AssembleSidebar, { PersonaSwitcher } from '@/components/assemble/AssembleSidebar';

const MOBILE_LINKS = [
  { href: '/', label: 'Briefing' },
  { href: '/console', label: 'Console' },
  { href: '/profile', label: 'Profile' },
];

export default function AssembleShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-background overflow-hidden">
      <div className="hidden md:block h-full">
        <AssembleSidebar />
      </div>

      {/* Mobile bar */}
      <div className="md:hidden bg-white border-b border-[#e5e7eb] px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          <nav className="flex items-center gap-0.5">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1 rounded text-[13px] ${
                  pathname === link.href
                    ? 'bg-accent-soft text-primary font-medium'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="w-40 shrink-0">
          <PersonaSwitcher compact />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
