// ABOUTME: Card component for displaying weekly synthesis themes.
// ABOUTME: Editorial style with serif headlines and warm accent color.

import { WeeklyTheme } from '@/types';

interface ThemeCardProps {
  theme: WeeklyTheme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <div 
      className="py-8 first:pt-0"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div 
        className="text-xs font-semibold uppercase tracking-wide mb-2"
        style={{ color: 'var(--accent)', letterSpacing: '0.08em' }}
      >
        Theme
      </div>

      <h3 
        className="font-serif text-xl sm:text-[22px] mb-3 leading-snug"
        style={{ color: 'var(--foreground)' }}
      >
        {theme.headline}
      </h3>

      <p 
        className="text-[15px] leading-relaxed mb-4"
        style={{ color: 'var(--text-body)', lineHeight: '1.65' }}
      >
        {theme.synthesis}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
        <div style={{ color: 'var(--text-secondary)' }}>
          <span className="font-medium">Related briefings:</span>{' '}
          {theme.relatedDays.join(', ')}
        </div>
        <div className="hidden sm:block" style={{ color: 'var(--border)' }}>•</div>
        <div className="font-medium" style={{ color: 'var(--accent)' }}>
          Suggested focus: {theme.suggestedFocus}
        </div>
      </div>
    </div>
  );
}
