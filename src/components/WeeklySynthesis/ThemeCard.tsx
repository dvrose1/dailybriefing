// ABOUTME: Card component for displaying weekly synthesis themes.
// ABOUTME: Fluent Premium style with shadow cards and semibold headlines.

import { WeeklyTheme } from '@/types';

interface ThemeCardProps {
  theme: WeeklyTheme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <div 
      className="rounded-lg p-5"
      style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div 
        className="text-[11px] font-semibold uppercase mb-2.5"
        style={{ color: 'var(--accent)', letterSpacing: '0.5px' }}
      >
        Theme
      </div>

      <h3 
        className="text-lg font-semibold mb-2.5 leading-snug"
        style={{ color: 'var(--foreground)' }}
      >
        {theme.headline}
      </h3>

      <p 
        className="text-sm leading-relaxed mb-3"
        style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
      >
        {theme.synthesis}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
        <div style={{ color: 'var(--text-tertiary)' }}>
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
