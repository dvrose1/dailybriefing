// ABOUTME: Form for composing a new signal or editing a queued one.
// ABOUTME: Same fields as seeded signals: title, body, type, urgency, tags, source.

'use client';

import { useState } from 'react';
import { Category, Market, Priority, Signal, SignalSource } from '@/types';
import { ALL_BRANDS, MARKETS } from '@/data/personas';
import { useStore } from '@/lib/store';

export type SignalDraft = Omit<Signal, 'id' | 'createdAt' | 'status'>;

const SOURCES: SignalSource[] = [
  'Bleeding Campaign',
  'Post-Meeting Insight',
  'Social Trend',
  'Manual/Other',
];
const PRIORITIES: Priority[] = ['urgent', 'important', 'informational'];
const CATEGORIES: Category[] = ['performance', 'competitive', 'social', 'calendar', 'industry'];

const EMPTY_DRAFT: SignalDraft = {
  title: '',
  body: '',
  priority: 'important',
  category: 'performance',
  source: 'Manual/Other',
  brandTags: [],
  marketTags: [],
  attendeeIds: [],
};

interface Props {
  initial?: SignalDraft;
  submitLabel: string;
  onSubmit: (draft: SignalDraft) => void;
  onCancel?: () => void;
}

export default function SignalForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const { personas } = useStore();
  const [draft, setDraft] = useState<SignalDraft>(initial ?? EMPTY_DRAFT);
  const set = (patch: Partial<SignalDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const valid = draft.title.trim().length > 0 && draft.body.trim().length > 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Labeled label="Source">
          <select
            value={draft.source}
            onChange={(e) => set({ source: e.target.value as SignalSource })}
            className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm bg-white"
          >
            {SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Urgency">
          <select
            value={draft.priority}
            onChange={(e) => set({ priority: e.target.value as Priority })}
            className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm bg-white"
          >
            {PRIORITIES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Category">
          <select
            value={draft.category}
            onChange={(e) => set({ category: e.target.value as Category })}
            className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Labeled>
      </div>

      <Labeled label="Title">
        <input
          type="text"
          value={draft.title}
          onChange={(e) => set({ title: e.target.value })}
          className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm"
        />
      </Labeled>

      <Labeled label="Body">
        <textarea
          value={draft.body}
          onChange={(e) => set({ body: e.target.value })}
          rows={3}
          className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm"
        />
      </Labeled>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Labeled label="Brand tags">
          <TagRow
            options={ALL_BRANDS}
            selected={draft.brandTags}
            onToggle={(b) => set({ brandTags: toggle(draft.brandTags, b) })}
          />
        </Labeled>
        <Labeled label="Market tags">
          <TagRow
            options={MARKETS}
            selected={draft.marketTags}
            onToggle={(m) => set({ marketTags: toggle(draft.marketTags, m as Market) as Market[] })}
          />
        </Labeled>
      </div>

      {draft.source === 'Post-Meeting Insight' && (
        <Labeled label="Tagged attendees">
          <TagRow
            options={personas.map((p) => p.id)}
            labels={Object.fromEntries(personas.map((p) => [p.id, p.name]))}
            selected={draft.attendeeIds}
            onToggle={(id) => set({ attendeeIds: toggle(draft.attendeeIds, id) })}
          />
        </Labeled>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => valid && onSubmit(draft)}
          disabled={!valid}
          className="px-4 py-1.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary-strong disabled:opacity-40"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-sm text-slate-500 rounded hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  );
}

function TagRow({
  options,
  selected,
  onToggle,
  labels,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={`px-2 py-0.5 rounded text-xs border transition-colors ${
              active
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
            }`}
          >
            {labels?.[o] ?? o}
          </button>
        );
      })}
    </div>
  );
}
