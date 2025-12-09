// ABOUTME: Modal for taking actions on insights (schedule meeting, draft email).
// ABOUTME: Fluent Premium style with Microsoft blue accent buttons.

'use client';

import { useState } from 'react';
import { X, Check, Calendar, Mail, FileText } from 'lucide-react';
import { RecommendedAction } from '@/types';

interface ActionModalProps {
  action: RecommendedAction;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ActionModal({ action, onClose, onSubmit }: ActionModalProps) {
  const [selectedTime, setSelectedTime] = useState(action.prefill.suggestedTimes?.[0] || '');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onSubmit();
      onClose();
    }, 1500);
  };

  const getIcon = () => {
    switch (action.type) {
      case 'schedule_meeting':
        return <Calendar size={24} style={{ color: 'var(--accent)' }} />;
      case 'draft_email':
        return <Mail size={24} style={{ color: 'var(--accent)' }} />;
      case 'add_to_deck':
        return <FileText size={24} style={{ color: 'var(--accent)' }} />;
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
        <div 
          className="rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center animate-scale-in"
          style={{ background: 'var(--bg-card)' }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: '#f2f5f4' }}
          >
            <Check size={32} style={{ color: 'var(--informational)' }} />
          </div>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            {action.type === 'schedule_meeting' && 'Meeting Scheduled!'}
            {action.type === 'draft_email' && 'Email Drafted!'}
            {action.type === 'add_to_deck' && 'Added to Deck!'}
          </h3>
        </div>
      </div>
    );
  }

  const inputStyle = {
    border: '1px solid var(--border-strong)',
    background: 'var(--bg-card)',
    color: 'var(--text-body)',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className="rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in"
        style={{ background: 'var(--bg-card)' }}
      >
        <div 
          className="flex items-center justify-between p-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            {getIcon()}
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>{action.label}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {action.type === 'schedule_meeting' && (
            <>
              {action.prefill.attendees && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-body)' }}
                  >
                    Attendees
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {action.prefill.attendees.map((attendee) => (
                      <span
                        key={attendee}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{ background: 'var(--bg-elevated)', color: 'var(--text-body)' }}
                      >
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {action.prefill.subject && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-body)' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    defaultValue={action.prefill.subject}
                    className="w-full px-4 py-3 rounded text-sm outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  />
                </div>
              )}

              {action.prefill.agenda && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-body)' }}
                  >
                    Agenda
                  </label>
                  <textarea
                    defaultValue={action.prefill.agenda}
                    rows={4}
                    className="w-full px-4 py-3 rounded text-sm outline-none resize-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  />
                </div>
              )}

              {action.prefill.suggestedTimes && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-body)' }}
                  >
                    Suggested Times
                  </label>
                  <div className="space-y-2">
                    {action.prefill.suggestedTimes.map((time) => (
                      <label
                        key={time}
                        className="flex items-center gap-3 p-3 rounded cursor-pointer transition-colors"
                        style={selectedTime === time 
                          ? { border: '1px solid var(--accent)', background: 'var(--accent-light)' }
                          : { border: '1px solid var(--border)', background: 'transparent' }
                        }
                      >
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          checked={selectedTime === time}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                        <span className="text-sm" style={{ color: 'var(--text-body)' }}>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {action.type === 'draft_email' && (
            <>
              {action.prefill.to && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-body)' }}
                  >
                    To
                  </label>
                  <input
                    type="text"
                    defaultValue={action.prefill.to}
                    className="w-full px-4 py-3 rounded text-sm outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  />
                </div>
              )}

              {action.prefill.emailSubject && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-body)' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    defaultValue={action.prefill.emailSubject}
                    className="w-full px-4 py-3 rounded text-sm outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  />
                </div>
              )}

              {action.prefill.body && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-body)' }}
                  >
                    Body
                  </label>
                  <textarea
                    defaultValue={action.prefill.body}
                    rows={10}
                    className="w-full px-4 py-3 rounded text-sm outline-none resize-none font-mono transition-colors"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  />
                </div>
              )}
            </>
          )}

          {action.type === 'add_to_deck' && (
            <div className="text-center py-8">
              <FileText size={48} style={{ color: 'var(--border)' }} className="mx-auto mb-4" />
              <p style={{ color: 'var(--text-secondary)' }}>
                This would open your QBR deck with suggested updates pre-populated.
              </p>
            </div>
          )}
        </div>

        <div 
          className="flex justify-end gap-3 p-5"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded transition-colors"
            style={{ color: 'var(--text-body)', border: '1px solid var(--border-strong)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
              e.currentTarget.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 text-sm font-medium rounded-md transition-colors"
            style={{ background: 'var(--accent)', color: 'white' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            {action.type === 'schedule_meeting' && 'Schedule'}
            {action.type === 'draft_email' && 'Send Draft'}
            {action.type === 'add_to_deck' && 'Open Deck'}
            {action.type === 'investigate' && 'Investigate'}
          </button>
        </div>
      </div>
    </div>
  );
}
