// ABOUTME: Footer stats for the weekly synthesis view.
// ABOUTME: Shows insights surfaced, actions taken, and engagement rate.

import { TrendingUp, TrendingDown } from 'lucide-react';
import { WeeklyStats } from '@/types';

interface WeekStatsProps {
  stats: WeeklyStats;
}

export default function WeekStats({ stats }: WeekStatsProps) {
  const isPositiveChange = stats.engagementChange >= 0;

  return (
    <div className="text-sm text-slate-500 pt-4 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span>
          This week: {stats.insightsSurfaced} insights surfaced · {stats.actionsTaken} actions taken · {stats.dismissed} dismissed
        </span>
        <span className="flex items-center gap-1">
          Your engagement: {stats.engagementRate}%
          <span className={`flex items-center gap-0.5 ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {isPositiveChange ? '↑' : '↓'} {Math.abs(stats.engagementChange)}% vs last week
          </span>
        </span>
      </div>
    </div>
  );
}
