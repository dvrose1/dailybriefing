// ABOUTME: Slide-out panel showing what the AI has learned from user feedback.
// ABOUTME: Fluent Premium style with shadows and Microsoft-native styling.

'use client';

import { X, RotateCcw, MessageSquare } from 'lucide-react';
import { LearningData } from '@/types';
import TopicEngagementChart from './TopicEngagementChart';
import PatternsGrid from './PatternsGrid';
import LearnedPreferences from './LearnedPreferences';

interface WhatYouTaughtMePanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: LearningData;
}

export default function WhatYouTaughtMePanel({ 
  isOpen, 
  onClose, 
  data 
}: WhatYouTaughtMePanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      <div 
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[360px] animate-slide-in-right overflow-y-auto"
        style={{ background: 'var(--bg-card)', boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.1)' }}
      >
        <div 
          className="sticky top-0 p-5 flex items-center justify-between"
          style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
              What You've Taught Me
            </h2>
            <p className="text-[13px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Your feedback shapes your briefings
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md transition-colors"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <TopicEngagementChart data={data.topicEngagement} />
          
          <div className="pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            <PatternsGrid patterns={data.patterns} />
          </div>
          
          <div className="pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            <LearnedPreferences preferences={data.learnedPreferences} />
          </div>
          
          <div className="pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            <h3 
              className="text-[11px] font-semibold uppercase mb-4"
              style={{ color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}
            >
              Adjust my learning
            </h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <RotateCcw size={16} />
                Reset my preferences
              </button>
              <button 
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <MessageSquare size={16} />
                Give feedback
              </button>
            </div>
          </div>
          
          <p className="text-xs pt-4" style={{ color: 'var(--text-tertiary)' }}>
            Your feedback stays private and is only used to personalize your experience.
          </p>
        </div>
      </div>
    </div>
  );
}
