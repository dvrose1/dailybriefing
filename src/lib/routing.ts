// ABOUTME: Deterministic audience routing rules v1 for the ops console.
// ABOUTME: No LLM scoring. Every rule is explainable in one sentence to stakeholders.

import { Profile, Signal } from '@/types';

export interface AudienceMatch {
  personaId: string;
  // The one-sentence rule that routed this person. Shown in the console.
  rule: string;
}

export interface AudienceResolution {
  matches: AudienceMatch[];
  // True when no rule matched anyone. Console flags this "needs manual routing"
  // and logs the miss.
  unmatched: boolean;
}

const overlaps = (a: string[], b: string[]) => a.some((x) => b.includes(x));

// Resolve a signal to recipients using hardcoded rules. Only onboarded
// personas are eligible. Rules are ordered by source type.
export function resolveAudience(signal: Signal, personas: Profile[]): AudienceResolution {
  const eligible = personas.filter((p) => p.onboardingComplete);
  const matches: AudienceMatch[] = [];

  for (const p of eligible) {
    const rule = matchRule(signal, p);
    if (rule) matches.push({ personaId: p.id, rule });
  }

  return { matches, unmatched: matches.length === 0 };
}

// Returns the matching rule sentence for one persona, or null if no rule fires.
function matchRule(signal: Signal, p: Profile): string | null {
  switch (signal.source) {
    case 'Bleeding Campaign': {
      // Bleeding Campaign for brand X in market Y goes to people who own brand X
      // in market Y and work in Media (or are Analysts).
      const brandMatch = overlaps(signal.brandTags, p.brands);
      const marketMatch = overlaps(signal.marketTags, p.markets);
      const scopeMatch = p.scopes.includes('Media') || p.archetype === 'Analyst';
      if (brandMatch && marketMatch && scopeMatch) {
        return `Bleeding Campaign for ${signal.brandTags.join(', ')} in ${signal.marketTags.join(', ')}, and you own that brand and market in a Media/Analyst role.`;
      }
      return null;
    }

    case 'Post-Meeting Insight': {
      // Post-Meeting Insight goes to tagged attendees.
      if (signal.attendeeIds.includes(p.id)) {
        return 'Post-Meeting Insight and you were a tagged attendee of the meeting.';
      }
      return null;
    }

    case 'Social Trend': {
      // Social Trend for brand X goes to people who own brand X and work in
      // Social or Media.
      const brandMatch = overlaps(signal.brandTags, p.brands);
      const scopeMatch = p.scopes.includes('Social') || p.scopes.includes('Media');
      if (brandMatch && scopeMatch) {
        return `Social Trend for ${signal.brandTags.join(', ')}, and you own that brand with Social or Media scope.`;
      }
      return null;
    }

    case 'Manual/Other':
    default:
      // No automatic rule. Always falls through to manual routing.
      return null;
  }
}

// Human-readable summary of the rule set, for the console legend.
export const ROUTING_RULES_SUMMARY: string[] = [
  'Bleeding Campaign + brand + market goes to owners of that brand and market who work in Media or are Analysts.',
  'Post-Meeting Insight goes to the tagged meeting attendees.',
  'Social Trend + brand goes to owners of that brand with Social or Media scope.',
  'Anything unmatched is flagged for manual routing and the miss is logged.',
];
