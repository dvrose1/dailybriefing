// ABOUTME: Synthetic data for the What You've Taught Me dashboard.
// ABOUTME: Contains topic engagement, patterns, and learned preferences.

import { LearningData } from '@/types';

export const learningData: LearningData = {
  topicEngagement: [
    { topic: "Competitive Intelligence", percentage: 78, color: "#6f00e2" },
    { topic: "Performance Alerts", percentage: 65, color: "#6f00e2" },
    { topic: "Social & Sentiment", percentage: 42, color: "#6f00e2" },
    { topic: "Calendar & Prep", percentage: 31, color: "#6f00e2" },
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
