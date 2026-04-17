const PLAN_MAX = { FREE: 10, PRO: 60, ENTERPRISE: '∞' };

export default function RateLimitCounter({ plan, isBlocked, retryAfter }) {
  const max = PLAN_MAX[plan] ?? 10;
  return (
    <div className={`rounded-xl p-3 text-xs border transition-all ${
      isBlocked ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Rate Limit</span>
        <span className="text-gray-600 font-medium">{max} req/min</span>
      </div>
      {isBlocked
        ? <div className="text-red-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping inline-block" />
            Blocked — retry in {retryAfter}s
          </div>
        : <div className="text-gray-400">No active block</div>
      }
    </div>
  );
}
