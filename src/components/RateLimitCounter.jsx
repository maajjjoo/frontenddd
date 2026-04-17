const PLAN_MAX = { FREE: 10, PRO: 60, ENTERPRISE: '∞' };

export default function RateLimitCounter({ plan, isBlocked, retryAfter }) {
  const max = PLAN_MAX[plan] ?? 10;

  return (
    <div className={`rounded-xl p-3 text-xs transition-all ${
      isBlocked
        ? 'bg-red-500/10 border border-red-500/30'
        : 'bg-dark-600 border border-white/5'
    }`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-400 font-medium">Rate Limit</span>
        <span className={`font-semibold ${isBlocked ? 'text-red-400' : 'text-indigo-400'}`}>
          {max} req/min
        </span>
      </div>
      {isBlocked ? (
        <div className="flex items-center gap-1.5 text-red-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          Blocked — retry in {retryAfter}s
        </div>
      ) : (
        <div className="text-gray-500">No active block</div>
      )}
    </div>
  );
}
