import { useEffect } from 'react';
import { Button } from '@/shared/ui/Button';
import { Backdrop, Dialog, Message, Actions } from './ConfirmDialog.styles';
import type { ConfirmDialogProps } from './ConfirmDialog.types';

export const ConfirmDialog = ({
  open,
  message,
  confirmLabel,
  cancelLabel,
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <Backdrop onClick={onCancel}>
      <Dialog
        role="alertdialog"
        aria-modal="true"
        aria-label={message}
        onClick={(e) => e.stopPropagation()}
      >
        <Message>{message}</Message>
        <Actions>
          <Button size="sm" variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            size="sm"
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Actions>
      </Dialog>
    </Backdrop>
  );
};
