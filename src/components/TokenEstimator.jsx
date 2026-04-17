import { estimate } from '../utils/tokenEstimator';

export default function TokenEstimator({ prompt }) {
  const tokens = estimate(prompt);
  if (!tokens) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-indigo-400/70 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
      <span className="w-1 h-1 rounded-full bg-indigo-400" />
      ~{tokens} tokens
    </span>
  );
}
