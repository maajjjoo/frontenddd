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
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="border border-gray-200 rounded-2xl p-3 flex flex-col gap-2 bg-white focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
        <textarea
          className="w-full bg-transparent text-gray-800 text-sm resize-none focus:outline-none placeholder-gray-400 leading-relaxed"
          rows={2}
          placeholder="Type a prompt... (Enter to send, Shift+Enter for new line)"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          disabled={isBlocked || isLoading}
        />
        <div className="flex items-center justify-between">
          <TokenEstimator prompt={prompt} />
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              canSend
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isBlocked ? `Wait ${retryAfter}s` : isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
