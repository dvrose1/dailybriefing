// ABOUTME: Feedback buttons for insight cards (thumbs up/down, dismiss).
// ABOUTME: Provides visual feedback states and handles user interactions.

'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, X, Eye } from 'lucide-react';

interface FeedbackButtonsProps {
  onThumbsUp: () => void;
  onThumbsDown: (reason?: string) => void;
  onDismiss: () => void;
  onWatch: () => void;
}

const THUMBS_DOWN_REASONS = [
  'Not relevant to me',
  'Not accurate',
  'Already knew this',
  'Other',
];

export default function FeedbackButtons({
  onThumbsUp,
  onThumbsDown,
  onDismiss,
  onWatch,
}: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showDownDropdown, setShowDownDropdown] = useState(false);

  const handleThumbsUp = () => {
    setFeedback('up');
    setShowThankYou(true);
    setShowDownDropdown(false);
    onThumbsUp();
    setTimeout(() => setShowThankYou(false), 2000);
  };

  const handleThumbsDown = () => {
    setFeedback('down');
    setShowDownDropdown(true);
  };

  const handleReasonSelect = (reason: string) => {
    setShowDownDropdown(false);
    setShowThankYou(true);
    onThumbsDown(reason);
    setTimeout(() => setShowThankYou(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-slate-100">
      <div className="flex items-center gap-2 relative">
        <button
          onClick={handleThumbsUp}
          className={`p-2 rounded-lg transition-colors ${
            feedback === 'up'
              ? 'bg-green-100 text-green-600'
              : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
          }`}
          title="Helpful"
        >
          <ThumbsUp size={18} />
        </button>
        <button
          onClick={handleThumbsDown}
          className={`p-2 rounded-lg transition-colors ${
            feedback === 'down'
              ? 'bg-red-100 text-red-600'
              : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
          }`}
          title="Not helpful"
        >
          <ThumbsDown size={18} />
        </button>
        {showDownDropdown && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 min-w-[160px]">
            <p className="px-3 py-1 text-xs text-slate-500 font-medium">What was wrong?</p>
            {THUMBS_DOWN_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => handleReasonSelect(reason)}
                className="w-full text-left px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                {reason}
              </button>
            ))}
          </div>
        )}
        {showThankYou && (
          <span className="text-xs text-slate-500 ml-2">
            Thanks! This helps me learn.
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onWatch}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Eye size={14} />
          <span className="hidden sm:inline">Watch topic</span>
          <span className="sm:hidden">Watch</span>
        </button>
        <button
          onClick={onDismiss}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X size={14} />
          Dismiss
        </button>
      </div>
    </div>
  );
}
