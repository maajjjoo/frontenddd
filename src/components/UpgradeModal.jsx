import { useState } from 'react';
import { upgradePlan } from '../api/api';
import { useUser } from '../context/UserContext';

export default function UpgradeModal({ onClose, onUpgraded }) {
  const { activeUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try { await upgradePlan(activeUser.id); onUpgraded(); onClose(); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-100 shadow-xl">
        <div className="text-center mb-5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="text-base font-semibold text-gray-900">Monthly quota exhausted</h2>
          <p className="text-xs text-gray-400 mt-1">Upgrade your plan to continue generating</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-xl p-3 bg-indigo-50 border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700">🚀 PRO</p>
            <p className="text-xs text-gray-400 mt-0.5">500k tokens/mo</p>
            <p className="text-sm font-bold text-gray-900 mt-1.5">$9.99<span className="text-xs font-normal text-gray-400">/mo</span></p>
          </div>
          <div className="rounded-xl p-3 bg-amber-50 border border-amber-100">
            <p className="text-xs font-semibold text-amber-700">👑 ENTERPRISE</p>
            <p className="text-xs text-gray-400 mt-0.5">Unlimited</p>
            <p className="text-sm font-bold text-gray-900 mt-1.5">Custom</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleUpgrade} disabled={loading}
            className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-xs font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50">
            {loading ? 'Upgrading...' : 'Upgrade to Pro'}
          </button>
          <button onClick={onClose}
            className="flex-1 bg-gray-50 text-gray-500 rounded-xl py-2 text-xs font-medium hover:bg-gray-100 transition-all border border-gray-100">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
