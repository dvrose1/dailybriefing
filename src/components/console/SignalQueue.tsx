// ABOUTME: Ops console signal queue with audience preview, approve/edit/dismiss.
// ABOUTME: Unmatched signals show a manual-routing flag and a hand-pick recipient list.

'use client';

import { useState } from 'react';
import { AlertTriangle, Check, Moon, Pencil, X, Zap } from 'lucide-react';
import { Signal } from '@/types';
import { useStore, MAX_REALTIME_SENDS } from '@/lib/store';
import { resolveAudience } from '@/lib/routing';
import SignalForm, { SignalDraft } from '@/components/console/SignalForm';

const PRIORITY_STYLES: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700',
  important: 'bg-amber-100 text-amber-700',
  informational: 'bg-blue-100 text-blue-700',
};

export default function SignalQueue() {
  const { signals, personas, deliveries, approveSignal, dismissSignal, updateSignal } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [manualPicks, setManualPicks] = useState<Record<string, string[]>>({});

  const queued = signals.filter((s) => s.status === 'queued');

  const realtimeCount = (personaId: string) =>
    deliveries.filter((d) => d.personaId === personaId && !d.routedToDigest).length;

  const togglePick = (signalId: string, personaId: string) =>
    setManualPicks((m) => {
      const cur = m[signalId] ?? [];
      return {
        ...m,
        [signalId]: cur.includes(personaId)
          ? cur.filter((id) => id !== personaId)
          : [...cur, personaId],
      };
    });

  if (queued.length === 0) {
    return (
      <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-lg p-6 text-center">
        Queue is empty. Compose a signal below or reset the demo from the Profile page.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {queued.map((signal) => {
        const { matches, unmatched } = resolveAudience(signal, personas);
        const picks = manualPicks[signal.id] ?? [];

        if (editingId === signal.id) {
          return (
            <div key={signal.id} className="bg-white border border-blue-300 rounded-lg p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Editing signal
              </p>
              <SignalForm
                initial={toDraft(signal)}
                submitLabel="Save changes"
                onSubmit={(draft) => {
                  updateSignal({ ...signal, ...draft });
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            </div>
          );
        }

        return (
          <div key={signal.id} className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[11px] font-semibold uppercase ${PRIORITY_STYLES[signal.priority]}`}
                  >
                    {signal.priority}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600">
                    {signal.source}
                  </span>
                  {signal.brandTags.map((b) => (
                    <span key={b} className="px-1.5 py-0.5 rounded text-[11px] bg-slate-50 text-slate-500 border border-slate-200">
                      {b}
                    </span>
                  ))}
                  {signal.marketTags.map((m) => (
                    <span key={m} className="px-1.5 py-0.5 rounded text-[11px] bg-slate-50 text-slate-500 border border-slate-200">
                      {m}
                    </span>
                  ))}
                  <span className="text-[11px] text-slate-400 ml-1">{signal.createdAt}</span>
                </div>
                <p className="text-sm font-medium text-slate-800">{signal.title}</p>
                <p className="text-sm text-slate-500 mt-0.5">{signal.body}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditingId(signal.id)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100"
                  title="Edit signal"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => dismissSignal(signal.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"
                  title="Dismiss signal"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Audience resolution */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              {unmatched ? (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 mb-2">
                    <AlertTriangle size={14} />
                    Needs manual routing. No rule matched any onboarded profile. Miss logged below.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-500">Route manually to:</span>
                    {personas
                      .filter((p) => p.onboardingComplete)
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => togglePick(signal.id, p.id)}
                          className={`px-2 py-0.5 rounded text-xs border ${
                            picks.includes(p.id)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    <button
                      onClick={() => approveSignal(signal.id, picks)}
                      disabled={picks.length === 0}
                      className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-40"
                    >
                      <Check size={13} />
                      Approve to selected
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                    Audience preview ({matches.length})
                  </p>
                  <ul className="space-y-1 mb-2">
                    {matches.map((m) => {
                      const persona = personas.find((p) => p.id === m.personaId)!;
                      const digest =
                        persona.cadence === 'Daily digest' ||
                        realtimeCount(persona.id) >= MAX_REALTIME_SENDS;
                      return (
                        <li key={m.personaId} className="text-xs text-slate-600">
                          <span className="font-medium text-slate-700">{persona.name}</span>
                          <span
                            className={`inline-flex items-center gap-0.5 ml-1.5 px-1.5 py-0.5 rounded text-[10px] ${
                              digest ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-700'
                            }`}
                            title={
                              digest
                                ? 'Batched into their next daily digest (cadence preference or fatigue cap)'
                                : 'Delivered immediately'
                            }
                          >
                            {digest ? <Moon size={10} /> : <Zap size={10} />}
                            {digest ? 'digest' : 'realtime'}
                          </span>
                          <span className="text-slate-400"> · {m.rule}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={() => approveSignal(signal.id)}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    <Check size={13} />
                    Approve and send
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function toDraft(signal: Signal): SignalDraft {
  const { title, body, priority, category, source, brandTags, marketTags, attendeeIds } = signal;
  return { title, body, priority, category, source, brandTags, marketTags, attendeeIds };
}
