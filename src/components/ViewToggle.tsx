// ABOUTME: Segmented control for switching between Daily and Weekly views.
// ABOUTME: Fluent Premium toggle with subtle active state.

'use client';

interface ViewToggleProps {
  activeView: 'daily' | 'weekly';
  onToggle: (view: 'daily' | 'weekly') => void;
}

export default function ViewToggle({ activeView, onToggle }: ViewToggleProps) {
  return (
    <div 
      className="inline-flex rounded-md p-0.5"
      style={{ background: 'var(--bg-hover)' }}
    >
      <button
        onClick={() => onToggle('daily')}
        className="px-3.5 py-1.5 text-[13px] font-medium rounded transition-all"
        style={activeView === 'daily' 
          ? { background: 'var(--bg-card)', color: 'var(--foreground)', boxShadow: 'var(--shadow-sm)' }
          : { background: 'transparent', color: 'var(--text-secondary)' }
        }
      >
        Daily
      </button>
      <button
        onClick={() => onToggle('weekly')}
        className="px-3.5 py-1.5 text-[13px] font-medium rounded transition-all"
        style={activeView === 'weekly' 
          ? { background: 'var(--bg-card)', color: 'var(--foreground)', boxShadow: 'var(--shadow-sm)' }
          : { background: 'transparent', color: 'var(--text-secondary)' }
        }
      >
        Weekly
      </button>
    </div>
  );
}
