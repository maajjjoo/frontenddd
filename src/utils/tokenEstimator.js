export function estimate(prompt) {
  if (!prompt || !prompt.trim()) return 0;
  const words = prompt.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words * 1.3));
}
