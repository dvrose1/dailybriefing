// ABOUTME: Teams-style title bar with navigation arrows and window controls.
// ABOUTME: Visual-only component mimicking Microsoft Teams desktop app chrome.

import { ChevronLeft, ChevronRight, Minus, Square, X } from 'lucide-react';

export default function TeamsTitleBar() {
  return (
    <div className="h-8 bg-[#5b5fc7] flex items-center justify-between px-2 select-none">
      <div className="flex items-center gap-1 text-white/70">
        <button className="p-1 hover:bg-white/10 rounded">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="text-white text-sm font-medium">
        Microsoft Teams
      </div>
      
      <div className="flex items-center">
        <button className="px-3 py-1 hover:bg-white/10 text-white/70">
          <Minus className="w-4 h-4" />
        </button>
        <button className="px-3 py-1 hover:bg-white/10 text-white/70">
          <Square className="w-3 h-3" />
        </button>
        <button className="px-3 py-1 hover:bg-red-500 text-white/70 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
