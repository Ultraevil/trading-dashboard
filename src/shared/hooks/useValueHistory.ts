import { useState } from 'react';

/**
 * Accumulates a rolling window of the last `maxLength` values seen for a
 * live-updating number (e.g. a websocket price tick). Uses the "adjust
 * state during render" pattern instead of an effect: when `value` differs
 * from the last one we recorded, we append to history in the same render
 * pass, which React re-runs once and settles — no cascading effect calls.
 */
export const useValueHistory = (
  value: number | null | undefined,
  maxLength: number,
): number[] => {
  const [history, setHistory] = useState<number[]>([]);
  const [lastValue, setLastValue] = useState<number | null | undefined>(
    undefined,
  );

  if (value != null && value !== lastValue) {
    setLastValue(value);
    setHistory((prev) => {
      const next = [...prev, value];
      return next.length > maxLength ? next.slice(-maxLength) : next;
    });
  }

  return history;
};
