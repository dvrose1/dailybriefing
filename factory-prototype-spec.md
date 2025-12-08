# Daily Briefing Agent — Prototype Build Spec

## Project Overview

Build a high-fidelity interactive prototype demonstrating an AI-powered Daily Briefing Agent for CPG marketers. This is a demo prototype for a product pitch — it needs to look polished and feel real, but doesn't need actual backend infrastructure.

**Demo goal:** In 3 minutes, a viewer should understand what the product does, believe the insights are valuable, and want to use it.

**Target demo flow:**
1. User opens briefing, sees 4 insight cards
2. Expands one card to see full analysis + chart
3. Takes action (schedules meeting with pre-filled details)
4. Provides feedback (thumbs up one, dismisses another)
5. Uses Brief Me to ask a follow-up question
6. Listens to voice briefing (30-60 seconds)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State:** React useState/useContext (keep simple)
- **LLM:** Anthropic Claude API (for Brief Me) — will add API key as env var
- **Voice:** ElevenLabs API (for TTS) — will add API key as env var
- **Deployment:** Vercel
- **Charts:** Recharts (simple, React-native)

---

## Design Direction

**Overall feel:** Professional enterprise SaaS, clean and confident. Think Linear, Notion, or modern Microsoft 365 — not playful startup.

**Color palette:**
- Background: `#f8fafc` (slate-50)
- Cards: `#ffffff` with subtle shadow
- Primary accent: `#2563eb` (blue-600)
- Urgent/Alert: `#dc2626` (red-600)
- Success/Positive: `#16a34a` (green-600)
- Warning: `#d97706` (amber-600)
- Text primary: `#1e293b` (slate-800)
- Text secondary: `#64748b` (slate-500)

**Typography:**
- Font: Inter (or system font stack)
- Headings: Semi-bold
- Body: Regular, 14-16px

**Layout:**
- Left sidebar (narrow, ~60px) with app icons — suggests Teams/Slack context
- Main content area with briefing
- Max-width container (~800px) for readability

---

## Component Structure

```
src/
├── app/
│   ├── page.tsx              # Main briefing page
│   ├── layout.tsx            # Root layout with sidebar
│   └── globals.css           # Tailwind + custom styles
├── components/
│   ├── Sidebar.tsx           # Left nav suggesting Teams context
│   ├── BriefingHeader.tsx    # Greeting, date, item count, voice button
│   ├── InsightCard.tsx       # Individual insight card (collapsible)
│   ├── InsightCardExpanded.tsx  # Full detail view with chart
│   ├── ActionModal.tsx       # Schedule meeting / draft email modal
│   ├── FeedbackButtons.tsx   # Thumbs up/down, dismiss, "why seeing this"
│   ├── BriefMeChat.tsx       # Conversational interface
│   ├── VoicePlayer.tsx       # Audio playback controls
│   └── Chart.tsx             # Sparkline / trend chart component
├── data/
│   └── insights.ts           # All synthetic insight data
├── lib/
│   ├── claude.ts             # Claude API integration
│   └── elevenlabs.ts         # ElevenLabs TTS integration
└── types/
    └── index.ts              # TypeScript interfaces
```

---

## Data Types

