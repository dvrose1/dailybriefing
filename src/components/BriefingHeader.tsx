// ABOUTME: Header component showing greeting, date, item count, and voice button.
// ABOUTME: Displays personalized welcome message and briefing statistics.

import { Play } from 'lucide-react';
import ViewToggle from './ViewToggle';

interface BriefingHeaderProps {
  itemCount: number;
  onVoiceClick: () => void;
  activeView: 'daily' | 'weekly';
  onViewToggle: (view: 'daily' | 'weekly') => void;
  onLearningClick: () => void;
}

const numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

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
  const itemCountText = itemCount <= 10 ? numberWords[itemCount] : String(itemCount);

  return (
    <header className="mb-8 pt-10 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p 
            className="text-xs font-medium tracking-widest mb-3 hidden sm:block"
            style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase' }}
          >
            {dateString}
          </p>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-[32px]" style={{ color: 'var(--foreground)' }}>
              {greeting}, Sarah
            </h1>
            <button
              onClick={onLearningClick}
              className="text-xs transition-colors hidden sm:block hover:underline"
              style={{ color: 'var(--text-tertiary)' }}
            >
              What you've taught me
            </button>
          </div>
          <p className="text-sm sm:hidden mt-1" style={{ color: 'var(--text-tertiary)' }}>{dateString}</p>
          <p className="text-[15px] mt-2" style={{ color: 'var(--text-secondary)' }}>
            {itemCountText} items this morning · About six minutes
          </p>
          <button
            onClick={onLearningClick}
            className="text-xs transition-colors sm:hidden mt-1 hover:underline"
            style={{ color: 'var(--text-tertiary)' }}
          >
            What you've taught me
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <ViewToggle activeView={activeView} onToggle={onViewToggle} />
          <button
            onClick={onVoiceClick}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded transition-all"
            style={{ 
              border: '1px solid var(--border-strong)', 
              color: 'var(--text-body)',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
              e.currentTarget.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
          >
            <Play size={16} />
            <span className="hidden sm:inline">Listen</span>
            <span className="sm:hidden">Listen</span>
          </button>
        </div>
      </div>
    </header>
  );
}
