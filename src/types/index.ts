// ABOUTME: TypeScript interfaces for the Daily Briefing Agent prototype.
// ABOUTME: Defines data structures for insights, actions, charts, and chat messages.

export interface Insight {
  id: string;
  priority: 'urgent' | 'important' | 'informational';
  category: 'performance' | 'competitive' | 'social' | 'calendar' | 'industry';
  headline: string;
  summary: string;
  expandedAnalysis: string;
  whySeeing: string;
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
  updatedAt: string;
  chartData?: ChartDataPoint[];
  recommendedAction: RecommendedAction;
}

export interface RecommendedAction {
  type: 'schedule_meeting' | 'draft_email' | 'add_to_deck' | 'investigate';
  label: string;
  prefill: {
    attendees?: string[];
    subject?: string;
    agenda?: string;
    suggestedTimes?: string[];
    to?: string;
    emailSubject?: string;
    body?: string;
  };
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface BriefMeMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface WeeklyTheme {
  id: string;
  headline: string;
  synthesis: string;
  relatedDays: string[];
  suggestedFocus: string;
}

export interface ActionGap {
  item: string;
  day: string;
  issue: string;
  actionLabel: string;
}

export interface WeeklyStats {
  insightsSurfaced: number;
  actionsTaken: number;
  dismissed: number;
  engagementRate: number;
  engagementChange: number;
}

export interface WeeklyData {
  weekRange: string;
  themeCount: number;
  actionGapsCount: number;
  themes: WeeklyTheme[];
  actionGaps: ActionGap[];
  stats: WeeklyStats;
}

export interface TopicEngagement {
  topic: string;
  percentage: number;
  color: string;
}

export interface LearningPatterns {
  avgReviewTime: string;
  mostActiveDay: string;
  preferredAction: string;
}

export interface LearningData {
  topicEngagement: TopicEngagement[];
  patterns: LearningPatterns;
  learnedPreferences: string[];
}
