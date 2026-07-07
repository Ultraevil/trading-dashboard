import { useState } from 'react';

export type Trend = 'up' | 'down' | 'flat';

/**
 * Tracks whether a numeric value increased, decreased, or stayed the same
 * since the last time it changed. Implemented as "adjusting state during
 * render" (see https://react.dev/learn/you-might-not-need-an-effect)
 * rather than an effect, so there's no extra render pass and no risk of
 * setState-in-effect cascades.
 */
export const useTrend = (value: number | null | undefined): Trend => {
  const [prevValue, setPrevValue] = useState<number | null | undefined>(
    undefined,
  );
  const [trend, setTrend] = useState<Trend>('flat');

  if (value != null && value !== prevValue) {
    if (prevValue != null) {
      setTrend(value > prevValue ? 'up' : value < prevValue ? 'down' : 'flat');
    }
    setPrevValue(value);
  }

  return trend;
};
