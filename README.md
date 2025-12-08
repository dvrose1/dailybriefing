# Daily Briefing Agent

AI-powered daily briefing prototype for CPG marketers. Demo prototype for product pitch.

## Features

- 4 insight cards with expand/collapse, charts, and actions
- Brief Me chat (Claude API)
- Voice briefing (ElevenLabs TTS)
- Feedback system with undo
- Action modals (schedule meeting, draft email)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and add your API keys:

```
ANTHROPIC_API_KEY=sk-ant-...
ELEVENLABS_API_KEY=...
```

## Deploy on Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy
