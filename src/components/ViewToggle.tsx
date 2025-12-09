// ABOUTME: Segmented control for switching between Daily and Weekly views.
// ABOUTME: Pill-style toggle with active state highlighting.

'use client';

interface ViewToggleProps {
  activeView: 'daily' | 'weekly';
  onToggle: (view: 'daily' | 'weekly') => void;
}

export default function ViewToggle({ activeView, onToggle }: ViewToggleProps) {
  return (
    <div 
      className="inline-flex rounded p-1"
      style={{ background: 'var(--bg-elevated)' }}
    >
      <button
        onClick={() => onToggle('daily')}
        className="px-3 py-1.5 text-sm font-medium rounded transition-colors"
        style={activeView === 'daily' 
          ? { background: 'var(--foreground)', color: 'white' }
          : { background: 'transparent', color: 'var(--text-secondary)' }
        }
      >
        Daily
      </button>
      <button
        onClick={() => onToggle('weekly')}
        className="px-3 py-1.5 text-sm font-medium rounded transition-colors"
        style={activeView === 'weekly' 
          ? { background: 'var(--foreground)', color: 'white' }
          : { background: 'transparent', color: 'var(--text-secondary)' }
        }
      >
        Weekly
      </button>
    </div>
  );
}
