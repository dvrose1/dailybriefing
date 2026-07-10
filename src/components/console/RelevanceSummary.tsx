// ABOUTME: Aggregate relevance feedback per signal source type.
// ABOUTME: This is the data that trains Phase 2 routing automation.

'use client';

import { SignalSource } from '@/types';
import { useStore } from '@/lib/store';

const SOURCES: SignalSource[] = [
  'Bleeding Campaign',
  'Post-Meeting Insight',
  'Social Trend',
  'Manual/Other',
];

export default function RelevanceSummary() {
  const { signals, deliveries } = useStore();
  const signalById = new Map(signals.map((s) => [s.id, s]));

  const rows = SOURCES.map((source) => {
    const sends = deliveries.filter((d) => signalById.get(d.signalId)?.source === source);
    const rated = sends.filter((d) => d.relevance);
    const useful = sends.filter((d) => d.relevance === 'useful');
    return { source, sends: sends.length, rated: rated.length, useful: useful.length };
  }).filter((r) => r.sends > 0);

  if (rows.length === 0) {
    return (
      <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-lg p-6 text-center">
        No sends yet. Aggregate relevance by signal type appears here once recipients rate cards.
      </p>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <ul className="space-y-2">
        {rows.map((r) => {
          const pct = r.rated > 0 ? Math.round((r.useful / r.rated) * 100) : null;
          return (
            <li key={r.source} className="flex items-center gap-3 text-sm">
              <span className="w-44 shrink-0 text-slate-600">{r.source}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${pct ?? 0}%` }}
                />
              </div>
              <span className="w-40 shrink-0 text-xs text-slate-500 text-right">
                {pct === null
                  ? `${r.sends} sent, unrated`
                  : `${pct}% useful (${r.rated}/${r.sends} rated)`}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-slate-400 mt-3">
        Relevance by signal type. This is the data that trains Phase 2 routing automation.
      </p>
    </div>
  );
}
