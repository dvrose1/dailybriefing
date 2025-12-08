// ABOUTME: Collapsible insight card component for displaying briefing items.
// ABOUTME: Shows priority badge, category, headline, summary, and expand/collapse.

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
    border: 'border-l-red-500',
    badge: 'bg-red-100 text-red-700',
    label: 'URGENT',
  },
  important: {
    border: 'border-l-amber-500',
    badge: 'bg-amber-100 text-amber-700',
    label: 'IMPORTANT',
  },
  informational: {
    border: 'border-l-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    label: 'INFO',
  },
};

const categoryLabels: Record<Insight['category'], string> = {
  performance: 'Performance',
  competitive: 'Competitive',
  social: 'Social',
  calendar: 'Calendar',
  industry: 'Industry',
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
      className={`bg-white rounded-lg shadow-sm border-l-4 ${priority.border} transition-shadow hover:shadow-md`}
    >
      <button
        onClick={onToggle}
        className="w-full p-3 sm:p-4 text-left flex items-start gap-3 sm:gap-4"
      >
        <div className="flex flex-col gap-1 sm:gap-2 shrink-0">
          <span
            className={`text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded ${priority.badge}`}
          >
            {priority.label}
          </span>
          <span className="text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded bg-slate-100 text-slate-600 hidden sm:block">
            {categoryLabels[insight.category]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-slate-800">
            {insight.headline}
          </h3>
          {!isExpanded && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">
              {insight.summary}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
          <span className="text-xs text-slate-400 hidden sm:block">{insight.updatedAt}</span>
          {isExpanded ? (
            <ChevronUp size={20} className="text-slate-400" />
          ) : (
            <ChevronDown size={20} className="text-slate-400" />
          )}
        </div>
      </button>

      {isExpanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
