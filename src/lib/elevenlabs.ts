// ABOUTME: ElevenLabs TTS integration for voice briefing playback.
// ABOUTME: Generates audio from the briefing script using ElevenLabs API.

const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // "Sarah" voice - warm, professional

export async function generateVoiceBriefing(script: string): Promise<ArrayBuffer> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: script,
        model_id: 'eleven_turbo_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status}`);
  }

  return response.arrayBuffer();
}
