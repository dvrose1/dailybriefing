// ABOUTME: Header component showing greeting, date, item count, and voice button.
// ABOUTME: Fluent Premium style with semibold typography hierarchy.

import { Volume2 } from 'lucide-react';
import ViewToggle from './ViewToggle';

interface BriefingHeaderProps {
  itemCount: number;
  onVoiceClick: () => void;
  activeView: 'daily' | 'weekly';
  onViewToggle: (view: 'daily' | 'weekly') => void;
  onLearningClick: () => void;
}

export default function BriefingHeader({ 
  itemCount, 
  onVoiceClick,
  activeView,
  onViewToggle,
  onLearningClick,
}: BriefingHeaderProps) {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="mb-5 py-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 
            className="text-[28px] font-semibold mb-1"
            style={{ color: 'var(--foreground)' }}
          >
            {greeting}, Sarah
          </h1>
          <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
            {dateString}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {itemCount} items · About 6 minutes
            </p>
            <button
              onClick={onLearningClick}
              className="text-sm transition-colors hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              What you've taught me
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <ViewToggle activeView={activeView} onToggle={onViewToggle} />
          <button
            onClick={onVoiceClick}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all"
            style={{ 
              border: '1px solid var(--border-strong)', 
              color: 'var(--text-secondary)',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--foreground)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <Volume2 size={16} />
            <span>Listen to Briefing</span>
          </button>
        </div>
      </div>
    </header>
  );
}
