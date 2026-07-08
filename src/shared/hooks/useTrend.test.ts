import { renderHook } from '@testing-library/react';
import { useTrend } from './useTrend';

describe('useTrend', () => {
  it('starts flat when there is no previous value to compare against', () => {
    const { result } = renderHook(() => useTrend(100));
    expect(result.current).toBe('flat');
  });

  it('reports "up" when the value increases', () => {
    const { result, rerender } = renderHook(({ value }) => useTrend(value), {
      initialProps: { value: 100 },
    });

    rerender({ value: 105 });
    expect(result.current).toBe('up');
  });

  it('reports "down" when the value decreases', () => {
    const { result, rerender } = renderHook(({ value }) => useTrend(value), {
      initialProps: { value: 100 },
    });

    rerender({ value: 95 });
    expect(result.current).toBe('down');
  });

  it('keeps the last trend when the value stops changing', () => {
    const { result, rerender } = renderHook(({ value }) => useTrend(value), {
      initialProps: { value: 100 },
    });

    rerender({ value: 105 });
    rerender({ value: 105 });
    expect(result.current).toBe('up');
  });

  it('ignores null/undefined updates without resetting the trend', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number | null }) => useTrend(value),
      { initialProps: { value: 100 as number | null } },
    );

    rerender({ value: 110 });
    expect(result.current).toBe('up');

    rerender({ value: null });
    expect(result.current).toBe('up');
  });
});
