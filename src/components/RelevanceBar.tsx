// ABOUTME: One-tap relevance feedback on delivered (routed) cards.
// ABOUTME: Writes to the store; feeds the send log and "What you've taught me".

'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { useStore } from '@/lib/store';

interface Props {
  deliveryId: string;
  onDismiss: () => void;
}

export default function RelevanceBar({ deliveryId, onDismiss }: Props) {
  const { deliveries, setRelevance } = useStore();
  const delivery = deliveries.find((d) => d.id === deliveryId);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const rating = delivery?.relevance;

  return (
    <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRelevance(deliveryId, 'useful', comment || undefined)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              rating === 'useful'
                ? 'bg-green-100 text-green-700'
                : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <ThumbsUp size={16} />
            Useful
          </button>
          <button
            onClick={() => {
              setRelevance(deliveryId, 'not_relevant', comment || undefined);
              setShowComment(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              rating === 'not_relevant'
                ? 'bg-red-100 text-red-700'
                : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <ThumbsDown size={16} />
            Not relevant
          </button>
        </div>
        <button
          onClick={onDismiss}
          className="flex items-center gap-1 px-2 py-1.5 text-sm text-slate-400 hover:text-slate-600"
        >
          <X size={14} />
          Dismiss
        </button>
      </div>

      {rating && (
        <div className="flex items-center gap-2">
          {!showComment && (
            <button
              onClick={() => setShowComment(true)}
              className="text-xs text-slate-400 hover:text-primary"
            >
              Add a comment
            </button>
          )}
          {showComment && (
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onBlur={() => setRelevance(deliveryId, rating, comment || undefined)}
              placeholder="Optional: tell the team why"
              className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}
          <span className="text-xs text-slate-400">Thanks, this trains the routing.</span>
        </div>
      )}
    </div>
  );
}
