// ABOUTME: Segmented control for switching between Daily and Weekly views.
// ABOUTME: Pill-style toggle with active state highlighting.

'use client';

interface ViewToggleProps {
  activeView: 'daily' | 'weekly';
  onToggle: (view: 'daily' | 'weekly') => void;
}

export default function ViewToggle({ activeView, onToggle }: ViewToggleProps) {
  return (
    <div className="inline-flex bg-slate-100 rounded-lg p-1">
      <button
        onClick={() => onToggle('daily')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          activeView === 'daily'
            ? 'bg-blue-600 text-white'
            : 'text-slate-600 hover:text-slate-800'
        }`}
      >
        Daily
      </button>
      <button
        onClick={() => onToggle('weekly')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          activeView === 'weekly'
            ? 'bg-blue-600 text-white'
            : 'text-slate-600 hover:text-slate-800'
        }`}
      >
        Weekly
      </button>
    </div>
  );
}
