// ABOUTME: Main container for the Weekly Synthesis view.
// ABOUTME: Fluent Premium style with semibold headers and card layout.

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
    <div className="space-y-5">
      <header className="mb-5">
        <h1 className="text-[28px] font-semibold" style={{ color: 'var(--foreground)' }}>
          Week in Review
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{data.weekRange}</p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {data.themeCount} themes · {data.actionGapsCount} action gaps identified
        </p>
      </header>

      <div className="space-y-3">
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
