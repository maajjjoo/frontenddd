const PLAN_MAX = { FREE: 10, PRO: 60, ENTERPRISE: '∞' };

export default function RateLimitCounter({ plan, isBlocked, retryAfter }) {
  const max = PLAN_MAX[plan] ?? 10;

  return (
    <div className={`rounded-2xl p-3 text-xs transition-all ${
      isBlocked
        ? 'bg-red-50 border border-red-200'
        : 'bg-pastel-lavender/40 border border-pastel-purple/40'
    }`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-soft-text font-medium">Rate Limit</span>
        <span className="font-semibold text-purple-500">{max} req/min</span>
      </div>
      {isBlocked ? (
        <div className="flex items-center gap-1.5 text-red-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          Blocked — retry in {retryAfter}s
        </div>
      ) : (
        <div className="text-soft-muted">No active block ✓</div>
      )}
    </div>
  );
}
