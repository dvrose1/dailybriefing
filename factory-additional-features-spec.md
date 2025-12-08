# Additional Features Spec — Daily Briefing Agent Prototype

Two new features to add to the existing prototype. These should integrate seamlessly with the current design system and component patterns.

---

## Feature 1: "What You've Taught Me" Dashboard

### Purpose
Makes the learning loop tangible. Shows users that their feedback actually shapes the system. This is a key differentiator—the AI isn't static, it adapts.

### Entry Point
Add a small button/link in the briefing header area, near the user greeting or as a subtle icon button. Something like:

- Text link: "What you've taught me" (subtle, secondary color)
- Or: Settings/gear icon that opens a panel with this as a section

Clicking opens a slide-out panel from the right (similar to Brief Me) or a modal.

### UI Design

**Panel/Modal Header:**
```
What You've Taught Me
Your feedback shapes your briefings
```

**Section 1: Topic Engagement**
Title: "Topics you engage with most"

Visual: Horizontal bar chart or simple percentage bars

```
Competitive Intelligence    ████████████████░░░░  78%
Performance Alerts          █████████████░░░░░░░  65%
Social & Sentiment          ████████░░░░░░░░░░░░  42%
Calendar & Prep             ██████░░░░░░░░░░░░░░  31%
Industry News               ███░░░░░░░░░░░░░░░░░  15%
```

Subtext: "Based on cards you expanded, acted on, or marked helpful"

**Section 2: Your Patterns**
Title: "Your briefing patterns"

Simple stats in a grid:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Avg. Review    │  Most Active    │  Preferred      │
│  Time           │  Day            │  Actions        │
│                 │                 │                 │
│  6.2 min        │  Monday         │  Schedule       │
│                 │                 │  Meeting        │
└─────────────────┴─────────────────┴─────────────────┘
```

**Section 3: Learned Preferences**
Title: "What I've learned"

Bullet list with friendly, conversational descriptions:

```
• You prefer detailed competitive analysis — I show fuller context
• You usually dismiss broad industry news — I've reduced these
• You act quickly on Target-related alerts — these get priority
• Morning delivery works for you — briefings ready by 7:00 AM
```

**Section 4: Control**
Title: "Adjust my learning"

Simple toggles or a link:

```
[Reset my preferences]  [Give feedback to Anthropic]
```

Small disclaimer at bottom:
"Your feedback stays private and is only used to personalize your experience."

### Data (Synthetic/Hardcoded)

```typescript
const learningData = {
  topicEngagement: [
    { topic: "Competitive Intelligence", percentage: 78, color: "#2563eb" },
    { topic: "Performance Alerts", percentage: 65, color: "#2563eb" },
    { topic: "Social & Sentiment", percentage: 42, color: "#2563eb" },
    { topic: "Calendar & Prep", percentage: 31, color: "#2563eb" },
    { topic: "Industry News", percentage: 15, color: "#94a3b8" },
  ],
  patterns: {
    avgReviewTime: "6.2 min",
    mostActiveDay: "Monday",
    preferredAction: "Schedule Meeting",
  },
  learnedPreferences: [
    "You prefer detailed competitive analysis — I show fuller context",
    "You usually dismiss broad industry news — I've reduced these",
    "You act quickly on Target-related alerts — these get priority",
    "Morning delivery works for you — briefings ready by 7:00 AM",
  ]
};
```

### Component Structure

```
components/
├── WhatYouTaughtMe/
│   ├── WhatYouTaughtMePanel.tsx    # Main panel/modal wrapper
│   ├── TopicEngagementChart.tsx    # Horizontal bar chart
│   ├── PatternsGrid.tsx            # 3-stat grid
│   └── LearnedPreferences.tsx      # Bullet list
```

### Interaction Details

- **Open:** Slide in from right (300-400px width) with backdrop, or centered modal
- **Close:** X button, click backdrop, or Escape key
- **Animations:** Subtle fade-in for content, bars could animate/grow on open
- **Mobile:** Full-screen panel

### Visual Style

- Background: White or very light gray (`slate-50`)
- Section spacing: Clear visual breaks between sections
- Typography: 
  - Section titles: 14px, semi-bold, uppercase, secondary color
  - Stats: 24-32px for numbers, 12px for labels
  - Bullet text: 14px, regular
- Bar chart: Use primary blue (`blue-600`), gray for lower-engagement items
- Keep it clean and minimal—this is a glanceable summary, not a full analytics dashboard

---

## Feature 2: Weekly Synthesis View

### Purpose
Shows the system isn't just daily—it identifies patterns across time. Demonstrates the "intelligence" layer that humans can't easily do themselves.

### Entry Point
Add a toggle or tab in the briefing header area:

```
[Daily]  [Weekly]
```

Or as a segmented control / pill toggle. "Daily" is active by default.

Clicking "Weekly" swaps the main content area to the Weekly Synthesis view.

### UI Design

**Header (replaces daily header):**
```
Week in Review
December 2–6, 2025

