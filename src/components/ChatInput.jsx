import { useState } from 'react';
import { generateText } from '../api/api';
import { useUser } from '../context/UserContext';
import TokenEstimator from './TokenEstimator';

export default function ChatInput({ onNewMessage, onQuotaExceeded, isBlocked, retryAfter, block, refreshQuota, onLoadingChange }) {
  const { activeUser } = useUser();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const canSend = !isBlocked && !isLoading && prompt.trim().length > 0;

  const handleSend = async () => {
    if (!canSend) return;
    const text = prompt.trim();
    setPrompt('');
    onNewMessage({ id: Date.now(), role: 'user', text, timestamp: new Date() });
    setIsLoading(true); onLoadingChange?.(true);
    try {
      const res = await generateText(activeUser.id, text);
      onNewMessage({ id: Date.now() + 1, role: 'ai', text: res.text, timestamp: new Date() });
      await refreshQuota();
    } catch (err) {
      const status = err.response?.status;
      if (status === 429) block(err.response.data?.retryAfterSeconds ?? 60);
      else if (status === 402) onQuotaExceeded();
      else onNewMessage({ id: Date.now() + 1, role: 'ai', text: '⚠️ ' + (err.message ?? 'Error'), timestamp: new Date() });
    } finally {
      setIsLoading(false); onLoadingChange?.(false);
    }
  };

  return (
    <div className="px-4 pb-4 pt-3 bg-[#f4f6fb]">
      <div className="bg-white border border-[#e0e4ee] rounded-2xl p-3 flex flex-col gap-2 focus-within:border-indigo-300 focus-within:ring-3 focus-within:ring-indigo-50 transition-all shadow-sm">
        <textarea
          className="w-full bg-transparent text-gray-800 text-sm resize-none focus:outline-none placeholder-gray-400 leading-relaxed"
          rows={2}
          placeholder="Type a prompt... (Enter to send, Shift+Enter for new line)"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          disabled={isBlocked || isLoading}
        />
        <div className="flex items-center justify-between pt-1 border-t border-[#f0f2f8]">
          <TokenEstimator prompt={prompt} />
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              canSend
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isBlocked ? `Wait ${retryAfter}s` : isLoading ? (
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 dot-3" />
              </span>
            ) : (
              <>
                Send
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
