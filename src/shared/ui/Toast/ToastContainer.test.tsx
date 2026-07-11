import { act, screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { addToast } from '@/features/ui/uiSlice';
import { ToastContainer } from './ToastContainer';

describe('ToastContainer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when there are no toasts', () => {
    renderWithProviders(<ToastContainer />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('auto-dismisses a toast after 4 seconds', () => {
    const { store } = renderWithProviders(<ToastContainer />);

    act(() => {
      store.dispatch(addToast('First toast', 'info'));
    });
    expect(screen.getByText('First toast')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.queryByText('First toast')).not.toBeInTheDocument();
  });

  it('does not reset an existing toast\'s timer when another toast is added', () => {
    const { store } = renderWithProviders(<ToastContainer />);

    act(() => {
      store.dispatch(addToast('First toast', 'info'));
    });

    // Halfway through the first toast's 4s auto-dismiss window, a second
    // toast arrives. Before the fix, this re-ran the effect for the whole
    // `toasts` array and restarted every timer, so the first toast would
    // incorrectly still be visible at the 4s mark below.
    act(() => {
      jest.advanceTimersByTime(2000);
      store.dispatch(addToast('Second toast', 'info'));
    });
    expect(screen.getByText('First toast')).toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('First toast')).not.toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();
  });
});
