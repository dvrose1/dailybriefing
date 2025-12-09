// ABOUTME: Grid displaying user briefing patterns.
// ABOUTME: Fluent Premium style with subtle card backgrounds.

import { LearningPatterns } from '@/types';

interface PatternsGridProps {
  patterns: LearningPatterns;
}

export default function PatternsGrid({ patterns }: PatternsGridProps) {
  return (
    <div>
      <h3 
        className="text-[11px] font-semibold uppercase mb-4"
        style={{ color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}
      >
        Your briefing patterns
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        <div 
          className="rounded-lg p-3 text-center"
          style={{ background: 'var(--bg-hover)' }}
        >
          <p className="text-[11px] mb-1" style={{ color: 'var(--text-tertiary)' }}>Avg. Review Time</p>
          <p className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
            {patterns.avgReviewTime}
          </p>
        </div>
        <div 
          className="rounded-lg p-3 text-center overflow-hidden"
          style={{ background: 'var(--bg-hover)' }}
        >
          <p className="text-[11px] mb-1" style={{ color: 'var(--text-tertiary)' }}>Most Active Day</p>
          <p className="text-sm sm:text-base font-semibold truncate" style={{ color: 'var(--foreground)' }}>
            {patterns.mostActiveDay}
          </p>
        </div>
        <div 
          className="rounded-lg p-3 text-center"
          style={{ background: 'var(--bg-hover)' }}
        >
          <p className="text-[11px] mb-1" style={{ color: 'var(--text-tertiary)' }}>Preferred Action</p>
          <p className="text-sm sm:text-base font-semibold leading-tight" style={{ color: 'var(--foreground)' }}>
            {patterns.preferredAction}
          </p>
        </div>
      </div>
    </div>
  );
}
