# Chief of Staff Phase 1 — Prototype Build Brief

**How to use this file:** Drop it in the repo root of the Daily Briefing Agent project (the one deployed at https://dailybriefing-six.vercel.app). Open Claude Code in the repo and say: "Read COS_PHASE1_PROTOTYPE_BRIEF.md and follow it." Work through the phases in order.

**Requirements source of truth:** Notion PRD "Chief of Staff Phase 1 — Onboarding Hub & Notification Hub Requirements" (https://app.notion.com/p/399373751adf8147b769e29aab2afb8d). This brief is the prototype-scoped subset of that doc. Where they conflict, the PRD wins on intent, this brief wins on prototype scope.

---

## Context

The existing app is the **recipient experience**: a Teams-embedded daily briefing with typed, urgency-tagged cards (URGENT/PERFORMANCE, IMPORTANT/COMPETITIVE, IMPORTANT/SOCIAL, INFO/CALENDAR), expandable detail, daily/weekly digest, and a "What you've taught me" section.

We are extending it into a full-loop demo of Chief of Staff Phase 1: **onboarding produces a user profile → signals arrive in an ops console → a human routes and approves → the recipient gets the notification in their briefing → their relevance feedback flows back to the profile and rules.**

This stays a prototype. It will be handed to engineers as a working spec, not merged as production code. Optimize for demo clarity, not robustness.

## Phase 0 — Inventory (do this first, report before building)

1. Identify the stack (framework, styling approach, state management, routing).
2. Map every existing route and component. Note where mock briefing data is defined.
3. Confirm how the existing card anatomy is built (type badge, urgency badge, expand, category) — new surfaces must reuse these components, not fork them.
4. Report the inventory and a build plan back to Doug before writing code.

## Phase 1 — Profile store + onboarding wizard (Hub A)

Build a mock profile store (JSON module or localStorage — prototype only, note it as mock in code comments) and a first-run onboarding wizard.

Wizard steps (skippable, resumable, progress indicator, target under 3 minutes):
1. **Archetype** — pick one: Senior Sponsor, Adoption Champion, Process Owner, Analyst, Data Owner
2. **Role & business unit** — free text role title; BU pick: B&W, Personal Care, Foods
3. **Brands you look after** — multi-select (seed with the demo brand set; keep the existing fictional/demo data theme)
4. **Markets** — multi-select (e.g. US National, US Midwest, US Northeast, Canada)
5. **Functional scope** — multi-select: Media, CMI, Cat Ops, Social, Supply Chain
6. **Problems in your role** — pick list + free text
7. **Notification preferences** — channel (Teams / Email / In-app) and cadence (Realtime / Daily digest)

Also build:
- A profile view/edit page for the user.
- Seed **three demo personas** with different archetype/brand/market/scope combinations so routing differences are visible in the demo. Include a simple persona switcher (dropdown in the header is fine) so one demo machine can show all three recipient views.

Rule from the PRD, enforced in the prototype: every profile field must be consumed by routing or personalization somewhere in Phase 2 of this brief. If a field has no consumer, cut it.

## Phase 2 — Ops console (Hub B, sender side)

New route (e.g. `/console`) — this is the surface the delivery team uses. It does not need to look like the recipient app; plain and dense is fine.

1. **Signal queue.** Seed ~10 mock candidate notifications across four source types: Bleeding Campaign, Post-Meeting Insight, Social Trend, Manual/Other. Each has: title, body, type, urgency, brand tags, market tags, source.
2. **Compose.** A form to create a manual notification with the same fields.
3. **Audience resolution.** For each candidate, resolve recipients from the profile store using the deterministic rules below. Show the recipient list **with the rule that matched each person**. Unmatched notifications get flagged "needs manual routing" and the miss is logged visibly.
4. **Approve / edit / dismiss.** Nothing reaches a recipient without approval. Approving "sends" it: it appears in the matched recipients' briefing views.
5. **Send log.** Table of every send: what, who approved, audience rule, recipients, timestamp, and (once feedback exists) engagement + relevance stats per send.
6. **Fatigue controls.** Per-user frequency cap (e.g. max N realtime sends/day, overflow rolls into digest) and respect each profile's cadence preference: realtime users get it immediately, digest users see it batched in their next daily view.

### Deterministic routing rules v1 (hardcode these; keep them readable in one file)

- Bleeding Campaign + brand X + market Y → users with brand X AND market Y AND scope in {Media, Analyst archetype}
- Post-Meeting Insight → tagged attendees + opted-in team members (mock the attendee tags on the signal)
- Social Trend + brand X → users with brand X AND scope includes Social or Media
- Anything unmatched → manual routing flag + logged miss

No LLM scoring. Every rule must be explainable in one sentence — they'll be shown to Unilever stakeholders.

## Phase 3 — Close the feedback loop

1. Add one-tap relevance on every delivered card: **Useful / Not relevant**, optional comment.
2. Feedback writes back to: the send log (per-send relevance %), and the recipient's "What you've taught me" section (e.g. "You marked 2 competitive alerts not relevant — want fewer of these?").
3. In the console, show aggregate per-type relevance so the demo can say "this is the data that trains Phase 2 automation."

## Non-goals — do not build

- Real Teams/email delivery, real auth/SSO, any backend, any LLM calls, any Assemble integration. All mock, all client-side.
- New content generation. The console routes existing signal types.
- Production hardening, tests beyond smoke level, accessibility polish beyond defaults.

## Definition of done — the demo script must work end to end

1. Onboard as Persona A (Analyst, Brand X, Midwest, Media scope) via the wizard.
2. Switch to the console. A Bleeding Campaign signal for Brand X / Midwest is in the queue. Audience preview shows Persona A with the matched rule, and shows Persona B correctly excluded.
3. Approve it. Switch to Persona A's briefing — the card is there. Persona B's briefing — it isn't.
4. Rate it "Useful." Console send log shows the engagement. "What you've taught me" updates.
5. A signal with no matching rule shows the manual-routing flag and logged miss.

## Handoff notes to leave for engineers (add as HANDOFF.md when done)

- What is mock: profile store, delivery, identity, signals. What is real: card taxonomy, routing rule logic, console workflow, feedback loop shape.
- Decisions deliberately deferred to engineering: separate CoS codebase on the data layer vs main Assemble app (open question in the PRD); where profiles live in production (relates to the dormant AIS-485 onboarding wizard storage); how fast signals / post-meeting / trends emit into a shared queue.
- Keep the prototype deployable to Vercel throughout — the deployed link is the artifact that gets handed over.

## Working style

- Small commits per phase, deploy after each phase.
- Reuse existing components and styling; do not introduce a new design system.
- No em-dashes in any user-facing copy. Concise labels. Honest framing (mark mock things as mock).
