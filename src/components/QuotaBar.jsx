import { useUser } from '../context/UserContext';

export default function QuotaBar() {
  const { quota } = useUser();

  if (!quota) return (
    <div className="space-y-2 animate-pulse">
      <div className="h-1.5 bg-gray-200 rounded-full w-2/3" />
      <div className="h-1.5 bg-gray-200 rounded-full" />
    </div>
  );

  const used = quota.tokensUsed ?? 0;
  const rem  = quota.tokensRemaining ?? 0;
  const total = used + rem;
  const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0;
  const barColor = pct < 70 ? 'bg-emerald-400' : pct < 90 ? 'bg-amber-400' : 'bg-red-400';

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{used.toLocaleString()} used</span>
        <span>{total.toLocaleString()} total</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div className={`${barColor} h-1.5 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{pct.toFixed(1)}%</span>
        <span>Resets {quota.resetDate ?? '—'}</span>
      </div>
    </div>
  );
}
