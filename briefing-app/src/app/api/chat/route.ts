// ABOUTME: API route for Brief Me chat functionality.
// ABOUTME: Handles Claude API calls with fallback to pre-scripted responses.

import { NextRequest, NextResponse } from 'next/server';
import { getBriefMeResponse, getFallbackResponse, Message } from '@/lib/claude';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const conversationHistory: Message[] = history || [];

    if (!process.env.ANTHROPIC_API_KEY) {
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ response: fallbackResponse, fallback: true });
    }

    try {
      const response = await getBriefMeResponse(message, conversationHistory);
      return NextResponse.json({ response, fallback: false });
    } catch (apiError) {
      console.error('Claude API error, using fallback:', apiError);
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ response: fallbackResponse, fallback: true });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
