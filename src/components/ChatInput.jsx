import { useState } from 'react';
import { generateText } from '../api/api';
import { useUser } from '../context/UserContext';
import TokenEstimator from './TokenEstimator';

export default function ChatInput({ onNewMessage, onQuotaExceeded, isBlocked, retryAfter, block, refreshQuota }) {
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
        onNewMessage({ id: Date.now() + 1, role: 'ai', text: 'Error: ' + (err.message ?? 'Unknown error'), timestamp: new Date() });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <textarea
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            placeholder="Type a prompt... (Enter to send)"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isBlocked || isLoading}
          />
          <div className="mt-1 ml-1">
            <TokenEstimator prompt={prompt} />
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            canSend
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isBlocked ? `Wait ${retryAfter}s` : isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
