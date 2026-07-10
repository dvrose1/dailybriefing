// ABOUTME: Assemble-style left sidebar: workspace brand, nav sections, persona switcher.
// ABOUTME: Chief of Staff links are real routes; other items are cosmetic demo chrome.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  ChevronDown,
  FileText,
  HelpCircle,
  Inbox,
  Newspaper,
  PenSquare,
  Plus,
  Settings,
  UserCircle,
} from 'lucide-react';
import { useStore } from '@/lib/store';

const COS_LINKS = [
  { href: '/', label: 'Daily Briefing', icon: Newspaper },
  { href: '/console', label: 'Notification Console', icon: Inbox },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

const ACTION_ITEMS = [
  { label: 'New question', icon: Plus },
  { label: 'Reports', icon: FileText },
  { label: 'Actions', icon: PenSquare },
];

const INTELLIGENCE_ITEMS = [
  { label: 'Knowledge', icon: BookOpen },
  { label: 'Controls', icon: Settings },
  { label: 'Wisdom', icon: HelpCircle },
];

const RECENTS = [
  'Daily insights for Radiant skincare',
  'Harvest Table club channel review',
  'Everfresh display pacing question',
  'Q3 promo calendar working doc',
];

export default function AssembleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-white border-r border-[#e5e7eb] flex flex-col py-5 h-full">
      <div className="flex items-center gap-3 px-5 mb-6">
        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold">
          A
        </div>
        <div>
          <p className="font-semibold text-[15px] text-[#1a1a2e]">Unilever</p>
          <p className="text-xs text-gray-500">Assemble</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Section label="Chief of Staff">
          {COS_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </Section>

        <Section label="Actions">
          {ACTION_ITEMS.map(({ label, icon: Icon }) => (
            <InertItem key={label} label={label} icon={<Icon size={16} />} />
          ))}
        </Section>

        <Section label="Intelligence">
          {INTELLIGENCE_ITEMS.map(({ label, icon: Icon }) => (
            <InertItem key={label} label={label} icon={<Icon size={16} />} />
          ))}
        </Section>

        <Section label="Recents">
          {RECENTS.map((label) => (
            <p
              key={label}
              className="px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-100 cursor-default truncate"
            >
              {label}
            </p>
          ))}
        </Section>
      </div>

      <PersonaSwitcher />
    </aside>
  );
}

export function PersonaSwitcher({ compact = false }: { compact?: boolean }) {
  const { personas, activePersonaId, activePersona, setActivePersona } = useStore();

  return (
    <div className={compact ? '' : 'px-4 pt-4 border-t border-[#e5e7eb]'}>
      {!compact && <p className="text-[11px] text-gray-400 mb-1.5">Viewing as (demo)</p>}
      <div className="flex items-center gap-2">
        {!compact && (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {activePersona.initials}
          </div>
        )}
        <div className="relative flex-1 min-w-0">
          <select
            value={activePersonaId}
            onChange={(e) => setActivePersona(e.target.value)}
            className="w-full appearance-none bg-[#f5f6f8] border border-[#e5e7eb] rounded-lg pl-2.5 pr-7 py-1.5 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100"
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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-3 mb-4">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
        {label}
      </p>
      {children}
    </div>
  );
}

function InertItem({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-100 cursor-default">
      {icon}
      {label}
    </div>
  );
}
