// ABOUTME: Main briefing page displaying insight cards and interactions.
// ABOUTME: Manages state for card expansion, modals, voice playback, and view toggle.

'use client';

import { useState, useCallback } from 'react';
import BriefingHeader from '@/components/BriefingHeader';
import InsightCard from '@/components/InsightCard';
import InsightCardExpanded from '@/components/InsightCardExpanded';
import FeedbackButtons from '@/components/FeedbackButtons';
import ActionModal from '@/components/ActionModal';
import UndoToast from '@/components/UndoToast';
import BriefMeChat from '@/components/BriefMeChat';
import VoicePlayer from '@/components/VoicePlayer';
import WeeklyView from '@/components/WeeklySynthesis/WeeklyView';
import WhatYouTaughtMePanel from '@/components/WhatYouTaughtMe/WhatYouTaughtMePanel';
import { insights as initialInsights } from '@/data/insights';
import { weeklyData } from '@/data/weekly';
import { learningData } from '@/data/learning';
import { Insight, RecommendedAction } from '@/types';

export default function Home() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleInsights, setVisibleInsights] = useState<Insight[]>(initialInsights);
  const [dismissedInsight, setDismissedInsight] = useState<Insight | null>(null);
  const [dismissingId, setDismissingId] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<RecommendedAction | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [activeView, setActiveView] = useState<'daily' | 'weekly'>('daily');
  const [isLearningOpen, setIsLearningOpen] = useState(false);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleVoiceClick = () => {
    setIsVoiceOpen(true);
  };

  const handleDismiss = useCallback((insight: Insight) => {
    setDismissingId(insight.id);
    setTimeout(() => {
      setDismissedInsight(insight);
      setVisibleInsights((prev) => prev.filter((i) => i.id !== insight.id));
      setExpandedId(null);
      setDismissingId(null);
    }, 300);
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
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <BriefingHeader 
        itemCount={visibleInsights.length} 
        onVoiceClick={handleVoiceClick}
        activeView={activeView}
        onViewToggle={setActiveView}
        onLearningClick={() => setIsLearningOpen(true)}
      />

      {activeView === 'weekly' ? (
        <WeeklyView 
          data={weeklyData} 
          onActionGap={(gap) => console.log('Action gap clicked:', gap)}
        />
      ) : (
      <div className="space-y-4">
        {visibleInsights.map((insight) => (
          <div
            key={insight.id}
            className={dismissingId === insight.id ? 'animate-slide-out-right' : ''}
          >
            <InsightCard
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
                  onThumbsDown={(reason) => console.log('Thumbs down:', insight.id, reason)}
                  onDismiss={() => handleDismiss(insight)}
                  onWatch={() => console.log('Watch:', insight.id)}
                />
              </>
            )}
            </InsightCard>
          </div>
        ))}
      </div>
      )}

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

      <BriefMeChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <VoicePlayer isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      <WhatYouTaughtMePanel 
        isOpen={isLearningOpen} 
        onClose={() => setIsLearningOpen(false)}
        data={learningData}
      />

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        title="Brief Me"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
