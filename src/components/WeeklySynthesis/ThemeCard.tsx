// ABOUTME: Card component for displaying weekly synthesis themes.
// ABOUTME: Shows headline, synthesis paragraph, related days, and suggested focus.

import { WeeklyTheme } from '@/types';

interface ThemeCardProps {
  theme: WeeklyTheme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-blue-600" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Theme
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
        {theme.headline}
      </h3>

      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
        {theme.synthesis}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
        <div className="text-slate-500">
          <span className="font-medium">Related briefings:</span>{' '}
          {theme.relatedDays.join(', ')}
        </div>
        <div className="hidden sm:block text-slate-300">•</div>
        <div className="text-blue-600 font-medium">
          Suggested focus: {theme.suggestedFocus}
        </div>
      </div>
    </div>
  );
}
