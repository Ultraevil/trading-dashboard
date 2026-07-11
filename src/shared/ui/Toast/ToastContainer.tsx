import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectToasts, removeToast } from '@/features/ui/uiSlice';
import { ToastStack, ToastItem, CloseButton } from './Toast.styles';

const AUTO_DISMISS_MS = 4000;

export const ToastContainer = () => {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();
  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timers = timersRef.current;
    const activeIds = new Set(toasts.map((toast) => toast.id));

    // Schedule a dismiss timer only for toasts that don't have one yet.
    // Depending on the whole `toasts` array means this effect re-runs on
    // every add/remove — without this guard it would clear and restart
    // every toast's timer each time, extending how long earlier toasts
    // stay on screen every time a new one appears.
    toasts.forEach((toast) => {
      if (timers.has(toast.id)) return;

      timers.set(
        toast.id,
        setTimeout(() => {
          dispatch(removeToast(toast.id));
          timers.delete(toast.id);
        }, AUTO_DISMISS_MS),
      );
    });

    // Clear timers for toasts that are already gone (e.g. dismissed via
    // the close button) so we don't dispatch removeToast for a stale id.
    timers.forEach((timer, id) => {
      if (!activeIds.has(id)) {
        clearTimeout(timer);
        timers.delete(id);
      }
    });
  }, [toasts, dispatch]);

  // Separate mount/unmount-only effect: clears any still-pending timers
  // if ToastContainer itself unmounts, without interfering with the
  // per-toast scheduling effect above (which must not clear live timers
  // on every re-run).
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <ToastStack role="status" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} variant={toast.variant}>
          {toast.message}
          <CloseButton
            aria-label="Dismiss notification"
            onClick={() => dispatch(removeToast(toast.id))}
          >
            ×
          </CloseButton>
        </ToastItem>
      ))}
    </ToastStack>
  );
};
