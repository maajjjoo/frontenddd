import { estimate } from '../utils/tokenEstimator';

export default function TokenEstimator({ prompt }) {
  const tokens = estimate(prompt);
  if (!tokens) return null;
  return (
    <span className="text-xs text-gray-400">~{tokens} tokens</span>
  );
}
