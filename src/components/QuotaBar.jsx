import { useUser } from '../context/UserContext';

export default function QuotaBar() {
  const { quota } = useUser();

  if (!quota) return (
    <div className="space-y-2 animate-pulse">
      <div className="h-3 bg-dark-600 rounded-full w-3/4" />
      <div className="h-2 bg-dark-600 rounded-full" />
    </div>
  );

  const total = quota.tokensUsed + quota.tokensRemaining;
  const pct = total > 0 ? Math.min(100, (quota.tokensUsed / total) * 100) : 0;
  const barColor = pct < 70
    ? 'from-emerald-500 to-teal-400'
    : pct < 90
    ? 'from-amber-500 to-orange-400'
    : 'from-red-500 to-rose-400';

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">{quota.tokensUsed.toLocaleString()} used</span>
        <span className="text-gray-500">{total.toLocaleString()} total</span>
      </div>
      <div className="w-full bg-dark-600 rounded-full h-1.5 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${barColor} h-1.5 rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">{pct.toFixed(1)}% used</span>
        <span className="text-gray-500">Resets {quota.resetDate ?? '—'}</span>
      </div>
    </div>
  );
}
