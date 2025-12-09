// ABOUTME: Expanded content section for insight cards.
// ABOUTME: Fluent Premium style with Microsoft blue accents.

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Insight } from '@/types';
import Chart from './Chart';

interface InsightCardExpandedProps {
  insight: Insight;
  onActionClick: () => void;
}

const confidenceColors = {
  high: { bg: 'var(--informational-bg)', color: '#107c10' },
  medium: { bg: 'var(--important-bg)', color: 'var(--important)' },
  low: { bg: 'var(--urgent-bg)', color: 'var(--urgent)' },
};

export default function InsightCardExpanded({
  insight,
  onActionClick,
}: InsightCardExpandedProps) {
  const [showWhySeeing, setShowWhySeeing] = useState(false);

  return (
    <div className="space-y-5 mt-4">
      <div>
        {insight.expandedAnalysis.split('\n\n').map((paragraph, idx) => (
          <p 
            key={idx} 
            className="text-sm mb-3"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.65' }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {insight.chartData && insight.chartData.length > 0 && (
        <div 
          className="rounded-lg p-4"
          style={{ background: 'var(--background)' }}
        >
          <Chart
            data={insight.chartData}
            color={insight.priority === 'urgent' ? 'var(--urgent)' : 'var(--accent)'}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {insight.sources.map((source) => (
          <span
            key={source}
            className="text-xs px-2.5 py-1 rounded"
            style={{ background: 'var(--bg-hover)', color: 'var(--text-tertiary)' }}
          >
            {source}
          </span>
        ))}
        <span
          className="text-xs px-2.5 py-1 rounded capitalize"
          style={{ 
            background: confidenceColors[insight.confidence].bg, 
            color: confidenceColors[insight.confidence].color 
          }}
        >
          {insight.confidence} confidence
        </span>
      </div>

      <button
        onClick={() => setShowWhySeeing(!showWhySeeing)}
        className="flex items-center gap-1 text-[13px] transition-colors"
        style={{ color: 'var(--accent)' }}
      >
        <Info size={14} />
        Why am I seeing this?
        {showWhySeeing ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showWhySeeing && (
        <div 
          className="rounded-md p-4"
          style={{ background: 'var(--background)' }}
        >
          <p className="text-[13px]" style={{ color: 'var(--text-tertiary)', lineHeight: '1.5' }}>{insight.whySeeing}</p>
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onActionClick}
          className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
          style={{ background: 'var(--accent)', color: 'white' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
        >
          {insight.recommendedAction.label}
        </button>
      </div>
    </div>
  );
}
