// ABOUTME: Main container for the Weekly Synthesis view.
// ABOUTME: Displays week header, theme cards, action gaps, and stats.

import { WeeklyData, ActionGap } from '@/types';
import ThemeCard from './ThemeCard';
import ActionGapsCallout from './ActionGapsCallout';
import WeekStats from './WeekStats';

interface WeeklyViewProps {
  data: WeeklyData;
  onActionGap?: (gap: ActionGap) => void;
}

export default function WeeklyView({ data, onActionGap }: WeeklyViewProps) {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Week in Review
        </h1>
        <p className="text-sm text-slate-500 mt-1">{data.weekRange}</p>
        <p className="text-sm text-slate-500">
          {data.themeCount} themes · {data.actionGapsCount} action gaps identified
        </p>
        <div className="mt-4 border-b border-slate-200" />
      </header>

      <div className="space-y-4">
        {data.themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>

      {data.actionGaps.length > 0 && (
        <ActionGapsCallout gaps={data.actionGaps} onAction={onActionGap} />
      )}

      <WeekStats stats={data.stats} />
    </div>
  );
}
