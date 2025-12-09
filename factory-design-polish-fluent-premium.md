# Design Polish: Fluent Premium Style

Transform the prototype to feel like a premium, native Microsoft Teams app. Should feel at home in the Teams environment while being noticeably polished and well-designed.

---

## Design Philosophy

**The metaphor:** The best-designed app in your Teams sidebar. Familiar but elevated.

**Key principles:**
- Native to Microsoft ecosystem
- Hierarchy through typography weight and size
- Clean, scannable, no decoration for decoration's sake
- Subtle depth, not flat
- Professional confidence

---

## Typography

Stay in the Microsoft/Teams family. No serifs.

**Font:**
```css
font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
```

Or use Inter if Segoe isn't available:
```css
font-family: 'Inter', 'Segoe UI', -apple-system, sans-serif;
```

**Type scale — hierarchy is everything:**

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Greeting ("Good morning, Sarah") | 28px | 600 (semi-bold) | Primary |
| Card headline | 18px | 600 (semi-bold) | Primary |
| Card summary | 14px | 400 (regular) | Secondary |
| Expanded analysis | 14px | 400 (regular) | Secondary |
| Labels (URGENT, PERFORMANCE) | 11px | 600, uppercase, tracked | Tertiary or accent |
| Metadata, timestamps | 12px | 400 | Tertiary |
| Buttons | 14px | 500 (medium) | — |

**The key:** Headlines are semi-bold and noticeably larger. Everything else is regular weight. This creates instant visual hierarchy without needing colors or borders.

---

## Color Palette

Cool, professional, Teams-native with a refined accent.

```css
:root {
  /* Backgrounds */
  --bg-primary: #f5f5f5;          /* Light gray - main background (Teams uses this) */
  --bg-card: #ffffff;             /* White - cards */
  --bg-hover: #f0f0f0;            /* Slightly darker - hover states */
  --bg-elevated: #ffffff;         /* White with shadow for elevated elements */
  
  /* Text */
  --text-primary: #242424;        /* Near black - headlines, important text */
  --text-secondary: #616161;      /* Medium gray - body text */
  --text-tertiary: #8a8a8a;       /* Light gray - metadata, timestamps */
  
  /* Accent - Teams-complementary teal/blue */
  --accent: #0078d4;              /* Microsoft blue - or use #0099bc for teal */
  --accent-hover: #106ebe;
  --accent-light: #e6f2fb;        /* Very light blue for subtle backgrounds */
  
  /* Teams purple (for reference/harmony) */
  --teams-purple: #5b5fc7;
  
  /* Priority colors - clear but not garish */
  --urgent: #d13438;              /* Microsoft red */
  --urgent-bg: #fdf3f4;
  --important: #c19c00;           /* Warm amber */
  --important-bg: #fdf9e8;
  --informational: #0078d4;       /* Microsoft blue */
  --informational-bg: #e6f2fb;
  
  /* Borders & Dividers */
  --border: #e0e0e0;
  --border-strong: #c8c8c8;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

---

## Card Design

Clean, elevated, easy to scan.

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   URGENT · PERFORMANCE                              2 hours ago      │
│                                                                      │
│   Tide Pods velocity down 8% at Target                               │  ← 18px semi-bold, primary color
│                                                                      │
│   Week-over-week unit velocity declined 8.2% at Target stores        │  ← 14px regular, secondary color
│   nationally. This correlates with Gain's BOGO promotion             │
│   launched last Tuesday.                                             │
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐    │
│   │  [Schedule Meeting]              [Expand]  [👍]  [👎]       │    │
│   └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Card styling:**
```css
.insight-card {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
}

.insight-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
}
```

**Top row (labels + timestamp):**
```css
.card-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.priority-badge {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 8px;
  border-radius: 4px;
}

.priority-urgent {
  background: var(--urgent-bg);
  color: var(--urgent);
}

.priority-important {
  background: var(--important-bg);
  color: var(--important);
}

.priority-informational {
  background: var(--informational-bg);
  color: var(--informational);
}

.category-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-tertiary);
  margin-left: 8px;
}

.timestamp {
  font-size: 12px;
  color: var(--text-tertiary);
}
```

**Headline:**
```css
.card-headline {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.3;
}
```

**Summary:**
```css
.card-summary {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
}
```

**Action row:**
```css
.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
```

---

## Buttons

**Primary (main action):**
```css
.btn-primary {
  background: var(--accent);
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
}
```

**Secondary:**
```css
.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border-strong);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-secondary:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
```

**Icon button (feedback, expand):**
```css
.btn-icon {
  background: transparent;
  color: var(--text-tertiary);
  padding: 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-icon:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}

.btn-icon.selected {
  background: var(--accent-light);
  color: var(--accent);
}
```

---

## Header

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   Good morning, Sarah                                                   │  ← 28px semi-bold
│   Monday, December 8, 2025                                              │  ← 14px regular, tertiary
│                                                                         │
│   4 items · About 6 minutes                    [🔊 Listen to Briefing]  │  ← 14px secondary, button right
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

```css
.briefing-header {
  padding: 24px 0 20px 0;
  margin-bottom: 20px;
}

.greeting {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.date {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  font-size: 14px;
  color: var(--text-secondary);
}

.listen-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--border-strong);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
}

.listen-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
```

---

## Expanded Card State

```css
.insight-expanded {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 24px 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-strong);
}

