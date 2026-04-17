import { estimate } from '../utils/tokenEstimator';

export default function TokenEstimator({ prompt }) {
  const tokens = estimate(prompt);
  if (!tokens) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-pink-400 bg-pastel-pink/60 px-2.5 py-0.5 rounded-full border border-pastel-rose/50">
      ✦ ~{tokens} tokens
    </span>
  );
}
