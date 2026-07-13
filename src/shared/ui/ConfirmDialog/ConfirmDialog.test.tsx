import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('renders nothing when closed', () => {
    renderWithProviders(
      <ConfirmDialog
        open={false}
        message="Delete this alert?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(screen.queryByText('Delete this alert?')).not.toBeInTheDocument();
  });

  it('renders the message and both actions when open', () => {
    renderWithProviders(
      <ConfirmDialog
        open
        message="Delete this alert?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(screen.getByText('Delete this alert?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    renderWithProviders(
      <ConfirmDialog
        open
        message="Delete this alert?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={onConfirm}
        onCancel={jest.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    renderWithProviders(
      <ConfirmDialog
        open
        message="Delete this alert?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when clicking the backdrop', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    renderWithProviders(
      <ConfirmDialog
        open
        message="Delete this alert?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole('alertdialog').parentElement!);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not call onCancel when clicking inside the dialog itself', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    renderWithProviders(
      <ConfirmDialog
        open
        message="Delete this alert?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByText('Delete this alert?'));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('calls onCancel when pressing Escape', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    renderWithProviders(
      <ConfirmDialog
        open
        message="Delete this alert?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />,
    );

    await user.keyboard('{Escape}');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