```typescript
interface Insight {
  id: string;
  priority: 'urgent' | 'important' | 'informational';
  category: 'performance' | 'competitive' | 'social' | 'calendar' | 'industry';
  headline: string;           // <10 words
  summary: string;            // 2-4 sentences
  expandedAnalysis: string;   // 2-3 paragraphs
  whySeeing: string;          // Explainability text
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
  updatedAt: string;          // "2 hours ago", "Yesterday 4pm"
  chartData?: ChartDataPoint[];
  recommendedAction: RecommendedAction;
}

interface RecommendedAction {
  type: 'schedule_meeting' | 'draft_email' | 'add_to_deck' | 'investigate';
  label: string;              // "Schedule Meeting", "Draft Email"
  prefill: {
    // For meeting
    attendees?: string[];
    subject?: string;
    agenda?: string;
    suggestedTimes?: string[];
    // For email
    to?: string;
    emailSubject?: string;
    body?: string;
  };
}

interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface BriefMeMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

---

## Synthetic Data: 4 Insight Cards

### Insight 1: Performance Alert (URGENT)

```typescript
{
  id: "insight-1",
  priority: "urgent",
  category: "performance",
  headline: "Tide Pods velocity down 8% at Target",
  summary: "Week-over-week unit velocity declined 8.2% at Target stores nationally. This correlates with Gain's BOGO promotion launched last Tuesday. Dollar share held but unit share dropped 1.4 points. Midwest region showing steepest decline at -12%.",
  expandedAnalysis: `Unit velocity for Tide Pods 42ct decreased 8.2% week-over-week across Target's national footprint, with the decline accelerating mid-week following Gain's buy-one-get-one promotion launch on Tuesday.

Regional analysis shows significant variation: Midwest stores experienced the steepest decline (-12%), while coastal markets remained relatively stable (-4% to -6%). This pattern suggests price sensitivity is higher in middle-America markets where Gain has historically stronger brand affinity.

While dollar share has held steady due to our premium positioning, unit share declined 1.4 points—concerning given Target's importance as a bellwether for broader mass retail trends. Promotional response typically takes 2-3 weeks to fully materialize, suggesting we may see continued pressure.

Inventory levels remain healthy (3.2 weeks on-hand), so out-of-stock is not a contributing factor. The decline appears purely competitive.`,
  whySeeing: "This insight was prioritized because: (1) You own the Tide Pods brand, (2) Target is flagged as a key account in your profile, (3) Week-over-week declines exceeding 5% trigger automatic alerts, (4) Competitive promotional activity is a category you've historically engaged with.",
  confidence: "high",
  sources: ["Nielsen Retail Measurement", "Target POS Data", "Promotional Calendar"],
  updatedAt: "2 hours ago",
  chartData: [
    { date: "Mon", value: 12400 },
    { date: "Tue", value: 12100 },
    { date: "Wed", value: 10800 },
    { date: "Thu", value: 10200 },
    { date: "Fri", value: 10600 },
    { date: "Sat", value: 11800 },
    { date: "Sun", value: 11400 }
  ],
  recommendedAction: {
    type: "schedule_meeting",
    label: "Schedule Meeting",
    prefill: {
      attendees: ["Jennifer Chen (Target Account Lead)", "Marcus Williams (Trade Marketing)", "You"],
      subject: "Urgent: Tide Pods Velocity Response - Target",
      agenda: "• Review Gain BOGO impact on Tide Pods performance\n• Discuss regional variation (Midwest -12%)\n• Evaluate promotional response options\n• Align on recommendation for leadership",
      suggestedTimes: ["Today 2:00 PM", "Today 4:30 PM", "Tomorrow 9:00 AM"]
    }
  }
}
```

### Insight 2: Competitive Intelligence (IMPORTANT)

```typescript
{
  id: "insight-2",
  priority: "important",
  category: "competitive",
  headline: "Gain launching new scent variant at Walmart",
  summary: "Competitive monitoring detected Gain 'Island Fresh' scent appearing in Walmart system for February end-cap placement. Internal pricing suggests 15% promotional discount at launch. This would be their first new scent in 18 months.",
  expandedAnalysis: `Walmart's internal product database shows a new Gain variant—"Island Fresh"—scheduled for February end-cap placement across approximately 2,800 stores. This represents their first new scent launch in 18 months, breaking a pattern of line extensions within existing fragrances.

Preliminary pricing data indicates a planned 15% promotional discount at launch ($11.47 vs. standard $13.49 for comparable 64oz), which would position it aggressively against our Tide Original at similar price points.

The "Island Fresh" positioning suggests targeting of the growing tropical/vacation scent segment, which has seen 23% growth in fabric care over the past year. Our portfolio currently lacks a direct competitor in this micro-segment.

Historical data shows Gain new scent launches typically capture 2-3% incremental category share in the first quarter, with approximately 40% coming from competitive brands. If patterns hold, this could represent $8-12M in at-risk revenue for the Tide portfolio.`,
  whySeeing: "This insight was prioritized because: (1) Gain is listed as a key competitor, (2) Walmart is a priority retailer in your account list, (3) New product launches from tracked competitors are automatically flagged, (4) You engaged with 3 similar competitive alerts in the past month.",
  confidence: "medium",
  sources: ["Competitive Intelligence Platform", "Walmart Retail Link", "Industry Sources"],
  updatedAt: "Yesterday 6:00 PM",
  chartData: null,
  recommendedAction: {
    type: "draft_email",
    label: "Draft Email",
    prefill: {
      to: "Brand Strategy Team",
      emailSubject: "Heads Up: Gain New Scent Launch at Walmart - February",
      body: "Team,\n\nWanted to flag some competitive intelligence that came through this morning.\n\nGain is launching a new 'Island Fresh' scent variant at Walmart in February with end-cap placement and a 15% launch discount. This is their first new scent in 18 months.\n\nGiven the timing and promotional depth, we should discuss whether this warrants a response. A few questions worth considering:\n\n• Do we have anything in the pipeline that could counter-program?\n• Should we evaluate incremental trade spend at Walmart during their launch window?\n• Is the tropical scent segment something we should be exploring?\n\nHappy to set up time to discuss if helpful.\n\nBest,\nSarah"
    }
  }
}
```

### Insight 3: Social Sentiment (IMPORTANT)

```typescript
{
  id: "insight-3",
  priority: "important",
  category: "social",
  headline: "TikTok trend featuring Tide pen hack going viral",
  summary: "A TikTok video demonstrating an unconventional Tide-to-Go pen use for sneaker cleaning has reached 2.3M views in 48 hours. Sentiment is 94% positive. This represents an organic brand moment with potential to amplify.",
  expandedAnalysis: `A TikTok creator (@cleanfreakjess, 340K followers) posted a video showing Tide-to-Go pens being used to clean white sneaker soles, reaching 2.3M views and 180K likes within 48 hours. The hashtag #TidePenHack has generated an additional 45 videos with combined 800K views.

Sentiment analysis shows 94% positive reception, with top comment themes being "game changer," "why didn't I think of this," and "need to try this." Notably, several comments specifically praise brand quality: "this is why you don't buy off-brand."

This represents an organic brand moment in a high-value demographic (18-34, sneaker culture). The creator has not been compensated and has no prior brand relationship, making this authentic earned media.

Historical analysis shows similar organic viral moments have 48-72 hour engagement windows before algorithm decay. Amplification within this window typically yields 3-5x extended reach versus non-response.`,
  whySeeing: "This insight was prioritized because: (1) Tide is your primary brand, (2) Social velocity exceeded 1M views/24hr threshold, (3) You've previously indicated interest in influencer and social opportunities, (4) Sentiment exceeds 90% positive threshold.",
  confidence: "high",
  sources: ["Sprinklr Social Listening", "TikTok Analytics", "Brandwatch"],
  updatedAt: "4 hours ago",
  chartData: [
    { date: "Day 1 AM", value: 50000 },
    { date: "Day 1 PM", value: 340000 },
    { date: "Day 2 AM", value: 1200000 },
    { date: "Day 2 PM", value: 2300000 }
  ],
  recommendedAction: {
    type: "schedule_meeting",
    label: "Schedule Meeting",
    prefill: {
      attendees: ["Social Media Team", "Rachel Kim (Influencer Marketing)", "You"],
      subject: "Time Sensitive: TikTok Tide Pen Viral Moment",
      agenda: "• Review viral content and engagement metrics\n• Discuss amplification options (paid boost, creator outreach, brand response)\n• Evaluate quick-turn content opportunities\n• Decide on response strategy within engagement window",
      suggestedTimes: ["Today 11:00 AM", "Today 1:00 PM"]
    }
  }
}
```

### Insight 4: Calendar-Aware (INFORMATIONAL)

```typescript
{
  id: "insight-4",
  priority: "informational",
  category: "calendar",
  headline: "Walmart QBR Thursday: Key prep materials",
  summary: "Your Walmart Quarterly Business Review is Thursday at 2 PM. Based on your calendar and recent data, I've compiled the key talking points and flagged three items that have changed since your last meeting.",
  expandedAnalysis: `Your Q4 Walmart QBR is scheduled for Thursday at 2:00 PM with David Park (Walmart Category Manager) and your internal team. Based on previous QBR patterns and recent developments, here are the key preparation items:

**Changes since last QBR (September):**
1. Tide Pods unit share at Walmart increased 0.8 points (now 34.2%)
2. Out-of-stock rate improved from 4.2% to 2.8% following supply chain adjustments
3. New promotional calendar agreed for Q1 (3 planned events vs. 2 last year)

**Likely discussion topics based on Walmart's recent category communications:**
• Sustainability packaging initiatives (they've been pushing all suppliers)
• Shelf placement optimization—they're testing new planogram approaches
• E-commerce growth: Walmart+ laundry category up 34% YoY

**Recommended prep:**
• Pull the promotional lift analysis from October's BOGO (I can help with this)
• Review sustainability roadmap talking points with brand team
• Prepare response to potential margin pressure conversation

The QBR deck template from September is in your SharePoint—would you like me to help update it with current data?`,
  whySeeing: "This insight was prioritized because: (1) This meeting is on your calendar for Thursday, (2) Walmart is a key account, (3) QBRs are flagged as high-preparation meetings in your preferences, (4) Multiple data points have changed since your last Walmart meeting.",
  confidence: "high",
  sources: ["Outlook Calendar", "Previous Meeting Notes", "Nielsen Data", "Walmart Retail Link"],
  updatedAt: "This morning",
  chartData: null,
  recommendedAction: {
    type: "add_to_deck",
    label: "Update QBR Deck",
    prefill: {
      // This would open a modal showing deck sections to update
    }
  }
}
```

---

## Brief Me: Pre-scripted Exchanges

If using Claude API, use this system prompt:

```
You are the Daily Briefing Agent's conversational interface. You help Sarah, a Brand Manager at a CPG company who manages the Tide brand.

