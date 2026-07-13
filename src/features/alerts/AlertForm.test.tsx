import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { t } from '@/test/i18n';
import { AVAILABLE_SYMBOLS } from '@/config/env';
import { AlertForm } from './AlertForm';
import type { Alert } from './alert.types';

const mockCreateAlert = jest.fn();
const mockUpdateAlert = jest.fn();

jest.mock('@/services/api/alertsApi', () => ({
  useCreateAlertMutation: () => [mockCreateAlert, { isLoading: false }],
  useUpdateAlertMutation: () => [mockUpdateAlert, { isLoading: false }],
}));

const resolvedAlert: Alert = {
  id: 'alert-1',
  symbol: AVAILABLE_SYMBOLS[0],
  condition: 'ABOVE',
  targetPrice: 65000,
  enabled: true,
  triggeredAt: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('AlertForm', () => {
  beforeEach(() => {
    mockCreateAlert.mockReset();
    mockUpdateAlert.mockReset();
    mockCreateAlert.mockReturnValue({ unwrap: () => Promise.resolve(resolvedAlert) });
    mockUpdateAlert.mockReturnValue({ unwrap: () => Promise.resolve(resolvedAlert) });
  });

  it('requires a valid target price before submitting', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertForm />);

    await user.click(
      screen.getByRole('button', { name: t('alerts.createAlert') }),
    );

    expect(
      await screen.findByText(t('alerts.errors.targetPriceInvalid')),
    ).toBeInTheDocument();
    expect(mockCreateAlert).not.toHaveBeenCalled();
  });

  it('rejects a non-positive target price', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertForm />);

    await user.type(screen.getByLabelText(t('alerts.fields.targetPrice')), '-5');
    await user.click(
      screen.getByRole('button', { name: t('alerts.createAlert') }),
    );

    expect(
      await screen.findByText(t('alerts.errors.targetPricePositive')),
    ).toBeInTheDocument();
    expect(mockCreateAlert).not.toHaveBeenCalled();
  });

  it('lets the user switch between ABOVE and BELOW', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertForm />);

    const aboveButton = screen.getByRole('button', {
      name: t('alerts.condition.ABOVE'),
    });
    const belowButton = screen.getByRole('button', {
      name: t('alerts.condition.BELOW'),
    });

    expect(aboveButton).toHaveAttribute('aria-pressed', 'true');
    expect(belowButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(belowButton);

    expect(aboveButton).toHaveAttribute('aria-pressed', 'false');
    expect(belowButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls createAlert with the entered values', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertForm />);

    await user.type(
      screen.getByLabelText(t('alerts.fields.targetPrice')),
      '65000',
    );
    await user.click(
      screen.getByRole('button', { name: t('alerts.createAlert') }),
    );

    await waitFor(() => {
      expect(mockCreateAlert).toHaveBeenCalledWith({
        symbol: AVAILABLE_SYMBOLS[0],
        condition: 'ABOVE',
        targetPrice: 65000,
      });
    });
    expect(mockUpdateAlert).not.toHaveBeenCalled();
  });

  it('pre-fills the fields and calls updateAlert when editing an existing alert', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AlertForm alert={resolvedAlert} />);

    expect(screen.getByLabelText(t('alerts.fields.targetPrice'))).toHaveValue(
      65000,
    );

    await user.click(
      screen.getByRole('button', { name: t('alerts.saveChanges') }),
    );

    await waitFor(() => {
      expect(mockUpdateAlert).toHaveBeenCalledWith({
        id: resolvedAlert.id,
        symbol: resolvedAlert.symbol,
        condition: resolvedAlert.condition,
        targetPrice: resolvedAlert.targetPrice,
      });
    });
  });

  it('shows the cancel button only when editing', () => {
    renderWithProviders(<AlertForm alert={resolvedAlert} />);
    expect(
      screen.getByRole('button', { name: t('alerts.cancel') }),
    ).toBeInTheDocument();
  });

  it('shows the backend error message when the mutation rejects', async () => {
    mockCreateAlert.mockReturnValue({
      unwrap: () =>
        Promise.reject({
          status: 'CUSTOM_ERROR',
          data: 'targetPrice must be a positive number',
        }),
    });

    const user = userEvent.setup();
    renderWithProviders(<AlertForm />);

    await user.type(
      screen.getByLabelText(t('alerts.fields.targetPrice')),
      '65000',
    );
    await user.click(
      screen.getByRole('button', { name: t('alerts.createAlert') }),
    );

    expect(
      await screen.findByText('targetPrice must be a positive number'),
    ).toBeInTheDocument();
  });
});
