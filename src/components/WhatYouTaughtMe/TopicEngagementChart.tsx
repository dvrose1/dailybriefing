// ABOUTME: Horizontal bar chart showing topic engagement percentages.
// ABOUTME: Fluent Premium style with Microsoft blue accent bars.

import { TopicEngagement } from '@/types';

interface TopicEngagementChartProps {
  data: TopicEngagement[];
}

export default function TopicEngagementChart({ data }: TopicEngagementChartProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 
          className="text-[11px] font-semibold uppercase mb-1"
          style={{ color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}
        >
          Topics you engage with most
        </h3>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Based on cards you expanded, acted on, or marked helpful
        </p>
      </div>
      
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.topic}>
            <div className="flex items-center justify-between mb-1.5">
              <span 
                className="text-[13px]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.topic}
              </span>
              <span 
                className="text-[13px]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.percentage}%
              </span>
            </div>
            <div 
              className="h-1.5 rounded-sm overflow-hidden"
              style={{ background: 'var(--bg-hover)' }}
            >
              <div
                className="h-full rounded-sm transition-all duration-500"
                style={{ 
                  width: `${item.percentage}%`,
                  background: 'var(--accent)'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
