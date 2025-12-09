// ABOUTME: Bullet list of learned user preferences.
// ABOUTME: Fluent Premium style with accent color bullets.

interface LearnedPreferencesProps {
  preferences: string[];
}

export default function LearnedPreferences({ preferences }: LearnedPreferencesProps) {
  return (
    <div>
      <h3 
        className="text-[11px] font-semibold uppercase mb-4"
        style={{ color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}
      >
        What I've learned
      </h3>
      
      <ul className="space-y-2.5">
        {preferences.map((pref, idx) => (
          <li 
            key={idx} 
            className="flex items-start gap-2 text-[13px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="mt-0.5" style={{ color: 'var(--accent)' }}>•</span>
            <span>{pref}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
