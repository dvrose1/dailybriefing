// ABOUTME: Collapsible insight card component for displaying briefing items.
// ABOUTME: Fluent Premium style with shadows and semibold headlines.

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
    bg: 'var(--urgent-bg)',
    color: 'var(--urgent)',
    label: 'URGENT',
  },
  important: {
    bg: 'var(--important-bg)',
    color: 'var(--important)',
    label: 'IMPORTANT',
  },
  informational: {
    bg: 'var(--informational-bg)',
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
      className="rounded-lg mb-3 transition-all"
      style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--border-strong)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left"
        style={{ padding: '20px 24px' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-semibold px-2 py-1 rounded"
              style={{ 
                background: priority.bg, 
                color: priority.color,
                letterSpacing: '0.5px'
              }}
            >
              {priority.label}
            </span>
            <span 
              className="text-[11px] font-semibold"
              style={{ color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}
            >
              {categoryLabels[insight.category]}
            </span>
          </div>
          <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-tertiary)' }}>
            {insight.updatedAt}
          </span>
        </div>

        <h3 
          className="text-lg font-semibold leading-snug mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          {insight.headline}
        </h3>
        
        {!isExpanded && (
          <p 
            className="text-sm leading-relaxed line-clamp-2 mb-4"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}
          >
            {insight.summary}
          </p>
        )}

        <div 
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span 
            className="flex items-center gap-1 text-sm"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Expand
              </>
            )}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div style={{ padding: '0 24px 20px' }}>
          {children}
        </div>
      )}
    </div>
  );
}