3 themes · 2 action gaps identified
```

**Content: Theme Cards**

Instead of individual insight cards, show 3-5 "theme" cards that synthesize the week.

Each theme card:
```
┌────────────────────────────────────────────────────────────────┐
│ 🔵 THEME                                                       │
│                                                                │
│ Competitive Pressure Intensifying                              │
│                                                                │
│ This week saw coordinated competitive activity from Gain       │
│ across multiple fronts: the Target BOGO (still active),        │
│ Walmart new scent announcement, and increased social           │
│ share-of-voice (+12%). This suggests a planned Q4 push         │
│ rather than isolated tactics.                                  │
│                                                                │
│ Related briefings: Mon (Target velocity), Tue (Gain launch)    │
│                                                                │
│ Suggested focus: Competitive response planning for Q1          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Theme card anatomy:**
- Theme badge (colored dot + "THEME")
- Headline (bold, 18px)
- Synthesis paragraph (3-5 sentences connecting dots across the week)
- "Related briefings" — links back to specific days
- "Suggested focus" — forward-looking recommendation

**Section: Action Gaps**
Below themes, a callout box:

```
┌────────────────────────────────────────────────────────────────┐
│ ⚠️  Action Gaps                                                │
│                                                                │
│ • TikTok viral moment (Monday) — No action taken yet.          │
│   Engagement window may be closing. [Take action]              │
│                                                                │
│ • Walmart QBR prep (flagged Tuesday) — Meeting is tomorrow.    │
│   Deck not yet updated. [Review prep items]                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Section: Week Stats (optional, subtle)**
Small footer stats:

```
This week: 18 insights surfaced · 12 actions taken · 4 dismissed
Your engagement: 73% (↑ 8% vs last week)
```

### Data (Synthetic/Hardcoded)

```typescript
const weeklyData = {
  weekRange: "December 2–6, 2025",
  themeCount: 3,
  actionGapsCount: 2,
  
  themes: [
    {
      id: "theme-1",
      headline: "Competitive Pressure Intensifying",
      synthesis: "This week saw coordinated competitive activity from Gain across multiple fronts: the Target BOGO (still active), Walmart new scent announcement, and increased social share-of-voice (+12%). This suggests a planned Q4 push rather than isolated tactics.",
      relatedDays: ["Monday", "Tuesday"],
      suggestedFocus: "Competitive response planning for Q1"
    },
    {
      id: "theme-2", 
      headline: "Organic Social Momentum Building",
      synthesis: "The TikTok Tide Pen hack is part of a broader pattern—earned social mentions are up 34% this month. Three separate micro-influencers have featured Tide products organically this week. This represents an opportunity to systematize influencer identification and engagement.",
      relatedDays: ["Monday", "Wednesday"],
      suggestedFocus: "Influencer strategy working session"
    },
    {
      id: "theme-3",
      headline: "Walmart Relationship at Inflection Point",
      synthesis: "Between the QBR prep, the Gain launch news, and two separate Walmart Retail Link alerts this week, your Walmart business deserves focused attention. Share gains are positive, but competitive pressure and sustainability asks suggest Q1 negotiations will be complex.",
      relatedDays: ["Monday", "Tuesday", "Thursday"],
      suggestedFocus: "Walmart Q1 strategy alignment"
    }
  ],
  
  actionGaps: [
    {
      item: "TikTok viral moment",
      day: "Monday",
      issue: "No action taken yet. Engagement window may be closing.",
      actionLabel: "Take action"
    },
    {
      item: "Walmart QBR prep",
      day: "Tuesday", 
      issue: "Meeting is tomorrow. Deck not yet updated.",
      actionLabel: "Review prep items"
    }
  ],
  
  stats: {
    insightsSurfaced: 18,
    actionsTaken: 12,
    dismissed: 4,
    engagementRate: 73,
    engagementChange: 8
  }
};
```

### Component Structure

```
components/
├── WeeklySynthesis/
│   ├── WeeklyView.tsx           # Main container for weekly content
│   ├── ViewToggle.tsx           # Daily/Weekly segmented control
│   ├── ThemeCard.tsx            # Individual theme card
│   ├── ActionGapsCallout.tsx    # Warning box with action gaps
│   └── WeekStats.tsx            # Footer stats (optional)
```

### Interaction Details

- **Toggle:** Segmented control with smooth transition. Active state is filled/highlighted.
- **Transition:** When switching views, subtle crossfade or slide. Don't just hard-swap.
- **Theme cards:** Not expandable (they're already summaries). Could link "Related briefings" to scroll to those days if we had a multi-day view, but for demo just show as text.
- **Action gap buttons:** These could open the relevant insight or action modal (reuse existing components)

### Visual Style

- **Theme cards:** White background, no left border (unlike daily insight cards—these are summaries, not alerts). Subtle shadow. More padding/breathing room.
- **Theme badge:** Small pill with colored dot, e.g., `🔵 THEME` in muted style
- **Action Gaps:** Yellow/amber tinted background (`amber-50`), amber left border, warning icon
- **Overall feel:** More reflective/strategic, less urgent. Slightly more whitespace than daily view.

### Toggle Component Spec

```tsx
// ViewToggle.tsx
interface ViewToggleProps {
  activeView: 'daily' | 'weekly';
  onToggle: (view: 'daily' | 'weekly') => void;
}

