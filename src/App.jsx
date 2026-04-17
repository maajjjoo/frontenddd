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
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf6f9 0%, #f5eeff 50%, #fdf0f8 100%)' }}>

      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-3 bg-white/70 backdrop-blur-sm border-b border-pastel-pink/40 soft-shadow">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center text-lg soft-shadow">
            🌸
          </div>
          <div>
            <span className="font-bold text-soft-text tracking-tight">AI Platform</span>
            <span className="text-xs text-soft-muted ml-2">Proxy Pattern Demo</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PlanBadge />
          <select
            value={activeUser.id}
            onChange={handleUserChange}
            className="text-xs bg-white border border-pastel-rose/50 text-soft-text rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-200 cursor-pointer soft-shadow"
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
        <aside className="hidden md:flex w-64 flex-col gap-4 p-4 border-r border-pastel-pink/30 bg-white/40 backdrop-blur-sm overflow-y-auto flex-shrink-0">

          {/* Quota */}
          <div className="soft-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">🍬</span>
              <span className="text-xs font-semibold text-soft-text uppercase tracking-wider">Quota</span>
            </div>
            <QuotaBar />
          </div>

          {/* Rate limit */}
          <RateLimitCounter plan={activeUser.plan} isBlocked={isBlocked} retryAfter={retryAfter} />

          {/* Chart */}
          <div className="soft-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">📊</span>
              <span className="text-xs font-semibold text-soft-text uppercase tracking-wider">7-day usage</span>
            </div>
            <UsageChart />
          </div>

          {/* User card */}
          <div className="mt-auto soft-card rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center text-sm font-bold text-pink-600 flex-shrink-0 soft-shadow">
              {activeUser.name[0]}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-soft-text truncate">{activeUser.name}</div>
              <div className="text-xs text-soft-muted">User ID: {activeUser.id}</div>
            </div>
          </div>
        </aside>

        {/* Chat */}
        <main className="flex-1 flex flex-col overflow-hidden">
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
