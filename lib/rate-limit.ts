/**
 * Minimal in-memory sliding-window rate limiter.
 * Good enough against casual spam; on serverless each instance keeps its own window.
 * Swap for a shared store (e.g. Upstash Redis) if abuse becomes a problem.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, { limit = 5, windowMs = 10 * 60_000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map does not grow unbounded.
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}
