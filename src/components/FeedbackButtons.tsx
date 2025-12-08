// ABOUTME: Feedback buttons for insight cards (thumbs up/down, dismiss).
// ABOUTME: Provides visual feedback states and handles user interactions.

'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, X, Eye } from 'lucide-react';

interface FeedbackButtonsProps {
  onThumbsUp: () => void;
  onThumbsDown: () => void;
  onDismiss: () => void;
  onWatch: () => void;
}

export default function FeedbackButtons({
  onThumbsUp,
  onThumbsDown,
  onDismiss,
  onWatch,
}: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleThumbsUp = () => {
    setFeedback('up');
    setShowThankYou(true);
    onThumbsUp();
    setTimeout(() => setShowThankYou(false), 2000);
  };

  const handleThumbsDown = () => {
    setFeedback('down');
    setShowThankYou(true);
    onThumbsDown();
    setTimeout(() => setShowThankYou(false), 2000);
  };

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
      <div className="flex items-center gap-2">
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
        {showThankYou && (
          <span className="text-xs text-slate-500 ml-2">
            Thanks! This helps me learn.
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onWatch}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Eye size={14} />
          Watch topic
        </button>
        <button
          onClick={onDismiss}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X size={14} />
          Dismiss
        </button>
      </div>
    </div>
  );
}
