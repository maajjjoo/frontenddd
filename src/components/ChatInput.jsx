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
    setIsLoading(true);
    onLoadingChange?.(true);
    try {
      const response = await generateText(activeUser.id, text);
      onNewMessage({ id: Date.now() + 1, role: 'ai', text: response.text, timestamp: new Date() });
      await refreshQuota();
    } catch (err) {
      const status = err.response?.status;
      if (status === 429) {
        block(err.response.data?.retryAfterSeconds ?? 60);
      } else if (status === 402) {
        onQuotaExceeded();
      } else {
        onNewMessage({ id: Date.now() + 1, role: 'ai', text: '⚠️ ' + (err.message ?? 'Unknown error'), timestamp: new Date() });
      }
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-pastel-pink/40 bg-white/60 backdrop-blur-sm">
      <div className="bg-white border border-pastel-rose/40 rounded-2xl p-3 flex flex-col gap-2 soft-shadow focus-within:border-pink-300 transition-all">
        <textarea
          className="w-full bg-transparent text-soft-text text-sm resize-none focus:outline-none placeholder-soft-muted leading-relaxed"
          rows={2}
          placeholder="Type a prompt... (Enter to send)"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isBlocked || isLoading}
        />
        <div className="flex items-center justify-between">
          <TokenEstimator prompt={prompt} />
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              canSend
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:from-pink-300 hover:to-rose-300 soft-shadow'
                : 'bg-pastel-pink/40 text-soft-muted cursor-not-allowed'
            }`}
          >
            {isBlocked ? `⏳ ${retryAfter}s` : isLoading ? (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-300 dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-300 dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-300 dot-3" />
              </span>
            ) : 'Send ✦'}
          </button>
        </div>
      </div>
    </div>
  );
}
