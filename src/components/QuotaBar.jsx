import { useUser } from '../context/UserContext';

export default function QuotaBar() {
  const { quota } = useUser();

  if (!quota) return <div className="text-xs text-gray-400">Loading quota...</div>;

  const total = quota.tokensUsed + quota.tokensRemaining;
  const pct = total > 0 ? Math.min(100, (quota.tokensUsed / total) * 100) : 0;

  const barColor = pct < 70 ? 'bg-green-500' : pct < 90 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{quota.tokensUsed.toLocaleString()} used</span>
        <span>{total.toLocaleString()} total</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${barColor} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-gray-400">Resets {quota.resetDate ?? 'N/A'}</div>
    </div>
  );
}
