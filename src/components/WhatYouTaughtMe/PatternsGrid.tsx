// ABOUTME: Grid displaying user briefing patterns.
// ABOUTME: Shows avg review time, most active day, and preferred actions.

import { LearningPatterns } from '@/types';

interface PatternsGridProps {
  patterns: LearningPatterns;
}

export default function PatternsGrid({ patterns }: PatternsGridProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Your briefing patterns
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Avg. Review Time</p>
          <p className="text-xl sm:text-2xl font-semibold text-slate-800">
            {patterns.avgReviewTime}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Most Active Day</p>
          <p className="text-xl sm:text-2xl font-semibold text-slate-800">
            {patterns.mostActiveDay}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Preferred Action</p>
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-tight">
            {patterns.preferredAction}
          </p>
        </div>
      </div>
    </div>
  );
}
