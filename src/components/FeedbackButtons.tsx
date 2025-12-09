// ABOUTME: Feedback buttons for insight cards (helpful/not relevant/dismiss).
// ABOUTME: Text-based editorial style with subtle hover states.

'use client';

import { useState } from 'react';

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

  const buttonBaseStyle = {
    color: 'var(--text-tertiary)',
    border: '1px solid transparent',
    background: 'transparent',
  };

  const buttonHoverStyle = {
    color: 'var(--text-secondary)',
    borderColor: 'var(--border)',
    background: 'var(--bg-elevated)',
  };

  const buttonSelectedStyle = {
    color: 'var(--accent)',
    borderColor: 'var(--accent)',
    background: 'var(--accent-light)',
  };

  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 mt-5"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-1 relative">
        <button
          onClick={handleHelpful}
          className="text-xs px-3 py-1.5 rounded transition-all"
          style={feedback === 'up' ? buttonSelectedStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (feedback !== 'up') {
              Object.assign(e.currentTarget.style, buttonHoverStyle);
            }
          }}
          onMouseLeave={(e) => {
            if (feedback !== 'up') {
              Object.assign(e.currentTarget.style, buttonBaseStyle);
            }
          }}
        >
          Helpful
        </button>
        <button
          onClick={handleNotRelevant}
          className="text-xs px-3 py-1.5 rounded transition-all"
          style={feedback === 'down' ? buttonSelectedStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (feedback !== 'down') {
              Object.assign(e.currentTarget.style, buttonHoverStyle);
            }
          }}
          onMouseLeave={(e) => {
            if (feedback !== 'down') {
              Object.assign(e.currentTarget.style, buttonBaseStyle);
            }
          }}
        >
          Not relevant
        </button>
        {showDownDropdown && (
          <div 
            className="absolute left-0 top-full mt-1 rounded shadow-lg py-1 z-10 min-w-[160px]"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <p 
              className="px-3 py-1 text-xs font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              What was wrong?
            </p>
            {NOT_RELEVANT_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => handleReasonSelect(reason)}
                className="w-full text-left px-3 py-1.5 text-sm transition-colors"
                style={{ color: 'var(--text-body)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {reason}
              </button>
            ))}
          </div>
        )}
        {showThankYou && (
          <span className="text-xs ml-2" style={{ color: 'var(--text-secondary)' }}>
            Thanks! This helps me learn.
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onWatch}
          className="text-xs px-3 py-1.5 rounded transition-all"
          style={buttonBaseStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonBaseStyle)}
        >
          Watch topic
        </button>
        <button
          onClick={onDismiss}
          className="text-xs px-3 py-1.5 rounded transition-all"
          style={buttonBaseStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonBaseStyle)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
