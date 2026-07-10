// ABOUTME: Main briefing page displaying insight cards and interactions.
// ABOUTME: Gates on onboarding, switches per active persona, merges routed notifications.

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import BriefingHeader from '@/components/BriefingHeader';
import InsightCard from '@/components/InsightCard';
import InsightCardExpanded from '@/components/InsightCardExpanded';
import FeedbackButtons from '@/components/FeedbackButtons';
import RelevanceBar from '@/components/RelevanceBar';
import ActionModal from '@/components/ActionModal';
import UndoToast from '@/components/UndoToast';
import BriefMeChat from '@/components/BriefMeChat';
import VoicePlayer from '@/components/VoicePlayer';
import WeeklyView from '@/components/WeeklySynthesis/WeeklyView';
import WhatYouTaughtMePanel from '@/components/WhatYouTaughtMe/WhatYouTaughtMePanel';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import { insights as seedInsights } from '@/data/insights';
import { weeklyData } from '@/data/weekly';
import { learningData } from '@/data/learning';
import { Insight, RecommendedAction } from '@/types';
import { useStore, deliveryToInsight } from '@/lib/store';
import { buildLearningData } from '@/lib/learning';

export default function Home() {
  const { activePersona, deliveries, signals } = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [lastDismissed, setLastDismissed] = useState<Insight | null>(null);
  const [dismissingId, setDismissingId] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<RecommendedAction | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [activeView, setActiveView] = useState<'daily' | 'weekly'>('daily');
  const [isLearningOpen, setIsLearningOpen] = useState(false);

  // Reset transient view state when the demo persona changes.
  useEffect(() => {
    setExpandedId(null);
    setDismissedIds([]);
    setLastDismissed(null);
  }, [activePersona.id]);

  // Notifications routed to this persona from the console.
  const myDeliveries = useMemo(
    () => deliveries.filter((d) => d.personaId === activePersona.id),
    [deliveries, activePersona.id],
  );
  const signalById = useMemo(
    () => new Map(signals.map((s) => [s.id, s])),
    [signals],
  );

  const routedInsights = useMemo(
    () =>
      myDeliveries
        .filter((d) => !d.routedToDigest)
        .map((d) => {
          const sig = signalById.get(d.signalId);
          return sig ? deliveryToInsight(d, sig) : null;
        })
        .filter((x): x is Insight => x !== null),
    [myDeliveries, signalById],
  );

  const digestInsights = useMemo(
    () =>
      myDeliveries
        .filter((d) => d.routedToDigest)
        .map((d) => {
          const sig = signalById.get(d.signalId);
          return sig ? deliveryToInsight(d, sig) : null;
        })
        .filter((x): x is Insight => x !== null),
    [myDeliveries, signalById],
  );

  // Routed cards sit on top of the ambient seed briefing.
  const feed = useMemo(
    () => [...routedInsights, ...seedInsights].filter((i) => !dismissedIds.includes(i.id)),
    [routedInsights, dismissedIds],
  );

  // "What you've taught me" reflects this persona's relevance feedback.
  const learning = useMemo(
    () => buildLearningData(myDeliveries, signalById, learningData),
    [myDeliveries, signalById],
  );

  const handleToggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  const handleDismiss = useCallback((insight: Insight) => {
    setDismissingId(insight.id);
    setTimeout(() => {
      setLastDismissed(insight);
      setDismissedIds((prev) => [...prev, insight.id]);
      setExpandedId(null);
      setDismissingId(null);
    }, 300);
  }, []);

  const handleUndo = useCallback(() => {
    if (lastDismissed) {
      setDismissedIds((prev) => prev.filter((id) => id !== lastDismissed.id));
      setLastDismissed(null);
    }
  }, [lastDismissed]);

  // First-run: onboarding wizard until this persona finishes setup.
  if (!activePersona.onboardingComplete) {
    return <OnboardingWizard profile={activePersona} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <BriefingHeader
        itemCount={feed.length}
        personaName={activePersona.name}
        onVoiceClick={() => setIsVoiceOpen(true)}
        activeView={activeView}
        onViewToggle={setActiveView}
        onLearningClick={() => setIsLearningOpen(true)}
      />

      {activeView === 'weekly' ? (
        <WeeklyView data={weeklyData} onActionGap={() => {}} />
      ) : (
        <div className="space-y-4">
          {routedInsights.length > 0 && (
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Routed to you
            </p>
          )}
          {feed.map((insight, idx) => {
            // Insert a divider between routed cards and the ambient briefing.
            const showAmbientDivider =
              routedInsights.length > 0 && idx === routedInsights.length;
            return (
              <div key={insight.id}>
                {showAmbientDivider && (
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                    Your briefing
                  </p>
                )}
                <div className={dismissingId === insight.id ? 'animate-slide-out-right' : ''}>
                  <InsightCard
                    insight={insight}
                    isExpanded={expandedId === insight.id}
                    onToggle={() => handleToggle(insight.id)}
                  >
                    {expandedId === insight.id && (
                      <>
                        <InsightCardExpanded
                          insight={insight}
                          onActionClick={() => setActiveAction(insight.recommendedAction)}
                        />
                        {insight.deliveryId ? (
                          <RelevanceBar
                            deliveryId={insight.deliveryId}
                            onDismiss={() => handleDismiss(insight)}
                          />
                        ) : (
                          <FeedbackButtons
                            onThumbsUp={() => {}}
                            onThumbsDown={() => {}}
                            onDismiss={() => handleDismiss(insight)}
                            onWatch={() => {}}
                          />
                        )}
                      </>
                    )}
                  </InsightCard>
                </div>
              </div>
            );
          })}

          {digestInsights.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                In your daily digest ({digestInsights.length})
              </p>
              <div className="space-y-4">
                {digestInsights.map((insight) => (
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
                          onActionClick={() => setActiveAction(insight.recommendedAction)}
                        />
                        {insight.deliveryId && (
                          <RelevanceBar
                            deliveryId={insight.deliveryId}
                            onDismiss={() => handleDismiss(insight)}
                          />
                        )}
                      </>
                    )}
                  </InsightCard>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeAction && (
        <ActionModal
          action={activeAction}
          onClose={() => setActiveAction(null)}
          onSubmit={() => setActiveAction(null)}
        />
      )}

      {lastDismissed && (
        <UndoToast
          message="Insight dismissed"
          onUndo={handleUndo}
          onClose={() => setLastDismissed(null)}
        />
      )}

      <BriefMeChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <VoicePlayer isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      <WhatYouTaughtMePanel
        isOpen={isLearningOpen}
        onClose={() => setIsLearningOpen(false)}
        data={learning}
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
