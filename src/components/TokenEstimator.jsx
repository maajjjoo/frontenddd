import { estimate } from '../utils/tokenEstimator';

export default function TokenEstimator({ prompt }) {
  const tokens = estimate(prompt);
  if (!tokens) return null;
  return (
    <span className="text-xs text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
      ~{tokens} tokens
    </span>
  );
}
