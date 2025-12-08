// ABOUTME: Header component showing greeting, date, item count, and voice button.
// ABOUTME: Displays personalized welcome message and briefing statistics.

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
    <header className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
              {greeting}, Sarah
            </h1>
            <button
              onClick={onLearningClick}
              className="text-xs text-slate-400 hover:text-blue-600 transition-colors hidden sm:block"
            >
              What you've taught me
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-1">{dateString}</p>
          <p className="text-sm text-slate-500">
            {itemCount} items · About 6 minutes
          </p>
          <button
            onClick={onLearningClick}
            className="text-xs text-slate-400 hover:text-blue-600 transition-colors sm:hidden mt-1"
          >
            What you've taught me
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <ViewToggle activeView={activeView} onToggle={onViewToggle} />
          <button
            onClick={onVoiceClick}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Volume2 size={18} />
            <span className="hidden sm:inline">Listen to Briefing</span>
            <span className="sm:hidden">Listen</span>
          </button>
        </div>
      </div>
      <div className="mt-4 border-b border-slate-200" />
    </header>
  );
}
