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
