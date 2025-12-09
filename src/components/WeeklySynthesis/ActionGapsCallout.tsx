// ABOUTME: Warning callout showing action gaps that need attention.
// ABOUTME: Fluent Premium style with important color scheme.

import { AlertTriangle } from 'lucide-react';
import { ActionGap } from '@/types';

interface ActionGapsCalloutProps {
  gaps: ActionGap[];
  onAction?: (gap: ActionGap) => void;
}

export default function ActionGapsCallout({ gaps, onAction }: ActionGapsCalloutProps) {
  if (gaps.length === 0) return null;

  return (
    <div 
      className="rounded-lg p-4 sm:p-5"
      style={{ background: 'var(--important-bg)', border: '1px solid var(--important)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={18} style={{ color: 'var(--important)' }} />
        <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Action Gaps</span>
      </div>

      <div className="space-y-3">
        {gaps.map((gap, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>{gap.item}</span>
              <span> ({gap.day})</span>
              <span> — {gap.issue}</span>
            </div>
            <button
              onClick={() => onAction?.(gap)}
              className="text-sm font-medium shrink-0 transition-colors"
              style={{ color: 'var(--accent)' }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {gap.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
