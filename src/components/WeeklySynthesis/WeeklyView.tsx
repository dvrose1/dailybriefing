// ABOUTME: Main container for the Weekly Synthesis view.
// ABOUTME: Editorial style with warm colors and generous spacing.

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
        <h1 className="font-serif text-2xl sm:text-[28px]" style={{ color: 'var(--foreground)' }}>
          Week in Review
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{data.weekRange}</p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {data.themeCount} themes · {data.actionGapsCount} action gaps identified
        </p>
        <div className="mt-4" style={{ borderBottom: '1px solid var(--border)' }} />
      </header>

      <div className="space-y-0">
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
