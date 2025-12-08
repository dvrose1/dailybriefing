// ABOUTME: Synthetic data for the Weekly Synthesis view.
// ABOUTME: Contains themes, action gaps, and weekly stats for the demo.

import { WeeklyData } from '@/types';

export const weeklyData: WeeklyData = {
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
