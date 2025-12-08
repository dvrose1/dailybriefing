// ABOUTME: API route for voice briefing generation.
// ABOUTME: Returns audio stream from ElevenLabs or placeholder for demo.

import { NextResponse } from 'next/server';
import { generateVoiceBriefing } from '@/lib/elevenlabs';
import { voiceBriefingScript } from '@/data/insights';

export async function GET() {
  if (!process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json(
      { error: 'ElevenLabs API key not configured', demo: true },
      { status: 200 }
    );
  }

  try {
    const audioBuffer = await generateVoiceBriefing(voiceBriefingScript);
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Voice generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate voice briefing' },
      { status: 500 }
    );
  }
}
