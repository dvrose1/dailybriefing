// ABOUTME: Teams-style left sidebar with icon navigation rail.
// ABOUTME: Shows standard Teams nav items plus Daily Briefing as active app.

import { 
  Bell, 
  MessageSquare, 
  Users, 
  Calendar, 
  Phone, 
  Folder,
  Sparkles,
  MoreHorizontal 
} from 'lucide-react';
import { ReactNode } from 'react';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  notifications?: number;
}

function SidebarItem({ icon, label, active = false, notifications = 0 }: SidebarItemProps) {
  return (
    <div 
      className={`
        w-12 h-12 flex flex-col items-center justify-center rounded-md cursor-pointer
        ${active ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
      `}
      title={label}
    >
      <div className="relative">
        <div className={active ? 'text-[#5b5fc7]' : 'text-gray-600'}>
          {icon}
        </div>
        {notifications > 0 && (
          <div className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-[#c4314b] rounded-full text-white text-[10px] flex items-center justify-center px-1">
            {notifications}
          </div>
        )}
      </div>
      <span className={`text-[10px] mt-0.5 ${active ? 'text-[#5b5fc7] font-medium' : 'text-gray-600'}`}>
        {label.split(' ')[0]}
      </span>
    </div>
  );
}

export default function TeamsSidebar() {
  return (
    <div className="w-16 bg-[#ebebeb] flex flex-col items-center py-2 border-r border-gray-300">
      <div className="flex flex-col items-center gap-1">
        <SidebarItem icon={<Bell size={20} />} label="Activity" notifications={3} />
        <SidebarItem icon={<MessageSquare size={20} />} label="Chat" />
        <SidebarItem icon={<Users size={20} />} label="Teams" />
        <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
        <SidebarItem icon={<Phone size={20} />} label="Calls" />
        <SidebarItem icon={<Folder size={20} />} label="Files" />
      </div>
      
      <div className="my-3 w-8 border-t border-gray-400" />
      
      <div className="flex flex-col items-center gap-1">
        <SidebarItem icon={<Sparkles size={20} />} label="Daily Briefing" active />
        <SidebarItem icon={<MoreHorizontal size={20} />} label="More" />
      </div>
      
      <div className="flex-1" />
      
      <div className="mb-2">
        <div className="w-8 h-8 rounded-full bg-[#5b5fc7] flex items-center justify-center text-white text-sm font-medium">
          SF
        </div>
      </div>
    </div>
  );
}
