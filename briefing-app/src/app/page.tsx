// ABOUTME: Main briefing page displaying insight cards and interactions.
// ABOUTME: Manages state for card expansion, modals, and voice playback.

'use client';

import { useState, useCallback } from 'react';
import BriefingHeader from '@/components/BriefingHeader';
import InsightCard from '@/components/InsightCard';
import InsightCardExpanded from '@/components/InsightCardExpanded';
import FeedbackButtons from '@/components/FeedbackButtons';
import ActionModal from '@/components/ActionModal';
import UndoToast from '@/components/UndoToast';
import { insights as initialInsights } from '@/data/insights';
import { Insight, RecommendedAction } from '@/types';

export default function Home() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleInsights, setVisibleInsights] = useState<Insight[]>(initialInsights);
  const [dismissedInsight, setDismissedInsight] = useState<Insight | null>(null);
  const [activeAction, setActiveAction] = useState<RecommendedAction | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleVoiceClick = () => {
    // TODO: Implement voice playback
    console.log('Voice briefing clicked');
  };

  const handleDismiss = useCallback((insight: Insight) => {
    setDismissedInsight(insight);
    setVisibleInsights((prev) => prev.filter((i) => i.id !== insight.id));
    setExpandedId(null);
  }, []);

  const handleUndo = useCallback(() => {
    if (dismissedInsight) {
      setVisibleInsights((prev) => {
        const index = initialInsights.findIndex((i) => i.id === dismissedInsight.id);
        const newInsights = [...prev];
        newInsights.splice(index, 0, dismissedInsight);
        return newInsights;
      });
      setDismissedInsight(null);
    }
  }, [dismissedInsight]);

  const handleActionClick = (action: RecommendedAction) => {
    setActiveAction(action);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BriefingHeader itemCount={visibleInsights.length} onVoiceClick={handleVoiceClick} />

      <div className="space-y-4">
        {visibleInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            isExpanded={expandedId === insight.id}
            onToggle={() => handleToggle(insight.id)}
          >
            {expandedId === insight.id && (
              <>
                <InsightCardExpanded
                  insight={insight}
                  onActionClick={() => handleActionClick(insight.recommendedAction)}
                />
                <FeedbackButtons
                  onThumbsUp={() => console.log('Thumbs up:', insight.id)}
                  onThumbsDown={() => console.log('Thumbs down:', insight.id)}
                  onDismiss={() => handleDismiss(insight)}
                  onWatch={() => console.log('Watch:', insight.id)}
                />
              </>
            )}
          </InsightCard>
        ))}
      </div>

      {activeAction && (
        <ActionModal
          action={activeAction}
          onClose={() => setActiveAction(null)}
          onSubmit={() => console.log('Action submitted:', activeAction.type)}
        />
      )}

      {dismissedInsight && (
        <UndoToast
          message="Insight dismissed"
          onUndo={handleUndo}
          onClose={() => setDismissedInsight(null)}
        />
      )}
    </div>
  );
}
