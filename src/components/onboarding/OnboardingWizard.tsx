// ABOUTME: First-run onboarding wizard that fills the active persona's profile.
// ABOUTME: 7 skippable, resumable steps. Every field is consumed by Phase 2 routing.

'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
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

const STEP_TITLES = [
  'Your archetype',
  'Role and business unit',
  'Brands you look after',
  'Markets',
  'Functional scope',
  'Problems in your role',
  'Notification preferences',
];

interface Props {
  profile: Profile;
}

export default function OnboardingWizard({ profile }: Props) {
  const { updateProfile, completeOnboarding } = useStore();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Profile>(profile);

  const total = STEP_TITLES.length;
  const set = (patch: Partial<Profile>) => setDraft((d) => ({ ...d, ...patch }));

  const persistAnd = (next: number) => {
    updateProfile(draft); // persist progress so the wizard is resumable
    setStep(next);
  };

  const finish = () => completeOnboarding(draft);
  const skip = () => completeOnboarding(draft);

  const availableBrands = draft.businessUnit ? BRANDS_BY_BU[draft.businessUnit] : ALL_BRANDS;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Progress */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-slate-500">
              Step {step + 1} of {total} · under 3 minutes
            </p>
            <button onClick={skip} className="text-xs text-slate-400 hover:text-blue-600">
              Skip for now
            </button>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">{STEP_TITLES[step]}</h2>

          {step === 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ARCHETYPES.map((a) => (
                <SelectCard
                  key={a}
                  label={a}
                  selected={draft.archetype === a}
                  onClick={() => set({ archetype: a as Archetype })}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Role title</label>
                <input
                  type="text"
                  value={draft.roleTitle}
                  onChange={(e) => set({ roleTitle: e.target.value })}
                  placeholder="e.g. Senior Media Analyst"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Business unit</label>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_UNITS.map((bu) => (
                    <Chip
                      key={bu}
                      label={bu}
                      selected={draft.businessUnit === bu}
                      onClick={() =>
                        set({
                          businessUnit: bu as BusinessUnit,
                          // clear brands that no longer belong to the chosen BU
                          brands: draft.brands.filter((b) => BRANDS_BY_BU[bu].includes(b)),
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-4">
              <p className="text-sm text-slate-500 mb-3">
                {draft.businessUnit
                  ? `Brands in ${draft.businessUnit}`
                  : 'Pick a business unit first to narrow this, or choose from all brands.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {availableBrands.map((b) => (
                  <Chip
                    key={b}
                    label={b}
                    selected={draft.brands.includes(b)}
                    onClick={() => set({ brands: toggle(draft.brands, b) })}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <Chip
                  key={m}
                  label={m}
                  selected={draft.markets.includes(m)}
                  onClick={() => set({ markets: toggle(draft.markets, m) as Market[] })}
                />
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {SCOPES.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  selected={draft.scopes.includes(s)}
                  onClick={() => set({ scopes: toggle(draft.scopes, s) as FunctionalScope[] })}
                />
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {PROBLEM_OPTIONS.map((p) => (
                  <Chip
                    key={p}
                    label={p}
                    selected={draft.problems.includes(p)}
                    onClick={() => set({ problems: toggle(draft.problems, p) })}
                  />
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Anything else? (optional)
                </label>
                <textarea
                  value={draft.problemNotes}
                  onChange={(e) => set({ problemNotes: e.target.value })}
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Channel</label>
                <div className="flex flex-wrap gap-2">
                  {CHANNELS.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      selected={draft.channel === c}
                      onClick={() => set({ channel: c as NotificationChannel })}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Cadence</label>
                <div className="flex flex-wrap gap-2">
                  {CADENCES.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      selected={draft.cadence === c}
                      onClick={() => set({ cadence: c as Cadence })}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Realtime sends arrive immediately. Daily digest batches them into your next briefing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={() => persistAnd(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-4 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Back
          </button>
          {step < total - 1 ? (
            <button
              onClick={() => persistAnd(step + 1)}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={finish}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Check size={16} />
              Finish setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
        selected
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
      }`}
    >
      {label}
    </button>
  );
}

function SelectCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left text-sm transition-colors ${
        selected
          ? 'bg-blue-50 border-blue-500 text-blue-800 font-medium'
          : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
      }`}
    >
      {label}
      {selected && <Check size={16} className="text-blue-600" />}
    </button>
  );
}
