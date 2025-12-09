// ABOUTME: Feedback buttons for insight cards (thumbs up/down, dismiss).
// ABOUTME: Fluent Premium icon button style with hover states.

'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, X, Eye } from 'lucide-react';

interface FeedbackButtonsProps {
  onThumbsUp: () => void;
  onThumbsDown: (reason?: string) => void;
  onDismiss: () => void;
  onWatch: () => void;
}

const NOT_RELEVANT_REASONS = [
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

  const handleHelpful = () => {
    setFeedback('up');
    setShowThankYou(true);
    setShowDownDropdown(false);
    onThumbsUp();
    setTimeout(() => setShowThankYou(false), 2000);
  };

  const handleNotRelevant = () => {
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
    <div 
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 mt-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-1 relative">
        <button
          onClick={handleHelpful}
          className="p-2 rounded-md transition-all"
          style={feedback === 'up' 
            ? { background: 'var(--accent-light)', color: 'var(--accent)' }
            : { background: 'transparent', color: 'var(--text-tertiary)' }
          }
          onMouseEnter={(e) => {
            if (feedback !== 'up') {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }
          }}
          onMouseLeave={(e) => {
            if (feedback !== 'up') {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }
          }}
          title="Helpful"
        >
          <ThumbsUp size={16} />
        </button>
        <button
          onClick={handleNotRelevant}
          className="p-2 rounded-md transition-all"
          style={feedback === 'down' 
            ? { background: 'var(--accent-light)', color: 'var(--accent)' }
            : { background: 'transparent', color: 'var(--text-tertiary)' }
          }
          onMouseEnter={(e) => {
            if (feedback !== 'down') {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }
          }}
          onMouseLeave={(e) => {
            if (feedback !== 'down') {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }
          }}
          title="Not helpful"
        >
          <ThumbsDown size={16} />
        </button>
        {showDownDropdown && (
          <div 
            className="absolute left-0 top-full mt-1 rounded-md py-1 z-10 min-w-[160px]"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
          >
            <p 
              className="px-3 py-1 text-xs font-medium"
              style={{ color: 'var(--text-tertiary)' }}
            >
              What was wrong?
            </p>
            {NOT_RELEVANT_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => handleReasonSelect(reason)}
                className="w-full text-left px-3 py-1.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {reason}
              </button>
            ))}
          </div>
        )}
        {showThankYou && (
          <span className="text-xs ml-2" style={{ color: 'var(--text-tertiary)' }}>
            Thanks! This helps me learn.
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onWatch}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all"
          style={{ background: 'transparent', color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-hover)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-tertiary)';
          }}
        >
          <Eye size={14} />
          Watch
        </button>
        <button
          onClick={onDismiss}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all"
          style={{ background: 'transparent', color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-hover)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-tertiary)';
          }}
        >
          <X size={14} />
          Dismiss
        </button>
      </div>
    </div>
  );
}
