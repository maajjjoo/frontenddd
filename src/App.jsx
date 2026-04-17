import { useState } from 'react';
import { useUser } from './context/UserContext';
import { useQuota } from './hooks/useQuota';
import { useRateLimit } from './hooks/useRateLimit';
import PlanBadge from './components/PlanBadge';
import QuotaBar from './components/QuotaBar';
import RateLimitCounter from './components/RateLimitCounter';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import UsageChart from './components/UsageChart';
import UpgradeModal from './components/UpgradeModal';

export default function App() {
  const { activeUser, setActiveUser, TEST_USERS, setQuota } = useUser();
  const { refresh } = useQuota();
  const { isBlocked, retryAfter, block } = useRateLimit();
  const [messages, setMessages] = useState([]);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (msg) => setMessages(prev => [...prev, msg]);

  const handleUserChange = (e) => {
    const user = TEST_USERS.find(u => u.id === Number(e.target.value));
    if (user) {
      setActiveUser(user);
      setQuota(null);
      setMessages([]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-dark-900 text-white overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/5 bg-dark-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
            AI
          </div>
          <span className="font-semibold text-white tracking-tight">AI Platform</span>
        </div>
        <div className="flex items-center gap-3">
          <PlanBadge />
          <select
            value={activeUser.id}
            onChange={handleUserChange}
            className="text-xs bg-dark-700 border border-white/10 text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {TEST_USERS.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="hidden md:flex w-60 flex-col gap-4 p-4 border-r border-white/5 bg-dark-800/50 overflow-y-auto flex-shrink-0">

          {/* Quota section */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quota</span>
            </div>
            <QuotaBar />
          </div>

          {/* Rate limit */}
          <RateLimitCounter plan={activeUser.plan} isBlocked={isBlocked} retryAfter={retryAfter} />

          {/* Usage chart */}
          <div className="glass rounded-xl p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              7-day usage
            </div>
            <UsageChart />
          </div>

          {/* User info */}
          <div className="mt-auto glass rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {activeUser.name[0]}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-gray-300 truncate">{activeUser.name}</div>
              <div className="text-xs text-gray-500">ID: {activeUser.id}</div>
            </div>
          </div>
        </aside>

        {/* Main chat */}
        <main className="flex-1 flex flex-col overflow-hidden bg-dark-900">
          {/* Subtle gradient top */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-950/20 to-transparent pointer-events-none" />

          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput
            onNewMessage={addMessage}
            onQuotaExceeded={() => setShowUpgrade(true)}
            isBlocked={isBlocked}
            retryAfter={retryAfter}
            block={block}
            refreshQuota={refresh}
            onLoadingChange={setIsLoading}
          />
        </main>
      </div>

      {showUpgrade && (
        <UpgradeModal
          onClose={() => setShowUpgrade(false)}
          onUpgraded={refresh}
        />
      )}
    </div>
  );
}
