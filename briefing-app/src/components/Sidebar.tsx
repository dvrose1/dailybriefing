// ABOUTME: Left navigation sidebar suggesting Teams/Slack context.
// ABOUTME: Purely cosmetic - no actual navigation functionality.

import {
  Activity,
  MessageSquare,
  Users,
  Newspaper,
  Calendar,
  FolderOpen,
} from 'lucide-react';

const navItems = [
  { icon: Activity, label: 'Activity', active: false },
  { icon: MessageSquare, label: 'Chat', active: false },
  { icon: Users, label: 'Teams', active: false },
  { icon: Newspaper, label: 'Briefing', active: true },
  { icon: Calendar, label: 'Calendar', active: false },
  { icon: FolderOpen, label: 'Files', active: false },
];

export default function Sidebar() {
  return (
    <aside className="w-[60px] bg-slate-800 flex flex-col items-center py-4 gap-2">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
            item.active
              ? 'bg-slate-700 text-white border-l-2 border-blue-500'
              : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
          title={item.label}
        >
          <item.icon size={20} />
        </button>
      ))}
    </aside>
  );
}