Context from today's briefing:
- Tide Pods velocity down 8% at Target due to Gain BOGO promotion
- Gain launching "Island Fresh" scent at Walmart in February
- TikTok viral moment with Tide-to-Go pen hack (2.3M views)
- Walmart QBR coming up Thursday

Sarah's key accounts: Target, Walmart, Kroger, Costco
Sarah's brands: Tide (primary), Tide Pods, Tide-to-Go
Key competitors: Gain, All, Persil

Be concise, helpful, and action-oriented. Provide specific data points when available. Keep responses to 2-4 sentences unless more detail is requested.
```

**Pre-scripted fallbacks if API unavailable:**

User: "Brief me on the Target situation"
Response: "Tide Pods velocity at Target is down 8.2% week-over-week, correlating with Gain's BOGO launch Tuesday. The Midwest is hit hardest at -12%, while coastal markets are more stable. Jennifer Chen is your Target account lead if you want to align on a response—I can set up that meeting."

User: "What should I prioritize today?"
Response: "I'd focus on the Target velocity decline first—it's the most time-sensitive given the competitive promotion is active now. The TikTok moment also has a short window if you want to amplify. The Walmart QBR prep can wait until tomorrow, and the Gain launch is more of a strategic watch item for now."

User: "Tell me more about the TikTok trend"
Response: "The video is from @cleanfreakjess showing Tide-to-Go pens cleaning sneaker soles—2.3M views in 48 hours, 94% positive sentiment. The hashtag #TidePenHack has spawned 45+ additional videos. This is authentic earned media in the 18-34 sneaker culture demographic. Typical engagement window is 48-72 hours, so if you want to amplify, today or tomorrow is the window."

---

## Voice Briefing Script

For ElevenLabs, use a professional, warm voice (suggest "Rachel" or "Adam" from their library). Script:

```
Good morning, Sarah. Here's your briefing for Monday—you have 4 items today, about 6 minutes to review.

