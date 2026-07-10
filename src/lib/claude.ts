// ABOUTME: Claude API integration for the Brief Me conversational interface.
// ABOUTME: Provides context-aware responses about the daily briefing insights.

import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are the Daily Briefing Agent's conversational interface. You help Alex, a Brand Manager at Unilever who manages the Dove brand.

Context from today's briefing:
- Dove Body Wash velocity down 8% at Target due to Olay BOGO promotion
- Old Spice launching "Glacier Falls" scent at Walmart in February
- TikTok viral moment with Vaseline slugging routine (2.3M views)
- Walmart QBR coming up Thursday

Alex's key accounts: Target, Walmart, Kroger, Costco
Alex's brands: Dove (primary), Vaseline, Degree, Axe
Key competitors: Olay, Old Spice, Native, Dial

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
  'target': "Dove Body Wash velocity at Target is down 8.2% week-over-week, correlating with Olay's BOGO launch Tuesday. The Midwest is hit hardest at -12%, while coastal markets are more stable. Jennifer Chen is your Target account lead if you want to align on a response—I can set up that meeting.",
  'prioritize': "I'd focus on the Target velocity decline first—it's the most time-sensitive given the competitive promotion is active now. The TikTok moment also has a short window if you want to amplify. The Walmart QBR prep can wait until tomorrow, and the Old Spice launch is more of a strategic watch item for now.",
  'tiktok': "The video is from @glowwithmaya showing an overnight slugging routine with Vaseline—2.3M views in 48 hours, 94% positive sentiment. The hashtag #VaselineSlugging has spawned 45+ additional videos. This is authentic earned media in the 18-34 skincare demographic. Typical engagement window is 48-72 hours, so if you want to amplify, today or tomorrow is the window.",
  'walmart': "Your Walmart QBR is Thursday at 2 PM. Key changes since September: Dove Body Wash unit share up 0.8 points to 34.2%, out-of-stock improved to 2.8%. Expect discussion on sustainability packaging—Walmart's been pushing all suppliers on this. Would you like me to help update your deck?",
  'competitive': "Old Spice is launching 'Glacier Falls' at Walmart in February with end-cap placement and 15% launch discount. This is their first new scent in 18 months. Historical patterns suggest 2-3% incremental category share capture, with ~40% from competitive brands. Could represent $8-12M at-risk revenue for Degree and Axe.",
};

export function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('target')) return FALLBACK_RESPONSES['target'];
  if (lowerMessage.includes('priorit') || lowerMessage.includes('focus') || lowerMessage.includes('first')) return FALLBACK_RESPONSES['prioritize'];
  if (lowerMessage.includes('tiktok') || lowerMessage.includes('viral') || lowerMessage.includes('social') || lowerMessage.includes('slugging')) return FALLBACK_RESPONSES['tiktok'];
  if (lowerMessage.includes('walmart') || lowerMessage.includes('qbr')) return FALLBACK_RESPONSES['walmart'];
  if (lowerMessage.includes('old spice') || lowerMessage.includes('compet') || lowerMessage.includes('launch')) return FALLBACK_RESPONSES['competitive'];

  return "I can help you with today's briefing items: the Target velocity decline, Old Spice's new product launch, the Vaseline TikTok moment, or your upcoming Walmart QBR. What would you like to know more about?";
}
