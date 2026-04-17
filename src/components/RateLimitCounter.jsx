const PLAN_MAX = { FREE: 10, PRO: 60, ENTERPRISE: '∞' };

export default function RateLimitCounter({ plan, isBlocked, retryAfter }) {
  const max = PLAN_MAX[plan] ?? 10;
  return (
    <div className={`card p-3 transition-all ${isBlocked ? 'border-red-200 bg-red-50' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isBlocked ? 'bg-red-100' : 'bg-orange-100'}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isBlocked ? '#ef4444' : '#f97316'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rate Limit</p>
        <span className="ml-auto text-xs font-semibold text-gray-600">{max} req/min</span>
      </div>
      {isBlocked
        ? <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            Blocked — retry in {retryAfter}s
          </div>
        : <div className="text-xs text-gray-400">No active block</div>
      }
    </div>
  );
}