First, an urgent item: Tide Pods velocity at Target dropped 8% this week. This coincides with Gain's buy-one-get-one promotion that launched Tuesday. The Midwest region is seeing the steepest decline at 12%, while coastal markets are holding steadier. I'd suggest connecting with Jennifer Chen, your Target account lead, to discuss response options.

Second, competitive intelligence: Gain is preparing to launch a new scent called "Island Fresh" at Walmart in February. They're planning end-cap placement with a 15% launch discount. This is their first new scent in 18 months, so it's worth flagging to the brand strategy team.

Third, a social opportunity: A TikTok showing a Tide-to-Go pen hack for cleaning sneakers has gone viral—2.3 million views in 48 hours with 94% positive sentiment. The engagement window is short, so if you want to amplify, the social team should look at it today.

Finally, a prep reminder: Your Walmart QBR is Thursday. A few things have changed since September—Tide Pods share is up eight-tenths of a point, and out-of-stock improved to 2.8%. Walmart's been pushing sustainability conversations with suppliers, so you may want to brush up on those talking points.

That's your briefing. Have a great day, and I'm here if you need me.
```

---

## UI Specifications

### Sidebar (suggests Teams context)
- Width: 60px
- Background: `#1e293b` (dark)
- Icons (top to bottom): Activity, Chat, Teams, **Briefing (active, highlighted)**, Calendar, Files
- Active indicator: Blue left border + lighter background
- This is purely cosmetic—no navigation functionality needed

