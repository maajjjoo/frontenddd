const PLAN_MAX = { FREE: 10, PRO: 60, ENTERPRISE: '∞' };

export default function RateLimitCounter({ plan, isBlocked, retryAfter }) {
  const max = PLAN_MAX[plan] ?? 10;

  return (
    <div className={`rounded-lg p-3 text-xs ${isBlocked ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
      <div className="font-semibold text-gray-600 mb-1">Rate Limit</div>
      {isBlocked ? (
        <div className="text-red-600 font-medium">Blocked — retry in {retryAfter}s</div>
      ) : (
        <div className="text-gray-500">Max {max} req/min</div>
      )}
    </div>
  );
}
