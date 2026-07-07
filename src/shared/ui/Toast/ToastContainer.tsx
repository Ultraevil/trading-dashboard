import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectToasts, removeToast } from '@/features/ui/uiSlice';
import { ToastStack, ToastItem, CloseButton } from './Toast.styles';

const AUTO_DISMISS_MS = 4000;

export const ToastContainer = () => {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast) =>
      setTimeout(() => dispatch(removeToast(toast.id)), AUTO_DISMISS_MS),
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, dispatch]);

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
