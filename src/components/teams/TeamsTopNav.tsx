// ABOUTME: Teams-style top navigation bar with app name and search.
// ABOUTME: Renders above the main content area.

import { Menu, Search, MoreHorizontal } from 'lucide-react';

export default function TeamsTopNav() {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800">Daily Briefing Agent</span>
      </div>
      
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-md px-3 py-1.5 text-sm text-gray-500">
          <Search className="w-4 h-4" />
          <span>Search</span>
          <span className="ml-auto text-xs text-gray-400">⌘F</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