### Briefing Header
- Greeting: "Good morning, Sarah" (24px, semi-bold)
- Date: "Monday, December 8, 2025" (14px, secondary color)
- Stats: "4 items · About 6 minutes" (14px, secondary color)
- Voice button: "Listen to Briefing" with speaker icon, right-aligned
- Subtle divider below

### Insight Cards (collapsed state)
- White background, subtle shadow (`shadow-sm`)
- Border-left: 4px solid, color based on priority:
  - Urgent: red-500
  - Important: amber-500
  - Informational: blue-500
- Layout:
  - Left: Priority badge ("URGENT", "IMPORTANT") + Category pill ("Performance", "Competitive")
  - Center: Headline (16px, semi-bold) + Summary (14px, secondary, 2 lines truncated)
  - Right: Timestamp ("2 hours ago") + Expand chevron
- Hover: Slight lift (`shadow-md`), cursor pointer
- Click: Expands card

### Insight Cards (expanded state)
- Expands in-place (push other cards down)
- Shows full analysis text (paragraphs)
- Shows chart if available (Recharts line/area chart)
- Shows sources as pills
- Shows confidence indicator
- Shows "Why am I seeing this?" expandable section
- Action button prominent (blue, primary style)
- Feedback row: 👍 👎 | "Dismiss" | "Watch this topic"
- Collapse button (chevron up or X)

### Action Modal
- Centered modal with backdrop
- Title: "Schedule Meeting" (or email, etc.)
- Pre-filled form fields:
  - Attendees (with avatars/pills)
  - Subject
  - Agenda (textarea)
  - Suggested times (radio buttons or pills)
- "Schedule" primary button, "Cancel" secondary
- Success state: "Meeting scheduled! ✓" then auto-close

### Feedback Interactions
- Thumbs up: Fills in, subtle green tint, brief "Thanks! This helps me learn."
- Thumbs down: Fills in, subtle red tint, optional "What was wrong?" (dropdown: Not relevant, Not accurate, Already knew this, Other)
- Dismiss: Card slides out with undo toast (5 seconds)

### Brief Me Chat
- Toggle-able panel (slide in from right, or modal)
- Input at bottom: "Ask me anything..."
- Message bubbles:
  - User: Right-aligned, blue background
  - Assistant: Left-aligned, gray background
- Typing indicator while waiting for response
- Quick suggestion chips above input: "What should I prioritize?", "Tell me about Target", "Prep for Walmart QBR"

### Voice Player
- Floating bar at bottom when playing (like Spotify mini-player)
- Play/pause, progress bar, time elapsed/remaining
- Close/minimize button
- Waveform visualization if feeling fancy (optional)

---

## Implementation Notes

### For Claude API integration:
```typescript
// lib/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getBriefMeResponse(userMessage: string, conversationHistory: Message[]) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    system: BRIEF_ME_SYSTEM_PROMPT, // defined above
    messages: conversationHistory.concat([{ role: "user", content: userMessage }])
  });
  
  return response.content[0].text;
}
```

### For ElevenLabs integration:
```typescript
// lib/elevenlabs.ts
export async function generateVoiceBriefing(script: string): Promise<ArrayBuffer> {
  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID', {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: script,
      model_id: "eleven_turbo_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      }
    })
  });
  
  return response.arrayBuffer();
}
```

---

## Build Order Recommendation

1. **First:** Static layout with sidebar + header + 4 collapsed cards (get the look right)
2. **Second:** Card expansion with full content + charts
3. **Third:** Feedback buttons with visual states
4. **Fourth:** Action modal (Schedule Meeting)
5. **Fifth:** Brief Me chat with Claude integration
6. **Sixth:** Voice player with ElevenLabs integration
7. **Polish:** Animations, transitions, responsive tweaks

---

## Environment Variables Needed

```
ANTHROPIC_API_KEY=sk-ant-...
ELEVENLABS_API_KEY=...
```

---

## Success Criteria

When complete, you should be able to:

1. ✅ Load the page and see a professional briefing interface
2. ✅ See 4 insight cards with clear hierarchy and information
3. ✅ Click a card to expand and see full analysis + chart
4. ✅ Click "Schedule Meeting" and see pre-filled modal
5. ✅ Click thumbs up/down and see visual feedback
6. ✅ Click dismiss and see card slide away with undo option
7. ✅ Open Brief Me and have a conversation
8. ✅ Click "Listen to Briefing" and hear voice narration
9. ✅ Feel like this is a real product you'd want to use
