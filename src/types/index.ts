// ABOUTME: TypeScript interfaces for the Daily Briefing Agent prototype.
// ABOUTME: Defines data structures for insights, actions, charts, and chat messages.

export type Priority = 'urgent' | 'important' | 'informational';
export type Category = 'performance' | 'competitive' | 'social' | 'calendar' | 'industry';

export interface Insight {
  id: string;
  priority: Priority;
  category: Category;
  headline: string;
  summary: string;
  expandedAnalysis: string;
  whySeeing: string;
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
  updatedAt: string;
  chartData?: ChartDataPoint[];
  recommendedAction: RecommendedAction;
  // Set when this card was routed and delivered from the ops console (Phase 2/3).
  // Links a briefing card back to its send so relevance feedback can flow to the log.
  deliveryId?: string;
  source?: SignalSource;
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

// ---------------------------------------------------------------------------
// Chief of Staff Phase 1 — profile, signal, routing, and delivery types.
// The recipient briefing above is REAL taxonomy; everything below models the
// mock full-loop demo (onboarding -> console -> delivery -> feedback).
// ---------------------------------------------------------------------------

export type Archetype =
  | 'Senior Sponsor'
  | 'Adoption Champion'
  | 'Process Owner'
  | 'Analyst'
  | 'Data Owner';

export type BusinessUnit = 'B&W' | 'Personal Care' | 'Foods';

export type Market = 'US National' | 'US Midwest' | 'US Northeast' | 'Canada';

export type FunctionalScope = 'Media' | 'CMI' | 'Cat Ops' | 'Social' | 'Supply Chain';

export type NotificationChannel = 'Teams' | 'Email' | 'In-app';

export type Cadence = 'Realtime' | 'Daily digest';

export interface Profile {
  id: string;
  name: string;
  initials: string;
  onboardingComplete: boolean;
  archetype: Archetype | null;
  roleTitle: string;
  businessUnit: BusinessUnit | null;
  brands: string[];
  markets: Market[];
  scopes: FunctionalScope[];
  problems: string[];
  problemNotes: string;
  channel: NotificationChannel;
  cadence: Cadence;
}

export type SignalSource =
  | 'Bleeding Campaign'
  | 'Post-Meeting Insight'
  | 'Social Trend'
  | 'Manual/Other';

export type SignalStatus = 'queued' | 'approved' | 'dismissed';

// A candidate notification in the ops console queue. Resolves into one Insight
// per matched recipient on approval.
export interface Signal {
  id: string;
  title: string;
  body: string;
  priority: Priority;
  category: Category;
  source: SignalSource;
  brandTags: string[];
  marketTags: Market[];
  attendeeIds: string[]; // for Post-Meeting Insight routing
  createdAt: string;
  status: SignalStatus;
  approvedAt?: string;
  approvedBy?: string;
}

export type RelevanceRating = 'useful' | 'not_relevant';

// One approved send of a signal to one recipient. Backs the send log and the
// recipient's delivered card. Feedback is written here.
export interface Delivery {
  id: string;
  signalId: string;
  personaId: string;
  matchedRule: string; // the one-sentence rule that routed this person
  deliveredAt: string;
  routedToDigest: boolean; // true when fatigue cap or cadence batched it
  relevance?: RelevanceRating;
  relevanceComment?: string;
}
