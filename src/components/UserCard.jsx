import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const PLAN_STYLES = {
  FREE:       'bg-gray-100 text-gray-600 border border-gray-200',
  PRO:        'bg-indigo-50 text-indigo-700 border border-indigo-100',
  ENTERPRISE: 'bg-amber-50 text-amber-700 border border-amber-100',
};
const PLAN_ICONS = { FREE: '⚡', PRO: '🚀', ENTERPRISE: '👑' };

export default function UserCard() {
  const { activeUser, quota } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const plan = quota?.plan ?? activeUser.plan;
  const used = quota?.tokensUsed ?? 0;
  const remaining = quota?.tokensRemaining ?? '—';
  const total = typeof remaining === 'number' ? used + remaining : null;
  const pct = total ? Math.min(100, (used / total) * 100) : 0;
  const barColor = pct < 70 ? 'bg-emerald-400' : pct < 90 ? 'bg-amber-400' : 'bg-red-400';

  return (
    <div className="relative mt-auto" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full rounded-xl p-3 bg-gray-50 border border-gray-100 flex items-center gap-2.5 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">
          {activeUser.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-gray-800 truncate">{activeUser.name}</p>
          <p className="text-xs text-gray-400">ID: {activeUser.id}</p>
        </div>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-100 rounded-2xl shadow-lg p-4 z-10">

          {/* Plan badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500">Current plan</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 ${PLAN_STYLES[plan] ?? PLAN_STYLES.FREE}`}>
              {PLAN_ICONS[plan]} {plan}
            </span>
          </div>

          {/* Token info */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Tokens used</span>
              <span className="font-medium text-gray-700">{used.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Remaining</span>
              <span className="font-medium text-gray-700">
                {typeof remaining === 'number' ? remaining.toLocaleString() : '∞'}
              </span>
            </div>

            {total && (
              <>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-1">
                  <div className={`${barColor} h-1.5 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-400 text-right">{pct.toFixed(1)}% used</p>
              </>
            )}

            {quota?.resetDate && (
              <div className="flex justify-between text-xs text-gray-400 pt-1 border-t border-gray-50">
                <span>Resets on</span>
                <span>{quota.resetDate}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
