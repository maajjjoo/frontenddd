import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const PLAN_COLORS = {
  FREE:       { bg: 'bg-gray-100',   text: 'text-gray-600',   border: 'border-gray-200',   dot: 'bg-gray-400'   },
  PRO:        { bg: 'bg-indigo-50',  text: 'text-indigo-700', border: 'border-indigo-100', dot: 'bg-indigo-500' },
  ENTERPRISE: { bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-100',  dot: 'bg-amber-500'  },
};

const PLAN_PERKS = {
  FREE:       ['10 requests / minute', '50,000 tokens / month', 'Standard response speed'],
  PRO:        ['60 requests / minute', '500,000 tokens / month', 'Priority response speed'],
  ENTERPRISE: ['Unlimited requests', 'Unlimited tokens', 'Dedicated infrastructure'],
};

export default function UserCard() {
  const { activeUser, quota } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const plan = quota?.plan ?? activeUser.plan;
  const colors = PLAN_COLORS[plan] ?? PLAN_COLORS.FREE;
  const perks = PLAN_PERKS[plan] ?? PLAN_PERKS.FREE;
  const resetDate = quota?.resetDate ?? '—';

  return (
    <div className="relative mt-auto" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full rounded-xl p-3 bg-[#f4f6fb] border border-[#e0e4ee] flex items-center gap-2.5 hover:bg-[#eceef5] transition-colors text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-sm">
          {activeUser.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-gray-800 truncate">{activeUser.name}</p>
          <p className="text-[10px] text-gray-400">User ID #{activeUser.id}</p>
        </div>
        <svg className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#e8eaf0] rounded-2xl shadow-xl z-20 overflow-hidden"
          style={{boxShadow:'0 8px 32px rgba(0,0,0,0.12)'}}>

          {/* Top banner */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold text-white shadow-inner">
                {activeUser.name[0]}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{activeUser.name}</p>
                <p className="text-indigo-200 text-xs">ID #{activeUser.id}</p>
              </div>
              <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
                {plan}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-4">

            {/* Plan perks */}
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Plan includes</p>
              <div className="space-y-1.5">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                    <span className="text-xs text-gray-600">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing cycle */}
            <div className="rounded-xl bg-[#f4f6fb] border border-[#e0e4ee] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Billing cycle</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">Monthly</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Next reset</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{resetDate}</p>
                </div>
              </div>
            </div>

            {/* Upgrade hint for FREE/PRO */}
            {plan !== 'ENTERPRISE' && (
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-indigo-700">
                    {plan === 'FREE' ? 'Upgrade to Pro' : 'Upgrade to Enterprise'}
                  </p>
                  <p className="text-[10px] text-indigo-400 truncate">
                    {plan === 'FREE' ? 'Get 50× more tokens per month' : 'Unlimited tokens & requests'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
