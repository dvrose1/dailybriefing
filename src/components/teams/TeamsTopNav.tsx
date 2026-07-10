// ABOUTME: Teams-style top nav with route links and the demo persona switcher.
// ABOUTME: The persona switcher lets one demo machine show all three recipient views.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';

const NAV_LINKS = [
  { href: '/', label: 'Briefing' },
  { href: '/console', label: 'Console' },
  { href: '/profile', label: 'Profile' },
];

export default function TeamsTopNav() {
  const pathname = usePathname();
  const { personas, activePersonaId, setActivePersona } = useStore();

  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button className="p-1 hover:bg-gray-100 rounded shrink-0">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800 hidden sm:inline shrink-0">
          Daily Briefing Agent
        </span>
        <nav className="flex items-center gap-1 ml-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded text-sm transition-colors ${
                  active
                    ? 'bg-[#eef0fb] text-[#5b5fc7] font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-gray-400 hidden sm:inline">Viewing as</span>
        <div className="relative">
          <select
            value={activePersonaId}
            onChange={(e) => setActivePersona(e.target.value)}
            className="appearance-none bg-[#f5f5f5] border border-gray-200 rounded-md pl-3 pr-8 py-1.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            title="Switch demo persona"
          >
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
                {p.archetype ? ` (${p.archetype})` : ' (new)'}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
