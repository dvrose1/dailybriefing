// ABOUTME: Profile view/edit page for the active demo persona.
// ABOUTME: Edits write to the mock store and immediately affect Phase 2 routing.

'use client';

import { useEffect, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import {
  Archetype,
  BusinessUnit,
  Cadence,
  FunctionalScope,
  Market,
  NotificationChannel,
  Profile,
} from '@/types';
import {
  ALL_BRANDS,
  ARCHETYPES,
  BRANDS_BY_BU,
  BUSINESS_UNITS,
  CADENCES,
  CHANNELS,
  MARKETS,
  PROBLEM_OPTIONS,
  SCOPES,
} from '@/data/personas';
import { useStore } from '@/lib/store';

export default function ProfilePage() {
  const { activePersona, updateProfile, resetDemo } = useStore();
  const [draft, setDraft] = useState<Profile>(activePersona);
  const [saved, setSaved] = useState(false);

  // Reload the form when the switcher changes persona.
  useEffect(() => {
    setDraft(activePersona);
    setSaved(false);
  }, [activePersona]);

  const set = (patch: Partial<Profile>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setSaved(false);
  };

  const save = () => {
    updateProfile(draft);
    setSaved(true);
  };

  const availableBrands = draft.businessUnit ? BRANDS_BY_BU[draft.businessUnit] : ALL_BRANDS;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">{draft.name}</h1>
          <p className="text-sm text-slate-500">
            Profile · every field drives console routing
          </p>
        </div>
        <button
          onClick={resetDemo}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-600"
          title="Reset all demo state"
        >
          <RotateCcw size={14} />
          Reset demo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
        <Field label="Archetype">
          <ChipRow
            options={ARCHETYPES}
            selected={draft.archetype ? [draft.archetype] : []}
            onToggle={(a) => set({ archetype: a as Archetype })}
          />
        </Field>

        <Field label="Role title">
          <input
            type="text"
            value={draft.roleTitle}
            onChange={(e) => set({ roleTitle: e.target.value })}
            placeholder="e.g. Senior Media Analyst"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </Field>

        <Field label="Business unit">
          <ChipRow
            options={BUSINESS_UNITS}
            selected={draft.businessUnit ? [draft.businessUnit] : []}
            onToggle={(bu) =>
              set({
                businessUnit: bu as BusinessUnit,
                brands: draft.brands.filter((b) => BRANDS_BY_BU[bu as BusinessUnit].includes(b)),
              })
            }
          />
        </Field>

        <Field label="Brands">
          <ChipRow
            options={availableBrands}
            selected={draft.brands}
            onToggle={(b) => set({ brands: toggle(draft.brands, b) })}
          />
        </Field>

        <Field label="Markets">
          <ChipRow
            options={MARKETS}
            selected={draft.markets}
            onToggle={(m) => set({ markets: toggle(draft.markets, m as Market) })}
          />
        </Field>

        <Field label="Functional scope">
          <ChipRow
            options={SCOPES}
            selected={draft.scopes}
            onToggle={(s) => set({ scopes: toggle(draft.scopes, s as FunctionalScope) })}
          />
        </Field>

        <Field label="Problems in your role">
          <ChipRow
            options={PROBLEM_OPTIONS}
            selected={draft.problems}
            onToggle={(p) => set({ problems: toggle(draft.problems, p) })}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Channel">
            <ChipRow
              options={CHANNELS}
              selected={[draft.channel]}
              onToggle={(c) => set({ channel: c as NotificationChannel })}
            />
          </Field>
          <Field label="Cadence">
            <ChipRow
              options={CADENCES}
              selected={[draft.cadence]}
              onToggle={(c) => set({ cadence: c as Cadence })}
            />
          </Field>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={save}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-strong"
        >
          <Check size={16} />
          Save profile
        </button>
        {saved && <span className="text-sm text-green-600">Saved.</span>}
      </div>
    </div>
  );
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
      {children}
    </div>
  );
}

function ChipRow({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              active
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
