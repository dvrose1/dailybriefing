// ABOUTME: Toast notification for dismissing insights with undo option.
// ABOUTME: Shows briefly after dismissal and allows reverting the action.

'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number;
}

export default function UndoToast({
  message,
  onUndo,
  onClose,
  duration = 5000,
}: UndoToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 animate-slide-up">
      <span className="text-sm">{message}</span>
      <button
        onClick={onUndo}
        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        Undo
      </button>
      <button
        onClick={onClose}
        className="p-1 hover:bg-slate-700 rounded transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
