/** Join class names, skipping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export type Semantic = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type Mark = 'provisional' | 'review' | 'stale' | 'pending' | 'live';
export type Tone = Semantic | Mark;
