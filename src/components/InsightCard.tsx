// ABOUTME: Collapsible insight card component for displaying briefing items.
// ABOUTME: Shows priority pill, category, headline, summary, and expand/collapse.

'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { Insight } from '@/types';

interface InsightCardProps {
  insight: Insight;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const priorityStyles = {
  urgent: {
    bg: '#fef2f0',
    color: 'var(--urgent)',
    label: 'URGENT',
  },
  important: {
    bg: '#fef8f0',
    color: 'var(--important)',
    label: 'IMPORTANT',
  },
  informational: {
    bg: '#f2f5f4',
    color: 'var(--informational)',
    label: 'INFO',
  },
};

const categoryLabels: Record<Insight['category'], string> = {
  performance: 'PERFORMANCE',
  competitive: 'COMPETITIVE',
  social: 'SOCIAL',
  calendar: 'CALENDAR',
  industry: 'INDUSTRY',
};

export default function InsightCard({
  insight,
  isExpanded,
  onToggle,
  children,
}: InsightCardProps) {
  const priority = priorityStyles[insight.priority];

  return (
    <div
      className="rounded transition-colors"
      style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-elevated)';
        e.currentTarget.style.borderColor = 'var(--border-strong)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left"
        style={{ padding: isExpanded ? '28px 32px 0' : '28px 32px' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded tracking-wide"
            style={{ 
              background: priority.bg, 
              color: priority.color,
              letterSpacing: '0.05em'
            }}
          >
            {priority.label}
          </span>
          <span 
            className="text-[11px] font-medium tracking-wide"
            style={{ color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}
          >
            {categoryLabels[insight.category]}
          </span>
          <span className="text-[11px] hidden sm:inline" style={{ color: 'var(--text-tertiary)' }}>
            · {insight.updatedAt}
          </span>
        </div>

        <h3 
          className="font-serif text-lg sm:text-xl leading-snug"
          style={{ color: 'var(--foreground)' }}
        >
          {insight.headline}
        </h3>
        
        {!isExpanded && (
          <p 
            className="text-[15px] mt-3 leading-relaxed line-clamp-2"
            style={{ color: 'var(--text-body)', lineHeight: '1.6' }}
          >
            {insight.summary}
          </p>
        )}

        <div 
          className="flex items-center justify-end mt-4 pt-4"
          style={{ borderTop: isExpanded ? 'none' : '1px solid var(--border)' }}
        >
          <span 
            className="flex items-center gap-1 text-[13px] font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
            {isExpanded ? (
              <ChevronUp size={16} style={{ color: 'var(--text-secondary)' }} />
            ) : (
              <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />
            )}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div style={{ padding: '0 32px 28px' }}>
          {children}
        </div>
      )}
    </div>
  );
}
