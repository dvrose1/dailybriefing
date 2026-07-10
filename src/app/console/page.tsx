// ABOUTME: Ops console (Hub B) for the delivery team: queue, compose, send log.
// ABOUTME: Plain and dense on purpose. Nothing reaches a recipient without approval here.

'use client';

import { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { useStore } from '@/lib/store';
import { resolveAudience, ROUTING_RULES_SUMMARY } from '@/lib/routing';
import SignalQueue from '@/components/console/SignalQueue';
import SignalForm from '@/components/console/SignalForm';
import SendLog from '@/components/console/SendLog';
import RelevanceSummary from '@/components/console/RelevanceSummary';

export default function ConsolePage() {
  const { signals, personas, deliveries, addSignal } = useStore();
  const [composing, setComposing] = useState(false);

  const queuedCount = signals.filter((s) => s.status === 'queued').length;

  // Routing misses: signals no rule matched, logged visibly regardless of status.
  const misses = signals.filter((s) => resolveAudience(s, personas).unmatched);
  const missStatus = (id: string, status: string) => {
    if (status === 'dismissed') return 'dismissed';
    if (status === 'approved')
      return deliveries.some((d) => d.signalId === id) ? 'manually routed' : 'sent to no one';
    return 'in queue';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Notification Console</h1>
        <p className="text-sm text-slate-500">
          Internal ops surface. Mock signals, real routing rules. Nothing reaches a briefing
          without approval here.
        </p>
      </div>

      <Section
        title={`Signal queue (${queuedCount})`}
        subtitle="Candidate notifications awaiting routing review"
        action={
          <button
            onClick={() => setComposing((c) => !c)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Plus size={14} />
            Compose
          </button>
        }
      >
        {composing && (
          <div className="bg-white border border-blue-300 rounded-lg p-4 mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
              New manual notification
            </p>
            <SignalForm
              submitLabel="Add to queue"
              onSubmit={(draft) => {
                addSignal(draft);
                setComposing(false);
              }}
              onCancel={() => setComposing(false)}
            />
          </div>
        )}
        <SignalQueue />
      </Section>

      <Section title="Routing rules v1" subtitle="Deterministic, one sentence each. No LLM scoring.">
        <ul className="bg-white border border-slate-200 rounded-lg p-4 space-y-1.5">
          {ROUTING_RULES_SUMMARY.map((rule) => (
            <li key={rule} className="text-sm text-slate-600 flex gap-2">
              <span className="text-slate-300">•</span>
              {rule}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title={`Routing misses (${misses.length})`}
        subtitle="Signals no rule matched. Each miss is a gap for rules v2."
      >
        {misses.length === 0 ? (
          <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-lg p-6 text-center">
            No misses. Every signal matched at least one profile.
          </p>
        ) : (
          <ul className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
            {misses.map((s) => (
              <li key={s.id} className="flex items-start gap-2 text-sm text-amber-900">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <span className="font-medium">{s.title}</span>
                  <span className="text-amber-700">
                    {' '}
                    · {s.source} · {missStatus(s.id, s.status)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Send log" subtitle="Every approved send, its audience rule, and feedback">
        <SendLog />
      </Section>

      <Section
        title="Relevance by signal type"
        subtitle="Aggregate recipient feedback across all sends"
      >
        <RelevanceSummary />
      </Section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
