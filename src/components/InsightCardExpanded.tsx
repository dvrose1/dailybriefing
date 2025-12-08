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
  high: 'text-green-600 bg-green-50',
  medium: 'text-amber-600 bg-amber-50',
  low: 'text-red-600 bg-red-50',
};

export default function InsightCardExpanded({
  insight,
  onActionClick,
}: InsightCardExpandedProps) {
  const [showWhySeeing, setShowWhySeeing] = useState(false);

  return (
    <div className="space-y-4">
      <div className="prose prose-sm max-w-none">
        {insight.expandedAnalysis.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="text-sm text-slate-600 mb-3">
            {paragraph}
          </p>
        ))}
      </div>

      {insight.chartData && insight.chartData.length > 0 && (
        <div className="bg-slate-50 rounded-lg p-4">
          <Chart
            data={insight.chartData}
            color={insight.priority === 'urgent' ? '#dc2626' : '#2563eb'}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {insight.sources.map((source) => (
          <span
            key={source}
            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
          >
            {source}
          </span>
        ))}
        <span
          className={`text-xs px-2 py-1 rounded capitalize ${
            confidenceColors[insight.confidence]
          }`}
        >
          {insight.confidence} confidence
        </span>
      </div>

      <button
        onClick={() => setShowWhySeeing(!showWhySeeing)}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <Info size={14} />
        Why am I seeing this?
        {showWhySeeing ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showWhySeeing && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-sm text-blue-800">{insight.whySeeing}</p>
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onActionClick}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {insight.recommendedAction.label}
        </button>
      </div>
    </div>
  );
}
