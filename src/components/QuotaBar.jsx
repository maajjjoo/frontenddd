import { useUser } from '../context/UserContext';

export default function QuotaBar() {
  const { quota } = useUser();

  if (!quota) return (
    <div className="space-y-2 animate-pulse">
      <div className="h-2 bg-pastel-pink rounded-full w-3/4" />
      <div className="h-1.5 bg-pastel-pink rounded-full" />
    </div>
  );

  const total = quota.tokensUsed + quota.tokensRemaining;
  const pct = total > 0 ? Math.min(100, (quota.tokensUsed / total) * 100) : 0;
  const barColor = pct < 70
    ? 'from-pastel-mint to-emerald-300'
    : pct < 90
    ? 'from-pastel-yellow to-amber-300'
    : 'from-pastel-rose to-red-300';

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-soft-muted">
        <span>{quota.tokensUsed.toLocaleString()} used</span>
        <span>{total.toLocaleString()} total</span>
      </div>
      <div className="w-full bg-pastel-pink/50 rounded-full h-2 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${barColor} h-2 rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-soft-muted">
        <span>{pct.toFixed(1)}%</span>
        <span>Resets {quota.resetDate ?? '—'}</span>
      </div>
    </div>
  );
}
