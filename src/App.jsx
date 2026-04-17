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

  const addMessage = (msg) => setMessages(prev => [...prev, msg]);

  const handleUpgraded = async () => {
    await refresh();
  };

  const handleUserChange = (e) => {
    const user = TEST_USERS.find(u => u.id === Number(e.target.value));
    if (user) {
      setActiveUser(user);
      setQuota(null);
      setMessages([]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">AI Platform</h1>
        <div className="flex items-center gap-3">
          <PlanBadge />
          <select
            value={activeUser.id}
            onChange={handleUserChange}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-5 overflow-y-auto hidden md:flex">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Quota</div>
            <QuotaBar />
          </div>
          <div>
            <RateLimitCounter plan={activeUser.plan} isBlocked={isBlocked} retryAfter={retryAfter} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Last 7 days</div>
            <UsageChart />
          </div>
        </aside>

        {/* Main chat */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow messages={messages} isLoading={false} />
          <ChatInput
            onNewMessage={addMessage}
            onQuotaExceeded={() => setShowUpgrade(true)}
            isBlocked={isBlocked}
            retryAfter={retryAfter}
            block={block}
            refreshQuota={refresh}
          />
        </main>
      </div>

      {showUpgrade && (
        <UpgradeModal
          onClose={() => setShowUpgrade(false)}
          onUpgraded={handleUpgraded}
        />
      )}
    </div>
  );
}
