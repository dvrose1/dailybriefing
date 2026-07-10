# Chief of Staff Phase 1 Prototype — Engineering Handoff

This prototype demonstrates the full CoS Phase 1 loop end to end: onboarding produces a user profile, signals arrive in an ops console, a human routes and approves, the recipient sees the notification in their briefing, and their relevance feedback flows back to the send log and learned preferences.

Requirements source of truth: Notion PRD "Chief of Staff Phase 1 — Onboarding Hub & Notification Hub Requirements". Prototype scope: `COS_PHASE1_PROTOTYPE_BRIEF.md` in this repo.

## Demo script (definition of done, verified)

1. Onboard Persona A (Alex Morgan) via the wizard: Analyst, Radiant, US Midwest, Media scope.
2. Open Console. The "Radiant summer serum" Bleeding Campaign signal resolves to Alex with the matched rule shown; Priya (Senior Sponsor, Everfresh, CMI) is correctly excluded.
3. Approve. Alex's briefing shows the card under "Routed to you"; Priya's does not.
4. Rate it Useful. The send log shows 100% useful (1 of 1 rated); "What you've taught me" gains a feedback line; aggregate relevance by type updates.
5. The Lume signal matches no profile: it is flagged "needs manual routing" and logged in Routing misses. Ops can hand-pick recipients; a manual send to Priya (Daily digest cadence) lands in her digest section, not realtime.

## What is mock

- **Profile store**: React context + localStorage (`src/lib/store.tsx`, key `cos-demo-store-v1`). No backend, no auth. Reset from the Profile page.
- **Identity**: three seeded personas (`src/data/personas.ts`) with a switcher in the top nav so one machine demos all recipient views.
- **Signals**: ten seeded candidates (`src/data/signals.ts`). Nothing emits them; they are static queue rows.
- **Delivery**: "sending" writes a Delivery row to the store; the recipient view renders it. No Teams or email delivery. Channel preference is captured but only cadence (Realtime vs Daily digest) changes behavior.
- **Timestamps**: relative strings ("Just now"), not real clocks.

## What is real (shape to keep)

- **Card taxonomy**: routed notifications render through the same InsightCard components as the ambient briefing (`deliveryToInsight` in `src/lib/store.tsx`). No forked card UI.
- **Routing rule logic**: `src/lib/routing.ts`. Deterministic, no LLM scoring, each rule explainable in one sentence. Rules v1:
  - Bleeding Campaign + brand + market → owners of that brand and market in Media scope or Analyst archetype.
  - Post-Meeting Insight → tagged attendees.
  - Social Trend + brand → owners of that brand with Social or Media scope.
  - Anything unmatched → manual routing flag + logged miss.
- **Console workflow**: queue → audience preview with the matched rule per person → human approval → send log. Nothing reaches a recipient without approval.
- **Feedback loop shape**: one-tap Useful / Not relevant (+ optional comment) on delivered cards writes to the delivery, surfaces per-send and per-type relevance in the console, and appends lines to "What you've taught me" (`src/lib/learning.ts`).
- **Fatigue controls**: per-user realtime cap (`MAX_REALTIME_SENDS` in the store); overflow and digest-cadence users get sends batched into their daily view.
- **Profile fields**: every wizard field is consumed by routing or personalization (brands/markets/scopes/archetype → rules; cadence → delivery batching; channel/problems → personalization surface; role title/BU → profile display and brand filtering).

## Decisions deliberately deferred to engineering

- Separate CoS codebase on the data layer vs the main Assemble app (open question in the PRD).
- Where profiles live in production. Relates to the dormant AIS-485 onboarding wizard storage.
- How fast signals (bleeding campaigns), post-meeting insights, and social trends emit into a shared queue, and what the queue infrastructure is.
- Real Teams/email delivery, auth/SSO, and any LLM-assisted routing (Phase 2; the relevance data collected here is its training signal).

## Code map

- `src/app/page.tsx` — recipient briefing; gates on onboarding, merges routed + digest + ambient cards.
- `src/app/console/page.tsx` — ops console (Hub B): queue, rules legend, miss log, send log, relevance summary.
- `src/app/profile/page.tsx` — profile view/edit; demo reset.
- `src/components/onboarding/OnboardingWizard.tsx` — 7-step skippable, resumable wizard.
- `src/components/console/` — SignalQueue, SignalForm (compose + edit), SendLog, RelevanceSummary.
- `src/components/RelevanceBar.tsx` — one-tap feedback on delivered cards.
- `src/lib/store.tsx` / `src/lib/routing.ts` / `src/lib/learning.ts` — mock store, rules v1, feedback derivation.
- `src/types/index.ts` — Profile, Signal, Delivery, and briefing types.

## Deployment

Next.js 14 App Router, all client-side, deploys to Vercel with no env vars required for the CoS loop (ANTHROPIC_API_KEY / ELEVENLABS_API_KEY only power the pre-existing Brief Me chat and voice briefing).
