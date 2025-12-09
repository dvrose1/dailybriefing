// ABOUTME: Horizontal bar chart showing topic engagement percentages.
// ABOUTME: Editorial style with warm accent color for progress bars.

import { TopicEngagement } from '@/types';

interface TopicEngagementChartProps {
  data: TopicEngagement[];
}

export default function TopicEngagementChart({ data }: TopicEngagementChartProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 
          className="text-xs font-semibold uppercase tracking-wide mb-1"
          style={{ color: 'var(--text-secondary)', letterSpacing: '0.08em' }}
        >
          Topics you engage with most
        </h3>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Based on cards you expanded, acted on, or marked helpful
        </p>
      </div>
      
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.topic} className="flex items-center gap-3">
            <div 
              className="w-32 sm:w-40 text-sm truncate shrink-0"
              style={{ color: 'var(--text-body)' }}
            >
              {item.topic}
            </div>
            <div 
              className="flex-1 h-2 rounded overflow-hidden"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <div
                className="h-full rounded transition-all duration-500"
                style={{ 
                  width: `${item.percentage}%`,
                  background: 'var(--accent)'
                }}
              />
            </div>
            <div 
              className="w-10 text-sm text-right shrink-0"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
