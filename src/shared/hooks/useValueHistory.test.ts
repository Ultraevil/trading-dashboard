import { renderHook } from '@testing-library/react';
import { useValueHistory } from './useValueHistory';

describe('useValueHistory', () => {
  it('starts empty when no value has arrived yet', () => {
    const { result } = renderHook(
      ({ value }: { value: number | null }) => useValueHistory(value, 5),
      { initialProps: { value: null } },
    );

    expect(result.current).toEqual([]);
  });

  it('appends each new distinct value', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number | null }) => useValueHistory(value, 5),
      { initialProps: { value: 1 } },
    );

    rerender({ value: 2 });
    rerender({ value: 3 });

    expect(result.current).toEqual([1, 2, 3]);
  });

  it('does not append a repeated identical value', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number | null }) => useValueHistory(value, 5),
      { initialProps: { value: 1 } },
    );

    rerender({ value: 1 });
    rerender({ value: 1 });

    expect(result.current).toEqual([1]);
  });

  it('caps the history at maxLength, dropping the oldest values', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number | null }) => useValueHistory(value, 3),
      { initialProps: { value: 1 } },
    );

    [2, 3, 4, 5].forEach((value) => rerender({ value }));

    expect(result.current).toEqual([3, 4, 5]);
  });
});
