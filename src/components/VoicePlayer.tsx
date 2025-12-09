// ABOUTME: Audio playback component for voice briefings.
// ABOUTME: Minimal elegant style with thin progress bar and subtle controls.

'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, X } from 'lucide-react';

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
    <div 
      className="fixed bottom-0 left-0 right-0 shadow-lg z-40 animate-slide-up"
      style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {isDemoMode ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Voice playback requires ElevenLabs API key in .env.local
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 border-2 rounded-full animate-spin" 
                  style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }}
                />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading audio...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm" style={{ color: 'var(--urgent)' }}>{error}</p>
            </div>
          ) : (
            <>
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                style={{ background: 'var(--foreground)', color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--foreground)'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>

              <span className="text-sm hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
                Listening to your briefing
              </span>

              <div className="flex-1">
                <div
                  className="h-1 rounded-full cursor-pointer"
                  style={{ background: 'var(--bg-elevated)' }}
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, background: 'var(--accent)' }}
                  />
                </div>
              </div>

              <div className="text-sm tabular-nums" style={{ color: 'var(--text-tertiary)' }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </>
          )}

          <button
            onClick={handleClose}
            className="p-2 rounded transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
