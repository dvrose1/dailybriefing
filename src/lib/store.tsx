// ABOUTME: Client-side app store (React context + localStorage) for the CoS demo.
// ABOUTME: MOCK persistence only. Holds personas, signals, and deliveries across surfaces.

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Delivery,
  Insight,
  Profile,
  RelevanceRating,
  Signal,
} from '@/types';
import { SEED_PERSONAS } from '@/data/personas';
import { SEED_SIGNALS } from '@/data/signals';
import { resolveAudience } from '@/lib/routing';

// Bump to reseed localStorage after changing seed data shape.
const STORAGE_KEY = 'cos-demo-store-v2';

// Fatigue control: realtime sends per persona per demo session beyond this
// roll into the daily digest instead of appearing immediately.
export const MAX_REALTIME_SENDS = 3;

interface PersistedState {
  personas: Profile[];
  activePersonaId: string;
  signals: Signal[];
  deliveries: Delivery[];
}

interface StoreValue extends PersistedState {
  activePersona: Profile;
  setActivePersona: (id: string) => void;
  updateProfile: (profile: Profile) => void;
  completeOnboarding: (profile: Profile) => void;
  addSignal: (
    signal: Omit<Signal, 'id' | 'createdAt' | 'status'>,
  ) => void;
  updateSignal: (signal: Signal) => void;
  approveSignal: (signalId: string, manualPersonaIds?: string[]) => void;
  dismissSignal: (signalId: string) => void;
  setRelevance: (
    deliveryId: string,
    relevance: RelevanceRating,
    comment?: string,
  ) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function initialState(): PersistedState {
  return {
    personas: SEED_PERSONAS,
    activePersonaId: SEED_PERSONAS[0].id,
    signals: SEED_SIGNALS,
    deliveries: [],
  };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as PersistedState);
    } catch {
      // ignore corrupt storage, fall back to seed
    }
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable, prototype tolerates loss
    }
  }, [state, hydrated]);

  const setActivePersona = useCallback((id: string) => {
    setState((s) => ({ ...s, activePersonaId: id }));
  }, []);

  const updateProfile = useCallback((profile: Profile) => {
    setState((s) => ({
      ...s,
      personas: s.personas.map((p) => (p.id === profile.id ? profile : p)),
    }));
  }, []);

  const completeOnboarding = useCallback((profile: Profile) => {
    setState((s) => ({
      ...s,
      personas: s.personas.map((p) =>
        p.id === profile.id ? { ...profile, onboardingComplete: true } : p,
      ),
    }));
  }, []);

  const addSignal = useCallback(
    (signal: Omit<Signal, 'id' | 'createdAt' | 'status'>) => {
      setState((s) => {
        const newSignal: Signal = {
          ...signal,
          id: `sig-manual-${s.signals.length + 1}-${s.deliveries.length}`,
          createdAt: 'Just now',
          status: 'queued',
        };
        return { ...s, signals: [newSignal, ...s.signals] };
      });
    },
    [],
  );

  const updateSignal = useCallback((signal: Signal) => {
    setState((s) => ({
      ...s,
      signals: s.signals.map((sig) => (sig.id === signal.id ? signal : sig)),
    }));
  }, []);

  // Approving resolves the audience via the routing rules. For unmatched
  // signals, ops can pass hand-picked recipients (manual routing).
  const approveSignal = useCallback((signalId: string, manualPersonaIds?: string[]) => {
    setState((s) => {
      const signal = s.signals.find((sig) => sig.id === signalId);
      if (!signal) return s;

      const matches = manualPersonaIds?.length
        ? manualPersonaIds.map((personaId) => ({
            personaId,
            rule: 'No rule matched. Manually routed by ops.',
          }))
        : resolveAudience(signal, s.personas).matches;
      const newDeliveries: Delivery[] = matches.map((m, i) => {
        const persona = s.personas.find((p) => p.id === m.personaId)!;
        const priorRealtime = s.deliveries.filter(
          (d) => d.personaId === m.personaId && !d.routedToDigest,
        ).length;
        const overCap = priorRealtime >= MAX_REALTIME_SENDS;
        const routedToDigest = persona.cadence === 'Daily digest' || overCap;
        return {
          id: `del-${signalId}-${m.personaId}-${s.deliveries.length + i}`,
          signalId,
          personaId: m.personaId,
          matchedRule: m.rule,
          deliveredAt: 'Just now',
          routedToDigest,
        };
      });

      return {
        ...s,
        signals: s.signals.map((sig) =>
          sig.id === signalId
            ? { ...sig, status: 'approved', approvedAt: 'Just now', approvedBy: 'Ops (you)' }
            : sig,
        ),
        deliveries: [...s.deliveries, ...newDeliveries],
      };
    });
  }, []);

  const dismissSignal = useCallback((signalId: string) => {
    setState((s) => ({
      ...s,
      signals: s.signals.map((sig) =>
        sig.id === signalId ? { ...sig, status: 'dismissed' } : sig,
      ),
    }));
  }, []);

  const setRelevance = useCallback(
    (deliveryId: string, relevance: RelevanceRating, comment?: string) => {
      setState((s) => ({
        ...s,
        deliveries: s.deliveries.map((d) =>
          d.id === deliveryId ? { ...d, relevance, relevanceComment: comment } : d,
        ),
      }));
    },
    [],
  );

  const resetDemo = useCallback(() => {
    setState(initialState());
  }, []);

  const activePersona =
    state.personas.find((p) => p.id === state.activePersonaId) ?? state.personas[0];

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      activePersona,
      setActivePersona,
      updateProfile,
      completeOnboarding,
      addSignal,
      updateSignal,
      approveSignal,
      dismissSignal,
      setRelevance,
      resetDemo,
    }),
    [
      state,
      activePersona,
      setActivePersona,
      updateProfile,
      completeOnboarding,
      addSignal,
      updateSignal,
      approveSignal,
      dismissSignal,
      setRelevance,
      resetDemo,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

// Convert an approved delivery + its signal into a briefing Insight so it
// renders through the existing card with no forking.
export function deliveryToInsight(delivery: Delivery, signal: Signal): Insight {
  const confidence = signal.priority === 'urgent' ? 'high' : signal.priority === 'important' ? 'medium' : 'low';
  return {
    id: `insight-${delivery.id}`,
    priority: signal.priority,
    category: signal.category,
    headline: signal.title,
    summary: signal.body,
    expandedAnalysis: signal.body,
    whySeeing: delivery.matchedRule,
    confidence,
    sources: [signal.source],
    updatedAt: delivery.deliveredAt,
    recommendedAction: { type: 'investigate', label: 'Investigate', prefill: {} },
    deliveryId: delivery.id,
    source: signal.source,
  };
}