// Visual: Two pills side by side
// Active: blue background, white text
// Inactive: transparent background, gray text
// Container: light gray background rounded pill shape
```

---

## Integration Notes

### State Management
Add to your main page state:
```typescript
const [activeView, setActiveView] = useState<'daily' | 'weekly'>('daily');
const [showLearningPanel, setShowLearningPanel] = useState(false);
```

### Layout Changes

**Header area becomes:**
```
Good morning, Sarah                    [What you've taught me]
Monday, December 8, 2025
4 items · About 6 minutes              [Daily] [Weekly]    [🔊 Listen]
```

**Main content area:**
```tsx
{activeView === 'daily' ? (
  <DailyBriefing insights={insights} />
) : (
  <WeeklyView data={weeklyData} />
)}
```

### Brief Me Context Update
If user is on Weekly view and opens Brief Me, the AI should be aware:
```
User is currently viewing the Weekly Synthesis (Dec 2-6).
```

Add to Brief Me pre-scripted responses:
- "What were the main themes this week?" → Reference the 3 themes
- "What did I miss this week?" → Reference the action gaps

---

## Build Order

1. **ViewToggle component** — get the Daily/Weekly switch working with state
2. **WeeklyView container** — basic layout with header
3. **ThemeCard component** — styled card for themes
4. **Populate with synthetic data** — 3 theme cards rendering
5. **ActionGapsCallout** — the warning box
6. **WeekStats footer** — optional, if time
7. **WhatYouTaughtMePanel** — slide-out panel structure
8. **TopicEngagementChart** — horizontal bars
9. **PatternsGrid + LearnedPreferences** — simpler components
10. **Polish transitions** — smooth toggle between views, panel animations

---

## Testing Checklist

Before pushing to production:

- [ ] Daily/Weekly toggle switches smoothly
- [ ] Weekly view renders all 3 themes
- [ ] Action gap buttons work (or are clearly styled as interactive)
- [ ] "What you've taught me" opens and closes cleanly
- [ ] Bar chart renders correctly
- [ ] All text is readable, no overflow issues
- [ ] Works on both desktop and mobile widths
- [ ] Doesn't break any existing functionality (cards, Brief Me, voice)
- [ ] No console errors
