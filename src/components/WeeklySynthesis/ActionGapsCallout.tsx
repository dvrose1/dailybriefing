// ABOUTME: Warning callout showing action gaps that need attention.
// ABOUTME: Displays items the user hasn't acted on yet with action buttons.

import { AlertTriangle } from 'lucide-react';
import { ActionGap } from '@/types';

interface ActionGapsCalloutProps {
  gaps: ActionGap[];
  onAction?: (gap: ActionGap) => void;
}

export default function ActionGapsCallout({ gaps, onAction }: ActionGapsCalloutProps) {
  if (gaps.length === 0) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={18} className="text-amber-600" />
        <span className="text-sm font-semibold text-amber-800">Action Gaps</span>
      </div>

      <div className="space-y-3">
        {gaps.map((gap, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-amber-900">
              <span className="font-medium">{gap.item}</span>
              <span className="text-amber-700"> ({gap.day})</span>
              <span className="text-amber-700"> — {gap.issue}</span>
            </div>
            <button
              onClick={() => onAction?.(gap)}
              className="text-sm font-medium text-amber-700 hover:text-amber-900 hover:underline shrink-0"
            >
              [{gap.actionLabel}]
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
