// ABOUTME: Slide-out panel showing what the AI has learned from user feedback.
// ABOUTME: Contains topic engagement chart, patterns grid, and learned preferences.

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
      
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white shadow-xl animate-slide-in-right overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              What You've Taught Me
            </h2>
            <p className="text-sm text-slate-500">
              Your feedback shapes your briefings
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <TopicEngagementChart data={data.topicEngagement} />
          
          <div className="border-t border-slate-200 pt-6">
            <PatternsGrid patterns={data.patterns} />
          </div>
          
          <div className="border-t border-slate-200 pt-6">
            <LearnedPreferences preferences={data.learnedPreferences} />
          </div>
          
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Adjust my learning
            </h3>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <RotateCcw size={16} />
                Reset my preferences
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <MessageSquare size={16} />
                Give feedback
              </button>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 pt-4">
            Your feedback stays private and is only used to personalize your experience.
          </p>
        </div>
      </div>
    </div>
  );
}
