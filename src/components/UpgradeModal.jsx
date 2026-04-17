import { useState } from 'react';
import { upgradePlan } from '../api/api';
import { useUser } from '../context/UserContext';

export default function UpgradeModal({ onClose, onUpgraded }) {
  const { activeUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await upgradePlan(activeUser.id);
      onUpgraded();
      onClose();
    } catch (err) {
      console.error('Upgrade failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-6 w-full max-w-md border border-white/10">
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl mx-auto mb-3">
            🔒
          </div>
          <h2 className="text-lg font-bold text-white">Monthly quota exhausted</h2>
          <p className="text-sm text-gray-400 mt-1">Upgrade your plan to keep generating</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl p-4 bg-indigo-500/10 border border-indigo-500/30">
            <div className="text-xs font-semibold text-indigo-300 mb-1">🚀 PRO</div>
            <div className="text-xs text-gray-400">500,000 tokens/mo</div>
            <div className="text-lg font-bold text-white mt-2">$9.99<span className="text-xs text-gray-400">/mo</span></div>
          </div>
          <div className="rounded-xl p-4 bg-purple-500/10 border border-purple-500/30">
            <div className="text-xs font-semibold text-purple-300 mb-1">👑 ENTERPRISE</div>
            <div className="text-xs text-gray-400">Unlimited tokens</div>
            <div className="text-lg font-bold text-white mt-2">Custom</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl py-2.5 text-sm font-semibold hover:from-indigo-500 hover:to-indigo-400 transition-all disabled:opacity-50 glow-blue"
          >
            {loading ? 'Upgrading...' : 'Upgrade to Pro'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white/5 text-gray-400 rounded-xl py-2.5 text-sm font-medium hover:bg-white/10 transition-all border border-white/5"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
