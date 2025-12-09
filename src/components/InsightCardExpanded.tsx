// ABOUTME: Expanded content section for insight cards.
// ABOUTME: Shows full analysis, chart, sources, confidence, and action button.

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
  high: { bg: '#f2f5f4', color: 'var(--informational)' },
  medium: { bg: '#fef8f0', color: 'var(--important)' },
  low: { bg: '#fef2f0', color: 'var(--urgent)' },
};

export default function InsightCardExpanded({
  insight,
  onActionClick,
}: InsightCardExpandedProps) {
  const [showWhySeeing, setShowWhySeeing] = useState(false);

  return (
    <div className="space-y-5 mt-4" style={{ maxWidth: '640px' }}>
      <div>
        {insight.expandedAnalysis.split('\n\n').map((paragraph, idx) => (
          <p 
            key={idx} 
            className="text-[15px] mb-4"
            style={{ color: 'var(--text-body)', lineHeight: '1.7' }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {insight.chartData && insight.chartData.length > 0 && (
        <div 
          className="rounded p-4"
          style={{ background: 'var(--bg-elevated)' }}
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
            className="text-xs px-2 py-1 rounded"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
          >
            {source}
          </span>
        ))}
        <span
          className="text-xs px-2 py-1 rounded capitalize"
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
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <Info size={14} />
        Why am I seeing this?
        {showWhySeeing ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showWhySeeing && (
        <div 
          className="rounded p-4"
          style={{ background: 'var(--accent-light)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-body)' }}>{insight.whySeeing}</p>
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onActionClick}
          className="px-5 py-2.5 text-sm font-medium rounded transition-colors"
          style={{ background: 'var(--foreground)', color: 'white' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--foreground)'}
        >
          {insight.recommendedAction.label}
        </button>
      </div>
    </div>
  );
}
