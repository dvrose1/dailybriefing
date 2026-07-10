// ABOUTME: Derives the "What you've taught me" data from relevance feedback.
// ABOUTME: Feedback on delivered cards flows back into learned-preference lines.

import { Delivery, LearningData, Signal } from '@/types';

// Merge live relevance feedback into the base (seed) learning data. The base
// stays as ambient context; feedback appends honest, specific lines.
export function buildLearningData(
  deliveries: Delivery[],
  signalById: Map<string, Signal>,
  base: LearningData,
): LearningData {
  const notRelevantByType: Record<string, number> = {};
  const usefulByType: Record<string, number> = {};

  for (const d of deliveries) {
    if (!d.relevance) continue;
    const sig = signalById.get(d.signalId);
    if (!sig) continue;
    const key = sig.source;
    if (d.relevance === 'not_relevant') {
      notRelevantByType[key] = (notRelevantByType[key] ?? 0) + 1;
    } else {
      usefulByType[key] = (usefulByType[key] ?? 0) + 1;
    }
  }

  const learnedFromFeedback: string[] = [];
  for (const [type, count] of Object.entries(notRelevantByType)) {
    learnedFromFeedback.push(
      `You marked ${count} ${type} ${plural(count, 'alert')} not relevant. Want fewer of these?`,
    );
  }
  for (const [type, count] of Object.entries(usefulByType)) {
    learnedFromFeedback.push(
      `You found ${count} ${type} ${plural(count, 'alert')} useful. These will keep priority.`,
    );
  }

  return {
    ...base,
    learnedPreferences: [...learnedFromFeedback, ...base.learnedPreferences],
  };
}

function plural(n: number, word: string): string {
  return n === 1 ? word : `${word}s`;
}
