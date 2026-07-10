// ABOUTME: Wizard option constants and three seeded demo personas.
// ABOUTME: MOCK data. In production, profiles come from the onboarding hub store.

import {
  Archetype,
  BusinessUnit,
  Cadence,
  FunctionalScope,
  Market,
  NotificationChannel,
  Profile,
} from '@/types';

export const ARCHETYPES: Archetype[] = [
  'Senior Sponsor',
  'Adoption Champion',
  'Process Owner',
  'Analyst',
  'Data Owner',
];

export const BUSINESS_UNITS: BusinessUnit[] = ['B&W', 'Personal Care', 'Foods'];

// Unilever brand set, grouped by business unit. Foods stays fictional.
export const BRANDS_BY_BU: Record<BusinessUnit, string[]> = {
  'B&W': ['Dove', 'Tresemme', 'Shea', 'Nexxus', 'Vaseline'],
  'Personal Care': ['Dove Men+Care', 'Degree', 'Axe', 'Dove SCL'],
  Foods: ['Harvest Table', 'Golden Spoon', 'Nested Broth'],
};

export const ALL_BRANDS: string[] = Object.values(BRANDS_BY_BU).flat();

export const MARKETS: Market[] = ['US National', 'US Midwest', 'US Northeast', 'Canada'];

export const SCOPES: FunctionalScope[] = ['Media', 'CMI', 'Cat Ops', 'Social', 'Supply Chain'];

export const CHANNELS: NotificationChannel[] = ['Teams', 'Email', 'In-app'];

export const CADENCES: Cadence[] = ['Realtime', 'Daily digest'];

export const PROBLEM_OPTIONS: string[] = [
  'Campaigns underspend before I notice',
  'Competitive moves reach me too late',
  'Too much noise, not enough signal',
  'Post-meeting actions get lost',
  'Hard to see performance across markets',
  'Social trends move faster than my team',
];

// Three demo personas. Persona A starts un-onboarded so the demo can run the
// wizard live; B and C are pre-filled so routing differences show immediately.
export const SEED_PERSONAS: Profile[] = [
  {
    id: 'persona-a',
    name: 'Alex Morgan',
    initials: 'AM',
    onboardingComplete: false,
    archetype: null,
    roleTitle: '',
    businessUnit: null,
    brands: [],
    markets: [],
    scopes: [],
    problems: [],
    problemNotes: '',
    channel: 'Teams',
    cadence: 'Realtime',
  },
  {
    id: 'persona-b',
    name: 'Priya Shah',
    initials: 'PS',
    onboardingComplete: true,
    archetype: 'Senior Sponsor',
    roleTitle: 'VP Personal Care Marketing',
    businessUnit: 'Personal Care',
    brands: ['Degree'],
    markets: ['US Northeast'],
    scopes: ['CMI'],
    problems: ['Competitive moves reach me too late'],
    problemNotes: '',
    channel: 'Email',
    cadence: 'Daily digest',
  },
  {
    id: 'persona-c',
    name: 'Diego Ramirez',
    initials: 'DR',
    onboardingComplete: true,
    archetype: 'Adoption Champion',
    roleTitle: 'Foods Social & Content Lead',
    businessUnit: 'Foods',
    brands: ['Harvest Table', 'Golden Spoon'],
    markets: ['US National'],
    scopes: ['Social', 'Media'],
    problems: ['Social trends move faster than my team'],
    problemNotes: '',
    channel: 'Teams',
    cadence: 'Realtime',
  },
];
