// ABOUTME: Modal for taking actions on insights (schedule meeting, draft email).
// ABOUTME: Shows pre-filled form fields based on the recommended action type.

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
        return <Calendar className="text-blue-600" size={24} />;
      case 'draft_email':
        return <Mail className="text-blue-600" size={24} />;
      case 'add_to_deck':
        return <FileText className="text-blue-600" size={24} />;
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4 text-center animate-scale-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            {action.type === 'schedule_meeting' && 'Meeting Scheduled!'}
            {action.type === 'draft_email' && 'Email Drafted!'}
            {action.type === 'add_to_deck' && 'Added to Deck!'}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            {getIcon()}
            <h2 className="text-lg font-semibold text-slate-800">{action.label}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {action.type === 'schedule_meeting' && (
            <>
              {action.prefill.attendees && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Attendees
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {action.prefill.attendees.map((attendee) => (
                      <span
                        key={attendee}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                      >
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {action.prefill.subject && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    defaultValue={action.prefill.subject}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              )}

              {action.prefill.agenda && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Agenda
                  </label>
                  <textarea
                    defaultValue={action.prefill.agenda}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>
              )}

              {action.prefill.suggestedTimes && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Suggested Times
                  </label>
                  <div className="space-y-2">
                    {action.prefill.suggestedTimes.map((time) => (
                      <label
                        key={time}
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          checked={selectedTime === time}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-slate-700">{time}</span>
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    defaultValue={action.prefill.to}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              )}

              {action.prefill.emailSubject && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    defaultValue={action.prefill.emailSubject}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              )}

              {action.prefill.body && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Body
                  </label>
                  <textarea
                    defaultValue={action.prefill.body}
                    rows={10}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-mono"
                  />
                </div>
              )}
            </>
          )}

          {action.type === 'add_to_deck' && (
            <div className="text-center py-8">
              <FileText size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">
                This would open your QBR deck with suggested updates pre-populated.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
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
