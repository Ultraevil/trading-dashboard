import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { t } from '@/test/i18n';
import { selectToasts } from '@/features/ui/uiSlice';
import { AlertListItem } from './AlertListItem';
import type { Alert } from './alert.types';

const mockToggleAlert = jest.fn();
const mockDeleteAlert = jest.fn();
const mockCreateAlert = jest.fn();
const mockUpdateAlert = jest.fn();

jest.mock('@/services/api/alertsApi', () => ({
  useToggleAlertMutation: () => [mockToggleAlert, { isLoading: false }],
  useDeleteAlertMutation: () => [mockDeleteAlert, { isLoading: false }],
  useCreateAlertMutation: () => [mockCreateAlert, { isLoading: false }],
  useUpdateAlertMutation: () => [mockUpdateAlert, { isLoading: false }],
}));

const alert: Alert = {
  id: 'alert-1',
  symbol: 'BTCUSDT',
  condition: 'ABOVE',
  targetPrice: 65000,
  enabled: true,
  triggeredAt: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('AlertListItem', () => {
  beforeEach(() => {
    mockToggleAlert.mockReset();
    mockDeleteAlert.mockReset();
    mockToggleAlert.mockReturnValue({ unwrap: () => Promise.resolve(alert) });
    mockDeleteAlert.mockReturnValue({ unwrap: () => Promise.resolve(true) });
  });

  it('renders the alert details', () => {
    renderWithProviders(<AlertListItem alert={alert} />);

    expect(screen.getByText('BTCUSDT')).toBeInTheDocument();
    expect(screen.getByText('65000')).toBeInTheDocument();
    expect(screen.getByText(t('alerts.statusActive'))).toBeInTheDocument();
  });

  it('shows the triggered time when the alert has fired', () => {
    renderWithProviders(
      <AlertListItem
        alert={{ ...alert, enabled: false, triggeredAt: '2026-01-01T10:30:00.000Z' }}
      />,
    );

    expect(screen.getByText(t('alerts.statusDisabled'))).toBeInTheDocument();
    expect(screen.getByText(/Triggered/)).toBeInTheDocument();
  });

  it('calls toggleAlert when the enable/disable button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertListItem alert={alert} />);

    await user.click(screen.getByRole('button', { name: t('alerts.disable') }));

    await waitFor(() => {
      expect(mockToggleAlert).toHaveBeenCalledWith('alert-1');
    });
  });

  it('switches to the edit form when Edit is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertListItem alert={alert} />);

    await user.click(screen.getByRole('button', { name: t('alerts.edit') }));

    expect(
      screen.getByRole('button', { name: t('alerts.saveChanges') }),
    ).toBeInTheDocument();
  });

  it('asks for confirmation before deleting, and does not delete on cancel', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertListItem alert={alert} />);

    await user.click(screen.getByRole('button', { name: t('alerts.delete') }));
    expect(screen.getByText(t('alerts.confirmDelete'))).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: t('alerts.cancel') }));

    expect(screen.queryByText(t('alerts.confirmDelete'))).not.toBeInTheDocument();
    expect(mockDeleteAlert).not.toHaveBeenCalled();
  });

  it('deletes the alert once the confirmation is accepted', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertListItem alert={alert} />);

    // Two buttons share the "delete" label: the row action and the
    // confirm-dialog's confirm button - clicking to open, then confirming.
    await user.click(screen.getAllByRole('button', { name: t('alerts.delete') })[0]);
    await user.click(screen.getAllByRole('button', { name: t('alerts.delete') })[1]);

    await waitFor(() => {
      expect(mockDeleteAlert).toHaveBeenCalledWith('alert-1');
    });
  });

  it('shows a toast when toggling fails', async () => {
    mockToggleAlert.mockReturnValue({
      unwrap: () =>
        Promise.reject({ status: 'CUSTOM_ERROR', data: 'Alert not found' }),
    });

    const user = userEvent.setup();
    const { store } = renderWithProviders(<AlertListItem alert={alert} />);

    await user.click(screen.getByRole('button', { name: t('alerts.disable') }));

    await waitFor(() => {
      const toasts = selectToasts(store.getState());
      expect(toasts).toHaveLength(1);
      expect(toasts[0]).toMatchObject({ message: 'Alert not found', variant: 'error' });
    });
  });
});
