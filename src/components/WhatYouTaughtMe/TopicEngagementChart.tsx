// ABOUTME: Horizontal bar chart showing topic engagement percentages.
// ABOUTME: Displays which topics the user engages with most.

import { TopicEngagement } from '@/types';

interface TopicEngagementChartProps {
  data: TopicEngagement[];
}

export default function TopicEngagementChart({ data }: TopicEngagementChartProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
          Topics you engage with most
        </h3>
        <p className="text-xs text-slate-400">
          Based on cards you expanded, acted on, or marked helpful
        </p>
      </div>
      
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.topic} className="flex items-center gap-3">
            <div className="w-32 sm:w-40 text-sm text-slate-700 truncate shrink-0">
              {item.topic}
            </div>
            <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundColor: item.color 
                }}
              />
            </div>
            <div className="w-10 text-sm text-slate-500 text-right shrink-0">
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
