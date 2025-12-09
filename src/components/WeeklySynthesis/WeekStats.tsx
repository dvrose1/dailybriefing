// ABOUTME: Footer stats for the weekly synthesis view.
// ABOUTME: Fluent Premium style with accent color highlights.

import { TrendingUp, TrendingDown } from 'lucide-react';
import { WeeklyStats } from '@/types';

interface WeekStatsProps {
  stats: WeeklyStats;
}

export default function WeekStats({ stats }: WeekStatsProps) {
  const isPositiveChange = stats.engagementChange >= 0;

  return (
    <div 
      className="text-sm pt-4"
      style={{ borderTop: '1px solid var(--border)', color: 'var(--text-tertiary)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span>
          This week: {stats.insightsSurfaced} insights surfaced · {stats.actionsTaken} actions taken · {stats.dismissed} dismissed
        </span>
        <span className="flex items-center gap-1">
          Your engagement: {stats.engagementRate}%
          <span 
            className="flex items-center gap-0.5"
            style={{ color: isPositiveChange ? '#107c10' : 'var(--urgent)' }}
          >
            {isPositiveChange ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {isPositiveChange ? '↑' : '↓'} {Math.abs(stats.engagementChange)}% vs last week
          </span>
        </span>
      </div>
    </div>
  );
}
