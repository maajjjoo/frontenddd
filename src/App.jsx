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
import UserCard from './components/UserCard';
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
    if (user) { setActiveUser(user); setQuota(null); setMessages([]); }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f9f9fb]">

      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm">AI Platform</span>
        </div>
        <div className="flex items-center gap-3">
          <PlanBadge />
          <select
            value={activeUser.id}
            onChange={handleUserChange}
            className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
          >
            {TEST_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="hidden md:flex w-60 flex-col gap-3 p-4 overflow-y-auto flex-shrink-0 bg-white border-r border-gray-100">

          <div className="rounded-xl p-4 bg-gray-50 border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quota</p>
            <QuotaBar />
          </div>

          <RateLimitCounter plan={activeUser.plan} isBlocked={isBlocked} retryAfter={retryAfter} />

          <div className="rounded-xl p-4 bg-gray-50 border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Usage — 7 days</p>
            <UsageChart />
          </div>

          <UserCard />
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

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onUpgraded={refresh} />}
    </div>
  );
}
