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
    <div className="fixed inset-0 bg-pink-100/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md border border-pastel-rose/40 soft-shadow">
        <div className="text-center mb-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center text-3xl mx-auto mb-3 soft-shadow">
            🌸
          </div>
          <h2 className="text-lg font-bold text-soft-text">Monthly quota exhausted</h2>
          <p className="text-sm text-soft-muted mt-1">Upgrade your plan to keep generating</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-2xl p-4 bg-pastel-sky/40 border border-blue-200/60">
            <div className="text-xs font-semibold text-blue-500 mb-1">🚀 PRO</div>
            <div className="text-xs text-soft-muted">500,000 tokens/mo</div>
            <div className="text-xl font-bold text-soft-text mt-2">$9.99<span className="text-xs text-soft-muted font-normal">/mo</span></div>
          </div>
          <div className="rounded-2xl p-4 bg-pastel-lavender/40 border border-purple-200/60">
            <div className="text-xs font-semibold text-purple-500 mb-1">👑 ENTERPRISE</div>
            <div className="text-xs text-soft-muted">Unlimited tokens</div>
            <div className="text-xl font-bold text-soft-text mt-2">Custom</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-2xl py-2.5 text-sm font-semibold hover:from-pink-300 hover:to-rose-300 transition-all disabled:opacity-50 soft-shadow"
          >
            {loading ? 'Upgrading...' : '✦ Upgrade to Pro'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-pastel-pink/30 text-soft-muted rounded-2xl py-2.5 text-sm font-medium hover:bg-pastel-pink/50 transition-all border border-pastel-rose/30"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
