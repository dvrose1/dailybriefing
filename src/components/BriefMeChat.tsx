// ABOUTME: Conversational chat interface for the Brief Me feature.
// ABOUTME: Fluent Premium style with Microsoft blue accent.

'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { BriefMeMessage } from '@/types';

interface BriefMeChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SUGGESTIONS = [
  'What should I prioritize?',
  'Tell me about Target',
  'Prep for Walmart QBR',
];

export default function BriefMeChat({ isOpen, onClose }: BriefMeChatProps) {
  const [messages, setMessages] = useState<BriefMeMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: BriefMeMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: BriefMeMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: BriefMeMessage = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className="rounded-lg shadow-xl w-full max-w-lg mx-4 h-[600px] max-h-[80vh] flex flex-col animate-scale-in"
        style={{ background: 'var(--bg-card)' }}
      >
        <div 
          className="flex items-center justify-between p-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <MessageSquare size={20} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Brief Me</h2>
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

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare size={48} style={{ color: 'var(--border)' }} className="mx-auto mb-4" />
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Ask me anything about your briefing
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="px-3 py-1.5 text-sm rounded-full transition-colors"
                    style={{ background: 'var(--bg-elevated)', color: 'var(--text-body)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'user' ? (
                <div
                  className="max-w-[80%] px-4 py-3 rounded-xl"
                  style={{ 
                    background: 'var(--bg-elevated)', 
                    color: 'var(--text-body)',
                    borderRadius: '12px 12px 4px 12px'
                  }}
                >
                  <p className="text-[14px]" style={{ lineHeight: '1.5' }}>{message.content}</p>
                </div>
              ) : (
                <div
                  className="max-w-[90%] py-3"
                  style={{ 
                    color: 'var(--text-body)',
                    borderBottom: '1px solid var(--border)'
                  }}
                >
                  <p className="text-[15px] whitespace-pre-wrap" style={{ lineHeight: '1.6' }}>{message.content}</p>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div 
                className="px-4 py-3 rounded-xl"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length > 0 && (
          <div className="px-5 pb-2">
            <div className="flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={isLoading}
                  className="px-3 py-1 text-xs rounded-full transition-colors disabled:opacity-50"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = 'var(--border)'; }}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <form 
          onSubmit={handleSubmit} 
          className="p-5"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg text-[15px] outline-none transition-colors"
              style={{ 
                border: '1px solid var(--border-strong)', 
                background: 'var(--bg-card)',
                color: 'var(--text-body)'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'var(--accent)', color: 'white' }}
              onMouseEnter={(e) => { if (input.trim() && !isLoading) e.currentTarget.style.background = 'var(--accent-hover)'; }}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
