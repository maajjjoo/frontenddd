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
    <div className="h-screen flex flex-col overflow-hidden bg-[#f4f6fb]">

      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-white border-b border-[#e8eaf0]" style={{boxShadow:'0 1px 0 #e8eaf0'}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-none">AI Platform</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Proxy Pattern Demo</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PlanBadge />
          <select
            value={activeUser.id}
            onChange={handleUserChange}
            className="text-xs bg-[#f4f6fb] border border-[#e0e4ee] text-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer font-medium"
          >
            {TEST_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col gap-3 p-4 overflow-y-auto flex-shrink-0 bg-white border-r border-[#e8eaf0]">

          {/* Quota */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quota</p>
            </div>
            <QuotaBar />
          </div>

          {/* Rate limit */}
          <RateLimitCounter plan={activeUser.plan} isBlocked={isBlocked} retryAfter={retryAfter} />

          {/* Chart */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">7-day usage</p>
            </div>
            <UsageChart />
          </div>

          <UserCard />
        </aside>

        {/* Chat */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#f4f6fb]">
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
