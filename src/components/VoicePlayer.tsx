// ABOUTME: Audio playback component for voice briefings.
// ABOUTME: Shows play/pause controls, progress bar, and time display.

'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Volume2 } from 'lucide-react';

interface VoicePlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoicePlayer({ isOpen, onClose }: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen && !audioRef.current) {
      loadAudio();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const loadAudio = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/voice');
      
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = await response.json();
        if (data.demo) {
          setIsDemoMode(true);
          setIsLoading(false);
          return;
        }
        if (data.error) {
          throw new Error(data.error);
        }
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
        setIsLoading(false);
      });

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      });

      audio.addEventListener('error', () => {
        setError('Failed to load audio');
        setIsLoading(false);
      });
    } catch (err) {
      console.error('Audio load error:', err);
      setError('Failed to load voice briefing');
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    
    audioRef.current.currentTime = percentage * audioRef.current.duration;
    setProgress(percentage * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40 animate-slide-up">
      <div className="max-w-3xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Volume2 size={20} />
            <span className="text-sm font-medium">Voice Briefing</span>
          </div>

          {isDemoMode ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-slate-500">
                Voice playback requires ElevenLabs API key in .env.local
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                <span className="text-sm">Loading audio...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>

              <div className="flex-1">
                <div
                  className="h-2 bg-slate-200 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="text-sm text-slate-500 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </>
          )}

          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
