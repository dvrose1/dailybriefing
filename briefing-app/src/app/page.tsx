// ABOUTME: Main briefing page displaying insight cards and interactions.
// ABOUTME: Manages state for card expansion, modals, and voice playback.

'use client';

import { useState } from 'react';
import BriefingHeader from '@/components/BriefingHeader';
import InsightCard from '@/components/InsightCard';
import { insights } from '@/data/insights';

export default function Home() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleVoiceClick = () => {
    // TODO: Implement voice playback
    console.log('Voice briefing clicked');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BriefingHeader itemCount={insights.length} onVoiceClick={handleVoiceClick} />

      <div className="space-y-4">
        {insights.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            isExpanded={expandedId === insight.id}
            onToggle={() => handleToggle(insight.id)}
          >
            {expandedId === insight.id && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600 whitespace-pre-line">
                  {insight.expandedAnalysis}
                </p>
              </div>
            )}
          </InsightCard>
        ))}
      </div>
    </div>
  );
}
