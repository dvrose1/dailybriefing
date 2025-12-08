// ABOUTME: Header component showing greeting, date, item count, and voice button.
// ABOUTME: Displays personalized welcome message and briefing statistics.

import { Volume2 } from 'lucide-react';

interface BriefingHeaderProps {
  itemCount: number;
  onVoiceClick: () => void;
}

export default function BriefingHeader({ itemCount, onVoiceClick }: BriefingHeaderProps) {
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
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
            {greeting}, Sarah
          </h1>
          <p className="text-sm text-slate-500 mt-1">{dateString}</p>
          <p className="text-sm text-slate-500">
            {itemCount} items · About 6 minutes
          </p>
        </div>
        <button
          onClick={onVoiceClick}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors w-full sm:w-auto"
        >
          <Volume2 size={18} />
          Listen to Briefing
        </button>
      </div>
      <div className="mt-4 border-b border-slate-200" />
    </header>
  );
}
