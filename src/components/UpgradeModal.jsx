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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Monthly quota exhausted</h2>
        <p className="text-sm text-gray-500 mb-4">Upgrade your plan to keep generating.</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="border border-blue-200 rounded-xl p-3">
            <div className="text-sm font-semibold text-blue-700">PRO</div>
            <div className="text-xs text-gray-500 mt-1">500,000 tokens/mo</div>
            <div className="text-sm font-bold text-gray-800 mt-2">$9.99/mo</div>
          </div>
          <div className="border border-purple-200 rounded-xl p-3">
            <div className="text-sm font-semibold text-purple-700">ENTERPRISE</div>
            <div className="text-xs text-gray-500 mt-1">Unlimited tokens</div>
            <div className="text-sm font-bold text-gray-800 mt-2">Contact us</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="flex-1 bg-blue-500 text-white rounded-xl py-2 text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Upgrading...' : 'Upgrade to Pro'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-600 rounded-xl py-2 text-sm font-medium hover:bg-gray-200"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
