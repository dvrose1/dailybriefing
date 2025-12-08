// ABOUTME: Bullet list of learned user preferences.
// ABOUTME: Shows what the AI has learned about the user's behavior.

interface LearnedPreferencesProps {
  preferences: string[];
}

export default function LearnedPreferences({ preferences }: LearnedPreferencesProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
        What I've learned
      </h3>
      
      <ul className="space-y-2">
        {preferences.map((pref, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>{pref}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
