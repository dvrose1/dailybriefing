// ABOUTME: Synthetic insight data for the Daily Briefing Agent demo.
// ABOUTME: Contains 4 pre-defined insights with realistic CPG marketing scenarios.

import { Insight } from '@/types';

export const insights: Insight[] = [
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
  },
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
    chartData: undefined,
    recommendedAction: {
      type: "draft_email",
      label: "Draft Email",
      prefill: {
        to: "Brand Strategy Team",
        emailSubject: "Heads Up: Gain New Scent Launch at Walmart - February",
        body: `Team,

Wanted to flag some competitive intelligence that came through this morning.

Gain is launching a new 'Island Fresh' scent variant at Walmart in February with end-cap placement and a 15% launch discount. This is their first new scent in 18 months.

Given the timing and promotional depth, we should discuss whether this warrants a response. A few questions worth considering:

• Do we have anything in the pipeline that could counter-program?
• Should we evaluate incremental trade spend at Walmart during their launch window?
• Is the tropical scent segment something we should be exploring?

Happy to set up time to discuss if helpful.

Best,
Sarah`
      }
    }
  },
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
  },
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
    chartData: undefined,
    recommendedAction: {
      type: "add_to_deck",
      label: "Update QBR Deck",
      prefill: {}
    }
  }
];

export const voiceBriefingScript = `Good morning, Sarah. Here's your briefing for Monday—you have 4 items today, about 6 minutes to review.

First, an urgent item: Tide Pods velocity at Target dropped 8% this week. This coincides with Gain's buy-one-get-one promotion that launched Tuesday. The Midwest region is seeing the steepest decline at 12%, while coastal markets are holding steadier. I'd suggest connecting with Jennifer Chen, your Target account lead, to discuss response options.

Second, competitive intelligence: Gain is preparing to launch a new scent called "Island Fresh" at Walmart in February. They're planning end-cap placement with a 15% launch discount. This is their first new scent in 18 months, so it's worth flagging to the brand strategy team.

Third, a social opportunity: A TikTok showing a Tide-to-Go pen hack for cleaning sneakers has gone viral—2.3 million views in 48 hours with 94% positive sentiment. The engagement window is short, so if you want to amplify, the social team should look at it today.

Finally, a prep reminder: Your Walmart QBR is Thursday. A few things have changed since September—Tide Pods share is up eight-tenths of a point, and out-of-stock improved to 2.8%. Walmart's been pushing sustainability conversations with suppliers, so you may want to brush up on those talking points.

That's your briefing. Have a great day, and I'm here if you need me.`;