.expanded-analysis {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.expanded-analysis p {
  margin-bottom: 12px;
}
```

**Chart styling:**
- Use Microsoft blue (`#0078d4`) as primary chart color
- Grid lines: very light gray (`#f0f0f0`)
- Axis text: tertiary color, 11px
- Clean and minimal

**Sources & confidence:**
```css
.sources {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.source-pill {
  font-size: 12px;
  color: var(--text-tertiary);
  background: var(--bg-hover);
  padding: 4px 10px;
  border-radius: 4px;
}

.confidence {
  font-size: 12px;
  color: var(--text-tertiary);
}

.confidence-high {
  color: #107c10;  /* Microsoft green */
}
```

**"Why am I seeing this?" expandable:**
```css
.why-seeing-toggle {
  font-size: 13px;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.why-seeing-content {
  font-size: 13px;
  color: var(--text-tertiary);
  background: var(--bg-primary);
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 12px;
  line-height: 1.5;
}
```

---

## Brief Me Chat

Feels like Teams chat, but cleaner.

```css
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-primary);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message-user {
  background: var(--accent);
  color: white;
  padding: 10px 14px;
  border-radius: 12px 12px 4px 12px;
  max-width: 75%;
  align-self: flex-end;
  margin-bottom: 12px;
  font-size: 14px;
}

.message-assistant {
  background: var(--bg-card);
  color: var(--text-secondary);
  padding: 12px 16px;
  border-radius: 12px 12px 12px 4px;
  max-width: 85%;
  align-self: flex-start;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

.chat-input-container {
  padding: 16px 20px;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
}

.chat-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  font-size: 14px;
  background: var(--bg-primary);
}

.chat-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-light);
}

.chat-input::placeholder {
  color: var(--text-tertiary);
}
```

**Quick suggestion chips:**
```css
.suggestion-chips {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.chip {
  font-size: 13px;
  padding: 6px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.chip:hover {
  background: var(--accent-light);
  border-color: var(--accent);
  color: var(--accent);
}
```

---

## Voice Player

Minimal bar at bottom.

```css
.voice-player {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.play-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-btn:hover {
  background: var(--accent-hover);
}

.player-info {
  flex: 1;
}

.player-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.progress-bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.player-time {
  font-size: 12px;
  color: var(--text-tertiary);
}
```

---

## View Toggle (Daily/Weekly)

```css
.view-toggle {
  display: inline-flex;
  background: var(--bg-hover);
  border-radius: 6px;
  padding: 2px;
}

.toggle-btn {
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.toggle-btn.active {
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

.toggle-btn:not(.active):hover {
  color: var(--text-primary);
}
```

---

## What You've Taught Me Panel

```css
.learning-panel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 360px;
  background: var(--bg-card);
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.panel-subtitle {
  font-size: 13px;
  color: var(--text-tertiary);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.section-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}
```

**Engagement bars:**
```css
.engagement-item {
  margin-bottom: 16px;
}

.engagement-label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.engagement-bar {
  height: 6px;
  background: var(--bg-hover);
  border-radius: 3px;
  overflow: hidden;
}

.engagement-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
}
```

---

## Weekly View Theme Cards

```css
.theme-card {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

.theme-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  margin-bottom: 10px;
}

.theme-headline {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.3;
}

.theme-body {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.theme-meta {
  font-size: 12px;
  color: var(--text-tertiary);
}
```

**Action Gaps callout:**
```css
.action-gaps {
  background: #fef8e8;
  border: 1px solid #e8d59e;
  border-radius: 8px;
  padding: 16px 20px;
  margin-top: 20px;
}

.action-gaps-title {
  font-size: 14px;
  font-weight: 600;
  color: #8a6d00;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-gap-item {
  font-size: 13px;
  color: #5c4a00;
  margin-bottom: 8px;
  line-height: 1.5;
}

.action-gap-item:last-child {
  margin-bottom: 0;
}
```

---

## Icons

Use Lucide icons throughout. Stroke width 1.5 or 2 for clarity.

Key icons:
- Expand: `ChevronDown` / `ChevronUp`
- Feedback: `ThumbsUp` / `ThumbsDown`
- Dismiss: `X`
- Voice: `Volume2`
- Schedule: `Calendar`
- Email: `Mail`
- Info: `Info`
- Warning: `AlertTriangle`

---

## Summary of Changes

| Element | Before | After |
|---------|--------|-------|
| Font | Generic sans | Segoe UI / Inter |
| Background | Cold slate (#f8fafc) | Neutral gray (#f5f5f5) |
| Accent | Standard blue | Microsoft blue (#0078d4) |
| Headlines | 16px regular | 18px semi-bold |
| Cards | Flat or over-shadowed | Subtle shadow + border |
| Priority | Colored left stripe | Small colored badge |
| Buttons | Generic blue | Microsoft-style rounded |
| Overall | Generic SaaS | Native Teams premium |

---

## Testing Checklist

- [ ] Headlines are instantly readable — eye goes there first
- [ ] Cards feel elevated but not floating
- [ ] Colors feel at home in Teams
- [ ] Buttons match Teams style
- [ ] Hover states are subtle but noticeable
- [ ] Text hierarchy is clear at a glance
- [ ] Overall feels polished but professional (not playful)
- [ ] Doesn't look like every other AI-generated dashboard
