// ABOUTME: Claude API integration for the Brief Me conversational interface.
// ABOUTME: Provides context-aware responses about the daily briefing insights.

import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are the Daily Briefing Agent's conversational interface. You help Sarah, a Brand Manager at a CPG company who manages the Tide brand.

Context from today's briefing:
- Tide Pods velocity down 8% at Target due to Gain BOGO promotion
- Gain launching "Island Fresh" scent at Walmart in February
- TikTok viral moment with Tide-to-Go pen hack (2.3M views)
- Walmart QBR coming up Thursday

Sarah's key accounts: Target, Walmart, Kroger, Costco
Sarah's brands: Tide (primary), Tide Pods, Tide-to-Go
Key competitors: Gain, All, Persil

Be concise, helpful, and action-oriented. Provide specific data points when available. Keep responses to 2-4 sentences unless more detail is requested.`;

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function getBriefMeResponse(
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> {
  const anthropic = new Anthropic();

  const messages = conversationHistory.map((msg) => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
  }));

  messages.push({ role: 'user', content: userMessage });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages,
  });

  const textContent = response.content.find((block) => block.type === 'text');
  return textContent ? textContent.text : 'I apologize, I was unable to generate a response.';
}

export const FALLBACK_RESPONSES: Record<string, string> = {
  'target': "Tide Pods velocity at Target is down 8.2% week-over-week, correlating with Gain's BOGO launch Tuesday. The Midwest is hit hardest at -12%, while coastal markets are more stable. Jennifer Chen is your Target account lead if you want to align on a response—I can set up that meeting.",
  'prioritize': "I'd focus on the Target velocity decline first—it's the most time-sensitive given the competitive promotion is active now. The TikTok moment also has a short window if you want to amplify. The Walmart QBR prep can wait until tomorrow, and the Gain launch is more of a strategic watch item for now.",
  'tiktok': "The video is from @cleanfreakjess showing Tide-to-Go pens cleaning sneaker soles—2.3M views in 48 hours, 94% positive sentiment. The hashtag #TidePenHack has spawned 45+ additional videos. This is authentic earned media in the 18-34 sneaker culture demographic. Typical engagement window is 48-72 hours, so if you want to amplify, today or tomorrow is the window.",
  'walmart': "Your Walmart QBR is Thursday at 2 PM. Key changes since September: Tide Pods unit share up 0.8 points to 34.2%, out-of-stock improved to 2.8%. Expect discussion on sustainability packaging—Walmart's been pushing all suppliers on this. Would you like me to help update your deck?",
  'gain': "Gain is launching 'Island Fresh' at Walmart in February with end-cap placement and 15% launch discount. This is their first new scent in 18 months. Historical patterns suggest 2-3% incremental category share capture, with ~40% from competitive brands. Could represent $8-12M at-risk revenue for Tide.",
};

export function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('target')) return FALLBACK_RESPONSES['target'];
  if (lowerMessage.includes('priorit') || lowerMessage.includes('focus') || lowerMessage.includes('first')) return FALLBACK_RESPONSES['prioritize'];
  if (lowerMessage.includes('tiktok') || lowerMessage.includes('viral') || lowerMessage.includes('social')) return FALLBACK_RESPONSES['tiktok'];
  if (lowerMessage.includes('walmart') || lowerMessage.includes('qbr')) return FALLBACK_RESPONSES['walmart'];
  if (lowerMessage.includes('gain') || lowerMessage.includes('compet')) return FALLBACK_RESPONSES['gain'];
  
  return "I can help you with today's briefing items: the Target velocity decline, Gain's new product launch, the TikTok viral moment, or your upcoming Walmart QBR. What would you like to know more about?";
}
