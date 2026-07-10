// ABOUTME: Send log table: every approved send with recipients, rules, and relevance.
// ABOUTME: Relevance feedback from recipients shows up here per send.

'use client';

import { Moon, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function SendLog() {
  const { signals, personas, deliveries } = useStore();

  const sent = signals.filter((s) => s.status === 'approved');

  if (sent.length === 0) {
    return (
      <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-lg p-6 text-center">
        Nothing sent yet. Approve a signal in the queue to see it here.
      </p>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
            <th className="px-4 py-2.5 font-semibold">Signal</th>
            <th className="px-4 py-2.5 font-semibold">Approved</th>
            <th className="px-4 py-2.5 font-semibold">Recipients and matched rule</th>
            <th className="px-4 py-2.5 font-semibold">Relevance</th>
          </tr>
        </thead>
        <tbody>
          {sent.map((signal) => {
            const sends = deliveries.filter((d) => d.signalId === signal.id);
            const rated = sends.filter((d) => d.relevance);
            const useful = sends.filter((d) => d.relevance === 'useful');
            return (
              <tr key={signal.id} className="border-b border-slate-50 align-top">
                <td className="px-4 py-3 min-w-[180px]">
                  <p className="font-medium text-slate-700">{signal.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{signal.source}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                  <p>{signal.approvedBy}</p>
                  <p className="text-slate-400">{signal.approvedAt}</p>
                </td>
                <td className="px-4 py-3">
                  {sends.length === 0 ? (
                    <span className="text-xs text-slate-400">No recipients</span>
                  ) : (
                    <ul className="space-y-1.5">
                      {sends.map((d) => {
                        const persona = personas.find((p) => p.id === d.personaId);
                        return (
                          <li key={d.id} className="text-xs text-slate-600">
                            <span className="font-medium text-slate-700">
                              {persona?.name ?? d.personaId}
                            </span>
                            <span
                              className={`inline-flex items-center gap-0.5 ml-1.5 px-1.5 py-0.5 rounded text-[10px] ${
                                d.routedToDigest
                                  ? 'bg-slate-100 text-slate-500'
                                  : 'bg-green-50 text-green-700'
                              }`}
                            >
                              {d.routedToDigest ? <Moon size={10} /> : <Zap size={10} />}
                              {d.routedToDigest ? 'digest' : 'realtime'}
                            </span>
                            <p className="text-slate-400">{d.matchedRule}</p>
                            {d.relevanceComment && (
                              <p className="text-slate-500 italic">
                                &ldquo;{d.relevanceComment}&rdquo;
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-xs">
                  {rated.length === 0 ? (
                    <span className="text-slate-400">No feedback yet</span>
                  ) : (
                    <>
                      <p className="font-medium text-slate-700">
                        {Math.round((useful.length / rated.length) * 100)}% useful
                      </p>
                      <p className="text-slate-400">
                        {rated.length} of {sends.length} rated
                      </p>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
